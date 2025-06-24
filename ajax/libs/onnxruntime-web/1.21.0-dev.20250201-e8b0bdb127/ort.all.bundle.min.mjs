/*!
 * ONNX Runtime Web v1.21.0-dev.20250201-e8b0bdb127
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ST=Object.create;var ni=Object.defineProperty;var $T=Object.getOwnPropertyDescriptor;var AT=Object.getOwnPropertyNames;var OT=Object.getPrototypeOf,PT=Object.prototype.hasOwnProperty;var Is=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var D=(n,e)=>()=>(n&&(e=n(n=0)),e);var ne=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),qn=(n,e)=>{for(var r in e)ni(n,r,{get:e[r],enumerable:!0})},ip=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of AT(e))!PT.call(n,o)&&o!==r&&ni(n,o,{get:()=>e[o],enumerable:!(t=$T(e,o))||t.enumerable});return n};var ye=(n,e,r)=>(r=n!=null?ST(OT(n)):{},ip(e||!n||!n.__esModule?ni(r,"default",{value:n,enumerable:!0}):r,n)),po=n=>ip(ni({},"__esModule",{value:!0}),n);var oi,vn,rn,ET,ap,Ss=D(()=>{"use strict";oi=new Map,vn=[],rn=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=oi.get(n);if(t===void 0)oi.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=vn.indexOf(n);o!==-1&&vn.splice(o,1);for(let i=0;i<vn.length;i++)if(oi.get(vn[i]).priority<=r){vn.splice(i,0,n);return}vn.push(n)}return}throw new TypeError("not a valid backend")},ET=async n=>{let e=oi.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},ap=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?vn:r,o,i=[],a=new Set;for(let u of t){let l=await ET(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var sp=D(()=>{"use strict";Ss()});var up,lp=D(()=>{"use strict";up="1.21.0-dev.20241212-1f88284f96"});var cp,It,$s=D(()=>{"use strict";lp();cp="warning",It={wasm:{},webgl:{},webgpu:{},versions:{common:up},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);cp=n}},get logLevel(){return cp}};Object.defineProperty(It,"logLevel",{enumerable:!0})});var fe,dp=D(()=>{"use strict";$s();fe=It});var pp,fp,hp=D(()=>{"use strict";pp=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let p=i*o,c=0,f=p,b=p*2,g=-1;a==="RGBA"?(c=0,f=p,b=p*2,g=p*3):a==="RGB"?(c=0,f=p,b=p*2):a==="RBG"&&(c=0,b=p,f=p*2);for(let m=0;m<i;m++)for(let w=0;w<o;w++){let x=(n.data[c++]-l[0])*u[0],v=(n.data[f++]-l[1])*u[1],I=(n.data[b++]-l[2])*u[2],$=g===-1?255:(n.data[g++]-l[3])*u[3];t.fillStyle="rgba("+x+","+v+","+I+","+$+")",t.fillRect(w,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},fp=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,b=0,g=1,m=2,w=3,x=0,v=c,I=c*2,$=-1;s==="RGBA"?(x=0,v=c,I=c*2,$=c*3):s==="RGB"?(x=0,v=c,I=c*2):s==="RBG"&&(x=0,I=c,v=c*2),t=r.createImageData(o,i);for(let O=0;O<i*o;b+=f,g+=f,m+=f,w+=f,O++)t.data[b]=(n.data[x++]-p[0])*l[0],t.data[g]=(n.data[v++]-p[1])*l[1],t.data[m]=(n.data[I++]-p[2])*l[2],t.data[w]=$===-1?255:(n.data[$++]-p[3])*l[3]}else throw new Error("Can not access image data");return t}});var As,mp,gp,bp,yp,_p,vp=D(()=>{"use strict";ii();As=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=r*t,p=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,f=0,b=1,g=2,m=3,w=0,x=l,v=l*2,I=-1;s==="RGB"&&(c=3,f=0,b=1,g=2,m=-1),u==="RGBA"?I=l*3:u==="RBG"?(w=0,v=l,x=l*2):u==="BGR"&&(v=0,x=l,w=l*2);for(let O=0;O<l;O++,f+=c,g+=c,b+=c,m+=c)p[w++]=(n[f]+a[0])/i[0],p[x++]=(n[b]+a[1])/i[1],p[v++]=(n[g]+a[2])/i[2],I!==-1&&m!==-1&&(p[I++]=(n[m]+a[3])/i[3]);return u==="RGBA"?new ct("float32",p,[1,4,r,t]):new ct("float32",p,[1,3,r,t])},mp=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=u();p.width=n.width,p.height=n.height;let c=l(p);if(c!=null){let f=n.height,b=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(f=e.resizedHeight,b=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=f,s.width=b}else s.tensorFormat="RGBA",s.height=f,s.width=b;c.drawImage(n,0,0),a=c.getImageData(0,0,b,f).data}else throw new Error("Can not access image data")}else if(t){let p,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(p=e.resizedHeight,c=e.resizedWidth):(p=n.height,c=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=p,s.width=c,e!==void 0){let f=u();f.width=c,f.height=p;let b=l(f);if(b!=null)b.putImageData(n,0,0),a=b.getImageData(0,0,c,p).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=u();p.width=n.width,p.height=n.height;let c=l(p);if(c!=null){let f=n.height,b=n.width;return c.drawImage(n,0,0,b,f),a=c.getImageData(0,0,b,f).data,s.height=f,s.width=b,As(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,c)=>{let f=u(),b=l(f);if(!n||!b)return c();let g=new Image;g.crossOrigin="Anonymous",g.src=n,g.onload=()=>{f.width=g.width,f.height=g.height,b.drawImage(g,0,0,f.width,f.height);let m=b.getImageData(0,0,f.width,f.height);s.height=f.height,s.width=f.width,p(As(m.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return As(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},gp=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new ct({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},bp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ct({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},yp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ct({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},_p=(n,e,r)=>new ct({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var xn,fo,xp,wp,Tp=D(()=>{"use strict";xn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),fo=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xp=!1,wp=()=>{if(!xp){xp=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;n&&(xn.set("int64",BigInt64Array),fo.set(BigInt64Array,"int64")),e&&(xn.set("uint64",BigUint64Array),fo.set(BigUint64Array,"uint64")),r?(xn.set("float16",Float16Array),fo.set(Float16Array,"float16")):xn.set("float16",Uint16Array)}}});var Ip,Sp,$p=D(()=>{"use strict";ii();Ip=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},Sp=(n,e)=>{switch(n.location){case"cpu":return new ct(n.type,n.data,e);case"cpu-pinned":return new ct({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new ct({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new ct({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new ct({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var ct,ii=D(()=>{"use strict";hp();vp();Tp();$p();ct=class{constructor(e,r,t){wp();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=xn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let l=xn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(r,BigInt):s=l.from(r)}else if(r instanceof l)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=fo.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Ip(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return mp(e,r)}static fromTexture(e,r){return gp(e,r)}static fromGpuBuffer(e,r){return bp(e,r)}static fromMLTensor(e,r){return yp(e,r)}static fromPinnedBuffer(e,r,t){return _p(e,r,t)}toDataURL(e){return pp(this,e)}toImageData(e){return fp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Sp(this,e)}}});var St,Os=D(()=>{"use strict";ii();St=ct});var ai,Ap,$t,bt,Ps=D(()=>{"use strict";$s();ai=(n,e)=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||console.timeStamp(`${n}::ORT::${e}`)},Ap=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),ai("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},$t=n=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||Ap("BEGIN",n)},bt=n=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||Ap("END",n)}});var si,Op=D(()=>{"use strict";Ss();Os();Ps();si=class n{constructor(e){this.handler=e}async run(e,r,t){$t();let o={},i={};if(typeof e!="object"||e===null||e instanceof St||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof St)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,p=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(p.indexOf(c)!==-1){let f=r[c];(f===null||f instanceof St)&&(l=!0,a=!1,o[c]=f)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let p=s[l];p instanceof St?u[l]=p:u[l]=new St(p.type,p.data,p.dims)}return bt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){$t();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let p=e,c=0,f=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(f=e.byteLength-c,typeof t=="number"){if(f=t,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||c+f>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-c}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,c,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await ap(a),l=await s.createInferenceSessionHandler(i,u);return bt(),new n(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var CT,Pp=D(()=>{"use strict";Op();CT=si});var Ep=D(()=>{"use strict"});var Cp=D(()=>{"use strict"});var Dp=D(()=>{"use strict"});var kp=D(()=>{"use strict"});var Es={};qn(Es,{InferenceSession:()=>CT,TRACE:()=>ai,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>bt,Tensor:()=>St,env:()=>fe,registerBackend:()=>rn});var ft=D(()=>{"use strict";sp();dp();Pp();Os();Ep();Cp();Ps();Dp();kp()});function nn(n,e,r,t){if(e===void 0)return kT(n);if(r===void 0)ui(n,e,1);else if(typeof r=="number"&&t===void 0)ui(n,e,r);else if(typeof r=="string"&&t===void 0)ui(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")ui(n,r,t,e);else throw new TypeError("input is valid")}function kT(n){return{verbose:nn.verbose.bind(null,n),info:nn.info.bind(null,n),warning:nn.warning.bind(null,n),error:nn.error.bind(null,n),fatal:nn.fatal.bind(null,n)}}function ui(n,e,r,t){let o=ho[t||""]||ho[""];Lp[n]<Lp[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,DT[o.provider].log(n,e,t))}var Cs,Ds,Lp,DT,Rp,ho,ze,ci,di,pi,li,Et=D(()=>{"use strict";Cs=class{log(e,r,t){}},Ds=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Lp={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},DT={none:new Cs,console:new Ds},Rp={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},ho={"":Rp};(u=>{function n(l,p){u("verbose",l,p)}u.verbose=n;function e(l,p){u("info",l,p)}u.info=e;function r(l,p){u("warning",l,p)}u.warning=r;function t(l,p){u("error",l,p)}u.error=t;function o(l,p){u("fatal",l,p)}u.fatal=o;function i(l){ho={},a("",l||{})}u.reset=i;function a(l,p){if(l==="*")i(p);else{let c=ho[l]||Rp;ho[l]={provider:p.provider||c.provider,minimalSeverity:p.minimalSeverity||c.minimalSeverity,logDateTime:p.logDateTime===void 0?c.logDateTime:p.logDateTime,logSourceLocation:p.logSourceLocation===void 0?c.logSourceLocation:p.logSourceLocation}}}u.set=a;function s(l){let p={};l.logLevel&&(p.minimalSeverity=l.logLevel),a("",p)}u.setWithEnv=s})(nn||={});ze=nn,ci=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},di=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},pi=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=li(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async p=>{i&&await i.end(),u(p)},async p=>{i&&await i.end(),l(p)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,p)=>{u.then(()=>{l(s)},c=>{p(c)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=li();return this.flush(o),new ci(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new ci(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new di(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=li();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new di(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){ze.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=li()}}get started(){return this._started}},li=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function zp(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&NT(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function NT(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var Mp=D(()=>{"use strict"});var Bp=ne(ks=>{"use strict";ks.__esModule=!0;var LT=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();ks.Guid=LT});function Ge(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function ht(n){return(n&&n.__isLong__)===!0}function Fp(n){var e=Math.clz32(n&-n);return n?31-e:e}function wn(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=Gp[n],t)?t:(r=Ne(n,0,!0),o&&(Gp[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Vp[n],t)?t:(r=Ne(n,n<0?-1:0,!1),o&&(Vp[n]=r),r))}function Dt(n,e){if(isNaN(n))return e?jr:Vt;if(e){if(n<0)return jr;if(n>=qp)return Xp}else{if(n<=-Wp)return yt;if(n+1>=Wp)return Kp}return n<0?Dt(-n,e).neg():Ne(n%Kn|0,n/Kn|0,e)}function Ne(n,e,r){return new Ge(n,e,r)}function Ls(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?jr:Vt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Ls(n.substring(1),e,r).neg();for(var o=Dt(fi(r,8)),i=Vt,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var l=Dt(fi(r,s));i=i.mul(l).add(Dt(u))}else i=i.mul(o),i=i.add(Dt(u))}return i.unsigned=e,i}function Gt(n,e){return typeof n=="number"?Dt(n,e):typeof n=="string"?Ls(n,e):Ne(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Ct,Vp,Gp,fi,Up,RT,Kn,qp,Wp,Hp,Vt,jr,jn,jp,Ns,Kp,Xp,yt,U,on,Rs=D(()=>{Ct=null;try{Ct=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ge.prototype.__isLong__;Object.defineProperty(Ge.prototype,"__isLong__",{value:!0});Ge.isLong=ht;Vp={},Gp={};Ge.fromInt=wn;Ge.fromNumber=Dt;Ge.fromBits=Ne;fi=Math.pow;Ge.fromString=Ls;Ge.fromValue=Gt;Up=65536,RT=1<<24,Kn=Up*Up,qp=Kn*Kn,Wp=qp/2,Hp=wn(RT),Vt=wn(0);Ge.ZERO=Vt;jr=wn(0,!0);Ge.UZERO=jr;jn=wn(1);Ge.ONE=jn;jp=wn(1,!0);Ge.UONE=jp;Ns=wn(-1);Ge.NEG_ONE=Ns;Kp=Ne(-1,2147483647,!1);Ge.MAX_VALUE=Kp;Xp=Ne(-1,-1,!0);Ge.MAX_UNSIGNED_VALUE=Xp;yt=Ne(0,-2147483648,!1);Ge.MIN_VALUE=yt;U=Ge.prototype;U.toInt=function(){return this.unsigned?this.low>>>0:this.low};U.toNumber=function(){return this.unsigned?(this.high>>>0)*Kn+(this.low>>>0):this.high*Kn+(this.low>>>0)};U.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(yt)){var r=Dt(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Dt(fi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,p=l.toString(e);if(a=u,a.isZero())return p+s;for(;p.length<6;)p="0"+p;s=""+p+s}};U.getHighBits=function(){return this.high};U.getHighBitsUnsigned=function(){return this.high>>>0};U.getLowBits=function(){return this.low};U.getLowBitsUnsigned=function(){return this.low>>>0};U.getNumBitsAbs=function(){if(this.isNegative())return this.eq(yt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&!(e&1<<r);r--);return this.high!=0?r+33:r+1};U.isZero=function(){return this.high===0&&this.low===0};U.eqz=U.isZero;U.isNegative=function(){return!this.unsigned&&this.high<0};U.isPositive=function(){return this.unsigned||this.high>=0};U.isOdd=function(){return(this.low&1)===1};U.isEven=function(){return(this.low&1)===0};U.equals=function(e){return ht(e)||(e=Gt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};U.eq=U.equals;U.notEquals=function(e){return!this.eq(e)};U.neq=U.notEquals;U.ne=U.notEquals;U.lessThan=function(e){return this.comp(e)<0};U.lt=U.lessThan;U.lessThanOrEqual=function(e){return this.comp(e)<=0};U.lte=U.lessThanOrEqual;U.le=U.lessThanOrEqual;U.greaterThan=function(e){return this.comp(e)>0};U.gt=U.greaterThan;U.greaterThanOrEqual=function(e){return this.comp(e)>=0};U.gte=U.greaterThanOrEqual;U.ge=U.greaterThanOrEqual;U.compare=function(e){if(ht(e)||(e=Gt(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};U.comp=U.compare;U.negate=function(){return!this.unsigned&&this.eq(yt)?yt:this.not().add(jn)};U.neg=U.negate;U.add=function(e){ht(e)||(e=Gt(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,p=0,c=0,f=0,b=0;return b+=i+l,f+=b>>>16,b&=65535,f+=o+u,c+=f>>>16,f&=65535,c+=t+s,p+=c>>>16,c&=65535,p+=r+a,p&=65535,Ne(f<<16|b,p<<16|c,this.unsigned)};U.subtract=function(e){return ht(e)||(e=Gt(e)),this.add(e.neg())};U.sub=U.subtract;U.multiply=function(e){if(this.isZero())return this;if(ht(e)||(e=Gt(e)),Ct){var r=Ct.mul(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?jr:Vt;if(this.eq(yt))return e.isOdd()?yt:Vt;if(e.eq(yt))return this.isOdd()?yt:Vt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Hp)&&e.lt(Hp))return Dt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,p=e.low&65535,c=0,f=0,b=0,g=0;return g+=a*p,b+=g>>>16,g&=65535,b+=i*p,f+=b>>>16,b&=65535,b+=a*l,f+=b>>>16,b&=65535,f+=o*p,c+=f>>>16,f&=65535,f+=i*l,c+=f>>>16,f&=65535,f+=a*u,c+=f>>>16,f&=65535,c+=t*p+o*l+i*u+a*s,c&=65535,Ne(b<<16|g,c<<16|f,this.unsigned)};U.mul=U.multiply;U.divide=function(e){if(ht(e)||(e=Gt(e)),e.isZero())throw Error("division by zero");if(Ct){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Ct.div_u:Ct.div_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?jr:Vt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return jr;if(e.gt(this.shru(1)))return jp;i=jr}else{if(this.eq(yt)){if(e.eq(jn)||e.eq(Ns))return yt;if(e.eq(yt))return jn;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Vt)?e.isNegative()?jn:Ns:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(yt))return this.unsigned?jr:Vt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Vt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:fi(2,s-48),l=Dt(t),p=l.mul(e);p.isNegative()||p.gt(o);)t-=u,l=Dt(t,this.unsigned),p=l.mul(e);l.isZero()&&(l=jn),i=i.add(l),o=o.sub(p)}return i};U.div=U.divide;U.modulo=function(e){if(ht(e)||(e=Gt(e)),Ct){var r=(this.unsigned?Ct.rem_u:Ct.rem_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};U.mod=U.modulo;U.rem=U.modulo;U.not=function(){return Ne(~this.low,~this.high,this.unsigned)};U.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};U.clz=U.countLeadingZeros;U.countTrailingZeros=function(){return this.low?Fp(this.low):Fp(this.high)+32};U.ctz=U.countTrailingZeros;U.and=function(e){return ht(e)||(e=Gt(e)),Ne(this.low&e.low,this.high&e.high,this.unsigned)};U.or=function(e){return ht(e)||(e=Gt(e)),Ne(this.low|e.low,this.high|e.high,this.unsigned)};U.xor=function(e){return ht(e)||(e=Gt(e)),Ne(this.low^e.low,this.high^e.high,this.unsigned)};U.shiftLeft=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Ne(0,this.low<<e-32,this.unsigned)};U.shl=U.shiftLeft;U.shiftRight=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Ne(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};U.shr=U.shiftRight;U.shiftRightUnsigned=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Ne(this.high,0,this.unsigned):Ne(this.high>>>e-32,0,this.unsigned)};U.shru=U.shiftRightUnsigned;U.shr_u=U.shiftRightUnsigned;U.rotateLeft=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Ne(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};U.rotl=U.rotateLeft;U.rotateRight=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Ne(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};U.rotr=U.rotateRight;U.toSigned=function(){return this.unsigned?Ne(this.low,this.high,!1):this};U.toUnsigned=function(){return this.unsigned?this:Ne(this.low,this.high,!0)};U.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};U.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};U.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};Ge.fromBytes=function(e,r,t){return t?Ge.fromBytesLE(e,r):Ge.fromBytesBE(e,r)};Ge.fromBytesLE=function(e,r){return new Ge(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};Ge.fromBytesBE=function(e,r){return new Ge(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};on=Ge});var zs=ne(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.ArgType=void 0;var Zp;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Zp||(hi.ArgType=Zp={}))});var Tn=ne(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.SIZE_PREFIX_LENGTH=tr.FILE_IDENTIFIER_LENGTH=tr.SIZEOF_INT=tr.SIZEOF_SHORT=void 0;tr.SIZEOF_SHORT=2;tr.SIZEOF_INT=4;tr.FILE_IDENTIFIER_LENGTH=4;tr.SIZE_PREFIX_LENGTH=4});var Ms=ne(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.isLittleEndian=kt.float64=kt.float32=kt.int32=void 0;kt.int32=new Int32Array(2);kt.float32=new Float32Array(kt.int32.buffer);kt.float64=new Float64Array(kt.int32.buffer);kt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Bs=ne(mi=>{"use strict";Object.defineProperty(mi,"__esModule",{value:!0});mi.Encoding=void 0;var Jp;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Jp||(mi.Encoding=Jp={}))});var Vs=ne(gi=>{"use strict";Object.defineProperty(gi,"__esModule",{value:!0});gi.ByteBuffer=void 0;var rr=Tn(),_t=Ms(),zT=Bs(),Fs=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return _t.int32[0]=this.readInt32(e),_t.float32[0]}readFloat64(e){return _t.int32[_t.isLittleEndian?0:1]=this.readInt32(e),_t.int32[_t.isLittleEndian?1:0]=this.readInt32(e+4),_t.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){_t.float32[0]=r,this.writeInt32(e,_t.int32[0])}writeFloat64(e,r){_t.float64[0]=r,this.writeInt32(e,_t.int32[_t.isLittleEndian?0:1]),this.writeInt32(e+4,_t.int32[_t.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+rr.SIZEOF_INT+rr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<rr.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+rr.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=rr.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===zT.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+rr.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=rr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+rr.FILE_IDENTIFIER_LENGTH);for(let r=0;r<rr.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+rr.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};gi.ByteBuffer=Fs});var Qp=ne(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.Builder=void 0;var Yp=Vs(),At=Tn(),Gs=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=Yp.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=Yp.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep(At.SIZEOF_INT,0),this.writeInt32(this.offset()-e+At.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*At.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let l=At.SIZEOF_SHORT;l<i;l+=At.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?At.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,At.SIZEOF_INT+At.FILE_IDENTIFIER_LENGTH+o),i.length!=At.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+At.FILE_IDENTIFIER_LENGTH);for(let a=At.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,At.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep(At.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};bi.Builder=Gs});var Le=ne(qe=>{"use strict";Object.defineProperty(qe,"__esModule",{value:!0});qe.ByteBuffer=qe.Builder=qe.Encoding=qe.isLittleEndian=qe.float64=qe.float32=qe.int32=qe.SIZE_PREFIX_LENGTH=qe.FILE_IDENTIFIER_LENGTH=qe.SIZEOF_INT=qe.SIZEOF_SHORT=void 0;var MT=Tn();Object.defineProperty(qe,"SIZEOF_SHORT",{enumerable:!0,get:function(){return MT.SIZEOF_SHORT}});var BT=Tn();Object.defineProperty(qe,"SIZEOF_INT",{enumerable:!0,get:function(){return BT.SIZEOF_INT}});var FT=Tn();Object.defineProperty(qe,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return FT.FILE_IDENTIFIER_LENGTH}});var VT=Tn();Object.defineProperty(qe,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return VT.SIZE_PREFIX_LENGTH}});var yi=Ms();Object.defineProperty(qe,"int32",{enumerable:!0,get:function(){return yi.int32}});Object.defineProperty(qe,"float32",{enumerable:!0,get:function(){return yi.float32}});Object.defineProperty(qe,"float64",{enumerable:!0,get:function(){return yi.float64}});Object.defineProperty(qe,"isLittleEndian",{enumerable:!0,get:function(){return yi.isLittleEndian}});var GT=Bs();Object.defineProperty(qe,"Encoding",{enumerable:!0,get:function(){return GT.Encoding}});var UT=Qp();Object.defineProperty(qe,"Builder",{enumerable:!0,get:function(){return UT.Builder}});var WT=Vs();Object.defineProperty(qe,"ByteBuffer",{enumerable:!0,get:function(){return WT.ByteBuffer}})});var Ws=ne(nr=>{"use strict";var HT=nr&&nr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qT=nr&&nr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),jT=nr&&nr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&HT(e,n,r);return qT(e,n),e};Object.defineProperty(nr,"__esModule",{value:!0});nr.ArgTypeAndIndex=void 0;var KT=jT(Le()),ef=zs(),Us=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+KT.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):ef.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,ef.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};nr.ArgTypeAndIndex=Us});var Hs=ne(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.AttributeType=void 0;var tf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(tf||(_i.AttributeType=tf={}))});var qs=ne(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.NodeType=void 0;var rf;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(rf||(vi.NodeType=rf={}))});var Ks=ne(or=>{"use strict";var XT=or&&or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),ZT=or&&or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),JT=or&&or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&XT(e,n,r);return ZT(e,n),e};Object.defineProperty(or,"__esModule",{value:!0});or.Node=void 0;var YT=JT(Le()),QT=Xs(),nf=qs(),js=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+YT.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):nf.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new QT.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,nf.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,l,p,c,f,b,g){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,l),n.addInputs(e,p),n.addOutputs(e,c),n.addAttributes(e,f),n.addInputArgCounts(e,b),n.addImplicitInputs(e,g),n.endNode(e)}};or.Node=js});var Js=ne(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.EdgeEnd=void 0;var Zs=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};xi.EdgeEnd=Zs});var Qs=ne(ir=>{"use strict";var e2=ir&&ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),t2=ir&&ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),r2=ir&&ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&e2(e,n,r);return t2(e,n),e};Object.defineProperty(ir,"__esModule",{value:!0});ir.NodeEdge=void 0;var n2=r2(Le()),of=Js(),Ys=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+n2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new of.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new of.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};ir.NodeEdge=Ys});var tu=ne(ar=>{"use strict";var o2=ar&&ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),i2=ar&&ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),a2=ar&&ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&o2(e,n,r);return i2(e,n),e};Object.defineProperty(ar,"__esModule",{value:!0});ar.NodesToOptimizeIndices=void 0;var s2=a2(Le()),eu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+s2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};ar.NodesToOptimizeIndices=eu});var nu=ne(sr=>{"use strict";var u2=sr&&sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),l2=sr&&sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),c2=sr&&sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&u2(e,n,r);return l2(e,n),e};Object.defineProperty(sr,"__esModule",{value:!0});sr.RuntimeOptimizationRecord=void 0;var d2=c2(Le()),p2=tu(),ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+d2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new p2.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};sr.RuntimeOptimizationRecord=ru});var iu=ne(ur=>{"use strict";var f2=ur&&ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),h2=ur&&ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),m2=ur&&ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&f2(e,n,r);return h2(e,n),e};Object.defineProperty(ur,"__esModule",{value:!0});ur.RuntimeOptimizationRecordContainerEntry=void 0;var g2=m2(Le()),b2=nu(),ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+g2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new b2.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};ur.RuntimeOptimizationRecordContainerEntry=ou});var su=ne(lr=>{"use strict";var y2=lr&&lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_2=lr&&lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),v2=lr&&lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&y2(e,n,r);return _2(e,n),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.RuntimeOptimizations=void 0;var x2=v2(Le()),w2=iu(),au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+x2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new w2.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};lr.RuntimeOptimizations=au});var mo=ne(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.TensorDataType=void 0;var af;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(af||(wi.TensorDataType=af={}))});var go=ne(cr=>{"use strict";var T2=cr&&cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),I2=cr&&cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),S2=cr&&cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&T2(e,n,r);return I2(e,n),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.Tensor=void 0;var $2=S2(Le()),sf=mo(),uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+$2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):sf.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,sf.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};cr.Tensor=uu});var cu=ne(dr=>{"use strict";var A2=dr&&dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),O2=dr&&dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),P2=dr&&dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&A2(e,n,r);return O2(e,n),e};Object.defineProperty(dr,"__esModule",{value:!0});dr.SparseTensor=void 0;var E2=P2(Le()),uf=go(),lu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+E2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new uf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new uf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};dr.SparseTensor=lu});var pu=ne(pr=>{"use strict";var C2=pr&&pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),D2=pr&&pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),k2=pr&&pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&C2(e,n,r);return D2(e,n),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.MapType=void 0;var N2=k2(Le()),lf=mo(),L2=bo(),du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+N2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):lf.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new L2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,lf.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};pr.MapType=du});var hu=ne(fr=>{"use strict";var R2=fr&&fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),z2=fr&&fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),M2=fr&&fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&R2(e,n,r);return z2(e,n),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.SequenceType=void 0;var B2=M2(Le()),F2=bo(),fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+B2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new F2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};fr.SequenceType=fu});var mu=ne(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.DimensionValueType=void 0;var cf;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(cf||(Ti.DimensionValueType=cf={}))});var bu=ne(hr=>{"use strict";var V2=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),G2=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),U2=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&V2(e,n,r);return G2(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.DimensionValue=void 0;var W2=U2(Le()),df=mu(),gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+W2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):df.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,df.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};hr.DimensionValue=gu});var _u=ne(mr=>{"use strict";var H2=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),q2=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),j2=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&H2(e,n,r);return q2(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.Dimension=void 0;var K2=j2(Le()),X2=bu(),yu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+K2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new X2.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};mr.Dimension=yu});var xu=ne(gr=>{"use strict";var Z2=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),J2=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),Y2=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&Z2(e,n,r);return J2(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.Shape=void 0;var Q2=Y2(Le()),e1=_u(),vu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+Q2.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new e1.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};gr.Shape=vu});var Tu=ne(br=>{"use strict";var t1=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),r1=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),n1=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&t1(e,n,r);return r1(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.TensorTypeAndShape=void 0;var o1=n1(Le()),i1=xu(),pf=mo(),wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+o1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):pf.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new i1.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,pf.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};br.TensorTypeAndShape=wu});var Iu=ne(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.unionListToTypeInfoValue=an.unionToTypeInfoValue=an.TypeInfoValue=void 0;var ff=pu(),hf=hu(),mf=Tu(),Ii;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})(Ii||(an.TypeInfoValue=Ii={}));function a1(n,e){switch(Ii[n]){case"NONE":return null;case"tensor_type":return e(new mf.TensorTypeAndShape);case"sequence_type":return e(new hf.SequenceType);case"map_type":return e(new ff.MapType);default:return null}}an.unionToTypeInfoValue=a1;function s1(n,e,r){switch(Ii[n]){case"NONE":return null;case"tensor_type":return e(r,new mf.TensorTypeAndShape);case"sequence_type":return e(r,new hf.SequenceType);case"map_type":return e(r,new ff.MapType);default:return null}}an.unionListToTypeInfoValue=s1});var bo=ne(yr=>{"use strict";var u1=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),l1=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),c1=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&u1(e,n,r);return l1(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.TypeInfo=void 0;var d1=c1(Le()),gf=Iu(),Su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+d1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):gf.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,gf.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};yr.TypeInfo=Su});var Au=ne(_r=>{"use strict";var p1=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),f1=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),h1=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&p1(e,n,r);return f1(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.ValueInfo=void 0;var m1=h1(Le()),g1=bo(),$u=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+m1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new g1.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};_r.ValueInfo=$u});var Si=ne(vr=>{"use strict";var b1=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),y1=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),_1=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&b1(e,n,r);return y1(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.Graph=void 0;var v1=_1(Le()),x1=Ks(),w1=Qs(),T1=su(),I1=cu(),S1=go(),$1=Au(),Ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+v1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new S1.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new $1.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new x1.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new w1.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new I1.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new T1.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};vr.Graph=Ou});var Xs=ne(xr=>{"use strict";var A1=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),O1=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),P1=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&A1(e,n,r);return O1(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.Attribute=void 0;var E1=P1(Le()),bf=Hs(),yf=Si(),_f=go(),Pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+E1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):bf.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new _f.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new yf.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new _f.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new yf.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,bf.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};xr.Attribute=Pu});var Cu=ne(wr=>{"use strict";var C1=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),D1=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),k1=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&C1(e,n,r);return D1(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.DeprecatedKernelCreateInfos=void 0;var N1=k1(Le()),Eu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+N1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};wr.DeprecatedKernelCreateInfos=Eu});var vf=ne(Tr=>{"use strict";var L1=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),R1=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),z1=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&L1(e,n,r);return R1(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.DeprecatedNodeIndexAndKernelDefHash=void 0;var M1=z1(Le()),Du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+M1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};Tr.DeprecatedNodeIndexAndKernelDefHash=Du});var Nu=ne(Ir=>{"use strict";var B1=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),F1=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),V1=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&B1(e,n,r);return F1(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.DeprecatedSubGraphSessionState=void 0;var G1=V1(Le()),U1=Lu(),ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+G1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new U1.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};Ir.DeprecatedSubGraphSessionState=ku});var Lu=ne(Sr=>{"use strict";var W1=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),H1=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),q1=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&W1(e,n,r);return H1(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.DeprecatedSessionState=void 0;var j1=q1(Le()),K1=Cu(),X1=Nu(),Ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+j1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new K1.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new X1.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};Sr.DeprecatedSessionState=Ru});var Mu=ne($r=>{"use strict";var Z1=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),J1=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),Y1=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&Z1(e,n,r);return J1(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.KernelTypeStrArgsEntry=void 0;var Q1=Y1(Le()),eI=Ws(),zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+Q1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new eI.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};$r.KernelTypeStrArgsEntry=zu});var Fu=ne(Ar=>{"use strict";var tI=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),rI=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),nI=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&tI(e,n,r);return rI(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.OpIdKernelTypeStrArgsEntry=void 0;var oI=nI(Le()),iI=Mu(),Bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+oI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new iI.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Ar.OpIdKernelTypeStrArgsEntry=Bu});var Gu=ne(Or=>{"use strict";var aI=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),sI=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),uI=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&aI(e,n,r);return sI(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.KernelTypeStrResolver=void 0;var lI=uI(Le()),cI=Fu(),Vu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+lI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new cI.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};Or.KernelTypeStrResolver=Vu});var Wu=ne(Pr=>{"use strict";var dI=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),pI=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),fI=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&dI(e,n,r);return pI(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.OperatorSetId=void 0;var hI=fI(Le()),Uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+hI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Pr.OperatorSetId=Uu});var qu=ne(Er=>{"use strict";var mI=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),gI=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),bI=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&mI(e,n,r);return gI(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.StringStringEntry=void 0;var yI=bI(Le()),Hu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+yI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Er.StringStringEntry=Hu});var Ku=ne(Cr=>{"use strict";var _I=Cr&&Cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),vI=Cr&&Cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),xI=Cr&&Cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&_I(e,n,r);return vI(e,n),e};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.Model=void 0;var wI=xI(Le()),TI=Si(),II=Wu(),SI=qu(),ju=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+wI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new II.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new TI.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new SI.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Cr.Model=ju});var xf=ne(Dr=>{"use strict";var $I=Dr&&Dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),AI=Dr&&Dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),OI=Dr&&Dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&$I(e,n,r);return AI(e,n),e};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.InferenceSession=void 0;var PI=OI(Le()),EI=Gu(),CI=Ku(),Xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+PI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new CI.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new EI.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};Dr.InferenceSession=Xu});var DI,kI,$i,Nt,NI,LI,RI,zI,MI,BI,FI,VI,Zu,Ju,GI,UI,WI,HI,Yu,qI,jI,KI,XI,ZI,JI,YI,QI,eS,tS,rS,nS,oS,yo,Qu,iS,el,aS,wf=D(()=>{"use strict";DI=ye(zs()),kI=ye(Ws()),$i=ye(Xs()),Nt=ye(Hs()),NI=ye(Cu()),LI=ye(vf()),RI=ye(Lu()),zI=ye(Nu()),MI=ye(_u()),BI=ye(bu()),FI=ye(mu()),VI=ye(Js()),Zu=ye(Si()),Ju=ye(xf()),GI=ye(Mu()),UI=ye(Gu()),WI=ye(pu()),HI=ye(Ku()),Yu=ye(Ks()),qI=ye(Qs()),jI=ye(qs()),KI=ye(tu()),XI=ye(Fu()),ZI=ye(Wu()),JI=ye(nu()),YI=ye(iu()),QI=ye(su()),eS=ye(hu()),tS=ye(xu()),rS=ye(cu()),nS=ye(qu()),oS=ye(go()),yo=ye(mo()),Qu=ye(Tu()),iS=ye(bo()),el=ye(Iu()),aS=ye(Au())});var _o=D(()=>{"use strict";wf()});var If=ne((ND,Tf)=>{"use strict";Tf.exports=sS;function sS(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(p){if(i)if(i=!1,p)u(p);else{for(var c=new Array(arguments.length-1),f=0;f<c.length;)c[f++]=arguments[f];s.apply(null,c)}};try{n.apply(e||null,r)}catch(l){i&&(i=!1,u(l))}})}});var Of=ne(Af=>{"use strict";var Oi=Af;Oi.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Xn=new Array(64),$f=new Array(123);for(Ut=0;Ut<64;)$f[Xn[Ut]=Ut<26?Ut+65:Ut<52?Ut+71:Ut<62?Ut-4:Ut-59|43]=Ut++;var Ut;Oi.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var l=e[r++];switch(s){case 0:i[a++]=Xn[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=Xn[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=Xn[u|l>>6],i[a++]=Xn[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Xn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Sf="invalid encoding";Oi.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=$f[u])===void 0)throw Error(Sf);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Sf);return t-o};Oi.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Ef=ne((RD,Pf)=>{"use strict";Pf.exports=Pi;function Pi(){this._listeners={}}Pi.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};Pi.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};Pi.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var zf=ne((zD,Rf)=>{"use strict";Rf.exports=Cf(Cf);function Cf(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,l,p){e[0]=u,l[p]=r[0],l[p+1]=r[1],l[p+2]=r[2],l[p+3]=r[3]}function i(u,l,p){e[0]=u,l[p]=r[3],l[p+1]=r[2],l[p+2]=r[1],l[p+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],e[0]}function s(u,l){return r[3]=u[l],r[2]=u[l+1],r[1]=u[l+2],r[0]=u[l+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}n.writeFloatLE=e.bind(null,Df),n.writeFloatBE=e.bind(null,kf);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}n.readFloatLE=r.bind(null,Nf),n.readFloatBE=r.bind(null,Lf)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,l,p){e[0]=u,l[p]=r[0],l[p+1]=r[1],l[p+2]=r[2],l[p+3]=r[3],l[p+4]=r[4],l[p+5]=r[5],l[p+6]=r[6],l[p+7]=r[7]}function i(u,l,p){e[0]=u,l[p]=r[7],l[p+1]=r[6],l[p+2]=r[5],l[p+3]=r[4],l[p+4]=r[3],l[p+5]=r[2],l[p+6]=r[1],l[p+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],r[4]=u[l+4],r[5]=u[l+5],r[6]=u[l+6],r[7]=u[l+7],e[0]}function s(u,l){return r[7]=u[l],r[6]=u[l+1],r[5]=u[l+2],r[4]=u[l+3],r[3]=u[l+4],r[2]=u[l+5],r[1]=u[l+6],r[0]=u[l+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var p;if(a<22250738585072014e-324)p=a/5e-324,t(p>>>0,s,u+o),t((l<<31|p/4294967296)>>>0,s,u+i);else{var c=Math.floor(Math.log(a)/Math.LN2);c===1024&&(c=1023),p=a*Math.pow(2,-c),t(p*4503599627370496>>>0,s,u+o),t((l<<31|c+1023<<20|p*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,Df,0,4),n.writeDoubleBE=e.bind(null,kf,4,0);function r(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),p=(l>>31)*2+1,c=l>>>20&2047,f=4294967296*(l&1048575)+u;return c===2047?f?NaN:p*(1/0):c===0?p*5e-324*f:p*Math.pow(2,c-1075)*(f+4503599627370496)}n.readDoubleLE=r.bind(null,Nf,0,4),n.readDoubleBE=r.bind(null,Lf,4,0)}(),n}function Df(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function kf(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Nf(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function Lf(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Mf=ne((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var Ff=ne(Bf=>{"use strict";var tl=Bf;tl.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};tl.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};tl.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Gf=ne((BD,Vf)=>{"use strict";Vf.exports=uS;function uS(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var Wf=ne((FD,Uf)=>{"use strict";Uf.exports=ut;var vo=un();function ut(n,e){this.lo=n>>>0,this.hi=e>>>0}var In=ut.zero=new ut(0,0);In.toNumber=function(){return 0};In.zzEncode=In.zzDecode=function(){return this};In.length=function(){return 1};var lS=ut.zeroHash="\0\0\0\0\0\0\0\0";ut.fromNumber=function(e){if(e===0)return In;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new ut(t,o)};ut.from=function(e){if(typeof e=="number")return ut.fromNumber(e);if(vo.isString(e))if(vo.Long)e=vo.Long.fromString(e);else return ut.fromNumber(parseInt(e,10));return e.low||e.high?new ut(e.low>>>0,e.high>>>0):In};ut.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};ut.prototype.toLong=function(e){return vo.Long?new vo.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var sn=String.prototype.charCodeAt;ut.fromHash=function(e){return e===lS?In:new ut((sn.call(e,0)|sn.call(e,1)<<8|sn.call(e,2)<<16|sn.call(e,3)<<24)>>>0,(sn.call(e,4)|sn.call(e,5)<<8|sn.call(e,6)<<16|sn.call(e,7)<<24)>>>0)};ut.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};ut.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};ut.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};ut.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var un=ne(rl=>{"use strict";var ae=rl;ae.asPromise=If();ae.base64=Of();ae.EventEmitter=Ef();ae.float=zf();ae.inquire=Mf();ae.utf8=Ff();ae.pool=Gf();ae.LongBits=Wf();ae.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ae.global=ae.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||rl;ae.emptyArray=Object.freeze?Object.freeze([]):[];ae.emptyObject=Object.freeze?Object.freeze({}):{};ae.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ae.isString=function(e){return typeof e=="string"||e instanceof String};ae.isObject=function(e){return e&&typeof e=="object"};ae.isset=ae.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ae.Buffer=function(){try{var n=ae.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();ae._Buffer_from=null;ae._Buffer_allocUnsafe=null;ae.newBuffer=function(e){return typeof e=="number"?ae.Buffer?ae._Buffer_allocUnsafe(e):new ae.Array(e):ae.Buffer?ae._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ae.Array=typeof Uint8Array<"u"?Uint8Array:Array;ae.Long=ae.global.dcodeIO&&ae.global.dcodeIO.Long||ae.global.Long||ae.inquire("long");ae.key2Re=/^true|false|0|1$/;ae.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ae.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ae.longToHash=function(e){return e?ae.LongBits.from(e).toHash():ae.LongBits.zeroHash};ae.longFromHash=function(e,r){var t=ae.LongBits.fromHash(e);return ae.Long?ae.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Hf(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}ae.merge=Hf;ae.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function qf(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Hf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ae.newError=qf;ae.ProtocolError=qf("ProtocolError");ae.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ae.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};ae.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ae._configure=function(){var n=ae.Buffer;if(!n){ae._Buffer_from=ae._Buffer_allocUnsafe=null;return}ae._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},ae._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var ll=ne((GD,Zf)=>{"use strict";Zf.exports=Pe;var Lt=un(),nl,Ei=Lt.LongBits,jf=Lt.base64,Kf=Lt.utf8;function xo(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function il(){}function cS(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function Pe(){this.len=0,this.head=new xo(il,0,0),this.tail=this.head,this.states=null}var Xf=function(){return Lt.Buffer?function(){return(Pe.create=function(){return new nl})()}:function(){return new Pe}};Pe.create=Xf();Pe.alloc=function(e){return new Lt.Array(e)};Lt.Array!==Array&&(Pe.alloc=Lt.pool(Pe.alloc,Lt.Array.prototype.subarray));Pe.prototype._push=function(e,r,t){return this.tail=this.tail.next=new xo(e,r,t),this.len+=r,this};function al(n,e,r){e[r]=n&255}function dS(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function sl(n,e){this.len=n,this.next=void 0,this.val=e}sl.prototype=Object.create(xo.prototype);sl.prototype.fn=dS;Pe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new sl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Pe.prototype.int32=function(e){return e<0?this._push(ul,10,Ei.fromNumber(e)):this.uint32(e)};Pe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function ul(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}Pe.prototype.uint64=function(e){var r=Ei.from(e);return this._push(ul,r.length(),r)};Pe.prototype.int64=Pe.prototype.uint64;Pe.prototype.sint64=function(e){var r=Ei.from(e).zzEncode();return this._push(ul,r.length(),r)};Pe.prototype.bool=function(e){return this._push(al,1,e?1:0)};function ol(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}Pe.prototype.fixed32=function(e){return this._push(ol,4,e>>>0)};Pe.prototype.sfixed32=Pe.prototype.fixed32;Pe.prototype.fixed64=function(e){var r=Ei.from(e);return this._push(ol,4,r.lo)._push(ol,4,r.hi)};Pe.prototype.sfixed64=Pe.prototype.fixed64;Pe.prototype.float=function(e){return this._push(Lt.float.writeFloatLE,4,e)};Pe.prototype.double=function(e){return this._push(Lt.float.writeDoubleLE,8,e)};var pS=Lt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};Pe.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(al,1,0);if(Lt.isString(e)){var t=Pe.alloc(r=jf.length(e));jf.decode(e,t,0),e=t}return this.uint32(r)._push(pS,r,e)};Pe.prototype.string=function(e){var r=Kf.length(e);return r?this.uint32(r)._push(Kf.write,r,e):this._push(al,1,0)};Pe.prototype.fork=function(){return this.states=new cS(this),this.head=this.tail=new xo(il,0,0),this.len=0,this};Pe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new xo(il,0,0),this.len=0),this};Pe.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};Pe.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};Pe._configure=function(n){nl=n,Pe.create=Xf(),nl._configure()}});var Qf=ne((UD,Yf)=>{"use strict";Yf.exports=kr;var Jf=ll();(kr.prototype=Object.create(Jf.prototype)).constructor=kr;var ln=un();function kr(){Jf.call(this)}kr._configure=function(){kr.alloc=ln._Buffer_allocUnsafe,kr.writeBytesBuffer=ln.Buffer&&ln.Buffer.prototype instanceof Uint8Array&&ln.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};kr.prototype.bytes=function(e){ln.isString(e)&&(e=ln._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(kr.writeBytesBuffer,r,e),this};function fS(n,e,r){n.length<40?ln.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}kr.prototype.string=function(e){var r=ln.Buffer.byteLength(e);return this.uint32(r),r&&this._push(fS,r,e),this};kr._configure()});var pl=ne((WD,oh)=>{"use strict";oh.exports=Qe;var Wt=un(),dl,rh=Wt.LongBits,hS=Wt.utf8;function Ht(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function Qe(n){this.buf=n,this.pos=0,this.len=n.length}var eh=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Qe(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Qe(e);throw Error("illegal buffer")},nh=function(){return Wt.Buffer?function(r){return(Qe.create=function(o){return Wt.Buffer.isBuffer(o)?new dl(o):eh(o)})(r)}:eh};Qe.create=nh();Qe.prototype._slice=Wt.Array.prototype.subarray||Wt.Array.prototype.slice;Qe.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Ht(this,10);return e}}();Qe.prototype.int32=function(){return this.uint32()|0};Qe.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function cl(){var n=new rh(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Ht(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw Ht(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}Qe.prototype.bool=function(){return this.uint32()!==0};function Ci(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}Qe.prototype.fixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return Ci(this.buf,this.pos+=4)};Qe.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return Ci(this.buf,this.pos+=4)|0};function th(){if(this.pos+8>this.len)throw Ht(this,8);return new rh(Ci(this.buf,this.pos+=4),Ci(this.buf,this.pos+=4))}Qe.prototype.float=function(){if(this.pos+4>this.len)throw Ht(this,4);var e=Wt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Qe.prototype.double=function(){if(this.pos+8>this.len)throw Ht(this,4);var e=Wt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Qe.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw Ht(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=Wt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};Qe.prototype.string=function(){var e=this.bytes();return hS.read(e,0,e.length)};Qe.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Ht(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Ht(this);while(this.buf[this.pos++]&128);return this};Qe.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};Qe._configure=function(n){dl=n,Qe.create=nh(),dl._configure();var e=Wt.Long?"toLong":"toNumber";Wt.merge(Qe.prototype,{int64:function(){return cl.call(this)[e](!1)},uint64:function(){return cl.call(this)[e](!0)},sint64:function(){return cl.call(this).zzDecode()[e](!1)},fixed64:function(){return th.call(this)[e](!0)},sfixed64:function(){return th.call(this)[e](!1)}})}});var uh=ne((HD,sh)=>{"use strict";sh.exports=Sn;var ah=pl();(Sn.prototype=Object.create(ah.prototype)).constructor=Sn;var ih=un();function Sn(n){ah.call(this,n)}Sn._configure=function(){ih.Buffer&&(Sn.prototype._slice=ih.Buffer.prototype.slice)};Sn.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Sn._configure()});var ch=ne((qD,lh)=>{"use strict";lh.exports=wo;var fl=un();(wo.prototype=Object.create(fl.EventEmitter.prototype)).constructor=wo;function wo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");fl.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}wo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return fl.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(p){return a.emit("error",p,e),i(p)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};wo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var ph=ne(dh=>{"use strict";var mS=dh;mS.Service=ch()});var hh=ne((KD,fh)=>{"use strict";fh.exports={}});var bh=ne(gh=>{"use strict";var vt=gh;vt.build="minimal";vt.Writer=ll();vt.BufferWriter=Qf();vt.Reader=pl();vt.BufferReader=uh();vt.util=un();vt.rpc=ph();vt.roots=hh();vt.configure=mh;function mh(){vt.util._configure(),vt.Writer._configure(vt.BufferWriter),vt.Reader._configure(vt.BufferReader)}mh()});var _h=ne((ZD,yh)=>{"use strict";yh.exports=bh()});var Zn=ne((JD,vh)=>{"use strict";var Ue=_h(),q=Ue.Reader,et=Ue.Writer,A=Ue.util,S=Ue.roots.default||(Ue.roots.default={});S.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.s=A.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=A.emptyArray,e.prototype.ints=A.emptyArray,e.prototype.strings=A.emptyArray,e.prototype.tensors=A.emptyArray,e.prototype.graphs=A.emptyArray,e.prototype.sparseTensors=A.emptyArray,e.prototype.typeProtos=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!A.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!A.isInteger(t.i)&&!(t.i&&A.isInteger(t.i.low)&&A.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||A.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!A.isInteger(t.ints[i])&&!(t.ints[i]&&A.isInteger(t.ints[i].low)&&A.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||A.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(A.Long?(o.i=A.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?A.base64.decode(t.s,o.s=A.newBuffer(A.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)A.Long?(o.ints[i]=A.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new A.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?A.base64.decode(t.strings[i],o.strings[i]=A.newBuffer(A.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,A.Long){var a=new A.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=A.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?A.Long.prototype.toString.call(t.i):o.longs===Number?new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?A.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?A.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new A.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?A.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=S.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=S.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=S.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=A.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!A.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=S.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=A.emptyArray,e.prototype.updateBinding=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=A.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=A.emptyArray,e.prototype.trainingInfo=A.emptyArray,e.prototype.functions=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!A.isInteger(t.irVersion)&&!(t.irVersion&&A.isInteger(t.irVersion.low)&&A.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!A.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!A.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!A.isInteger(t.modelVersion)&&!(t.modelVersion&&A.isInteger(t.modelVersion.low)&&A.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(A.Long?(o.irVersion=A.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(A.Long?(o.modelVersion=A.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(A.Long){var a=new A.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",A.Long){var a=new A.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?A.Long.prototype.toString.call(t.irVersion):o.longs===Number?new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?A.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=S.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!A.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!A.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!A.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=A.emptyArray,e.prototype.name="",e.prototype.initializer=A.emptyArray,e.prototype.sparseInitializer=A.emptyArray,e.prototype.docString="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.valueInfo=A.emptyArray,e.prototype.quantizationAnnotation=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=S.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=S.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=S.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=S.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=A.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=A.emptyArray,e.prototype.int32Data=A.emptyArray,e.prototype.stringData=A.emptyArray,e.prototype.int64Data=A.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=A.newBuffer([]),e.prototype.externalData=A.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=A.emptyArray,e.prototype.uint64Data=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!A.isInteger(t.dims[o])&&!(t.dims[o]&&A.isInteger(t.dims[o].low)&&A.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!A.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!A.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||A.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!A.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&A.isInteger(t.int64Data[o].low)&&A.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||A.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!A.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&A.isInteger(t.uint64Data[o].low)&&A.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?A.base64.decode(t.stringData[i],o.stringData[i]=A.newBuffer(A.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)A.Long?(o.int64Data[i]=A.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new A.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?A.base64.decode(t.rawData,o.rawData=A.newBuffer(A.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)A.Long?(o.uint64Data[i]=A.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new A.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=A.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?A.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new A.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?A.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?A.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new A.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?A.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?A.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new A.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=S.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=A.Long?A.Long.fromBits(0,0,!1):0,r.prototype.end=A.Long?A.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=et.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof q||(o=q.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof q||(o=new q(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!A.isInteger(o.begin)&&!(o.begin&&A.isInteger(o.begin.low)&&A.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!A.isInteger(o.end)&&!(o.end&&A.isInteger(o.end.low)&&A.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(A.Long?(i.begin=A.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(A.Long?(i.end=A.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(A.Long){var s=new A.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(A.Long){var s=new A.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?A.Long.prototype.toString.call(o.begin):i.longs===Number?new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?A.Long.prototype.toString.call(o.end):i.longs===Number?new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!A.isInteger(t.dims[i])&&!(t.dims[i]&&A.isInteger(t.dims[i].low)&&A.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?A.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new A.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:A.oneOfGetter(t=["dimValue","dimParam"]),set:A.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=et.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},r.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!A.isInteger(i.dimValue)&&!(i.dimValue&&A.isInteger(i.dimValue.low)&&A.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!A.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!A.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var a=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(A.Long?(a.dimValue=A.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?A.Long.prototype.toString.call(i.dimValue):a.longs===Number?new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:A.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:A.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=et.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof q||(o=q.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof q||(o=new q(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!A.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var a=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var a=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!A.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=S.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var a=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=S.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var a=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof q||(i=q.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var a=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=A.Long?A.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!A.isInteger(t.version)&&!(t.version&&A.isInteger(t.version.low)&&A.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(A.Long?(o.version=A.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",A.Long){var a=new A.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?A.Long.prototype.toString.call(t.version):o.longs===Number?new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.attribute=A.emptyArray,e.prototype.attributeProto=A.emptyArray,e.prototype.node=A.emptyArray,e.prototype.docString="",e.prototype.opsetImport=A.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!A.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=S.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();vh.exports=S});function Jn(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Io(n){return new TextDecoder().decode(n)}var We,$n,hl,mt,Di,dt,xt,te,To,An,On,Pn,Re=D(()=>{"use strict";Rs();We=ye(Zn());En();$n=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},hl=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},mt=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=hl.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],p=i-u<0?1:r[i-u];if(l!==p&&l>1&&p>1)return;s[a-u]=Math.max(l,p)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!te.areEqual(a,e.dims))return;let s=te.size(a),u=o?e:new rt(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let l=new Array(a.length),p=new Array(e.dims.length),c=new Array(r.dims.length),f=0,b=0,g=!1,m=!1;e.dims.length===0&&(f=e.get([]),g=!0),r.dims.length===0&&(b=r.get([]),m=!0);let w;for(let x=0;x<s;x++){w=x;for(let v=a.length-1;v>=0;v--)l[v]=w%a[v],w=Math.floor(w/a[v]);g||(n.fillIndex(l,e.dims,p),f=e.get(p)),m||(n.fillIndex(l,r.dims,c),b=r.get(c)),u.set(l,t(f,b))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Di=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!mt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},dt=class n{static tensorDataTypeFromProto(e){switch(e){case We.onnx.TensorProto.DataType.INT8:return"int8";case We.onnx.TensorProto.DataType.UINT8:return"uint8";case We.onnx.TensorProto.DataType.BOOL:return"bool";case We.onnx.TensorProto.DataType.INT16:return"int16";case We.onnx.TensorProto.DataType.UINT16:return"uint16";case We.onnx.TensorProto.DataType.INT32:return"int32";case We.onnx.TensorProto.DataType.UINT32:return"uint32";case We.onnx.TensorProto.DataType.FLOAT:return"float32";case We.onnx.TensorProto.DataType.DOUBLE:return"float64";case We.onnx.TensorProto.DataType.STRING:return"string";case We.onnx.TensorProto.DataType.INT64:return"int32";case We.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${We.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return We.onnx.TensorProto.DataType.INT8;case"uint8":return We.onnx.TensorProto.DataType.UINT8;case"bool":return We.onnx.TensorProto.DataType.BOOL;case"int16":return We.onnx.TensorProto.DataType.INT16;case"uint16":return We.onnx.TensorProto.DataType.UINT16;case"int32":return We.onnx.TensorProto.DataType.INT32;case"uint32":return We.onnx.TensorProto.DataType.UINT32;case"float32":return We.onnx.TensorProto.DataType.FLOAT;case"float64":return We.onnx.TensorProto.DataType.DOUBLE;case"string":return We.onnx.TensorProto.DataType.STRING;case"int64":return We.onnx.TensorProto.DataType.INT64;case"uint64":return We.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>on.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(xt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},xt=class{static longToNumber(e){return on.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return on.isLong(e)||typeof e=="bigint"}},te=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},To=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},An=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[s]=c-i[a],Math.floor((e+c-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},On=-34028234663852886e22,Pn=34028234663852886e22});function gS(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function xh(n){switch(n){case ve.onnx.TensorProto.DataType.UINT8:case ve.onnx.TensorProto.DataType.INT8:case ve.onnx.TensorProto.DataType.BOOL:return 1;case ve.onnx.TensorProto.DataType.UINT16:case ve.onnx.TensorProto.DataType.INT16:return 2;case ve.onnx.TensorProto.DataType.FLOAT:case ve.onnx.TensorProto.DataType.INT32:case ve.onnx.TensorProto.DataType.UINT32:return 4;case ve.onnx.TensorProto.DataType.INT64:case ve.onnx.TensorProto.DataType.DOUBLE:case ve.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ve.onnx.TensorProto.DataType[n]}`)}}function bS(n,e){return new(Ih(e))(n)}function Ih(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function ml(n,e){if(e===ve.onnx.TensorProto.DataType.INT64||e===yo.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===ve.onnx.TensorProto.DataType.UINT32||e===yo.TensorDataType.UINT32||e===ve.onnx.TensorProto.DataType.UINT64||e===yo.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ve.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function wh(n,e,r){switch(e){case ve.onnx.TensorProto.DataType.BOOL:case ve.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case ve.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case ve.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case ve.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case ve.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case ve.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case ve.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case ve.onnx.TensorProto.DataType.INT64:return ml(on.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case ve.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case ve.onnx.TensorProto.DataType.UINT64:return ml(on.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${ve.onnx.TensorProto.DataType[e]}`)}}var Th,ve,rt,En=D(()=>{"use strict";Th=ye(Bp());Rs();_o();ve=ye(Zn());Re();rt=class n{constructor(e,r,t,o,i,a=Th.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=te.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=Ih(r);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*gS(r));this.cache=bS(l,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[te.indicesToOffset(e,this.strides)]}set(e,r){this.data[te.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=te.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=dt.tensorDataTypeFromProto(e.dataType),t=dt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Io(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=xh(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let p=wh(a,e.dataType,l*s);i[l]=p}}else{let i;switch(e.dataType){case ve.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case ve.onnx.TensorProto.DataType.INT32:case ve.onnx.TensorProto.DataType.INT16:case ve.onnx.TensorProto.DataType.UINT16:case ve.onnx.TensorProto.DataType.INT8:case ve.onnx.TensorProto.DataType.UINT8:case ve.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case ve.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case ve.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case ve.onnx.TensorProto.DataType.UINT32:case ve.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];on.isLong(u)?a[s]=ml(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=dt.tensorDimsFromORTFormat(e),t=dt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=xh(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let p=wh(a,e.dataType(),l*s);i[l]=p}}return o}}});function le(n){return n===1?yS:_S}function Sh(n){let e=le(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function $h(n){let e=le(n);return`${e.version}
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

    `}function Ah(n,e){let r=le(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var yS,_S,je=D(()=>{"use strict";yS={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},_S={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Se=D(()=>{"use strict"});async function gl(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function ki(n){return Jn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function Oh(n){return Jn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function Yn(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function Qn(n,e){return e.map(r=>n[r]).join(", ")}function gt(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function qt(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Nr=D(()=>{"use strict";Re()});function vS(n,e){return qt(e).map(r=>`${n}.${r}`)}function eo(n,e){return e===1?[n]:vS(n,e)}function Lr(){return`
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
  `}var Cn=D(()=>{"use strict";Nr()});function wS(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function TS(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
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
    `}var Ph,xS,Eh,Ch=D(()=>{"use strict";je();Se();Nr();Cn();Ph={name:"pack",inputNames:["A"],inputTypes:[1]},xS=(n,e)=>{let r=le(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=gt(i),s=eo("rc",i),u=IS(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let p=wS(i,l,s),c=TS(t,s),f=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${p}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${c});
          }
        }
      `;return{...Ph,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:f}},Eh=(n,e)=>({...Ph,get:()=>xS(n,e)})});function bl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function kh(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function AS(n){let e=te.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function OS(n){let e=te.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var SS,$S,Dh,Nh=D(()=>{"use strict";Re();je();Se();Cn();SS=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),$S=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let p="";switch(l){case 0:p="outputCoords = rc;";break;case 1:p="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:p="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:p="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${p}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=le(n.session.backend.glContext.version),u=`
      ${AS(o)}
      ${OS(i)}
      ${Lr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Dh=(n,e,r)=>{let t=SS(r);return{...t,get:()=>$S(n,e,t,r)}}});var yl,Lh=D(()=>{"use strict";je();Se();yl=(n,e)=>{let r=e.shape,t=le(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function ES(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Rh,PS,zh,Mh=D(()=>{"use strict";je();Se();Nr();Cn();Rh={name:"unpack",inputNames:["A"],inputTypes:[2]},PS=(n,e)=>{let r=e.dims.length,t=eo("rc",r),o=t.slice(-2),i=gt(r),a=Lr(),u=e.dims.length===0?"":ES(r,t),l=r<=1?"rc":`vec2(${o.join(",")})`,p=le(n.session.backend.glContext.version),c=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${p.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Rh,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},zh=(n,e)=>({...Rh,get:()=>PS(n,e)})});var Ni,So,Li,$o=D(()=>{"use strict";Et();Ni=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(ze.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(ze.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},So=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(ze.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Li=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Ao,Bh,_l,Fh=D(()=>{"use strict";Re();Se();Ao=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return _l(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},Bh=(n,e,r)=>{let t=Ao(n,e,r);return[t.width,t.height]},_l=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:l,strides:te.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var DS,Ri,Gh=D(()=>{"use strict";Et();En();Re();Ch();Nh();Lh();Mh();$o();Fh();Se();DS=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Ri=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return Bh(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(r[l],e.inputTypes[l]);let o=DS(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Ao(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Ao(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=Ao(this.session.layoutStrategy,u,r),p=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let c=s[0],f=s[1]*s[2]*s[3],b=Math.ceil(f*1/4)*4,g=c*b;p=new Float32Array(g);for(let m=0;m<c;++m){let w=m*f,x=m*b+m%1*f;p.set(e.numberData.subarray(w,w+f),x)}}return this.createTextureData(l,e.type,p,e,1)}}if(r===2){let i=_l(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){ze.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:te.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(kh(e.dims,r)){let l={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:te.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=bl(e.dims),i=bl(r),a=this.reshapePacked(e,o),s=this.run(Dh(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new rt(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(yl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(yl(this,e))}pack(e){return this.executeProgram(Eh(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(zh(this,e.tensor),[e.tensor])}}});var vl,_e,lt=D(()=>{"use strict";vl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},_e=n=>new vl(n)});var Uh,Wh,Hh,kS,NS,qh=D(()=>{"use strict";lt();je();Se();Uh={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Wh=(n,e,r)=>(NS(e),[n.run({...Uh,cacheHint:r.cacheKey,get:()=>kS(n,e,r)},e)]),Hh=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return _e({epsilon:e,momentum:r,spatial:t})},kS=(n,e,r)=>{let t=le(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Uh,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},NS=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var zi,Rt,Z,Oo,Mi,Kr=D(()=>{"use strict";zi=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Rt=class{constructor(e){this.context=e}},Z=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},Oo=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Mi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function RS(){let n="add_";return{body:`
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
  `,name:e,type:0}}var zt,XS,jh,Kh,Xh,Zh,Jh,Yh,Qh,em,tm,rm,nm,om,im=D(()=>{"use strict";Re();Kr();je();Se();zt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>XS(n,e,r,t)}},XS=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!te.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let p=mt.calcShape(e[0].dims,e[1].dims,!1);if(!p)throw new Error("Can't perform binary op on the given tensors");a=p;let c=a.length,f=e[0].dims.length!==0?e[0].dims.length:1,b=e[1].dims.length!==0?e[1].dims.length:1,g=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",m=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",w=le(n.session.backend.glContext.version),x=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${w.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${c}]) {
        int aindices[${f}];
        int bindices[${b}];
        ${g}
        ${m}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:x,hasMain:s}}let u=le(n.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},jh=(n,e)=>[n.run(zt(n,e,RS()),e)],Kh=(n,e)=>[n.run(zt(n,e,US(),"bool"),e)],Xh=(n,e)=>[n.run(zt(n,e,zS()),e)],Zh=(n,e)=>[n.run(zt(n,e,FS(),"bool"),e)],Jh=(n,e)=>[n.run(zt(n,e,VS(),"bool"),e)],Yh=(n,e)=>[n.run(zt(n,e,GS(),"bool"),e)],Qh=(n,e)=>[n.run(zt(n,e,MS()),e)],em=(n,e)=>[n.run(zt(n,e,WS(),"bool"),e)],tm=(n,e)=>[n.run(zt(n,e,qS()),e)],rm=(n,e)=>[n.run(zt(n,e,jS()),e)],nm=(n,e)=>[n.run(zt(n,e,BS()),e)],om=(n,e)=>[n.run(zt(n,e,HS(),"bool"),e)]});var am,sm,JS,um=D(()=>{"use strict";Re();am=(n,e,r)=>(JS(e),[n.cast(e[0],r)]),sm=n=>dt.tensorDataTypeFromProto(n.attributes.getInt("to")),JS=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var YS,QS,lm,Bi,cm=D(()=>{"use strict";je();Se();Nr();Cn();YS=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),QS=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let O=1;O<r.length;O++){let E=r[O].dims.slice();for(let N=0;N<o.length;N++)if(N===t)i[t]+=E[N];else if(o[N]!==E[N])throw new Error("non concat dimensions must match")}let a=i.length,s=eo("coords",a),u=gt(a),l=Lr(),p=r.map(O=>O.dims),c=qt(a),f=new Array(p.length-1);f[0]=p[0][t];for(let O=1;O<f.length;O++)f[O]=f[O-1]+p[O][t];let b=c[t],g=c.slice(-2),m=c.join(),w=`if (${b} < ${f[0]}) {
        return getChannel(
            getX0(${m}), vec2(${g.join()}));
        }`;for(let O=1;O<f.length;O++){let E=f[O-1];w+=`
            if (${b} < ${f[O]}  && ${b} >= ${f[O-1]}) {
              return getChannel(
                getX${O}(${Bi(c,b,E)}),
                vec2(${Bi(g,b,E)}));
            }`}let x=f.length,v=f[f.length-1];w+=`
            return getChannel(
              getX${x}(${Bi(c,b,v)}),
              vec2(${Bi(g,b,v)}));`;let I=le(n.session.backend.glContext.version),$=`
          ${l}
          float getValue(${c.map(O=>"int "+O)}) {
            ${w}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${c[a-1]};
            coords.${c[a-1]} = coords.${c[a-2]};
            coords.${c[a-2]} = lastDim;

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
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:$,hasMain:!0}},lm=(n,e,r)=>{let t=YS(e.length,r.cacheKey);return{...t,get:()=>QS(n,t,e,r.axis)}},Bi=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var dm,e$,t$,r$,pm,n$,o$,i$,fm,a$,hm=D(()=>{"use strict";lt();Se();cm();dm=(n,e,r)=>(a$(e),n.session.pack&&e[0].dims.length>1?[n.run(lm(n,e,r),e)]:[n.run(r$(n,e,r),e)]),e$=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),t$=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let b=1;b<r.length;b++){let g=r[b].dims.slice();for(let m=0;m<o.length;m++)if(m===t)i[t]+=g[m];else if(o[m]!==g[m])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let b=0;b<s.length;++b)u+=r[b].dims[t],s[b]=u;let l="";r.length<5?l=pm(s):l=n$(s);let p=o$(r.length,a),c=i$(s),f=`
        ${p}
        ${c}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:f}},r$=(n,e,r)=>{let t=e$(e.length,r.cacheKey);return{...t,get:()=>t$(n,t,e,r.axis)}},pm=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,n$=n=>pm(n),o$=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},i$=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},fm=n=>_e({axis:n.attributes.getInt("axis")}),a$=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function s$(){return Mt("abs")}function u$(){return Mt("acos")}function l$(){return Mt("asin")}function c$(){return Mt("atan")}function d$(){return Mt("ceil")}function p$(){return Mt("cos")}function f$(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function h$(){return Mt("exp")}function m$(){return Mt("floor")}function xl(n,e){let r="clip";return{body:`
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
  `,name:e,type:0}}function y$(){return Mt("log")}function _$(){let n="neg";return{body:`
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
  `,name:n,type:0}}function x$(){return Mt("sin")}function wl(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function Tl(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function w$(){return Mt("sqrt")}function T$(){return Mt("tan")}function I$(){let n="tanh";return{body:`
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
  `,name:n,type:0}}function Mt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var S$,tt,mm,gm,bm,ym,Il,_m,vm,$$,xm,wm,Tm,Im,Sm,$m,Sl,Am,Om,Pm,Em,Cm,Dm,km,Nm,Lm,Rm,zm,$l=D(()=>{"use strict";lt();Re();Kr();je();Se();S$=(n,e,r,t)=>{let o=n.session.pack?2:0,i=le(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},tt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>S$(n,i,e,r)}},mm=(n,e)=>[n.run(tt(n,e[0],s$()),e)],gm=(n,e)=>[n.run(tt(n,e[0],u$()),e)],bm=(n,e)=>[n.run(tt(n,e[0],l$()),e)],ym=(n,e)=>[n.run(tt(n,e[0],c$()),e)],Il=(n,e,r)=>[n.run(tt(n,e[0],xl(r.min,r.max),r.cacheKey),e)],_m=n=>_e({min:n.attributes.getFloat("min",On),max:n.attributes.getFloat("max",Pn)}),vm=(n,e)=>{let r=$$(n,e);return Il(n,[e[0]],r)},$$=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:On,t=e.length>=3?e[2].numberData[0]:Pn;return _e({min:r,max:t})},xm=(n,e)=>[n.run(tt(n,e[0],d$()),e)],wm=(n,e)=>[n.run(tt(n,e[0],p$()),e)],Tm=(n,e,r)=>[n.run(tt(n,e[0],f$(r.alpha),r.cacheKey),e)],Im=n=>_e({alpha:n.attributes.getFloat("alpha",1)}),Sm=(n,e)=>[n.run(tt(n,e[0],h$()),e)],$m=(n,e)=>[n.run(tt(n,e[0],m$()),e)],Sl=(n,e)=>[n.run(tt(n,e[0],g$()),e)],Am=(n,e,r)=>[n.run(tt(n,e[0],b$(r.alpha),r.cacheKey),e)],Om=n=>_e({alpha:n.attributes.getFloat("alpha",.01)}),Pm=(n,e)=>[n.run(tt(n,e[0],y$()),e)],Em=(n,e)=>[n.run(tt(n,e[0],_$()),e)],Cm=(n,e)=>[n.run(tt(n,e[0],v$()),e)],Dm=(n,e)=>[n.run(tt(n,e[0],wl()),e)],km=(n,e)=>[n.run(tt(n,e[0],Tl()),e)],Nm=(n,e)=>[n.run(tt(n,e[0],x$()),e)],Lm=(n,e)=>[n.run(tt(n,e[0],w$()),e)],Rm=(n,e)=>[n.run(tt(n,e[0],T$()),e)],zm=(n,e)=>[n.run(tt(n,e[0],I$()),e)]});function Rr(n){let e;switch(n.activation){case"Relu":e=wl();break;case"Sigmoid":e=Tl();break;case"Clip":e=xl(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var to,Dn=D(()=>{"use strict";Re();$l();to=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[On,Pn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var O$,P$,Mm,Bm=D(()=>{"use strict";Et();je();Se();Fi();Dn();O$=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),P$=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;ze.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=ro(a,s,t.dilations,t.pads,t.strides),p=le(n.session.backend.glContext.version),{activationFunction:c,applyActivation:f}=Rr(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${c}
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
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Mm=(n,e,r)=>{let t=O$(e.length>2,r.cacheKey);return{...t,get:()=>P$(n,e,t,r)}}});var E$,C$,Fm,Vm=D(()=>{"use strict";je();Se();Cn();E$=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),C$=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,l=3,p=o.length,c=[s[1]*s[2]*s[3],o[2]*o[3]],f=s[2]*s[3],b=Lr(),g=le(n.session.backend.glContext.version),m="";for(let x=0;x<=1;x++)for(let v=0;v<=1;v++)m+=`
            blockIndex = rc.x + ${v};
            pos = rc.y + ${x};

            if(blockIndex < ${c[1]} && pos < ${c[0]}) {
              offsetY = int(blockIndex / (${o[p-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${f}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[p-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${f}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${f}.);
                    innerDims = vec2(d0, d1);
                    result[${x*2+v}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let w=`
      ${b}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${m}
          ${g.output} = result;
      }
            `;return{...e,output:{dims:c,type:r.type,textureType:2},shaderSource:w,hasMain:!0}},Fm=(n,e,r,t,o)=>{let i=E$(o.cacheKey);return{...i,get:()=>C$(n,i,e,r,t,o)}}});function k$(n,e,r){let t=e[0].dims,o=e[1].dims,i=mt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=gt(i.length),s=qt(),{activationFunction:u,applyActivation:l}=Rr(r),p=e.length>2,c=p?"value += getBiasForMatmul();":"",f=p?`${Ol(a,s,e[2].dims,i,!1)}`:"",b=i.length,g=t.length,m=o.length,w=t[t.length-1],x=`
    ${u}
    ${f}
    float process(int indices[${b}]) {
        int a[${g}];
        int b[${m}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${w}; ++k) {
            a[${g-1}] = k;
            b[${m-2}] = k;
            value += _A(a) * _B(b);
        }
        ${c}
        ${l}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:x}}function Al(n,e){let r=D$(n.length>2,e.activationCacheKey);return{...r,get:()=>k$(r,n,e)}}function Ol(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((m,w)=>`coords.${e[w+u]}`).join(", ");let p=mt.getBroadcastDims(r,t).map(m=>`coords.${e[m+u]} = 0;`).join(`
`),f=te.size(r)===1,b="vec4(outputValue.xx, outputValue.yy)";return f&&(b="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${p}
  vec4 outputValue = getBias(${i});
  return ${b};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${p}
  return getBias(coords.x);
}`}var Gm,Um,D$,N$,Vi=D(()=>{"use strict";Re();Se();Nr();Dn();Pl();Gm=(n,e,r)=>(N$(e),n.session.pack?[n.run(Gi(n,e,r),e)]:[n.run(Al(e,r),e)]),Um=n=>to(n.attributes),D$=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});N$=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function z$(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,p=t.length,c=p-u,f=p-l;o=a.map((I,$)=>`coords.${e[$+c]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,$)=>`coords.${e[$+f]}`),i[l-2]="i*2",i.join(", ");let b=mt.getBroadcastDims(a,t),g=mt.getBroadcastDims(s,t),m=b.map(I=>`coords.${e[I+c]} = 0;`).join(`
`),w=g.map(I=>`coords.${e[I+f]} = 0;`).join(`
`),x=`int lastDim = coords.${e[p-1]};
  coords.${e[p-1]} = coords.${e[p-2]};
  coords.${e[p-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${x}
  ${m}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${x}
  ${w}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function M$(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function B$(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var L$,R$,Gi,Pl=D(()=>{"use strict";Re();je();Se();Nr();Dn();Vi();L$=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),R$=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=mt.calcShape(a,s,!0),l=!te.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let p=a[a.length-1],c=Math.ceil(p/2),f=a.length,b=s.length,g=le(n.session.backend.glContext.version),m=gt(u.length),w=u.length,x=qt(),{activationFunction:v,applyActivation:I}=Rr(t),$=o?`${Ol(m,x,r[2].dims,u,!0)}`:"",O=l?`${z$(m,x,r,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${M$(x,f)})`,N=l?"getBAtOutCoordsMatmul(i)":`getB(${B$(x,b)})`,R=l?"":`${m} rc =
          getOutputCoords(); int lastDim = rc.${x[w-1]}; rc.${x[w-1]} =
          rc.${x[w-2]}; rc.${x[w-2]} = lastDim;
      `,V=`
            ${O}
            ${$}
            ${v}
            void main() {
              ${R}

              vec4 value = vec4(0);
              for (int i = 0; i < ${c}; i++) {
                vec4 a = ${E};
                vec4 b = ${N};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${g.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:V,hasMain:!0}},Gi=(n,e,r)=>{let t=L$(e.length>2,r.activationCacheKey);return{...t,get:()=>R$(n,t,e,r)}}});var Wm,Hm=D(()=>{"use strict";Fi();Vm();Pl();Wm=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=ro(t,o,r.dilations,r.pads,r.strides),a=n.run(Fm(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=n.run(Gi(n,u,r),u);return n.reshapePacked(l,i)}});var F$,V$,qm,El,Cl=D(()=>{"use strict";Se();F$=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),V$=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,l=El(a,s,o,4),p=`
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
        `;return{...e,output:{dims:l,type:r.type,textureType:4},shaderSource:p}},qm=(n,e,r,t,o)=>{let i=F$(o.cacheKey);return{...i,get:()=>V$(n,i,e,r,t,o)}},El=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var G$,U$,jm,Km=D(()=>{"use strict";Re();je();Se();Dn();Cl();G$=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),U$=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=El(i,a,t),[l,p]=n.calculateTextureWidthAndHeight(s,4),c=te.computeStrides(u),[f,b]=n.calculateTextureWidthAndHeight(u,4),g=t.length,m=r.length<3?"0.0":"_B(b)",w=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:x,applyActivation:v}=Rr(o),I=le(n.session.backend.glContext.version),$=`
${x}
float process(int indices[${g}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${c[0]} + im2col[1] * ${c[1]} + im2col[2] * ${c[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${m};
  for (int i = 0; i < ${w}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${f}, ${b});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${p});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${v}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:$}},jm=(n,e,r,t)=>{let o=G$(e.length>2,t);return{...o,get:()=>U$(n,o,e,r,t)}}});var ro,Dl,W$,H$,q$,j$,kl,K$,Fi=D(()=>{"use strict";lt();Re();Bm();Hm();Km();Dn();Cl();Vi();ro=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],p=e.slice(2).map((g,m)=>g+(g-1)*(r[m]-1)),f=a.map((g,m)=>g+t[m]+t[m+s]).map((g,m)=>Math.floor((g-p[m]+o[m])/o[m]));return[i,u].concat(...f)},Dl=(n,e,r)=>(K$(e,r),W$(n,e,r)),W$=(n,e,r)=>{let t=j$(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(Mm(n,e,t),e)]:i&&o?[H$(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Wm(n,e,t)]:[q$(n,e,t)]},H$=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=ro(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=n.run(Al(u,r),u);return n.reshapeUnpacked(l,i)},q$=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=ro(t,o,r.dilations,r.pads,r.strides),a=n.run(qm(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(jm(n,e,i,r),s)},j$=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();An.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},kl=n=>{let e=n.attributes,r=to(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return _e({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},K$=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var X$,Z$,J$,Xm,Y$,Q$,eA,tA,rA,nA,Zm,oA,Jm=D(()=>{"use strict";lt();je();Se();Dn();X$=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,Z$=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},J$=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,l=s.length===0;for(let p=0;p<u;++p){let c=l?n[p+2]*i[p]:s[p],f=X$(n[p+2],i[p],o[p],e[p],r[p],c);Z$(f,t,o,p,p+u),l&&s.push(i[p]*(n[p+2]-1)+a[p]+(e[p]-1)*r[p]+1-o[p]-o[p+u])}},Xm=(n,e,r)=>(oA(e,r),Y$(n,e,r)),Y$=(n,e,r)=>{let t=nA(r,e);return[rA(n,e,t)]},Q$=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),eA=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,p=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],c=le(n.session.backend.glContext.version),{activationFunction:f,applyActivation:b}=Rr(t),g=`
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
    ${b}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:p,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},tA=(n,e,r)=>{let t=Q$(e.length>2,r.cacheKey);return{...t,get:()=>eA(n,e,t,r)}},rA=(n,e,r)=>n.run(tA(n,e,r),e),nA=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;J$(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Zm=n=>{let e=n.attributes,r=to(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),p=e.getInts("strides",[1,1]);return _e({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:p,...r})},oA=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Ym,kn,Qm,iA,eg,aA,sA,uA,Ui=D(()=>{"use strict";lt();Re();Se();Ym={name:"Transpose",inputNames:["A"],inputTypes:[0]},kn=(n,e,r)=>(uA(e),[n.run({...Ym,cacheHint:r.cacheKey,get:()=>iA(n,e[0],r.perm)},e)]),Qm=n=>_e({perm:n.attributes.getInts("perm",[])}),iA=(n,e,r)=>{let t=e.dims;r=eg(t,r);let o=aA(t,r),i=t.length,a=`
      ${sA("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Ym,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},eg=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),aA=(n,e)=>(e=eg(n,e),te.sortBasedOnPerm(n,e)),sA=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},uA=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var tg,rg,lA,ng=D(()=>{"use strict";Ui();tg=(n,e,r)=>{lA(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=kn(n,[s],u),p=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(l,p)]},rg=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},lA=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var og,ig,cA,ag=D(()=>{"use strict";Re();og=(n,e,r)=>{cA(e,r);let t=te.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},ig=n=>n.attributes.getInt("axis",1),cA=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var cn,Po=D(()=>{"use strict";cn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var sg,ug,dA,pA,fA,hA,lg=D(()=>{"use strict";lt();Po();Re();Se();sg=(n,e,r)=>(hA(e,r.axis),[n.run(fA(n,e,r),e)]),ug=n=>_e({axis:n.attributes.getInt("axis",0)}),dA={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},pA=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=te.normalizeAxis(t,o.length);let s=[];for(let f=0;f<a.length;f++)f<t?(a[f]=o[f],s.push(`inputIdx[${f}] = outputIdx[${f}];`)):f<t+i.length?(a[f]=i[f-t],s.push(`indexDataIdx[${f-t}] = outputIdx[${f}];`)):(a[f]=o[f-i.length+1],s.push(`inputIdx[${f-i.length+1}] = outputIdx[${f}];`));let u=a.length||1,l=o.length,p=i.length||1,c=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${p}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:c}},fA=(n,e,r)=>{let t={...dA,cacheHint:r.cacheKey};return{...t,get:()=>pA(n,t,e,r.axis)}},hA=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(cn.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var Nl,cg,dg,pg,mA,gA,bA,fg=D(()=>{"use strict";lt();Re();Se();Nl=(n,e,r)=>(bA(e,r),[n.run(mA(e,r),e)]),cg=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return _e({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},dg=n=>cg(n,!1),pg=n=>cg(n,!0),mA=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>gA(r,n,e)}},gA=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Di.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";r.transA&&(u=t[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(l="value += _A(a) * _B(b);");let p=s.length,c=e.length===3?`int c[${e[2].dims.length}];`:"",f=e.length===3?"bcastIndices_C(indices, c);":"",b=e.length===3?"value += beta * _C(c);":"",g=`
      float process(int indices[${p}]) {
          int a[${p}];
          int b[${p}];
          ${c}

          copyVec(indices, a);
          copyVec(indices, b);
          ${f}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${p-1}] = k;
              b[${p-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${b}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:g}},bA=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var hg,mg,yA,_A,vA,xA,wA,gg=D(()=>{"use strict";lt();Se();hg=(n,e,r)=>(wA(e),[n.run(vA(n,e,r),e)]),mg=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return _e({scale:e,bias:r})},yA={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},_A=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${xA(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},vA=(n,e,r)=>{let t={...yA,cacheHint:r.cacheKey};return{...t,get:()=>_A(n,t,e,r)}},xA=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},wA=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var yg,_g,bg,TA,IA,SA,$A,AA,OA,vg=D(()=>{"use strict";je();Se();yg=(n,e,r)=>{OA(e);let t=n.run(IA(e[0]),e);return[n.run(AA(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},_g=n=>n.attributes.getFloat("epsilon",1e-5),bg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},TA=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
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
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},IA=n=>({...bg,get:()=>TA(bg,n)}),SA={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},$A=(n,e,r,t,o)=>{let i=le(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],p=`
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:p}},AA=(n,e,r,t)=>{let o={...SA,cacheHint:`${r}`};return{...o,get:()=>$A(n,o,e,r,t)}},OA=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function PA(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...Tg,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:l}}function EA(n,e){return{...Tg,cacheHint:e.cacheKey,get:()=>PA(n,e)}}var xg,wg,Tg,CA,Ig=D(()=>{"use strict";lt();Se();xg=(n,e,r)=>(CA(e),[n.run(EA(e,r),e)]),wg=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return _e({alpha:e,beta:r,bias:t,size:o})},Tg={name:"LRN",inputNames:["X"],inputTypes:[0]};CA=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var DA,Ll,Sg,$g,Ag,kA,NA,LA,RA,zA,MA,BA,FA,Og=D(()=>{"use strict";lt();Re();je();Se();DA={name:"Pad",inputNames:["A"],inputTypes:[0]},Ll=(n,e,r)=>(LA(e),[n.run({...DA,cacheHint:r.cacheKey,get:()=>NA(n,e[0],r)},e)]),Sg=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return _e({mode:e,value:r,pads:t})},$g=(n,e,r)=>{RA(e);let t=kA(n,e,r);return Ll(n,[e[0]],t)},Ag=n=>n.attributes.getString("mode","constant"),kA=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return _e({mode:r,pads:t,value:o})},NA=(n,e,r)=>{let t=te.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${zA(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},LA=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},RA=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},zA=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=te.computeStrides(e.dims);switch(r.mode){case"constant":return MA(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return BA(t,e.dims,a,o,i,r.pads);case"edge":return FA(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},MA=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
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
      `}});var Eg,Cg,Dg,kg,Ng,Lg,Rg,zg,Mg,VA,Pg,Bg,Hi,Fg,Wi,GA,Vg=D(()=>{"use strict";lt();Re();Se();Eg=(n,e,r)=>{Hi(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Dg(e,t,!1,r)},e)]},Cg=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return _e({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},Dg=(n,e,r,t)=>{let[o,i]=Mg(n,t,r),a=te.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let p=`
        ${Fg(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:p}},kg=(n,e,r)=>{Hi(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>Dg(e,t,!0,r)},e)]},Ng=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return _e({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Lg=(n,e,r)=>{Hi(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>zg(e,t,!1,r)},e)]},Rg=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return _e({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},zg=(n,e,r,t)=>{let[o,i]=Mg(n,t,r),a=`
      value = max(_X(x), value);
    `,s="",l=`
      ${Fg(n[0].dims,o,a,s,"-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:l}},Mg=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();An.adjustPoolAttributes(r,t,i,a,s,u);let l=An.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),p=Object.assign({},e);return o?Object.assign(p,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(p,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[p,l]},VA={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Pg={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Bg=(n,e)=>(Hi(e),[n.run({...Pg,get:()=>zg(e,Pg,!0,VA)},e)]),Hi=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},Fg=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],p=n[i-1],c="",f="",b="";if(u+l!==0?c=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${p}) {
              pad++;
              continue;
            }
            ${r}
          }`:c=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],w=e.strides[e.strides.length-2],x=e.pads[e.pads.length/2-2],v=e.pads[e.pads.length-2],I=n[i-2];x+v!==0?f=`
            for (int j = 0; j < ${m}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${x} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:f=`
            for (int j = 0; j < ${m}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${x} + j;
            `,b=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${f}
          ${c}
          ${b}
          ${t}
          return value;
        }
      `}else{let a=te.size(e.kernelShape),s=te.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,p=GA(u),c=Wi(n,"inputDims"),f=Wi(e.pads,"pads"),b=Wi(s,"kernelStrides"),g=Wi(e.strides,"strides"),m=e.pads.reduce((v,I)=>v+I),w="";return m?w=`
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
        ${p}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${f}
          ${c}
          ${g}
          ${b}

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
      `}},Wi=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
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
  }`});var Nn,dn,UA,WA,Gg,Ug,Wg,Hg,qg,jg,Kg,Xg=D(()=>{"use strict";lt();Po();Re();Se();Nn=(n,e,r,t,o)=>{WA(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>UA(n,e,r,t,o,i)},e)]},dn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return _e({axes:e,keepDims:r})},UA=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=te.normalizeAxes(r.axes,e[0].dims.length),p=o(e,l),c=p[1];for(let g=0;g<e[0].dims.length;g++)l.indexOf(g)>=0||l.length===0?(r.keepDims&&a.push(1),c=`
          for(int j${g} = 0; j${g} < ${e[0].dims[g]}; j${g}++) {
            inputIdx[${g}] = j${g};
            ${c}
          }`):(u.push(`inputIdx[${g}] = outputIdx[${a.length}];`),a.push(e[0].dims[g]));let b=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${p[0]}       // init ops for reduce max/min
        ${c}
        ${p[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:b}},WA=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(cn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Gg=(n,e,r)=>Nn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Ug=(n,e,r)=>Nn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Wg=(n,e,r)=>Nn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Hg=(n,e,r)=>Nn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),qg=(n,e,r)=>Nn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),jg=(n,e,r)=>Nn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Kg=(n,e,r)=>Nn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Zg,Jg=D(()=>{"use strict";Re();Zg=(n,e)=>{let r=te.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var Yg,Rl,Qg,eb,Eo,HA,zl,qi,Ml=D(()=>{"use strict";lt();je();Se();Yg={name:"Upsample",inputNames:["X"],inputTypes:[0]},Rl=(n,e,r)=>(zl(e,r),[n.run({...Yg,cacheHint:r.cacheKey,get:()=>HA(n,e,r)},e)]),Qg=n=>Eo(n,7),eb=n=>Eo(n,9),Eo=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),qi(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let p=n.attributes.getFloat("cubic_coeff_a",-.75),c=n.attributes.getInt("exclude_outside",0)!==0;if(c&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let f=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",b=0,g=0,m=0;return e>10?n.inputs.length>2?(b=1,g=2,m=3):(g=1,m=2):e===9&&(g=1),_e({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:p,excludeOutside:c,useNearest2xOptimization:f,roiInputIdx:b,scalesInputIdx:g,sizesInputIdx:m})},HA=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((m,w)=>Math.floor(m*r.scales[w])),[s,u]=n.calculateTextureWidthAndHeight(a,0),l=a.length,p=new Array(l),c=new Array(l),f=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let m=l-1;m>=0;m--)p[m]=m===l-1?1:p[m+1]*a[m+1],c[m]=m===l-1?1:c[m+1]*e[0].dims[m+1],f+=`
        output_pitches[${m}] = ${p[m]};
        input_pitches[${m}] = ${c[m]};
        `;let b=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,g=r.mode==="nearest"?`
    ${b}
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
    ${b}
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
    ${b}
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
    }`;return{...Yg,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(m=>Math.ceil(m))}]}},zl=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},qi=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Bl,Fl,tb,rb,qA,jA,KA,XA,nb=D(()=>{"use strict";je();Se();Nr();Cn();Ml();Bl={name:"Resize",inputNames:["A"],inputTypes:[2]},Fl=(n,e,r)=>(zl(e,r),[n.run({...Bl,cacheHint:r.cacheKey,get:()=>qA(n,e,r)},e)]),tb=n=>Eo(n,10),rb=n=>Eo(n,11),qA=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=jA(e,r);if(o.every(I=>I===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Bl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],p=e[0].dims;if(s!==p.length)throw new Error(`output dimension should match input ${p.length}, but got ${s}`);let c=p[s-2],f=p[s-1],b=o[s-2],g=o[s-1],m="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${f}.0 - 1.0, ${c}.0 - 1.0, ${f}.0 - 1.0,
                            ${c}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let w=gt(s),x=Lr(),v=`
            const vec2 inputWH = vec2(${c}.0, ${f}.0);
            const vec4 scaleWHWH = vec4(float(${b}), float(${g}), float(${b}), float(${g}));
            ${x}
            ${m}
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
        `;return{...Bl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:v}},jA=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=KA(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=XA(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},KA=(n,e,r)=>{let t=Array.from(n.floatData);return qi(t,e,r),t},XA=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return qi(i,r,t),i}});var ob,ZA,ib=D(()=>{"use strict";En();ob=(n,e)=>(ZA(e),[new rt([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),ZA=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Vl,ab,sb,ub,JA,lb,YA,QA,cb=D(()=>{"use strict";lt();Po();Re();Se();Vl={name:"Slice",inputNames:["A"],inputTypes:[0]},ab=(n,e,r)=>(JA(e),[n.run({...Vl,cacheHint:r.cacheKey,get:()=>ub(n,e[0],r)},e)]),sb=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return _e({starts:e,ends:r,axes:t})},ub=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((c,f)=>f):r.axes,o=te.normalizeAxes(t,e.dims.length),i=r.starts.map((c,f)=>c>e.dims[o[f]]-1?e.dims[o[f]]:te.normalizeAxis(c,e.dims[o[f]])),a=r.ends.map((c,f)=>c>e.dims[o[f]]-1?e.dims[o[f]]:te.normalizeAxis(c,e.dims[o[f]])),s=e.dims.slice(),u=[];for(let c=0;c<o.length;c++)s[o[c]]=a[c]-i[c],i[c]>0&&u.push(`outputIdx[${o[c]}] += ${i[c]};`);let p=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Vl,output:{dims:s,type:e.type,textureType:0},shaderSource:p}},JA=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(cn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},lb=(n,e)=>{QA(e);let r=YA(n,e);return[n.run({...Vl,cacheHint:r.cacheKey,get:()=>ub(n,e[0],r)},[e[0]])]},YA=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},QA=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var db,pb,fb,hb,mb,gb,bb,yb,eO,tO,rO,_b,vb=D(()=>{"use strict";lt();Re();je();Se();Ui();db={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},pb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},fb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},hb=(n,e,r)=>{_b(e);let t=e[0].dims.slice(),o=te.normalizeAxis(r.axis,t.length),i=te.sizeToDimension(t,o),a=te.sizeFromDimension(t,o);return yb(n,e,r,i,a)},mb=n=>_e({axis:n.attributes.getInt("axis",1)}),gb=n=>_e({axis:n.attributes.getInt("axis",-1)}),bb=(n,e,r)=>{_b(e);let t=e[0].dims.slice(),o=te.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],p;a&&(u=Array.from({length:i}).map((g,m)=>m),u[o]=i-1,u[i-1]=o,u.map(g=>s.push(t[g])),p=_e({perm:u}),l=kn(n,e,p));let c=a?te.sizeToDimension(s,i-1):te.sizeToDimension(t,i-1),f=a?te.sizeFromDimension(s,i-1):te.sizeFromDimension(t,i-1),b=yb(n,a?l:e,r,c,f);return a?kn(n,b,p):b},yb=(n,e,r,t,o)=>{let i=eO(n,e[0],t,o,[t]),a=n.run({...db,cacheHint:r.cacheKey,get:()=>i},e),s=tO(n,e[0],t,o,i.output.dims,[t]),u=n.run({...pb,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),l=rO(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...fb,cacheHint:r.cacheKey,get:()=>l},[e[0],a,u])]},eO=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=le(n.session.backend.glContext.version),l=`
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
      }`;return{...db,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},tO=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=le(n.session.backend.glContext.version),p=`
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
      }`;return{...pb,output:{dims:i,type:e.type,textureType:0},shaderSource:p}},rO=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...fb,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},_b=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var xb,wb,Tb,nO,oO,iO,Ib=D(()=>{"use strict";lt();Re();Se();xb={name:"Split",inputNames:["A"],inputTypes:[0]},wb=(n,e,r)=>{iO(e);let t=te.normalizeAxis(r.axis,e[0].dims.length),o=nO(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...xb,cacheHint:`${r.cacheKey};${a}`,get:()=>oO(n,e[0],r,t,a)},e));return i},Tb=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return _e({axis:e,split:r,numOutputs:t})},nO=(n,e,r,t)=>{let[,o]=To.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},oO=(n,e,r,t,o)=>{let[i,a]=To.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],p=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...xb,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:p}},iO=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var Gl,Sb,$b,aO,sO,Ab=D(()=>{"use strict";Re();Gl=(n,e,r)=>{aO(e);let t=te.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Sb=(n,e)=>(sO(e),Gl(n,[e[0]],Array.from(e[1].integerData))),$b=n=>n.attributes.getInts("axes"),aO=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},sO=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Ob,uO,lO,Pb=D(()=>{"use strict";je();Se();Ob=(n,e)=>{lO(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>uO(n,e,r)},e)]},uO=(n,e,r)=>{let t=le(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},lO=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var Eb,cO,dO,Cb=D(()=>{"use strict";Po();Se();Eb=(n,e)=>{dO(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>cO(n,e,r)},e)]},cO=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},dO=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(cn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var Ul,Db,kb,pO,fO,Nb=D(()=>{"use strict";Re();Ul=(n,e,r)=>{pO(e);let t=te.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Db=(n,e)=>(fO(e),Ul(n,[e[0]],Array.from(e[1].integerData))),kb=n=>n.attributes.getInts("axes"),pO=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},fO=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Lb,Rb=D(()=>{"use strict";qh();im();um();hm();Fi();Jm();ng();ag();lg();fg();gg();vg();Ig();Vi();Og();Vg();Xg();Jg();nb();ib();cb();vb();Ib();Ab();Pb();Cb();Ui();$l();Nb();Ml();Lb=[["Abs","","6+",mm],["Acos","","7+",gm],["Add","","7+",jh],["And","","7+",Kh],["Asin","","7+",bm],["Atan","","7+",ym],["AveragePool","","7+",Eg,Cg],["BatchNormalization","","7+",Wh,Hh],["Cast","","6+",am,sm],["Ceil","","6+",xm],["Clip","","6-10",Il,_m],["Clip","","11+",vm],["Concat","","4+",dm,fm],["Conv","","1+",Dl,kl],["ConvTranspose","","1+",Xm,Zm],["Cos","","7+",wm],["Div","","7+",Xh],["Dropout","","7+",Sl],["DepthToSpace","","1+",tg,rg],["Equal","","7+",Zh],["Elu","","6+",Tm,Im],["Exp","","6+",Sm],["Flatten","","1+",og,ig],["Floor","","6+",$m],["FusedConv","com.microsoft","1+",Dl,kl],["Gather","","1+",sg,ug],["Gemm","","7-10",Nl,dg],["Gemm","","11+",Nl,pg],["GlobalAveragePool","","1+",kg,Ng],["GlobalMaxPool","","1+",Bg],["Greater","","7+",Jh],["Identity","","1+",Sl],["ImageScaler","","1+",hg,mg],["InstanceNormalization","","6+",yg,_g],["LeakyRelu","","6+",Am,Om],["Less","","7+",Yh],["LRN","","1+",xg,wg],["Log","","6+",Pm],["MatMul","","1+",Gm,Um],["MaxPool","","1+",Lg,Rg],["Mul","","7+",Qh],["Neg","","6+",Em],["Not","","1+",Cm],["Or","","7+",em],["Pad","","2-10",Ll,Sg],["Pad","","11+",$g,Ag],["Pow","","7+",tm],["PRelu","","7+",rm],["ReduceLogSum","","1+",jg,dn],["ReduceMax","","1+",Wg,dn],["ReduceMean","","1+",Ug,dn],["ReduceMin","","1+",Hg,dn],["ReduceProd","","1+",qg,dn],["ReduceSum","","1-12",Gg,dn],["ReduceSumSquare","","1+",Kg,dn],["Relu","","6+",Dm],["Reshape","","5+",Zg],["Resize","","10",Fl,tb],["Resize","","11+",Fl,rb],["Shape","","1+",ob],["Sigmoid","","6+",km],["Sin","","7+",Nm],["Slice","","10+",lb],["Slice","","1-9",ab,sb],["Softmax","","1-12",hb,mb],["Softmax","","13+",bb,gb],["Split","","2-12",wb,Tb],["Sqrt","","6+",Lm],["Squeeze","","1-12",Gl,$b],["Squeeze","","13+",Sb],["Sub","","7+",nm],["Sum","","6+",Ob],["Tan","","7+",Rm],["Tanh","","6+",zm],["Tile","","6+",Eb],["Transpose","","1+",kn,Qm],["Upsample","","7-8",Rl,Qg],["Upsample","","9",Rl,eb],["Unsqueeze","","1-12",Ul,kb],["Unsqueeze","","13+",Db],["Xor","","7+",om]]});function Mb(n){let e={},r;for(;(r=zb.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=hO.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),l=a?`${a} ${s};`:"",p=e[t].body,c="";e[t].params.forEach((b,g)=>{b&&(c+=`${b.type} ${b.name} = ${u[g]};
`)}),p=`${c}
 ${p}`,p=p.replace("return",`${s} = `);let f=`
      ${l}
      {
        ${p}
      }
      `;n=n.replace(r[0],f)}}return n=n.replace(zb,""),n}var zb,hO,Bb=D(()=>{"use strict";zb=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,hO="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function no(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:mO(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function mO(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Jn(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Jn(n.every(gO),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function gO(n){return n%1===0}function bO(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function Fb(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var ji,Wl=D(()=>{"use strict";Et();Re();ji=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((l,p)=>l*p),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((l,p)=>l*p);if(s>o||u>o)ze.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=no(i).newShape);let a=bO(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Fb(a/4).map(s=>s*2):Fb(a)}}});var Ki,Vb=D(()=>{"use strict";Re();Kr();je();Wl();Nr();Ki=class extends Rt{constructor(r){super(r)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let r="offsetToCoords";return{offsetToCoords:new Z(`
      vec2 ${r}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let r="coordsToOffset";return{coordsToOffset:new Z(`
      int ${r}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let r=this.context.outputTextureLayout;return r.isPacked?this.getPackedOutputSamplingSnippet(r):this.getUnpackedOutputSamplingSnippet(r)}getPackedOutputSamplingSnippet(r){let t=r.unpackedShape,o=[r.width,r.height],i={},a="getOutputCoords";switch(t.length){case 0:i[a]=this.getOutputScalarCoords();break;case 1:i[a]=this.getOutputPacked1DCoords(t,o);break;case 2:i[a]=this.getOutputPacked2DCoords(t,o);break;case 3:i[a]=this.getOutputPacked3DCoords(t,o);break;default:i[a]=this.getOutputPackedNDCoords(t,o)}let u=`
      void setOutput(vec4 val) {
        ${le(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new Z(u),i}getUnpackedOutputSamplingSnippet(r){let t=r.unpackedShape,o=[r.width,r.height],i={},a="getOutputCoords";switch(t.length){case 0:i[a]=this.getOutputScalarCoords();break;case 1:i[a]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[a]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[a]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[a]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[a]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[a]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${le(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return i[l]=new Z(u),i}getOutputScalarCoords(){return new Z(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(r,t){let o=t,i="";return o[0]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${o[1]}.0);
          }
        `,new Z(i)):o[1]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${o[0]}.0);
          }
        `,new Z(i)):(i=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${o[0]}, ${o[1]}));
          return 2 * (resTexRC.y * ${o[0]} + resTexRC.x);
        }
      `,new Z(i))}getOutputPacked2DCoords(r,t){let o="";if($n.arraysEqual(r,t))return o=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new Z(o);let i=t,a=Math.ceil(r[1]/2);return o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${a}) * 2;
          int c = 2 * (index / ${a});

          return ivec2(r, c);
        }
      `,new Z(o)}getOutputPacked3DCoords(r,t){let o=[t[0],t[1]],i=Math.ceil(r[2]/2),a=i*Math.ceil(r[1]/2),s=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));
          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          int b = index / ${a};
          index -= b * ${a};

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec3(b, r, c);
        }
      `;return new Z(s)}getOutputPackedNDCoords(r,t){let o=[t[0],t[1]],i=Math.ceil(r[r.length-1]/2),a=i*Math.ceil(r[r.length-2]/2),s=a,u="",l="b, r, c";for(let c=2;c<r.length-1;c++)s*=r[r.length-c-1],u=`
      int b${c} = index / ${s};
      index -= b${c} * ${s};
    `+u,l=`b${c}, `+l;let p=`
      ivec${r.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${o[0]}, ${o[1]}));
        int index = resTexRC.y * ${o[0]} + resTexRC.x;

        ${u}

        int b = index / ${a};
        index -= b * ${a};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${r.length}(${l});
      }
    `;return new Z(p)}getOutputUnpacked1DCoords(r,t){let o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new Z(o)}getOutputUnpacked2DCoords(r,t){let o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${r[1]};
          int c = index - r * ${r[1]};
          return ivec2(r, c);
        }
      `;return new Z(o)}getOutputUnpacked3DCoords(r,t){let o="",i=r.length,a=null;i<2&&(a=[]),a=new Array(i-1),a[i-2]=r[i-1];for(let l=i-3;l>=0;--l)a[l]=a[l+1]*r[l+1];let s=["r","c","d"],u=a.map((l,p)=>{let c=`int ${s[p]} = index / ${l}`,f=p===a.length-1?`int ${s[p+1]} = index - ${s[p]} * ${l}`:`index -= ${s[p]} * ${l}`;return`${c}; ${f};`}).join("");return o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new Z(o)}getOutputUnpacked4DCoords(r,t){let o="",i=r.length,a=null;i<2&&(a=[]),a=new Array(i-1),a[i-2]=r[i-1];for(let l=i-3;l>=0;--l)a[l]=a[l+1]*r[l+1];let s=["r","c","d","d2"],u=a.map((l,p)=>{let c=`int ${s[p]} = index / ${l}`,f=p===a.length-1?`int ${s[p+1]} = index - ${s[p]} * ${l}`:`index -= ${s[p]} * ${l}`;return`${c}; ${f};`}).join("");return o=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new Z(o)}getOutputUnpacked5DCoords(r,t){let o="",i=r.length,a=null;i<2&&(a=[]),a=new Array(i-1),a[i-2]=r[i-1];for(let l=i-3;l>=0;--l)a[l]=a[l+1]*r[l+1];let s=["r","c","d","d2","d3"],u=a.map((l,p)=>{let c=`int ${s[p]} = index / ${l}`,f=p===a.length-1?`int ${s[p+1]} = index - ${s[p]} * ${l}`:`index -= ${s[p]} * ${l}`;return`${c}; ${f};`}).join("");return o=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Z(o)}getOutputUnpacked6DCoords(r,t){let o="",i=r.length,a=null;i<2&&(a=[]),a=new Array(i-1),a[i-2]=r[i-1];for(let l=i-3;l>=0;--l)a[l]=a[l+1]*r[l+1];let s=["r","c","d","d2","d3","d4"],u=a.map((l,p)=>{let c=`int ${s[p]} = index / ${l}`,f=p===a.length-1?`int ${s[p+1]} = index - ${s[p]} * ${l}`:`index -= ${s[p]} * ${l}`;return`${c}; ${f};`}).join("");return o=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Z(o)}getCommonUtilFuncs(){let r={},t="uvFromFlat";r[t]=new Z(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",r[t]=new Z(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",r[t]=new Z(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",r[t]=new Z(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let o=le(this.context.glContext.version);return r[t]=new Z(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),r}getInputsSamplingSnippets(){let r={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let a=this.context.inputTextureLayouts[i],s=ki(o);a.isPacked?r[s]=this.getPackedSamplerFromInput(s,o,a):r[s]=this.getUnpackedSamplerFromInput(s,o,a);let u=Oh(o);a.unpackedShape.length<=t.unpackedShape.length&&(a.isPacked?r[u]=this.getPackedSamplerAtOutputCoords(u,a,t,o):r[u]=this.getUnpackedSamplerAtOutputCoords(u,a,t,o))}),r}getPackedSamplerAtOutputCoords(r,t,o,i){let a=t.unpackedShape,s=o.unpackedShape,l=ki(i),p=a.length,c=s.length,f=mt.getBroadcastDims(a,s),b=gt(c),g=c-p,m,w=qt();p===0?m="":c<2&&f.length>=1?m="coords = 0;":m=f.map(V=>`coords.${w[V+g]} = 0;`).join(`
`);let x="";c<2&&p>0?x="coords":x=a.map((V,H)=>`coords.${w[H+g]}`).join(", ");let v="return outputValue;",$=te.size(a)===1,E=te.size(s)===1;if(p===1&&!$&&!E)v=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if($&&!E)c===1?v=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:v=`
          return vec4(outputValue.x);
        `;else if(f.length){let V=p-2,H=p-1;f.indexOf(V)>-1&&f.indexOf(H)>-1?v="return vec4(outputValue.x);":f.indexOf(V)>-1?v="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(H)>-1&&(v="return vec4(outputValue.xx, outputValue.zz);")}let N=`
        int lastDim = coords.${w[c-1]};
        coords.${w[c-1]} = coords.${w[c-2]};
        coords.${w[c-2]} = lastDim;
      `,R=`
      vec4 ${r}() {
        ${b} coords = getOutputCoords();
        ${N}
        ${m}
        vec4 outputValue = ${l}(${x});
        ${v}
      }
    `;return new Z(R,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(r,t,o,i){let a=[o.width,o.height],s=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,p=t.unpackedShape,c=o.unpackedShape,f=ki(i);if(u===l&&$n.arraysEqual(s,a)){let $=`
          float ${r}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new Z($,["coordinates.sampleTexture"])}let b=gt(l),g=mt.getBroadcastDims(p,c),m=l-u,w,x=qt();u===0?w="":l<2&&g.length>=1?w="coords = 0;":w=g.map($=>`coords.${x[$+m]} = 0;`).join(`
`);let v="";l<2&&u>0?v="coords":v=t.unpackedShape.map(($,O)=>`coords.${x[O+m]}`).join(", ");let I=`
        float ${r}() {
          ${b} coords = getOutputCoords();
          ${w}
          return ${f}(${v});
        }
      `;return new Z(I,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(r,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(r,t);case 1:return this.getPackedSampler1D(r,t,o);case 2:return this.getPackedSampler2D(r,t,o);case 3:return this.getPackedSampler3D(r,t,o);default:return this.getPackedSamplerND(r,t,o)}}getUnpackedSamplerFromInput(r,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(r,t,o);case 1:return this.getUnpackedSampler1D(r,t,o);case 2:return this.getUnpackedSampler2D(r,t,o);case 3:return this.getUnpackedSampler3D(r,t,o);case 4:return this.getUnpackedSampler4D(r,t,o);case 5:return this.getUnpackedSampler5D(r,t,o);case 6:return this.getUnpackedSampler6D(r,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(r,t){let o=le(this.context.glContext.version),i=`
          vec4 ${r}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new Z(i)}getPackedSampler1D(r,t,o){let i=[o.width,o.height],a=[i[1],i[0]],s=le(this.context.glContext.version),l=`vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
      ${a[0]}, ${a[1]}, index);
      return ${s.texture2D}(${t}, uv);
    }`;return new Z(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(r,t,o){let i=o.unpackedShape,a=[o.width,o.height],s=le(this.context.glContext.version),u=a[0],l=a[1];if(a!=null&&$n.arraysEqual(i,a)){let g=`vec4 ${r}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${s.texture2D}(${t}, uv);
      }`;return new Z(g)}let p=a,c=Math.ceil(i[1]/2),b=`vec4 ${r}(int row, int col) {
      vec2 uv = packedUVfrom2D(${p[1]}, ${p[0]}, ${c}, row, col);
      return ${s.texture2D}(${t}, uv);
    }`;return new Z(b,["coordinates.packedUVfrom2D"])}getPackedSampler3D(r,t,o){let i=o.unpackedShape,a=[o.width,o.height],s=[a[0],a[1]],u=le(this.context.glContext.version);if(i[0]===1){let m=i.slice(1),w=[1,2],x=Yn(i,m),v=["b","row","col"],I=JSON.parse(JSON.stringify(o));I.unpackedShape=x;let $=this.getPackedSamplerFromInput(r,t,I),E=`${$.routineBody}
      vec4 ${r}(int b, int row, int col) {
        return ${r}(${Qn(v,w)});
      } `;return new Z(E,$.dependencies)}let l=s[0],p=s[1],c=Math.ceil(i[2]/2),f=c*Math.ceil(i[1]/2),g=`vec4 ${r}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${p}, ${l}, ${f}, ${c}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new Z(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(r,t,o){let i=o.unpackedShape,a=i.length,s=[o.width,o.height],u=le(this.context.glContext.version),l=[s[0],s[1]],p=l[1],c=l[0],f=Math.ceil(i[a-1]/2),b=f*Math.ceil(i[a-2]/2),g="int b, int row, int col",m=`b * ${b} + (row / 2) * ${f} + (col / 2)`;for(let v=2;v<a-1;v++)g=`int b${v}, `+g,b*=i[a-v-1],m=`b${v} * ${b} + `+m;let x=`vec4 ${r}(${g}) {
      int index = ${m};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${p});
      return ${u.texture2D}(${t}, uv);
    }`;return new Z(x)}getUnpackedSamplerScalar(r,t,o){let[i,a]=[o.width,o.height];if(i===1&&a===1){let u=`
          float ${r}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new Z(u,["coordinates.sampleTexture"])}let s=`
        float ${r}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${a});
          vec2 uv = uvFromFlat(${i}, ${a}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new Z(s,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(r,t,o){let i=o.width,a=o.height;if(a===1&&i===1){let u=`
        float ${r}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new Z(u,["coordinates.sampleTexture"])}if(a===1){let u=`
          float ${r}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(u,["coordinates.sampleTexture"])}if(i===1){let u=`
          float ${r}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${a}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(u,["coordinates.sampleTexture"])}let s=`
        float ${r}(int index) {
          vec2 uv = uvFromFlat(${i}, ${a}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Z(s,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(r,t,o){let i=o.unpackedShape,a=[o.height,o.width];if(a!=null&&$n.arraysEqual(i,a)){let b=a[1],g=a[0],m=`
          float ${r}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${b}.0, ${g}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(m,["coordinates.sampleTexture"])}let{newShape:s,keptDims:u}=no(i),l=s;if(l.length<i.length){let b=Yn(i,l),g=JSON.parse(JSON.stringify(o));g.unpackedShape=b;let m=["col","row"],w=`
          ${this.getUnpackedSamplerFromInput(r,t,g).routineBody}
          float ${r}(int row, int col) {
            return ${r}(${Qn(m,u)});
          }
        `;return new Z(w,["coordinates.sampleTexture"])}let p=a[1],c=a[0];if(c===1){let b=`
          float ${r}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${p}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${p}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(p===1){let b=`
          float ${r}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${p}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${r}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${p}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Z(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(r,t,o){let i=o.unpackedShape,a=i[1]*i[2],s=i[2],{newShape:u,keptDims:l}=no(i),p=u;if(p.length<i.length){let g=Yn(i,p),m=["batch","col","row"],w=JSON.parse(JSON.stringify(o));w.unpackedShape=g;let x=this.getUnpackedSamplerFromInput(r,t,w),v=l.reverse(),I=`
          ${x.routineBody}
          float ${r}(int batch, int row, int col) {
            return ${r}(${Qn(m,v)});
          }
        `;return new Z(I,x.dependencies)}let c=o.width,f=o.height,b=`
          float ${r}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${a} + col * ${s} + row;
            vec2 uv = uvFromFlat(${c}, ${f}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new Z(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(r,t,o){let i=o.unpackedShape,a=i[3],s=i[2]*a,u=i[1]*s,l=o.width,p=o.height,c=`
        float ${r}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${s} +
              depth2 * ${a} + depth;
          vec2 uv = uvFromFlat(${l}, ${p}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Z(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(r,t,o){let i=o.unpackedShape,a=i[4],s=i[3]*a,u=i[2]*s,l=i[1]*u,{newShape:p,keptDims:c}=no(i);if(p.length<i.length){let m=Yn(i,p),w=["row","col","depth","depth2","depth3"],x=JSON.parse(JSON.stringify(o));x.unpackedShape=m;let v=`
          ${this.getUnpackedSamplerFromInput(r,t,x).routineBody}
          float ${r}(int row, int col, int depth, int depth2, int depth3) {
            return ${r}(${Qn(w,c)});
          }
        `;return new Z(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=o.width,b=o.height,g=`
        float ${r}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${s} +
          depth3 * ${a} + depth2;
          vec2 uv = uvFromFlat(${f}, ${b}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Z(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(r,t,o){let i=o.unpackedShape,a=i[5],s=i[4]*a,u=i[3]*s,l=i[2]*u,p=i[1]*l,{newShape:c,keptDims:f}=no(i);if(c.length<i.length){let w=Yn(i,c),x=["row","col","depth","depth2","depth3","depth4"],v=JSON.parse(JSON.stringify(o));v.unpackedShape=w;let I=`
            ${this.getUnpackedSamplerFromInput(r,t,v).routineBody}
            float ${r}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${r}(${Qn(x,f)});
            }
          `;return new Z(I,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let b=o.width,g=o.height,m=`
          float ${r}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${p} + col * ${l} + depth * ${u} +
            depth2 * ${s} + depth3 * ${a} + depth4;
            vec2 uv = uvFromFlat(${b}, ${g}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new Z(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let r=this.context.outputTextureLayout,t=r.shape.length,o=r.strides,i=r.width,a=r.height,s=[];for(let l=0;l<t-1;++l)s.push(`
        c[${l}] = offset / ${o[l]};`),s.push(`
        offset -= c[${l}] * ${o[l]};`);s.push(`
        c[${t-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${a});
        ${s.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${s.join("")}
      }
    `;return{toVec:new Z(u,["coordinates.coordsToOffset"])}}valueFrom(){let r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],s=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;r[u]=new Z(this.getValueFromSingle(t,s,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",r[u]=new Z(this.getValueFromSingle(t,s,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),r}getValueFromSingle(r,t,o,i,a){let s=`_${r}`;a&&(s=s+"_T");let u=le(this.context.glContext.version);return`
        float ${s}(int m[${t}]) {
          int offset = indicesToOffset${s}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${r}, coords));
          return value;
        }
        `}getPackedValueFrom(r,t,o,i,a){let s=`_${r}_Pack`;a&&(s=s+"_T");let u=le(this.context.glContext.version);return`
        vec4 ${s}(int m[${t}]) {
          int offset = indicesToOffset_${r}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${r}, coords);
        }
        `}}});var Xi,Gb=D(()=>{"use strict";Kr();Xi=class n extends Rt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Z(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Z(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Z(`
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
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Z(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Zi,Ub=D(()=>{"use strict";Kr();je();Zi=class extends Rt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=le(this.context.glContext.version);return{setFragColor:new Z(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Z(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Ji,Wb=D(()=>{"use strict";Kr();Ji=class n extends Rt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let c=0;c<a;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${s+c}]), ${i[c]}.0) );
          `;let p=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;r[u]=new Z(p)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let c=0;c<a-2;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${s+c}]), ${i[c]}.0) );
          `;let p=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new Z(p)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new Z(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new Z(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new Z(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new Z(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
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
        `;e[a]=new Z(u)}),e}}});var Yi,Hb=D(()=>{"use strict";Kr();Yi=class extends Rt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<r;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new Z(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new Z(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new Z(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new Z(o)}}}});var Hl,qb=D(()=>{"use strict";Vb();Gb();Ub();Wb();Hb();Hl={encoding:Xi,fragcolor:Zi,vec:Yi,shapeUtils:Ji,coordinates:Ki}});var Qi,jb=D(()=>{"use strict";Kr();Bb();qb();je();Qi=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new zi(e,r,t,o),Object.keys(Hl).forEach(a=>{let s=new Hl[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let p=a+"."+l,c;i[p]?(c=i[p],c.routineBody=u[l].routineBody):(c=new Oo(p,u[l].routineBody),i[p]=c);let f=u[l].dependencies;if(f)for(let b=0;b<f.length;++b)if(i[f[b]])c.addDependency(i[f[b]]);else{let g=new Oo(f[b]);i[f[b]]=g,c.addDependency(g)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${Ah(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=Mb(r),`${$h(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Mi.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ea,Kb=D(()=>{"use strict";ft();Et();jb();je();ea=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw ze.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Qi(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){ze.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Sh(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}fe.debug&&ze.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;ze.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let p=r.find(c=>c.name===a)?.data;if(s!=="sampler2D"&&!p)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,p):o.uniform1f(u,p);break;case"int":l?o.uniform1iv(u,p):o.uniform1i(u,p);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var ta,Xb=D(()=>{"use strict";Et();$o();ta=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,l,p;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,p=this.inUseTextures.get(l),p||(p=[],this.inUseTextures.set(l,p));let f=this.idleTextures.get(l);if(f&&f.length>0){let b=f.pop();return p.push(b),o===1&&this.glContext.updateTexture(b,s,u,a,this.toTextureData(e,t)),b}}ze.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let c=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(p.push(c),this.textureLookup.set(c,l)),c}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,p)=>l*p)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(ze.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ra,Zb=D(()=>{"use strict";Et();Mp();Gh();Rb();Kb();Wl();Xb();ra=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new ji(e.glContext.maxTextureSize),this.programManager=new ea(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new ta(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Ri(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){ze.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=zp(e,r,Lb);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function yO(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var Co,Jb=D(()=>{"use strict";ft();$o();$o();Nr();Co=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),l=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(fe.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new Ni(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new So(this.gl,r):new So(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Li(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await gl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=yO(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await gl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function ql(n){let e;if((!n||n==="webgl2")&&"webgl2"in oo?e=oo.webgl2:(!n||n==="webgl")&&"webgl"in oo&&(e=oo.webgl),!e)try{let t=vO();e=Yb(t,n)}catch{let o=_O();e=Yb(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return oo[n]=e,r.isContextLost()?(delete oo[n],ql(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function Yb(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new Co(t,2)}catch(i){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new Co(t,1)}catch(i){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function _O(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function vO(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var oo,Qb=D(()=>{"use strict";Et();Jb();oo={}});var na,ey=D(()=>{"use strict";ft();Et();Zb();Qb();na=class{get contextId(){return fe.webgl.contextId}set contextId(e){fe.webgl.contextId=e}get matmulMaxBatchSize(){return fe.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){fe.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return fe.webgl.textureCacheMode}set textureCacheMode(e){fe.webgl.textureCacheMode=e}get pack(){return fe.webgl.pack}set pack(e){fe.webgl.pack=e}get async(){return fe.webgl.async}set async(e){fe.webgl.async=e}initialize(){try{return this.glContext=ql(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ze.setWithEnv(fe),fe.webgl.context||Object.defineProperty(fe.webgl,"context",{value:this.glContext.gl}),ze.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ze.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ra(this,e)}dispose(){this.glContext.dispose()}}});async function jl(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=ty.get(r);if(t)return t;let o=await wO(r);if(o)return o}}else return jl(["webgl"]);throw new Error("no available backend to use")}async function wO(n){let e=xO;if(typeof e[n]<"u"&&TO(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return ty.set(n,r),r}}function TO(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var ty,xO,ry=D(()=>{"use strict";ey();ty=new Map,xO={webgl:new na}});var Kl,oa,ny=D(()=>{"use strict";Et();Kl=class{constructor(e,r){this.op=e;this.node=r}},oa=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Kl(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((p,c)=>{let f=o[c];this._values[f]=p});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let p=i[u++],c=this._ops[p],f=c.node.inputs.map(w=>this._values[w]);if(f.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${c.node}`);let b=f;ze.verbose("ExecPlan",`Running op:${c.node.name} (${b.map((w,x)=>`'${c.node.inputs[x]}': ${w.type}[${w.dims.join(",")}]`).join(", ")})`);let g=await this.profiler.event("node",c.node.name,async()=>c.op.impl(t,b,c.op.context));if(g.length!==c.node.outputs.length)throw new Error("the size of output does not match model definition.");g.forEach((w,x)=>{let v=c.node.outputs[x];if(this._values[v])throw new Error(`output [${v}] already has value: op:${c.node.name}`);this._values[v]=w});let m=new Set;g.forEach((w,x)=>{let v=c.node.outputs[x];for(let I of a[v].to){let $=s[I],O=!0;for(let E of $.inputs)if(!this._values[E]){O=!1;break}O&&m.add(I)}}),i.push(...m)}let l=[];for(let p=0;p<this.graph.getOutputIndices().length;p++){let c=this.graph.getOutputIndices()[p],f=this._values[c];if(f===void 0)throw new Error(`required output [${c}] does not have value`);c===0?await f.getData():f.data,l.push(f)}return ze.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Ie,Do,oy=D(()=>{"use strict";_o();Ie=ye(Zn());En();Re();Do=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof Ie.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof $i.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof Ie.onnx.AttributeProto?e.type:e.type();switch(r){case Ie.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Ie.onnx.AttributeProto.AttributeType.INT:return"int";case Ie.onnx.AttributeProto.AttributeType.STRING:return"string";case Ie.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Ie.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Ie.onnx.AttributeProto.AttributeType.INTS:return"ints";case Ie.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Ie.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Ie.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof Ie.onnx.AttributeProto?e.type:e.type();if(r===Ie.onnx.AttributeProto.AttributeType.GRAPH||r===Ie.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===Ie.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(r===Ie.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(r===Ie.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Ie.onnx.AttributeProto?rt.fromProto(t):rt.fromOrtTensor(t);if(r===Ie.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Ie.onnx.AttributeProto)return t.map(i=>rt.fromProto(i));if(e instanceof $i.Attribute)return t.map(i=>rt.fromOrtTensor(i))}return r===Ie.onnx.AttributeProto.AttributeType.STRING&&e instanceof Ie.onnx.AttributeProto?Io(t):r===Ie.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Ie.onnx.AttributeProto?t.map(Io):t}static getValueNoCheck(e){return e instanceof Ie.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Ie.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Ie.onnx.AttributeProto.AttributeType.INT:return e.i;case Ie.onnx.AttributeProto.AttributeType.STRING:return e.s;case Ie.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Ie.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Ie.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Ie.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Ie.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Ie.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Ie.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Ie.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Nt.AttributeType.FLOAT:return e.f();case Nt.AttributeType.INT:return e.i();case Nt.AttributeType.STRING:return e.s();case Nt.AttributeType.TENSOR:return e.t();case Nt.AttributeType.GRAPH:return e.g();case Nt.AttributeType.FLOATS:return e.floatsArray();case Nt.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case Nt.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case Nt.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${Nt.AttributeType[e.type()]}`)}}}});var Zl,Jl,zr,ia,Xl,iy=D(()=>{"use strict";oy();_o();Zl=ye(Zn());En();Re();Jl={from:(n,e)=>new Xl(n,e)},zr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=dt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ia=class{constructor(e,r){e instanceof Zl.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Do(e.attribute)):e instanceof Yu.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Do(dt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Xl=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Zl.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Zu.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new zr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new zr;s.type={shape:{dims:dt.tensorDimsFromProto(i.dims)},tensorType:dt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=rt.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new zr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ia(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=r.get(u);if(typeof l>"u"&&(l=this._allData.push(new zr)-1,r.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=rt.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=r.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new zr;if(e.nodeArgs(s)?.type()?.valueType()!==el.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let p=e.nodeArgs(s).type().value(new Qu.TensorTypeAndShape),c=dt.tensorDataTypeFromProto(p.elemType()),f=p.shape(),b=[];for(let m=0;m<f.dimLength();m++)b.push(xt.longToNumber(f.dim(m).value().dimValue()));u.type={shape:{dims:b},tensorType:c};let g=this._allData.push(u)-1;r.set(a,g),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new zr,l=dt.tensorDimsFromORTFormat(a),p=dt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:p},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=rt.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new zr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ia(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),p=r.get(l);if(typeof p>"u"&&(p=this._allData.push(new zr)-1,r.set(l,p)),a.outputs.push(p),this._allData[p]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${p}`);if(this._allData[p]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[p]._from=-1,this._allData[p].tensor=rt.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),p=r.get(l);if(typeof p>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(p),this._allData[p]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[On,Pn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var ay,sy,aa,uy=D(()=>{"use strict";ay=ye(Le());iy();_o();sy=ye(Zn());Re();aa=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=sy.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=Jl.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new ay.ByteBuffer(e),o=Ju.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=Jl.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var sa,ly=D(()=>{"use strict";ry();ny();Et();uy();sa=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=pi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await jl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new aa,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new oa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var ua,cy=D(()=>{"use strict";ft();En();ua=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new rt(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new St(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var dy={};qn(dy,{onnxjsBackend:()=>IO});var Yl,IO,py=D(()=>{"use strict";ly();cy();Yl=class{async init(){}async createInferenceSessionHandler(e,r){let t=new sa(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new ua(t)}},IO=new Yl});var la=D(()=>{"use strict"});var my={};qn(my,{default:()=>SO});var fy,hy,SO,gy=D(()=>{"use strict";Ql();pn();ca();fy="ort-wasm-proxy-worker",hy=globalThis.self?.name===fy;hy&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":da(r.wasm).then(()=>{pa(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;fa(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=ko(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ha(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ma(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;ga(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},ya([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":ba(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});SO=hy?null:n=>new Worker(n??Ot,{type:"module",name:fy})});var yy={};qn(yy,{default:()=>$O});var ec,by,$O,_y=D(()=>{"use strict";by=(ec=import.meta.url,async function(n={}){function e(){return ee.buffer!=J.buffer&&Ae(),J}function r(){return ee.buffer!=J.buffer&&Ae(),me}function t(){return ee.buffer!=J.buffer&&Ae(),se}function o(){return ee.buffer!=J.buffer&&Ae(),Fe}function i(){return ee.buffer!=J.buffer&&Ae(),st}function a(){return ee.buffer!=J.buffer&&Ae(),Ve}function s(){return ee.buffer!=J.buffer&&Ae(),pe}function u(){return ee.buffer!=J.buffer&&Ae(),De}var l,p,c=Object.assign({},n),f=new Promise((d,h)=>{l=d,p=h}),b=typeof window=="object",g=typeof importScripts=="function",m=g&&self.name=="em-pthread";c.mountExternalData=(d,h)=>{d.startsWith("./")&&(d=d.substring(2)),(c.Fb||(c.Fb=new Map)).set(d,h)},c.unmountExternalData=()=>{delete c.Fb};var w=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let x=()=>{let d=(y,_,T)=>(...P)=>{let z=Qt,M=_?.();P=y(...P);let K=_?.();return M!==K&&(y=K,T(M),_=T=null),Qt!=z?new Promise((Y,ue)=>{gs={resolve:Y,reject:ue}}):P},h=y=>async(..._)=>{try{if(c.Gb)throw Error("Session already started");let T=c.Gb={hc:_[0],errors:[]},P=await y(..._);if(c.Gb!==T)throw Error("Session mismatch");c.Hb?.flush();let z=T.errors;if(0<z.length){let M=await Promise.all(z);if(M=M.filter(K=>K),0<M.length)throw Error(M.join(`
`))}return P}finally{c.Gb=null}};c._OrtCreateSession=d(c._OrtCreateSession,()=>c._OrtCreateSession,y=>c._OrtCreateSession=y),c._OrtRun=h(d(c._OrtRun,()=>c._OrtRun,y=>c._OrtRun=y)),c._OrtRunWithBinding=h(d(c._OrtRunWithBinding,()=>c._OrtRunWithBinding,y=>c._OrtRunWithBinding=y)),c._OrtBindInput=d(c._OrtBindInput,()=>c._OrtBindInput,y=>c._OrtBindInput=y),x=void 0};c.jsepInit=(d,h)=>{if(x?.(),d==="webgpu"){[c.Hb,c.Vb,c.Zb,c.Ob,c.Yb,c.kb,c.$b,c.cc,c.Wb,c.Xb,c.ac]=h;let y=c.Hb;c.jsepRegisterBuffer=(_,T,P,z)=>y.registerBuffer(_,T,P,z),c.jsepGetBuffer=_=>y.getBuffer(_),c.jsepCreateDownloader=(_,T,P)=>y.createDownloader(_,T,P),c.jsepOnCreateSession=_=>{y.onCreateSession(_)},c.jsepOnReleaseSession=_=>{y.onReleaseSession(_)},c.jsepOnRunStart=_=>y.onRunStart(_),c.dc=(_,T)=>{y.upload(_,T)}}else if(d==="webnn"){[c.Hb,c.bc,c.Pb,c.jsepEnsureTensor,c.ec,c.jsepDownloadTensor]=h,c.jsepReleaseTensorId=c.Pb;let y=c.Hb;c.jsepOnRunStart=_=>y.onRunStart(_),c.jsepRegisterMLContext=(_,T)=>{y.registerMLContext(_,T)},c.jsepOnReleaseSession=_=>{y.onReleaseSession(_)},c.jsepCreateMLTensorDownloader=(_,T)=>y.createMLTensorDownloader(_,T),c.jsepRegisterMLTensor=(_,T,P)=>y.registerMLTensor(_,T,P),c.jsepCreateMLContext=_=>y.createMLContext(_),c.jsepRegisterMLConstant=(_,T,P,z,M)=>y.registerMLConstant(_,T,P,z,M,c.Fb)}};var v,I,$=Object.assign({},c),O=(d,h)=>{throw h},E="";(b||g)&&(g?E=self.location.href:typeof document<"u"&&document.currentScript&&(E=document.currentScript.src),ec&&(E=ec),E=E.startsWith("blob:")?"":E.substr(0,E.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(I=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),v=(d,h,y)=>{var _=new XMLHttpRequest;_.open("GET",d,!0),_.responseType="arraybuffer",_.onload=()=>{_.status==200||_.status==0&&_.response?h(_.response):y()},_.onerror=y,_.send(null)});var N,R=console.log.bind(console),V=console.error.bind(console),H=R,j=V;if(Object.assign(c,$),$=null,m){let d=function(h){try{var y=h.data,_=y.cmd;if(_==="load"){let T=[];self.onmessage=P=>T.push(P),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let P of T)d(P);self.onmessage=d};for(let P of y.handlers)c[P]&&!c[P].proxy||(c[P]=(...z)=>{postMessage({Nb:"callHandler",pc:P,args:z})},P=="print"&&(H=c[P]),P=="printErr"&&(j=c[P]));ee=y.wasmMemory,Ae(),oe(y.wasmModule)}else if(_==="run"){vs(y.pthread_ptr,0,0,1,0,0),hs(y.pthread_ptr),uw(),Zc(),W||(jd(),W=!0);try{lw(y.start_routine,y.arg)}catch(T){if(T!="unwind")throw T}}else _==="cancel"?Hn()&&ti(-1):y.target!=="setimmediate"&&(_==="checkMailbox"?W&&Ho():_&&(j(`worker: received unknown command ${_}`),j(y)))}catch(T){throw Kd(),T}};var YE=d,oe,W=!1;j=function(...h){h=h.join(" "),console.error(h)},self.alert=function(...h){postMessage({Nb:"alert",text:h.join(" "),rc:Hn()})},c.instantiateWasm=(h,y)=>new Promise(_=>{oe=T=>{T=new WebAssembly.Instance(T,Hc()),y(T),_()}}),self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=d}c.wasmBinary&&(N=c.wasmBinary);var ee,Be,X,J,me,se,Fe,st,Ve,pe,F,re,De,pt=!1;function Ae(){var d=ee.buffer;c.HEAP8=J=new Int8Array(d),c.HEAP16=se=new Int16Array(d),c.HEAPU8=me=new Uint8Array(d),c.HEAPU16=Fe=new Uint16Array(d),c.HEAP32=st=new Int32Array(d),c.HEAPU32=Ve=new Uint32Array(d),c.HEAPF32=pe=new Float32Array(d),c.HEAPF64=De=new Float64Array(d),c.HEAP64=F=new BigInt64Array(d),c.HEAPU64=re=new BigUint64Array(d)}if(!m){if(!((ee=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof w))throw j("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Ae()}var Je=[],Ft=[],es=[],gn=0,ts=null,co=null;function Fc(){if(--gn==0&&(ts!==null&&(clearInterval(ts),ts=null),co)){var d=co;co=null,d()}}function Jr(d){throw j(d="Aborted("+d+")"),pt=!0,X=1,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),p(d),d}var rs,Vc=d=>d.startsWith("data:application/octet-stream;base64,"),Gc=d=>d.startsWith("file://");function Uc(d){if(d==rs&&N)return new Uint8Array(N);if(I)return I(d);throw"both async and sync fetching of the wasm failed"}function Wc(d,h,y){return function(_){if(!N&&(b||g)){if(typeof fetch=="function"&&!Gc(_))return fetch(_,{credentials:"same-origin"}).then(T=>{if(!T.ok)throw`failed to load wasm binary file at '${_}'`;return T.arrayBuffer()}).catch(()=>Uc(_));if(v)return new Promise((T,P)=>{v(_,z=>T(new Uint8Array(z)),P)})}return Promise.resolve().then(()=>Uc(_))}(d).then(_=>WebAssembly.instantiate(_,h)).then(y,_=>{j(`failed to asynchronously prepare wasm: ${_}`),Jr(_)})}function Hc(){return{a:{O:sw,Aa:aw,b:dw,aa:ed,B:nd,qa:od,Y:ad,_:sd,ra:ud,oa:ld,ha:cd,na:dd,L:pd,Z:fd,W:hd,pa:md,X:gd,va:pw,F:hw,Q:mw,P:bw,E:_w,u:vw,q:xw,G:ww,A:Pw,R:Ew,ua:Cw,ka:Dw,U:kw,ba:Nw,H:Lw,ja:hs,ta:Rw,t:zw,Ba:Mw,x:Vw,o:Gw,m:Ww,c:ps,n:Hw,k:Kw,w:Xw,p:Zw,f:Jw,s:Yw,l:Qw,e:eT,j:tT,i:rT,g:nT,d:oT,ea:iT,fa:aT,ga:sT,ca:Ed,da:Cd,T:uT,h:lT,D:cT,I:dT,M:pT,y:fT,sa:hT,V:mT,v:kd,z:gT,N:bT,S:yT,za:_T,ya:vT,la:Rd,ma:zd,$:ss,C:Md,K:Bd,ia:Fd,J:Vd,a:ee,xa:as,wa:Wd,r:TT}}}var ns={916804:(d,h,y,_,T)=>{if(c===void 0||!c.Fb)return 1;if((d=Ye(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=c.Fb.get(d)))return 2;if(h=Number(h>>>0),y=Number(y>>>0),_=Number(_>>>0),h+y>d.byteLength)return 3;try{let P=d.subarray(h,h+y);switch(T){case 0:r().set(P,_>>>0);break;case 1:c.dc(_,P);break;default:return 4}return 0}catch{return 4}},917519:(d,h,y)=>{c.ec(d,r().subarray(h>>>0,h+y>>>0))},917582:()=>c.bc(),917623:d=>{c.Pb(d)},917659:()=>{c.Wb()},917690:()=>{c.Xb()},917719:()=>{c.ac()},917744:d=>c.Vb(d),917777:d=>c.Zb(d),917809:(d,h,y)=>{c.Ob(Number(d),Number(h),Number(y),!0)},917872:(d,h,y)=>{c.Ob(Number(d),Number(h),Number(y))},917929:()=>typeof wasmOffsetConverter<"u",917986:d=>{c.kb("Abs",d,void 0)},918037:d=>{c.kb("Neg",d,void 0)},918088:d=>{c.kb("Floor",d,void 0)},918141:d=>{c.kb("Ceil",d,void 0)},918193:d=>{c.kb("Reciprocal",d,void 0)},918251:d=>{c.kb("Sqrt",d,void 0)},918303:d=>{c.kb("Exp",d,void 0)},918354:d=>{c.kb("Erf",d,void 0)},918405:d=>{c.kb("Sigmoid",d,void 0)},918460:(d,h,y)=>{c.kb("HardSigmoid",d,{alpha:h,beta:y})},918539:d=>{c.kb("Log",d,void 0)},918590:d=>{c.kb("Sin",d,void 0)},918641:d=>{c.kb("Cos",d,void 0)},918692:d=>{c.kb("Tan",d,void 0)},918743:d=>{c.kb("Asin",d,void 0)},918795:d=>{c.kb("Acos",d,void 0)},918847:d=>{c.kb("Atan",d,void 0)},918899:d=>{c.kb("Sinh",d,void 0)},918951:d=>{c.kb("Cosh",d,void 0)},919003:d=>{c.kb("Asinh",d,void 0)},919056:d=>{c.kb("Acosh",d,void 0)},919109:d=>{c.kb("Atanh",d,void 0)},919162:d=>{c.kb("Tanh",d,void 0)},919214:d=>{c.kb("Not",d,void 0)},919265:(d,h,y)=>{c.kb("Clip",d,{min:h,max:y})},919334:d=>{c.kb("Clip",d,void 0)},919386:(d,h)=>{c.kb("Elu",d,{alpha:h})},919444:d=>{c.kb("Gelu",d,void 0)},919496:d=>{c.kb("Relu",d,void 0)},919548:(d,h)=>{c.kb("LeakyRelu",d,{alpha:h})},919612:(d,h)=>{c.kb("ThresholdedRelu",d,{alpha:h})},919682:(d,h)=>{c.kb("Cast",d,{to:h})},919740:d=>{c.kb("Add",d,void 0)},919791:d=>{c.kb("Sub",d,void 0)},919842:d=>{c.kb("Mul",d,void 0)},919893:d=>{c.kb("Div",d,void 0)},919944:d=>{c.kb("Pow",d,void 0)},919995:d=>{c.kb("Equal",d,void 0)},920048:d=>{c.kb("Greater",d,void 0)},920103:d=>{c.kb("GreaterOrEqual",d,void 0)},920165:d=>{c.kb("Less",d,void 0)},920217:d=>{c.kb("LessOrEqual",d,void 0)},920276:(d,h,y,_,T)=>{c.kb("ReduceMean",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},920451:(d,h,y,_,T)=>{c.kb("ReduceMax",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},920625:(d,h,y,_,T)=>{c.kb("ReduceMin",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},920799:(d,h,y,_,T)=>{c.kb("ReduceProd",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},920974:(d,h,y,_,T)=>{c.kb("ReduceSum",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},921148:(d,h,y,_,T)=>{c.kb("ReduceL1",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},921321:(d,h,y,_,T)=>{c.kb("ReduceL2",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},921494:(d,h,y,_,T)=>{c.kb("ReduceLogSum",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},921671:(d,h,y,_,T)=>{c.kb("ReduceSumSquare",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},921851:(d,h,y,_,T)=>{c.kb("ReduceLogSumExp",d,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},922031:d=>{c.kb("Where",d,void 0)},922084:(d,h,y)=>{c.kb("Transpose",d,{perm:h?Array.from(i().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},922208:(d,h,y,_)=>{c.kb("DepthToSpace",d,{blocksize:h,mode:Ye(y),format:_?"NHWC":"NCHW"})},922341:(d,h,y,_)=>{c.kb("DepthToSpace",d,{blocksize:h,mode:Ye(y),format:_?"NHWC":"NCHW"})},922474:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L,we)=>{c.kb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:h,dilations:[y],group:_,kernelShape:[T],pads:[P,z],strides:[M],wIsConst:()=>!!e()[Y>>>0],outputPadding:ue?Array.from(i().subarray(Number(ue)>>>0,Number(Te)>>>0)):[],outputShape:ke?Array.from(i().subarray(Number(ke)>>>0,Number(L)>>>0)):[],activation:Ye(we)})},922907:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("ConvTranspose",d,{format:M?"NHWC":"NCHW",autoPad:h,dilations:Array.from(i().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:_,kernelShape:Array.from(i().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(i().subarray(Number(P)>>>0,4+(Number(P)>>>0)>>>0)),strides:Array.from(i().subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],outputShape:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[],activation:Ye(L)})},923568:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L,we)=>{c.kb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:h,dilations:[y],group:_,kernelShape:[T],pads:[P,z],strides:[M],wIsConst:()=>!!e()[Y>>>0],outputPadding:ue?Array.from(i().subarray(Number(ue)>>>0,Number(Te)>>>0)):[],outputShape:ke?Array.from(i().subarray(Number(ke)>>>0,Number(L)>>>0)):[],activation:Ye(we)})},924001:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("ConvTranspose",d,{format:M?"NHWC":"NCHW",autoPad:h,dilations:Array.from(i().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:_,kernelShape:Array.from(i().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(i().subarray(Number(P)>>>0,4+(Number(P)>>>0)>>>0)),strides:Array.from(i().subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],outputShape:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[],activation:Ye(L)})},924662:(d,h)=>{c.kb("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},924753:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("AveragePool",d,{format:L?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:_,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(K)>>>0)):[],pads:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[]})},925232:(d,h)=>{c.kb("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},925323:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("AveragePool",d,{format:L?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:_,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(K)>>>0)):[],pads:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[]})},925802:(d,h)=>{c.kb("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},925889:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("MaxPool",d,{format:L?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:_,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(K)>>>0)):[],pads:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[]})},926364:(d,h)=>{c.kb("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},926451:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L)=>{c.kb("MaxPool",d,{format:L?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:_,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(K)>>>0)):[],pads:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(ke)>>>0)):[]})},926926:(d,h,y,_,T)=>{c.kb("Gemm",d,{alpha:h,beta:y,transA:_,transB:T})},927030:d=>{c.kb("MatMul",d,void 0)},927084:(d,h,y,_)=>{c.kb("ArgMax",d,{keepDims:!!h,selectLastIndex:!!y,axis:_})},927192:(d,h,y,_)=>{c.kb("ArgMin",d,{keepDims:!!h,selectLastIndex:!!y,axis:_})},927300:(d,h)=>{c.kb("Softmax",d,{axis:h})},927363:(d,h)=>{c.kb("Concat",d,{axis:h})},927423:(d,h,y,_,T)=>{c.kb("Split",d,{axis:h,numOutputs:y,splitSizes:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},927579:d=>{c.kb("Expand",d,void 0)},927633:(d,h)=>{c.kb("Gather",d,{axis:Number(h)})},927704:(d,h)=>{c.kb("GatherElements",d,{axis:Number(h)})},927783:(d,h)=>{c.kb("GatherND",d,{batch_dims:Number(h)})},927862:(d,h,y,_,T,P,z,M,K,Y,ue)=>{c.kb("Resize",d,{antialias:h,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[],coordinateTransformMode:Ye(T),cubicCoeffA:P,excludeOutside:z,extrapolationValue:M,keepAspectRatioPolicy:Ye(K),mode:Ye(Y),nearestMode:Ye(ue)})},928224:(d,h,y,_,T,P,z)=>{c.kb("Slice",d,{starts:h?Array.from(i().subarray(Number(h)>>>0,Number(y)>>>0)):[],ends:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[],axes:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[]})},928488:d=>{c.kb("Tile",d,void 0)},928540:(d,h,y)=>{c.kb("InstanceNormalization",d,{epsilon:h,format:y?"NHWC":"NCHW"})},928654:(d,h,y)=>{c.kb("InstanceNormalization",d,{epsilon:h,format:y?"NHWC":"NCHW"})},928768:d=>{c.kb("Range",d,void 0)},928821:(d,h)=>{c.kb("Einsum",d,{equation:Ye(h)})},928902:(d,h,y,_,T)=>{c.kb("Pad",d,{mode:h,value:y,pads:_?Array.from(i().subarray(Number(_)>>>0,Number(T)>>>0)):[]})},929045:(d,h,y,_,T,P)=>{c.kb("BatchNormalization",d,{epsilon:h,momentum:y,spatial:!!T,trainingMode:!!_,format:P?"NHWC":"NCHW"})},929214:(d,h,y,_,T,P)=>{c.kb("BatchNormalization",d,{epsilon:h,momentum:y,spatial:!!T,trainingMode:!!_,format:P?"NHWC":"NCHW"})},929383:(d,h,y)=>{c.kb("CumSum",d,{exclusive:Number(h),reverse:Number(y)})},929480:(d,h,y)=>{c.kb("DequantizeLinear",d,{axis:h,blockSize:y})},929570:(d,h,y,_,T)=>{c.kb("GridSample",d,{align_corners:h,mode:Ye(y),padding_mode:Ye(_),format:T?"NHWC":"NCHW"})},929740:(d,h,y,_,T)=>{c.kb("GridSample",d,{align_corners:h,mode:Ye(y),padding_mode:Ye(_),format:T?"NHWC":"NCHW"})},929910:(d,h,y,_,T,P,z,M,K)=>{c.kb("Attention",d,{numHeads:h,isUnidirectional:y,maskFilterValue:_,scale:T,doRotary:P,qkvHiddenSizes:z?Array.from(i().subarray(Number(M)>>>0,Number(M)+z>>>0)):[],pastPresentShareBuffer:!!K})},930182:d=>{c.kb("BiasAdd",d,void 0)},930237:d=>{c.kb("BiasSplitGelu",d,void 0)},930298:d=>{c.kb("FastGelu",d,void 0)},930354:(d,h,y,_,T,P,z,M,K,Y,ue,Te,ke,L,we,Xe)=>{c.kb("Conv",d,{format:Te?"NHWC":"NCHW",auto_pad:h,dilations:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[],group:T,kernel_shape:P?Array.from(i().subarray(Number(P)>>>0,Number(z)>>>0)):[],pads:M?Array.from(i().subarray(Number(M)>>>0,Number(K)>>>0)):[],strides:Y?Array.from(i().subarray(Number(Y)>>>0,Number(ue)>>>0)):[],w_is_const:()=>!!e()[Number(ke)>>>0],activation:Ye(L),activation_params:we?Array.from(s().subarray(Number(we)>>>0,Number(Xe)>>>0)):[]})},930938:d=>{c.kb("Gelu",d,void 0)},930990:(d,h,y,_,T,P,z,M,K)=>{c.kb("GroupQueryAttention",d,{numHeads:h,kvNumHeads:y,scale:_,softcap:T,doRotary:P,rotaryInterleaved:z,smoothSoftmax:M,localWindowSize:K})},931207:(d,h,y,_)=>{c.kb("LayerNormalization",d,{axis:h,epsilon:y,simplified:!!_})},931318:(d,h,y,_)=>{c.kb("LayerNormalization",d,{axis:h,epsilon:y,simplified:!!_})},931429:(d,h,y,_,T,P)=>{c.kb("MatMulNBits",d,{k:h,n:y,accuracyLevel:_,bits:T,blockSize:P})},931556:(d,h,y,_,T,P)=>{c.kb("MultiHeadAttention",d,{numHeads:h,isUnidirectional:y,maskFilterValue:_,scale:T,doRotary:P})},931715:(d,h)=>{c.kb("QuickGelu",d,{alpha:h})},931779:(d,h,y,_,T)=>{c.kb("RotaryEmbedding",d,{interleaved:!!h,numHeads:y,rotaryEmbeddingDim:_,scale:T})},931918:(d,h,y)=>{c.kb("SkipLayerNormalization",d,{epsilon:h,simplified:!!y})},932020:(d,h,y)=>{c.kb("SkipLayerNormalization",d,{epsilon:h,simplified:!!y})},932122:(d,h,y,_)=>{c.kb("GatherBlockQuantized",d,{gatherAxis:h,quantizeAxis:y,blockSize:_})},932243:d=>{c.$b(d)},932277:(d,h)=>c.cc(Number(d),Number(h),c.Gb.hc,c.Gb.errors)};function aw(d,h,y){return Sd(async()=>{await c.Yb(Number(d),Number(h),Number(y))})}function sw(){return typeof wasmOffsetConverter<"u"}function os(d){this.name="ExitStatus",this.message=`Program terminated with exit(${d})`,this.status=d}var is=d=>{d.terminate(),d.onmessage=()=>{}},qc=d=>{Yr.length==0&&(Yc(),Jc(Yr[0]));var h=Yr.pop();if(!h)return 6;yn.push(h),Jt[d.Bb]=h,h.Bb=d.Bb;var y={cmd:"run",start_routine:d.ic,arg:d.Rb,pthread_ptr:d.Bb};return h.postMessage(y,d.nc),0},bn=0,He=(d,h,...y)=>{for(var _=2*y.length,T=Ts(),P=ws(8*_),z=P>>>3,M=0;M<y.length;M++){var K=y[M];typeof K=="bigint"?(F[z+2*M]=1n,F[z+2*M+1]=K):(F[z+2*M]=0n,u()[z+2*M+1>>>0]=K)}return d=Xd(d,0,_,P,h),ri(T),d};function as(d){if(m)return He(0,1,d);if(X=d,!(0<bn)){for(var h of yn)is(h);for(h of Yr)is(h);Yr=[],yn=[],Jt=[],pt=!0}O(0,new os(d))}function jc(d){if(m)return He(1,0,d);ss(d)}var ss=d=>{if(X=d,m)throw jc(d),"unwind";as(d)},Yr=[],yn=[],Kc=[],Jt={},Xc=d=>{var h=d.Bb;delete Jt[h],Yr.push(d),yn.splice(yn.indexOf(d),1),d.Bb=0,xs(h)};function Zc(){Kc.forEach(d=>d())}var Jc=d=>new Promise(h=>{d.onmessage=T=>{var P=(T=T.data).cmd;if(T.targetThread&&T.targetThread!=Hn()){var z=Jt[T.targetThread];z?z.postMessage(T,T.transferList):j(`Internal error! Worker sent a message "${P}" to target pthread ${T.targetThread}, but that thread no longer exists!`)}else P==="checkMailbox"?Ho():P==="spawnThread"?qc(T):P==="cleanupThread"?Xc(Jt[T.thread]):P==="killThread"?(T=T.thread,P=Jt[T],delete Jt[T],is(P),xs(T),yn.splice(yn.indexOf(P),1),P.Bb=0):P==="cancelThread"?Jt[T.thread].postMessage({cmd:"cancel"}):P==="loaded"?(d.loaded=!0,h(d)):P==="alert"?alert(`Thread ${T.threadId}: ${T.text}`):T.target==="setimmediate"?d.postMessage(T):P==="callHandler"?c[T.handler](...T.args):P&&j(`worker sent an unknown command ${P}`)},d.onerror=T=>{throw j(`worker sent an error! ${T.filename}:${T.lineno}: ${T.message}`),T};var y,_=[];for(y of[])c.hasOwnProperty(y)&&_.push(y);d.postMessage({cmd:"load",handlers:_,wasmMemory:ee,wasmModule:Be})});function Yc(){var d=new Worker(import.meta.url.startsWith("file:")?new URL("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});Yr.push(d)}var Wo=d=>{for(;0<d.length;)d.shift()(c)},uw=()=>{var d=Hn(),h=a()[d+52>>>2>>>0];d=a()[d+56>>>2>>>0],Jd(h,h-d),ri(h)},lw=(d,h)=>{bn=0,d=Yd(d,h),0<bn?X=d:ti(d)};class cw{constructor(h){this.Kb=h-24}}function dw(d,h,y){var _=new cw(d>>>=0);throw h>>>=0,y>>>=0,a()[_.Kb+16>>>2>>>0]=0,a()[_.Kb+4>>>2>>>0]=h,a()[_.Kb+8>>>2>>>0]=y,d}function Qc(d,h,y,_){return m?He(2,1,d,h,y,_):ed(d,h,y,_)}function ed(d,h,y,_){if(d>>>=0,h>>>=0,y>>>=0,_>>>=0,w===void 0)return j("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var T=[];return m&&T.length===0?Qc(d,h,y,_):(d={ic:y,Bb:d,Rb:_,nc:T},m?(d.Nb="spawnThread",postMessage(d,T),0):qc(d))}var td=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,rd=(d,h,y)=>{var _=(h>>>=0)+y;for(y=h;d[y]&&!(y>=_);)++y;if(16<y-h&&d.buffer&&td)return td.decode(d.buffer instanceof w?d.slice(h,y):d.subarray(h,y));for(_="";h<y;){var T=d[h++];if(128&T){var P=63&d[h++];if((224&T)==192)_+=String.fromCharCode((31&T)<<6|P);else{var z=63&d[h++];65536>(T=(240&T)==224?(15&T)<<12|P<<6|z:(7&T)<<18|P<<12|z<<6|63&d[h++])?_+=String.fromCharCode(T):(T-=65536,_+=String.fromCharCode(55296|T>>10,56320|1023&T))}}else _+=String.fromCharCode(T)}return _},Ye=(d,h)=>(d>>>=0)?rd(r(),d,h):"";function nd(d,h,y){return m?He(3,1,d,h,y):0}function od(d,h){if(m)return He(4,1,d,h)}var us=d=>{for(var h=0,y=0;y<d.length;++y){var _=d.charCodeAt(y);127>=_?h++:2047>=_?h+=2:55296<=_&&57343>=_?(h+=4,++y):h+=3}return h},id=(d,h,y,_)=>{if(!(0<_))return 0;var T=y>>>=0;_=y+_-1;for(var P=0;P<d.length;++P){var z=d.charCodeAt(P);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&d.charCodeAt(++P)),127>=z){if(y>=_)break;h[y++>>>0]=z}else{if(2047>=z){if(y+1>=_)break;h[y++>>>0]=192|z>>6}else{if(65535>=z){if(y+2>=_)break;h[y++>>>0]=224|z>>12}else{if(y+3>=_)break;h[y++>>>0]=240|z>>18,h[y++>>>0]=128|z>>12&63}h[y++>>>0]=128|z>>6&63}h[y++>>>0]=128|63&z}}return h[y>>>0]=0,y-T},Gn=(d,h,y)=>id(d,r(),h,y);function ad(d,h){if(m)return He(5,1,d,h)}function sd(d,h,y){if(m)return He(6,1,d,h,y)}function ud(d,h,y){return m?He(7,1,d,h,y):0}function ld(d,h){if(m)return He(8,1,d,h)}function cd(d,h,y){if(m)return He(9,1,d,h,y)}function dd(d,h,y,_){if(m)return He(10,1,d,h,y,_)}function pd(d,h,y,_){if(m)return He(11,1,d,h,y,_)}function fd(d,h,y,_){if(m)return He(12,1,d,h,y,_)}function hd(d){if(m)return He(13,1,d)}function md(d,h){if(m)return He(14,1,d,h)}function gd(d,h,y){if(m)return He(15,1,d,h,y)}var bd,Qr,pw=()=>{Jr("")},Yt=d=>{for(var h="";r()[d>>>0];)h+=bd[r()[d++>>>0]];return h},ls={},cs={},fw={};function Hr(d,h,y={}){if(!("argPackAdvance"in h))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(_,T,P={}){var z=T.name;if(!_)throw new Qr(`type "${z}" must have a positive integer typeid pointer`);if(cs.hasOwnProperty(_)){if(P.Tb)return;throw new Qr(`Cannot register type '${z}' twice`)}cs[_]=T,delete fw[_],ls.hasOwnProperty(_)&&(T=ls[_],delete ls[_],T.forEach(M=>M()))}(d,h,y)}var yd=(d,h,y)=>{switch(h){case 1:return y?_=>e()[_>>>0]:_=>r()[_>>>0];case 2:return y?_=>t()[_>>>1>>>0]:_=>o()[_>>>1>>>0];case 4:return y?_=>i()[_>>>2>>>0]:_=>a()[_>>>2>>>0];case 8:return y?_=>F[_>>>3]:_=>re[_>>>3];default:throw new TypeError(`invalid integer width (${h}): ${d}`)}};function hw(d,h,y){y>>>=0,Hr(d>>>=0,{name:h=Yt(h>>>0),fromWireType:_=>_,toWireType:function(_,T){if(typeof T!="bigint"&&typeof T!="number")throw T=T===null?"null":(_=typeof T)=="object"||_==="array"||_==="function"?T.toString():""+T,new TypeError(`Cannot convert "${T}" to ${this.name}`);return typeof T=="number"&&(T=BigInt(T)),T},argPackAdvance:en,readValueFromPointer:yd(h,y,h.indexOf("u")==-1),Eb:null})}var en=8;function mw(d,h,y,_){Hr(d>>>=0,{name:h=Yt(h>>>0),fromWireType:function(T){return!!T},toWireType:function(T,P){return P?y:_},argPackAdvance:en,readValueFromPointer:function(T){return this.fromWireType(r()[T>>>0])},Eb:null})}var ds=[],qr=[];function ps(d){9<(d>>>=0)&&--qr[d+1]==0&&(qr[d]=void 0,ds.push(d))}var Tt=d=>{if(!d)throw new Qr("Cannot use deleted val. handle = "+d);return qr[d]},Pt=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=ds.pop()||qr.length;return qr[h]=d,qr[h+1]=1,h}};function fs(d){return this.fromWireType(a()[d>>>2>>>0])}var gw={name:"emscripten::val",fromWireType:d=>{var h=Tt(d);return ps(d),h},toWireType:(d,h)=>Pt(h),argPackAdvance:en,readValueFromPointer:fs,Eb:null};function bw(d){return Hr(d>>>0,gw)}var yw=(d,h)=>{switch(h){case 4:return function(y){return this.fromWireType(s()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(u()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${d}`)}};function _w(d,h,y){y>>>=0,Hr(d>>>=0,{name:h=Yt(h>>>0),fromWireType:_=>_,toWireType:(_,T)=>T,argPackAdvance:en,readValueFromPointer:yw(h,y),Eb:null})}function vw(d,h,y,_,T){if(d>>>=0,y>>>=0,h=Yt(h>>>0),T===-1&&(T=4294967295),T=M=>M,_===0){var P=32-8*y;T=M=>M<<P>>>P}var z=h.includes("unsigned")?function(M,K){return K>>>0}:function(M,K){return K};Hr(d,{name:h,fromWireType:T,toWireType:z,argPackAdvance:en,readValueFromPointer:yd(h,y,_!==0),Eb:null})}function xw(d,h,y){function _(P){var z=a()[P>>>2>>>0];return P=a()[P+4>>>2>>>0],new T(e().buffer,P,z)}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];Hr(d>>>=0,{name:y=Yt(y>>>0),fromWireType:_,argPackAdvance:en,readValueFromPointer:_},{Tb:!0})}function ww(d,h){d>>>=0;var y=(h=Yt(h>>>0))==="std::string";Hr(d,{name:h,fromWireType:function(_){var T=a()[_>>>2>>>0],P=_+4;if(y)for(var z=P,M=0;M<=T;++M){var K=P+M;if(M==T||r()[K>>>0]==0){if(z=Ye(z,K-z),Y===void 0)var Y=z;else Y+=String.fromCharCode(0),Y+=z;z=K+1}}else{for(Y=Array(T),M=0;M<T;++M)Y[M]=String.fromCharCode(r()[P+M>>>0]);Y=Y.join("")}return er(_),Y},toWireType:function(_,T){T instanceof ArrayBuffer&&(T=new Uint8Array(T));var P=typeof T=="string";if(!(P||T instanceof Uint8Array||T instanceof Uint8ClampedArray||T instanceof Int8Array))throw new Qr("Cannot pass non-string to std::string");var z=y&&P?us(T):T.length,M=ei(4+z+1),K=M+4;if(a()[M>>>2>>>0]=z,y&&P)Gn(T,K,z+1);else if(P)for(P=0;P<z;++P){var Y=T.charCodeAt(P);if(255<Y)throw er(K),new Qr("String has UTF-16 code units that do not fit in 8 bits");r()[K+P>>>0]=Y}else for(P=0;P<z;++P)r()[K+P>>>0]=T[P];return _!==null&&_.push(er,M),M},argPackAdvance:en,readValueFromPointer:fs,Eb(_){er(_)}})}var _d=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Tw=(d,h)=>{for(var y=d>>1,_=y+h/2;!(y>=_)&&o()[y>>>0];)++y;if(32<(y<<=1)-d&&_d)return _d.decode(r().slice(d,y));for(y="",_=0;!(_>=h/2);++_){var T=t()[d+2*_>>>1>>>0];if(T==0)break;y+=String.fromCharCode(T)}return y},Iw=(d,h,y)=>{if(y??=2147483647,2>y)return 0;var _=h;y=(y-=2)<2*d.length?y/2:d.length;for(var T=0;T<y;++T){var P=d.charCodeAt(T);t()[h>>>1>>>0]=P,h+=2}return t()[h>>>1>>>0]=0,h-_},Sw=d=>2*d.length,$w=(d,h)=>{for(var y=0,_="";!(y>=h/4);){var T=i()[d+4*y>>>2>>>0];if(T==0)break;++y,65536<=T?(T-=65536,_+=String.fromCharCode(55296|T>>10,56320|1023&T)):_+=String.fromCharCode(T)}return _},Aw=(d,h,y)=>{if(h>>>=0,y??=2147483647,4>y)return 0;var _=h;y=_+y-4;for(var T=0;T<d.length;++T){var P=d.charCodeAt(T);if(55296<=P&&57343>=P&&(P=65536+((1023&P)<<10)|1023&d.charCodeAt(++T)),i()[h>>>2>>>0]=P,(h+=4)+4>y)break}return i()[h>>>2>>>0]=0,h-_},Ow=d=>{for(var h=0,y=0;y<d.length;++y){var _=d.charCodeAt(y);55296<=_&&57343>=_&&++y,h+=4}return h};function Pw(d,h,y){if(d>>>=0,h>>>=0,y=Yt(y>>>=0),h===2)var _=Tw,T=Iw,P=Sw,z=M=>o()[M>>>1>>>0];else h===4&&(_=$w,T=Aw,P=Ow,z=M=>a()[M>>>2>>>0]);Hr(d,{name:y,fromWireType:M=>{for(var K,Y=a()[M>>>2>>>0],ue=M+4,Te=0;Te<=Y;++Te){var ke=M+4+Te*h;Te!=Y&&z(ke)!=0||(ue=_(ue,ke-ue),K===void 0?K=ue:(K+=String.fromCharCode(0),K+=ue),ue=ke+h)}return er(M),K},toWireType:(M,K)=>{if(typeof K!="string")throw new Qr(`Cannot pass non-string to C++ string type ${y}`);var Y=P(K),ue=ei(4+Y+h);return a()[ue>>>2>>>0]=Y/h,T(K,ue+4,Y+h),M!==null&&M.push(er,ue),ue},argPackAdvance:en,readValueFromPointer:fs,Eb(M){er(M)}})}function Ew(d,h){Hr(d>>>=0,{Ub:!0,name:h=Yt(h>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Cw=()=>1;function Dw(d){vs(d>>>0,!g,1,!b,131072,!1),Zc()}var vd=d=>{if(!pt)try{if(d(),!(0<bn))try{m?ti(X):ss(X)}catch(h){h instanceof os||h=="unwind"||O(0,h)}}catch(h){h instanceof os||h=="unwind"||O(0,h)}};function hs(d){d>>>=0,typeof Atomics.oc=="function"&&(Atomics.oc(i(),d>>>2,d).value.then(Ho),d+=128,Atomics.store(i(),d>>>2,1))}var Ho=()=>{var d=Hn();d&&(hs(d),vd(Zd))};function kw(d,h){(d>>>=0)==h>>>0?setTimeout(Ho):m?postMessage({targetThread:d,cmd:"checkMailbox"}):(d=Jt[d])&&d.postMessage({cmd:"checkMailbox"})}var ms=[];function Nw(d,h,y,_,T){for(h>>>=0,_/=2,ms.length=_,y=T>>>0>>>3,T=0;T<_;T++)ms[T]=F[y+2*T]?F[y+2*T+1]:u()[y+2*T+1>>>0];return(h?ns[h]:IT[d])(...ms)}function Lw(d){d>>>=0,m?postMessage({cmd:"cleanupThread",thread:d}):Xc(Jt[d])}function Rw(d){}var qo=(d,h)=>{var y=cs[d];if(y===void 0)throw d=qd(d),y=Yt(d),er(d),new Qr(`${h} has unknown type ${y}`);return y},xd=(d,h,y)=>{var _=[];return d=d.toWireType(_,y),_.length&&(a()[h>>>2>>>0]=Pt(_)),d};function zw(d,h,y){return h>>>=0,y>>>=0,d=Tt(d>>>0),h=qo(h,"emval::as"),xd(h,y,d)}function Mw(d,h){return h>>>=0,d=Tt(d>>>0),(h=qo(h,"emval::as")).toWireType(null,d)}var jo=d=>{try{d()}catch(h){Jr(h)}},tn=0,Qt=null,wd=0,Ko=[],Td={},Id={},Bw=0,gs=null,Fw=[];function Sd(d){return function(h){if(!pt){if(tn===0){var y=!1,_=!1;h((T=0)=>{if(!pt&&(wd=T,y=!0,_)){tn=2,jo(()=>tp(Qt)),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.resume(),T=!1;try{var P=function(){var K=i()[Qt+8>>>2>>>0];return K=ie[Id[K]],--bn,K()}()}catch(K){P=K,T=!0}var z=!1;if(!Qt){var M=gs;M&&(gs=null,(T?M.reject:M.resolve)(P),z=!0)}if(T&&!z)throw P}}),_=!0,y||(tn=1,Qt=function(){var T=ei(65548),P=T+12;a()[T>>>2>>>0]=P,a()[T+4>>>2>>>0]=P+65536,P=Ko[0];var z=Td[P];return z===void 0&&(z=Bw++,Td[P]=z,Id[z]=P),P=z,i()[T+8>>>2>>>0]=P,T}(),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.pause(),jo(()=>Qd(Qt)))}else tn===2?(tn=0,jo(rp),er(Qt),Qt=null,Fw.forEach(vd)):Jr(`invalid state: ${tn}`);return wd}}(h=>{d().then(h)})}function Vw(d){return d>>>=0,Sd(()=>(d=Tt(d)).then(Pt))}var Xo=[];function Gw(d,h,y,_){return y>>>=0,_>>>=0,(d=Xo[d>>>0])(null,h=Tt(h>>>0),y,_)}var Uw={},Zo=d=>{var h=Uw[d];return h===void 0?Yt(d):h};function Ww(d,h,y,_,T){return y>>>=0,_>>>=0,T>>>=0,(d=Xo[d>>>0])(h=Tt(h>>>0),h[y=Zo(y)],_,T)}var $d=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Hw(d){return(d>>>=0)==0?Pt($d()):(d=Zo(d),Pt($d()[d]))}var qw=d=>{var h=Xo.length;return Xo.push(d),h},jw=(d,h)=>{for(var y=Array(d),_=0;_<d;++_)y[_]=qo(a()[h+4*_>>>2>>>0],"parameter "+_);return y},Ad=(d,h)=>Object.defineProperty(h,"name",{value:d});function Kw(d,h,y){var _=(h=jw(d,h>>>0)).shift();d--;var T=`return function (obj, func, destructorsRef, args) {
`,P=0,z=[];y===0&&z.push("obj");for(var M=["retType"],K=[_],Y=0;Y<d;++Y)z.push("arg"+Y),M.push("argType"+Y),K.push(h[Y]),T+=`  var arg${Y} = argType${Y}.readValueFromPointer(args${P?"+"+P:""});
`,P+=h[Y].argPackAdvance;return T+=`  var rv = ${y===1?"new func":"func.call"}(${z.join(", ")});
`,_.Ub||(M.push("emval_returnValue"),K.push(xd),T+=`  return emval_returnValue(retType, destructorsRef, rv);
`),M.push(T+`};
`),d=function(ue){var Te=Function;if(!(Te instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Te} which is not a function`);var ke=Ad(Te.name||"unknownFunctionName",function(){});return ke.prototype=Te.prototype,ke=new ke,(ue=Te.apply(ke,ue))instanceof Object?ue:ke}(M)(...K),y=`methodCaller<(${h.map(ue=>ue.name).join(", ")}) => ${_.name}>`,qw(Ad(y,d))}function Xw(d){return d=Zo(d>>>0),Pt(c[d])}function Zw(d,h){return h>>>=0,d=Tt(d>>>0),h=Tt(h),Pt(d[h])}function Jw(d){9<(d>>>=0)&&(qr[d+1]+=1)}function Yw(){return Pt([])}function Qw(d){d=Tt(d>>>0);for(var h=Array(d.length),y=0;y<d.length;y++)h[y]=d[y];return Pt(h)}function eT(d){return Pt(Zo(d>>>0))}function tT(){return Pt({})}function rT(d){for(var h=Tt(d>>>=0);h.length;){var y=h.pop();h.pop()(y)}ps(d)}function nT(d,h,y){h>>>=0,y>>>=0,d=Tt(d>>>0),h=Tt(h),y=Tt(y),d[h]=y}function oT(d,h){return h>>>=0,d=(d=qo(d>>>0,"_emval_take_value")).readValueFromPointer(h),Pt(d)}function iT(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),i()[h>>>2>>>0]=d.getUTCSeconds(),i()[h+4>>>2>>>0]=d.getUTCMinutes(),i()[h+8>>>2>>>0]=d.getUTCHours(),i()[h+12>>>2>>>0]=d.getUTCDate(),i()[h+16>>>2>>>0]=d.getUTCMonth(),i()[h+20>>>2>>>0]=d.getUTCFullYear()-1900,i()[h+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[h+28>>>2>>>0]=d}var Un=d=>d%4==0&&(d%100!=0||d%400==0),Od=[0,31,60,91,121,152,182,213,244,274,305,335],Pd=[0,31,59,90,120,151,181,212,243,273,304,334];function aT(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),i()[h>>>2>>>0]=d.getSeconds(),i()[h+4>>>2>>>0]=d.getMinutes(),i()[h+8>>>2>>>0]=d.getHours(),i()[h+12>>>2>>>0]=d.getDate(),i()[h+16>>>2>>>0]=d.getMonth(),i()[h+20>>>2>>>0]=d.getFullYear()-1900,i()[h+24>>>2>>>0]=d.getDay();var y=(Un(d.getFullYear())?Od:Pd)[d.getMonth()]+d.getDate()-1|0;i()[h+28>>>2>>>0]=y,i()[h+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var _=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=_&&d.getTimezoneOffset()==Math.min(_,y)),i()[h+32>>>2>>>0]=d}function sT(d){d>>>=0;var h=new Date(i()[d+20>>>2>>>0]+1900,i()[d+16>>>2>>>0],i()[d+12>>>2>>>0],i()[d+8>>>2>>>0],i()[d+4>>>2>>>0],i()[d>>>2>>>0],0),y=i()[d+32>>>2>>>0],_=h.getTimezoneOffset(),T=new Date(h.getFullYear(),6,1).getTimezoneOffset(),P=new Date(h.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(P,T);return 0>y?i()[d+32>>>2>>>0]=+(T!=P&&z==_):0<y!=(z==_)&&(T=Math.max(P,T),h.setTime(h.getTime()+6e4*((0<y?z:T)-_))),i()[d+24>>>2>>>0]=h.getDay(),y=(Un(h.getFullYear())?Od:Pd)[h.getMonth()]+h.getDate()-1|0,i()[d+28>>>2>>>0]=y,i()[d>>>2>>>0]=h.getSeconds(),i()[d+4>>>2>>>0]=h.getMinutes(),i()[d+8>>>2>>>0]=h.getHours(),i()[d+12>>>2>>>0]=h.getDate(),i()[d+16>>>2>>>0]=h.getMonth(),i()[d+20>>>2>>>0]=h.getYear(),d=h.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function Ed(d,h,y,_,T,P,z){return m?He(16,1,d,h,y,_,T,P,z):-52}function Cd(d,h,y,_,T,P){if(m)return He(17,1,d,h,y,_,T,P)}function uT(d,h,y,_){d>>>=0,h>>>=0,y>>>=0,_>>>=0;var T=new Date().getFullYear(),P=new Date(T,0,1),z=new Date(T,6,1);T=P.getTimezoneOffset();var M=z.getTimezoneOffset(),K=Math.max(T,M);a()[d>>>2>>>0]=60*K,i()[h>>>2>>>0]=+(T!=M),P=(d=Y=>Y.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(P),z=d(z),M<T?(Gn(P,y,17),Gn(z,_,17)):(Gn(P,_,17),Gn(z,y,17))}var bs=[],Dd=(d,h)=>{bs.length=0;for(var y;y=r()[d++>>>0];){var _=y!=105;h+=(_&=y!=112)&&h%8?4:0,bs.push(y==112?a()[h>>>2>>>0]:y==106?F[h>>>3]:y==105?i()[h>>>2>>>0]:u()[h>>>3>>>0]),h+=_?8:4}return bs};function lT(d,h,y){return d>>>=0,h=Dd(h>>>0,y>>>0),ns[d](...h)}function cT(d,h,y){return d>>>=0,h=Dd(h>>>0,y>>>0),ns[d](...h)}var dT=()=>{},pT=()=>Date.now();function fT(d,h){return j(Ye(d>>>0,h>>>0))}var kd,hT=()=>{throw bn+=1,"unwind"};function mT(){return 4294901760}kd=()=>performance.timeOrigin+performance.now();var gT=()=>navigator.hardwareConcurrency;function bT(){return Jr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function yT(d){d>>>=0;var h=r().length;if(d<=h||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var _=h*(1+.2/y);_=Math.min(_,d+100663296);var T=Math;_=Math.max(d,_);e:{T=(T.min.call(T,4294901760,_+(65536-_%65536)%65536)-ee.buffer.byteLength+65535)/65536;try{ee.grow(T),Ae();var P=1;break e}catch{}P=void 0}if(P)return!0}return!1}var Jo=()=>(Jr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Wn={},Nd=d=>{d.forEach(h=>{var y=Jo();y&&(Wn[y]=h)})};function _T(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Nd(d),Wn.Qb=Jo(),Wn.fc=d,Wn.Qb}function vT(d,h,y){if(d>>>=0,h>>>=0,Wn.Qb==d)var _=Wn.fc;else(_=Error().stack.toString().split(`
`))[0]=="Error"&&_.shift(),Nd(_);for(var T=3;_[T]&&Jo()!=d;)++T;for(d=0;d<y&&_[d+T];++d)i()[h+4*d>>>2>>>0]=Jo();return d}var ys,_s={},Ld=()=>{if(!ys){var d,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in _s)_s[d]===void 0?delete h[d]:h[d]=_s[d];var y=[];for(d in h)y.push(`${d}=${h[d]}`);ys=y}return ys};function Rd(d,h){if(m)return He(18,1,d,h);d>>>=0,h>>>=0;var y=0;return Ld().forEach((_,T)=>{var P=h+y;for(T=a()[d+4*T>>>2>>>0]=P,P=0;P<_.length;++P)e()[T++>>>0]=_.charCodeAt(P);e()[T>>>0]=0,y+=_.length+1}),0}function zd(d,h){if(m)return He(19,1,d,h);d>>>=0,h>>>=0;var y=Ld();a()[d>>>2>>>0]=y.length;var _=0;return y.forEach(T=>_+=T.length+1),a()[h>>>2>>>0]=_,0}function Md(d){return m?He(20,1,d):52}function Bd(d,h,y,_){return m?He(21,1,d,h,y,_):52}function Fd(d,h,y,_){return m?He(22,1,d,h,y,_):70}var xT=[null,[],[]];function Vd(d,h,y,_){if(m)return He(23,1,d,h,y,_);h>>>=0,y>>>=0,_>>>=0;for(var T=0,P=0;P<y;P++){var z=a()[h>>>2>>>0],M=a()[h+4>>>2>>>0];h+=8;for(var K=0;K<M;K++){var Y=r()[z+K>>>0],ue=xT[d];Y===0||Y===10?((d===1?H:j)(rd(ue,0)),ue.length=0):ue.push(Y)}T+=M}return a()[_>>>2>>>0]=T,0}var Gd=[31,29,31,30,31,30,31,31,30,31,30,31],Ud=[31,28,31,30,31,30,31,31,30,31,30,31],wT=(d,h)=>{e().set(d,h>>>0)};function Wd(d,h,y,_){function T(L,we,Xe){for(L=typeof L=="number"?L.toString():L||"";L.length<we;)L=Xe[0]+L;return L}function P(L,we){return T(L,we,"0")}function z(L,we){function Xe(op){return 0>op?-1:0<op?1:0}var _n;return(_n=Xe(L.getFullYear()-we.getFullYear()))===0&&(_n=Xe(L.getMonth()-we.getMonth()))===0&&(_n=Xe(L.getDate()-we.getDate())),_n}function M(L){switch(L.getDay()){case 0:return new Date(L.getFullYear()-1,11,29);case 1:return L;case 2:return new Date(L.getFullYear(),0,3);case 3:return new Date(L.getFullYear(),0,2);case 4:return new Date(L.getFullYear(),0,1);case 5:return new Date(L.getFullYear()-1,11,31);case 6:return new Date(L.getFullYear()-1,11,30)}}function K(L){var we=L.Cb;for(L=new Date(new Date(L.Db+1900,0,1).getTime());0<we;){var Xe=L.getMonth(),_n=(Un(L.getFullYear())?Gd:Ud)[Xe];if(!(we>_n-L.getDate())){L.setDate(L.getDate()+we);break}we-=_n-L.getDate()+1,L.setDate(1),11>Xe?L.setMonth(Xe+1):(L.setMonth(0),L.setFullYear(L.getFullYear()+1))}return Xe=new Date(L.getFullYear()+1,0,4),we=M(new Date(L.getFullYear(),0,4)),Xe=M(Xe),0>=z(we,L)?0>=z(Xe,L)?L.getFullYear()+1:L.getFullYear():L.getFullYear()-1}d>>>=0,h>>>=0,y>>>=0,_>>>=0;var Y=a()[_+40>>>2>>>0];for(var ue in _={lc:i()[_>>>2>>>0],kc:i()[_+4>>>2>>>0],Ib:i()[_+8>>>2>>>0],Mb:i()[_+12>>>2>>>0],Jb:i()[_+16>>>2>>>0],Db:i()[_+20>>>2>>>0],vb:i()[_+24>>>2>>>0],Cb:i()[_+28>>>2>>>0],sc:i()[_+32>>>2>>>0],jc:i()[_+36>>>2>>>0],mc:Y?Ye(Y):""},y=Ye(y),Y={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})y=y.replace(new RegExp(ue,"g"),Y[ue]);var Te="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ke="January February March April May June July August September October November December".split(" ");for(ue in Y={"%a":L=>Te[L.vb].substring(0,3),"%A":L=>Te[L.vb],"%b":L=>ke[L.Jb].substring(0,3),"%B":L=>ke[L.Jb],"%C":L=>P((L.Db+1900)/100|0,2),"%d":L=>P(L.Mb,2),"%e":L=>T(L.Mb,2," "),"%g":L=>K(L).toString().substring(2),"%G":K,"%H":L=>P(L.Ib,2),"%I":L=>((L=L.Ib)==0?L=12:12<L&&(L-=12),P(L,2)),"%j":L=>{for(var we=0,Xe=0;Xe<=L.Jb-1;we+=(Un(L.Db+1900)?Gd:Ud)[Xe++]);return P(L.Mb+we,3)},"%m":L=>P(L.Jb+1,2),"%M":L=>P(L.kc,2),"%n":()=>`
`,"%p":L=>0<=L.Ib&&12>L.Ib?"AM":"PM","%S":L=>P(L.lc,2),"%t":()=>"	","%u":L=>L.vb||7,"%U":L=>P(Math.floor((L.Cb+7-L.vb)/7),2),"%V":L=>{var we=Math.floor((L.Cb+7-(L.vb+6)%7)/7);if(2>=(L.vb+371-L.Cb-2)%7&&we++,we)we==53&&((Xe=(L.vb+371-L.Cb)%7)==4||Xe==3&&Un(L.Db)||(we=1));else{we=52;var Xe=(L.vb+7-L.Cb-1)%7;(Xe==4||Xe==5&&Un(L.Db%400-1))&&we++}return P(we,2)},"%w":L=>L.vb,"%W":L=>P(Math.floor((L.Cb+7-(L.vb+6)%7)/7),2),"%y":L=>(L.Db+1900).toString().substring(2),"%Y":L=>L.Db+1900,"%z":L=>{var we=0<=(L=L.jc);return L=Math.abs(L)/60,(we?"+":"-")+("0000"+(L/60*100+L%60)).slice(-4)},"%Z":L=>L.mc,"%%":()=>"%"},y=y.replace(/%%/g,"\0\0"),Y)y.includes(ue)&&(y=y.replace(new RegExp(ue,"g"),Y[ue](_)));return ue=function(L){var we=Array(us(L)+1);return id(L,we,0,we.length),we}(y=y.replace(/\0\0/g,"%")),ue.length>h?0:(wT(ue,d),ue.length-1)}function TT(d,h,y,_){return Wd(d>>>0,h>>>0,y>>>0,_>>>0)}m||function(){for(var d=c.numThreads-1;d--;)Yc();Je.unshift(()=>{gn++,function(h){m?h():Promise.all(Yr.map(Jc)).then(h)}(()=>Fc())})}();for(var Hd=Array(256),Yo=0;256>Yo;++Yo)Hd[Yo]=String.fromCharCode(Yo);bd=Hd,Qr=c.BindingError=class extends Error{constructor(d){super(d),this.name="BindingError"}},c.InternalError=class extends Error{constructor(d){super(d),this.name="InternalError"}},qr.push(0,1,void 0,1,null,1,!0,1,!1,1),c.count_emval_handles=()=>qr.length/2-5-ds.length;var IT=[as,jc,Qc,nd,od,ad,sd,ud,ld,cd,dd,pd,fd,hd,md,gd,Ed,Cd,Rd,zd,Md,Bd,Fd,Vd],ie=function(){function d(y,_){return ie=y.exports,ie=function(){var T=ie,P={};for(let[z,M]of Object.entries(T))P[z]=typeof M=="function"?(...K)=>{Ko.push(z);try{return M(...K)}finally{pt||(Ko.pop(),Qt&&tn===1&&Ko.length===0&&(tn=0,bn+=1,jo(ep),typeof Fibers<"u"&&Fibers.tc()))}}:M;return P}(),ie=function(){var T=ie,P=M=>K=>M(K)>>>0,z=M=>()=>M()>>>0;return(T=Object.assign({},T)).Da=P(T.Da),T.gb=z(T.gb),T.ib=P(T.ib),T.emscripten_main_runtime_thread_id=z(T.emscripten_main_runtime_thread_id),T.tb=P(T.tb),T.ub=z(T.ub),T}(),Kc.push(ie.jb),Ft.unshift(ie.Ca),Be=_,Fc(),ie}var h=Hc();if(gn++,c.instantiateWasm)try{return c.instantiateWasm(h,d)}catch(y){j(`Module.instantiateWasm callback failed with error: ${y}`),p(y)}return rs||=c.locateFile?Vc("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":c.locateFile?c.locateFile("ort-wasm-simd-threaded.jsep.wasm",E):E+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(y,_){var T=rs;return N||typeof WebAssembly.instantiateStreaming!="function"||Vc(T)||Gc(T)||typeof fetch!="function"?Wc(T,y,_):fetch(T,{credentials:"same-origin"}).then(P=>WebAssembly.instantiateStreaming(P,y).then(_,function(z){return j(`wasm streaming compile failed: ${z}`),j("falling back to ArrayBuffer instantiation"),Wc(T,y,_)}))}(h,function(y){d(y.instance,y.module)}).catch(p),{}}(),qd=d=>(qd=ie.Da)(d),jd=()=>(jd=ie.Ea)();c._OrtInit=(d,h)=>(c._OrtInit=ie.Fa)(d,h),c._OrtGetLastError=(d,h)=>(c._OrtGetLastError=ie.Ga)(d,h),c._OrtCreateSessionOptions=(d,h,y,_,T,P,z,M,K,Y)=>(c._OrtCreateSessionOptions=ie.Ha)(d,h,y,_,T,P,z,M,K,Y),c._OrtAppendExecutionProvider=(d,h)=>(c._OrtAppendExecutionProvider=ie.Ia)(d,h),c._OrtAddFreeDimensionOverride=(d,h,y)=>(c._OrtAddFreeDimensionOverride=ie.Ja)(d,h,y),c._OrtAddSessionConfigEntry=(d,h,y)=>(c._OrtAddSessionConfigEntry=ie.Ka)(d,h,y),c._OrtReleaseSessionOptions=d=>(c._OrtReleaseSessionOptions=ie.La)(d),c._OrtCreateSession=(d,h,y)=>(c._OrtCreateSession=ie.Ma)(d,h,y),c._OrtReleaseSession=d=>(c._OrtReleaseSession=ie.Na)(d),c._OrtGetInputOutputCount=(d,h,y)=>(c._OrtGetInputOutputCount=ie.Oa)(d,h,y),c._OrtGetInputName=(d,h)=>(c._OrtGetInputName=ie.Pa)(d,h),c._OrtGetOutputName=(d,h)=>(c._OrtGetOutputName=ie.Qa)(d,h),c._OrtFree=d=>(c._OrtFree=ie.Ra)(d),c._OrtCreateTensor=(d,h,y,_,T,P)=>(c._OrtCreateTensor=ie.Sa)(d,h,y,_,T,P),c._OrtGetTensorData=(d,h,y,_,T)=>(c._OrtGetTensorData=ie.Ta)(d,h,y,_,T),c._OrtReleaseTensor=d=>(c._OrtReleaseTensor=ie.Ua)(d),c._OrtCreateRunOptions=(d,h,y,_)=>(c._OrtCreateRunOptions=ie.Va)(d,h,y,_),c._OrtAddRunConfigEntry=(d,h,y)=>(c._OrtAddRunConfigEntry=ie.Wa)(d,h,y),c._OrtReleaseRunOptions=d=>(c._OrtReleaseRunOptions=ie.Xa)(d),c._OrtCreateBinding=d=>(c._OrtCreateBinding=ie.Ya)(d),c._OrtBindInput=(d,h,y)=>(c._OrtBindInput=ie.Za)(d,h,y),c._OrtBindOutput=(d,h,y,_)=>(c._OrtBindOutput=ie._a)(d,h,y,_),c._OrtClearBoundOutputs=d=>(c._OrtClearBoundOutputs=ie.$a)(d),c._OrtReleaseBinding=d=>(c._OrtReleaseBinding=ie.ab)(d),c._OrtRunWithBinding=(d,h,y,_,T)=>(c._OrtRunWithBinding=ie.bb)(d,h,y,_,T),c._OrtRun=(d,h,y,_,T,P,z,M)=>(c._OrtRun=ie.cb)(d,h,y,_,T,P,z,M),c._OrtEndProfiling=d=>(c._OrtEndProfiling=ie.db)(d),c._JsepOutput=(d,h,y)=>(c._JsepOutput=ie.eb)(d,h,y),c._JsepGetNodeName=d=>(c._JsepGetNodeName=ie.fb)(d);var Qo,Hn=()=>(Hn=ie.gb)(),er=c._free=d=>(er=c._free=ie.hb)(d),ei=c._malloc=d=>(ei=c._malloc=ie.ib)(d),vs=(d,h,y,_,T,P)=>(vs=ie.lb)(d,h,y,_,T,P),Kd=()=>(Kd=ie.mb)(),Xd=(d,h,y,_,T)=>(Xd=ie.nb)(d,h,y,_,T),xs=d=>(xs=ie.ob)(d),ti=d=>(ti=ie.pb)(d),Zd=()=>(Zd=ie.qb)(),Jd=(d,h)=>(Jd=ie.rb)(d,h),ri=d=>(ri=ie.sb)(d),ws=d=>(ws=ie.tb)(d),Ts=()=>(Ts=ie.ub)(),Yd=c.dynCall_ii=(d,h)=>(Yd=c.dynCall_ii=ie.wb)(d,h),Qd=d=>(Qd=ie.xb)(d),ep=()=>(ep=ie.yb)(),tp=d=>(tp=ie.zb)(d),rp=()=>(rp=ie.Ab)();function np(){0<gn||(m?(l(c),m||Wo(Ft),startWorker(c)):(Wo(Je),0<gn||Qo||(Qo=!0,c.calledRun=!0,pt||(m||Wo(Ft),l(c),m||Wo(es)))))}return c.___start_em_js=932405,c.___stop_em_js=932651,c.stackSave=()=>Ts(),c.stackRestore=d=>ri(d),c.stackAlloc=d=>ws(d),c.setValue=function(d,h,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":e()[d>>>0]=h;break;case"i16":t()[d>>>1>>>0]=h;break;case"i32":i()[d>>>2>>>0]=h;break;case"i64":F[d>>>3]=BigInt(h);break;case"float":s()[d>>>2>>>0]=h;break;case"double":u()[d>>>3>>>0]=h;break;case"*":a()[d>>>2>>>0]=h;break;default:Jr(`invalid type for setValue: ${y}`)}},c.getValue=function(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return e()[d>>>0];case"i16":return t()[d>>>1>>>0];case"i32":return i()[d>>>2>>>0];case"i64":return F[d>>>3];case"float":return s()[d>>>2>>>0];case"double":return u()[d>>>3>>>0];case"*":return a()[d>>>2>>>0];default:Jr(`invalid type for getValue: ${h}`)}},c.UTF8ToString=Ye,c.stringToUTF8=Gn,c.lengthBytesUTF8=us,co=function d(){Qo||np(),Qo||(co=d)},np(),c.PTR_SIZE=4,f}),$O=by;globalThis.self?.name==="em-pthread"&&by()});var wy,AO,Ot,Ty,tc,OO,PO,Iy,EO,vy,Sy,xy,$y,ca=D(()=>{"use strict";la();wy=!1||typeof location>"u"?void 0:location.origin,AO=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.all.bundle.min.mjs",import.meta.url).href,wy).href:import.meta.url},Ot=AO(),Ty=()=>{if(Ot&&!Ot.startsWith("blob:"))return Ot.substring(0,Ot.lastIndexOf("/")+1)},tc=(n,e)=>{try{let r=e??Ot;return(r?new URL(n,r):new URL(n)).origin===wy}catch{return!1}},OO=(n,e)=>{let r=e??Ot;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},PO=(n,e)=>`${e??"./"}${n}`,Iy=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},EO=async n=>(await import(/*webpackIgnore:true*/n)).default,vy=(gy(),po(my)).default,Sy=async()=>{if(!Ot)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(tc(Ot))return[void 0,vy()];let n=await Iy(Ot);return[n,vy(n)]},xy=(_y(),po(yy)).default,$y=async(n,e,r)=>{if(!n&&!e&&xy&&Ot&&tc(Ot))return[void 0,xy];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??OO(t,e),i=!!1&&r&&o&&!tc(o,e),a=i?await Iy(o):o??PO(t,e);return[i?a:void 0,await EO(a)]}}});var rc,nc,_a,Ay,CO,DO,da,Ze,pn=D(()=>{"use strict";ca();nc=!1,_a=!1,Ay=!1,CO=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},DO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},da=async n=>{if(nc)return Promise.resolve();if(_a)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ay)throw new Error("previous call to 'initializeWebAssembly()' failed.");_a=!0;let e=n.initTimeout,r=n.numThreads;if(!DO())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=CO();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,p=n.wasmBinary,[c,f]=await $y(s,i,r>1),b=!1,g=[];if(e>0&&g.push(new Promise(m=>{setTimeout(()=>{b=!0,m()},e)})),g.push(new Promise((m,w)=>{let x={numThreads:r};if(p)x.wasmBinary=p;else if(l||i)x.locateFile=v=>l??i+v;else if(s&&s.indexOf("blob:")!==0)x.locateFile=v=>new URL(v,s).href;else if(c){let v=Ty();v&&(x.locateFile=I=>v+I)}f(x).then(v=>{_a=!1,nc=!0,rc=v,m(),c&&URL.revokeObjectURL(c)},v=>{_a=!1,Ay=!0,w(v)})})),await Promise.race(g),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ze=()=>{if(nc&&rc)return rc;throw new Error("WebAssembly is not initialized yet.")}});var ot,No,$e,va=D(()=>{"use strict";pn();ot=(n,e)=>{let r=Ze(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},No=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")No(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},$e=n=>{let e=Ze(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var Oy,Py=D(()=>{"use strict";pn();va();Oy=n=>{let e=Ze(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=ot(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&$e("Can't create run options."),n?.extra!==void 0&&No(n.extra,"",new WeakSet,(a,s)=>{let u=ot(a,t),l=ot(s,t);e._OrtAddRunConfigEntry(r,u,l)!==0&&$e(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var kO,NO,LO,RO,Ey,Cy=D(()=>{"use strict";pn();va();kO=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},NO=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},LO=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},RO=(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let s=t?.deviceType;if(s){let u=ot("deviceType",r),l=ot(s,r);Ze()._OrtAddSessionConfigEntry(n,u,l)!==0&&$e(`Can't set a session config entry: 'deviceType' - ${s}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let a=t;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let s=ot("preferredLayout",r),u=ot(a.preferredLayout,r);Ze()._OrtAddSessionConfigEntry(n,s,u)!==0&&$e(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ot(o,r);Ze()._OrtAppendExecutionProvider(n,i)!==0&&$e(`Can't append execution provider: ${o}.`)}},Ey=n=>{let e=Ze(),r=0,t=[],o=n||{};LO(o);try{let i=kO(o.graphOptimizationLevel??"all"),a=NO(o.executionMode??"sequential"),s=typeof o.logId=="string"?ot(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let p=typeof o.optimizedModelFilePath=="string"?ot(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,p),r===0&&$e("Can't create session options."),o.executionProviders&&RO(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=ot("enableGraphCapture",t),f=ot(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(r,c,f)!==0&&$e(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,f]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let b=ot(c,t);e._OrtAddFreeDimensionOverride(r,b,f)!==0&&$e(`Can't set a free dimension override: ${c} - ${f}.`)}return o.extra!==void 0&&No(o.extra,"",new WeakSet,(c,f)=>{let b=ot(c,t),g=ot(f,t);e._OrtAddSessionConfigEntry(r,b,g)!==0&&$e(`Can't set a session config entry: ${c} - ${f}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&$e("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var Lo,fn,Rn,xa,Ro,wa,Ta,oc,ce=D(()=>{"use strict";Lo=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},fn=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},Rn=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},xa=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Ro=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},wa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Ta=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",oc=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var zo,ic=D(()=>{"use strict";la();zo=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=Is("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Is("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var zO,MO,Dy,ky,Ia,BO,xe,Mr=D(()=>{"use strict";ce();zO=["V","I","W","E","F"],MO=(n,e)=>{console.log(`[${zO[n]},${new Date().toISOString()}]${e}`)},Ia=(n,e)=>{Dy=n,ky=e},BO=(n,e)=>{let r=Ro(n),t=Ro(Dy);r>=t&&MO(r,typeof e=="function"?e():e)},xe=(...n)=>{ky&&BO(...n)}});var Sa,ac=D(()=>{"use strict";ce();Sa=(n,e)=>new(xa(e))(n)});var $a=D(()=>{"use strict"});var Ny,sc,uc,FO,VO,Ly,cc,lc,zy,My=D(()=>{"use strict";Mr();$a();Ny=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),sc=[],uc=n=>Math.ceil(Number(n)/16)*16,FO=n=>{for(let e=0;e<sc.length;e++){let r=sc[e];if(n<=r)return r}return Math.ceil(n/16)*16},VO=1,Ly=()=>VO++,cc=async(n,e,r,t)=>{let o=uc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},lc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Ny)sc.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=uc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([p.finish()]),u.destroy(),xe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=uc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ly();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),xe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=FO(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:Ly(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),xe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return xe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await cc(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=Ny.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(xe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},zy=(...n)=>new lc(...n)});var dc,de,Ke=D(()=>{"use strict";dc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},de=n=>new dc(n)});var pc,Br,C,zn,Aa,By,Fy,he=D(()=>{"use strict";pc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Br=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=pc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],p=i-u<0?1:r[i-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[a-u]=Math.max(l,p);else{if(c>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},C=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},zn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[s]=c-i[a],Math.floor((e+c-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},Aa=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Br.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},By=-34028234663852886e22,Fy=34028234663852886e22});var Mn,hc,Me,it,G,Oe,mc,Bn,jt,Q,Oa,k,B,Vy,Pa,fc,Gy,be=D(()=>{"use strict";ce();he();Mn=64,hc=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Me=(n,e=1)=>{let r=hc(n,e);return typeof r=="string"?r:r[0]},it=(n,e=1)=>{let r=hc(n,e);return typeof r=="string"?r:r[1]},G=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:C.computeStrides(r)})}),e},Oe=n=>n%4===0?4:n%2===0?2:1,mc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Bn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,jt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Q=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,Oa=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=hc(e,o),p=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],f={indices:u,value:p,storage:c,tensor:e},b=F=>typeof F=="string"?F:`${F}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=i?"uniforms.":"",w=`${m}${n}_shape`,x=`${m}${n}_strides`,v="";for(let F=0;F<a-1;F++)v+=`
    let dim${F} = current / ${Q(x,F,a)};
    let rest${F} = current % ${Q(x,F,a)};
    indices[${F}] = dim${F};
    current = rest${F};
    `;v+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${v}
    return indices;
  }`,$=F=>(g.offsetToIndices=!0,a<2?F:`o2i_${n}(${F})`),O=[];if(a>=2)for(let F=a-1;F>=0;F--)O.push(`${Q(x,F,a)} * (indices[${F}])`);let E=a<2?"":`
  fn i2o_${n}(indices: ${f.indices}) -> u32 {
    return ${O.join("+")};
  }`,N=F=>(g.indicesToOffset=!0,a<2?F:`i2o_${n}(${F})`),R=(...F)=>a===0?"0u":`${f.indices}(${F.map(b).join(",")})`,V=(F,re)=>a<2?`${F}`:`${Q(F,re,a)}`,H=(F,re,De)=>a<2?`${F}=${De};`:`${Q(F,re,a)}=${De};`,j={},oe=(F,re)=>{g.broadcastedIndicesToOffset=!0;let De=`${re.name}broadcastedIndicesTo${n}Offset`;if(De in j)return`${De}(${F})`;let pt=[];for(let Ae=a-1;Ae>=0;Ae--){let Je=re.indicesGet("outputIndices",Ae+re.rank-a);pt.push(`${V(x,Ae)} * (${Je} % ${V(w,Ae)})`)}return j[De]=`fn ${De}(outputIndices: ${re.type.indices}) -> u32 {
             return ${pt.length>0?pt.join("+"):"0u"};
           }`,`${De}(${F})`},W=(F,re)=>(()=>{if(f.storage===f.value)return`${n}[${F}]=${re};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${n}[${F}]=vec2<u32>(u32(${re}), select(0u, 0xFFFFFFFFu, ${re} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${n}[${F}]=vec2<u32>(u32(${re}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${n}[${F}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${re}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),ee=F=>(()=>{if(f.storage===f.value)return`${n}[${F}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${n}[${F}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${n}[${F}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${F}] & 0xFFu), bool(${n}[${F}] & 0xFF00u), bool(${n}[${F}] & 0xFF0000u), bool(${n}[${F}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Be=a<2?"":`
  fn get_${n}ByIndices(indices: ${f.indices}) -> ${p} {
    return ${ee(`i2o_${n}(indices)`)};
  }`,X=a<2?"":(()=>{let F=s.map(De=>`d${De}: u32`).join(", "),re=s.map(De=>`d${De}`).join(", ");return`
  fn get_${n}(${F}) -> ${p} {
    return get_${n}ByIndices(${R(re)});
  }`})(),J=(...F)=>{if(F.length!==a)throw new Error(`indices length must be ${a}`);let re=F.map(b).join(",");return a===0?ee("0u"):a===1?ee(re[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}(${re})`)},me=F=>a<2?ee(F):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}ByIndices(${F})`),se=a<2?"":`
  fn set_${n}ByIndices(indices: ${f.indices}, value: ${p}) {
    ${W(`i2o_${n}(indices)`,"value")}
  }`,Fe=a<2?"":(()=>{let F=s.map(De=>`d${De}: u32`).join(", "),re=s.map(De=>`d${De}`).join(", ");return`
  fn set_${n}(${F}, value: ${p}) {
    set_${n}ByIndices(${R(re)}, value);
  }`})();return{impl:()=>{let F=[],re=!1;return g.offsetToIndices&&(F.push(I),re=!0),g.indicesToOffset&&(F.push(E),re=!0),g.broadcastedIndicesToOffset&&(Object.values(j).forEach(De=>F.push(De)),re=!0),g.set&&(F.push(Fe),re=!0),g.setByIndices&&(F.push(se),re=!0),g.get&&(F.push(X),re=!0),g.getByIndices&&(F.push(Be),re=!0),!i&&re&&F.unshift(`const ${w} = ${f.indices}(${r.join(",")});`,`const ${x} = ${f.indices}(${C.computeStrides(r).join(",")});`),F.join(`
`)},type:f,offsetToIndices:$,indicesToOffset:N,broadcastedIndicesToOffset:oe,indices:R,indicesGet:V,indicesSet:H,set:(...F)=>{if(F.length!==a+1)throw new Error(`indices length must be ${a}`);let re=F[a];if(typeof re!="string")throw new Error("value must be string");let De=F.slice(0,a).map(b).join(",");return a===0?W("0u",re):a===1?W(De[0],re):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}(${De}, ${re})`)},setByOffset:W,setByIndices:(F,re)=>a<2?W(F,re):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}ByIndices(${F}, ${re});`),get:J,getByOffset:ee,getByIndices:me,usage:t,name:n,strides:x,shape:w,rank:a}},k=(n,e,r,t=1)=>Oa(n,e,r,"input",t),B=(n,e,r,t=1)=>Oa(n,e,r,"output",t),Vy=(n,e,r)=>Oa(n,e,r,"atomicOutput",1),Pa=(n,e,r,t=1)=>Oa(n,e,r,"internal",t),fc=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Mn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},Gy=(n,e)=>new fc(n,e)});var GO,Uy,UO,WO,HO,qO,at,Wy,Hy,Xr=D(()=>{"use strict";ce();he();Ke();be();GO=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},Uy=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),UO=(n,e)=>C.sortBasedOnPerm(n,Uy(n.length,e)),WO=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},HO=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},qO=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},at=(n,e)=>{let r=n.dataType,t=n.dims.length,o=Uy(t,e),i=UO(n.dims,o),a=n.dims,s=i,u=t<2||qO(o,n.dims),l;if(u)return l=m=>{let w=k("input",r,a,4),x=B("output",r,s,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(w,x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=C.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:p,newPerm:c}=HO(n.dims,o),f=C.areEqual(c,[2,3,1]),b=C.areEqual(c,[3,1,2]);if(p.length===2||f||b){a=f?[p[0],p[1]*p[2]]:b?[p[0]*p[1],p[2]]:p,s=[a[1],a[0]];let m=16;return l=w=>{let x=k("a",r,a.length),v=B("output",r,s.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${m+1}>, ${m}>;
  ${w.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=C.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/m),y:Math.ceil(s[0]/m)},programUniforms:[{type:12,data:w},...G(a,s)]}},getShaderSource:l}}return l=m=>{let w=k("a",r,a.length),x=B("output",r,s.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(w,x)}

  ${WO(o,t,w,x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let m=C.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...G(a,s)]}},getShaderSource:l}},Wy=(n,e)=>{GO(n.inputs,e.perm),n.compute(at(n.inputs[0],e.perm))},Hy=n=>de({perm:n.perm})});var jO,KO,XO,ZO,JO,YO,QO,eP,tP,rP,Fr,qy,jy,Ky,Xy,Zy,Jy,Yy,Qy,e_,t_,r_=D(()=>{"use strict";ce();he();be();Ea();Xr();jO={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},KO={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},XO={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ZO={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},JO=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},YO=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},QO=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},eP=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},tP=(n,e)=>{let r=[];if(!eP(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},rP=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=C.size(i),l=C.size(a),p=k("_A",r[0].dataType,s),c=B("output",o,i),f=64;u===1&&(f=256);let b=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,g=m=>`
        ${m.registerUniform("reduceSize","u32").declareVariables(p,c)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${m.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${XO[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${jO[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${KO[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${t==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${ZO[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Fr=(n,e,r,t)=>{let o=n.inputs.length===1?r:gc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((b,g)=>g));let a=C.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],l=tP(s,n.inputs[0].dims.length);l.length>0&&(u=n.compute(at(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=JO(s.length,u.dims.length));let[p,c]=YO(u.dims,s),f=p;o.keepDims&&(f=QO(p,a)),n.compute(rP(e,o.cacheKey,[u],t,n.inputs[0].dataType,f,c),{inputs:[u]})},qy=(n,e)=>{Fr(n,"ReduceMeanShared",e,"mean")},jy=(n,e)=>{Fr(n,"ReduceL1Shared",e,"l1")},Ky=(n,e)=>{Fr(n,"ReduceL2Shared",e,"l2")},Xy=(n,e)=>{Fr(n,"ReduceLogSumExpShared",e,"logSumExp")},Zy=(n,e)=>{Fr(n,"ReduceMaxShared",e,"max")},Jy=(n,e)=>{Fr(n,"ReduceMinShared",e,"min")},Yy=(n,e)=>{Fr(n,"ReduceProdShared",e,"prod")},Qy=(n,e)=>{Fr(n,"ReduceSumShared",e,"sum")},e_=(n,e)=>{Fr(n,"ReduceSumSquareShared",e,"sumSquare")},t_=(n,e)=>{Fr(n,"ReduceLogSumShared",e,"logSum")}});var Vr,nP,Ca,gc,Gr,oP,iP,aP,sP,uP,lP,cP,dP,pP,fP,Ur,n_,o_,i_,a_,s_,u_,l_,c_,d_,p_,Ea=D(()=>{"use strict";ce();he();Ke();be();r_();Vr=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},nP=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],Ca=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],l=r[0].dims,p=l.length,c=C.normalizeAxes(o,p),f=!s&&c.length===0;l.forEach((w,x)=>{f||c.indexOf(x)>=0?a&&u.push(1):u.push(w)});let b=u.length,g=C.size(u);return{name:n,shaderCache:e,getShaderSource:w=>{let x=[],v=k("_A",r[0].dataType,p),I=B("output",i,b),$=t(v,I,c),O=$[2];for(let E=0,N=0;E<p;E++)f||c.indexOf(E)>=0?(a&&N++,O=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${O}
                }`):(x.push(`${v.indicesSet("input_indices",E,I.indicesGet("output_indices",N))};`),N++);return`

        ${w.registerUniform("output_size","u32").declareVariables(v,I)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${O}
          ${$[3]}
          ${$.length===4?I.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...G(l,u)]})}},gc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),de({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Gr=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:gc(o,r);n.compute(Ca(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?nP:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},oP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},iP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},aP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},sP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},uP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},lP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},cP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},dP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},pP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},fP=(n,e)=>{Vr(n.inputs),Gr(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Ur=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},n_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?lP(n,e):qy(n,e)},o_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?iP(n,e):jy(n,e)},i_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?aP(n,e):Ky(n,e)},a_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?sP(n,e):Xy(n,e)},s_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?uP(n,e):Zy(n,e)},u_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?cP(n,e):Jy(n,e)},l_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?dP(n,e):Yy(n,e)},c_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?pP(n,e):Qy(n,e)},d_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?fP(n,e):e_(n,e)},p_=(n,e)=>{Ur(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?oP(n,e):t_(n,e)}});var f_,h_,m_,bc,g_=D(()=>{"use strict";ce();Ke();Ea();f_=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},h_=(n,e)=>{f_(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ca("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},m_=(n,e)=>{f_(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ca("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},bc=n=>de(n)});var hP,yc,mP,gP,bP,io,yP,b_,Da=D(()=>{"use strict";ce();he();$a();be();hP=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],p=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,f=c,b=f;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=e.qkvHiddenSizes[0],f=e.qkvHiddenSizes[1],b=e.qkvHiddenSizes[2]}let g=l;if(c!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+f+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(a){if(f!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(m=a.dims[3])}let w=g+m,x=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:x,inputHiddenSize:p,hiddenSize:c,vHiddenSize:b,headSize:Math.floor(c/e.numHeads),vHeadSize:Math.floor(b/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:v,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},yc=(n,e,r)=>e&&n?`
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
    `,mP=(n,e,r,t,o,i,a,s)=>{let u=Oe(a?1:i),l=64,p=i/u;p<l&&(l=32);let c=Math.ceil(i/u/l),f=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:p},{type:12,data:c}],b=Me(n.dataType,u),g=it(1,u),m=["type"];a&&m.push("type"),s&&m.push("type");let w=x=>{let v=B("x",n.dataType,n.dims,u),I=[v],$=a?k("seq_lens",a.dataType,a.dims):void 0;$&&I.push($);let O=s?k("total_sequence_length_input",s.dataType,s.dims):void 0;O&&I.push(O);let E=it(n.dataType),N=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${x.registerUniforms(N).declareVariables(...I)}
  ${x.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${yc($,O,!1)}
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
        x[offset + i] = ${v.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${b};${u}`,inputDependencies:m},getShaderSource:w,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:e*r},programUniforms:f})}},gP=(n,e,r,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,l],c=n>1&&t,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=c?[i.batchSize,f,l,i.headSize]:void 0,g=i.nReps?i.nReps:1,m=i.scale===0?1/Math.sqrt(i.headSize):i.scale,w=Oe(i.headSize),x=i.headSize/w,v=12,I={x:Math.ceil(l/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:x},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:m},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],O=c&&t&&C.size(t.dims)>0,E=["type","type"];O&&E.push("type"),o&&E.push("type"),s&&E.push("type"),u&&E.push("type");let N=[{dims:p,dataType:e.dataType,gpuDataType:0}];c&&N.push({dims:b,dataType:e.dataType,gpuDataType:0});let R=V=>{let H=k("q",e.dataType,e.dims,w),j=k("key",r.dataType,r.dims,w),oe=[H,j];if(O){let se=k("past_key",t.dataType,t.dims,w);oe.push(se)}o&&oe.push(k("attention_bias",o.dataType,o.dims));let W=s?k("seq_lens",s.dataType,s.dims):void 0;W&&oe.push(W);let ee=u?k("total_sequence_length_input",u.dataType,u.dims):void 0;ee&&oe.push(ee);let Be=B("output",e.dataType,p),X=[Be];c&&X.push(B("present_key",e.dataType,b,w));let J=it(1,w),me=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${H.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${H.type.storage}, ${v*v}>;
  ${V.registerUniforms(me).declareVariables(...oe,...X)}
  ${V.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${yc(W,ee,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${O&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>O&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${Be.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${o!==void 0};${t!==void 0};${n}`,inputDependencies:E},getRunData:()=>({outputs:N,dispatchGroup:I,programUniforms:$}),getShaderSource:R}},bP=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,p=o.vHiddenSize*l,c=n>1&&t,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,b=c?[o.batchSize,f,u,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,p],m=12,w={x:Math.ceil(o.vHeadSize/m),y:Math.ceil(o.sequenceLength/m),z:o.batchSize*o.numHeads},x=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],v=c&&t&&C.size(t.dims)>0,I=["type","type"];v&&I.push("type"),a&&I.push("type"),s&&I.push("type");let $=[{dims:g,dataType:e.dataType,gpuDataType:0}];c&&$.push({dims:b,dataType:e.dataType,gpuDataType:0});let O=E=>{let N=k("probs",e.dataType,e.dims),R=k("v",r.dataType,r.dims),V=[N,R];v&&V.push(k("past_value",t.dataType,t.dims));let H=a?k("seq_lens",a.dataType,a.dims):void 0;a&&V.push(H);let j=s?k("total_sequence_length_input",s.dataType,s.dims):void 0;s&&V.push(j);let W=[B("output",e.dataType,g)];c&&W.push(B("present_value",e.dataType,b));let ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${m}u;
  var<workgroup> tileQ: array<${N.type.value}, ${m*m}>;
  var<workgroup> tileV: array<${N.type.value}, ${m*m}>;
  ${E.registerUniforms(ee).declareVariables(...V,...W)}
  ${E.mainStart([m,m,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${yc(H,j,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${N.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>v&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${c?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:I},getRunData:()=>({outputs:$,dispatchGroup:w,programUniforms:x}),getShaderSource:O}},io=(n,e,r,t,o,i,a,s,u,l,p=void 0,c=void 0)=>{let f=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),b=f>1?l.pastSequenceLength:0,g=b+l.kvSequenceLength,m=u&&C.size(u.dims)>0?u:void 0,w=[e,r];f>1&&a&&C.size(a.dims)>0&&w.push(a),m&&w.push(m),p&&w.push(p),c&&w.push(c);let x=n.compute(gP(f,e,r,a,m,l,b,p,c),{inputs:w,outputs:f>1?[-1,1]:[-1]})[0];n.compute(mP(x,l.batchSize,l.numHeads,b,l.sequenceLength,g,p,c),{inputs:p&&c?[x,p,c]:[x],outputs:[]});let v=[x,t];f>1&&s&&C.size(s.dims)>0&&v.push(s),p&&v.push(p),c&&v.push(c),n.compute(bP(f,x,t,s,l,b,p,c),{inputs:v,outputs:f>1?[0,2]:[0]})},yP=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],p=c=>{let f=B("output_q",u[0].dataType,r),b=B("output_k",u[0].dataType,r),g=B("output_v",u[0].dataType,r),m=k("input",u[0].dataType,u[0].dims),w=k("weight",u[1].dataType,u[1].dims),x=k("bias",u[2].dataType,u[2].dims),v=m.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${c.registerUniforms(I).declareVariables(m,w,x,f,b,g)}
  ${c.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:p},{inputs:u,outputs:[-1,-1,-1]})},b_=(n,e)=>{let r=hP(n.inputs,e),[t,o,i]=yP(n,r);return io(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var _P,vP,xP,y_,__=D(()=>{"use strict";ft();ce();he();Ke();be();_P=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},vP=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Oe(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=C.size(i)/a,l=t,p=l?i.length:i,c=k("x",n[0].dataType,n[0].dims,a),f=k("scale",n[1].dataType,n[1].dims,s),b=k("bias",n[2].dataType,n[2].dims,s),g=k("inputMean",n[3].dataType,n[3].dims,s),m=k("inputVar",n[4].dataType,n[4].dims,s),w=B("y",n[0].dataType,p,a),x=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${w.indicesSet("outputIndices","0","0")}
            let cOffset = ${w.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<f.rank;$++)I+=`cIndices[${$}] = outputIndices[${$}];`;I+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return I},v=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(c,f,b,g,m,w)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${w.offsetToIndices(`global_idx * ${a}`)};
    ${x()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${w.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...G(i)]:[{type:12,data:u}]})}},xP=n=>de(n),y_=(n,e)=>{let{inputs:r,outputCount:t}=n,o=xP({...e,outputCount:t});if(fe.webgpu.validateInputContent&&_P(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(vP(r,o))}});var wP,TP,v_,x_=D(()=>{"use strict";he();be();wP=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},TP=n=>{let e=n[0].dims,r=n[0].dims[2],t=C.size(e)/4,o=n[0].dataType,i=k("input",o,e,4),a=k("bias",o,[r],4),s=k("residual",o,e,4),u=B("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,a,s,u)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},v_=n=>{wP(n.inputs),n.compute(TP(n.inputs))}});var IP,Ce,w_,T_,I_,S_,$_,A_,O_,P_,E_,SP,C_,D_,k_,N_,Mo,L_,ka,R_,z_,M_,B_,F_,V_,G_,U_,W_,H_,q_,j_,K_,X_,Z_,J_,Y_,Q_,_c,vc,e0,t0,r0,$P,AP,n0,Na=D(()=>{"use strict";ce();he();Ke();be();IP=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=k("inputData",r,[s],4),p=B("outputData",t,[s],4),c=[{name:"vec_size",type:"u32"}];return a&&c.push(...a),`
      ${n.registerUniforms(c).declareVariables(l,p)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",u)}
  }`},Ce=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(C.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>IP(l,C.size(n.dims),n.dataType,i,r,t,s),getRunData:l=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(C.size(l[0].dims)/64/4)},programUniforms:u})}},w_=n=>{n.compute(Ce(n.inputs[0],"Abs","abs"))},T_=n=>{n.compute(Ce(n.inputs[0],"Acos","acos"))},I_=n=>{n.compute(Ce(n.inputs[0],"Acosh","acosh"))},S_=n=>{n.compute(Ce(n.inputs[0],"Asin","asin"))},$_=n=>{n.compute(Ce(n.inputs[0],"Asinh","asinh"))},A_=n=>{n.compute(Ce(n.inputs[0],"Atan","atan"))},O_=n=>{n.compute(Ce(n.inputs[0],"Atanh","atanh"))},P_=n=>de(n),E_=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(Ce(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},SP=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return de({min:e,max:r})},C_=(n,e)=>{let r=e||SP(n.inputs),t=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},D_=n=>{n.compute(Ce(n.inputs[0],"Ceil","ceil"))},k_=n=>{n.compute(Ce(n.inputs[0],"Cos","cos"))},N_=n=>{n.compute(Ce(n.inputs[0],"Cosh","cosh"))},Mo=n=>de(n),L_=(n,e)=>{let r=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},ka=(n="f32")=>`
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
}`,R_=n=>{let e=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,ka(e)))},z_=n=>{n.compute(Ce(n.inputs[0],"Exp","exp"))},M_=n=>{n.compute(Ce(n.inputs[0],"Floor","floor"))},B_=n=>{let e=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ka(e)))},F_=(n,e)=>{let r=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},V_=n=>{n.compute(Ce(n.inputs[0],"Not",e=>`!${e}`))},G_=n=>{n.compute(Ce(n.inputs[0],"Neg",e=>`-${e}`))},U_=n=>{n.compute(Ce(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},W_=n=>{let e=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},H_=n=>{n.compute(Ce(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},q_=n=>de(n),j_=(n,e)=>{let r=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},K_=n=>{n.compute(Ce(n.inputs[0],"Sin","sin"))},X_=n=>{n.compute(Ce(n.inputs[0],"Sinh","sinh"))},Z_=n=>{n.compute(Ce(n.inputs[0],"Sqrt","sqrt"))},J_=n=>{n.compute(Ce(n.inputs[0],"Tan","tan"))},Y_=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,Q_=n=>{n.compute(Ce(n.inputs[0],"Tanh",Y_))},_c=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${Y_("v")};
}
`,vc=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,e0=n=>{let e=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"FastGelu",vc,_c(e),void 0,n.inputs[0].dataType))},t0=(n,e)=>{let r=it(n.inputs[0].dataType);return n.compute(Ce(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},r0=n=>{n.compute(Ce(n.inputs[0],"Log","log"))},$P=(n,e)=>`
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
`,AP=n=>`quick_gelu_impl(${n})`,n0=(n,e)=>{let r=it(n.inputs[0].dataType);n.compute(Ce(n.inputs[0],"QuickGelu",AP,$P(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var OP,PP,i0,a0=D(()=>{"use strict";he();be();Na();OP=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},PP=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=k("input",n[0].dataType,n[0].dims,4),t=k("bias",n[0].dataType,[n[0].dims[2]],4),o=B("output",n[0].dataType,e,4),i=C.size(e)/4,a=Me(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${ka(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},i0=n=>{OP(n.inputs),n.compute(PP(n.inputs))}});var EP,CP,Wr,s0,u0,l0,c0,d0,p0,f0,h0,m0,g0,b0=D(()=>{"use strict";ce();he();be();EP=(n,e,r,t,o,i,a,s,u,l,p,c)=>{let f,b;typeof s=="string"?f=b=(v,I)=>`${s}((${v}),(${I}))`:typeof s=="function"?f=b=s:(f=s.scalar,b=s.vector);let g=B("outputData",p,t.length,4),m=k("aData",u,e.length,4),w=k("bData",l,r.length,4),x;if(o)if(i){let v=C.size(e)===1,I=C.size(r)===1,$=e.length>0&&e[e.length-1]%4===0,O=r.length>0&&r[r.length-1]%4===0;v||I?x=g.setByOffset("global_idx",b(v?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),I?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"))):x=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${w.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",b(a||$?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||O?w.getByOffset("offsetB / 4u"):`${w.type.value}(${w.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=g.setByOffset("global_idx",b(m.getByOffset("global_idx"),w.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(I,$,O="")=>{let E=`aData[indexA${$}][componentA${$}]`,N=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${g.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${m.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let offsetB${$} = ${w.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${I}[${$}] = ${O}(${f(E,N)});
          `};p===9?x=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:x=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(m,w,g)}

        ${c??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},CP=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(m=>Number(m)??1),u=t.dims.map(m=>Number(m)??1),l=!C.areEqual(s,u),p=s,c=C.size(s),f=!1,b=!1,g=[l];if(l){let m=Br.calcShape(s,u,!1);if(!m)throw new Error("Can't perform binary op on the given tensors");p=m.slice(),c=C.size(p);let w=C.size(s)===1,x=C.size(u)===1,v=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;g.push(w),g.push(x),g.push(v),g.push(I);let $=1;for(let O=1;O<p.length;O++){let E=s[s.length-O],N=u[u.length-O];if(E===N)$*=E;else break}$%4===0?(b=!0,f=!0):(w||x||v||I)&&(f=!0)}else f=!0;return g.push(f),{name:n,shaderCache:{hint:e+g.map(m=>m.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:m=>EP(m,s,u,p,f,l,b,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(p)/4)},...G(s,u,p)]})}},Wr=(n,e,r,t,o,i)=>{n.compute(CP(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},s0=n=>{Wr(n,"Add",(e,r)=>`${e}+${r}`)},u0=n=>{Wr(n,"Div",(e,r)=>`${e}/${r}`)},l0=n=>{Wr(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},c0=n=>{Wr(n,"Mul",(e,r)=>`${e}*${r}`)},d0=n=>{let e=k("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Wr(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},p0=n=>{Wr(n,"Sub",(e,r)=>`${e}-${r}`)},f0=n=>{Wr(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},h0=n=>{Wr(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},m0=n=>{Wr(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},g0=n=>{Wr(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var kP,NP,LP,RP,y0,_0,v0=D(()=>{"use strict";ce();he();Ke();be();kP=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},NP=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,LP=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},RP=(n,e,r,t)=>{let o=C.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],l=[],p=[{type:12,data:o}];for(let m=0;m<n.length;++m)s+=n[m].dims[e],i[m]=s,l.push(n[m].dims.length),a[m]=k(`input${m}`,t,l[m]),u.push("rank"),p.push({type:12,data:i[m]});for(let m=0;m<n.length;++m)p.push(...G(n[m].dims));p.push(...G(r));let c=B("output",t,r.length),f=c.indicesGet("indices",e),b=Array.from(Array(i.length).keys()).map(m=>`uniforms.sizeInConcatAxis${m}`).join(","),g=m=>`

  ${(()=>{m.registerUniform("outputSize","u32");for(let w=0;w<n.length;w++)m.registerUniform(`sizeInConcatAxis${w}`,"u32");return m.declareVariables(...a,c)})()}

  ${NP(i.length,b)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${LP(a,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}},y0=(n,e)=>{let r=n.inputs,t=r[0].dims,o=C.normalizeAxis(e.axis,t.length);kP(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>C.size(s.dims)>0);n.compute(RP(a,o,i,r[0].dataType),{inputs:a})},_0=n=>de({axis:n.axis})});var Kt,Xt,Zt,La,hn=D(()=>{"use strict";ce();he();Kt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Xt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Zt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},La=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[By,Fy];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var nt,x0,Ra=D(()=>{"use strict";nt=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},x0=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var w0,T0=D(()=>{"use strict";w0=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Bo,za,Ma=D(()=>{"use strict";ce();he();be();hn();Bo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Q(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Q(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},za=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],l=s[s.length-1],p=a[a.length-1],c=Oe(l),f=Oe(p),b=Oe(u),g=C.size(r)/c/b,m=n.length>2,w=t?t.slice(0,-2):r.slice(0,-2),v=[C.size(w),u,l],I=[{type:12,data:g},{type:12,data:u},{type:12,data:l},{type:12,data:p}];Xt(e,I),I.push(...G(w,a,s)),m&&I.push(...G(n[2].dims)),I.push(...G(v));let $=O=>{let E=Pa("batch_dims",n[0].dataType,w.length),N=k("a",n[0].dataType,a.length,f),R=k("b",n[1].dataType,s.length,c),V=B("output",n[0].dataType,v.length,c),H=Me(V.type.tensor),j=Kt(e,V.type.value,H),oe=[N,R],W="";if(m){let X=o?c:1;oe.push(k("bias",n[2].dataType,n[2].dims.length,X)),W=`${o?`value += bias[col / ${X}];`:`value += ${V.type.value}(bias[row + i]);`}`}let ee=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Zt(e,ee);let Be=()=>{let X=`var a_data: ${N.type.value};`;for(let J=0;J<f;J++)X+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${c}];`;for(let J=0;J<b;J++){X+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${f}];`;for(let me=0;me<f;me++)X+=`
            values[${J}] = fma(${R.type.value}(a_data${f===1?"":`[${me}]`}), b_data${me}, values[${J}]);
`}return X};return`
  ${O.registerUniforms(ee).registerInternalVariables(E).declareVariables(...oe,V)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${N.type.indices};
    ${Bo("a_indices",N,N.rank-2,E.rank,"batch_indices")}
    ${N.indicesSet("a_indices",N.rank-2,0)}
    ${N.indicesSet("a_indices",N.rank-1,0)}
    let a_offset = ${N.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${Bo("b_indices",R,R.rank-2,E.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${V.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${Be()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${W}
      ${j}
      let cur_indices = ${V.type.indices}(batch, row + i, col);
      let offset = ${V.indicesToOffset("cur_indices")};
      ${V.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${c};${f};${b};${o}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:I}),getShaderSource:$}}});var zP,MP,xc,I0,BP,wc,FP,Fo,Ba=D(()=>{"use strict";ce();he();be();hn();Ma();Ra();zP=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,MP=(n,e)=>n?`
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
        }`,xc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],l=e[0]*n[0],p=o?u:i,c=o?i:u,f=p/e[0],b=i/e[1];if(!((o&&f===4&&n[1]===4||!o&&(f===3||f===4))&&p%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${f} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${p/f}>, ${c}>;
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
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${zP(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
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

          ${MP(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},I0=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,BP=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",wc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=n[1]*e[1],p=n[0]*e[0],c=o?l:i,f=o?i:l;if(!(f%e[1]===0&&c%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let b=f/e[1],g=c/e[0],m=i/e[1],w=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          ${I0(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
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

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${I0(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
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
      ${BP(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${p}>, ${i}>;
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
`},FP=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,l=Me(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${nt(n,l)} {
      var value = ${nt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Bo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${nt(n,l)} {
      var value = ${nt(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Bo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${nt(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${nt(n,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Fo=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),p=t?t.slice(0,-2):r.slice(0,-2),c=C.size(p),f=a[a.length-2],b=a[a.length-1],g=s[s.length-1],m=b%4===0&&g%4===0,w=f<=8?[4,1,1]:[4,4,1],x=[8,8,1],v=[Math.ceil(g/x[0]/w[0]),Math.ceil(f/x[1]/w[1]),Math.ceil(c/x[2]/w[2])],I=m?4:1,$=[...u,f,b/I],O=$.length,E=[...l,b,g/I],N=E.length,R=[c,f,g/I],V=[{type:6,data:f},{type:6,data:g},{type:6,data:b}];Xt(e,V),V.push(...G(p,$,E));let H=["rank","rank"],j=n.length>2;j&&(V.push(...G(n[2].dims)),H.push("rank")),V.push(...G(R));let oe=W=>{let ee=p.length,Be=Pa("batchDims",n[0].dataType,ee,1),X=Me(n[0].dataType),J=k("a",n[0].dataType,O,I),me=k("b",n[1].dataType,N,I),se=B("result",n[0].dataType,R.length,I),Fe=[J,me];if(j){let re=o?I:1;Fe.push(k("bias",n[2].dataType,n[2].dims.length,re))}let st=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Zt(e,st);let Ve=Me(se.type.tensor),pe=Kt(e,se.type.value,Ve),F=FP(I,j,pe,[Be,J,me,se],o);return`
  ${W.registerUniforms(st).registerInternalVariables(Be).declareVariables(...Fe,se)}
  ${F}
  ${m?xc(w,x,X,Be):wc(w,x,X,Be)}
                   `};return{name:"MatMul",shaderCache:{hint:`${w};${e.activation};${m};${o}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:V}),getShaderSource:oe}}});var VP,S0,$0=D(()=>{"use strict";ce();Mr();be();hn();Ra();T0();Ba();VP=(n,e,r,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let p=H=>{switch(H){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},c=H=>{switch(H){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},f=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=n?`
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
    `,g=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",w=n?"row":"col",x=n?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${w} / outWidth;
    let outCol = ${w} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${nt(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${m}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(a)}
    }
    return resData;`,I=n?e&&t?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${nt(a,l)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${nt(a,l)}(0.0);`,$=n?t&&r?c(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(s)}
    }
    return ${nt(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(s)}
    }
    return ${nt(s,l)}(0.0);`,O=nt(u,l),E=n?nt(a,l):nt(s,l),N=n?nt(s,l):nt(a,l),R=Kt(i,O,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${n?I:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${N} {
      ${n?$:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${O}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${x0(o)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},S0=(n,e,r,t,o,i,a,s,u)=>{let l=e.format==="NHWC",p=l?n[0].dims[3]:n[0].dims[1],c=r[0],f=l?r[2]:r[3],b=l?r[1]:r[2],g=l?r[3]:r[1],m=l&&(p%4===0||p%3===0)&&g%4===0,w=l?g:f*b,x=l?f*b:g,v=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(w/v[0]/I[0]),Math.ceil(x/v[1]/I[1]),Math.ceil(c/v[2]/I[2])];xe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let O=m?l&&p%4!==0?3:4:1,E=v[1]*I[1],N=v[0]*I[0],R=Math.max(v[0]*O,v[1]),V=t%E===0,H=o%N===0,j=i%R===0,oe=m?[O,4,4]:[1,1,1],W=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Xt(e,W),W.push(...G(n[0].dims,n[1].dims));let ee=["rank","rank"];a&&(W.push(...G(n[2].dims)),ee.push("rank")),W.push(...G(r));let Be=X=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Zt(e,J);let me=m?4:1,se=Me(n[0].dataType),Fe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${se}>`:se}) {
        result[flatIndex] = ${m?`vec4<${se}>`:se}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${se}>`:se}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,st=k("x",n[0].dataType,n[0].dims.length,O===3?1:O),Ve=k("w",n[1].dataType,n[1].dims.length,me),pe=[st,Ve],F=B("result",n[0].dataType,r.length,me);if(a){let re=k("bias",n[2].dataType,n[2].dims.length,me);pe.push(re),Fe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${se}>`:se} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${w0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(J).declareVariables(...pe,F)}
        ${Fe}
        ${VP(l,V,H,j,a,e,oe[0],oe[1],oe[2],se)}
        ${m?xc(I,v,se,void 0,!l,R):wc(I,v,se,void 0,!l,R,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${O};${m};${V};${H};${j};${E};${N};${R}`,inputDependencies:ee},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:W}),getShaderSource:Be}}});var GP,A0,Fa,UP,O0,WP,P0,E0,C0=D(()=>{"use strict";ce();Mr();he();be();hn();Ra();GP=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},A0=n=>typeof n=="number"?[n,n,n]:n,Fa=(n,e)=>e<=1?n:n+(n-1)*(e-1),UP=(n,e,r,t=1)=>{let o=Fa(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},O0=(n,e,r,t,o)=>{o==null&&(o=UP(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},WP=(n,e,r,t,o,i,a,s,u,l)=>{let p,c,f,b;if(n==="VALID"&&(n=0),typeof n=="number"){p={top:n,bottom:n,left:n,right:n,front:n,back:n};let g=O0([e,r,t,1],[s,u,l],1,[o,i,a],n);c=g[0],f=g[1],b=g[2]}else if(Array.isArray(n)){if(!n.every((m,w,x)=>m===x[0]))throw Error(`Unsupported padding parameter: ${n}`);p={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let g=O0([e,r,t,1],[s,u,l],1,[o,i,a],n[0]);c=g[0],f=g[1],b=g[2]}else if(n==="SAME_UPPER"){c=Math.ceil(e/o),f=Math.ceil(r/i),b=Math.ceil(t/a);let g=(c-1)*o+s-e,m=(f-1)*i+u-r,w=(b-1)*a+l-t,x=Math.floor(g/2),v=g-x,I=Math.floor(m/2),$=m-I,O=Math.floor(w/2),E=w-O;p={top:I,bottom:$,left:O,right:E,front:x,back:v}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:p,outDepth:c,outHeight:f,outWidth:b}},P0=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,l,p,c;if(a==="channelsLast")[s,u,l,p,c]=n;else if(a==="channelsFirst")[s,c,u,l,p]=n;else throw new Error(`Unknown dataFormat ${a}`);let[f,,b,g,m]=e,[w,x,v]=A0(r),[I,$,O]=A0(t),E=Fa(b,I),N=Fa(g,$),R=Fa(m,O),{padInfo:V,outDepth:H,outHeight:j,outWidth:oe}=WP(o,u,l,p,w,x,v,E,N,R),W=i?f*c:f,ee=[0,0,0,0,0];return a==="channelsFirst"?ee=[s,W,H,j,oe]:a==="channelsLast"&&(ee=[s,H,j,oe,W]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:p,inChannels:c,outDepth:H,outHeight:j,outWidth:oe,outChannels:W,padInfo:V,strideDepth:w,strideHeight:x,strideWidth:v,filterDepth:b,filterHeight:g,filterWidth:m,effectiveFilterDepth:E,effectiveFilterHeight:N,effectiveFilterWidth:R,dilationDepth:I,dilationHeight:$,dilationWidth:O,inShape:n,outShape:ee,filterShape:e}},E0=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,l=[64,1,1],p={x:r.map((v,I)=>I)},c=[Math.ceil(GP(p.x.map(v=>r[v]))/l[0]),1,1];xe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let f=u?a&&s%4!==0?3:4:1,b=C.size(r),g=[{type:12,data:b},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Xt(e,g),g.push(...G(n[0].dims,n[1].dims));let m=["rank","rank"],w=n.length===3;w&&(g.push(...G(n[2].dims)),m.push("rank")),g.push(...G(r));let x=v=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Zt(e,I);let $=u?4:1,O=Me(n[0].dataType),E=k("x",n[0].dataType,n[0].dims.length,f===3?1:f),N=k("W",n[1].dataType,n[1].dims.length,$),R=[E,N],V=B("result",n[0].dataType,r.length,$),H="";if(w){let W=k("bias",n[2].dataType,n[2].dims.length,$);R.push(W),H+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${O}>`:O} {
          return bias[${a?Q("coords",4,5):Q("coords",1,5)}${u?"/ 4":""}];
        }`}let j=nt(f,O),oe=Kt(e,j,O);return`
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${N.getByIndices("aIndices")};
            }
          ${v.registerUniforms(I).declareVariables(...R,V)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${V.offsetToIndices("global_idx")};
              let batch = ${Q("coords",0,E.rank)};
              let d2 = ${a?Q("coords",E.rank-1,E.rank):Q("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${a?Q("coords",1,E.rank):Q("coords",2,E.rank)},
              ${a?Q("coords",2,E.rank):Q("coords",3,E.rank)},
              ${a?Q("coords",3,E.rank):Q("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Q("uniforms.x_shape",1,E.rank):Q("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${a?Q("uniforms.x_shape",2,E.rank):Q("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${a?Q("uniforms.x_shape",3,E.rank):Q("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${a?Q("uniforms.x_shape",4,E.rank):Q("uniforms.x_shape",1,E.rank)};
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
              ${oe}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${f};${w}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:g}),getShaderSource:x}}});var D0,k0,N0=D(()=>{"use strict";ce();he();be();hn();D0=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",l=u?r[3]:r[1],p=l/e.group,c=u&&p>=4?Oe(l):1,f=C.size(r)/c,b=[{type:12,data:f},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:p}];Xt(e,b),b.push(...G(a,[s[0],s[1],s[2],s[3]/c]));let g=o?["rank","rank","rank"]:["rank","rank"];b.push(...G([r[0],r[1],r[2],r[3]/c]));let m=w=>{let x=B("output",n[0].dataType,r.length,c),v=Me(x.type.tensor),I=Kt(e,x.type.value,v),$=k("x",n[0].dataType,a.length),O=k("w",n[1].dataType,s.length,c),E=[$,O];o&&E.push(k("b",n[2].dataType,n[2].dims,c));let N=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Zt(e,N);let R=u?`
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
            let wVal = ${O.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${O.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${w.registerUniforms(N).declareVariables(...E,x)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${R}
    ${i}
    ${I}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:m}},k0=(n,e,r,t)=>{let o=n.length>2,i=Oe(r[3]),a=Oe(r[2]),s=C.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],c=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Xt(e,c),c.push(...G(u,l,p));let f=(a-1)*e.strides[1]+l[1],b=g=>{let m=B("output",n[0].dataType,p.length,i),w=Me(m.type.tensor),x=Kt(e,m.type.value,w),v=k("x",n[0].dataType,u.length,i),I=k("w",n[1].dataType,l.length,i),$=[v,I];o&&$.push(k("b",n[2].dataType,n[2].dims,i));let O=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Zt(e,E),`
  ${g.registerUniforms(E).declareVariables(...$,m)}
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

    var x_vals: array<${v.type.value}, ${f}>;
    var values: array<${m.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
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
      ${O}
      ${x}
      ${m.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${f};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:b}}});var HP,Tc,qP,Ic,Sc,L0,jP,KP,$c,R0=D(()=>{"use strict";he();$0();C0();Ba();N0();hn();Ma();Xr();HP=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,l=e[0],c=e.slice(2).map((g,m)=>g+(g-1)*(r[m]-1)),b=s.map((g,m)=>g+t[m]+t[m+u]).map((g,m)=>Math.floor((g-c[m]+o[m])/o[m]));return b.splice(0,0,a),b.splice(i?3:1,0,l),b},Tc=[2,3,1,0],qP=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Ic=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();zn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Sc=n=>{let e=La(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},L0=(n,e,r,t)=>{let o=r.format==="NHWC",i=HP(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let E=[e[0]];if(o){let R=n.kernelCustomData.wT??n.compute(at(e[1],Tc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=R),E.push(R)}else E.push(e[1]);e.length===3&&E.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(k0(E,r,i,t),{inputs:E}):n.compute(D0(E,r,i,t),{inputs:E});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],p=e[1].dims[2],c=e[1].dims[3],f=i[o?1:2],b=i[o?2:3],g=i[o?3:1],m=o&&p===s&&c===u&&r.pads[0]===0&&r.pads[1]===0;if(m||p===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=i[0],N,R,V,H=[];if(o){let W=n.kernelCustomData.wT??n.compute(at(e[1],Tc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=W),m){let ee=s*u*l;N=e[0].reshape([1,E,ee]),R=W.reshape([1,ee,g]),V=[1,E,g]}else N=e[0].reshape([E,s*u,l]),R=W.reshape([1,l,g]),V=[E,f*b,g];H.push(N),H.push(R)}else N=e[0].reshape([E,l,s*u]),R=e[1].reshape([1,g,l]),V=[E,g,f*b],H.push(R),H.push(N);a&&H.push(e[2]);let j=V[2],oe=H[0].dims[H[0].dims.length-1];j<8&&oe<8?n.compute(za(H,r,i,V,o,t),{inputs:H}):n.compute(Fo(H,r,i,V,o,t),{inputs:H});return}let w=!0,x=n.kernelCustomData.wT??n.compute(at(e[1],Tc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=x);let v=[e[0],x];a&&v.push(e[2]);let I=o?f*b:g,$=o?g:f*b,O=p*c*l;n.compute(S0(v,r,i,I,$,O,a,w,t),{inputs:v})},jP=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Ic({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);L0(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},KP=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Ic(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=P0(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(E0(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},$c=(n,e)=>{if(qP(n.inputs,e),n.inputs[0].dims.length===3)jP(n,e);else if(n.inputs[0].dims.length===5)KP(n,n.inputs,e);else{let r=Ic(e,n.inputs);L0(n,n.inputs,r)}}});var z0,M0=D(()=>{"use strict";ce();Mr();he();be();z0=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,l=s[3],p=i?Oe(u):1,c=i&&l===1,f=c?Math.floor(u/4)*4:Math.floor(u/p)*p,b=u-f,g=i?Oe(l):1,m=i?l===1?p:g:1,w=C.size(o)/g,x=[Math.ceil(w/64),1,1];xe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let v=["rank","rank"],I=[e.strides[0],e.strides[1]],$=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],O=[e.dilations[0],e.dilations[1]],E=[$[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),$[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],N=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],R=[{type:12,data:w},{type:12,data:I},{type:12,data:$},{type:12,data:O},{type:12,data:E},{type:6,data:N},{type:12,data:f},{type:12,data:l},...G(n[0].dims,n[1].dims)];t&&(R.push(...G(n[2].dims)),v.push("rank")),R.push(...G(o));let V=H=>{let j=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:N.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],oe=Me(n[0].dataType),W=i?1:2,ee=i?2:3,Be=i?3:1,X=k("W",n[1].dataType,n[1].dims.length,m),J=k("Dy",n[0].dataType,n[0].dims.length,p),me=[J,X];t&&me.push(k("bias",n[2].dataType,[o[Be]].length,g));let se=B("result",n[0].dataType,o.length,g),Fe=()=>{let pe="";if(c)p===4?pe+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?pe+=`
          dotProd = dotProd + dot(vec4<${oe}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${oe}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(pe+=`
          dotProd = dotProd + dot(vec4<${oe}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${oe}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(pe+=`
                  let xValue = ${i?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):J.get("batch","inputChannel","idyR","idyC")};
        `,p===1)pe+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${m}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let F=0;F<p;F++)pe+=`
            let wValue${F} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${F}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${F}] * wValue${F};`;return pe},st=()=>{if(b===0)return"";if(!c)throw new Error(`packInputAs4 ${c} is not true.`);let pe="";if(p===1){pe+="dotProd = dotProd";for(let F=0;F<b;F++)pe+=`
            + ${J.getByOffset(`x_offset + ${F}`)} * ${X.getByOffset(`w_offset + ${F}`)}`;pe+=";"}else if(p===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);pe+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return pe},Ve=`
            let outputIndices = ${se.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${se.indicesGet("outputIndices",0)};
            let d1 = ${se.indicesGet("outputIndices",Be)};
            let r = ${se.indicesGet("outputIndices",W)};
            let c = ${se.indicesGet("outputIndices",ee)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${se.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${oe}(dyRCorner) + ${oe}(wR)) / ${oe}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${oe}(uniforms.Dy_shape[${W}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${oe}(dyCCorner) + ${oe}(wC)) / ${oe}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${oe}(uniforms.Dy_shape[${ee}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${m};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${c?4:p}) {
                  ${Fe()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${st()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${g}]`:""};
            ${se.setByOffset("global_idx","value")};
          `;return`
    ${H.registerUniforms(j).declareVariables(...me,se)}
      ${H.mainStart()}
      ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Ve}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${p}${m}${g}${l===1}${b}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:R}),getShaderSource:V}}});var XP,ZP,JP,B0,F0,YP,V0,QP,G0,U0=D(()=>{"use strict";M0();hn();Xr();XP=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,ZP=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},JP=(n,e,r,t,o,i,a,s,u,l)=>{let p=n.length-2,c=l.length===0;u.length<p&&u.push(...Array(p-u.length).fill(0));let f=n[0],b=e[s?3:1]*o;for(let g=0,m=n.length-p-(s?1:0);g<p;++g,++m){let w=n[m],x=c?w*a[g]:l[g],v=XP(w,a[g],i[g],e[m],r[g],x);ZP(v,t,i,g,g+p),c&&l.push(a[g]*(w-1)+u[g]+(e[m]-1)*r[g]+1-i[g]-i[g+p])}l.splice(0,0,f),l.splice(s?3:1,0,b)},B0=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((c,f)=>c*f,1)===0){r.length=0;for(let c=2;c<e[1].dims.length;++c)r.push(e[1].dims[c])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((c,f)=>c+f,0)===0){let c=e[0].dims.length-2;u=new Array(c).fill(1)}let l=n.strides.slice();if(l.reduce((c,f)=>c+f,0)===0){let c=e[0].dims.length-2;l=new Array(c).fill(1)}JP(s,r,u,n.autoPad,n.group,o,l,t,a,i);let p=Object.assign({},n);return Object.assign(p,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),p},F0=n=>{let e=La(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,l=n.wIsConst(),p=n.outputPadding,c=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:p,outputShape:c,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},YP=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((p,c)=>p+c,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((p,c)=>p+c,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((p,c)=>p+c,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((p,c)=>p+c,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},V0=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(at(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(z0(i,r,t),{inputs:i})},QP=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=B0({...e,pads:s,strides:a,dilations:i,kernelShape:o},t);V0(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},G0=(n,e)=>{if(YP(n.inputs,e),n.inputs[0].dims.length===3)QP(n,e);else{let r=B0(e,n.inputs);V0(n,n.inputs,r)}}});var e3,W0,H0,q0=D(()=>{"use strict";ce();he();Ke();be();e3=(n,e,r,t)=>{let o=C.size(e),i=e.length,a=k("input",n,i),s=B("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=C.normalizeAxis(u,i),p=c=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,b=Q("uniforms.input_shape","uniforms.axis",i),g=t.reverse?f+(t.exclusive?" + 1":""):"0",m=t.reverse?b:f+(t.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${m};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...G(e,e)]}),getShaderSource:p}},W0=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(e3(t,r,o,e),{inputs:[0]})},H0=n=>{let e=n.exclusive===1,r=n.reverse===1;return de({exclusive:e,reverse:r})}});var t3,r3,n3,j0,K0,X0=D(()=>{"use strict";ce();he();Ke();be();t3=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},r3=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},n3=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,p=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=p?[r,t,o,l,l,i/l**2]:[r,t,o,i/l**2,l,l],s=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=p?[r,l,l,i/l**2,t,o]:[r,i/l**2,l,l,t,o],s=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=n.reshape(a),f=c.dims.length,b=n.dataType,g=k("a",b,f),m=B("output",b,f),w=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(g,m)}

  ${r3(s,f,g,m)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:x=>{let v=u?[r,t*l,o*l,i/l**2]:[r,i/l**2,t*l,o*l],I=C.size(v),$=c.dims,O=C.sortBasedOnPerm($,s);return{outputs:[{dims:v,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...G($,O)]}},getShaderSource:w}},j0=(n,e)=>{t3(n.inputs),n.compute(n3(n.inputs[0],e))},K0=n=>de({blocksize:n.blocksize,mode:n.mode,format:n.format})});var Ac,Va,Z0,o3,i3,Oc,Pc,J0,a3,Y0,Q0,ev=D(()=>{"use strict";ce();he();Ke();be();Ac="[a-zA-Z]|\\.\\.\\.",Va="("+Ac+")+",Z0="^"+Va+"$",o3="("+Va+",)*"+Va,i3="^"+o3+"$",Oc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Pc=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(i3)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(Z0)))throw new Error("Invalid LHS term");let p=this.processTerm(s,!0,l,u);this.lhs.push(p)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Va)))throw new Error("Invalid RHS");o.match(RegExp(Ac,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(Z0))&&!r&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ac,"g")),p=new Oc(o);return l?.forEach((c,f)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let b=i-l.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+b),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let m=String.fromCharCode("0".charCodeAt(0)+g);p.addSymbol(m,f+g),this.addSymbol(m,t[u++],o)}}else p.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,t[u++],o)}),p}},J0=n=>n+"_max",a3=(n,e,r,t)=>{let i=n.map(p=>p.length).map((p,c)=>k(`input${c}`,e,p)),a=C.size(t),s=B("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let c=[],f="var prod = 1.0;",b="var sum = 0.0;",g="sum += prod;",m=[],w=[],x=[],v=[],I=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((O,E)=>{if(r.rhs.symbolToIndices.has(E)){let N=r.rhs.symbolToIndices.get(E)?.[0];N!==void 0&&r.lhs.forEach((R,V)=>{if(O.inputIndices.includes(V)){let H=R.symbolToIndices.get(E);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(j=>{c.push(`${i[V].indicesSet(`input${V}Indices`,j,s.indicesGet("outputIndices",N))}`)})}})}else r.lhs.forEach((N,R)=>{if(O.inputIndices.includes(R)){let V=N.symbolToIndices.get(E);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(H=>{m.push(`${i[R].indicesSet(`input${R}Indices`,H,`${E}`)}`)}),v.push(`prod *= ${i[R].getByIndices(`input${R}Indices`)};`)}}),w.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${J0(E)}; ${E}++) {`),x.push("}")});let $=I?[...c,`let sum = ${i.map((O,E)=>O.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,b,...w,...m,f,...v,g,...x];return`
            ${p.registerUniforms(u.map(O=>({name:`${J0(O)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((O,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let p=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let c=n.map((f,b)=>[...G(f)]).reduce((f,b)=>f.concat(b),p);return c.push(...G(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Y0=(n,e)=>{let r=new Pc(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(a3(o,n.inputs[0].dataType,r,t))},Q0=n=>{let e=n.equation.replace(/\s+/g,"");return de({equation:e})}});var s3,tv,u3,l3,rv,nv=D(()=>{"use strict";ce();he();be();s3=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},tv=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},u3=(n,e)=>n.length>e.length?tv(n,e):tv(e,n),l3=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=u3(e,r),o=n[0].dataType,i=o===9||C.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(C.size(t)/s),l=c=>{let f=k("input",o,e.length,a),b=B("output",o,t.length,s),g;if(o===9){let m=(w,x,v="")=>`
          let outputIndices${x} = ${b.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${f.broadcastedIndicesToOffset(`outputIndices${x}`,b)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${w}[${x}] = ${v}(${f.getByOffset(`index${x}`)}[component${x}]);
        `;g=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${m("data",0,"u32")}
        ${m("data",1,"u32")}
        ${m("data",2,"u32")}
        ${m("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${f.getByOffset(`inputOffset / ${a}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(f,b)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},p=[{type:12,data:u},...G(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p})}},rv=n=>{s3(n.inputs),n.compute(l3(n.inputs),{inputs:[0]})}});var c3,ov,iv=D(()=>{"use strict";ce();he();be();Na();c3=n=>{let e=n[0].dataType,r=C.size(n[0].dims),t=C.size(n[1].dims),o=t%4===0,i=a=>{let s=k("x",e,[1],4),u=k("bias",e,[1],4),l=B("y",e,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${u.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,f=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(p).declareVariables(s,u,l)}

    ${_c(it(e))}

    ${a.mainStart(Mn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",vc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Mn/4)}})}},ov=n=>{n.inputs.length<2||C.size(n.inputs[1].dims)===0?e0(n):n.compute(c3(n.inputs))}});var d3,p3,av,sv,uv=D(()=>{"use strict";ce();he();Ke();be();d3=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},p3=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=C.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,l=Math.ceil(C.size(a)/u),p=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...G(n[0].dims,n[1].dims,a)],c=f=>{let b=k("data",n[0].dataType,n[0].dims.length,u),g=k("inputIndices",n[1].dataType,n[1].dims.length),m=B("output",n[0].dataType,a.length,u),w=v=>{let I=t.length,$=`var indicesIndices${v}  = ${g.type.indices}(0);`;for(let O=0;O<I;O++)$+=`${I>1?`indicesIndices${v}[${O}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${O}]`:`outputIndices${v}`};`;$+=`
          var idx${v} = ${g.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${b.type.indices};
        `;for(let O=0,E=0;O<o;O++)O===i?($+=`${o>1?`dataIndices${v}[${O}]`:`dataIndices${v}`} = u32(idx${v});`,E+=I):($+=`${o>1?`dataIndices${v}[${O}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${E}]`:`outputIndices${v}`};`,E++);return $},x;if(n[0].dataType===9){let v=(I,$,O="")=>`
          let outputIndices${$} = ${m.offsetToIndices(`outputOffset + ${$}u`)};
          ${w($)};
          let offset${$} = ${b.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${O}(${b.getByOffset(`index${$}`)}[component${$}]);
        `;x=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${m.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${m.offsetToIndices("global_idx")};
      ${w("")};
      let value = ${b.getByIndices("dataIndices")};
      ${m.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,g,m)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c}},av=n=>de({axis:n.axis}),sv=(n,e)=>{let r=n.inputs;d3(r),n.compute(p3(n.inputs,e))}});var f3,lv,cv,dv=D(()=>{"use strict";ce();he();be();f3=(n,e,r,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],p=[i];l.push(...G(e.dims,p));let c=f=>{let b=k("indices_data",e.dataType,e.dims.length),g=B("input_slice_offsets_data",12,1,1),m=[b,g],w=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(...m)}
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
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:c},{inputs:[e],outputs:[-1]})[0]},lv=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=C.sizeToDimension(i,i.length-1),u=C.sizeFromDimension(t,e.batchDims+a),l=C.sizeToDimension(t,e.batchDims),p=C.sizeFromDimension(t,e.batchDims),c=s/l,f=new Array(a),b=u;for(let $=0;$<a;++$)f[a-1-$]=b,b*=t[e.batchDims+a-1-$];let g=f3(n,r[1],f,e.batchDims,t,s,c,p,a),m=e.batchDims+a;if(m>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let w=i.slice(0,-1).concat(t.slice(m)),x=C.size(w),v=[{type:12,data:x},{type:12,data:u},...G(r[0].dims,g.dims,w)],I=$=>{let O=k("data",r[0].dataType,r[0].dims.length),E=k("slice_offsets",12,g.dims.length),N=B("output",r[0].dataType,w.length);return`
          ${$.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(O,E,N)}
            ${$.mainStart()}
            ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:w,dataType:o}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:v}),getShaderSource:I},{inputs:[r[0],g]})},cv=n=>({batchDims:n.batch_dims,cacheKey:""})});var h3,m3,pv,fv,hv=D(()=>{"use strict";ce();he();Ke();be();h3=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=C.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},m3=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=C.normalizeAxis(e.gatherAxis,o),a=C.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=C.size(s),l=n[2].dataType,c=n[0].dataType===22,f=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...G(...n.map((g,m)=>g.dims),s)],b=g=>{let m=k("data",n[0].dataType,n[0].dims.length),w=k("inputIndices",n[1].dataType,n[1].dims.length),x=k("scales",n[2].dataType,n[2].dims.length),v=n.length>3?k("zeroPoint",n[3].dataType,n[3].dims.length):void 0,I=B("output",l,s.length),$=[m,w,x];v&&$.push(v);let O=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(O).declareVariables(...$,I)}
        ${g.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${it(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((g,m)=>m!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(g,m)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:b}},pv=(n,e)=>{let r=n.inputs;h3(r,e),n.compute(m3(n.inputs,e))},fv=n=>de({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var g3,b3,mv,gv,bv=D(()=>{"use strict";ce();he();Ke();be();g3=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},b3=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=C.normalizeAxis(e.axis,o),u=r[s],l=i.slice(0),p=C.size(l),c=k("input",t,o),f=k("indicesInput",a,i.length),b=B("output",t,l.length),g=[{type:12,data:p},{type:6,data:u},{type:12,data:s}];return g.push(...G(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,f,b)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},mv=n=>de({axis:n.axis}),gv=(n,e)=>{let r=n.inputs;g3(r),n.compute(b3(n.inputs,e))}});var y3,_3,yv,_v,vv=D(()=>{"use strict";ce();he();be();y3=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},_3=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Aa.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),p=Math.ceil(o/u),c=!0,f=C.size(s),b=[{type:12,data:c?l:f},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],g=["type","type"];n.length===3&&(b.push(...G(n[2].dims)),g.push("rank")),b.push(...G(s));let m=x=>{let v="";e.transA&&e.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",$=k("a",n[0].dataType,n[0].dims),O=k("b",n[1].dataType,n[1].dims),E=$.type.value,N=null,R=[$,O];n.length===3&&(N=k("c",n[2].dataType,n[2].dims.length),R.push(N));let V=B("output",n[0].dataType,s.length);R.push(V);let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(H).declareVariables(...R)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${I}
    ${(()=>N!=null?`let cOffset = ${N.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${E}(uniforms.beta) * ${N.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},w=x=>{let v=k("a",n[0].dataType,n[0].dims),I=k("b",n[1].dataType,n[1].dims),$=null,O=[v,I];n.length===3&&($=k("c",n[2].dataType,n[2].dims.length),O.push($));let E=B("output",n[0].dataType,s.length);O.push(E);let N=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],R="",V="";e.transA&&e.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let H=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(N).declareVariables(...O)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${x.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${R}
      }
      workgroupBarrier();
    }

    ${H}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>$!=null?`let cOffset = ${$.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${$.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:l*p},programUniforms:b}),getShaderSource:w}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:m}},yv=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},_v=(n,e)=>{y3(n.inputs),n.compute(_3(n.inputs,e))}});var Zr,mn,ao,so,v3,x3,w3,T3,I3,S3,$3,A3,xv,wv,Tv=D(()=>{"use strict";ce();he();Ke();be();[Zr,mn,ao,so]=[0,1,2,3],v3=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},x3=`
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
`,w3=n=>`
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
`,T3=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,I3=n=>`
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
`,S3=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Zr}] = batch;
     indices[${mn}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${ao}] = u32(r);
            indices[${so}] = u32(c);
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
`,$3=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Zr}], indices[${mn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Zr}], indices[${mn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Zr}], indices[${mn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Zr}], indices[${mn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Zr}], indices[${mn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Zr}], indices[${mn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,A3=(n,e)=>{let r=k("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=k("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Zr,mn,ao,so]=[0,3,1,2]);let a=B("output",n[0].dataType,i.length),s=r.type.value,u=C.size(i),l=[{type:12,data:u},...G(n[0].dims,t,i)],p=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${x3}
  ${w3(s)}
  ${T3(e)}
  ${I3(e)}
  ${S3(r,s,e)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      var grid_indices = vec3<u32>(indices[${Zr}], indices[${ao}], indices[${so}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${$3(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let f=C.size(i);return{outputs:[{dims:i,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:l}},getShaderSource:p}},xv=(n,e)=>{v3(n.inputs),n.compute(A3(n.inputs,e))},wv=n=>de({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var wt,E3,Sv,Iv,C3,Vo,$v,Ec=D(()=>{"use strict";ce();he();Ke();$a();Da();be();Xr();wt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,E3=(n,e)=>{let r=n[0],t=wt(n,1),o=wt(n,2),i=wt(n,3),a=wt(n,4),s=wt(n,5),u=wt(n,6),l=wt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],c=r.dims[1],f=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],b=c,g=0,m=0,w=Math.floor(f/e.numHeads);if(u&&l&&C.size(u.dims)&&C.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==e.numHeads||u.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==p||l.dims[1]!==e.numHeads||l.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],m=u.dims[2]}else if(u&&C.size(u.dims)||l&&C.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(t&&C.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,b=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,b=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,b=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(i&&C.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=g+b,I=0;if(a&&C.size(a.dims)>0){I=8;let N=a.dims;throw N.length===1?N[0]===p?I=1:N[0]===3*p+2&&(I=3):N.length===2&&N[0]===p&&N[1]===v&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,O=f;if(o&&C.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(a&&C.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&C.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==p||s.dims[1]!==e.numHeads||s.dims[2]!==c||s.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:v,maxSequenceLength:m,inputHiddenSize:0,hiddenSize:f,vHiddenSize:O,headSize:w,vHeadSize:Math.floor(O/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:x}},Sv=n=>de({...n}),Iv=de({perm:[0,2,1,3]}),C3=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=C.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],p=c=>{let f=B("qkv_with_bias",e.dataType,s),b=k("qkv",e.dataType,s),g=k("bias",r.dataType,s),m=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(b,g,f)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p},{inputs:[e,r],outputs:[-1]})[0]},Vo=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&C.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=C3(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(at(u,Iv.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(at(u,Iv.perm),{inputs:[u],outputs:[-1]})[0]},$v=(n,e)=>{let r=E3(n.inputs,e),t=n.inputs[0],o=wt(n.inputs,1),i=wt(n.inputs,2),a=wt(n.inputs,3),s=wt(n.inputs,4),u=wt(n.inputs,5),l=wt(n.inputs,6),p=wt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,f=Vo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(c)return io(n,f,o,i,s,void 0,l,p,u,r);if(!o||!i)throw new Error("key and value must be provided");let b=Vo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=Vo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);io(n,f,b,g,s,void 0,l,p,u,r)}});var D3,k3,N3,L3,Cc,Av,Ov,Dc=D(()=>{"use strict";ce();he();Ke();be();D3=n=>{if(!n||n.length<1)throw new Error("too few inputs")},k3=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),de({numOutputs:t,axis:e.axis,splitSizes:r})},N3=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,L3=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Cc=(n,e)=>{let r=n[0].dims,t=C.size(r),o=n[0].dataType,i=C.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=k("input",o,r.length),u=new Array(e.numOutputs),l=[],p=[],c=0,f=[{type:12,data:t}];for(let g=0;g<e.numOutputs;g++){c+=e.splitSizes[g],u[g]=c;let m=r.slice();m[i]=e.splitSizes[g],p.push(m),a[g]=B(`output${g}`,o,m.length),l.push({dims:p[g],dataType:n[0].dataType})}f.push({type:12,data:u},...G(r,...p));let b=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${N3(u.length)}
  ${L3(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:f})}},Av=(n,e)=>{D3(n.inputs);let r=n.inputs.length===1?e:k3(n.inputs,e);n.compute(Cc(n.inputs,r),{inputs:[0]})},Ov=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return de({axis:e,numOutputs:t,splitSizes:r})}});var R3,z3,Pv,Ev,Cv=D(()=>{"use strict";Ke();Da();Ec();Dc();Xr();R3=(n,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],l=r.dims[1],p=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],c=l,f=0,b=!t||t.dims.length===0,g=Math.floor(b?p/(e.numHeads+2*e.kvNumHeads):p/e.numHeads);b&&(p=g*e.numHeads);let m=i&&i.dims.length!==0,w=a&&a.dims.length!==0;if(m&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(m&&w){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(m||w)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');c=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let I=0,$=!1,O=e.kvNumHeads?g*e.kvNumHeads:p;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=n.length>4?n[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let N=-1,R=-1,V=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:c,totalSequenceLength:N,maxSequenceLength:R,inputHiddenSize:0,hiddenSize:p,vHiddenSize:O,headSize:g,vHeadSize:Math.floor(O/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:V,passPastInKv:$,qkvFormat:v}},z3=de({perm:[0,2,1,3]}),Pv=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(at(t,z3.perm),{inputs:[t],outputs:[-1]})[0]),t},Ev=(n,e)=>{let r=R3(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=de({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[f,b,g]=!o&&!i?n.compute(Cc([t],c),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],m=Vo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,f,void 0,0);io(n,m,Pv(n,b,r),Pv(n,g,r),void 0,void 0,a,s,void 0,r,u,l)}});var Dv,M3,B3,kv,Nv=D(()=>{"use strict";ce();he();Xr();be();Dv=(n,e,r,t,o,i,a,s)=>{let u=Oe(i),l=u===1?"f32":`vec${u}f`,p=u===1?"vec2f":`mat2x${u}f`,c=o*a,f=64;c===1&&(f=256);let b=[o,a,i/u],g=[o,a,2],m=["rank","type","type"],w=[];w.push(...G(b,g));let x=v=>{let I=k("x",e.dataType,3,u),$=k("scale",r.dataType,r.dims),O=k("bias",t.dataType,t.dims),E=B("output",1,3,2),N=[I,$,O,E];return`
  var<workgroup> workgroup_shared : array<${p}, ${f}>;
  const workgroup_size = ${f}u;
  ${v.declareVariables(...N)}
  ${v.mainStart(f)}
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
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${jt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${jt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:c},programUniforms:w}),getShaderSource:x},{inputs:[e,r,t],outputs:[-1]})[0]},M3=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=C.sizeFromDimension(t,i),l=Oe(u),p=C.size(o)/l,c=Dv(n,e[0],e[1],e[2],a,u,s,r.epsilon),f=[a,s,u/l],b=[a,s],g=["type","none"],m=w=>{let x=k("x",e[0].dataType,f.length,l),v=k("scale_shift",1,b.length,2),I=B("output",e[0].dataType,f.length,l),$=[x,v,I];return`
  ${w.registerUniform("output_size","u32").declareVariables(...$)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...G(f,b,f)]}),getShaderSource:m},{inputs:[e[0],c]})},B3=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=C.sizeFromDimension(t,1)/a,u=Oe(a),l=C.size(o)/u,p=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],c=["type","type"],f=!1,b=[0,t.length-1];for(let x=0;x<t.length-2;x++)f=f||t[x+1]!==1,b.push(x+1);f=f&&t[t.length-1]!==1;let g=f?n.compute(at(n.inputs[0],b),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(x,v)=>t[b[v]])),m=Dv(n,g,e[1],e[2],i,s,a,r.epsilon),w=x=>{let v=Me(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,$=N=>{let R=N===0?"x":"y",V=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${v}(${V}(scale.${R}))`;case 2:return`vec2<${v}>(${V}(scale[0].${R}, scale[1].${R}))`;case 4:return`vec4<${v}>(${V}(scale[0].${R}, scale[1].${R}, scale[2].${R}, scale[3].${R}))`;default:throw new Error(`Not supported compoents ${u}`)}},O=k("input",e[0].dataType,e[0].dims,u),E=B("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${O.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${$(0)}, ${$(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:w},{inputs:[e[0],m]})},kv=(n,e)=>{e.format==="NHWC"?B3(n,n.inputs,e):M3(n,n.inputs,e)}});var F3,V3,Lv,Rv=D(()=>{"use strict";ce();he();be();F3=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},V3=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=C.normalizeAxis(e.axis,o.length),l=C.sizeToDimension(o,u),p=C.sizeFromDimension(o,u),c=C.size(i.dims),f=a?C.size(a.dims):0;if(c!==p||a&&f!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${f}`);let b=[];for(let O=0;O<o.length;++O)O<u?b.push(o[O]):b.push(1);let g=Oe(p),m=["type","type"],w=[{type:12,data:l},{type:1,data:p},{type:12,data:Math.floor(p/g)},{type:1,data:e.epsilon}];a&&m.push("type");let x=r>1,v=r>2,I=O=>{let E=Me(n[0].dataType),N=[k("x",n[0].dataType,n[0].dims,g),k("scale",i.dataType,i.dims,g)];a&&N.push(k("bias",a.dataType,a.dims,g)),N.push(B("output",n[0].dataType,s,g)),x&&N.push(B("mean_data_output",1,b)),v&&N.push(B("inv_std_output",1,b));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${O.registerUniforms(R).declareVariables(...N)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${mc("f32",g)};
    var mean_square_vector = ${mc("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Bn(E,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${jt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${jt("mean_square_vector",g)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Bn(E,g,"x[j + offset]")};
      let f32scale = ${Bn(E,g,"scale[j]")};
      output[j + offset] = ${N[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Bn(E,g,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:s,dataType:n[0].dataType}];return x&&$.push({dims:b,dataType:1}),v&&$.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${t}`,inputDependencies:m},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:w}),getShaderSource:I}},Lv=(n,e)=>{F3(n.inputs),n.compute(V3(n.inputs,e,n.outputCount))}});var G3,zv,Mv=D(()=>{"use strict";he();Ma();Ba();G3=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},zv=n=>{G3(n.inputs);let e=Br.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(za(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=C.size(n.inputs[0].dims.slice(0,-2)),a=C.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),l=[1,i,r],p=[s,u];n.compute(Fo(p,{activation:""},e,l),{inputs:p})}else n.compute(Fo(n.inputs,{activation:""},e))}}});var U3,W3,H3,Bv,Fv,Vv=D(()=>{"use strict";ce();he();Ke();be();U3=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!C.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(C.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let p=n[3].dims,c=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(C.size(p)!==c)throw new Error("zeroPoints input size error.")}},W3=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=C.size(s),p=n[1].dims[2]/4,c=n[0].dataType,f=Oe(e.k),b=Oe(p),g=Oe(a),m=s.concat([o,a]),w=o>1&&a/g%2===0?2:1,x=C.size(m)/g/w,v=64,I=[],$=[u,o,i/f],O=C.convertShape(n[1].dims).slice();O.splice(-1,1,p/b),I.push(...G($)),I.push(...G(O)),I.push(...G(n[2].dims)),n.length===4&&I.push(...G(C.convertShape(n[3].dims)));let E=[u,o,a/g];I.push(...G(E));let N=R=>{let V=$.length,H=k("a",n[0].dataType,V,f),j=k("b",12,O.length,b),oe=k("scales",n[2].dataType,n[2].dims.length),W=[H,j,oe],ee=n.length===4?k("zero_points",12,n[3].dims.length):void 0;ee&&W.push(ee);let Be=E.length,X=B("output",n[0].dataType,Be,g),J=Me(n[0].dataType),me=(()=>{switch(f){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${f}-component is not supported.`)}})(),se=()=>{let Ve=`
          // reuse a data
            var input_offset = ${H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`)};
            var a_data: ${me};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${H.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let pe=0;pe<g*w;pe++)Ve+=`
            b_value = ${b===1?`b${pe}_data`:`b${pe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${me}(${Array.from({length:4},(F,re)=>`${J}(b_value_lower[${re}]), ${J}(b_value_upper[${re}])`).join(", ")});
            b_dequantized_values = ${(()=>f===1?`${me}(${Array.from({length:8},(F,re)=>`(b_quantized_values[${re}] - ${ee?`zero_point${pe}`:"zero_point"}) * scale${pe}`).join(", ")});`:`(b_quantized_values - ${me}(${Array(8).fill(`${ee?`zero_point${pe}`:"zero_point"}`).join(",")})) * scale${pe};`)()};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(pe/g)}]${g>1?`[${pe%g}]`:""} += ${Array.from({length:8/f},(F,re)=>`${f===1?`a_data[${re}] * b_dequantized_values[${re}]`:`dot(a_data[${re}], b_dequantized_values[${re}])`}`).join(" + ")};
          `;return Ve},Fe=()=>{let Ve=`
            var col_index = col * ${g};
            ${ee?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let pe=0;pe<g*w;pe++)Ve+=`
            let scale${pe} = ${oe.getByOffset("col_index * nBlocksPerCol + block")};
            ${ee?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${pe} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Ve},st=()=>{let Ve=`col_index = col * ${g};`;for(let pe=0;pe<g*w;pe++)Ve+=`
            let b${pe}_data = ${j.getByIndices(`${j.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Ve+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${me};
            var b_dequantized_values: ${me};`,Ve};return`
        var<workgroup> workgroup_shared: array<${X.type.value}, ${w*v}>;
        ${R.declareVariables(...W,X)}
        ${R.mainStart([v,1,1])}
          let output_indices = ${X.offsetToIndices(`(global_idx / ${v}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/f};
            ${Fe()}
            for (var word: u32 = 0; word < ${p}; word += ${b}) {
              ${st()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${se()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${X.setByIndices(`${X.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${f};${b};${g};${w};${v}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x},programUniforms:I}),getShaderSource:N}},H3=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=C.size(s),p=n[1].dims[2]/4,c=n[0].dataType,f=Oe(e.k),b=Oe(p),g=s.concat([o,a]),m=128,w=a%8===0?8:a%4===0?4:1,x=m/w,v=x*b*8,I=v/f,$=v/e.blockSize,O=C.size(g)/w,E=[],N=[u,o,i/f],R=C.convertShape(n[1].dims).slice();R.splice(-1,1,p/b),E.push(...G(N)),E.push(...G(R)),E.push(...G(n[2].dims)),n.length===4&&E.push(...G(C.convertShape(n[3].dims)));let V=[u,o,a];E.push(...G(V));let H=j=>{let oe=N.length,W=k("a",n[0].dataType,oe,f),ee=k("b",12,R.length,b),Be=k("scales",n[2].dataType,n[2].dims.length),X=[W,ee,Be],J=n.length===4?k("zero_points",12,n[3].dims.length):void 0;J&&X.push(J);let me=V.length,se=B("output",n[0].dataType,me),Fe=Me(n[0].dataType),st=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${Fe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Fe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Fe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Fe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${se.type.value}, ${x}>, ${w}>;
        ${j.declareVariables(...X,se)}
        ${j.mainStart([x,w,1])}
          let output_indices = ${se.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${$} + local_id.x;
            ${J?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Fe}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Fe}(8);`}
            let scale = ${Be.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ee.getByIndices(`${ee.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/f};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${st()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Fe}>(${Array.from({length:4},(Ve,pe)=>`${Fe}(b_value_lower[${pe}]), ${Fe}(b_value_upper[${pe}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Fe}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ve,pe)=>`${`dot(a_data${pe}, b_dequantized_values[${pe}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${se.type.value} = ${se.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${se.setByIndices(`${se.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${f};${b};${x};${w}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:O},programUniforms:E}),getShaderSource:H}},Bv=(n,e)=>{U3(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(H3(n.inputs,e)):n.compute(W3(n.inputs,e))},Fv=n=>de(n)});var q3,j3,K3,X3,Z3,J3,Y3,Q3,Gv,Uv=D(()=>{"use strict";ce();he();be();q3=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},j3=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},K3=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Q("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Q("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Q("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},X3=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Q("uniforms.x_shape",o,e)})) {
                  k = i32(${Q("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${Q("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Z3=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${Q("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${Q("uniforms.x_shape",o,e)})) {
                  k -= i32(${Q("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${Q("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},J3=(n,e,r)=>{switch(r.mode){case 0:return j3(n,e,r.pads.length);case 1:return K3(n,e,r.pads.length);case 2:return X3(n,e,r.pads.length);case 3:return Z3(n,e,r.pads.length);default:throw new Error("Invalid mode")}},Y3=(n,e)=>{let r=C.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=C.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...G(n[0].dims,r));let s=["rank"],u=l=>{let p=B("output",n[0].dataType,r.length),c=k("x",n[0].dataType,t.length),f=c.type.value,b=J3(p,t.length,e),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${l.registerUniforms(g).declareVariables(c,p)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(r)/64)},programUniforms:i}),getShaderSource:u}},Q3=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Gv=(n,e)=>{q3(n.inputs);let r=Q3(n.inputs,e);n.compute(Y3(n.inputs,r),{inputs:[0]})}});var Ga,Wv,Hv,qv,jv,eE,tE,Kv,Xv,Zv,Jv,Yv,Qv,ex,tx,rx,nx,ox,ix,ax=D(()=>{"use strict";ft();ce();he();be();Ga=n=>{if(fe.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Wv=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();zn.adjustPoolAttributes(r,o,a,s,u,l);let p=zn.computePoolOutputShape(r,o,s,u,a,l,e.autoPad),c=Object.assign({},e);i?Object.assign(c,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let f=p.slice();return f.push(f.splice(1,1)[0]),[c,t?f:p]},Hv=(n,e)=>{let r=e.format==="NHWC",t=C.size(n),o=C.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],p=e.pads[e.pads.length-1],c=!!(l+p);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:p}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],g=e.strides[e.strides.length-2],m=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2];f=!!(m+w),i.push({type:12,data:b},{type:12,data:g},{type:12,data:m},{type:12,data:w}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,c,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=C.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,p)=>l+p);return[i,a,!!u,!1,!1]}},qv=(n,e,r,t,o,i,a,s,u,l,p,c)=>{let f=o.format==="NHWC",b=e.type.value,g=B("output",e.type.tensor,t);if(o.kernelShape.length<=2){let m="",w="",x="",v=r-(f?2:1);if(p?m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=r-(f?3:2);c?w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${b}(${s});
              var pad = 0;
              ${w}
              ${m}
              ${x}
              ${a}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let m=o.kernelShape.length,w=o.pads.length,x="";return l?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:x=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${m}>;

              var value = ${b}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${m-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",m)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",m)};
                }
                offsets[${m-1}] = offset;

                isPad = false;
                for (var j = ${r-m}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${r-m}u`,m)}
                    + offsets[j - ${r-m}u] - ${Q("uniforms.pads","j - 2u",w)};
                  ${x}
              }
              ${a}

              output[global_idx] = value;
            }`}},jv=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,eE=n=>`${jv(n)};${n.countIncludePad}`,tE=n=>`${jv(n)};${n.storageOrder};${n.dilations}`,Kv=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Xv=(n,e,r,t)=>{let[o,i]=Wv(e,t,r),a=k("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[p,c,f,b,g]=Hv(i,o);p.push(...G(e.dims,i));let m=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${f};${b};${g}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:p}),getShaderSource:w=>qv(w,a,e.dims.length,i.length,o,u,l,0,c,f,b,g)}},Zv=n=>{let e=n.count_include_pad!==0,r=Kv(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:eE(t)}},Jv=(n,e)=>{Ga(n.inputs),n.compute(Xv("AveragePool",n.inputs[0],!1,e))},Yv={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Qv=n=>{let e=n.format;return{format:e,...Yv,cacheKey:e}},ex=(n,e)=>{Ga(n.inputs),n.compute(Xv("GlobalAveragePool",n.inputs[0],!0,e))},tx=(n,e,r,t)=>{let[o,i]=Wv(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=k("x",e.dataType,e.dims.length),l=["rank"],[p,c,f,b,g]=Hv(i,o);return p.push(...G(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${f};${b};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:p}),getShaderSource:m=>qv(m,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,c,f,b,g)}},rx=(n,e)=>{Ga(n.inputs),n.compute(tx("MaxPool",n.inputs[0],!1,e))},nx=n=>{let e=n.storage_order,r=n.dilations,t=Kv(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:tE(o)}},ox=n=>{let e=n.format;return{format:e,...Yv,cacheKey:e}},ix=(n,e)=>{Ga(n.inputs),n.compute(tx("GlobalMaxPool",n.inputs[0],!0,e))}});var nE,oE,sx,ux,lx=D(()=>{"use strict";ce();he();Ke();be();nE=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},oE=(n,e)=>{let r=C.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=C.size(i),u=t===3||t===2,l=u?[Math.ceil(C.size(n[0].dims)/4)]:n[0].dims,p=n[1].dims,c=n.length>2?n[2]:void 0,f=c?u?[Math.ceil(C.size(c.dims)/4)]:c.dims:void 0,b=p.length===0||p.length===1&&p[0]===1,g=b===!1&&p.length===1,m=Oe(s),w=b&&(!u||m===4),x=w?m:1,v=w&&!u?m:1,I=k("input",u?12:t,l.length,v),$=k("scale",a,p.length),O=c?k("zero_point",u?12:t,f.length):void 0,E=B("output",a,i.length,x),N=[I,$];O&&N.push(O);let R=[l,p];c&&R.push(f);let V=[{type:12,data:s/x},{type:12,data:r},{type:12,data:e.blockSize},...G(...R,i)],H=j=>{let oe=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${j.registerUniforms(oe).declareVariables(...N,E)}
      ${j.mainStart()}
          ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>b?`let scale_value= ${$.getByOffset("0")}`:g?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>O?b?u?`
                let zero_point_input = ${O.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${O.getByOffset("0")}`:g?u?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${O.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${O.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${$.indicesToOffset("scale_indices")};
                let zero_point_input = ${O.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${O.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`)()};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:O?["rank","rank","rank"]:["rank","rank"]},getShaderSource:H,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/x/64),y:1,z:1},programUniforms:V})}},sx=(n,e)=>{nE(n.inputs,e),n.compute(oE(n.inputs,e))},ux=n=>de({axis:n.axis,blockSize:n.blockSize})});var iE,aE,cx,dx=D(()=>{"use strict";ft();ce();be();iE=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},aE=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...G(i)],u=l=>{let p=B("output",t,i.length),c=p.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(f).declareVariables(p)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},cx=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),fe.webgpu.validateInputContent&&iE(e,r,t),n.compute(aE(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var sE,uE,px,fx,hx=D(()=>{"use strict";ce();he();Ke();be();sE=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},uE=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(C.size(t)/i),s=t[t.length-1],u=C.sizeFromDimension(r,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...G(n[1].dims,n[2].dims,o)],p=c=>{let f=k("indices",n[1].dataType,n[1].dims.length),b=k("updates",n[2].dataType,n[2].dims.length,i),g=e.reduction!=="none"&&e.reduction!==""?Vy("output",n[0].dataType,o.length):B("output",n[0].dataType,o.length,i);return`
      ${c.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,b,g)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${n[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
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
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${sE(e.reduction,"output[data_offset + i]","value",g.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:p}},px=n=>de({reduction:n.reduction}),fx=(n,e)=>{n.compute(uE(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var lE,cE,dE,pE,fE,hE,mE,gE,bE,yE,_E,mx,vE,xE,wE,TE,IE,gx,bx,yx=D(()=>{"use strict";ce();he();Ke();be();lE=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},cE=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},dE=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(p=>i.push(p));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(p=>t.push(p)),t.length!==0&&t.length!==l&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");lE(t,e),e.axes.length>0&&cE(t,e.axes,l).forEach((p,c)=>t[c]=p)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(p=>o.push(Number(p))),o.length!==0&&o.length!==l&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},pE=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`return ${e}(xResized) / ${e}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${e}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${e}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${e}(lengthResized - 1);
                    return whole + fract;
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",fE=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",hE=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},mE=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},gE=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},bE=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",t)};
        var roi_low = ${Q("uniforms.roi","i",o)};
        var roi_hi = ${Q("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,yE=(n,e,r,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",i)};
          var roi_hi = ${Q("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",t.length)};
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
        ${n.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,_E=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,mx=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",vE=(n,e,r,t,o)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${mx(n,l,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
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
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},xE=(n,e,r,t,o,i,a,s,u,l)=>{let p=r.length===2,c=!0,[f,b]=p?[0,1]:c?[2,3]:[1,2],g=n.type.value,m=w=>{let x=w===f?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${g} {
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
          var ${x}: ${g} = originalIdx + ${g}(i);
          if (${x} < 0 || ${x} >= ${r[w]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${x} = max(0, min(${x}, ${r[w]} - 1));`)()};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",w,`u32(${x})`)};
          data[i + 1] = ${w===f?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(f)};
    ${m(b)};
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
    `},wE=(n,e,r,t,o)=>{let[a,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${mx(n,p,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
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
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
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
    }`},TE=(n,e,r,t,o,i)=>{let a=n.dims,s=hE(i,e.axes,a.length),u=mE(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((v,I)=>v===0?1:u[I]/v),e.keepAspectRatioPolicy!=="stretch"&&(u=gE(a,l,e)));let p=B("output",n.dataType,u.length),c=k("input",n.dataType,a.length),f=C.size(u),b=a.length===u.length&&a.every((v,I)=>v===u[I]),g=e.coordinateTransformMode==="tf_crop_and_resize",m=e.extrapolationValue,w=c.type.value,x=v=>`
      ${b?"":`
      ${pE(e.coordinateTransformMode,w)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${_E(c,a)};
              ${fE(e.nearestMode,r,w)};
              ${yE(c,p,a,u,l.length,s.length,g)};
              `;case"linear":return`
              ${bE(p,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${vE(c,p,a,g,m)}`;if(a.length===3||a.length===5)return`${wE(c,p,a,g,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${xE(c,p,a,u,l,s,e.cubicCoeffA,g,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(c,p)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${l.length>0?l:""}|${o.length>0?o:""}|${s.length>0?s:""}|${b}|${a}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:s},...G(a,u)]})}},IE=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},gx=(n,e)=>{let r=[],t=[],o=[],i=IE(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");dE(n.inputs,e,i,r,t,o),n.compute(TE(n.inputs[0],e,i,r,t,o),{inputs:[0]})},bx=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return de({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var SE,$E,_x,vx=D(()=>{"use strict";ce();he();Ke();be();SE=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!C.areEqual(t.dims,[])&&!C.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!C.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],p=o.dims[0],c=C.sizeFromDimension(r.dims,1)/l,f=s===0?o.dims[1]*2:c/a;if(s>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(f/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},$E=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=C.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=s/u,p=n[2].dims[1],c=o===0?p*2:l/t,f=new Array(a,u,l/c,c-p),b=C.computeStrides(f),g=[{type:1,data:i},{type:12,data:f},{type:12,data:b},...n[0].dims.length===3?new Array({type:12,data:[s,l,c,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,c,u*c,1]}):[],...G(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],m=w=>{let x=k("input",n[0].dataType,n[0].dims.length),v=k("position_ids",n[1].dataType,n[1].dims.length),I=k("cos_cache",n[2].dataType,n[2].dims.length),$=k("sin_cache",n[3].dataType,n[3].dims.length),O=B("output",n[0].dataType,n[0].dims.length);return w.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${w.declareVariables(x,v,I,$,O)}

        ${w.mainStart(Mn)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",B("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${O.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${O.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${O.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:de({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(f)/Mn)},programUniforms:g})}},_x=(n,e)=>{SE(n.inputs,e),n.compute($E(n.inputs,e))}});var AE,OE,xx,wx=D(()=>{"use strict";ce();he();be();AE=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},OE=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=C.size(i),s=i,u=a,l=i.slice(-1)[0],p=t?i.slice(0,-1).concat(1):[],c=!o&&n.length>3,f=n.length>4,b=t&&r>1,g=t&&r>2,m=r>3,w=64,x=Oe(l),v=[{type:12,data:u},{type:12,data:x},{type:12,data:l},{type:1,data:e.epsilon}],I=O=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],N=[k("x",n[0].dataType,n[0].dims,x),k("skip",n[1].dataType,n[1].dims,x),k("gamma",n[2].dataType,n[2].dims,x)];c&&N.push(k("beta",n[3].dataType,n[3].dims,x)),f&&N.push(k("bias",n[4].dataType,n[4].dims,x)),N.push(B("output",n[0].dataType,s,x)),b&&N.push(B("mean_output",1,p)),g&&N.push(B("inv_std_output",1,p)),m&&N.push(B("input_skip_bias_sum",n[0].dataType,s,x));let R=Me(n[0].dataType),V=Me(1,x);return`

      ${O.registerUniforms(E).declareVariables(...N)}
      var<workgroup> sum_shared : array<${V}, ${w}>;
      var<workgroup> sum_squared_shared : array<${V}, ${w}>;

      ${O.mainStart([w,1,1])}
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
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Bn(R,x,"value")};
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
        let mean = ${jt("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${jt("square_sum",x)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:s,dataType:n[0].dataType}];return r>1&&$.push({dims:p,dataType:1}),r>2&&$.push({dims:p,dataType:1}),r>3&&$.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${b};${g};${m}`,inputDependencies:n.map((O,E)=>"type")},getShaderSource:I,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:v})}},xx=(n,e)=>{AE(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(OE(n.inputs,e,n.outputCount,!1),{outputs:t})}});var PE,Ua,EE,Tx,CE,DE,Ix,Sx,$x=D(()=>{"use strict";ce();he();Ke();be();PE=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ua=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},EE=(n,e)=>{if(n.length>1){let r=Ua(n,1),t=Ua(n,2),o=Ua(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),de({starts:r,ends:t,axes:o})}else return e},Tx=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},CE=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
            let steps_i = ${Q("uniforms.steps","i",r.length)};
            let signs_i = ${Q("uniforms.signs","i",r.length)};
            let starts_i = ${Q("uniforms.starts","i",r.length)};
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
      }`,DE=(n,e)=>{let r=n[0].dims,t=C.size(r),o=e.axes.length>0?C.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ua(n,4);i.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((x,v)=>Tx(x,v,r,o,i)),s=e.ends.map((x,v)=>Tx(x,v,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let x=0;x<r.length;++x)o.includes(x)||(a.splice(x,0,0),s.splice(x,0,r[x]),i.splice(x,0,1));let u=i.map(x=>Math.sign(x));i.forEach((x,v,I)=>{if(x<0){let $=(s[v]-a[v])/x,O=a[v],E=O+$*i[v];a[v]=E,s[v]=O,I[v]=-x}});let l=r.slice(0);o.forEach((x,v)=>{l[x]=Math.ceil((s[x]-a[x])/i[x])});let p={dims:l,dataType:n[0].dataType},c=B("output",n[0].dataType,l.length),f=k("input",n[0].dataType,n[0].dims.length),b=C.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],m=[{type:12,data:b},{type:12,data:a},{type:6,data:u},{type:12,data:i},...G(n[0].dims,l)],w=x=>`
      ${x.registerUniforms(g).declareVariables(f,c)}
        ${CE(f,c,r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:m})}},Ix=(n,e)=>{PE(n.inputs,e);let r=EE(n.inputs,e);n.compute(DE(n.inputs,r),{inputs:[0]})},Sx=n=>{let e=n.starts,r=n.ends,t=n.axes;return de({starts:e,ends:r,axes:t})}});var kE,NE,Ax,Ox,Px=D(()=>{"use strict";ce();he();Ke();Xr();be();kE=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},NE=(n,e)=>{let r=n.inputs[0],t=r.dims,o=C.size(t),i=t.length,a=C.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(N,R)=>R),l[a]=i-1,l[i-1]=a,u=n.compute(at(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let p=u.dims,c=p[i-1],f=o/c,b=Oe(c),g=c/b,m=64;f===1&&(m=256);let w=(N,R)=>R===4?`max(max(${N}.x, ${N}.y), max(${N}.z, ${N}.w))`:R===2?`max(${N}.x, ${N}.y)`:R===3?`max(max(${N}.x, ${N}.y), ${N}.z)`:N,x=k("x",u.dataType,u.dims,b),v=B("result",u.dataType,u.dims,b),I=x.type.value,$=Me(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,O=N=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${m}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${N.registerUniform("packedCols","i32").declareVariables(x,v)}
      ${N.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
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
          rowMaxShared = ${I}(${w("threadShared[0]",b)});
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
          rowSumShared = ${I}(${jt("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=n.compute({name:"Softmax",shaderCache:{hint:`${b};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:u.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:O},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(at(E,l),{inputs:[E]})},Ax=(n,e)=>{kE(n.inputs),NE(n,e)},Ox=n=>de({axis:n.axis})});var Ex,LE,RE,zE,Cx,Dx=D(()=>{"use strict";ce();he();be();Ex=n=>Array.from(n.getBigInt64Array(),Number),LE=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ex(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},RE=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},zE=(n,e)=>{let r=n[0].dims,t=e??Ex(n[1]),o=RE(r,t),i=C.size(o),a=n[0].dataType,s=k("input",a,r.length),u=B("output",a,o.length),l=p=>`
      const inputShape = ${s.indices(...r)};
      ${p.registerUniform("output_size","u32").declareVariables(s,u)}
      ${p.mainStart()}
      ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...G(n[0].dims,o)]}),getShaderSource:l}},Cx=n=>{LE(n.inputs),n.compute(zE(n.inputs),{inputs:[0]})}});var ME,BE,kx,Nx=D(()=>{"use strict";ce();he();be();ME=(n,e,r,t,o)=>{let i=B("output_data",o,r.length,4),a=k("a_data",e[1].dataType,e[1].dims.length,4),s=k("b_data",e[2].dataType,e[2].dims.length,4),u=k("c_data",e[0].dataType,e[0].dims.length,4),l,p=(c,f,b)=>`select(${f}, ${c}, ${b})`;if(!t)l=i.setByOffset("global_idx",p(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(f,b,g="")=>{let m=`a_data[index_a${b}][component_a${b}]`,w=`b_data[index_b${b}][component_b${b}]`,x=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${i.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${a.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_b${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_c${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${f}[${b}] = ${g}(${p(m,w,x)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},BE=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(C.areEqual(e,r)&&C.areEqual(r,t)),a=e,s=C.size(e);if(i){let l=Br.calcShape(Br.calcShape(e,r,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=C.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>ME(l,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...G(t,e,r,a)]})}},kx=n=>{n.compute(BE(n.inputs))}});var Lx,Rx=D(()=>{"use strict";g_();Da();__();x_();a0();b0();v0();R0();U0();q0();X0();ev();nv();iv();uv();dv();hv();bv();vv();Tv();Cv();Nv();Rv();Mv();Vv();Ec();Uv();ax();lx();dx();hx();Ea();yx();vx();wx();$x();Px();Dc();Dx();Xr();Na();Nx();Lx=new Map([["Abs",[w_]],["Acos",[T_]],["Acosh",[I_]],["Add",[s0]],["ArgMax",[m_,bc]],["ArgMin",[h_,bc]],["Asin",[S_]],["Asinh",[$_]],["Atan",[A_]],["Atanh",[O_]],["Attention",[b_]],["AveragePool",[Jv,Zv]],["BatchNormalization",[y_]],["BiasAdd",[v_]],["BiasSplitGelu",[i0]],["Cast",[E_,P_]],["Ceil",[D_]],["Clip",[C_]],["Concat",[y0,_0]],["Conv",[$c,Sc]],["ConvTranspose",[G0,F0]],["Cos",[k_]],["Cosh",[N_]],["CumSum",[W0,H0]],["DepthToSpace",[j0,K0]],["DequantizeLinear",[sx,ux]],["Div",[u0]],["Einsum",[Y0,Q0]],["Elu",[L_,Mo]],["Equal",[l0]],["Erf",[R_]],["Exp",[z_]],["Expand",[rv]],["FastGelu",[ov]],["Floor",[M_]],["FusedConv",[$c,Sc]],["Gather",[sv,av]],["GatherElements",[gv,mv]],["GatherBlockQuantized",[pv,fv]],["GatherND",[lv,cv]],["Gelu",[B_]],["Gemm",[_v,yv]],["GlobalAveragePool",[ex,Qv]],["GlobalMaxPool",[ix,ox]],["Greater",[f0]],["GreaterOrEqual",[m0]],["GridSample",[xv,wv]],["GroupQueryAttention",[Ev]],["HardSigmoid",[j_,q_]],["InstanceNormalization",[kv]],["LayerNormalization",[Lv]],["LeakyRelu",[F_,Mo]],["Less",[h0]],["LessOrEqual",[g0]],["Log",[r0]],["MatMul",[zv]],["MatMulNBits",[Bv,Fv]],["MaxPool",[rx,nx]],["Mul",[c0]],["MultiHeadAttention",[$v,Sv]],["Neg",[G_]],["Not",[V_]],["Pad",[Gv]],["Pow",[d0]],["QuickGelu",[n0,Mo]],["Range",[cx]],["Reciprocal",[U_]],["ReduceMin",[u_]],["ReduceMean",[n_]],["ReduceMax",[s_]],["ReduceSum",[c_]],["ReduceProd",[l_]],["ReduceL1",[o_]],["ReduceL2",[i_]],["ReduceLogSum",[p_]],["ReduceLogSumExp",[a_]],["ReduceSumSquare",[d_]],["Relu",[W_]],["Resize",[gx,bx]],["RotaryEmbedding",[_x]],["ScatterND",[fx,px]],["Sigmoid",[H_]],["Sin",[K_]],["Sinh",[X_]],["Slice",[Ix,Sx]],["SkipLayerNormalization",[xx]],["Split",[Av,Ov]],["Sqrt",[Z_]],["Softmax",[Ax,Ox]],["Sub",[p0]],["Tan",[J_]],["Tanh",[Q_]],["ThresholdedRelu",[t0,Mo]],["Tile",[Cx]],["Transpose",[Wy,Hy]],["Where",[kx]]])});var Wa,zx=D(()=>{"use strict";ft();Mr();be();Wa=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),bt(e.programInfo.name)}dispose(){}build(e,r){$t(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(c=>{t.features.has(c.feature)&&o.push(`enable ${c.extension};`)});let a=Gy(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});xe("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let p=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return bt(e.name),{programInfo:e,computePipeline:p,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var FE,VE,kc,Nc,Ha,Mx=D(()=>{"use strict";ft();ce();Mr();ac();My();Rx();zx();FE=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},VE=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${FE(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},kc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Nc=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let r=e.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},Ha=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new Nc(this.device),this.adapterInfo=new kc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=zy(this),this.programManager=new Wa(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ia(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,p=i.programName,c=i.inputTensorViews,f=i.outputTensorViews,b=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let m=Number(b-this.queryTimeBase),w=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(x=>({dims:x.dims,dataType:fn(x.dataType)})),outputsMetadata:f.map(x=>({dims:x.dims,dataType:fn(x.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:m,endTime:w});else{let x="";c.forEach((I,$)=>{x+=`input[${$}]: [${I.dims}] | ${fn(I.dataType)}, `});let v="";f.forEach((I,$)=>{v+=`output[${$}]: [${I.dims}] | ${fn(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${x}${v}execution time: ${w-m} ns`)}ai("GPU",`${p}::${b}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),bt()}run(e,r,t,o,i,a){$t(e.name);let s=[];for(let I=0;I<r.length;++I){let $=r[I].data;if($===0)continue;let O=this.gpuDataManager.get($);if(!O)throw new Error(`no GPU data for input: ${$}`);s.push(O)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(r),c=t.length===0?u.map((I,$)=>$):t;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let f=[],b=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(c[I])||c[I]<-3||c[I]>=a)throw new Error(`Invalid output index: ${c[I]}`);if(c[I]===-3)continue;let $=c[I]===-1,O=c[I]===-2,E=$||O?i(u[I].dataType,u[I].dims):o(c[I],u[I].dataType,u[I].dims);if(f.push(E),E.data===0)continue;let N=this.gpuDataManager.get(E.data);if(!N)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(N),O){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(N)}b.push(N)}if(s.length!==r.length||b.length!==f.length){if(b.length===0)return bt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(p){let I=0,$=[];p.forEach(R=>{let V=typeof R.data=="number"?[R.data]:R.data;if(V.length===0)return;let H=R.type===10?2:4,j,oe;R.type===10?(oe=V.length>4?16:V.length>2?8:V.length*H,j=V.length>4?16:H*V.length):(oe=V.length<=2?V.length*H:16,j=16),I=Math.ceil(I/oe)*oe,$.push(I);let W=R.type===10?8:4;I+=V.length>4?Math.ceil(V.length/W)*j:V.length*H});let O=16;I=Math.ceil(I/O)*O;let E=new ArrayBuffer(I);p.forEach((R,V)=>{let H=$[V],j=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(E,H,j.length).set(j);else if(R.type===12)new Uint32Array(E,H,j.length).set(j);else if(R.type===10)new Uint16Array(E,H,j.length).set(j);else if(R.type===1)new Float32Array(E,H,j.length).set(j);else throw new Error(`Unsupported uniform type: ${fn(R.type)}`)});let N=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(N.buffer,0,E,0,I),this.gpuDataManager.release(N.id),g={offset:0,size:I,buffer:N.buffer}}let m=this.programManager.normalizeDispatchGroupSize(l),w=m[1]===1&&m[2]===1,x=VE(e,r,w),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(e,m),this.programManager.setArtifact(x,v),xe("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let I=0;I<p.length;I++){let $=p[I],O=$.type,E=typeof $.data=="number"?1:$.data.length,[N,R]=v.uniformVariablesInfo[I];if(O!==N||E!==R)throw new Error(`Uniform variable ${I} mismatch: expect type ${N} with size ${R}, got type ${O} with size ${E} in program "${v.programInfo.name}".`)}}if(xe("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:f};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(v,s,b,m,g),bt(e.name),f}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=Lx.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),xe("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(p){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${p}`)),1}finally{l&&t.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await cc(this,e,r);return Sa(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){xe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){xe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){xe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var GE,Bx,UE,Fx,qa,ja,Lc,Vx,Gx=D(()=>{"use strict";Mr();GE=1,Bx=()=>GE++,UE=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fx=(n,e)=>{let r=UE.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},qa=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Fx(this.dataType,this.tensorShape)}destroy(){xe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}},ja=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){if(this.wrapper){if(this.wrapper.canReuseTensor(e,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Fx(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let i=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(r,t,i,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else xe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Lc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let e=Bx();return this.tensorTrackersById.set(e,new ja(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o){xe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${e}, dataType: ${r}, shape: ${t}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(this.backend.currentContext,r,t,o)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){xe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=Bx(),a=new qa({sessionId:this.backend.currentSessionId,context:e,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(i,new ja(this,a)),this.externalTensors.add(a),i}async getCachedTensor(e,r,t,o,i){let a=this.backend.currentSessionId,s=this.backend.currentContext;for(let[l,p]of this.freeTensors.entries())if(p.canReuseTensor(s,e,r)){xe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${e}, shape: ${r}}`);let c=this.freeTensors.splice(l,1)[0];return c.sessionId=a,c}xe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${e}, shape: ${r}}`);let u=await s.createTensor({dataType:e,shape:r,dimensions:r,usage:t,writable:o,readable:i});return new qa({sessionId:a,context:s,tensor:u,dataType:e,shape:r})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Vx=(...n)=>new Lc(...n)});var Ux,WE,Ka,Wx=D(()=>{"use strict";ce();pn();ac();Gx();Mr();Ux=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),WE=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},Ka=class{constructor(e){this.tensorManager=Vx(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Ia(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){this.activeSessionId=e}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>WE(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}get currentContext(){let e=this.getMLContext(this.currentSessionId);if(!e)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return e}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e)}onReleaseSession(e){let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){xe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o){let i=Ux.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e,i,t,o)}uploadTensor(e,r){if(!Ze().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");xe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Sa(t,r)}}registerMLTensor(e,r,t){let o=Ux.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,e,o,t);return xe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${e}, dataType: ${o}, dimensions: ${t}} -> {tensorId: ${i}}`),i}registerMLConstant(e,r,t,o,i,a){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let u=a.get(s);if(!u)throw new Error(`File with name ${s} not found in preloaded files.`);if(r+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(r,r+t).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(l);break;case"float16":p=new Uint16Array(l);break;case"int32":p=new Int32Array(l);break;case"uint32":p=new Uint32Array(l);break;case"int64":p=new BigInt64Array(l);break;case"uint64":p=new BigUint64Array(l);break;case"int8":p=new Int8Array(l);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return xe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,p)}flush(){}}});var Hx={};qn(Hx,{init:()=>HE});var Go,Rc,HE,qx=D(()=>{"use strict";ce();Mx();Mr();he();Wx();Go=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(C.size(e)!==C.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Rc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(o*i++,a)),c=Number(e.getValue(o*i++,"*")),f=Number(e.getValue(o*i++,a)),b=[];for(let g=0;g<f;g++)b.push(Number(e.getValue(o*i++,a)));u.push(new Go(e,p,c,b))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,l)=>new Go(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=Rn(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Go(this.module,s,p,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},HE=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=new Ha;await i.initialize(r,t),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,s,u,l=!1)=>{if(l)xe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(s)}, size=${Number(u)}`),i.memcpy(Number(a),Number(s));else{xe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(s)}, size=${Number(u)}`);let p=e.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(u));i.upload(Number(s),p)}},async(a,s,u)=>{xe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${s}, size=${u}`),await i.download(Number(a),()=>e.HEAPU8.subarray(Number(s)>>>0,Number(s+u)>>>0))},(a,s,u)=>i.createKernel(a,Number(s),u,e.UTF8ToString(e._JsepGetNodeName(Number(s)))),a=>i.releaseKernel(a),(a,s,u,l)=>{xe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${a}, contextDataOffset=${s}`);let p=new Rc(e,i,Number(s));return i.computeKernel(Number(a),p,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Ka(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l)=>i.ensureTensor(a,s,u,l),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var qE,pa,fa,Fn,jE,ko,ha,ma,jx,ga,ba,ya,Ql=D(()=>{"use strict";Py();Cy();ce();pn();va();ic();qE=(n,e)=>{Ze()._OrtInit(n,e)!==0&&$e("Can't initialize onnxruntime.")},pa=async n=>{qE(n.wasm.numThreads,Ro(n.logLevel))},fa=async(n,e)=>{{let r=(qx(),po(Hx)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ze(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ze(),n)}}},Fn=new Map,jE=n=>{let e=Ze(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&$e("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},ko=n=>{let e=Ze(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ha=async(n,e)=>{let r,t,o=Ze();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=ko(n);let i=0,a=0,s=0,u=[],l=[],p=[];try{if([a,u]=Ey(e),e?.externalData&&o.mountExternalData){let v=[];for(let I of e.externalData){let $=typeof I=="string"?I:I.path;v.push(zo(typeof I=="string"?I:I.data).then(O=>{o.mountExternalData($,O)}))}await Promise.all(v)}for(let v of e?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof v!="string"){let $=v,O=$?.context,E=$?.gpuDevice,N=$?.deviceType,R=$?.powerPreference;O?o.currentContext=O:E?o.currentContext=await o.jsepCreateMLContext(E):o.currentContext=await o.jsepCreateMLContext({deviceType:N,powerPreference:R})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),i===0&&$e("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,f]=jE(i),b=!!e?.enableGraphCapture,g=[],m=[],w=[];for(let v=0;v<c;v++){let I=o._OrtGetInputName(i,v);I===0&&$e("Can't get an input name."),l.push(I),g.push(o.UTF8ToString(I))}for(let v=0;v<f;v++){let I=o._OrtGetOutputName(i,v);I===0&&$e("Can't get an output name."),p.push(I);let $=o.UTF8ToString(I);m.push($);{if(b&&e?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let O=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[$]??"cpu";if(O!=="cpu"&&O!=="cpu-pinned"&&O!=="gpu-buffer"&&O!=="ml-tensor")throw new Error(`Not supported preferred output location: ${O}.`);if(b&&O!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${O}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(O)}}let x=null;return w.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(s=o._OrtCreateBinding(i),s===0&&$e("Can't create IO binding."),x={handle:s,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(v=>oc(v))}),Fn.set(i,[i,l,p,x,b,!1]),[i,g,m]}catch(c){throw l.forEach(f=>o._OrtFree(f)),p.forEach(f=>o._OrtFree(f)),s!==0&&o._OrtReleaseBinding(s)!==0&&$e("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&$e("Can't release session."),c}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&$e("Can't release session options."),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},ma=n=>{let e=Ze(),r=Fn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&$e("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&$e("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&$e("Can't release session."),Fn.delete(n)},jx=(n,e,r,t,o,i=!1)=>{if(!n){e.push(0);return}let a=Ze(),s=a.PTR_SIZE,u=n[0],l=n[1],p=n[3],c,f;if(u==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let m=n[2].gpuBuffer;f=Rn(Lo(u),l);let w=a.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=w(t,o,m,f)}else if(p==="ml-tensor"){let m=n[2].mlTensor;f=Rn(Lo(u),l);let w=a.jsepRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=w(m,Lo(u),l)}else{let m=n[2];if(Array.isArray(m)){f=s*m.length,c=a._malloc(f),r.push(c);for(let w=0;w<m.length;w++){if(typeof m[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);a.setValue(c+w*s,ot(m[w],r),"*")}}else f=m.byteLength,c=a._malloc(f),r.push(c),a.HEAPU8.set(new Uint8Array(m.buffer,m.byteOffset,f),c)}let b=a.stackSave(),g=a.stackAlloc(4*l.length);try{l.forEach((w,x)=>a.setValue(g+x*s,w,s===4?"i32":"i64"));let m=a._OrtCreateTensor(Lo(u),c,f,g,l.length,oc(p));m===0&&$e(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(m)}finally{a.stackRestore(b)}},ga=async(n,e,r,t,o,i)=>{let a=Ze(),s=a.PTR_SIZE,u=Fn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],p=u[1],c=u[2],f=u[3],b=u[4],g=u[5],m=e.length,w=t.length,x=0,v=[],I=[],$=[],O=[],E=a.stackSave(),N=a.stackAlloc(m*s),R=a.stackAlloc(m*s),V=a.stackAlloc(w*s),H=a.stackAlloc(w*s);try{a.jsepOnRunStart?.(l),[x,v]=Oy(i);for(let W=0;W<m;W++)jx(r[W],I,O,n,e[W],b);for(let W=0;W<w;W++)jx(o[W],$,O,n,m+t[W],b);for(let W=0;W<m;W++)a.setValue(N+W*s,I[W],"*"),a.setValue(R+W*s,p[e[W]],"*");for(let W=0;W<w;W++)a.setValue(V+W*s,$[W],"*"),a.setValue(H+W*s,c[t[W]],"*");if(f&&!g){let{handle:W,outputPreferredLocations:ee,outputPreferredLocationsEncoded:Be}=f;if(p.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${p.length}).`);for(let X=0;X<m;X++){let J=e[X];await a._OrtBindInput(W,p[J],I[X])!==0&&$e(`Can't bind input[${X}] for session=${n}.`)}for(let X=0;X<w;X++){let J=t[X];o[X]?.[3]?a._OrtBindOutput(W,c[J],$[X],0)!==0&&$e(`Can't bind pre-allocated output[${X}] for session=${n}.`):a._OrtBindOutput(W,c[J],0,Be[J])!==0&&$e(`Can't bind output[${X}] to ${ee[X]} for session=${n}.`)}Fn.set(n,[l,p,c,f,b,!0])}let j;f?j=await a._OrtRunWithBinding(l,f.handle,w,V,x):j=await a._OrtRun(l,R,N,m,H,w,V,x),j!==0&&$e("failed to call OrtRun().");let oe=[];for(let W=0;W<w;W++){let ee=Number(a.getValue(V+W*s,"*"));if(ee===$[W]){oe.push(o[W]);continue}let Be=a.stackSave(),X=a.stackAlloc(4*s),J=!1,me,se=0;try{a._OrtGetTensorData(ee,X,X+s,X+2*s,X+3*s)!==0&&$e(`Can't access output tensor data on index ${W}.`);let st=s===4?"i32":"i64",Ve=Number(a.getValue(X,st));se=a.getValue(X+s,"*");let pe=a.getValue(X+s*2,"*"),F=Number(a.getValue(X+s*3,st)),re=[];for(let Ae=0;Ae<F;Ae++)re.push(Number(a.getValue(pe+Ae*s,st)));a._OrtFree(pe)!==0&&$e("Can't free memory for tensor dims.");let De=re.reduce((Ae,Je)=>Ae*Je,1);me=fn(Ve);let pt=f?.outputPreferredLocations[t[W]];if(me==="string"){if(pt==="gpu-buffer"||pt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ae=[];for(let Je=0;Je<De;Je++){let Ft=a.getValue(se+Je*s,"*"),es=a.getValue(se+(Je+1)*s,"*"),gn=Je===De-1?void 0:es-Ft;Ae.push(a.UTF8ToString(Ft,gn))}oe.push([me,re,Ae,"cpu"])}else if(pt==="gpu-buffer"&&De>0){let Ae=a.jsepGetBuffer;if(!Ae)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Je=Ae(se),Ft=Rn(Ve,De);if(Ft===void 0||!wa(me))throw new Error(`Unsupported data type: ${me}`);J=!0,oe.push([me,re,{gpuBuffer:Je,download:a.jsepCreateDownloader(Je,Ft,me),dispose:()=>{a._OrtReleaseTensor(ee)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(pt==="ml-tensor"&&De>0){let Ae=a.jsepEnsureTensor;if(!Ae)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Rn(Ve,De)===void 0||!Ta(me))throw new Error(`Unsupported data type: ${me}`);let Ft=await Ae(se,Ve,re,!1);J=!0,oe.push([me,re,{mlTensor:Ft,download:a.jsepCreateMLTensorDownloader(se,me),dispose:()=>{a.jsepReleaseTensorId(se),a._OrtReleaseTensor(ee)}},"ml-tensor"])}else{let Ae=xa(me),Je=new Ae(De);new Uint8Array(Je.buffer,Je.byteOffset,Je.byteLength).set(a.HEAPU8.subarray(se,se+Je.byteLength)),oe.push([me,re,Je,"cpu"])}}finally{a.stackRestore(Be),me==="string"&&se&&a._free(se),J||a._OrtReleaseTensor(ee)}}return f&&!b&&(a._OrtClearBoundOutputs(f.handle)!==0&&$e("Can't clear bound outputs."),Fn.set(n,[l,p,c,f,b,!1])),oe}finally{a.stackRestore(E),I.forEach(j=>a._OrtReleaseTensor(j)),$.forEach(j=>a._OrtReleaseTensor(j)),O.forEach(j=>a._free(j)),x!==0&&a._OrtReleaseRunOptions(x),v.forEach(j=>a._free(j))}},ba=n=>{let e=Ze(),r=Fn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&$e("Can't get an profile file name."),e._OrtFree(o)},ya=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Vn,Bt,Uo,Za,Ja,Xa,zc,Mc,uo,lo,XE,Kx,Xx,Zx,Jx,Yx,Qx,ew,Bc=D(()=>{"use strict";ft();Ql();pn();ca();Vn=()=>!!fe.wasm.proxy&&typeof document<"u",Uo=!1,Za=!1,Ja=!1,Mc=new Map,uo=(n,e)=>{let r=Mc.get(n);r?r.push(e):Mc.set(n,[e])},lo=()=>{if(Uo||!Za||Ja||!Bt)throw new Error("worker not ready")},XE=n=>{switch(n.data.type){case"init-wasm":Uo=!1,n.data.err?(Ja=!0,zc[1](n.data.err)):(Za=!0,zc[0]()),Xa&&(URL.revokeObjectURL(Xa),Xa=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Mc.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},Kx=async()=>{if(!Za){if(Uo)throw new Error("multiple calls to 'initWasm()' detected.");if(Ja)throw new Error("previous call to 'initWasm()' failed.");if(Uo=!0,Vn())return new Promise((n,e)=>{Bt?.terminate(),Sy().then(([r,t])=>{try{Bt=t,Bt.onerror=i=>e(i),Bt.onmessage=XE,zc=[n,e];let o={type:"init-wasm",in:fe};!o.in.wasm.wasmPaths&&(r||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Bt.postMessage(o),Xa=r}catch(o){e(o)}},e)});try{await da(fe.wasm),await pa(fe),Za=!0}catch(n){throw Ja=!0,n}finally{Uo=!1}}},Xx=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:fe}};Bt.postMessage(t)});await fa(fe,n)},Zx=async n=>Vn()?(lo(),new Promise((e,r)=>{uo("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Bt.postMessage(t,[n.buffer])})):ko(n),Jx=async(n,e)=>{if(Vn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return lo(),new Promise((r,t)=>{uo("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Bt.postMessage(o,i)})}else return ha(n,e)},Yx=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("release",[e,r]);let t={type:"release",in:n};Bt.postMessage(t)});ma(n)},Qx=async(n,e,r,t,o,i)=>{if(Vn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return lo(),new Promise((a,s)=>{uo("run",[a,s]);let u=r,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Bt.postMessage(l,ya(u))})}else return ga(n,e,r,t,o,i)},ew=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Bt.postMessage(t)});ba(n)}});var tw,ZE,Ya,rw=D(()=>{"use strict";ft();Bc();ce();la();ic();tw=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},ZE=n=>{switch(n[3]){case"cpu":return new St(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!wa(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return St.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!Ta(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return St.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},Ya=class{async fetchModelAndCopyToWasmMemory(e){return Zx(await zo(e))}async loadModel(e,r){$t();let t;typeof e=="string"?!1?t=await zo(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Jx(t,r),bt()}async dispose(){return Yx(this.sessionId)}async run(e,r,t){$t();let o=[],i=[];Object.entries(e).forEach(f=>{let b=f[0],g=f[1],m=this.inputNames.indexOf(b);if(m===-1)throw new Error(`invalid input '${b}'`);o.push(g),i.push(m)});let a=[],s=[];Object.entries(r).forEach(f=>{let b=f[0],g=f[1],m=this.outputNames.indexOf(b);if(m===-1)throw new Error(`invalid output '${b}'`);a.push(g),s.push(m)});let u=o.map((f,b)=>tw(f,()=>`input "${this.inputNames[i[b]]}"`)),l=a.map((f,b)=>f?tw(f,()=>`output "${this.outputNames[s[b]]}"`):null),p=await Qx(this.sessionId,i,u,s,l,t),c={};for(let f=0;f<p.length;f++)c[this.outputNames[s[f]]]=a[f]??ZE(p[f]);return bt(),c}startProfiling(){}endProfiling(){ew(this.sessionId)}}});var ow={};qn(ow,{OnnxruntimeWebAssemblyBackend:()=>Qa,initializeFlags:()=>nw,wasmBackend:()=>JE});var nw,Qa,JE,iw=D(()=>{"use strict";ft();Bc();rw();nw=()=>{if((typeof fe.wasm.initTimeout!="number"||fe.wasm.initTimeout<0)&&(fe.wasm.initTimeout=0),fe.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof fe.wasm.proxy!="boolean"&&(fe.wasm.proxy=!1),typeof fe.wasm.trace!="boolean"&&(fe.wasm.trace=!1),typeof fe.wasm.numThreads!="number"||!Number.isInteger(fe.wasm.numThreads)||fe.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)fe.wasm.numThreads=1;else{let n=typeof navigator>"u"?Is("node:os").cpus().length:navigator.hardwareConcurrency;fe.wasm.numThreads=Math.min(4,Math.ceil((n||1)/2))}},Qa=class{async init(e){nw(),await Kx(),await Xx(e)}async createInferenceSessionHandler(e,r){let t=new Ya;return await t.loadModel(e,r),Promise.resolve(t)}},JE=new Qa});ft();ft();ft();var Np="1.21.0-dev.20250201-e8b0bdb127";var Tj=Es;{let n=(py(),po(dy)).onnxjsBackend;rn("webgl",n,-10)}{let n=(iw(),po(ow)).wasmBackend;rn("webgpu",n,5),rn("webnn",n,5),rn("cpu",n,10),rn("wasm",n,10)}Object.defineProperty(fe.versions,"web",{value:Np,enumerable:!0});export{CT as InferenceSession,ai as TRACE,$t as TRACE_FUNC_BEGIN,bt as TRACE_FUNC_END,St as Tensor,Tj as default,fe as env,rn as registerBackend};
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
