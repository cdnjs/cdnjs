/*!
 * ONNX Runtime Web v1.21.0-dev.20250124-d00ae325ce
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var N_=Object.create;var bo=Object.defineProperty;var z_=Object.getOwnPropertyDescriptor;var R_=Object.getOwnPropertyNames;var M_=Object.getPrototypeOf,F_=Object.prototype.hasOwnProperty;var Sa=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var k=(r,e)=>()=>(r&&(e=r(r=0)),e);var et=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),un=(r,e)=>{for(var n in e)bo(r,n,{get:e[n],enumerable:!0})},Ul=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of R_(e))!F_.call(r,o)&&o!==n&&bo(r,o,{get:()=>e[o],enumerable:!(t=z_(e,o))||t.enumerable});return r};var ln=(r,e,n)=>(n=r!=null?N_(M_(r)):{},Ul(e||!r||!r.__esModule?bo(n,"default",{value:r,enumerable:!0}):n,r)),On=r=>Ul(bo({},"__esModule",{value:!0}),r);var go,Nr,wr,V_,Wl,$a=k(()=>{"use strict";go=new Map,Nr=[],wr=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=go.get(r);if(t===void 0)go.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Nr.indexOf(r);o!==-1&&Nr.splice(o,1);for(let i=0;i<Nr.length;i++)if(go.get(Nr[i]).priority<=n){Nr.splice(i,0,r);return}Nr.push(r)}return}throw new TypeError("not a valid backend")},V_=async r=>{let e=go.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Wl=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Nr:n,o,i=[],s=new Set;for(let u of t){let l=await V_(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var Hl=k(()=>{"use strict";$a()});var ql,Kl=k(()=>{"use strict";ql="1.21.0-dev.20241212-1f88284f96"});var jl,vt,Aa=k(()=>{"use strict";Kl();jl="warning",vt={wasm:{},webgl:{},webgpu:{},versions:{common:ql},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);jl=r}},get logLevel(){return jl}};Object.defineProperty(vt,"logLevel",{enumerable:!0})});var me,Xl=k(()=>{"use strict";Aa();me=vt});var Zl,Jl,Yl=k(()=>{"use strict";Zl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let f=i*o,c=0,p=f,g=f*2,b=-1;s==="RGBA"?(c=0,p=f,g=f*2,b=f*3):s==="RGB"?(c=0,p=f,g=f*2):s==="RBG"&&(c=0,g=f,p=f*2);for(let h=0;h<i;h++)for(let v=0;v<o;v++){let w=(r.data[c++]-l[0])*u[0],_=(r.data[p++]-l[1])*u[1],I=(r.data[g++]-l[2])*u[2],$=b===-1?255:(r.data[b++]-l[3])*u[3];t.fillStyle="rgba("+w+","+_+","+I+","+$+")",t.fillRect(v,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Jl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],s=r.dims[3]):(o=r.dims[3],i=r.dims[2],s=r.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,f;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let c=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,g=0,b=1,h=2,v=3,w=0,_=c,I=c*2,$=-1;a==="RGBA"?(w=0,_=c,I=c*2,$=c*3):a==="RGB"?(w=0,_=c,I=c*2):a==="RBG"&&(w=0,I=c,_=c*2),t=n.createImageData(o,i);for(let O=0;O<i*o;g+=p,b+=p,h+=p,v+=p,O++)t.data[g]=(r.data[w++]-f[0])*l[0],t.data[b]=(r.data[_++]-f[1])*l[1],t.data[h]=(r.data[I++]-f[2])*l[2],t.data[v]=$===-1?255:(r.data[$++]-f[3])*l[3]}else throw new Error("Can not access image data");return t}});var Oa,Ql,ec,tc,rc,nc,oc=k(()=>{"use strict";yo();Oa=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,f=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,p=0,g=1,b=2,h=3,v=0,w=l,_=l*2,I=-1;a==="RGB"&&(c=3,p=0,g=1,b=2,h=-1),u==="RGBA"?I=l*3:u==="RBG"?(v=0,_=l,w=l*2):u==="BGR"&&(_=0,w=l,v=l*2);for(let O=0;O<l;O++,p+=c,b+=c,g+=c,h+=c)f[v++]=(r[p]+s[0])/i[0],f[w++]=(r[g]+s[1])/i[1],f[_++]=(r[b]+s[2])/i[2],I!==-1&&h!==-1&&(f[I++]=(r[h]+s[3])/i[3]);return u==="RGBA"?new lt("float32",f,[1,4,n,t]):new lt("float32",f,[1,3,n,t])},Ql=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,g=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,g=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=g}else a.tensorFormat="RGBA",a.height=p,a.width=g;c.drawImage(r,0,0),s=c.getImageData(0,0,g,p).data}else throw new Error("Can not access image data")}else if(t){let f,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(f=e.resizedHeight,c=e.resizedWidth):(f=r.height,c=r.width),e!==void 0&&(a=e),a.format="RGBA",a.height=f,a.width=c,e!==void 0){let p=u();p.width=c,p.height=f;let g=l(p);if(g!=null)g.putImageData(r,0,0),s=g.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else s=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,g=r.width;return c.drawImage(r,0,0,g,p),s=c.getImageData(0,0,g,p).data,a.height=p,a.width=g,Oa(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,c)=>{let p=u(),g=l(p);if(!r||!g)return c();let b=new Image;b.crossOrigin="Anonymous",b.src=r,b.onload=()=>{p.width=b.width,p.height=b.height,g.drawImage(b,0,0,p.width,p.height);let h=g.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,f(Oa(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Oa(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},ec=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,s=[1,t,n,4];return new lt({location:"texture",type:"float32",texture:r,dims:s,download:o,dispose:i})},tc=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new lt({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},rc=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new lt({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},nc=(r,e,n)=>new lt({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var zr,Pn,ic,ac,sc=k(()=>{"use strict";zr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Pn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ic=!1,ac=()=>{if(!ic){ic=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;r&&(zr.set("int64",BigInt64Array),Pn.set(BigInt64Array,"int64")),e&&(zr.set("uint64",BigUint64Array),Pn.set(BigUint64Array,"uint64")),n?(zr.set("float16",Float16Array),Pn.set(Float16Array,"float16")):zr.set("float16",Uint16Array)}}});var uc,lc,cc=k(()=>{"use strict";yo();uc=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},lc=(r,e)=>{switch(r.location){case"cpu":return new lt(r.type,r.data,e);case"cpu-pinned":return new lt({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new lt({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new lt({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new lt({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var lt,yo=k(()=>{"use strict";Yl();oc();sc();cc();lt=class{constructor(e,n,t){ac();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=zr.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=zr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(e);else{let l=Pn.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=uc(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,n){return Ql(e,n)}static fromTexture(e,n){return ec(e,n)}static fromGpuBuffer(e,n){return tc(e,n)}static fromMLTensor(e,n){return rc(e,n)}static fromPinnedBuffer(e,n,t){return nc(e,n,t)}toDataURL(e){return Zl(this,e)}toImageData(e){return Jl(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return lc(this,e)}}});var Tt,Pa=k(()=>{"use strict";yo();Tt=lt});var xo,fc,It,bt,Ea=k(()=>{"use strict";Aa();xo=(r,e)=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||console.timeStamp(`${r}::ORT::${e}`)},fc=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),xo("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},It=r=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||fc("BEGIN",r)},bt=r=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||fc("END",r)}});var _o,dc=k(()=>{"use strict";$a();Pa();Ea();_o=class r{constructor(e){this.handler=e}async run(e,n,t){It();let o={},i={};if(typeof e!="object"||e===null||e instanceof Tt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Tt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof Tt)&&(l=!0,s=!1,o[c]=p)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let f=a[l];f instanceof Tt?u[l]=f:u[l]=new Tt(f.type,f.data,f.dims)}return bt(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){It();let i,s={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let f=e,c=0,p=e.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(p=e.byteLength-c,typeof t=="number"){if(p=t,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await Wl(s),l=await a.createInferenceSessionHandler(i,u);return bt(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var G_,pc=k(()=>{"use strict";dc();G_=_o});var mc=k(()=>{"use strict"});var hc=k(()=>{"use strict"});var bc=k(()=>{"use strict"});var gc=k(()=>{"use strict"});var Ca={};un(Ca,{InferenceSession:()=>G_,TRACE:()=>xo,TRACE_FUNC_BEGIN:()=>It,TRACE_FUNC_END:()=>bt,Tensor:()=>Tt,env:()=>me,registerBackend:()=>wr});var dt=k(()=>{"use strict";Hl();Xl();pc();Pa();mc();hc();Ea();bc();gc()});function vr(r,e,n,t){if(e===void 0)return W_(r);if(n===void 0)wo(r,e,1);else if(typeof n=="number"&&t===void 0)wo(r,e,n);else if(typeof n=="string"&&t===void 0)wo(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")wo(r,n,t,e);else throw new TypeError("input is valid")}function W_(r){return{verbose:vr.verbose.bind(null,r),info:vr.info.bind(null,r),warning:vr.warning.bind(null,r),error:vr.error.bind(null,r),fatal:vr.fatal.bind(null,r)}}function wo(r,e,n,t){let o=En[t||""]||En[""];xc[r]<xc[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,U_[o.provider].log(r,e,t))}var ka,Da,xc,U_,_c,En,Ne,To,Io,So,vo,At=k(()=>{"use strict";ka=class{log(e,n,t){}},Da=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},xc={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},U_={none:new ka,console:new Da},_c={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},En={"":_c};(u=>{function r(l,f){u("verbose",l,f)}u.verbose=r;function e(l,f){u("info",l,f)}u.info=e;function n(l,f){u("warning",l,f)}u.warning=n;function t(l,f){u("error",l,f)}u.error=t;function o(l,f){u("fatal",l,f)}u.fatal=o;function i(l){En={},s("",l||{})}u.reset=i;function s(l,f){if(l==="*")i(f);else{let c=En[l]||_c;En[l]={provider:f.provider||c.provider,minimalSeverity:f.minimalSeverity||c.minimalSeverity,logDateTime:f.logDateTime===void 0?c.logDateTime:f.logDateTime,logSourceLocation:f.logSourceLocation===void 0?c.logSourceLocation:f.logSourceLocation}}}u.set=s;function a(l){let f={};l.logLevel&&(f.minimalSeverity=l.logLevel),s("",f)}u.setWithEnv=a})(vr||={});Ne=vr,To=class{constructor(e,n,t,o,i,s){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Io=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},So=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=vo(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async f=>{i&&await i.end(),u(f)},async f=>{i&&await i.end(),l(f)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,f)=>{u.then(()=>{l(a)},c=>{f(c)})})}return a}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=vo();return this.flush(o),new To(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new To(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Io(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=vo();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Io(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Ne.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=vo()}}get started(){return this._started}},vo=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function wc(r,e,n){for(let t of n){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&H_(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function H_(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var vc=k(()=>{"use strict"});var Tc=et(Ba=>{"use strict";Ba.__esModule=!0;var q_=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();Ba.Guid=q_});function Ve(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function pt(r){return(r&&r.__isLong__)===!0}function Ic(r){var e=Math.clz32(r&-r);return r?31-e:e}function Rr(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=$c[r],t)?t:(n=Be(r,0,!0),o&&($c[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Sc[r],t)?t:(n=Be(r,r<0?-1:0,!1),o&&(Sc[r]=n),n))}function Pt(r,e){if(isNaN(r))return e?fr:zt;if(e){if(r<0)return fr;if(r>=Ec)return Dc}else{if(r<=-Oc)return gt;if(r+1>=Oc)return kc}return r<0?Pt(-r,e).neg():Be(r%fn|0,r/fn|0,e)}function Be(r,e,n){return new Ve(r,e,n)}function Na(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?fr:zt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Na(r.substring(1),e,n).neg();for(var o=Pt($o(n,8)),i=zt,s=0;s<r.length;s+=8){var a=Math.min(8,r.length-s),u=parseInt(r.substring(s,s+a),n);if(a<8){var l=Pt($o(n,a));i=i.mul(l).add(Pt(u))}else i=i.mul(o),i=i.add(Pt(u))}return i.unsigned=e,i}function Rt(r,e){return typeof r=="number"?Pt(r,e):typeof r=="string"?Na(r,e):Be(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var Ot,Sc,$c,$o,Ac,K_,fn,Ec,Oc,Pc,zt,fr,cn,Cc,La,kc,Dc,gt,H,dr,za=k(()=>{Ot=null;try{Ot=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ve.prototype.__isLong__;Object.defineProperty(Ve.prototype,"__isLong__",{value:!0});Ve.isLong=pt;Sc={},$c={};Ve.fromInt=Rr;Ve.fromNumber=Pt;Ve.fromBits=Be;$o=Math.pow;Ve.fromString=Na;Ve.fromValue=Rt;Ac=65536,K_=1<<24,fn=Ac*Ac,Ec=fn*fn,Oc=Ec/2,Pc=Rr(K_),zt=Rr(0);Ve.ZERO=zt;fr=Rr(0,!0);Ve.UZERO=fr;cn=Rr(1);Ve.ONE=cn;Cc=Rr(1,!0);Ve.UONE=Cc;La=Rr(-1);Ve.NEG_ONE=La;kc=Be(-1,2147483647,!1);Ve.MAX_VALUE=kc;Dc=Be(-1,-1,!0);Ve.MAX_UNSIGNED_VALUE=Dc;gt=Be(0,-2147483648,!1);Ve.MIN_VALUE=gt;H=Ve.prototype;H.toInt=function(){return this.unsigned?this.low>>>0:this.low};H.toNumber=function(){return this.unsigned?(this.high>>>0)*fn+(this.low>>>0):this.high*fn+(this.low>>>0)};H.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(gt)){var n=Pt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Pt($o(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,f=l.toString(e);if(s=u,s.isZero())return f+a;for(;f.length<6;)f="0"+f;a=""+f+a}};H.getHighBits=function(){return this.high};H.getHighBitsUnsigned=function(){return this.high>>>0};H.getLowBits=function(){return this.low};H.getLowBitsUnsigned=function(){return this.low>>>0};H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(gt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};H.isZero=function(){return this.high===0&&this.low===0};H.eqz=H.isZero;H.isNegative=function(){return!this.unsigned&&this.high<0};H.isPositive=function(){return this.unsigned||this.high>=0};H.isOdd=function(){return(this.low&1)===1};H.isEven=function(){return(this.low&1)===0};H.equals=function(e){return pt(e)||(e=Rt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};H.eq=H.equals;H.notEquals=function(e){return!this.eq(e)};H.neq=H.notEquals;H.ne=H.notEquals;H.lessThan=function(e){return this.comp(e)<0};H.lt=H.lessThan;H.lessThanOrEqual=function(e){return this.comp(e)<=0};H.lte=H.lessThanOrEqual;H.le=H.lessThanOrEqual;H.greaterThan=function(e){return this.comp(e)>0};H.gt=H.greaterThan;H.greaterThanOrEqual=function(e){return this.comp(e)>=0};H.gte=H.greaterThanOrEqual;H.ge=H.greaterThanOrEqual;H.compare=function(e){if(pt(e)||(e=Rt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};H.comp=H.compare;H.negate=function(){return!this.unsigned&&this.eq(gt)?gt:this.not().add(cn)};H.neg=H.negate;H.add=function(e){pt(e)||(e=Rt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,f=0,c=0,p=0,g=0;return g+=i+l,p+=g>>>16,g&=65535,p+=o+u,c+=p>>>16,p&=65535,c+=t+a,f+=c>>>16,c&=65535,f+=n+s,f&=65535,Be(p<<16|g,f<<16|c,this.unsigned)};H.subtract=function(e){return pt(e)||(e=Rt(e)),this.add(e.neg())};H.sub=H.subtract;H.multiply=function(e){if(this.isZero())return this;if(pt(e)||(e=Rt(e)),Ot){var n=Ot.mul(this.low,this.high,e.low,e.high);return Be(n,Ot.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?fr:zt;if(this.eq(gt))return e.isOdd()?gt:zt;if(e.eq(gt))return this.isOdd()?gt:zt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Pc)&&e.lt(Pc))return Pt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,f=e.low&65535,c=0,p=0,g=0,b=0;return b+=s*f,g+=b>>>16,b&=65535,g+=i*f,p+=g>>>16,g&=65535,g+=s*l,p+=g>>>16,g&=65535,p+=o*f,c+=p>>>16,p&=65535,p+=i*l,c+=p>>>16,p&=65535,p+=s*u,c+=p>>>16,p&=65535,c+=t*f+o*l+i*u+s*a,c&=65535,Be(g<<16|b,c<<16|p,this.unsigned)};H.mul=H.multiply;H.divide=function(e){if(pt(e)||(e=Rt(e)),e.isZero())throw Error("division by zero");if(Ot){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?Ot.div_u:Ot.div_s)(this.low,this.high,e.low,e.high);return Be(n,Ot.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?fr:zt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return fr;if(e.gt(this.shru(1)))return Cc;i=fr}else{if(this.eq(gt)){if(e.eq(cn)||e.eq(La))return gt;if(e.eq(gt))return cn;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(zt)?e.isNegative()?cn:La:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(gt))return this.unsigned?fr:zt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=zt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:$o(2,a-48),l=Pt(t),f=l.mul(e);f.isNegative()||f.gt(o);)t-=u,l=Pt(t,this.unsigned),f=l.mul(e);l.isZero()&&(l=cn),i=i.add(l),o=o.sub(f)}return i};H.div=H.divide;H.modulo=function(e){if(pt(e)||(e=Rt(e)),Ot){var n=(this.unsigned?Ot.rem_u:Ot.rem_s)(this.low,this.high,e.low,e.high);return Be(n,Ot.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};H.mod=H.modulo;H.rem=H.modulo;H.not=function(){return Be(~this.low,~this.high,this.unsigned)};H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};H.clz=H.countLeadingZeros;H.countTrailingZeros=function(){return this.low?Ic(this.low):Ic(this.high)+32};H.ctz=H.countTrailingZeros;H.and=function(e){return pt(e)||(e=Rt(e)),Be(this.low&e.low,this.high&e.high,this.unsigned)};H.or=function(e){return pt(e)||(e=Rt(e)),Be(this.low|e.low,this.high|e.high,this.unsigned)};H.xor=function(e){return pt(e)||(e=Rt(e)),Be(this.low^e.low,this.high^e.high,this.unsigned)};H.shiftLeft=function(e){return pt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Be(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Be(0,this.low<<e-32,this.unsigned)};H.shl=H.shiftLeft;H.shiftRight=function(e){return pt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Be(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Be(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};H.shr=H.shiftRight;H.shiftRightUnsigned=function(e){return pt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Be(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Be(this.high,0,this.unsigned):Be(this.high>>>e-32,0,this.unsigned)};H.shru=H.shiftRightUnsigned;H.shr_u=H.shiftRightUnsigned;H.rotateLeft=function(e){var n;return pt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Be(this.high,this.low,this.unsigned):e<32?(n=32-e,Be(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,Be(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};H.rotl=H.rotateLeft;H.rotateRight=function(e){var n;return pt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Be(this.high,this.low,this.unsigned):e<32?(n=32-e,Be(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,Be(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};H.rotr=H.rotateRight;H.toSigned=function(){return this.unsigned?Be(this.low,this.high,!1):this};H.toUnsigned=function(){return this.unsigned?this:Be(this.low,this.high,!0)};H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};H.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};H.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Ve.fromBytes=function(e,n,t){return t?Ve.fromBytesLE(e,n):Ve.fromBytesBE(e,n)};Ve.fromBytesLE=function(e,n){return new Ve(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Ve.fromBytesBE=function(e,n){return new Ve(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};dr=Ve});var D,Ao=k(()=>{D={};D.Offset;D.Table;D.SIZEOF_SHORT=2;D.SIZEOF_INT=4;D.FILE_IDENTIFIER_LENGTH=4;D.SIZE_PREFIX_LENGTH=4;D.Encoding={UTF8_BYTES:1,UTF16_STRING:2};D.int32=new Int32Array(2);D.float32=new Float32Array(D.int32.buffer);D.float64=new Float64Array(D.int32.buffer);D.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;D.Long=function(r,e){this.low=r|0,this.high=e|0};D.Long.create=function(r,e){return r==0&&e==0?D.Long.ZERO:new D.Long(r,e)};D.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};D.Long.prototype.equals=function(r){return this.low==r.low&&this.high==r.high};D.Long.ZERO=new D.Long(0,0);D.Builder=function(r){if(r)var e=r;else var e=1024;this.bb=D.ByteBuffer.allocate(e),this.space=e,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};D.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};D.Builder.prototype.forceDefaults=function(r){this.force_defaults=r};D.Builder.prototype.dataBuffer=function(){return this.bb};D.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};D.Builder.prototype.prep=function(r,e){r>this.minalign&&(this.minalign=r);for(var n=~(this.bb.capacity()-this.space+e)+1&r-1;this.space<n+r+e;){var t=this.bb.capacity();this.bb=D.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)};D.Builder.prototype.pad=function(r){for(var e=0;e<r;e++)this.bb.writeInt8(--this.space,0)};D.Builder.prototype.writeInt8=function(r){this.bb.writeInt8(this.space-=1,r)};D.Builder.prototype.writeInt16=function(r){this.bb.writeInt16(this.space-=2,r)};D.Builder.prototype.writeInt32=function(r){this.bb.writeInt32(this.space-=4,r)};D.Builder.prototype.writeInt64=function(r){this.bb.writeInt64(this.space-=8,r)};D.Builder.prototype.writeFloat32=function(r){this.bb.writeFloat32(this.space-=4,r)};D.Builder.prototype.writeFloat64=function(r){this.bb.writeFloat64(this.space-=8,r)};D.Builder.prototype.addInt8=function(r){this.prep(1,0),this.writeInt8(r)};D.Builder.prototype.addInt16=function(r){this.prep(2,0),this.writeInt16(r)};D.Builder.prototype.addInt32=function(r){this.prep(4,0),this.writeInt32(r)};D.Builder.prototype.addInt64=function(r){this.prep(8,0),this.writeInt64(r)};D.Builder.prototype.addFloat32=function(r){this.prep(4,0),this.writeFloat32(r)};D.Builder.prototype.addFloat64=function(r){this.prep(8,0),this.writeFloat64(r)};D.Builder.prototype.addFieldInt8=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(r))};D.Builder.prototype.addFieldInt16=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(r))};D.Builder.prototype.addFieldInt32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(r))};D.Builder.prototype.addFieldInt64=function(r,e,n){(this.force_defaults||!e.equals(n))&&(this.addInt64(e),this.slot(r))};D.Builder.prototype.addFieldFloat32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(r))};D.Builder.prototype.addFieldFloat64=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(r))};D.Builder.prototype.addFieldOffset=function(r,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(r))};D.Builder.prototype.addFieldStruct=function(r,e,n){e!=n&&(this.nested(e),this.slot(r))};D.Builder.prototype.nested=function(r){if(r!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};D.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};D.Builder.prototype.slot=function(r){this.vtable[r]=this.offset()};D.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};D.Builder.growByteBuffer=function(r){var e=r.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var n=e<<1,t=D.ByteBuffer.allocate(n);return t.setPosition(n-e),t.bytes().set(r.bytes(),n-e),t};D.Builder.prototype.addOffset=function(r){this.prep(D.SIZEOF_INT,0),this.writeInt32(this.offset()-r+D.SIZEOF_INT)};D.Builder.prototype.startObject=function(r){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=r;for(var e=0;e<r;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()};D.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var r=this.offset(),e=this.vtable_in_use-1;e>=0&&this.vtable[e]==0;e--);for(var n=e+1;e>=0;e--)this.addInt16(this.vtable[e]!=0?r-this.vtable[e]:0);var t=2;this.addInt16(r-this.object_start);var o=(n+t)*D.SIZEOF_SHORT;this.addInt16(o);var i=0,s=this.space;e:for(e=0;e<this.vtables.length;e++){var a=this.bb.capacity()-this.vtables[e];if(o==this.bb.readInt16(a)){for(var u=D.SIZEOF_SHORT;u<o;u+=D.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(a+u))continue e;i=this.vtables[e];break}}return i?(this.space=this.bb.capacity()-r,this.bb.writeInt32(this.space,i-r)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-r,this.offset()-r)),this.isNested=!1,r};D.Builder.prototype.finish=function(r,e,n){var t=n?D.SIZE_PREFIX_LENGTH:0;if(e){var o=e;if(this.prep(this.minalign,D.SIZEOF_INT+D.FILE_IDENTIFIER_LENGTH+t),o.length!=D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+D.FILE_IDENTIFIER_LENGTH);for(var i=D.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(o.charCodeAt(i))}this.prep(this.minalign,D.SIZEOF_INT+t),this.addOffset(r),t&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};D.Builder.prototype.finishSizePrefixed=function(r,e){this.finish(r,e,!0)};D.Builder.prototype.requiredField=function(r,e){var n=this.bb.capacity()-r,t=n-this.bb.readInt32(n),o=this.bb.readInt16(t+e)!=0;if(!o)throw new Error("FlatBuffers: field "+e+" must be set")};D.Builder.prototype.startVector=function(r,e,n){this.notNested(),this.vector_num_elems=e,this.prep(D.SIZEOF_INT,r*e),this.prep(n,r*e)};D.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};D.Builder.prototype.createString=function(r){if(r instanceof Uint8Array)var e=r;else for(var e=[],n=0;n<r.length;){var t,o=r.charCodeAt(n++);if(o<55296||o>=56320)t=o;else{var i=r.charCodeAt(n++);t=(o<<10)+i+(65536-56623104-56320)}t<128?e.push(t):(t<2048?e.push(t>>6&31|192):(t<65536?e.push(t>>12&15|224):e.push(t>>18&7|240,t>>12&63|128),e.push(t>>6&63|128)),e.push(t&63|128))}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(var n=0,s=this.space,a=this.bb.bytes();n<e.length;n++)a[s++]=e[n];return this.endVector()};D.Builder.prototype.createLong=function(r,e){return D.Long.create(r,e)};D.ByteBuffer=function(r){this.bytes_=r,this.position_=0};D.ByteBuffer.allocate=function(r){return new D.ByteBuffer(new Uint8Array(r))};D.ByteBuffer.prototype.clear=function(){this.position_=0};D.ByteBuffer.prototype.bytes=function(){return this.bytes_};D.ByteBuffer.prototype.position=function(){return this.position_};D.ByteBuffer.prototype.setPosition=function(r){this.position_=r};D.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};D.ByteBuffer.prototype.readInt8=function(r){return this.readUint8(r)<<24>>24};D.ByteBuffer.prototype.readUint8=function(r){return this.bytes_[r]};D.ByteBuffer.prototype.readInt16=function(r){return this.readUint16(r)<<16>>16};D.ByteBuffer.prototype.readUint16=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8};D.ByteBuffer.prototype.readInt32=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8|this.bytes_[r+2]<<16|this.bytes_[r+3]<<24};D.ByteBuffer.prototype.readUint32=function(r){return this.readInt32(r)>>>0};D.ByteBuffer.prototype.readInt64=function(r){return new D.Long(this.readInt32(r),this.readInt32(r+4))};D.ByteBuffer.prototype.readUint64=function(r){return new D.Long(this.readUint32(r),this.readUint32(r+4))};D.ByteBuffer.prototype.readFloat32=function(r){return D.int32[0]=this.readInt32(r),D.float32[0]};D.ByteBuffer.prototype.readFloat64=function(r){return D.int32[D.isLittleEndian?0:1]=this.readInt32(r),D.int32[D.isLittleEndian?1:0]=this.readInt32(r+4),D.float64[0]};D.ByteBuffer.prototype.writeInt8=function(r,e){this.bytes_[r]=e};D.ByteBuffer.prototype.writeUint8=function(r,e){this.bytes_[r]=e};D.ByteBuffer.prototype.writeInt16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};D.ByteBuffer.prototype.writeUint16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};D.ByteBuffer.prototype.writeInt32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};D.ByteBuffer.prototype.writeUint32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};D.ByteBuffer.prototype.writeInt64=function(r,e){this.writeInt32(r,e.low),this.writeInt32(r+4,e.high)};D.ByteBuffer.prototype.writeUint64=function(r,e){this.writeUint32(r,e.low),this.writeUint32(r+4,e.high)};D.ByteBuffer.prototype.writeFloat32=function(r,e){D.float32[0]=e,this.writeInt32(r,D.int32[0])};D.ByteBuffer.prototype.writeFloat64=function(r,e){D.float64[0]=e,this.writeInt32(r,D.int32[D.isLittleEndian?0:1]),this.writeInt32(r+4,D.int32[D.isLittleEndian?1:0])};D.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+D.SIZEOF_INT+D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var r="",e=0;e<D.FILE_IDENTIFIER_LENGTH;e++)r+=String.fromCharCode(this.readInt8(this.position_+D.SIZEOF_INT+e));return r};D.ByteBuffer.prototype.__offset=function(r,e){var n=r-this.readInt32(r);return e<this.readInt16(n)?this.readInt16(n+e):0};D.ByteBuffer.prototype.__union=function(r,e){return r.bb_pos=e+this.readInt32(e),r.bb=this,r};D.ByteBuffer.prototype.__string=function(r,e){r+=this.readInt32(r);var n=this.readInt32(r),t="",o=0;if(r+=D.SIZEOF_INT,e===D.Encoding.UTF8_BYTES)return this.bytes_.subarray(r,r+n);for(;o<n;){var i,s=this.readUint8(r+o++);if(s<192)i=s;else{var a=this.readUint8(r+o++);if(s<224)i=(s&31)<<6|a&63;else{var u=this.readUint8(r+o++);if(s<240)i=(s&15)<<12|(a&63)<<6|u&63;else{var l=this.readUint8(r+o++);i=(s&7)<<18|(a&63)<<12|(u&63)<<6|l&63}}}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode((i>>10)+55296,(i&1024-1)+56320))}return t};D.ByteBuffer.prototype.__indirect=function(r){return r+this.readInt32(r)};D.ByteBuffer.prototype.__vector=function(r){return r+this.readInt32(r)+D.SIZEOF_INT};D.ByteBuffer.prototype.__vector_len=function(r){return this.readInt32(r+this.readInt32(r))};D.ByteBuffer.prototype.__has_identifier=function(r){if(r.length!=D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+D.FILE_IDENTIFIER_LENGTH);for(var e=0;e<D.FILE_IDENTIFIER_LENGTH;e++)if(r.charCodeAt(e)!=this.readInt8(this.position_+D.SIZEOF_INT+e))return!1;return!0};D.ByteBuffer.prototype.createLong=function(r,e){return D.Long.create(r,e)}});var ie,Cn=k(()=>{"use strict";Ao();(e=>{let r;(t=>{let n;(i=>{let o;(I=>(I[I.UNDEFINED=0]="UNDEFINED",I[I.FLOAT=1]="FLOAT",I[I.INT=2]="INT",I[I.STRING=3]="STRING",I[I.TENSOR=4]="TENSOR",I[I.GRAPH=5]="GRAPH",I[I.FLOATS=6]="FLOATS",I[I.INTS=7]="INTS",I[I.STRINGS=8]="STRINGS",I[I.TENSORS=9]="TENSORS",I[I.GRAPHS=10]="GRAPHS",I[I.SPARSE_TENSOR=11]="SPARSE_TENSOR",I[I.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(o=i.AttributeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{let o;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(o=i.DimensionValueType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{let o;(M=>(M[M.UNDEFINED=0]="UNDEFINED",M[M.FLOAT=1]="FLOAT",M[M.UINT8=2]="UINT8",M[M.INT8=3]="INT8",M[M.UINT16=4]="UINT16",M[M.INT16=5]="INT16",M[M.INT32=6]="INT32",M[M.INT64=7]="INT64",M[M.STRING=8]="STRING",M[M.BOOL=9]="BOOL",M[M.FLOAT16=10]="FLOAT16",M[M.DOUBLE=11]="DOUBLE",M[M.UINT32=12]="UINT32",M[M.UINT64=13]="UINT64",M[M.COMPLEX64=14]="COMPLEX64",M[M.COMPLEX128=15]="COMPLEX128",M[M.BFLOAT16=16]="BFLOAT16",M[M.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",M[M.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",M[M.FLOAT8E5M2=19]="FLOAT8E5M2",M[M.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(o=i.TensorDataType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{let o;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(o=i.NodeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{let o;(f=>(f[f.NONE=0]="NONE",f[f.tensor_type=1]="tensor_type",f[f.sequence_type=2]="sequence_type",f[f.map_type=3]="map_type"))(o=i.TypeInfoValue||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsShape(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dim(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}dimLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}static startShape(a){a.startObject(1)}static addDim(a,u){a.addFieldOffset(0,u,0)}static createDimVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startDimVector(a,u){a.startVector(4,u,4)}static endShape(a){return a.endObject()}static createShape(a,u){return o.startShape(a),o.addDim(a,u),o.endShape(a)}}i.Shape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimension(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimension(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}value(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimension(a){a.startObject(2)}static addValue(a,u){a.addFieldOffset(0,u,0)}static addDenotation(a,u){a.addFieldOffset(1,u,0)}static endDimension(a){return a.endObject()}static createDimension(a,u,l){return o.startDimension(a),o.addValue(a,u),o.addDenotation(a,l),o.endDimension(a)}}i.Dimension=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimensionValue(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimensionValue(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dimType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt8(this.bb_pos+a):0}dimValue(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}dimParam(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimensionValue(a){a.startObject(3)}static addDimType(a,u){a.addFieldInt8(0,u,0)}static addDimValue(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static addDimParam(a,u){a.addFieldOffset(2,u,0)}static endDimensionValue(a){return a.endObject()}static createDimensionValue(a,u,l,f){return o.startDimensionValue(a),o.addDimType(a,u),o.addDimValue(a,l),o.addDimParam(a,f),o.endDimensionValue(a)}}i.DimensionValue=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensorTypeAndShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}shape(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,u){a.addFieldInt32(0,u,0)}static addShape(a,u){a.addFieldOffset(1,u,0)}static endTensorTypeAndShape(a){return a.endObject()}static createTensorTypeAndShape(a,u,l){return o.startTensorTypeAndShape(a),o.addElemType(a,u),o.addShape(a,l),o.endTensorTypeAndShape(a)}}i.TensorTypeAndShape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsMapType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}keyType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}valueType(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,u){a.addFieldInt32(0,u,0)}static addValueType(a,u){a.addFieldOffset(1,u,0)}static endMapType(a){return a.endObject()}static createMapType(a,u,l){return o.startMapType(a),o.addKeyType(a,u),o.addValueType(a,l),o.endMapType(a)}}i.MapType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSequenceType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSequenceType(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(a){a.startObject(1)}static addElemType(a,u){a.addFieldOffset(0,u,0)}static endSequenceType(a){return a.endObject()}static createSequenceType(a,u){return o.startSequenceType(a),o.addElemType(a,u),o.endSequenceType(a)}}i.SequenceType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(a,u,l,f){return a.prep(4,12),a.writeInt32(f),a.writeInt32(l),a.writeInt32(u),a.offset()}}i.EdgeEnd=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNodeEdge(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNodeEdge(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndex(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readUint32(this.bb_pos+a):0}inputEdges(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}inputEdgesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}outputEdges(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}outputEdgesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNodeEdge(a){a.startObject(3)}static addNodeIndex(a,u){a.addFieldInt32(0,u,0)}static addInputEdges(a,u){a.addFieldOffset(1,u,0)}static startInputEdgesVector(a,u){a.startVector(12,u,4)}static addOutputEdges(a,u){a.addFieldOffset(2,u,0)}static startOutputEdgesVector(a,u){a.startVector(12,u,4)}static endNodeEdge(a){return a.endObject()}static createNodeEdge(a,u,l,f){return o.startNodeEdge(a),o.addNodeIndex(a,u),o.addInputEdges(a,l),o.addOutputEdges(a,f),o.endNodeEdge(a)}}i.NodeEdge=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNode(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}sinceVersion(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):0}executionProviderType(a){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,a):null}inputs(a,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new e.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}attributesLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+a*4):0}inputArgCountsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){let a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}implicitInputsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDomain(a,u){a.addFieldOffset(2,u,0)}static addSinceVersion(a,u){a.addFieldInt32(3,u,0)}static addIndex(a,u){a.addFieldInt32(4,u,0)}static addOpType(a,u){a.addFieldOffset(5,u,0)}static addType(a,u){a.addFieldInt32(6,u,0)}static addExecutionProviderType(a,u){a.addFieldOffset(7,u,0)}static addInputs(a,u){a.addFieldOffset(8,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(9,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addAttributes(a,u){a.addFieldOffset(10,u,0)}static createAttributesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startAttributesVector(a,u){a.startVector(4,u,4)}static addInputArgCounts(a,u){a.addFieldOffset(11,u,0)}static createInputArgCountsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startInputArgCountsVector(a,u){a.startVector(4,u,4)}static addImplicitInputs(a,u){a.addFieldOffset(12,u,0)}static createImplicitInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startImplicitInputsVector(a,u){a.startVector(4,u,4)}static endNode(a){return a.endObject()}static createNode(a,u,l,f,c,p,g,b,h,v,w,_,I,$){return o.startNode(a),o.addName(a,u),o.addDocString(a,l),o.addDomain(a,f),o.addSinceVersion(a,c),o.addIndex(a,p),o.addOpType(a,g),o.addType(a,b),o.addExecutionProviderType(a,h),o.addInputs(a,v),o.addOutputs(a,w),o.addAttributes(a,_),o.addInputArgCounts(a,I),o.addImplicitInputs(a,$),o.endNode(a)}}i.Node=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsValueInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsValueInfo(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(a){a.startObject(3)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldOffset(2,u,0)}static endValueInfo(a){return a.endObject()}static createValueInfo(a,u,l,f){return o.startValueInfo(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.endValueInfo(a)}}i.ValueInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTypeInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTypeInfo(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}denotation(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}valueType(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readUint8(this.bb_pos+a):0}value(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(a,this.bb_pos+u):null}static startTypeInfo(a){a.startObject(3)}static addDenotation(a,u){a.addFieldOffset(0,u,0)}static addValueType(a,u){a.addFieldInt8(1,u,0)}static addValue(a,u){a.addFieldOffset(2,u,0)}static endTypeInfo(a){return a.endObject()}static createTypeInfo(a,u,l,f){return o.startTypeInfo(a),o.addDenotation(a,u),o.addValueType(a,l),o.addValue(a,f),o.endTypeInfo(a)}}i.TypeInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsOperatorSetId(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsOperatorSetId(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}domain(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}version(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}static startOperatorSetId(a){a.startObject(2)}static addDomain(a,u){a.addFieldOffset(0,u,0)}static addVersion(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static endOperatorSetId(a){return a.endObject()}static createOperatorSetId(a,u,l){return o.startOperatorSetId(a),o.addDomain(a,u),o.addVersion(a,l),o.endOperatorSetId(a)}}i.OperatorSetId=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensor(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}dataType(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}rawData(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+a):0}rawDataLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}rawDataArray(){let a=this.bb.__offset(this.bb_pos,12);return a?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}stringData(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringDataLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}static startTensor(a){a.startObject(6)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static addDataType(a,u){a.addFieldInt32(3,u,0)}static addRawData(a,u){a.addFieldOffset(4,u,0)}static createRawDataVector(a,u){a.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)a.addInt8(u[l]);return a.endVector()}static startRawDataVector(a,u){a.startVector(1,u,1)}static addStringData(a,u){a.addFieldOffset(5,u,0)}static createStringDataVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringDataVector(a,u){a.startVector(4,u,4)}static endTensor(a){return a.endObject()}static createTensor(a,u,l,f,c,p,g){return o.startTensor(a),o.addName(a,u),o.addDocString(a,l),o.addDims(a,f),o.addDataType(a,c),o.addRawData(a,p),o.addStringData(a,g),o.endTensor(a)}}i.Tensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSparseTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSparseTensor(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}values(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSparseTensor(a){a.startObject(3)}static addValues(a,u){a.addFieldOffset(0,u,0)}static addIndices(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static endSparseTensor(a){return a.endObject()}static createSparseTensor(a,u,l,f){return o.startSparseTensor(a),o.addValues(a,u),o.addIndices(a,l),o.addDims(a,f),o.endSparseTensor(a)}}i.SparseTensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsAttribute(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsAttribute(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt32(this.bb_pos+a):0}f(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readFloat32(this.bb_pos+a):0}i(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}s(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}t(a){let u=this.bb.__offset(this.bb_pos,16);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+a*4):0}floatsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}floatsArray(){let a=this.bb.__offset(this.bb_pos,20);return a?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}ints(a){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}intsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}strings(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringsLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}tensors(a,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}tensorsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}graphs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}graphsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startAttribute(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldInt32(2,u,0)}static addF(a,u){a.addFieldFloat32(3,u,0)}static addI(a,u){a.addFieldInt64(4,u,a.createLong(0,0))}static addS(a,u){a.addFieldOffset(5,u,0)}static addT(a,u){a.addFieldOffset(6,u,0)}static addG(a,u){a.addFieldOffset(7,u,0)}static addFloats(a,u){a.addFieldOffset(8,u,0)}static createFloatsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addFloat32(u[l]);return a.endVector()}static startFloatsVector(a,u){a.startVector(4,u,4)}static addInts(a,u){a.addFieldOffset(9,u,0)}static createIntsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startIntsVector(a,u){a.startVector(8,u,8)}static addStrings(a,u){a.addFieldOffset(10,u,0)}static createStringsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringsVector(a,u){a.startVector(4,u,4)}static addTensors(a,u){a.addFieldOffset(11,u,0)}static createTensorsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startTensorsVector(a,u){a.startVector(4,u,4)}static addGraphs(a,u){a.addFieldOffset(12,u,0)}static createGraphsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startGraphsVector(a,u){a.startVector(4,u,4)}static endAttribute(a){return a.endObject()}static createAttribute(a,u,l,f,c,p,g,b,h,v,w,_,I,$){return o.startAttribute(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.addF(a,c),o.addI(a,p),o.addS(a,g),o.addT(a,b),o.addG(a,h),o.addFloats(a,v),o.addInts(a,w),o.addStrings(a,_),o.addTensors(a,I),o.addGraphs(a,$),o.endAttribute(a)}}i.Attribute=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsGraph(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsGraph(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}initializers(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}initializersLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeArgs(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeArgsLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}nodes(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}maxNodeIndex(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readUint32(this.bb_pos+a):0}nodeEdges(a,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new e.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeEdgesLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}inputs(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__vector_len(this.bb_pos+a):0}sparseInitializers(a,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new e.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}sparseInitializersLength(){let a=this.bb.__offset(this.bb_pos,18);return a?this.bb.__vector_len(this.bb_pos+a):0}static startGraph(a){a.startObject(8)}static addInitializers(a,u){a.addFieldOffset(0,u,0)}static createInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInitializersVector(a,u){a.startVector(4,u,4)}static addNodeArgs(a,u){a.addFieldOffset(1,u,0)}static createNodeArgsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeArgsVector(a,u){a.startVector(4,u,4)}static addNodes(a,u){a.addFieldOffset(2,u,0)}static createNodesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodesVector(a,u){a.startVector(4,u,4)}static addMaxNodeIndex(a,u){a.addFieldInt32(3,u,0)}static addNodeEdges(a,u){a.addFieldOffset(4,u,0)}static createNodeEdgesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeEdgesVector(a,u){a.startVector(4,u,4)}static addInputs(a,u){a.addFieldOffset(5,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(6,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addSparseInitializers(a,u){a.addFieldOffset(7,u,0)}static createSparseInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSparseInitializersVector(a,u){a.startVector(4,u,4)}static endGraph(a){return a.endObject()}static createGraph(a,u,l,f,c,p,g,b,h){return o.startGraph(a),o.addInitializers(a,u),o.addNodeArgs(a,l),o.addNodes(a,f),o.addMaxNodeIndex(a,c),o.addNodeEdges(a,p),o.addInputs(a,g),o.addOutputs(a,b),o.addSparseInitializers(a,h),o.endGraph(a)}}i.Graph=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsModel(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsModel(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}irVersion(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}opsetImport(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}opsetImportLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}producerName(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}producerVersion(a){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,a):null}modelVersion(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}docString(a){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,a):null}graph(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,a):null}static startModel(a){a.startObject(9)}static addIrVersion(a,u){a.addFieldInt64(0,u,a.createLong(0,0))}static addOpsetImport(a,u){a.addFieldOffset(1,u,0)}static createOpsetImportVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOpsetImportVector(a,u){a.startVector(4,u,4)}static addProducerName(a,u){a.addFieldOffset(2,u,0)}static addProducerVersion(a,u){a.addFieldOffset(3,u,0)}static addDomain(a,u){a.addFieldOffset(4,u,0)}static addModelVersion(a,u){a.addFieldInt64(5,u,a.createLong(0,0))}static addDocString(a,u){a.addFieldOffset(6,u,0)}static addGraph(a,u){a.addFieldOffset(7,u,0)}static addGraphDocString(a,u){a.addFieldOffset(8,u,0)}static endModel(a){return a.endObject()}static createModel(a,u,l,f,c,p,g,b,h,v){return o.startModel(a),o.addIrVersion(a,u),o.addOpsetImport(a,l),o.addProducerName(a,f),o.addProducerVersion(a,c),o.addDomain(a,p),o.addModelVersion(a,g),o.addDocString(a,b),o.addGraph(a,h),o.addGraphDocString(a,v),o.endModel(a)}}i.Model=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsKernelCreateInfos(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsKernelCreateInfos(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndices(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+a*4):0}nodeIndicesLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeIndicesArray(){let a=this.bb.__offset(this.bb_pos,4);return a?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}kernelDefHashes(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startKernelCreateInfos(a){a.startObject(2)}static addNodeIndices(a,u){a.addFieldOffset(0,u,0)}static createNodeIndicesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startNodeIndicesVector(a,u){a.startVector(4,u,4)}static addKernelDefHashes(a,u){a.addFieldOffset(1,u,0)}static createKernelDefHashesVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startKernelDefHashesVector(a,u){a.startVector(8,u,8)}static endKernelCreateInfos(a){return a.endObject()}static createKernelCreateInfos(a,u,l){return o.startKernelCreateInfos(a),o.addNodeIndices(a,u),o.addKernelDefHashes(a,l),o.endKernelCreateInfos(a)}}i.KernelCreateInfos=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSubGraphSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSubGraphSessionState(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}graphId(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(a){a.startObject(2)}static addGraphId(a,u){a.addFieldOffset(0,u,0)}static addSessionState(a,u){a.addFieldOffset(1,u,0)}static endSubGraphSessionState(a){let u=a.endObject();return a.requiredField(u,4),u}static createSubGraphSessionState(a,u,l){return o.startSubGraphSessionState(a),o.addGraphId(a,u),o.addSessionState(a,l),o.endSubGraphSessionState(a)}}i.SubGraphSessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSessionState(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}subGraphSessionStatesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSessionState(a){a.startObject(2)}static addKernels(a,u){a.addFieldOffset(0,u,0)}static addSubGraphSessionStates(a,u){a.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSubGraphSessionStatesVector(a,u){a.startVector(4,u,4)}static endSessionState(a){return a.endObject()}static createSessionState(a,u,l){return o.startSessionState(a),o.addKernels(a,u),o.addSubGraphSessionStates(a,l),o.endSessionState(a)}}i.SessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsInferenceSession(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}model(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(a){a.startObject(3)}static addOrtVersion(a,u){a.addFieldOffset(0,u,0)}static addModel(a,u){a.addFieldOffset(1,u,0)}static addSessionState(a,u){a.addFieldOffset(2,u,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,u){a.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,u){a.finish(u,"ORTM",!0)}static createInferenceSession(a,u,l,f){return o.startInferenceSession(a),o.addOrtVersion(a,u),o.addModel(a,l),o.addSessionState(a,f),o.endInferenceSession(a)}}i.InferenceSession=o})(n=t.fbs||={})})(r=e.experimental||={})})(ie||={})});var Lc=et((B$,Bc)=>{"use strict";Bc.exports=j_;function j_(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(a,u){n[t]=function(f){if(i)if(i=!1,f)u(f);else{for(var c=new Array(arguments.length-1),p=0;p<c.length;)c[p++]=arguments[p];a.apply(null,c)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Mc=et(Rc=>{"use strict";var Oo=Rc;Oo.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var dn=new Array(64),zc=new Array(123);for(Mt=0;Mt<64;)zc[dn[Mt]=Mt<26?Mt+65:Mt<52?Mt+71:Mt<62?Mt-4:Mt-59|43]=Mt++;var Mt;Oo.encode=function(e,n,t){for(var o=null,i=[],s=0,a=0,u;n<t;){var l=e[n++];switch(a){case 0:i[s++]=dn[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=dn[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=dn[u|l>>6],i[s++]=dn[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=dn[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var Nc="invalid encoding";Oo.decode=function(e,n,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=zc[u])===void 0)throw Error(Nc);switch(i){case 0:s=u,i=1;break;case 1:n[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:n[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:n[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(Nc);return t-o};Oo.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Vc=et((N$,Fc)=>{"use strict";Fc.exports=Po;function Po(){this._listeners={}}Po.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Po.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Po.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var jc=et((z$,Kc)=>{"use strict";Kc.exports=Gc(Gc);function Gc(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3]}function i(u,l,f){e[0]=u,l[f]=n[3],l[f+1]=n[2],l[f+2]=n[1],l[f+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function a(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?s:a,r.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}r.writeFloatLE=e.bind(null,Uc),r.writeFloatBE=e.bind(null,Wc);function n(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Hc),r.readFloatBE=n.bind(null,qc)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3],l[f+4]=n[4],l[f+5]=n[5],l[f+6]=n[6],l[f+7]=n[7]}function i(u,l,f){e[0]=u,l[f]=n[7],l[f+1]=n[6],l[f+2]=n[5],l[f+3]=n[4],l[f+4]=n[3],l[f+5]=n[2],l[f+6]=n[1],l[f+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function a(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?s:a,r.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var f;if(s<22250738585072014e-324)f=s/5e-324,t(f>>>0,a,u+o),t((l<<31|f/4294967296)>>>0,a,u+i);else{var c=Math.floor(Math.log(s)/Math.LN2);c===1024&&(c=1023),f=s*Math.pow(2,-c),t(f*4503599627370496>>>0,a,u+o),t((l<<31|c+1023<<20|f*1048576&1048575)>>>0,a,u+i)}}}r.writeDoubleLE=e.bind(null,Uc,0,4),r.writeDoubleBE=e.bind(null,Wc,4,0);function n(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),f=(l>>31)*2+1,c=l>>>20&2047,p=4294967296*(l&1048575)+u;return c===2047?p?NaN:f*(1/0):c===0?f*5e-324*p:f*Math.pow(2,c-1075)*(p+4503599627370496)}r.readDoubleLE=n.bind(null,Hc,0,4),r.readDoubleBE=n.bind(null,qc,4,0)}(),r}function Uc(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Wc(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Hc(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function qc(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Xc=et((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var Jc=et(Zc=>{"use strict";var Ra=Zc;Ra.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};Ra.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,s=[],a=0,u;n<t;)u=e[n++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};Ra.write=function(e,n,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Qc=et((M$,Yc)=>{"use strict";Yc.exports=X_;function X_(r,e,n){var t=n||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return r(u);s+u>t&&(i=r(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var tf=et((F$,ef)=>{"use strict";ef.exports=st;var kn=Ir();function st(r,e){this.lo=r>>>0,this.hi=e>>>0}var Mr=st.zero=new st(0,0);Mr.toNumber=function(){return 0};Mr.zzEncode=Mr.zzDecode=function(){return this};Mr.length=function(){return 1};var Z_=st.zeroHash="\0\0\0\0\0\0\0\0";st.fromNumber=function(e){if(e===0)return Mr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new st(t,o)};st.from=function(e){if(typeof e=="number")return st.fromNumber(e);if(kn.isString(e))if(kn.Long)e=kn.Long.fromString(e);else return st.fromNumber(parseInt(e,10));return e.low||e.high?new st(e.low>>>0,e.high>>>0):Mr};st.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};st.prototype.toLong=function(e){return kn.Long?new kn.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Tr=String.prototype.charCodeAt;st.fromHash=function(e){return e===Z_?Mr:new st((Tr.call(e,0)|Tr.call(e,1)<<8|Tr.call(e,2)<<16|Tr.call(e,3)<<24)>>>0,(Tr.call(e,4)|Tr.call(e,5)<<8|Tr.call(e,6)<<16|Tr.call(e,7)<<24)>>>0)};st.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};st.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};st.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};st.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var Ir=et(Ma=>{"use strict";var se=Ma;se.asPromise=Lc();se.base64=Mc();se.EventEmitter=Vc();se.float=jc();se.inquire=Xc();se.utf8=Jc();se.pool=Qc();se.LongBits=tf();se.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);se.global=se.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Ma;se.emptyArray=Object.freeze?Object.freeze([]):[];se.emptyObject=Object.freeze?Object.freeze({}):{};se.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};se.isString=function(e){return typeof e=="string"||e instanceof String};se.isObject=function(e){return e&&typeof e=="object"};se.isset=se.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};se.Buffer=function(){try{var r=se.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();se._Buffer_from=null;se._Buffer_allocUnsafe=null;se.newBuffer=function(e){return typeof e=="number"?se.Buffer?se._Buffer_allocUnsafe(e):new se.Array(e):se.Buffer?se._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};se.Array=typeof Uint8Array<"u"?Uint8Array:Array;se.Long=se.global.dcodeIO&&se.global.dcodeIO.Long||se.global.Long||se.inquire("long");se.key2Re=/^true|false|0|1$/;se.key32Re=/^-?(?:0|[1-9][0-9]*)$/;se.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;se.longToHash=function(e){return e?se.LongBits.from(e).toHash():se.LongBits.zeroHash};se.longFromHash=function(e,n){var t=se.LongBits.fromHash(e);return se.Long?se.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function rf(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}se.merge=rf;se.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function nf(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&rf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}se.newError=nf;se.ProtocolError=nf("ProtocolError");se.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};se.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};se.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};se._configure=function(){var r=se.Buffer;if(!r){se._Buffer_from=se._Buffer_allocUnsafe=null;return}se._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},se._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var qa=et((G$,uf)=>{"use strict";uf.exports=Pe;var Et=Ir(),Fa,Eo=Et.LongBits,of=Et.base64,af=Et.utf8;function Dn(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function Ga(){}function J_(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function Pe(){this.len=0,this.head=new Dn(Ga,0,0),this.tail=this.head,this.states=null}var sf=function(){return Et.Buffer?function(){return(Pe.create=function(){return new Fa})()}:function(){return new Pe}};Pe.create=sf();Pe.alloc=function(e){return new Et.Array(e)};Et.Array!==Array&&(Pe.alloc=Et.pool(Pe.alloc,Et.Array.prototype.subarray));Pe.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Dn(e,n,t),this.len+=n,this};function Ua(r,e,n){e[n]=r&255}function Y_(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Wa(r,e){this.len=r,this.next=void 0,this.val=e}Wa.prototype=Object.create(Dn.prototype);Wa.prototype.fn=Y_;Pe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Wa((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Pe.prototype.int32=function(e){return e<0?this._push(Ha,10,Eo.fromNumber(e)):this.uint32(e)};Pe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Ha(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}Pe.prototype.uint64=function(e){var n=Eo.from(e);return this._push(Ha,n.length(),n)};Pe.prototype.int64=Pe.prototype.uint64;Pe.prototype.sint64=function(e){var n=Eo.from(e).zzEncode();return this._push(Ha,n.length(),n)};Pe.prototype.bool=function(e){return this._push(Ua,1,e?1:0)};function Va(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}Pe.prototype.fixed32=function(e){return this._push(Va,4,e>>>0)};Pe.prototype.sfixed32=Pe.prototype.fixed32;Pe.prototype.fixed64=function(e){var n=Eo.from(e);return this._push(Va,4,n.lo)._push(Va,4,n.hi)};Pe.prototype.sfixed64=Pe.prototype.fixed64;Pe.prototype.float=function(e){return this._push(Et.float.writeFloatLE,4,e)};Pe.prototype.double=function(e){return this._push(Et.float.writeDoubleLE,8,e)};var Q_=Et.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};Pe.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(Ua,1,0);if(Et.isString(e)){var t=Pe.alloc(n=of.length(e));of.decode(e,t,0),e=t}return this.uint32(n)._push(Q_,n,e)};Pe.prototype.string=function(e){var n=af.length(e);return n?this.uint32(n)._push(af.write,n,e):this._push(Ua,1,0)};Pe.prototype.fork=function(){return this.states=new J_(this),this.head=this.tail=new Dn(Ga,0,0),this.len=0,this};Pe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Dn(Ga,0,0),this.len=0),this};Pe.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};Pe.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};Pe._configure=function(r){Fa=r,Pe.create=sf(),Fa._configure()}});var ff=et((U$,cf)=>{"use strict";cf.exports=Jt;var lf=qa();(Jt.prototype=Object.create(lf.prototype)).constructor=Jt;var Sr=Ir();function Jt(){lf.call(this)}Jt._configure=function(){Jt.alloc=Sr._Buffer_allocUnsafe,Jt.writeBytesBuffer=Sr.Buffer&&Sr.Buffer.prototype instanceof Uint8Array&&Sr.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};Jt.prototype.bytes=function(e){Sr.isString(e)&&(e=Sr._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(Jt.writeBytesBuffer,n,e),this};function ew(r,e,n){r.length<40?Sr.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}Jt.prototype.string=function(e){var n=Sr.Buffer.byteLength(e);return this.uint32(n),n&&this._push(ew,n,e),this};Jt._configure()});var Xa=et((W$,bf)=>{"use strict";bf.exports=Je;var Ft=Ir(),ja,mf=Ft.LongBits,tw=Ft.utf8;function Vt(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Je(r){this.buf=r,this.pos=0,this.len=r.length}var df=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Je(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Je(e);throw Error("illegal buffer")},hf=function(){return Ft.Buffer?function(n){return(Je.create=function(o){return Ft.Buffer.isBuffer(o)?new ja(o):df(o)})(n)}:df};Je.create=hf();Je.prototype._slice=Ft.Array.prototype.subarray||Ft.Array.prototype.slice;Je.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Vt(this,10);return e}}();Je.prototype.int32=function(){return this.uint32()|0};Je.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Ka(){var r=new mf(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Vt(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw Vt(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Je.prototype.bool=function(){return this.uint32()!==0};function Co(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Je.prototype.fixed32=function(){if(this.pos+4>this.len)throw Vt(this,4);return Co(this.buf,this.pos+=4)};Je.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Vt(this,4);return Co(this.buf,this.pos+=4)|0};function pf(){if(this.pos+8>this.len)throw Vt(this,8);return new mf(Co(this.buf,this.pos+=4),Co(this.buf,this.pos+=4))}Je.prototype.float=function(){if(this.pos+4>this.len)throw Vt(this,4);var e=Ft.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Je.prototype.double=function(){if(this.pos+8>this.len)throw Vt(this,4);var e=Ft.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Je.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw Vt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Ft.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Je.prototype.string=function(){var e=this.bytes();return tw.read(e,0,e.length)};Je.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Vt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Vt(this);while(this.buf[this.pos++]&128);return this};Je.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Je._configure=function(r){ja=r,Je.create=hf(),ja._configure();var e=Ft.Long?"toLong":"toNumber";Ft.merge(Je.prototype,{int64:function(){return Ka.call(this)[e](!1)},uint64:function(){return Ka.call(this)[e](!0)},sint64:function(){return Ka.call(this).zzDecode()[e](!1)},fixed64:function(){return pf.call(this)[e](!0)},sfixed64:function(){return pf.call(this)[e](!1)}})}});var _f=et((H$,xf)=>{"use strict";xf.exports=Fr;var yf=Xa();(Fr.prototype=Object.create(yf.prototype)).constructor=Fr;var gf=Ir();function Fr(r){yf.call(this,r)}Fr._configure=function(){gf.Buffer&&(Fr.prototype._slice=gf.Buffer.prototype.slice)};Fr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Fr._configure()});var vf=et((q$,wf)=>{"use strict";wf.exports=Bn;var Za=Ir();(Bn.prototype=Object.create(Za.EventEmitter.prototype)).constructor=Bn;function Bn(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Za.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Bn.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return Za.asPromise(r,s,e,n,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(f){return s.emit("error",f,e),i(f)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Bn.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var If=et(Tf=>{"use strict";var rw=Tf;rw.Service=vf()});var $f=et((j$,Sf)=>{"use strict";Sf.exports={}});var Pf=et(Of=>{"use strict";var yt=Of;yt.build="minimal";yt.Writer=qa();yt.BufferWriter=ff();yt.Reader=Xa();yt.BufferReader=_f();yt.util=Ir();yt.rpc=If();yt.roots=$f();yt.configure=Af;function Af(){yt.util._configure(),yt.Writer._configure(yt.BufferWriter),yt.Reader._configure(yt.BufferReader)}Af()});var Cf=et((Z$,Ef)=>{"use strict";Ef.exports=Pf()});var pn=et((J$,kf)=>{"use strict";var Ge=Cf(),j=Ge.Reader,Ye=Ge.Writer,A=Ge.util,S=Ge.roots.default||(Ge.roots.default={});S.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.s=A.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=A.emptyArray,e.prototype.ints=A.emptyArray,e.prototype.strings=A.emptyArray,e.prototype.tensors=A.emptyArray,e.prototype.graphs=A.emptyArray,e.prototype.sparseTensors=A.emptyArray,e.prototype.typeProtos=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!A.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!A.isInteger(t.i)&&!(t.i&&A.isInteger(t.i.low)&&A.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||A.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!A.isInteger(t.ints[i])&&!(t.ints[i]&&A.isInteger(t.ints[i].low)&&A.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||A.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(A.Long?(o.i=A.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?A.base64.decode(t.s,o.s=A.newBuffer(A.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)A.Long?(o.ints[i]=A.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new A.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?A.base64.decode(t.strings[i],o.strings[i]=A.newBuffer(A.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,A.Long){var s=new A.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=A.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?A.Long.prototype.toString.call(t.i):o.longs===Number?new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?A.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?A.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new A.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?A.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=S.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=S.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=S.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=A.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!A.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=S.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=A.emptyArray,e.prototype.updateBinding=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=A.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=A.emptyArray,e.prototype.trainingInfo=A.emptyArray,e.prototype.functions=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!A.isInteger(t.irVersion)&&!(t.irVersion&&A.isInteger(t.irVersion.low)&&A.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!A.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!A.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!A.isInteger(t.modelVersion)&&!(t.modelVersion&&A.isInteger(t.modelVersion.low)&&A.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(A.Long?(o.irVersion=A.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(A.Long?(o.modelVersion=A.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(A.Long){var s=new A.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",A.Long){var s=new A.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?A.Long.prototype.toString.call(t.irVersion):o.longs===Number?new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?A.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=S.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!A.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!A.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!A.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=A.emptyArray,e.prototype.name="",e.prototype.initializer=A.emptyArray,e.prototype.sparseInitializer=A.emptyArray,e.prototype.docString="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.valueInfo=A.emptyArray,e.prototype.quantizationAnnotation=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=S.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=S.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=S.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=S.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=A.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=A.emptyArray,e.prototype.int32Data=A.emptyArray,e.prototype.stringData=A.emptyArray,e.prototype.int64Data=A.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=A.newBuffer([]),e.prototype.externalData=A.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=A.emptyArray,e.prototype.uint64Data=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!A.isInteger(t.dims[o])&&!(t.dims[o]&&A.isInteger(t.dims[o].low)&&A.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!A.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!A.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||A.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!A.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&A.isInteger(t.int64Data[o].low)&&A.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||A.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!A.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&A.isInteger(t.uint64Data[o].low)&&A.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?A.base64.decode(t.stringData[i],o.stringData[i]=A.newBuffer(A.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)A.Long?(o.int64Data[i]=A.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new A.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?A.base64.decode(t.rawData,o.rawData=A.newBuffer(A.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)A.Long?(o.uint64Data[i]=A.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new A.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=A.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?A.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new A.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?A.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new A.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=S.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=A.Long?A.Long.fromBits(0,0,!1):0,n.prototype.end=A.Long?A.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Ye.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof j||(o=j.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},n.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!A.isInteger(o.begin)&&!(o.begin&&A.isInteger(o.begin.low)&&A.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!A.isInteger(o.end)&&!(o.end&&A.isInteger(o.end.low)&&A.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(A.Long?(i.begin=A.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(A.Long?(i.end=A.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(A.Long){var a=new A.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(A.Long){var a=new A.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?A.Long.prototype.toString.call(o.begin):i.longs===Number?new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?A.Long.prototype.toString.call(o.end):i.longs===Number?new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!A.isInteger(t.dims[i])&&!(t.dims[i]&&A.isInteger(t.dims[i].low)&&A.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:A.oneOfGetter(t=["dimValue","dimParam"]),set:A.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,s){return s||(s=Ye.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},n.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},n.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!A.isInteger(i.dimValue)&&!(i.dimValue&&A.isInteger(i.dimValue.low)&&A.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!A.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!A.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var s=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(A.Long?(s.dimValue=A.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},n.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?A.Long.prototype.toString.call(i.dimValue):s.longs===Number?new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:A.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:A.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Ye.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof j||(o=j.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!A.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var s=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var s=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ye.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!A.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=S.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var s=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=S.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var s=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ye.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var s=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=A.Long?A.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ye.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!A.isInteger(t.version)&&!(t.version&&A.isInteger(t.version.low)&&A.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(A.Long?(o.version=A.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",A.Long){var s=new A.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?A.Long.prototype.toString.call(t.version):o.longs===Number?new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.attribute=A.emptyArray,e.prototype.attributeProto=A.emptyArray,e.prototype.node=A.emptyArray,e.prototype.docString="",e.prototype.opsetImport=A.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ye.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!A.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=S.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ge.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();kf.exports=S});function mn(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Nn(r){return new TextDecoder().decode(r)}var Ue,Vr,Ja,mt,ko,ct,xt,re,Ln,Gr,Ur,Wr,Le=k(()=>{"use strict";Ao();za();Ue=ln(pn());Hr();Vr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},Ja=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},mt=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Ja.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;a[s-u]=Math.max(l,f)}return a}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let s=r.calcShape(e.dims,n.dims);if(s){if(o&&!re.areEqual(s,e.dims))return;let a=re.size(s),u=o?e:new tt(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(s.length),f=new Array(e.dims.length),c=new Array(n.dims.length),p=0,g=0,b=!1,h=!1;e.dims.length===0&&(p=e.get([]),b=!0),n.dims.length===0&&(g=n.get([]),h=!0);let v;for(let w=0;w<a;w++){v=w;for(let _=s.length-1;_>=0;_--)l[_]=v%s[_],v=Math.floor(v/s[_]);b||(r.fillIndex(l,e.dims,f),p=e.get(f)),h||(r.fillIndex(l,n.dims,c),g=n.get(c)),u.set(l,t(p,g))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(n[n.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},ko=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!mt.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},ct=class r{static tensorDataTypeFromProto(e){switch(e){case Ue.onnx.TensorProto.DataType.INT8:return"int8";case Ue.onnx.TensorProto.DataType.UINT8:return"uint8";case Ue.onnx.TensorProto.DataType.BOOL:return"bool";case Ue.onnx.TensorProto.DataType.INT16:return"int16";case Ue.onnx.TensorProto.DataType.UINT16:return"uint16";case Ue.onnx.TensorProto.DataType.INT32:return"int32";case Ue.onnx.TensorProto.DataType.UINT32:return"uint32";case Ue.onnx.TensorProto.DataType.FLOAT:return"float32";case Ue.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ue.onnx.TensorProto.DataType.STRING:return"string";case Ue.onnx.TensorProto.DataType.INT64:return"int32";case Ue.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ue.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ue.onnx.TensorProto.DataType.INT8;case"uint8":return Ue.onnx.TensorProto.DataType.UINT8;case"bool":return Ue.onnx.TensorProto.DataType.BOOL;case"int16":return Ue.onnx.TensorProto.DataType.INT16;case"uint16":return Ue.onnx.TensorProto.DataType.UINT16;case"int32":return Ue.onnx.TensorProto.DataType.INT32;case"uint32":return Ue.onnx.TensorProto.DataType.UINT32;case"float32":return Ue.onnx.TensorProto.DataType.FLOAT;case"float64":return Ue.onnx.TensorProto.DataType.DOUBLE;case"string":return Ue.onnx.TensorProto.DataType.STRING;case"int64":return Ue.onnx.TensorProto.DataType.INT64;case"uint64":return Ue.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>dr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(xt.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},xt=class{static longToNumber(e,n){return dr.isLong(e)?e.toNumber():e instanceof D.Long?dr.fromValue({low:e.low,high:e.high,unsigned:n??!1}).toNumber():e}static isLong(e){return dr.isLong(e)||e instanceof D.Long}},re=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];s*=o[u]}}let a=r.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(n).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let s=r.normalizeAxis(n[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Ln=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[n]=t[a],i.push(u)}return[i,s]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Gr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)r.adjustPadAndReturnShape(e[a+2],n[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Ur=-34028234663852886e22,Wr=34028234663852886e22});function nw(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function Df(r){switch(r){case _e.onnx.TensorProto.DataType.UINT8:case _e.onnx.TensorProto.DataType.INT8:case _e.onnx.TensorProto.DataType.BOOL:return 1;case _e.onnx.TensorProto.DataType.UINT16:case _e.onnx.TensorProto.DataType.INT16:return 2;case _e.onnx.TensorProto.DataType.FLOAT:case _e.onnx.TensorProto.DataType.INT32:case _e.onnx.TensorProto.DataType.UINT32:return 4;case _e.onnx.TensorProto.DataType.INT64:case _e.onnx.TensorProto.DataType.DOUBLE:case _e.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${_e.onnx.TensorProto.DataType[r]}`)}}function ow(r,e){return new(Nf(e))(r)}function Nf(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Qa(r,e){if(e===_e.onnx.TensorProto.DataType.INT64||e===Ya.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===_e.onnx.TensorProto.DataType.UINT32||e===Ya.TensorDataType.UINT32||e===_e.onnx.TensorProto.DataType.UINT64||e===Ya.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${_e.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Bf(r,e,n){switch(e){case _e.onnx.TensorProto.DataType.BOOL:case _e.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case _e.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case _e.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case _e.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case _e.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case _e.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case _e.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case _e.onnx.TensorProto.DataType.INT64:return Qa(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case _e.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case _e.onnx.TensorProto.DataType.UINT64:return Qa(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${_e.onnx.TensorProto.DataType[e]}`)}}var Lf,_e,Ya,tt,Hr=k(()=>{"use strict";Lf=ln(Tc());za();Cn();_e=ln(pn());Le();Ya=ie.experimental.fbs,tt=class r{constructor(e,n,t,o,i,s=Lf.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=re.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=Nf(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*nw(n));this.cache=ow(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[re.indicesToOffset(e,this.strides)]}set(e,n){this.data[re.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=re.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ct.tensorDataTypeFromProto(e.dataType),t=ct.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,s)=>{o.data[s]=Nn(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=Df(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=Bf(s,e.dataType,l*a);i[l]=f}}else{let i;switch(e.dataType){case _e.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case _e.onnx.TensorProto.DataType.INT32:case _e.onnx.TensorProto.DataType.INT16:case _e.onnx.TensorProto.DataType.UINT16:case _e.onnx.TensorProto.DataType.INT8:case _e.onnx.TensorProto.DataType.UINT8:case _e.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case _e.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case _e.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case _e.onnx.TensorProto.DataType.UINT32:case _e.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];dr.isLong(u)?s[a]=Qa(u,e.dataType):s[a]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ct.tensorDimsFromORTFormat(e),t=ct.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=Df(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=Bf(s,e.dataType(),l*a);i[l]=f}}return o}}});function ce(r){return r===1?iw:aw}function zf(r){let e=ce(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Rf(r){let e=ce(r);return`${e.version}
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

    `}function Mf(r,e){let n=ce(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var iw,aw,He=k(()=>{"use strict";iw={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},aw={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Se=k(()=>{"use strict"});async function es(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,s=()=>{if(r()){t();return}i++;let a=e(i);if(n!=null&&i>=n){o();return}setTimeout(s,a)};s()})}function Do(r){return mn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function Ff(r){return mn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function hn(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function bn(r,e){return e.map(n=>r[n]).join(", ")}function ht(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Gt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var Yt=k(()=>{"use strict";Le()});function sw(r,e){return Gt(e).map(n=>`${r}.${n}`)}function gn(r,e){return e===1?[r]:sw(r,e)}function Qt(){return`
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
  `}var qr=k(()=>{"use strict";Yt()});function lw(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function cw(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(n>2)for(let u=0;u<n-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function fw(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Vf,uw,Gf,Uf=k(()=>{"use strict";He();Se();Yt();qr();Vf={name:"pack",inputNames:["A"],inputTypes:[1]},uw=(r,e)=>{let n=ce(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=ht(i),a=gn("rc",i),u=fw(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let f=lw(i,l,a),c=cw(t,a),p=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${f}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${c});
          }
        }
      `;return{...Vf,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:p}},Gf=(r,e)=>({...Vf,get:()=>uw(r,e)})});function ts(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Hf(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function mw(r){let e=re.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${n[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${n[s+1]} = ${t} - ${n[s]} * ${i}`:`index -= ${n[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function hw(r){let e=re.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var dw,pw,Wf,qf=k(()=>{"use strict";Le();He();Se();qr();dw=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),pw=(r,e,n,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let f="";switch(l){case 0:f="outputCoords = rc;";break;case 1:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:f="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${f}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=ce(r.session.backend.glContext.version),u=`
      ${mw(o)}
      ${hw(i)}
      ${Qt()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Wf=(r,e,n)=>{let t=dw(n);return{...t,get:()=>pw(r,e,t,n)}}});var rs,Kf=k(()=>{"use strict";He();Se();rs=(r,e)=>{let n=e.shape,t=ce(r.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function gw(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var jf,bw,Xf,Zf=k(()=>{"use strict";He();Se();Yt();qr();jf={name:"unpack",inputNames:["A"],inputTypes:[2]},bw=(r,e)=>{let n=e.dims.length,t=gn("rc",n),o=t.slice(-2),i=ht(n),s=Qt(),u=e.dims.length===0?"":gw(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,f=ce(r.session.backend.glContext.version),c=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${f.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...jf,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},Xf=(r,e)=>({...jf,get:()=>bw(r,e)})});var Bo,zn,Lo,Rn=k(()=>{"use strict";At();Bo=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Ne.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Ne.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},zn=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Ne.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Lo=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Mn,Jf,ns,Yf=k(()=>{"use strict";Le();Se();Mn=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,s=n===4?e.length-1:void 0,a=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return ns(r,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},Jf=(r,e,n)=>{let t=Mn(r,e,n);return[t.width,t.height]},ns=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:n,isPacked:i,shape:l,strides:re.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var xw,No,ed=k(()=>{"use strict";At();Hr();Le();Uf();qf();Kf();Zf();Rn();Yf();Se();xw=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},No=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return Jf(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=xw(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=Mn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Mn(this.session.layoutStrategy,e.dims,n);if(n===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=Mn(this.session.layoutStrategy,u,n),f=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let c=a[0],p=a[1]*a[2]*a[3],g=Math.ceil(p*1/4)*4,b=c*g;f=new Float32Array(b);for(let h=0;h<c;++h){let v=h*p,w=h*g+h%1*p;f.set(e.numberData.subarray(v,v+p),w)}}return this.createTextureData(l,e.type,f,e,1)}}if(n===2){let i=ns(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Ne.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,s,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:re.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Hf(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:re.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=ts(e.dims),i=ts(n),s=this.reshapePacked(e,o),a=this.run(Wf(this,s,i),[s]);return this.reshapePacked(a,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let s={...e,tensor:o||new tt(e.unpackedShape,n,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rs(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rs(this,e))}pack(e){return this.executeProgram(Gf(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Xf(this,e.tensor),[e.tensor])}}});var os,xe,ut=k(()=>{"use strict";os=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},xe=r=>new os(r)});var td,rd,nd,_w,ww,od=k(()=>{"use strict";ut();He();Se();td={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},rd=(r,e,n)=>(ww(e),[r.run({...td,cacheHint:n.cacheKey,get:()=>_w(r,e,n)},e)]),nd=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return xe({epsilon:e,momentum:n,spatial:t})},_w=(r,e,n)=>{let t=ce(r.session.backend.glContext.version),o=e[0].dims.length,[i,s]=r.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...td,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},ww=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var zo,Ct,J,Fn,Ro,pr=k(()=>{"use strict";zo=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Ct=class{constructor(e){this.context=e}},J=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Fn=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Ro=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function Tw(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function Iw(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function Sw(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function $w(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function Aw(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function Ow(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function Pw(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function Ew(){let r="and_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}}function Cw(){let r="or_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:r,type:0}}function kw(){let r="xor_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}}function Dw(){return Lw("pow")}function Bw(){let r="prelu_";return{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0}}function Lw(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var kt,Nw,id,ad,sd,ud,ld,cd,fd,dd,pd,md,hd,bd,gd=k(()=>{"use strict";Le();pr();He();Se();kt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>Nw(r,e,n,t)}},Nw=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!re.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=r.session.pack;if(i){let f=mt.calcShape(e[0].dims,e[1].dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");s=f;let c=s.length,p=e[0].dims.length!==0?e[0].dims.length:1,g=e[1].dims.length!==0?e[1].dims.length:1,b=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",v=ce(r.session.backend.glContext.version),w=a?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${v.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${c}]) {
        int aindices[${p}];
        int bindices[${g}];
        ${b}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:w,hasMain:a}}let u=ce(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},id=(r,e)=>[r.run(kt(r,e,Tw()),e)],ad=(r,e)=>[r.run(kt(r,e,Ew(),"bool"),e)],sd=(r,e)=>[r.run(kt(r,e,Iw()),e)],ud=(r,e)=>[r.run(kt(r,e,Aw(),"bool"),e)],ld=(r,e)=>[r.run(kt(r,e,Ow(),"bool"),e)],cd=(r,e)=>[r.run(kt(r,e,Pw(),"bool"),e)],fd=(r,e)=>[r.run(kt(r,e,Sw()),e)],dd=(r,e)=>[r.run(kt(r,e,Cw(),"bool"),e)],pd=(r,e)=>[r.run(kt(r,e,Dw()),e)],md=(r,e)=>[r.run(kt(r,e,Bw()),e)],hd=(r,e)=>[r.run(kt(r,e,$w()),e)],bd=(r,e)=>[r.run(kt(r,e,kw(),"bool"),e)]});var yd,xd,Rw,_d=k(()=>{"use strict";Le();yd=(r,e,n)=>(Rw(e),[r.cast(e[0],n)]),xd=r=>ct.tensorDataTypeFromProto(r.attributes.getInt("to")),Rw=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var Mw,Fw,wd,Mo,vd=k(()=>{"use strict";He();Se();Yt();qr();Mw=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),Fw=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let O=1;O<n.length;O++){let E=n[O].dims.slice();for(let L=0;L<o.length;L++)if(L===t)i[t]+=E[L];else if(o[L]!==E[L])throw new Error("non concat dimensions must match")}let s=i.length,a=gn("coords",s),u=ht(s),l=Qt(),f=n.map(O=>O.dims),c=Gt(s),p=new Array(f.length-1);p[0]=f[0][t];for(let O=1;O<p.length;O++)p[O]=p[O-1]+f[O][t];let g=c[t],b=c.slice(-2),h=c.join(),v=`if (${g} < ${p[0]}) {
        return getChannel(
            getX0(${h}), vec2(${b.join()}));
        }`;for(let O=1;O<p.length;O++){let E=p[O-1];v+=`
            if (${g} < ${p[O]}  && ${g} >= ${p[O-1]}) {
              return getChannel(
                getX${O}(${Mo(c,g,E)}),
                vec2(${Mo(b,g,E)}));
            }`}let w=p.length,_=p[p.length-1];v+=`
            return getChannel(
              getX${w}(${Mo(c,g,_)}),
              vec2(${Mo(b,g,_)}));`;let I=ce(r.session.backend.glContext.version),$=`
          ${l}
          float getValue(${c.map(O=>"int "+O)}) {
            ${v}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${c[s-1]};
            coords.${c[s-1]} = coords.${c[s-2]};
            coords.${c[s-2]} = lastDim;

            vec4 result = vec4(getValue(${a}), 0., 0., 0.);

            ${a[s-1]} = ${a[s-1]} + 1;
            if (${a[s-1]} < ${i[s-1]}) {
              result.g = getValue(${a});
            }

            ${a[s-2]} = ${a[s-2]} + 1;
            if (${a[s-2]} < ${i[s-2]}) {
              result.a = getValue(${a});
            }

            ${a[s-1]} = ${a[s-1]} - 1;
            if (${a[s-2]} < ${i[s-2]} &&
                ${a[s-1]} < ${i[s-1]}) {
              result.b = getValue(${a});
            }
            ${I.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:$,hasMain:!0}},wd=(r,e,n)=>{let t=Mw(e.length,n.cacheKey);return{...t,get:()=>Fw(r,t,e,n.axis)}},Mo=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,s)=>s===t?`${i} - ${n}`:i).join()}});var Td,Vw,Gw,Uw,Id,Ww,Hw,qw,Sd,Kw,$d=k(()=>{"use strict";ut();Se();vd();Td=(r,e,n)=>(Kw(e),r.session.pack&&e[0].dims.length>1?[r.run(wd(r,e,n),e)]:[r.run(Uw(r,e,n),e)]),Vw=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),Gw=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let g=1;g<n.length;g++){let b=n[g].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=b[h];else if(o[h]!==b[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(n.length),u=0;for(let g=0;g<a.length;++g)u+=n[g].dims[t],a[g]=u;let l="";n.length<5?l=Id(a):l=Ww(a);let f=Hw(n.length,s),c=qw(a),p=`
        ${f}
        ${c}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:p}},Uw=(r,e,n)=>{let t=Vw(e.length,n.cacheKey);return{...t,get:()=>Gw(r,t,e,n.axis)}},Id=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,Ww=r=>Id(r),Hw=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},qw=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},Sd=r=>xe({axis:r.attributes.getInt("axis")}),Kw=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function jw(){return Dt("abs")}function Xw(){return Dt("acos")}function Zw(){return Dt("asin")}function Jw(){return Dt("atan")}function Yw(){return Dt("ceil")}function Qw(){return Dt("cos")}function ev(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function tv(){return Dt("exp")}function rv(){return Dt("floor")}function is(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function nv(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function ov(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function iv(){return Dt("log")}function av(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function sv(){let r="not";return{body:`
  float ${r}_(float a) {
    return float( ! bool(a) );
  }
  bool ${r}_(bool a) {
    return !a;
  }
  vec4 ${r}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${r}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:r,type:0}}function uv(){return Dt("sin")}function as(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function ss(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function lv(){return Dt("sqrt")}function cv(){return Dt("tan")}function fv(){let r="tanh";return{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0}}function Dt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var dv,Qe,Ad,Od,Pd,Ed,us,Cd,kd,pv,Dd,Bd,Ld,Nd,zd,Rd,ls,Md,Fd,Vd,Gd,Ud,Wd,Hd,qd,Kd,jd,Xd,cs=k(()=>{"use strict";ut();Le();pr();He();Se();dv=(r,e,n,t)=>{let o=r.session.pack?2:0,i=ce(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},Qe=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>dv(r,i,e,n)}},Ad=(r,e)=>[r.run(Qe(r,e[0],jw()),e)],Od=(r,e)=>[r.run(Qe(r,e[0],Xw()),e)],Pd=(r,e)=>[r.run(Qe(r,e[0],Zw()),e)],Ed=(r,e)=>[r.run(Qe(r,e[0],Jw()),e)],us=(r,e,n)=>[r.run(Qe(r,e[0],is(n.min,n.max),n.cacheKey),e)],Cd=r=>xe({min:r.attributes.getFloat("min",Ur),max:r.attributes.getFloat("max",Wr)}),kd=(r,e)=>{let n=pv(r,e);return us(r,[e[0]],n)},pv=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Ur,t=e.length>=3?e[2].numberData[0]:Wr;return xe({min:n,max:t})},Dd=(r,e)=>[r.run(Qe(r,e[0],Yw()),e)],Bd=(r,e)=>[r.run(Qe(r,e[0],Qw()),e)],Ld=(r,e,n)=>[r.run(Qe(r,e[0],ev(n.alpha),n.cacheKey),e)],Nd=r=>xe({alpha:r.attributes.getFloat("alpha",1)}),zd=(r,e)=>[r.run(Qe(r,e[0],tv()),e)],Rd=(r,e)=>[r.run(Qe(r,e[0],rv()),e)],ls=(r,e)=>[r.run(Qe(r,e[0],nv()),e)],Md=(r,e,n)=>[r.run(Qe(r,e[0],ov(n.alpha),n.cacheKey),e)],Fd=r=>xe({alpha:r.attributes.getFloat("alpha",.01)}),Vd=(r,e)=>[r.run(Qe(r,e[0],iv()),e)],Gd=(r,e)=>[r.run(Qe(r,e[0],av()),e)],Ud=(r,e)=>[r.run(Qe(r,e[0],sv()),e)],Wd=(r,e)=>[r.run(Qe(r,e[0],as()),e)],Hd=(r,e)=>[r.run(Qe(r,e[0],ss()),e)],qd=(r,e)=>[r.run(Qe(r,e[0],uv()),e)],Kd=(r,e)=>[r.run(Qe(r,e[0],lv()),e)],jd=(r,e)=>[r.run(Qe(r,e[0],cv()),e)],Xd=(r,e)=>[r.run(Qe(r,e[0],fv()),e)]});function er(r){let e;switch(r.activation){case"Relu":e=as();break;case"Sigmoid":e=ss();break;case"Clip":e=is(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var yn,Kr=k(()=>{"use strict";Le();cs();yn=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Ur,Wr]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var hv,bv,Zd,Jd=k(()=>{"use strict";At();He();Se();Fo();Kr();hv=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),bv=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;Ne.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=xn(s,a,t.dilations,t.pads,t.strides),f=ce(r.session.backend.glContext.version),{activationFunction:c,applyActivation:p}=er(t),g=`
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
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${p}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},Zd=(r,e,n)=>{let t=hv(e.length>2,n.cacheKey);return{...t,get:()=>bv(r,e,t,n)}}});var gv,yv,Yd,Qd=k(()=>{"use strict";He();Se();qr();gv=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),yv=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=2,l=3,f=o.length,c=[a[1]*a[2]*a[3],o[2]*o[3]],p=a[2]*a[3],g=Qt(),b=ce(r.session.backend.glContext.version),h="";for(let w=0;w<=1;w++)for(let _=0;_<=1;_++)h+=`
            blockIndex = rc.x + ${_};
            pos = rc.y + ${w};

            if(blockIndex < ${c[1]} && pos < ${c[0]}) {
              offsetY = int(blockIndex / (${o[f-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${p}) / ${a[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[f-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${p}), ${a[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${p}.);
                    innerDims = vec2(d0, d1);
                    result[${w*2+_}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let v=`
      ${g}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${b.output} = result;
      }
            `;return{...e,output:{dims:c,type:n.type,textureType:2},shaderSource:v,hasMain:!0}},Yd=(r,e,n,t,o)=>{let i=gv(o.cacheKey);return{...i,get:()=>yv(r,i,e,n,t,o)}}});function _v(r,e,n){let t=e[0].dims,o=e[1].dims,i=mt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=ht(i.length),a=Gt(),{activationFunction:u,applyActivation:l}=er(n),f=e.length>2,c=f?"value += getBiasForMatmul();":"",p=f?`${ds(s,a,e[2].dims,i,!1)}`:"",g=i.length,b=t.length,h=o.length,v=t[t.length-1],w=`
    ${u}
    ${p}
    float process(int indices[${g}]) {
        int a[${b}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${v}; ++k) {
            a[${b-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${c}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:w}}function fs(r,e){let n=xv(r.length>2,e.activationCacheKey);return{...n,get:()=>_v(n,r,e)}}function ds(r,e,n,t,o){let i="",s=n.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=n.map((h,v)=>`coords.${e[v+u]}`).join(", ");let f=mt.getBroadcastDims(n,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
`),p=re.size(n)===1,g="vec4(outputValue.xx, outputValue.yy)";return p&&(g="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${f}
  vec4 outputValue = getBias(${i});
  return ${g};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${f}
  return getBias(coords.x);
}`}var ep,tp,xv,wv,Vo=k(()=>{"use strict";Le();Se();Yt();Kr();ps();ep=(r,e,n)=>(wv(e),r.session.pack?[r.run(Go(r,e,n),e)]:[r.run(fs(e,n),e)]),tp=r=>yn(r.attributes),xv=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});wv=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function Iv(r,e,n,t){let o=[],i=[],s=n[0].dims,a=n[1].dims,u=s.length,l=a.length,f=t.length,c=f-u,p=f-l;o=s.map((I,$)=>`coords.${e[$+c]}`),o[u-1]="i*2",o.join(", "),i=a.map((I,$)=>`coords.${e[$+p]}`),i[l-2]="i*2",i.join(", ");let g=mt.getBroadcastDims(s,t),b=mt.getBroadcastDims(a,t),h=g.map(I=>`coords.${e[I+c]} = 0;`).join(`
`),v=b.map(I=>`coords.${e[I+p]} = 0;`).join(`
`),w=`int lastDim = coords.${e[f-1]};
  coords.${e[f-1]} = coords.${e[f-2]};
  coords.${e[f-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${w}
  ${h}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${w}
  ${v}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function Sv(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function $v(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var vv,Tv,Go,ps=k(()=>{"use strict";Le();He();Se();Yt();Kr();Vo();vv=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),Tv=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",s=n[0].dims,a=n[1].dims,u=mt.calcShape(s,a,!0),l=!re.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let f=s[s.length-1],c=Math.ceil(f/2),p=s.length,g=a.length,b=ce(r.session.backend.glContext.version),h=ht(u.length),v=u.length,w=Gt(),{activationFunction:_,applyActivation:I}=er(t),$=o?`${ds(h,w,n[2].dims,u,!0)}`:"",O=l?`${Iv(h,w,n,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${Sv(w,p)})`,L=l?"getBAtOutCoordsMatmul(i)":`getB(${$v(w,g)})`,z=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${w[v-1]}; rc.${w[v-1]} =
          rc.${w[v-2]}; rc.${w[v-2]} = lastDim;
      `,U=`
            ${O}
            ${$}
            ${_}
            void main() {
              ${z}

              vec4 value = vec4(0);
              for (int i = 0; i < ${c}; i++) {
                vec4 a = ${E};
                vec4 b = ${L};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${b.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:U,hasMain:!0}},Go=(r,e,n)=>{let t=vv(e.length>2,n.activationCacheKey);return{...t,get:()=>Tv(r,t,e,n)}}});var rp,np=k(()=>{"use strict";Fo();Qd();ps();rp=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.run(Yd(r,e[0],e[1],i,n),[e[0]]),a=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=r.run(Go(r,u,n),u);return r.reshapePacked(l,i)}});var Av,Ov,op,ms,hs=k(()=>{"use strict";Se();Av=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),Ov=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=o.length,l=ms(s,a,o,4),f=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
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
              int x[${s.length}];
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
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:f}},op=(r,e,n,t,o)=>{let i=Av(o.cacheKey);return{...i,get:()=>Ov(r,i,e,n,t,o)}},ms=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var Pv,Ev,ip,ap=k(()=>{"use strict";Le();He();Se();Kr();hs();Pv=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),Ev=(r,e,n,t,o)=>{let i=n[0].dims,s=n[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=ms(i,s,t),[l,f]=r.calculateTextureWidthAndHeight(a,4),c=re.computeStrides(u),[p,g]=r.calculateTextureWidthAndHeight(u,4),b=t.length,h=n.length<3?"0.0":"_B(b)",v=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:w,applyActivation:_}=er(o),I=ce(r.session.backend.glContext.version),$=`
${w}
float process(int indices[${b}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${c[0]} + im2col[1] * ${c[1]} + im2col[2] * ${c[2]};
  int kernelOffset = indices[1] * ${a[1]};
  float value = ${h};
  for (int i = 0; i < ${v}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${p}, ${g});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${f});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${_}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:$}},ip=(r,e,n,t)=>{let o=Pv(e.length>2,t);return{...o,get:()=>Ev(r,o,e,n,t)}}});var xn,bs,Cv,kv,Dv,Bv,gs,Lv,Fo=k(()=>{"use strict";ut();Le();Jd();np();ap();Kr();hs();Vo();xn=(r,e,n,t,o)=>{let i=r[0],s=r.slice(2),a=s.length,u=e[0],f=e.slice(2).map((b,h)=>b+(b-1)*(n[h]-1)),p=s.map((b,h)=>b+t[h]+t[h+a]).map((b,h)=>Math.floor((b-f[h]+o[h])/o[h]));return[i,u].concat(...p)},bs=(r,e,n)=>(Lv(e,n),Cv(r,e,n)),Cv=(r,e,n)=>{let t=Bv(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Zd(r,e,t),e)]:i&&o?[kv(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[rp(r,e,t)]:[Dv(r,e,t)]},kv=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=r.run(fs(u,n),u);return r.reshapeUnpacked(l,i)},Dv=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.run(op(r,e[0],e[1],i,n),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return r.run(ip(r,e,i,n),a)},Bv=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Gr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},gs=r=>{let e=r.attributes,n=yn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...n})},Lv=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var Nv,zv,Rv,sp,Mv,Fv,Vv,Gv,Uv,Wv,up,Hv,lp=k(()=>{"use strict";ut();He();Se();Kr();Nv=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,zv=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},Rv=(r,e,n,t,o,i,s,a)=>{let u=r.length-2,l=a.length===0;for(let f=0;f<u;++f){let c=l?r[f+2]*i[f]:a[f],p=Nv(r[f+2],i[f],o[f],e[f],n[f],c);zv(p,t,o,f,f+u),l&&a.push(i[f]*(r[f+2]-1)+s[f]+(e[f]-1)*n[f]+1-o[f]-o[f+u])}},sp=(r,e,n)=>(Hv(e,n),Mv(r,e,n)),Mv=(r,e,n)=>{let t=Wv(n,e);return[Uv(r,e,t)]},Fv=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),Vv=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,f=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],c=ce(r.session.backend.glContext.version),{activationFunction:p,applyActivation:g}=er(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${p}
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
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${g}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:f,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Gv=(r,e,n)=>{let t=Fv(e.length>2,n.cacheKey);return{...t,get:()=>Vv(r,e,t,n)}},Uv=(r,e,n)=>r.run(Gv(r,e,n),e),Wv=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)n.push(e[1].dims[a]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;Rv(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let s=Object.assign({},r);return Object.assign(s,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),s},up=r=>{let e=r.attributes,n=yn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),f=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:f,...n})},Hv=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var cp,jr,fp,qv,dp,Kv,jv,Xv,Uo=k(()=>{"use strict";ut();Le();Se();cp={name:"Transpose",inputNames:["A"],inputTypes:[0]},jr=(r,e,n)=>(Xv(e),[r.run({...cp,cacheHint:n.cacheKey,get:()=>qv(r,e[0],n.perm)},e)]),fp=r=>xe({perm:r.attributes.getInts("perm",[])}),qv=(r,e,n)=>{let t=e.dims;n=dp(t,n);let o=Kv(t,n),i=t.length,s=`
      ${jv("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...cp,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},dp=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),Kv=(r,e)=>(e=dp(r,e),re.sortBasedOnPerm(r,e)),jv=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},Xv=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var pp,mp,Zv,hp=k(()=>{"use strict";Uo();pp=(r,e,n)=>{Zv(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=r.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=jr(r,[a],u),f=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,f)]},mp=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},Zv=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var bp,gp,Jv,yp=k(()=>{"use strict";Le();bp=(r,e,n)=>{Jv(e,n);let t=re.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},gp=r=>r.attributes.getInt("axis",1),Jv=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var $r,Vn=k(()=>{"use strict";$r=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var xp,_p,Yv,Qv,eT,tT,wp=k(()=>{"use strict";ut();Vn();Le();Se();xp=(r,e,n)=>(tT(e,n.axis),[r.run(eT(r,e,n),e)]),_p=r=>xe({axis:r.attributes.getInt("axis",0)}),Yv={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},Qv=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),s=new Array(o.length+i.length-1);t=re.normalizeAxis(t,o.length);let a=[];for(let p=0;p<s.length;p++)p<t?(s[p]=o[p],a.push(`inputIdx[${p}] = outputIdx[${p}];`)):p<t+i.length?(s[p]=i[p-t],a.push(`indexDataIdx[${p-t}] = outputIdx[${p}];`)):(s[p]=o[p-i.length+1],a.push(`inputIdx[${p-i.length+1}] = outputIdx[${p}];`));let u=s.length||1,l=o.length,f=i.length||1,c=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${f}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:n[0].type,textureType:0},shaderSource:c}},eT=(r,e,n)=>{let t={...Yv,cacheHint:n.cacheKey};return{...t,get:()=>Qv(r,t,e,n.axis)}},tT=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if($r.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var ys,vp,Tp,Ip,rT,nT,oT,Sp=k(()=>{"use strict";ut();Le();Se();ys=(r,e,n)=>(oT(e,n),[r.run(rT(e,n),e)]),vp=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return xe({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},Tp=r=>vp(r,!1),Ip=r=>vp(r,!0),rT=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>nT(n,r,e)}},nT=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=ko.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let f=a.length,c=e.length===3?`int c[${e[2].dims.length}];`:"",p=e.length===3?"bcastIndices_C(indices, c);":"",g=e.length===3?"value += beta * _C(c);":"",b=`
      float process(int indices[${f}]) {
          int a[${f}];
          int b[${f}];
          ${c}

          copyVec(indices, a);
          copyVec(indices, b);
          ${p}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${f-1}] = k;
              b[${f-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${g}
          return value;
      }`;return{...r,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:b}},oT=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var $p,Ap,iT,aT,sT,uT,lT,Op=k(()=>{"use strict";ut();Se();$p=(r,e,n)=>(lT(e),[r.run(sT(r,e,n),e)]),Ap=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return xe({scale:e,bias:n})},iT={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},aT=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,a=`
      ${uT(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},sT=(r,e,n)=>{let t={...iT,cacheHint:n.cacheKey};return{...t,get:()=>aT(r,t,e,n)}},uT=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},lT=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Ep,Cp,Pp,cT,fT,dT,pT,mT,hT,kp=k(()=>{"use strict";He();Se();Ep=(r,e,n)=>{hT(e);let t=r.run(fT(e[0]),e);return[r.run(mT(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Cp=r=>r.attributes.getFloat("epsilon",1e-5),Pp={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},cT=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},fT=r=>({...Pp,get:()=>cT(Pp,r)}),dT={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},pT=(r,e,n,t,o)=>{let i=ce(r.session.backend.glContext.version),[s,a]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],f=`
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
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:f}},mT=(r,e,n,t)=>{let o={...dT,cacheHint:`${n}`};return{...o,get:()=>pT(r,o,e,n,t)}},hT=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function bT(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${a} + ${s} * square_sum, ${u});
    }`;return{...Lp,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function gT(r,e){return{...Lp,cacheHint:e.cacheKey,get:()=>bT(r,e)}}var Dp,Bp,Lp,yT,Np=k(()=>{"use strict";ut();Se();Dp=(r,e,n)=>(yT(e),[r.run(gT(e,n),e)]),Bp=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return xe({alpha:e,beta:n,bias:t,size:o})},Lp={name:"LRN",inputNames:["X"],inputTypes:[0]};yT=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var xT,xs,zp,Rp,Mp,_T,wT,vT,TT,IT,ST,$T,AT,Fp=k(()=>{"use strict";ut();Le();He();Se();xT={name:"Pad",inputNames:["A"],inputTypes:[0]},xs=(r,e,n)=>(vT(e),[r.run({...xT,cacheHint:n.cacheKey,get:()=>wT(r,e[0],n)},e)]),zp=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return xe({mode:e,value:n,pads:t})},Rp=(r,e,n)=>{TT(e);let t=_T(r,e,n);return xs(r,[e[0]],t)},Mp=r=>r.attributes.getString("mode","constant"),_T=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return xe({mode:n,pads:t,value:o})},wT=(r,e,n)=>{let t=re.padShape(e.dims.slice(),n.pads),o=t.length,s=`
      ${IT(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},vT=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},TT=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},IT=(r,e,n)=>{let t=ce(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),s=re.computeStrides(e.dims);switch(n.mode){case"constant":return ST(t,e.dims,s,o,i,n.pads,n.value);case"reflect":return $T(t,e.dims,s,o,i,n.pads);case"edge":return AT(t,e.dims,s,o,i,n.pads);default:throw new Error("Invalid mode")}},ST=(r,e,n,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${a}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},$T=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},AT=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var Gp,Up,Wp,Hp,qp,Kp,jp,Xp,Zp,OT,Vp,Jp,Ho,Yp,Wo,PT,Qp=k(()=>{"use strict";ut();Le();Se();Gp=(r,e,n)=>{Ho(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Wp(e,t,!1,n)},e)]},Up=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),s=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return xe({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:s})},Wp=(r,e,n,t)=>{let[o,i]=Zp(r,t,n),s=re.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let f=`
        ${Yp(r[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:f}},Hp=(r,e,n)=>{Ho(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Wp(e,t,!0,n)},e)]},qp=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return xe({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Kp=(r,e,n)=>{Ho(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Xp(e,t,!1,n)},e)]},jp=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),s=r.attributes.getInt("storage_order",0),a=r.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return xe({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},Xp=(r,e,n,t)=>{let[o,i]=Zp(r,t,n),s=`
      value = max(_X(x), value);
    `,a="",l=`
      ${Yp(r[0].dims,o,s,a,"-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Zp=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();Gr.adjustPoolAttributes(n,t,i,s,a,u);let l=Gr.computePoolOutputShape(n,t,s,a,i,u,e.autoPad),f=Object.assign({},e);return o?Object.assign(f,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[f,l]},OT={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Vp={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Jp=(r,e)=>(Ho(e),[r.run({...Vp,get:()=>Xp(e,Vp,!0,OT)},e)]),Ho=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Yp=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],f=r[i-1],c="",p="",g="";if(u+l!==0?c=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${f}) {
              pad++;
              continue;
            }
            ${n}
          }`:c=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],v=e.strides[e.strides.length-2],w=e.pads[e.pads.length/2-2],_=e.pads[e.pads.length-2],I=r[i-2];w+_!==0?p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${w} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${s};
                continue;
              }
          `:p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${w} + j;
            `,g=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${p}
          ${c}
          ${g}
          ${t}
          return value;
        }
      `}else{let s=re.size(e.kernelShape),a=re.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,f=PT(u),c=Wo(r,"inputDims"),p=Wo(e.pads,"pads"),g=Wo(a,"kernelStrides"),b=Wo(e.strides,"strides"),h=e.pads.reduce((_,I)=>_+I),v="";return h?v=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:v=`
          }
          ${n}
        `,`
        ${f}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${p}
          ${c}
          ${b}
          ${g}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${v}
          }
          ${t}

          return value;
        }
      `}},Wo=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},PT=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Xr,Ar,ET,CT,em,tm,rm,nm,om,im,am,sm=k(()=>{"use strict";ut();Vn();Le();Se();Xr=(r,e,n,t,o)=>{CT(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>ET(r,e,n,t,o,i)},e)]},Ar=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return xe({axes:e,keepDims:n})},ET=(r,e,n,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=re.normalizeAxes(n.axes,e[0].dims.length),f=o(e,l),c=f[1];for(let b=0;b<e[0].dims.length;b++)l.indexOf(b)>=0||l.length===0?(n.keepDims&&s.push(1),c=`
          for(int j${b} = 0; j${b} < ${e[0].dims[b]}; j${b}++) {
            inputIdx[${b}] = j${b};
            ${c}
          }`):(u.push(`inputIdx[${b}] = outputIdx[${s.length}];`),s.push(e[0].dims[b]));let g=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join(`
`)}
        ${f[0]}       // init ops for reduce max/min
        ${c}
        ${f[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:g}},CT=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},em=(r,e,n)=>Xr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),tm=(r,e,n)=>Xr(r,e,n,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),rm=(r,e,n)=>Xr(r,e,n,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),nm=(r,e,n)=>Xr(r,e,n,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),om=(r,e,n)=>Xr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),im=(r,e,n)=>Xr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),am=(r,e,n)=>Xr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var um,lm=k(()=>{"use strict";Le();um=(r,e)=>{let n=re.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var cm,_s,fm,dm,Gn,kT,ws,qo,vs=k(()=>{"use strict";ut();He();Se();cm={name:"Upsample",inputNames:["X"],inputTypes:[0]},_s=(r,e,n)=>(ws(e,n),[r.run({...cm,cacheHint:n.cacheKey,get:()=>kT(r,e,n)},e)]),fm=r=>Gn(r,7),dm=r=>Gn(r,9),Gn=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),qo(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),s=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let f=r.attributes.getFloat("cubic_coeff_a",-.75),c=r.attributes.getInt("exclude_outside",0)!==0;if(c&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",g=0,b=0,h=0;return e>10?r.inputs.length>2?(g=1,b=2,h=3):(b=1,h=2):e===9&&(b=1),xe({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:f,excludeOutside:c,useNearest2xOptimization:p,roiInputIdx:g,scalesInputIdx:b,sizesInputIdx:h})},kT=(r,e,n)=>{let t=ce(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,v)=>Math.floor(h*n.scales[v])),[a,u]=r.calculateTextureWidthAndHeight(s,0),l=s.length,f=new Array(l),c=new Array(l),p=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let h=l-1;h>=0;h--)f[h]=h===l-1?1:f[h+1]*s[h+1],c[h]=h===l-1?1:c[h+1]*e[0].dims[h+1],p+=`
        output_pitches[${h}] = ${f[h]};
        input_pitches[${h}] = ${c[h]};
        `;let g=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,b=n.mode==="nearest"?`
    ${g}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${p}

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
    ${g}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${p}

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
    ${g}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${p}

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
    }`;return{...cm,output:{dims:s,type:e[0].type,textureType:0},shaderSource:b,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(h=>Math.ceil(h))}]}},ws=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},qo=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var Ts,Is,pm,mm,DT,BT,LT,NT,hm=k(()=>{"use strict";He();Se();Yt();qr();vs();Ts={name:"Resize",inputNames:["A"],inputTypes:[2]},Is=(r,e,n)=>(ws(e,n),[r.run({...Ts,cacheHint:n.cacheKey,get:()=>DT(r,e,n)},e)]),pm=r=>Gn(r,10),mm=r=>Gn(r,11),DT=(r,e,n)=>{let t=ce(r.session.backend.glContext.version),[o,i]=BT(e,n);if(o.every(I=>I===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Ts,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let a=i.length;if(a<2)throw new Error(`output dimension should be at least 2, but got ${a}`);let u=i[a-2],l=i[a-1],f=e[0].dims;if(a!==f.length)throw new Error(`output dimension should match input ${f.length}, but got ${a}`);let c=f[a-2],p=f[a-1],g=o[a-2],b=o[a-1],h="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${p}.0 - 1.0, ${c}.0 - 1.0, ${p}.0 - 1.0,
                            ${c}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let v=ht(a),w=Qt(),_=`
            const vec2 inputWH = vec2(${c}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${g}), float(${b}), float(${g}), float(${b}));
            ${w}
            ${h}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${v} rc = getOutputCoords();

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
        `;return{...Ts,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:_}},BT=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let a=r[e.scalesInputIdx];if(a&&a.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=LT(a,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=NT(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},LT=(r,e,n)=>{let t=Array.from(r.floatData);return qo(t,e,n),t},NT=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(r[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=r[s]/e[s];return qo(i,n,t),i}});var bm,zT,gm=k(()=>{"use strict";Hr();bm=(r,e)=>(zT(e),[new tt([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),zT=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var Ss,ym,xm,_m,RT,wm,MT,FT,vm=k(()=>{"use strict";ut();Vn();Le();Se();Ss={name:"Slice",inputNames:["A"],inputTypes:[0]},ym=(r,e,n)=>(RT(e),[r.run({...Ss,cacheHint:n.cacheKey,get:()=>_m(r,e[0],n)},e)]),xm=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return xe({starts:e,ends:n,axes:t})},_m=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((c,p)=>p):n.axes,o=re.normalizeAxes(t,e.dims.length),i=n.starts.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:re.normalizeAxis(c,e.dims[o[p]])),s=n.ends.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:re.normalizeAxis(c,e.dims[o[p]])),a=e.dims.slice(),u=[];for(let c=0;c<o.length;c++)a[o[c]]=s[c]-i[c],i[c]>0&&u.push(`outputIdx[${o[c]}] += ${i[c]};`);let f=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Ss,output:{dims:a,type:e.type,textureType:0},shaderSource:f}},RT=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},wm=(r,e)=>{FT(e);let n=MT(r,e);return[r.run({...Ss,cacheHint:n.cacheKey,get:()=>_m(r,e[0],n)},[e[0]])]},MT=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},FT=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var Tm,Im,Sm,$m,Am,Om,Pm,Em,VT,GT,UT,Cm,km=k(()=>{"use strict";ut();Le();He();Se();Uo();Tm={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Im={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Sm={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},$m=(r,e,n)=>{Cm(e);let t=e[0].dims.slice(),o=re.normalizeAxis(n.axis,t.length),i=re.sizeToDimension(t,o),s=re.sizeFromDimension(t,o);return Em(r,e,n,i,s)},Am=r=>xe({axis:r.attributes.getInt("axis",1)}),Om=r=>xe({axis:r.attributes.getInt("axis",-1)}),Pm=(r,e,n)=>{Cm(e);let t=e[0].dims.slice(),o=re.normalizeAxis(n.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],f;s&&(u=Array.from({length:i}).map((b,h)=>h),u[o]=i-1,u[i-1]=o,u.map(b=>a.push(t[b])),f=xe({perm:u}),l=jr(r,e,f));let c=s?re.sizeToDimension(a,i-1):re.sizeToDimension(t,i-1),p=s?re.sizeFromDimension(a,i-1):re.sizeFromDimension(t,i-1),g=Em(r,s?l:e,n,c,p);return s?jr(r,g,f):g},Em=(r,e,n,t,o)=>{let i=VT(r,e[0],t,o,[t]),s=r.run({...Tm,cacheHint:n.cacheKey,get:()=>i},e),a=GT(r,e[0],t,o,i.output.dims,[t]),u=r.run({...Im,cacheHint:n.cacheKey,get:()=>a},[e[0],s]),l=UT(r,e[0],t,o,i.output.dims,a.output.dims);return[r.run({...Sm,cacheHint:n.cacheKey,get:()=>l},[e[0],s,u])]},VT=(r,e,n,t,o)=>{let[i,s]=r.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=ce(r.session.backend.glContext.version),l=`
      float process(int[${a}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${s} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Tm,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},GT=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=ce(r.session.backend.glContext.version),f=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a}))) - max);
        }

        return norm_factor;
      }`;return{...Im,output:{dims:i,type:e.type,textureType:0},shaderSource:f}},UT=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${a});

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
    }`;return{...Sm,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},Cm=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Dm,Bm,Lm,WT,HT,qT,Nm=k(()=>{"use strict";ut();Le();Se();Dm={name:"Split",inputNames:["A"],inputTypes:[0]},Bm=(r,e,n)=>{qT(e);let t=re.normalizeAxis(n.axis,e[0].dims.length),o=WT(r,e,t,n),i=[];for(let s=0;s<o;++s)i.push(r.run({...Dm,cacheHint:`${n.cacheKey};${s}`,get:()=>HT(r,e[0],n,t,s)},e));return i},Lm=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return xe({axis:e,split:n,numOutputs:t})},WT=(r,e,n,t)=>{let[,o]=Ln.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},HT=(r,e,n,t,o)=>{let[i,s]=Ln.splitShape(e.dims,t,n.split,n.numOutputs),a=s[o],u=i[o],f=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...Dm,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:f}},qT=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var $s,zm,Rm,KT,jT,Mm=k(()=>{"use strict";Le();$s=(r,e,n)=>{KT(e);let t=re.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},zm=(r,e)=>(jT(e),$s(r,[e[0]],Array.from(e[1].integerData))),Rm=r=>r.attributes.getInts("axes"),KT=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},jT=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Fm,XT,ZT,Vm=k(()=>{"use strict";He();Se();Fm=(r,e)=>{ZT(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>XT(r,e,n)},e)]},XT=(r,e,n)=>{let t=ce(r.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},ZT=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Gm,JT,YT,Um=k(()=>{"use strict";Vn();Se();Gm=(r,e)=>{YT(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>JT(r,e,n)},e)]},JT=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},YT=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var As,Wm,Hm,QT,e2,qm=k(()=>{"use strict";Le();As=(r,e,n)=>{QT(e);let t=re.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Wm=(r,e)=>(e2(e),As(r,[e[0]],Array.from(e[1].integerData))),Hm=r=>r.attributes.getInts("axes"),QT=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},e2=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Km,jm=k(()=>{"use strict";od();gd();_d();$d();Fo();lp();hp();yp();wp();Sp();Op();kp();Np();Vo();Fp();Qp();sm();lm();hm();gm();vm();km();Nm();Mm();Vm();Um();Uo();cs();qm();vs();Km=[["Abs","","6+",Ad],["Acos","","7+",Od],["Add","","7+",id],["And","","7+",ad],["Asin","","7+",Pd],["Atan","","7+",Ed],["AveragePool","","7+",Gp,Up],["BatchNormalization","","7+",rd,nd],["Cast","","6+",yd,xd],["Ceil","","6+",Dd],["Clip","","6-10",us,Cd],["Clip","","11+",kd],["Concat","","4+",Td,Sd],["Conv","","1+",bs,gs],["ConvTranspose","","1+",sp,up],["Cos","","7+",Bd],["Div","","7+",sd],["Dropout","","7+",ls],["DepthToSpace","","1+",pp,mp],["Equal","","7+",ud],["Elu","","6+",Ld,Nd],["Exp","","6+",zd],["Flatten","","1+",bp,gp],["Floor","","6+",Rd],["FusedConv","com.microsoft","1+",bs,gs],["Gather","","1+",xp,_p],["Gemm","","7-10",ys,Tp],["Gemm","","11+",ys,Ip],["GlobalAveragePool","","1+",Hp,qp],["GlobalMaxPool","","1+",Jp],["Greater","","7+",ld],["Identity","","1+",ls],["ImageScaler","","1+",$p,Ap],["InstanceNormalization","","6+",Ep,Cp],["LeakyRelu","","6+",Md,Fd],["Less","","7+",cd],["LRN","","1+",Dp,Bp],["Log","","6+",Vd],["MatMul","","1+",ep,tp],["MaxPool","","1+",Kp,jp],["Mul","","7+",fd],["Neg","","6+",Gd],["Not","","1+",Ud],["Or","","7+",dd],["Pad","","2-10",xs,zp],["Pad","","11+",Rp,Mp],["Pow","","7+",pd],["PRelu","","7+",md],["ReduceLogSum","","1+",im,Ar],["ReduceMax","","1+",rm,Ar],["ReduceMean","","1+",tm,Ar],["ReduceMin","","1+",nm,Ar],["ReduceProd","","1+",om,Ar],["ReduceSum","","1-12",em,Ar],["ReduceSumSquare","","1+",am,Ar],["Relu","","6+",Wd],["Reshape","","5+",um],["Resize","","10",Is,pm],["Resize","","11+",Is,mm],["Shape","","1+",bm],["Sigmoid","","6+",Hd],["Sin","","7+",qd],["Slice","","10+",wm],["Slice","","1-9",ym,xm],["Softmax","","1-12",$m,Am],["Softmax","","13+",Pm,Om],["Split","","2-12",Bm,Lm],["Sqrt","","6+",Kd],["Squeeze","","1-12",$s,Rm],["Squeeze","","13+",zm],["Sub","","7+",hd],["Sum","","6+",Fm],["Tan","","7+",jd],["Tanh","","6+",Xd],["Tile","","6+",Gm],["Transpose","","1+",jr,fp],["Upsample","","7-8",_s,fm],["Upsample","","9",_s,dm],["Unsqueeze","","1-12",As,Hm],["Unsqueeze","","13+",Wm],["Xor","","7+",bd]]});function Zm(r){let e={},n;for(;(n=Xm.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=t2.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let s=n[1],a=n[2],u=n[3].split(","),l=s?`${s} ${a};`:"",f=e[t].body,c="";e[t].params.forEach((g,b)=>{g&&(c+=`${g.type} ${g.name} = ${u[b]};
`)}),f=`${c}
 ${f}`,f=f.replace("return",`${a} = `);let p=`
      ${l}
      {
        ${f}
      }
      `;r=r.replace(n[0],p)}}return r=r.replace(Xm,""),r}var Xm,t2,Jm=k(()=>{"use strict";Xm=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,t2="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function _n(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:r2(e,r).sort(),s=0;for(let a=0;a<r.length;++a){if(i!=null){if(i[s]===a&&r[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${r[a]}' is not 1`);(i[s]==null||i[s]>a)&&r[a]===1&&(n.push(r[a]),t.push(a)),i[s]<=a&&s++}r[a]!==1&&(n.push(r[a]),t.push(a))}return{newShape:n,keptDims:t}}function r2(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),mn(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),mn(r.every(n2),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function n2(r){return r%1===0}function o2(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Ym(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var Ko,Os=k(()=>{"use strict";At();Le();Ko=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let a=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,f)=>l*f),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,f)=>l*f);if(a>o||u>o)Ne.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=_n(i).newShape);let s=o2(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Ym(s/4).map(a=>a*2):Ym(s)}}});var jo,Qm=k(()=>{"use strict";Le();pr();He();Os();Yt();jo=class extends Ct{constructor(n){super(n)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let n="offsetToCoords";return{offsetToCoords:new J(`
      vec2 ${n}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let n="coordsToOffset";return{coordsToOffset:new J(`
      int ${n}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let n=this.context.outputTextureLayout;return n.isPacked?this.getPackedOutputSamplingSnippet(n):this.getUnpackedOutputSamplingSnippet(n)}getPackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputPacked1DCoords(t,o);break;case 2:i[s]=this.getOutputPacked2DCoords(t,o);break;case 3:i[s]=this.getOutputPacked3DCoords(t,o);break;default:i[s]=this.getOutputPackedNDCoords(t,o)}let u=`
      void setOutput(vec4 val) {
        ${ce(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new J(u),i}getUnpackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[s]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[s]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[s]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[s]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[s]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${ce(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return i[l]=new J(u),i}getOutputScalarCoords(){return new J(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(n,t){let o=t,i="";return o[0]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${o[1]}.0);
          }
        `,new J(i)):o[1]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${o[0]}.0);
          }
        `,new J(i)):(i=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${o[0]}, ${o[1]}));
          return 2 * (resTexRC.y * ${o[0]} + resTexRC.x);
        }
      `,new J(i))}getOutputPacked2DCoords(n,t){let o="";if(Vr.arraysEqual(n,t))return o=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new J(o);let i=t,s=Math.ceil(n[1]/2);return o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new J(o)}getOutputPacked3DCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[2]/2),s=i*Math.ceil(n[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));
          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          int b = index / ${s};
          index -= b * ${s};

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec3(b, r, c);
        }
      `;return new J(a)}getOutputPackedNDCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[n.length-1]/2),s=i*Math.ceil(n[n.length-2]/2),a=s,u="",l="b, r, c";for(let c=2;c<n.length-1;c++)a*=n[n.length-c-1],u=`
      int b${c} = index / ${a};
      index -= b${c} * ${a};
    `+u,l=`b${c}, `+l;let f=`
      ivec${n.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${o[0]}, ${o[1]}));
        int index = resTexRC.y * ${o[0]} + resTexRC.x;

        ${u}

        int b = index / ${s};
        index -= b * ${s};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${n.length}(${l});
      }
    `;return new J(f)}getOutputUnpacked1DCoords(n,t){let o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new J(o)}getOutputUnpacked2DCoords(n,t){let o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${n[1]};
          int c = index - r * ${n[1]};
          return ivec2(r, c);
        }
      `;return new J(o)}getOutputUnpacked3DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new J(o)}getOutputUnpacked4DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new J(o)}getOutputUnpacked5DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new J(o)}getOutputUnpacked6DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3","d4"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new J(o)}getCommonUtilFuncs(){let n={},t="uvFromFlat";n[t]=new J(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",n[t]=new J(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",n[t]=new J(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",n[t]=new J(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let o=ce(this.context.glContext.version);return n[t]=new J(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),n}getInputsSamplingSnippets(){let n={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let s=this.context.inputTextureLayouts[i],a=Do(o);s.isPacked?n[a]=this.getPackedSamplerFromInput(a,o,s):n[a]=this.getUnpackedSamplerFromInput(a,o,s);let u=Ff(o);s.unpackedShape.length<=t.unpackedShape.length&&(s.isPacked?n[u]=this.getPackedSamplerAtOutputCoords(u,s,t,o):n[u]=this.getUnpackedSamplerAtOutputCoords(u,s,t,o))}),n}getPackedSamplerAtOutputCoords(n,t,o,i){let s=t.unpackedShape,a=o.unpackedShape,l=Do(i),f=s.length,c=a.length,p=mt.getBroadcastDims(s,a),g=ht(c),b=c-f,h,v=Gt();f===0?h="":c<2&&p.length>=1?h="coords = 0;":h=p.map(U=>`coords.${v[U+b]} = 0;`).join(`
`);let w="";c<2&&f>0?w="coords":w=s.map((U,K)=>`coords.${v[K+b]}`).join(", ");let _="return outputValue;",$=re.size(s)===1,E=re.size(a)===1;if(f===1&&!$&&!E)_=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if($&&!E)c===1?_=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:_=`
          return vec4(outputValue.x);
        `;else if(p.length){let U=f-2,K=f-1;p.indexOf(U)>-1&&p.indexOf(K)>-1?_="return vec4(outputValue.x);":p.indexOf(U)>-1?_="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(K)>-1&&(_="return vec4(outputValue.xx, outputValue.zz);")}let L=`
        int lastDim = coords.${v[c-1]};
        coords.${v[c-1]} = coords.${v[c-2]};
        coords.${v[c-2]} = lastDim;
      `,z=`
      vec4 ${n}() {
        ${g} coords = getOutputCoords();
        ${L}
        ${h}
        vec4 outputValue = ${l}(${w});
        ${_}
      }
    `;return new J(z,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(n,t,o,i){let s=[o.width,o.height],a=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,f=t.unpackedShape,c=o.unpackedShape,p=Do(i);if(u===l&&Vr.arraysEqual(a,s)){let $=`
          float ${n}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new J($,["coordinates.sampleTexture"])}let g=ht(l),b=mt.getBroadcastDims(f,c),h=l-u,v,w=Gt();u===0?v="":l<2&&b.length>=1?v="coords = 0;":v=b.map($=>`coords.${w[$+h]} = 0;`).join(`
`);let _="";l<2&&u>0?_="coords":_=t.unpackedShape.map(($,O)=>`coords.${w[O+h]}`).join(", ");let I=`
        float ${n}() {
          ${g} coords = getOutputCoords();
          ${v}
          return ${p}(${_});
        }
      `;return new J(I,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(n,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(n,t);case 1:return this.getPackedSampler1D(n,t,o);case 2:return this.getPackedSampler2D(n,t,o);case 3:return this.getPackedSampler3D(n,t,o);default:return this.getPackedSamplerND(n,t,o)}}getUnpackedSamplerFromInput(n,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(n,t,o);case 1:return this.getUnpackedSampler1D(n,t,o);case 2:return this.getUnpackedSampler2D(n,t,o);case 3:return this.getUnpackedSampler3D(n,t,o);case 4:return this.getUnpackedSampler4D(n,t,o);case 5:return this.getUnpackedSampler5D(n,t,o);case 6:return this.getUnpackedSampler6D(n,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(n,t){let o=ce(this.context.glContext.version),i=`
          vec4 ${n}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new J(i)}getPackedSampler1D(n,t,o){let i=[o.width,o.height],s=[i[1],i[0]],a=ce(this.context.glContext.version),l=`vec4 ${n}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new J(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=ce(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&Vr.arraysEqual(i,s)){let b=`vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new J(b)}let f=s,c=Math.ceil(i[1]/2),g=`vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${f[1]}, ${f[0]}, ${c}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new J(g,["coordinates.packedUVfrom2D"])}getPackedSampler3D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=[s[0],s[1]],u=ce(this.context.glContext.version);if(i[0]===1){let h=i.slice(1),v=[1,2],w=hn(i,h),_=["b","row","col"],I=JSON.parse(JSON.stringify(o));I.unpackedShape=w;let $=this.getPackedSamplerFromInput(n,t,I),E=`${$.routineBody}
      vec4 ${n}(int b, int row, int col) {
        return ${n}(${bn(_,v)});
      } `;return new J(E,$.dependencies)}let l=a[0],f=a[1],c=Math.ceil(i[2]/2),p=c*Math.ceil(i[1]/2),b=`vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${f}, ${l}, ${p}, ${c}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new J(b,["coordinates.packedUVfrom3D"])}getPackedSamplerND(n,t,o){let i=o.unpackedShape,s=i.length,a=[o.width,o.height],u=ce(this.context.glContext.version),l=[a[0],a[1]],f=l[1],c=l[0],p=Math.ceil(i[s-1]/2),g=p*Math.ceil(i[s-2]/2),b="int b, int row, int col",h=`b * ${g} + (row / 2) * ${p} + (col / 2)`;for(let _=2;_<s-1;_++)b=`int b${_}, `+b,g*=i[s-_-1],h=`b${_} * ${g} + `+h;let w=`vec4 ${n}(${b}) {
      int index = ${h};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${f});
      return ${u.texture2D}(${t}, uv);
    }`;return new J(w)}getUnpackedSamplerScalar(n,t,o){let[i,s]=[o.width,o.height];if(i===1&&s===1){let u=`
          float ${n}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new J(u,["coordinates.sampleTexture"])}let a=`
        float ${n}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${s});
          vec2 uv = uvFromFlat(${i}, ${s}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new J(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(n,t,o){let i=o.width,s=o.height;if(s===1&&i===1){let u=`
        float ${n}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new J(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new J(u,["coordinates.sampleTexture"])}if(i===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new J(u,["coordinates.sampleTexture"])}let a=`
        float ${n}(int index) {
          vec2 uv = uvFromFlat(${i}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new J(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.height,o.width];if(s!=null&&Vr.arraysEqual(i,s)){let g=s[1],b=s[0],h=`
          float ${n}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${g}.0, ${b}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new J(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:u}=_n(i),l=a;if(l.length<i.length){let g=hn(i,l),b=JSON.parse(JSON.stringify(o));b.unpackedShape=g;let h=["col","row"],v=`
          ${this.getUnpackedSamplerFromInput(n,t,b).routineBody}
          float ${n}(int row, int col) {
            return ${n}(${bn(h,u)});
          }
        `;return new J(v,["coordinates.sampleTexture"])}let f=s[1],c=s[0];if(c===1){let g=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${f}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${f}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new J(g,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(f===1){let g=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${f}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new J(g,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${n}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${f}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new J(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(n,t,o){let i=o.unpackedShape,s=i[1]*i[2],a=i[2],{newShape:u,keptDims:l}=_n(i),f=u;if(f.length<i.length){let b=hn(i,f),h=["batch","col","row"],v=JSON.parse(JSON.stringify(o));v.unpackedShape=b;let w=this.getUnpackedSamplerFromInput(n,t,v),_=l.reverse(),I=`
          ${w.routineBody}
          float ${n}(int batch, int row, int col) {
            return ${n}(${bn(h,_)});
          }
        `;return new J(I,w.dependencies)}let c=o.width,p=o.height,g=`
          float ${n}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new J(g,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(n,t,o){let i=o.unpackedShape,s=i[3],a=i[2]*s,u=i[1]*a,l=o.width,f=o.height,c=`
        float ${n}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${a} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${f}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new J(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(n,t,o){let i=o.unpackedShape,s=i[4],a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:f,keptDims:c}=_n(i);if(f.length<i.length){let h=hn(i,f),v=["row","col","depth","depth2","depth3"],w=JSON.parse(JSON.stringify(o));w.unpackedShape=h;let _=`
          ${this.getUnpackedSamplerFromInput(n,t,w).routineBody}
          float ${n}(int row, int col, int depth, int depth2, int depth3) {
            return ${n}(${bn(v,c)});
          }
        `;return new J(_,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=o.width,g=o.height,b=`
        float ${n}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${a} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${p}, ${g}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new J(b,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(n,t,o){let i=o.unpackedShape,s=i[5],a=i[4]*s,u=i[3]*a,l=i[2]*u,f=i[1]*l,{newShape:c,keptDims:p}=_n(i);if(c.length<i.length){let v=hn(i,c),w=["row","col","depth","depth2","depth3","depth4"],_=JSON.parse(JSON.stringify(o));_.unpackedShape=v;let I=`
            ${this.getUnpackedSamplerFromInput(n,t,_).routineBody}
            float ${n}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${n}(${bn(w,p)});
            }
          `;return new J(I,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let g=o.width,b=o.height,h=`
          float ${n}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${f} + col * ${l} + depth * ${u} +
            depth2 * ${a} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${g}, ${b}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new J(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let n=this.context.outputTextureLayout,t=n.shape.length,o=n.strides,i=n.width,s=n.height,a=[];for(let l=0;l<t-1;++l)a.push(`
        c[${l}] = offset / ${o[l]};`),a.push(`
        offset -= c[${l}] * ${o[l]};`);a.push(`
        c[${t-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${s});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${a.join("")}
      }
    `;return{toVec:new J(u,["coordinates.coordsToOffset"])}}valueFrom(){let n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;n[u]=new J(this.getValueFromSingle(t,a,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",n[u]=new J(this.getValueFromSingle(t,a,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),n}getValueFromSingle(n,t,o,i,s){let a=`_${n}`;s&&(a=a+"_T");let u=ce(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${n}, coords));
          return value;
        }
        `}getPackedValueFrom(n,t,o,i,s){let a=`_${n}_Pack`;s&&(a=a+"_T");let u=ce(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${n}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${n}, coords);
        }
        `}}});var Xo,eh=k(()=>{"use strict";pr();Xo=class r extends Ct{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new J(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new J(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new J(`
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
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new J(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Zo,th=k(()=>{"use strict";pr();He();Zo=class extends Ct{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ce(this.context.glContext.version);return{setFragColor:new J(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new J(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Jo,rh=k(()=>{"use strict";pr();Jo=class r extends Ct{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let c=0;c<s;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${a+c}]), ${i[c]}.0) );
          `;let f=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
        }
        `;n[u]=new J(f)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let s=i.length,a=e-s,u=`bcastMatmulIndices_${t}`,l="";for(let c=0;c<s-2;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${a+c}]), ${i[c]}.0) );
          `;let f=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${e-1}];
          realIndices[${s-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new J(f)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`indicesToOffset_${n}`;e[a]=new J(r.indexToOffsetSingle(a,s,i)),a=`indicesToOffset_${n}_T`,e[a]=new J(r.indexToOffsetSingle(a,s,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`offsetToIndices_${n}`;e[a]=new J(r.offsetToIndicesSingle(a,s,i)),a=`offsetToIndices_${n}_T`,e[a]=new J(r.offsetToIndicesSingle(a,s,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,s=`incrementIndices_${n}`,a="";for(let l=0;l<i;++l)a+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${s}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${a};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[s]=new J(u)}),e}}});var Yo,nh=k(()=>{"use strict";pr();Yo=class extends Ct{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<n;++l)a+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${s}(int src[${n}], out int dest[${n}]) {
          ${a}
        }
        `;o[s]=new J(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new J(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${n} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${n-1}] = value;
        `;let o=`
      void setVecItem(out int m[${n}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new J(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${n} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${n-1}];
        `;let o=`
      int getVecItem(int m[${n}], int index) {
        ${t}
      }
    `;return{getVecItem:new J(o)}}}});var Ps,oh=k(()=>{"use strict";Qm();eh();th();rh();nh();Ps={encoding:Xo,fragcolor:Zo,vec:Yo,shapeUtils:Jo,coordinates:jo}});var Qo,ih=k(()=>{"use strict";pr();Jm();oh();He();Qo=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new zo(e,n,t,o),Object.keys(Ps).forEach(s=>{let a=new Ps[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let f=s+"."+l,c;i[f]?(c=i[f],c.routineBody=u[l].routineBody):(c=new Fn(f,u[l].routineBody),i[f]=c);let p=u[l].dependencies;if(p)for(let g=0;g<p.length;++g)if(i[p[g]])c.addDependency(i[p[g]]);else{let b=new Fn(p[g]);i[p[g]]=b,c.addDependency(b)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Mf(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Zm(n),`${Rf(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Ro.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ei,ah=k(()=>{"use strict";dt();At();ih();He();ei=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(s){throw Ne.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Qo(this.glContext,e,n,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){Ne.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=zf(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}me.debug&&Ne.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Ne.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let f=n.find(c=>c.name===s)?.data;if(a!=="sampler2D"&&!f)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,f):o.uniform1f(u,f);break;case"int":l?o.uniform1iv(u,f):o.uniform1i(u,f);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var ti,sh=k(()=>{"use strict";At();Rn();ti=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let a=n.width,u=n.height,l,f;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,f=this.inUseTextures.get(l),f||(f=[],this.inUseTextures.set(l,f));let p=this.idleTextures.get(l);if(p&&p.length>0){let g=p.pop();return f.push(g),o===1&&this.glContext.updateTexture(g,a,u,s,this.toTextureData(e,t)),g}}Ne.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let c=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(f.push(c),this.textureLookup.set(c,l)),c}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,f)=>l*f)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),a=this.toTensorData(n,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||n)&&(Ne.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ri,uh=k(()=>{"use strict";At();vc();ed();jm();ah();Os();sh();ri=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new Ko(e.glContext.maxTextureSize),this.programManager=new ei(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new ti(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new No(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Ne.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=wc(e,n,Km);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function i2(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Un,lh=k(()=>{"use strict";dt();Rn();Rn();Yt();Un=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,n,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,n*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,s),l=u.allocate(n*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,n,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(me.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Bo(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new zn(this.gl,n):new zn(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Lo(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,s;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await es(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=i2(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await es(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Es(r){let e;if((!r||r==="webgl2")&&"webgl2"in wn?e=wn.webgl2:(!r||r==="webgl")&&"webgl"in wn&&(e=wn.webgl),!e)try{let t=s2();e=ch(t,r)}catch{let o=a2();e=ch(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return wn[r]=e,n.isContextLost()?(delete wn[r],Es(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function ch(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Un(t,2)}catch(i){Ne.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Un(t,1)}catch(i){Ne.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function a2(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function s2(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var wn,fh=k(()=>{"use strict";At();lh();wn={}});var ni,dh=k(()=>{"use strict";dt();At();uh();fh();ni=class{get contextId(){return me.webgl.contextId}set contextId(e){me.webgl.contextId=e}get matmulMaxBatchSize(){return me.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){me.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return me.webgl.textureCacheMode}set textureCacheMode(e){me.webgl.textureCacheMode=e}get pack(){return me.webgl.pack}set pack(e){me.webgl.pack=e}get async(){return me.webgl.async}set async(e){me.webgl.async=e}initialize(){try{return this.glContext=Es(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Ne.setWithEnv(me),me.webgl.context||Object.defineProperty(me.webgl,"context",{value:this.glContext.gl}),Ne.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Ne.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ri(this,e)}dispose(){this.glContext.dispose()}}});async function Cs(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=ph.get(n);if(t)return t;let o=await l2(n);if(o)return o}}else return Cs(["webgl"]);throw new Error("no available backend to use")}async function l2(r){let e=u2;if(typeof e[r]<"u"&&c2(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return ph.set(r,n),n}}function c2(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var ph,u2,mh=k(()=>{"use strict";dh();ph=new Map,u2={webgl:new ni}});var ks,oi,hh=k(()=>{"use strict";At();ks=class{constructor(e,n){this.op=e;this.node=n}},oi=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new ks(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((f,c)=>{let p=o[c];this._values[p]=f});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let f=i[u++],c=this._ops[f],p=c.node.inputs.map(v=>this._values[v]);if(p.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${c.node}`);let g=p;Ne.verbose("ExecPlan",`Running op:${c.node.name} (${g.map((v,w)=>`'${c.node.inputs[w]}': ${v.type}[${v.dims.join(",")}]`).join(", ")})`);let b=await this.profiler.event("node",c.node.name,async()=>c.op.impl(t,g,c.op.context));if(b.length!==c.node.outputs.length)throw new Error("the size of output does not match model definition.");b.forEach((v,w)=>{let _=c.node.outputs[w];if(this._values[_])throw new Error(`output [${_}] already has value: op:${c.node.name}`);this._values[_]=v});let h=new Set;b.forEach((v,w)=>{let _=c.node.outputs[w];for(let I of s[_].to){let $=a[I],O=!0;for(let E of $.inputs)if(!this._values[E]){O=!1;break}O&&h.add(I)}}),i.push(...h)}let l=[];for(let f=0;f<this.graph.getOutputIndices().length;f++){let c=this.graph.getOutputIndices()[f],p=this._values[c];if(p===void 0)throw new Error(`required output [${c}] does not have value`);c===0?await p.getData():p.data,l.push(p)}return Ne.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Ie,Bt,Wn,bh=k(()=>{"use strict";Cn();Ie=ln(pn());Hr();Le();Bt=ie.experimental.fbs,Wn=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof Ie.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Bt.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof Ie.onnx.AttributeProto?e.type:e.type();switch(n){case Ie.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Ie.onnx.AttributeProto.AttributeType.INT:return"int";case Ie.onnx.AttributeProto.AttributeType.STRING:return"string";case Ie.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Ie.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Ie.onnx.AttributeProto.AttributeType.INTS:return"ints";case Ie.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Ie.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Ie.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof Ie.onnx.AttributeProto?e.type:e.type();if(n===Ie.onnx.AttributeProto.AttributeType.GRAPH||n===Ie.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===Ie.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(n===Ie.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=xt.longToNumber(a)}return i}if(n===Ie.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Ie.onnx.AttributeProto?tt.fromProto(t):tt.fromOrtTensor(t);if(n===Ie.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Ie.onnx.AttributeProto)return t.map(i=>tt.fromProto(i));if(e instanceof Bt.Attribute)return t.map(i=>tt.fromOrtTensor(i))}return n===Ie.onnx.AttributeProto.AttributeType.STRING&&e instanceof Ie.onnx.AttributeProto?Nn(t):n===Ie.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Ie.onnx.AttributeProto?t.map(Nn):t}static getValueNoCheck(e){return e instanceof Ie.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Ie.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Ie.onnx.AttributeProto.AttributeType.INT:return e.i;case Ie.onnx.AttributeProto.AttributeType.STRING:return e.s;case Ie.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Ie.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Ie.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Ie.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Ie.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Ie.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Ie.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Ie.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Bt.AttributeType.FLOAT:return e.f();case Bt.AttributeType.INT:return e.i();case Bt.AttributeType.STRING:return e.s();case Bt.AttributeType.TENSOR:return e.t();case Bt.AttributeType.GRAPH:return e.g();case Bt.AttributeType.FLOATS:return e.floatsArray();case Bt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case Bt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case Bt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${Bt.AttributeType[e.type()]}`)}}}});var Bs,ii,Ls,tr,ai,Ds,gh=k(()=>{"use strict";bh();Cn();Bs=ln(pn());Hr();Le();ii=ie.experimental.fbs,Ls={from:(r,e)=>new Ds(r,e)},tr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ct.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ai=class{constructor(e,n){e instanceof Bs.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Wn(e.attribute)):e instanceof ii.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Wn(ct.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Ds=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Bs.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof ii.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new tr(i))-1;n.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=n.get(i.name);if(s===void 0){let a=new tr;a.type={shape:{dims:ct.tensorDimsFromProto(i.dims)},tensorType:ct.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,n.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=tt.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new tr(i))-1;n.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new ai(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new tr)-1,n.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=tt.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(n.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new tr;if(e.nodeArgs(a)?.type()?.valueType()!==ii.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let f=e.nodeArgs(a).type().value(new ii.TensorTypeAndShape),c=ct.tensorDataTypeFromProto(f.elemType()),p=f.shape(),g=[];for(let h=0;h<p.dimLength();h++)g.push(xt.longToNumber(p.dim(h).value().dimValue()));u.type={shape:{dims:g},tensorType:c};let b=this._allData.push(u)-1;n.set(s,b),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=n.get(s.name());if(a===void 0){let u=new tr,l=ct.tensorDimsFromORTFormat(s),f=ct.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:f},a=this._allData.push(u)-1,n.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=tt.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(n.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new tr)-1;n.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new ai(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),f=n.get(l);if(typeof f>"u"&&(f=this._allData.push(new tr)-1,n.set(l,f)),s.outputs.push(f),this._allData[f]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${f}`);if(this._allData[f]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[f]._from=-1,this._allData[f].tensor=tt.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),f=n.get(l);if(typeof f>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(f),this._allData[f]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&n.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=n[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let a=1;a<n.outputs.length;a++)if(this._allData[n.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let a=0;a<n.inputs.length;a++){let u=this._allData[n.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Ur,Wr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var yh,f2,si,xh=k(()=>{"use strict";Ao();gh();Cn();yh=ln(pn());Le();f2=ie.experimental.fbs,si=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=yh.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=Ls.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new D.ByteBuffer(e),o=f2.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:xt.longToNumber(a.version())})}this._graph=Ls.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var ui,_h=k(()=>{"use strict";mh();hh();At();xh();ui=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=So.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Cs(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new si,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new oi(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let s=e.get(n[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],s=n[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var li,wh=k(()=>{"use strict";dt();Hr();li=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new tt(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new Tt(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var vh={};un(vh,{onnxjsBackend:()=>d2});var Ns,d2,Th=k(()=>{"use strict";_h();wh();Ns=class{async init(){}async createInferenceSessionHandler(e,n){let t=new ui(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new li(t)}},d2=new Ns});var ci=k(()=>{"use strict"});var $h={};un($h,{default:()=>p2});var Ih,Sh,p2,Ah=k(()=>{"use strict";zs();Or();fi();Ih="ort-wasm-proxy-worker",Sh=globalThis.self?.name===Ih;Sh&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":di(n.wasm).then(()=>{pi(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;mi(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=Hn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;hi(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":bi(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;gi(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},xi([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":yi(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});p2=Sh?null:r=>new Worker(r??St,{type:"module",name:Ih})});var Ph={};un(Ph,{default:()=>m2});var Rs,Oh,m2,Eh=k(()=>{"use strict";Oh=(Rs=import.meta.url,async function(r={}){function e(){return te.buffer!=Y.buffer&&Ae(),Y}function n(){return te.buffer!=Y.buffer&&Ae(),be}function t(){return te.buffer!=Y.buffer&&Ae(),ue}function o(){return te.buffer!=Y.buffer&&Ae(),Me}function i(){return te.buffer!=Y.buffer&&Ae(),at}function s(){return te.buffer!=Y.buffer&&Ae(),Fe}function a(){return te.buffer!=Y.buffer&&Ae(),pe}function u(){return te.buffer!=Y.buffer&&Ae(),ke}var l,f,c=Object.assign({},r),p=new Promise((d,m)=>{l=d,f=m}),g=typeof window=="object",b=typeof importScripts=="function",h=b&&self.name=="em-pthread";c.mountExternalData=(d,m)=>{d.startsWith("./")&&(d=d.substring(2)),(c.Fb||(c.Fb=new Map)).set(d,m)},c.unmountExternalData=()=>{delete c.Fb};var v=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let w=()=>{let d=(y,x,T)=>(...P)=>{let R=Xt,F=x?.();P=y(...P);let X=x?.();return F!==X&&(y=X,T(F),x=T=null),Xt!=R?new Promise((Q,le)=>{ga={resolve:Q,reject:le}}):P},m=y=>async(...x)=>{try{if(c.Gb)throw Error("Session already started");let T=c.Gb={hc:x[0],errors:[]},P=await y(...x);if(c.Gb!==T)throw Error("Session mismatch");c.Hb?.flush();let R=T.errors;if(0<R.length){let F=await Promise.all(R);if(F=F.filter(X=>X),0<F.length)throw Error(F.join(`
`))}return P}finally{c.Gb=null}};c._OrtCreateSession=d(c._OrtCreateSession,()=>c._OrtCreateSession,y=>c._OrtCreateSession=y),c._OrtRun=m(d(c._OrtRun,()=>c._OrtRun,y=>c._OrtRun=y)),c._OrtRunWithBinding=m(d(c._OrtRunWithBinding,()=>c._OrtRunWithBinding,y=>c._OrtRunWithBinding=y)),c._OrtBindInput=d(c._OrtBindInput,()=>c._OrtBindInput,y=>c._OrtBindInput=y),w=void 0};c.jsepInit=(d,m)=>{if(w?.(),d==="webgpu"){[c.Hb,c.Vb,c.Zb,c.Ob,c.Yb,c.kb,c.$b,c.cc,c.Wb,c.Xb,c.ac]=m;let y=c.Hb;c.jsepRegisterBuffer=(x,T,P,R)=>y.registerBuffer(x,T,P,R),c.jsepGetBuffer=x=>y.getBuffer(x),c.jsepCreateDownloader=(x,T,P)=>y.createDownloader(x,T,P),c.jsepOnCreateSession=x=>{y.onCreateSession(x)},c.jsepOnReleaseSession=x=>{y.onReleaseSession(x)},c.jsepOnRunStart=x=>y.onRunStart(x),c.dc=(x,T)=>{y.upload(x,T)}}else if(d==="webnn"){[c.Hb,c.bc,c.Pb,c.jsepEnsureTensor,c.ec,c.jsepDownloadTensor]=m,c.jsepReleaseTensorId=c.Pb;let y=c.Hb;c.jsepOnRunStart=x=>y.onRunStart(x),c.jsepRegisterMLContext=(x,T)=>{y.registerMLContext(x,T)},c.jsepOnReleaseSession=x=>{y.onReleaseSession(x)},c.jsepCreateMLTensorDownloader=(x,T)=>y.createMLTensorDownloader(x,T),c.jsepRegisterMLTensor=(x,T,P)=>y.registerMLTensor(x,T,P),c.jsepCreateMLContext=x=>y.createMLContext(x),c.jsepRegisterMLConstant=(x,T,P,R,F)=>y.registerMLConstant(x,T,P,R,F,c.Fb)}};var _,I,$=Object.assign({},c),O=(d,m)=>{throw m},E="";(g||b)&&(b?E=self.location.href:typeof document<"u"&&document.currentScript&&(E=document.currentScript.src),Rs&&(E=Rs),E=E.startsWith("blob:")?"":E.substr(0,E.replace(/[?#].*/,"").lastIndexOf("/")+1),b&&(I=d=>{var m=new XMLHttpRequest;return m.open("GET",d,!1),m.responseType="arraybuffer",m.send(null),new Uint8Array(m.response)}),_=(d,m,y)=>{var x=new XMLHttpRequest;x.open("GET",d,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?m(x.response):y()},x.onerror=y,x.send(null)});var L,z=console.log.bind(console),U=console.error.bind(console),K=z,M=U;if(Object.assign(c,$),$=null,h){let d=function(m){try{var y=m.data,x=y.cmd;if(x==="load"){let T=[];self.onmessage=P=>T.push(P),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let P of T)d(P);self.onmessage=d};for(let P of y.handlers)c[P]&&!c[P].proxy||(c[P]=(...R)=>{postMessage({Nb:"callHandler",pc:P,args:R})},P=="print"&&(K=c[P]),P=="printErr"&&(M=c[P]));te=y.wasmMemory,Ae(),oe(y.wasmModule)}else if(x==="run"){wa(y.pthread_ptr,0,0,1,0,0),ha(y.pthread_ptr),x0(),Bu(),q||(Cl(),q=!0);try{_0(y.start_routine,y.arg)}catch(T){if(T!="unwind")throw T}}else x==="cancel"?sn()&&mo(-1):y.target!=="setimmediate"&&(x==="checkMailbox"?q&&no():x&&(M(`worker: received unknown command ${x}`),M(y)))}catch(T){throw kl(),T}};var FS=d,oe,q=!1;M=function(...m){m=m.join(" "),console.error(m)},self.alert=function(...m){postMessage({Nb:"alert",text:m.join(" "),rc:sn()})},c.instantiateWasm=(m,y)=>new Promise(x=>{oe=T=>{T=new WebAssembly.Instance(T,Pu()),y(T),x()}}),self.onunhandledrejection=m=>{throw m.reason||m},self.onmessage=d}c.wasmBinary&&(L=c.wasmBinary);var te,Re,Z,Y,be,ue,Me,at,Fe,pe,G,ne,ke,ft=!1;function Ae(){var d=te.buffer;c.HEAP8=Y=new Int8Array(d),c.HEAP16=ue=new Int16Array(d),c.HEAPU8=be=new Uint8Array(d),c.HEAPU16=Me=new Uint16Array(d),c.HEAP32=at=new Int32Array(d),c.HEAPU32=Fe=new Uint32Array(d),c.HEAPF32=pe=new Float32Array(d),c.HEAPF64=ke=new Float64Array(d),c.HEAP64=G=new BigInt64Array(d),c.HEAPU64=ne=new BigUint64Array(d)}if(!h){if(!((te=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof v))throw M("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Ae()}var Xe=[],Nt=[],ta=[],kr=0,ra=null,An=null;function Iu(){if(--kr==0&&(ra!==null&&(clearInterval(ra),ra=null),An)){var d=An;An=null,d()}}function br(d){throw M(d="Aborted("+d+")"),ft=!0,Z=1,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),f(d),d}var na,Su=d=>d.startsWith("data:application/octet-stream;base64,"),$u=d=>d.startsWith("file://");function Au(d){if(d==na&&L)return new Uint8Array(L);if(I)return I(d);throw"both async and sync fetching of the wasm failed"}function Ou(d,m,y){return function(x){if(!L&&(g||b)){if(typeof fetch=="function"&&!$u(x))return fetch(x,{credentials:"same-origin"}).then(T=>{if(!T.ok)throw`failed to load wasm binary file at '${x}'`;return T.arrayBuffer()}).catch(()=>Au(x));if(_)return new Promise((T,P)=>{_(x,R=>T(new Uint8Array(R)),P)})}return Promise.resolve().then(()=>Au(x))}(d).then(x=>WebAssembly.instantiate(x,m)).then(y,x=>{M(`failed to asynchronously prepare wasm: ${x}`),br(x)})}function Pu(){return{a:{O:y0,Aa:g0,b:v0,aa:Ru,B:Vu,qa:Gu,Y:Wu,_:Hu,ra:qu,oa:Ku,ha:ju,na:Xu,L:Zu,Z:Ju,W:Yu,pa:Qu,X:el,va:T0,F:S0,Q:$0,P:O0,E:E0,u:C0,q:k0,G:D0,A:F0,R:V0,ua:G0,ka:U0,U:W0,ba:H0,H:q0,ja:ha,ta:K0,t:j0,Ba:X0,x:Y0,o:Q0,m:t_,c:pa,n:r_,k:i_,w:a_,p:s_,f:u_,s:l_,l:c_,e:f_,j:d_,i:p_,g:m_,d:h_,ea:b_,fa:g_,ga:y_,ca:ml,da:hl,T:x_,h:__,D:w_,I:v_,M:T_,y:I_,sa:S_,V:$_,v:gl,z:A_,N:O_,S:P_,za:E_,ya:C_,la:_l,ma:wl,$:ua,C:vl,K:Tl,ia:Il,J:Sl,a:te,xa:sa,wa:Ol,r:B_}}}var oa={916580:(d,m,y,x,T)=>{if(c===void 0||!c.Fb)return 1;if((d=Ze(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=c.Fb.get(d)))return 2;if(m=Number(m>>>0),y=Number(y>>>0),x=Number(x>>>0),m+y>d.byteLength)return 3;try{let P=d.subarray(m,m+y);switch(T){case 0:n().set(P,x>>>0);break;case 1:c.dc(x,P);break;default:return 4}return 0}catch{return 4}},917295:(d,m,y)=>{c.ec(d,n().subarray(m>>>0,m+y>>>0))},917358:()=>c.bc(),917399:d=>{c.Pb(d)},917435:()=>{c.Wb()},917466:()=>{c.Xb()},917495:()=>{c.ac()},917520:d=>c.Vb(d),917553:d=>c.Zb(d),917585:(d,m,y)=>{c.Ob(Number(d),Number(m),Number(y),!0)},917648:(d,m,y)=>{c.Ob(Number(d),Number(m),Number(y))},917705:()=>typeof wasmOffsetConverter<"u",917762:d=>{c.kb("Abs",d,void 0)},917813:d=>{c.kb("Neg",d,void 0)},917864:d=>{c.kb("Floor",d,void 0)},917917:d=>{c.kb("Ceil",d,void 0)},917969:d=>{c.kb("Reciprocal",d,void 0)},918027:d=>{c.kb("Sqrt",d,void 0)},918079:d=>{c.kb("Exp",d,void 0)},918130:d=>{c.kb("Erf",d,void 0)},918181:d=>{c.kb("Sigmoid",d,void 0)},918236:(d,m,y)=>{c.kb("HardSigmoid",d,{alpha:m,beta:y})},918315:d=>{c.kb("Log",d,void 0)},918366:d=>{c.kb("Sin",d,void 0)},918417:d=>{c.kb("Cos",d,void 0)},918468:d=>{c.kb("Tan",d,void 0)},918519:d=>{c.kb("Asin",d,void 0)},918571:d=>{c.kb("Acos",d,void 0)},918623:d=>{c.kb("Atan",d,void 0)},918675:d=>{c.kb("Sinh",d,void 0)},918727:d=>{c.kb("Cosh",d,void 0)},918779:d=>{c.kb("Asinh",d,void 0)},918832:d=>{c.kb("Acosh",d,void 0)},918885:d=>{c.kb("Atanh",d,void 0)},918938:d=>{c.kb("Tanh",d,void 0)},918990:d=>{c.kb("Not",d,void 0)},919041:(d,m,y)=>{c.kb("Clip",d,{min:m,max:y})},919110:d=>{c.kb("Clip",d,void 0)},919162:(d,m)=>{c.kb("Elu",d,{alpha:m})},919220:d=>{c.kb("Gelu",d,void 0)},919272:d=>{c.kb("Relu",d,void 0)},919324:(d,m)=>{c.kb("LeakyRelu",d,{alpha:m})},919388:(d,m)=>{c.kb("ThresholdedRelu",d,{alpha:m})},919458:(d,m)=>{c.kb("Cast",d,{to:m})},919516:d=>{c.kb("Add",d,void 0)},919567:d=>{c.kb("Sub",d,void 0)},919618:d=>{c.kb("Mul",d,void 0)},919669:d=>{c.kb("Div",d,void 0)},919720:d=>{c.kb("Pow",d,void 0)},919771:d=>{c.kb("Equal",d,void 0)},919824:d=>{c.kb("Greater",d,void 0)},919879:d=>{c.kb("GreaterOrEqual",d,void 0)},919941:d=>{c.kb("Less",d,void 0)},919993:d=>{c.kb("LessOrEqual",d,void 0)},920052:(d,m,y,x,T)=>{c.kb("ReduceMean",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},920227:(d,m,y,x,T)=>{c.kb("ReduceMax",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},920401:(d,m,y,x,T)=>{c.kb("ReduceMin",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},920575:(d,m,y,x,T)=>{c.kb("ReduceProd",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},920750:(d,m,y,x,T)=>{c.kb("ReduceSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},920924:(d,m,y,x,T)=>{c.kb("ReduceL1",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},921097:(d,m,y,x,T)=>{c.kb("ReduceL2",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},921270:(d,m,y,x,T)=>{c.kb("ReduceLogSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},921447:(d,m,y,x,T)=>{c.kb("ReduceSumSquare",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},921627:(d,m,y,x,T)=>{c.kb("ReduceLogSumExp",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},921807:d=>{c.kb("Where",d,void 0)},921860:(d,m,y)=>{c.kb("Transpose",d,{perm:m?Array.from(i().subarray(Number(m)>>>0,Number(y)>>>0)):[]})},921984:(d,m,y,x)=>{c.kb("DepthToSpace",d,{blocksize:m,mode:Ze(y),format:x?"NHWC":"NCHW"})},922117:(d,m,y,x)=>{c.kb("DepthToSpace",d,{blocksize:m,mode:Ze(y),format:x?"NHWC":"NCHW"})},922250:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N,ve)=>{c.kb("ConvTranspose",d,{format:X?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[T],pads:[P,R],strides:[F],wIsConst:()=>!!e()[Q>>>0],outputPadding:le?Array.from(i().subarray(Number(le)>>>0,Number(Te)>>>0)):[],outputShape:De?Array.from(i().subarray(Number(De)>>>0,Number(N)>>>0)):[],activation:Ze(ve)})},922683:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(i().subarray(Number(P)>>>0,4+(Number(P)>>>0)>>>0)),strides:Array.from(i().subarray(Number(R)>>>0,2+(Number(R)>>>0)>>>0)),wIsConst:()=>!!e()[X>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],outputShape:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[],activation:Ze(N)})},923344:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N,ve)=>{c.kb("ConvTranspose",d,{format:X?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[T],pads:[P,R],strides:[F],wIsConst:()=>!!e()[Q>>>0],outputPadding:le?Array.from(i().subarray(Number(le)>>>0,Number(Te)>>>0)):[],outputShape:De?Array.from(i().subarray(Number(De)>>>0,Number(N)>>>0)):[],activation:Ze(ve)})},923777:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from(i().subarray(Number(P)>>>0,4+(Number(P)>>>0)>>>0)),strides:Array.from(i().subarray(Number(R)>>>0,2+(Number(R)>>>0)>>>0)),wIsConst:()=>!!e()[X>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],outputShape:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[],activation:Ze(N)})},924438:(d,m)=>{c.kb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},924529:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("AveragePool",d,{format:N?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[],kernel_shape:F?Array.from(i().subarray(Number(F)>>>0,Number(X)>>>0)):[],pads:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[]})},925008:(d,m)=>{c.kb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},925099:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("AveragePool",d,{format:N?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[],kernel_shape:F?Array.from(i().subarray(Number(F)>>>0,Number(X)>>>0)):[],pads:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[]})},925578:(d,m)=>{c.kb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},925665:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("MaxPool",d,{format:N?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[],kernel_shape:F?Array.from(i().subarray(Number(F)>>>0,Number(X)>>>0)):[],pads:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[]})},926140:(d,m)=>{c.kb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},926227:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N)=>{c.kb("MaxPool",d,{format:N?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:T,dilations:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[],kernel_shape:F?Array.from(i().subarray(Number(F)>>>0,Number(X)>>>0)):[],pads:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],strides:Te?Array.from(i().subarray(Number(Te)>>>0,Number(De)>>>0)):[]})},926702:(d,m,y,x,T)=>{c.kb("Gemm",d,{alpha:m,beta:y,transA:x,transB:T})},926806:d=>{c.kb("MatMul",d,void 0)},926860:(d,m,y,x)=>{c.kb("ArgMax",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},926968:(d,m,y,x)=>{c.kb("ArgMin",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},927076:(d,m)=>{c.kb("Softmax",d,{axis:m})},927139:(d,m)=>{c.kb("Concat",d,{axis:m})},927199:(d,m,y,x,T)=>{c.kb("Split",d,{axis:m,numOutputs:y,splitSizes:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},927355:d=>{c.kb("Expand",d,void 0)},927409:(d,m)=>{c.kb("Gather",d,{axis:Number(m)})},927480:(d,m)=>{c.kb("GatherElements",d,{axis:Number(m)})},927559:(d,m)=>{c.kb("GatherND",d,{batch_dims:Number(m)})},927638:(d,m,y,x,T,P,R,F,X,Q,le)=>{c.kb("Resize",d,{antialias:m,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(x)>>>0)):[],coordinateTransformMode:Ze(T),cubicCoeffA:P,excludeOutside:R,extrapolationValue:F,keepAspectRatioPolicy:Ze(X),mode:Ze(Q),nearestMode:Ze(le)})},928e3:(d,m,y,x,T,P,R)=>{c.kb("Slice",d,{starts:m?Array.from(i().subarray(Number(m)>>>0,Number(y)>>>0)):[],ends:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[],axes:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[]})},928264:d=>{c.kb("Tile",d,void 0)},928316:(d,m,y)=>{c.kb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},928430:(d,m,y)=>{c.kb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},928544:d=>{c.kb("Range",d,void 0)},928597:(d,m)=>{c.kb("Einsum",d,{equation:Ze(m)})},928678:(d,m,y,x,T)=>{c.kb("Pad",d,{mode:m,value:y,pads:x?Array.from(i().subarray(Number(x)>>>0,Number(T)>>>0)):[]})},928821:(d,m,y,x,T,P)=>{c.kb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!T,trainingMode:!!x,format:P?"NHWC":"NCHW"})},928990:(d,m,y,x,T,P)=>{c.kb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!T,trainingMode:!!x,format:P?"NHWC":"NCHW"})},929159:(d,m,y)=>{c.kb("CumSum",d,{exclusive:Number(m),reverse:Number(y)})},929256:(d,m,y)=>{c.kb("DequantizeLinear",d,{axis:m,blockSize:y})},929346:(d,m,y,x,T)=>{c.kb("GridSample",d,{align_corners:m,mode:Ze(y),padding_mode:Ze(x),format:T?"NHWC":"NCHW"})},929516:(d,m,y,x,T)=>{c.kb("GridSample",d,{align_corners:m,mode:Ze(y),padding_mode:Ze(x),format:T?"NHWC":"NCHW"})},929686:(d,m,y,x,T,P,R,F,X)=>{c.kb("Attention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:T,doRotary:P,qkvHiddenSizes:R?Array.from(i().subarray(Number(F)>>>0,Number(F)+R>>>0)):[],pastPresentShareBuffer:!!X})},929958:d=>{c.kb("BiasAdd",d,void 0)},930013:d=>{c.kb("BiasSplitGelu",d,void 0)},930074:d=>{c.kb("FastGelu",d,void 0)},930130:(d,m,y,x,T,P,R,F,X,Q,le,Te,De,N,ve,Ke)=>{c.kb("Conv",d,{format:Te?"NHWC":"NCHW",auto_pad:m,dilations:y?Array.from(i().subarray(Number(y)>>>0,Number(x)>>>0)):[],group:T,kernel_shape:P?Array.from(i().subarray(Number(P)>>>0,Number(R)>>>0)):[],pads:F?Array.from(i().subarray(Number(F)>>>0,Number(X)>>>0)):[],strides:Q?Array.from(i().subarray(Number(Q)>>>0,Number(le)>>>0)):[],w_is_const:()=>!!e()[Number(De)>>>0],activation:Ze(N),activation_params:ve?Array.from(a().subarray(Number(ve)>>>0,Number(Ke)>>>0)):[]})},930714:d=>{c.kb("Gelu",d,void 0)},930766:(d,m,y,x,T,P,R,F,X)=>{c.kb("GroupQueryAttention",d,{numHeads:m,kvNumHeads:y,scale:x,softcap:T,doRotary:P,rotaryInterleaved:R,smoothSoftmax:F,localWindowSize:X})},930983:(d,m,y,x)=>{c.kb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},931094:(d,m,y,x)=>{c.kb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},931205:(d,m,y,x,T,P)=>{c.kb("MatMulNBits",d,{k:m,n:y,accuracyLevel:x,bits:T,blockSize:P})},931332:(d,m,y,x,T,P)=>{c.kb("MultiHeadAttention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:T,doRotary:P})},931491:(d,m)=>{c.kb("QuickGelu",d,{alpha:m})},931555:(d,m,y,x,T)=>{c.kb("RotaryEmbedding",d,{interleaved:!!m,numHeads:y,rotaryEmbeddingDim:x,scale:T})},931694:(d,m,y)=>{c.kb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},931796:(d,m,y)=>{c.kb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},931898:(d,m,y,x)=>{c.kb("GatherBlockQuantized",d,{gatherAxis:m,quantizeAxis:y,blockSize:x})},932019:d=>{c.$b(d)},932053:(d,m)=>c.cc(Number(d),Number(m),c.Gb.hc,c.Gb.errors)};function g0(d,m,y){return ll(async()=>{await c.Yb(Number(d),Number(m),Number(y))})}function y0(){return typeof wasmOffsetConverter<"u"}function ia(d){this.name="ExitStatus",this.message=`Program terminated with exit(${d})`,this.status=d}var aa=d=>{d.terminate(),d.onmessage=()=>{}},Eu=d=>{gr.length==0&&(Nu(),Lu(gr[0]));var m=gr.pop();if(!m)return 6;Br.push(m),Kt[d.Bb]=m,m.Bb=d.Bb;var y={cmd:"run",start_routine:d.ic,arg:d.Rb,pthread_ptr:d.Bb};return m.postMessage(y,d.nc),0},Dr=0,We=(d,m,...y)=>{for(var x=2*y.length,T=Ia(),P=Ta(8*x),R=P>>>3,F=0;F<y.length;F++){var X=y[F];typeof X=="bigint"?(G[R+2*F]=1n,G[R+2*F+1]=X):(G[R+2*F]=0n,u()[R+2*F+1>>>0]=X)}return d=Dl(d,0,x,P,m),ho(T),d};function sa(d){if(h)return We(0,1,d);if(Z=d,!(0<Dr)){for(var m of Br)aa(m);for(m of gr)aa(m);gr=[],Br=[],Kt=[],ft=!0}O(0,new ia(d))}function Cu(d){if(h)return We(1,0,d);ua(d)}var ua=d=>{if(Z=d,h)throw Cu(d),"unwind";sa(d)},gr=[],Br=[],ku=[],Kt={},Du=d=>{var m=d.Bb;delete Kt[m],gr.push(d),Br.splice(Br.indexOf(d),1),d.Bb=0,va(m)};function Bu(){ku.forEach(d=>d())}var Lu=d=>new Promise(m=>{d.onmessage=T=>{var P=(T=T.data).cmd;if(T.targetThread&&T.targetThread!=sn()){var R=Kt[T.targetThread];R?R.postMessage(T,T.transferList):M(`Internal error! Worker sent a message "${P}" to target pthread ${T.targetThread}, but that thread no longer exists!`)}else P==="checkMailbox"?no():P==="spawnThread"?Eu(T):P==="cleanupThread"?Du(Kt[T.thread]):P==="killThread"?(T=T.thread,P=Kt[T],delete Kt[T],aa(P),va(T),Br.splice(Br.indexOf(P),1),P.Bb=0):P==="cancelThread"?Kt[T.thread].postMessage({cmd:"cancel"}):P==="loaded"?(d.loaded=!0,m(d)):P==="alert"?alert(`Thread ${T.threadId}: ${T.text}`):T.target==="setimmediate"?d.postMessage(T):P==="callHandler"?c[T.handler](...T.args):P&&M(`worker sent an unknown command ${P}`)},d.onerror=T=>{throw M(`worker sent an error! ${T.filename}:${T.lineno}: ${T.message}`),T};var y,x=[];for(y of[])c.hasOwnProperty(y)&&x.push(y);d.postMessage({cmd:"load",handlers:x,wasmMemory:te,wasmModule:Re})});function Nu(){var d=new Worker(import.meta.url.startsWith("file:")?new URL("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});gr.push(d)}var ro=d=>{for(;0<d.length;)d.shift()(c)},x0=()=>{var d=sn(),m=s()[d+52>>>2>>>0];d=s()[d+56>>>2>>>0],Ll(m,m-d),ho(m)},_0=(d,m)=>{Dr=0,d=Nl(d,m),0<Dr?Z=d:mo(d)};class w0{constructor(m){this.Kb=m-24}}function v0(d,m,y){var x=new w0(d>>>=0);throw m>>>=0,y>>>=0,s()[x.Kb+16>>>2>>>0]=0,s()[x.Kb+4>>>2>>>0]=m,s()[x.Kb+8>>>2>>>0]=y,d}function zu(d,m,y,x){return h?We(2,1,d,m,y,x):Ru(d,m,y,x)}function Ru(d,m,y,x){if(d>>>=0,m>>>=0,y>>>=0,x>>>=0,v===void 0)return M("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var T=[];return h&&T.length===0?zu(d,m,y,x):(d={ic:y,Bb:d,Rb:x,nc:T},h?(d.Nb="spawnThread",postMessage(d,T),0):Eu(d))}var Mu=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Fu=(d,m,y)=>{var x=(m>>>=0)+y;for(y=m;d[y]&&!(y>=x);)++y;if(16<y-m&&d.buffer&&Mu)return Mu.decode(d.buffer instanceof v?d.slice(m,y):d.subarray(m,y));for(x="";m<y;){var T=d[m++];if(128&T){var P=63&d[m++];if((224&T)==192)x+=String.fromCharCode((31&T)<<6|P);else{var R=63&d[m++];65536>(T=(240&T)==224?(15&T)<<12|P<<6|R:(7&T)<<18|P<<12|R<<6|63&d[m++])?x+=String.fromCharCode(T):(T-=65536,x+=String.fromCharCode(55296|T>>10,56320|1023&T))}}else x+=String.fromCharCode(T)}return x},Ze=(d,m)=>(d>>>=0)?Fu(n(),d,m):"";function Vu(d,m,y){return h?We(3,1,d,m,y):0}function Gu(d,m){if(h)return We(4,1,d,m)}var la=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);127>=x?m++:2047>=x?m+=2:55296<=x&&57343>=x?(m+=4,++y):m+=3}return m},Uu=(d,m,y,x)=>{if(!(0<x))return 0;var T=y>>>=0;x=y+x-1;for(var P=0;P<d.length;++P){var R=d.charCodeAt(P);if(55296<=R&&57343>=R&&(R=65536+((1023&R)<<10)|1023&d.charCodeAt(++P)),127>=R){if(y>=x)break;m[y++>>>0]=R}else{if(2047>=R){if(y+1>=x)break;m[y++>>>0]=192|R>>6}else{if(65535>=R){if(y+2>=x)break;m[y++>>>0]=224|R>>12}else{if(y+3>=x)break;m[y++>>>0]=240|R>>18,m[y++>>>0]=128|R>>12&63}m[y++>>>0]=128|R>>6&63}m[y++>>>0]=128|63&R}}return m[y>>>0]=0,y-T},nn=(d,m,y)=>Uu(d,n(),m,y);function Wu(d,m){if(h)return We(5,1,d,m)}function Hu(d,m,y){if(h)return We(6,1,d,m,y)}function qu(d,m,y){return h?We(7,1,d,m,y):0}function Ku(d,m){if(h)return We(8,1,d,m)}function ju(d,m,y){if(h)return We(9,1,d,m,y)}function Xu(d,m,y,x){if(h)return We(10,1,d,m,y,x)}function Zu(d,m,y,x){if(h)return We(11,1,d,m,y,x)}function Ju(d,m,y,x){if(h)return We(12,1,d,m,y,x)}function Yu(d){if(h)return We(13,1,d)}function Qu(d,m){if(h)return We(14,1,d,m)}function el(d,m,y){if(h)return We(15,1,d,m,y)}var tl,yr,T0=()=>{br("")},jt=d=>{for(var m="";n()[d>>>0];)m+=tl[n()[d++>>>0]];return m},ca={},fa={},I0={};function lr(d,m,y={}){if(!("argPackAdvance"in m))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(x,T,P={}){var R=T.name;if(!x)throw new yr(`type "${R}" must have a positive integer typeid pointer`);if(fa.hasOwnProperty(x)){if(P.Tb)return;throw new yr(`Cannot register type '${R}' twice`)}fa[x]=T,delete I0[x],ca.hasOwnProperty(x)&&(T=ca[x],delete ca[x],T.forEach(F=>F()))}(d,m,y)}var rl=(d,m,y)=>{switch(m){case 1:return y?x=>e()[x>>>0]:x=>n()[x>>>0];case 2:return y?x=>t()[x>>>1>>>0]:x=>o()[x>>>1>>>0];case 4:return y?x=>i()[x>>>2>>>0]:x=>s()[x>>>2>>>0];case 8:return y?x=>G[x>>>3]:x=>ne[x>>>3];default:throw new TypeError(`invalid integer width (${m}): ${d}`)}};function S0(d,m,y){y>>>=0,lr(d>>>=0,{name:m=jt(m>>>0),fromWireType:x=>x,toWireType:function(x,T){if(typeof T!="bigint"&&typeof T!="number")throw T=T===null?"null":(x=typeof T)=="object"||x==="array"||x==="function"?T.toString():""+T,new TypeError(`Cannot convert "${T}" to ${this.name}`);return typeof T=="number"&&(T=BigInt(T)),T},argPackAdvance:xr,readValueFromPointer:rl(m,y,m.indexOf("u")==-1),Eb:null})}var xr=8;function $0(d,m,y,x){lr(d>>>=0,{name:m=jt(m>>>0),fromWireType:function(T){return!!T},toWireType:function(T,P){return P?y:x},argPackAdvance:xr,readValueFromPointer:function(T){return this.fromWireType(n()[T>>>0])},Eb:null})}var da=[],cr=[];function pa(d){9<(d>>>=0)&&--cr[d+1]==0&&(cr[d]=void 0,da.push(d))}var wt=d=>{if(!d)throw new yr("Cannot use deleted val. handle = "+d);return cr[d]},$t=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let m=da.pop()||cr.length;return cr[m]=d,cr[m+1]=1,m}};function ma(d){return this.fromWireType(s()[d>>>2>>>0])}var A0={name:"emscripten::val",fromWireType:d=>{var m=wt(d);return pa(d),m},toWireType:(d,m)=>$t(m),argPackAdvance:xr,readValueFromPointer:ma,Eb:null};function O0(d){return lr(d>>>0,A0)}var P0=(d,m)=>{switch(m){case 4:return function(y){return this.fromWireType(a()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(u()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${m}): ${d}`)}};function E0(d,m,y){y>>>=0,lr(d>>>=0,{name:m=jt(m>>>0),fromWireType:x=>x,toWireType:(x,T)=>T,argPackAdvance:xr,readValueFromPointer:P0(m,y),Eb:null})}function C0(d,m,y,x,T){if(d>>>=0,y>>>=0,m=jt(m>>>0),T===-1&&(T=4294967295),T=F=>F,x===0){var P=32-8*y;T=F=>F<<P>>>P}var R=m.includes("unsigned")?function(F,X){return X>>>0}:function(F,X){return X};lr(d,{name:m,fromWireType:T,toWireType:R,argPackAdvance:xr,readValueFromPointer:rl(m,y,x!==0),Eb:null})}function k0(d,m,y){function x(P){var R=s()[P>>>2>>>0];return P=s()[P+4>>>2>>>0],new T(e().buffer,P,R)}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][m];lr(d>>>=0,{name:y=jt(y>>>0),fromWireType:x,argPackAdvance:xr,readValueFromPointer:x},{Tb:!0})}function D0(d,m){d>>>=0;var y=(m=jt(m>>>0))==="std::string";lr(d,{name:m,fromWireType:function(x){var T=s()[x>>>2>>>0],P=x+4;if(y)for(var R=P,F=0;F<=T;++F){var X=P+F;if(F==T||n()[X>>>0]==0){if(R=Ze(R,X-R),Q===void 0)var Q=R;else Q+=String.fromCharCode(0),Q+=R;R=X+1}}else{for(Q=Array(T),F=0;F<T;++F)Q[F]=String.fromCharCode(n()[P+F>>>0]);Q=Q.join("")}return Zt(x),Q},toWireType:function(x,T){T instanceof ArrayBuffer&&(T=new Uint8Array(T));var P=typeof T=="string";if(!(P||T instanceof Uint8Array||T instanceof Uint8ClampedArray||T instanceof Int8Array))throw new yr("Cannot pass non-string to std::string");var R=y&&P?la(T):T.length,F=po(4+R+1),X=F+4;if(s()[F>>>2>>>0]=R,y&&P)nn(T,X,R+1);else if(P)for(P=0;P<R;++P){var Q=T.charCodeAt(P);if(255<Q)throw Zt(X),new yr("String has UTF-16 code units that do not fit in 8 bits");n()[X+P>>>0]=Q}else for(P=0;P<R;++P)n()[X+P>>>0]=T[P];return x!==null&&x.push(Zt,F),F},argPackAdvance:xr,readValueFromPointer:ma,Eb(x){Zt(x)}})}var nl=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,B0=(d,m)=>{for(var y=d>>1,x=y+m/2;!(y>=x)&&o()[y>>>0];)++y;if(32<(y<<=1)-d&&nl)return nl.decode(n().slice(d,y));for(y="",x=0;!(x>=m/2);++x){var T=t()[d+2*x>>>1>>>0];if(T==0)break;y+=String.fromCharCode(T)}return y},L0=(d,m,y)=>{if(y??=2147483647,2>y)return 0;var x=m;y=(y-=2)<2*d.length?y/2:d.length;for(var T=0;T<y;++T){var P=d.charCodeAt(T);t()[m>>>1>>>0]=P,m+=2}return t()[m>>>1>>>0]=0,m-x},N0=d=>2*d.length,z0=(d,m)=>{for(var y=0,x="";!(y>=m/4);){var T=i()[d+4*y>>>2>>>0];if(T==0)break;++y,65536<=T?(T-=65536,x+=String.fromCharCode(55296|T>>10,56320|1023&T)):x+=String.fromCharCode(T)}return x},R0=(d,m,y)=>{if(m>>>=0,y??=2147483647,4>y)return 0;var x=m;y=x+y-4;for(var T=0;T<d.length;++T){var P=d.charCodeAt(T);if(55296<=P&&57343>=P&&(P=65536+((1023&P)<<10)|1023&d.charCodeAt(++T)),i()[m>>>2>>>0]=P,(m+=4)+4>y)break}return i()[m>>>2>>>0]=0,m-x},M0=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);55296<=x&&57343>=x&&++y,m+=4}return m};function F0(d,m,y){if(d>>>=0,m>>>=0,y=jt(y>>>=0),m===2)var x=B0,T=L0,P=N0,R=F=>o()[F>>>1>>>0];else m===4&&(x=z0,T=R0,P=M0,R=F=>s()[F>>>2>>>0]);lr(d,{name:y,fromWireType:F=>{for(var X,Q=s()[F>>>2>>>0],le=F+4,Te=0;Te<=Q;++Te){var De=F+4+Te*m;Te!=Q&&R(De)!=0||(le=x(le,De-le),X===void 0?X=le:(X+=String.fromCharCode(0),X+=le),le=De+m)}return Zt(F),X},toWireType:(F,X)=>{if(typeof X!="string")throw new yr(`Cannot pass non-string to C++ string type ${y}`);var Q=P(X),le=po(4+Q+m);return s()[le>>>2>>>0]=Q/m,T(X,le+4,Q+m),F!==null&&F.push(Zt,le),le},argPackAdvance:xr,readValueFromPointer:ma,Eb(F){Zt(F)}})}function V0(d,m){lr(d>>>=0,{Ub:!0,name:m=jt(m>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var G0=()=>1;function U0(d){wa(d>>>0,!b,1,!g,131072,!1),Bu()}var ol=d=>{if(!ft)try{if(d(),!(0<Dr))try{h?mo(Z):ua(Z)}catch(m){m instanceof ia||m=="unwind"||O(0,m)}}catch(m){m instanceof ia||m=="unwind"||O(0,m)}};function ha(d){d>>>=0,typeof Atomics.oc=="function"&&(Atomics.oc(i(),d>>>2,d).value.then(no),d+=128,Atomics.store(i(),d>>>2,1))}var no=()=>{var d=sn();d&&(ha(d),ol(Bl))};function W0(d,m){(d>>>=0)==m>>>0?setTimeout(no):h?postMessage({targetThread:d,cmd:"checkMailbox"}):(d=Kt[d])&&d.postMessage({cmd:"checkMailbox"})}var ba=[];function H0(d,m,y,x,T){for(m>>>=0,x/=2,ba.length=x,y=T>>>0>>>3,T=0;T<x;T++)ba[T]=G[y+2*T]?G[y+2*T+1]:u()[y+2*T+1>>>0];return(m?oa[m]:L_[d])(...ba)}function q0(d){d>>>=0,h?postMessage({cmd:"cleanupThread",thread:d}):Du(Kt[d])}function K0(d){}var oo=(d,m)=>{var y=fa[d];if(y===void 0)throw d=El(d),y=jt(d),Zt(d),new yr(`${m} has unknown type ${y}`);return y},il=(d,m,y)=>{var x=[];return d=d.toWireType(x,y),x.length&&(s()[m>>>2>>>0]=$t(x)),d};function j0(d,m,y){return m>>>=0,y>>>=0,d=wt(d>>>0),m=oo(m,"emval::as"),il(m,y,d)}function X0(d,m){return m>>>=0,d=wt(d>>>0),(m=oo(m,"emval::as")).toWireType(null,d)}var io=d=>{try{d()}catch(m){br(m)}},_r=0,Xt=null,al=0,ao=[],sl={},ul={},Z0=0,ga=null,J0=[];function ll(d){return function(m){if(!ft){if(_r===0){var y=!1,x=!1;m((T=0)=>{if(!ft&&(al=T,y=!0,x)){_r=2,io(()=>Ml(Xt)),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.resume(),T=!1;try{var P=function(){var X=i()[Xt+8>>>2>>>0];return X=ae[ul[X]],--Dr,X()}()}catch(X){P=X,T=!0}var R=!1;if(!Xt){var F=ga;F&&(ga=null,(T?F.reject:F.resolve)(P),R=!0)}if(T&&!R)throw P}}),x=!0,y||(_r=1,Xt=function(){var T=po(65548),P=T+12;s()[T>>>2>>>0]=P,s()[T+4>>>2>>>0]=P+65536,P=ao[0];var R=sl[P];return R===void 0&&(R=Z0++,sl[P]=R,ul[R]=P),P=R,i()[T+8>>>2>>>0]=P,T}(),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.pause(),io(()=>zl(Xt)))}else _r===2?(_r=0,io(Fl),Zt(Xt),Xt=null,J0.forEach(ol)):br(`invalid state: ${_r}`);return al}}(m=>{d().then(m)})}function Y0(d){return d>>>=0,ll(()=>(d=wt(d)).then($t))}var so=[];function Q0(d,m,y,x){return y>>>=0,x>>>=0,(d=so[d>>>0])(null,m=wt(m>>>0),y,x)}var e_={},uo=d=>{var m=e_[d];return m===void 0?jt(d):m};function t_(d,m,y,x,T){return y>>>=0,x>>>=0,T>>>=0,(d=so[d>>>0])(m=wt(m>>>0),m[y=uo(y)],x,T)}var cl=()=>typeof globalThis=="object"?globalThis:Function("return this")();function r_(d){return(d>>>=0)==0?$t(cl()):(d=uo(d),$t(cl()[d]))}var n_=d=>{var m=so.length;return so.push(d),m},o_=(d,m)=>{for(var y=Array(d),x=0;x<d;++x)y[x]=oo(s()[m+4*x>>>2>>>0],"parameter "+x);return y},fl=(d,m)=>Object.defineProperty(m,"name",{value:d});function i_(d,m,y){var x=(m=o_(d,m>>>0)).shift();d--;var T=`return function (obj, func, destructorsRef, args) {
`,P=0,R=[];y===0&&R.push("obj");for(var F=["retType"],X=[x],Q=0;Q<d;++Q)R.push("arg"+Q),F.push("argType"+Q),X.push(m[Q]),T+=`  var arg${Q} = argType${Q}.readValueFromPointer(args${P?"+"+P:""});
`,P+=m[Q].argPackAdvance;return T+=`  var rv = ${y===1?"new func":"func.call"}(${R.join(", ")});
`,x.Ub||(F.push("emval_returnValue"),X.push(il),T+=`  return emval_returnValue(retType, destructorsRef, rv);
`),F.push(T+`};
`),d=function(le){var Te=Function;if(!(Te instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Te} which is not a function`);var De=fl(Te.name||"unknownFunctionName",function(){});return De.prototype=Te.prototype,De=new De,(le=Te.apply(De,le))instanceof Object?le:De}(F)(...X),y=`methodCaller<(${m.map(le=>le.name).join(", ")}) => ${x.name}>`,n_(fl(y,d))}function a_(d){return d=uo(d>>>0),$t(c[d])}function s_(d,m){return m>>>=0,d=wt(d>>>0),m=wt(m),$t(d[m])}function u_(d){9<(d>>>=0)&&(cr[d+1]+=1)}function l_(){return $t([])}function c_(d){d=wt(d>>>0);for(var m=Array(d.length),y=0;y<d.length;y++)m[y]=d[y];return $t(m)}function f_(d){return $t(uo(d>>>0))}function d_(){return $t({})}function p_(d){for(var m=wt(d>>>=0);m.length;){var y=m.pop();m.pop()(y)}pa(d)}function m_(d,m,y){m>>>=0,y>>>=0,d=wt(d>>>0),m=wt(m),y=wt(y),d[m]=y}function h_(d,m){return m>>>=0,d=(d=oo(d>>>0,"_emval_take_value")).readValueFromPointer(m),$t(d)}function b_(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getUTCSeconds(),i()[m+4>>>2>>>0]=d.getUTCMinutes(),i()[m+8>>>2>>>0]=d.getUTCHours(),i()[m+12>>>2>>>0]=d.getUTCDate(),i()[m+16>>>2>>>0]=d.getUTCMonth(),i()[m+20>>>2>>>0]=d.getUTCFullYear()-1900,i()[m+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[m+28>>>2>>>0]=d}var on=d=>d%4==0&&(d%100!=0||d%400==0),dl=[0,31,60,91,121,152,182,213,244,274,305,335],pl=[0,31,59,90,120,151,181,212,243,273,304,334];function g_(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getSeconds(),i()[m+4>>>2>>>0]=d.getMinutes(),i()[m+8>>>2>>>0]=d.getHours(),i()[m+12>>>2>>>0]=d.getDate(),i()[m+16>>>2>>>0]=d.getMonth(),i()[m+20>>>2>>>0]=d.getFullYear()-1900,i()[m+24>>>2>>>0]=d.getDay();var y=(on(d.getFullYear())?dl:pl)[d.getMonth()]+d.getDate()-1|0;i()[m+28>>>2>>>0]=y,i()[m+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var x=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=x&&d.getTimezoneOffset()==Math.min(x,y)),i()[m+32>>>2>>>0]=d}function y_(d){d>>>=0;var m=new Date(i()[d+20>>>2>>>0]+1900,i()[d+16>>>2>>>0],i()[d+12>>>2>>>0],i()[d+8>>>2>>>0],i()[d+4>>>2>>>0],i()[d>>>2>>>0],0),y=i()[d+32>>>2>>>0],x=m.getTimezoneOffset(),T=new Date(m.getFullYear(),6,1).getTimezoneOffset(),P=new Date(m.getFullYear(),0,1).getTimezoneOffset(),R=Math.min(P,T);return 0>y?i()[d+32>>>2>>>0]=+(T!=P&&R==x):0<y!=(R==x)&&(T=Math.max(P,T),m.setTime(m.getTime()+6e4*((0<y?R:T)-x))),i()[d+24>>>2>>>0]=m.getDay(),y=(on(m.getFullYear())?dl:pl)[m.getMonth()]+m.getDate()-1|0,i()[d+28>>>2>>>0]=y,i()[d>>>2>>>0]=m.getSeconds(),i()[d+4>>>2>>>0]=m.getMinutes(),i()[d+8>>>2>>>0]=m.getHours(),i()[d+12>>>2>>>0]=m.getDate(),i()[d+16>>>2>>>0]=m.getMonth(),i()[d+20>>>2>>>0]=m.getYear(),d=m.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function ml(d,m,y,x,T,P,R){return h?We(16,1,d,m,y,x,T,P,R):-52}function hl(d,m,y,x,T,P){if(h)return We(17,1,d,m,y,x,T,P)}function x_(d,m,y,x){d>>>=0,m>>>=0,y>>>=0,x>>>=0;var T=new Date().getFullYear(),P=new Date(T,0,1),R=new Date(T,6,1);T=P.getTimezoneOffset();var F=R.getTimezoneOffset(),X=Math.max(T,F);s()[d>>>2>>>0]=60*X,i()[m>>>2>>>0]=+(T!=F),P=(d=Q=>Q.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(P),R=d(R),F<T?(nn(P,y,17),nn(R,x,17)):(nn(P,x,17),nn(R,y,17))}var ya=[],bl=(d,m)=>{ya.length=0;for(var y;y=n()[d++>>>0];){var x=y!=105;m+=(x&=y!=112)&&m%8?4:0,ya.push(y==112?s()[m>>>2>>>0]:y==106?G[m>>>3]:y==105?i()[m>>>2>>>0]:u()[m>>>3>>>0]),m+=x?8:4}return ya};function __(d,m,y){return d>>>=0,m=bl(m>>>0,y>>>0),oa[d](...m)}function w_(d,m,y){return d>>>=0,m=bl(m>>>0,y>>>0),oa[d](...m)}var v_=()=>{},T_=()=>Date.now();function I_(d,m){return M(Ze(d>>>0,m>>>0))}var gl,S_=()=>{throw Dr+=1,"unwind"};function $_(){return 4294901760}gl=()=>performance.timeOrigin+performance.now();var A_=()=>navigator.hardwareConcurrency;function O_(){return br("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function P_(d){d>>>=0;var m=n().length;if(d<=m||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var x=m*(1+.2/y);x=Math.min(x,d+100663296);var T=Math;x=Math.max(d,x);e:{T=(T.min.call(T,4294901760,x+(65536-x%65536)%65536)-te.buffer.byteLength+65535)/65536;try{te.grow(T),Ae();var P=1;break e}catch{}P=void 0}if(P)return!0}return!1}var lo=()=>(br("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),an={},yl=d=>{d.forEach(m=>{var y=lo();y&&(an[y]=m)})};function E_(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),yl(d),an.Qb=lo(),an.fc=d,an.Qb}function C_(d,m,y){if(d>>>=0,m>>>=0,an.Qb==d)var x=an.fc;else(x=Error().stack.toString().split(`
`))[0]=="Error"&&x.shift(),yl(x);for(var T=3;x[T]&&lo()!=d;)++T;for(d=0;d<y&&x[d+T];++d)i()[m+4*d>>>2>>>0]=lo();return d}var xa,_a={},xl=()=>{if(!xa){var d,m={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in _a)_a[d]===void 0?delete m[d]:m[d]=_a[d];var y=[];for(d in m)y.push(`${d}=${m[d]}`);xa=y}return xa};function _l(d,m){if(h)return We(18,1,d,m);d>>>=0,m>>>=0;var y=0;return xl().forEach((x,T)=>{var P=m+y;for(T=s()[d+4*T>>>2>>>0]=P,P=0;P<x.length;++P)e()[T++>>>0]=x.charCodeAt(P);e()[T>>>0]=0,y+=x.length+1}),0}function wl(d,m){if(h)return We(19,1,d,m);d>>>=0,m>>>=0;var y=xl();s()[d>>>2>>>0]=y.length;var x=0;return y.forEach(T=>x+=T.length+1),s()[m>>>2>>>0]=x,0}function vl(d){return h?We(20,1,d):52}function Tl(d,m,y,x){return h?We(21,1,d,m,y,x):52}function Il(d,m,y,x){return h?We(22,1,d,m,y,x):70}var k_=[null,[],[]];function Sl(d,m,y,x){if(h)return We(23,1,d,m,y,x);m>>>=0,y>>>=0,x>>>=0;for(var T=0,P=0;P<y;P++){var R=s()[m>>>2>>>0],F=s()[m+4>>>2>>>0];m+=8;for(var X=0;X<F;X++){var Q=n()[R+X>>>0],le=k_[d];Q===0||Q===10?((d===1?K:M)(Fu(le,0)),le.length=0):le.push(Q)}T+=F}return s()[x>>>2>>>0]=T,0}var $l=[31,29,31,30,31,30,31,31,30,31,30,31],Al=[31,28,31,30,31,30,31,31,30,31,30,31],D_=(d,m)=>{e().set(d,m>>>0)};function Ol(d,m,y,x){function T(N,ve,Ke){for(N=typeof N=="number"?N.toString():N||"";N.length<ve;)N=Ke[0]+N;return N}function P(N,ve){return T(N,ve,"0")}function R(N,ve){function Ke(Gl){return 0>Gl?-1:0<Gl?1:0}var Lr;return(Lr=Ke(N.getFullYear()-ve.getFullYear()))===0&&(Lr=Ke(N.getMonth()-ve.getMonth()))===0&&(Lr=Ke(N.getDate()-ve.getDate())),Lr}function F(N){switch(N.getDay()){case 0:return new Date(N.getFullYear()-1,11,29);case 1:return N;case 2:return new Date(N.getFullYear(),0,3);case 3:return new Date(N.getFullYear(),0,2);case 4:return new Date(N.getFullYear(),0,1);case 5:return new Date(N.getFullYear()-1,11,31);case 6:return new Date(N.getFullYear()-1,11,30)}}function X(N){var ve=N.Cb;for(N=new Date(new Date(N.Db+1900,0,1).getTime());0<ve;){var Ke=N.getMonth(),Lr=(on(N.getFullYear())?$l:Al)[Ke];if(!(ve>Lr-N.getDate())){N.setDate(N.getDate()+ve);break}ve-=Lr-N.getDate()+1,N.setDate(1),11>Ke?N.setMonth(Ke+1):(N.setMonth(0),N.setFullYear(N.getFullYear()+1))}return Ke=new Date(N.getFullYear()+1,0,4),ve=F(new Date(N.getFullYear(),0,4)),Ke=F(Ke),0>=R(ve,N)?0>=R(Ke,N)?N.getFullYear()+1:N.getFullYear():N.getFullYear()-1}d>>>=0,m>>>=0,y>>>=0,x>>>=0;var Q=s()[x+40>>>2>>>0];for(var le in x={lc:i()[x>>>2>>>0],kc:i()[x+4>>>2>>>0],Ib:i()[x+8>>>2>>>0],Mb:i()[x+12>>>2>>>0],Jb:i()[x+16>>>2>>>0],Db:i()[x+20>>>2>>>0],vb:i()[x+24>>>2>>>0],Cb:i()[x+28>>>2>>>0],sc:i()[x+32>>>2>>>0],jc:i()[x+36>>>2>>>0],mc:Q?Ze(Q):""},y=Ze(y),Q={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})y=y.replace(new RegExp(le,"g"),Q[le]);var Te="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),De="January February March April May June July August September October November December".split(" ");for(le in Q={"%a":N=>Te[N.vb].substring(0,3),"%A":N=>Te[N.vb],"%b":N=>De[N.Jb].substring(0,3),"%B":N=>De[N.Jb],"%C":N=>P((N.Db+1900)/100|0,2),"%d":N=>P(N.Mb,2),"%e":N=>T(N.Mb,2," "),"%g":N=>X(N).toString().substring(2),"%G":X,"%H":N=>P(N.Ib,2),"%I":N=>((N=N.Ib)==0?N=12:12<N&&(N-=12),P(N,2)),"%j":N=>{for(var ve=0,Ke=0;Ke<=N.Jb-1;ve+=(on(N.Db+1900)?$l:Al)[Ke++]);return P(N.Mb+ve,3)},"%m":N=>P(N.Jb+1,2),"%M":N=>P(N.kc,2),"%n":()=>`
`,"%p":N=>0<=N.Ib&&12>N.Ib?"AM":"PM","%S":N=>P(N.lc,2),"%t":()=>"	","%u":N=>N.vb||7,"%U":N=>P(Math.floor((N.Cb+7-N.vb)/7),2),"%V":N=>{var ve=Math.floor((N.Cb+7-(N.vb+6)%7)/7);if(2>=(N.vb+371-N.Cb-2)%7&&ve++,ve)ve==53&&((Ke=(N.vb+371-N.Cb)%7)==4||Ke==3&&on(N.Db)||(ve=1));else{ve=52;var Ke=(N.vb+7-N.Cb-1)%7;(Ke==4||Ke==5&&on(N.Db%400-1))&&ve++}return P(ve,2)},"%w":N=>N.vb,"%W":N=>P(Math.floor((N.Cb+7-(N.vb+6)%7)/7),2),"%y":N=>(N.Db+1900).toString().substring(2),"%Y":N=>N.Db+1900,"%z":N=>{var ve=0<=(N=N.jc);return N=Math.abs(N)/60,(ve?"+":"-")+("0000"+(N/60*100+N%60)).slice(-4)},"%Z":N=>N.mc,"%%":()=>"%"},y=y.replace(/%%/g,"\0\0"),Q)y.includes(le)&&(y=y.replace(new RegExp(le,"g"),Q[le](x)));return le=function(N){var ve=Array(la(N)+1);return Uu(N,ve,0,ve.length),ve}(y=y.replace(/\0\0/g,"%")),le.length>m?0:(D_(le,d),le.length-1)}function B_(d,m,y,x){return Ol(d>>>0,m>>>0,y>>>0,x>>>0)}h||function(){for(var d=c.numThreads-1;d--;)Nu();Xe.unshift(()=>{kr++,function(m){h?m():Promise.all(gr.map(Lu)).then(m)}(()=>Iu())})}();for(var Pl=Array(256),co=0;256>co;++co)Pl[co]=String.fromCharCode(co);tl=Pl,yr=c.BindingError=class extends Error{constructor(d){super(d),this.name="BindingError"}},c.InternalError=class extends Error{constructor(d){super(d),this.name="InternalError"}},cr.push(0,1,void 0,1,null,1,!0,1,!1,1),c.count_emval_handles=()=>cr.length/2-5-da.length;var L_=[sa,Cu,zu,Vu,Gu,Wu,Hu,qu,Ku,ju,Xu,Zu,Ju,Yu,Qu,el,ml,hl,_l,wl,vl,Tl,Il,Sl],ae=function(){function d(y,x){return ae=y.exports,ae=function(){var T=ae,P={};for(let[R,F]of Object.entries(T))P[R]=typeof F=="function"?(...X)=>{ao.push(R);try{return F(...X)}finally{ft||(ao.pop(),Xt&&_r===1&&ao.length===0&&(_r=0,Dr+=1,io(Rl),typeof Fibers<"u"&&Fibers.tc()))}}:F;return P}(),ae=function(){var T=ae,P=F=>X=>F(X)>>>0,R=F=>()=>F()>>>0;return(T=Object.assign({},T)).Da=P(T.Da),T.gb=R(T.gb),T.ib=P(T.ib),T.emscripten_main_runtime_thread_id=R(T.emscripten_main_runtime_thread_id),T.tb=P(T.tb),T.ub=R(T.ub),T}(),ku.push(ae.jb),Nt.unshift(ae.Ca),Re=x,Iu(),ae}var m=Pu();if(kr++,c.instantiateWasm)try{return c.instantiateWasm(m,d)}catch(y){M(`Module.instantiateWasm callback failed with error: ${y}`),f(y)}return na||=c.locateFile?Su("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":c.locateFile?c.locateFile("ort-wasm-simd-threaded.jsep.wasm",E):E+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(y,x){var T=na;return L||typeof WebAssembly.instantiateStreaming!="function"||Su(T)||$u(T)||typeof fetch!="function"?Ou(T,y,x):fetch(T,{credentials:"same-origin"}).then(P=>WebAssembly.instantiateStreaming(P,y).then(x,function(R){return M(`wasm streaming compile failed: ${R}`),M("falling back to ArrayBuffer instantiation"),Ou(T,y,x)}))}(m,function(y){d(y.instance,y.module)}).catch(f),{}}(),El=d=>(El=ae.Da)(d),Cl=()=>(Cl=ae.Ea)();c._OrtInit=(d,m)=>(c._OrtInit=ae.Fa)(d,m),c._OrtGetLastError=(d,m)=>(c._OrtGetLastError=ae.Ga)(d,m),c._OrtCreateSessionOptions=(d,m,y,x,T,P,R,F,X,Q)=>(c._OrtCreateSessionOptions=ae.Ha)(d,m,y,x,T,P,R,F,X,Q),c._OrtAppendExecutionProvider=(d,m)=>(c._OrtAppendExecutionProvider=ae.Ia)(d,m),c._OrtAddFreeDimensionOverride=(d,m,y)=>(c._OrtAddFreeDimensionOverride=ae.Ja)(d,m,y),c._OrtAddSessionConfigEntry=(d,m,y)=>(c._OrtAddSessionConfigEntry=ae.Ka)(d,m,y),c._OrtReleaseSessionOptions=d=>(c._OrtReleaseSessionOptions=ae.La)(d),c._OrtCreateSession=(d,m,y)=>(c._OrtCreateSession=ae.Ma)(d,m,y),c._OrtReleaseSession=d=>(c._OrtReleaseSession=ae.Na)(d),c._OrtGetInputOutputCount=(d,m,y)=>(c._OrtGetInputOutputCount=ae.Oa)(d,m,y),c._OrtGetInputName=(d,m)=>(c._OrtGetInputName=ae.Pa)(d,m),c._OrtGetOutputName=(d,m)=>(c._OrtGetOutputName=ae.Qa)(d,m),c._OrtFree=d=>(c._OrtFree=ae.Ra)(d),c._OrtCreateTensor=(d,m,y,x,T,P)=>(c._OrtCreateTensor=ae.Sa)(d,m,y,x,T,P),c._OrtGetTensorData=(d,m,y,x,T)=>(c._OrtGetTensorData=ae.Ta)(d,m,y,x,T),c._OrtReleaseTensor=d=>(c._OrtReleaseTensor=ae.Ua)(d),c._OrtCreateRunOptions=(d,m,y,x)=>(c._OrtCreateRunOptions=ae.Va)(d,m,y,x),c._OrtAddRunConfigEntry=(d,m,y)=>(c._OrtAddRunConfigEntry=ae.Wa)(d,m,y),c._OrtReleaseRunOptions=d=>(c._OrtReleaseRunOptions=ae.Xa)(d),c._OrtCreateBinding=d=>(c._OrtCreateBinding=ae.Ya)(d),c._OrtBindInput=(d,m,y)=>(c._OrtBindInput=ae.Za)(d,m,y),c._OrtBindOutput=(d,m,y,x)=>(c._OrtBindOutput=ae._a)(d,m,y,x),c._OrtClearBoundOutputs=d=>(c._OrtClearBoundOutputs=ae.$a)(d),c._OrtReleaseBinding=d=>(c._OrtReleaseBinding=ae.ab)(d),c._OrtRunWithBinding=(d,m,y,x,T)=>(c._OrtRunWithBinding=ae.bb)(d,m,y,x,T),c._OrtRun=(d,m,y,x,T,P,R,F)=>(c._OrtRun=ae.cb)(d,m,y,x,T,P,R,F),c._OrtEndProfiling=d=>(c._OrtEndProfiling=ae.db)(d),c._JsepOutput=(d,m,y)=>(c._JsepOutput=ae.eb)(d,m,y),c._JsepGetNodeName=d=>(c._JsepGetNodeName=ae.fb)(d);var fo,sn=()=>(sn=ae.gb)(),Zt=c._free=d=>(Zt=c._free=ae.hb)(d),po=c._malloc=d=>(po=c._malloc=ae.ib)(d),wa=(d,m,y,x,T,P)=>(wa=ae.lb)(d,m,y,x,T,P),kl=()=>(kl=ae.mb)(),Dl=(d,m,y,x,T)=>(Dl=ae.nb)(d,m,y,x,T),va=d=>(va=ae.ob)(d),mo=d=>(mo=ae.pb)(d),Bl=()=>(Bl=ae.qb)(),Ll=(d,m)=>(Ll=ae.rb)(d,m),ho=d=>(ho=ae.sb)(d),Ta=d=>(Ta=ae.tb)(d),Ia=()=>(Ia=ae.ub)(),Nl=c.dynCall_ii=(d,m)=>(Nl=c.dynCall_ii=ae.wb)(d,m),zl=d=>(zl=ae.xb)(d),Rl=()=>(Rl=ae.yb)(),Ml=d=>(Ml=ae.zb)(d),Fl=()=>(Fl=ae.Ab)();function Vl(){0<kr||(h?(l(c),h||ro(Nt),startWorker(c)):(ro(Xe),0<kr||fo||(fo=!0,c.calledRun=!0,ft||(h||ro(Nt),l(c),h||ro(ta)))))}return c.___start_em_js=932181,c.___stop_em_js=932427,c.stackSave=()=>Ia(),c.stackRestore=d=>ho(d),c.stackAlloc=d=>Ta(d),c.setValue=function(d,m,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":e()[d>>>0]=m;break;case"i16":t()[d>>>1>>>0]=m;break;case"i32":i()[d>>>2>>>0]=m;break;case"i64":G[d>>>3]=BigInt(m);break;case"float":a()[d>>>2>>>0]=m;break;case"double":u()[d>>>3>>>0]=m;break;case"*":s()[d>>>2>>>0]=m;break;default:br(`invalid type for setValue: ${y}`)}},c.getValue=function(d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":return e()[d>>>0];case"i16":return t()[d>>>1>>>0];case"i32":return i()[d>>>2>>>0];case"i64":return G[d>>>3];case"float":return a()[d>>>2>>>0];case"double":return u()[d>>>3>>>0];case"*":return s()[d>>>2>>>0];default:br(`invalid type for getValue: ${m}`)}},c.UTF8ToString=Ze,c.stringToUTF8=nn,c.lengthBytesUTF8=la,An=function d(){fo||Vl(),fo||(An=d)},Vl(),c.PTR_SIZE=4,p}),m2=Oh;globalThis.self?.name==="em-pthread"&&Oh()});var Dh,h2,St,Bh,Ms,b2,g2,Lh,y2,Ch,Nh,kh,zh,fi=k(()=>{"use strict";ci();Dh=!1||typeof location>"u"?void 0:location.origin,h2=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.all.bundle.min.mjs",import.meta.url).href,Dh).href:import.meta.url},St=h2(),Bh=()=>{if(St&&!St.startsWith("blob:"))return St.substring(0,St.lastIndexOf("/")+1)},Ms=(r,e)=>{try{let n=e??St;return(n?new URL(r,n):new URL(r)).origin===Dh}catch{return!1}},b2=(r,e)=>{let n=e??St;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},g2=(r,e)=>`${e??"./"}${r}`,Lh=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},y2=async r=>(await import(/*webpackIgnore:true*/r)).default,Ch=(Ah(),On($h)).default,Nh=async()=>{if(!St)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ms(St))return[void 0,Ch()];let r=await Lh(St);return[r,Ch(r)]},kh=(Eh(),On(Ph)).default,zh=async(r,e,n)=>{if(!r&&!e&&kh&&St&&Ms(St))return[void 0,kh];{let t="ort-wasm-simd-threaded.jsep.mjs",o=r??b2(t,e),i=!!1&&n&&o&&!Ms(o,e),s=i?await Lh(o):o??g2(t,e);return[i?s:void 0,await y2(s)]}}});var Fs,Vs,_i,Rh,x2,_2,di,je,Or=k(()=>{"use strict";fi();Vs=!1,_i=!1,Rh=!1,x2=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},_2=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},di=async r=>{if(Vs)return Promise.resolve();if(_i)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Rh)throw new Error("previous call to 'initializeWebAssembly()' failed.");_i=!0;let e=r.initTimeout,n=r.numThreads;if(!_2())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=x2();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,f=r.wasmBinary,[c,p]=await zh(a,i,n>1),g=!1,b=[];if(e>0&&b.push(new Promise(h=>{setTimeout(()=>{g=!0,h()},e)})),b.push(new Promise((h,v)=>{let w={numThreads:n};if(f)w.wasmBinary=f;else if(l||i)w.locateFile=_=>l??i+_;else if(a&&a.indexOf("blob:")!==0)w.locateFile=_=>new URL(_,a).href;else if(c){let _=Bh();_&&(w.locateFile=I=>_+I)}p(w).then(_=>{_i=!1,Vs=!0,Fs=_,h(),c&&URL.revokeObjectURL(c)},_=>{_i=!1,Rh=!0,v(_)})})),await Promise.race(b),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},je=()=>{if(Vs&&Fs)return Fs;throw new Error("WebAssembly is not initialized yet.")}});var nt,qn,$e,wi=k(()=>{"use strict";Or();nt=(r,e)=>{let n=je(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},qn=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")qn(i,s+".",n,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},$e=r=>{let e=je(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),s=e.getValue(o+t,"*"),a=s?e.UTF8ToString(s):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{e.stackRestore(n)}}});var Mh,Fh=k(()=>{"use strict";Or();wi();Mh=r=>{let e=je(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=nt(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&$e("Can't create run options."),r?.extra!==void 0&&qn(r.extra,"",new WeakSet,(s,a)=>{let u=nt(s,t),l=nt(a,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&$e(`Can't set a run config entry: ${s} - ${a}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(s=>e._free(s)),i}}});var w2,v2,T2,I2,Vh,Gh=k(()=>{"use strict";Or();wi();w2=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},v2=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},T2=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},I2=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=nt("deviceType",n),l=nt(a,n);je()._OrtAddSessionConfigEntry(r,u,l)!==0&&$e(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=nt("preferredLayout",n),u=nt(s.preferredLayout,n);je()._OrtAddSessionConfigEntry(r,a,u)!==0&&$e(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=nt(o,n);je()._OrtAppendExecutionProvider(r,i)!==0&&$e(`Can't append execution provider: ${o}.`)}},Vh=r=>{let e=je(),n=0,t=[],o=r||{};T2(o);try{let i=w2(o.graphOptimizationLevel??"all"),s=v2(o.executionMode??"sequential"),a=typeof o.logId=="string"?nt(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let f=typeof o.optimizedModelFilePath=="string"?nt(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,f),n===0&&$e("Can't create session options."),o.executionProviders&&I2(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=nt("enableGraphCapture",t),p=nt(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,c,p)!==0&&$e(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let g=nt(c,t);e._OrtAddFreeDimensionOverride(n,g,p)!==0&&$e(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&qn(o.extra,"",new WeakSet,(c,p)=>{let g=nt(c,t),b=nt(p,t);e._OrtAddSessionConfigEntry(n,g,b)!==0&&$e(`Can't set a session config entry: ${c} - ${p}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),t.forEach(s=>e._free(s)),i}}});var Kn,Pr,Jr,vi,jn,Ti,Ii,Gs,fe=k(()=>{"use strict";Kn=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Pr=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},Jr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},vi=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},jn=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Ti=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Ii=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Gs=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var Xn,Us=k(()=>{"use strict";ci();Xn=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=Sa("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Sa("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var S2,$2,Uh,Wh,Si,A2,we,rr=k(()=>{"use strict";fe();S2=["V","I","W","E","F"],$2=(r,e)=>{console.log(`[${S2[r]},${new Date().toISOString()}]${e}`)},Si=(r,e)=>{Uh=r,Wh=e},A2=(r,e)=>{let n=jn(r),t=jn(Uh);n>=t&&$2(n,typeof e=="function"?e():e)},we=(...r)=>{Wh&&A2(...r)}});var $i,Ws=k(()=>{"use strict";fe();$i=(r,e)=>new(vi(e))(r)});var Ai=k(()=>{"use strict"});var Hh,Hs,qs,O2,P2,qh,js,Ks,jh,Xh=k(()=>{"use strict";rr();Ai();Hh=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Hs=[],qs=r=>Math.ceil(Number(r)/16)*16,O2=r=>{for(let e=0;e<Hs.length;e++){let n=Hs[e];if(r<=n)return n}return Math.ceil(r/16)*16},P2=1,qh=()=>P2++,js=async(r,e,n,t)=>{let o=qs(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=r.getCommandEncoder();r.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},Ks=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Hh)Hs.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,s=qs(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),u.destroy(),we("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=qs(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=qh();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),we("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=O2(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let a={id:qh(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),we("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return we("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await js(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Hh.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(we("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},jh=(...r)=>new Ks(...r)});var Xs,de,qe=k(()=>{"use strict";Xs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},de=r=>new Xs(r)});var Zs,nr,C,Yr,Oi,Zh,Jh,he=k(()=>{"use strict";Zs=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},nr=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Zs.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;let c=Math.max(l,f);if(l&&f)a[s-u]=Math.max(l,f);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},C=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Yr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(s?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Oi=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!nr.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Zh=-34028234663852886e22,Jh=34028234663852886e22});var Qr,Ys,ze,ot,W,Oe,Qs,en,Ut,ee,Pi,B,V,Yh,Ei,Js,Qh,ye=k(()=>{"use strict";fe();he();Qr=64,Ys=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},ze=(r,e=1)=>{let n=Ys(r,e);return typeof n=="string"?n:n[0]},ot=(r,e=1)=>{let n=Ys(r,e);return typeof n=="string"?n:n[1]},W=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:C.computeStrides(n)})}),e},Oe=r=>r%4===0?4:r%2===0?2:1,Qs=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,en=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,Ut=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,ee=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Pi=(r,e,n,t,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Ys(e,o),f=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],p={indices:u,value:f,storage:c,tensor:e},g=G=>typeof G=="string"?G:`${G}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",v=`${h}${r}_shape`,w=`${h}${r}_strides`,_="";for(let G=0;G<s-1;G++)_+=`
    let dim${G} = current / ${ee(w,G,s)};
    let rest${G} = current % ${ee(w,G,s)};
    indices[${G}] = dim${G};
    current = rest${G};
    `;_+=`indices[${s-1}] = current;`;let I=s<2?"":`
  fn o2i_${r}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${_}
    return indices;
  }`,$=G=>(b.offsetToIndices=!0,s<2?G:`o2i_${r}(${G})`),O=[];if(s>=2)for(let G=s-1;G>=0;G--)O.push(`${ee(w,G,s)} * (indices[${G}])`);let E=s<2?"":`
  fn i2o_${r}(indices: ${p.indices}) -> u32 {
    return ${O.join("+")};
  }`,L=G=>(b.indicesToOffset=!0,s<2?G:`i2o_${r}(${G})`),z=(...G)=>s===0?"0u":`${p.indices}(${G.map(g).join(",")})`,U=(G,ne)=>s<2?`${G}`:`${ee(G,ne,s)}`,K=(G,ne,ke)=>s<2?`${G}=${ke};`:`${ee(G,ne,s)}=${ke};`,M={},oe=(G,ne)=>{b.broadcastedIndicesToOffset=!0;let ke=`${ne.name}broadcastedIndicesTo${r}Offset`;if(ke in M)return`${ke}(${G})`;let ft=[];for(let Ae=s-1;Ae>=0;Ae--){let Xe=ne.indicesGet("outputIndices",Ae+ne.rank-s);ft.push(`${U(w,Ae)} * (${Xe} % ${U(v,Ae)})`)}return M[ke]=`fn ${ke}(outputIndices: ${ne.type.indices}) -> u32 {
             return ${ft.length>0?ft.join("+"):"0u"};
           }`,`${ke}(${G})`},q=(G,ne)=>(()=>{if(p.storage===p.value)return`${r}[${G}]=${ne};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${r}[${G}]=vec2<u32>(u32(${ne}), select(0u, 0xFFFFFFFFu, ${ne} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${r}[${G}]=vec2<u32>(u32(${ne}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${r}[${G}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${ne}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),te=G=>(()=>{if(p.storage===p.value)return`${r}[${G}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${r}[${G}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${r}[${G}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${G}] & 0xFFu), bool(${r}[${G}] & 0xFF00u), bool(${r}[${G}] & 0xFF0000u), bool(${r}[${G}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),Re=s<2?"":`
  fn get_${r}ByIndices(indices: ${p.indices}) -> ${f} {
    return ${te(`i2o_${r}(indices)`)};
  }`,Z=s<2?"":(()=>{let G=a.map(ke=>`d${ke}: u32`).join(", "),ne=a.map(ke=>`d${ke}`).join(", ");return`
  fn get_${r}(${G}) -> ${f} {
    return get_${r}ByIndices(${z(ne)});
  }`})(),Y=(...G)=>{if(G.length!==s)throw new Error(`indices length must be ${s}`);let ne=G.map(g).join(",");return s===0?te("0u"):s===1?te(ne[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}(${ne})`)},be=G=>s<2?te(G):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}ByIndices(${G})`),ue=s<2?"":`
  fn set_${r}ByIndices(indices: ${p.indices}, value: ${f}) {
    ${q(`i2o_${r}(indices)`,"value")}
  }`,Me=s<2?"":(()=>{let G=a.map(ke=>`d${ke}: u32`).join(", "),ne=a.map(ke=>`d${ke}`).join(", ");return`
  fn set_${r}(${G}, value: ${f}) {
    set_${r}ByIndices(${z(ne)}, value);
  }`})();return{impl:()=>{let G=[],ne=!1;return b.offsetToIndices&&(G.push(I),ne=!0),b.indicesToOffset&&(G.push(E),ne=!0),b.broadcastedIndicesToOffset&&(Object.values(M).forEach(ke=>G.push(ke)),ne=!0),b.set&&(G.push(Me),ne=!0),b.setByIndices&&(G.push(ue),ne=!0),b.get&&(G.push(Z),ne=!0),b.getByIndices&&(G.push(Re),ne=!0),!i&&ne&&G.unshift(`const ${v} = ${p.indices}(${n.join(",")});`,`const ${w} = ${p.indices}(${C.computeStrides(n).join(",")});`),G.join(`
`)},type:p,offsetToIndices:$,indicesToOffset:L,broadcastedIndicesToOffset:oe,indices:z,indicesGet:U,indicesSet:K,set:(...G)=>{if(G.length!==s+1)throw new Error(`indices length must be ${s}`);let ne=G[s];if(typeof ne!="string")throw new Error("value must be string");let ke=G.slice(0,s).map(g).join(",");return s===0?q("0u",ne):s===1?q(ke[0],ne):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}(${ke}, ${ne})`)},setByOffset:q,setByIndices:(G,ne)=>s<2?q(G,ne):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}ByIndices(${G}, ${ne});`),get:Y,getByOffset:te,getByIndices:be,usage:t,name:r,strides:w,shape:v,rank:s}},B=(r,e,n,t=1)=>Pi(r,e,n,"input",t),V=(r,e,n,t=1)=>Pi(r,e,n,"output",t),Yh=(r,e,n)=>Pi(r,e,n,"atomicOutput",1),Ei=(r,e,n,t=1)=>Pi(r,e,n,"internal",t),Js=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Qr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},Qh=(r,e)=>new Js(r,e)});var E2,eb,C2,k2,D2,B2,it,tb,rb,mr=k(()=>{"use strict";fe();he();qe();ye();E2=(r,e)=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==r[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${r[0].dims.length}`)},eb=(r,e)=>e.length!==0?e:[...new Array(r).keys()].reverse(),C2=(r,e)=>C.sortBasedOnPerm(r,eb(r.length,e)),k2=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=`a[${r[i]}]=i[${i}];`;return o+="return a;}"},D2=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},B2=(r,e)=>{let n=0;for(let t=0;t<r.length;++t)if(e[r[t]]!==1){if(r[t]<n)return!1;n=r[t]}return!0},it=(r,e)=>{let n=r.dataType,t=r.dims.length,o=eb(t,e),i=C2(r.dims,o),s=r.dims,a=i,u=t<2||B2(o,r.dims),l;if(u)return l=h=>{let v=B("input",n,s,4),w=V("output",n,a,4);return`
  ${h.registerUniform("output_size","u32").declareVariables(v,w)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let h=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(h/4)}]}},getShaderSource:l};let{newShape:f,newPerm:c}=D2(r.dims,o),p=C.areEqual(c,[2,3,1]),g=C.areEqual(c,[3,1,2]);if(f.length===2||p||g){s=p?[f[0],f[1]*f[2]]:g?[f[0]*f[1],f[2]]:f,a=[s[1],s[0]];let h=16;return l=v=>{let w=B("a",n,s.length),_=V("output",n,a.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(w,_)}
  var<workgroup> tile : array<array<${_.type.value}, ${h+1}>, ${h}>;
  ${v.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${_.setByIndices(`${_.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(a[1]/h),y:Math.ceil(a[0]/h)},programUniforms:[{type:12,data:v},...W(s,a)]}},getShaderSource:l}}return l=h=>{let v=B("a",n,s.length),w=V("output",n,a.length);return`
  ${h.registerUniform("output_size","u32").declareVariables(v,w)}

  ${k2(o,t,v,w)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let h=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...W(s,a)]}},getShaderSource:l}},tb=(r,e)=>{E2(r.inputs,e.perm),r.compute(it(r.inputs[0],e.perm))},rb=r=>de({perm:r.perm})});var L2,N2,z2,R2,M2,F2,V2,G2,U2,W2,or,nb,ob,ib,ab,sb,ub,lb,cb,fb,db,pb=k(()=>{"use strict";fe();he();ye();Ci();mr();L2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},N2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},z2={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},R2={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},M2=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},F2=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},V2=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},G2=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},U2=(r,e)=>{let n=[];if(!G2(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},W2=(r,e,n,t,o,i,s)=>{let a=n[0].dims,u=C.size(i),l=C.size(s),f=B("_A",n[0].dataType,a),c=V("output",o,i),p=64;u===1&&(p=256);let g=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,b=h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(f,c)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${z2[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${L2[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${N2[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${t==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${R2[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${p}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},or=(r,e,n,t)=>{let o=r.inputs.length===1?n:eu(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((g,b)=>b));let s=C.normalizeAxes(i,r.inputs[0].dims.length),a=s,u=r.inputs[0],l=U2(a,r.inputs[0].dims.length);l.length>0&&(u=r.compute(it(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=M2(a.length,u.dims.length));let[f,c]=F2(u.dims,a),p=f;o.keepDims&&(p=V2(f,s)),r.compute(W2(e,o.cacheKey,[u],t,r.inputs[0].dataType,p,c),{inputs:[u]})},nb=(r,e)=>{or(r,"ReduceMeanShared",e,"mean")},ob=(r,e)=>{or(r,"ReduceL1Shared",e,"l1")},ib=(r,e)=>{or(r,"ReduceL2Shared",e,"l2")},ab=(r,e)=>{or(r,"ReduceLogSumExpShared",e,"logSumExp")},sb=(r,e)=>{or(r,"ReduceMaxShared",e,"max")},ub=(r,e)=>{or(r,"ReduceMinShared",e,"min")},lb=(r,e)=>{or(r,"ReduceProdShared",e,"prod")},cb=(r,e)=>{or(r,"ReduceSumShared",e,"sum")},fb=(r,e)=>{or(r,"ReduceSumSquareShared",e,"sumSquare")},db=(r,e)=>{or(r,"ReduceLogSumShared",e,"logSum")}});var ir,H2,ki,eu,ar,q2,K2,j2,X2,Z2,J2,Y2,Q2,e1,t1,sr,mb,hb,bb,gb,yb,xb,_b,wb,vb,Tb,Ci=k(()=>{"use strict";fe();he();qe();ye();pb();ir=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},H2=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],ki=(r,e,n,t,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,f=l.length,c=C.normalizeAxes(o,f),p=!a&&c.length===0;l.forEach((v,w)=>{p||c.indexOf(w)>=0?s&&u.push(1):u.push(v)});let g=u.length,b=C.size(u);return{name:r,shaderCache:e,getShaderSource:v=>{let w=[],_=B("_A",n[0].dataType,f),I=V("output",i,g),$=t(_,I,c),O=$[2];for(let E=0,L=0;E<f;E++)p||c.indexOf(E)>=0?(s&&L++,O=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${_.indicesSet("input_indices",E,`j${E}`)}
                  ${O}
                }`):(w.push(`${_.indicesSet("input_indices",E,I.indicesGet("output_indices",L))};`),L++);return`

        ${v.registerUniform("output_size","u32").declareVariables(_,I)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${_.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${w.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${O}
          ${$[3]}
          ${$.length===4?I.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...W(l,u)]})}},eu=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),de({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},ar=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:eu(o,n);r.compute(ki(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?H2:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},q2=(r,e)=>{ir(r.inputs),ar(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},K2=(r,e)=>{ir(r.inputs),ar(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},j2=(r,e)=>{ir(r.inputs),ar(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},X2=(r,e)=>{ir(r.inputs),ar(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},Z2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},J2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=r.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Y2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},Q2=(r,e)=>{ir(r.inputs),ar(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},e1=(r,e)=>{ir(r.inputs),ar(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},t1=(r,e)=>{ir(r.inputs),ar(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},sr=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},mb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?J2(r,e):nb(r,e)},hb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?K2(r,e):ob(r,e)},bb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?j2(r,e):ib(r,e)},gb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?X2(r,e):ab(r,e)},yb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Z2(r,e):sb(r,e)},xb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Y2(r,e):ub(r,e)},_b=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Q2(r,e):lb(r,e)},wb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?e1(r,e):cb(r,e)},vb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?t1(r,e):fb(r,e)},Tb=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?q2(r,e):db(r,e)}});var Ib,Sb,$b,tu,Ab=k(()=>{"use strict";fe();qe();Ci();Ib=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},Sb=(r,e)=>{Ib(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(ki("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},$b=(r,e)=>{Ib(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(ki("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},tu=r=>de(r)});var r1,ru,n1,o1,i1,vn,a1,Ob,Di=k(()=>{"use strict";fe();he();Ai();ye();r1=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4],a=r[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,g=p;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=e.qkvHiddenSizes[0],p=e.qkvHiddenSizes[1],g=e.qkvHiddenSizes[2]}let b=l;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let v=b+h,w=-1,_=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:b,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:f,hiddenSize:c,vHiddenSize:g,headSize:Math.floor(c/e.numHeads),vHeadSize:Math.floor(g/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:_,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},ru=(r,e,n)=>e&&r?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${r?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,n1=(r,e,n,t,o,i,s,a)=>{let u=Oe(s?1:i),l=64,f=i/u;f<l&&(l=32);let c=Math.ceil(i/u/l),p=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:f},{type:12,data:c}],g=ze(r.dataType,u),b=ot(1,u),h=["type"];s&&h.push("type"),a&&h.push("type");let v=w=>{let _=V("x",r.dataType,r.dims,u),I=[_],$=s?B("seq_lens",s.dataType,s.dims):void 0;$&&I.push($);let O=a?B("total_sequence_length_input",a.dataType,a.dims):void 0;O&&I.push(O);let E=ot(r.dataType),L=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${w.registerUniforms(L).declareVariables(...I)}
  ${w.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ru($,O,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${g};${u}`,inputDependencies:h},getShaderSource:v,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:e*n},programUniforms:p})}},o1=(r,e,n,t,o,i,s,a,u)=>{let l=s+i.kvSequenceLength,f=[i.batchSize,i.numHeads,i.sequenceLength,l],c=r>1&&t,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=c?[i.batchSize,p,l,i.headSize]:void 0,b=i.nReps?i.nReps:1,h=i.scale===0?1/Math.sqrt(i.headSize):i.scale,v=Oe(i.headSize),w=i.headSize/v,_=12,I={x:Math.ceil(l/_),y:Math.ceil(i.sequenceLength/_),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:w},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:h},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:b}],O=c&&t&&C.size(t.dims)>0,E=["type","type"];O&&E.push("type"),o&&E.push("type"),a&&E.push("type"),u&&E.push("type");let L=[{dims:f,dataType:e.dataType,gpuDataType:0}];c&&L.push({dims:g,dataType:e.dataType,gpuDataType:0});let z=U=>{let K=B("q",e.dataType,e.dims,v),M=B("key",n.dataType,n.dims,v),oe=[K,M];if(O){let ue=B("past_key",t.dataType,t.dims,v);oe.push(ue)}o&&oe.push(B("attention_bias",o.dataType,o.dims));let q=a?B("seq_lens",a.dataType,a.dims):void 0;q&&oe.push(q);let te=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;te&&oe.push(te);let Re=V("output",e.dataType,f),Z=[Re];c&&Z.push(V("present_key",e.dataType,g,v));let Y=ot(1,v),be=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${K.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${K.type.storage}, ${_*_}>;
  ${U.registerUniforms(be).declareVariables(...oe,...Z)}
  ${U.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ru(q,te,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${O&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Y}(0);
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
          value += ${Y}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(v){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${v}`)}})()};
        output[outputIdx] = ${Re.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${v};${o!==void 0};${t!==void 0};${r}`,inputDependencies:E},getRunData:()=>({outputs:L,dispatchGroup:I,programUniforms:$}),getShaderSource:z}},i1=(r,e,n,t,o,i,s=void 0,a=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,f=o.vHiddenSize*l,c=r>1&&t,p=o.kvNumHeads?o.kvNumHeads:o.numHeads,g=c?[o.batchSize,p,u,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,f],h=12,v={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},w=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],_=c&&t&&C.size(t.dims)>0,I=["type","type"];_&&I.push("type"),s&&I.push("type"),a&&I.push("type");let $=[{dims:b,dataType:e.dataType,gpuDataType:0}];c&&$.push({dims:g,dataType:e.dataType,gpuDataType:0});let O=E=>{let L=B("probs",e.dataType,e.dims),z=B("v",n.dataType,n.dims),U=[L,z];_&&U.push(B("past_value",t.dataType,t.dims));let K=s?B("seq_lens",s.dataType,s.dims):void 0;s&&U.push(K);let M=a?B("total_sequence_length_input",a.dataType,a.dims):void 0;a&&U.push(M);let q=[V("output",e.dataType,b)];c&&q.push(V("present_value",e.dataType,g));let te=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${L.type.value}, ${h*h}>;
  var<workgroup> tileV: array<${L.type.value}, ${h*h}>;
  ${E.registerUniforms(te).declareVariables(...U,...q)}
  ${E.mainStart([h,h,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ru(K,M,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${L.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>_&&c?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:I},getRunData:()=>({outputs:$,dispatchGroup:v,programUniforms:w}),getShaderSource:O}},vn=(r,e,n,t,o,i,s,a,u,l,f=void 0,c=void 0)=>{let p=Math.min(r.outputCount,1+(s?1:0)+(a?1:0)),g=p>1?l.pastSequenceLength:0,b=g+l.kvSequenceLength,h=u&&C.size(u.dims)>0?u:void 0,v=[e,n];p>1&&s&&C.size(s.dims)>0&&v.push(s),h&&v.push(h),f&&v.push(f),c&&v.push(c);let w=r.compute(o1(p,e,n,s,h,l,g,f,c),{inputs:v,outputs:p>1?[-1,1]:[-1]})[0];r.compute(n1(w,l.batchSize,l.numHeads,g,l.sequenceLength,b,f,c),{inputs:f&&c?[w,f,c]:[w],outputs:[]});let _=[w,t];p>1&&a&&C.size(a.dims)>0&&_.push(a),f&&_.push(f),c&&_.push(c),r.compute(i1(p,w,t,a,l,g,f,c),{inputs:_,outputs:p>1?[0,2]:[0]})},a1=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],f=c=>{let p=V("output_q",u[0].dataType,n),g=V("output_k",u[0].dataType,n),b=V("output_v",u[0].dataType,n),h=B("input",u[0].dataType,u[0].dims),v=B("weight",u[1].dataType,u[1].dims),w=B("bias",u[2].dataType,u[2].dims),_=h.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${_}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${_}, ${s*s}>;
  var<workgroup> tileWeightK: array<${_}, ${s*s}>;
  var<workgroup> tileWeightV: array<${_}, ${s*s}>;
  ${c.registerUniforms(I).declareVariables(h,v,w,p,g,b)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:f},{inputs:u,outputs:[-1,-1,-1]})},Ob=(r,e)=>{let n=r1(r.inputs,e),[t,o,i]=a1(r,n);return vn(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var s1,u1,l1,Pb,Eb=k(()=>{"use strict";dt();fe();he();qe();ye();s1=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},u1=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,s=t?Oe(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=C.size(i)/s,l=t,f=l?i.length:i,c=B("x",r[0].dataType,r[0].dims,s),p=B("scale",r[1].dataType,r[1].dims,a),g=B("bias",r[2].dataType,r[2].dims,a),b=B("inputMean",r[3].dataType,r[3].dims,a),h=B("inputVar",r[4].dataType,r[4].dims,a),v=V("y",r[0].dataType,f,s),w=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${v.indicesSet("outputIndices","0","0")}
            let cOffset = ${v.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<p.rank;$++)I+=`cIndices[${$}] = outputIndices[${$}];`;I+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return I},_=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(c,p,g,b,h,v)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${v.offsetToIndices(`global_idx * ${s}`)};
    ${w()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${v.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...W(i)]:[{type:12,data:u}]})}},l1=r=>de(r),Pb=(r,e)=>{let{inputs:n,outputCount:t}=r,o=l1({...e,outputCount:t});if(me.webgpu.validateInputContent&&s1(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(u1(n,o))}});var c1,f1,Cb,kb=k(()=>{"use strict";he();ye();c1=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},f1=r=>{let e=r[0].dims,n=r[0].dims[2],t=C.size(e)/4,o=r[0].dataType,i=B("input",o,e,4),s=B("bias",o,[n],4),a=B("residual",o,e,4),u=V("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(i,s,a,u)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Cb=r=>{c1(r.inputs),r.compute(f1(r.inputs))}});var d1,Ce,Db,Bb,Lb,Nb,zb,Rb,Mb,Fb,Vb,p1,Gb,Ub,Wb,Hb,Zn,qb,Bi,Kb,jb,Xb,Zb,Jb,Yb,Qb,eg,tg,rg,ng,og,ig,ag,sg,ug,lg,cg,nu,ou,fg,dg,pg,m1,h1,mg,Li=k(()=>{"use strict";fe();he();qe();ye();d1=(r,e,n,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=B("inputData",n,[a],4),f=V("outputData",t,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${r.registerUniforms(c).declareVariables(l,f)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",u)}
  }`},Ce=(r,e,n,t,o,i=r.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(C.size(r.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>d1(l,C.size(r.dims),r.dataType,i,n,t,a),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(C.size(l[0].dims)/64/4)},programUniforms:u})}},Db=r=>{r.compute(Ce(r.inputs[0],"Abs","abs"))},Bb=r=>{r.compute(Ce(r.inputs[0],"Acos","acos"))},Lb=r=>{r.compute(Ce(r.inputs[0],"Acosh","acosh"))},Nb=r=>{r.compute(Ce(r.inputs[0],"Asin","asin"))},zb=r=>{r.compute(Ce(r.inputs[0],"Asinh","asinh"))},Rb=r=>{r.compute(Ce(r.inputs[0],"Atan","atan"))},Mb=r=>{r.compute(Ce(r.inputs[0],"Atanh","atanh"))},Fb=r=>de(r),Vb=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(Ce(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},p1=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return de({min:e,max:n})},Gb=(r,e)=>{let n=e||p1(r.inputs),t=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Ub=r=>{r.compute(Ce(r.inputs[0],"Ceil","ceil"))},Wb=r=>{r.compute(Ce(r.inputs[0],"Cos","cos"))},Hb=r=>{r.compute(Ce(r.inputs[0],"Cosh","cosh"))},Zn=r=>de(r),qb=(r,e)=>{let n=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Bi=(r="f32")=>`
const r0: ${r} = 0.3275911;
const r1: ${r} = 0.254829592;
const r2: ${r} = -0.284496736;
const r3: ${r} = 1.421413741;
const r4: ${r} = -1.453152027;
const r5: ${r} = 1.061405429;

fn erf_vf32(v: vec4<${r}>) -> vec4<${r}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Kb=r=>{let e=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Bi(e)))},jb=r=>{r.compute(Ce(r.inputs[0],"Exp","exp"))},Xb=r=>{r.compute(Ce(r.inputs[0],"Floor","floor"))},Zb=r=>{let e=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Bi(e)))},Jb=(r,e)=>{let n=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},Yb=r=>{r.compute(Ce(r.inputs[0],"Not",e=>`!${e}`))},Qb=r=>{r.compute(Ce(r.inputs[0],"Neg",e=>`-${e}`))},eg=r=>{r.compute(Ce(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},tg=r=>{let e=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},rg=r=>{r.compute(Ce(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ng=r=>de(r),og=(r,e)=>{let n=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},ig=r=>{r.compute(Ce(r.inputs[0],"Sin","sin"))},ag=r=>{r.compute(Ce(r.inputs[0],"Sinh","sinh"))},sg=r=>{r.compute(Ce(r.inputs[0],"Sqrt","sqrt"))},ug=r=>{r.compute(Ce(r.inputs[0],"Tan","tan"))},lg=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,cg=r=>{r.compute(Ce(r.inputs[0],"Tanh",lg))},nu=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${lg("v")};
}
`,ou=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,fg=r=>{let e=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"FastGelu",ou,nu(e),void 0,r.inputs[0].dataType))},dg=(r,e)=>{let n=ot(r.inputs[0].dataType);return r.compute(Ce(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},pg=r=>{r.compute(Ce(r.inputs[0],"Log","log"))},m1=(r,e)=>`
const alpha = vec4<${r}>(${e});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,h1=r=>`quick_gelu_impl(${r})`,mg=(r,e)=>{let n=ot(r.inputs[0].dataType);r.compute(Ce(r.inputs[0],"QuickGelu",h1,m1(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var b1,g1,bg,gg=k(()=>{"use strict";he();ye();Li();b1=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},g1=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=B("input",r[0].dataType,r[0].dims,4),t=B("bias",r[0].dataType,[r[0].dims[2]],4),o=V("output",r[0].dataType,e,4),i=C.size(e)/4,s=ze(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Bi(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},bg=r=>{b1(r.inputs),r.compute(g1(r.inputs))}});var y1,x1,ur,yg,xg,_g,wg,vg,Tg,Ig,Sg,$g,Ag,Og=k(()=>{"use strict";fe();he();ye();y1=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p,g;typeof a=="string"?p=g=(_,I)=>`${a}((${_}),(${I}))`:typeof a=="function"?p=g=a:(p=a.scalar,g=a.vector);let b=V("outputData",f,t.length,4),h=B("aData",u,e.length,4),v=B("bData",l,n.length,4),w;if(o)if(i){let _=C.size(e)===1,I=C.size(n)===1,$=e.length>0&&e[e.length-1]%4===0,O=n.length>0&&n[n.length-1]%4===0;_||I?w=b.setByOffset("global_idx",g(_?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),I?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"))):w=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${v.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",g(s||$?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||O?v.getByOffset("offsetB / 4u"):`${v.type.value}(${v.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=b.setByOffset("global_idx",g(h.getByOffset("global_idx"),v.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(I,$,O="")=>{let E=`aData[indexA${$}][componentA${$}]`,L=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${b.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let offsetB${$} = ${v.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${I}[${$}] = ${O}(${p(E,L)});
          `};f===9?w=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(h,v,b)}

        ${c??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},x1=(r,e,n,t,o,i,s=n.dataType)=>{let a=n.dims.map(h=>Number(h)??1),u=t.dims.map(h=>Number(h)??1),l=!C.areEqual(a,u),f=a,c=C.size(a),p=!1,g=!1,b=[l];if(l){let h=nr.calcShape(a,u,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");f=h.slice(),c=C.size(f);let v=C.size(a)===1,w=C.size(u)===1,_=a.length>0&&a[a.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;b.push(v),b.push(w),b.push(_),b.push(I);let $=1;for(let O=1;O<f.length;O++){let E=a[a.length-O],L=u[u.length-O];if(E===L)$*=E;else break}$%4===0?(g=!0,p=!0):(v||w||_||I)&&(p=!0)}else p=!0;return b.push(p),{name:r,shaderCache:{hint:e+b.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>y1(h,a,u,f,p,l,g,o,n.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(f)/4)},...W(a,u,f)]})}},ur=(r,e,n,t,o,i)=>{r.compute(x1(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},yg=r=>{ur(r,"Add",(e,n)=>`${e}+${n}`)},xg=r=>{ur(r,"Div",(e,n)=>`${e}/${n}`)},_g=r=>{ur(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},wg=r=>{ur(r,"Mul",(e,n)=>`${e}*${n}`)},vg=r=>{let e=B("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;ur(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},Tg=r=>{ur(r,"Sub",(e,n)=>`${e}-${n}`)},Ig=r=>{ur(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},Sg=r=>{ur(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},$g=r=>{ur(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Ag=r=>{ur(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var w1,v1,T1,I1,Pg,Eg,Cg=k(()=>{"use strict";fe();he();qe();ye();w1=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},v1=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,T1=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},I1=(r,e,n,t)=>{let o=C.size(n),i=new Array(r.length),s=new Array(r.length),a=0,u=[],l=[],f=[{type:12,data:o}];for(let h=0;h<r.length;++h)a+=r[h].dims[e],i[h]=a,l.push(r[h].dims.length),s[h]=B(`input${h}`,t,l[h]),u.push("rank"),f.push({type:12,data:i[h]});for(let h=0;h<r.length;++h)f.push(...W(r[h].dims));f.push(...W(n));let c=V("output",t,n.length),p=c.indicesGet("indices",e),g=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),b=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let v=0;v<r.length;v++)h.registerUniform(`sizeInConcatAxis${v}`,"u32");return h.declareVariables(...s,c)})()}

  ${v1(i.length,g)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${g});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${T1(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:b}},Pg=(r,e)=>{let n=r.inputs,t=n[0].dims,o=C.normalizeAxis(e.axis,t.length);w1(n,o);let i=t.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>C.size(a.dims)>0);r.compute(I1(s,o,i,n[0].dataType),{inputs:s})},Eg=r=>de({axis:r.axis})});var Wt,Ht,qt,Ni,Er=k(()=>{"use strict";fe();he();Wt=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},Ht=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},qt=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ni=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[Zh,Jh];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var rt,kg,zi=k(()=>{"use strict";rt=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},kg=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Dg,Bg=k(()=>{"use strict";Dg=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var Jn,Ri,Mi=k(()=>{"use strict";fe();he();ye();Er();Jn=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((s,a)=>`
      if (${ee(e.shape,a,e.rank)} != 1) {
        ${e.indicesSet(r,a,ee(o,a+i,t))}
      } else {
        ${e.indicesSet(r,a,0)}
      }`).join("")}
`},Ri=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s[s.length-2],l=a[a.length-1],f=s[s.length-1],c=Oe(l),p=Oe(f),g=Oe(u),b=C.size(n)/c/g,h=r.length>2,v=t?t.slice(0,-2):n.slice(0,-2),_=[C.size(v),u,l],I=[{type:12,data:b},{type:12,data:u},{type:12,data:l},{type:12,data:f}];Ht(e,I),I.push(...W(v,s,a)),h&&I.push(...W(r[2].dims)),I.push(...W(_));let $=O=>{let E=Ei("batch_dims",r[0].dataType,v.length),L=B("a",r[0].dataType,s.length,p),z=B("b",r[1].dataType,a.length,c),U=V("output",r[0].dataType,_.length,c),K=ze(U.type.tensor),M=Wt(e,U.type.value,K),oe=[L,z],q="";if(h){let Z=o?c:1;oe.push(B("bias",r[2].dataType,r[2].dims.length,Z)),q=`${o?`value += bias[col / ${Z}];`:`value += ${U.type.value}(bias[row + i]);`}`}let te=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];qt(e,te);let Re=()=>{let Z=`var a_data: ${L.type.value};`;for(let Y=0;Y<p;Y++)Z+=`
              let b_data${Y} = b[(b_offset + (k + ${Y}) * uniforms.N + col) / ${c}];`;for(let Y=0;Y<g;Y++){Z+=`a_data = a[(a_offset + (row + ${Y}) * uniforms.K + k) / ${p}];`;for(let be=0;be<p;be++)Z+=`
            values[${Y}] = fma(${z.type.value}(a_data${p===1?"":`[${be}]`}), b_data${be}, values[${Y}]);
`}return Z};return`
  ${O.registerUniforms(te).registerInternalVariables(E).declareVariables(...oe,U)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${L.type.indices};
    ${Jn("a_indices",L,L.rank-2,E.rank,"batch_indices")}
    ${L.indicesSet("a_indices",L.rank-2,0)}
    ${L.indicesSet("a_indices",L.rank-1,0)}
    let a_offset = ${L.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${Jn("b_indices",z,z.rank-2,E.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${U.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${Re()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${q}
      ${M}
      let cur_indices = ${U.type.indices}(batch, row + i, col);
      let offset = ${U.indicesToOffset("cur_indices")};
      ${U.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${c};${p};${g};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:I}),getShaderSource:$}}});var S1,$1,iu,Lg,A1,au,O1,Yn,Fi=k(()=>{"use strict";fe();he();ye();Er();Mi();zi();S1=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,$1=(r,e)=>r?`
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
        }`,iu=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32)=>{let u=e[1]*r[1],l=e[0]*r[0],f=o?u:i,c=o?i:u,p=f/e[0],g=i/e[1];if(!((o&&p===4&&r[1]===4||!o&&(p===3||p===4))&&f%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${f/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${p};
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
  let batch = ${s?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${S1(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
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
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${$1(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Lg=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,A1=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",au=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=r[1]*e[1],f=r[0]*e[0],c=o?l:i,p=o?i:l;if(!(p%e[1]===0&&c%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let g=p/e[1],b=c/e[0],h=i/e[1],v=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          ${Lg(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
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

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Lg(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
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
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${A1(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${f}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${v}
  }
`},O1=(r,e,n,t,o=!1)=>{let[i,s,a,u]=t,l=ze(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${rt(r,l)} {
      var value = ${rt(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Jn("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${rt(r,l)} {
      var value = ${rt(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${a.type.indices};
        ${Jn("bIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("bIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("bIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${rt(r,l)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${rt(r,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Yn=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),f=t?t.slice(0,-2):n.slice(0,-2),c=C.size(f),p=s[s.length-2],g=s[s.length-1],b=a[a.length-1],h=g%4===0&&b%4===0,v=p<=8?[4,1,1]:[4,4,1],w=[8,8,1],_=[Math.ceil(b/w[0]/v[0]),Math.ceil(p/w[1]/v[1]),Math.ceil(c/w[2]/v[2])],I=h?4:1,$=[...u,p,g/I],O=$.length,E=[...l,g,b/I],L=E.length,z=[c,p,b/I],U=[{type:6,data:p},{type:6,data:b},{type:6,data:g}];Ht(e,U),U.push(...W(f,$,E));let K=["rank","rank"],M=r.length>2;M&&(U.push(...W(r[2].dims)),K.push("rank")),U.push(...W(z));let oe=q=>{let te=f.length,Re=Ei("batchDims",r[0].dataType,te,1),Z=ze(r[0].dataType),Y=B("a",r[0].dataType,O,I),be=B("b",r[1].dataType,L,I),ue=V("result",r[0].dataType,z.length,I),Me=[Y,be];if(M){let ne=o?I:1;Me.push(B("bias",r[2].dataType,r[2].dims.length,ne))}let at=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];qt(e,at);let Fe=ze(ue.type.tensor),pe=Wt(e,ue.type.value,Fe),G=O1(I,M,pe,[Re,Y,be,ue],o);return`
  ${q.registerUniforms(at).registerInternalVariables(Re).declareVariables(...Me,ue)}
  ${G}
  ${h?iu(v,w,Z,Re):au(v,w,Z,Re)}
                   `};return{name:"MatMul",shaderCache:{hint:`${v};${e.activation};${h};${o}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:U}),getShaderSource:oe}}});var P1,Ng,zg=k(()=>{"use strict";fe();rr();ye();Er();zi();Bg();Fi();P1=(r,e,n,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let f=K=>{switch(K){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${K} is not supported.`)}},c=K=>{switch(K){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${K} is not supported.`)}},p=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=r?`
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
    `,b=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",v=r?"row":"col",w=r?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${v} / outWidth;
    let outCol = ${v} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${rt(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,I=r?e&&t?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${rt(s,l)}(0.0);`:t&&n?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${rt(s,l)}(0.0);`,$=r?t&&n?c(a):`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(a)}
    }
    return ${rt(a,l)}(0.0);`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(a)}
    }
    return ${rt(a,l)}(0.0);`,O=rt(u,l),E=r?rt(s,l):rt(a,l),L=r?rt(a,l):rt(s,l),z=Wt(i,O,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${r?I:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${L} {
      ${r?$:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${O}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${kg(o)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ng=(r,e,n,t,o,i,s,a,u)=>{let l=e.format==="NHWC",f=l?r[0].dims[3]:r[0].dims[1],c=n[0],p=l?n[2]:n[3],g=l?n[1]:n[2],b=l?n[3]:n[1],h=l&&(f%4===0||f%3===0)&&b%4===0,v=l?b:p*g,w=l?p*g:b,_=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(v/_[0]/I[0]),Math.ceil(w/_[1]/I[1]),Math.ceil(c/_[2]/I[2])];we("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let O=h?l&&f%4!==0?3:4:1,E=_[1]*I[1],L=_[0]*I[0],z=Math.max(_[0]*O,_[1]),U=t%E===0,K=o%L===0,M=i%z===0,oe=h?[O,4,4]:[1,1,1],q=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Ht(e,q),q.push(...W(r[0].dims,r[1].dims));let te=["rank","rank"];s&&(q.push(...W(r[2].dims)),te.push("rank")),q.push(...W(n));let Re=Z=>{let Y=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];qt(e,Y);let be=h?4:1,ue=ze(r[0].dataType),Me=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${ue}>`:ue}) {
        result[flatIndex] = ${h?`vec4<${ue}>`:ue}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${ue}>`:ue}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,at=B("x",r[0].dataType,r[0].dims.length,O===3?1:O),Fe=B("w",r[1].dataType,r[1].dims.length,be),pe=[at,Fe],G=V("result",r[0].dataType,n.length,be);if(s){let ne=B("bias",r[2].dataType,r[2].dims.length,be);pe.push(ne),Me+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${ue}>`:ue} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Dg("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Z.registerUniforms(Y).declareVariables(...pe,G)}
        ${Me}
        ${P1(l,U,K,M,s,e,oe[0],oe[1],oe[2],ue)}
        ${h?iu(I,_,ue,void 0,!l,z):au(I,_,ue,void 0,!l,z,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${O};${h};${U};${K};${M};${E};${L};${z}`,inputDependencies:te},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:q}),getShaderSource:Re}}});var E1,Rg,Vi,C1,Mg,k1,Fg,Vg,Gg=k(()=>{"use strict";fe();rr();he();ye();Er();zi();E1=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Rg=r=>typeof r=="number"?[r,r,r]:r,Vi=(r,e)=>e<=1?r:r+(r-1)*(e-1),C1=(r,e,n,t=1)=>{let o=Vi(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},Mg=(r,e,n,t,o)=>{o==null&&(o=C1(r,e[0],t[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)r[s]+2*o>=e[s]&&(i[s]=Math.trunc((r[s]-e[s]+2*o)/t[s]+1));return i},k1=(r,e,n,t,o,i,s,a,u,l)=>{let f,c,p,g;if(r==="VALID"&&(r=0),typeof r=="number"){f={top:r,bottom:r,left:r,right:r,front:r,back:r};let b=Mg([e,n,t,1],[a,u,l],1,[o,i,s],r);c=b[0],p=b[1],g=b[2]}else if(Array.isArray(r)){if(!r.every((h,v,w)=>h===w[0]))throw Error(`Unsupported padding parameter: ${r}`);f={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let b=Mg([e,n,t,1],[a,u,l],1,[o,i,s],r[0]);c=b[0],p=b[1],g=b[2]}else if(r==="SAME_UPPER"){c=Math.ceil(e/o),p=Math.ceil(n/i),g=Math.ceil(t/s);let b=(c-1)*o+a-e,h=(p-1)*i+u-n,v=(g-1)*s+l-t,w=Math.floor(b/2),_=b-w,I=Math.floor(h/2),$=h-I,O=Math.floor(v/2),E=v-O;f={top:I,bottom:$,left:O,right:E,front:w,back:_}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:f,outDepth:c,outHeight:p,outWidth:g}},Fg=(r,e,n,t,o,i=!1,s="channelsLast")=>{let a,u,l,f,c;if(s==="channelsLast")[a,u,l,f,c]=r;else if(s==="channelsFirst")[a,c,u,l,f]=r;else throw new Error(`Unknown dataFormat ${s}`);let[p,,g,b,h]=e,[v,w,_]=Rg(n),[I,$,O]=Rg(t),E=Vi(g,I),L=Vi(b,$),z=Vi(h,O),{padInfo:U,outDepth:K,outHeight:M,outWidth:oe}=k1(o,u,l,f,v,w,_,E,L,z),q=i?p*c:p,te=[0,0,0,0,0];return s==="channelsFirst"?te=[a,q,K,M,oe]:s==="channelsLast"&&(te=[a,K,M,oe,q]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:f,inChannels:c,outDepth:K,outHeight:M,outWidth:oe,outChannels:q,padInfo:U,strideDepth:v,strideHeight:w,strideWidth:_,filterDepth:g,filterHeight:b,filterWidth:h,effectiveFilterDepth:E,effectiveFilterHeight:L,effectiveFilterWidth:z,dilationDepth:I,dilationHeight:$,dilationWidth:O,inShape:r,outShape:te,filterShape:e}},Vg=(r,e,n,t,o,i)=>{let s=i==="channelsLast",a=s?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],f={x:n.map((_,I)=>I)},c=[Math.ceil(E1(f.x.map(_=>n[_]))/l[0]),1,1];we("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,g=C.size(n),b=[{type:12,data:g},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Ht(e,b),b.push(...W(r[0].dims,r[1].dims));let h=["rank","rank"],v=r.length===3;v&&(b.push(...W(r[2].dims)),h.push("rank")),b.push(...W(n));let w=_=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];qt(e,I);let $=u?4:1,O=ze(r[0].dataType),E=B("x",r[0].dataType,r[0].dims.length,p===3?1:p),L=B("W",r[1].dataType,r[1].dims.length,$),z=[E,L],U=V("result",r[0].dataType,n.length,$),K="";if(v){let q=B("bias",r[2].dataType,r[2].dims.length,$);z.push(q),K+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${O}>`:O} {
          return bias[${s?ee("coords",4,5):ee("coords",1,5)}${u?"/ 4":""}];
        }`}let M=rt(p,O),oe=Wt(e,M,O);return`
            ${K}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${L.getByIndices("aIndices")};
            }
          ${_.registerUniforms(I).declareVariables(...z,U)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
              let batch = ${ee("coords",0,E.rank)};
              let d2 = ${s?ee("coords",E.rank-1,E.rank):ee("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${s?ee("coords",1,E.rank):ee("coords",2,E.rank)},
              ${s?ee("coords",2,E.rank):ee("coords",3,E.rank)},
              ${s?ee("coords",3,E.rank):ee("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?ee("uniforms.x_shape",1,E.rank):ee("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${s?ee("uniforms.x_shape",2,E.rank):ee("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${s?ee("uniforms.x_shape",3,E.rank):ee("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${s?ee("uniforms.x_shape",4,E.rank):ee("uniforms.x_shape",1,E.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${v?"value = value + getBiasByOutputCoords(coords)":""};
              ${oe}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${p};${v}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:b}),getShaderSource:w}}});var Ug,Wg,Hg=k(()=>{"use strict";fe();he();ye();Er();Ug=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",s=r[0].dims,a=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],f=l/e.group,c=u&&f>=4?Oe(l):1,p=C.size(n)/c,g=[{type:12,data:p},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:f}];Ht(e,g),g.push(...W(s,[a[0],a[1],a[2],a[3]/c]));let b=o?["rank","rank","rank"]:["rank","rank"];g.push(...W([n[0],n[1],n[2],n[3]/c]));let h=v=>{let w=V("output",r[0].dataType,n.length,c),_=ze(w.type.tensor),I=Wt(e,w.type.value,_),$=B("x",r[0].dataType,s.length),O=B("w",r[1].dataType,a.length,c),E=[$,O];o&&E.push(B("b",r[2].dataType,r[2].dims,c));let L=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];qt(e,L);let z=u?`
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
  ${v.registerUniforms(L).declareVariables(...E,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${w.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${w.type.value} = ${w.type.value}(0);
    ${z}
    ${i}
    ${I}
    ${w.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${c}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:h}},Wg=(r,e,n,t)=>{let o=r.length>2,i=Oe(n[3]),s=Oe(n[2]),a=C.size(n)/i/s,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],f=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Ht(e,c),c.push(...W(u,l,f));let p=(s-1)*e.strides[1]+l[1],g=b=>{let h=V("output",r[0].dataType,f.length,i),v=ze(h.type.tensor),w=Wt(e,h.type.value,v),_=B("x",r[0].dataType,u.length,i),I=B("w",r[1].dataType,l.length,i),$=[_,I];o&&$.push(B("b",r[2].dataType,r[2].dims,i));let O=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return qt(e,E),`
  ${b.registerUniforms(E).declareVariables(...$,h)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${p}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${O}
      ${w}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${p};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:g}}});var D1,su,B1,uu,lu,qg,L1,N1,cu,Kg=k(()=>{"use strict";he();zg();Gg();Fi();Hg();Er();Mi();mr();D1=(r,e,n,t,o,i)=>{let s=r[0],a=r.slice(i?1:2,i?3:4),u=a.length,l=e[0],c=e.slice(2).map((b,h)=>b+(b-1)*(n[h]-1)),g=a.map((b,h)=>b+t[h]+t[h+u]).map((b,h)=>Math.floor((b-c[h]+o[h])/o[h]));return g.splice(0,0,s),g.splice(i?3:1,0,l),g},su=[2,3,1,0],B1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},uu=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Yr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},lu=r=>{let e=Ni(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,s=r.kernel_shape,a=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},qg=(r,e,n,t)=>{let o=n.format==="NHWC",i=D1(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[e[0]];if(o){let z=r.kernelCustomData.wT??r.compute(it(e[1],su),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=z),E.push(z)}else E.push(e[1]);e.length===3&&E.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Wg(E,n,i,t),{inputs:E}):r.compute(Ug(E,n,i,t),{inputs:E});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],f=e[1].dims[2],c=e[1].dims[3],p=i[o?1:2],g=i[o?2:3],b=i[o?3:1],h=o&&f===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(h||f===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=i[0],L,z,U,K=[];if(o){let q=r.kernelCustomData.wT??r.compute(it(e[1],su),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=q),h){let te=a*u*l;L=e[0].reshape([1,E,te]),z=q.reshape([1,te,b]),U=[1,E,b]}else L=e[0].reshape([E,a*u,l]),z=q.reshape([1,l,b]),U=[E,p*g,b];K.push(L),K.push(z)}else L=e[0].reshape([E,l,a*u]),z=e[1].reshape([1,b,l]),U=[E,b,p*g],K.push(z),K.push(L);s&&K.push(e[2]);let M=U[2],oe=K[0].dims[K[0].dims.length-1];M<8&&oe<8?r.compute(Ri(K,n,i,U,o,t),{inputs:K}):r.compute(Yn(K,n,i,U,o,t),{inputs:K});return}let v=!0,w=r.kernelCustomData.wT??r.compute(it(e[1],su),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=w);let _=[e[0],w];s&&_.push(e[2]);let I=o?p*g:b,$=o?b:p*g,O=f*c*l;r.compute(Ng(_,n,i,I,$,O,s,v,t),{inputs:_})},L1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=uu({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);qg(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},N1=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=uu(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Fg(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Vg(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},cu=(r,e)=>{if(B1(r.inputs,e),r.inputs[0].dims.length===3)L1(r,e);else if(r.inputs[0].dims.length===5)N1(r,r.inputs,e);else{let n=uu(e,r.inputs);qg(r,r.inputs,n)}}});var jg,Xg=k(()=>{"use strict";fe();rr();he();ye();jg=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=e.format==="NHWC",s=e.group,a=r[1].dims,u=a[2]/s,l=a[3],f=i?Oe(u):1,c=i&&l===1,p=c?Math.floor(u/4)*4:Math.floor(u/f)*f,g=u-p,b=i?Oe(l):1,h=i?l===1?f:b:1,v=C.size(o)/b,w=[Math.ceil(v/64),1,1];we("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let _=["rank","rank"],I=[e.strides[0],e.strides[1]],$=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],O=[e.dilations[0],e.dilations[1]],E=[$[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),$[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],L=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],z=[{type:12,data:v},{type:12,data:I},{type:12,data:$},{type:12,data:O},{type:12,data:E},{type:6,data:L},{type:12,data:p},{type:12,data:l},...W(r[0].dims,r[1].dims)];t&&(z.push(...W(r[2].dims)),_.push("rank")),z.push(...W(o));let U=K=>{let M=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:L.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],oe=ze(r[0].dataType),q=i?1:2,te=i?2:3,Re=i?3:1,Z=B("W",r[1].dataType,r[1].dims.length,h),Y=B("Dy",r[0].dataType,r[0].dims.length,f),be=[Y,Z];t&&be.push(B("bias",r[2].dataType,[o[Re]].length,b));let ue=V("result",r[0].dataType,o.length,b),Me=()=>{let pe="";if(c)f===4?pe+=`
        let xValue = ${Y.getByOffset("x_offset")};
        let wValue = ${Z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?pe+=`
          dotProd = dotProd + dot(vec4<${oe}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}), vec4<${oe}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(pe+=`
          dotProd = dotProd + dot(vec4<${oe}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}, ${Y.getByOffset("x_offset + 2u")}, ${Y.getByOffset("x_offset + 3u")}), vec4<${oe}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}, ${Z.getByOffset("w_offset + 2u")}, ${Z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(pe+=`
                  let xValue = ${i?Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):Y.get("batch","inputChannel","idyR","idyC")};
        `,f===1)pe+=`
          let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Z.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let G=0;G<f;G++)pe+=`
            let wValue${G} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${G}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${G}] * wValue${G};`;return pe},at=()=>{if(g===0)return"";if(!c)throw new Error(`packInputAs4 ${c} is not true.`);let pe="";if(f===1){pe+="dotProd = dotProd";for(let G=0;G<g;G++)pe+=`
            + ${Y.getByOffset(`x_offset + ${G}`)} * ${Z.getByOffset(`w_offset + ${G}`)}`;pe+=";"}else if(f===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);pe+=`
          let xValue = ${Y.getByOffset("x_offset")};
          let wValue = ${Z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return pe},Fe=`
            let outputIndices = ${ue.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${ue.indicesGet("outputIndices",0)};
            let d1 = ${ue.indicesGet("outputIndices",Re)};
            let r = ${ue.indicesGet("outputIndices",q)};
            let c = ${ue.indicesGet("outputIndices",te)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ue.type.value}(0.0);
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
              if (dyR < 0.0 || dyR >= ${oe}(uniforms.Dy_shape[${q}]) || fract(dyR) > 0.0 ||
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
                if (dyC < 0.0 || dyC >= ${oe}(uniforms.Dy_shape[${te}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${Z.indicesToOffset(`${Z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${c?4:f}) {
                  ${Me()}
                  inputChannel = inputChannel + ${c?4:f};
                }
                ${at()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${b}]`:""};
            ${ue.setByOffset("global_idx","value")};
          `;return`
    ${K.registerUniforms(M).declareVariables(...be,ue)}
      ${K.mainStart()}
      ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Fe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${f}${h}${b}${l===1}${g}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:z}),getShaderSource:U}}});var z1,R1,M1,Zg,Jg,F1,Yg,V1,Qg,ey=k(()=>{"use strict";Xg();Er();mr();z1=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,R1=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},M1=(r,e,n,t,o,i,s,a,u,l)=>{let f=r.length-2,c=l.length===0;u.length<f&&u.push(...Array(f-u.length).fill(0));let p=r[0],g=e[a?3:1]*o;for(let b=0,h=r.length-f-(a?1:0);b<f;++b,++h){let v=r[h],w=c?v*s[b]:l[b],_=z1(v,s[b],i[b],e[h],n[b],w);R1(_,t,i,b,b+f),c&&l.push(s[b]*(v-1)+u[b]+(e[h]-1)*n[b]+1-i[b]-i[b+f])}l.splice(0,0,p),l.splice(a?3:1,0,g)},Zg=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<e[1].dims.length;++c)n.push(e[1].dims[c])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),s=r.outputPadding.slice(),a=e[0].dims,u=r.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;u=new Array(c).fill(1)}let l=r.strides.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;l=new Array(c).fill(1)}M1(a,n,u,r.autoPad,r.group,o,l,t,s,i);let f=Object.assign({},r);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),f},Jg=r=>{let e=Ni(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,s=r.kernelShape,a=r.pads,u=r.strides,l=r.wIsConst(),f=r.outputPadding,c=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,outputPadding:f,outputShape:c,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},F1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((f,c)=>f+c,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((f,c)=>f+c,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((f,c)=>f+c,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((f,c)=>f+c,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},Yg=(r,e,n,t)=>{let o=r.kernelCustomData.wT??r.compute(it(e[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),r.compute(jg(i,n,t),{inputs:i})},V1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=Zg({...e,pads:a,strides:s,dilations:i,kernelShape:o},t);Yg(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},Qg=(r,e)=>{if(F1(r.inputs,e),r.inputs[0].dims.length===3)V1(r,e);else{let n=Zg(e,r.inputs);Yg(r,r.inputs,n)}}});var G1,ty,ry,ny=k(()=>{"use strict";fe();he();qe();ye();G1=(r,e,n,t)=>{let o=C.size(e),i=e.length,s=B("input",r,i),a=V("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=C.normalizeAxis(u,i),f=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=ee("uniforms.input_shape","uniforms.axis",i),b=t.reverse?p+(t.exclusive?" + 1":""):"0",h=t.reverse?g:p+(t.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...W(e,e)]}),getShaderSource:f}},ty=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(G1(t,n,o,e),{inputs:[0]})},ry=r=>{let e=r.exclusive===1,n=r.reverse===1;return de({exclusive:e,reverse:n})}});var U1,W1,H1,oy,iy,ay=k(()=>{"use strict";fe();he();qe();ye();U1=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},W1=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},H1=(r,e)=>{let n,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,f=e.mode==="DCR";u?([n,t,o,i]=r.dims,s=f?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],a=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],s=f?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],a=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=r.reshape(s),p=c.dims.length,g=r.dataType,b=B("a",g,p),h=V("output",g,p),v=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(b,h)}

  ${W1(a,p,b,h)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:w=>{let _=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],I=C.size(_),$=c.dims,O=C.sortBasedOnPerm($,a);return{outputs:[{dims:_,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...W($,O)]}},getShaderSource:v}},oy=(r,e)=>{U1(r.inputs),r.compute(H1(r.inputs[0],e))},iy=r=>de({blocksize:r.blocksize,mode:r.mode,format:r.format})});var fu,Gi,sy,q1,K1,du,pu,uy,j1,ly,cy,fy=k(()=>{"use strict";fe();he();qe();ye();fu="[a-zA-Z]|\\.\\.\\.",Gi="("+fu+")+",sy="^"+Gi+"$",q1="("+Gi+",)*"+Gi,K1="^"+q1+"$",du=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},pu=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(K1)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(sy)))throw new Error("Invalid LHS term");let f=this.processTerm(a,!0,l,u);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Gi)))throw new Error("Invalid RHS");o.match(RegExp(fu,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(sy))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(fu,"g")),f=new du(o);return l?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=i-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<a.length;b++){let h=String.fromCharCode("0".charCodeAt(0)+b);f.addSymbol(h,p+b),this.addSymbol(h,t[u++],o)}}else f.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,t[u++],o)}),f}},uy=r=>r+"_max",j1=(r,e,n,t)=>{let i=r.map(f=>f.length).map((f,c)=>B(`input${c}`,e,f)),s=C.size(t),a=V("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),l=f=>{let c=[],p="var prod = 1.0;",g="var sum = 0.0;",b="sum += prod;",h=[],v=[],w=[],_=[],I=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((O,E)=>{if(n.rhs.symbolToIndices.has(E)){let L=n.rhs.symbolToIndices.get(E)?.[0];L!==void 0&&n.lhs.forEach((z,U)=>{if(O.inputIndices.includes(U)){let K=z.symbolToIndices.get(E);if(K===void 0)throw new Error("Invalid symbol error");K.forEach(M=>{c.push(`${i[U].indicesSet(`input${U}Indices`,M,a.indicesGet("outputIndices",L))}`)})}})}else n.lhs.forEach((L,z)=>{if(O.inputIndices.includes(z)){let U=L.symbolToIndices.get(E);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(K=>{h.push(`${i[z].indicesSet(`input${z}Indices`,K,`${E}`)}`)}),_.push(`prod *= ${i[z].getByIndices(`input${z}Indices`)};`)}}),v.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${uy(E)}; ${E}++) {`),w.push("}")});let $=I?[...c,`let sum = ${i.map((O,E)=>O.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,g,...v,...h,p,..._,b,...w];return`
            ${f.registerUniforms(u.map(O=>({name:`${uy(O)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((O,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let f=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));f.push({type:12,data:s});let c=r.map((p,g)=>[...W(p)]).reduce((p,g)=>p.concat(g),f);return c.push(...W(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:l}},ly=(r,e)=>{let n=new pu(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,s)=>i.dims);r.compute(j1(o,r.inputs[0].dataType,n,t))},cy=r=>{let e=r.equation.replace(/\s+/g,"");return de({equation:e})}});var X1,dy,Z1,J1,py,my=k(()=>{"use strict";fe();he();ye();X1=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},dy=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},Z1=(r,e)=>r.length>e.length?dy(r,e):dy(e,r),J1=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=Z1(e,n),o=r[0].dataType,i=o===9||C.size(e)===1,s=o===9||e.length>0&&e[e.length-1]%4===0?4:1,a=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(C.size(t)/a),l=c=>{let p=B("input",o,e.length,s),g=V("output",o,t.length,a),b;if(o===9){let h=(v,w,_="")=>`
          let outputIndices${w} = ${g.offsetToIndices(`outputOffset + ${w}u`)};
          let offset${w} = ${p.broadcastedIndicesToOffset(`outputIndices${w}`,g)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${v}[${w}] = ${_}(${p.getByOffset(`index${w}`)}[component${w}]);
        `;b=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${a}`)};
        let inputOffset = ${p.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${p.getByOffset(`inputOffset / ${s}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(p,g)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},f=[{type:12,data:u},...W(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${s}${a}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f})}},py=r=>{X1(r.inputs),r.compute(J1(r.inputs),{inputs:[0]})}});var Y1,hy,by=k(()=>{"use strict";fe();he();ye();Li();Y1=r=>{let e=r[0].dataType,n=C.size(r[0].dims),t=C.size(r[1].dims),o=t%4===0,i=s=>{let a=B("x",e,[1],4),u=B("bias",e,[1],4),l=V("y",e,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(a,u,l)}

    ${nu(ot(e))}

    ${s.mainStart(Qr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",ou("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Qr/4)}})}},hy=r=>{r.inputs.length<2||C.size(r.inputs[1].dims)===0?fg(r):r.compute(Y1(r.inputs))}});var Q1,eI,gy,yy,xy=k(()=>{"use strict";fe();he();qe();ye();Q1=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},eI=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=C.normalizeAxis(e.axis,o),s=n.slice(0);s.splice(i,1,...t);let a=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(C.size(s)/u),f=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...W(r[0].dims,r[1].dims,s)],c=p=>{let g=B("data",r[0].dataType,r[0].dims.length,u),b=B("inputIndices",r[1].dataType,r[1].dims.length),h=V("output",r[0].dataType,s.length,u),v=_=>{let I=t.length,$=`var indicesIndices${_}  = ${b.type.indices}(0);`;for(let O=0;O<I;O++)$+=`${I>1?`indicesIndices${_}[${O}]`:`indicesIndices${_}`} = ${s.length>1?`outputIndices${_}[uniforms.axis + ${O}]`:`outputIndices${_}`};`;$+=`
          var idx${_} = ${b.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${g.type.indices};
        `;for(let O=0,E=0;O<o;O++)O===i?($+=`${o>1?`dataIndices${_}[${O}]`:`dataIndices${_}`} = u32(idx${_});`,E+=I):($+=`${o>1?`dataIndices${_}[${O}]`:`dataIndices${_}`} = ${s.length>1?`outputIndices${_}[${E}]`:`outputIndices${_}`};`,E++);return $},w;if(r[0].dataType===9){let _=(I,$,O="")=>`
          let outputIndices${$} = ${h.offsetToIndices(`outputOffset + ${$}u`)};
          ${v($)};
          let offset${$} = ${g.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${O}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;w=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${v("")};
      let value = ${g.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,b,h)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:c}},gy=r=>de({axis:r.axis}),yy=(r,e)=>{let n=r.inputs;Q1(n),r.compute(eI(r.inputs,e))}});var tI,_y,wy,vy=k(()=>{"use strict";fe();he();ye();tI=(r,e,n,t,o,i,s,a,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:12,data:u}],f=[i];l.push(...W(e.dims,f));let c=p=>{let g=B("indices_data",e.dataType,e.dims.length),b=V("input_slice_offsets_data",12,1,1),h=[g,b],v=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${p.registerUniforms(v).declareVariables(...h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:c},{inputs:[e],outputs:[-1]})[0]},_y=(r,e)=>{let n=r.inputs,t=n[0].dims,o=n[0].dataType,i=n[1].dims,s=i[i.length-1],a=C.sizeToDimension(i,i.length-1),u=C.sizeFromDimension(t,e.batchDims+s),l=C.sizeToDimension(t,e.batchDims),f=C.sizeFromDimension(t,e.batchDims),c=a/l,p=new Array(s),g=u;for(let $=0;$<s;++$)p[s-1-$]=g,g*=t[e.batchDims+s-1-$];let b=tI(r,n[1],p,e.batchDims,t,a,c,f,s),h=e.batchDims+s;if(h>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let v=i.slice(0,-1).concat(t.slice(h)),w=C.size(v),_=[{type:12,data:w},{type:12,data:u},...W(n[0].dims,b.dims,v)],I=$=>{let O=B("data",n[0].dataType,n[0].dims.length),E=B("slice_offsets",12,b.dims.length),L=V("output",n[0].dataType,v.length);return`
          ${$.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(O,E,L)}
            ${$.mainStart()}
            ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};r.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:v,dataType:o}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:_}),getShaderSource:I},{inputs:[n[0],b]})},wy=r=>({batchDims:r.batch_dims,cacheKey:""})});var rI,nI,Ty,Iy,Sy=k(()=>{"use strict";fe();he();qe();ye();rI=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=C.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],s=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},nI=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=C.normalizeAxis(e.gatherAxis,o),s=C.normalizeAxis(e.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...t);let u=C.size(a),l=r[2].dataType,c=r[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...W(...r.map((b,h)=>b.dims),a)],g=b=>{let h=B("data",r[0].dataType,r[0].dims.length),v=B("inputIndices",r[1].dataType,r[1].dims.length),w=B("scales",r[2].dataType,r[2].dims.length),_=r.length>3?B("zeroPoint",r[3].dataType,r[3].dims.length):void 0,I=V("output",l,a.length),$=[h,v,w];_&&$.push(_);let O=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(O).declareVariables(...$,I)}
        ${b.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${h.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${h.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${h.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${w.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${w.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${w.getByIndices("scale_indices")};
        ${(()=>_?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${_.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${_.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ot(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((b,h)=>h!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(b,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:g}},Ty=(r,e)=>{let n=r.inputs;rI(n,e),r.compute(nI(r.inputs,e))},Iy=r=>de({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var oI,iI,$y,Ay,Oy=k(()=>{"use strict";fe();he();qe();ye();oI=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},iI=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,s=r[1].dataType,a=C.normalizeAxis(e.axis,o),u=n[a],l=i.slice(0),f=C.size(l),c=B("input",t,o),p=B("indicesInput",s,i.length),g=V("output",t,l.length),b=[{type:12,data:f},{type:6,data:u},{type:12,data:a}];return b.push(...W(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,g)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},$y=r=>de({axis:r.axis}),Ay=(r,e)=>{let n=r.inputs;oI(n),r.compute(iI(r.inputs,e))}});var aI,sI,Py,Ey,Cy=k(()=>{"use strict";fe();he();ye();aI=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},sI=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,s]=Oi.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),f=Math.ceil(o/u),c=!0,p=C.size(a),g=[{type:12,data:c?l:p},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],b=["type","type"];r.length===3&&(g.push(...W(r[2].dims)),b.push("rank")),g.push(...W(a));let h=w=>{let _="";e.transA&&e.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",$=B("a",r[0].dataType,r[0].dims),O=B("b",r[1].dataType,r[1].dims),E=$.type.value,L=null,z=[$,O];r.length===3&&(L=B("c",r[2].dataType,r[2].dims.length),z.push(L));let U=V("output",r[0].dataType,a.length);z.push(U);let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${w.registerUniforms(K).declareVariables(...z)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${I}
    ${(()=>L!=null?`let cOffset = ${L.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${E}(uniforms.beta) * ${L.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},v=w=>{let _=B("a",r[0].dataType,r[0].dims),I=B("b",r[1].dataType,r[1].dims),$=null,O=[_,I];r.length===3&&($=B("c",r[2].dataType,r[2].dims.length),O.push($));let E=V("output",r[0].dataType,a.length);O.push(E);let L=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",U="";e.transA&&e.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let K=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${w.registerUniforms(L).declareVariables(...O)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${w.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${K}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>$!=null?`let cOffset = ${$.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${$.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:l*f},programUniforms:g}),getShaderSource:v}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:h}},Py=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Ey=(r,e)=>{aI(r.inputs),r.compute(sI(r.inputs,e))}});var hr,Cr,Tn,In,uI,lI,cI,fI,dI,pI,mI,hI,ky,Dy,By=k(()=>{"use strict";fe();he();qe();ye();[hr,Cr,Tn,In]=[0,1,2,3],uI=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},lI=`
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
`,cI=r=>`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,fI=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,dI=r=>`
  ${r.paddingMode==="reflection"?`
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
`,pI=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${hr}] = batch;
     indices[${Cr}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Tn}] = u32(r);
            indices[${In}] = u32(c);
          }
        `;case"border":return`
          indices[${Tn}] = u32(clamp(r, 0, H - 1));
          indices[${In}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Tn}] = gs_reflect(r, border[1], border[3]);
          indices[${In}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,mI=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${hr}], indices[${Cr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${hr}], indices[${Cr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${hr}], indices[${Cr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${hr}], indices[${Cr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${hr}], indices[${Cr}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${hr}], indices[${Cr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,hI=(r,e)=>{let n=B("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=B("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[hr,Cr,Tn,In]=[0,3,1,2]);let s=V("output",r[0].dataType,i.length),a=n.type.value,u=C.size(i),l=[{type:12,data:u},...W(r[0].dims,t,i)],f=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${lI}
  ${cI(a)}
  ${fI(e)}
  ${dI(e)}
  ${pI(n,a,e)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Tn}]);
      let W_in = i32(uniforms.x_shape[${In}]);

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${hr}], indices[${Tn}], indices[${In}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${mI(s,a,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let p=C.size(i);return{outputs:[{dims:i,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:l}},getShaderSource:f}},ky=(r,e)=>{uI(r.inputs),r.compute(hI(r.inputs,e))},Dy=r=>de({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var _t,yI,Ny,Ly,xI,Qn,zy,mu=k(()=>{"use strict";fe();he();qe();Ai();Di();ye();mr();_t=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,yI=(r,e)=>{let n=r[0],t=_t(r,1),o=_t(r,2),i=_t(r,3),s=_t(r,4),a=_t(r,5),u=_t(r,6),l=_t(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],g=c,b=0,h=0,v=Math.floor(p/e.numHeads);if(u&&l&&C.size(u.dims)&&C.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==e.numHeads||u.dims[3]!==v)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==f||l.dims[1]!==e.numHeads||l.dims[3]!==v)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=u.dims[2],h=u.dims[2]}else if(u&&C.size(u.dims)||l&&C.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(t&&C.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');w=2,g=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,g=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,g=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}if(i&&C.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=b+g,I=0;if(s&&C.size(s.dims)>0){I=8;let L=s.dims;throw L.length===1?L[0]===f?I=1:L[0]===3*f+2&&(I=3):L.length===2&&L[0]===f&&L[1]===_&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,O=p;if(o&&C.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(s&&C.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&C.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==f||a.dims[1]!==e.numHeads||a.dims[2]!==c||a.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:c,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:_,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:p,vHiddenSize:O,headSize:v,vHeadSize:Math.floor(O/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:w}},Ny=r=>de({...r}),Ly=de({perm:[0,2,1,3]}),xI=(r,e,n,t,o,i,s)=>{let a=[t,o,i],u=C.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],f=c=>{let p=V("qkv_with_bias",e.dataType,a),g=B("qkv",e.dataType,a),b=B("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(h).declareVariables(g,b,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:f},{inputs:[e,n],outputs:[-1]})[0]},Qn=(r,e,n,t,o,i,s,a)=>{let u=i;if(s&&C.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=xI(r,i,s,e,t,n*o,a),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(it(u,Ly.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(it(u,Ly.perm),{inputs:[u],outputs:[-1]})[0]},zy=(r,e)=>{let n=yI(r.inputs,e),t=r.inputs[0],o=_t(r.inputs,1),i=_t(r.inputs,2),s=_t(r.inputs,3),a=_t(r.inputs,4),u=_t(r.inputs,5),l=_t(r.inputs,6),f=_t(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=Qn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,s,0);if(c)return vn(r,p,o,i,a,void 0,l,f,u,n);if(!o||!i)throw new Error("key and value must be provided");let g=Qn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),b=Qn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);vn(r,p,g,b,a,void 0,l,f,u,n)}});var _I,wI,vI,TI,hu,Ry,My,bu=k(()=>{"use strict";fe();he();qe();ye();_I=r=>{if(!r||r.length<1)throw new Error("too few inputs")},wI=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),de({numOutputs:t,axis:e.axis,splitSizes:n})},vI=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${ee("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,TI=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},hu=(r,e)=>{let n=r[0].dims,t=C.size(n),o=r[0].dataType,i=C.normalizeAxis(e.axis,n.length),s=new Array(e.numOutputs),a=B("input",o,n.length),u=new Array(e.numOutputs),l=[],f=[],c=0,p=[{type:12,data:t}];for(let b=0;b<e.numOutputs;b++){c+=e.splitSizes[b],u[b]=c;let h=n.slice();h[i]=e.splitSizes[b],f.push(h),s[b]=V(`output${b}`,o,h.length),l.push({dims:f[b],dataType:r[0].dataType})}p.push({type:12,data:u},...W(n,...f));let g=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${vI(u.length)}
  ${TI(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ee("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:p})}},Ry=(r,e)=>{_I(r.inputs);let n=r.inputs.length===1?e:wI(r.inputs,e);r.compute(hu(r.inputs,n),{inputs:[0]})},My=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return de({axis:e,numOutputs:t,splitSizes:n})}});var II,SI,Fy,Vy,Gy=k(()=>{"use strict";qe();Di();mu();bu();mr();II=(r,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],f=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],c=l,p=0,g=!t||t.dims.length===0,b=Math.floor(g?f/(e.numHeads+2*e.kvNumHeads):f/e.numHeads);g&&(f=b*e.numHeads);let h=i&&i.dims.length!==0,v=s&&s.dims.length!==0;if(h&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(h&&v){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[2]}else if(h||v)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');c=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}let I=0,$=!1,O=e.kvNumHeads?b*e.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=r.length>4?r[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let L=-1,z=-1,U=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:L,maxSequenceLength:z,inputHiddenSize:0,hiddenSize:f,vHiddenSize:O,headSize:b,vHeadSize:Math.floor(O/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:U,passPastInKv:$,qkvFormat:_}},SI=de({perm:[0,2,1,3]}),Fy=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(it(t,SI.perm),{inputs:[t],outputs:[-1]})[0]),t},Vy=(r,e)=>{let n=II(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,s=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,a=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,c=de({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,f*n.headSize,f*n.headSize]}),[p,g,b]=!o&&!i?r.compute(hu([t],c),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],h=Qn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,p,void 0,0);vn(r,h,Fy(r,g,n),Fy(r,b,n),void 0,void 0,s,a,void 0,n,u,l)}});var Uy,$I,AI,Wy,Hy=k(()=>{"use strict";fe();he();mr();ye();Uy=(r,e,n,t,o,i,s,a)=>{let u=Oe(i),l=u===1?"f32":`vec${u}f`,f=u===1?"vec2f":`mat2x${u}f`,c=o*s,p=64;c===1&&(p=256);let g=[o,s,i/u],b=[o,s,2],h=["rank","type","type"],v=[];v.push(...W(g,b));let w=_=>{let I=B("x",e.dataType,3,u),$=B("scale",n.dataType,n.dims),O=B("bias",t.dataType,t.dims),E=V("output",1,3,2),L=[I,$,O,E];return`
  var<workgroup> workgroup_shared : array<${f}, ${p}>;
  const workgroup_size = ${p}u;
  ${_.declareVariables(...L)}
  ${_.mainStart(p)}
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
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ut("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Ut("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${p}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:c},programUniforms:v}),getShaderSource:w},{inputs:[e,n,t],outputs:[-1]})[0]},$I=(r,e,n)=>{let t=e[0].dims,o=t,i=2,s=t[0],a=t[1],u=C.sizeFromDimension(t,i),l=Oe(u),f=C.size(o)/l,c=Uy(r,e[0],e[1],e[2],s,u,a,n.epsilon),p=[s,a,u/l],g=[s,a],b=["type","none"],h=v=>{let w=B("x",e[0].dataType,p.length,l),_=B("scale_shift",1,g.length,2),I=V("output",e[0].dataType,p.length,l),$=[w,_,I];return`
  ${v.registerUniform("output_size","u32").declareVariables(...$)}
  ${v.mainStart()}
  ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${w.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...W(p,g,p)]}),getShaderSource:h},{inputs:[e[0],c]})},AI=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=C.sizeFromDimension(t,1)/s,u=Oe(s),l=C.size(o)/u,f=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=!1,g=[0,t.length-1];for(let w=0;w<t.length-2;w++)p=p||t[w+1]!==1,g.push(w+1);p=p&&t[t.length-1]!==1;let b=p?r.compute(it(r.inputs[0],g),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(w,_)=>t[g[_]])),h=Uy(r,b,e[1],e[2],i,a,s,n.epsilon),v=w=>{let _=ze(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,$=L=>{let z=L===0?"x":"y",U=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${_}(${U}(scale.${z}))`;case 2:return`vec2<${_}>(${U}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${_}>(${U}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${u}`)}},O=B("input",e[0].dataType,e[0].dims,u),E=V("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${O.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${$(0)}, ${$(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:v},{inputs:[e[0],h]})},Wy=(r,e)=>{e.format==="NHWC"?AI(r,r.inputs,e):$I(r,r.inputs,e)}});var OI,PI,qy,Ky=k(()=>{"use strict";fe();he();ye();OI=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},PI=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],s=!t&&r[2],a=o,u=C.normalizeAxis(e.axis,o.length),l=C.sizeToDimension(o,u),f=C.sizeFromDimension(o,u),c=C.size(i.dims),p=s?C.size(s.dims):0;if(c!==f||s&&p!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let g=[];for(let O=0;O<o.length;++O)O<u?g.push(o[O]):g.push(1);let b=Oe(f),h=["type","type"],v=[{type:12,data:l},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:e.epsilon}];s&&h.push("type");let w=n>1,_=n>2,I=O=>{let E=ze(r[0].dataType),L=[B("x",r[0].dataType,r[0].dims,b),B("scale",i.dataType,i.dims,b)];s&&L.push(B("bias",s.dataType,s.dims,b)),L.push(V("output",r[0].dataType,a,b)),w&&L.push(V("mean_data_output",1,g)),_&&L.push(V("inv_std_output",1,g));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${O.registerUniforms(z).declareVariables(...L)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Qs("f32",b)};
    var mean_square_vector = ${Qs("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${en(E,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ut("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ut("mean_square_vector",b)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${en(E,b,"x[j + offset]")};
      let f32scale = ${en(E,b,"scale[j]")};
      output[j + offset] = ${L[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${en(E,b,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:a,dataType:r[0].dataType}];return w&&$.push({dims:g,dataType:1}),_&&$.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${t}`,inputDependencies:h},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:v}),getShaderSource:I}},qy=(r,e)=>{OI(r.inputs),r.compute(PI(r.inputs,e,r.outputCount))}});var EI,jy,Xy=k(()=>{"use strict";he();Mi();Fi();EI=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},jy=r=>{EI(r.inputs);let e=nr.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(Ri(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=C.size(r.inputs[0].dims.slice(0,-2)),s=C.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let a=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],f=[a,u];r.compute(Yn(f,{activation:""},e,l),{inputs:f})}else r.compute(Yn(r.inputs,{activation:""},e))}}});var CI,kI,DI,Zy,Jy,Yy=k(()=>{"use strict";fe();he();qe();ye();CI=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=r[1];if(!C.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(C.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let f=r[3].dims,c=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(C.size(f)!==c)throw new Error("zeroPoints input size error.")}},kI=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=C.size(a),f=r[1].dims[2]/4,c=r[0].dataType,p=Oe(e.k),g=Oe(f),b=Oe(s),h=a.concat([o,s]),v=o>1&&s/b%2===0?2:1,w=C.size(h)/b/v,_=64,I=[],$=[u,o,i/p],O=C.convertShape(r[1].dims).slice();O.splice(-1,1,f/g),I.push(...W($)),I.push(...W(O)),I.push(...W(r[2].dims)),r.length===4&&I.push(...W(C.convertShape(r[3].dims)));let E=[u,o,s/b];I.push(...W(E));let L=z=>{let U=$.length,K=B("a",r[0].dataType,U,p),M=B("b",12,O.length,g),oe=B("scales",r[2].dataType,r[2].dims.length),q=[K,M,oe],te=r.length===4?B("zero_points",12,r[3].dims.length):void 0;te&&q.push(te);let Re=E.length,Z=V("output",r[0].dataType,Re,b),Y=ze(r[0].dataType),be=(()=>{switch(p){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ue=()=>{let Fe=`
          // reuse a data
            var input_offset = ${K.indicesToOffset(`${K.type.indices}(batch, row, word_offset)`)};
            var a_data: ${be};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${K.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let pe=0;pe<b*v;pe++)Fe+=`
            b_value = ${g===1?`b${pe}_data`:`b${pe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${be}(${Array.from({length:4},(G,ne)=>`${Y}(b_value_lower[${ne}]), ${Y}(b_value_upper[${ne}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${be}(${Array.from({length:8},(G,ne)=>`(b_quantized_values[${ne}] - ${te?`zero_point${pe}`:"zero_point"}) * scale${pe}`).join(", ")});`:`(b_quantized_values - ${be}(${Array(8).fill(`${te?`zero_point${pe}`:"zero_point"}`).join(",")})) * scale${pe};`)()};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(pe/b)}]${b>1?`[${pe%b}]`:""} += ${Array.from({length:8/p},(G,ne)=>`${p===1?`a_data[${ne}] * b_dequantized_values[${ne}]`:`dot(a_data[${ne}], b_dequantized_values[${ne}])`}`).join(" + ")};
          `;return Fe},Me=()=>{let Fe=`
            var col_index = col * ${b};
            ${te?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Y}(8);`}
            `;for(let pe=0;pe<b*v;pe++)Fe+=`
            let scale${pe} = ${oe.getByOffset("col_index * nBlocksPerCol + block")};
            ${te?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${pe} = ${Y}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Fe},at=()=>{let Fe=`col_index = col * ${b};`;for(let pe=0;pe<b*v;pe++)Fe+=`
            let b${pe}_data = ${M.getByIndices(`${M.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Fe+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${be};
            var b_dequantized_values: ${be};`,Fe};return`
        var<workgroup> workgroup_shared: array<${Z.type.value}, ${v*_}>;
        ${z.declareVariables(...q,Z)}
        ${z.mainStart([_,1,1])}
          let output_indices = ${Z.offsetToIndices(`(global_idx / ${_}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${_}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/p};
            ${Me()}
            for (var word: u32 = 0; word < ${f}; word += ${g}) {
              ${at()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ue()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${_}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${p};${g};${b};${v};${_}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:c}],dispatchGroup:{x:w},programUniforms:I}),getShaderSource:L}},DI=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=C.size(a),f=r[1].dims[2]/4,c=r[0].dataType,p=Oe(e.k),g=Oe(f),b=a.concat([o,s]),h=128,v=s%8===0?8:s%4===0?4:1,w=h/v,_=w*g*8,I=_/p,$=_/e.blockSize,O=C.size(b)/v,E=[],L=[u,o,i/p],z=C.convertShape(r[1].dims).slice();z.splice(-1,1,f/g),E.push(...W(L)),E.push(...W(z)),E.push(...W(r[2].dims)),r.length===4&&E.push(...W(C.convertShape(r[3].dims)));let U=[u,o,s];E.push(...W(U));let K=M=>{let oe=L.length,q=B("a",r[0].dataType,oe,p),te=B("b",12,z.length,g),Re=B("scales",r[2].dataType,r[2].dims.length),Z=[q,te,Re],Y=r.length===4?B("zero_points",12,r[3].dims.length):void 0;Y&&Z.push(Y);let be=U.length,ue=V("output",r[0].dataType,be),Me=ze(r[0].dataType),at=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${Me}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Me}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Me}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Me}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${q.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${ue.type.value}, ${w}>, ${v}>;
        ${M.declareVariables(...Z,ue)}
        ${M.mainStart([w,v,1])}
          let output_indices = ${ue.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${h})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${q.getByIndices(`${q.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${q.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${$} + local_id.x;
            ${Y?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Me}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Me}(8);`}
            let scale = ${Re.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${te.getByIndices(`${te.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/p};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${at()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Me}>(${Array.from({length:4},(Fe,pe)=>`${Me}(b_value_lower[${pe}]), ${Me}(b_value_upper[${pe}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Me}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Fe,pe)=>`${`dot(a_data${pe}, b_dequantized_values[${pe}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${ue.type.value} = ${ue.type.value}(0);
            for (var b = 0u; b < ${w}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ue.setByIndices(`${ue.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${p};${g};${w};${v}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:c}],dispatchGroup:{x:O},programUniforms:E}),getShaderSource:K}},Zy=(r,e)=>{CI(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(DI(r.inputs,e)):r.compute(kI(r.inputs,e))},Jy=r=>de(r)});var BI,LI,NI,zI,RI,MI,FI,VI,Qy,ex=k(()=>{"use strict";fe();he();ye();BI=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},LI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${ee("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ee("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${ee("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},NI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ee("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ee("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ee("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ee("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},zI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ee("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ee("uniforms.x_shape",o,e)})) {
                  k = i32(${ee("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${ee("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},RI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ee("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${ee("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${ee("uniforms.x_shape",o,e)})) {
                  k -= i32(${ee("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${ee("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},MI=(r,e,n)=>{switch(n.mode){case 0:return LI(r,e,n.pads.length);case 1:return NI(r,e,n.pads.length);case 2:return zI(r,e,n.pads.length);case 3:return RI(r,e,n.pads.length);default:throw new Error("Invalid mode")}},FI=(r,e)=>{let n=C.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=C.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],s=r.length>=3&&r[2].data;e.mode===0&&i.push({type:s?r[2].dataType:1,data:e.value}),i.push(...W(r[0].dims,n));let a=["rank"],u=l=>{let f=V("output",r[0].dataType,n.length),c=B("x",r[0].dataType,t.length),p=c.type.value,g=MI(f,t.length,e),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&b.push({name:"constant_value",type:s?p:"f32"}),`
            ${l.registerUniforms(b).declareVariables(c,f)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(n)/64)},programUniforms:i}),getShaderSource:u}},VI=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let a=r[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},Qy=(r,e)=>{BI(r.inputs);let n=VI(r.inputs,e);r.compute(FI(r.inputs,n),{inputs:[0]})}});var Ui,tx,rx,nx,ox,GI,UI,ix,ax,sx,ux,lx,cx,fx,dx,px,mx,hx,bx,gx=k(()=>{"use strict";dt();fe();he();ye();Ui=r=>{if(me.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},tx=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Yr.adjustPoolAttributes(n,o,s,a,u,l);let f=Yr.computePoolOutputShape(n,o,a,u,s,l,e.autoPad),c=Object.assign({},e);i?Object.assign(c,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let p=f.slice();return p.push(p.splice(1,1)[0]),[c,t?p:f]},rx=(r,e)=>{let n=e.format==="NHWC",t=C.size(r),o=C.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],f=e.pads[e.pads.length-1],c=!!(l+f);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(e.kernelShape.length===2){let g=e.kernelShape[e.kernelShape.length-2],b=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],v=e.pads[e.pads.length-2];p=!!(h+v),i.push({type:12,data:g},{type:12,data:b},{type:12,data:h},{type:12,data:v}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=C.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,f)=>l+f);return[i,s,!!u,!1,!1]}},nx=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p=o.format==="NHWC",g=e.type.value,b=V("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",v="",w="",_=n-(p?2:1);if(f?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=n-(p?3:2);c?v=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:v=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${g}(${a});
              var pad = 0;
              ${v}
              ${h}
              ${w}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,v=o.pads.length,w="";return l?w=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:w=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${g}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${ee("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${ee("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ee("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${ee("uniforms.pads","j - 2u",v)};
                  ${w}
              }
              ${s}

              output[global_idx] = value;
            }`}},ox=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,GI=r=>`${ox(r)};${r.countIncludePad}`,UI=r=>`${ox(r)};${r.storageOrder};${r.dilations}`,ix=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),ax=(r,e,n,t)=>{let[o,i]=tx(e,t,n),s=B("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[f,c,p,g,b]=rx(i,o);f.push(...W(e.dims,i));let h=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${p};${g};${b}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:f}),getShaderSource:v=>nx(v,s,e.dims.length,i.length,o,u,l,0,c,p,g,b)}},sx=r=>{let e=r.count_include_pad!==0,n=ix(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:GI(t)}},ux=(r,e)=>{Ui(r.inputs),r.compute(ax("AveragePool",r.inputs[0],!1,e))},lx={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},cx=r=>{let e=r.format;return{format:e,...lx,cacheKey:e}},fx=(r,e)=>{Ui(r.inputs),r.compute(ax("GlobalAveragePool",r.inputs[0],!0,e))},dx=(r,e,n,t)=>{let[o,i]=tx(e,t,n),s=`
      value = max(x_val, value);
    `,a="",u=B("x",e.dataType,e.dims.length),l=["rank"],[f,c,p,g,b]=rx(i,o);return f.push(...W(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${p};${g};${b}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:f}),getShaderSource:h=>nx(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,c,p,g,b)}},px=(r,e)=>{Ui(r.inputs),r.compute(dx("MaxPool",r.inputs[0],!1,e))},mx=r=>{let e=r.storage_order,n=r.dilations,t=ix(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:UI(o)}},hx=r=>{let e=r.format;return{format:e,...lx,cacheKey:e}},bx=(r,e)=>{Ui(r.inputs),r.compute(dx("GlobalMaxPool",r.inputs[0],!0,e))}});var HI,qI,yx,xx,_x=k(()=>{"use strict";fe();he();qe();ye();HI=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},qI=(r,e)=>{let n=C.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,s=r[1].dataType,a=C.size(i),u=t===3||t===2,l=u?[Math.ceil(C.size(r[0].dims)/4)]:r[0].dims,f=r[1].dims,c=r.length>2?r[2]:void 0,p=c?u?[Math.ceil(C.size(c.dims)/4)]:c.dims:void 0,g=f.length===0||f.length===1&&f[0]===1,b=g===!1&&f.length===1,h=Oe(a),v=g&&(!u||h===4),w=v?h:1,_=v&&!u?h:1,I=B("input",u?12:t,l.length,_),$=B("scale",s,f.length),O=c?B("zero_point",u?12:t,p.length):void 0,E=V("output",s,i.length,w),L=[I,$];O&&L.push(O);let z=[l,f];c&&z.push(p);let U=[{type:12,data:a/w},{type:12,data:n},{type:12,data:e.blockSize},...W(...z,i)],K=M=>{let oe=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${M.registerUniforms(oe).declareVariables(...L,E)}
      ${M.mainStart()}
          ${M.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${w===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>g?`let scale_value= ${$.getByOffset("0")}`:b?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>O?g?u?`
                let zero_point_input = ${O.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${O.getByOffset("0")}`:b?u?`
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
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:O?["rank","rank","rank"]:["rank","rank"]},getShaderSource:K,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/w/64),y:1,z:1},programUniforms:U})}},yx=(r,e)=>{HI(r.inputs,e),r.compute(qI(r.inputs,e))},xx=r=>de({axis:r.axis,blockSize:r.blockSize})});var KI,jI,wx,vx=k(()=>{"use strict";dt();fe();ye();KI=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},jI=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:r},{type:t,data:n},...W(i)],u=l=>{let f=V("output",t,i.length),c=f.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(p).declareVariables(f)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},wx=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&KI(e,n,t),r.compute(jI(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var XI,ZI,Tx,Ix,Sx=k(()=>{"use strict";fe();he();qe();ye();XI=(r,e,n,t)=>{if(r!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${r}.`);let o=`{
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
              }`;switch(r){case"none":return`${e}=${n};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${n}));`:`
              ${o}bitcast<${t}>(oldValue) + (${n})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${n}));`:`${o}min(bitcast<${t}>(oldValue), (${n}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${r} is not supported.`)}},ZI=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n,i=1,s=Math.ceil(C.size(t)/i),a=t[t.length-1],u=C.sizeFromDimension(n,a),l=[{type:12,data:s},{type:12,data:a},{type:12,data:u},...W(r[1].dims,r[2].dims,o)],f=c=>{let p=B("indices",r[1].dataType,r[1].dims.length),g=B("updates",r[2].dataType,r[2].dims.length,i),b=e.reduction!=="none"&&e.reduction!==""?Yh("output",r[0].dataType,o.length):V("output",r[0].dataType,o.length,i);return`
      ${c.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(p,g,b)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${r[0].dims.length===1?`
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
    ${XI(e.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:f}},Tx=r=>de({reduction:r.reduction}),Ix=(r,e)=>{r.compute(ZI(r.inputs,e),{inputs:[r.inputs[1],r.inputs[2]],outputs:[]})}});var JI,YI,QI,eS,tS,rS,nS,oS,iS,aS,sS,$x,uS,lS,cS,fS,dS,Ax,Ox,Px=k(()=>{"use strict";fe();he();qe();ye();JI=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},YI=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},QI=(r,e,n,t,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(s>0&&r.length>s&&r[s].dims.length>0)r[s].getFloat32Array().forEach(f=>i.push(f));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&r.length>a&&r[a].dims.length===1&&r[a].dims[0]>0){if(r[a].getFloat32Array().forEach(f=>t.push(f)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");JI(t,e),e.axes.length>0&&YI(t,e.axes,l).forEach((f,c)=>t[c]=f)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},eS=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`return ${e}(xResized) / ${e}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",tS=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",rS=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+n]=o[e.length+s]}),t):o},nS=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,s)=>Math.round(i*e[s]))}return o},oS=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},iS=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${ee("uniforms.scales","i",t)};
        var roi_low = ${ee("uniforms.roi","i",o)};
        var roi_hi = ${ee("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${ee("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${ee("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,aS=(r,e,n,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ee("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ee("uniforms.roi","i",i)};
          var roi_hi = ${ee("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${ee("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ee("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
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
        ${r.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,sS=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ee("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,$x=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",uS=(r,e,n,t,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${$x(r,l,s,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${a}];
      var col:${f} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${f} = getInputValue(batch, channel, row1, col1);
      var x12: ${f} = getInputValue(batch, channel, row1, col2);
      var x21: ${f} = getInputValue(batch, channel, row2, col1);
      var x22: ${f} = getInputValue(batch, channel, row2, col2);
      var dx1: ${f} = abs(row - ${f}(row1));
      var dx2: ${f} = abs(${f}(row2) - row);
      var dy1: ${f} = abs(col - ${f}(col1));
      var dy2: ${f} = abs(${f}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},lS=(r,e,n,t,o,i,s,a,u,l)=>{let f=n.length===2,c=!0,[p,g]=f?[0,1]:c?[2,3]:[1,2],b=r.type.value,h=v=>{let w=v===p?"row":"col";return`
      fn ${w}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${b} {
        var output_index = ${e.indicesGet("output_indices",v)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[v]},
        ${t[v]}, ${n[v]}, ${i[v]}, ${i[v]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[v]} - 1))) {
          return ${u};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${w}: ${b} = originalIdx + ${b}(i);
          if (${w} < 0 || ${w} >= ${n[v]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${w} = max(0, min(${w}, ${n[v]} - 1));`)()};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",v,`u32(${w})`)};
          data[i + 1] = ${v===p?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(p)};
    ${h(g)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${b} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},cS=(r,e,n,t,o)=>{let[s,a,u,l,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${$x(r,f,s,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},fS=(r,e,n,t,o,i)=>{let s=r.dims,a=rS(i,e.axes,s.length),u=nS(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((_,I)=>_===0?1:u[I]/_),e.keepAspectRatioPolicy!=="stretch"&&(u=oS(s,l,e)));let f=V("output",r.dataType,u.length),c=B("input",r.dataType,s.length),p=C.size(u),g=s.length===u.length&&s.every((_,I)=>_===u[I]),b=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,v=c.type.value,w=_=>`
      ${g?"":`
      ${eS(e.coordinateTransformMode,v)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${sS(c,s)};
              ${tS(e.nearestMode,n,v)};
              ${aS(c,f,s,u,l.length,a.length,b)};
              `;case"linear":return`
              ${iS(f,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${uS(c,f,s,b,h)}`;if(s.length===3||s.length===5)return`${cS(c,f,s,b,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${lS(c,f,s,u,l,a,e.cubicCoeffA,b,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(c,f)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${g}|${s}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:a},...W(s,u)]})}},dS=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},Ax=(r,e)=>{let n=[],t=[],o=[],i=dS(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");QI(r.inputs,e,i,n,t,o),r.compute(fS(r.inputs[0],e,i,n,t,o),{inputs:[0]})},Ox=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,s=r.extrapolationValue,a=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return de({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var pS,mS,Ex,Cx=k(()=>{"use strict";fe();he();qe();ye();pS=(r,e)=>{let[n,t,o,i]=r,{numHeads:s,rotaryEmbeddingDim:a}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!C.areEqual(t.dims,[])&&!C.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!C.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],f=o.dims[0],c=C.sizeFromDimension(n.dims,1)/l,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},mS=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=r[0].dims[0],a=C.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=a/u,f=r[2].dims[1],c=o===0?f*2:l/t,p=new Array(s,u,l/c,c-f),g=C.computeStrides(p),b=[{type:1,data:i},{type:12,data:p},{type:12,data:g},...r[0].dims.length===3?new Array({type:12,data:[a,l,c,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...W(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],h=v=>{let w=B("input",r[0].dataType,r[0].dims.length),_=B("position_ids",r[1].dataType,r[1].dims.length),I=B("cos_cache",r[2].dataType,r[2].dims.length),$=B("sin_cache",r[3].dataType,r[3].dims.length),O=V("output",r[0].dataType,r[0].dims.length);return v.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${v.declareVariables(w,_,I,$,O)}

        ${v.mainStart(Qr)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",V("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${w.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${O.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${O.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${O.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:de({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(p)/Qr)},programUniforms:b})}},Ex=(r,e)=>{pS(r.inputs,e),r.compute(mS(r.inputs,e))}});var hS,bS,kx,Dx=k(()=>{"use strict";fe();he();ye();hS=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let s=r[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let s=r[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},bS=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,s=C.size(i),a=i,u=s,l=i.slice(-1)[0],f=t?i.slice(0,-1).concat(1):[],c=!o&&r.length>3,p=r.length>4,g=t&&n>1,b=t&&n>2,h=n>3,v=64,w=Oe(l),_=[{type:12,data:u},{type:12,data:w},{type:12,data:l},{type:1,data:e.epsilon}],I=O=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],L=[B("x",r[0].dataType,r[0].dims,w),B("skip",r[1].dataType,r[1].dims,w),B("gamma",r[2].dataType,r[2].dims,w)];c&&L.push(B("beta",r[3].dataType,r[3].dims,w)),p&&L.push(B("bias",r[4].dataType,r[4].dims,w)),L.push(V("output",r[0].dataType,a,w)),g&&L.push(V("mean_output",1,f)),b&&L.push(V("inv_std_output",1,f)),h&&L.push(V("input_skip_bias_sum",r[0].dataType,a,w));let z=ze(r[0].dataType),U=ze(1,w);return`

      ${O.registerUniforms(E).declareVariables(...L)}
      var<workgroup> sum_shared : array<${U}, ${v}>;
      var<workgroup> sum_squared_shared : array<${U}, ${v}>;

      ${O.mainStart([v,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${v};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${v};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${v-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${en(z,w,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${v};
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
        let mean = ${Ut("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ut("square_sum",w)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:a,dataType:r[0].dataType}];return n>1&&$.push({dims:f,dataType:1}),n>2&&$.push({dims:f,dataType:1}),n>3&&$.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${g};${b};${h}`,inputDependencies:r.map((O,E)=>"type")},getShaderSource:I,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:_})}},kx=(r,e)=>{hS(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(bS(r.inputs,e,r.outputCount,!1),{outputs:t})}});var gS,Wi,yS,Bx,xS,_S,Lx,Nx,zx=k(()=>{"use strict";fe();he();qe();ye();gS=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Wi=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},yS=(r,e)=>{if(r.length>1){let n=Wi(r,1),t=Wi(r,2),o=Wi(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),de({starts:n,ends:t,axes:o})}else return e},Bx=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},xS=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${ee("uniforms.input_shape","i",n.length)};
            let steps_i = ${ee("uniforms.steps","i",n.length)};
            let signs_i = ${ee("uniforms.signs","i",n.length)};
            let starts_i = ${ee("uniforms.starts","i",n.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,_S=(r,e)=>{let n=r[0].dims,t=C.size(n),o=e.axes.length>0?C.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Wi(r,4);i.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((w,_)=>Bx(w,_,n,o,i)),a=e.ends.map((w,_)=>Bx(w,_,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let w=0;w<n.length;++w)o.includes(w)||(s.splice(w,0,0),a.splice(w,0,n[w]),i.splice(w,0,1));let u=i.map(w=>Math.sign(w));i.forEach((w,_,I)=>{if(w<0){let $=(a[_]-s[_])/w,O=s[_],E=O+$*i[_];s[_]=E,a[_]=O,I[_]=-w}});let l=n.slice(0);o.forEach((w,_)=>{l[w]=Math.ceil((a[w]-s[w])/i[w])});let f={dims:l,dataType:r[0].dataType},c=V("output",r[0].dataType,l.length),p=B("input",r[0].dataType,r[0].dims.length),g=C.size(l),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:g},{type:12,data:s},{type:6,data:u},{type:12,data:i},...W(r[0].dims,l)],v=w=>`
      ${w.registerUniforms(b).declareVariables(p,c)}
        ${xS(p,c,n)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},Lx=(r,e)=>{gS(r.inputs,e);let n=yS(r.inputs,e);r.compute(_S(r.inputs,n),{inputs:[0]})},Nx=r=>{let e=r.starts,n=r.ends,t=r.axes;return de({starts:e,ends:n,axes:t})}});var wS,vS,Rx,Mx,Fx=k(()=>{"use strict";fe();he();qe();mr();ye();wS=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},vS=(r,e)=>{let n=r.inputs[0],t=n.dims,o=C.size(t),i=t.length,s=C.normalizeAxis(e.axis,i),a=s<t.length-1,u,l=[];a?(l=Array.from({length:i},(L,z)=>z),l[s]=i-1,l[i-1]=s,u=r.compute(it(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let f=u.dims,c=f[i-1],p=o/c,g=Oe(c),b=c/g,h=64;p===1&&(h=256);let v=(L,z)=>z===4?`max(max(${L}.x, ${L}.y), max(${L}.z, ${L}.w))`:z===2?`max(${L}.x, ${L}.y)`:z===3?`max(max(${L}.x, ${L}.y), ${L}.z)`:L,w=B("x",u.dataType,u.dims,g),_=V("result",u.dataType,u.dims,g),I=w.type.value,$=ze(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,O=L=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${L.registerUniform("packedCols","i32").declareVariables(w,_)}
      ${L.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
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
          rowMaxShared = ${I}(${v("threadShared[0]",g)});
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
          rowSumShared = ${I}(${Ut("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=r.compute({name:"Softmax",shaderCache:{hint:`${g};${h}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:u.dataType}],dispatchGroup:{x:p},programUniforms:[{type:6,data:b}]}),getShaderSource:O},{inputs:[u],outputs:[a?-1:0]})[0];a&&r.compute(it(E,l),{inputs:[E]})},Rx=(r,e)=>{wS(r.inputs),vS(r,e)},Mx=r=>de({axis:r.axis})});var Vx,TS,IS,SS,Gx,Ux=k(()=>{"use strict";fe();he();ye();Vx=r=>Array.from(r.getBigInt64Array(),Number),TS=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Vx(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},IS=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},SS=(r,e)=>{let n=r[0].dims,t=e??Vx(r[1]),o=IS(n,t),i=C.size(o),s=r[0].dataType,a=B("input",s,n.length),u=V("output",s,o.length),l=f=>`
      const inputShape = ${a.indices(...n)};
      ${f.registerUniform("output_size","u32").declareVariables(a,u)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...W(r[0].dims,o)]}),getShaderSource:l}},Gx=r=>{TS(r.inputs),r.compute(SS(r.inputs),{inputs:[0]})}});var $S,AS,Wx,Hx=k(()=>{"use strict";fe();he();ye();$S=(r,e,n,t,o)=>{let i=V("output_data",o,n.length,4),s=B("a_data",e[1].dataType,e[1].dims.length,4),a=B("b_data",e[2].dataType,e[2].dims.length,4),u=B("c_data",e[0].dataType,e[0].dims.length,4),l,f=(c,p,g)=>`select(${p}, ${c}, ${g})`;if(!t)l=i.setByOffset("global_idx",f(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,g,b="")=>{let h=`a_data[index_a${g}][component_a${g}]`,v=`b_data[index_b${g}][component_b${g}]`,w=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${i.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_b${g} = ${a.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_c${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${p}[${g}] = ${b}(${f(h,v,w)});
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
        ${r.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},AS=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(C.areEqual(e,n)&&C.areEqual(n,t)),s=e,a=C.size(e);if(i){let l=nr.calcShape(nr.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=C.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>$S(l,r,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...W(t,e,n,s)]})}},Wx=r=>{r.compute(AS(r.inputs))}});var qx,Kx=k(()=>{"use strict";Ab();Di();Eb();kb();gg();Og();Cg();Kg();ey();ny();ay();fy();my();by();xy();vy();Sy();Oy();Cy();By();Gy();Hy();Ky();Xy();Yy();mu();ex();gx();_x();vx();Sx();Ci();Px();Cx();Dx();zx();Fx();bu();Ux();mr();Li();Hx();qx=new Map([["Abs",[Db]],["Acos",[Bb]],["Acosh",[Lb]],["Add",[yg]],["ArgMax",[$b,tu]],["ArgMin",[Sb,tu]],["Asin",[Nb]],["Asinh",[zb]],["Atan",[Rb]],["Atanh",[Mb]],["Attention",[Ob]],["AveragePool",[ux,sx]],["BatchNormalization",[Pb]],["BiasAdd",[Cb]],["BiasSplitGelu",[bg]],["Cast",[Vb,Fb]],["Ceil",[Ub]],["Clip",[Gb]],["Concat",[Pg,Eg]],["Conv",[cu,lu]],["ConvTranspose",[Qg,Jg]],["Cos",[Wb]],["Cosh",[Hb]],["CumSum",[ty,ry]],["DepthToSpace",[oy,iy]],["DequantizeLinear",[yx,xx]],["Div",[xg]],["Einsum",[ly,cy]],["Elu",[qb,Zn]],["Equal",[_g]],["Erf",[Kb]],["Exp",[jb]],["Expand",[py]],["FastGelu",[hy]],["Floor",[Xb]],["FusedConv",[cu,lu]],["Gather",[yy,gy]],["GatherElements",[Ay,$y]],["GatherBlockQuantized",[Ty,Iy]],["GatherND",[_y,wy]],["Gelu",[Zb]],["Gemm",[Ey,Py]],["GlobalAveragePool",[fx,cx]],["GlobalMaxPool",[bx,hx]],["Greater",[Ig]],["GreaterOrEqual",[$g]],["GridSample",[ky,Dy]],["GroupQueryAttention",[Vy]],["HardSigmoid",[og,ng]],["InstanceNormalization",[Wy]],["LayerNormalization",[qy]],["LeakyRelu",[Jb,Zn]],["Less",[Sg]],["LessOrEqual",[Ag]],["Log",[pg]],["MatMul",[jy]],["MatMulNBits",[Zy,Jy]],["MaxPool",[px,mx]],["Mul",[wg]],["MultiHeadAttention",[zy,Ny]],["Neg",[Qb]],["Not",[Yb]],["Pad",[Qy]],["Pow",[vg]],["QuickGelu",[mg,Zn]],["Range",[wx]],["Reciprocal",[eg]],["ReduceMin",[xb]],["ReduceMean",[mb]],["ReduceMax",[yb]],["ReduceSum",[wb]],["ReduceProd",[_b]],["ReduceL1",[hb]],["ReduceL2",[bb]],["ReduceLogSum",[Tb]],["ReduceLogSumExp",[gb]],["ReduceSumSquare",[vb]],["Relu",[tg]],["Resize",[Ax,Ox]],["RotaryEmbedding",[Ex]],["ScatterND",[Ix,Tx]],["Sigmoid",[rg]],["Sin",[ig]],["Sinh",[ag]],["Slice",[Lx,Nx]],["SkipLayerNormalization",[kx]],["Split",[Ry,My]],["Sqrt",[sg]],["Softmax",[Rx,Mx]],["Sub",[Tg]],["Tan",[ug]],["Tanh",[cg]],["ThresholdedRelu",[dg,Zn]],["Tile",[Gx]],["Transpose",[tb,rb]],["Where",[Wx]]])});var Hi,jx=k(()=>{"use strict";dt();rr();ye();Hi=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){It(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of n)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),bt(e.programInfo.name)}dispose(){}build(e,n){It(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(c=>{t.features.has(c.feature)&&o.push(`enable ${c.extension};`)});let s=Qh(n,this.backend.device.limits),a=e.getShaderSource(s),u=`${o.join(`
`)}
${s.additionalImplementations}
${a}`,l=t.createShaderModule({code:u,label:e.name});we("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let f=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return bt(e.name),{programInfo:e,computePipeline:f,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let s=n*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var OS,PS,gu,yu,qi,Xx=k(()=>{"use strict";dt();fe();rr();Ws();Xh();Kx();jx();OS=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},PS=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${OS(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},gu=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},yu=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let n=e.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},qi=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=s=>n.features.has(s)&&t.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new yu(this.device),this.adapterInfo=new gu(n.info||await n.requestAdapterInfo()),this.gpuDataManager=jh(this),this.programManager=new Hi(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Si(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;It(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,f=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,g=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let h=Number(g-this.queryTimeBase),v=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(w=>({dims:w.dims,dataType:Pr(w.dataType)})),outputsMetadata:p.map(w=>({dims:w.dims,dataType:Pr(w.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:f,startTime:h,endTime:v});else{let w="";c.forEach((I,$)=>{w+=`input[${$}]: [${I.dims}] | ${Pr(I.dataType)}, `});let _="";p.forEach((I,$)=>{_+=`output[${$}]: [${I.dims}] | ${Pr(I.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${f}" ${w}${_}execution time: ${v-h} ns`)}xo("GPU",`${f}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),bt()}run(e,n,t,o,i,s){It(e.name);let a=[];for(let I=0;I<n.length;++I){let $=n[I].data;if($===0)continue;let O=this.gpuDataManager.get($);if(!O)throw new Error(`no GPU data for input: ${$}`);a.push(O)}let{outputs:u,dispatchGroup:l,programUniforms:f}=e.getRunData(n),c=t.length===0?u.map((I,$)=>$):t;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],g=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(c[I])||c[I]<-3||c[I]>=s)throw new Error(`Invalid output index: ${c[I]}`);if(c[I]===-3)continue;let $=c[I]===-1,O=c[I]===-2,E=$||O?i(u[I].dataType,u[I].dims):o(c[I],u[I].dataType,u[I].dims);if(p.push(E),E.data===0)continue;let L=this.gpuDataManager.get(E.data);if(!L)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(L),O){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(L)}g.push(L)}if(a.length!==n.length||g.length!==p.length){if(g.length===0)return bt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(f){let I=0,$=[];f.forEach(z=>{let U=typeof z.data=="number"?[z.data]:z.data;if(U.length===0)return;let K=z.type===10?2:4,M,oe;z.type===10?(oe=U.length>4?16:U.length>2?8:U.length*K,M=U.length>4?16:K*U.length):(oe=U.length<=2?U.length*K:16,M=16),I=Math.ceil(I/oe)*oe,$.push(I);let q=z.type===10?8:4;I+=U.length>4?Math.ceil(U.length/q)*M:U.length*K});let O=16;I=Math.ceil(I/O)*O;let E=new ArrayBuffer(I);f.forEach((z,U)=>{let K=$[U],M=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(E,K,M.length).set(M);else if(z.type===12)new Uint32Array(E,K,M.length).set(M);else if(z.type===10)new Uint16Array(E,K,M.length).set(M);else if(z.type===1)new Float32Array(E,K,M.length).set(M);else throw new Error(`Unsupported uniform type: ${Pr(z.type)}`)});let L=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(L.buffer,0,E,0,I),this.gpuDataManager.release(L.id),b={offset:0,size:I,buffer:L.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),v=h[1]===1&&h[2]===1,w=PS(e,n,v),_=this.programManager.getArtifact(w);if(_||(_=this.programManager.build(e,h),this.programManager.setArtifact(w,_),we("info",()=>`[artifact] key: ${w}, programName: ${e.name}`)),f&&_.uniformVariablesInfo){if(f.length!==_.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${f.length} in program "${_.programInfo.name}".`);for(let I=0;I<f.length;I++){let $=f[I],O=$.type,E=typeof $.data=="number"?1:$.data.length,[L,z]=_.uniformVariablesInfo[I];if(O!==L||E!==z)throw new Error(`Uniform variable ${I} mismatch: expect type ${L} with size ${z}, got type ${O} with size ${E} in program "${_.programInfo.name}".`)}}if(we("info",()=>`[ProgramManager] run "${e.name}" (key=${w}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(_,a,g,h,b),bt(e.name),p}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=qx.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,s)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),we("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(f){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${f}`)),1}finally{l&&t.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(t,o,s);return i.set(n,[a,t]),a}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await js(this,e,n);return $i(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){we("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){we("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){we("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var ES,Zx,CS,Jx,Ki,ji,xu,Yx,Qx=k(()=>{"use strict";rr();ES=1,Zx=()=>ES++,CS=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Jx=(r,e)=>{let n=CS.get(r);if(!n)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*n/8):0},Ki=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Jx(this.dataType,this.tensorShape)}destroy(){we("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,n,t){return this.mlContext===e&&this.dataType===n&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}},ji=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t,o){if(this.wrapper){if(this.wrapper.canReuseTensor(e,n,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Jx(n,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let i=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(n,t,i,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else we("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},xu=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let e=Zx();return this.tensorTrackersById.set(e,new ji(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o){we("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${e}, dataType: ${n}, shape: ${t}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(this.backend.currentContext,n,t,o)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){we("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=Zx(),s=new Ki({sessionId:this.backend.currentSessionId,context:e,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(i,new ji(this,s)),this.externalTensors.add(s),i}async getCachedTensor(e,n,t,o,i){let s=this.backend.currentSessionId,a=this.backend.currentContext;for(let[l,f]of this.freeTensors.entries())if(f.canReuseTensor(a,e,n)){we("verbose",()=>`[WebNN] Reusing tensor {dataType: ${e}, shape: ${n}}`);let c=this.freeTensors.splice(l,1)[0];return c.sessionId=s,c}we("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${e}, shape: ${n}}`);let u=await a.createTensor({dataType:e,shape:n,dimensions:n,usage:t,writable:o,readable:i});return new Ki({sessionId:s,context:a,tensor:u,dataType:e,shape:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Yx=(...r)=>new xu(...r)});var e0,kS,Xi,t0=k(()=>{"use strict";fe();Or();Ws();Qx();rr();e0=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),kS=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},Xi=class{constructor(e){this.tensorManager=Yx(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Si(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){this.activeSessionId=e}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>kS(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}get currentContext(){let e=this.getMLContext(this.currentSessionId);if(!e)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return e}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e)}onReleaseSession(e){let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){we("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o){let i=e0.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e,i,t,o)}uploadTensor(e,n){if(!je().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");we("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return $i(t,n)}}registerMLTensor(e,n,t){let o=e0.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,e,o,t);return we("verbose",()=>`[WebNN] registerMLTensor {tensor: ${e}, dataType: ${o}, dimensions: ${t}} -> {tensorId: ${i}}`),i}registerMLConstant(e,n,t,o,i,s){if(!s)throw new Error("External mounted files are not available.");let a=e;e.startsWith("./")&&(a=e.substring(2));let u=s.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(n+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(n,n+t).buffer,f;switch(i.dataType){case"float32":f=new Float32Array(l);break;case"float16":f=new Uint16Array(l);break;case"int32":f=new Int32Array(l);break;case"uint32":f=new Uint32Array(l);break;case"int64":f=new BigInt64Array(l);break;case"uint64":f=new BigUint64Array(l);break;case"int8":f=new Int8Array(l);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return we("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,f)}flush(){}}});var r0={};un(r0,{init:()=>DS});var eo,_u,DS,n0=k(()=>{"use strict";fe();Xx();rr();he();t0();eo=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(C.size(e)!==C.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},_u=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,s));let a=Number(e.getValue(o*i++,s));this.outputCount=Number(e.getValue(o*i++,s)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,s));let u=[];for(let l=0;l<a;l++){let f=Number(e.getValue(o*i++,s)),c=Number(e.getValue(o*i++,"*")),p=Number(e.getValue(o*i++,s)),g=[];for(let b=0;b<p;b++)g.push(Number(e.getValue(o*i++,s)));u.push(new eo(e,f,c,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new eo(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=Jr(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let f=l>0?this.backend.gpuDataManager.create(l).id:0;return new eo(this.module,a,f,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,i);for(let a=0;a<n.length;a++)this.module.setValue(s+o*(a+1),n[a],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},DS=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new qi;await i.initialize(n,t),o("webgpu",[i,s=>i.alloc(Number(s)),s=>i.free(s),(s,a,u,l=!1)=>{if(l)we("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(a)}, size=${Number(u)}`),i.memcpy(Number(s),Number(a));else{we("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let f=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));i.upload(Number(a),f)}},async(s,a,u)=>{we("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(Number(s),()=>e.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(s,a,u)=>i.createKernel(s,Number(a),u,e.UTF8ToString(e._JsepGetNodeName(Number(a)))),s=>i.releaseKernel(s),(s,a,u,l)=>{we("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let f=new _u(e,i,Number(a));return i.computeKernel(Number(s),f,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Xi(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,l)=>i.ensureTensor(s,a,u,l),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var BS,pi,mi,tn,LS,Hn,hi,bi,o0,gi,yi,xi,zs=k(()=>{"use strict";Fh();Gh();fe();Or();wi();Us();BS=(r,e)=>{je()._OrtInit(r,e)!==0&&$e("Can't initialize onnxruntime.")},pi=async r=>{BS(r.wasm.numThreads,jn(r.logLevel))},mi=async(r,e)=>{{let n=(n0(),On(r0)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",je(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",je(),r)}}},tn=new Map,LS=r=>{let e=je(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&$e("Can't get session input/output count.");let s=t===4?"i32":"i64";return[Number(e.getValue(o,s)),Number(e.getValue(o+t,s))]}finally{e.stackRestore(n)}},Hn=r=>{let e=je(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},hi=async(r,e)=>{let n,t,o=je();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=Hn(r);let i=0,s=0,a=0,u=[],l=[],f=[];try{if([s,u]=Vh(e),e?.externalData&&o.mountExternalData){let _=[];for(let I of e.externalData){let $=typeof I=="string"?I:I.path;_.push(Xn(typeof I=="string"?I:I.data).then(O=>{o.mountExternalData($,O)}))}await Promise.all(_)}for(let _ of e?.executionProviders??[])if((typeof _=="string"?_:_.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof _!="string"){let $=_,O=$?.context,E=$?.gpuDevice,L=$?.deviceType,z=$?.powerPreference;O?o.currentContext=O:E?o.currentContext=await o.jsepCreateMLContext(E):o.currentContext=await o.jsepCreateMLContext({deviceType:L,powerPreference:z})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(n,t,s),i===0&&$e("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=LS(i),g=!!e?.enableGraphCapture,b=[],h=[],v=[];for(let _=0;_<c;_++){let I=o._OrtGetInputName(i,_);I===0&&$e("Can't get an input name."),l.push(I),b.push(o.UTF8ToString(I))}for(let _=0;_<p;_++){let I=o._OrtGetOutputName(i,_);I===0&&$e("Can't get an output name."),f.push(I);let $=o.UTF8ToString(I);h.push($);{if(g&&e?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let O=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[$]??"cpu";if(O!=="cpu"&&O!=="cpu-pinned"&&O!=="gpu-buffer"&&O!=="ml-tensor")throw new Error(`Not supported preferred output location: ${O}.`);if(g&&O!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${O}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(O)}}let w=null;return v.some(_=>_==="gpu-buffer"||_==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&$e("Can't create IO binding."),w={handle:a,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(_=>Gs(_))}),tn.set(i,[i,l,f,w,g,!1]),[i,b,h]}catch(c){throw l.forEach(p=>o._OrtFree(p)),f.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a)!==0&&$e("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&$e("Can't release session."),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&$e("Can't release session options."),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},bi=r=>{let e=je(),n=tn.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,s,a]=n;s&&(a&&e._OrtClearBoundOutputs(s.handle)!==0&&$e("Can't clear bound outputs."),e._OrtReleaseBinding(s.handle)!==0&&$e("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&$e("Can't release session."),tn.delete(r)},o0=(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let s=je(),a=s.PTR_SIZE,u=r[0],l=r[1],f=r[3],c,p;if(u==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let h=r[2].gpuBuffer;p=Jr(Kn(u),l);let v=s.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=v(t,o,h,p)}else if(f==="ml-tensor"){let h=r[2].mlTensor;p=Jr(Kn(u),l);let v=s.jsepRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=v(h,Kn(u),l)}else{let h=r[2];if(Array.isArray(h)){p=a*h.length,c=s._malloc(p),n.push(c);for(let v=0;v<h.length;v++){if(typeof h[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);s.setValue(c+v*a,nt(h[v],n),"*")}}else p=h.byteLength,c=s._malloc(p),n.push(c),s.HEAPU8.set(new Uint8Array(h.buffer,h.byteOffset,p),c)}let g=s.stackSave(),b=s.stackAlloc(4*l.length);try{l.forEach((v,w)=>s.setValue(b+w*a,v,a===4?"i32":"i64"));let h=s._OrtCreateTensor(Kn(u),c,p,b,l.length,Gs(f));h===0&&$e(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(h)}finally{s.stackRestore(g)}},gi=async(r,e,n,t,o,i)=>{let s=je(),a=s.PTR_SIZE,u=tn.get(r);if(!u)throw new Error(`cannot run inference. invalid session id: ${r}`);let l=u[0],f=u[1],c=u[2],p=u[3],g=u[4],b=u[5],h=e.length,v=t.length,w=0,_=[],I=[],$=[],O=[],E=s.stackSave(),L=s.stackAlloc(h*a),z=s.stackAlloc(h*a),U=s.stackAlloc(v*a),K=s.stackAlloc(v*a);try{s.jsepOnRunStart?.(l),[w,_]=Mh(i);for(let q=0;q<h;q++)o0(n[q],I,O,r,e[q],g);for(let q=0;q<v;q++)o0(o[q],$,O,r,h+t[q],g);for(let q=0;q<h;q++)s.setValue(L+q*a,I[q],"*"),s.setValue(z+q*a,f[e[q]],"*");for(let q=0;q<v;q++)s.setValue(U+q*a,$[q],"*"),s.setValue(K+q*a,c[t[q]],"*");if(p&&!b){let{handle:q,outputPreferredLocations:te,outputPreferredLocationsEncoded:Re}=p;if(f.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${f.length}).`);for(let Z=0;Z<h;Z++){let Y=e[Z];await s._OrtBindInput(q,f[Y],I[Z])!==0&&$e(`Can't bind input[${Z}] for session=${r}.`)}for(let Z=0;Z<v;Z++){let Y=t[Z];o[Z]?.[3]?s._OrtBindOutput(q,c[Y],$[Z],0)!==0&&$e(`Can't bind pre-allocated output[${Z}] for session=${r}.`):s._OrtBindOutput(q,c[Y],0,Re[Y])!==0&&$e(`Can't bind output[${Z}] to ${te[Z]} for session=${r}.`)}tn.set(r,[l,f,c,p,g,!0])}let M;p?M=await s._OrtRunWithBinding(l,p.handle,v,U,w):M=await s._OrtRun(l,z,L,h,K,v,U,w),M!==0&&$e("failed to call OrtRun().");let oe=[];for(let q=0;q<v;q++){let te=Number(s.getValue(U+q*a,"*"));if(te===$[q]){oe.push(o[q]);continue}let Re=s.stackSave(),Z=s.stackAlloc(4*a),Y=!1,be,ue=0;try{s._OrtGetTensorData(te,Z,Z+a,Z+2*a,Z+3*a)!==0&&$e(`Can't access output tensor data on index ${q}.`);let at=a===4?"i32":"i64",Fe=Number(s.getValue(Z,at));ue=s.getValue(Z+a,"*");let pe=s.getValue(Z+a*2,"*"),G=Number(s.getValue(Z+a*3,at)),ne=[];for(let Ae=0;Ae<G;Ae++)ne.push(Number(s.getValue(pe+Ae*a,at)));s._OrtFree(pe)!==0&&$e("Can't free memory for tensor dims.");let ke=ne.reduce((Ae,Xe)=>Ae*Xe,1);be=Pr(Fe);let ft=p?.outputPreferredLocations[t[q]];if(be==="string"){if(ft==="gpu-buffer"||ft==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ae=[];for(let Xe=0;Xe<ke;Xe++){let Nt=s.getValue(ue+Xe*a,"*"),ta=s.getValue(ue+(Xe+1)*a,"*"),kr=Xe===ke-1?void 0:ta-Nt;Ae.push(s.UTF8ToString(Nt,kr))}oe.push([be,ne,Ae,"cpu"])}else if(ft==="gpu-buffer"&&ke>0){let Ae=s.jsepGetBuffer;if(!Ae)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Xe=Ae(ue),Nt=Jr(Fe,ke);if(Nt===void 0||!Ti(be))throw new Error(`Unsupported data type: ${be}`);Y=!0,oe.push([be,ne,{gpuBuffer:Xe,download:s.jsepCreateDownloader(Xe,Nt,be),dispose:()=>{s._OrtReleaseTensor(te)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(ft==="ml-tensor"&&ke>0){let Ae=s.jsepEnsureTensor;if(!Ae)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Jr(Fe,ke)===void 0||!Ii(be))throw new Error(`Unsupported data type: ${be}`);let Nt=await Ae(ue,Fe,ne,!1);Y=!0,oe.push([be,ne,{mlTensor:Nt,download:s.jsepCreateMLTensorDownloader(ue,be),dispose:()=>{s.jsepReleaseTensorId(ue),s._OrtReleaseTensor(te)}},"ml-tensor"])}else{let Ae=vi(be),Xe=new Ae(ke);new Uint8Array(Xe.buffer,Xe.byteOffset,Xe.byteLength).set(s.HEAPU8.subarray(ue,ue+Xe.byteLength)),oe.push([be,ne,Xe,"cpu"])}}finally{s.stackRestore(Re),be==="string"&&ue&&s._free(ue),Y||s._OrtReleaseTensor(te)}}return p&&!g&&(s._OrtClearBoundOutputs(p.handle)!==0&&$e("Can't clear bound outputs."),tn.set(r,[l,f,c,p,g,!1])),oe}finally{s.stackRestore(E),I.forEach(M=>s._OrtReleaseTensor(M)),$.forEach(M=>s._OrtReleaseTensor(M)),O.forEach(M=>s._free(M)),w!==0&&s._OrtReleaseRunOptions(w),_.forEach(M=>s._free(M))}},yi=r=>{let e=je(),n=tn.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&$e("Can't get an profile file name."),e._OrtFree(o)},xi=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var rn,Lt,to,Ji,Yi,Zi,wu,vu,Sn,$n,zS,i0,a0,s0,u0,l0,c0,f0,Tu=k(()=>{"use strict";dt();zs();Or();fi();rn=()=>!!me.wasm.proxy&&typeof document<"u",to=!1,Ji=!1,Yi=!1,vu=new Map,Sn=(r,e)=>{let n=vu.get(r);n?n.push(e):vu.set(r,[e])},$n=()=>{if(to||!Ji||Yi||!Lt)throw new Error("worker not ready")},zS=r=>{switch(r.data.type){case"init-wasm":to=!1,r.data.err?(Yi=!0,wu[1](r.data.err)):(Ji=!0,wu[0]()),Zi&&(URL.revokeObjectURL(Zi),Zi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=vu.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},i0=async()=>{if(!Ji){if(to)throw new Error("multiple calls to 'initWasm()' detected.");if(Yi)throw new Error("previous call to 'initWasm()' failed.");if(to=!0,rn())return new Promise((r,e)=>{Lt?.terminate(),Nh().then(([n,t])=>{try{Lt=t,Lt.onerror=i=>e(i),Lt.onmessage=zS,wu=[r,e];let o={type:"init-wasm",in:me};!o.in.wasm.wasmPaths&&(n||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Lt.postMessage(o),Zi=n}catch(o){e(o)}},e)});try{await di(me.wasm),await pi(me),Ji=!0}catch(r){throw Yi=!0,r}finally{to=!1}}},a0=async r=>{if(rn())return $n(),new Promise((e,n)=>{Sn("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:me}};Lt.postMessage(t)});await mi(me,r)},s0=async r=>rn()?($n(),new Promise((e,n)=>{Sn("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Lt.postMessage(t,[r.buffer])})):Hn(r),u0=async(r,e)=>{if(rn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return $n(),new Promise((n,t)=>{Sn("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Lt.postMessage(o,i)})}else return hi(r,e)},l0=async r=>{if(rn())return $n(),new Promise((e,n)=>{Sn("release",[e,n]);let t={type:"release",in:r};Lt.postMessage(t)});bi(r)},c0=async(r,e,n,t,o,i)=>{if(rn()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return $n(),new Promise((s,a)=>{Sn("run",[s,a]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};Lt.postMessage(l,xi(u))})}else return gi(r,e,n,t,o,i)},f0=async r=>{if(rn())return $n(),new Promise((e,n)=>{Sn("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Lt.postMessage(t)});yi(r)}});var d0,RS,Qi,p0=k(()=>{"use strict";dt();Tu();fe();ci();Us();d0=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},RS=r=>{switch(r[3]){case"cpu":return new Tt(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Ti(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return Tt.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!Ii(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return Tt.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},Qi=class{async fetchModelAndCopyToWasmMemory(e){return s0(await Xn(e))}async loadModel(e,n){It();let t;typeof e=="string"?!1?t=await Xn(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await u0(t,n),bt()}async dispose(){return l0(this.sessionId)}async run(e,n,t){It();let o=[],i=[];Object.entries(e).forEach(p=>{let g=p[0],b=p[1],h=this.inputNames.indexOf(g);if(h===-1)throw new Error(`invalid input '${g}'`);o.push(b),i.push(h)});let s=[],a=[];Object.entries(n).forEach(p=>{let g=p[0],b=p[1],h=this.outputNames.indexOf(g);if(h===-1)throw new Error(`invalid output '${g}'`);s.push(b),a.push(h)});let u=o.map((p,g)=>d0(p,()=>`input "${this.inputNames[i[g]]}"`)),l=s.map((p,g)=>p?d0(p,()=>`output "${this.outputNames[a[g]]}"`):null),f=await c0(this.sessionId,i,u,a,l,t),c={};for(let p=0;p<f.length;p++)c[this.outputNames[a[p]]]=s[p]??RS(f[p]);return bt(),c}startProfiling(){}endProfiling(){f0(this.sessionId)}}});var h0={};un(h0,{OnnxruntimeWebAssemblyBackend:()=>ea,initializeFlags:()=>m0,wasmBackend:()=>MS});var m0,ea,MS,b0=k(()=>{"use strict";dt();Tu();p0();m0=()=>{if((typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0),me.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let r=typeof navigator>"u"?Sa("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}},ea=class{async init(e){m0(),await i0(),await a0(e)}async createInferenceSessionHandler(e,n){let t=new Qi;return await t.loadModel(e,n),Promise.resolve(t)}},MS=new ea});dt();dt();dt();var yc="1.21.0-dev.20250124-d00ae325ce";var PG=Ca;{let r=(Th(),On(vh)).onnxjsBackend;wr("webgl",r,-10)}{let r=(b0(),On(h0)).wasmBackend;wr("webgpu",r,5),wr("webnn",r,5),wr("cpu",r,10),wr("wasm",r,10)}Object.defineProperty(me.versions,"web",{value:yc,enumerable:!0});export{G_ as InferenceSession,xo as TRACE,It as TRACE_FUNC_BEGIN,bt as TRACE_FUNC_END,Tt as Tensor,PG as default,me as env,wr as registerBackend};
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
