/*!
 * ONNX Runtime Web v1.22.0-dev.20250418-c19a49615b
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ST=Object.create;var ei=Object.defineProperty;var $T=Object.getOwnPropertyDescriptor;var AT=Object.getOwnPropertyNames;var OT=Object.getPrototypeOf,PT=Object.prototype.hasOwnProperty;var _s=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var k=(n,e)=>()=>(n&&(e=n(n=0)),e);var te=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),_n=(n,e)=>{for(var r in e)ei(n,r,{get:e[r],enumerable:!0})},Yd=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of AT(e))!PT.call(n,o)&&o!==r&&ei(n,o,{get:()=>e[o],enumerable:!(t=$T(e,o))||t.enumerable});return n};var _e=(n,e,r)=>(r=n!=null?ST(OT(n)):{},Yd(e||!n||!n.__esModule?ei(r,"default",{value:n,enumerable:!0}):r,n)),Hn=n=>Yd(ei({},"__esModule",{value:!0}),n);var ti,vn,on,ET,Qd,vs=k(()=>{"use strict";ti=new Map,vn=[],on=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=ti.get(n);if(t===void 0)ti.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=vn.indexOf(n);o!==-1&&vn.splice(o,1);for(let i=0;i<vn.length;i++)if(ti.get(vn[i]).priority<=r){vn.splice(i,0,n);return}vn.push(n)}return}throw new TypeError("not a valid backend")},ET=async n=>{let e=ti.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Qd=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?vn:r,o,i=[],a=new Set;for(let u of t){let l=await ET(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var ep=k(()=>{"use strict";vs()});var tp,rp=k(()=>{"use strict";tp="1.22.0-dev.20250409-89f8206ba4"});var np,wt,xs=k(()=>{"use strict";rp();np="warning",wt={wasm:{},webgl:{},webgpu:{},versions:{common:tp},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);np=n}},get logLevel(){return np}};Object.defineProperty(wt,"logLevel",{enumerable:!0})});var pe,op=k(()=>{"use strict";xs();pe=wt});var ip,ap,sp=k(()=>{"use strict";ip=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let c=i*o,p=0,f=c,m=c*2,g=-1;a==="RGBA"?(p=0,f=c,m=c*2,g=c*3):a==="RGB"?(p=0,f=c,m=c*2):a==="RBG"&&(p=0,m=c,f=c*2);for(let b=0;b<i;b++)for(let w=0;w<o;w++){let _=(n.data[p++]-l[0])*u[0],x=(n.data[f++]-l[1])*u[1],I=(n.data[m++]-l[2])*u[2],$=g===-1?255:(n.data[g++]-l[3])*u[3];t.fillStyle="rgba("+_+","+x+","+I+","+$+")",t.fillRect(w,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ap=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,m=0,g=1,b=2,w=3,_=0,x=p,I=p*2,$=-1;s==="RGBA"?(_=0,x=p,I=p*2,$=p*3):s==="RGB"?(_=0,x=p,I=p*2):s==="RBG"&&(_=0,I=p,x=p*2),t=r.createImageData(o,i);for(let A=0;A<i*o;m+=f,g+=f,b+=f,w+=f,A++)t.data[m]=(n.data[_++]-c[0])*l[0],t.data[g]=(n.data[x++]-c[1])*l[1],t.data[b]=(n.data[I++]-c[2])*l[2],t.data[w]=$===-1?255:(n.data[$++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var ws,up,lp,cp,dp,pp,fp=k(()=>{"use strict";ri();ws=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=r*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,f=0,m=1,g=2,b=3,w=0,_=l,x=l*2,I=-1;s==="RGB"&&(p=3,f=0,m=1,g=2,b=-1),u==="RGBA"?I=l*3:u==="RBG"?(w=0,x=l,_=l*2):u==="BGR"&&(x=0,_=l,w=l*2);for(let A=0;A<l;A++,f+=p,g+=p,m+=p,b+=p)c[w++]=(n[f]+a[0])/i[0],c[_++]=(n[m]+a[1])/i[1],c[x++]=(n[g]+a[2])/i[2],I!==-1&&b!==-1&&(c[I++]=(n[b]+a[3])/i[3]);return u==="RGBA"?new ut("float32",c,[1,4,r,t]):new ut("float32",c,[1,3,r,t])},up=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=n.width,c.height=n.height;let p=l(c);if(p!=null){let f=n.height,m=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(f=e.resizedHeight,m=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=f,s.width=m}else s.tensorFormat="RGBA",s.height=f,s.width=m;p.drawImage(n,0,0),a=p.getImageData(0,0,m,f).data}else throw new Error("Can not access image data")}else if(t){let c,p;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,p=e.resizedWidth):(c=n.height,p=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=c,s.width=p,e!==void 0){let f=u();f.width=p,f.height=c;let m=l(f);if(m!=null)m.putImageData(n,0,0),a=m.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=n.width,c.height=n.height;let p=l(c);if(p!=null){let f=n.height,m=n.width;return p.drawImage(n,0,0,m,f),a=p.getImageData(0,0,m,f).data,s.height=f,s.width=m,ws(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,p)=>{let f=u(),m=l(f);if(!n||!m)return p();let g=new Image;g.crossOrigin="Anonymous",g.src=n,g.onload=()=>{f.width=g.width,f.height=g.height,m.drawImage(g,0,0,f.width,f.height);let b=m.getImageData(0,0,f.width,f.height);s.height=f.height,s.width=f.width,c(ws(b.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return ws(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},lp=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new ut({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},cp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ut({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},dp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ut({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},pp=(n,e,r)=>new ut({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var xn,fo,hp,mp,gp=k(()=>{"use strict";xn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),fo=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),hp=!1,mp=()=>{if(!hp){hp=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(xn.set("int64",BigInt64Array),fo.set(BigInt64Array,"int64")),e&&(xn.set("uint64",BigUint64Array),fo.set(BigUint64Array,"uint64")),t?(xn.set("float16",r),fo.set(r,"float16")):xn.set("float16",Uint16Array)}}});var bp,yp,_p=k(()=>{"use strict";ri();bp=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},yp=(n,e)=>{switch(n.location){case"cpu":return new ut(n.type,n.data,e);case"cpu-pinned":return new ut({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new ut({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new ut({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new ut({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var ut,ri=k(()=>{"use strict";sp();fp();gp();_p();ut=class{constructor(e,r,t){mp();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=xn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let l=xn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(r,BigInt):s=l.from(r)}else if(r instanceof l)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=fo.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=bp(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return up(e,r)}static fromTexture(e,r){return lp(e,r)}static fromGpuBuffer(e,r){return cp(e,r)}static fromMLTensor(e,r){return dp(e,r)}static fromPinnedBuffer(e,r,t){return pp(e,r,t)}toDataURL(e){return ip(this,e)}toImageData(e){return ap(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return yp(this,e)}}});var Tt,Ts=k(()=>{"use strict";ri();Tt=ut});var ni,vp,It,gt,Is=k(()=>{"use strict";xs();ni=(n,e)=>{(typeof wt.trace>"u"?!wt.wasm.trace:!wt.trace)||console.timeStamp(`${n}::ORT::${e}`)},vp=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),ni("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},It=n=>{(typeof wt.trace>"u"?!wt.wasm.trace:!wt.trace)||vp("BEGIN",n)},gt=n=>{(typeof wt.trace>"u"?!wt.wasm.trace:!wt.trace)||vp("END",n)}});var oi,xp=k(()=>{"use strict";vs();Ts();Is();oi=class n{constructor(e){this.handler=e}async run(e,r,t){It();let o={},i={};if(typeof e!="object"||e===null||e instanceof Tt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Tt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let f=r[p];(f===null||f instanceof Tt)&&(l=!0,a=!1,o[p]=f)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let c=s[l];c instanceof Tt?u[l]=c:u[l]=new Tt(c.type,c.data,c.dims)}return gt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){It();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,p=0,f=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=e.byteLength-p,typeof t=="number"){if(f=t,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||p+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,p,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await Qd(a),l=await s.createInferenceSessionHandler(i,u);return gt(),new n(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var CT,wp=k(()=>{"use strict";xp();CT=oi});var Tp=k(()=>{"use strict"});var Ip=k(()=>{"use strict"});var Sp=k(()=>{"use strict"});var $p=k(()=>{"use strict"});var Ss={};_n(Ss,{InferenceSession:()=>CT,TRACE:()=>ni,TRACE_FUNC_BEGIN:()=>It,TRACE_FUNC_END:()=>gt,Tensor:()=>Tt,env:()=>pe,registerBackend:()=>on});var ct=k(()=>{"use strict";ep();op();wp();Ts();Tp();Ip();Is();Sp();$p()});function an(n,e,r,t){if(e===void 0)return kT(n);if(r===void 0)ii(n,e,1);else if(typeof r=="number"&&t===void 0)ii(n,e,r);else if(typeof r=="string"&&t===void 0)ii(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")ii(n,r,t,e);else throw new TypeError("input is valid")}function kT(n){return{verbose:an.verbose.bind(null,n),info:an.info.bind(null,n),warning:an.warning.bind(null,n),error:an.error.bind(null,n),fatal:an.fatal.bind(null,n)}}function ii(n,e,r,t){let o=ho[t||""]||ho[""];Op[n]<Op[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,DT[o.provider].log(n,e,t))}var $s,As,Op,DT,Pp,ho,ze,si,ui,li,ai,Pt=k(()=>{"use strict";$s=class{log(e,r,t){}},As=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Op={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},DT={none:new $s,console:new As},Pp={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},ho={"":Pp};(u=>{function n(l,c){u("verbose",l,c)}u.verbose=n;function e(l,c){u("info",l,c)}u.info=e;function r(l,c){u("warning",l,c)}u.warning=r;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){ho={},a("",l||{})}u.reset=i;function a(l,c){if(l==="*")i(c);else{let p=ho[l]||Pp;ho[l]={provider:c.provider||p.provider,minimalSeverity:c.minimalSeverity||p.minimalSeverity,logDateTime:c.logDateTime===void 0?p.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?p.logSourceLocation:c.logSourceLocation}}}u.set=a;function s(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),a("",c)}u.setWithEnv=s})(an||={});ze=an,si=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},ui=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},li=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=ai(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(s)},p=>{c(p)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=ai();return this.flush(o),new si(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new si(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new ui(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=ai();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new ui(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){ze.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=ai()}}get started(){return this._started}},ai=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Ep(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&NT(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function NT(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var Cp=k(()=>{"use strict"});var Dp=te(Os=>{"use strict";Os.__esModule=!0;var LT=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();Os.Guid=LT});function Ge(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function dt(n){return(n&&n.__isLong__)===!0}function kp(n){var e=Math.clz32(n&-n);return n?31-e:e}function wn(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=Lp[n],t)?t:(r=ke(n,0,!0),o&&(Lp[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Np[n],t)?t:(r=ke(n,n<0?-1:0,!1),o&&(Np[n]=r),r))}function Ct(n,e){if(isNaN(n))return e?qr:Ft;if(e){if(n<0)return qr;if(n>=Bp)return Gp}else{if(n<=-zp)return bt;if(n+1>=zp)return Vp}return n<0?Ct(-n,e).neg():ke(n%jn|0,n/jn|0,e)}function ke(n,e,r){return new Ge(n,e,r)}function Es(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?qr:Ft;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Es(n.substring(1),e,r).neg();for(var o=Ct(ci(r,8)),i=Ft,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var l=Ct(ci(r,s));i=i.mul(l).add(Ct(u))}else i=i.mul(o),i=i.add(Ct(u))}return i.unsigned=e,i}function Vt(n,e){return typeof n=="number"?Ct(n,e):typeof n=="string"?Es(n,e):ke(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Et,Np,Lp,ci,Rp,RT,jn,Bp,zp,Mp,Ft,qr,qn,Fp,Ps,Vp,Gp,bt,U,sn,Cs=k(()=>{Et=null;try{Et=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ge.prototype.__isLong__;Object.defineProperty(Ge.prototype,"__isLong__",{value:!0});Ge.isLong=dt;Np={},Lp={};Ge.fromInt=wn;Ge.fromNumber=Ct;Ge.fromBits=ke;ci=Math.pow;Ge.fromString=Es;Ge.fromValue=Vt;Rp=65536,RT=1<<24,jn=Rp*Rp,Bp=jn*jn,zp=Bp/2,Mp=wn(RT),Ft=wn(0);Ge.ZERO=Ft;qr=wn(0,!0);Ge.UZERO=qr;qn=wn(1);Ge.ONE=qn;Fp=wn(1,!0);Ge.UONE=Fp;Ps=wn(-1);Ge.NEG_ONE=Ps;Vp=ke(-1,2147483647,!1);Ge.MAX_VALUE=Vp;Gp=ke(-1,-1,!0);Ge.MAX_UNSIGNED_VALUE=Gp;bt=ke(0,-2147483648,!1);Ge.MIN_VALUE=bt;U=Ge.prototype;U.toInt=function(){return this.unsigned?this.low>>>0:this.low};U.toNumber=function(){return this.unsigned?(this.high>>>0)*jn+(this.low>>>0):this.high*jn+(this.low>>>0)};U.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(bt)){var r=Ct(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Ct(ci(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(a=u,a.isZero())return c+s;for(;c.length<6;)c="0"+c;s=""+c+s}};U.getHighBits=function(){return this.high};U.getHighBitsUnsigned=function(){return this.high>>>0};U.getLowBits=function(){return this.low};U.getLowBitsUnsigned=function(){return this.low>>>0};U.getNumBitsAbs=function(){if(this.isNegative())return this.eq(bt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};U.isZero=function(){return this.high===0&&this.low===0};U.eqz=U.isZero;U.isNegative=function(){return!this.unsigned&&this.high<0};U.isPositive=function(){return this.unsigned||this.high>=0};U.isOdd=function(){return(this.low&1)===1};U.isEven=function(){return(this.low&1)===0};U.equals=function(e){return dt(e)||(e=Vt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};U.eq=U.equals;U.notEquals=function(e){return!this.eq(e)};U.neq=U.notEquals;U.ne=U.notEquals;U.lessThan=function(e){return this.comp(e)<0};U.lt=U.lessThan;U.lessThanOrEqual=function(e){return this.comp(e)<=0};U.lte=U.lessThanOrEqual;U.le=U.lessThanOrEqual;U.greaterThan=function(e){return this.comp(e)>0};U.gt=U.greaterThan;U.greaterThanOrEqual=function(e){return this.comp(e)>=0};U.gte=U.greaterThanOrEqual;U.ge=U.greaterThanOrEqual;U.compare=function(e){if(dt(e)||(e=Vt(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};U.comp=U.compare;U.negate=function(){return!this.unsigned&&this.eq(bt)?bt:this.not().add(qn)};U.neg=U.negate;U.add=function(e){dt(e)||(e=Vt(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,p=0,f=0,m=0;return m+=i+l,f+=m>>>16,m&=65535,f+=o+u,p+=f>>>16,f&=65535,p+=t+s,c+=p>>>16,p&=65535,c+=r+a,c&=65535,ke(f<<16|m,c<<16|p,this.unsigned)};U.subtract=function(e){return dt(e)||(e=Vt(e)),this.add(e.neg())};U.sub=U.subtract;U.multiply=function(e){if(this.isZero())return this;if(dt(e)||(e=Vt(e)),Et){var r=Et.mul(this.low,this.high,e.low,e.high);return ke(r,Et.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?qr:Ft;if(this.eq(bt))return e.isOdd()?bt:Ft;if(e.eq(bt))return this.isOdd()?bt:Ft;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Mp)&&e.lt(Mp))return Ct(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,p=0,f=0,m=0,g=0;return g+=a*c,m+=g>>>16,g&=65535,m+=i*c,f+=m>>>16,m&=65535,m+=a*l,f+=m>>>16,m&=65535,f+=o*c,p+=f>>>16,f&=65535,f+=i*l,p+=f>>>16,f&=65535,f+=a*u,p+=f>>>16,f&=65535,p+=t*c+o*l+i*u+a*s,p&=65535,ke(m<<16|g,p<<16|f,this.unsigned)};U.mul=U.multiply;U.divide=function(e){if(dt(e)||(e=Vt(e)),e.isZero())throw Error("division by zero");if(Et){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Et.div_u:Et.div_s)(this.low,this.high,e.low,e.high);return ke(r,Et.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?qr:Ft;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return qr;if(e.gt(this.shru(1)))return Fp;i=qr}else{if(this.eq(bt)){if(e.eq(qn)||e.eq(Ps))return bt;if(e.eq(bt))return qn;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Ft)?e.isNegative()?qn:Ps:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(bt))return this.unsigned?qr:Ft;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Ft}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:ci(2,s-48),l=Ct(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=Ct(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=qn),i=i.add(l),o=o.sub(c)}return i};U.div=U.divide;U.modulo=function(e){if(dt(e)||(e=Vt(e)),Et){var r=(this.unsigned?Et.rem_u:Et.rem_s)(this.low,this.high,e.low,e.high);return ke(r,Et.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};U.mod=U.modulo;U.rem=U.modulo;U.not=function(){return ke(~this.low,~this.high,this.unsigned)};U.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};U.clz=U.countLeadingZeros;U.countTrailingZeros=function(){return this.low?kp(this.low):kp(this.high)+32};U.ctz=U.countTrailingZeros;U.and=function(e){return dt(e)||(e=Vt(e)),ke(this.low&e.low,this.high&e.high,this.unsigned)};U.or=function(e){return dt(e)||(e=Vt(e)),ke(this.low|e.low,this.high|e.high,this.unsigned)};U.xor=function(e){return dt(e)||(e=Vt(e)),ke(this.low^e.low,this.high^e.high,this.unsigned)};U.shiftLeft=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ke(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ke(0,this.low<<e-32,this.unsigned)};U.shl=U.shiftLeft;U.shiftRight=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ke(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};U.shr=U.shiftRight;U.shiftRightUnsigned=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?ke(this.high,0,this.unsigned):ke(this.high>>>e-32,0,this.unsigned)};U.shru=U.shiftRightUnsigned;U.shr_u=U.shiftRightUnsigned;U.rotateLeft=function(e){var r;return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ke(this.high,this.low,this.unsigned):e<32?(r=32-e,ke(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,ke(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};U.rotl=U.rotateLeft;U.rotateRight=function(e){var r;return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ke(this.high,this.low,this.unsigned):e<32?(r=32-e,ke(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,ke(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};U.rotr=U.rotateRight;U.toSigned=function(){return this.unsigned?ke(this.low,this.high,!1):this};U.toUnsigned=function(){return this.unsigned?this:ke(this.low,this.high,!0)};U.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};U.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};U.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};Ge.fromBytes=function(e,r,t){return t?Ge.fromBytesLE(e,r):Ge.fromBytesBE(e,r)};Ge.fromBytesLE=function(e,r){return new Ge(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};Ge.fromBytesBE=function(e,r){return new Ge(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};sn=Ge});var Ds=te(di=>{"use strict";Object.defineProperty(di,"__esModule",{value:!0});di.ArgType=void 0;var Up;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Up||(di.ArgType=Up={}))});var Tn=te(Qt=>{"use strict";Object.defineProperty(Qt,"__esModule",{value:!0});Qt.SIZE_PREFIX_LENGTH=Qt.FILE_IDENTIFIER_LENGTH=Qt.SIZEOF_INT=Qt.SIZEOF_SHORT=void 0;Qt.SIZEOF_SHORT=2;Qt.SIZEOF_INT=4;Qt.FILE_IDENTIFIER_LENGTH=4;Qt.SIZE_PREFIX_LENGTH=4});var ks=te(Dt=>{"use strict";Object.defineProperty(Dt,"__esModule",{value:!0});Dt.isLittleEndian=Dt.float64=Dt.float32=Dt.int32=void 0;Dt.int32=new Int32Array(2);Dt.float32=new Float32Array(Dt.int32.buffer);Dt.float64=new Float64Array(Dt.int32.buffer);Dt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Ns=te(pi=>{"use strict";Object.defineProperty(pi,"__esModule",{value:!0});pi.Encoding=void 0;var Wp;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Wp||(pi.Encoding=Wp={}))});var Rs=te(fi=>{"use strict";Object.defineProperty(fi,"__esModule",{value:!0});fi.ByteBuffer=void 0;var er=Tn(),yt=ks(),zT=Ns(),Ls=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return yt.int32[0]=this.readInt32(e),yt.float32[0]}readFloat64(e){return yt.int32[yt.isLittleEndian?0:1]=this.readInt32(e),yt.int32[yt.isLittleEndian?1:0]=this.readInt32(e+4),yt.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){yt.float32[0]=r,this.writeInt32(e,yt.int32[0])}writeFloat64(e,r){yt.float64[0]=r,this.writeInt32(e,yt.int32[yt.isLittleEndian?0:1]),this.writeInt32(e+4,yt.int32[yt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+er.SIZEOF_INT+er.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<er.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+er.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=er.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===zT.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+er.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=er.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+er.FILE_IDENTIFIER_LENGTH);for(let r=0;r<er.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+er.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};fi.ByteBuffer=Ls});var qp=te(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.Builder=void 0;var Hp=Rs(),St=Tn(),zs=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=Hp.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=Hp.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep(St.SIZEOF_INT,0),this.writeInt32(this.offset()-e+St.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*St.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let l=St.SIZEOF_SHORT;l<i;l+=St.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?St.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,St.SIZEOF_INT+St.FILE_IDENTIFIER_LENGTH+o),i.length!=St.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+St.FILE_IDENTIFIER_LENGTH);for(let a=St.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,St.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep(St.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};hi.Builder=zs});var Ne=te(je=>{"use strict";Object.defineProperty(je,"__esModule",{value:!0});je.ByteBuffer=je.Builder=je.Encoding=je.isLittleEndian=je.float64=je.float32=je.int32=je.SIZE_PREFIX_LENGTH=je.FILE_IDENTIFIER_LENGTH=je.SIZEOF_INT=je.SIZEOF_SHORT=void 0;var MT=Tn();Object.defineProperty(je,"SIZEOF_SHORT",{enumerable:!0,get:function(){return MT.SIZEOF_SHORT}});var BT=Tn();Object.defineProperty(je,"SIZEOF_INT",{enumerable:!0,get:function(){return BT.SIZEOF_INT}});var FT=Tn();Object.defineProperty(je,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return FT.FILE_IDENTIFIER_LENGTH}});var VT=Tn();Object.defineProperty(je,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return VT.SIZE_PREFIX_LENGTH}});var mi=ks();Object.defineProperty(je,"int32",{enumerable:!0,get:function(){return mi.int32}});Object.defineProperty(je,"float32",{enumerable:!0,get:function(){return mi.float32}});Object.defineProperty(je,"float64",{enumerable:!0,get:function(){return mi.float64}});Object.defineProperty(je,"isLittleEndian",{enumerable:!0,get:function(){return mi.isLittleEndian}});var GT=Ns();Object.defineProperty(je,"Encoding",{enumerable:!0,get:function(){return GT.Encoding}});var UT=qp();Object.defineProperty(je,"Builder",{enumerable:!0,get:function(){return UT.Builder}});var WT=Rs();Object.defineProperty(je,"ByteBuffer",{enumerable:!0,get:function(){return WT.ByteBuffer}})});var Bs=te(tr=>{"use strict";var HT=tr&&tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qT=tr&&tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),jT=tr&&tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&HT(e,n,r);return qT(e,n),e};Object.defineProperty(tr,"__esModule",{value:!0});tr.ArgTypeAndIndex=void 0;var KT=jT(Ne()),jp=Ds(),Ms=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+KT.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):jp.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,jp.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};tr.ArgTypeAndIndex=Ms});var Fs=te(gi=>{"use strict";Object.defineProperty(gi,"__esModule",{value:!0});gi.AttributeType=void 0;var Kp;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(Kp||(gi.AttributeType=Kp={}))});var Vs=te(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.NodeType=void 0;var Xp;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(Xp||(bi.NodeType=Xp={}))});var Us=te(rr=>{"use strict";var XT=rr&&rr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),ZT=rr&&rr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),JT=rr&&rr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&XT(e,n,r);return ZT(e,n),e};Object.defineProperty(rr,"__esModule",{value:!0});rr.Node=void 0;var YT=JT(Ne()),QT=Ws(),Zp=Vs(),Gs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+YT.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):Zp.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new QT.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,Zp.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,l,c,p,f,m,g){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,l),n.addInputs(e,c),n.addOutputs(e,p),n.addAttributes(e,f),n.addInputArgCounts(e,m),n.addImplicitInputs(e,g),n.endNode(e)}};rr.Node=Gs});var qs=te(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.EdgeEnd=void 0;var Hs=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};yi.EdgeEnd=Hs});var Ks=te(nr=>{"use strict";var e2=nr&&nr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),t2=nr&&nr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),r2=nr&&nr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&e2(e,n,r);return t2(e,n),e};Object.defineProperty(nr,"__esModule",{value:!0});nr.NodeEdge=void 0;var n2=r2(Ne()),Jp=qs(),js=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+n2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Jp.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new Jp.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};nr.NodeEdge=js});var Zs=te(or=>{"use strict";var o2=or&&or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),i2=or&&or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),a2=or&&or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&o2(e,n,r);return i2(e,n),e};Object.defineProperty(or,"__esModule",{value:!0});or.NodesToOptimizeIndices=void 0;var s2=a2(Ne()),Xs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+s2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};or.NodesToOptimizeIndices=Xs});var Ys=te(ir=>{"use strict";var u2=ir&&ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),l2=ir&&ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),c2=ir&&ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&u2(e,n,r);return l2(e,n),e};Object.defineProperty(ir,"__esModule",{value:!0});ir.RuntimeOptimizationRecord=void 0;var d2=c2(Ne()),p2=Zs(),Js=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+d2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new p2.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};ir.RuntimeOptimizationRecord=Js});var eu=te(ar=>{"use strict";var f2=ar&&ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),h2=ar&&ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),m2=ar&&ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&f2(e,n,r);return h2(e,n),e};Object.defineProperty(ar,"__esModule",{value:!0});ar.RuntimeOptimizationRecordContainerEntry=void 0;var g2=m2(Ne()),b2=Ys(),Qs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+g2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new b2.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};ar.RuntimeOptimizationRecordContainerEntry=Qs});var ru=te(sr=>{"use strict";var y2=sr&&sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_2=sr&&sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),v2=sr&&sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&y2(e,n,r);return _2(e,n),e};Object.defineProperty(sr,"__esModule",{value:!0});sr.RuntimeOptimizations=void 0;var x2=v2(Ne()),w2=eu(),tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+x2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new w2.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};sr.RuntimeOptimizations=tu});var mo=te(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.TensorDataType=void 0;var Yp;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(Yp||(_i.TensorDataType=Yp={}))});var go=te(ur=>{"use strict";var T2=ur&&ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),I2=ur&&ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),S2=ur&&ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&T2(e,n,r);return I2(e,n),e};Object.defineProperty(ur,"__esModule",{value:!0});ur.Tensor=void 0;var $2=S2(Ne()),Qp=mo(),nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+$2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):Qp.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,Qp.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};ur.Tensor=nu});var iu=te(lr=>{"use strict";var A2=lr&&lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),O2=lr&&lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),P2=lr&&lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&A2(e,n,r);return O2(e,n),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.SparseTensor=void 0;var E2=P2(Ne()),ef=go(),ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+E2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new ef.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new ef.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};lr.SparseTensor=ou});var su=te(cr=>{"use strict";var C2=cr&&cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),D2=cr&&cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),k2=cr&&cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&C2(e,n,r);return D2(e,n),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.MapType=void 0;var N2=k2(Ne()),tf=mo(),L2=bo(),au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+N2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):tf.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new L2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,tf.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};cr.MapType=au});var lu=te(dr=>{"use strict";var R2=dr&&dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),z2=dr&&dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),M2=dr&&dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&R2(e,n,r);return z2(e,n),e};Object.defineProperty(dr,"__esModule",{value:!0});dr.SequenceType=void 0;var B2=M2(Ne()),F2=bo(),uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+B2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new F2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};dr.SequenceType=uu});var cu=te(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.DimensionValueType=void 0;var rf;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(rf||(vi.DimensionValueType=rf={}))});var pu=te(pr=>{"use strict";var V2=pr&&pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),G2=pr&&pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),U2=pr&&pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&V2(e,n,r);return G2(e,n),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.DimensionValue=void 0;var W2=U2(Ne()),nf=cu(),du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+W2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):nf.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,nf.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};pr.DimensionValue=du});var hu=te(fr=>{"use strict";var H2=fr&&fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),q2=fr&&fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),j2=fr&&fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&H2(e,n,r);return q2(e,n),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.Dimension=void 0;var K2=j2(Ne()),X2=pu(),fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+K2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new X2.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};fr.Dimension=fu});var gu=te(hr=>{"use strict";var Z2=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),J2=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),Y2=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&Z2(e,n,r);return J2(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.Shape=void 0;var Q2=Y2(Ne()),eI=hu(),mu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+Q2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new eI.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};hr.Shape=mu});var yu=te(mr=>{"use strict";var tI=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),rI=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),nI=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&tI(e,n,r);return rI(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.TensorTypeAndShape=void 0;var oI=nI(Ne()),iI=gu(),of=mo(),bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+oI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):of.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new iI.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,of.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};mr.TensorTypeAndShape=bu});var _u=te(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.unionListToTypeInfoValue=un.unionToTypeInfoValue=un.TypeInfoValue=void 0;var af=su(),sf=lu(),uf=yu(),xi;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})(xi||(un.TypeInfoValue=xi={}));function aI(n,e){switch(xi[n]){case"NONE":return null;case"tensor_type":return e(new uf.TensorTypeAndShape);case"sequence_type":return e(new sf.SequenceType);case"map_type":return e(new af.MapType);default:return null}}un.unionToTypeInfoValue=aI;function sI(n,e,r){switch(xi[n]){case"NONE":return null;case"tensor_type":return e(r,new uf.TensorTypeAndShape);case"sequence_type":return e(r,new sf.SequenceType);case"map_type":return e(r,new af.MapType);default:return null}}un.unionListToTypeInfoValue=sI});var bo=te(gr=>{"use strict";var uI=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),lI=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),cI=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&uI(e,n,r);return lI(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.TypeInfo=void 0;var dI=cI(Ne()),lf=_u(),vu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+dI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):lf.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,lf.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};gr.TypeInfo=vu});var wu=te(br=>{"use strict";var pI=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),fI=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),hI=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&pI(e,n,r);return fI(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.ValueInfo=void 0;var mI=hI(Ne()),gI=bo(),xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+mI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new gI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};br.ValueInfo=xu});var wi=te(yr=>{"use strict";var bI=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),yI=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),_I=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&bI(e,n,r);return yI(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.Graph=void 0;var vI=_I(Ne()),xI=Us(),wI=Ks(),TI=ru(),II=iu(),SI=go(),$I=wu(),Tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+vI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new SI.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new $I.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new xI.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new wI.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new II.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new TI.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};yr.Graph=Tu});var Ws=te(_r=>{"use strict";var AI=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),OI=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),PI=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&AI(e,n,r);return OI(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.Attribute=void 0;var EI=PI(Ne()),cf=Fs(),df=wi(),pf=go(),Iu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+EI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):cf.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new pf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new df.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new pf.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new df.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,cf.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};_r.Attribute=Iu});var $u=te(vr=>{"use strict";var CI=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),DI=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),kI=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&CI(e,n,r);return DI(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.DeprecatedKernelCreateInfos=void 0;var NI=kI(Ne()),Su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+NI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};vr.DeprecatedKernelCreateInfos=Su});var ff=te(xr=>{"use strict";var LI=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),RI=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),zI=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&LI(e,n,r);return RI(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.DeprecatedNodeIndexAndKernelDefHash=void 0;var MI=zI(Ne()),Au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+MI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};xr.DeprecatedNodeIndexAndKernelDefHash=Au});var Pu=te(wr=>{"use strict";var BI=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),FI=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),VI=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&BI(e,n,r);return FI(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.DeprecatedSubGraphSessionState=void 0;var GI=VI(Ne()),UI=Eu(),Ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+GI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new UI.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};wr.DeprecatedSubGraphSessionState=Ou});var Eu=te(Tr=>{"use strict";var WI=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),HI=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),qI=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&WI(e,n,r);return HI(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.DeprecatedSessionState=void 0;var jI=qI(Ne()),KI=$u(),XI=Pu(),Cu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+jI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new KI.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new XI.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};Tr.DeprecatedSessionState=Cu});var ku=te(Ir=>{"use strict";var ZI=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JI=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),YI=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZI(e,n,r);return JI(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.KernelTypeStrArgsEntry=void 0;var QI=YI(Ne()),e1=Bs(),Du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+QI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new e1.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};Ir.KernelTypeStrArgsEntry=Du});var Lu=te(Sr=>{"use strict";var t1=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),r1=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),n1=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&t1(e,n,r);return r1(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.OpIdKernelTypeStrArgsEntry=void 0;var o1=n1(Ne()),i1=ku(),Nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+o1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new i1.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Sr.OpIdKernelTypeStrArgsEntry=Nu});var zu=te($r=>{"use strict";var a1=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),s1=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),u1=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&a1(e,n,r);return s1(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.KernelTypeStrResolver=void 0;var l1=u1(Ne()),c1=Lu(),Ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+l1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new c1.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};$r.KernelTypeStrResolver=Ru});var Bu=te(Ar=>{"use strict";var d1=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),p1=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),f1=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&d1(e,n,r);return p1(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.OperatorSetId=void 0;var h1=f1(Ne()),Mu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+h1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Ar.OperatorSetId=Mu});var Vu=te(Or=>{"use strict";var m1=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),g1=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),b1=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&m1(e,n,r);return g1(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.StringStringEntry=void 0;var y1=b1(Ne()),Fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+y1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Or.StringStringEntry=Fu});var Uu=te(Pr=>{"use strict";var _1=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),v1=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),x1=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&_1(e,n,r);return v1(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.Model=void 0;var w1=x1(Ne()),T1=wi(),I1=Bu(),S1=Vu(),Gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+w1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new I1.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new T1.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new S1.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Pr.Model=Gu});var hf=te(Er=>{"use strict";var $1=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),A1=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),O1=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&$1(e,n,r);return A1(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.InferenceSession=void 0;var P1=O1(Ne()),E1=zu(),C1=Uu(),Wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+P1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new C1.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new E1.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};Er.InferenceSession=Wu});var D1,k1,Ti,kt,N1,L1,R1,z1,M1,B1,F1,V1,Hu,qu,G1,U1,W1,H1,ju,q1,j1,K1,X1,Z1,J1,Y1,Q1,eS,tS,rS,nS,oS,yo,Ku,iS,Xu,aS,mf=k(()=>{"use strict";D1=_e(Ds()),k1=_e(Bs()),Ti=_e(Ws()),kt=_e(Fs()),N1=_e($u()),L1=_e(ff()),R1=_e(Eu()),z1=_e(Pu()),M1=_e(hu()),B1=_e(pu()),F1=_e(cu()),V1=_e(qs()),Hu=_e(wi()),qu=_e(hf()),G1=_e(ku()),U1=_e(zu()),W1=_e(su()),H1=_e(Uu()),ju=_e(Us()),q1=_e(Ks()),j1=_e(Vs()),K1=_e(Zs()),X1=_e(Lu()),Z1=_e(Bu()),J1=_e(Ys()),Y1=_e(eu()),Q1=_e(ru()),eS=_e(lu()),tS=_e(gu()),rS=_e(iu()),nS=_e(Vu()),oS=_e(go()),yo=_e(mo()),Ku=_e(yu()),iS=_e(bo()),Xu=_e(_u()),aS=_e(wu())});var _o=k(()=>{"use strict";mf()});var bf=te((RD,gf)=>{"use strict";gf.exports=sS;function sS(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var p=new Array(arguments.length-1),f=0;f<p.length;)p[f++]=arguments[f];s.apply(null,p)}};try{n.apply(e||null,r)}catch(l){i&&(i=!1,u(l))}})}});var xf=te(vf=>{"use strict";var Si=vf;Si.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Kn=new Array(64),_f=new Array(123);for(Gt=0;Gt<64;)_f[Kn[Gt]=Gt<26?Gt+65:Gt<52?Gt+71:Gt<62?Gt-4:Gt-59|43]=Gt++;var Gt;Si.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var l=e[r++];switch(s){case 0:i[a++]=Kn[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=Kn[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=Kn[u|l>>6],i[a++]=Kn[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Kn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var yf="invalid encoding";Si.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=_f[u])===void 0)throw Error(yf);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(yf);return t-o};Si.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Tf=te((MD,wf)=>{"use strict";wf.exports=$i;function $i(){this._listeners={}}$i.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};$i.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};$i.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var Ef=te((BD,Pf)=>{"use strict";Pf.exports=If(If);function If(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3]}function i(u,l,c){e[0]=u,l[c]=r[3],l[c+1]=r[2],l[c+2]=r[1],l[c+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],e[0]}function s(u,l){return r[3]=u[l],r[2]=u[l+1],r[1]=u[l+2],r[0]=u[l+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}n.writeFloatLE=e.bind(null,Sf),n.writeFloatBE=e.bind(null,$f);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}n.readFloatLE=r.bind(null,Af),n.readFloatBE=r.bind(null,Of)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3],l[c+4]=r[4],l[c+5]=r[5],l[c+6]=r[6],l[c+7]=r[7]}function i(u,l,c){e[0]=u,l[c]=r[7],l[c+1]=r[6],l[c+2]=r[5],l[c+3]=r[4],l[c+4]=r[3],l[c+5]=r[2],l[c+6]=r[1],l[c+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],r[4]=u[l+4],r[5]=u[l+5],r[6]=u[l+6],r[7]=u[l+7],e[0]}function s(u,l){return r[7]=u[l],r[6]=u[l+1],r[5]=u[l+2],r[4]=u[l+3],r[3]=u[l+4],r[2]=u[l+5],r[1]=u[l+6],r[0]=u[l+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var c;if(a<22250738585072014e-324)c=a/5e-324,t(c>>>0,s,u+o),t((l<<31|c/4294967296)>>>0,s,u+i);else{var p=Math.floor(Math.log(a)/Math.LN2);p===1024&&(p=1023),c=a*Math.pow(2,-p),t(c*4503599627370496>>>0,s,u+o),t((l<<31|p+1023<<20|c*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,Sf,0,4),n.writeDoubleBE=e.bind(null,$f,4,0);function r(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),c=(l>>31)*2+1,p=l>>>20&2047,f=4294967296*(l&1048575)+u;return p===2047?f?NaN:c*(1/0):p===0?c*5e-324*f:c*Math.pow(2,p-1075)*(f+4503599627370496)}n.readDoubleLE=r.bind(null,Af,0,4),n.readDoubleBE=r.bind(null,Of,4,0)}(),n}function Sf(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function $f(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Af(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function Of(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Cf=te((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var kf=te(Df=>{"use strict";var Zu=Df;Zu.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};Zu.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};Zu.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Lf=te((VD,Nf)=>{"use strict";Nf.exports=uS;function uS(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var zf=te((GD,Rf)=>{"use strict";Rf.exports=it;var vo=cn();function it(n,e){this.lo=n>>>0,this.hi=e>>>0}var In=it.zero=new it(0,0);In.toNumber=function(){return 0};In.zzEncode=In.zzDecode=function(){return this};In.length=function(){return 1};var lS=it.zeroHash="\0\0\0\0\0\0\0\0";it.fromNumber=function(e){if(e===0)return In;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new it(t,o)};it.from=function(e){if(typeof e=="number")return it.fromNumber(e);if(vo.isString(e))if(vo.Long)e=vo.Long.fromString(e);else return it.fromNumber(parseInt(e,10));return e.low||e.high?new it(e.low>>>0,e.high>>>0):In};it.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};it.prototype.toLong=function(e){return vo.Long?new vo.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var ln=String.prototype.charCodeAt;it.fromHash=function(e){return e===lS?In:new it((ln.call(e,0)|ln.call(e,1)<<8|ln.call(e,2)<<16|ln.call(e,3)<<24)>>>0,(ln.call(e,4)|ln.call(e,5)<<8|ln.call(e,6)<<16|ln.call(e,7)<<24)>>>0)};it.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};it.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};it.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};it.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var cn=te(Ju=>{"use strict";var oe=Ju;oe.asPromise=bf();oe.base64=xf();oe.EventEmitter=Tf();oe.float=Ef();oe.inquire=Cf();oe.utf8=kf();oe.pool=Lf();oe.LongBits=zf();oe.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);oe.global=oe.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Ju;oe.emptyArray=Object.freeze?Object.freeze([]):[];oe.emptyObject=Object.freeze?Object.freeze({}):{};oe.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};oe.isString=function(e){return typeof e=="string"||e instanceof String};oe.isObject=function(e){return e&&typeof e=="object"};oe.isset=oe.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};oe.Buffer=function(){try{var n=oe.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();oe._Buffer_from=null;oe._Buffer_allocUnsafe=null;oe.newBuffer=function(e){return typeof e=="number"?oe.Buffer?oe._Buffer_allocUnsafe(e):new oe.Array(e):oe.Buffer?oe._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};oe.Array=typeof Uint8Array<"u"?Uint8Array:Array;oe.Long=oe.global.dcodeIO&&oe.global.dcodeIO.Long||oe.global.Long||oe.inquire("long");oe.key2Re=/^true|false|0|1$/;oe.key32Re=/^-?(?:0|[1-9][0-9]*)$/;oe.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;oe.longToHash=function(e){return e?oe.LongBits.from(e).toHash():oe.LongBits.zeroHash};oe.longFromHash=function(e,r){var t=oe.LongBits.fromHash(e);return oe.Long?oe.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Mf(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}oe.merge=Mf;oe.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Bf(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Mf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}oe.newError=Bf;oe.ProtocolError=Bf("ProtocolError");oe.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};oe.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};oe.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};oe._configure=function(){var n=oe.Buffer;if(!n){oe._Buffer_from=oe._Buffer_allocUnsafe=null;return}oe._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},oe._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var ol=te((WD,Uf)=>{"use strict";Uf.exports=Pe;var Nt=cn(),Yu,Ai=Nt.LongBits,Ff=Nt.base64,Vf=Nt.utf8;function xo(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function el(){}function cS(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function Pe(){this.len=0,this.head=new xo(el,0,0),this.tail=this.head,this.states=null}var Gf=function(){return Nt.Buffer?function(){return(Pe.create=function(){return new Yu})()}:function(){return new Pe}};Pe.create=Gf();Pe.alloc=function(e){return new Nt.Array(e)};Nt.Array!==Array&&(Pe.alloc=Nt.pool(Pe.alloc,Nt.Array.prototype.subarray));Pe.prototype._push=function(e,r,t){return this.tail=this.tail.next=new xo(e,r,t),this.len+=r,this};function tl(n,e,r){e[r]=n&255}function dS(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function rl(n,e){this.len=n,this.next=void 0,this.val=e}rl.prototype=Object.create(xo.prototype);rl.prototype.fn=dS;Pe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new rl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Pe.prototype.int32=function(e){return e<0?this._push(nl,10,Ai.fromNumber(e)):this.uint32(e)};Pe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function nl(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}Pe.prototype.uint64=function(e){var r=Ai.from(e);return this._push(nl,r.length(),r)};Pe.prototype.int64=Pe.prototype.uint64;Pe.prototype.sint64=function(e){var r=Ai.from(e).zzEncode();return this._push(nl,r.length(),r)};Pe.prototype.bool=function(e){return this._push(tl,1,e?1:0)};function Qu(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}Pe.prototype.fixed32=function(e){return this._push(Qu,4,e>>>0)};Pe.prototype.sfixed32=Pe.prototype.fixed32;Pe.prototype.fixed64=function(e){var r=Ai.from(e);return this._push(Qu,4,r.lo)._push(Qu,4,r.hi)};Pe.prototype.sfixed64=Pe.prototype.fixed64;Pe.prototype.float=function(e){return this._push(Nt.float.writeFloatLE,4,e)};Pe.prototype.double=function(e){return this._push(Nt.float.writeDoubleLE,8,e)};var pS=Nt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};Pe.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(tl,1,0);if(Nt.isString(e)){var t=Pe.alloc(r=Ff.length(e));Ff.decode(e,t,0),e=t}return this.uint32(r)._push(pS,r,e)};Pe.prototype.string=function(e){var r=Vf.length(e);return r?this.uint32(r)._push(Vf.write,r,e):this._push(tl,1,0)};Pe.prototype.fork=function(){return this.states=new cS(this),this.head=this.tail=new xo(el,0,0),this.len=0,this};Pe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new xo(el,0,0),this.len=0),this};Pe.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};Pe.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};Pe._configure=function(n){Yu=n,Pe.create=Gf(),Yu._configure()}});var qf=te((HD,Hf)=>{"use strict";Hf.exports=Cr;var Wf=ol();(Cr.prototype=Object.create(Wf.prototype)).constructor=Cr;var dn=cn();function Cr(){Wf.call(this)}Cr._configure=function(){Cr.alloc=dn._Buffer_allocUnsafe,Cr.writeBytesBuffer=dn.Buffer&&dn.Buffer.prototype instanceof Uint8Array&&dn.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};Cr.prototype.bytes=function(e){dn.isString(e)&&(e=dn._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(Cr.writeBytesBuffer,r,e),this};function fS(n,e,r){n.length<40?dn.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}Cr.prototype.string=function(e){var r=dn.Buffer.byteLength(e);return this.uint32(r),r&&this._push(fS,r,e),this};Cr._configure()});var sl=te((qD,Jf)=>{"use strict";Jf.exports=Je;var Ut=cn(),al,Xf=Ut.LongBits,hS=Ut.utf8;function Wt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function Je(n){this.buf=n,this.pos=0,this.len=n.length}var jf=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Je(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Je(e);throw Error("illegal buffer")},Zf=function(){return Ut.Buffer?function(r){return(Je.create=function(o){return Ut.Buffer.isBuffer(o)?new al(o):jf(o)})(r)}:jf};Je.create=Zf();Je.prototype._slice=Ut.Array.prototype.subarray||Ut.Array.prototype.slice;Je.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Wt(this,10);return e}}();Je.prototype.int32=function(){return this.uint32()|0};Je.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function il(){var n=new Xf(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Wt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw Wt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}Je.prototype.bool=function(){return this.uint32()!==0};function Oi(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}Je.prototype.fixed32=function(){if(this.pos+4>this.len)throw Wt(this,4);return Oi(this.buf,this.pos+=4)};Je.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Wt(this,4);return Oi(this.buf,this.pos+=4)|0};function Kf(){if(this.pos+8>this.len)throw Wt(this,8);return new Xf(Oi(this.buf,this.pos+=4),Oi(this.buf,this.pos+=4))}Je.prototype.float=function(){if(this.pos+4>this.len)throw Wt(this,4);var e=Ut.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Je.prototype.double=function(){if(this.pos+8>this.len)throw Wt(this,4);var e=Ut.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Je.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw Wt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=Ut.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};Je.prototype.string=function(){var e=this.bytes();return hS.read(e,0,e.length)};Je.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Wt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Wt(this);while(this.buf[this.pos++]&128);return this};Je.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};Je._configure=function(n){al=n,Je.create=Zf(),al._configure();var e=Ut.Long?"toLong":"toNumber";Ut.merge(Je.prototype,{int64:function(){return il.call(this)[e](!1)},uint64:function(){return il.call(this)[e](!0)},sint64:function(){return il.call(this).zzDecode()[e](!1)},fixed64:function(){return Kf.call(this)[e](!0)},sfixed64:function(){return Kf.call(this)[e](!1)}})}});var th=te((jD,eh)=>{"use strict";eh.exports=Sn;var Qf=sl();(Sn.prototype=Object.create(Qf.prototype)).constructor=Sn;var Yf=cn();function Sn(n){Qf.call(this,n)}Sn._configure=function(){Yf.Buffer&&(Sn.prototype._slice=Yf.Buffer.prototype.slice)};Sn.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Sn._configure()});var nh=te((KD,rh)=>{"use strict";rh.exports=wo;var ul=cn();(wo.prototype=Object.create(ul.EventEmitter.prototype)).constructor=wo;function wo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");ul.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}wo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return ul.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return a.emit("error",c,e),i(c)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};wo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var ih=te(oh=>{"use strict";var mS=oh;mS.Service=nh()});var sh=te((ZD,ah)=>{"use strict";ah.exports={}});var ch=te(lh=>{"use strict";var _t=lh;_t.build="minimal";_t.Writer=ol();_t.BufferWriter=qf();_t.Reader=sl();_t.BufferReader=th();_t.util=cn();_t.rpc=ih();_t.roots=sh();_t.configure=uh;function uh(){_t.util._configure(),_t.Writer._configure(_t.BufferWriter),_t.Reader._configure(_t.BufferReader)}uh()});var ph=te((YD,dh)=>{"use strict";dh.exports=ch()});var Xn=te((QD,fh)=>{"use strict";var Ue=ph(),H=Ue.Reader,Ye=Ue.Writer,O=Ue.util,S=Ue.roots.default||(Ue.roots.default={});S.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=O.Long?O.Long.fromBits(0,0,!1):0,e.prototype.s=O.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=O.emptyArray,e.prototype.ints=O.emptyArray,e.prototype.strings=O.emptyArray,e.prototype.tensors=O.emptyArray,e.prototype.graphs=O.emptyArray,e.prototype.sparseTensors=O.emptyArray,e.prototype.typeProtos=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!O.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!O.isInteger(t.i)&&!(t.i&&O.isInteger(t.i.low)&&O.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||O.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!O.isInteger(t.ints[i])&&!(t.ints[i]&&O.isInteger(t.ints[i].low)&&O.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||O.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(O.Long?(o.i=O.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new O.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?O.base64.decode(t.s,o.s=O.newBuffer(O.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)O.Long?(o.ints[i]=O.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new O.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?O.base64.decode(t.strings[i],o.strings[i]=O.newBuffer(O.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,O.Long){var a=new O.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=O.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?O.Long.prototype.toString.call(t.i):o.longs===Number?new O.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?O.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?O.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new O.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?O.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=S.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=S.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=S.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=O.emptyArray,e.prototype.output=O.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=O.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!O.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!O.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!O.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!O.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=S.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=O.emptyArray,e.prototype.updateBinding=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=O.Long?O.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=O.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=O.Long?O.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=O.emptyArray,e.prototype.trainingInfo=O.emptyArray,e.prototype.functions=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!O.isInteger(t.irVersion)&&!(t.irVersion&&O.isInteger(t.irVersion.low)&&O.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!O.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!O.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!O.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!O.isInteger(t.modelVersion)&&!(t.modelVersion&&O.isInteger(t.modelVersion.low)&&O.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(O.Long?(o.irVersion=O.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new O.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(O.Long?(o.modelVersion=O.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new O.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(O.Long){var a=new O.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",O.Long){var a=new O.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?O.Long.prototype.toString.call(t.irVersion):o.longs===Number?new O.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?O.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new O.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=S.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!O.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!O.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!O.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=O.emptyArray,e.prototype.name="",e.prototype.initializer=O.emptyArray,e.prototype.sparseInitializer=O.emptyArray,e.prototype.docString="",e.prototype.input=O.emptyArray,e.prototype.output=O.emptyArray,e.prototype.valueInfo=O.emptyArray,e.prototype.quantizationAnnotation=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=S.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=S.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=S.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=S.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=O.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=O.emptyArray,e.prototype.int32Data=O.emptyArray,e.prototype.stringData=O.emptyArray,e.prototype.int64Data=O.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=O.newBuffer([]),e.prototype.externalData=O.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=O.emptyArray,e.prototype.uint64Data=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!O.isInteger(t.dims[o])&&!(t.dims[o]&&O.isInteger(t.dims[o].low)&&O.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!O.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!O.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||O.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!O.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&O.isInteger(t.int64Data[o].low)&&O.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||O.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!O.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&O.isInteger(t.uint64Data[o].low)&&O.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)O.Long?(o.dims[i]=O.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new O.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?O.base64.decode(t.stringData[i],o.stringData[i]=O.newBuffer(O.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)O.Long?(o.int64Data[i]=O.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new O.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?O.base64.decode(t.rawData,o.rawData=O.newBuffer(O.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)O.Long?(o.uint64Data[i]=O.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new O.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=O.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?O.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new O.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?O.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?O.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new O.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?O.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?O.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new O.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=S.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=O.Long?O.Long.fromBits(0,0,!1):0,r.prototype.end=O.Long?O.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=Ye.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof H||(o=H.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof H||(o=new H(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!O.isInteger(o.begin)&&!(o.begin&&O.isInteger(o.begin.low)&&O.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!O.isInteger(o.end)&&!(o.end&&O.isInteger(o.end.low)&&O.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(O.Long?(i.begin=O.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new O.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(O.Long?(i.end=O.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new O.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(O.Long){var s=new O.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(O.Long){var s=new O.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?O.Long.prototype.toString.call(o.begin):i.longs===Number?new O.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?O.Long.prototype.toString.call(o.end):i.longs===Number?new O.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!O.isInteger(t.dims[i])&&!(t.dims[i]&&O.isInteger(t.dims[i].low)&&O.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)O.Long?(o.dims[i]=O.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new O.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?O.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new O.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=O.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:O.oneOfGetter(t=["dimValue","dimParam"]),set:O.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=Ye.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},r.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!O.isInteger(i.dimValue)&&!(i.dimValue&&O.isInteger(i.dimValue.low)&&O.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!O.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!O.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var a=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(O.Long?(a.dimValue=O.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new O.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?O.Long.prototype.toString.call(i.dimValue):a.longs===Number?new O.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:O.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:O.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Ye.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof H||(o=H.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof H||(o=new H(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!O.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!O.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var a=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var a=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Ye.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!O.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=S.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var a=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=S.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var a=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof H||(i=H.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof H||(i=new H(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!O.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var a=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=O.Long?O.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!O.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!O.isInteger(t.version)&&!(t.version&&O.isInteger(t.version.low)&&O.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(O.Long?(o.version=O.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new O.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",O.Long){var a=new O.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?O.Long.prototype.toString.call(t.version):o.longs===Number?new O.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=O.emptyArray,e.prototype.output=O.emptyArray,e.prototype.attribute=O.emptyArray,e.prototype.attributeProto=O.emptyArray,e.prototype.node=O.emptyArray,e.prototype.docString="",e.prototype.opsetImport=O.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof H||(t=H.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof H||(t=new H(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!O.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!O.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!O.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!O.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!O.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!O.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=S.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();fh.exports=S});function Zn(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Io(n){return new TextDecoder().decode(n)}var We,$n,ll,ft,Pi,lt,vt,Q,To,An,On,Pn,Le=k(()=>{"use strict";Cs();We=_e(Xn());En();$n=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},ll=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},ft=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=ll.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;s[a-u]=Math.max(l,c)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!Q.areEqual(a,e.dims))return;let s=Q.size(a),u=o?e:new et(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let l=new Array(a.length),c=new Array(e.dims.length),p=new Array(r.dims.length),f=0,m=0,g=!1,b=!1;e.dims.length===0&&(f=e.get([]),g=!0),r.dims.length===0&&(m=r.get([]),b=!0);let w;for(let _=0;_<s;_++){w=_;for(let x=a.length-1;x>=0;x--)l[x]=w%a[x],w=Math.floor(w/a[x]);g||(n.fillIndex(l,e.dims,c),f=e.get(c)),b||(n.fillIndex(l,r.dims,p),m=r.get(p)),u.set(l,t(f,m))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Pi=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!ft.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},lt=class n{static tensorDataTypeFromProto(e){switch(e){case We.onnx.TensorProto.DataType.INT8:return"int8";case We.onnx.TensorProto.DataType.UINT8:return"uint8";case We.onnx.TensorProto.DataType.BOOL:return"bool";case We.onnx.TensorProto.DataType.INT16:return"int16";case We.onnx.TensorProto.DataType.UINT16:return"uint16";case We.onnx.TensorProto.DataType.INT32:return"int32";case We.onnx.TensorProto.DataType.UINT32:return"uint32";case We.onnx.TensorProto.DataType.FLOAT:return"float32";case We.onnx.TensorProto.DataType.DOUBLE:return"float64";case We.onnx.TensorProto.DataType.STRING:return"string";case We.onnx.TensorProto.DataType.INT64:return"int32";case We.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${We.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return We.onnx.TensorProto.DataType.INT8;case"uint8":return We.onnx.TensorProto.DataType.UINT8;case"bool":return We.onnx.TensorProto.DataType.BOOL;case"int16":return We.onnx.TensorProto.DataType.INT16;case"uint16":return We.onnx.TensorProto.DataType.UINT16;case"int32":return We.onnx.TensorProto.DataType.INT32;case"uint32":return We.onnx.TensorProto.DataType.UINT32;case"float32":return We.onnx.TensorProto.DataType.FLOAT;case"float64":return We.onnx.TensorProto.DataType.DOUBLE;case"string":return We.onnx.TensorProto.DataType.STRING;case"int64":return We.onnx.TensorProto.DataType.INT64;case"uint64":return We.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>sn.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(vt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},vt=class{static longToNumber(e){return sn.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return sn.isLong(e)||typeof e=="bigint"}},Q=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},To=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},An=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},On=-34028234663852886e22,Pn=34028234663852886e22});function gS(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function hh(n){switch(n){case xe.onnx.TensorProto.DataType.UINT8:case xe.onnx.TensorProto.DataType.INT8:case xe.onnx.TensorProto.DataType.BOOL:return 1;case xe.onnx.TensorProto.DataType.UINT16:case xe.onnx.TensorProto.DataType.INT16:return 2;case xe.onnx.TensorProto.DataType.FLOAT:case xe.onnx.TensorProto.DataType.INT32:case xe.onnx.TensorProto.DataType.UINT32:return 4;case xe.onnx.TensorProto.DataType.INT64:case xe.onnx.TensorProto.DataType.DOUBLE:case xe.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${xe.onnx.TensorProto.DataType[n]}`)}}function bS(n,e){return new(bh(e))(n)}function bh(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function cl(n,e){if(e===xe.onnx.TensorProto.DataType.INT64||e===yo.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===xe.onnx.TensorProto.DataType.UINT32||e===yo.TensorDataType.UINT32||e===xe.onnx.TensorProto.DataType.UINT64||e===yo.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${xe.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function mh(n,e,r){switch(e){case xe.onnx.TensorProto.DataType.BOOL:case xe.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case xe.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case xe.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case xe.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case xe.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case xe.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case xe.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case xe.onnx.TensorProto.DataType.INT64:return cl(sn.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case xe.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case xe.onnx.TensorProto.DataType.UINT64:return cl(sn.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${xe.onnx.TensorProto.DataType[e]}`)}}var gh,xe,et,En=k(()=>{"use strict";gh=_e(Dp());Cs();_o();xe=_e(Xn());Le();et=class n{constructor(e,r,t,o,i,a=gh.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=Q.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=bh(r);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*gS(r));this.cache=bS(l,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[Q.indicesToOffset(e,this.strides)]}set(e,r){this.data[Q.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=Q.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=lt.tensorDataTypeFromProto(e.dataType),t=lt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Io(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=hh(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=mh(a,e.dataType,l*s);i[l]=c}}else{let i;switch(e.dataType){case xe.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case xe.onnx.TensorProto.DataType.INT32:case xe.onnx.TensorProto.DataType.INT16:case xe.onnx.TensorProto.DataType.UINT16:case xe.onnx.TensorProto.DataType.INT8:case xe.onnx.TensorProto.DataType.UINT8:case xe.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case xe.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case xe.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case xe.onnx.TensorProto.DataType.UINT32:case xe.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];sn.isLong(u)?a[s]=cl(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=lt.tensorDimsFromORTFormat(e),t=lt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=hh(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=mh(a,e.dataType(),l*s);i[l]=c}}return o}}});function ie(n){return n===1?yS:_S}function yh(n){let e=ie(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function _h(n){let e=ie(n);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function vh(n,e){let r=ie(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var yS,_S,Ke=k(()=>{"use strict";yS={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},_S={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Se=k(()=>{"use strict"});async function dl(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Ei(n){return Zn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function xh(n){return Zn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function Jn(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function Yn(n,e){return e.map(r=>n[r]).join(", ")}function ht(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function Ht(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Dr=k(()=>{"use strict";Le()});function vS(n,e){return Ht(e).map(r=>`${n}.${r}`)}function Qn(n,e){return e===1?[n]:vS(n,e)}function kr(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var Cn=k(()=>{"use strict";Dr()});function wS(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function TS(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function IS(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var wh,xS,Th,Ih=k(()=>{"use strict";Ke();Se();Dr();Cn();wh={name:"pack",inputNames:["A"],inputTypes:[1]},xS=(n,e)=>{let r=ie(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=ht(i),s=Qn("rc",i),u=IS(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=wS(i,l,s),p=TS(t,s),f=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${c}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${p});
          }
        }
      `;return{...wh,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:f}},Th=(n,e)=>({...wh,get:()=>xS(n,e)})});function pl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function $h(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function AS(n){let e=Q.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function OS(n){let e=Q.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var SS,$S,Sh,Ah=k(()=>{"use strict";Le();Ke();Se();Cn();SS=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),$S=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=ie(n.session.backend.glContext.version),u=`
      ${AS(o)}
      ${OS(i)}
      ${kr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Sh=(n,e,r)=>{let t=SS(r);return{...t,get:()=>$S(n,e,t,r)}}});var fl,Oh=k(()=>{"use strict";Ke();Se();fl=(n,e)=>{let r=e.shape,t=ie(n.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function ES(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Ph,PS,Eh,Ch=k(()=>{"use strict";Ke();Se();Dr();Cn();Ph={name:"unpack",inputNames:["A"],inputTypes:[2]},PS=(n,e)=>{let r=e.dims.length,t=Qn("rc",r),o=t.slice(-2),i=ht(r),a=kr(),u=e.dims.length===0?"":ES(r,t),l=r<=1?"rc":`vec2(${o.join(",")})`,c=ie(n.session.backend.glContext.version),p=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Ph,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:p}},Eh=(n,e)=>({...Ph,get:()=>PS(n,e)})});var Ci,So,Di,$o=k(()=>{"use strict";Pt();Ci=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(ze.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(ze.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},So=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(ze.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Di=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Ao,Dh,hl,kh=k(()=>{"use strict";Le();Se();Ao=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return hl(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},Dh=(n,e,r)=>{let t=Ao(n,e,r);return[t.width,t.height]},hl=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:l,strides:Q.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var DS,ki,Lh=k(()=>{"use strict";Pt();En();Le();Ih();Ah();Oh();Ch();$o();kh();Se();DS=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},ki=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return Dh(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(r[l],e.inputTypes[l]);let o=DS(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Ao(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Ao(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=Ao(this.session.layoutStrategy,u,r),c=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let p=s[0],f=s[1]*s[2]*s[3],m=Math.ceil(f*1/4)*4,g=p*m;c=new Float32Array(g);for(let b=0;b<p;++b){let w=b*f,_=b*m+b%1*f;c.set(e.numberData.subarray(w,w+f),_)}}return this.createTextureData(l,e.type,c,e,1)}}if(r===2){let i=hl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){ze.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:Q.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if($h(e.dims,r)){let l={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:Q.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=pl(e.dims),i=pl(r),a=this.reshapePacked(e,o),s=this.run(Sh(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new et(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(fl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(fl(this,e))}pack(e){return this.executeProgram(Th(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Eh(this,e.tensor),[e.tensor])}}});var ml,ve,at=k(()=>{"use strict";ml=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=n=>new ml(n)});var Rh,zh,Mh,kS,NS,Bh=k(()=>{"use strict";at();Ke();Se();Rh={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},zh=(n,e,r)=>(NS(e),[n.run({...Rh,cacheHint:r.cacheKey,get:()=>kS(n,e,r)},e)]),Mh=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return ve({epsilon:e,momentum:r,spatial:t})},kS=(n,e,r)=>{let t=ie(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Rh,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},NS=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Ni,Lt,X,Oo,Li,jr=k(()=>{"use strict";Ni=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Lt=class{constructor(e){this.context=e}},X=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},Oo=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Li=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function RS(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function zS(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function MS(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function BS(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function FS(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function VS(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function GS(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function US(){let n="and_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:n,type:0}}function WS(){let n="or_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:n,type:0}}function HS(){let n="xor_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:n,type:0}}function qS(){return KS("pow")}function jS(){let n="prelu_";return{body:`
  float ${n}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:n,type:0}}function KS(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var Rt,XS,Fh,Vh,Gh,Uh,Wh,Hh,qh,jh,Kh,Xh,Zh,Jh,Yh=k(()=>{"use strict";Le();jr();Ke();Se();Rt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>XS(n,e,r,t)}},XS=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!Q.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let c=ft.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");a=c;let p=a.length,f=e[0].dims.length!==0?e[0].dims.length:1,m=e[1].dims.length!==0?e[1].dims.length:1,g=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",b=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",w=ie(n.session.backend.glContext.version),_=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${w.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${p}]) {
        int aindices[${f}];
        int bindices[${m}];
        ${g}
        ${b}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:_,hasMain:s}}let u=ie(n.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Fh=(n,e)=>[n.run(Rt(n,e,RS()),e)],Vh=(n,e)=>[n.run(Rt(n,e,US(),"bool"),e)],Gh=(n,e)=>[n.run(Rt(n,e,zS()),e)],Uh=(n,e)=>[n.run(Rt(n,e,FS(),"bool"),e)],Wh=(n,e)=>[n.run(Rt(n,e,VS(),"bool"),e)],Hh=(n,e)=>[n.run(Rt(n,e,GS(),"bool"),e)],qh=(n,e)=>[n.run(Rt(n,e,MS()),e)],jh=(n,e)=>[n.run(Rt(n,e,WS(),"bool"),e)],Kh=(n,e)=>[n.run(Rt(n,e,qS()),e)],Xh=(n,e)=>[n.run(Rt(n,e,jS()),e)],Zh=(n,e)=>[n.run(Rt(n,e,BS()),e)],Jh=(n,e)=>[n.run(Rt(n,e,HS(),"bool"),e)]});var Qh,em,JS,tm=k(()=>{"use strict";Le();Qh=(n,e,r)=>(JS(e),[n.cast(e[0],r)]),em=n=>lt.tensorDataTypeFromProto(n.attributes.getInt("to")),JS=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var YS,QS,rm,Ri,nm=k(()=>{"use strict";Ke();Se();Dr();Cn();YS=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),QS=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let A=1;A<r.length;A++){let P=r[A].dims.slice();for(let N=0;N<o.length;N++)if(N===t)i[t]+=P[N];else if(o[N]!==P[N])throw new Error("non concat dimensions must match")}let a=i.length,s=Qn("coords",a),u=ht(a),l=kr(),c=r.map(A=>A.dims),p=Ht(a),f=new Array(c.length-1);f[0]=c[0][t];for(let A=1;A<f.length;A++)f[A]=f[A-1]+c[A][t];let m=p[t],g=p.slice(-2),b=p.join(),w=`if (${m} < ${f[0]}) {
        return getChannel(
            getX0(${b}), vec2(${g.join()}));
        }`;for(let A=1;A<f.length;A++){let P=f[A-1];w+=`
            if (${m} < ${f[A]}  && ${m} >= ${f[A-1]}) {
              return getChannel(
                getX${A}(${Ri(p,m,P)}),
                vec2(${Ri(g,m,P)}));
            }`}let _=f.length,x=f[f.length-1];w+=`
            return getChannel(
              getX${_}(${Ri(p,m,x)}),
              vec2(${Ri(g,m,x)}));`;let I=ie(n.session.backend.glContext.version),$=`
          ${l}
          float getValue(${p.map(A=>"int "+A)}) {
            ${w}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[a-1]};
            coords.${p[a-1]} = coords.${p[a-2]};
            coords.${p[a-2]} = lastDim;

            vec4 result = vec4(getValue(${s}), 0., 0., 0.);

            ${s[a-1]} = ${s[a-1]} + 1;
            if (${s[a-1]} < ${i[a-1]}) {
              result.g = getValue(${s});
            }

            ${s[a-2]} = ${s[a-2]} + 1;
            if (${s[a-2]} < ${i[a-2]}) {
              result.a = getValue(${s});
            }

            ${s[a-1]} = ${s[a-1]} - 1;
            if (${s[a-2]} < ${i[a-2]} &&
                ${s[a-1]} < ${i[a-1]}) {
              result.b = getValue(${s});
            }
            ${I.output} = result;
          }
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:$,hasMain:!0}},rm=(n,e,r)=>{let t=YS(e.length,r.cacheKey);return{...t,get:()=>QS(n,t,e,r.axis)}},Ri=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var om,e$,t$,r$,im,n$,o$,i$,am,a$,sm=k(()=>{"use strict";at();Se();nm();om=(n,e,r)=>(a$(e),n.session.pack&&e[0].dims.length>1?[n.run(rm(n,e,r),e)]:[n.run(r$(n,e,r),e)]),e$=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),t$=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let m=1;m<r.length;m++){let g=r[m].dims.slice();for(let b=0;b<o.length;b++)if(b===t)i[t]+=g[b];else if(o[b]!==g[b])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let m=0;m<s.length;++m)u+=r[m].dims[t],s[m]=u;let l="";r.length<5?l=im(s):l=n$(s);let c=o$(r.length,a),p=i$(s),f=`
        ${c}
        ${p}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:f}},r$=(n,e,r)=>{let t=e$(e.length,r.cacheKey);return{...t,get:()=>t$(n,t,e,r.axis)}},im=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,n$=n=>im(n),o$=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},i$=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},am=n=>ve({axis:n.attributes.getInt("axis")}),a$=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function s$(){return zt("abs")}function u$(){return zt("acos")}function l$(){return zt("asin")}function c$(){return zt("atan")}function d$(){return zt("ceil")}function p$(){return zt("cos")}function f$(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function h$(){return zt("exp")}function m$(){return zt("floor")}function gl(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function g$(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function b$(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function y$(){return zt("log")}function _$(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function v$(){let n="not";return{body:`
  float ${n}_(float a) {
    return float( ! bool(a) );
  }
  bool ${n}_(bool a) {
    return !a;
  }
  vec4 ${n}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${n}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:n,type:0}}function x$(){return zt("sin")}function bl(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function yl(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function w$(){return zt("sqrt")}function T$(){return zt("tan")}function I$(){let n="tanh";return{body:`
  float ${n}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${n}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:n,type:0}}function zt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var S$,Qe,um,lm,cm,dm,_l,pm,fm,$$,hm,mm,gm,bm,ym,_m,vl,vm,xm,wm,Tm,Im,Sm,$m,Am,Om,Pm,Em,xl=k(()=>{"use strict";at();Le();jr();Ke();Se();S$=(n,e,r,t)=>{let o=n.session.pack?2:0,i=ie(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},Qe=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>S$(n,i,e,r)}},um=(n,e)=>[n.run(Qe(n,e[0],s$()),e)],lm=(n,e)=>[n.run(Qe(n,e[0],u$()),e)],cm=(n,e)=>[n.run(Qe(n,e[0],l$()),e)],dm=(n,e)=>[n.run(Qe(n,e[0],c$()),e)],_l=(n,e,r)=>[n.run(Qe(n,e[0],gl(r.min,r.max),r.cacheKey),e)],pm=n=>ve({min:n.attributes.getFloat("min",On),max:n.attributes.getFloat("max",Pn)}),fm=(n,e)=>{let r=$$(n,e);return _l(n,[e[0]],r)},$$=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:On,t=e.length>=3?e[2].numberData[0]:Pn;return ve({min:r,max:t})},hm=(n,e)=>[n.run(Qe(n,e[0],d$()),e)],mm=(n,e)=>[n.run(Qe(n,e[0],p$()),e)],gm=(n,e,r)=>[n.run(Qe(n,e[0],f$(r.alpha),r.cacheKey),e)],bm=n=>ve({alpha:n.attributes.getFloat("alpha",1)}),ym=(n,e)=>[n.run(Qe(n,e[0],h$()),e)],_m=(n,e)=>[n.run(Qe(n,e[0],m$()),e)],vl=(n,e)=>[n.run(Qe(n,e[0],g$()),e)],vm=(n,e,r)=>[n.run(Qe(n,e[0],b$(r.alpha),r.cacheKey),e)],xm=n=>ve({alpha:n.attributes.getFloat("alpha",.01)}),wm=(n,e)=>[n.run(Qe(n,e[0],y$()),e)],Tm=(n,e)=>[n.run(Qe(n,e[0],_$()),e)],Im=(n,e)=>[n.run(Qe(n,e[0],v$()),e)],Sm=(n,e)=>[n.run(Qe(n,e[0],bl()),e)],$m=(n,e)=>[n.run(Qe(n,e[0],yl()),e)],Am=(n,e)=>[n.run(Qe(n,e[0],x$()),e)],Om=(n,e)=>[n.run(Qe(n,e[0],w$()),e)],Pm=(n,e)=>[n.run(Qe(n,e[0],T$()),e)],Em=(n,e)=>[n.run(Qe(n,e[0],I$()),e)]});function Nr(n){let e;switch(n.activation){case"Relu":e=bl();break;case"Sigmoid":e=yl();break;case"Clip":e=gl(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var eo,Dn=k(()=>{"use strict";Le();xl();eo=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[On,Pn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var O$,P$,Cm,Dm=k(()=>{"use strict";Pt();Ke();Se();zi();Dn();O$=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),P$=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;ze.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=to(a,s,t.dilations,t.pads,t.strides),c=ie(n.session.backend.glContext.version),{activationFunction:p,applyActivation:f}=Nr(t),m=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${a[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${a[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${f}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},Cm=(n,e,r)=>{let t=O$(e.length>2,r.cacheKey);return{...t,get:()=>P$(n,e,t,r)}}});var E$,C$,km,Nm=k(()=>{"use strict";Ke();Se();Cn();E$=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),C$=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,l=3,c=o.length,p=[s[1]*s[2]*s[3],o[2]*o[3]],f=s[2]*s[3],m=kr(),g=ie(n.session.backend.glContext.version),b="";for(let _=0;_<=1;_++)for(let x=0;x<=1;x++)b+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${_};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${f}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${f}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${f}.);
                    innerDims = vec2(d0, d1);
                    result[${_*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let w=`
      ${m}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${b}
          ${g.output} = result;
      }
            `;return{...e,output:{dims:p,type:r.type,textureType:2},shaderSource:w,hasMain:!0}},km=(n,e,r,t,o)=>{let i=E$(o.cacheKey);return{...i,get:()=>C$(n,i,e,r,t,o)}}});function k$(n,e,r){let t=e[0].dims,o=e[1].dims,i=ft.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=ht(i.length),s=Ht(),{activationFunction:u,applyActivation:l}=Nr(r),c=e.length>2,p=c?"value += getBiasForMatmul();":"",f=c?`${Tl(a,s,e[2].dims,i,!1)}`:"",m=i.length,g=t.length,b=o.length,w=t[t.length-1],_=`
    ${u}
    ${f}
    float process(int indices[${m}]) {
        int a[${g}];
        int b[${b}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${w}; ++k) {
            a[${g-1}] = k;
            b[${b-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:_}}function wl(n,e){let r=D$(n.length>2,e.activationCacheKey);return{...r,get:()=>k$(r,n,e)}}function Tl(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((b,w)=>`coords.${e[w+u]}`).join(", ");let c=ft.getBroadcastDims(r,t).map(b=>`coords.${e[b+u]} = 0;`).join(`
`),f=Q.size(r)===1,m="vec4(outputValue.xx, outputValue.yy)";return f&&(m="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${m};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var Lm,Rm,D$,N$,Mi=k(()=>{"use strict";Le();Se();Dr();Dn();Il();Lm=(n,e,r)=>(N$(e),n.session.pack?[n.run(Bi(n,e,r),e)]:[n.run(wl(e,r),e)]),Rm=n=>eo(n.attributes),D$=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});N$=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function z$(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,c=t.length,p=c-u,f=c-l;o=a.map((I,$)=>`coords.${e[$+p]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,$)=>`coords.${e[$+f]}`),i[l-2]="i*2",i.join(", ");let m=ft.getBroadcastDims(a,t),g=ft.getBroadcastDims(s,t),b=m.map(I=>`coords.${e[I+p]} = 0;`).join(`
`),w=g.map(I=>`coords.${e[I+f]} = 0;`).join(`
`),_=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${_}
  ${b}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${_}
  ${w}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function M$(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function B$(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var L$,R$,Bi,Il=k(()=>{"use strict";Le();Ke();Se();Dr();Dn();Mi();L$=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),R$=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=ft.calcShape(a,s,!0),l=!Q.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=a[a.length-1],p=Math.ceil(c/2),f=a.length,m=s.length,g=ie(n.session.backend.glContext.version),b=ht(u.length),w=u.length,_=Ht(),{activationFunction:x,applyActivation:I}=Nr(t),$=o?`${Tl(b,_,r[2].dims,u,!0)}`:"",A=l?`${z$(b,_,r,u)}`:"",P=l?"getAAtOutCoordsMatmul(i)":`getA(${M$(_,f)})`,N=l?"getBAtOutCoordsMatmul(i)":`getB(${B$(_,m)})`,R=l?"":`${b} rc =
          getOutputCoords(); int lastDim = rc.${_[w-1]}; rc.${_[w-1]} =
          rc.${_[w-2]}; rc.${_[w-2]} = lastDim;
      `,M=`
            ${A}
            ${$}
            ${x}
            void main() {
              ${R}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${P};
                vec4 b = ${N};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${g.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:M,hasMain:!0}},Bi=(n,e,r)=>{let t=L$(e.length>2,r.activationCacheKey);return{...t,get:()=>R$(n,t,e,r)}}});var zm,Mm=k(()=>{"use strict";zi();Nm();Il();zm=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.run(km(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=n.run(Bi(n,u,r),u);return n.reshapePacked(l,i)}});var F$,V$,Bm,Sl,$l=k(()=>{"use strict";Se();F$=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),V$=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,l=Sl(a,s,o,4),c=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${a.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:l,type:r.type,textureType:4},shaderSource:c}},Bm=(n,e,r,t,o)=>{let i=F$(o.cacheKey);return{...i,get:()=>V$(n,i,e,r,t,o)}},Sl=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var G$,U$,Fm,Vm=k(()=>{"use strict";Le();Ke();Se();Dn();$l();G$=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),U$=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Sl(i,a,t),[l,c]=n.calculateTextureWidthAndHeight(s,4),p=Q.computeStrides(u),[f,m]=n.calculateTextureWidthAndHeight(u,4),g=t.length,b=r.length<3?"0.0":"_B(b)",w=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:_,applyActivation:x}=Nr(o),I=ie(n.session.backend.glContext.version),$=`
${_}
float process(int indices[${g}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${b};
  for (int i = 0; i < ${w}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${f}, ${m});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:$}},Fm=(n,e,r,t)=>{let o=G$(e.length>2,t);return{...o,get:()=>U$(n,o,e,r,t)}}});var to,Al,W$,H$,q$,j$,Ol,K$,zi=k(()=>{"use strict";at();Le();Dm();Mm();Vm();Dn();$l();Mi();to=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],c=e.slice(2).map((g,b)=>g+(g-1)*(r[b]-1)),f=a.map((g,b)=>g+t[b]+t[b+s]).map((g,b)=>Math.floor((g-c[b]+o[b])/o[b]));return[i,u].concat(...f)},Al=(n,e,r)=>(K$(e,r),W$(n,e,r)),W$=(n,e,r)=>{let t=j$(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(Cm(n,e,t),e)]:i&&o?[H$(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[zm(n,e,t)]:[q$(n,e,t)]},H$=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=n.run(wl(u,r),u);return n.reshapeUnpacked(l,i)},q$=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.run(Bm(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(Fm(n,e,i,r),s)},j$=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();An.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},Ol=n=>{let e=n.attributes,r=eo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return ve({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},K$=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var X$,Z$,J$,Gm,Y$,Q$,eA,tA,rA,nA,Um,oA,Wm=k(()=>{"use strict";at();Ke();Se();Dn();X$=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,Z$=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},J$=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,l=s.length===0;for(let c=0;c<u;++c){let p=l?n[c+2]*i[c]:s[c],f=X$(n[c+2],i[c],o[c],e[c],r[c],p);Z$(f,t,o,c,c+u),l&&s.push(i[c]*(n[c+2]-1)+a[c]+(e[c]-1)*r[c]+1-o[c]-o[c+u])}},Gm=(n,e,r)=>(oA(e,r),Y$(n,e,r)),Y$=(n,e,r)=>{let t=nA(r,e);return[rA(n,e,t)]},Q$=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),eA=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],p=ie(n.session.backend.glContext.version),{activationFunction:f,applyActivation:m}=Nr(t),g=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${a[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${a[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${m}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},tA=(n,e,r)=>{let t=Q$(e.length>2,r.cacheKey);return{...t,get:()=>eA(n,e,t,r)}},rA=(n,e,r)=>n.run(tA(n,e,r),e),nA=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;J$(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Um=n=>{let e=n.attributes,r=eo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return ve({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:c,...r})},oA=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Hm,kn,qm,iA,jm,aA,sA,uA,Fi=k(()=>{"use strict";at();Le();Se();Hm={name:"Transpose",inputNames:["A"],inputTypes:[0]},kn=(n,e,r)=>(uA(e),[n.run({...Hm,cacheHint:r.cacheKey,get:()=>iA(n,e[0],r.perm)},e)]),qm=n=>ve({perm:n.attributes.getInts("perm",[])}),iA=(n,e,r)=>{let t=e.dims;r=jm(t,r);let o=aA(t,r),i=t.length,a=`
      ${sA("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Hm,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},jm=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),aA=(n,e)=>(e=jm(n,e),Q.sortBasedOnPerm(n,e)),sA=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},uA=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Km,Xm,lA,Zm=k(()=>{"use strict";Fi();Km=(n,e,r)=>{lA(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=kn(n,[s],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(l,c)]},Xm=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},lA=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Jm,Ym,cA,Qm=k(()=>{"use strict";Le();Jm=(n,e,r)=>{cA(e,r);let t=Q.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Ym=n=>n.attributes.getInt("axis",1),cA=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var pn,Po=k(()=>{"use strict";pn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var eg,tg,dA,pA,fA,hA,rg=k(()=>{"use strict";at();Po();Le();Se();eg=(n,e,r)=>(hA(e,r.axis),[n.run(fA(n,e,r),e)]),tg=n=>ve({axis:n.attributes.getInt("axis",0)}),dA={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},pA=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=Q.normalizeAxis(t,o.length);let s=[];for(let f=0;f<a.length;f++)f<t?(a[f]=o[f],s.push(`inputIdx[${f}] = outputIdx[${f}];`)):f<t+i.length?(a[f]=i[f-t],s.push(`indexDataIdx[${f-t}] = outputIdx[${f}];`)):(a[f]=o[f-i.length+1],s.push(`inputIdx[${f-i.length+1}] = outputIdx[${f}];`));let u=a.length||1,l=o.length,c=i.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:p}},fA=(n,e,r)=>{let t={...dA,cacheHint:r.cacheKey};return{...t,get:()=>pA(n,t,e,r.axis)}},hA=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var Pl,ng,og,ig,mA,gA,bA,ag=k(()=>{"use strict";at();Le();Se();Pl=(n,e,r)=>(bA(e,r),[n.run(mA(e,r),e)]),ng=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return ve({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},og=n=>ng(n,!1),ig=n=>ng(n,!0),mA=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>gA(r,n,e)}},gA=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Pi.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";r.transA&&(u=t[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(l="value += _A(a) * _B(b);");let c=s.length,p=e.length===3?`int c[${e[2].dims.length}];`:"",f=e.length===3?"bcastIndices_C(indices, c);":"",m=e.length===3?"value += beta * _C(c);":"",g=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${f}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${m}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:g}},bA=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var sg,ug,yA,_A,vA,xA,wA,lg=k(()=>{"use strict";at();Se();sg=(n,e,r)=>(wA(e),[n.run(vA(n,e,r),e)]),ug=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return ve({scale:e,bias:r})},yA={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},_A=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${xA(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},vA=(n,e,r)=>{let t={...yA,cacheHint:r.cacheKey};return{...t,get:()=>_A(n,t,e,r)}},xA=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},wA=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var dg,pg,cg,TA,IA,SA,$A,AA,OA,fg=k(()=>{"use strict";Ke();Se();dg=(n,e,r)=>{OA(e);let t=n.run(IA(e[0]),e);return[n.run(AA(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},pg=n=>n.attributes.getFloat("epsilon",1e-5),cg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},TA=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},IA=n=>({...cg,get:()=>TA(cg,n)}),SA={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},$A=(n,e,r,t,o)=>{let i=ie(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},AA=(n,e,r,t)=>{let o={...SA,cacheHint:`${r}`};return{...o,get:()=>$A(n,o,e,r,t)}},OA=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function PA(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${r}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...gg,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:l}}function EA(n,e){return{...gg,cacheHint:e.cacheKey,get:()=>PA(n,e)}}var hg,mg,gg,CA,bg=k(()=>{"use strict";at();Se();hg=(n,e,r)=>(CA(e),[n.run(EA(e,r),e)]),mg=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return ve({alpha:e,beta:r,bias:t,size:o})},gg={name:"LRN",inputNames:["X"],inputTypes:[0]};CA=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var DA,El,yg,_g,vg,kA,NA,LA,RA,zA,MA,BA,FA,xg=k(()=>{"use strict";at();Le();Ke();Se();DA={name:"Pad",inputNames:["A"],inputTypes:[0]},El=(n,e,r)=>(LA(e),[n.run({...DA,cacheHint:r.cacheKey,get:()=>NA(n,e[0],r)},e)]),yg=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return ve({mode:e,value:r,pads:t})},_g=(n,e,r)=>{RA(e);let t=kA(n,e,r);return El(n,[e[0]],t)},vg=n=>n.attributes.getString("mode","constant"),kA=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return ve({mode:r,pads:t,value:o})},NA=(n,e,r)=>{let t=Q.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${zA(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},LA=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},RA=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},zA=(n,e,r)=>{let t=ie(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=Q.computeStrides(e.dims);switch(r.mode){case"constant":return MA(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return BA(t,e.dims,a,o,i,r.pads);case"edge":return FA(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},MA=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${r[l]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},BA=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},FA=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${r[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `}});var Tg,Ig,Sg,$g,Ag,Og,Pg,Eg,Cg,VA,wg,Dg,Gi,kg,Vi,GA,Ng=k(()=>{"use strict";at();Le();Se();Tg=(n,e,r)=>{Gi(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Sg(e,t,!1,r)},e)]},Ig=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return ve({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},Sg=(n,e,r,t)=>{let[o,i]=Cg(n,t,r),a=Q.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let c=`
        ${kg(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},$g=(n,e,r)=>{Gi(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>Sg(e,t,!0,r)},e)]},Ag=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return ve({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Og=(n,e,r)=>{Gi(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Eg(e,t,!1,r)},e)]},Pg=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return ve({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Eg=(n,e,r,t)=>{let[o,i]=Cg(n,t,r),l=`
      ${kg(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:l}},Cg=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();An.adjustPoolAttributes(r,t,i,a,s,u);let l=An.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[c,l]},VA={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},wg={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Dg=(n,e)=>(Gi(e),[n.run({...wg,get:()=>Eg(e,wg,!0,VA)},e)]),Gi=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},kg=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=n[i-1],p="",f="",m="";if(u+l!==0?p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${r}
          }`:p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],w=e.strides[e.strides.length-2],_=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],I=n[i-2];_+x!==0?f=`
            for (int j = 0; j < ${b}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${_} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:f=`
            for (int j = 0; j < ${b}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${_} + j;
            `,m=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${f}
          ${p}
          ${m}
          ${t}
          return value;
        }
      `}else{let a=Q.size(e.kernelShape),s=Q.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,c=GA(u),p=Vi(n,"inputDims"),f=Vi(e.pads,"pads"),m=Vi(s,"kernelStrides"),g=Vi(e.strides,"strides"),b=e.pads.reduce((x,I)=>x+I),w="";return b?w=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:w=`
          }
          ${r}
        `,`
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${f}
          ${p}
          ${g}
          ${m}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${w}
          }
          ${t}

          return value;
        }
      `}},Vi=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},GA=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var Nn,fn,UA,WA,Lg,Rg,zg,Mg,Bg,Fg,Vg,Gg=k(()=>{"use strict";at();Po();Le();Se();Nn=(n,e,r,t,o)=>{WA(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>UA(n,e,r,t,o,i)},e)]},fn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return ve({axes:e,keepDims:r})},UA=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=Q.normalizeAxes(r.axes,e[0].dims.length),c=o(e,l),p=c[1];for(let g=0;g<e[0].dims.length;g++)l.indexOf(g)>=0||l.length===0?(r.keepDims&&a.push(1),p=`
          for(int j${g} = 0; j${g} < ${e[0].dims[g]}; j${g}++) {
            inputIdx[${g}] = j${g};
            ${p}
          }`):(u.push(`inputIdx[${g}] = outputIdx[${a.length}];`),a.push(e[0].dims[g]));let m=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${p}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:m}},WA=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Lg=(n,e,r)=>Nn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Rg=(n,e,r)=>Nn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),zg=(n,e,r)=>Nn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Mg=(n,e,r)=>Nn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Bg=(n,e,r)=>Nn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Fg=(n,e,r)=>Nn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Vg=(n,e,r)=>Nn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Ug,Wg=k(()=>{"use strict";Le();Ug=(n,e)=>{let r=Q.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var Hg,Cl,qg,jg,Eo,HA,Dl,Ui,kl=k(()=>{"use strict";at();Ke();Se();Hg={name:"Upsample",inputNames:["X"],inputTypes:[0]},Cl=(n,e,r)=>(Dl(e,r),[n.run({...Hg,cacheHint:r.cacheKey,get:()=>HA(n,e,r)},e)]),qg=n=>Eo(n,7),jg=n=>Eo(n,9),Eo=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Ui(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=n.attributes.getFloat("cubic_coeff_a",-.75),p=n.attributes.getInt("exclude_outside",0)!==0;if(p&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let f=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",m=0,g=0,b=0;return e>10?n.inputs.length>2?(m=1,g=2,b=3):(g=1,b=2):e===9&&(g=1),ve({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:c,excludeOutside:p,useNearest2xOptimization:f,roiInputIdx:m,scalesInputIdx:g,sizesInputIdx:b})},HA=(n,e,r)=>{let t=ie(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((b,w)=>Math.floor(b*r.scales[w])),[s,u]=n.calculateTextureWidthAndHeight(a,0),l=a.length,c=new Array(l),p=new Array(l),f=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let b=l-1;b>=0;b--)c[b]=b===l-1?1:c[b+1]*a[b+1],p[b]=b===l-1?1:p[b+1]*e[0].dims[b+1],f+=`
        output_pitches[${b}] = ${c[b]};
        input_pitches[${b}] = ${p[b]};
        `;let m=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,g=r.mode==="nearest"?`
    ${m}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${f}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${m}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${f}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${m}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${f}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...Hg,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(b=>Math.ceil(b))}]}},Dl=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Ui=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Nl,Ll,Kg,Xg,qA,jA,KA,XA,Zg=k(()=>{"use strict";Ke();Se();Dr();Cn();kl();Nl={name:"Resize",inputNames:["A"],inputTypes:[2]},Ll=(n,e,r)=>(Dl(e,r),[n.run({...Nl,cacheHint:r.cacheKey,get:()=>qA(n,e,r)},e)]),Kg=n=>Eo(n,10),Xg=n=>Eo(n,11),qA=(n,e,r)=>{let t=ie(n.session.backend.glContext.version),[o,i]=jA(e,r);if(o.every(I=>I===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Nl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],c=e[0].dims;if(s!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${s}`);let p=c[s-2],f=c[s-1],m=o[s-2],g=o[s-1],b="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":b=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":b=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":b=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":b=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${f}.0 - 1.0, ${p}.0 - 1.0, ${f}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let w=ht(s),_=kr(),x=`
            const vec2 inputWH = vec2(${p}.0, ${f}.0);
            const vec4 scaleWHWH = vec4(float(${m}), float(${g}), float(${m}), float(${g}));
            ${_}
            ${b}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${w} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...Nl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},jA=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=KA(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=XA(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},KA=(n,e,r)=>{let t=Array.from(n.floatData);return Ui(t,e,r),t},XA=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return Ui(i,r,t),i}});var Jg,ZA,Yg=k(()=>{"use strict";En();Jg=(n,e)=>(ZA(e),[new et([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),ZA=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Rl,Qg,eb,tb,JA,rb,YA,QA,nb=k(()=>{"use strict";at();Po();Le();Se();Rl={name:"Slice",inputNames:["A"],inputTypes:[0]},Qg=(n,e,r)=>(JA(e),[n.run({...Rl,cacheHint:r.cacheKey,get:()=>tb(n,e[0],r)},e)]),eb=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return ve({starts:e,ends:r,axes:t})},tb=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((p,f)=>f):r.axes,o=Q.normalizeAxes(t,e.dims.length),i=r.starts.map((p,f)=>p>e.dims[o[f]]-1?e.dims[o[f]]:Q.normalizeAxis(p,e.dims[o[f]])),a=r.ends.map((p,f)=>p>e.dims[o[f]]-1?e.dims[o[f]]:Q.normalizeAxis(p,e.dims[o[f]])),s=e.dims.slice(),u=[];for(let p=0;p<o.length;p++)s[o[p]]=a[p]-i[p],i[p]>0&&u.push(`outputIdx[${o[p]}] += ${i[p]};`);let c=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Rl,output:{dims:s,type:e.type,textureType:0},shaderSource:c}},JA=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},rb=(n,e)=>{QA(e);let r=YA(n,e);return[n.run({...Rl,cacheHint:r.cacheKey,get:()=>tb(n,e[0],r)},[e[0]])]},YA=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},QA=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var ob,ib,ab,sb,ub,lb,cb,db,eO,tO,rO,pb,fb=k(()=>{"use strict";at();Le();Ke();Se();Fi();ob={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},ib={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},ab={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},sb=(n,e,r)=>{pb(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(r.axis,t.length),i=Q.sizeToDimension(t,o),a=Q.sizeFromDimension(t,o);return db(n,e,r,i,a)},ub=n=>ve({axis:n.attributes.getInt("axis",1)}),lb=n=>ve({axis:n.attributes.getInt("axis",-1)}),cb=(n,e,r)=>{pb(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],c;a&&(u=Array.from({length:i}).map((g,b)=>b),u[o]=i-1,u[i-1]=o,u.map(g=>s.push(t[g])),c=ve({perm:u}),l=kn(n,e,c));let p=a?Q.sizeToDimension(s,i-1):Q.sizeToDimension(t,i-1),f=a?Q.sizeFromDimension(s,i-1):Q.sizeFromDimension(t,i-1),m=db(n,a?l:e,r,p,f);return a?kn(n,m,c):m},db=(n,e,r,t,o)=>{let i=eO(n,e[0],t,o,[t]),a=n.run({...ob,cacheHint:r.cacheKey,get:()=>i},e),s=tO(n,e[0],t,o,i.output.dims,[t]),u=n.run({...ib,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),l=rO(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...ab,cacheHint:r.cacheKey,get:()=>l},[e[0],a,u])]},eO=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=ie(n.session.backend.glContext.version),l=`
      float process(int[${s}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${a} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...ob,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},tO=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=ie(n.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...ib,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},rO=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${s});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...ab,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},pb=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var hb,mb,gb,nO,oO,iO,bb=k(()=>{"use strict";at();Le();Se();hb={name:"Split",inputNames:["A"],inputTypes:[0]},mb=(n,e,r)=>{iO(e);let t=Q.normalizeAxis(r.axis,e[0].dims.length),o=nO(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...hb,cacheHint:`${r.cacheKey};${a}`,get:()=>oO(n,e[0],r,t,a)},e));return i},gb=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return ve({axis:e,split:r,numOutputs:t})},nO=(n,e,r,t)=>{let[,o]=To.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},oO=(n,e,r,t,o)=>{let[i,a]=To.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...hb,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},iO=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var zl,yb,_b,aO,sO,vb=k(()=>{"use strict";Le();zl=(n,e,r)=>{aO(e);let t=Q.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},yb=(n,e)=>(sO(e),zl(n,[e[0]],Array.from(e[1].integerData))),_b=n=>n.attributes.getInts("axes"),aO=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},sO=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var xb,uO,lO,wb=k(()=>{"use strict";Ke();Se();xb=(n,e)=>{lO(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>uO(n,e,r)},e)]},uO=(n,e,r)=>{let t=ie(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},lO=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var Tb,cO,dO,Ib=k(()=>{"use strict";Po();Se();Tb=(n,e)=>{dO(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>cO(n,e,r)},e)]},cO=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},dO=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var Ml,Sb,$b,pO,fO,Ab=k(()=>{"use strict";Le();Ml=(n,e,r)=>{pO(e);let t=Q.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Sb=(n,e)=>(fO(e),Ml(n,[e[0]],Array.from(e[1].integerData))),$b=n=>n.attributes.getInts("axes"),pO=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},fO=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Ob,Pb=k(()=>{"use strict";Bh();Yh();tm();sm();zi();Wm();Zm();Qm();rg();ag();lg();fg();bg();Mi();xg();Ng();Gg();Wg();Zg();Yg();nb();fb();bb();vb();wb();Ib();Fi();xl();Ab();kl();Ob=[["Abs","","6+",um],["Acos","","7+",lm],["Add","","7+",Fh],["And","","7+",Vh],["Asin","","7+",cm],["Atan","","7+",dm],["AveragePool","","7+",Tg,Ig],["BatchNormalization","","7+",zh,Mh],["Cast","","6+",Qh,em],["Ceil","","6+",hm],["Clip","","6-10",_l,pm],["Clip","","11+",fm],["Concat","","4+",om,am],["Conv","","1+",Al,Ol],["ConvTranspose","","1+",Gm,Um],["Cos","","7+",mm],["Div","","7+",Gh],["Dropout","","7+",vl],["DepthToSpace","","1+",Km,Xm],["Equal","","7+",Uh],["Elu","","6+",gm,bm],["Exp","","6+",ym],["Flatten","","1+",Jm,Ym],["Floor","","6+",_m],["FusedConv","com.microsoft","1+",Al,Ol],["Gather","","1+",eg,tg],["Gemm","","7-10",Pl,og],["Gemm","","11+",Pl,ig],["GlobalAveragePool","","1+",$g,Ag],["GlobalMaxPool","","1+",Dg],["Greater","","7+",Wh],["Identity","","1+",vl],["ImageScaler","","1+",sg,ug],["InstanceNormalization","","6+",dg,pg],["LeakyRelu","","6+",vm,xm],["Less","","7+",Hh],["LRN","","1+",hg,mg],["Log","","6+",wm],["MatMul","","1+",Lm,Rm],["MaxPool","","1+",Og,Pg],["Mul","","7+",qh],["Neg","","6+",Tm],["Not","","1+",Im],["Or","","7+",jh],["Pad","","2-10",El,yg],["Pad","","11+",_g,vg],["Pow","","7+",Kh],["PRelu","","7+",Xh],["ReduceLogSum","","1+",Fg,fn],["ReduceMax","","1+",zg,fn],["ReduceMean","","1+",Rg,fn],["ReduceMin","","1+",Mg,fn],["ReduceProd","","1+",Bg,fn],["ReduceSum","","1-12",Lg,fn],["ReduceSumSquare","","1+",Vg,fn],["Relu","","6+",Sm],["Reshape","","5+",Ug],["Resize","","10",Ll,Kg],["Resize","","11+",Ll,Xg],["Shape","","1+",Jg],["Sigmoid","","6+",$m],["Sin","","7+",Am],["Slice","","10+",rb],["Slice","","1-9",Qg,eb],["Softmax","","1-12",sb,ub],["Softmax","","13+",cb,lb],["Split","","2-12",mb,gb],["Sqrt","","6+",Om],["Squeeze","","1-12",zl,_b],["Squeeze","","13+",yb],["Sub","","7+",Zh],["Sum","","6+",xb],["Tan","","7+",Pm],["Tanh","","6+",Em],["Tile","","6+",Tb],["Transpose","","1+",kn,qm],["Upsample","","7-8",Cl,qg],["Upsample","","9",Cl,jg],["Unsqueeze","","1-12",Ml,$b],["Unsqueeze","","13+",Sb],["Xor","","7+",Jh]]});function Cb(n){let e={},r;for(;(r=Eb.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=hO.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),l=a?`${a} ${s};`:"",c=e[t].body,p="";e[t].params.forEach((m,g)=>{m&&(p+=`${m.type} ${m.name} = ${u[g]};
`)}),c=`${p}
 ${c}`,c=c.replace("return",`${s} = `);let f=`
      ${l}
      {
        ${c}
      }
      `;n=n.replace(r[0],f)}}return n=n.replace(Eb,""),n}var Eb,hO,Db=k(()=>{"use strict";Eb=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,hO="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function ro(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:mO(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function mO(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Zn(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Zn(n.every(gO),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function gO(n){return n%1===0}function bO(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function kb(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var Wi,Bl=k(()=>{"use strict";Pt();Le();Wi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((l,c)=>l*c),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((l,c)=>l*c);if(s>o||u>o)ze.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=ro(i).newShape);let a=bO(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?kb(a/4).map(s=>s*2):kb(a)}}});var Hi,Nb=k(()=>{"use strict";Le();jr();Ke();Bl();Dr();Hi=class extends Lt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new X(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new X(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let s=`
      void setOutput(vec4 val) {
        ${ie(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new X(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${ie(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new X(s),o}getOutputScalarCoords(){return new X(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new X(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new X(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new X(o))}getOutputPacked2DCoords(e,r){let t="";if($n.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new X(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new X(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          int b = index / ${i};
          index -= b * ${i};

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec3(b, r, c);
        }
      `;return new X(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let c=2;c<e.length-1;c++)a*=e[e.length-c-1],s=`
      int b${c} = index / ${a};
      index -= b${c} * ${a};
    `+s,u=`b${c}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.y * ${t[0]} + resTexRC.x;

        ${s}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${u});
      }
    `;return new X(l)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new X(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new X(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new X(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new X(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new X(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new X(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new X(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new X(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new X(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new X(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=ie(this.context.glContext.version);return e[r]=new X(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ei(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=xh(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Ei(o),l=i.length,c=a.length,p=ft.getBroadcastDims(i,a),f=ht(c),m=c-l,g,b=Ht();l===0?g="":c<2&&p.length>=1?g="coords = 0;":g=p.map(R=>`coords.${b[R+m]} = 0;`).join(`
`);let w="";c<2&&l>0?w="coords":w=i.map((R,M)=>`coords.${b[M+m]}`).join(", ");let _="return outputValue;",I=Q.size(i)===1,A=Q.size(a)===1;if(l===1&&!I&&!A)_=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!A)c===1?_=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:_=`
          return vec4(outputValue.x);
        `;else if(p.length){let R=l-2,M=l-1;p.indexOf(R)>-1&&p.indexOf(M)>-1?_="return vec4(outputValue.x);":p.indexOf(R)>-1?_="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(M)>-1&&(_="return vec4(outputValue.xx, outputValue.zz);")}let P=`
        int lastDim = coords.${b[c-1]};
        coords.${b[c-1]} = coords.${b[c-2]};
        coords.${b[c-2]} = lastDim;
      `,N=`
      vec4 ${e}() {
        ${f} coords = getOutputCoords();
        ${P}
        ${g}
        vec4 outputValue = ${u}(${w});
        ${_}
      }
    `;return new X(N,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,l=r.unpackedShape,c=t.unpackedShape,p=Ei(o);if(s===u&&$n.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new X(I,["coordinates.sampleTexture"])}let f=ht(u),m=ft.getBroadcastDims(l,c),g=u-s,b,w=Ht();s===0?b="":u<2&&m.length>=1?b="coords = 0;":b=m.map(I=>`coords.${w[I+g]} = 0;`).join(`
`);let _="";u<2&&s>0?_="coords":_=r.unpackedShape.map((I,$)=>`coords.${w[$+g]}`).join(", ");let x=`
        float ${e}() {
          ${f} coords = getOutputCoords();
          ${b}
          return ${p}(${_});
        }
      `;return new X(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=ie(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new X(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=ie(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new X(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=ie(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&$n.arraysEqual(o,i)){let m=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new X(m)}let l=i,c=Math.ceil(o[1]/2),f=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${c}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new X(f,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=ie(this.context.glContext.version);if(o[0]===1){let g=o.slice(1),b=[1,2],w=Jn(o,g),_=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=w;let I=this.getPackedSamplerFromInput(e,r,x),A=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${Yn(_,b)});
      } `;return new X(A,I.dependencies)}let u=a[0],l=a[1],c=Math.ceil(o[2]/2),p=c*Math.ceil(o[1]/2),m=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${p}, ${c}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new X(m,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=ie(this.context.glContext.version),u=[a[0],a[1]],l=u[1],c=u[0],p=Math.ceil(o[i-1]/2),f=p*Math.ceil(o[i-2]/2),m="int b, int row, int col",g=`b * ${f} + (row / 2) * ${p} + (col / 2)`;for(let _=2;_<i-1;_++)m=`int b${_}, `+m,f*=o[i-_-1],g=`b${_} * ${f} + `+g;let w=`vec4 ${e}(${m}) {
      int index = ${g};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${l});
      return ${s.texture2D}(${r}, uv);
    }`;return new X(w)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new X(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new X(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new X(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new X(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new X(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new X(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&$n.arraysEqual(o,i)){let f=i[1],m=i[0],g=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${f}.0, ${m}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new X(g,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=ro(o),u=a;if(u.length<o.length){let f=Jn(o,u),m=JSON.parse(JSON.stringify(t));m.unpackedShape=f;let g=["col","row"],b=`
          ${this.getUnpackedSamplerFromInput(e,r,m).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${Yn(g,s)});
          }
        `;return new X(b,["coordinates.sampleTexture"])}let l=i[1],c=i[0];if(c===1){let f=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new X(f,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let f=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new X(f,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new X(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=ro(o),l=s;if(l.length<o.length){let m=Jn(o,l),g=["batch","col","row"],b=JSON.parse(JSON.stringify(t));b.unpackedShape=m;let w=this.getUnpackedSamplerFromInput(e,r,b),_=u.reverse(),x=`
          ${w.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${Yn(g,_)});
          }
        `;return new X(x,w.dependencies)}let c=t.width,p=t.height,f=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${p}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new X(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,c=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new X(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:c}=ro(o);if(l.length<o.length){let g=Jn(o,l),b=["row","col","depth","depth2","depth3"],w=JSON.parse(JSON.stringify(t));w.unpackedShape=g;let _=`
          ${this.getUnpackedSamplerFromInput(e,r,w).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${Yn(b,c)});
          }
        `;return new X(_,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=t.width,f=t.height,m=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${p}, ${f}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new X(m,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:c,keptDims:p}=ro(o);if(c.length<o.length){let b=Jn(o,c),w=["row","col","depth","depth2","depth3","depth4"],_=JSON.parse(JSON.stringify(t));_.unpackedShape=b;let x=`
            ${this.getUnpackedSamplerFromInput(e,r,_).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${Yn(w,p)});
            }
          `;return new X(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,m=t.height,g=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${f}, ${m}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new X(g,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${r-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${r}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${r}]) {
        ${a.join("")}
      }
    `;return{toVec:new X(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new X(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new X(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=ie(this.context.glContext.version);return`
        float ${a}(int m[${r}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=ie(this.context.glContext.version);return`
        vec4 ${a}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var qi,Lb=k(()=>{"use strict";jr();qi=class n extends Lt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new X(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new X(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new X(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new X(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var ji,Rb=k(()=>{"use strict";jr();Ke();ji=class extends Lt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ie(this.context.glContext.version);return{setFragColor:new X(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new X(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Ki,zb=k(()=>{"use strict";jr();Ki=class n extends Lt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let p=0;p<a;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;r[u]=new X(c)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let p=0;p<a-2;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new X(c)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new X(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new X(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new X(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new X(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${r-1}] = offset;`),`
      void ${e}(int offset, out int indices[${r}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${r}`,s="";for(let l=0;l<i;++l)s+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${a}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${s};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[a]=new X(u)}),e}}});var Xi,Mb=k(()=>{"use strict";jr();Xi=class extends Lt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<r;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new X(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new X(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${r} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${r-1}] = value;
        `;let o=`
      void setVecItem(out int m[${r}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new X(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${r} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${r-1}];
        `;let o=`
      int getVecItem(int m[${r}], int index) {
        ${t}
      }
    `;return{getVecItem:new X(o)}}}});var Fl,Bb=k(()=>{"use strict";Nb();Lb();Rb();zb();Mb();Fl={encoding:qi,fragcolor:ji,vec:Xi,shapeUtils:Ki,coordinates:Hi}});var Zi,Fb=k(()=>{"use strict";jr();Db();Bb();Ke();Zi=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Ni(e,r,t,o),Object.keys(Fl).forEach(a=>{let s=new Fl[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let c=a+"."+l,p;i[c]?(p=i[c],p.routineBody=u[l].routineBody):(p=new Oo(c,u[l].routineBody),i[c]=p);let f=u[l].dependencies;if(f)for(let m=0;m<f.length;++m)if(i[f[m]])p.addDependency(i[f[m]]);else{let g=new Oo(f[m]);i[f[m]]=g,p.addDependency(g)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${vh(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=Cb(r),`${_h(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Li.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var Ji,Vb=k(()=>{"use strict";ct();Pt();Fb();Ke();Ji=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw ze.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Zi(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){ze.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=yh(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}pe.debug&&ze.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;ze.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let c=r.find(p=>p.name===a)?.data;if(s!=="sampler2D"&&!c)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var Yi,Gb=k(()=>{"use strict";Pt();$o();Yi=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,l,c;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let f=this.idleTextures.get(l);if(f&&f.length>0){let m=f.pop();return c.push(m),o===1&&this.glContext.updateTexture(m,s,u,a,this.toTextureData(e,t)),m}}ze.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let p=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(p),this.textureLookup.set(p,l)),p}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(ze.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var Qi,Ub=k(()=>{"use strict";Pt();Cp();Lh();Pb();Vb();Bl();Gb();Qi=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new Wi(e.glContext.maxTextureSize),this.programManager=new Ji(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new Yi(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new ki(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){ze.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Ep(e,r,Ob);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function yO(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var Co,Wb=k(()=>{"use strict";ct();$o();$o();Dr();Co=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),l=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(pe.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new Ci(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new So(this.gl,r):new So(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Di(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await dl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=yO(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await dl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Vl(n){let e;if((!n||n==="webgl2")&&"webgl2"in no?e=no.webgl2:(!n||n==="webgl")&&"webgl"in no&&(e=no.webgl),!e)try{let t=vO();e=Hb(t,n)}catch{let o=_O();e=Hb(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return no[n]=e,r.isContextLost()?(delete no[n],Vl(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function Hb(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new Co(t,2)}catch(i){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new Co(t,1)}catch(i){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function _O(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function vO(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var no,qb=k(()=>{"use strict";Pt();Wb();no={}});var ea,jb=k(()=>{"use strict";ct();Pt();Ub();qb();ea=class{get contextId(){return pe.webgl.contextId}set contextId(e){pe.webgl.contextId=e}get matmulMaxBatchSize(){return pe.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){pe.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return pe.webgl.textureCacheMode}set textureCacheMode(e){pe.webgl.textureCacheMode=e}get pack(){return pe.webgl.pack}set pack(e){pe.webgl.pack=e}get async(){return pe.webgl.async}set async(e){pe.webgl.async=e}initialize(){try{return this.glContext=Vl(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ze.setWithEnv(pe),pe.webgl.context||Object.defineProperty(pe.webgl,"context",{value:this.glContext.gl}),ze.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ze.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new Qi(this,e)}dispose(){this.glContext.dispose()}}});async function Gl(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Kb.get(r);if(t)return t;let o=await wO(r);if(o)return o}}else return Gl(["webgl"]);throw new Error("no available backend to use")}async function wO(n){let e=xO;if(typeof e[n]<"u"&&TO(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Kb.set(n,r),r}}function TO(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Kb,xO,Xb=k(()=>{"use strict";jb();Kb=new Map,xO={webgl:new ea}});var Ul,ta,Zb=k(()=>{"use strict";Pt();Ul=class{constructor(e,r){this.op=e;this.node=r}},ta=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Ul(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((c,p)=>{let f=o[p];this._values[f]=c});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],p=this._ops[c],f=p.node.inputs.map(w=>this._values[w]);if(f.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let m=f;ze.verbose("ExecPlan",`Running op:${p.node.name} (${m.map((w,_)=>`'${p.node.inputs[_]}': ${w.type}[${w.dims.join(",")}]`).join(", ")})`);let g=await this.profiler.event("node",p.node.name,async()=>p.op.impl(t,m,p.op.context));if(g.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");g.forEach((w,_)=>{let x=p.node.outputs[_];if(this._values[x])throw new Error(`output [${x}] already has value: op:${p.node.name}`);this._values[x]=w});let b=new Set;g.forEach((w,_)=>{let x=p.node.outputs[_];for(let I of a[x].to){let $=s[I],A=!0;for(let P of $.inputs)if(!this._values[P]){A=!1;break}A&&b.add(I)}}),i.push(...b)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let p=this.graph.getOutputIndices()[c],f=this._values[p];if(f===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await f.getData():f.data,l.push(f)}return ze.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var we,Do,Jb=k(()=>{"use strict";_o();we=_e(Xn());En();Le();Do=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof we.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Ti.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof we.onnx.AttributeProto?e.type:e.type();switch(r){case we.onnx.AttributeProto.AttributeType.FLOAT:return"float";case we.onnx.AttributeProto.AttributeType.INT:return"int";case we.onnx.AttributeProto.AttributeType.STRING:return"string";case we.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case we.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case we.onnx.AttributeProto.AttributeType.INTS:return"ints";case we.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case we.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${we.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof we.onnx.AttributeProto?e.type:e.type();if(r===we.onnx.AttributeProto.AttributeType.GRAPH||r===we.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===we.onnx.AttributeProto.AttributeType.INT&&vt.isLong(t))return vt.longToNumber(t);if(r===we.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=vt.longToNumber(s)}return i}if(r===we.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof we.onnx.AttributeProto?et.fromProto(t):et.fromOrtTensor(t);if(r===we.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof we.onnx.AttributeProto)return t.map(i=>et.fromProto(i));if(e instanceof Ti.Attribute)return t.map(i=>et.fromOrtTensor(i))}return r===we.onnx.AttributeProto.AttributeType.STRING&&e instanceof we.onnx.AttributeProto?Io(t):r===we.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof we.onnx.AttributeProto?t.map(Io):t}static getValueNoCheck(e){return e instanceof we.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case we.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case we.onnx.AttributeProto.AttributeType.INT:return e.i;case we.onnx.AttributeProto.AttributeType.STRING:return e.s;case we.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case we.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case we.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case we.onnx.AttributeProto.AttributeType.INTS:return e.ints;case we.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case we.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case we.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${we.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case kt.AttributeType.FLOAT:return e.f();case kt.AttributeType.INT:return e.i();case kt.AttributeType.STRING:return e.s();case kt.AttributeType.TENSOR:return e.t();case kt.AttributeType.GRAPH:return e.g();case kt.AttributeType.FLOATS:return e.floatsArray();case kt.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case kt.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case kt.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${kt.AttributeType[e.type()]}`)}}}});var Hl,ql,Lr,ra,Wl,Yb=k(()=>{"use strict";Jb();_o();Hl=_e(Xn());En();Le();ql={from:(n,e)=>new Wl(n,e)},Lr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=lt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ra=class{constructor(e,r){e instanceof Hl.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Do(e.attribute)):e instanceof ju.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Do(lt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Wl=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Hl.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Hu.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Lr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new Lr;s.type={shape:{dims:lt.tensorDimsFromProto(i.dims)},tensorType:lt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=et.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Lr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ra(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=r.get(u);if(typeof l>"u"&&(l=this._allData.push(new Lr)-1,r.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=et.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=r.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Lr;if(e.nodeArgs(s)?.type()?.valueType()!==Xu.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(s).type().value(new Ku.TensorTypeAndShape),p=lt.tensorDataTypeFromProto(c.elemType()),f=c.shape(),m=[];for(let b=0;b<f.dimLength();b++)m.push(vt.longToNumber(f.dim(b).value().dimValue()));u.type={shape:{dims:m},tensorType:p};let g=this._allData.push(u)-1;r.set(a,g),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new Lr,l=lt.tensorDimsFromORTFormat(a),c=lt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:c},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=et.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Lr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ra(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),c=r.get(l);if(typeof c>"u"&&(c=this._allData.push(new Lr)-1,r.set(l,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=et.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),c=r.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[On,Pn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var Qb,ey,na,ty=k(()=>{"use strict";Qb=_e(Ne());Yb();_o();ey=_e(Xn());Le();na=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=ey.onnx.ModelProto.decode(e);if(vt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:vt.longToNumber(i.version)})),this._graph=ql.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new Qb.ByteBuffer(e),o=qu.InferenceSession.getRootAsInferenceSession(t).model();if(vt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:vt.longToNumber(s.version())})}this._graph=ql.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var oa,ry=k(()=>{"use strict";Xb();Zb();Pt();ty();oa=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=li.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Gl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new na,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ta(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var ia,ny=k(()=>{"use strict";ct();En();ia=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new et(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new Tt(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var oy={};_n(oy,{onnxjsBackend:()=>IO});var jl,IO,iy=k(()=>{"use strict";ry();ny();jl=class{async init(){}async createInferenceSessionHandler(e,r){let t=new oa(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new ia(t)}},IO=new jl});var aa=k(()=>{"use strict"});var uy={};_n(uy,{default:()=>SO});var ay,sy,SO,ly=k(()=>{"use strict";Kl();hn();sa();ay="ort-wasm-proxy-worker",sy=globalThis.self?.name===ay;sy&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":ua(r.wasm).then(()=>{la(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;ca(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=ko(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;da(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":pa(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;fa(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},ma([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":ha(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});SO=sy?null:n=>new Worker(n??$t,{type:"module",name:ay})});var dy={};_n(dy,{default:()=>$O});var Xl,cy,$O,AO,py=k(()=>{"use strict";cy=(Xl=import.meta.url,async function(n={}){var e,r,t=n,o=new Promise((d,h)=>{e=d,r=h}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(d,h)=>{d.startsWith("./")&&(d=d.substring(2)),(t.Fb||(t.Fb=new Map)).set(d,h)},t.unmountExternalData=()=>{delete t.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let l=d=>async(...h)=>{try{if(t.Gb)throw Error("Session already started");let y=t.Gb={ec:h[0],errors:[]},v=await d(...h);if(t.Gb!==y)throw Error("Session mismatch");t.Kb?.flush();let T=y.errors;if(0<T.length){let C=await Promise.all(T);if(C=C.filter(z=>z),0<C.length)throw Error(C.join(`
`))}return v}finally{t.Gb=null}};t.jsepInit=(d,h)=>{if(d==="webgpu"){[t.Kb,t.Vb,t.Zb,t.Lb,t.Yb,t.kb,t.$b,t.bc,t.Wb,t.Xb,t.ac]=h;let y=t.Kb;t.jsepRegisterBuffer=(v,T,C,z)=>y.registerBuffer(v,T,C,z),t.jsepGetBuffer=v=>y.getBuffer(v),t.jsepCreateDownloader=(v,T,C)=>y.createDownloader(v,T,C),t.jsepOnCreateSession=v=>{y.onCreateSession(v)},t.jsepOnReleaseSession=v=>{y.onReleaseSession(v)},t.jsepOnRunStart=v=>y.onRunStart(v),t.cc=(v,T)=>{y.upload(v,T)}}else if(d==="webnn"){let y=h[0];[t.oc,t.Ob,t.webnnEnsureTensor,t.Pb,t.webnnDownloadTensor]=h.slice(1),t.webnnReleaseTensorId=t.Ob,t.webnnUploadTensor=t.Pb,t.webnnOnRunStart=v=>y.onRunStart(v),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnRegisterMLContext=(v,T)=>{y.registerMLContext(v,T)},t.webnnOnReleaseSession=v=>{y.onReleaseSession(v)},t.webnnCreateMLTensorDownloader=(v,T)=>y.createMLTensorDownloader(v,T),t.webnnRegisterMLTensor=(v,T,C,z)=>y.registerMLTensor(v,T,C,z),t.webnnCreateMLContext=v=>y.createMLContext(v),t.webnnRegisterMLConstant=(v,T,C,z,F,j)=>y.registerMLConstant(v,T,C,z,F,t.Fb,j),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsInt64Supported=y.isInt64Supported.bind(y)}};let c=()=>{let d=(h,y,v)=>(...T)=>{let C=Jt,z=y?.();T=h(...T);let F=y?.();return z!==F&&(h=F,v(z),y=v=null),Jt!=C?new Promise((j,Y)=>{ds={resolve:j,reject:Y}}):T};(()=>{for(let h of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[h]=d(t[h],()=>t[h],y=>t[h]=y)})(),l!==void 0&&(t._OrtRun=l(t._OrtRun),t._OrtRunWithBinding=l(t._OrtRunWithBinding)),c=void 0};t.asyncInit=()=>{c?.()};var p,f,m=Object.assign({},t),g=(d,h)=>{throw h},b="";(i||a)&&(a?b=self.location.href:typeof document<"u"&&document.currentScript&&(b=document.currentScript.src),Xl&&(b=Xl),b=b.startsWith("blob:")?"":b.slice(0,b.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(f=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),p=async d=>{if(re(d))return new Promise((y,v)=>{var T=new XMLHttpRequest;T.open("GET",d,!0),T.responseType="arraybuffer",T.onload=()=>{T.status==200||T.status==0&&T.response?y(T.response):v(T.status)},T.onerror=v,T.send(null)});var h=await fetch(d,{credentials:"same-origin"});if(h.ok)return h.arrayBuffer();throw Error(h.status+" : "+h.url)});var w=console.log.bind(console),_=console.error.bind(console),x=w,I=_;Object.assign(t,m),m=null;var $,A,P,N,R,M,W,J,ee,ce,G,Te,se,K=t.wasmBinary,ge=!1,re=d=>d.startsWith("file://");function de(){return $.buffer!=N.buffer&&$e(),N}function Ve(){return $.buffer!=N.buffer&&$e(),R}function Be(){return $.buffer!=N.buffer&&$e(),M}function ue(){return $.buffer!=N.buffer&&$e(),W}function E(){return $.buffer!=N.buffer&&$e(),J}function q(){return $.buffer!=N.buffer&&$e(),ee}function Ie(){return $.buffer!=N.buffer&&$e(),ce}function rt(){return $.buffer!=N.buffer&&$e(),se}if(s){let d=function(h){try{var y=h.data,v=y.Cb;if(v==="load"){let T=[];self.onmessage=C=>T.push(C),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let C of T)d(C);self.onmessage=d};for(let C of y.Sb)t[C]&&!t[C].proxy||(t[C]=(...z)=>{postMessage({Cb:"callHandler",Rb:C,args:z})},C=="print"&&(x=t[C]),C=="printErr"&&(I=t[C]));$=y.lc,$e(),mt(y.mc)}else if(v==="run"){iw(y.Bb),ms(y.Bb,0,0,1,0,0),qc(),ls(y.Bb),qe||(Fd(),qe=!0);try{aw(y.hc,y.Ib)}catch(T){if(T!="unwind")throw T}}else y.target!=="setimmediate"&&(v==="checkMailbox"?qe&&Uo():v&&(I(`worker: received unknown command ${v}`),I(y)))}catch(T){throw Vd(),T}};var eC=d,mt,qe=!1;I=function(...h){h=h.join(" "),console.error(h)},self.alert=function(...h){postMessage({Cb:"alert",text:h.join(" "),jc:Jo()})},self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=d}function $e(){var d=$.buffer;t.HEAP8=N=new Int8Array(d),t.HEAP16=M=new Int16Array(d),t.HEAPU8=R=new Uint8Array(d),t.HEAPU16=W=new Uint16Array(d),t.HEAP32=J=new Int32Array(d),t.HEAPU32=ee=new Uint32Array(d),t.HEAPF32=ce=new Float32Array(d),t.HEAPF64=se=new Float64Array(d),t.HEAP64=G=new BigInt64Array(d),t.HEAPU64=Te=new BigUint64Array(d)}function Bt(){s?startWorker(t):ne.Da()}s||($=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),$e());var Zr,Jr=0,Vn=null;function Bc(){if(--Jr==0&&Vn){var d=Vn;Vn=null,d()}}function Yr(d){throw I(d="Aborted("+d+")"),ge=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),r(d),d}function Fc(){return{a:{L:ow,Aa:nw,b:uw,$:Zc,A:Qc,pa:ed,X:rd,Z:nd,qa:od,na:id,ga:ad,ma:sd,J:ud,Y:ld,V:cd,oa:dd,W:pd,va:lw,E:dw,Q:pw,O:hw,D:gw,v:bw,r:yw,P:_w,z:$w,R:Aw,ja:Ow,T:Pw,aa:Ew,M:Cw,F:Dw,ia:ls,sa:kw,t:Nw,Ca:Lw,w:Mw,o:Bw,m:Vw,c:as,Ba:Gw,n:Uw,k:qw,u:jw,p:Kw,f:Xw,s:Zw,l:Jw,e:Yw,j:Qw,i:eT,g:tT,d:rT,da:nT,ea:oT,fa:iT,ba:$d,ca:Ad,N:Od,xa:sT,ua:cT,h:dT,C:pT,G:fT,ta:uT,x:hT,ra:mT,U:gT,q:aT,y:bT,K:yT,S:_T,za:vT,ya:xT,ka:Dd,la:kd,_:rs,B:Nd,I:Ld,ha:Rd,H:zd,a:$,wa:ts}}}var Ya={835372:(d,h,y,v,T)=>{if(t===void 0||!t.Fb)return 1;if((d=Ze(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=t.Fb.get(d)))return 2;if(h=Number(h>>>0),y=Number(y>>>0),v=Number(v>>>0),h+y>d.byteLength)return 3;try{let C=d.subarray(h,h+y);switch(T){case 0:Ve().set(C,v>>>0);break;case 1:t.nc?t.nc(v,C):t.cc(v,C);break;default:return 4}return 0}catch{return 4}},836196:(d,h,y)=>{t.Pb(d,Ve().subarray(h>>>0,h+y>>>0))},836260:()=>t.oc(),836302:d=>{t.Ob(d)},836339:()=>{t.Wb()},836370:()=>{t.Xb()},836399:()=>{t.ac()},836424:d=>t.Vb(d),836457:d=>t.Zb(d),836489:(d,h,y)=>{t.Lb(Number(d),Number(h),Number(y),!0)},836552:(d,h,y)=>{t.Lb(Number(d),Number(h),Number(y))},836609:()=>typeof wasmOffsetConverter<"u",836666:d=>{t.kb("Abs",d,void 0)},836717:d=>{t.kb("Neg",d,void 0)},836768:d=>{t.kb("Floor",d,void 0)},836821:d=>{t.kb("Ceil",d,void 0)},836873:d=>{t.kb("Reciprocal",d,void 0)},836931:d=>{t.kb("Sqrt",d,void 0)},836983:d=>{t.kb("Exp",d,void 0)},837034:d=>{t.kb("Erf",d,void 0)},837085:d=>{t.kb("Sigmoid",d,void 0)},837140:(d,h,y)=>{t.kb("HardSigmoid",d,{alpha:h,beta:y})},837219:d=>{t.kb("Log",d,void 0)},837270:d=>{t.kb("Sin",d,void 0)},837321:d=>{t.kb("Cos",d,void 0)},837372:d=>{t.kb("Tan",d,void 0)},837423:d=>{t.kb("Asin",d,void 0)},837475:d=>{t.kb("Acos",d,void 0)},837527:d=>{t.kb("Atan",d,void 0)},837579:d=>{t.kb("Sinh",d,void 0)},837631:d=>{t.kb("Cosh",d,void 0)},837683:d=>{t.kb("Asinh",d,void 0)},837736:d=>{t.kb("Acosh",d,void 0)},837789:d=>{t.kb("Atanh",d,void 0)},837842:d=>{t.kb("Tanh",d,void 0)},837894:d=>{t.kb("Not",d,void 0)},837945:(d,h,y)=>{t.kb("Clip",d,{min:h,max:y})},838014:d=>{t.kb("Clip",d,void 0)},838066:(d,h)=>{t.kb("Elu",d,{alpha:h})},838124:d=>{t.kb("Gelu",d,void 0)},838176:d=>{t.kb("Relu",d,void 0)},838228:(d,h)=>{t.kb("LeakyRelu",d,{alpha:h})},838292:(d,h)=>{t.kb("ThresholdedRelu",d,{alpha:h})},838362:(d,h)=>{t.kb("Cast",d,{to:h})},838420:d=>{t.kb("Add",d,void 0)},838471:d=>{t.kb("Sub",d,void 0)},838522:d=>{t.kb("Mul",d,void 0)},838573:d=>{t.kb("Div",d,void 0)},838624:d=>{t.kb("Pow",d,void 0)},838675:d=>{t.kb("Equal",d,void 0)},838728:d=>{t.kb("Greater",d,void 0)},838783:d=>{t.kb("GreaterOrEqual",d,void 0)},838845:d=>{t.kb("Less",d,void 0)},838897:d=>{t.kb("LessOrEqual",d,void 0)},838956:(d,h,y,v,T)=>{t.kb("ReduceMean",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},839131:(d,h,y,v,T)=>{t.kb("ReduceMax",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},839305:(d,h,y,v,T)=>{t.kb("ReduceMin",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},839479:(d,h,y,v,T)=>{t.kb("ReduceProd",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},839654:(d,h,y,v,T)=>{t.kb("ReduceSum",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},839828:(d,h,y,v,T)=>{t.kb("ReduceL1",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},840001:(d,h,y,v,T)=>{t.kb("ReduceL2",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},840174:(d,h,y,v,T)=>{t.kb("ReduceLogSum",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},840351:(d,h,y,v,T)=>{t.kb("ReduceSumSquare",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},840531:(d,h,y,v,T)=>{t.kb("ReduceLogSumExp",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},840711:d=>{t.kb("Where",d,void 0)},840764:(d,h,y)=>{t.kb("Transpose",d,{perm:h?Array.from(E().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},840888:(d,h,y,v)=>{t.kb("DepthToSpace",d,{blocksize:h,mode:Ze(y),format:v?"NHWC":"NCHW"})},841021:(d,h,y,v)=>{t.kb("DepthToSpace",d,{blocksize:h,mode:Ze(y),format:v?"NHWC":"NCHW"})},841154:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st,Wn)=>{t.kb("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[y],group:v,kernelShape:[T],pads:[C,z],strides:[F],wIsConst:()=>!!de()[Y>>>0],outputPadding:be?Array.from(E().subarray(Number(be)>>>0,Number(Ae)>>>0)):[],outputShape:Fe?Array.from(E().subarray(Number(Fe)>>>0,Number(st)>>>0)):[],activation:Ze(Wn)})},841587:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:h,dilations:Array.from(E().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:v,kernelShape:Array.from(E().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(E().subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from(E().subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!de()[j>>>0],outputPadding:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],outputShape:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[],activation:Ze(st)})},842248:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st,Wn)=>{t.kb("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[y],group:v,kernelShape:[T],pads:[C,z],strides:[F],wIsConst:()=>!!de()[Y>>>0],outputPadding:be?Array.from(E().subarray(Number(be)>>>0,Number(Ae)>>>0)):[],outputShape:Fe?Array.from(E().subarray(Number(Fe)>>>0,Number(st)>>>0)):[],activation:Ze(Wn)})},842681:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:h,dilations:Array.from(E().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:v,kernelShape:Array.from(E().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(E().subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from(E().subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!de()[j>>>0],outputPadding:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],outputShape:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[],activation:Ze(st)})},843342:(d,h)=>{t.kb("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},843433:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("AveragePool",d,{format:st?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:v,storage_order:T,dilations:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[],kernel_shape:F?Array.from(E().subarray(Number(F)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],strides:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[]})},843912:(d,h)=>{t.kb("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},844003:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("AveragePool",d,{format:st?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:v,storage_order:T,dilations:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[],kernel_shape:F?Array.from(E().subarray(Number(F)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],strides:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[]})},844482:(d,h)=>{t.kb("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},844569:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("MaxPool",d,{format:st?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:v,storage_order:T,dilations:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[],kernel_shape:F?Array.from(E().subarray(Number(F)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],strides:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[]})},845044:(d,h)=>{t.kb("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},845131:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st)=>{t.kb("MaxPool",d,{format:st?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:v,storage_order:T,dilations:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[],kernel_shape:F?Array.from(E().subarray(Number(F)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],strides:Ae?Array.from(E().subarray(Number(Ae)>>>0,Number(Fe)>>>0)):[]})},845606:(d,h,y,v,T)=>{t.kb("Gemm",d,{alpha:h,beta:y,transA:v,transB:T})},845710:d=>{t.kb("MatMul",d,void 0)},845764:(d,h,y,v)=>{t.kb("ArgMax",d,{keepDims:!!h,selectLastIndex:!!y,axis:v})},845872:(d,h,y,v)=>{t.kb("ArgMin",d,{keepDims:!!h,selectLastIndex:!!y,axis:v})},845980:(d,h)=>{t.kb("Softmax",d,{axis:h})},846043:(d,h)=>{t.kb("Concat",d,{axis:h})},846103:(d,h,y,v,T)=>{t.kb("Split",d,{axis:h,numOutputs:y,splitSizes:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},846259:d=>{t.kb("Expand",d,void 0)},846313:(d,h)=>{t.kb("Gather",d,{axis:Number(h)})},846384:(d,h)=>{t.kb("GatherElements",d,{axis:Number(h)})},846463:(d,h)=>{t.kb("GatherND",d,{batch_dims:Number(h)})},846542:(d,h,y,v,T,C,z,F,j,Y,be)=>{t.kb("Resize",d,{antialias:h,axes:y?Array.from(E().subarray(Number(y)>>>0,Number(v)>>>0)):[],coordinateTransformMode:Ze(T),cubicCoeffA:C,excludeOutside:z,extrapolationValue:F,keepAspectRatioPolicy:Ze(j),mode:Ze(Y),nearestMode:Ze(be)})},846904:(d,h,y,v,T,C,z)=>{t.kb("Slice",d,{starts:h?Array.from(E().subarray(Number(h)>>>0,Number(y)>>>0)):[],ends:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[],axes:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[]})},847168:d=>{t.kb("Tile",d,void 0)},847220:(d,h,y)=>{t.kb("InstanceNormalization",d,{epsilon:h,format:y?"NHWC":"NCHW"})},847334:(d,h,y)=>{t.kb("InstanceNormalization",d,{epsilon:h,format:y?"NHWC":"NCHW"})},847448:d=>{t.kb("Range",d,void 0)},847501:(d,h)=>{t.kb("Einsum",d,{equation:Ze(h)})},847582:(d,h,y,v,T)=>{t.kb("Pad",d,{mode:h,value:y,pads:v?Array.from(E().subarray(Number(v)>>>0,Number(T)>>>0)):[]})},847725:(d,h,y,v,T,C)=>{t.kb("BatchNormalization",d,{epsilon:h,momentum:y,spatial:!!T,trainingMode:!!v,format:C?"NHWC":"NCHW"})},847894:(d,h,y,v,T,C)=>{t.kb("BatchNormalization",d,{epsilon:h,momentum:y,spatial:!!T,trainingMode:!!v,format:C?"NHWC":"NCHW"})},848063:(d,h,y)=>{t.kb("CumSum",d,{exclusive:Number(h),reverse:Number(y)})},848160:(d,h,y)=>{t.kb("DequantizeLinear",d,{axis:h,blockSize:y})},848250:(d,h,y,v,T)=>{t.kb("GridSample",d,{align_corners:h,mode:Ze(y),padding_mode:Ze(v),format:T?"NHWC":"NCHW"})},848420:(d,h,y,v,T)=>{t.kb("GridSample",d,{align_corners:h,mode:Ze(y),padding_mode:Ze(v),format:T?"NHWC":"NCHW"})},848590:(d,h)=>{t.kb("ScatterND",d,{reduction:Ze(h)})},848675:(d,h,y,v,T,C,z,F,j)=>{t.kb("Attention",d,{numHeads:h,isUnidirectional:y,maskFilterValue:v,scale:T,doRotary:C,qkvHiddenSizes:z?Array.from(E().subarray(Number(F)>>>0,Number(F)+z>>>0)):[],pastPresentShareBuffer:!!j})},848947:d=>{t.kb("BiasAdd",d,void 0)},849002:d=>{t.kb("BiasSplitGelu",d,void 0)},849063:d=>{t.kb("FastGelu",d,void 0)},849119:(d,h,y,v,T,C,z,F,j,Y,be,Ae,Fe,st,Wn,IT)=>{t.kb("Conv",d,{format:Ae?"NHWC":"NCHW",auto_pad:h,dilations:y?Array.from(E().subarray(Number(y)>>>0,Number(v)>>>0)):[],group:T,kernel_shape:C?Array.from(E().subarray(Number(C)>>>0,Number(z)>>>0)):[],pads:F?Array.from(E().subarray(Number(F)>>>0,Number(j)>>>0)):[],strides:Y?Array.from(E().subarray(Number(Y)>>>0,Number(be)>>>0)):[],w_is_const:()=>!!de()[Number(Fe)>>>0],activation:Ze(st),activation_params:Wn?Array.from(Ie().subarray(Number(Wn)>>>0,Number(IT)>>>0)):[]})},849703:d=>{t.kb("Gelu",d,void 0)},849755:(d,h,y,v,T,C,z,F,j)=>{t.kb("GroupQueryAttention",d,{numHeads:h,kvNumHeads:y,scale:v,softcap:T,doRotary:C,rotaryInterleaved:z,smoothSoftmax:F,localWindowSize:j})},849972:(d,h,y,v)=>{t.kb("LayerNormalization",d,{axis:h,epsilon:y,simplified:!!v})},850083:(d,h,y,v)=>{t.kb("LayerNormalization",d,{axis:h,epsilon:y,simplified:!!v})},850194:(d,h,y,v,T,C)=>{t.kb("MatMulNBits",d,{k:h,n:y,accuracyLevel:v,bits:T,blockSize:C})},850321:(d,h,y,v,T,C)=>{t.kb("MultiHeadAttention",d,{numHeads:h,isUnidirectional:y,maskFilterValue:v,scale:T,doRotary:C})},850480:(d,h)=>{t.kb("QuickGelu",d,{alpha:h})},850544:(d,h,y,v,T)=>{t.kb("RotaryEmbedding",d,{interleaved:!!h,numHeads:y,rotaryEmbeddingDim:v,scale:T})},850683:(d,h,y)=>{t.kb("SkipLayerNormalization",d,{epsilon:h,simplified:!!y})},850785:(d,h,y)=>{t.kb("SkipLayerNormalization",d,{epsilon:h,simplified:!!y})},850887:(d,h,y,v)=>{t.kb("GatherBlockQuantized",d,{gatherAxis:h,quantizeAxis:y,blockSize:v})},851008:d=>{t.$b(d)},851042:(d,h)=>t.bc(Number(d),Number(h),t.Gb.ec,t.Gb.errors)};function nw(d,h,y){return vd(async()=>{await t.Yb(Number(d),Number(h),Number(y))})}function ow(){return typeof wasmOffsetConverter<"u"}class Qa{name="ExitStatus";constructor(h){this.message=`Program terminated with exit(${h})`,this.status=h}}var Vc=d=>{d.terminate(),d.onmessage=()=>{}},es=[],Gc=d=>{en.length==0&&(Kc(),jc(en[0]));var h=en.pop();if(!h)return 6;co.push(h),yn[d.Bb]=h,h.Bb=d.Bb;var y={Cb:"run",hc:d.fc,Ib:d.Ib,Bb:d.Bb};return h.postMessage(y,d.Nb),0},Qr=0,He=(d,h,...y)=>{for(var v=2*y.length,T=ys(),C=bs(8*v),z=C>>>3,F=0;F<y.length;F++){var j=y[F];typeof j=="bigint"?(G[z+2*F]=1n,G[z+2*F+1]=j):(G[z+2*F]=0n,rt()[z+2*F+1>>>0]=j)}return d=Gd(d,0,v,C,h),Qo(T),d};function ts(d){if(s)return He(0,1,d);if(P=d,!(0<Qr)){for(var h of co)Vc(h);for(h of en)Vc(h);en=[],co=[],yn={},ge=!0}g(0,new Qa(d))}function Uc(d){if(s)return He(1,0,d);rs(d)}var rs=d=>{if(P=d,s)throw Uc(d),"unwind";ts(d)},en=[],co=[],Wc=[],yn={},Hc=d=>{var h=d.Bb;delete yn[h],en.push(d),co.splice(co.indexOf(d),1),d.Bb=0,Ud(h)};function qc(){Wc.forEach(d=>d())}var jc=d=>new Promise(h=>{d.onmessage=T=>{var C=(T=T.data).Cb;if(T.Hb&&T.Hb!=Jo()){var z=yn[T.Hb];z?z.postMessage(T,T.Nb):I(`Internal error! Worker sent a message "${C}" to target pthread ${T.Hb}, but that thread no longer exists!`)}else C==="checkMailbox"?Uo():C==="spawnThread"?Gc(T):C==="cleanupThread"?Hc(yn[T.ic]):C==="loaded"?(d.loaded=!0,h(d)):C==="alert"?alert(`Thread ${T.jc}: ${T.text}`):T.target==="setimmediate"?d.postMessage(T):C==="callHandler"?t[T.Rb](...T.args):C&&I(`worker sent an unknown command ${C}`)},d.onerror=T=>{throw I(`worker sent an error! ${T.filename}:${T.lineno}: ${T.message}`),T};var y,v=[];for(y of[])t.propertyIsEnumerable(y)&&v.push(y);d.postMessage({Cb:"load",Sb:v,lc:$,mc:A})});function Kc(){var d=new Worker((()=>{let h=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new h("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});en.push(d)}var iw=d=>{$e();var h=q()[d+52>>>2>>>0];d=q()[d+56>>>2>>>0],qd(h,h-d),Qo(h)},aw=(d,h)=>{Qr=0,d=jd(d,h),0<Qr?P=d:gs(d)};class sw{constructor(h){this.Jb=h-24}}function uw(d,h,y){var v=new sw(d>>>=0);throw h>>>=0,y>>>=0,q()[v.Jb+16>>>2>>>0]=0,q()[v.Jb+4>>>2>>>0]=h,q()[v.Jb+8>>>2>>>0]=y,d}function Xc(d,h,y,v){return s?He(2,1,d,h,y,v):Zc(d,h,y,v)}function Zc(d,h,y,v){if(d>>>=0,y>>>=0,v>>>=0,u===void 0)return 6;var T=[];return s&&T.length===0?Xc(d,h>>>=0,y,v):(d={fc:y,Bb:d,Ib:v,Nb:T},s?(d.Cb="spawnThread",postMessage(d,T),0):Gc(d))}var Jc=typeof TextDecoder<"u"?new TextDecoder:void 0,Yc=(d,h=0,y=NaN)=>{var v=(h>>>=0)+y;for(y=h;d[y]&&!(y>=v);)++y;if(16<y-h&&d.buffer&&Jc)return Jc.decode(d.buffer instanceof ArrayBuffer?d.subarray(h,y):d.slice(h,y));for(v="";h<y;){var T=d[h++];if(128&T){var C=63&d[h++];if((224&T)==192)v+=String.fromCharCode((31&T)<<6|C);else{var z=63&d[h++];65536>(T=(240&T)==224?(15&T)<<12|C<<6|z:(7&T)<<18|C<<12|z<<6|63&d[h++])?v+=String.fromCharCode(T):(T-=65536,v+=String.fromCharCode(55296|T>>10,56320|1023&T))}}else v+=String.fromCharCode(T)}return v},Ze=(d,h)=>(d>>>=0)?Yc(Ve(),d,h):"";function Qc(d,h,y){return s?He(3,1,d,h,y):0}function ed(d,h){if(s)return He(4,1,d,h)}var td=d=>{for(var h=0,y=0;y<d.length;++y){var v=d.charCodeAt(y);127>=v?h++:2047>=v?h+=2:55296<=v&&57343>=v?(h+=4,++y):h+=3}return h},Gn=(d,h,y)=>{var v=Ve();if(h>>>=0,0<y){var T=h;y=h+y-1;for(var C=0;C<d.length;++C){var z=d.charCodeAt(C);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&d.charCodeAt(++C)),127>=z){if(h>=y)break;v[h++>>>0]=z}else{if(2047>=z){if(h+1>=y)break;v[h++>>>0]=192|z>>6}else{if(65535>=z){if(h+2>=y)break;v[h++>>>0]=224|z>>12}else{if(h+3>=y)break;v[h++>>>0]=240|z>>18,v[h++>>>0]=128|z>>12&63}v[h++>>>0]=128|z>>6&63}v[h++>>>0]=128|63&z}}v[h>>>0]=0,d=h-T}else d=0;return d};function rd(d,h){if(s)return He(5,1,d,h)}function nd(d,h,y){if(s)return He(6,1,d,h,y)}function od(d,h,y){return s?He(7,1,d,h,y):0}function id(d,h){if(s)return He(8,1,d,h)}function ad(d,h,y){if(s)return He(9,1,d,h,y)}function sd(d,h,y,v){if(s)return He(10,1,d,h,y,v)}function ud(d,h,y,v){if(s)return He(11,1,d,h,y,v)}function ld(d,h,y,v){if(s)return He(12,1,d,h,y,v)}function cd(d){if(s)return He(13,1,d)}function dd(d,h){if(s)return He(14,1,d,h)}function pd(d,h,y){if(s)return He(15,1,d,h,y)}var fd,tn,lw=()=>Yr(""),Zt=d=>{for(var h="";Ve()[d>>>0];)h+=fd[Ve()[d++>>>0]];return h},ns={},os={},cw={};function Wr(d,h,y={}){return function(v,T,C={}){var z=T.name;if(!v)throw new tn(`type "${z}" must have a positive integer typeid pointer`);if(os.hasOwnProperty(v)){if(C.Tb)return;throw new tn(`Cannot register type '${z}' twice`)}os[v]=T,delete cw[v],ns.hasOwnProperty(v)&&(T=ns[v],delete ns[v],T.forEach(F=>F()))}(d,h,y)}var hd=(d,h,y)=>{switch(h){case 1:return y?v=>de()[v>>>0]:v=>Ve()[v>>>0];case 2:return y?v=>Be()[v>>>1>>>0]:v=>ue()[v>>>1>>>0];case 4:return y?v=>E()[v>>>2>>>0]:v=>q()[v>>>2>>>0];case 8:return y?v=>G[v>>>3]:v=>Te[v>>>3];default:throw new TypeError(`invalid integer width (${h}): ${d}`)}};function dw(d,h,y){y>>>=0,Wr(d>>>=0,{name:h=Zt(h>>>0),fromWireType:v=>v,toWireType:function(v,T){if(typeof T!="bigint"&&typeof T!="number")throw T=T===null?"null":(v=typeof T)=="object"||v==="array"||v==="function"?T.toString():""+T,new TypeError(`Cannot convert "${T}" to ${this.name}`);return typeof T=="number"&&(T=BigInt(T)),T},Db:rn,readValueFromPointer:hd(h,y,h.indexOf("u")==-1),Eb:null})}var rn=8;function pw(d,h,y,v){Wr(d>>>=0,{name:h=Zt(h>>>0),fromWireType:function(T){return!!T},toWireType:function(T,C){return C?y:v},Db:rn,readValueFromPointer:function(T){return this.fromWireType(Ve()[T>>>0])},Eb:null})}var is=[],Hr=[];function as(d){9<(d>>>=0)&&--Hr[d+1]==0&&(Hr[d]=void 0,is.push(d))}var pt=d=>{if(!d)throw new tn("Cannot use deleted val. handle = "+d);return Hr[d]},Ot=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=is.pop()||Hr.length;return Hr[h]=d,Hr[h+1]=1,h}};function ss(d){return this.fromWireType(q()[d>>>2>>>0])}var fw={name:"emscripten::val",fromWireType:d=>{var h=pt(d);return as(d),h},toWireType:(d,h)=>Ot(h),Db:rn,readValueFromPointer:ss,Eb:null};function hw(d){return Wr(d>>>0,fw)}var mw=(d,h)=>{switch(h){case 4:return function(y){return this.fromWireType(Ie()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(rt()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${d}`)}};function gw(d,h,y){y>>>=0,Wr(d>>>=0,{name:h=Zt(h>>>0),fromWireType:v=>v,toWireType:(v,T)=>T,Db:rn,readValueFromPointer:mw(h,y),Eb:null})}function bw(d,h,y,v,T){if(d>>>=0,y>>>=0,h=Zt(h>>>0),T===-1&&(T=4294967295),T=F=>F,v===0){var C=32-8*y;T=F=>F<<C>>>C}var z=h.includes("unsigned")?function(F,j){return j>>>0}:function(F,j){return j};Wr(d,{name:h,fromWireType:T,toWireType:z,Db:rn,readValueFromPointer:hd(h,y,v!==0),Eb:null})}function yw(d,h,y){function v(C){var z=q()[C>>>2>>>0];return C=q()[C+4>>>2>>>0],new T(de().buffer,C,z)}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];Wr(d>>>=0,{name:y=Zt(y>>>0),fromWireType:v,Db:rn,readValueFromPointer:v},{Tb:!0})}function _w(d,h){Wr(d>>>=0,{name:h=Zt(h>>>0),fromWireType:function(y){for(var v,T=q()[y>>>2>>>0],C=y+4,z=C,F=0;F<=T;++F){var j=C+F;F!=T&&Ve()[j>>>0]!=0||(z=Ze(z,j-z),v===void 0?v=z:(v+="\0",v+=z),z=j+1)}return Yt(y),v},toWireType:function(y,v){v instanceof ArrayBuffer&&(v=new Uint8Array(v));var T=typeof v=="string";if(!(T||v instanceof Uint8Array||v instanceof Uint8ClampedArray||v instanceof Int8Array))throw new tn("Cannot pass non-string to std::string");var C=T?td(v):v.length,z=Yo(4+C+1),F=z+4;if(q()[z>>>2>>>0]=C,T)Gn(v,F,C+1);else if(T)for(T=0;T<C;++T){var j=v.charCodeAt(T);if(255<j)throw Yt(z),new tn("String has UTF-16 code units that do not fit in 8 bits");Ve()[F+T>>>0]=j}else for(T=0;T<C;++T)Ve()[F+T>>>0]=v[T];return y!==null&&y.push(Yt,z),z},Db:rn,readValueFromPointer:ss,Eb(y){Yt(y)}})}var md=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,vw=(d,h)=>{for(var y=d>>1,v=y+h/2;!(y>=v)&&ue()[y>>>0];)++y;if(32<(y<<=1)-d&&md)return md.decode(Ve().slice(d,y));for(y="",v=0;!(v>=h/2);++v){var T=Be()[d+2*v>>>1>>>0];if(T==0)break;y+=String.fromCharCode(T)}return y},xw=(d,h,y)=>{if(y??=2147483647,2>y)return 0;var v=h;y=(y-=2)<2*d.length?y/2:d.length;for(var T=0;T<y;++T){var C=d.charCodeAt(T);Be()[h>>>1>>>0]=C,h+=2}return Be()[h>>>1>>>0]=0,h-v},ww=d=>2*d.length,Tw=(d,h)=>{for(var y=0,v="";!(y>=h/4);){var T=E()[d+4*y>>>2>>>0];if(T==0)break;++y,65536<=T?(T-=65536,v+=String.fromCharCode(55296|T>>10,56320|1023&T)):v+=String.fromCharCode(T)}return v},Iw=(d,h,y)=>{if(h>>>=0,y??=2147483647,4>y)return 0;var v=h;y=v+y-4;for(var T=0;T<d.length;++T){var C=d.charCodeAt(T);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&d.charCodeAt(++T)),E()[h>>>2>>>0]=C,(h+=4)+4>y)break}return E()[h>>>2>>>0]=0,h-v},Sw=d=>{for(var h=0,y=0;y<d.length;++y){var v=d.charCodeAt(y);55296<=v&&57343>=v&&++y,h+=4}return h};function $w(d,h,y){if(d>>>=0,h>>>=0,y=Zt(y>>>=0),h===2)var v=vw,T=xw,C=ww,z=F=>ue()[F>>>1>>>0];else h===4&&(v=Tw,T=Iw,C=Sw,z=F=>q()[F>>>2>>>0]);Wr(d,{name:y,fromWireType:F=>{for(var j,Y=q()[F>>>2>>>0],be=F+4,Ae=0;Ae<=Y;++Ae){var Fe=F+4+Ae*h;Ae!=Y&&z(Fe)!=0||(be=v(be,Fe-be),j===void 0?j=be:(j+="\0",j+=be),be=Fe+h)}return Yt(F),j},toWireType:(F,j)=>{if(typeof j!="string")throw new tn(`Cannot pass non-string to C++ string type ${y}`);var Y=C(j),be=Yo(4+Y+h);return q()[be>>>2>>>0]=Y/h,T(j,be+4,Y+h),F!==null&&F.push(Yt,be),be},Db:rn,readValueFromPointer:ss,Eb(F){Yt(F)}})}function Aw(d,h){Wr(d>>>=0,{Ub:!0,name:h=Zt(h>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function Ow(d){ms(d>>>0,!a,1,!i,131072,!1),qc()}var us=d=>{if(!ge)try{if(d(),!(0<Qr))try{s?gs(P):rs(P)}catch(h){h instanceof Qa||h=="unwind"||g(0,h)}}catch(h){h instanceof Qa||h=="unwind"||g(0,h)}};function ls(d){d>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(E(),d>>>2,d).value.then(Uo),d+=128,Atomics.store(E(),d>>>2,1))}var Uo=()=>{var d=Jo();d&&(ls(d),us(Hd))};function Pw(d,h){(d>>>=0)==h>>>0?setTimeout(Uo):s?postMessage({Hb:d,Cb:"checkMailbox"}):(d=yn[d])&&d.postMessage({Cb:"checkMailbox"})}var cs=[];function Ew(d,h,y,v,T){for(h>>>=0,v/=2,cs.length=v,y=T>>>0>>>3,T=0;T<v;T++)cs[T]=G[y+2*T]?G[y+2*T+1]:rt()[y+2*T+1>>>0];return(h?Ya[h]:TT[d])(...cs)}var Cw=()=>{Qr=0};function Dw(d){d>>>=0,s?postMessage({Cb:"cleanupThread",ic:d}):Hc(yn[d])}function kw(d){}var Wo=(d,h)=>{var y=os[d];if(y===void 0)throw d=Bd(d),y=Zt(d),Yt(d),new tn(`${h} has unknown type ${y}`);return y},gd=(d,h,y)=>{var v=[];return d=d.toWireType(v,y),v.length&&(q()[h>>>2>>>0]=Ot(v)),d};function Nw(d,h,y){return h>>>=0,y>>>=0,d=pt(d>>>0),h=Wo(h,"emval::as"),gd(h,y,d)}function Lw(d,h){return h>>>=0,d=pt(d>>>0),(h=Wo(h,"emval::as")).toWireType(null,d)}var Ho=d=>{try{d()}catch(h){Yr(h)}},nn=0,Jt=null,bd=0,qo=[],yd={},_d={},Rw=0,ds=null,zw=[];function vd(d){return function(h){if(!ge){if(nn===0){var y=!1,v=!1;h((T=0)=>{if(!ge&&(bd=T,y=!0,v)){nn=2,Ho(()=>Zd(Jt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),T=!1;try{var C=function(){var j=E()[Jt+8>>>2>>>0];return j=ne[_d[j]],--Qr,j()}()}catch(j){C=j,T=!0}var z=!1;if(!Jt){var F=ds;F&&(ds=null,(T?F.reject:F.resolve)(C),z=!0)}if(T&&!z)throw C}}),v=!0,y||(nn=1,Jt=function(){var T=Yo(65548),C=T+12;q()[T>>>2>>>0]=C,q()[T+4>>>2>>>0]=C+65536,C=qo[0];var z=yd[C];return z===void 0&&(z=Rw++,yd[C]=z,_d[z]=C),C=z,E()[T+8>>>2>>>0]=C,T}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Ho(()=>Kd(Jt)))}else nn===2?(nn=0,Ho(Jd),Yt(Jt),Jt=null,zw.forEach(us)):Yr(`invalid state: ${nn}`);return bd}}(h=>{d().then(h)})}function Mw(d){return d>>>=0,vd(async()=>{var h=await pt(d);return Ot(h)})}var jo=[];function Bw(d,h,y,v){return y>>>=0,v>>>=0,(d=jo[d>>>0])(null,h=pt(h>>>0),y,v)}var Fw={},Ko=d=>{var h=Fw[d];return h===void 0?Zt(d):h};function Vw(d,h,y,v,T){return y>>>=0,v>>>=0,T>>>=0,(d=jo[d>>>0])(h=pt(h>>>0),h[y=Ko(y)],v,T)}function Gw(d,h){return h>>>=0,(d=pt(d>>>0))==pt(h)}var xd=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Uw(d){return(d>>>=0)==0?Ot(xd()):(d=Ko(d),Ot(xd()[d]))}var Ww=d=>{var h=jo.length;return jo.push(d),h},Hw=(d,h)=>{for(var y=Array(d),v=0;v<d;++v)y[v]=Wo(q()[h+4*v>>>2>>>0],"parameter "+v);return y},wd=(d,h)=>Object.defineProperty(h,"name",{value:d});function qw(d,h,y){var v=(h=Hw(d,h>>>0)).shift();d--;var T=`return function (obj, func, destructorsRef, args) {
`,C=0,z=[];y===0&&z.push("obj");for(var F=["retType"],j=[v],Y=0;Y<d;++Y)z.push("arg"+Y),F.push("argType"+Y),j.push(h[Y]),T+=`  var arg${Y} = argType${Y}.readValueFromPointer(args${C?"+"+C:""});
`,C+=h[Y].Db;return T+=`  var rv = ${y===1?"new func":"func.call"}(${z.join(", ")});
`,v.Ub||(F.push("emval_returnValue"),j.push(gd),T+=`  return emval_returnValue(retType, destructorsRef, rv);
`),F.push(T+`};
`),d=function(be){var Ae=Function;if(!(Ae instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Ae} which is not a function`);var Fe=wd(Ae.name||"unknownFunctionName",function(){});return Fe.prototype=Ae.prototype,Fe=new Fe,(be=Ae.apply(Fe,be))instanceof Object?be:Fe}(F)(...j),y=`methodCaller<(${h.map(be=>be.name).join(", ")}) => ${v.name}>`,Ww(wd(y,d))}function jw(d){return d=Ko(d>>>0),Ot(t[d])}function Kw(d,h){return h>>>=0,d=pt(d>>>0),h=pt(h),Ot(d[h])}function Xw(d){9<(d>>>=0)&&(Hr[d+1]+=1)}function Zw(){return Ot([])}function Jw(d){d=pt(d>>>0);for(var h=Array(d.length),y=0;y<d.length;y++)h[y]=d[y];return Ot(h)}function Yw(d){return Ot(Ko(d>>>0))}function Qw(){return Ot({})}function eT(d){for(var h=pt(d>>>=0);h.length;){var y=h.pop();h.pop()(y)}as(d)}function tT(d,h,y){h>>>=0,y>>>=0,d=pt(d>>>0),h=pt(h),y=pt(y),d[h]=y}function rT(d,h){return h>>>=0,d=(d=Wo(d>>>0,"_emval_take_value")).readValueFromPointer(h),Ot(d)}function nT(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),E()[h>>>2>>>0]=d.getUTCSeconds(),E()[h+4>>>2>>>0]=d.getUTCMinutes(),E()[h+8>>>2>>>0]=d.getUTCHours(),E()[h+12>>>2>>>0]=d.getUTCDate(),E()[h+16>>>2>>>0]=d.getUTCMonth(),E()[h+20>>>2>>>0]=d.getUTCFullYear()-1900,E()[h+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,E()[h+28>>>2>>>0]=d}var Td=d=>d%4==0&&(d%100!=0||d%400==0),Id=[0,31,60,91,121,152,182,213,244,274,305,335],Sd=[0,31,59,90,120,151,181,212,243,273,304,334];function oT(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),E()[h>>>2>>>0]=d.getSeconds(),E()[h+4>>>2>>>0]=d.getMinutes(),E()[h+8>>>2>>>0]=d.getHours(),E()[h+12>>>2>>>0]=d.getDate(),E()[h+16>>>2>>>0]=d.getMonth(),E()[h+20>>>2>>>0]=d.getFullYear()-1900,E()[h+24>>>2>>>0]=d.getDay();var y=(Td(d.getFullYear())?Id:Sd)[d.getMonth()]+d.getDate()-1|0;E()[h+28>>>2>>>0]=y,E()[h+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var v=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=v&&d.getTimezoneOffset()==Math.min(v,y)),E()[h+32>>>2>>>0]=d}function iT(d){d>>>=0;var h=new Date(E()[d+20>>>2>>>0]+1900,E()[d+16>>>2>>>0],E()[d+12>>>2>>>0],E()[d+8>>>2>>>0],E()[d+4>>>2>>>0],E()[d>>>2>>>0],0),y=E()[d+32>>>2>>>0],v=h.getTimezoneOffset(),T=new Date(h.getFullYear(),6,1).getTimezoneOffset(),C=new Date(h.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(C,T);return 0>y?E()[d+32>>>2>>>0]=+(T!=C&&z==v):0<y!=(z==v)&&(T=Math.max(C,T),h.setTime(h.getTime()+6e4*((0<y?z:T)-v))),E()[d+24>>>2>>>0]=h.getDay(),y=(Td(h.getFullYear())?Id:Sd)[h.getMonth()]+h.getDate()-1|0,E()[d+28>>>2>>>0]=y,E()[d>>>2>>>0]=h.getSeconds(),E()[d+4>>>2>>>0]=h.getMinutes(),E()[d+8>>>2>>>0]=h.getHours(),E()[d+12>>>2>>>0]=h.getDate(),E()[d+16>>>2>>>0]=h.getMonth(),E()[d+20>>>2>>>0]=h.getYear(),d=h.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function $d(d,h,y,v,T,C,z){return s?He(16,1,d,h,y,v,T,C,z):-52}function Ad(d,h,y,v,T,C){if(s)return He(17,1,d,h,y,v,T,C)}var po={},aT=()=>performance.timeOrigin+performance.now();function Od(d,h){if(s)return He(18,1,d,h);if(po[d]&&(clearTimeout(po[d].id),delete po[d]),!h)return 0;var y=setTimeout(()=>{delete po[d],us(()=>Wd(d,performance.timeOrigin+performance.now()))},h);return po[d]={id:y,rc:h},0}function sT(d,h,y,v){d>>>=0,h>>>=0,y>>>=0,v>>>=0;var T=new Date().getFullYear(),C=new Date(T,0,1).getTimezoneOffset();T=new Date(T,6,1).getTimezoneOffset();var z=Math.max(C,T);q()[d>>>2>>>0]=60*z,E()[h>>>2>>>0]=+(C!=T),d=(h=F=>{var j=Math.abs(F);return`UTC${0<=F?"-":"+"}${String(Math.floor(j/60)).padStart(2,"0")}${String(j%60).padStart(2,"0")}`})(C),h=h(T),T<C?(Gn(d,y,17),Gn(h,v,17)):(Gn(d,v,17),Gn(h,y,17))}var uT=()=>Date.now(),lT=1;function cT(d,h,y){if(!(0<=d&&3>=d))return 28;if(d===0)d=Date.now();else{if(!lT)return 52;d=performance.timeOrigin+performance.now()}return G[y>>>0>>>3]=BigInt(Math.round(1e6*d)),0}var ps=[],Pd=(d,h)=>{ps.length=0;for(var y;y=Ve()[d++>>>0];){var v=y!=105;h+=(v&=y!=112)&&h%8?4:0,ps.push(y==112?q()[h>>>2>>>0]:y==106?G[h>>>3]:y==105?E()[h>>>2>>>0]:rt()[h>>>3>>>0]),h+=v?8:4}return ps};function dT(d,h,y){return d>>>=0,h=Pd(h>>>0,y>>>0),Ya[d](...h)}function pT(d,h,y){return d>>>=0,h=Pd(h>>>0,y>>>0),Ya[d](...h)}var fT=()=>{};function hT(d,h){return I(Ze(d>>>0,h>>>0))}var mT=()=>{throw Qr+=1,"unwind"};function gT(){return 4294901760}var bT=()=>navigator.hardwareConcurrency;function yT(){return Yr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function _T(d){d>>>=0;var h=Ve().length;if(d<=h||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var v=h*(1+.2/y);v=Math.min(v,d+100663296);e:{v=(Math.min(4294901760,65536*Math.ceil(Math.max(d,v)/65536))-$.buffer.byteLength+65535)/65536|0;try{$.grow(v),$e();var T=1;break e}catch{}T=void 0}if(T)return!0}return!1}var Xo=()=>(Yr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Un={},Ed=d=>{d.forEach(h=>{var y=Xo();y&&(Un[y]=h)})};function vT(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Ed(d),Un.Mb=Xo(),Un.dc=d,Un.Mb}function xT(d,h,y){if(d>>>=0,h>>>=0,Un.Mb==d)var v=Un.dc;else(v=Error().stack.toString().split(`
`))[0]=="Error"&&v.shift(),Ed(v);for(var T=3;v[T]&&Xo()!=d;)++T;for(d=0;d<y&&v[d+T];++d)E()[h+4*d>>>2>>>0]=Xo();return d}var fs,hs={},Cd=()=>{if(!fs){var d,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in hs)hs[d]===void 0?delete h[d]:h[d]=hs[d];var y=[];for(d in h)y.push(`${d}=${h[d]}`);fs=y}return fs};function Dd(d,h){if(s)return He(19,1,d,h);d>>>=0,h>>>=0;var y=0;return Cd().forEach((v,T)=>{var C=h+y;for(T=q()[d+4*T>>>2>>>0]=C,C=0;C<v.length;++C)de()[T++>>>0]=v.charCodeAt(C);de()[T>>>0]=0,y+=v.length+1}),0}function kd(d,h){if(s)return He(20,1,d,h);d>>>=0,h>>>=0;var y=Cd();q()[d>>>2>>>0]=y.length;var v=0;return y.forEach(T=>v+=T.length+1),q()[h>>>2>>>0]=v,0}function Nd(d){return s?He(21,1,d):52}function Ld(d,h,y,v){return s?He(22,1,d,h,y,v):52}function Rd(d,h,y,v){return s?He(23,1,d,h,y,v):70}var wT=[null,[],[]];function zd(d,h,y,v){if(s)return He(24,1,d,h,y,v);h>>>=0,y>>>=0,v>>>=0;for(var T=0,C=0;C<y;C++){var z=q()[h>>>2>>>0],F=q()[h+4>>>2>>>0];h+=8;for(var j=0;j<F;j++){var Y=Ve()[z+j>>>0],be=wT[d];Y===0||Y===10?((d===1?x:I)(Yc(be)),be.length=0):be.push(Y)}T+=F}return q()[v>>>2>>>0]=T,0}s||function(){for(var d=t.numThreads-1;d--;)Kc();es.unshift(()=>{Jr++,function(h){s?h():Promise.all(en.map(jc)).then(h)}(()=>Bc())})}();for(var Md=Array(256),Zo=0;256>Zo;++Zo)Md[Zo]=String.fromCharCode(Zo);fd=Md,tn=t.BindingError=class extends Error{constructor(d){super(d),this.name="BindingError"}},t.InternalError=class extends Error{constructor(d){super(d),this.name="InternalError"}},Hr.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>Hr.length/2-5-is.length;var ne,TT=[ts,Uc,Xc,Qc,ed,rd,nd,od,id,ad,sd,ud,ld,cd,dd,pd,$d,Ad,Od,Dd,kd,Nd,Ld,Rd,zd];(async function(){function d(v,T){return ne=v.exports,ne=function(){var C=ne,z={};for(let[F,j]of Object.entries(C))z[F]=typeof j=="function"?(...Y)=>{qo.push(F);try{return j(...Y)}finally{ge||(qo.pop(),Jt&&nn===1&&qo.length===0&&(nn=0,Qr+=1,Ho(Xd),typeof Fibers<"u"&&Fibers.sc()))}}:j;return z}(),ne=function(){var C=ne,z=j=>Y=>j(Y)>>>0,F=j=>()=>j()>>>0;return(C=Object.assign({},C)).Ea=z(C.Ea),C.gb=F(C.gb),C.ib=z(C.ib),C.ub=z(C.ub),C.vb=F(C.vb),C.__cxa_get_exception_ptr=z(C.__cxa_get_exception_ptr),C}(),Wc.push(ne.jb),A=T,Bc(),ne}Jr++;var h=Fc();if(t.instantiateWasm)return new Promise(v=>{t.instantiateWasm(h,(T,C)=>{d(T,C),v(T.exports)})});if(s)return new Promise(v=>{mt=T=>{var C=new WebAssembly.Instance(T,Fc());v(d(C,T))}});Zr??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",b):b+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var y=await async function(v){var T=Zr;if(!K&&typeof WebAssembly.instantiateStreaming=="function"&&!re(T))try{var C=fetch(T,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(C,v)}catch(z){I(`wasm streaming compile failed: ${z}`),I("falling back to ArrayBuffer instantiation")}return async function(z,F){try{var j=await async function(Y){if(!K)try{var be=await p(Y);return new Uint8Array(be)}catch{}if(Y==Zr&&K)Y=new Uint8Array(K);else{if(!f)throw"both async and sync fetching of the wasm failed";Y=f(Y)}return Y}(z);return await WebAssembly.instantiate(j,F)}catch(Y){I(`failed to asynchronously prepare wasm: ${Y}`),Yr(Y)}}(T,v)}(h);return d(y.instance,y.module)}catch(v){return r(v),Promise.reject(v)}})();var Bd=d=>(Bd=ne.Ea)(d),Fd=()=>(Fd=ne.Fa)();t._OrtInit=(d,h)=>(t._OrtInit=ne.Ga)(d,h),t._OrtGetLastError=(d,h)=>(t._OrtGetLastError=ne.Ha)(d,h),t._OrtCreateSessionOptions=(d,h,y,v,T,C,z,F,j,Y)=>(t._OrtCreateSessionOptions=ne.Ia)(d,h,y,v,T,C,z,F,j,Y),t._OrtAppendExecutionProvider=(d,h,y,v,T)=>(t._OrtAppendExecutionProvider=ne.Ja)(d,h,y,v,T),t._OrtAddFreeDimensionOverride=(d,h,y)=>(t._OrtAddFreeDimensionOverride=ne.Ka)(d,h,y),t._OrtAddSessionConfigEntry=(d,h,y)=>(t._OrtAddSessionConfigEntry=ne.La)(d,h,y),t._OrtReleaseSessionOptions=d=>(t._OrtReleaseSessionOptions=ne.Ma)(d),t._OrtCreateSession=(d,h,y)=>(t._OrtCreateSession=ne.Na)(d,h,y),t._OrtReleaseSession=d=>(t._OrtReleaseSession=ne.Oa)(d),t._OrtGetInputOutputCount=(d,h,y)=>(t._OrtGetInputOutputCount=ne.Pa)(d,h,y),t._OrtGetInputOutputMetadata=(d,h,y,v)=>(t._OrtGetInputOutputMetadata=ne.Qa)(d,h,y,v),t._OrtFree=d=>(t._OrtFree=ne.Ra)(d),t._OrtCreateTensor=(d,h,y,v,T,C)=>(t._OrtCreateTensor=ne.Sa)(d,h,y,v,T,C),t._OrtGetTensorData=(d,h,y,v,T)=>(t._OrtGetTensorData=ne.Ta)(d,h,y,v,T),t._OrtReleaseTensor=d=>(t._OrtReleaseTensor=ne.Ua)(d),t._OrtCreateRunOptions=(d,h,y,v)=>(t._OrtCreateRunOptions=ne.Va)(d,h,y,v),t._OrtAddRunConfigEntry=(d,h,y)=>(t._OrtAddRunConfigEntry=ne.Wa)(d,h,y),t._OrtReleaseRunOptions=d=>(t._OrtReleaseRunOptions=ne.Xa)(d),t._OrtCreateBinding=d=>(t._OrtCreateBinding=ne.Ya)(d),t._OrtBindInput=(d,h,y)=>(t._OrtBindInput=ne.Za)(d,h,y),t._OrtBindOutput=(d,h,y,v)=>(t._OrtBindOutput=ne._a)(d,h,y,v),t._OrtClearBoundOutputs=d=>(t._OrtClearBoundOutputs=ne.$a)(d),t._OrtReleaseBinding=d=>(t._OrtReleaseBinding=ne.ab)(d),t._OrtRunWithBinding=(d,h,y,v,T)=>(t._OrtRunWithBinding=ne.bb)(d,h,y,v,T),t._OrtRun=(d,h,y,v,T,C,z,F)=>(t._OrtRun=ne.cb)(d,h,y,v,T,C,z,F),t._OrtEndProfiling=d=>(t._OrtEndProfiling=ne.db)(d),t._JsepOutput=(d,h,y)=>(t._JsepOutput=ne.eb)(d,h,y),t._JsepGetNodeName=d=>(t._JsepGetNodeName=ne.fb)(d);var Jo=()=>(Jo=ne.gb)(),Yt=t._free=d=>(Yt=t._free=ne.hb)(d),Yo=t._malloc=d=>(Yo=t._malloc=ne.ib)(d),ms=(d,h,y,v,T,C)=>(ms=ne.lb)(d,h,y,v,T,C),Vd=()=>(Vd=ne.mb)(),Gd=(d,h,y,v,T)=>(Gd=ne.nb)(d,h,y,v,T),Ud=d=>(Ud=ne.ob)(d),gs=d=>(gs=ne.pb)(d),Wd=(d,h)=>(Wd=ne.qb)(d,h),Hd=()=>(Hd=ne.rb)(),qd=(d,h)=>(qd=ne.sb)(d,h),Qo=d=>(Qo=ne.tb)(d),bs=d=>(bs=ne.ub)(d),ys=()=>(ys=ne.vb)(),jd=t.dynCall_ii=(d,h)=>(jd=t.dynCall_ii=ne.wb)(d,h),Kd=d=>(Kd=ne.xb)(d),Xd=()=>(Xd=ne.yb)(),Zd=d=>(Zd=ne.zb)(d),Jd=()=>(Jd=ne.Ab)();return t.stackSave=()=>ys(),t.stackRestore=d=>Qo(d),t.stackAlloc=d=>bs(d),t.setValue=function(d,h,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":de()[d>>>0]=h;break;case"i16":Be()[d>>>1>>>0]=h;break;case"i32":E()[d>>>2>>>0]=h;break;case"i64":G[d>>>3]=BigInt(h);break;case"float":Ie()[d>>>2>>>0]=h;break;case"double":rt()[d>>>3>>>0]=h;break;case"*":q()[d>>>2>>>0]=h;break;default:Yr(`invalid type for setValue: ${y}`)}},t.getValue=function(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return de()[d>>>0];case"i16":return Be()[d>>>1>>>0];case"i32":return E()[d>>>2>>>0];case"i64":return G[d>>>3];case"float":return Ie()[d>>>2>>>0];case"double":return rt()[d>>>3>>>0];case"*":return q()[d>>>2>>>0];default:Yr(`invalid type for getValue: ${h}`)}},t.UTF8ToString=Ze,t.stringToUTF8=Gn,t.lengthBytesUTF8=td,function d(){if(0<Jr)Vn=d;else if(s)e(t),Bt();else{for(;0<es.length;)es.shift()(t);0<Jr?Vn=d:(t.calledRun=!0,ge||(Bt(),e(t)))}}(),t.PTR_SIZE=4,o}),$O=cy,AO=globalThis.self?.name?.startsWith("em-pthread");AO&&cy()});var my,Jl,OO,$t,gy,Zl,PO,EO,by,CO,fy,yy,hy,_y,sa=k(()=>{"use strict";aa();my=typeof location>"u"?void 0:location.origin,Jl=import.meta.url>"file:"&&import.meta.url<"file;",OO=()=>{if(!!1){if(Jl){let n=URL;return new URL(new n("ort.all.bundle.min.mjs",import.meta.url).href,my).href}return import.meta.url}},$t=OO(),gy=()=>{if($t&&!$t.startsWith("blob:"))return $t.substring(0,$t.lastIndexOf("/")+1)},Zl=(n,e)=>{try{let r=e??$t;return(r?new URL(n,r):new URL(n)).origin===my}catch{return!1}},PO=(n,e)=>{let r=e??$t;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},EO=(n,e)=>`${e??"./"}${n}`,by=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},CO=async n=>(await import(/*webpackIgnore:true*/n)).default,fy=(ly(),Hn(uy)).default,yy=async()=>{if(!$t)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Zl($t))return[void 0,fy()];let n=await by($t);return[n,fy(n)]},hy=(py(),Hn(dy)).default,_y=async(n,e,r)=>{if(!n&&!e&&hy&&$t&&Zl($t))return[void 0,hy];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??PO(t,e),i=!!1&&r&&o&&!Zl(o,e),a=i?await by(o):o??EO(t,e);return[i?a:void 0,await CO(a)]}}});var Yl,Ql,ga,vy,DO,kO,NO,ua,Re,hn=k(()=>{"use strict";sa();Ql=!1,ga=!1,vy=!1,DO=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},kO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},NO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ua=async n=>{if(Ql)return Promise.resolve();if(ga)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(vy)throw new Error("previous call to 'initializeWebAssembly()' failed.");ga=!0;let e=n.initTimeout,r=n.numThreads;if(n.simd!==!1){if(n.simd==="relaxed"){if(!NO())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!kO())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=DO();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,c=n.wasmBinary,[p,f]=await _y(s,i,r>1),m=!1,g=[];if(e>0&&g.push(new Promise(b=>{setTimeout(()=>{m=!0,b()},e)})),g.push(new Promise((b,w)=>{let _={numThreads:r};if(c)_.wasmBinary=c;else if(l||i)_.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)_.locateFile=x=>new URL(x,s).href;else if(p){let x=gy();x&&(_.locateFile=I=>x+I)}f(_).then(x=>{ga=!1,Ql=!0,Yl=x,b(),p&&URL.revokeObjectURL(p)},x=>{ga=!1,vy=!0,w(x)})})),await Promise.race(g),m)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Re=()=>{if(Ql&&Yl)return Yl;throw new Error("WebAssembly is not initialized yet.")}});var At,No,Ce,ba=k(()=>{"use strict";hn();At=(n,e)=>{let r=Re(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},No=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")No(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ce=n=>{let e=Re(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var xy,wy=k(()=>{"use strict";hn();ba();xy=n=>{let e=Re(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=At(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&Ce("Can't create run options."),n?.extra!==void 0&&No(n.extra,"",new WeakSet,(a,s)=>{let u=At(a,t),l=At(s,t);e._OrtAddRunConfigEntry(r,u,l)!==0&&Ce(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var LO,RO,zO,ya,MO,Ty,Iy=k(()=>{"use strict";hn();ba();LO=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},RO=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},zO=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},ya=(n,e,r,t)=>{let o=At(e,t),i=At(r,t);Re()._OrtAddSessionConfigEntry(n,o,i)!==0&&Ce(`Can't set a session config entry: ${e} - ${r}.`)},MO=async(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let p=t?.deviceType;p&&ya(n,"deviceType",p,r)}break;case"webgpu":if(o="JS",typeof t!="string"){let c=t;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);ya(n,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=At(o,r),s=i.length,u=0,l=0;if(s>0){u=Re()._malloc(s*Re().PTR_SIZE),r.push(u),l=Re()._malloc(s*Re().PTR_SIZE),r.push(l);for(let c=0;c<s;c++)Re().setValue(u+c*Re().PTR_SIZE,i[c][0],"*"),Re().setValue(l+c*Re().PTR_SIZE,i[c][1],"*")}await Re()._OrtAppendExecutionProvider(n,a,u,l,s)!==0&&Ce(`Can't append execution provider: ${o}.`)}},Ty=async n=>{let e=Re(),r=0,t=[],o=n||{};zO(o);try{let i=LO(o.graphOptimizationLevel??"all"),a=RO(o.executionMode??"sequential"),s=typeof o.logId=="string"?At(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?At(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,c),r===0&&Ce("Can't create session options."),o.executionProviders&&await MO(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);ya(r,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[p,f]of Object.entries(o.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let m=At(p,t);e._OrtAddFreeDimensionOverride(r,m,f)!==0&&Ce(`Can't set a free dimension override: ${p} - ${f}.`)}return o.extra!==void 0&&No(o.extra,"",new WeakSet,(p,f)=>{ya(r,p,f,t)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&Ce("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var oo,Rr,mn,_a,Lo,va,xa,ec,le=k(()=>{"use strict";oo=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},Rr=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},mn=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},_a=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Lo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},va=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",xa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",ec=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Ro,tc=k(()=>{"use strict";aa();Ro=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=_s("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=_s("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var BO,FO,Sy,$y,wa,VO,ye,zr=k(()=>{"use strict";le();BO=["V","I","W","E","F"],FO=(n,e)=>{console.log(`[${BO[n]},${new Date().toISOString()}]${e}`)},wa=(n,e)=>{Sy=n,$y=e},VO=(n,e)=>{let r=Lo(n),t=Lo(Sy);r>=t&&FO(r,typeof e=="function"?e():e)},ye=(...n)=>{$y&&VO(...n)}});var rc,Mr,D,Rn,Ta,Ay,Oy,fe=k(()=>{"use strict";rc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Mr=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=rc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;let p=Math.max(l,c);if(l&&c)s[a-u]=Math.max(l,c);else{if(p>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},D=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},Rn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},Ta=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Mr.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Ay=-34028234663852886e22,Oy=34028234663852886e22});var Ia,nc=k(()=>{"use strict";le();Ia=(n,e)=>new(_a(e))(n)});var ic,Ey,GO,Py,UO,Cy,Sa,$a,oc,Dy,ky=k(()=>{"use strict";zr();ic=(n,e=!0)=>{if(n.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=n.byteLength/8,t=new BigInt64Array(n.buffer,n.byteOffset,r),o=new Int32Array(r);for(let i=0;i<r;i++){let a=t[i];if(a>2147483647n||a<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${i}: ${a}`);o[i]=Number(a)}return e?new Uint8Array(o.buffer):o},Ey=(n,e=!0)=>{if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=n.byteLength/4,t=new Int32Array(n.buffer,n.byteOffset,r),o=BigInt64Array.from(t,BigInt);return e?new Uint8Array(o.buffer):o},GO=1,Py=()=>GO++,UO=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Cy=(n,e)=>{let r=UO.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Sa=class{constructor(e){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:a,shouldConvertInt64toInt32:s=!1}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.shouldConvertInt64toInt32=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Cy(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e,r){if(e){let t=await this.mlContext.readTensor(this.mlTensor),o=Ey(new Uint8Array(t));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?this.mlContext.readTensor(this.mlTensor,r):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsInt64ToInt32Converted(e){this.isInt64ToInt32Converted=e}},$a=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=r,a=this.tensorManager.getMLContext(e),s=i==="int64"&&!a.opSupportLimits().input.dataTypes.includes("int64");if(s&&(i="int32",ye("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(a,i,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Cy(i,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,i,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(r=ic(e,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),r.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?Ey(this.activeUpload):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,e):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},oc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let e=Py();return this.tensorTrackersById.set(e,new $a(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=Py(),s=new Sa({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new $a(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a,s=!1){let u=this.getMLContext(e);for(let[c,p]of this.freeTensors.entries())if(p.canReuseTensor(u,r,t)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${t}}`);let f=this.freeTensors.splice(c,1)[0];return f.sessionId=e,f}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${t}}`);let l=await u.createTensor({dataType:r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Sa({sessionId:e,context:u,tensor:l,dataType:r,shape:t,shouldConvertInt64toInt32:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Dy=(...n)=>new oc(...n)});var ac,WO,Aa,Ny=k(()=>{"use strict";le();hn();nc();ky();zr();ac=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),WO=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},Aa=class{constructor(e){this.tensorManager=Dy(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;wa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>WO(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=ac.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=ac.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!Re().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Ia(t,r)}}registerMLTensor(e,r,t,o){let i=ac.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=l.slice(r,r+t).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(c);break;case"float16":p=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(c):new Uint16Array(c);break;case"int32":p=new Int32Array(c);break;case"uint32":p=new Uint32Array(c);break;case"int64":s?(p=ic(new Uint8Array(c),!1),i.dataType="int32"):p=new BigInt64Array(c);break;case"uint64":p=new BigUint64Array(c);break;case"int8":p=new Int8Array(c);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isGraphOutput(e,r){let t=this.sessionGraphOutputs.get(e);return t?t.includes(r):!1}isInt64Supported(e){return!!this.mlContextBySessionId.get(e)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var Oa=k(()=>{"use strict"});var Ly,sc,uc,HO,qO,Ry,cc,lc,My,By=k(()=>{"use strict";zr();Oa();Ly=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),sc=[],uc=n=>Math.ceil(Number(n)/16)*16,HO=n=>{for(let e=0;e<sc.length;e++){let r=sc[e];if(n<=r)return r}return Math.ceil(n/16)*16},qO=1,Ry=()=>qO++,cc=async(n,e,r,t)=>{let o=uc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},lc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Ly)sc.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=uc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([c.finish()]),u.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=uc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ry();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=HO(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:Ry(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await cc(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=Ly.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},My=(...n)=>new lc(...n)});var dc,ae,Xe=k(()=>{"use strict";dc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ae=n=>new dc(n)});var zn,fc,Me,nt,V,Oe,hc,Mn,qt,Z,Pa,L,B,Fy,Ea,pc,Vy,me=k(()=>{"use strict";le();fe();zn=64,fc=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Me=(n,e=1)=>{let r=fc(n,e);return typeof r=="string"?r:r[0]},nt=(n,e=1)=>{let r=fc(n,e);return typeof r=="string"?r:r[1]},V=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),e},Oe=n=>n%4===0?4:n%2===0?2:1,hc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Mn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,qt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Z=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,Pa=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=fc(e,o),c=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],f={indices:u,value:c,storage:p,tensor:e},m=E=>typeof E=="string"?E:`${E}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",w=`${b}${n}_shape`,_=`${b}${n}_strides`,x="";for(let E=0;E<a-1;E++)x+=`
    let dim${E} = current / ${Z(_,E,a)};
    let rest${E} = current % ${Z(_,E,a)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;x+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${x}
    return indices;
  }`,$=E=>(g.offsetToIndices=!0,a<2?E:`o2i_${n}(${E})`),A=[];if(a>=2)for(let E=a-1;E>=0;E--)A.push(`${Z(_,E,a)} * (indices[${E}])`);let P=a<2?"":`
  fn i2o_${n}(indices: ${f.indices}) -> u32 {
    return ${A.join("+")};
  }`,N=E=>(g.indicesToOffset=!0,a<2?E:`i2o_${n}(${E})`),R=(...E)=>a===0?"0u":`${f.indices}(${E.map(m).join(",")})`,M=(E,q)=>a<2?`${E}`:`${Z(E,q,a)}`,W=(E,q,Ie)=>a<2?`${E}=${Ie};`:`${Z(E,q,a)}=${Ie};`,J={},ee=(E,q)=>{g.broadcastedIndicesToOffset=!0;let Ie=`${q.name}broadcastedIndicesTo${n}Offset`;if(Ie in J)return`${Ie}(${E})`;let rt=[];for(let mt=a-1;mt>=0;mt--){let qe=q.indicesGet("outputIndices",mt+q.rank-a);rt.push(`${M(_,mt)} * (${qe} % ${M(w,mt)})`)}return J[Ie]=`fn ${Ie}(outputIndices: ${q.type.indices}) -> u32 {
             return ${rt.length>0?rt.join("+"):"0u"};
           }`,`${Ie}(${E})`},ce=(E,q)=>(()=>{if(f.storage===f.value)return`${n}[${E}]=${q};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${n}[${E}]=vec2<u32>(u32(${q}), select(0u, 0xFFFFFFFFu, ${q} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${n}[${E}]=vec2<u32>(u32(${q}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${n}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${q}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),G=E=>(()=>{if(f.storage===f.value)return`${n}[${E}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${n}[${E}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${n}[${E}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${E}] & 0xFFu), bool(${n}[${E}] & 0xFF00u), bool(${n}[${E}] & 0xFF0000u), bool(${n}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Te=a<2?"":`
  fn get_${n}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${G(`i2o_${n}(indices)`)};
  }`,se=a<2?"":(()=>{let E=s.map(Ie=>`d${Ie}: u32`).join(", "),q=s.map(Ie=>`d${Ie}`).join(", ");return`
  fn get_${n}(${E}) -> ${c} {
    return get_${n}ByIndices(${R(q)});
  }`})(),K=(...E)=>{if(E.length!==a)throw new Error(`indices length must be ${a}`);let q=E.map(m).join(",");return a===0?G("0u"):a===1?G(q[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}(${q})`)},ge=E=>a<2?G(E):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}ByIndices(${E})`),re=a<2?"":`
  fn set_${n}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${ce(`i2o_${n}(indices)`,"value")}
  }`,de=a<2?"":(()=>{let E=s.map(Ie=>`d${Ie}: u32`).join(", "),q=s.map(Ie=>`d${Ie}`).join(", ");return`
  fn set_${n}(${E}, value: ${c}) {
    set_${n}ByIndices(${R(q)}, value);
  }`})();return{impl:()=>{let E=[],q=!1;return g.offsetToIndices&&(E.push(I),q=!0),g.indicesToOffset&&(E.push(P),q=!0),g.broadcastedIndicesToOffset&&(Object.values(J).forEach(Ie=>E.push(Ie)),q=!0),g.set&&(E.push(de),q=!0),g.setByIndices&&(E.push(re),q=!0),g.get&&(E.push(se),q=!0),g.getByIndices&&(E.push(Te),q=!0),!i&&q&&E.unshift(`const ${w} = ${f.indices}(${r.join(",")});`,`const ${_} = ${f.indices}(${D.computeStrides(r).join(",")});`),E.join(`
`)},type:f,offsetToIndices:$,indicesToOffset:N,broadcastedIndicesToOffset:ee,indices:R,indicesGet:M,indicesSet:W,set:(...E)=>{if(E.length!==a+1)throw new Error(`indices length must be ${a}`);let q=E[a];if(typeof q!="string")throw new Error("value must be string");let Ie=E.slice(0,a).map(m).join(",");return a===0?ce("0u",q):a===1?ce(Ie[0],q):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}(${Ie}, ${q})`)},setByOffset:ce,setByIndices:(E,q)=>a<2?ce(E,q):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}ByIndices(${E}, ${q});`),get:K,getByOffset:G,getByIndices:ge,usage:t,name:n,strides:_,shape:w,rank:a}},L=(n,e,r,t=1)=>Pa(n,e,r,"input",t),B=(n,e,r,t=1)=>Pa(n,e,r,"output",t),Fy=(n,e,r)=>Pa(n,e,r,"atomicOutput",1),Ea=(n,e,r,t=1)=>Pa(n,e,r,"internal",t),pc=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=zn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*t*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,t=1){return this.uniforms.push({name:e,type:r,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${r}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${r}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},Vy=(n,e)=>new pc(n,e)});var jO,Gy,KO,XO,ZO,JO,ot,Uy,Wy,Kr=k(()=>{"use strict";le();fe();Xe();me();jO=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},Gy=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),KO=(n,e)=>D.sortBasedOnPerm(n,Gy(n.length,e)),XO=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},ZO=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},JO=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},ot=(n,e)=>{let r=n.dataType,t=n.dims.length,o=Gy(t,e),i=KO(n.dims,o),a=n.dims,s=i,u=t<2||JO(o,n.dims),l;if(u)return l=b=>{let w=L("input",r,a,4),_=B("output",r,s,4);return`
  ${b.registerUniform("output_size","u32").declareVariables(w,_)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:l};let{newShape:c,newPerm:p}=ZO(n.dims,o),f=D.areEqual(p,[2,3,1]),m=D.areEqual(p,[3,1,2]);if(c.length===2||f||m){a=f?[c[0],c[1]*c[2]]:m?[c[0]*c[1],c[2]]:c,s=[a[1],a[0]];let b=16;return l=w=>{let _=L("a",r,a.length),x=B("output",r,s.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${b+1}>, ${b}>;
  ${w.mainStart([b,b,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${b} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${b}u + local_id.x;
    let input_row = workgroup_id_x * ${b}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${_.getByIndices(`${_.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${b}u + local_id.x;
    let output_row = workgroup_id_y * ${b}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/b),y:Math.ceil(s[0]/b)},programUniforms:[{type:12,data:w},...V(a,s)]}},getShaderSource:l}}return l=b=>{let w=L("a",r,a.length),_=B("output",r,s.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(w,_)}

  ${XO(o,t,w,_)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let b=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...V(a,s)]}},getShaderSource:l}},Uy=(n,e)=>{jO(n.inputs,e.perm),n.compute(ot(n.inputs[0],e.perm))},Wy=n=>ae({perm:n.perm})});var YO,QO,eP,tP,rP,nP,oP,iP,aP,sP,Br,Hy,qy,jy,Ky,Xy,Zy,Jy,Yy,Qy,e_,t_=k(()=>{"use strict";le();fe();me();Ca();Kr();YO={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},QO={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},eP={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tP={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},rP=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},nP=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},oP=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},iP=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},aP=(n,e)=>{let r=[];if(!iP(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},sP=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=D.size(i),l=D.size(a),c=L("_A",r[0].dataType,s),p=B("output",o,i),f=64;u===1&&(f=256);let m=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,g=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${m}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${eP[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${YO[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${QO[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${t==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${tP[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Br=(n,e,r,t)=>{let o=n.inputs.length===1?r:mc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((m,g)=>g));let a=D.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],l=aP(s,n.inputs[0].dims.length);l.length>0&&(u=n.compute(ot(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=rP(s.length,u.dims.length));let[c,p]=nP(u.dims,s),f=c;o.keepDims&&(f=oP(c,a)),n.compute(sP(e,o.cacheKey,[u],t,n.inputs[0].dataType,f,p),{inputs:[u]})},Hy=(n,e)=>{Br(n,"ReduceMeanShared",e,"mean")},qy=(n,e)=>{Br(n,"ReduceL1Shared",e,"l1")},jy=(n,e)=>{Br(n,"ReduceL2Shared",e,"l2")},Ky=(n,e)=>{Br(n,"ReduceLogSumExpShared",e,"logSumExp")},Xy=(n,e)=>{Br(n,"ReduceMaxShared",e,"max")},Zy=(n,e)=>{Br(n,"ReduceMinShared",e,"min")},Jy=(n,e)=>{Br(n,"ReduceProdShared",e,"prod")},Yy=(n,e)=>{Br(n,"ReduceSumShared",e,"sum")},Qy=(n,e)=>{Br(n,"ReduceSumSquareShared",e,"sumSquare")},e_=(n,e)=>{Br(n,"ReduceLogSumShared",e,"logSum")}});var Fr,uP,Da,mc,Vr,lP,cP,dP,pP,fP,hP,mP,gP,bP,yP,Gr,r_,n_,o_,i_,a_,s_,u_,l_,c_,d_,Ca=k(()=>{"use strict";le();fe();Xe();me();t_();Fr=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},uP=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],Da=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],l=r[0].dims,c=l.length,p=D.normalizeAxes(o,c),f=!s&&p.length===0;l.forEach((w,_)=>{f||p.indexOf(_)>=0?a&&u.push(1):u.push(w)});let m=u.length,g=D.size(u);return{name:n,shaderCache:e,getShaderSource:w=>{let _=[],x=L("_A",r[0].dataType,c),I=B("output",i,m),$=t(x,I,p),A=$[2];for(let P=0,N=0;P<c;P++)f||p.indexOf(P)>=0?(a&&N++,A=`for(var j${P}: u32 = 0; j${P} < ${l[P]}; j${P}++) {
                  ${$[2].includes("last_index")?`let last_index = j${P};`:""}
                  ${x.indicesSet("input_indices",P,`j${P}`)}
                  ${A}
                }`):(_.push(`${x.indicesSet("input_indices",P,I.indicesGet("output_indices",N))};`),N++);return`

        ${w.registerUniform("output_size","u32").declareVariables(x,I)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${_.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${A}
          ${$[3]}
          ${$.length===4?I.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...V(l,u)]})}},mc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),ae({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Vr=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:mc(o,r);n.compute(Da(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?uP:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},lP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},cP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},dP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},pP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},fP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},hP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},mP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},gP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},bP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},yP=(n,e)=>{Fr(n.inputs),Vr(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Gr=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},r_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?hP(n,e):Hy(n,e)},n_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?cP(n,e):qy(n,e)},o_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?dP(n,e):jy(n,e)},i_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?pP(n,e):Ky(n,e)},a_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?fP(n,e):Xy(n,e)},s_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?mP(n,e):Zy(n,e)},u_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?gP(n,e):Jy(n,e)},l_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?bP(n,e):Yy(n,e)},c_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?yP(n,e):Qy(n,e)},d_=(n,e)=>{Gr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?lP(n,e):e_(n,e)}});var p_,f_,h_,gc,m_=k(()=>{"use strict";le();Xe();Ca();p_=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},f_=(n,e)=>{p_(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Da("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},h_=(n,e)=>{p_(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Da("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},gc=n=>ae(n)});var _P,bc,vP,xP,wP,io,TP,g_,ka=k(()=>{"use strict";le();fe();Oa();me();_P=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],c=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=o.dims[0]/3,f=p,m=f;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=e.qkvHiddenSizes[0],f=e.qkvHiddenSizes[1],m=e.qkvHiddenSizes[2]}let g=l;if(p!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==p+f+m)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(a){if(f!==m)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(b=a.dims[3])}let w=g+b,_=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:_,inputHiddenSize:c,hiddenSize:p,vHiddenSize:m,headSize:Math.floor(p/e.numHeads),vHeadSize:Math.floor(m/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},bc=(n,e,r)=>e&&n?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${n?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,vP=(n,e,r,t,o,i,a,s)=>{let u=Oe(a?1:i),l=64,c=i/u;c<l&&(l=32);let p=Math.ceil(i/u/l),f=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:p}],m=Me(n.dataType,u),g=nt(1,u),b=["type"];a&&b.push("type"),s&&b.push("type");let w=_=>{let x=B("x",n.dataType,n.dims,u),I=[x],$=a?L("seq_lens",a.dataType,a.dims):void 0;$&&I.push($);let A=s?L("total_sequence_length_input",s.dataType,s.dims):void 0;A&&I.push(A);let P=nt(n.dataType),N=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${_.registerUniforms(N).declareVariables(...I)}
  ${_.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${bc($,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${P}(1.0) / ${P}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${P}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${m};${u}`,inputDependencies:b},getShaderSource:w,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*r},programUniforms:f})}},xP=(n,e,r,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],p=n>1&&t,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,m=p?[i.batchSize,f,l,i.headSize]:void 0,g=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,w=Oe(i.headSize),_=i.headSize/w,x=12,I={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],A=p&&t&&D.size(t.dims)>0,P=["type","type"];A&&P.push("type"),o&&P.push("type"),s&&P.push("type"),u&&P.push("type");let N=[{dims:c,dataType:e.dataType,gpuDataType:0}];p&&N.push({dims:m,dataType:e.dataType,gpuDataType:0});let R=M=>{let W=L("q",e.dataType,e.dims,w),J=L("key",r.dataType,r.dims,w),ee=[W,J];if(A){let re=L("past_key",t.dataType,t.dims,w);ee.push(re)}o&&ee.push(L("attention_bias",o.dataType,o.dims));let ce=s?L("seq_lens",s.dataType,s.dims):void 0;ce&&ee.push(ce);let G=u?L("total_sequence_length_input",u.dataType,u.dims):void 0;G&&ee.push(G);let Te=B("output",e.dataType,c),se=[Te];p&&se.push(B("present_key",e.dataType,m,w));let K=nt(1,w),ge=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${W.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${W.type.storage}, ${x*x}>;
  ${M.registerUniforms(ge).declareVariables(...ee,...se)}
  ${M.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${bc(ce,G,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${K}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${K}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${Te.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${o!==void 0};${t!==void 0};${n}`,inputDependencies:P},getRunData:()=>({outputs:N,dispatchGroup:I,programUniforms:$}),getShaderSource:R}},wP=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,p=n>1&&t,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,m=p?[o.batchSize,f,u,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,c],b=12,w={x:Math.ceil(o.vHeadSize/b),y:Math.ceil(o.sequenceLength/b),z:o.batchSize*o.numHeads},_=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=p&&t&&D.size(t.dims)>0,I=["type","type"];x&&I.push("type"),a&&I.push("type"),s&&I.push("type");let $=[{dims:g,dataType:e.dataType,gpuDataType:0}];p&&$.push({dims:m,dataType:e.dataType,gpuDataType:0});let A=P=>{let N=L("probs",e.dataType,e.dims),R=L("v",r.dataType,r.dims),M=[N,R];x&&M.push(L("past_value",t.dataType,t.dims));let W=a?L("seq_lens",a.dataType,a.dims):void 0;a&&M.push(W);let J=s?L("total_sequence_length_input",s.dataType,s.dims):void 0;s&&M.push(J);let ce=[B("output",e.dataType,g)];p&&ce.push(B("present_value",e.dataType,m));let G=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${N.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${N.type.value}, ${b*b}>;
  ${P.registerUniforms(G).declareVariables(...M,...ce)}
  ${P.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${bc(W,J,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${N.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:I},getRunData:()=>({outputs:$,dispatchGroup:w,programUniforms:_}),getShaderSource:A}},io=(n,e,r,t,o,i,a,s,u,l,c=void 0,p=void 0)=>{let f=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),m=f>1?l.pastSequenceLength:0,g=m+l.kvSequenceLength,b=u&&D.size(u.dims)>0?u:void 0,w=[e,r];f>1&&a&&D.size(a.dims)>0&&w.push(a),b&&w.push(b),c&&w.push(c),p&&w.push(p);let _=n.compute(xP(f,e,r,a,b,l,m,c,p),{inputs:w,outputs:f>1?[-1,1]:[-1]})[0];n.compute(vP(_,l.batchSize,l.numHeads,m,l.sequenceLength,g,c,p),{inputs:c&&p?[_,c,p]:[_],outputs:[]});let x=[_,t];f>1&&s&&D.size(s.dims)>0&&x.push(s),c&&x.push(c),p&&x.push(p),n.compute(wP(f,_,t,s,l,m,c,p),{inputs:x,outputs:f>1?[0,2]:[0]})},TP=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=p=>{let f=B("output_q",u[0].dataType,r),m=B("output_k",u[0].dataType,r),g=B("output_v",u[0].dataType,r),b=L("input",u[0].dataType,u[0].dims),w=L("weight",u[1].dataType,u[1].dims),_=L("bias",u[2].dataType,u[2].dims),x=b.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${p.registerUniforms(I).declareVariables(b,w,_,f,m,g)}
  ${p.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${x}(0);
    var valueK = ${x}(0);
    var valueV = ${x}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},g_=(n,e)=>{let r=_P(n.inputs,e),[t,o,i]=TP(n,r);return io(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var IP,SP,$P,b_,y_=k(()=>{"use strict";ct();le();fe();Xe();me();IP=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},SP=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Oe(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=D.size(i)/a,l=t,c=l?i.length:i,p=L("x",n[0].dataType,n[0].dims,a),f=L("scale",n[1].dataType,n[1].dims,s),m=L("bias",n[2].dataType,n[2].dims,s),g=L("inputMean",n[3].dataType,n[3].dims,s),b=L("inputVar",n[4].dataType,n[4].dims,s),w=B("y",n[0].dataType,c,a),_=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${w.indicesSet("outputIndices","0","0")}
            let cOffset = ${w.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<f.rank;$++)I+=`cIndices[${$}] = outputIndices[${$}];`;I+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return I},x=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(p,f,m,g,b,w)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${w.offsetToIndices(`global_idx * ${a}`)};
    ${_()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${w.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...V(i)]:[{type:12,data:u}]})}},$P=n=>ae(n),b_=(n,e)=>{let{inputs:r,outputCount:t}=n,o=$P({...e,outputCount:t});if(pe.webgpu.validateInputContent&&IP(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(SP(r,o))}});var AP,OP,__,v_=k(()=>{"use strict";fe();me();AP=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},OP=n=>{let e=n[0].dims,r=n[0].dims[2],t=D.size(e)/4,o=n[0].dataType,i=L("input",o,e,4),a=L("bias",o,[r],4),s=L("residual",o,e,4),u=B("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(i,a,s,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},__=n=>{AP(n.inputs),n.compute(OP(n.inputs))}});var PP,De,x_,w_,T_,I_,S_,$_,A_,O_,P_,EP,E_,C_,D_,k_,zo,N_,Na,L_,R_,z_,M_,B_,F_,V_,G_,U_,W_,H_,q_,j_,K_,X_,Z_,J_,Y_,yc,_c,Q_,e0,t0,CP,DP,r0,La=k(()=>{"use strict";le();fe();Xe();me();PP=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=L("inputData",r,[s],4),c=B("outputData",t,[s],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${n.registerUniforms(p).declareVariables(l,c)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},De=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(D.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>PP(l,D.size(n.dims),n.dataType,i,r,t,s),getRunData:l=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(D.size(l[0].dims)/64/4)},programUniforms:u})}},x_=n=>{n.compute(De(n.inputs[0],"Abs","abs"))},w_=n=>{n.compute(De(n.inputs[0],"Acos","acos"))},T_=n=>{n.compute(De(n.inputs[0],"Acosh","acosh"))},I_=n=>{n.compute(De(n.inputs[0],"Asin","asin"))},S_=n=>{n.compute(De(n.inputs[0],"Asinh","asinh"))},$_=n=>{n.compute(De(n.inputs[0],"Atan","atan"))},A_=n=>{n.compute(De(n.inputs[0],"Atanh","atanh"))},O_=n=>ae(n),P_=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(De(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},EP=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ae({min:e,max:r})},E_=(n,e)=>{let r=e||EP(n.inputs),t=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},C_=n=>{n.compute(De(n.inputs[0],"Ceil","ceil"))},D_=n=>{n.compute(De(n.inputs[0],"Cos","cos"))},k_=n=>{n.compute(De(n.inputs[0],"Cosh","cosh"))},zo=n=>ae(n),N_=(n,e)=>{let r=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Na=(n="f32")=>`
const r0: ${n} = 0.3275911;
const r1: ${n} = 0.254829592;
const r2: ${n} = -0.284496736;
const r3: ${n} = 1.421413741;
const r4: ${n} = -1.453152027;
const r5: ${n} = 1.061405429;

fn erf_vf32(v: vec4<${n}>) -> vec4<${n}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,L_=n=>{let e=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,Na(e)))},R_=n=>{n.compute(De(n.inputs[0],"Exp","exp"))},z_=n=>{n.compute(De(n.inputs[0],"Floor","floor"))},M_=n=>{let e=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Na(e)))},B_=(n,e)=>{let r=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},F_=n=>{n.compute(De(n.inputs[0],"Not",e=>`!${e}`))},V_=n=>{n.compute(De(n.inputs[0],"Neg",e=>`-${e}`))},G_=n=>{n.compute(De(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},U_=n=>{let e=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},W_=n=>{n.compute(De(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},H_=n=>ae(n),q_=(n,e)=>{let r=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},j_=n=>{n.compute(De(n.inputs[0],"Sin","sin"))},K_=n=>{n.compute(De(n.inputs[0],"Sinh","sinh"))},X_=n=>{n.compute(De(n.inputs[0],"Sqrt","sqrt"))},Z_=n=>{n.compute(De(n.inputs[0],"Tan","tan"))},J_=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,Y_=n=>{n.compute(De(n.inputs[0],"Tanh",J_))},yc=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${J_("v")};
}
`,_c=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,Q_=n=>{let e=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"FastGelu",_c,yc(e),void 0,n.inputs[0].dataType))},e0=(n,e)=>{let r=nt(n.inputs[0].dataType);return n.compute(De(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},t0=n=>{n.compute(De(n.inputs[0],"Log","log"))},CP=(n,e)=>`
const alpha = vec4<${n}>(${e});
const one = ${n}(1.0);
const zero = ${n}(0.0);

fn quick_gelu_impl(x: vec4<${n}>) -> vec4<${n}> {
  let v = x *alpha;
  var x1 : vec4<${n}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,DP=n=>`quick_gelu_impl(${n})`,r0=(n,e)=>{let r=nt(n.inputs[0].dataType);n.compute(De(n.inputs[0],"QuickGelu",DP,CP(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var kP,NP,o0,i0=k(()=>{"use strict";fe();me();La();kP=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},NP=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=L("input",n[0].dataType,n[0].dims,4),t=L("bias",n[0].dataType,[n[0].dims[2]],4),o=B("output",n[0].dataType,e,4),i=D.size(e)/4,a=Me(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${Na(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},o0=n=>{kP(n.inputs),n.compute(NP(n.inputs))}});var LP,RP,Ur,a0,s0,u0,l0,c0,d0,p0,f0,h0,m0,g0=k(()=>{"use strict";le();fe();me();LP=(n,e,r,t,o,i,a,s,u,l,c,p)=>{let f,m;typeof s=="string"?f=m=(x,I)=>`${s}((${x}),(${I}))`:typeof s=="function"?f=m=s:(f=s.scalar,m=s.vector);let g=B("outputData",c,t.length,4),b=L("aData",u,e.length,4),w=L("bData",l,r.length,4),_;if(o)if(i){let x=D.size(e)===1,I=D.size(r)===1,$=e.length>0&&e[e.length-1]%4===0,A=r.length>0&&r[r.length-1]%4===0;x||I?_=g.setByOffset("global_idx",m(x?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),I?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"))):_=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${w.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",m(a||$?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||A?w.getByOffset("offsetB / 4u"):`${w.type.value}(${w.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=g.setByOffset("global_idx",m(b.getByOffset("global_idx"),w.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(I,$,A="")=>{let P=`aData[indexA${$}][componentA${$}]`,N=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${g.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${b.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let offsetB${$} = ${w.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${I}[${$}] = ${A}(${f(P,N)});
          `};c===9?_=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:_=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(b,w,g)}

        ${p??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`},RP=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(b=>Number(b)??1),u=t.dims.map(b=>Number(b)??1),l=!D.areEqual(s,u),c=s,p=D.size(s),f=!1,m=!1,g=[l];if(l){let b=Mr.calcShape(s,u,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");c=b.slice(),p=D.size(c);let w=D.size(s)===1,_=D.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;g.push(w),g.push(_),g.push(x),g.push(I);let $=1;for(let A=1;A<c.length;A++){let P=s[s.length-A],N=u[u.length-A];if(P===N)$*=P;else break}$%4===0?(m=!0,f=!0):(w||_||x||I)&&(f=!0)}else f=!0;return g.push(f),{name:n,shaderCache:{hint:e+g.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>LP(b,s,u,c,f,l,m,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(c)/4)},...V(s,u,c)]})}},Ur=(n,e,r,t,o,i)=>{n.compute(RP(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},a0=n=>{Ur(n,"Add",(e,r)=>`${e}+${r}`)},s0=n=>{Ur(n,"Div",(e,r)=>`${e}/${r}`)},u0=n=>{Ur(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},l0=n=>{Ur(n,"Mul",(e,r)=>`${e}*${r}`)},c0=n=>{let e=L("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Ur(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},d0=n=>{Ur(n,"Sub",(e,r)=>`${e}-${r}`)},p0=n=>{Ur(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},f0=n=>{Ur(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},h0=n=>{Ur(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},m0=n=>{Ur(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var MP,BP,FP,VP,b0,y0,_0=k(()=>{"use strict";le();fe();Xe();me();MP=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},BP=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,FP=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},VP=(n,e,r,t)=>{let o=D.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],l=[],c=[{type:12,data:o}];for(let b=0;b<n.length;++b)s+=n[b].dims[e],i[b]=s,l.push(n[b].dims.length),a[b]=L(`input${b}`,t,l[b]),u.push("rank"),c.push({type:12,data:i[b]});for(let b=0;b<n.length;++b)c.push(...V(n[b].dims));c.push(...V(r));let p=B("output",t,r.length),f=p.indicesGet("indices",e),m=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),g=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let w=0;w<n.length;w++)b.registerUniform(`sizeInConcatAxis${w}`,"u32");return b.declareVariables(...a,p)})()}

  ${BP(i.length,m)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${FP(a,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:g}},b0=(n,e)=>{let r=n.inputs,t=r[0].dims,o=D.normalizeAxis(e.axis,t.length);MP(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>D.size(s.dims)>0);n.compute(VP(a,o,i,r[0].dataType),{inputs:a})},y0=n=>ae({axis:n.axis})});var jt,Kt,Xt,Ra,gn=k(()=>{"use strict";le();fe();jt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Kt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Xt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ra=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[Ay,Oy];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var tt,v0,za=k(()=>{"use strict";tt=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},v0=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var x0,w0=k(()=>{"use strict";x0=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Mo,Ma,Ba=k(()=>{"use strict";le();fe();me();gn();Mo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Z(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Z(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},Ma=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],l=s[s.length-1],c=a[a.length-1],p=Oe(l),f=Oe(c),m=Oe(u),g=D.size(r)/p/m,b=n.length>2,w=t?t.slice(0,-2):r.slice(0,-2),x=[D.size(w),u,l],I=[{type:12,data:g},{type:12,data:u},{type:12,data:l},{type:12,data:c}];Kt(e,I),I.push(...V(w,a,s)),b&&I.push(...V(n[2].dims)),I.push(...V(x));let $=A=>{let P=Ea("batch_dims",n[0].dataType,w.length),N=L("a",n[0].dataType,a.length,f),R=L("b",n[1].dataType,s.length,p),M=B("output",n[0].dataType,x.length,p),W=Me(M.type.tensor),J=jt(e,M.type.value,W),ee=[N,R],ce="";if(b){let se=o?p:1;ee.push(L("bias",n[2].dataType,n[2].dims.length,se)),ce=`${o?`value += bias[col / ${se}];`:`value += ${M.type.value}(bias[row + i]);`}`}let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Xt(e,G);let Te=()=>{let se=`var a_data: ${N.type.value};`;for(let K=0;K<f;K++)se+=`
              let b_data${K} = b[(b_offset + (k + ${K}) * uniforms.N + col) / ${p}];`;for(let K=0;K<m;K++){se+=`a_data = a[(a_offset + (row + ${K}) * uniforms.K + k) / ${f}];`;for(let ge=0;ge<f;ge++)se+=`
            values[${K}] = fma(${R.type.value}(a_data${f===1?"":`[${ge}]`}), b_data${ge}, values[${K}]);
`}return se};return`
  ${A.registerUniforms(G).registerInternalVariables(P).declareVariables(...ee,M)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${P.offsetToIndices("batch")};`}

    var a_indices: ${N.type.indices};
    ${Mo("a_indices",N,N.rank-2,P.rank,"batch_indices")}
    ${N.indicesSet("a_indices",N.rank-2,0)}
    ${N.indicesSet("a_indices",N.rank-1,0)}
    let a_offset = ${N.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${Mo("b_indices",R,R.rank-2,P.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${M.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${Te()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${ce}
      ${J}
      let cur_indices = ${M.type.indices}(batch, row + i, col);
      let offset = ${M.indicesToOffset("cur_indices")};
      ${M.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${p};${f};${m};${o}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:I}),getShaderSource:$}}});var GP,UP,vc,T0,WP,xc,HP,Bo,Fa=k(()=>{"use strict";le();fe();me();gn();Ba();za();GP=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,UP=(n,e)=>n?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,vc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],l=e[0]*n[0],c=o?u:i,p=o?i:u,f=c/e[0],m=i/e[1];if(!((o&&f===4&&n[1]===4||!o&&(f===3||f===4))&&c%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${f} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${c/f}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${f};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${m};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${GP(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${UP(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},T0=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,WP=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",xc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=n[1]*e[1],c=n[0]*e[0],p=o?l:i,f=o?i:l;if(!(f%e[1]===0&&p%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let m=f/e[1],g=p/e[0],b=i/e[1],w=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
          ${T0(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${m};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${T0(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${WP(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${i}>;
  const rowPerThread = ${n[1]};
  const colPerThread = ${n[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${w}
  }
`},HP=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,l=Me(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${tt(n,l)} {
      var value = ${tt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Mo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${tt(n,l)} {
      var value = ${tt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Mo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${tt(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${tt(n,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Bo=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),c=t?t.slice(0,-2):r.slice(0,-2),p=D.size(c),f=a[a.length-2],m=a[a.length-1],g=s[s.length-1],b=m%4===0&&g%4===0,w=f<=8?[4,1,1]:[4,4,1],_=[8,8,1],x=[Math.ceil(g/_[0]/w[0]),Math.ceil(f/_[1]/w[1]),Math.ceil(p/_[2]/w[2])],I=b?4:1,$=[...u,f,m/I],A=$.length,P=[...l,m,g/I],N=P.length,R=[p,f,g/I],M=[{type:6,data:f},{type:6,data:g},{type:6,data:m}];Kt(e,M),M.push(...V(c,$,P));let W=["rank","rank"],J=n.length>2;J&&(M.push(...V(n[2].dims)),W.push("rank")),M.push(...V(R));let ee=ce=>{let G=c.length,Te=Ea("batchDims",n[0].dataType,G,1),se=Me(n[0].dataType),K=L("a",n[0].dataType,A,I),ge=L("b",n[1].dataType,N,I),re=B("result",n[0].dataType,R.length,I),de=[K,ge];if(J){let q=o?I:1;de.push(L("bias",n[2].dataType,n[2].dims.length,q))}let Ve=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Xt(e,Ve);let Be=Me(re.type.tensor),ue=jt(e,re.type.value,Be),E=HP(I,J,ue,[Te,K,ge,re],o);return`
  ${ce.registerUniforms(Ve).registerInternalVariables(Te).declareVariables(...de,re)}
  ${E}
  ${b?vc(w,_,se,Te):xc(w,_,se,Te)}
                   `};return{name:"MatMul",shaderCache:{hint:`${w};${e.activation};${b};${o}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:M}),getShaderSource:ee}}});var qP,I0,S0=k(()=>{"use strict";le();zr();me();gn();za();w0();Fa();qP=(n,e,r,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let c=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},p=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},f=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,m=n?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",w=n?"row":"col",_=n?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${w} / outWidth;
    let outCol = ${w} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${tt(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${b}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,I=n?e&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${tt(a,l)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${tt(a,l)}(0.0);`,$=n?t&&r?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${tt(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${tt(s,l)}(0.0);`,A=tt(u,l),P=n?tt(a,l):tt(s,l),N=n?tt(s,l):tt(a,l),R=jt(i,A,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${n?I:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${N} {
      ${n?$:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${m}
      ${v0(o)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},I0=(n,e,r,t,o,i,a,s,u)=>{let l=e.format==="NHWC",c=l?n[0].dims[3]:n[0].dims[1],p=r[0],f=l?r[2]:r[3],m=l?r[1]:r[2],g=l?r[3]:r[1],b=l&&(c%4===0||c%3===0)&&g%4===0,w=l?g:f*m,_=l?f*m:g,x=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(w/x[0]/I[0]),Math.ceil(_/x[1]/I[1]),Math.ceil(p/x[2]/I[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let A=b?l&&c%4!==0?3:4:1,P=x[1]*I[1],N=x[0]*I[0],R=Math.max(x[0]*A,x[1]),M=t%P===0,W=o%N===0,J=i%R===0,ee=b?[A,4,4]:[1,1,1],ce=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Kt(e,ce),ce.push(...V(n[0].dims,n[1].dims));let G=["rank","rank"];a&&(ce.push(...V(n[2].dims)),G.push("rank")),ce.push(...V(r));let Te=se=>{let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Xt(e,K);let ge=b?4:1,re=Me(n[0].dataType),de=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${re}>`:re}) {
        result[flatIndex] = ${b?`vec4<${re}>`:re}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${re}>`:re}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,Ve=L("x",n[0].dataType,n[0].dims.length,A===3?1:A),Be=L("w",n[1].dataType,n[1].dims.length,ge),ue=[Ve,Be],E=B("result",n[0].dataType,r.length,ge);if(a){let q=L("bias",n[2].dataType,n[2].dims.length,ge);ue.push(q),de+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${re}>`:re} {
          return bias[coords.${l?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${x0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${se.registerUniforms(K).declareVariables(...ue,E)}
        ${de}
        ${qP(l,M,W,J,a,e,ee[0],ee[1],ee[2],re)}
        ${b?vc(I,x,re,void 0,!l,R):xc(I,x,re,void 0,!l,R,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${A};${b};${M};${W};${J};${P};${N};${R}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:ce}),getShaderSource:Te}}});var jP,$0,Va,KP,A0,XP,O0,P0,E0=k(()=>{"use strict";le();zr();fe();me();gn();za();jP=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},$0=n=>typeof n=="number"?[n,n,n]:n,Va=(n,e)=>e<=1?n:n+(n-1)*(e-1),KP=(n,e,r,t=1)=>{let o=Va(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},A0=(n,e,r,t,o)=>{o==null&&(o=KP(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},XP=(n,e,r,t,o,i,a,s,u,l)=>{let c,p,f,m;if(n==="VALID"&&(n=0),typeof n=="number"){c={top:n,bottom:n,left:n,right:n,front:n,back:n};let g=A0([e,r,t,1],[s,u,l],1,[o,i,a],n);p=g[0],f=g[1],m=g[2]}else if(Array.isArray(n)){if(!n.every((b,w,_)=>b===_[0]))throw Error(`Unsupported padding parameter: ${n}`);c={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let g=A0([e,r,t,1],[s,u,l],1,[o,i,a],n[0]);p=g[0],f=g[1],m=g[2]}else if(n==="SAME_UPPER"){p=Math.ceil(e/o),f=Math.ceil(r/i),m=Math.ceil(t/a);let g=(p-1)*o+s-e,b=(f-1)*i+u-r,w=(m-1)*a+l-t,_=Math.floor(g/2),x=g-_,I=Math.floor(b/2),$=b-I,A=Math.floor(w/2),P=w-A;c={top:I,bottom:$,left:A,right:P,front:_,back:x}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outDepth:p,outHeight:f,outWidth:m}},O0=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,l,c,p;if(a==="channelsLast")[s,u,l,c,p]=n;else if(a==="channelsFirst")[s,p,u,l,c]=n;else throw new Error(`Unknown dataFormat ${a}`);let[f,,m,g,b]=e,[w,_,x]=$0(r),[I,$,A]=$0(t),P=Va(m,I),N=Va(g,$),R=Va(b,A),{padInfo:M,outDepth:W,outHeight:J,outWidth:ee}=XP(o,u,l,c,w,_,x,P,N,R),ce=i?f*p:f,G=[0,0,0,0,0];return a==="channelsFirst"?G=[s,ce,W,J,ee]:a==="channelsLast"&&(G=[s,W,J,ee,ce]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:c,inChannels:p,outDepth:W,outHeight:J,outWidth:ee,outChannels:ce,padInfo:M,strideDepth:w,strideHeight:_,strideWidth:x,filterDepth:m,filterHeight:g,filterWidth:b,effectiveFilterDepth:P,effectiveFilterHeight:N,effectiveFilterWidth:R,dilationDepth:I,dilationHeight:$,dilationWidth:A,inShape:n,outShape:G,filterShape:e}},P0=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,l=[64,1,1],c={x:r.map((x,I)=>I)},p=[Math.ceil(jP(c.x.map(x=>r[x]))/l[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let f=u?a&&s%4!==0?3:4:1,m=D.size(r),g=[{type:12,data:m},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Kt(e,g),g.push(...V(n[0].dims,n[1].dims));let b=["rank","rank"],w=n.length===3;w&&(g.push(...V(n[2].dims)),b.push("rank")),g.push(...V(r));let _=x=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Xt(e,I);let $=u?4:1,A=Me(n[0].dataType),P=L("x",n[0].dataType,n[0].dims.length,f===3?1:f),N=L("W",n[1].dataType,n[1].dims.length,$),R=[P,N],M=B("result",n[0].dataType,r.length,$),W="";if(w){let ce=L("bias",n[2].dataType,n[2].dims.length,$);R.push(ce),W+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${A}>`:A} {
          return bias[${a?Z("coords",4,5):Z("coords",1,5)}${u?"/ 4":""}];
        }`}let J=tt(f,A),ee=jt(e,J,A);return`
            ${W}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${N.getByIndices("aIndices")};
            }
          ${x.registerUniforms(I).declareVariables(...R,M)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${M.offsetToIndices("global_idx")};
              let batch = ${Z("coords",0,P.rank)};
              let d2 = ${a?Z("coords",P.rank-1,P.rank):Z("coords",1,P.rank)};
              let xFRCCorner = vec3<u32>(${a?Z("coords",1,P.rank):Z("coords",2,P.rank)},
              ${a?Z("coords",2,P.rank):Z("coords",3,P.rank)},
              ${a?Z("coords",3,P.rank):Z("coords",4,P.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Z("uniforms.x_shape",1,P.rank):Z("uniforms.x_shape",2,P.rank)};
              let xShapeZ = ${a?Z("uniforms.x_shape",2,P.rank):Z("uniforms.x_shape",3,P.rank)};
              let xShapeW = ${a?Z("uniforms.x_shape",3,P.rank):Z("uniforms.x_shape",4,P.rank)};
              let xShapeU = ${a?Z("uniforms.x_shape",4,P.rank):Z("uniforms.x_shape",1,P.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${ee}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${f};${w}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:_}}});var C0,D0,k0=k(()=>{"use strict";le();fe();me();gn();C0=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",l=u?r[3]:r[1],c=l/e.group,p=u&&c>=4?Oe(l):1,f=D.size(r)/p,m=[{type:12,data:f},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];Kt(e,m),m.push(...V(a,[s[0],s[1],s[2],s[3]/p]));let g=o?["rank","rank","rank"]:["rank","rank"];m.push(...V([r[0],r[1],r[2],r[3]/p]));let b=w=>{let _=B("output",n[0].dataType,r.length,p),x=Me(_.type.tensor),I=jt(e,_.type.value,x),$=L("x",n[0].dataType,a.length),A=L("w",n[1].dataType,s.length,p),P=[$,A];o&&P.push(L("b",n[2].dataType,n[2].dims,p));let N=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Xt(e,N);let R=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${$.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${A.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${$.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${w.registerUniforms(N).declareVariables(...P,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${_.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${_.type.value} = ${_.type.value}(0);
    ${R}
    ${i}
    ${I}
    ${_.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${p}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:m}),getShaderSource:b}},D0=(n,e,r,t)=>{let o=n.length>2,i=Oe(r[3]),a=Oe(r[2]),s=D.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],c=[r[0],r[1],r[2],r[3]/i],p=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Kt(e,p),p.push(...V(u,l,c));let f=(a-1)*e.strides[1]+l[1],m=g=>{let b=B("output",n[0].dataType,c.length,i),w=Me(b.type.tensor),_=jt(e,b.type.value,w),x=L("x",n[0].dataType,u.length,i),I=L("w",n[1].dataType,l.length,i),$=[x,I];o&&$.push(L("b",n[2].dataType,n[2].dims,i));let A=o?"value += b[output_channel];":"",P=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Xt(e,P),`
  ${g.registerUniforms(P).declareVariables(...$,b)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${f}>;
    var values: array<${b.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${A}
      ${_}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${f};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:m}}});var ZP,wc,JP,Tc,Ic,N0,YP,QP,Sc,L0=k(()=>{"use strict";fe();S0();E0();Fa();k0();gn();Ba();Kr();ZP=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,l=e[0],p=e.slice(2).map((g,b)=>g+(g-1)*(r[b]-1)),m=s.map((g,b)=>g+t[b]+t[b+u]).map((g,b)=>Math.floor((g-p[b]+o[b])/o[b]));return m.splice(0,0,a),m.splice(i?3:1,0,l),m},wc=[2,3,1,0],JP=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Tc=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();Rn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Ic=n=>{let e=Ra(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},N0=(n,e,r,t)=>{let o=r.format==="NHWC",i=ZP(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let P=[e[0]];if(o){let R=n.kernelCustomData.wT??n.compute(ot(e[1],wc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=R),P.push(R)}else P.push(e[1]);e.length===3&&P.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(D0(P,r,i,t),{inputs:P}):n.compute(C0(P,r,i,t),{inputs:P});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],p=e[1].dims[3],f=i[o?1:2],m=i[o?2:3],g=i[o?3:1],b=o&&c===s&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(b||c===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let P=i[0],N,R,M,W=[];if(o){let ce=n.kernelCustomData.wT??n.compute(ot(e[1],wc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=ce),b){let G=s*u*l;N=e[0].reshape([1,P,G]),R=ce.reshape([1,G,g]),M=[1,P,g]}else N=e[0].reshape([P,s*u,l]),R=ce.reshape([1,l,g]),M=[P,f*m,g];W.push(N),W.push(R)}else N=e[0].reshape([P,l,s*u]),R=e[1].reshape([1,g,l]),M=[P,g,f*m],W.push(R),W.push(N);a&&W.push(e[2]);let J=M[2],ee=W[0].dims[W[0].dims.length-1];J<8&&ee<8?n.compute(Ma(W,r,i,M,o,t),{inputs:W}):n.compute(Bo(W,r,i,M,o,t),{inputs:W});return}let w=!0,_=n.kernelCustomData.wT??n.compute(ot(e[1],wc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=_);let x=[e[0],_];a&&x.push(e[2]);let I=o?f*m:g,$=o?g:f*m,A=c*p*l;n.compute(I0(x,r,i,I,$,A,a,w,t),{inputs:x})},YP=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Tc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);N0(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},QP=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Tc(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=O0(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(P0(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Sc=(n,e)=>{if(JP(n.inputs,e),n.inputs[0].dims.length===3)YP(n,e);else if(n.inputs[0].dims.length===5)QP(n,n.inputs,e);else{let r=Tc(e,n.inputs);N0(n,n.inputs,r)}}});var R0,z0=k(()=>{"use strict";le();zr();fe();me();R0=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,l=s[3],c=i?Oe(u):1,p=i&&l===1&&u>=4,f=p?Math.floor(u/4)*4:Math.floor(u/c)*c,m=u-f,g=i?Oe(l):1,b=i?l===1?c:g:1,w=D.size(o)/g,_=[Math.ceil(w/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let x=["rank","rank"],I=[e.strides[0],e.strides[1]],$=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],A=[e.dilations[0],e.dilations[1]],P=[$[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),$[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],N=[P[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),P[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],R=[{type:12,data:w},{type:12,data:I},{type:12,data:$},{type:12,data:A},{type:12,data:P},{type:6,data:N},{type:12,data:f},{type:12,data:u},{type:12,data:l},...V(n[0].dims,n[1].dims)];t&&(R.push(...V(n[2].dims)),x.push("rank")),R.push(...V(o));let M=W=>{let J=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:P.length},{name:"pads",type:"i32",length:N.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ee=Me(n[0].dataType),ce=i?1:2,G=i?2:3,Te=i?3:1,se=L("W",n[1].dataType,n[1].dims.length,b),K=L("Dy",n[0].dataType,n[0].dims.length,c),ge=[K,se];t&&ge.push(L("bias",n[2].dataType,[o[Te]].length,g));let re=B("result",n[0].dataType,o.length,g),de=()=>{let ue="";if(p)c===4?ue+=`
        let xValue = ${K.getByOffset("x_offset")};
        let wValue = ${se.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?ue+=`
          dotProd = dotProd + dot(vec4<${ee}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}), vec4<${ee}>(${se.getByOffset("w_offset")}, ${se.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(ue+=`
          dotProd = dotProd + dot(vec4<${ee}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}, ${K.getByOffset("x_offset + 2u")}, ${K.getByOffset("x_offset + 3u")}), vec4<${ee}>(${se.getByOffset("w_offset")}, ${se.getByOffset("w_offset + 1u")}, ${se.getByOffset("w_offset + 2u")}, ${se.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ue+=`
                  let xValue = ${i?K.getByOffset(`${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):K.get("batch","inputChannel","idyR","idyC")};
        `,c===1)ue+=`
          let w_offset = ${se.indicesToOffset(`${se.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${se.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let E=0;E<c;E++)ue+=`
            let wValue${E} = ${se.getByOffset(`${se.indicesToOffset(`${se.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${E}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${E}] * wValue${E};`;return ue},Ve=()=>{if(m===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let ue="";if(c===1){ue+="dotProd = dotProd";for(let E=0;E<m;E++)ue+=`
            + ${K.getByOffset(`x_offset + ${E}`)} * ${se.getByOffset(`w_offset + ${E}`)}`;ue+=";"}else if(c===2){if(m!==2)throw new Error(`Invalid inputChannelsRemainder ${m}.`);ue+=`
          let xValue = ${K.getByOffset("x_offset")};
          let wValue = ${se.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ue},Be=`
            let outputIndices = ${re.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${re.indicesGet("outputIndices",0)};
            let d1 = ${re.indicesGet("outputIndices",Te)};
            let r = ${re.indicesGet("outputIndices",ce)};
            let c = ${re.indicesGet("outputIndices",G)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${re.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${ee}(dyRCorner) + ${ee}(wR)) / ${ee}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ee}(uniforms.Dy_shape[${ce}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${ee}(dyCCorner) + ${ee}(wC)) / ${ee}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ee}(uniforms.Dy_shape[${G}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${se.indicesToOffset(`${se.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${de()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${Ve()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${g}]`:""};
            ${re.setByOffset("global_idx","value")};
          `;return`
    ${W.registerUniforms(J).declareVariables(...ge,re)}
      ${W.mainStart()}
      ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Be}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${b}${g}${p}${m}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:R}),getShaderSource:M}}});var e3,t3,r3,M0,B0,n3,F0,o3,V0,G0=k(()=>{"use strict";z0();gn();Kr();e3=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,t3=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},r3=(n,e,r,t,o,i,a,s,u,l)=>{let c=n.length-2,p=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let f=n[0],m=e[s?3:1]*o;for(let g=0,b=n.length-c-(s?1:0);g<c;++g,++b){let w=n[b],_=p?w*a[g]:l[g],x=e3(w,a[g],i[g],e[b],r[g],_);t3(x,t,i,g,g+c),p&&l.push(a[g]*(w-1)+u[g]+(e[b]-1)*r[g]+1-i[g]-i[g+c])}l.splice(0,0,f),l.splice(s?3:1,0,m)},M0=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((p,f)=>p*f,1)===0){r.length=0;for(let p=2;p<e[1].dims.length;++p)r.push(e[1].dims[p])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((p,f)=>p+f,0)===0){let p=e[0].dims.length-2;u=new Array(p).fill(1)}let l=n.strides.slice();if(l.reduce((p,f)=>p+f,0)===0){let p=e[0].dims.length-2;l=new Array(p).fill(1)}r3(s,r,u,n.autoPad,n.group,o,l,t,a,i);let c=Object.assign({},n);return Object.assign(c,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),c},B0=n=>{let e=Ra(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,l=n.wIsConst(),c=n.outputPadding,p=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:c,outputShape:p,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},n3=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((c,p)=>c+p,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,p)=>c+p,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,p)=>c+p,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,p)=>c+p,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},F0=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(ot(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(R0(i,r,t),{inputs:i})},o3=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=M0({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);F0(n,t,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},V0=(n,e)=>{if(n3(n.inputs,e),n.inputs[0].dims.length===3)o3(n,e);else{let r=M0(e,n.inputs);F0(n,n.inputs,r)}}});var i3,U0,W0,H0=k(()=>{"use strict";le();fe();Xe();me();i3=(n,e,r,t)=>{let o=D.size(e),i=e.length,a=L("input",n,i),s=B("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=D.normalizeAxis(u,i),c=p=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,m=Z("uniforms.input_shape","uniforms.axis",i),g=t.reverse?f+(t.exclusive?" + 1":""):"0",b=t.reverse?m:f+(t.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...V(e,e)]}),getShaderSource:c}},U0=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(i3(t,r,o,e),{inputs:[0]})},W0=n=>{let e=n.exclusive===1,r=n.reverse===1;return ae({exclusive:e,reverse:r})}});var a3,s3,u3,q0,j0,K0=k(()=>{"use strict";le();fe();Xe();me();a3=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},s3=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},u3=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=c?[r,t,o,l,l,i/l**2]:[r,t,o,i/l**2,l,l],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=c?[r,l,l,i/l**2,t,o]:[r,i/l**2,l,l,t,o],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=n.reshape(a),f=p.dims.length,m=n.dataType,g=L("a",m,f),b=B("output",m,f),w=_=>`
  ${_.registerUniform("output_size","u32").declareVariables(g,b)}

  ${s3(s,f,g,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:_=>{let x=u?[r,t*l,o*l,i/l**2]:[r,i/l**2,t*l,o*l],I=D.size(x),$=p.dims,A=D.sortBasedOnPerm($,s);return{outputs:[{dims:x,dataType:_[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...V($,A)]}},getShaderSource:w}},q0=(n,e)=>{a3(n.inputs),n.compute(u3(n.inputs[0],e))},j0=n=>ae({blocksize:n.blocksize,mode:n.mode,format:n.format})});var $c,Ga,X0,l3,c3,Ac,Oc,Z0,d3,J0,Y0,Q0=k(()=>{"use strict";le();fe();Xe();me();$c="[a-zA-Z]|\\.\\.\\.",Ga="("+$c+")+",X0="^"+Ga+"$",l3="("+Ga+",)*"+Ga,c3="^"+l3+"$",Ac=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Oc=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(c3)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(X0)))throw new Error("Invalid LHS term");let c=this.processTerm(s,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Ga)))throw new Error("Invalid RHS");o.match(RegExp($c,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(X0))&&!r&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp($c,"g")),c=new Ac(o);return l?.forEach((p,f)=>{if(p==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let b=String.fromCharCode(48+g);c.addSymbol(b,f+g),this.addSymbol(b,t[u++],o)}}else c.addSymbol(p,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,t[u++],o)}),c}},Z0=n=>n+"_max",d3=(n,e,r,t)=>{let i=n.map(c=>c.length).map((c,p)=>L(`input${p}`,e,c)),a=D.size(t),s=B("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),l=c=>{let p=[],f="var prod = 1.0;",m="var sum = 0.0;",g="sum += prod;",b=[],w=[],_=[],x=[],I=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((A,P)=>{if(r.rhs.symbolToIndices.has(P)){let N=r.rhs.symbolToIndices.get(P)?.[0];N!==void 0&&r.lhs.forEach((R,M)=>{if(A.inputIndices.includes(M)){let W=R.symbolToIndices.get(P);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(J=>{p.push(`${i[M].indicesSet(`input${M}Indices`,J,s.indicesGet("outputIndices",N))}`)})}})}else r.lhs.forEach((N,R)=>{if(A.inputIndices.includes(R)){let M=N.symbolToIndices.get(P);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(W=>{b.push(`${i[R].indicesSet(`input${R}Indices`,W,`${P}`)}`)}),x.push(`prod *= ${i[R].getByIndices(`input${R}Indices`)};`)}}),w.push(`for(var ${P}: u32 = 0; ${P} < uniforms.${Z0(P)}; ${P}++) {`),_.push("}")});let $=I?[...p,`let sum = ${i.map((A,P)=>A.getByIndices(`input${P}Indices`)).join(" * ")};`]:[...p,m,...w,...b,f,...x,g,..._];return`
            ${c.registerUniforms(u.map(A=>({name:`${Z0(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((A,P)=>`var input${P}Indices: ${i[P].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let c=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));c.push({type:12,data:a});let p=n.map((f,m)=>[...V(f)]).reduce((f,m)=>f.concat(m),c);return p.push(...V(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}},getShaderSource:l}},J0=(n,e)=>{let r=new Oc(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(d3(o,n.inputs[0].dataType,r,t))},Y0=n=>{let e=n.equation.replace(/\s+/g,"");return ae({equation:e})}});var p3,ev,f3,h3,tv,rv=k(()=>{"use strict";le();fe();me();p3=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ev=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},f3=(n,e)=>n.length>e.length?ev(n,e):ev(e,n),h3=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=f3(e,r),o=n[0].dataType,i=o===9||D.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(D.size(t)/s),l=p=>{let f=L("input",o,e.length,a),m=B("output",o,t.length,s),g;if(o===9){let b=(w,_,x="")=>`
          let outputIndices${_} = ${m.offsetToIndices(`outputOffset + ${_}u`)};
          let offset${_} = ${f.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${w}[${_}] = ${x}(${f.getByOffset(`index${_}`)}[component${_}]);
        `;g=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${m.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${m.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",m)};
        let data = ${m.type.value}(${f.getByOffset(`inputOffset / ${a}`)});
        ${m.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(f,m)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},c=[{type:12,data:u},...V(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},tv=n=>{p3(n.inputs),n.compute(h3(n.inputs),{inputs:[0]})}});var m3,nv,ov=k(()=>{"use strict";le();fe();me();La();m3=n=>{let e=n[0].dataType,r=D.size(n[0].dims),t=D.size(n[1].dims),o=t%4===0,i=a=>{let s=L("x",e,[1],4),u=L("bias",e,[1],4),l=B("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=m=>`
      let bias${m}_offset: u32 = (global_idx * 4 + ${m}) % uniforms.bias_size;
      let bias${m} = ${u.getByOffset(`bias${m}_offset / 4`)}[bias${m}_offset % 4];`,f=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(s,u,l)}

    ${yc(nt(e))}

    ${a.mainStart(zn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",_c("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/zn/4)}})}},nv=n=>{n.inputs.length<2||D.size(n.inputs[1].dims)===0?Q_(n):n.compute(m3(n.inputs))}});var g3,b3,iv,av,sv=k(()=>{"use strict";le();fe();Xe();me();g3=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},b3=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,l=Math.ceil(D.size(a)/u),c=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...V(n[0].dims,n[1].dims,a)],p=f=>{let m=L("data",n[0].dataType,n[0].dims.length,u),g=L("inputIndices",n[1].dataType,n[1].dims.length),b=B("output",n[0].dataType,a.length,u),w=x=>{let I=t.length,$=`var indicesIndices${x}  = ${g.type.indices}(0);`;for(let A=0;A<I;A++)$+=`${I>1?`indicesIndices${x}[${A}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${A}]`:`outputIndices${x}`};`;$+=`
          var idx${x} = ${g.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${m.type.indices};
        `;for(let A=0,P=0;A<o;A++)A===i?($+=`${o>1?`dataIndices${x}[${A}]`:`dataIndices${x}`} = u32(idx${x});`,P+=I):($+=`${o>1?`dataIndices${x}[${A}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${P}]`:`outputIndices${x}`};`,P++);return $},_;if(n[0].dataType===9){let x=(I,$,A="")=>`
          let outputIndices${$} = ${b.offsetToIndices(`outputOffset + ${$}u`)};
          ${w($)};
          let offset${$} = ${m.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${A}(${m.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else _=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${w("")};
      let value = ${m.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,g,b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${_}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:p}},iv=n=>ae({axis:n.axis}),av=(n,e)=>{let r=n.inputs;g3(r),n.compute(b3(n.inputs,e))}});var y3,uv,lv,cv=k(()=>{"use strict";le();fe();me();y3=(n,e,r,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],c=[i];l.push(...V(e.dims,c));let p=f=>{let m=L("indices_data",e.dataType,e.dims.length),g=B("input_slice_offsets_data",12,1,1),b=[m,g],w=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(...b)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${o.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:p},{inputs:[e],outputs:[-1]})[0]},uv=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=D.sizeToDimension(i,i.length-1),u=D.sizeFromDimension(t,e.batchDims+a),l=D.sizeToDimension(t,e.batchDims),c=D.sizeFromDimension(t,e.batchDims),p=s/l,f=new Array(a),m=u;for(let $=0;$<a;++$)f[a-1-$]=m,m*=t[e.batchDims+a-1-$];let g=y3(n,r[1],f,e.batchDims,t,s,p,c,a),b=e.batchDims+a;if(b>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let w=i.slice(0,-1).concat(t.slice(b)),_=D.size(w),x=[{type:12,data:_},{type:12,data:u},...V(r[0].dims,g.dims,w)],I=$=>{let A=L("data",r[0].dataType,r[0].dims.length),P=L("slice_offsets",12,g.dims.length),N=B("output",r[0].dataType,w.length);return`
          ${$.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,P,N)}
            ${$.mainStart()}
            ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:w,dataType:o}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:x}),getShaderSource:I},{inputs:[r[0],g]})},lv=n=>({batchDims:n.batch_dims,cacheKey:""})});var _3,v3,dv,pv,fv=k(()=>{"use strict";le();fe();Xe();me();_3=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},v3=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.gatherAxis,o),a=D.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=D.size(s),l=n[2].dataType,p=n[0].dataType===22,f=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...V(...n.map((g,b)=>g.dims),s)],m=g=>{let b=L("data",n[0].dataType,n[0].dims.length),w=L("inputIndices",n[1].dataType,n[1].dims.length),_=L("scales",n[2].dataType,n[2].dims.length),x=n.length>3?L("zeroPoint",n[3].dataType,n[3].dims.length):void 0,I=B("output",l,s.length),$=[b,w,_];x&&$.push(x);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(A).declareVariables(...$,I)}
        ${g.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${_.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${_.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${_.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${nt(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((g,b)=>b!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(g,b)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:m}},dv=(n,e)=>{let r=n.inputs;_3(r,e),n.compute(v3(n.inputs,e))},pv=n=>ae({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var x3,w3,hv,mv,gv=k(()=>{"use strict";le();fe();Xe();me();x3=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},w3=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=D.normalizeAxis(e.axis,o),u=r[s],l=i.slice(0),c=D.size(l),p=L("input",t,o),f=L("indicesInput",a,i.length),m=B("output",t,l.length),g=[{type:12,data:c},{type:6,data:u},{type:12,data:s}];return g.push(...V(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,f,m)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}},hv=n=>ae({axis:n.axis}),mv=(n,e)=>{let r=n.inputs;x3(r),n.compute(w3(n.inputs,e))}});var T3,I3,bv,yv,_v=k(()=>{"use strict";le();fe();me();T3=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},I3=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Ta.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),p=!0,f=D.size(s),m=[{type:12,data:p?l:f},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],g=["type","type"];n.length===3&&(m.push(...V(n[2].dims)),g.push("rank")),m.push(...V(s));let b=_=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",$=L("a",n[0].dataType,n[0].dims),A=L("b",n[1].dataType,n[1].dims),P=$.type.value,N=null,R=[$,A];n.length===3&&(N=L("c",n[2].dataType,n[2].dims.length),R.push(N));let M=B("output",n[0].dataType,s.length);R.push(M);let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${_.registerUniforms(W).declareVariables(...R)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${P}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${I}
    ${N!=null?`let cOffset = ${N.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${P}(uniforms.beta) * ${N.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},w=_=>{let x=L("a",n[0].dataType,n[0].dims),I=L("b",n[1].dataType,n[1].dims),$=null,A=[x,I];n.length===3&&($=L("c",n[2].dataType,n[2].dims.length),A.push($));let P=B("output",n[0].dataType,s.length);A.push(P);let N=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],R="",M="";e.transA&&e.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let W=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${_.registerUniforms(N).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${_.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${P.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${R}
      }
      workgroupBarrier();
    }

    ${W}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${$!=null?`let cOffset = ${$.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${P.type.value}(uniforms.beta) * ${$.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:l*c},programUniforms:m}),getShaderSource:w}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:m}),getShaderSource:b}},bv=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},yv=(n,e)=>{T3(n.inputs),n.compute(I3(n.inputs,e))}});var Xr,bn,ao,so,S3,$3,A3,O3,P3,E3,C3,D3,vv,xv,wv=k(()=>{"use strict";le();fe();Xe();me();[Xr,bn,ao,so]=[0,1,2,3],S3=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},$3=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,A3=n=>`
  fn gs_bicubic_interpolate(p: mat4x4<${n}>, x: f32, y: f32) -> ${n} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${n}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,O3=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,P3=n=>`
  ${n.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,E3=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Xr}] = batch;
     indices[${bn}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${ao}] = u32(r);
            indices[${so}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${ao}] = u32(clamp(r, 0, H - 1));
          indices[${so}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${ao}] = gs_reflect(r, border[1], border[3]);
          indices[${so}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,C3=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Xr}], indices[${bn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Xr}], indices[${bn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Xr}], indices[${bn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Xr}], indices[${bn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Xr}], indices[${bn}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Xr}], indices[${bn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,D3=(n,e)=>{let r=L("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=L("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Xr,bn,ao,so]=[0,3,1,2]);let a=B("output",n[0].dataType,i.length),s=r.type.value,u=D.size(i),l=[{type:12,data:u},...V(n[0].dims,t,i)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${$3}
  ${A3(s)}
  ${O3(e)}
  ${P3(e)}
  ${E3(r,s,e)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${ao}]);
      let W_in = i32(uniforms.x_shape[${so}]);

      ${e.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Xr}], indices[${ao}], indices[${so}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${C3(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let f=D.size(i);return{outputs:[{dims:i,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:l}},getShaderSource:c}},vv=(n,e)=>{S3(n.inputs),n.compute(D3(n.inputs,e))},xv=n=>ae({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var xt,L3,Iv,Tv,R3,Fo,Sv,Pc=k(()=>{"use strict";le();fe();Xe();Oa();ka();me();Kr();xt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,L3=(n,e)=>{let r=n[0],t=xt(n,1),o=xt(n,2),i=xt(n,3),a=xt(n,4),s=xt(n,5),u=xt(n,6),l=xt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],p=r.dims[1],f=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],m=p,g=0,b=0,w=Math.floor(f/e.numHeads);if(u&&l&&D.size(u.dims)&&D.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],b=u.dims[2]}else if(u&&D.size(u.dims)||l&&D.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(t&&D.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');_=2,m=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,m=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,m=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}if(i&&D.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=g+m,I=0;if(a&&D.size(a.dims)>0){I=8;let N=a.dims;throw N.length===1?N[0]===c?I=1:N[0]===3*c+2&&(I=3):N.length===2&&N[0]===c&&N[1]===x&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,A=f;if(o&&D.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],$=!0}}let P=!1;if(a&&D.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&D.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==e.numHeads||s.dims[2]!==p||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:A,headSize:w,vHeadSize:Math.floor(A/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:P,passPastInKv:$,qkvFormat:_}},Iv=n=>ae({...n}),Tv=ae({perm:[0,2,1,3]}),R3=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=D.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],c=p=>{let f=B("qkv_with_bias",e.dataType,s),m=L("qkv",e.dataType,s),g=L("bias",r.dataType,s),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(b).declareVariables(m,g,f)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,r],outputs:[-1]})[0]},Fo=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&D.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=R3(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(ot(u,Tv.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(ot(u,Tv.perm),{inputs:[u],outputs:[-1]})[0]},Sv=(n,e)=>{let r=L3(n.inputs,e),t=n.inputs[0],o=xt(n.inputs,1),i=xt(n.inputs,2),a=xt(n.inputs,3),s=xt(n.inputs,4),u=xt(n.inputs,5),l=xt(n.inputs,6),c=xt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let p=o&&i&&o.dims.length===4&&i.dims.length===4,f=Fo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(p)return io(n,f,o,i,s,void 0,l,c,u,r);if(!o||!i)throw new Error("key and value must be provided");let m=Fo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=Fo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);io(n,f,m,g,s,void 0,l,c,u,r)}});var z3,M3,B3,F3,Ec,$v,Av,Cc=k(()=>{"use strict";le();fe();Xe();me();z3=n=>{if(!n||n.length<1)throw new Error("too few inputs")},M3=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),ae({numOutputs:t,axis:e.axis,splitSizes:r})},B3=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Z("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,F3=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Ec=(n,e)=>{let r=n[0].dims,t=D.size(r),o=n[0].dataType,i=D.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=L("input",o,r.length),u=new Array(e.numOutputs),l=[],c=[],p=0,f=[{type:12,data:t}];for(let g=0;g<e.numOutputs;g++){p+=e.splitSizes[g],u[g]=p;let b=r.slice();b[i]=e.splitSizes[g],c.push(b),a[g]=B(`output${g}`,o,b.length),l.push({dims:c[g],dataType:n[0].dataType})}f.push({type:12,data:u},...V(r,...c));let m=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${B3(u.length)}
  ${F3(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Z("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:f})}},$v=(n,e)=>{z3(n.inputs);let r=n.inputs.length===1?e:M3(n.inputs,e);n.compute(Ec(n.inputs,r),{inputs:[0]})},Av=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ae({axis:e,numOutputs:t,splitSizes:r})}});var V3,Ua,Ov,Dc=k(()=>{"use strict";le();fe();Xe();me();V3=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(t.dims,[])&&!D.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!D.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],c=o.dims[0],p=D.sizeFromDimension(r.dims,1)/l,f=s===0?o.dims[1]*2:p/a;if(s>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(f/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ua=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=D.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=s/u,c=n[2].dims[1],p=o===0?c*2:l/t,f=new Array(a,u,l/p,p-c),m=D.computeStrides(f),g=[{type:1,data:i},{type:12,data:f},{type:12,data:m},...n[0].dims.length===3?new Array({type:12,data:[s,l,p,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,p,u*p,1]}):[],...V(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],b=w=>{let _=L("input",n[0].dataType,n[0].dims.length),x=L("position_ids",n[1].dataType,n[1].dims.length),I=L("cos_cache",n[2].dataType,n[2].dims.length),$=L("sin_cache",n[3].dataType,n[3].dims.length),A=B("output",n[0].dataType,n[0].dims.length);return w.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:m.length},{name:"input_output_strides",type:"u32",length:m.length}]),`
        ${w.declareVariables(_,x,I,$,A)}

        ${w.mainStart(zn)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",B("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${_.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${_.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${_.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${_.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",_.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ae({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(f)/zn)},programUniforms:g})}},Ov=(n,e)=>{V3(n.inputs,e),n.compute(Ua(n.inputs,e))}});var G3,U3,Pv,W3,Ev,Cv=k(()=>{"use strict";Xe();le();ka();Pc();Cc();Kr();Dc();me();G3=(n,e)=>{if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.doRotary!==0&&n.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],l=r.dims[1],c=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],p=l,f=0,m=!t||t.dims.length===0,g=Math.floor(m?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);m&&(c=g*e.numHeads);let b=i&&i.dims.length!==0,w=a&&a.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&w){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(b||w)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');p=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let I=0,$=!1,A=e.kvNumHeads?g*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],$=!0}}let P=n.length>4?n[5]:void 0;if(P&&P.dims.length!==1&&P.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:A,headSize:g,vHeadSize:Math.floor(A/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:$,qkvFormat:x}},U3=ae({perm:[0,2,1,3]}),Pv=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(ot(t,U3.perm),{inputs:[t],outputs:[-1]})[0]),t},W3=(n,e,r,t)=>{let o=7,i=["type","type"],a=[n*e],s=n*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:n}],l=c=>{let p=L("seq_lens",r.dataType,r.dims),f=L("total_seq_lens",t.dataType,t.dims),m=B("pos_ids",o,a),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(g).declareVariables(p,f,m)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${f.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${m.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${m.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${m.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${n};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},Ev=(n,e)=>{let r=G3(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=ae({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[f,m,g]=!o&&!i?n.compute(Ec([t],p),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],b,w;if(e.doRotary){let $=n.compute(W3(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],A=n.inputs[7],P=n.inputs[8],N=ae({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),R=[f,$,A,P],M=[-1];b=n.compute(Ua(R,N),{inputs:R,outputs:M})[0],R.splice(0,1,m);let W=ae({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});w=n.compute(Ua(R,W),{inputs:R,outputs:M})[0]}let _=Fo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?b:f,void 0,0),x=Pv(n,e.doRotary?w:m,r),I=Pv(n,g,r);io(n,_,x,I,void 0,void 0,a,s,void 0,r,u,l)}});var Dv,H3,q3,kv,Nv=k(()=>{"use strict";le();fe();Kr();me();Dv=(n,e,r,t,o,i,a,s)=>{let u=Oe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,p=o*a,f=64;p===1&&(f=256);let m=[o,a,i/u],g=[o,a,2],b=["rank","type","type"],w=[];w.push(...V(m,g));let _=x=>{let I=L("x",e.dataType,3,u),$=L("scale",r.dataType,r.dims),A=L("bias",t.dataType,t.dims),P=B("output",1,3,2),N=[I,$,A,P];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${x.declareVariables(...N)}
  ${x.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${qt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${qt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${f}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:p},programUniforms:w}),getShaderSource:_},{inputs:[e,r,t],outputs:[-1]})[0]},H3=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=D.sizeFromDimension(t,i),l=Oe(u),c=D.size(o)/l,p=Dv(n,e[0],e[1],e[2],a,u,s,r.epsilon),f=[a,s,u/l],m=[a,s],g=["type","none"],b=w=>{let _=L("x",e[0].dataType,f.length,l),x=L("scale_shift",1,m.length,2),I=B("output",e[0].dataType,f.length,l),$=[_,x,I];return`
  ${w.registerUniform("output_size","u32").declareVariables(...$)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${_.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...V(f,m,f)]}),getShaderSource:b},{inputs:[e[0],p]})},q3=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=D.sizeFromDimension(t,1)/a,u=Oe(a),l=D.size(o)/u,c=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],p=["type","type"],f=!1,m=[0,t.length-1];for(let _=0;_<t.length-2;_++)f=f||t[_+1]!==1,m.push(_+1);f=f&&t[t.length-1]!==1;let g=f?n.compute(ot(n.inputs[0],m),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(_,x)=>t[m[x]])),b=Dv(n,g,e[1],e[2],i,s,a,r.epsilon),w=_=>{let x=Me(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,$=N=>{let R=N===0?"x":"y",M=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${M}(scale.${R}))`;case 2:return`vec2<${x}>(${M}(scale[0].${R}, scale[1].${R}))`;case 4:return`vec4<${x}>(${M}(scale[0].${R}, scale[1].${R}, scale[2].${R}, scale[3].${R}))`;default:throw new Error(`Not supported compoents ${u}`)}},A=L("input",e[0].dataType,e[0].dims,u),P=B("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${P.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${_.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${$(0)}, ${$(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:w},{inputs:[e[0],b]})},kv=(n,e)=>{e.format==="NHWC"?q3(n,n.inputs,e):H3(n,n.inputs,e)}});var j3,K3,Lv,Rv=k(()=>{"use strict";le();fe();me();j3=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},K3=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=D.normalizeAxis(e.axis,o.length),l=D.sizeToDimension(o,u),c=D.sizeFromDimension(o,u),p=D.size(i.dims),f=a?D.size(a.dims):0;if(p!==c||a&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${f}`);let m=[];for(let A=0;A<o.length;++A)A<u?m.push(o[A]):m.push(1);let g=Oe(c),b=["type","type"],w=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/g)},{type:1,data:e.epsilon}];a&&b.push("type");let _=r>1,x=r>2,I=A=>{let P=Me(n[0].dataType),N=[L("x",n[0].dataType,n[0].dims,g),L("scale",i.dataType,i.dims,g)];a&&N.push(L("bias",a.dataType,a.dims,g)),N.push(B("output",n[0].dataType,s,g)),_&&N.push(B("mean_data_output",1,m)),x&&N.push(B("inv_std_output",1,m));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(R).declareVariables(...N)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${hc("f32",g)};
    var mean_square_vector = ${hc("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Mn(P,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${qt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${qt("mean_square_vector",g)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Mn(P,g,"x[j + offset]")};
      let f32scale = ${Mn(P,g,"scale[j]")};
      output[j + offset] = ${N[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Mn(P,g,"bias[j]")}`:""}
      );
    }

    ${_?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:s,dataType:n[0].dataType}];return _&&$.push({dims:m,dataType:1}),x&&$.push({dims:m,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${t}`,inputDependencies:b},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:w}),getShaderSource:I}},Lv=(n,e)=>{j3(n.inputs),n.compute(K3(n.inputs,e,n.outputCount))}});var X3,zv,Mv=k(()=>{"use strict";fe();Ba();Fa();X3=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},zv=n=>{X3(n.inputs);let e=Mr.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Ma(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=D.size(n.inputs[0].dims.slice(0,-2)),a=D.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),l=[1,i,r],c=[s,u];n.compute(Bo(c,{activation:""},e,l),{inputs:c})}else n.compute(Bo(n.inputs,{activation:""},e))}}});var Z3,J3,Y3,Bv,Fv,Vv=k(()=>{"use strict";le();fe();Xe();me();Z3=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!D.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(D.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let c=n[3].dims,p=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(D.size(c)!==p)throw new Error("zeroPoints input size error.")}},J3=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),c=n[1].dims[2]/4,p=n[0].dataType,f=Oe(e.k),m=Oe(c),g=Oe(a),b=s.concat([o,a]),w=o>1&&a/g%2===0?2:1,_=D.size(b)/g/w,x=64,I=[],$=[u,o,i/f],A=D.convertShape(n[1].dims).slice();A.splice(-1,1,c/m),I.push(...V($)),I.push(...V(A)),I.push(...V(n[2].dims)),n.length===4&&I.push(...V(D.convertShape(n[3].dims)));let P=[u,o,a/g];I.push(...V(P));let N=R=>{let M=$.length,W=L("a",n[0].dataType,M,f),J=L("b",12,A.length,m),ee=L("scales",n[2].dataType,n[2].dims.length),ce=[W,J,ee],G=n.length===4?L("zero_points",12,n[3].dims.length):void 0;G&&ce.push(G);let Te=P.length,se=B("output",n[0].dataType,Te,g),K=Me(n[0].dataType),ge=(()=>{switch(f){case 1:return`array<${K}, 8>`;case 2:return`mat4x2<${K}>`;case 4:return`mat2x4<${K}>`;default:throw new Error(`${f}-component is not supported.`)}})(),re=()=>{let Be=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ge};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ue=0;ue<g*w;ue++)Be+=`
            b_value = ${m===1?`b${ue}_data`:`b${ue}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ge}(${Array.from({length:4},(E,q)=>`${K}(b_value_lower[${q}]), ${K}(b_value_upper[${q}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ge}(${Array.from({length:8},(E,q)=>`(b_quantized_values[${q}] - ${G?`zero_point${ue}`:"zero_point"}) * scale${ue}`).join(", ")});`:`(b_quantized_values - ${ge}(${Array(8).fill(`${G?`zero_point${ue}`:"zero_point"}`).join(",")})) * scale${ue};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(ue/g)}]${g>1?`[${ue%g}]`:""} += ${Array.from({length:8/f},(E,q)=>`${f===1?`a_data[${q}] * b_dequantized_values[${q}]`:`dot(a_data[${q}], b_dequantized_values[${q}])`}`).join(" + ")};
          `;return Be},de=()=>{let Be=`
            var col_index = col * ${g};
            ${G?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${K}(8);`}
            `;for(let ue=0;ue<g*w;ue++)Be+=`
            let scale${ue} = ${ee.getByOffset("col_index * nBlocksPerCol + block")};
            ${G?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ue} = ${K}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Be},Ve=()=>{let Be=`col_index = col * ${g};`;for(let ue=0;ue<g*w;ue++)Be+=`
            let b${ue}_data = ${J.getByIndices(`${J.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Be+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ge};
            var b_dequantized_values: ${ge};`,Be};return`
        var<workgroup> workgroup_shared: array<${se.type.value}, ${w*x}>;
        ${R.declareVariables(...ce,se)}
        ${R.mainStart([x,1,1])}
          let output_indices = ${se.offsetToIndices(`(global_idx / ${x}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/f};
            ${de()}
            for (var word: u32 = 0; word < ${c}; word += ${m}) {
              ${Ve()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${re()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${se.type.value} = ${se.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${se.setByIndices(`${se.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${f};${m};${g};${w};${x}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:p}],dispatchGroup:{x:_},programUniforms:I}),getShaderSource:N}},Y3=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),c=n[1].dims[2]/4,p=n[0].dataType,f=Oe(e.k),m=Oe(c),g=s.concat([o,a]),b=128,w=a%8===0?8:a%4===0?4:1,_=b/w,x=_*m*8,I=x/f,$=x/e.blockSize,A=D.size(g)/w,P=[],N=[u,o,i/f],R=D.convertShape(n[1].dims).slice();R.splice(-1,1,c/m),P.push(...V(N)),P.push(...V(R)),P.push(...V(n[2].dims)),n.length===4&&P.push(...V(D.convertShape(n[3].dims)));let M=[u,o,a];P.push(...V(M));let W=J=>{let ee=N.length,ce=L("a",n[0].dataType,ee,f),G=L("b",12,R.length,m),Te=L("scales",n[2].dataType,n[2].dims.length),se=[ce,G,Te],K=n.length===4?L("zero_points",12,n[3].dims.length):void 0;K&&se.push(K);let ge=M.length,re=B("output",n[0].dataType,ge),de=Me(n[0].dataType),Ve=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${de}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${de}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${de}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${de}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ce.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${re.type.value}, ${_}>, ${w}>;
        ${J.declareVariables(...se,re)}
        ${J.mainStart([_,w,1])}
          let output_indices = ${re.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${b})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ce.getByIndices(`${ce.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ce.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${$} + local_id.x;
            ${K?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${de}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${de}(8);`}
            let scale = ${Te.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${G.getByIndices(`${G.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${Ve()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${de}>(${Array.from({length:4},(Be,ue)=>`${de}(b_value_lower[${ue}]), ${de}(b_value_upper[${ue}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${de}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Be,ue)=>`${`dot(a_data${ue}, b_dequantized_values[${ue}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${re.type.value} = ${re.type.value}(0);
            for (var b = 0u; b < ${_}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${re.setByIndices(`${re.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${f};${m};${_};${w}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:p}],dispatchGroup:{x:A},programUniforms:P}),getShaderSource:W}},Bv=(n,e)=>{Z3(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(Y3(n.inputs,e)):n.compute(J3(n.inputs,e))},Fv=n=>ae(n)});var Q3,eE,tE,rE,nE,oE,iE,aE,Gv,Uv=k(()=>{"use strict";le();fe();me();Q3=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},eE=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Z("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Z("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},tE=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Z("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Z("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Z("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},rE=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Z("uniforms.x_shape",o,e)})) {
                  k = i32(${Z("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${Z("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},nE=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${Z("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${Z("uniforms.x_shape",o,e)})) {
                  k -= i32(${Z("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${Z("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},oE=(n,e,r)=>{switch(r.mode){case 0:return eE(n,e,r.pads.length);case 1:return tE(n,e,r.pads.length);case 2:return rE(n,e,r.pads.length);case 3:return nE(n,e,r.pads.length);default:throw new Error("Invalid mode")}},iE=(n,e)=>{let r=D.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=D.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...V(n[0].dims,r));let s=["rank"],u=l=>{let c=B("output",n[0].dataType,r.length),p=L("x",n[0].dataType,t.length),f=p.type.value,m=oE(c,t.length,e),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${l.registerUniforms(g).declareVariables(p,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${m}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:i}),getShaderSource:u}},aE=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Gv=(n,e)=>{Q3(n.inputs);let r=aE(n.inputs,e);n.compute(iE(n.inputs,r),{inputs:[0]})}});var Wa,Wv,Hv,qv,jv,sE,uE,Kv,Xv,Zv,Jv,Yv,Qv,ex,tx,rx,nx,ox,ix,ax=k(()=>{"use strict";ct();le();fe();me();Wa=n=>{if(pe.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Wv=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Rn.adjustPoolAttributes(r,o,a,s,u,l);let c=Rn.computePoolOutputShape(r,o,s,u,a,l,e.autoPad),p=Object.assign({},e);i?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[p,t?f:c]},Hv=(n,e)=>{let r=e.format==="NHWC",t=D.size(n),o=D.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],p=!!(l+c);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],g=e.strides[e.strides.length-2],b=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2];f=!!(b+w),i.push({type:12,data:m},{type:12,data:g},{type:12,data:b},{type:12,data:w}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,p,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=D.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,a,!!u,!1,!1]}},qv=(n,e,r,t,o,i,a,s,u,l,c,p)=>{let f=o.format==="NHWC",m=e.type.value,g=B("output",e.type.tensor,t);if(o.kernelShape.length<=2){let b="",w="",_="",x=r-(f?2:1);if(c?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=r-(f?3:2);p?w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,_=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${m}(${s});
              var pad = 0;
              ${w}
              ${b}
              ${_}
              ${a}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=o.kernelShape.length,w=o.pads.length,_="";return l?_=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:_=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${m}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${Z("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${Z("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Z("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${Z("uniforms.pads","j - 2u",w)};
                  ${_}
              }
              ${a}

              output[global_idx] = value;
            }`}},jv=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,sE=n=>`${jv(n)};${n.countIncludePad}`,uE=n=>`${jv(n)};${n.storageOrder};${n.dilations}`,Kv=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Xv=(n,e,r,t)=>{let[o,i]=Wv(e,t,r),a=L("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,p,f,m,g]=Hv(i,o);c.push(...V(e.dims,i));let b=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${f};${m};${g}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:c}),getShaderSource:w=>qv(w,a,e.dims.length,i.length,o,u,l,0,p,f,m,g)}},Zv=n=>{let e=n.count_include_pad!==0,r=Kv(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:sE(t)}},Jv=(n,e)=>{Wa(n.inputs),n.compute(Xv("AveragePool",n.inputs[0],!1,e))},Yv={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Qv=n=>{let e=n.format;return{format:e,...Yv,cacheKey:e}},ex=(n,e)=>{Wa(n.inputs),n.compute(Xv("GlobalAveragePool",n.inputs[0],!0,e))},tx=(n,e,r,t)=>{let[o,i]=Wv(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=L("x",e.dataType,e.dims.length),l=["rank"],[c,p,f,m,g]=Hv(i,o);return c.push(...V(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${f};${m};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:c}),getShaderSource:b=>qv(b,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,p,f,m,g)}},rx=(n,e)=>{Wa(n.inputs),n.compute(tx("MaxPool",n.inputs[0],!1,e))},nx=n=>{let e=n.storage_order,r=n.dilations,t=Kv(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:uE(o)}},ox=n=>{let e=n.format;return{format:e,...Yv,cacheKey:e}},ix=(n,e)=>{Wa(n.inputs),n.compute(tx("GlobalMaxPool",n.inputs[0],!0,e))}});var cE,dE,sx,ux,lx=k(()=>{"use strict";le();fe();Xe();me();cE=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},dE=(n,e)=>{let r=D.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=D.size(i),u=t===3||t===2,l=u?[Math.ceil(D.size(n[0].dims)/4)]:n[0].dims,c=n[1].dims,p=n.length>2?n[2]:void 0,f=p?u?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,m=c.length===0||c.length===1&&c[0]===1,g=m===!1&&c.length===1,b=Oe(s),w=m&&(!u||b===4),_=w?b:1,x=w&&!u?b:1,I=L("input",u?12:t,l.length,x),$=L("scale",a,c.length),A=p?L("zero_point",u?12:t,f.length):void 0,P=B("output",a,i.length,_),N=[I,$];A&&N.push(A);let R=[l,c];p&&R.push(f);let M=[{type:12,data:s/_},{type:12,data:r},{type:12,data:e.blockSize},...V(...R,i)],W=J=>{let ee=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${J.registerUniforms(ee).declareVariables(...N,P)}
      ${J.mainStart()}
          ${J.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${P.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${_===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${m?`let scale_value= ${$.getByOffset("0")}`:g?`
            let scale_index = ${P.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?m?u?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:g?u?`
                let zero_point_index = ${P.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${P.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${$.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${P.setByOffset("global_idx",`${P.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:W,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/_/64),y:1,z:1},programUniforms:M})}},sx=(n,e)=>{cE(n.inputs,e),n.compute(dE(n.inputs,e))},ux=n=>ae({axis:n.axis,blockSize:n.blockSize})});var pE,fE,cx,dx=k(()=>{"use strict";ct();le();me();pE=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},fE=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...V(i)],u=l=>{let c=B("output",t,i.length),p=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(f).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},cx=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),pe.webgpu.validateInputContent&&pE(e,r,t),n.compute(fE(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var hE,px,fx,mE,hx,mx,gx=k(()=>{"use strict";le();fe();Xe();me();hE=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(n){case"none":return`${e}=${r};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${r}));`:`
              ${o}bitcast<${t}>(oldValue) + (${r})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},px=(n,e)=>`${n===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${e?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${e?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,fx=(n,e,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${hE(n.reduction,"output[data_offset + i]","value",e)}
      }`,mE=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(D.size(t)/i),s=t[t.length-1],u=D.sizeFromDimension(r,s),l=D.sizeFromDimension(t,0)/s,c=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...V(n[1].dims,n[2].dims,o)],p=f=>{let m=L("indices",n[1].dataType,n[1].dims.length),g=L("updates",n[2].dataType,n[2].dims.length,i),b=e.reduction!=="none"&&e.reduction!==""?Fy("output",n[0].dataType,o.length):B("output",n[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,g,b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    for (var i = 0; i < ${l}; i = i + 1) {
      for (var j = i + 1; j < ${l}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${e.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${l}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${px(r.length,!1)}
      }
      ${fx(e,b.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${px(r.length,!0)}
  }
  ${fx(e,b.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:p}},hx=n=>ae({reduction:n.reduction}),mx=(n,e)=>{n.compute(mE(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var gE,bE,yE,bx,_E,vE,xE,wE,TE,IE,SE,$E,yx,AE,OE,PE,EE,CE,_x,vx,xx=k(()=>{"use strict";le();fe();Xe();me();gE=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},bE=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},yE=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");gE(t,e),e.axes.length>0&&bE(t,e.axes,l).forEach((c,p)=>t[p]=c)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},bx=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,_E=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${bx("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${bx("xResized","lengthOriginal - 1","lengthResized - 1",e)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",vE=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",xE=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},wE=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},TE=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},IE=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${Z("uniforms.scales","i",t)};
        var roi_low = ${Z("uniforms.roi","i",o)};
        var roi_hi = ${Z("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${Z("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,SE=(n,e,r,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Z("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Z("uniforms.roi","i",i)};
          var roi_hi = ${Z("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${Z("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,$E=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Z("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,yx=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",AE=(n,e,r,t,o)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${yx(n,l,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${s}];
      var col:${c} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},OE=(n,e,r,t,o,i,a,s,u,l)=>{let c=r.length===2,p=!0,[f,m]=c?[0,1]:p?[2,3]:[1,2],g=n.type.value,b=w=>{let _=w===f?"row":"col";return`
      fn ${_}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${g} {
        var output_index = ${e.indicesGet("output_indices",w)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[w]},
        ${t[w]}, ${r[w]}, ${i[w]}, ${i[w]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${u};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${_}: ${g} = originalIdx + ${g}(i);
          if (${_} < 0 || ${_} >= ${r[w]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${_} = max(0, min(${_}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",w,`u32(${_})`)};
          data[i + 1] = ${w===f?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(f)};
    ${b(m)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${g} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},PE=(n,e,r,t,o)=>{let[a,s,u,l,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${yx(n,c,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},EE=(n,e,r,t,o,i)=>{let a=n.dims,s=xE(i,e.axes,a.length),u=wE(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,I)=>x===0?1:u[I]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=TE(a,l,e)));let c=B("output",n.dataType,u.length),p=L("input",n.dataType,a.length),f=D.size(u),m=a.length===u.length&&a.every((x,I)=>x===u[I]),g=e.coordinateTransformMode==="tf_crop_and_resize",b=e.extrapolationValue,w=p.type.value,_=x=>`
      ${m?"":`
      ${_E(e.coordinateTransformMode,w)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${$E(p,a)};
              ${vE(e.nearestMode,r,w)};
              ${SE(p,c,a,u,l.length,s.length,g)};
              `;case"linear":return`
              ${IE(c,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${AE(p,c,a,g,b)}`;if(a.length===3||a.length===5)return`${PE(p,c,a,g,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${OE(p,c,a,u,l,s,e.cubicCoeffA,g,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(p,c)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${m?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${m}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:s},...V(a,u)]})}},CE=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},_x=(n,e)=>{let r=[],t=[],o=[],i=CE(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");yE(n.inputs,e,i,r,t,o),n.compute(EE(n.inputs[0],e,i,r,t,o),{inputs:[0]})},vx=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return ae({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var DE,kE,wx,Tx=k(()=>{"use strict";le();fe();me();DE=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},kE=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=D.size(i),s=i,u=a,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],p=!o&&n.length>3,f=n.length>4,m=t&&r>1,g=t&&r>2,b=r>3,w=64,_=Oe(l),x=[{type:12,data:u},{type:12,data:_},{type:12,data:l},{type:1,data:e.epsilon}],I=A=>{let P=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],N=[L("x",n[0].dataType,n[0].dims,_),L("skip",n[1].dataType,n[1].dims,_),L("gamma",n[2].dataType,n[2].dims,_)];p&&N.push(L("beta",n[3].dataType,n[3].dims,_)),f&&N.push(L("bias",n[4].dataType,n[4].dims,_)),N.push(B("output",n[0].dataType,s,_)),m&&N.push(B("mean_output",1,c)),g&&N.push(B("inv_std_output",1,c)),b&&N.push(B("input_skip_bias_sum",n[0].dataType,s,_));let R=Me(n[0].dataType),M=Me(1,_);return`

      ${A.registerUniforms(P).declareVariables(...N)}
      var<workgroup> sum_shared : array<${M}, ${w}>;
      var<workgroup> sum_squared_shared : array<${M}, ${w}>;

      ${A.mainStart([w,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${w};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${w};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${w-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":R+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Mn(R,_,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${w};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${qt("sum",_)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${qt("square_sum",_)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${m?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:s,dataType:n[0].dataType}];return r>1&&$.push({dims:c,dataType:1}),r>2&&$.push({dims:c,dataType:1}),r>3&&$.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${_};${m};${g};${b}`,inputDependencies:n.map((A,P)=>"type")},getShaderSource:I,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},wx=(n,e)=>{DE(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(kE(n.inputs,e,n.outputCount,!1),{outputs:t})}});var NE,Ha,LE,Ix,RE,zE,Sx,$x,Ax=k(()=>{"use strict";le();fe();Xe();me();NE=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ha=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},LE=(n,e)=>{if(n.length>1){let r=Ha(n,1),t=Ha(n,2),o=Ha(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),ae({starts:r,ends:t,axes:o})}else return e},Ix=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},RE=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${Z("uniforms.input_shape","i",r.length)};
            let steps_i = ${Z("uniforms.steps","i",r.length)};
            let signs_i = ${Z("uniforms.signs","i",r.length)};
            let starts_i = ${Z("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${n.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,zE=(n,e)=>{let r=n[0].dims,t=D.size(r),o=e.axes.length>0?D.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ha(n,4);i.forEach(_=>_!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((_,x)=>Ix(_,x,r,o,i)),s=e.ends.map((_,x)=>Ix(_,x,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let _=0;_<r.length;++_)o.includes(_)||(a.splice(_,0,0),s.splice(_,0,r[_]),i.splice(_,0,1));let u=i.map(_=>Math.sign(_));i.forEach((_,x,I)=>{if(_<0){let $=(s[x]-a[x])/_,A=a[x],P=A+$*i[x];a[x]=P,s[x]=A,I[x]=-_}});let l=r.slice(0);o.forEach((_,x)=>{l[_]=Math.ceil((s[_]-a[_])/i[_])});let c={dims:l,dataType:n[0].dataType},p=B("output",n[0].dataType,l.length),f=L("input",n[0].dataType,n[0].dims.length),m=D.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:m},{type:12,data:a},{type:6,data:u},{type:12,data:i},...V(n[0].dims,l)],w=_=>`
      ${_.registerUniforms(g).declareVariables(f,p)}
        ${RE(f,p,r)}
        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:b})}},Sx=(n,e)=>{NE(n.inputs,e);let r=LE(n.inputs,e);n.compute(zE(n.inputs,r),{inputs:[0]})},$x=n=>{let e=n.starts,r=n.ends,t=n.axes;return ae({starts:e,ends:r,axes:t})}});var ME,BE,Ox,Px,Ex=k(()=>{"use strict";le();fe();Xe();Kr();me();ME=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},BE=(n,e)=>{let r=n.inputs[0],t=r.dims,o=D.size(t),i=t.length,a=D.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(N,R)=>R),l[a]=i-1,l[i-1]=a,u=n.compute(ot(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,p=c[i-1],f=o/p,m=Oe(p),g=p/m,b=64;f===1&&(b=256);let w=(N,R)=>R===4?`max(max(${N}.x, ${N}.y), max(${N}.z, ${N}.w))`:R===2?`max(${N}.x, ${N}.y)`:R===3?`max(max(${N}.x, ${N}.y), ${N}.z)`:N,_=L("x",u.dataType,u.dims,m),x=B("result",u.dataType,u.dims,m),I=_.type.value,$=Me(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,A=N=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${N.registerUniform("packedCols","i32").declareVariables(_,x)}
      ${N.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${$}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${w("threadShared[0]",m)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${qt("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,P=n.compute({name:"Softmax",shaderCache:{hint:`${m};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:A},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(ot(P,l),{inputs:[P]})},Ox=(n,e)=>{ME(n.inputs),BE(n,e)},Px=n=>ae({axis:n.axis})});var Cx,FE,VE,GE,Dx,kx=k(()=>{"use strict";le();fe();me();Cx=n=>Array.from(n.getBigInt64Array(),Number),FE=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Cx(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},VE=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},GE=(n,e)=>{let r=n[0].dims,t=e??Cx(n[1]),o=VE(r,t),i=D.size(o),a=n[0].dataType,s=L("input",a,r.length),u=B("output",a,o.length),l=c=>`
      const inputShape = ${s.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(s,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...V(n[0].dims,o)]}),getShaderSource:l}},Dx=n=>{FE(n.inputs),n.compute(GE(n.inputs),{inputs:[0]})}});var UE,WE,Nx,Lx=k(()=>{"use strict";le();fe();me();UE=(n,e,r,t,o)=>{let i=B("output_data",o,r.length,4),a=L("a_data",e[1].dataType,e[1].dims.length,4),s=L("b_data",e[2].dataType,e[2].dims.length,4),u=L("c_data",e[0].dataType,e[0].dims.length,4),l,c=(p,f,m)=>`select(${f}, ${p}, ${m})`;if(!t)l=i.setByOffset("global_idx",c(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(f,m,g="")=>{let b=`a_data[index_a${m}][component_a${m}]`,w=`b_data[index_b${m}][component_b${m}]`,_=`bool(c_data[index_c${m}] & (0xffu << (component_c${m} * 8)))`;return`
            let output_indices${m} = ${i.offsetToIndices(`global_idx * 4u + ${m}u`)};
            let offset_a${m} = ${a.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_b${m} = ${s.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_c${m} = ${u.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let index_a${m} = offset_a${m} / 4u;
            let index_b${m} = offset_b${m} / 4u;
            let index_c${m} = offset_c${m} / 4u;
            let component_a${m} = offset_a${m} % 4u;
            let component_b${m} = offset_b${m} % 4u;
            let component_c${m} = offset_c${m} % 4u;
            ${f}[${m}] = ${g}(${c(b,w,_)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},WE=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(D.areEqual(e,r)&&D.areEqual(r,t)),a=e,s=D.size(e);if(i){let l=Mr.calcShape(Mr.calcShape(e,r,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=D.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>UE(l,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...V(t,e,r,a)]})}},Nx=n=>{n.compute(WE(n.inputs))}});var Rx,zx=k(()=>{"use strict";m_();ka();y_();v_();i0();g0();_0();L0();G0();H0();K0();Q0();rv();ov();sv();cv();fv();gv();_v();wv();Cv();Nv();Rv();Mv();Vv();Pc();Uv();ax();lx();dx();gx();Ca();xx();Dc();Tx();Ax();Ex();Cc();kx();Kr();La();Lx();Rx=new Map([["Abs",[x_]],["Acos",[w_]],["Acosh",[T_]],["Add",[a0]],["ArgMax",[h_,gc]],["ArgMin",[f_,gc]],["Asin",[I_]],["Asinh",[S_]],["Atan",[$_]],["Atanh",[A_]],["Attention",[g_]],["AveragePool",[Jv,Zv]],["BatchNormalization",[b_]],["BiasAdd",[__]],["BiasSplitGelu",[o0]],["Cast",[P_,O_]],["Ceil",[C_]],["Clip",[E_]],["Concat",[b0,y0]],["Conv",[Sc,Ic]],["ConvTranspose",[V0,B0]],["Cos",[D_]],["Cosh",[k_]],["CumSum",[U0,W0]],["DepthToSpace",[q0,j0]],["DequantizeLinear",[sx,ux]],["Div",[s0]],["Einsum",[J0,Y0]],["Elu",[N_,zo]],["Equal",[u0]],["Erf",[L_]],["Exp",[R_]],["Expand",[tv]],["FastGelu",[nv]],["Floor",[z_]],["FusedConv",[Sc,Ic]],["Gather",[av,iv]],["GatherElements",[mv,hv]],["GatherBlockQuantized",[dv,pv]],["GatherND",[uv,lv]],["Gelu",[M_]],["Gemm",[yv,bv]],["GlobalAveragePool",[ex,Qv]],["GlobalMaxPool",[ix,ox]],["Greater",[p0]],["GreaterOrEqual",[h0]],["GridSample",[vv,xv]],["GroupQueryAttention",[Ev]],["HardSigmoid",[q_,H_]],["InstanceNormalization",[kv]],["LayerNormalization",[Lv]],["LeakyRelu",[B_,zo]],["Less",[f0]],["LessOrEqual",[m0]],["Log",[t0]],["MatMul",[zv]],["MatMulNBits",[Bv,Fv]],["MaxPool",[rx,nx]],["Mul",[l0]],["MultiHeadAttention",[Sv,Iv]],["Neg",[V_]],["Not",[F_]],["Pad",[Gv]],["Pow",[c0]],["QuickGelu",[r0,zo]],["Range",[cx]],["Reciprocal",[G_]],["ReduceMin",[s_]],["ReduceMean",[r_]],["ReduceMax",[a_]],["ReduceSum",[l_]],["ReduceProd",[u_]],["ReduceL1",[n_]],["ReduceL2",[o_]],["ReduceLogSum",[d_]],["ReduceLogSumExp",[i_]],["ReduceSumSquare",[c_]],["Relu",[U_]],["Resize",[_x,vx]],["RotaryEmbedding",[Ov]],["ScatterND",[mx,hx]],["Sigmoid",[W_]],["Sin",[j_]],["Sinh",[K_]],["Slice",[Sx,$x]],["SkipLayerNormalization",[wx]],["Split",[$v,Av]],["Sqrt",[X_]],["Softmax",[Ox,Px]],["Sub",[d0]],["Tan",[Z_]],["Tanh",[Y_]],["ThresholdedRelu",[e0,zo]],["Tile",[Dx]],["Transpose",[Uy,Wy]],["Where",[Nx]]])});var qa,Mx=k(()=>{"use strict";ct();zr();me();qa=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){It(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of r)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),gt(e.programInfo.name)}dispose(){}build(e,r){It(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{t.features.has(p.feature)&&o.push(`enable ${p.extension};`)});let a=Vy(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return gt(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var Bx={};_n(Bx,{WebGpuBackend:()=>Nc});var HE,qE,kc,Nc,Fx=k(()=>{"use strict";ct();le();zr();nc();By();zx();Mx();HE=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},qE=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${HE(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},kc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Nc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new kc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=My(this),this.programManager=new qa(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,wa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;It(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,c=i.programName,p=i.inputTensorViews,f=i.outputTensorViews,m=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let b=Number(m-this.queryTimeBase),w=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(_=>({dims:_.dims,dataType:Rr(_.dataType)})),outputsMetadata:f.map(_=>({dims:_.dims,dataType:Rr(_.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:c,startTime:b,endTime:w});else{let _="";p.forEach((I,$)=>{_+=`input[${$}]: [${I.dims}] | ${Rr(I.dataType)}, `});let x="";f.forEach((I,$)=>{x+=`output[${$}]: [${I.dims}] | ${Rr(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${c}" ${_}${x}execution time: ${w-b} ns`)}ni("GPU",`${c}::${m}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),gt()}run(e,r,t,o,i,a){It(e.name);let s=[];for(let I=0;I<r.length;++I){let $=r[I].data;if($===0)continue;let A=this.gpuDataManager.get($);if(!A)throw new Error(`no GPU data for input: ${$}`);s.push(A)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(r),p=t.length===0?u.map((I,$)=>$):t;if(p.length!==u.length)throw new Error(`Output size ${p.length} must be equal to ${u.length}.`);let f=[],m=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(p[I])||p[I]<-3||p[I]>=a)throw new Error(`Invalid output index: ${p[I]}`);if(p[I]===-3)continue;let $=p[I]===-1,A=p[I]===-2,P=$||A?i(u[I].dataType,u[I].dims):o(p[I],u[I].dataType,u[I].dims);if(f.push(P),P.data===0)continue;let N=this.gpuDataManager.get(P.data);if(!N)throw new Error(`no GPU data for output: ${P.data}`);if($&&this.temporaryData.push(N),A){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(N)}m.push(N)}if(s.length!==r.length||m.length!==f.length){if(m.length===0)return gt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(c){let I=0,$=[];c.forEach(R=>{let M=typeof R.data=="number"?[R.data]:R.data;if(M.length===0)return;let W=R.type===10?2:4,J,ee;R.type===10?(ee=M.length>4?16:M.length>2?8:M.length*W,J=M.length>4?16:W*M.length):(ee=M.length<=2?M.length*W:16,J=16),I=Math.ceil(I/ee)*ee,$.push(I);let ce=R.type===10?8:4;I+=M.length>4?Math.ceil(M.length/ce)*J:M.length*W});let A=16;I=Math.ceil(I/A)*A;let P=new ArrayBuffer(I);c.forEach((R,M)=>{let W=$[M],J=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(P,W,J.length).set(J);else if(R.type===12)new Uint32Array(P,W,J.length).set(J);else if(R.type===10)new Uint16Array(P,W,J.length).set(J);else if(R.type===1)new Float32Array(P,W,J.length).set(J);else throw new Error(`Unsupported uniform type: ${Rr(R.type)}`)});let N=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(N.buffer,0,P,0,I),this.gpuDataManager.release(N.id),g={offset:0,size:I,buffer:N.buffer}}let b=this.programManager.normalizeDispatchGroupSize(l),w=b[1]===1&&b[2]===1,_=qE(e,r,w),x=this.programManager.getArtifact(_);if(x||(x=this.programManager.build(e,b),this.programManager.setArtifact(_,x),ye("info",()=>`[artifact] key: ${_}, programName: ${e.name}`)),c&&x.uniformVariablesInfo){if(c.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${c.length} in program "${x.programInfo.name}".`);for(let I=0;I<c.length;I++){let $=c[I],A=$.type,P=typeof $.data=="number"?1:$.data.length,[N,R]=x.uniformVariablesInfo[I];if(A!==N||P!==R)throw new Error(`Uniform variable ${I} mismatch: expect type ${N} with size ${R}, got type ${A} with size ${P} in program "${x.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${_}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:r,outputTensorViews:f};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(x,s,m,b,g),gt(e.name),f}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=Rx.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${a}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await cc(this,e,r);return Ia(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Vx={};_n(Vx,{init:()=>jE});var Vo,Lc,jE,Gx=k(()=>{"use strict";le();zr();fe();Ny();Vo=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(D.size(e)!==D.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Lc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let c=Number(e.getValue(o*i++,a)),p=Number(e.getValue(o*i++,"*")),f=Number(e.getValue(o*i++,a)),m=[];for(let g=0;g<f;g++)m.push(Number(e.getValue(o*i++,a)));u.push(new Vo(e,c,p,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,l)=>new Vo(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=mn(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new Vo(this.module,s,c,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},jE=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=(Fx(),Hn(Bx)).WebGpuBackend,a=new i;await a.initialize(r,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let p=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),p)}},async(s,u,l)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let p=new Lc(e,a,Number(u));return a.computeKernel(Number(s),p,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new Aa(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,c)=>i.ensureTensor(a,s,u,l,c),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var KE,la,ca,Bn,XE,Ux,ko,da,pa,Wx,fa,ha,ma,Kl=k(()=>{"use strict";wy();Iy();le();hn();ba();tc();KE=(n,e)=>{Re()._OrtInit(n,e)!==0&&Ce("Can't initialize onnxruntime.")},la=async n=>{KE(n.wasm.numThreads,Lo(n.logLevel))},ca=async(n,e)=>{Re().asyncInit?.();{let r=(Gx(),Hn(Vx)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Re(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Re(),n)}}},Bn=new Map,XE=n=>{let e=Re(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&Ce("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},Ux=(n,e)=>{let r=Re(),t=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(n,e,a,a+i)!==0&&Ce("Can't get session input/output metadata.");let u=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let l=r.HEAP32[o/4];if(l===0)return[u,0];let c=r.HEAPU32[o/4+1],p=[];for(let f=0;f<c;f++){let m=Number(r.getValue(o+8+f*i,"*"));p.push(m!==0?r.UTF8ToString(m):Number(r.getValue(o+8+(f+c)*i,"*")))}return[u,l,p]}finally{r.stackRestore(t),o!==0&&r._OrtFree(o)}},ko=n=>{let e=Re(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},da=async(n,e)=>{let r,t,o=Re();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=ko(n);let i=0,a=0,s=0,u=[],l=[],c=[];try{if([a,u]=await Ty(e),e?.externalData&&o.mountExternalData){let $=[];for(let A of e.externalData){let P=typeof A=="string"?A:A.path;$.push(Ro(typeof A=="string"?A:A.data).then(N=>{o.mountExternalData(P,N)}))}await Promise.all($)}for(let $ of e?.executionProviders??[])if((typeof $=="string"?$:$.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof $!="string"){let P=$,N=P?.context,R=P?.gpuDevice,M=P?.deviceType,W=P?.powerPreference;N?o.currentContext=N:R?o.currentContext=await o.webnnCreateMLContext(R):o.currentContext=await o.webnnCreateMLContext({deviceType:M,powerPreference:W})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),o.webgpuOnCreateSession?.(i),i===0&&Ce("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[p,f]=XE(i),m=!!e?.enableGraphCapture,g=[],b=[],w=[],_=[],x=[];for(let $=0;$<p;$++){let[A,P,N]=Ux(i,$);A===0&&Ce("Can't get an input name."),l.push(A);let R=o.UTF8ToString(A);g.push(R),w.push(P===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:Rr(P),shape:N})}for(let $=0;$<f;$++){let[A,P,N]=Ux(i,$+p);A===0&&Ce("Can't get an output name."),c.push(A);let R=o.UTF8ToString(A);b.push(R),_.push(P===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:Rr(P),shape:N});{if(m&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let M=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[R]??"cpu",W=o.webnnIsGraphOutput;if(M==="cpu"&&W&&W(i,R)){x.push("ml-tensor-cpu-output");continue}if(M!=="cpu"&&M!=="cpu-pinned"&&M!=="gpu-buffer"&&M!=="ml-tensor")throw new Error(`Not supported preferred output location: ${M}.`);if(m&&M!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${M}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(M)}}let I=null;return x.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&Ce("Can't create IO binding."),I={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>ec($))}),Bn.set(i,[i,l,c,I,m,!1]),[i,g,b,w,_]}catch(p){throw l.forEach(f=>o._OrtFree(f)),c.forEach(f=>o._OrtFree(f)),s!==0&&o._OrtReleaseBinding(s)!==0&&Ce("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Ce("Can't release session."),p}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Ce("Can't release session options."),u.forEach(p=>o._free(p)),o.unmountExternalData?.()}},pa=n=>{let e=Re(),r=Bn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Ce("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Ce("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),e.webnnOnReleaseSession?.(n),e.webgpuOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Ce("Can't release session."),Bn.delete(n)},Wx=async(n,e,r,t,o,i,a=!1)=>{if(!n){e.push(0);return}let s=Re(),u=s.PTR_SIZE,l=n[0],c=n[1],p=n[3],f=p,m,g;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let _=n[2].gpuBuffer;g=mn(oo(l),c);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=x(t,i,_,g)}}else if(p==="ml-tensor"){let _=n[2].mlTensor;g=mn(oo(l),c);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');m=x(t,_,oo(l),c)}else{let _=n[2];if(Array.isArray(_)){g=u*_.length,m=s._malloc(g),r.push(m);for(let x=0;x<_.length;x++){if(typeof _[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(m+x*u,At(_[x],r),"*")}}else{let x=s.webnnIsGraphInput,I=s.webnnIsGraphOutput;if(l!=="string"&&x&&I){let $=s.UTF8ToString(o);if(x(t,$)||I(t,$)){let A=oo(l);g=mn(A,c),f="ml-tensor";let P=s.webnnCreateTemporaryTensor,N=s.webnnUploadTensor;if(!P||!N)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await P(t,A,c);N(R,new Uint8Array(_.buffer,_.byteOffset,_.byteLength)),m=R}else g=_.byteLength,m=s._malloc(g),r.push(m),s.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,g),m)}else g=_.byteLength,m=s._malloc(g),r.push(m),s.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,g),m)}}let b=s.stackSave(),w=s.stackAlloc(4*c.length);try{c.forEach((x,I)=>s.setValue(w+I*u,x,u===4?"i32":"i64"));let _=s._OrtCreateTensor(oo(l),m,g,w,c.length,ec(f));_===0&&Ce(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(_)}finally{s.stackRestore(b)}},fa=async(n,e,r,t,o,i)=>{let a=Re(),s=a.PTR_SIZE,u=Bn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],c=u[1],p=u[2],f=u[3],m=u[4],g=u[5],b=e.length,w=t.length,_=0,x=[],I=[],$=[],A=[],P=a.stackSave(),N=a.stackAlloc(b*s),R=a.stackAlloc(b*s),M=a.stackAlloc(w*s),W=a.stackAlloc(w*s);try{[_,x]=xy(i);for(let G=0;G<b;G++)await Wx(r[G],I,A,n,c[e[G]],e[G],m);for(let G=0;G<w;G++)await Wx(o[G],$,A,n,p[t[G]],b+t[G],m);for(let G=0;G<b;G++)a.setValue(N+G*s,I[G],"*"),a.setValue(R+G*s,c[e[G]],"*");for(let G=0;G<w;G++)a.setValue(M+G*s,$[G],"*"),a.setValue(W+G*s,p[t[G]],"*");if(f&&!g){let{handle:G,outputPreferredLocations:Te,outputPreferredLocationsEncoded:se}=f;if(c.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${c.length}).`);for(let K=0;K<b;K++){let ge=e[K];await a._OrtBindInput(G,c[ge],I[K])!==0&&Ce(`Can't bind input[${K}] for session=${n}.`)}for(let K=0;K<w;K++){let ge=t[K];o[K]?.[3]?a._OrtBindOutput(G,p[ge],$[K],0)!==0&&Ce(`Can't bind pre-allocated output[${K}] for session=${n}.`):a._OrtBindOutput(G,p[ge],0,se[ge])!==0&&Ce(`Can't bind output[${K}] to ${Te[K]} for session=${n}.`)}Bn.set(n,[l,c,p,f,m,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let J;f?J=await a._OrtRunWithBinding(l,f.handle,w,M,_):J=await a._OrtRun(l,R,N,b,W,w,M,_),J!==0&&Ce("failed to call OrtRun().");let ee=[],ce=[];for(let G=0;G<w;G++){let Te=Number(a.getValue(M+G*s,"*"));if(Te===$[G]){ee.push(o[G]);continue}let se=a.stackSave(),K=a.stackAlloc(4*s),ge=!1,re,de=0;try{a._OrtGetTensorData(Te,K,K+s,K+2*s,K+3*s)!==0&&Ce(`Can't access output tensor data on index ${G}.`);let Be=s===4?"i32":"i64",ue=Number(a.getValue(K,Be));de=a.getValue(K+s,"*");let E=a.getValue(K+s*2,"*"),q=Number(a.getValue(K+s*3,Be)),Ie=[];for(let qe=0;qe<q;qe++)Ie.push(Number(a.getValue(E+qe*s,Be)));a._OrtFree(E)!==0&&Ce("Can't free memory for tensor dims.");let rt=Ie.reduce((qe,$e)=>qe*$e,1);re=Rr(ue);let mt=f?.outputPreferredLocations[t[G]];if(re==="string"){if(mt==="gpu-buffer"||mt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let qe=[];for(let $e=0;$e<rt;$e++){let Bt=a.getValue(de+$e*s,"*"),Zr=a.getValue(de+($e+1)*s,"*"),Jr=$e===rt-1?void 0:Zr-Bt;qe.push(a.UTF8ToString(Bt,Jr))}ee.push([re,Ie,qe,"cpu"])}else if(mt==="gpu-buffer"&&rt>0){let qe=a.jsepGetBuffer;if(!qe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let $e=qe(de),Bt=mn(ue,rt);if(Bt===void 0||!va(re))throw new Error(`Unsupported data type: ${re}`);ge=!0,ee.push([re,Ie,{gpuBuffer:$e,download:a.jsepCreateDownloader($e,Bt,re),dispose:()=>{a._OrtReleaseTensor(Te)!==0&&Ce("Can't release tensor.")}},"gpu-buffer"])}else if(mt==="ml-tensor"&&rt>0){let qe=a.webnnEnsureTensor,$e=a.webnnIsInt64Supported;if(!qe||!$e)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(mn(ue,rt)===void 0||!xa(re))throw new Error(`Unsupported data type: ${re}`);if(re==="int64"&&!$e(n))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let Zr=await qe(n,de,ue,Ie,!1);ge=!0,ee.push([re,Ie,{mlTensor:Zr,download:a.webnnCreateMLTensorDownloader(de,re),dispose:()=>{a.webnnReleaseTensorId(de),a._OrtReleaseTensor(Te)}},"ml-tensor"])}else if(mt==="ml-tensor-cpu-output"&&rt>0){let qe=a.webnnCreateMLTensorDownloader(de,re)(),$e=ee.length;ge=!0,ce.push((async()=>{let Bt=[$e,await qe];return a.webnnReleaseTensorId(de),a._OrtReleaseTensor(Te),Bt})()),ee.push([re,Ie,[],"cpu"])}else{let qe=_a(re),$e=new qe(rt);new Uint8Array($e.buffer,$e.byteOffset,$e.byteLength).set(a.HEAPU8.subarray(de,de+$e.byteLength)),ee.push([re,Ie,$e,"cpu"])}}finally{a.stackRestore(se),re==="string"&&de&&a._free(de),ge||a._OrtReleaseTensor(Te)}}f&&!m&&(a._OrtClearBoundOutputs(f.handle)!==0&&Ce("Can't clear bound outputs."),Bn.set(n,[l,c,p,f,m,!1]));for(let[G,Te]of await Promise.all(ce))ee[G][2]=Te;return ee}finally{a.webnnOnRunEnd?.(l),a.stackRestore(P),I.forEach(J=>a._OrtReleaseTensor(J)),$.forEach(J=>a._OrtReleaseTensor(J)),A.forEach(J=>a._free(J)),_!==0&&a._OrtReleaseRunOptions(_),x.forEach(J=>a._free(J))}},ha=n=>{let e=Re(),r=Bn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&Ce("Can't get an profile file name."),e._OrtFree(o)},ma=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Fn,Mt,Go,Ka,Xa,ja,Rc,zc,uo,lo,JE,Hx,qx,jx,Kx,Xx,Zx,Jx,Mc=k(()=>{"use strict";ct();Kl();hn();sa();Fn=()=>!!pe.wasm.proxy&&typeof document<"u",Go=!1,Ka=!1,Xa=!1,zc=new Map,uo=(n,e)=>{let r=zc.get(n);r?r.push(e):zc.set(n,[e])},lo=()=>{if(Go||!Ka||Xa||!Mt)throw new Error("worker not ready")},JE=n=>{switch(n.data.type){case"init-wasm":Go=!1,n.data.err?(Xa=!0,Rc[1](n.data.err)):(Ka=!0,Rc[0]()),ja&&(URL.revokeObjectURL(ja),ja=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=zc.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},Hx=async()=>{if(!Ka){if(Go)throw new Error("multiple calls to 'initWasm()' detected.");if(Xa)throw new Error("previous call to 'initWasm()' failed.");if(Go=!0,Fn())return new Promise((n,e)=>{Mt?.terminate(),yy().then(([r,t])=>{try{Mt=t,Mt.onerror=i=>e(i),Mt.onmessage=JE,Rc=[n,e];let o={type:"init-wasm",in:pe};!o.in.wasm.wasmPaths&&(r||Jl)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Mt.postMessage(o),ja=r}catch(o){e(o)}},e)});try{await ua(pe.wasm),await la(pe),Ka=!0}catch(n){throw Xa=!0,n}finally{Go=!1}}},qx=async n=>{if(Fn())return lo(),new Promise((e,r)=>{uo("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:pe}};Mt.postMessage(t)});await ca(pe,n)},jx=async n=>Fn()?(lo(),new Promise((e,r)=>{uo("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Mt.postMessage(t,[n.buffer])})):ko(n),Kx=async(n,e)=>{if(Fn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return lo(),new Promise((r,t)=>{uo("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Mt.postMessage(o,i)})}else return da(n,e)},Xx=async n=>{if(Fn())return lo(),new Promise((e,r)=>{uo("release",[e,r]);let t={type:"release",in:n};Mt.postMessage(t)});pa(n)},Zx=async(n,e,r,t,o,i)=>{if(Fn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return lo(),new Promise((a,s)=>{uo("run",[a,s]);let u=r,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Mt.postMessage(l,ma(u))})}else return fa(n,e,r,t,o,i)},Jx=async n=>{if(Fn())return lo(),new Promise((e,r)=>{uo("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Mt.postMessage(t)});ha(n)}});var Yx,YE,Za,Qx=k(()=>{"use strict";ct();Mc();le();aa();tc();Yx=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},YE=n=>{switch(n[3]){case"cpu":return new Tt(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!va(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return Tt.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!xa(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return Tt.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},Za=class{async fetchModelAndCopyToWasmMemory(e){return jx(await Ro(e))}async loadModel(e,r){It();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Kx(t,r),gt()}async dispose(){return Xx(this.sessionId)}async run(e,r,t){It();let o=[],i=[];Object.entries(e).forEach(f=>{let m=f[0],g=f[1],b=this.inputNames.indexOf(m);if(b===-1)throw new Error(`invalid input '${m}'`);o.push(g),i.push(b)});let a=[],s=[];Object.entries(r).forEach(f=>{let m=f[0],g=f[1],b=this.outputNames.indexOf(m);if(b===-1)throw new Error(`invalid output '${m}'`);a.push(g),s.push(b)});let u=o.map((f,m)=>Yx(f,()=>`input "${this.inputNames[i[m]]}"`)),l=a.map((f,m)=>f?Yx(f,()=>`output "${this.outputNames[s[m]]}"`):null),c=await Zx(this.sessionId,i,u,s,l,t),p={};for(let f=0;f<c.length;f++)p[this.outputNames[s[f]]]=a[f]??YE(c[f]);return gt(),p}startProfiling(){}endProfiling(){Jx(this.sessionId)}}});var tw={};_n(tw,{OnnxruntimeWebAssemblyBackend:()=>Ja,initializeFlags:()=>ew,wasmBackend:()=>QE});var ew,Ja,QE,rw=k(()=>{"use strict";ct();Mc();Qx();ew=()=>{(typeof pe.wasm.initTimeout!="number"||pe.wasm.initTimeout<0)&&(pe.wasm.initTimeout=0);let n=pe.wasm.simd;if(typeof n!="boolean"&&n!==void 0&&n!=="fixed"&&n!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`),pe.wasm.simd=!1),typeof pe.wasm.proxy!="boolean"&&(pe.wasm.proxy=!1),typeof pe.wasm.trace!="boolean"&&(pe.wasm.trace=!1),typeof pe.wasm.numThreads!="number"||!Number.isInteger(pe.wasm.numThreads)||pe.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)pe.wasm.numThreads=1;else{let e=typeof navigator>"u"?_s("node:os").cpus().length:navigator.hardwareConcurrency;pe.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},Ja=class{async init(e){ew(),await Hx(),await qx(e)}async createInferenceSessionHandler(e,r){let t=new Za;return await t.loadModel(e,r),t}},QE=new Ja});ct();ct();ct();var Ap="1.22.0-dev.20250418-c19a49615b";var Pj=Ss;{let n=(iy(),Hn(oy)).onnxjsBackend;on("webgl",n,-10)}{let n=(rw(),Hn(tw)).wasmBackend;on("webgpu",n,5),on("webnn",n,5),on("cpu",n,10),on("wasm",n,10)}Object.defineProperty(pe.versions,"web",{value:Ap,enumerable:!0});export{CT as InferenceSession,ni as TRACE,It as TRACE_FUNC_BEGIN,gt as TRACE_FUNC_END,Tt as Tensor,Pj as default,pe as env,on as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.bundle.min.mjs.map
