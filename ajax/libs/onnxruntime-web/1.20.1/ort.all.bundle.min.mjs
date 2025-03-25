/*!
 * ONNX Runtime Web v1.20.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var yw=Object.create;var yo=Object.defineProperty;var xw=Object.getOwnPropertyDescriptor;var ww=Object.getOwnPropertyNames;var vw=Object.getPrototypeOf,Tw=Object.prototype.hasOwnProperty;var $a=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var C=(r,e)=>()=>(r&&(e=r(r=0)),e);var tt=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),un=(r,e)=>{for(var n in e)yo(r,n,{get:e[n],enumerable:!0})},Gl=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ww(e))!Tw.call(r,o)&&o!==n&&yo(r,o,{get:()=>e[o],enumerable:!(t=xw(e,o))||t.enumerable});return r};var ln=(r,e,n)=>(n=r!=null?yw(vw(r)):{},Gl(e||!r||!r.__esModule?yo(n,"default",{value:r,enumerable:!0}):n,r)),Pn=r=>Gl(yo({},"__esModule",{value:!0}),r);var xo,Lr,vr,_w,wo,vo=C(()=>{"use strict";xo=new Map,Lr=[],vr=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=xo.get(r);if(t===void 0)xo.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Lr.indexOf(r);o!==-1&&Lr.splice(o,1);for(let i=0;i<Lr.length;i++)if(xo.get(Lr[i]).priority<=n){Lr.splice(i,0,r);return}Lr.push(r)}return}throw new TypeError("not a valid backend")},_w=async r=>{let e=xo.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},wo=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Lr:n,o,i=[],s=new Set;for(let u of t){let l=await _w(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var Ul=C(()=>{"use strict";vo()});var Wl,Hl=C(()=>{"use strict";Wl="1.20.1"});var ql,St,Aa=C(()=>{"use strict";Hl();ql="warning",St={wasm:{},webgl:{},webgpu:{},versions:{common:Wl},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);ql=r}},get logLevel(){return ql}};Object.defineProperty(St,"logLevel",{enumerable:!0})});var ce,jl=C(()=>{"use strict";Aa();ce=St});var Kl,Xl,Zl=C(()=>{"use strict";Kl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let f=i*o,c=0,p=f,b=f*2,g=-1;s==="RGBA"?(c=0,p=f,b=f*2,g=f*3):s==="RGB"?(c=0,p=f,b=f*2):s==="RBG"&&(c=0,b=f,p=f*2);for(let h=0;h<i;h++)for(let v=0;v<o;v++){let T=(r.data[c++]-l[0])*u[0],w=(r.data[p++]-l[1])*u[1],_=(r.data[b++]-l[2])*u[2],$=g===-1?255:(r.data[g++]-l[3])*u[3];t.fillStyle="rgba("+T+","+w+","+_+","+$+")",t.fillRect(v,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Xl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],s=r.dims[3]):(o=r.dims[3],i=r.dims[2],s=r.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,f;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let c=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,b=0,g=1,h=2,v=3,T=0,w=c,_=c*2,$=-1;a==="RGBA"?(T=0,w=c,_=c*2,$=c*3):a==="RGB"?(T=0,w=c,_=c*2):a==="RBG"&&(T=0,_=c,w=c*2),t=n.createImageData(o,i);for(let P=0;P<i*o;b+=p,g+=p,h+=p,v+=p,P++)t.data[b]=(r.data[T++]-f[0])*l[0],t.data[g]=(r.data[w++]-f[1])*l[1],t.data[h]=(r.data[_++]-f[2])*l[2],t.data[v]=$===-1?255:(r.data[$++]-f[3])*l[3]}else throw new Error("Can not access image data");return t}});var Pa,Yl,Jl,Ql,ec,tc,rc=C(()=>{"use strict";To();Pa=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,f=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,p=0,b=1,g=2,h=3,v=0,T=l,w=l*2,_=-1;a==="RGB"&&(c=3,p=0,b=1,g=2,h=-1),u==="RGBA"?_=l*3:u==="RBG"?(v=0,w=l,T=l*2):u==="BGR"&&(w=0,T=l,v=l*2);for(let P=0;P<l;P++,p+=c,g+=c,b+=c,h+=c)f[v++]=(r[p]+s[0])/i[0],f[T++]=(r[b]+s[1])/i[1],f[w++]=(r[g]+s[2])/i[2],_!==-1&&h!==-1&&(f[_++]=(r[h]+s[3])/i[3]);return u==="RGBA"?new ft("float32",f,[1,4,n,t]):new ft("float32",f,[1,3,n,t])},Yl=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,b=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,b=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=b}else a.tensorFormat="RGBA",a.height=p,a.width=b;c.drawImage(r,0,0),s=c.getImageData(0,0,b,p).data}else throw new Error("Can not access image data")}else if(t){let f,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(f=e.resizedHeight,c=e.resizedWidth):(f=r.height,c=r.width),e!==void 0&&(a=e),a.format="RGBA",a.height=f,a.width=c,e!==void 0){let p=u();p.width=c,p.height=f;let b=l(p);if(b!=null)b.putImageData(r,0,0),s=b.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else s=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,b=r.width;return c.drawImage(r,0,0,b,p),s=c.getImageData(0,0,b,p).data,a.height=p,a.width=b,Pa(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,c)=>{let p=u(),b=l(p);if(!r||!b)return c();let g=new Image;g.crossOrigin="Anonymous",g.src=r,g.onload=()=>{p.width=g.width,p.height=g.height,b.drawImage(g,0,0,p.width,p.height);let h=b.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,f(Pa(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Pa(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},Jl=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,s=[1,t,n,4];return new ft({location:"texture",type:"float32",texture:r,dims:s,download:o,dispose:i})},Ql=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new ft({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},ec=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new ft({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},tc=(r,e,n)=>new ft({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Rr,On,nc,oc,ic=C(()=>{"use strict";Rr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),On=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),nc=!1,oc=()=>{if(!nc){nc=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;r&&(Rr.set("int64",BigInt64Array),On.set(BigInt64Array,"int64")),e&&(Rr.set("uint64",BigUint64Array),On.set(BigUint64Array,"uint64")),n?(Rr.set("float16",Float16Array),On.set(Float16Array,"float16")):Rr.set("float16",Uint16Array)}}});var ac,sc,uc=C(()=>{"use strict";To();ac=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},sc=(r,e)=>{switch(r.location){case"cpu":return new ft(r.type,r.data,e);case"cpu-pinned":return new ft({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new ft({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new ft({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new ft({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var ft,To=C(()=>{"use strict";Zl();rc();ic();uc();ft=class{constructor(e,n,t){oc();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=Rr.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=Rr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(e);else{let l=On.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=ac(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,n){return Yl(e,n)}static fromTexture(e,n){return Jl(e,n)}static fromGpuBuffer(e,n){return Ql(e,n)}static fromMLTensor(e,n){return ec(e,n)}static fromPinnedBuffer(e,n,t){return tc(e,n,t)}toDataURL(e){return Kl(this,e)}toImageData(e){return Xl(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return sc(this,e)}}});var nt,_o=C(()=>{"use strict";To();nt=ft});var Io,lc,$t,wt,Oa=C(()=>{"use strict";Aa();Io=(r,e)=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||console.timeStamp(`${r}::ORT::${e}`)},lc=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),Io("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},$t=r=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||lc("BEGIN",r)},wt=r=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||lc("END",r)}});var So,cc=C(()=>{"use strict";vo();_o();Oa();So=class r{constructor(e){this.handler=e}async run(e,n,t){$t();let o={},i={};if(typeof e!="object"||e===null||e instanceof nt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof nt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof nt)&&(l=!0,s=!1,o[c]=p)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let f=a[l];f instanceof nt?u[l]=f:u[l]=new nt(f.type,f.data,f.dims)}return wt(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){$t();let i,s={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let f=e,c=0,p=e.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(p=e.byteLength-c,typeof t=="number"){if(p=t,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await wo(s),l=await a.createInferenceSessionHandler(i,u);return wt(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Iw,fc=C(()=>{"use strict";cc();Iw=So});var dc=C(()=>{"use strict"});var pc=C(()=>{"use strict"});var mc=C(()=>{"use strict"});var hc=C(()=>{"use strict"});var Sw,$o,gc=C(()=>{"use strict";vo();_o();Sw="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",$o=class r{constructor(e,n,t){this.handler=e,this.hasOptimizerModel=n,this.hasEvalModel=t}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(e,n){let t=e.evalModel||"",o=e.optimizerModel||"",i=n||{},[s,a]=await wo(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(e.checkpointState,e.trainModel,t,o,a);return new r(u,!!e.optimizerModel,!!e.evalModel)}else throw new Error(Sw)}typeNarrowingForRunStep(e,n,t,o,i){let s={},a={};if(typeof t!="object"||t===null||t instanceof nt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof nt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(o);for(let c of n)if(f.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof nt)&&(l=!0,u=!1,s[c]=p)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of e)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of n)s[l]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(e){let n={};for(let t in e)if(Object.hasOwnProperty.call(e,t)){let o=e[t];o instanceof nt?n[t]=o:n[t]=new nt(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(e,n,t){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,e,n,t),s=await this.handler.runTrainStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(e){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(e||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(e,n,t){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,e,n,t),s=await this.handler.runEvalStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(e=!0){return this.handler.getParametersSize(e)}async loadParametersBuffer(e,n=!0){let t=await this.getParametersSize(n);if(e.length!==4*t)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(e,n)}async getContiguousParameters(e=!0){return this.handler.getContiguousParameters(e)}async release(){return this.handler.dispose()}}});var $w,bc=C(()=>{"use strict";gc();$w=$o});var Ea={};un(Ea,{InferenceSession:()=>Iw,TRACE:()=>Io,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>wt,Tensor:()=>nt,TrainingSession:()=>$w,env:()=>ce,registerBackend:()=>vr});var mt=C(()=>{"use strict";Ul();jl();fc();_o();dc();pc();Oa();mc();hc();bc()});function Tr(r,e,n,t){if(e===void 0)return Pw(r);if(n===void 0)Ao(r,e,1);else if(typeof n=="number"&&t===void 0)Ao(r,e,n);else if(typeof n=="string"&&t===void 0)Ao(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")Ao(r,n,t,e);else throw new TypeError("input is valid")}function Pw(r){return{verbose:Tr.verbose.bind(null,r),info:Tr.info.bind(null,r),warning:Tr.warning.bind(null,r),error:Tr.error.bind(null,r),fatal:Tr.fatal.bind(null,r)}}function Ao(r,e,n,t){let o=En[t||""]||En[""];xc[r]<xc[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,Aw[o.provider].log(r,e,t))}var Ca,ka,xc,Aw,wc,En,Ne,Oo,Eo,Co,Po,kt=C(()=>{"use strict";Ca=class{log(e,n,t){}},ka=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},xc={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},Aw={none:new Ca,console:new ka},wc={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},En={"":wc};(u=>{function r(l,f){u("verbose",l,f)}u.verbose=r;function e(l,f){u("info",l,f)}u.info=e;function n(l,f){u("warning",l,f)}u.warning=n;function t(l,f){u("error",l,f)}u.error=t;function o(l,f){u("fatal",l,f)}u.fatal=o;function i(l){En={},s("",l||{})}u.reset=i;function s(l,f){if(l==="*")i(f);else{let c=En[l]||wc;En[l]={provider:f.provider||c.provider,minimalSeverity:f.minimalSeverity||c.minimalSeverity,logDateTime:f.logDateTime===void 0?c.logDateTime:f.logDateTime,logSourceLocation:f.logSourceLocation===void 0?c.logSourceLocation:f.logSourceLocation}}}u.set=s;function a(l){let f={};l.logLevel&&(f.minimalSeverity=l.logLevel),s("",f)}u.setWithEnv=a})(Tr||={});Ne=Tr,Oo=class{constructor(e,n,t,o,i,s){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Eo=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},Co=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=Po(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async f=>{i&&await i.end(),u(f)},async f=>{i&&await i.end(),l(f)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,f)=>{u.then(()=>{l(a)},c=>{f(c)})})}return a}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=Po();return this.flush(o),new Oo(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new Oo(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Eo(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=Po();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Eo(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Ne.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=Po()}}get started(){return this._started}},Po=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function vc(r,e,n){for(let t of n){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&Ow(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function Ow(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Tc=C(()=>{"use strict"});var _c=tt(Da=>{"use strict";Da.__esModule=!0;var Ew=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();Da.Guid=Ew});function Fe(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function ht(r){return(r&&r.__isLong__)===!0}function Ic(r){var e=Math.clz32(r&-r);return r?31-e:e}function zr(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=$c[r],t)?t:(n=Re(r,0,!0),o&&($c[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Sc[r],t)?t:(n=Re(r,r<0?-1:0,!1),o&&(Sc[r]=n),n))}function Bt(r,e){if(isNaN(r))return e?dr:Vt;if(e){if(r<0)return dr;if(r>=Ec)return Dc}else{if(r<=-Pc)return vt;if(r+1>=Pc)return kc}return r<0?Bt(-r,e).neg():Re(r%fn|0,r/fn|0,e)}function Re(r,e,n){return new Fe(r,e,n)}function La(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?dr:Vt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return La(r.substring(1),e,n).neg();for(var o=Bt(ko(n,8)),i=Vt,s=0;s<r.length;s+=8){var a=Math.min(8,r.length-s),u=parseInt(r.substring(s,s+a),n);if(a<8){var l=Bt(ko(n,a));i=i.mul(l).add(Bt(u))}else i=i.mul(o),i=i.add(Bt(u))}return i.unsigned=e,i}function Gt(r,e){return typeof r=="number"?Bt(r,e):typeof r=="string"?La(r,e):Re(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var Dt,Sc,$c,ko,Ac,Cw,fn,Ec,Pc,Oc,Vt,dr,cn,Cc,Ba,kc,Dc,vt,W,pr,Ra=C(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Fe.prototype.__isLong__;Object.defineProperty(Fe.prototype,"__isLong__",{value:!0});Fe.isLong=ht;Sc={},$c={};Fe.fromInt=zr;Fe.fromNumber=Bt;Fe.fromBits=Re;ko=Math.pow;Fe.fromString=La;Fe.fromValue=Gt;Ac=65536,Cw=1<<24,fn=Ac*Ac,Ec=fn*fn,Pc=Ec/2,Oc=zr(Cw),Vt=zr(0);Fe.ZERO=Vt;dr=zr(0,!0);Fe.UZERO=dr;cn=zr(1);Fe.ONE=cn;Cc=zr(1,!0);Fe.UONE=Cc;Ba=zr(-1);Fe.NEG_ONE=Ba;kc=Re(-1,2147483647,!1);Fe.MAX_VALUE=kc;Dc=Re(-1,-1,!0);Fe.MAX_UNSIGNED_VALUE=Dc;vt=Re(0,-2147483648,!1);Fe.MIN_VALUE=vt;W=Fe.prototype;W.toInt=function(){return this.unsigned?this.low>>>0:this.low};W.toNumber=function(){return this.unsigned?(this.high>>>0)*fn+(this.low>>>0):this.high*fn+(this.low>>>0)};W.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(vt)){var n=Bt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Bt(ko(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,f=l.toString(e);if(s=u,s.isZero())return f+a;for(;f.length<6;)f="0"+f;a=""+f+a}};W.getHighBits=function(){return this.high};W.getHighBitsUnsigned=function(){return this.high>>>0};W.getLowBits=function(){return this.low};W.getLowBitsUnsigned=function(){return this.low>>>0};W.getNumBitsAbs=function(){if(this.isNegative())return this.eq(vt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};W.isZero=function(){return this.high===0&&this.low===0};W.eqz=W.isZero;W.isNegative=function(){return!this.unsigned&&this.high<0};W.isPositive=function(){return this.unsigned||this.high>=0};W.isOdd=function(){return(this.low&1)===1};W.isEven=function(){return(this.low&1)===0};W.equals=function(e){return ht(e)||(e=Gt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};W.eq=W.equals;W.notEquals=function(e){return!this.eq(e)};W.neq=W.notEquals;W.ne=W.notEquals;W.lessThan=function(e){return this.comp(e)<0};W.lt=W.lessThan;W.lessThanOrEqual=function(e){return this.comp(e)<=0};W.lte=W.lessThanOrEqual;W.le=W.lessThanOrEqual;W.greaterThan=function(e){return this.comp(e)>0};W.gt=W.greaterThan;W.greaterThanOrEqual=function(e){return this.comp(e)>=0};W.gte=W.greaterThanOrEqual;W.ge=W.greaterThanOrEqual;W.compare=function(e){if(ht(e)||(e=Gt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};W.comp=W.compare;W.negate=function(){return!this.unsigned&&this.eq(vt)?vt:this.not().add(cn)};W.neg=W.negate;W.add=function(e){ht(e)||(e=Gt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,f=0,c=0,p=0,b=0;return b+=i+l,p+=b>>>16,b&=65535,p+=o+u,c+=p>>>16,p&=65535,c+=t+a,f+=c>>>16,c&=65535,f+=n+s,f&=65535,Re(p<<16|b,f<<16|c,this.unsigned)};W.subtract=function(e){return ht(e)||(e=Gt(e)),this.add(e.neg())};W.sub=W.subtract;W.multiply=function(e){if(this.isZero())return this;if(ht(e)||(e=Gt(e)),Dt){var n=Dt.mul(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?dr:Vt;if(this.eq(vt))return e.isOdd()?vt:Vt;if(e.eq(vt))return this.isOdd()?vt:Vt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Oc)&&e.lt(Oc))return Bt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,f=e.low&65535,c=0,p=0,b=0,g=0;return g+=s*f,b+=g>>>16,g&=65535,b+=i*f,p+=b>>>16,b&=65535,b+=s*l,p+=b>>>16,b&=65535,p+=o*f,c+=p>>>16,p&=65535,p+=i*l,c+=p>>>16,p&=65535,p+=s*u,c+=p>>>16,p&=65535,c+=t*f+o*l+i*u+s*a,c&=65535,Re(b<<16|g,c<<16|p,this.unsigned)};W.mul=W.multiply;W.divide=function(e){if(ht(e)||(e=Gt(e)),e.isZero())throw Error("division by zero");if(Dt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?dr:Vt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return dr;if(e.gt(this.shru(1)))return Cc;i=dr}else{if(this.eq(vt)){if(e.eq(cn)||e.eq(Ba))return vt;if(e.eq(vt))return cn;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(Vt)?e.isNegative()?cn:Ba:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(vt))return this.unsigned?dr:Vt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Vt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:ko(2,a-48),l=Bt(t),f=l.mul(e);f.isNegative()||f.gt(o);)t-=u,l=Bt(t,this.unsigned),f=l.mul(e);l.isZero()&&(l=cn),i=i.add(l),o=o.sub(f)}return i};W.div=W.divide;W.modulo=function(e){if(ht(e)||(e=Gt(e)),Dt){var n=(this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};W.mod=W.modulo;W.rem=W.modulo;W.not=function(){return Re(~this.low,~this.high,this.unsigned)};W.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};W.clz=W.countLeadingZeros;W.countTrailingZeros=function(){return this.low?Ic(this.low):Ic(this.high)+32};W.ctz=W.countTrailingZeros;W.and=function(e){return ht(e)||(e=Gt(e)),Re(this.low&e.low,this.high&e.high,this.unsigned)};W.or=function(e){return ht(e)||(e=Gt(e)),Re(this.low|e.low,this.high|e.high,this.unsigned)};W.xor=function(e){return ht(e)||(e=Gt(e)),Re(this.low^e.low,this.high^e.high,this.unsigned)};W.shiftLeft=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Re(0,this.low<<e-32,this.unsigned)};W.shl=W.shiftLeft;W.shiftRight=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Re(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};W.shr=W.shiftRight;W.shiftRightUnsigned=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Re(this.high,0,this.unsigned):Re(this.high>>>e-32,0,this.unsigned)};W.shru=W.shiftRightUnsigned;W.shr_u=W.shiftRightUnsigned;W.rotateLeft=function(e){var n;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,Re(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};W.rotl=W.rotateLeft;W.rotateRight=function(e){var n;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,Re(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};W.rotr=W.rotateRight;W.toSigned=function(){return this.unsigned?Re(this.low,this.high,!1):this};W.toUnsigned=function(){return this.unsigned?this:Re(this.low,this.high,!0)};W.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};W.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};W.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Fe.fromBytes=function(e,n,t){return t?Fe.fromBytesLE(e,n):Fe.fromBytesBE(e,n)};Fe.fromBytesLE=function(e,n){return new Fe(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Fe.fromBytesBE=function(e,n){return new Fe(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};pr=Fe});var D,Do=C(()=>{D={};D.Offset;D.Table;D.SIZEOF_SHORT=2;D.SIZEOF_INT=4;D.FILE_IDENTIFIER_LENGTH=4;D.SIZE_PREFIX_LENGTH=4;D.Encoding={UTF8_BYTES:1,UTF16_STRING:2};D.int32=new Int32Array(2);D.float32=new Float32Array(D.int32.buffer);D.float64=new Float64Array(D.int32.buffer);D.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;D.Long=function(r,e){this.low=r|0,this.high=e|0};D.Long.create=function(r,e){return r==0&&e==0?D.Long.ZERO:new D.Long(r,e)};D.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};D.Long.prototype.equals=function(r){return this.low==r.low&&this.high==r.high};D.Long.ZERO=new D.Long(0,0);D.Builder=function(r){if(r)var e=r;else var e=1024;this.bb=D.ByteBuffer.allocate(e),this.space=e,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};D.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};D.Builder.prototype.forceDefaults=function(r){this.force_defaults=r};D.Builder.prototype.dataBuffer=function(){return this.bb};D.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};D.Builder.prototype.prep=function(r,e){r>this.minalign&&(this.minalign=r);for(var n=~(this.bb.capacity()-this.space+e)+1&r-1;this.space<n+r+e;){var t=this.bb.capacity();this.bb=D.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)};D.Builder.prototype.pad=function(r){for(var e=0;e<r;e++)this.bb.writeInt8(--this.space,0)};D.Builder.prototype.writeInt8=function(r){this.bb.writeInt8(this.space-=1,r)};D.Builder.prototype.writeInt16=function(r){this.bb.writeInt16(this.space-=2,r)};D.Builder.prototype.writeInt32=function(r){this.bb.writeInt32(this.space-=4,r)};D.Builder.prototype.writeInt64=function(r){this.bb.writeInt64(this.space-=8,r)};D.Builder.prototype.writeFloat32=function(r){this.bb.writeFloat32(this.space-=4,r)};D.Builder.prototype.writeFloat64=function(r){this.bb.writeFloat64(this.space-=8,r)};D.Builder.prototype.addInt8=function(r){this.prep(1,0),this.writeInt8(r)};D.Builder.prototype.addInt16=function(r){this.prep(2,0),this.writeInt16(r)};D.Builder.prototype.addInt32=function(r){this.prep(4,0),this.writeInt32(r)};D.Builder.prototype.addInt64=function(r){this.prep(8,0),this.writeInt64(r)};D.Builder.prototype.addFloat32=function(r){this.prep(4,0),this.writeFloat32(r)};D.Builder.prototype.addFloat64=function(r){this.prep(8,0),this.writeFloat64(r)};D.Builder.prototype.addFieldInt8=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(r))};D.Builder.prototype.addFieldInt16=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(r))};D.Builder.prototype.addFieldInt32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(r))};D.Builder.prototype.addFieldInt64=function(r,e,n){(this.force_defaults||!e.equals(n))&&(this.addInt64(e),this.slot(r))};D.Builder.prototype.addFieldFloat32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(r))};D.Builder.prototype.addFieldFloat64=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(r))};D.Builder.prototype.addFieldOffset=function(r,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(r))};D.Builder.prototype.addFieldStruct=function(r,e,n){e!=n&&(this.nested(e),this.slot(r))};D.Builder.prototype.nested=function(r){if(r!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};D.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};D.Builder.prototype.slot=function(r){this.vtable[r]=this.offset()};D.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};D.Builder.growByteBuffer=function(r){var e=r.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var n=e<<1,t=D.ByteBuffer.allocate(n);return t.setPosition(n-e),t.bytes().set(r.bytes(),n-e),t};D.Builder.prototype.addOffset=function(r){this.prep(D.SIZEOF_INT,0),this.writeInt32(this.offset()-r+D.SIZEOF_INT)};D.Builder.prototype.startObject=function(r){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=r;for(var e=0;e<r;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()};D.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var r=this.offset(),e=this.vtable_in_use-1;e>=0&&this.vtable[e]==0;e--);for(var n=e+1;e>=0;e--)this.addInt16(this.vtable[e]!=0?r-this.vtable[e]:0);var t=2;this.addInt16(r-this.object_start);var o=(n+t)*D.SIZEOF_SHORT;this.addInt16(o);var i=0,s=this.space;e:for(e=0;e<this.vtables.length;e++){var a=this.bb.capacity()-this.vtables[e];if(o==this.bb.readInt16(a)){for(var u=D.SIZEOF_SHORT;u<o;u+=D.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(a+u))continue e;i=this.vtables[e];break}}return i?(this.space=this.bb.capacity()-r,this.bb.writeInt32(this.space,i-r)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-r,this.offset()-r)),this.isNested=!1,r};D.Builder.prototype.finish=function(r,e,n){var t=n?D.SIZE_PREFIX_LENGTH:0;if(e){var o=e;if(this.prep(this.minalign,D.SIZEOF_INT+D.FILE_IDENTIFIER_LENGTH+t),o.length!=D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+D.FILE_IDENTIFIER_LENGTH);for(var i=D.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(o.charCodeAt(i))}this.prep(this.minalign,D.SIZEOF_INT+t),this.addOffset(r),t&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};D.Builder.prototype.finishSizePrefixed=function(r,e){this.finish(r,e,!0)};D.Builder.prototype.requiredField=function(r,e){var n=this.bb.capacity()-r,t=n-this.bb.readInt32(n),o=this.bb.readInt16(t+e)!=0;if(!o)throw new Error("FlatBuffers: field "+e+" must be set")};D.Builder.prototype.startVector=function(r,e,n){this.notNested(),this.vector_num_elems=e,this.prep(D.SIZEOF_INT,r*e),this.prep(n,r*e)};D.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};D.Builder.prototype.createString=function(r){if(r instanceof Uint8Array)var e=r;else for(var e=[],n=0;n<r.length;){var t,o=r.charCodeAt(n++);if(o<55296||o>=56320)t=o;else{var i=r.charCodeAt(n++);t=(o<<10)+i+(65536-56623104-56320)}t<128?e.push(t):(t<2048?e.push(t>>6&31|192):(t<65536?e.push(t>>12&15|224):e.push(t>>18&7|240,t>>12&63|128),e.push(t>>6&63|128)),e.push(t&63|128))}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(var n=0,s=this.space,a=this.bb.bytes();n<e.length;n++)a[s++]=e[n];return this.endVector()};D.Builder.prototype.createLong=function(r,e){return D.Long.create(r,e)};D.ByteBuffer=function(r){this.bytes_=r,this.position_=0};D.ByteBuffer.allocate=function(r){return new D.ByteBuffer(new Uint8Array(r))};D.ByteBuffer.prototype.clear=function(){this.position_=0};D.ByteBuffer.prototype.bytes=function(){return this.bytes_};D.ByteBuffer.prototype.position=function(){return this.position_};D.ByteBuffer.prototype.setPosition=function(r){this.position_=r};D.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};D.ByteBuffer.prototype.readInt8=function(r){return this.readUint8(r)<<24>>24};D.ByteBuffer.prototype.readUint8=function(r){return this.bytes_[r]};D.ByteBuffer.prototype.readInt16=function(r){return this.readUint16(r)<<16>>16};D.ByteBuffer.prototype.readUint16=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8};D.ByteBuffer.prototype.readInt32=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8|this.bytes_[r+2]<<16|this.bytes_[r+3]<<24};D.ByteBuffer.prototype.readUint32=function(r){return this.readInt32(r)>>>0};D.ByteBuffer.prototype.readInt64=function(r){return new D.Long(this.readInt32(r),this.readInt32(r+4))};D.ByteBuffer.prototype.readUint64=function(r){return new D.Long(this.readUint32(r),this.readUint32(r+4))};D.ByteBuffer.prototype.readFloat32=function(r){return D.int32[0]=this.readInt32(r),D.float32[0]};D.ByteBuffer.prototype.readFloat64=function(r){return D.int32[D.isLittleEndian?0:1]=this.readInt32(r),D.int32[D.isLittleEndian?1:0]=this.readInt32(r+4),D.float64[0]};D.ByteBuffer.prototype.writeInt8=function(r,e){this.bytes_[r]=e};D.ByteBuffer.prototype.writeUint8=function(r,e){this.bytes_[r]=e};D.ByteBuffer.prototype.writeInt16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};D.ByteBuffer.prototype.writeUint16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};D.ByteBuffer.prototype.writeInt32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};D.ByteBuffer.prototype.writeUint32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};D.ByteBuffer.prototype.writeInt64=function(r,e){this.writeInt32(r,e.low),this.writeInt32(r+4,e.high)};D.ByteBuffer.prototype.writeUint64=function(r,e){this.writeUint32(r,e.low),this.writeUint32(r+4,e.high)};D.ByteBuffer.prototype.writeFloat32=function(r,e){D.float32[0]=e,this.writeInt32(r,D.int32[0])};D.ByteBuffer.prototype.writeFloat64=function(r,e){D.float64[0]=e,this.writeInt32(r,D.int32[D.isLittleEndian?0:1]),this.writeInt32(r+4,D.int32[D.isLittleEndian?1:0])};D.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+D.SIZEOF_INT+D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var r="",e=0;e<D.FILE_IDENTIFIER_LENGTH;e++)r+=String.fromCharCode(this.readInt8(this.position_+D.SIZEOF_INT+e));return r};D.ByteBuffer.prototype.__offset=function(r,e){var n=r-this.readInt32(r);return e<this.readInt16(n)?this.readInt16(n+e):0};D.ByteBuffer.prototype.__union=function(r,e){return r.bb_pos=e+this.readInt32(e),r.bb=this,r};D.ByteBuffer.prototype.__string=function(r,e){r+=this.readInt32(r);var n=this.readInt32(r),t="",o=0;if(r+=D.SIZEOF_INT,e===D.Encoding.UTF8_BYTES)return this.bytes_.subarray(r,r+n);for(;o<n;){var i,s=this.readUint8(r+o++);if(s<192)i=s;else{var a=this.readUint8(r+o++);if(s<224)i=(s&31)<<6|a&63;else{var u=this.readUint8(r+o++);if(s<240)i=(s&15)<<12|(a&63)<<6|u&63;else{var l=this.readUint8(r+o++);i=(s&7)<<18|(a&63)<<12|(u&63)<<6|l&63}}}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode((i>>10)+55296,(i&1024-1)+56320))}return t};D.ByteBuffer.prototype.__indirect=function(r){return r+this.readInt32(r)};D.ByteBuffer.prototype.__vector=function(r){return r+this.readInt32(r)+D.SIZEOF_INT};D.ByteBuffer.prototype.__vector_len=function(r){return this.readInt32(r+this.readInt32(r))};D.ByteBuffer.prototype.__has_identifier=function(r){if(r.length!=D.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+D.FILE_IDENTIFIER_LENGTH);for(var e=0;e<D.FILE_IDENTIFIER_LENGTH;e++)if(r.charCodeAt(e)!=this.readInt8(this.position_+D.SIZEOF_INT+e))return!1;return!0};D.ByteBuffer.prototype.createLong=function(r,e){return D.Long.create(r,e)}});var ee,Cn=C(()=>{"use strict";Do();(e=>{let r;(t=>{let n;(i=>{let o;(_=>(_[_.UNDEFINED=0]="UNDEFINED",_[_.FLOAT=1]="FLOAT",_[_.INT=2]="INT",_[_.STRING=3]="STRING",_[_.TENSOR=4]="TENSOR",_[_.GRAPH=5]="GRAPH",_[_.FLOATS=6]="FLOATS",_[_.INTS=7]="INTS",_[_.STRINGS=8]="STRINGS",_[_.TENSORS=9]="TENSORS",_[_.GRAPHS=10]="GRAPHS",_[_.SPARSE_TENSOR=11]="SPARSE_TENSOR",_[_.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(o=i.AttributeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(o=i.DimensionValueType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(V=>(V[V.UNDEFINED=0]="UNDEFINED",V[V.FLOAT=1]="FLOAT",V[V.UINT8=2]="UINT8",V[V.INT8=3]="INT8",V[V.UINT16=4]="UINT16",V[V.INT16=5]="INT16",V[V.INT32=6]="INT32",V[V.INT64=7]="INT64",V[V.STRING=8]="STRING",V[V.BOOL=9]="BOOL",V[V.FLOAT16=10]="FLOAT16",V[V.DOUBLE=11]="DOUBLE",V[V.UINT32=12]="UINT32",V[V.UINT64=13]="UINT64",V[V.COMPLEX64=14]="COMPLEX64",V[V.COMPLEX128=15]="COMPLEX128",V[V.BFLOAT16=16]="BFLOAT16",V[V.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",V[V.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",V[V.FLOAT8E5M2=19]="FLOAT8E5M2",V[V.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(o=i.TensorDataType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(o=i.NodeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(f=>(f[f.NONE=0]="NONE",f[f.tensor_type=1]="tensor_type",f[f.sequence_type=2]="sequence_type",f[f.map_type=3]="map_type"))(o=i.TypeInfoValue||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsShape(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dim(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}dimLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}static startShape(a){a.startObject(1)}static addDim(a,u){a.addFieldOffset(0,u,0)}static createDimVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startDimVector(a,u){a.startVector(4,u,4)}static endShape(a){return a.endObject()}static createShape(a,u){return o.startShape(a),o.addDim(a,u),o.endShape(a)}}i.Shape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimension(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimension(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}value(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimension(a){a.startObject(2)}static addValue(a,u){a.addFieldOffset(0,u,0)}static addDenotation(a,u){a.addFieldOffset(1,u,0)}static endDimension(a){return a.endObject()}static createDimension(a,u,l){return o.startDimension(a),o.addValue(a,u),o.addDenotation(a,l),o.endDimension(a)}}i.Dimension=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimensionValue(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimensionValue(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dimType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt8(this.bb_pos+a):0}dimValue(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}dimParam(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimensionValue(a){a.startObject(3)}static addDimType(a,u){a.addFieldInt8(0,u,0)}static addDimValue(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static addDimParam(a,u){a.addFieldOffset(2,u,0)}static endDimensionValue(a){return a.endObject()}static createDimensionValue(a,u,l,f){return o.startDimensionValue(a),o.addDimType(a,u),o.addDimValue(a,l),o.addDimParam(a,f),o.endDimensionValue(a)}}i.DimensionValue=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensorTypeAndShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}shape(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,u){a.addFieldInt32(0,u,0)}static addShape(a,u){a.addFieldOffset(1,u,0)}static endTensorTypeAndShape(a){return a.endObject()}static createTensorTypeAndShape(a,u,l){return o.startTensorTypeAndShape(a),o.addElemType(a,u),o.addShape(a,l),o.endTensorTypeAndShape(a)}}i.TensorTypeAndShape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsMapType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}keyType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}valueType(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,u){a.addFieldInt32(0,u,0)}static addValueType(a,u){a.addFieldOffset(1,u,0)}static endMapType(a){return a.endObject()}static createMapType(a,u,l){return o.startMapType(a),o.addKeyType(a,u),o.addValueType(a,l),o.endMapType(a)}}i.MapType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSequenceType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSequenceType(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(a){a.startObject(1)}static addElemType(a,u){a.addFieldOffset(0,u,0)}static endSequenceType(a){return a.endObject()}static createSequenceType(a,u){return o.startSequenceType(a),o.addElemType(a,u),o.endSequenceType(a)}}i.SequenceType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(a,u,l,f){return a.prep(4,12),a.writeInt32(f),a.writeInt32(l),a.writeInt32(u),a.offset()}}i.EdgeEnd=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNodeEdge(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNodeEdge(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndex(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readUint32(this.bb_pos+a):0}inputEdges(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}inputEdgesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}outputEdges(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}outputEdgesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNodeEdge(a){a.startObject(3)}static addNodeIndex(a,u){a.addFieldInt32(0,u,0)}static addInputEdges(a,u){a.addFieldOffset(1,u,0)}static startInputEdgesVector(a,u){a.startVector(12,u,4)}static addOutputEdges(a,u){a.addFieldOffset(2,u,0)}static startOutputEdgesVector(a,u){a.startVector(12,u,4)}static endNodeEdge(a){return a.endObject()}static createNodeEdge(a,u,l,f){return o.startNodeEdge(a),o.addNodeIndex(a,u),o.addInputEdges(a,l),o.addOutputEdges(a,f),o.endNodeEdge(a)}}i.NodeEdge=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNode(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}sinceVersion(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):0}executionProviderType(a){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,a):null}inputs(a,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new e.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}attributesLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+a*4):0}inputArgCountsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){let a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}implicitInputsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDomain(a,u){a.addFieldOffset(2,u,0)}static addSinceVersion(a,u){a.addFieldInt32(3,u,0)}static addIndex(a,u){a.addFieldInt32(4,u,0)}static addOpType(a,u){a.addFieldOffset(5,u,0)}static addType(a,u){a.addFieldInt32(6,u,0)}static addExecutionProviderType(a,u){a.addFieldOffset(7,u,0)}static addInputs(a,u){a.addFieldOffset(8,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(9,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addAttributes(a,u){a.addFieldOffset(10,u,0)}static createAttributesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startAttributesVector(a,u){a.startVector(4,u,4)}static addInputArgCounts(a,u){a.addFieldOffset(11,u,0)}static createInputArgCountsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startInputArgCountsVector(a,u){a.startVector(4,u,4)}static addImplicitInputs(a,u){a.addFieldOffset(12,u,0)}static createImplicitInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startImplicitInputsVector(a,u){a.startVector(4,u,4)}static endNode(a){return a.endObject()}static createNode(a,u,l,f,c,p,b,g,h,v,T,w,_,$){return o.startNode(a),o.addName(a,u),o.addDocString(a,l),o.addDomain(a,f),o.addSinceVersion(a,c),o.addIndex(a,p),o.addOpType(a,b),o.addType(a,g),o.addExecutionProviderType(a,h),o.addInputs(a,v),o.addOutputs(a,T),o.addAttributes(a,w),o.addInputArgCounts(a,_),o.addImplicitInputs(a,$),o.endNode(a)}}i.Node=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsValueInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsValueInfo(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(a){a.startObject(3)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldOffset(2,u,0)}static endValueInfo(a){return a.endObject()}static createValueInfo(a,u,l,f){return o.startValueInfo(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.endValueInfo(a)}}i.ValueInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTypeInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTypeInfo(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}denotation(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}valueType(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readUint8(this.bb_pos+a):0}value(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(a,this.bb_pos+u):null}static startTypeInfo(a){a.startObject(3)}static addDenotation(a,u){a.addFieldOffset(0,u,0)}static addValueType(a,u){a.addFieldInt8(1,u,0)}static addValue(a,u){a.addFieldOffset(2,u,0)}static endTypeInfo(a){return a.endObject()}static createTypeInfo(a,u,l,f){return o.startTypeInfo(a),o.addDenotation(a,u),o.addValueType(a,l),o.addValue(a,f),o.endTypeInfo(a)}}i.TypeInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsOperatorSetId(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsOperatorSetId(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}domain(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}version(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}static startOperatorSetId(a){a.startObject(2)}static addDomain(a,u){a.addFieldOffset(0,u,0)}static addVersion(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static endOperatorSetId(a){return a.endObject()}static createOperatorSetId(a,u,l){return o.startOperatorSetId(a),o.addDomain(a,u),o.addVersion(a,l),o.endOperatorSetId(a)}}i.OperatorSetId=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensor(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}dataType(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}rawData(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+a):0}rawDataLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}rawDataArray(){let a=this.bb.__offset(this.bb_pos,12);return a?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}stringData(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringDataLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}static startTensor(a){a.startObject(6)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static addDataType(a,u){a.addFieldInt32(3,u,0)}static addRawData(a,u){a.addFieldOffset(4,u,0)}static createRawDataVector(a,u){a.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)a.addInt8(u[l]);return a.endVector()}static startRawDataVector(a,u){a.startVector(1,u,1)}static addStringData(a,u){a.addFieldOffset(5,u,0)}static createStringDataVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringDataVector(a,u){a.startVector(4,u,4)}static endTensor(a){return a.endObject()}static createTensor(a,u,l,f,c,p,b){return o.startTensor(a),o.addName(a,u),o.addDocString(a,l),o.addDims(a,f),o.addDataType(a,c),o.addRawData(a,p),o.addStringData(a,b),o.endTensor(a)}}i.Tensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSparseTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSparseTensor(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}values(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSparseTensor(a){a.startObject(3)}static addValues(a,u){a.addFieldOffset(0,u,0)}static addIndices(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static endSparseTensor(a){return a.endObject()}static createSparseTensor(a,u,l,f){return o.startSparseTensor(a),o.addValues(a,u),o.addIndices(a,l),o.addDims(a,f),o.endSparseTensor(a)}}i.SparseTensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsAttribute(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsAttribute(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt32(this.bb_pos+a):0}f(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readFloat32(this.bb_pos+a):0}i(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}s(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}t(a){let u=this.bb.__offset(this.bb_pos,16);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+a*4):0}floatsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}floatsArray(){let a=this.bb.__offset(this.bb_pos,20);return a?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}ints(a){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}intsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}strings(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringsLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}tensors(a,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}tensorsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}graphs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}graphsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startAttribute(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldInt32(2,u,0)}static addF(a,u){a.addFieldFloat32(3,u,0)}static addI(a,u){a.addFieldInt64(4,u,a.createLong(0,0))}static addS(a,u){a.addFieldOffset(5,u,0)}static addT(a,u){a.addFieldOffset(6,u,0)}static addG(a,u){a.addFieldOffset(7,u,0)}static addFloats(a,u){a.addFieldOffset(8,u,0)}static createFloatsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addFloat32(u[l]);return a.endVector()}static startFloatsVector(a,u){a.startVector(4,u,4)}static addInts(a,u){a.addFieldOffset(9,u,0)}static createIntsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startIntsVector(a,u){a.startVector(8,u,8)}static addStrings(a,u){a.addFieldOffset(10,u,0)}static createStringsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringsVector(a,u){a.startVector(4,u,4)}static addTensors(a,u){a.addFieldOffset(11,u,0)}static createTensorsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startTensorsVector(a,u){a.startVector(4,u,4)}static addGraphs(a,u){a.addFieldOffset(12,u,0)}static createGraphsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startGraphsVector(a,u){a.startVector(4,u,4)}static endAttribute(a){return a.endObject()}static createAttribute(a,u,l,f,c,p,b,g,h,v,T,w,_,$){return o.startAttribute(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.addF(a,c),o.addI(a,p),o.addS(a,b),o.addT(a,g),o.addG(a,h),o.addFloats(a,v),o.addInts(a,T),o.addStrings(a,w),o.addTensors(a,_),o.addGraphs(a,$),o.endAttribute(a)}}i.Attribute=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsGraph(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsGraph(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}initializers(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}initializersLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeArgs(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeArgsLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}nodes(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}maxNodeIndex(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readUint32(this.bb_pos+a):0}nodeEdges(a,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new e.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeEdgesLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}inputs(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__vector_len(this.bb_pos+a):0}sparseInitializers(a,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new e.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}sparseInitializersLength(){let a=this.bb.__offset(this.bb_pos,18);return a?this.bb.__vector_len(this.bb_pos+a):0}static startGraph(a){a.startObject(8)}static addInitializers(a,u){a.addFieldOffset(0,u,0)}static createInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInitializersVector(a,u){a.startVector(4,u,4)}static addNodeArgs(a,u){a.addFieldOffset(1,u,0)}static createNodeArgsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeArgsVector(a,u){a.startVector(4,u,4)}static addNodes(a,u){a.addFieldOffset(2,u,0)}static createNodesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodesVector(a,u){a.startVector(4,u,4)}static addMaxNodeIndex(a,u){a.addFieldInt32(3,u,0)}static addNodeEdges(a,u){a.addFieldOffset(4,u,0)}static createNodeEdgesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeEdgesVector(a,u){a.startVector(4,u,4)}static addInputs(a,u){a.addFieldOffset(5,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(6,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addSparseInitializers(a,u){a.addFieldOffset(7,u,0)}static createSparseInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSparseInitializersVector(a,u){a.startVector(4,u,4)}static endGraph(a){return a.endObject()}static createGraph(a,u,l,f,c,p,b,g,h){return o.startGraph(a),o.addInitializers(a,u),o.addNodeArgs(a,l),o.addNodes(a,f),o.addMaxNodeIndex(a,c),o.addNodeEdges(a,p),o.addInputs(a,b),o.addOutputs(a,g),o.addSparseInitializers(a,h),o.endGraph(a)}}i.Graph=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsModel(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsModel(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}irVersion(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}opsetImport(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}opsetImportLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}producerName(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}producerVersion(a){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,a):null}modelVersion(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}docString(a){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,a):null}graph(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,a):null}static startModel(a){a.startObject(9)}static addIrVersion(a,u){a.addFieldInt64(0,u,a.createLong(0,0))}static addOpsetImport(a,u){a.addFieldOffset(1,u,0)}static createOpsetImportVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOpsetImportVector(a,u){a.startVector(4,u,4)}static addProducerName(a,u){a.addFieldOffset(2,u,0)}static addProducerVersion(a,u){a.addFieldOffset(3,u,0)}static addDomain(a,u){a.addFieldOffset(4,u,0)}static addModelVersion(a,u){a.addFieldInt64(5,u,a.createLong(0,0))}static addDocString(a,u){a.addFieldOffset(6,u,0)}static addGraph(a,u){a.addFieldOffset(7,u,0)}static addGraphDocString(a,u){a.addFieldOffset(8,u,0)}static endModel(a){return a.endObject()}static createModel(a,u,l,f,c,p,b,g,h,v){return o.startModel(a),o.addIrVersion(a,u),o.addOpsetImport(a,l),o.addProducerName(a,f),o.addProducerVersion(a,c),o.addDomain(a,p),o.addModelVersion(a,b),o.addDocString(a,g),o.addGraph(a,h),o.addGraphDocString(a,v),o.endModel(a)}}i.Model=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsKernelCreateInfos(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsKernelCreateInfos(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndices(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+a*4):0}nodeIndicesLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeIndicesArray(){let a=this.bb.__offset(this.bb_pos,4);return a?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}kernelDefHashes(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startKernelCreateInfos(a){a.startObject(2)}static addNodeIndices(a,u){a.addFieldOffset(0,u,0)}static createNodeIndicesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startNodeIndicesVector(a,u){a.startVector(4,u,4)}static addKernelDefHashes(a,u){a.addFieldOffset(1,u,0)}static createKernelDefHashesVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startKernelDefHashesVector(a,u){a.startVector(8,u,8)}static endKernelCreateInfos(a){return a.endObject()}static createKernelCreateInfos(a,u,l){return o.startKernelCreateInfos(a),o.addNodeIndices(a,u),o.addKernelDefHashes(a,l),o.endKernelCreateInfos(a)}}i.KernelCreateInfos=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSubGraphSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSubGraphSessionState(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}graphId(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(a){a.startObject(2)}static addGraphId(a,u){a.addFieldOffset(0,u,0)}static addSessionState(a,u){a.addFieldOffset(1,u,0)}static endSubGraphSessionState(a){let u=a.endObject();return a.requiredField(u,4),u}static createSubGraphSessionState(a,u,l){return o.startSubGraphSessionState(a),o.addGraphId(a,u),o.addSessionState(a,l),o.endSubGraphSessionState(a)}}i.SubGraphSessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSessionState(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}subGraphSessionStatesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSessionState(a){a.startObject(2)}static addKernels(a,u){a.addFieldOffset(0,u,0)}static addSubGraphSessionStates(a,u){a.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSubGraphSessionStatesVector(a,u){a.startVector(4,u,4)}static endSessionState(a){return a.endObject()}static createSessionState(a,u,l){return o.startSessionState(a),o.addKernels(a,u),o.addSubGraphSessionStates(a,l),o.endSessionState(a)}}i.SessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsInferenceSession(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,u){return a.setPosition(a.position()+D.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}model(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(a){a.startObject(3)}static addOrtVersion(a,u){a.addFieldOffset(0,u,0)}static addModel(a,u){a.addFieldOffset(1,u,0)}static addSessionState(a,u){a.addFieldOffset(2,u,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,u){a.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,u){a.finish(u,"ORTM",!0)}static createInferenceSession(a,u,l,f){return o.startInferenceSession(a),o.addOrtVersion(a,u),o.addModel(a,l),o.addSessionState(a,f),o.endInferenceSession(a)}}i.InferenceSession=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={})});var Lc=tt((m$,Bc)=>{"use strict";Bc.exports=kw;function kw(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(a,u){n[t]=function(f){if(i)if(i=!1,f)u(f);else{for(var c=new Array(arguments.length-1),p=0;p<c.length;)c[p++]=arguments[p];a.apply(null,c)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Mc=tt(Nc=>{"use strict";var Bo=Nc;Bo.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var dn=new Array(64),zc=new Array(123);for(Ut=0;Ut<64;)zc[dn[Ut]=Ut<26?Ut+65:Ut<52?Ut+71:Ut<62?Ut-4:Ut-59|43]=Ut++;var Ut;Bo.encode=function(e,n,t){for(var o=null,i=[],s=0,a=0,u;n<t;){var l=e[n++];switch(a){case 0:i[s++]=dn[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=dn[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=dn[u|l>>6],i[s++]=dn[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=dn[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var Rc="invalid encoding";Bo.decode=function(e,n,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=zc[u])===void 0)throw Error(Rc);switch(i){case 0:s=u,i=1;break;case 1:n[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:n[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:n[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(Rc);return t-o};Bo.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Vc=tt((g$,Fc)=>{"use strict";Fc.exports=Lo;function Lo(){this._listeners={}}Lo.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Lo.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Lo.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Kc=tt((b$,jc)=>{"use strict";jc.exports=Gc(Gc);function Gc(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3]}function i(u,l,f){e[0]=u,l[f]=n[3],l[f+1]=n[2],l[f+2]=n[1],l[f+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function a(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?s:a,r.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}r.writeFloatLE=e.bind(null,Uc),r.writeFloatBE=e.bind(null,Wc);function n(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Hc),r.readFloatBE=n.bind(null,qc)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3],l[f+4]=n[4],l[f+5]=n[5],l[f+6]=n[6],l[f+7]=n[7]}function i(u,l,f){e[0]=u,l[f]=n[7],l[f+1]=n[6],l[f+2]=n[5],l[f+3]=n[4],l[f+4]=n[3],l[f+5]=n[2],l[f+6]=n[1],l[f+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function a(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?s:a,r.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var f;if(s<22250738585072014e-324)f=s/5e-324,t(f>>>0,a,u+o),t((l<<31|f/4294967296)>>>0,a,u+i);else{var c=Math.floor(Math.log(s)/Math.LN2);c===1024&&(c=1023),f=s*Math.pow(2,-c),t(f*4503599627370496>>>0,a,u+o),t((l<<31|c+1023<<20|f*1048576&1048575)>>>0,a,u+i)}}}r.writeDoubleLE=e.bind(null,Uc,0,4),r.writeDoubleBE=e.bind(null,Wc,4,0);function n(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),f=(l>>31)*2+1,c=l>>>20&2047,p=4294967296*(l&1048575)+u;return c===2047?p?NaN:f*(1/0):c===0?f*5e-324*p:f*Math.pow(2,c-1075)*(p+4503599627370496)}r.readDoubleLE=n.bind(null,Hc,0,4),r.readDoubleBE=n.bind(null,qc,4,0)}(),r}function Uc(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Wc(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Hc(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function qc(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Xc=tt((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var Yc=tt(Zc=>{"use strict";var za=Zc;za.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};za.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,s=[],a=0,u;n<t;)u=e[n++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};za.write=function(e,n,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Qc=tt((x$,Jc)=>{"use strict";Jc.exports=Dw;function Dw(r,e,n){var t=n||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return r(u);s+u>t&&(i=r(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var tf=tt((w$,ef)=>{"use strict";ef.exports=ut;var kn=Ir();function ut(r,e){this.lo=r>>>0,this.hi=e>>>0}var Nr=ut.zero=new ut(0,0);Nr.toNumber=function(){return 0};Nr.zzEncode=Nr.zzDecode=function(){return this};Nr.length=function(){return 1};var Bw=ut.zeroHash="\0\0\0\0\0\0\0\0";ut.fromNumber=function(e){if(e===0)return Nr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new ut(t,o)};ut.from=function(e){if(typeof e=="number")return ut.fromNumber(e);if(kn.isString(e))if(kn.Long)e=kn.Long.fromString(e);else return ut.fromNumber(parseInt(e,10));return e.low||e.high?new ut(e.low>>>0,e.high>>>0):Nr};ut.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};ut.prototype.toLong=function(e){return kn.Long?new kn.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var _r=String.prototype.charCodeAt;ut.fromHash=function(e){return e===Bw?Nr:new ut((_r.call(e,0)|_r.call(e,1)<<8|_r.call(e,2)<<16|_r.call(e,3)<<24)>>>0,(_r.call(e,4)|_r.call(e,5)<<8|_r.call(e,6)<<16|_r.call(e,7)<<24)>>>0)};ut.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};ut.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};ut.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};ut.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var Ir=tt(Na=>{"use strict";var ne=Na;ne.asPromise=Lc();ne.base64=Mc();ne.EventEmitter=Vc();ne.float=Kc();ne.inquire=Xc();ne.utf8=Yc();ne.pool=Qc();ne.LongBits=tf();ne.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ne.global=ne.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Na;ne.emptyArray=Object.freeze?Object.freeze([]):[];ne.emptyObject=Object.freeze?Object.freeze({}):{};ne.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ne.isString=function(e){return typeof e=="string"||e instanceof String};ne.isObject=function(e){return e&&typeof e=="object"};ne.isset=ne.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ne.Buffer=function(){try{var r=ne.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();ne._Buffer_from=null;ne._Buffer_allocUnsafe=null;ne.newBuffer=function(e){return typeof e=="number"?ne.Buffer?ne._Buffer_allocUnsafe(e):new ne.Array(e):ne.Buffer?ne._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ne.Array=typeof Uint8Array<"u"?Uint8Array:Array;ne.Long=ne.global.dcodeIO&&ne.global.dcodeIO.Long||ne.global.Long||ne.inquire("long");ne.key2Re=/^true|false|0|1$/;ne.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ne.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ne.longToHash=function(e){return e?ne.LongBits.from(e).toHash():ne.LongBits.zeroHash};ne.longFromHash=function(e,n){var t=ne.LongBits.fromHash(e);return ne.Long?ne.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function rf(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}ne.merge=rf;ne.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function nf(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&rf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ne.newError=nf;ne.ProtocolError=nf("ProtocolError");ne.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ne.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};ne.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ne._configure=function(){var r=ne.Buffer;if(!r){ne._Buffer_from=ne._Buffer_allocUnsafe=null;return}ne._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},ne._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var Ha=tt((T$,uf)=>{"use strict";uf.exports=Ee;var Lt=Ir(),Ma,Ro=Lt.LongBits,of=Lt.base64,af=Lt.utf8;function Dn(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function Va(){}function Lw(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function Ee(){this.len=0,this.head=new Dn(Va,0,0),this.tail=this.head,this.states=null}var sf=function(){return Lt.Buffer?function(){return(Ee.create=function(){return new Ma})()}:function(){return new Ee}};Ee.create=sf();Ee.alloc=function(e){return new Lt.Array(e)};Lt.Array!==Array&&(Ee.alloc=Lt.pool(Ee.alloc,Lt.Array.prototype.subarray));Ee.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Dn(e,n,t),this.len+=n,this};function Ga(r,e,n){e[n]=r&255}function Rw(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Ua(r,e){this.len=r,this.next=void 0,this.val=e}Ua.prototype=Object.create(Dn.prototype);Ua.prototype.fn=Rw;Ee.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Ua((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Ee.prototype.int32=function(e){return e<0?this._push(Wa,10,Ro.fromNumber(e)):this.uint32(e)};Ee.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Wa(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}Ee.prototype.uint64=function(e){var n=Ro.from(e);return this._push(Wa,n.length(),n)};Ee.prototype.int64=Ee.prototype.uint64;Ee.prototype.sint64=function(e){var n=Ro.from(e).zzEncode();return this._push(Wa,n.length(),n)};Ee.prototype.bool=function(e){return this._push(Ga,1,e?1:0)};function Fa(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}Ee.prototype.fixed32=function(e){return this._push(Fa,4,e>>>0)};Ee.prototype.sfixed32=Ee.prototype.fixed32;Ee.prototype.fixed64=function(e){var n=Ro.from(e);return this._push(Fa,4,n.lo)._push(Fa,4,n.hi)};Ee.prototype.sfixed64=Ee.prototype.fixed64;Ee.prototype.float=function(e){return this._push(Lt.float.writeFloatLE,4,e)};Ee.prototype.double=function(e){return this._push(Lt.float.writeDoubleLE,8,e)};var zw=Lt.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};Ee.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(Ga,1,0);if(Lt.isString(e)){var t=Ee.alloc(n=of.length(e));of.decode(e,t,0),e=t}return this.uint32(n)._push(zw,n,e)};Ee.prototype.string=function(e){var n=af.length(e);return n?this.uint32(n)._push(af.write,n,e):this._push(Ga,1,0)};Ee.prototype.fork=function(){return this.states=new Lw(this),this.head=this.tail=new Dn(Va,0,0),this.len=0,this};Ee.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Dn(Va,0,0),this.len=0),this};Ee.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};Ee.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};Ee._configure=function(r){Ma=r,Ee.create=sf(),Ma._configure()}});var ff=tt((_$,cf)=>{"use strict";cf.exports=Qt;var lf=Ha();(Qt.prototype=Object.create(lf.prototype)).constructor=Qt;var Sr=Ir();function Qt(){lf.call(this)}Qt._configure=function(){Qt.alloc=Sr._Buffer_allocUnsafe,Qt.writeBytesBuffer=Sr.Buffer&&Sr.Buffer.prototype instanceof Uint8Array&&Sr.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};Qt.prototype.bytes=function(e){Sr.isString(e)&&(e=Sr._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(Qt.writeBytesBuffer,n,e),this};function Nw(r,e,n){r.length<40?Sr.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}Qt.prototype.string=function(e){var n=Sr.Buffer.byteLength(e);return this.uint32(n),n&&this._push(Nw,n,e),this};Qt._configure()});var Ka=tt((I$,gf)=>{"use strict";gf.exports=Ye;var Wt=Ir(),ja,mf=Wt.LongBits,Mw=Wt.utf8;function Ht(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Ye(r){this.buf=r,this.pos=0,this.len=r.length}var df=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Ye(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Ye(e);throw Error("illegal buffer")},hf=function(){return Wt.Buffer?function(n){return(Ye.create=function(o){return Wt.Buffer.isBuffer(o)?new ja(o):df(o)})(n)}:df};Ye.create=hf();Ye.prototype._slice=Wt.Array.prototype.subarray||Wt.Array.prototype.slice;Ye.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Ht(this,10);return e}}();Ye.prototype.int32=function(){return this.uint32()|0};Ye.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function qa(){var r=new mf(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Ht(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw Ht(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Ye.prototype.bool=function(){return this.uint32()!==0};function zo(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Ye.prototype.fixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return zo(this.buf,this.pos+=4)};Ye.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return zo(this.buf,this.pos+=4)|0};function pf(){if(this.pos+8>this.len)throw Ht(this,8);return new mf(zo(this.buf,this.pos+=4),zo(this.buf,this.pos+=4))}Ye.prototype.float=function(){if(this.pos+4>this.len)throw Ht(this,4);var e=Wt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Ye.prototype.double=function(){if(this.pos+8>this.len)throw Ht(this,4);var e=Wt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Ye.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw Ht(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Wt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Ye.prototype.string=function(){var e=this.bytes();return Mw.read(e,0,e.length)};Ye.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Ht(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Ht(this);while(this.buf[this.pos++]&128);return this};Ye.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Ye._configure=function(r){ja=r,Ye.create=hf(),ja._configure();var e=Wt.Long?"toLong":"toNumber";Wt.merge(Ye.prototype,{int64:function(){return qa.call(this)[e](!1)},uint64:function(){return qa.call(this)[e](!0)},sint64:function(){return qa.call(this).zzDecode()[e](!1)},fixed64:function(){return pf.call(this)[e](!0)},sfixed64:function(){return pf.call(this)[e](!1)}})}});var wf=tt((S$,xf)=>{"use strict";xf.exports=Mr;var yf=Ka();(Mr.prototype=Object.create(yf.prototype)).constructor=Mr;var bf=Ir();function Mr(r){yf.call(this,r)}Mr._configure=function(){bf.Buffer&&(Mr.prototype._slice=bf.Buffer.prototype.slice)};Mr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Mr._configure()});var Tf=tt(($$,vf)=>{"use strict";vf.exports=Bn;var Xa=Ir();(Bn.prototype=Object.create(Xa.EventEmitter.prototype)).constructor=Bn;function Bn(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Xa.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Bn.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return Xa.asPromise(r,s,e,n,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(f){return s.emit("error",f,e),i(f)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Bn.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var If=tt(_f=>{"use strict";var Fw=_f;Fw.Service=Tf()});var $f=tt((P$,Sf)=>{"use strict";Sf.exports={}});var Of=tt(Pf=>{"use strict";var Tt=Pf;Tt.build="minimal";Tt.Writer=Ha();Tt.BufferWriter=ff();Tt.Reader=Ka();Tt.BufferReader=wf();Tt.util=Ir();Tt.rpc=If();Tt.roots=$f();Tt.configure=Af;function Af(){Tt.util._configure(),Tt.Writer._configure(Tt.BufferWriter),Tt.Reader._configure(Tt.BufferReader)}Af()});var Cf=tt((E$,Ef)=>{"use strict";Ef.exports=Of()});var pn=tt((C$,kf)=>{"use strict";var Ve=Cf(),j=Ve.Reader,Je=Ve.Writer,A=Ve.util,S=Ve.roots.default||(Ve.roots.default={});S.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.s=A.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=A.emptyArray,e.prototype.ints=A.emptyArray,e.prototype.strings=A.emptyArray,e.prototype.tensors=A.emptyArray,e.prototype.graphs=A.emptyArray,e.prototype.sparseTensors=A.emptyArray,e.prototype.typeProtos=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!A.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!A.isInteger(t.i)&&!(t.i&&A.isInteger(t.i.low)&&A.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||A.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!A.isInteger(t.ints[i])&&!(t.ints[i]&&A.isInteger(t.ints[i].low)&&A.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||A.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(A.Long?(o.i=A.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?A.base64.decode(t.s,o.s=A.newBuffer(A.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)A.Long?(o.ints[i]=A.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new A.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?A.base64.decode(t.strings[i],o.strings[i]=A.newBuffer(A.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,A.Long){var s=new A.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=A.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?A.Long.prototype.toString.call(t.i):o.longs===Number?new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?A.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?A.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new A.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?A.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=S.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=S.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=S.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Je.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=A.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!A.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=S.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=A.emptyArray,e.prototype.updateBinding=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=A.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=A.emptyArray,e.prototype.trainingInfo=A.emptyArray,e.prototype.functions=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!A.isInteger(t.irVersion)&&!(t.irVersion&&A.isInteger(t.irVersion.low)&&A.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!A.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!A.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!A.isInteger(t.modelVersion)&&!(t.modelVersion&&A.isInteger(t.modelVersion.low)&&A.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(A.Long?(o.irVersion=A.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(A.Long?(o.modelVersion=A.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(A.Long){var s=new A.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",A.Long){var s=new A.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?A.Long.prototype.toString.call(t.irVersion):o.longs===Number?new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?A.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=S.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Je.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!A.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!A.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!A.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=A.emptyArray,e.prototype.name="",e.prototype.initializer=A.emptyArray,e.prototype.sparseInitializer=A.emptyArray,e.prototype.docString="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.valueInfo=A.emptyArray,e.prototype.quantizationAnnotation=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=S.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=S.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=S.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=S.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=A.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=A.emptyArray,e.prototype.int32Data=A.emptyArray,e.prototype.stringData=A.emptyArray,e.prototype.int64Data=A.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=A.newBuffer([]),e.prototype.externalData=A.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=A.emptyArray,e.prototype.uint64Data=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!A.isInteger(t.dims[o])&&!(t.dims[o]&&A.isInteger(t.dims[o].low)&&A.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!A.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!A.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||A.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!A.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&A.isInteger(t.int64Data[o].low)&&A.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||A.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!A.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&A.isInteger(t.uint64Data[o].low)&&A.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?A.base64.decode(t.stringData[i],o.stringData[i]=A.newBuffer(A.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)A.Long?(o.int64Data[i]=A.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new A.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?A.base64.decode(t.rawData,o.rawData=A.newBuffer(A.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)A.Long?(o.uint64Data[i]=A.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new A.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=A.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?A.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new A.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?A.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new A.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=S.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=A.Long?A.Long.fromBits(0,0,!1):0,n.prototype.end=A.Long?A.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Je.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof j||(o=j.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},n.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!A.isInteger(o.begin)&&!(o.begin&&A.isInteger(o.begin.low)&&A.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!A.isInteger(o.end)&&!(o.end&&A.isInteger(o.end.low)&&A.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(A.Long?(i.begin=A.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(A.Long?(i.end=A.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(A.Long){var a=new A.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(A.Long){var a=new A.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?A.Long.prototype.toString.call(o.begin):i.longs===Number?new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?A.Long.prototype.toString.call(o.end):i.longs===Number?new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!A.isInteger(t.dims[i])&&!(t.dims[i]&&A.isInteger(t.dims[i].low)&&A.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:A.oneOfGetter(t=["dimValue","dimParam"]),set:A.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,s){return s||(s=Je.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},n.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},n.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!A.isInteger(i.dimValue)&&!(i.dimValue&&A.isInteger(i.dimValue.low)&&A.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!A.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!A.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var s=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(A.Long?(s.dimValue=A.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},n.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?A.Long.prototype.toString.call(i.dimValue):s.longs===Number?new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:A.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:A.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Je.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof j||(o=j.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!A.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Je.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var s=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Je.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var s=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Je.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!A.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=S.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var s=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=S.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Je.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var s=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Je.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof j||(i=j.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var s=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=A.Long?A.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Je.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!A.isInteger(t.version)&&!(t.version&&A.isInteger(t.version.low)&&A.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(A.Long?(o.version=A.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",A.Long){var s=new A.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?A.Long.prototype.toString.call(t.version):o.longs===Number?new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.attribute=A.emptyArray,e.prototype.attributeProto=A.emptyArray,e.prototype.node=A.emptyArray,e.prototype.docString="",e.prototype.opsetImport=A.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Je.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!A.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=S.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();kf.exports=S});function mn(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Rn(r){return new TextDecoder().decode(r)}var Ge,Fr,Za,gt,No,dt,_t,Q,Ln,Vr,Gr,Ur,ze=C(()=>{"use strict";Do();Ra();Ge=ln(pn());Wr();Fr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},Za=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},gt=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Za.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;a[s-u]=Math.max(l,f)}return a}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let s=r.calcShape(e.dims,n.dims);if(s){if(o&&!Q.areEqual(s,e.dims))return;let a=Q.size(s),u=o?e:new rt(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(s.length),f=new Array(e.dims.length),c=new Array(n.dims.length),p=0,b=0,g=!1,h=!1;e.dims.length===0&&(p=e.get([]),g=!0),n.dims.length===0&&(b=n.get([]),h=!0);let v;for(let T=0;T<a;T++){v=T;for(let w=s.length-1;w>=0;w--)l[w]=v%s[w],v=Math.floor(v/s[w]);g||(r.fillIndex(l,e.dims,f),p=e.get(f)),h||(r.fillIndex(l,n.dims,c),b=n.get(c)),u.set(l,t(p,b))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(n[n.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},No=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!gt.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},dt=class r{static tensorDataTypeFromProto(e){switch(e){case Ge.onnx.TensorProto.DataType.INT8:return"int8";case Ge.onnx.TensorProto.DataType.UINT8:return"uint8";case Ge.onnx.TensorProto.DataType.BOOL:return"bool";case Ge.onnx.TensorProto.DataType.INT16:return"int16";case Ge.onnx.TensorProto.DataType.UINT16:return"uint16";case Ge.onnx.TensorProto.DataType.INT32:return"int32";case Ge.onnx.TensorProto.DataType.UINT32:return"uint32";case Ge.onnx.TensorProto.DataType.FLOAT:return"float32";case Ge.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ge.onnx.TensorProto.DataType.STRING:return"string";case Ge.onnx.TensorProto.DataType.INT64:return"int32";case Ge.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ge.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ge.onnx.TensorProto.DataType.INT8;case"uint8":return Ge.onnx.TensorProto.DataType.UINT8;case"bool":return Ge.onnx.TensorProto.DataType.BOOL;case"int16":return Ge.onnx.TensorProto.DataType.INT16;case"uint16":return Ge.onnx.TensorProto.DataType.UINT16;case"int32":return Ge.onnx.TensorProto.DataType.INT32;case"uint32":return Ge.onnx.TensorProto.DataType.UINT32;case"float32":return Ge.onnx.TensorProto.DataType.FLOAT;case"float64":return Ge.onnx.TensorProto.DataType.DOUBLE;case"string":return Ge.onnx.TensorProto.DataType.STRING;case"int64":return Ge.onnx.TensorProto.DataType.INT64;case"uint64":return Ge.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>pr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(_t.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},_t=class{static longToNumber(e,n){return pr.isLong(e)?e.toNumber():e instanceof D.Long?pr.fromValue({low:e.low,high:e.high,unsigned:n??!1}).toNumber():e}static isLong(e){return pr.isLong(e)||e instanceof D.Long}},Q=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];s*=o[u]}}let a=r.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(n).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let s=r.normalizeAxis(n[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Ln=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[n]=t[a],i.push(u)}return[i,s]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Vr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)r.adjustPadAndReturnShape(e[a+2],n[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Gr=-34028234663852886e22,Ur=34028234663852886e22});function Vw(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function Df(r){switch(r){case _e.onnx.TensorProto.DataType.UINT8:case _e.onnx.TensorProto.DataType.INT8:case _e.onnx.TensorProto.DataType.BOOL:return 1;case _e.onnx.TensorProto.DataType.UINT16:case _e.onnx.TensorProto.DataType.INT16:return 2;case _e.onnx.TensorProto.DataType.FLOAT:case _e.onnx.TensorProto.DataType.INT32:case _e.onnx.TensorProto.DataType.UINT32:return 4;case _e.onnx.TensorProto.DataType.INT64:case _e.onnx.TensorProto.DataType.DOUBLE:case _e.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${_e.onnx.TensorProto.DataType[r]}`)}}function Gw(r,e){return new(Rf(e))(r)}function Rf(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Ja(r,e){if(e===_e.onnx.TensorProto.DataType.INT64||e===Ya.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===_e.onnx.TensorProto.DataType.UINT32||e===Ya.TensorDataType.UINT32||e===_e.onnx.TensorProto.DataType.UINT64||e===Ya.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${_e.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Bf(r,e,n){switch(e){case _e.onnx.TensorProto.DataType.BOOL:case _e.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case _e.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case _e.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case _e.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case _e.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case _e.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case _e.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case _e.onnx.TensorProto.DataType.INT64:return Ja(pr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case _e.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case _e.onnx.TensorProto.DataType.UINT64:return Ja(pr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${_e.onnx.TensorProto.DataType[e]}`)}}var Lf,_e,Ya,rt,Wr=C(()=>{"use strict";Lf=ln(_c());Ra();Cn();_e=ln(pn());ze();Ya=ee.experimental.fbs,rt=class r{constructor(e,n,t,o,i,s=Lf.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=Q.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=Rf(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*Vw(n));this.cache=Gw(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[Q.indicesToOffset(e,this.strides)]}set(e,n){this.data[Q.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=Q.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=dt.tensorDataTypeFromProto(e.dataType),t=dt.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,s)=>{o.data[s]=Rn(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=Df(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=Bf(s,e.dataType,l*a);i[l]=f}}else{let i;switch(e.dataType){case _e.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case _e.onnx.TensorProto.DataType.INT32:case _e.onnx.TensorProto.DataType.INT16:case _e.onnx.TensorProto.DataType.UINT16:case _e.onnx.TensorProto.DataType.INT8:case _e.onnx.TensorProto.DataType.UINT8:case _e.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case _e.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case _e.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case _e.onnx.TensorProto.DataType.UINT32:case _e.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];pr.isLong(u)?s[a]=Ja(u,e.dataType):s[a]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=dt.tensorDimsFromORTFormat(e),t=dt.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=Df(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=Bf(s,e.dataType(),l*a);i[l]=f}}return o}}});function ae(r){return r===1?Uw:Ww}function zf(r){let e=ae(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Nf(r){let e=ae(r);return`${e.version}
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

    `}function Mf(r,e){let n=ae(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var Uw,Ww,qe=C(()=>{"use strict";Uw={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},Ww={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Oe=C(()=>{"use strict"});async function Qa(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,s=()=>{if(r()){t();return}i++;let a=e(i);if(n!=null&&i>=n){o();return}setTimeout(s,a)};s()})}function Mo(r){return mn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function Ff(r){return mn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function hn(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function gn(r,e){return e.map(n=>r[n]).join(", ")}function bt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function qt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var er=C(()=>{"use strict";ze()});function Hw(r,e){return qt(e).map(n=>`${r}.${n}`)}function bn(r,e){return e===1?[r]:Hw(r,e)}function tr(){return`
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
  `}var Hr=C(()=>{"use strict";er()});function jw(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function Kw(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(n>2)for(let u=0;u<n-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function Xw(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Vf,qw,Gf,Uf=C(()=>{"use strict";qe();Oe();er();Hr();Vf={name:"pack",inputNames:["A"],inputTypes:[1]},qw=(r,e)=>{let n=ae(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=bt(i),a=bn("rc",i),u=Xw(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let f=jw(i,l,a),c=Kw(t,a),p=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${f}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${c});
          }
        }
      `;return{...Vf,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:p}},Gf=(r,e)=>({...Vf,get:()=>qw(r,e)})});function es(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Hf(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function Jw(r){let e=Q.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${n[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${n[s+1]} = ${t} - ${n[s]} * ${i}`:`index -= ${n[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function Qw(r){let e=Q.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Zw,Yw,Wf,qf=C(()=>{"use strict";ze();qe();Oe();Hr();Zw=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),Yw=(r,e,n,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let f="";switch(l){case 0:f="outputCoords = rc;";break;case 1:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:f="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${f}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=ae(r.session.backend.glContext.version),u=`
      ${Jw(o)}
      ${Qw(i)}
      ${tr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Wf=(r,e,n)=>{let t=Zw(n);return{...t,get:()=>Yw(r,e,t,n)}}});var ts,jf=C(()=>{"use strict";qe();Oe();ts=(r,e)=>{let n=e.shape,t=ae(r.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function tv(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Kf,ev,Xf,Zf=C(()=>{"use strict";qe();Oe();er();Hr();Kf={name:"unpack",inputNames:["A"],inputTypes:[2]},ev=(r,e)=>{let n=e.dims.length,t=bn("rc",n),o=t.slice(-2),i=bt(n),s=tr(),u=e.dims.length===0?"":tv(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,f=ae(r.session.backend.glContext.version),c=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${f.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Kf,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},Xf=(r,e)=>({...Kf,get:()=>ev(r,e)})});var Fo,zn,Vo,Nn=C(()=>{"use strict";kt();Fo=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Ne.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Ne.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},zn=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Ne.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Vo=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Mn,Yf,rs,Jf=C(()=>{"use strict";ze();Oe();Mn=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,s=n===4?e.length-1:void 0,a=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return rs(r,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},Yf=(r,e,n)=>{let t=Mn(r,e,n);return[t.width,t.height]},rs=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:n,isPacked:i,shape:l,strides:Q.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var nv,Go,ed=C(()=>{"use strict";kt();Wr();ze();Uf();qf();jf();Zf();Nn();Jf();Oe();nv=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Go=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return Yf(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=nv(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=Mn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Mn(this.session.layoutStrategy,e.dims,n);if(n===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=Mn(this.session.layoutStrategy,u,n),f=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let c=a[0],p=a[1]*a[2]*a[3],b=Math.ceil(p*1/4)*4,g=c*b;f=new Float32Array(g);for(let h=0;h<c;++h){let v=h*p,T=h*b+h%1*p;f.set(e.numberData.subarray(v,v+p),T)}}return this.createTextureData(l,e.type,f,e,1)}}if(n===2){let i=rs(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Ne.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,s,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:Q.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Hf(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:Q.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=es(e.dims),i=es(n),s=this.reshapePacked(e,o),a=this.run(Wf(this,s,i),[s]);return this.reshapePacked(a,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let s={...e,tensor:o||new rt(e.unpackedShape,n,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(ts(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(ts(this,e))}pack(e){return this.executeProgram(Gf(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Xf(this,e.tensor),[e.tensor])}}});var ns,xe,lt=C(()=>{"use strict";ns=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},xe=r=>new ns(r)});var td,rd,nd,ov,iv,od=C(()=>{"use strict";lt();qe();Oe();td={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},rd=(r,e,n)=>(iv(e),[r.run({...td,cacheHint:n.cacheKey,get:()=>ov(r,e,n)},e)]),nd=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return xe({epsilon:e,momentum:n,spatial:t})},ov=(r,e,n)=>{let t=ae(r.session.backend.glContext.version),o=e[0].dims.length,[i,s]=r.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...td,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},iv=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Uo,Rt,X,Fn,Wo,mr=C(()=>{"use strict";Uo=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Rt=class{constructor(e){this.context=e}},X=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Fn=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Wo=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function sv(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function uv(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function lv(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function cv(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function fv(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function dv(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function pv(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function mv(){let r="and_";return{body:`
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
  `,name:r,type:0}}function hv(){let r="or_";return{body:`
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
  `,name:r,type:0}}function gv(){let r="xor_";return{body:`
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
  `,name:r,type:0}}function bv(){return xv("pow")}function yv(){let r="prelu_";return{body:`
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
  `,name:r,type:0}}function xv(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var zt,wv,id,ad,sd,ud,ld,cd,fd,dd,pd,md,hd,gd,bd=C(()=>{"use strict";ze();mr();qe();Oe();zt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>wv(r,e,n,t)}},wv=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!Q.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=r.session.pack;if(i){let f=gt.calcShape(e[0].dims,e[1].dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");s=f;let c=s.length,p=e[0].dims.length!==0?e[0].dims.length:1,b=e[1].dims.length!==0?e[1].dims.length:1,g=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",v=ae(r.session.backend.glContext.version),T=a?`
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
        int bindices[${b}];
        ${g}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:T,hasMain:a}}let u=ae(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},id=(r,e)=>[r.run(zt(r,e,sv()),e)],ad=(r,e)=>[r.run(zt(r,e,mv(),"bool"),e)],sd=(r,e)=>[r.run(zt(r,e,uv()),e)],ud=(r,e)=>[r.run(zt(r,e,fv(),"bool"),e)],ld=(r,e)=>[r.run(zt(r,e,dv(),"bool"),e)],cd=(r,e)=>[r.run(zt(r,e,pv(),"bool"),e)],fd=(r,e)=>[r.run(zt(r,e,lv()),e)],dd=(r,e)=>[r.run(zt(r,e,hv(),"bool"),e)],pd=(r,e)=>[r.run(zt(r,e,bv()),e)],md=(r,e)=>[r.run(zt(r,e,yv()),e)],hd=(r,e)=>[r.run(zt(r,e,cv()),e)],gd=(r,e)=>[r.run(zt(r,e,gv(),"bool"),e)]});var yd,xd,Tv,wd=C(()=>{"use strict";ze();yd=(r,e,n)=>(Tv(e),[r.cast(e[0],n)]),xd=r=>dt.tensorDataTypeFromProto(r.attributes.getInt("to")),Tv=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var _v,Iv,vd,Ho,Td=C(()=>{"use strict";qe();Oe();er();Hr();_v=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),Iv=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<n.length;P++){let E=n[P].dims.slice();for(let B=0;B<o.length;B++)if(B===t)i[t]+=E[B];else if(o[B]!==E[B])throw new Error("non concat dimensions must match")}let s=i.length,a=bn("coords",s),u=bt(s),l=tr(),f=n.map(P=>P.dims),c=qt(s),p=new Array(f.length-1);p[0]=f[0][t];for(let P=1;P<p.length;P++)p[P]=p[P-1]+f[P][t];let b=c[t],g=c.slice(-2),h=c.join(),v=`if (${b} < ${p[0]}) {
        return getChannel(
            getX0(${h}), vec2(${g.join()}));
        }`;for(let P=1;P<p.length;P++){let E=p[P-1];v+=`
            if (${b} < ${p[P]}  && ${b} >= ${p[P-1]}) {
              return getChannel(
                getX${P}(${Ho(c,b,E)}),
                vec2(${Ho(g,b,E)}));
            }`}let T=p.length,w=p[p.length-1];v+=`
            return getChannel(
              getX${T}(${Ho(c,b,w)}),
              vec2(${Ho(g,b,w)}));`;let _=ae(r.session.backend.glContext.version),$=`
          ${l}
          float getValue(${c.map(P=>"int "+P)}) {
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
            ${_.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:$,hasMain:!0}},vd=(r,e,n)=>{let t=_v(e.length,n.cacheKey);return{...t,get:()=>Iv(r,t,e,n.axis)}},Ho=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,s)=>s===t?`${i} - ${n}`:i).join()}});var _d,Sv,$v,Av,Id,Pv,Ov,Ev,Sd,Cv,$d=C(()=>{"use strict";lt();Oe();Td();_d=(r,e,n)=>(Cv(e),r.session.pack&&e[0].dims.length>1?[r.run(vd(r,e,n),e)]:[r.run(Av(r,e,n),e)]),Sv=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),$v=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let b=1;b<n.length;b++){let g=n[b].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=g[h];else if(o[h]!==g[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(n.length),u=0;for(let b=0;b<a.length;++b)u+=n[b].dims[t],a[b]=u;let l="";n.length<5?l=Id(a):l=Pv(a);let f=Ov(n.length,s),c=Ev(a),p=`
        ${f}
        ${c}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:p}},Av=(r,e,n)=>{let t=Sv(e.length,n.cacheKey);return{...t,get:()=>$v(r,t,e,n.axis)}},Id=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,Pv=r=>Id(r),Ov=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},Ev=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},Sd=r=>xe({axis:r.attributes.getInt("axis")}),Cv=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function kv(){return Nt("abs")}function Dv(){return Nt("acos")}function Bv(){return Nt("asin")}function Lv(){return Nt("atan")}function Rv(){return Nt("ceil")}function zv(){return Nt("cos")}function Nv(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Mv(){return Nt("exp")}function Fv(){return Nt("floor")}function os(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function Vv(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function Gv(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Uv(){return Nt("log")}function Wv(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function Hv(){let r="not";return{body:`
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
  `,name:r,type:0}}function qv(){return Nt("sin")}function is(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function as(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function jv(){return Nt("sqrt")}function Kv(){return Nt("tan")}function Xv(){let r="tanh";return{body:`
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
  `,name:r,type:0}}function Nt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var Zv,Qe,Ad,Pd,Od,Ed,ss,Cd,kd,Yv,Dd,Bd,Ld,Rd,zd,Nd,us,Md,Fd,Vd,Gd,Ud,Wd,Hd,qd,jd,Kd,Xd,ls=C(()=>{"use strict";lt();ze();mr();qe();Oe();Zv=(r,e,n,t)=>{let o=r.session.pack?2:0,i=ae(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},Qe=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>Zv(r,i,e,n)}},Ad=(r,e)=>[r.run(Qe(r,e[0],kv()),e)],Pd=(r,e)=>[r.run(Qe(r,e[0],Dv()),e)],Od=(r,e)=>[r.run(Qe(r,e[0],Bv()),e)],Ed=(r,e)=>[r.run(Qe(r,e[0],Lv()),e)],ss=(r,e,n)=>[r.run(Qe(r,e[0],os(n.min,n.max),n.cacheKey),e)],Cd=r=>xe({min:r.attributes.getFloat("min",Gr),max:r.attributes.getFloat("max",Ur)}),kd=(r,e)=>{let n=Yv(r,e);return ss(r,[e[0]],n)},Yv=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Gr,t=e.length>=3?e[2].numberData[0]:Ur;return xe({min:n,max:t})},Dd=(r,e)=>[r.run(Qe(r,e[0],Rv()),e)],Bd=(r,e)=>[r.run(Qe(r,e[0],zv()),e)],Ld=(r,e,n)=>[r.run(Qe(r,e[0],Nv(n.alpha),n.cacheKey),e)],Rd=r=>xe({alpha:r.attributes.getFloat("alpha",1)}),zd=(r,e)=>[r.run(Qe(r,e[0],Mv()),e)],Nd=(r,e)=>[r.run(Qe(r,e[0],Fv()),e)],us=(r,e)=>[r.run(Qe(r,e[0],Vv()),e)],Md=(r,e,n)=>[r.run(Qe(r,e[0],Gv(n.alpha),n.cacheKey),e)],Fd=r=>xe({alpha:r.attributes.getFloat("alpha",.01)}),Vd=(r,e)=>[r.run(Qe(r,e[0],Uv()),e)],Gd=(r,e)=>[r.run(Qe(r,e[0],Wv()),e)],Ud=(r,e)=>[r.run(Qe(r,e[0],Hv()),e)],Wd=(r,e)=>[r.run(Qe(r,e[0],is()),e)],Hd=(r,e)=>[r.run(Qe(r,e[0],as()),e)],qd=(r,e)=>[r.run(Qe(r,e[0],qv()),e)],jd=(r,e)=>[r.run(Qe(r,e[0],jv()),e)],Kd=(r,e)=>[r.run(Qe(r,e[0],Kv()),e)],Xd=(r,e)=>[r.run(Qe(r,e[0],Xv()),e)]});function rr(r){let e;switch(r.activation){case"Relu":e=is();break;case"Sigmoid":e=as();break;case"Clip":e=os(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var yn,qr=C(()=>{"use strict";ze();ls();yn=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Gr,Ur]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var Qv,eT,Zd,Yd=C(()=>{"use strict";kt();qe();Oe();qo();qr();Qv=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),eT=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;Ne.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=xn(s,a,t.dilations,t.pads,t.strides),f=ae(r.session.backend.glContext.version),{activationFunction:c,applyActivation:p}=rr(t),b=`
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
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Zd=(r,e,n)=>{let t=Qv(e.length>2,n.cacheKey);return{...t,get:()=>eT(r,e,t,n)}}});var tT,rT,Jd,Qd=C(()=>{"use strict";qe();Oe();Hr();tT=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),rT=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=2,l=3,f=o.length,c=[a[1]*a[2]*a[3],o[2]*o[3]],p=a[2]*a[3],b=tr(),g=ae(r.session.backend.glContext.version),h="";for(let T=0;T<=1;T++)for(let w=0;w<=1;w++)h+=`
            blockIndex = rc.x + ${w};
            pos = rc.y + ${T};

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
                    result[${T*2+w}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let v=`
      ${b}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${g.output} = result;
      }
            `;return{...e,output:{dims:c,type:n.type,textureType:2},shaderSource:v,hasMain:!0}},Jd=(r,e,n,t,o)=>{let i=tT(o.cacheKey);return{...i,get:()=>rT(r,i,e,n,t,o)}}});function oT(r,e,n){let t=e[0].dims,o=e[1].dims,i=gt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=bt(i.length),a=qt(),{activationFunction:u,applyActivation:l}=rr(n),f=e.length>2,c=f?"value += getBiasForMatmul();":"",p=f?`${fs(s,a,e[2].dims,i,!1)}`:"",b=i.length,g=t.length,h=o.length,v=t[t.length-1],T=`
    ${u}
    ${p}
    float process(int indices[${b}]) {
        int a[${g}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${v}; ++k) {
            a[${g-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${c}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:T}}function cs(r,e){let n=nT(r.length>2,e.activationCacheKey);return{...n,get:()=>oT(n,r,e)}}function fs(r,e,n,t,o){let i="",s=n.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=n.map((h,v)=>`coords.${e[v+u]}`).join(", ");let f=gt.getBroadcastDims(n,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
`),p=Q.size(n)===1,b="vec4(outputValue.xx, outputValue.yy)";return p&&(b="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${f}
  vec4 outputValue = getBias(${i});
  return ${b};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${f}
  return getBias(coords.x);
}`}var ep,tp,nT,iT,jo=C(()=>{"use strict";ze();Oe();er();qr();ds();ep=(r,e,n)=>(iT(e),r.session.pack?[r.run(Ko(r,e,n),e)]:[r.run(cs(e,n),e)]),tp=r=>yn(r.attributes),nT=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});iT=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function uT(r,e,n,t){let o=[],i=[],s=n[0].dims,a=n[1].dims,u=s.length,l=a.length,f=t.length,c=f-u,p=f-l;o=s.map((_,$)=>`coords.${e[$+c]}`),o[u-1]="i*2",o.join(", "),i=a.map((_,$)=>`coords.${e[$+p]}`),i[l-2]="i*2",i.join(", ");let b=gt.getBroadcastDims(s,t),g=gt.getBroadcastDims(a,t),h=b.map(_=>`coords.${e[_+c]} = 0;`).join(`
`),v=g.map(_=>`coords.${e[_+p]} = 0;`).join(`
`),T=`int lastDim = coords.${e[f-1]};
  coords.${e[f-1]} = coords.${e[f-2]};
  coords.${e[f-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${T}
  ${h}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${T}
  ${v}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function lT(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function cT(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var aT,sT,Ko,ds=C(()=>{"use strict";ze();qe();Oe();er();qr();jo();aT=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),sT=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",s=n[0].dims,a=n[1].dims,u=gt.calcShape(s,a,!0),l=!Q.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let f=s[s.length-1],c=Math.ceil(f/2),p=s.length,b=a.length,g=ae(r.session.backend.glContext.version),h=bt(u.length),v=u.length,T=qt(),{activationFunction:w,applyActivation:_}=rr(t),$=o?`${fs(h,T,n[2].dims,u,!0)}`:"",P=l?`${uT(h,T,n,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${lT(T,p)})`,B=l?"getBAtOutCoordsMatmul(i)":`getB(${cT(T,b)})`,N=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${T[v-1]}; rc.${T[v-1]} =
          rc.${T[v-2]}; rc.${T[v-2]} = lastDim;
      `,H=`
            ${P}
            ${$}
            ${w}
            void main() {
              ${N}

              vec4 value = vec4(0);
              for (int i = 0; i < ${c}; i++) {
                vec4 a = ${E};
                vec4 b = ${B};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${_}
              ${g.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:H,hasMain:!0}},Ko=(r,e,n)=>{let t=aT(e.length>2,n.activationCacheKey);return{...t,get:()=>sT(r,t,e,n)}}});var rp,np=C(()=>{"use strict";qo();Qd();ds();rp=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.run(Jd(r,e[0],e[1],i,n),[e[0]]),a=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=r.run(Ko(r,u,n),u);return r.reshapePacked(l,i)}});var fT,dT,op,ps,ms=C(()=>{"use strict";Oe();fT=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),dT=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=o.length,l=ps(s,a,o,4),f=`
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
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:f}},op=(r,e,n,t,o)=>{let i=fT(o.cacheKey);return{...i,get:()=>dT(r,i,e,n,t,o)}},ps=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var pT,mT,ip,ap=C(()=>{"use strict";ze();qe();Oe();qr();ms();pT=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),mT=(r,e,n,t,o)=>{let i=n[0].dims,s=n[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=ps(i,s,t),[l,f]=r.calculateTextureWidthAndHeight(a,4),c=Q.computeStrides(u),[p,b]=r.calculateTextureWidthAndHeight(u,4),g=t.length,h=n.length<3?"0.0":"_B(b)",v=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:T,applyActivation:w}=rr(o),_=ae(r.session.backend.glContext.version),$=`
${T}
float process(int indices[${g}]) {
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
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${p}, ${b});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${f});
    value += dot(${_.texture2D}(Im2Col, im2colCoords), ${_.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${w}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:$}},ip=(r,e,n,t)=>{let o=pT(e.length>2,t);return{...o,get:()=>mT(r,o,e,n,t)}}});var xn,hs,hT,gT,bT,yT,gs,xT,qo=C(()=>{"use strict";lt();ze();Yd();np();ap();qr();ms();jo();xn=(r,e,n,t,o)=>{let i=r[0],s=r.slice(2),a=s.length,u=e[0],f=e.slice(2).map((g,h)=>g+(g-1)*(n[h]-1)),p=s.map((g,h)=>g+t[h]+t[h+a]).map((g,h)=>Math.floor((g-f[h]+o[h])/o[h]));return[i,u].concat(...p)},hs=(r,e,n)=>(xT(e,n),hT(r,e,n)),hT=(r,e,n)=>{let t=yT(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Zd(r,e,t),e)]:i&&o?[gT(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[rp(r,e,t)]:[bT(r,e,t)]},gT=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=r.run(cs(u,n),u);return r.reshapeUnpacked(l,i)},bT=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=xn(t,o,n.dilations,n.pads,n.strides),s=r.run(op(r,e[0],e[1],i,n),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return r.run(ip(r,e,i,n),a)},yT=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Vr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},gs=r=>{let e=r.attributes,n=yn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...n})},xT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var wT,vT,TT,sp,_T,IT,ST,$T,AT,PT,up,OT,lp=C(()=>{"use strict";lt();qe();Oe();qr();wT=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,vT=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},TT=(r,e,n,t,o,i,s,a)=>{let u=r.length-2,l=a.length===0;for(let f=0;f<u;++f){let c=l?r[f+2]*i[f]:a[f],p=wT(r[f+2],i[f],o[f],e[f],n[f],c);vT(p,t,o,f,f+u),l&&a.push(i[f]*(r[f+2]-1)+s[f]+(e[f]-1)*n[f]+1-o[f]-o[f+u])}},sp=(r,e,n)=>(OT(e,n),_T(r,e,n)),_T=(r,e,n)=>{let t=PT(n,e);return[AT(r,e,t)]},IT=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),ST=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,f=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],c=ae(r.session.backend.glContext.version),{activationFunction:p,applyActivation:b}=rr(t),g=`
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
    ${b}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:f,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},$T=(r,e,n)=>{let t=IT(e.length>2,n.cacheKey);return{...t,get:()=>ST(r,e,t,n)}},AT=(r,e,n)=>r.run($T(r,e,n),e),PT=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)n.push(e[1].dims[a]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;TT(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let s=Object.assign({},r);return Object.assign(s,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),s},up=r=>{let e=r.attributes,n=yn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),f=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:f,...n})},OT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var cp,jr,fp,ET,dp,CT,kT,DT,Xo=C(()=>{"use strict";lt();ze();Oe();cp={name:"Transpose",inputNames:["A"],inputTypes:[0]},jr=(r,e,n)=>(DT(e),[r.run({...cp,cacheHint:n.cacheKey,get:()=>ET(r,e[0],n.perm)},e)]),fp=r=>xe({perm:r.attributes.getInts("perm",[])}),ET=(r,e,n)=>{let t=e.dims;n=dp(t,n);let o=CT(t,n),i=t.length,s=`
      ${kT("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...cp,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},dp=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),CT=(r,e)=>(e=dp(r,e),Q.sortBasedOnPerm(r,e)),kT=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},DT=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var pp,mp,BT,hp=C(()=>{"use strict";Xo();pp=(r,e,n)=>{BT(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=r.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=jr(r,[a],u),f=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,f)]},mp=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},BT=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var gp,bp,LT,yp=C(()=>{"use strict";ze();gp=(r,e,n)=>{LT(e,n);let t=Q.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},bp=r=>r.attributes.getInt("axis",1),LT=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var $r,Vn=C(()=>{"use strict";$r=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var xp,wp,RT,zT,NT,MT,vp=C(()=>{"use strict";lt();Vn();ze();Oe();xp=(r,e,n)=>(MT(e,n.axis),[r.run(NT(r,e,n),e)]),wp=r=>xe({axis:r.attributes.getInt("axis",0)}),RT={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},zT=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),s=new Array(o.length+i.length-1);t=Q.normalizeAxis(t,o.length);let a=[];for(let p=0;p<s.length;p++)p<t?(s[p]=o[p],a.push(`inputIdx[${p}] = outputIdx[${p}];`)):p<t+i.length?(s[p]=i[p-t],a.push(`indexDataIdx[${p-t}] = outputIdx[${p}];`)):(s[p]=o[p-i.length+1],a.push(`inputIdx[${p-i.length+1}] = outputIdx[${p}];`));let u=s.length||1,l=o.length,f=i.length||1,c=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${f}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:n[0].type,textureType:0},shaderSource:c}},NT=(r,e,n)=>{let t={...RT,cacheHint:n.cacheKey};return{...t,get:()=>zT(r,t,e,n.axis)}},MT=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if($r.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var bs,Tp,_p,Ip,FT,VT,GT,Sp=C(()=>{"use strict";lt();ze();Oe();bs=(r,e,n)=>(GT(e,n),[r.run(FT(e,n),e)]),Tp=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return xe({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},_p=r=>Tp(r,!1),Ip=r=>Tp(r,!0),FT=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>VT(n,r,e)}},VT=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=No.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let f=a.length,c=e.length===3?`int c[${e[2].dims.length}];`:"",p=e.length===3?"bcastIndices_C(indices, c);":"",b=e.length===3?"value += beta * _C(c);":"",g=`
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
          ${b}
          return value;
      }`;return{...r,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:g}},GT=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var $p,Ap,UT,WT,HT,qT,jT,Pp=C(()=>{"use strict";lt();Oe();$p=(r,e,n)=>(jT(e),[r.run(HT(r,e,n),e)]),Ap=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return xe({scale:e,bias:n})},UT={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},WT=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,a=`
      ${qT(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},HT=(r,e,n)=>{let t={...UT,cacheHint:n.cacheKey};return{...t,get:()=>WT(r,t,e,n)}},qT=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},jT=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Ep,Cp,Op,KT,XT,ZT,YT,JT,QT,kp=C(()=>{"use strict";qe();Oe();Ep=(r,e,n)=>{QT(e);let t=r.run(XT(e[0]),e);return[r.run(JT(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Cp=r=>r.attributes.getFloat("epsilon",1e-5),Op={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},KT=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],s=`
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
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},XT=r=>({...Op,get:()=>KT(Op,r)}),ZT={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},YT=(r,e,n,t,o)=>{let i=ae(r.session.backend.glContext.version),[s,a]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],f=`
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
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:f}},JT=(r,e,n,t)=>{let o={...ZT,cacheHint:`${n}`};return{...o,get:()=>YT(r,o,e,n,t)}},QT=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function e_(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...Lp,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function t_(r,e){return{...Lp,cacheHint:e.cacheKey,get:()=>e_(r,e)}}var Dp,Bp,Lp,r_,Rp=C(()=>{"use strict";lt();Oe();Dp=(r,e,n)=>(r_(e),[r.run(t_(e,n),e)]),Bp=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return xe({alpha:e,beta:n,bias:t,size:o})},Lp={name:"LRN",inputNames:["X"],inputTypes:[0]};r_=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var n_,ys,zp,Np,Mp,o_,i_,a_,s_,u_,l_,c_,f_,Fp=C(()=>{"use strict";lt();ze();qe();Oe();n_={name:"Pad",inputNames:["A"],inputTypes:[0]},ys=(r,e,n)=>(a_(e),[r.run({...n_,cacheHint:n.cacheKey,get:()=>i_(r,e[0],n)},e)]),zp=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return xe({mode:e,value:n,pads:t})},Np=(r,e,n)=>{s_(e);let t=o_(r,e,n);return ys(r,[e[0]],t)},Mp=r=>r.attributes.getString("mode","constant"),o_=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return xe({mode:n,pads:t,value:o})},i_=(r,e,n)=>{let t=Q.padShape(e.dims.slice(),n.pads),o=t.length,s=`
      ${u_(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},a_=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},s_=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},u_=(r,e,n)=>{let t=ae(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),s=Q.computeStrides(e.dims);switch(n.mode){case"constant":return l_(t,e.dims,s,o,i,n.pads,n.value);case"reflect":return c_(t,e.dims,s,o,i,n.pads);case"edge":return f_(t,e.dims,s,o,i,n.pads);default:throw new Error("Invalid mode")}},l_=(r,e,n,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
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
      `},c_=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
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
      `},f_=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
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
      `}});var Gp,Up,Wp,Hp,qp,jp,Kp,Xp,Zp,d_,Vp,Yp,Yo,Jp,Zo,p_,Qp=C(()=>{"use strict";lt();ze();Oe();Gp=(r,e,n)=>{Yo(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Wp(e,t,!1,n)},e)]},Up=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),s=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return xe({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:s})},Wp=(r,e,n,t)=>{let[o,i]=Zp(r,t,n),s=Q.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let f=`
        ${Jp(r[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:f}},Hp=(r,e,n)=>{Yo(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Wp(e,t,!0,n)},e)]},qp=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return xe({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},jp=(r,e,n)=>{Yo(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Xp(e,t,!1,n)},e)]},Kp=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),s=r.attributes.getInt("storage_order",0),a=r.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return xe({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},Xp=(r,e,n,t)=>{let[o,i]=Zp(r,t,n),s=`
      value = max(_X(x), value);
    `,a="",l=`
      ${Jp(r[0].dims,o,s,a,"-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Zp=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();Vr.adjustPoolAttributes(n,t,i,s,a,u);let l=Vr.computePoolOutputShape(n,t,s,a,i,u,e.autoPad),f=Object.assign({},e);return o?Object.assign(f,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[f,l]},d_={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Vp={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Yp=(r,e)=>(Yo(e),[r.run({...Vp,get:()=>Xp(e,Vp,!0,d_)},e)]),Yo=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Jp=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],f=r[i-1],c="",p="",b="";if(u+l!==0?c=`
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
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],v=e.strides[e.strides.length-2],T=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2],_=r[i-2];T+w!==0?p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${T} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${_}) {
                pad+= ${s};
                continue;
              }
          `:p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${T} + j;
            `,b=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${p}
          ${c}
          ${b}
          ${t}
          return value;
        }
      `}else{let s=Q.size(e.kernelShape),a=Q.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,f=p_(u),c=Zo(r,"inputDims"),p=Zo(e.pads,"pads"),b=Zo(a,"kernelStrides"),g=Zo(e.strides,"strides"),h=e.pads.reduce((w,_)=>w+_),v="";return h?v=`
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
          ${g}
          ${b}

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
      `}},Zo=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},p_=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Kr,Ar,m_,h_,em,tm,rm,nm,om,im,am,sm=C(()=>{"use strict";lt();Vn();ze();Oe();Kr=(r,e,n,t,o)=>{h_(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>m_(r,e,n,t,o,i)},e)]},Ar=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return xe({axes:e,keepDims:n})},m_=(r,e,n,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=Q.normalizeAxes(n.axes,e[0].dims.length),f=o(e,l),c=f[1];for(let g=0;g<e[0].dims.length;g++)l.indexOf(g)>=0||l.length===0?(n.keepDims&&s.push(1),c=`
          for(int j${g} = 0; j${g} < ${e[0].dims[g]}; j${g}++) {
            inputIdx[${g}] = j${g};
            ${c}
          }`):(u.push(`inputIdx[${g}] = outputIdx[${s.length}];`),s.push(e[0].dims[g]));let b=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join(`
`)}
        ${f[0]}       // init ops for reduce max/min
        ${c}
        ${f[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:b}},h_=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},em=(r,e,n)=>Kr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),tm=(r,e,n)=>Kr(r,e,n,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),rm=(r,e,n)=>Kr(r,e,n,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),nm=(r,e,n)=>Kr(r,e,n,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),om=(r,e,n)=>Kr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),im=(r,e,n)=>Kr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),am=(r,e,n)=>Kr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var um,lm=C(()=>{"use strict";ze();um=(r,e)=>{let n=Q.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var cm,xs,fm,dm,Gn,g_,ws,Jo,vs=C(()=>{"use strict";lt();qe();Oe();cm={name:"Upsample",inputNames:["X"],inputTypes:[0]},xs=(r,e,n)=>(ws(e,n),[r.run({...cm,cacheHint:n.cacheKey,get:()=>g_(r,e,n)},e)]),fm=r=>Gn(r,7),dm=r=>Gn(r,9),Gn=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),Jo(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),s=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let f=r.attributes.getFloat("cubic_coeff_a",-.75),c=r.attributes.getInt("exclude_outside",0)!==0;if(c&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",b=0,g=0,h=0;return e>10?r.inputs.length>2?(b=1,g=2,h=3):(g=1,h=2):e===9&&(g=1),xe({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:f,excludeOutside:c,useNearest2xOptimization:p,roiInputIdx:b,scalesInputIdx:g,sizesInputIdx:h})},g_=(r,e,n)=>{let t=ae(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,v)=>Math.floor(h*n.scales[v])),[a,u]=r.calculateTextureWidthAndHeight(s,0),l=s.length,f=new Array(l),c=new Array(l),p=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let h=l-1;h>=0;h--)f[h]=h===l-1?1:f[h+1]*s[h+1],c[h]=h===l-1?1:c[h+1]*e[0].dims[h+1],p+=`
        output_pitches[${h}] = ${f[h]};
        input_pitches[${h}] = ${c[h]};
        `;let b=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,g=n.mode==="nearest"?`
    ${b}
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
    ${b}
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
    ${b}
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
    }`;return{...cm,output:{dims:s,type:e[0].type,textureType:0},shaderSource:g,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(h=>Math.ceil(h))}]}},ws=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},Jo=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var Ts,_s,pm,mm,b_,y_,x_,w_,hm=C(()=>{"use strict";qe();Oe();er();Hr();vs();Ts={name:"Resize",inputNames:["A"],inputTypes:[2]},_s=(r,e,n)=>(ws(e,n),[r.run({...Ts,cacheHint:n.cacheKey,get:()=>b_(r,e,n)},e)]),pm=r=>Gn(r,10),mm=r=>Gn(r,11),b_=(r,e,n)=>{let t=ae(r.session.backend.glContext.version),[o,i]=y_(e,n);if(o.every(_=>_===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Ts,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let a=i.length;if(a<2)throw new Error(`output dimension should be at least 2, but got ${a}`);let u=i[a-2],l=i[a-1],f=e[0].dims;if(a!==f.length)throw new Error(`output dimension should match input ${f.length}, but got ${a}`);let c=f[a-2],p=f[a-1],b=o[a-2],g=o[a-1],h="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":h=`
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
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let v=bt(a),T=tr(),w=`
            const vec2 inputWH = vec2(${c}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${b}), float(${g}), float(${b}), float(${g}));
            ${T}
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
        `;return{...Ts,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:w}},y_=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let a=r[e.scalesInputIdx];if(a&&a.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=x_(a,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=w_(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},x_=(r,e,n)=>{let t=Array.from(r.floatData);return Jo(t,e,n),t},w_=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(r[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=r[s]/e[s];return Jo(i,n,t),i}});var gm,v_,bm=C(()=>{"use strict";Wr();gm=(r,e)=>(v_(e),[new rt([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),v_=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var Is,ym,xm,wm,T_,vm,__,I_,Tm=C(()=>{"use strict";lt();Vn();ze();Oe();Is={name:"Slice",inputNames:["A"],inputTypes:[0]},ym=(r,e,n)=>(T_(e),[r.run({...Is,cacheHint:n.cacheKey,get:()=>wm(r,e[0],n)},e)]),xm=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return xe({starts:e,ends:n,axes:t})},wm=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((c,p)=>p):n.axes,o=Q.normalizeAxes(t,e.dims.length),i=n.starts.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:Q.normalizeAxis(c,e.dims[o[p]])),s=n.ends.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:Q.normalizeAxis(c,e.dims[o[p]])),a=e.dims.slice(),u=[];for(let c=0;c<o.length;c++)a[o[c]]=s[c]-i[c],i[c]>0&&u.push(`outputIdx[${o[c]}] += ${i[c]};`);let f=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Is,output:{dims:a,type:e.type,textureType:0},shaderSource:f}},T_=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},vm=(r,e)=>{I_(e);let n=__(r,e);return[r.run({...Is,cacheHint:n.cacheKey,get:()=>wm(r,e[0],n)},[e[0]])]},__=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},I_=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var _m,Im,Sm,$m,Am,Pm,Om,Em,S_,$_,A_,Cm,km=C(()=>{"use strict";lt();ze();qe();Oe();Xo();_m={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Im={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Sm={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},$m=(r,e,n)=>{Cm(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(n.axis,t.length),i=Q.sizeToDimension(t,o),s=Q.sizeFromDimension(t,o);return Em(r,e,n,i,s)},Am=r=>xe({axis:r.attributes.getInt("axis",1)}),Pm=r=>xe({axis:r.attributes.getInt("axis",-1)}),Om=(r,e,n)=>{Cm(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(n.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],f;s&&(u=Array.from({length:i}).map((g,h)=>h),u[o]=i-1,u[i-1]=o,u.map(g=>a.push(t[g])),f=xe({perm:u}),l=jr(r,e,f));let c=s?Q.sizeToDimension(a,i-1):Q.sizeToDimension(t,i-1),p=s?Q.sizeFromDimension(a,i-1):Q.sizeFromDimension(t,i-1),b=Em(r,s?l:e,n,c,p);return s?jr(r,b,f):b},Em=(r,e,n,t,o)=>{let i=S_(r,e[0],t,o,[t]),s=r.run({..._m,cacheHint:n.cacheKey,get:()=>i},e),a=$_(r,e[0],t,o,i.output.dims,[t]),u=r.run({...Im,cacheHint:n.cacheKey,get:()=>a},[e[0],s]),l=A_(r,e[0],t,o,i.output.dims,a.output.dims);return[r.run({...Sm,cacheHint:n.cacheKey,get:()=>l},[e[0],s,u])]},S_=(r,e,n,t,o)=>{let[i,s]=r.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=ae(r.session.backend.glContext.version),l=`
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
      }`;return{..._m,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},$_=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=ae(r.session.backend.glContext.version),f=`
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
      }`;return{...Im,output:{dims:i,type:e.type,textureType:0},shaderSource:f}},A_=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...Sm,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},Cm=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Dm,Bm,Lm,P_,O_,E_,Rm=C(()=>{"use strict";lt();ze();Oe();Dm={name:"Split",inputNames:["A"],inputTypes:[0]},Bm=(r,e,n)=>{E_(e);let t=Q.normalizeAxis(n.axis,e[0].dims.length),o=P_(r,e,t,n),i=[];for(let s=0;s<o;++s)i.push(r.run({...Dm,cacheHint:`${n.cacheKey};${s}`,get:()=>O_(r,e[0],n,t,s)},e));return i},Lm=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return xe({axis:e,split:n,numOutputs:t})},P_=(r,e,n,t)=>{let[,o]=Ln.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},O_=(r,e,n,t,o)=>{let[i,s]=Ln.splitShape(e.dims,t,n.split,n.numOutputs),a=s[o],u=i[o],f=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...Dm,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:f}},E_=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var Ss,zm,Nm,C_,k_,Mm=C(()=>{"use strict";ze();Ss=(r,e,n)=>{C_(e);let t=Q.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},zm=(r,e)=>(k_(e),Ss(r,[e[0]],Array.from(e[1].integerData))),Nm=r=>r.attributes.getInts("axes"),C_=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},k_=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Fm,D_,B_,Vm=C(()=>{"use strict";qe();Oe();Fm=(r,e)=>{B_(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>D_(r,e,n)},e)]},D_=(r,e,n)=>{let t=ae(r.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},B_=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Gm,L_,R_,Um=C(()=>{"use strict";Vn();Oe();Gm=(r,e)=>{R_(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>L_(r,e,n)},e)]},L_=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},R_=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if($r.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var $s,Wm,Hm,z_,N_,qm=C(()=>{"use strict";ze();$s=(r,e,n)=>{z_(e);let t=Q.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Wm=(r,e)=>(N_(e),$s(r,[e[0]],Array.from(e[1].integerData))),Hm=r=>r.attributes.getInts("axes"),z_=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},N_=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var jm,Km=C(()=>{"use strict";od();bd();wd();$d();qo();lp();hp();yp();vp();Sp();Pp();kp();Rp();jo();Fp();Qp();sm();lm();hm();bm();Tm();km();Rm();Mm();Vm();Um();Xo();ls();qm();vs();jm=[["Abs","","6+",Ad],["Acos","","7+",Pd],["Add","","7+",id],["And","","7+",ad],["Asin","","7+",Od],["Atan","","7+",Ed],["AveragePool","","7+",Gp,Up],["BatchNormalization","","7+",rd,nd],["Cast","","6+",yd,xd],["Ceil","","6+",Dd],["Clip","","6-10",ss,Cd],["Clip","","11+",kd],["Concat","","4+",_d,Sd],["Conv","","1+",hs,gs],["ConvTranspose","","1+",sp,up],["Cos","","7+",Bd],["Div","","7+",sd],["Dropout","","7+",us],["DepthToSpace","","1+",pp,mp],["Equal","","7+",ud],["Elu","","6+",Ld,Rd],["Exp","","6+",zd],["Flatten","","1+",gp,bp],["Floor","","6+",Nd],["FusedConv","com.microsoft","1+",hs,gs],["Gather","","1+",xp,wp],["Gemm","","7-10",bs,_p],["Gemm","","11+",bs,Ip],["GlobalAveragePool","","1+",Hp,qp],["GlobalMaxPool","","1+",Yp],["Greater","","7+",ld],["Identity","","1+",us],["ImageScaler","","1+",$p,Ap],["InstanceNormalization","","6+",Ep,Cp],["LeakyRelu","","6+",Md,Fd],["Less","","7+",cd],["LRN","","1+",Dp,Bp],["Log","","6+",Vd],["MatMul","","1+",ep,tp],["MaxPool","","1+",jp,Kp],["Mul","","7+",fd],["Neg","","6+",Gd],["Not","","1+",Ud],["Or","","7+",dd],["Pad","","2-10",ys,zp],["Pad","","11+",Np,Mp],["Pow","","7+",pd],["PRelu","","7+",md],["ReduceLogSum","","1+",im,Ar],["ReduceMax","","1+",rm,Ar],["ReduceMean","","1+",tm,Ar],["ReduceMin","","1+",nm,Ar],["ReduceProd","","1+",om,Ar],["ReduceSum","","1-12",em,Ar],["ReduceSumSquare","","1+",am,Ar],["Relu","","6+",Wd],["Reshape","","5+",um],["Resize","","10",_s,pm],["Resize","","11+",_s,mm],["Shape","","1+",gm],["Sigmoid","","6+",Hd],["Sin","","7+",qd],["Slice","","10+",vm],["Slice","","1-9",ym,xm],["Softmax","","1-12",$m,Am],["Softmax","","13+",Om,Pm],["Split","","2-12",Bm,Lm],["Sqrt","","6+",jd],["Squeeze","","1-12",Ss,Nm],["Squeeze","","13+",zm],["Sub","","7+",hd],["Sum","","6+",Fm],["Tan","","7+",Kd],["Tanh","","6+",Xd],["Tile","","6+",Gm],["Transpose","","1+",jr,fp],["Upsample","","7-8",xs,fm],["Upsample","","9",xs,dm],["Unsqueeze","","1-12",$s,Hm],["Unsqueeze","","13+",Wm],["Xor","","7+",gd]]});function Zm(r){let e={},n;for(;(n=Xm.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=M_.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let s=n[1],a=n[2],u=n[3].split(","),l=s?`${s} ${a};`:"",f=e[t].body,c="";e[t].params.forEach((b,g)=>{b&&(c+=`${b.type} ${b.name} = ${u[g]};
`)}),f=`${c}
 ${f}`,f=f.replace("return",`${a} = `);let p=`
      ${l}
      {
        ${f}
      }
      `;r=r.replace(n[0],p)}}return r=r.replace(Xm,""),r}var Xm,M_,Ym=C(()=>{"use strict";Xm=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,M_="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function wn(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:F_(e,r).sort(),s=0;for(let a=0;a<r.length;++a){if(i!=null){if(i[s]===a&&r[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${r[a]}' is not 1`);(i[s]==null||i[s]>a)&&r[a]===1&&(n.push(r[a]),t.push(a)),i[s]<=a&&s++}r[a]!==1&&(n.push(r[a]),t.push(a))}return{newShape:n,keptDims:t}}function F_(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),mn(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),mn(r.every(V_),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function V_(r){return r%1===0}function G_(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Jm(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var Qo,As=C(()=>{"use strict";kt();ze();Qo=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let a=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,f)=>l*f),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,f)=>l*f);if(a>o||u>o)Ne.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=wn(i).newShape);let s=G_(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Jm(s/4).map(a=>a*2):Jm(s)}}});var ei,Qm=C(()=>{"use strict";ze();mr();qe();As();er();ei=class extends Rt{constructor(n){super(n)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let n="offsetToCoords";return{offsetToCoords:new X(`
      vec2 ${n}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let n="coordsToOffset";return{coordsToOffset:new X(`
      int ${n}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let n=this.context.outputTextureLayout;return n.isPacked?this.getPackedOutputSamplingSnippet(n):this.getUnpackedOutputSamplingSnippet(n)}getPackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputPacked1DCoords(t,o);break;case 2:i[s]=this.getOutputPacked2DCoords(t,o);break;case 3:i[s]=this.getOutputPacked3DCoords(t,o);break;default:i[s]=this.getOutputPackedNDCoords(t,o)}let u=`
      void setOutput(vec4 val) {
        ${ae(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new X(u),i}getUnpackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[s]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[s]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[s]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[s]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[s]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${ae(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return i[l]=new X(u),i}getOutputScalarCoords(){return new X(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(n,t){let o=t,i="";return o[0]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${o[1]}.0);
          }
        `,new X(i)):o[1]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${o[0]}.0);
          }
        `,new X(i)):(i=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${o[0]}, ${o[1]}));
          return 2 * (resTexRC.y * ${o[0]} + resTexRC.x);
        }
      `,new X(i))}getOutputPacked2DCoords(n,t){let o="";if(Fr.arraysEqual(n,t))return o=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new X(o);let i=t,s=Math.ceil(n[1]/2);return o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new X(o)}getOutputPacked3DCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[2]/2),s=i*Math.ceil(n[1]/2),a=`
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
      `;return new X(a)}getOutputPackedNDCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[n.length-1]/2),s=i*Math.ceil(n[n.length-2]/2),a=s,u="",l="b, r, c";for(let c=2;c<n.length-1;c++)a*=n[n.length-c-1],u=`
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
    `;return new X(f)}getOutputUnpacked1DCoords(n,t){let o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new X(o)}getOutputUnpacked2DCoords(n,t){let o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${n[1]};
          int c = index - r * ${n[1]};
          return ivec2(r, c);
        }
      `;return new X(o)}getOutputUnpacked3DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new X(o)}getOutputUnpacked4DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new X(o)}getOutputUnpacked5DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new X(o)}getOutputUnpacked6DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3","d4"],u=s.map((l,f)=>{let c=`int ${a[f]} = index / ${l}`,p=f===s.length-1?`int ${a[f+1]} = index - ${a[f]} * ${l}`:`index -= ${a[f]} * ${l}`;return`${c}; ${p};`}).join("");return o=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new X(o)}getCommonUtilFuncs(){let n={},t="uvFromFlat";n[t]=new X(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",n[t]=new X(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",n[t]=new X(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",n[t]=new X(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let o=ae(this.context.glContext.version);return n[t]=new X(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),n}getInputsSamplingSnippets(){let n={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let s=this.context.inputTextureLayouts[i],a=Mo(o);s.isPacked?n[a]=this.getPackedSamplerFromInput(a,o,s):n[a]=this.getUnpackedSamplerFromInput(a,o,s);let u=Ff(o);s.unpackedShape.length<=t.unpackedShape.length&&(s.isPacked?n[u]=this.getPackedSamplerAtOutputCoords(u,s,t,o):n[u]=this.getUnpackedSamplerAtOutputCoords(u,s,t,o))}),n}getPackedSamplerAtOutputCoords(n,t,o,i){let s=t.unpackedShape,a=o.unpackedShape,l=Mo(i),f=s.length,c=a.length,p=gt.getBroadcastDims(s,a),b=bt(c),g=c-f,h,v=qt();f===0?h="":c<2&&p.length>=1?h="coords = 0;":h=p.map(H=>`coords.${v[H+g]} = 0;`).join(`
`);let T="";c<2&&f>0?T="coords":T=s.map((H,q)=>`coords.${v[q+g]}`).join(", ");let w="return outputValue;",$=Q.size(s)===1,E=Q.size(a)===1;if(f===1&&!$&&!E)w=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if($&&!E)c===1?w=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:w=`
          return vec4(outputValue.x);
        `;else if(p.length){let H=f-2,q=f-1;p.indexOf(H)>-1&&p.indexOf(q)>-1?w="return vec4(outputValue.x);":p.indexOf(H)>-1?w="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(q)>-1&&(w="return vec4(outputValue.xx, outputValue.zz);")}let B=`
        int lastDim = coords.${v[c-1]};
        coords.${v[c-1]} = coords.${v[c-2]};
        coords.${v[c-2]} = lastDim;
      `,N=`
      vec4 ${n}() {
        ${b} coords = getOutputCoords();
        ${B}
        ${h}
        vec4 outputValue = ${l}(${T});
        ${w}
      }
    `;return new X(N,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(n,t,o,i){let s=[o.width,o.height],a=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,f=t.unpackedShape,c=o.unpackedShape,p=Mo(i);if(u===l&&Fr.arraysEqual(a,s)){let $=`
          float ${n}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new X($,["coordinates.sampleTexture"])}let b=bt(l),g=gt.getBroadcastDims(f,c),h=l-u,v,T=qt();u===0?v="":l<2&&g.length>=1?v="coords = 0;":v=g.map($=>`coords.${T[$+h]} = 0;`).join(`
`);let w="";l<2&&u>0?w="coords":w=t.unpackedShape.map(($,P)=>`coords.${T[P+h]}`).join(", ");let _=`
        float ${n}() {
          ${b} coords = getOutputCoords();
          ${v}
          return ${p}(${w});
        }
      `;return new X(_,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(n,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(n,t);case 1:return this.getPackedSampler1D(n,t,o);case 2:return this.getPackedSampler2D(n,t,o);case 3:return this.getPackedSampler3D(n,t,o);default:return this.getPackedSamplerND(n,t,o)}}getUnpackedSamplerFromInput(n,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(n,t,o);case 1:return this.getUnpackedSampler1D(n,t,o);case 2:return this.getUnpackedSampler2D(n,t,o);case 3:return this.getUnpackedSampler3D(n,t,o);case 4:return this.getUnpackedSampler4D(n,t,o);case 5:return this.getUnpackedSampler5D(n,t,o);case 6:return this.getUnpackedSampler6D(n,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(n,t){let o=ae(this.context.glContext.version),i=`
          vec4 ${n}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new X(i)}getPackedSampler1D(n,t,o){let i=[o.width,o.height],s=[i[1],i[0]],a=ae(this.context.glContext.version),l=`vec4 ${n}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new X(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=ae(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&Fr.arraysEqual(i,s)){let g=`vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new X(g)}let f=s,c=Math.ceil(i[1]/2),b=`vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${f[1]}, ${f[0]}, ${c}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new X(b,["coordinates.packedUVfrom2D"])}getPackedSampler3D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=[s[0],s[1]],u=ae(this.context.glContext.version);if(i[0]===1){let h=i.slice(1),v=[1,2],T=hn(i,h),w=["b","row","col"],_=JSON.parse(JSON.stringify(o));_.unpackedShape=T;let $=this.getPackedSamplerFromInput(n,t,_),E=`${$.routineBody}
      vec4 ${n}(int b, int row, int col) {
        return ${n}(${gn(w,v)});
      } `;return new X(E,$.dependencies)}let l=a[0],f=a[1],c=Math.ceil(i[2]/2),p=c*Math.ceil(i[1]/2),g=`vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${f}, ${l}, ${p}, ${c}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new X(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(n,t,o){let i=o.unpackedShape,s=i.length,a=[o.width,o.height],u=ae(this.context.glContext.version),l=[a[0],a[1]],f=l[1],c=l[0],p=Math.ceil(i[s-1]/2),b=p*Math.ceil(i[s-2]/2),g="int b, int row, int col",h=`b * ${b} + (row / 2) * ${p} + (col / 2)`;for(let w=2;w<s-1;w++)g=`int b${w}, `+g,b*=i[s-w-1],h=`b${w} * ${b} + `+h;let T=`vec4 ${n}(${g}) {
      int index = ${h};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${f});
      return ${u.texture2D}(${t}, uv);
    }`;return new X(T)}getUnpackedSamplerScalar(n,t,o){let[i,s]=[o.width,o.height];if(i===1&&s===1){let u=`
          float ${n}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new X(u,["coordinates.sampleTexture"])}let a=`
        float ${n}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${s});
          vec2 uv = uvFromFlat(${i}, ${s}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new X(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(n,t,o){let i=o.width,s=o.height;if(s===1&&i===1){let u=`
        float ${n}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new X(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new X(u,["coordinates.sampleTexture"])}if(i===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new X(u,["coordinates.sampleTexture"])}let a=`
        float ${n}(int index) {
          vec2 uv = uvFromFlat(${i}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new X(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.height,o.width];if(s!=null&&Fr.arraysEqual(i,s)){let b=s[1],g=s[0],h=`
          float ${n}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${b}.0, ${g}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new X(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:u}=wn(i),l=a;if(l.length<i.length){let b=hn(i,l),g=JSON.parse(JSON.stringify(o));g.unpackedShape=b;let h=["col","row"],v=`
          ${this.getUnpackedSamplerFromInput(n,t,g).routineBody}
          float ${n}(int row, int col) {
            return ${n}(${gn(h,u)});
          }
        `;return new X(v,["coordinates.sampleTexture"])}let f=s[1],c=s[0];if(c===1){let b=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${f}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${f}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new X(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(f===1){let b=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${f}, ${c});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new X(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${n}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${f}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new X(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(n,t,o){let i=o.unpackedShape,s=i[1]*i[2],a=i[2],{newShape:u,keptDims:l}=wn(i),f=u;if(f.length<i.length){let g=hn(i,f),h=["batch","col","row"],v=JSON.parse(JSON.stringify(o));v.unpackedShape=g;let T=this.getUnpackedSamplerFromInput(n,t,v),w=l.reverse(),_=`
          ${T.routineBody}
          float ${n}(int batch, int row, int col) {
            return ${n}(${gn(h,w)});
          }
        `;return new X(_,T.dependencies)}let c=o.width,p=o.height,b=`
          float ${n}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new X(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(n,t,o){let i=o.unpackedShape,s=i[3],a=i[2]*s,u=i[1]*a,l=o.width,f=o.height,c=`
        float ${n}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${a} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${f}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new X(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(n,t,o){let i=o.unpackedShape,s=i[4],a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:f,keptDims:c}=wn(i);if(f.length<i.length){let h=hn(i,f),v=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(o));T.unpackedShape=h;let w=`
          ${this.getUnpackedSamplerFromInput(n,t,T).routineBody}
          float ${n}(int row, int col, int depth, int depth2, int depth3) {
            return ${n}(${gn(v,c)});
          }
        `;return new X(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=o.width,b=o.height,g=`
        float ${n}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${a} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${p}, ${b}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new X(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(n,t,o){let i=o.unpackedShape,s=i[5],a=i[4]*s,u=i[3]*a,l=i[2]*u,f=i[1]*l,{newShape:c,keptDims:p}=wn(i);if(c.length<i.length){let v=hn(i,c),T=["row","col","depth","depth2","depth3","depth4"],w=JSON.parse(JSON.stringify(o));w.unpackedShape=v;let _=`
            ${this.getUnpackedSamplerFromInput(n,t,w).routineBody}
            float ${n}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${n}(${gn(T,p)});
            }
          `;return new X(_,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let b=o.width,g=o.height,h=`
          float ${n}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${f} + col * ${l} + depth * ${u} +
            depth2 * ${a} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${b}, ${g}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new X(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let n=this.context.outputTextureLayout,t=n.shape.length,o=n.strides,i=n.width,s=n.height,a=[];for(let l=0;l<t-1;++l)a.push(`
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
    `;return{toVec:new X(u,["coordinates.coordsToOffset"])}}valueFrom(){let n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;n[u]=new X(this.getValueFromSingle(t,a,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",n[u]=new X(this.getValueFromSingle(t,a,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),n}getValueFromSingle(n,t,o,i,s){let a=`_${n}`;s&&(a=a+"_T");let u=ae(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${n}, coords));
          return value;
        }
        `}getPackedValueFrom(n,t,o,i,s){let a=`_${n}_Pack`;s&&(a=a+"_T");let u=ae(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${n}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${n}, coords);
        }
        `}}});var ti,eh=C(()=>{"use strict";mr();ti=class r extends Rt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new X(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new X(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new X(`
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
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new X(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var ri,th=C(()=>{"use strict";mr();qe();ri=class extends Rt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ae(this.context.glContext.version);return{setFragColor:new X(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new X(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ni,rh=C(()=>{"use strict";mr();ni=class r extends Rt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let c=0;c<s;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${a+c}]), ${i[c]}.0) );
          `;let f=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
        }
        `;n[u]=new X(f)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let s=i.length,a=e-s,u=`bcastMatmulIndices_${t}`,l="";for(let c=0;c<s-2;++c)l+=`
          realIndices[${c}] = int( mod(float(bcastedIndices[${a+c}]), ${i[c]}.0) );
          `;let f=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${e-1}];
          realIndices[${s-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new X(f)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`indicesToOffset_${n}`;e[a]=new X(r.indexToOffsetSingle(a,s,i)),a=`indicesToOffset_${n}_T`,e[a]=new X(r.indexToOffsetSingle(a,s,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`offsetToIndices_${n}`;e[a]=new X(r.offsetToIndicesSingle(a,s,i)),a=`offsetToIndices_${n}_T`,e[a]=new X(r.offsetToIndicesSingle(a,s,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
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
        `;e[s]=new X(u)}),e}}});var oi,nh=C(()=>{"use strict";mr();oi=class extends Rt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<n;++l)a+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${s}(int src[${n}], out int dest[${n}]) {
          ${a}
        }
        `;o[s]=new X(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new X(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new X(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new X(o)}}}});var Ps,oh=C(()=>{"use strict";Qm();eh();th();rh();nh();Ps={encoding:ti,fragcolor:ri,vec:oi,shapeUtils:ni,coordinates:ei}});var ii,ih=C(()=>{"use strict";mr();Ym();oh();qe();ii=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Uo(e,n,t,o),Object.keys(Ps).forEach(s=>{let a=new Ps[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let f=s+"."+l,c;i[f]?(c=i[f],c.routineBody=u[l].routineBody):(c=new Fn(f,u[l].routineBody),i[f]=c);let p=u[l].dependencies;if(p)for(let b=0;b<p.length;++b)if(i[p[b]])c.addDependency(i[p[b]]);else{let g=new Fn(p[b]);i[p[b]]=g,c.addDependency(g)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Mf(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Zm(n),`${Nf(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Wo.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ai,ah=C(()=>{"use strict";mt();kt();ih();qe();ai=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(s){throw Ne.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ii(this.glContext,e,n,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){Ne.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=zf(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ce.debug&&Ne.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Ne.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let f=n.find(c=>c.name===s)?.data;if(a!=="sampler2D"&&!f)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,f):o.uniform1f(u,f);break;case"int":l?o.uniform1iv(u,f):o.uniform1i(u,f);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var si,sh=C(()=>{"use strict";kt();Nn();si=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let a=n.width,u=n.height,l,f;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,f=this.inUseTextures.get(l),f||(f=[],this.inUseTextures.set(l,f));let p=this.idleTextures.get(l);if(p&&p.length>0){let b=p.pop();return f.push(b),o===1&&this.glContext.updateTexture(b,a,u,s,this.toTextureData(e,t)),b}}Ne.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let c=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(f.push(c),this.textureLookup.set(c,l)),c}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,f)=>l*f)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),a=this.toTensorData(n,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||n)&&(Ne.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ui,uh=C(()=>{"use strict";kt();Tc();ed();Km();ah();As();sh();ui=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new Qo(e.glContext.maxTextureSize),this.programManager=new ai(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new si(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Go(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Ne.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=vc(e,n,jm);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function U_(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Un,lh=C(()=>{"use strict";mt();Nn();Nn();er();Un=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,n,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,n*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,s),l=u.allocate(n*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,n,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ce.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Fo(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new zn(this.gl,n):new zn(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Vo(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,s;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await Qa(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=U_(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await Qa(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Os(r){let e;if((!r||r==="webgl2")&&"webgl2"in vn?e=vn.webgl2:(!r||r==="webgl")&&"webgl"in vn&&(e=vn.webgl),!e)try{let t=H_();e=ch(t,r)}catch{let o=W_();e=ch(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return vn[r]=e,n.isContextLost()?(delete vn[r],Os(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function ch(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Un(t,2)}catch(i){Ne.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Un(t,1)}catch(i){Ne.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function W_(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function H_(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var vn,fh=C(()=>{"use strict";kt();lh();vn={}});var li,dh=C(()=>{"use strict";mt();kt();uh();fh();li=class{get contextId(){return ce.webgl.contextId}set contextId(e){ce.webgl.contextId=e}get matmulMaxBatchSize(){return ce.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ce.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ce.webgl.textureCacheMode}set textureCacheMode(e){ce.webgl.textureCacheMode=e}get pack(){return ce.webgl.pack}set pack(e){ce.webgl.pack=e}get async(){return ce.webgl.async}set async(e){ce.webgl.async=e}initialize(){try{return this.glContext=Os(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Ne.setWithEnv(ce),ce.webgl.context||Object.defineProperty(ce.webgl,"context",{value:this.glContext.gl}),Ne.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Ne.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ui(this,e)}dispose(){this.glContext.dispose()}}});async function Es(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=ph.get(n);if(t)return t;let o=await j_(n);if(o)return o}}else return Es(["webgl"]);throw new Error("no available backend to use")}async function j_(r){let e=q_;if(typeof e[r]<"u"&&K_(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return ph.set(r,n),n}}function K_(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var ph,q_,mh=C(()=>{"use strict";dh();ph=new Map,q_={webgl:new li}});var Cs,ci,hh=C(()=>{"use strict";kt();Cs=class{constructor(e,n){this.op=e;this.node=n}},ci=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Cs(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((f,c)=>{let p=o[c];this._values[p]=f});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let f=i[u++],c=this._ops[f],p=c.node.inputs.map(v=>this._values[v]);if(p.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${c.node}`);let b=p;Ne.verbose("ExecPlan",`Running op:${c.node.name} (${b.map((v,T)=>`'${c.node.inputs[T]}': ${v.type}[${v.dims.join(",")}]`).join(", ")})`);let g=await this.profiler.event("node",c.node.name,async()=>c.op.impl(t,b,c.op.context));if(g.length!==c.node.outputs.length)throw new Error("the size of output does not match model definition.");g.forEach((v,T)=>{let w=c.node.outputs[T];if(this._values[w])throw new Error(`output [${w}] already has value: op:${c.node.name}`);this._values[w]=v});let h=new Set;g.forEach((v,T)=>{let w=c.node.outputs[T];for(let _ of s[w].to){let $=a[_],P=!0;for(let E of $.inputs)if(!this._values[E]){P=!1;break}P&&h.add(_)}}),i.push(...h)}let l=[];for(let f=0;f<this.graph.getOutputIndices().length;f++){let c=this.graph.getOutputIndices()[f],p=this._values[c];if(p===void 0)throw new Error(`required output [${c}] does not have value`);c===0?await p.getData():p.data,l.push(p)}return Ne.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Pe,Mt,Wn,gh=C(()=>{"use strict";Cn();Pe=ln(pn());Wr();ze();Mt=ee.experimental.fbs,Wn=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof Pe.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Mt.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();switch(n){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Pe.onnx.AttributeProto.AttributeType.INT:return"int";case Pe.onnx.AttributeProto.AttributeType.STRING:return"string";case Pe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Pe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Pe.onnx.AttributeProto.AttributeType.INTS:return"ints";case Pe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Pe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Pe.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();if(n===Pe.onnx.AttributeProto.AttributeType.GRAPH||n===Pe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===Pe.onnx.AttributeProto.AttributeType.INT&&_t.isLong(t))return _t.longToNumber(t);if(n===Pe.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=_t.longToNumber(a)}return i}if(n===Pe.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Pe.onnx.AttributeProto?rt.fromProto(t):rt.fromOrtTensor(t);if(n===Pe.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Pe.onnx.AttributeProto)return t.map(i=>rt.fromProto(i));if(e instanceof Mt.Attribute)return t.map(i=>rt.fromOrtTensor(i))}return n===Pe.onnx.AttributeProto.AttributeType.STRING&&e instanceof Pe.onnx.AttributeProto?Rn(t):n===Pe.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Pe.onnx.AttributeProto?t.map(Rn):t}static getValueNoCheck(e){return e instanceof Pe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Pe.onnx.AttributeProto.AttributeType.INT:return e.i;case Pe.onnx.AttributeProto.AttributeType.STRING:return e.s;case Pe.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Pe.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Pe.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Pe.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Pe.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Pe.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Pe.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Pe.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Mt.AttributeType.FLOAT:return e.f();case Mt.AttributeType.INT:return e.i();case Mt.AttributeType.STRING:return e.s();case Mt.AttributeType.TENSOR:return e.t();case Mt.AttributeType.GRAPH:return e.g();case Mt.AttributeType.FLOATS:return e.floatsArray();case Mt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case Mt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case Mt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${Mt.AttributeType[e.type()]}`)}}}});var Ds,fi,Bs,nr,di,ks,bh=C(()=>{"use strict";gh();Cn();Ds=ln(pn());Wr();ze();fi=ee.experimental.fbs,Bs={from:(r,e)=>new ks(r,e)},nr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=dt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},di=class{constructor(e,n){e instanceof Ds.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Wn(e.attribute)):e instanceof fi.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Wn(dt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ks=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Ds.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof fi.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new nr(i))-1;n.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=n.get(i.name);if(s===void 0){let a=new nr;a.type={shape:{dims:dt.tensorDimsFromProto(i.dims)},tensorType:dt.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,n.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=rt.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new nr(i))-1;n.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new di(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new nr)-1,n.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=rt.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(n.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new nr;if(e.nodeArgs(a)?.type()?.valueType()!==fi.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let f=e.nodeArgs(a).type().value(new fi.TensorTypeAndShape),c=dt.tensorDataTypeFromProto(f.elemType()),p=f.shape(),b=[];for(let h=0;h<p.dimLength();h++)b.push(_t.longToNumber(p.dim(h).value().dimValue()));u.type={shape:{dims:b},tensorType:c};let g=this._allData.push(u)-1;n.set(s,g),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=n.get(s.name());if(a===void 0){let u=new nr,l=dt.tensorDimsFromORTFormat(s),f=dt.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:f},a=this._allData.push(u)-1,n.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=rt.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(n.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new nr)-1;n.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new di(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),f=n.get(l);if(typeof f>"u"&&(f=this._allData.push(new nr)-1,n.set(l,f)),s.outputs.push(f),this._allData[f]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${f}`);if(this._allData[f]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[f]._from=-1,this._allData[f].tensor=rt.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),f=n.get(l);if(typeof f>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(f),this._allData[f]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&n.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=n[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let a=1;a<n.outputs.length;a++)if(this._allData[n.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let a=0;a<n.inputs.length;a++){let u=this._allData[n.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Gr,Ur])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var yh,X_,pi,xh=C(()=>{"use strict";Do();bh();Cn();yh=ln(pn());ze();X_=ee.experimental.fbs,pi=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=yh.onnx.ModelProto.decode(e);if(_t.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:_t.longToNumber(i.version)})),this._graph=Bs.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new D.ByteBuffer(e),o=X_.InferenceSession.getRootAsInferenceSession(t).model();if(_t.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:_t.longToNumber(a.version())})}this._graph=Bs.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var mi,wh=C(()=>{"use strict";mh();hh();kt();xh();mi=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Co.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Es(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new pi,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ci(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let s=e.get(n[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],s=n[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var hi,vh=C(()=>{"use strict";mt();Wr();hi=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new rt(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new nt(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Th={};un(Th,{onnxjsBackend:()=>Z_});var Ls,Z_,_h=C(()=>{"use strict";wh();vh();Ls=class{async init(){}async createInferenceSessionHandler(e,n){let t=new mi(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new hi(t)}},Z_=new Ls});var gi=C(()=>{"use strict"});var $h={};un($h,{default:()=>Y_});var Ih,Sh,Y_,Ah=C(()=>{"use strict";Rs();Pr();Hn();Ih="ort-wasm-proxy-worker",Sh=globalThis.self?.name===Ih;Sh&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":bi(n.wasm).then(()=>{yi(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;xi(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=qn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;wi(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":vi(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;Ti(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Ii([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":_i(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});Y_=Sh?null:r=>new Worker(r??Tn,{type:"module",name:Ih})});var Oh={};un(Oh,{default:()=>J_});var zs,Ph,J_,Eh=C(()=>{"use strict";Ph=(zs=import.meta.url,async function(r={}){function e(){return ve.buffer!=Ie.buffer&&Ze(),Ie}function n(){return ve.buffer!=Ie.buffer&&Ze(),te}function t(){return ve.buffer!=Ie.buffer&&Ze(),we}function o(){return ve.buffer!=Ie.buffer&&Ze(),pe}function i(){return ve.buffer!=Ie.buffer&&Ze(),me}function s(){return ve.buffer!=Ie.buffer&&Ze(),he}function a(){return ve.buffer!=Ie.buffer&&Ze(),U}function u(){return ve.buffer!=Ie.buffer&&Ze(),yt}var l,f,c=Object.assign({},r),p=new Promise((d,m)=>{l=d,f=m}),b=typeof window=="object",g=typeof importScripts=="function",h=g&&self.name=="em-pthread";c.mountExternalData=(d,m)=>{d.startsWith("./")&&(d=d.substring(2)),(c.Fb||(c.Fb=new Map)).set(d,m)},c.unmountExternalData=()=>{delete c.Fb};var v=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let T=()=>{let d=(y,x,I)=>(...O)=>{let z=Yt,M=x?.();O=y(...O);let K=x?.();return M!==K&&(y=K,I(M),x=I=null),Yt!=z?new Promise((Z,ie)=>{ya={resolve:Z,reject:ie}}):O},m=y=>async(...x)=>{try{if(c.Eb)throw Error("Session already started");let I=c.Eb={fc:x[0],errors:[]},O=await y(...x);if(c.Eb!==I)throw Error("Session mismatch");c.Gb?.flush();let z=I.errors;if(0<z.length){let M=await Promise.all(z);if(M=M.filter(K=>K),0<M.length)throw Error(M.join(`
`))}return O}finally{c.Eb=null}};c._OrtCreateSession=d(c._OrtCreateSession,()=>c._OrtCreateSession,y=>c._OrtCreateSession=y),c._OrtRun=m(d(c._OrtRun,()=>c._OrtRun,y=>c._OrtRun=y)),c._OrtRunWithBinding=m(d(c._OrtRunWithBinding,()=>c._OrtRunWithBinding,y=>c._OrtRunWithBinding=y)),c._OrtBindInput=d(c._OrtBindInput,()=>c._OrtBindInput,y=>c._OrtBindInput=y),T=void 0};c.jsepInit=(d,m)=>{if(T?.(),d==="webgpu"){[c.Gb,c.Ub,c.Yb,c.Nb,c.Xb,c.jb,c.Zb,c.bc,c.Vb,c.Wb,c.$b]=m;let y=c.Gb;c.jsepRegisterBuffer=(x,I,O,z)=>y.registerBuffer(x,I,O,z),c.jsepGetBuffer=x=>y.getBuffer(x),c.jsepCreateDownloader=(x,I,O)=>y.createDownloader(x,I,O),c.jsepOnReleaseSession=x=>{y.onReleaseSession(x)},c.jsepOnRunStart=x=>y.onRunStart(x),c.cc=(x,I)=>{y.upload(x,I)}}else if(d==="webnn"){[c.Gb,c.ac,c.Ob,c.jsepEnsureTensor,c.dc,c.jsepDownloadTensor]=m,c.jsepReleaseTensorId=c.Ob;let y=c.Gb;c.jsepOnRunStart=x=>y.onRunStart(x),c.jsepRegisterMLContext=(x,I)=>{y.registerMLContext(x,I)},c.jsepOnReleaseSession=x=>{y.onReleaseSession(x)},c.jsepCreateMLTensorDownloader=(x,I)=>y.createMLTensorDownloader(x,I),c.jsepRegisterMLTensor=(x,I,O)=>y.registerMLTensor(x,I,O)}};var w,_,$=Object.assign({},c),P="./this.program",E=(d,m)=>{throw m},B="";(b||g)&&(g?B=self.location.href:typeof document<"u"&&document.currentScript&&(B=document.currentScript.src),zs&&(B=zs),B=B.startsWith("blob:")?"":B.substr(0,B.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(_=d=>{var m=new XMLHttpRequest;return m.open("GET",d,!1),m.responseType="arraybuffer",m.send(null),new Uint8Array(m.response)}),w=(d,m,y)=>{var x=new XMLHttpRequest;x.open("GET",d,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?m(x.response):y()},x.onerror=y,x.send(null)});var N,H=console.log.bind(console),q=console.error.bind(console),V=H,se=q;if(Object.assign(c,$),$=null,h){let d=function(m){try{var y=m.data,x=y.cmd;if(x==="load"){let I=[];self.onmessage=O=>I.push(O),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let O of I)d(O);self.onmessage=d};for(let O of y.handlers)c[O]&&!c[O].proxy||(c[O]=(...z)=>{postMessage({Mb:"callHandler",oc:O,args:z})},O=="print"&&(V=c[O]),O=="printErr"&&(se=c[O]));ve=y.wasmMemory,Ze(),fe(y.wasmModule)}else if(x==="run"){Ta(y.pthread_ptr,0,0,1,0,0),ha(y.pthread_ptr),r0(),Du(),ye||(El(),ye=!0);try{n0(y.start_routine,y.arg)}catch(I){if(I!="unwind")throw I}}else x==="cancel"?sn()&&go(-1):y.target!=="setimmediate"&&(x==="checkMailbox"?ye&&ao():x&&(se(`worker: received unknown command ${x}`),se(y)))}catch(I){throw Cl(),I}};var mS=d,fe,ye=!1;se=function(...m){m=m.join(" "),console.error(m)},self.alert=function(...m){postMessage({Mb:"alert",text:m.join(" "),qc:sn()})},c.instantiateWasm=(m,y)=>new Promise(x=>{fe=I=>{I=new WebAssembly.Instance(I,Pu()),y(I),x()}}),self.onunhandledrejection=m=>{throw m.reason||m},self.onmessage=d}c.wasmBinary&&(N=c.wasmBinary);var ve,oe,Te,Ie,te,we,pe,me,he,U,Y,Be,yt,We=!1;function Ze(){var d=ve.buffer;c.HEAP8=Ie=new Int8Array(d),c.HEAP16=we=new Int16Array(d),c.HEAPU8=te=new Uint8Array(d),c.HEAPU16=pe=new Uint16Array(d),c.HEAP32=me=new Int32Array(d),c.HEAPU32=he=new Uint32Array(d),c.HEAPF32=U=new Float32Array(d),c.HEAPF64=yt=new Float64Array(d),c.HEAP64=Y=new BigInt64Array(d),c.HEAPU64=Be=new BigUint64Array(d)}if(!h){if(!((ve=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof v))throw se("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Ze()}var Er=[],et=[],pt=[],xt=0,tn=null,Cr=null;function _u(){if(--xt==0&&(tn!==null&&(clearInterval(tn),tn=null),Cr)){var d=Cr;Cr=null,d()}}function rn(d){throw se(d="Aborted("+d+")"),We=!0,Te=1,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),f(d),d}var na,Iu=d=>d.startsWith("data:application/octet-stream;base64,"),Su=d=>d.startsWith("file://");function $u(d){if(d==na&&N)return new Uint8Array(N);if(_)return _(d);throw"both async and sync fetching of the wasm failed"}function Au(d,m,y){return function(x){if(!N&&(b||g)){if(typeof fetch=="function"&&!Su(x))return fetch(x,{credentials:"same-origin"}).then(I=>{if(!I.ok)throw`failed to load wasm binary file at '${x}'`;return I.arrayBuffer()}).catch(()=>$u(x));if(w)return new Promise((I,O)=>{w(x,z=>I(new Uint8Array(z)),O)})}return Promise.resolve().then(()=>$u(x))}(d).then(x=>WebAssembly.instantiate(x,m)).then(y,x=>{se(`failed to asynchronously prepare wasm: ${x}`),rn(x)})}function Pu(){return{a:{O:t0,Aa:e0,b:i0,aa:zu,B:Fu,qa:Vu,Y:Uu,_:Wu,ra:Hu,oa:qu,ha:ju,na:Ku,L:Xu,Z:Zu,W:Yu,pa:Ju,X:Qu,wa:a0,F:u0,Q:l0,P:f0,E:p0,u:m0,q:h0,G:g0,A:_0,R:I0,ua:S0,ka:$0,U:A0,ba:P0,H:O0,ja:ha,ta:E0,t:C0,x:B0,o:L0,l:z0,c:pa,n:N0,j:V0,w:G0,p:U0,g:W0,s:H0,m:q0,e:j0,k:K0,i:X0,h:Z0,d:Y0,ea:J0,fa:Q0,ga:ew,ca:pl,da:ml,T:tw,f:rw,D:nw,I:ow,M:iw,y:aw,sa:sw,V:uw,v:gl,z:lw,N:cw,S:fw,za:dw,ya:pw,la:xl,ma:wl,$:ua,C:vl,K:Tl,ia:_l,J:Il,a:ve,xa:sa,va:Al,r:gw}}}var oa={868340:(d,m,y,x,I)=>{if(c===void 0||!c.Fb)return 1;if((d=st(d>>>0)).startsWith("./")&&(d=d.substring(2)),!(d=c.Fb.get(d)))return 2;if(x>>>=0,(m>>>=0)+(y>>>=0)>d.byteLength)return 3;try{let O=d.subarray(m,m+y);switch(I){case 0:n().set(O,x>>>0);break;case 1:c.cc(x,O);break;default:return 4}return 0}catch{return 4}},869023:(d,m,y)=>{c.dc(d,n().subarray(m>>>0,m+y>>>0))},869086:()=>c.ac(),869127:d=>{c.Ob(d)},869163:()=>{c.Vb()},869194:()=>{c.Wb()},869223:()=>{c.$b()},869248:d=>c.Ub(d),869281:d=>c.Yb(d),869313:(d,m,y)=>{c.Nb(d,m,y,!0)},869352:(d,m,y)=>{c.Nb(d,m,y)},869385:()=>typeof wasmOffsetConverter<"u",869442:d=>{c.jb("Abs",d,void 0)},869493:d=>{c.jb("Neg",d,void 0)},869544:d=>{c.jb("Floor",d,void 0)},869597:d=>{c.jb("Ceil",d,void 0)},869649:d=>{c.jb("Reciprocal",d,void 0)},869707:d=>{c.jb("Sqrt",d,void 0)},869759:d=>{c.jb("Exp",d,void 0)},869810:d=>{c.jb("Erf",d,void 0)},869861:d=>{c.jb("Sigmoid",d,void 0)},869916:(d,m,y)=>{c.jb("HardSigmoid",d,{alpha:m,beta:y})},869995:d=>{c.jb("Log",d,void 0)},870046:d=>{c.jb("Sin",d,void 0)},870097:d=>{c.jb("Cos",d,void 0)},870148:d=>{c.jb("Tan",d,void 0)},870199:d=>{c.jb("Asin",d,void 0)},870251:d=>{c.jb("Acos",d,void 0)},870303:d=>{c.jb("Atan",d,void 0)},870355:d=>{c.jb("Sinh",d,void 0)},870407:d=>{c.jb("Cosh",d,void 0)},870459:d=>{c.jb("Asinh",d,void 0)},870512:d=>{c.jb("Acosh",d,void 0)},870565:d=>{c.jb("Atanh",d,void 0)},870618:d=>{c.jb("Tanh",d,void 0)},870670:d=>{c.jb("Not",d,void 0)},870721:(d,m,y)=>{c.jb("Clip",d,{min:m,max:y})},870790:d=>{c.jb("Clip",d,void 0)},870842:(d,m)=>{c.jb("Elu",d,{alpha:m})},870900:d=>{c.jb("Gelu",d,void 0)},870952:d=>{c.jb("Relu",d,void 0)},871004:(d,m)=>{c.jb("LeakyRelu",d,{alpha:m})},871068:(d,m)=>{c.jb("ThresholdedRelu",d,{alpha:m})},871138:(d,m)=>{c.jb("Cast",d,{to:m})},871196:d=>{c.jb("Add",d,void 0)},871247:d=>{c.jb("Sub",d,void 0)},871298:d=>{c.jb("Mul",d,void 0)},871349:d=>{c.jb("Div",d,void 0)},871400:d=>{c.jb("Pow",d,void 0)},871451:d=>{c.jb("Equal",d,void 0)},871504:d=>{c.jb("Greater",d,void 0)},871559:d=>{c.jb("GreaterOrEqual",d,void 0)},871621:d=>{c.jb("Less",d,void 0)},871673:d=>{c.jb("LessOrEqual",d,void 0)},871732:(d,m,y,x,I)=>{c.jb("ReduceMean",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},871891:(d,m,y,x,I)=>{c.jb("ReduceMax",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872049:(d,m,y,x,I)=>{c.jb("ReduceMin",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872207:(d,m,y,x,I)=>{c.jb("ReduceProd",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872366:(d,m,y,x,I)=>{c.jb("ReduceSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872524:(d,m,y,x,I)=>{c.jb("ReduceL1",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872681:(d,m,y,x,I)=>{c.jb("ReduceL2",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872838:(d,m,y,x,I)=>{c.jb("ReduceLogSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},872999:(d,m,y,x,I)=>{c.jb("ReduceSumSquare",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},873163:(d,m,y,x,I)=>{c.jb("ReduceLogSumExp",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},873327:d=>{c.jb("Where",d,void 0)},873380:(d,m,y)=>{c.jb("Transpose",d,{perm:m?Array.from(i().subarray(m>>>0,y>>>0)):[]})},873488:(d,m,y,x)=>{c.jb("DepthToSpace",d,{blocksize:m,mode:st(y),format:x?"NHWC":"NCHW"})},873621:(d,m,y,x)=>{c.jb("DepthToSpace",d,{blocksize:m,mode:st(y),format:x?"NHWC":"NCHW"})},873754:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R,Se)=>{c.jb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[I],pads:[O,z],strides:[M],wIsConst:()=>!!e()[Z>>>0],outputPadding:ie?Array.from(i().subarray(ie>>>0,Ae>>>0)):[],outputShape:Le?Array.from(i().subarray(Le>>>0,R>>>0)):[],activation:st(Se)})},874155:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("ConvTranspose",d,{format:M?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(y>>>0,2+(y>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(i().subarray(O>>>0,4+(O>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],outputShape:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[],activation:st(R)})},874720:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R,Se)=>{c.jb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[I],pads:[O,z],strides:[M],wIsConst:()=>!!e()[Z>>>0],outputPadding:ie?Array.from(i().subarray(ie>>>0,Ae>>>0)):[],outputShape:Le?Array.from(i().subarray(Le>>>0,R>>>0)):[],activation:st(Se)})},875121:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("ConvTranspose",d,{format:M?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(y>>>0,2+(y>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(i().subarray(O>>>0,4+(O>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],outputShape:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[],activation:st(R)})},875686:(d,m)=>{c.jb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},875777:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("AveragePool",d,{format:R?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:M?Array.from(i().subarray(M>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],strides:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[]})},876192:(d,m)=>{c.jb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},876283:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("AveragePool",d,{format:R?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:M?Array.from(i().subarray(M>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],strides:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[]})},876698:(d,m)=>{c.jb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},876785:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("MaxPool",d,{format:R?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:M?Array.from(i().subarray(M>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],strides:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[]})},877196:(d,m)=>{c.jb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},877283:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R)=>{c.jb("MaxPool",d,{format:R?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:M?Array.from(i().subarray(M>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],strides:Ae?Array.from(i().subarray(Ae>>>0,Le>>>0)):[]})},877694:(d,m,y,x,I)=>{c.jb("Gemm",d,{alpha:m,beta:y,transA:x,transB:I})},877798:d=>{c.jb("MatMul",d,void 0)},877852:(d,m,y,x)=>{c.jb("ArgMax",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},877960:(d,m,y,x)=>{c.jb("ArgMin",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},878068:(d,m)=>{c.jb("Softmax",d,{axis:m})},878131:(d,m)=>{c.jb("Concat",d,{axis:m})},878191:(d,m,y,x,I)=>{c.jb("Split",d,{axis:m,numOutputs:y,splitSizes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},878331:d=>{c.jb("Expand",d,void 0)},878385:(d,m)=>{c.jb("Gather",d,{axis:Number(m)})},878456:(d,m)=>{c.jb("GatherElements",d,{axis:Number(m)})},878535:(d,m,y,x,I,O,z,M,K,Z,ie)=>{c.jb("Resize",d,{antialias:m,axes:y?Array.from(i().subarray(y>>>0,x>>>0)):[],coordinateTransformMode:st(I),cubicCoeffA:O,excludeOutside:z,extrapolationValue:M,keepAspectRatioPolicy:st(K),mode:st(Z),nearestMode:st(ie)})},878881:(d,m,y,x,I,O,z)=>{c.jb("Slice",d,{starts:m?Array.from(i().subarray(m>>>0,y>>>0)):[],ends:x?Array.from(i().subarray(x>>>0,I>>>0)):[],axes:O?Array.from(i().subarray(O>>>0,z>>>0)):[]})},879097:d=>{c.jb("Tile",d,void 0)},879149:(d,m,y)=>{c.jb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},879263:(d,m,y)=>{c.jb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},879377:d=>{c.jb("Range",d,void 0)},879430:(d,m)=>{c.jb("Einsum",d,{equation:st(m)})},879511:(d,m,y,x,I)=>{c.jb("Pad",d,{mode:m,value:y,pads:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},879638:(d,m,y,x,I,O)=>{c.jb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!I,trainingMode:!!x,format:O?"NHWC":"NCHW"})},879807:(d,m,y,x,I,O)=>{c.jb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!I,trainingMode:!!x,format:O?"NHWC":"NCHW"})},879976:(d,m,y)=>{c.jb("CumSum",d,{exclusive:Number(m),reverse:Number(y)})},880073:(d,m,y)=>{c.jb("DequantizeLinear",d,{axis:m,blockSize:y})},880163:(d,m,y,x,I,O,z,M,K)=>{c.jb("Attention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:I,doRotary:O,qkvHiddenSizes:z?Array.from(i().subarray(Number(M)>>>0,Number(M)+z>>>0)):[],pastPresentShareBuffer:!!K})},880435:d=>{c.jb("BiasAdd",d,void 0)},880490:d=>{c.jb("BiasSplitGelu",d,void 0)},880551:d=>{c.jb("FastGelu",d,void 0)},880607:(d,m,y,x,I,O,z,M,K,Z,ie,Ae,Le,R,Se,je)=>{c.jb("Conv",d,{format:Ae?"NHWC":"NCHW",auto_pad:m,dilations:y?Array.from(i().subarray(y>>>0,x>>>0)):[],group:I,kernel_shape:O?Array.from(i().subarray(O>>>0,z>>>0)):[],pads:M?Array.from(i().subarray(M>>>0,K>>>0)):[],strides:Z?Array.from(i().subarray(Z>>>0,ie>>>0)):[],w_is_const:()=>!!e()[Le>>>0],activation:st(R),activation_params:Se?Array.from(a().subarray(Se>>>0,je>>>0)):[]})},881103:d=>{c.jb("Gelu",d,void 0)},881155:(d,m,y,x)=>{c.jb("GroupQueryAttention",d,{numHeads:m,kvNumHeads:y,scale:x})},881268:(d,m,y,x)=>{c.jb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},881379:(d,m,y,x)=>{c.jb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},881490:(d,m,y,x,I,O)=>{c.jb("MatMulNBits",d,{k:m,n:y,accuracyLevel:x,bits:I,blockSize:O})},881617:(d,m,y,x,I,O)=>{c.jb("MultiHeadAttention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:I,doRotary:O})},881776:(d,m)=>{c.jb("QuickGelu",d,{alpha:m})},881840:(d,m,y,x,I)=>{c.jb("RotaryEmbedding",d,{interleaved:!!m,numHeads:y,rotaryEmbeddingDim:x,scale:I})},881979:(d,m,y)=>{c.jb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},882081:(d,m,y)=>{c.jb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},882183:(d,m,y,x)=>{c.jb("GatherBlockQuantized",d,{gatherAxis:m,quantizeAxis:y,blockSize:x})},882304:d=>{c.Zb(d)},882338:(d,m)=>c.bc(d,m,c.Eb.fc,c.Eb.errors)};function e0(d,m,y){return ul(async()=>{await c.Xb(d,m,y)})}function t0(){return typeof wasmOffsetConverter<"u"}function ia(d){this.name="ExitStatus",this.message=`Program terminated with exit(${d})`,this.status=d}var aa=d=>{d.terminate(),d.onmessage=()=>{}},Ou=d=>{br.length==0&&(Lu(),Bu(br[0]));var m=br.pop();if(!m)return 6;Dr.push(m),Xt[d.Ab]=m,m.Ab=d.Ab;var y={cmd:"run",start_routine:d.hc,arg:d.Qb,pthread_ptr:d.Ab};return m.postMessage(y,d.mc),0},kr=0,He=(d,m,...y)=>{for(var x=2*y.length,I=Sa(),O=Ia(8*x),z=O>>>3,M=0;M<y.length;M++){var K=y[M];typeof K=="bigint"?(Y[z+2*M]=1n,Y[z+2*M+1]=K):(Y[z+2*M]=0n,u()[z+2*M+1>>>0]=K)}return d=kl(d,0,x,O,m),bo(I),d};function sa(d){if(h)return He(0,1,d);if(Te=d,!(0<kr)){for(var m of Dr)aa(m);for(m of br)aa(m);br=[],Dr=[],Xt=[],We=!0}E(d,new ia(d))}function Eu(d){if(h)return He(1,0,d);ua(d)}var ua=d=>{if(Te=d,h)throw Eu(d),"unwind";sa(d)},br=[],Dr=[],Cu=[],Xt={},ku=d=>{var m=d.Ab;delete Xt[m],br.push(d),Dr.splice(Dr.indexOf(d),1),d.Ab=0,_a(m)};function Du(){Cu.forEach(d=>d())}var Bu=d=>new Promise(m=>{d.onmessage=I=>{var O=(I=I.data).cmd;if(I.targetThread&&I.targetThread!=sn()){var z=Xt[I.targetThread];z?z.postMessage(I,I.transferList):se(`Internal error! Worker sent a message "${O}" to target pthread ${I.targetThread}, but that thread no longer exists!`)}else O==="checkMailbox"?ao():O==="spawnThread"?Ou(I):O==="cleanupThread"?ku(Xt[I.thread]):O==="killThread"?(I=I.thread,O=Xt[I],delete Xt[I],aa(O),_a(I),Dr.splice(Dr.indexOf(O),1),O.Ab=0):O==="cancelThread"?Xt[I.thread].postMessage({cmd:"cancel"}):O==="loaded"?(d.loaded=!0,m(d)):O==="alert"?alert(`Thread ${I.threadId}: ${I.text}`):I.target==="setimmediate"?d.postMessage(I):O==="callHandler"?c[I.handler](...I.args):O&&se(`worker sent an unknown command ${O}`)},d.onerror=I=>{throw se(`worker sent an error! ${I.filename}:${I.lineno}: ${I.message}`),I};var y,x=[];for(y of[])c.hasOwnProperty(y)&&x.push(y);d.postMessage({cmd:"load",handlers:x,wasmMemory:ve,wasmModule:oe})});function Lu(){var d=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});br.push(d)}var io=d=>{for(;0<d.length;)d.shift()(c)},r0=()=>{var d=sn(),m=s()[d+52>>>2>>>0];d=s()[d+56>>>2>>>0],Bl(m,m-d),bo(m)},n0=(d,m)=>{kr=0,d=Ll(d,m),0<kr?Te=d:go(d)};class o0{constructor(m){this.Jb=m-24}}function i0(d,m,y){var x=new o0(d>>>=0);throw m>>>=0,y>>>=0,s()[x.Jb+16>>>2>>>0]=0,s()[x.Jb+4>>>2>>>0]=m,s()[x.Jb+8>>>2>>>0]=y,d}function Ru(d,m,y,x){return h?He(2,1,d,m,y,x):zu(d,m,y,x)}function zu(d,m,y,x){if(d>>>=0,m>>>=0,y>>>=0,x>>>=0,v===void 0)return se("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var I=[];return h&&I.length===0?Ru(d,m,y,x):(d={hc:y,Ab:d,Qb:x,mc:I},h?(d.Mb="spawnThread",postMessage(d,I),0):Ou(d))}var Nu=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Mu=(d,m,y)=>{var x=(m>>>=0)+y;for(y=m;d[y]&&!(y>=x);)++y;if(16<y-m&&d.buffer&&Nu)return Nu.decode(d.buffer instanceof v?d.slice(m,y):d.subarray(m,y));for(x="";m<y;){var I=d[m++];if(128&I){var O=63&d[m++];if((224&I)==192)x+=String.fromCharCode((31&I)<<6|O);else{var z=63&d[m++];65536>(I=(240&I)==224?(15&I)<<12|O<<6|z:(7&I)<<18|O<<12|z<<6|63&d[m++])?x+=String.fromCharCode(I):(I-=65536,x+=String.fromCharCode(55296|I>>10,56320|1023&I))}}else x+=String.fromCharCode(I)}return x},st=(d,m)=>(d>>>=0)?Mu(n(),d,m):"";function Fu(d,m,y){return h?He(3,1,d,m,y):0}function Vu(d,m){if(h)return He(4,1,d,m)}var la=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);127>=x?m++:2047>=x?m+=2:55296<=x&&57343>=x?(m+=4,++y):m+=3}return m},Gu=(d,m,y,x)=>{if(!(0<x))return 0;var I=y>>>=0;x=y+x-1;for(var O=0;O<d.length;++O){var z=d.charCodeAt(O);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&d.charCodeAt(++O)),127>=z){if(y>=x)break;m[y++>>>0]=z}else{if(2047>=z){if(y+1>=x)break;m[y++>>>0]=192|z>>6}else{if(65535>=z){if(y+2>=x)break;m[y++>>>0]=224|z>>12}else{if(y+3>=x)break;m[y++>>>0]=240|z>>18,m[y++>>>0]=128|z>>12&63}m[y++>>>0]=128|z>>6&63}m[y++>>>0]=128|63&z}}return m[y>>>0]=0,y-I},nn=(d,m,y)=>Gu(d,n(),m,y);function Uu(d,m){if(h)return He(5,1,d,m)}function Wu(d,m,y){if(h)return He(6,1,d,m,y)}function Hu(d,m,y){return h?He(7,1,d,m,y):0}function qu(d,m){if(h)return He(8,1,d,m)}function ju(d,m,y){if(h)return He(9,1,d,m,y)}function Ku(d,m,y,x){if(h)return He(10,1,d,m,y,x)}function Xu(d,m,y,x){if(h)return He(11,1,d,m,y,x)}function Zu(d,m,y,x){if(h)return He(12,1,d,m,y,x)}function Yu(d){if(h)return He(13,1,d)}function Ju(d,m){if(h)return He(14,1,d,m)}function Qu(d,m,y){if(h)return He(15,1,d,m,y)}var el,yr,a0=()=>{rn("")},Zt=d=>{for(var m="";n()[d>>>0];)m+=el[n()[d++>>>0]];return m},ca={},fa={},s0={};function cr(d,m,y={}){if(!("argPackAdvance"in m))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(x,I,O={}){var z=I.name;if(!x)throw new yr(`type "${z}" must have a positive integer typeid pointer`);if(fa.hasOwnProperty(x)){if(O.Sb)return;throw new yr(`Cannot register type '${z}' twice`)}fa[x]=I,delete s0[x],ca.hasOwnProperty(x)&&(I=ca[x],delete ca[x],I.forEach(M=>M()))}(d,m,y)}var tl=(d,m,y)=>{switch(m){case 1:return y?x=>e()[x>>>0]:x=>n()[x>>>0];case 2:return y?x=>t()[x>>>1>>>0]:x=>o()[x>>>1>>>0];case 4:return y?x=>i()[x>>>2>>>0]:x=>s()[x>>>2>>>0];case 8:return y?x=>Y[x>>>3]:x=>Be[x>>>3];default:throw new TypeError(`invalid integer width (${m}): ${d}`)}};function u0(d,m,y){y>>>=0,cr(d>>>=0,{name:m=Zt(m>>>0),fromWireType:x=>x,toWireType:function(x,I){if(typeof I!="bigint"&&typeof I!="number")throw I=I===null?"null":(x=typeof I)=="object"||x==="array"||x==="function"?I.toString():""+I,new TypeError(`Cannot convert "${I}" to ${this.name}`);return typeof I=="number"&&(I=BigInt(I)),I},argPackAdvance:xr,readValueFromPointer:tl(m,y,m.indexOf("u")==-1),Db:null})}var xr=8;function l0(d,m,y,x){cr(d>>>=0,{name:m=Zt(m>>>0),fromWireType:function(I){return!!I},toWireType:function(I,O){return O?y:x},argPackAdvance:xr,readValueFromPointer:function(I){return this.fromWireType(n()[I>>>0])},Db:null})}var da=[],fr=[];function pa(d){9<(d>>>=0)&&--fr[d+1]==0&&(fr[d]=void 0,da.push(d))}var Et=d=>{if(!d)throw new yr("Cannot use deleted val. handle = "+d);return fr[d]},Ct=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let m=da.pop()||fr.length;return fr[m]=d,fr[m+1]=1,m}};function ma(d){return this.fromWireType(s()[d>>>2>>>0])}var c0={name:"emscripten::val",fromWireType:d=>{var m=Et(d);return pa(d),m},toWireType:(d,m)=>Ct(m),argPackAdvance:xr,readValueFromPointer:ma,Db:null};function f0(d){return cr(d>>>0,c0)}var d0=(d,m)=>{switch(m){case 4:return function(y){return this.fromWireType(a()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(u()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${m}): ${d}`)}};function p0(d,m,y){y>>>=0,cr(d>>>=0,{name:m=Zt(m>>>0),fromWireType:x=>x,toWireType:(x,I)=>I,argPackAdvance:xr,readValueFromPointer:d0(m,y),Db:null})}function m0(d,m,y,x,I){if(d>>>=0,y>>>=0,m=Zt(m>>>0),I===-1&&(I=4294967295),I=M=>M,x===0){var O=32-8*y;I=M=>M<<O>>>O}var z=m.includes("unsigned")?function(M,K){return K>>>0}:function(M,K){return K};cr(d,{name:m,fromWireType:I,toWireType:z,argPackAdvance:xr,readValueFromPointer:tl(m,y,x!==0),Db:null})}function h0(d,m,y){function x(O){var z=s()[O>>>2>>>0];return O=s()[O+4>>>2>>>0],new I(e().buffer,O,z)}var I=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][m];cr(d>>>=0,{name:y=Zt(y>>>0),fromWireType:x,argPackAdvance:xr,readValueFromPointer:x},{Sb:!0})}function g0(d,m){d>>>=0;var y=(m=Zt(m>>>0))==="std::string";cr(d,{name:m,fromWireType:function(x){var I=s()[x>>>2>>>0],O=x+4;if(y)for(var z=O,M=0;M<=I;++M){var K=O+M;if(M==I||n()[K>>>0]==0){if(z=st(z,K-z),Z===void 0)var Z=z;else Z+=String.fromCharCode(0),Z+=z;z=K+1}}else{for(Z=Array(I),M=0;M<I;++M)Z[M]=String.fromCharCode(n()[O+M>>>0]);Z=Z.join("")}return Jt(x),Z},toWireType:function(x,I){I instanceof ArrayBuffer&&(I=new Uint8Array(I));var O=typeof I=="string";if(!(O||I instanceof Uint8Array||I instanceof Uint8ClampedArray||I instanceof Int8Array))throw new yr("Cannot pass non-string to std::string");var z=y&&O?la(I):I.length,M=ho(4+z+1),K=M+4;if(s()[M>>>2>>>0]=z,y&&O)nn(I,K,z+1);else if(O)for(O=0;O<z;++O){var Z=I.charCodeAt(O);if(255<Z)throw Jt(K),new yr("String has UTF-16 code units that do not fit in 8 bits");n()[K+O>>>0]=Z}else for(O=0;O<z;++O)n()[K+O>>>0]=I[O];return x!==null&&x.push(Jt,M),M},argPackAdvance:xr,readValueFromPointer:ma,Db(x){Jt(x)}})}var rl=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,b0=(d,m)=>{for(var y=d>>1,x=y+m/2;!(y>=x)&&o()[y>>>0];)++y;if(32<(y<<=1)-d&&rl)return rl.decode(n().slice(d,y));for(y="",x=0;!(x>=m/2);++x){var I=t()[d+2*x>>>1>>>0];if(I==0)break;y+=String.fromCharCode(I)}return y},y0=(d,m,y)=>{if(y??=2147483647,2>y)return 0;var x=m;y=(y-=2)<2*d.length?y/2:d.length;for(var I=0;I<y;++I){var O=d.charCodeAt(I);t()[m>>>1>>>0]=O,m+=2}return t()[m>>>1>>>0]=0,m-x},x0=d=>2*d.length,w0=(d,m)=>{for(var y=0,x="";!(y>=m/4);){var I=i()[d+4*y>>>2>>>0];if(I==0)break;++y,65536<=I?(I-=65536,x+=String.fromCharCode(55296|I>>10,56320|1023&I)):x+=String.fromCharCode(I)}return x},v0=(d,m,y)=>{if(m>>>=0,y??=2147483647,4>y)return 0;var x=m;y=x+y-4;for(var I=0;I<d.length;++I){var O=d.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&d.charCodeAt(++I)),i()[m>>>2>>>0]=O,(m+=4)+4>y)break}return i()[m>>>2>>>0]=0,m-x},T0=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);55296<=x&&57343>=x&&++y,m+=4}return m};function _0(d,m,y){if(d>>>=0,m>>>=0,y=Zt(y>>>=0),m===2)var x=b0,I=y0,O=x0,z=M=>o()[M>>>1>>>0];else m===4&&(x=w0,I=v0,O=T0,z=M=>s()[M>>>2>>>0]);cr(d,{name:y,fromWireType:M=>{for(var K,Z=s()[M>>>2>>>0],ie=M+4,Ae=0;Ae<=Z;++Ae){var Le=M+4+Ae*m;Ae!=Z&&z(Le)!=0||(ie=x(ie,Le-ie),K===void 0?K=ie:(K+=String.fromCharCode(0),K+=ie),ie=Le+m)}return Jt(M),K},toWireType:(M,K)=>{if(typeof K!="string")throw new yr(`Cannot pass non-string to C++ string type ${y}`);var Z=O(K),ie=ho(4+Z+m);return s()[ie>>>2>>>0]=Z/m,I(K,ie+4,Z+m),M!==null&&M.push(Jt,ie),ie},argPackAdvance:xr,readValueFromPointer:ma,Db(M){Jt(M)}})}function I0(d,m){cr(d>>>=0,{Tb:!0,name:m=Zt(m>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var S0=()=>1;function $0(d){Ta(d>>>0,!g,1,!b,131072,!1),Du()}var nl=d=>{if(!We)try{if(d(),!(0<kr))try{h?go(Te):ua(Te)}catch(m){m instanceof ia||m=="unwind"||E(1,m)}}catch(m){m instanceof ia||m=="unwind"||E(1,m)}};function ha(d){d>>>=0,typeof Atomics.nc=="function"&&(Atomics.nc(i(),d>>>2,d).value.then(ao),d+=128,Atomics.store(i(),d>>>2,1))}var ao=()=>{var d=sn();d&&(ha(d),nl(Dl))};function A0(d,m){(d>>>=0)==m>>>0?setTimeout(ao):h?postMessage({targetThread:d,cmd:"checkMailbox"}):(d=Xt[d])&&d.postMessage({cmd:"checkMailbox"})}var ga=[];function P0(d,m,y,x,I){for(m>>>=0,x/=2,ga.length=x,y=I>>>0>>>3,I=0;I<x;I++)ga[I]=Y[y+2*I]?Y[y+2*I+1]:u()[y+2*I+1>>>0];return(m?oa[m]:bw[d])(...ga)}function O0(d){d>>>=0,h?postMessage({cmd:"cleanupThread",thread:d}):ku(Xt[d])}function E0(d){}var ba=(d,m)=>{var y=fa[d];if(y===void 0)throw d=Ol(d),y=Zt(d),Jt(d),new yr(`${m} has unknown type ${y}`);return y},ol=(d,m,y)=>{var x=[];return d=d.toWireType(x,y),x.length&&(s()[m>>>2>>>0]=Ct(x)),d};function C0(d,m,y){return m>>>=0,y>>>=0,d=Et(d>>>0),m=ba(m,"emval::as"),ol(m,y,d)}var so=d=>{try{d()}catch(m){rn(m)}},wr=0,Yt=null,il=0,uo=[],al={},sl={},k0=0,ya=null,D0=[];function ul(d){return function(m){if(!We){if(wr===0){var y=!1,x=!1;m((I=0)=>{if(!We&&(il=I,y=!0,x)){wr=2,so(()=>Nl(Yt)),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.resume(),I=!1;try{var O=function(){var K=i()[Yt+8>>>2>>>0];return K=re[sl[K]],--kr,K()}()}catch(K){O=K,I=!0}var z=!1;if(!Yt){var M=ya;M&&(ya=null,(I?M.reject:M.resolve)(O),z=!0)}if(I&&!z)throw O}}),x=!0,y||(wr=1,Yt=function(){var I=ho(65548),O=I+12;s()[I>>>2>>>0]=O,s()[I+4>>>2>>>0]=O+65536,O=uo[0];var z=al[O];return z===void 0&&(z=k0++,al[O]=z,sl[z]=O),O=z,i()[I+8>>>2>>>0]=O,I}(),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.pause(),so(()=>Rl(Yt)))}else wr===2?(wr=0,so(Ml),Jt(Yt),Yt=null,D0.forEach(nl)):rn(`invalid state: ${wr}`);return il}}(m=>{d().then(m)})}function B0(d){return d>>>=0,ul(()=>(d=Et(d)).then(Ct))}var lo=[];function L0(d,m,y,x){return y>>>=0,x>>>=0,(d=lo[d>>>0])(null,m=Et(m>>>0),y,x)}var R0={},co=d=>{var m=R0[d];return m===void 0?Zt(d):m};function z0(d,m,y,x,I){return y>>>=0,x>>>=0,I>>>=0,(d=lo[d>>>0])(m=Et(m>>>0),m[y=co(y)],x,I)}var ll=()=>typeof globalThis=="object"?globalThis:Function("return this")();function N0(d){return(d>>>=0)==0?Ct(ll()):(d=co(d),Ct(ll()[d]))}var M0=d=>{var m=lo.length;return lo.push(d),m},F0=(d,m)=>{for(var y=Array(d),x=0;x<d;++x)y[x]=ba(s()[m+4*x>>>2>>>0],"parameter "+x);return y},cl=(d,m)=>Object.defineProperty(m,"name",{value:d});function V0(d,m,y){var x=(m=F0(d,m>>>0)).shift();d--;var I=`return function (obj, func, destructorsRef, args) {
`,O=0,z=[];y===0&&z.push("obj");for(var M=["retType"],K=[x],Z=0;Z<d;++Z)z.push("arg"+Z),M.push("argType"+Z),K.push(m[Z]),I+=`  var arg${Z} = argType${Z}.readValueFromPointer(args${O?"+"+O:""});
`,O+=m[Z].argPackAdvance;return I+=`  var rv = ${y===1?"new func":"func.call"}(${z.join(", ")});
`,x.Tb||(M.push("emval_returnValue"),K.push(ol),I+=`  return emval_returnValue(retType, destructorsRef, rv);
`),M.push(I+`};
`),d=function(ie){var Ae=Function;if(!(Ae instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Ae} which is not a function`);var Le=cl(Ae.name||"unknownFunctionName",function(){});return Le.prototype=Ae.prototype,Le=new Le,(ie=Ae.apply(Le,ie))instanceof Object?ie:Le}(M)(...K),y=`methodCaller<(${m.map(ie=>ie.name).join(", ")}) => ${x.name}>`,M0(cl(y,d))}function G0(d){return d=co(d>>>0),Ct(c[d])}function U0(d,m){return m>>>=0,d=Et(d>>>0),m=Et(m),Ct(d[m])}function W0(d){9<(d>>>=0)&&(fr[d+1]+=1)}function H0(){return Ct([])}function q0(d){d=Et(d>>>0);for(var m=Array(d.length),y=0;y<d.length;y++)m[y]=d[y];return Ct(m)}function j0(d){return Ct(co(d>>>0))}function K0(){return Ct({})}function X0(d){for(var m=Et(d>>>=0);m.length;){var y=m.pop();m.pop()(y)}pa(d)}function Z0(d,m,y){m>>>=0,y>>>=0,d=Et(d>>>0),m=Et(m),y=Et(y),d[m]=y}function Y0(d,m){return m>>>=0,d=(d=ba(d>>>0,"_emval_take_value")).readValueFromPointer(m),Ct(d)}function J0(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getUTCSeconds(),i()[m+4>>>2>>>0]=d.getUTCMinutes(),i()[m+8>>>2>>>0]=d.getUTCHours(),i()[m+12>>>2>>>0]=d.getUTCDate(),i()[m+16>>>2>>>0]=d.getUTCMonth(),i()[m+20>>>2>>>0]=d.getUTCFullYear()-1900,i()[m+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[m+28>>>2>>>0]=d}var on=d=>d%4==0&&(d%100!=0||d%400==0),fl=[0,31,60,91,121,152,182,213,244,274,305,335],dl=[0,31,59,90,120,151,181,212,243,273,304,334];function Q0(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getSeconds(),i()[m+4>>>2>>>0]=d.getMinutes(),i()[m+8>>>2>>>0]=d.getHours(),i()[m+12>>>2>>>0]=d.getDate(),i()[m+16>>>2>>>0]=d.getMonth(),i()[m+20>>>2>>>0]=d.getFullYear()-1900,i()[m+24>>>2>>>0]=d.getDay();var y=(on(d.getFullYear())?fl:dl)[d.getMonth()]+d.getDate()-1|0;i()[m+28>>>2>>>0]=y,i()[m+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var x=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=x&&d.getTimezoneOffset()==Math.min(x,y)),i()[m+32>>>2>>>0]=d}function ew(d){d>>>=0;var m=new Date(i()[d+20>>>2>>>0]+1900,i()[d+16>>>2>>>0],i()[d+12>>>2>>>0],i()[d+8>>>2>>>0],i()[d+4>>>2>>>0],i()[d>>>2>>>0],0),y=i()[d+32>>>2>>>0],x=m.getTimezoneOffset(),I=new Date(m.getFullYear(),6,1).getTimezoneOffset(),O=new Date(m.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(O,I);return 0>y?i()[d+32>>>2>>>0]=+(I!=O&&z==x):0<y!=(z==x)&&(I=Math.max(O,I),m.setTime(m.getTime()+6e4*((0<y?z:I)-x))),i()[d+24>>>2>>>0]=m.getDay(),y=(on(m.getFullYear())?fl:dl)[m.getMonth()]+m.getDate()-1|0,i()[d+28>>>2>>>0]=y,i()[d>>>2>>>0]=m.getSeconds(),i()[d+4>>>2>>>0]=m.getMinutes(),i()[d+8>>>2>>>0]=m.getHours(),i()[d+12>>>2>>>0]=m.getDate(),i()[d+16>>>2>>>0]=m.getMonth(),i()[d+20>>>2>>>0]=m.getYear(),d=m.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function pl(d,m,y,x,I,O,z){return h?He(16,1,d,m,y,x,I,O,z):-52}function ml(d,m,y,x,I,O){if(h)return He(17,1,d,m,y,x,I,O)}function tw(d,m,y,x){d>>>=0,m>>>=0,y>>>=0,x>>>=0;var I=new Date().getFullYear(),O=new Date(I,0,1),z=new Date(I,6,1);I=O.getTimezoneOffset();var M=z.getTimezoneOffset(),K=Math.max(I,M);s()[d>>>2>>>0]=60*K,i()[m>>>2>>>0]=+(I!=M),O=(d=Z=>Z.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(O),z=d(z),M<I?(nn(O,y,17),nn(z,x,17)):(nn(O,x,17),nn(z,y,17))}var xa=[],hl=(d,m)=>{xa.length=0;for(var y;y=n()[d++>>>0];){var x=y!=105;m+=(x&=y!=112)&&m%8?4:0,xa.push(y==112?s()[m>>>2>>>0]:y==106?Y[m>>>3]:y==105?i()[m>>>2>>>0]:u()[m>>>3>>>0]),m+=x?8:4}return xa};function rw(d,m,y){return d>>>=0,m=hl(m>>>0,y>>>0),oa[d](...m)}function nw(d,m,y){return d>>>=0,m=hl(m>>>0,y>>>0),oa[d](...m)}var ow=()=>{},iw=()=>Date.now();function aw(d,m){return se(st(d>>>0,m>>>0))}var gl,sw=()=>{throw kr+=1,"unwind"};function uw(){return 4294901760}gl=()=>performance.timeOrigin+performance.now();var lw=()=>navigator.hardwareConcurrency;function cw(){return rn("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function fw(d){d>>>=0;var m=n().length;if(d<=m||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var x=m*(1+.2/y);x=Math.min(x,d+100663296);var I=Math;x=Math.max(d,x);e:{I=(I.min.call(I,4294901760,x+(65536-x%65536)%65536)-ve.buffer.byteLength+65535)/65536;try{ve.grow(I),Ze();var O=1;break e}catch{}O=void 0}if(O)return!0}return!1}var fo=()=>(rn("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),an={},bl=d=>{d.forEach(m=>{var y=fo();y&&(an[y]=m)})};function dw(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),bl(d),an.Pb=fo(),an.ec=d,an.Pb}function pw(d,m,y){if(d>>>=0,m>>>=0,an.Pb==d)var x=an.ec;else(x=Error().stack.toString().split(`
`))[0]=="Error"&&x.shift(),bl(x);for(var I=3;x[I]&&fo()!=d;)++I;for(d=0;d<y&&x[d+I];++d)i()[m+4*d>>>2>>>0]=fo();return d}var wa,va={},yl=()=>{if(!wa){var d,m={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:P||"./this.program"};for(d in va)va[d]===void 0?delete m[d]:m[d]=va[d];var y=[];for(d in m)y.push(`${d}=${m[d]}`);wa=y}return wa};function xl(d,m){if(h)return He(18,1,d,m);d>>>=0,m>>>=0;var y=0;return yl().forEach((x,I)=>{var O=m+y;for(I=s()[d+4*I>>>2>>>0]=O,O=0;O<x.length;++O)e()[I++>>>0]=x.charCodeAt(O);e()[I>>>0]=0,y+=x.length+1}),0}function wl(d,m){if(h)return He(19,1,d,m);d>>>=0,m>>>=0;var y=yl();s()[d>>>2>>>0]=y.length;var x=0;return y.forEach(I=>x+=I.length+1),s()[m>>>2>>>0]=x,0}function vl(d){return h?He(20,1,d):52}function Tl(d,m,y,x){return h?He(21,1,d,m,y,x):52}function _l(d,m,y,x){return h?He(22,1,d,m,y,x):70}var mw=[null,[],[]];function Il(d,m,y,x){if(h)return He(23,1,d,m,y,x);m>>>=0,y>>>=0,x>>>=0;for(var I=0,O=0;O<y;O++){var z=s()[m>>>2>>>0],M=s()[m+4>>>2>>>0];m+=8;for(var K=0;K<M;K++){var Z=n()[z+K>>>0],ie=mw[d];Z===0||Z===10?((d===1?V:se)(Mu(ie,0)),ie.length=0):ie.push(Z)}I+=M}return s()[x>>>2>>>0]=I,0}var Sl=[31,29,31,30,31,30,31,31,30,31,30,31],$l=[31,28,31,30,31,30,31,31,30,31,30,31],hw=(d,m)=>{e().set(d,m>>>0)};function Al(d,m,y,x){function I(R,Se,je){for(R=typeof R=="number"?R.toString():R||"";R.length<Se;)R=je[0]+R;return R}function O(R,Se){return I(R,Se,"0")}function z(R,Se){function je(Vl){return 0>Vl?-1:0<Vl?1:0}var Br;return(Br=je(R.getFullYear()-Se.getFullYear()))===0&&(Br=je(R.getMonth()-Se.getMonth()))===0&&(Br=je(R.getDate()-Se.getDate())),Br}function M(R){switch(R.getDay()){case 0:return new Date(R.getFullYear()-1,11,29);case 1:return R;case 2:return new Date(R.getFullYear(),0,3);case 3:return new Date(R.getFullYear(),0,2);case 4:return new Date(R.getFullYear(),0,1);case 5:return new Date(R.getFullYear()-1,11,31);case 6:return new Date(R.getFullYear()-1,11,30)}}function K(R){var Se=R.Bb;for(R=new Date(new Date(R.Cb+1900,0,1).getTime());0<Se;){var je=R.getMonth(),Br=(on(R.getFullYear())?Sl:$l)[je];if(!(Se>Br-R.getDate())){R.setDate(R.getDate()+Se);break}Se-=Br-R.getDate()+1,R.setDate(1),11>je?R.setMonth(je+1):(R.setMonth(0),R.setFullYear(R.getFullYear()+1))}return je=new Date(R.getFullYear()+1,0,4),Se=M(new Date(R.getFullYear(),0,4)),je=M(je),0>=z(Se,R)?0>=z(je,R)?R.getFullYear()+1:R.getFullYear():R.getFullYear()-1}d>>>=0,m>>>=0,y>>>=0,x>>>=0;var Z=s()[x+40>>>2>>>0];for(var ie in x={kc:i()[x>>>2>>>0],jc:i()[x+4>>>2>>>0],Hb:i()[x+8>>>2>>>0],Lb:i()[x+12>>>2>>>0],Ib:i()[x+16>>>2>>>0],Cb:i()[x+20>>>2>>>0],ub:i()[x+24>>>2>>>0],Bb:i()[x+28>>>2>>>0],rc:i()[x+32>>>2>>>0],ic:i()[x+36>>>2>>>0],lc:Z?st(Z):""},y=st(y),Z={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})y=y.replace(new RegExp(ie,"g"),Z[ie]);var Ae="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Le="January February March April May June July August September October November December".split(" ");for(ie in Z={"%a":R=>Ae[R.ub].substring(0,3),"%A":R=>Ae[R.ub],"%b":R=>Le[R.Ib].substring(0,3),"%B":R=>Le[R.Ib],"%C":R=>O((R.Cb+1900)/100|0,2),"%d":R=>O(R.Lb,2),"%e":R=>I(R.Lb,2," "),"%g":R=>K(R).toString().substring(2),"%G":K,"%H":R=>O(R.Hb,2),"%I":R=>((R=R.Hb)==0?R=12:12<R&&(R-=12),O(R,2)),"%j":R=>{for(var Se=0,je=0;je<=R.Ib-1;Se+=(on(R.Cb+1900)?Sl:$l)[je++]);return O(R.Lb+Se,3)},"%m":R=>O(R.Ib+1,2),"%M":R=>O(R.jc,2),"%n":()=>`
`,"%p":R=>0<=R.Hb&&12>R.Hb?"AM":"PM","%S":R=>O(R.kc,2),"%t":()=>"	","%u":R=>R.ub||7,"%U":R=>O(Math.floor((R.Bb+7-R.ub)/7),2),"%V":R=>{var Se=Math.floor((R.Bb+7-(R.ub+6)%7)/7);if(2>=(R.ub+371-R.Bb-2)%7&&Se++,Se)Se==53&&((je=(R.ub+371-R.Bb)%7)==4||je==3&&on(R.Cb)||(Se=1));else{Se=52;var je=(R.ub+7-R.Bb-1)%7;(je==4||je==5&&on(R.Cb%400-1))&&Se++}return O(Se,2)},"%w":R=>R.ub,"%W":R=>O(Math.floor((R.Bb+7-(R.ub+6)%7)/7),2),"%y":R=>(R.Cb+1900).toString().substring(2),"%Y":R=>R.Cb+1900,"%z":R=>{var Se=0<=(R=R.ic);return R=Math.abs(R)/60,(Se?"+":"-")+("0000"+(R/60*100+R%60)).slice(-4)},"%Z":R=>R.lc,"%%":()=>"%"},y=y.replace(/%%/g,"\0\0"),Z)y.includes(ie)&&(y=y.replace(new RegExp(ie,"g"),Z[ie](x)));return ie=function(R){var Se=Array(la(R)+1);return Gu(R,Se,0,Se.length),Se}(y=y.replace(/\0\0/g,"%")),ie.length>m?0:(hw(ie,d),ie.length-1)}function gw(d,m,y,x){return Al(d>>>0,m>>>0,y>>>0,x>>>0)}h||function(){for(var d=c.numThreads-1;d--;)Lu();Er.unshift(()=>{xt++,function(m){h?m():Promise.all(br.map(Bu)).then(m)}(()=>_u())})}();for(var Pl=Array(256),po=0;256>po;++po)Pl[po]=String.fromCharCode(po);el=Pl,yr=c.BindingError=class extends Error{constructor(d){super(d),this.name="BindingError"}},c.InternalError=class extends Error{constructor(d){super(d),this.name="InternalError"}},fr.push(0,1,void 0,1,null,1,!0,1,!1,1),c.count_emval_handles=()=>fr.length/2-5-da.length;var bw=[sa,Eu,Ru,Fu,Vu,Uu,Wu,Hu,qu,ju,Ku,Xu,Zu,Yu,Ju,Qu,pl,ml,xl,wl,vl,Tl,_l,Il],re=function(){function d(y,x){return re=y.exports,re=function(){var I=re,O={};for(let[z,M]of Object.entries(I))O[z]=typeof M=="function"?(...K)=>{uo.push(z);try{return M(...K)}finally{We||(uo.pop(),Yt&&wr===1&&uo.length===0&&(wr=0,kr+=1,so(zl),typeof Fibers<"u"&&Fibers.sc()))}}:M;return O}(),re=function(){var I=re,O=M=>K=>M(K)>>>0,z=M=>()=>M()>>>0;return(I=Object.assign({},I)).Ca=O(I.Ca),I.fb=z(I.fb),I.gb=O(I.gb),I.emscripten_main_runtime_thread_id=z(I.emscripten_main_runtime_thread_id),I.sb=O(I.sb),I.tb=z(I.tb),I}(),Cu.push(re.ib),et.unshift(re.Ba),oe=x,_u(),re}var m=Pu();if(xt++,c.instantiateWasm)try{return c.instantiateWasm(m,d)}catch(y){se(`Module.instantiateWasm callback failed with error: ${y}`),f(y)}return na||=c.locateFile?Iu("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":c.locateFile?c.locateFile("ort-wasm-simd-threaded.jsep.wasm",B):B+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(y,x){var I=na;return N||typeof WebAssembly.instantiateStreaming!="function"||Iu(I)||Su(I)||typeof fetch!="function"?Au(I,y,x):fetch(I,{credentials:"same-origin"}).then(O=>WebAssembly.instantiateStreaming(O,y).then(x,function(z){return se(`wasm streaming compile failed: ${z}`),se("falling back to ArrayBuffer instantiation"),Au(I,y,x)}))}(m,function(y){d(y.instance,y.module)}).catch(f),{}}(),Ol=d=>(Ol=re.Ca)(d),El=()=>(El=re.Da)();c._OrtInit=(d,m)=>(c._OrtInit=re.Ea)(d,m),c._OrtGetLastError=(d,m)=>(c._OrtGetLastError=re.Fa)(d,m),c._OrtCreateSessionOptions=(d,m,y,x,I,O,z,M,K,Z)=>(c._OrtCreateSessionOptions=re.Ga)(d,m,y,x,I,O,z,M,K,Z),c._OrtAppendExecutionProvider=(d,m)=>(c._OrtAppendExecutionProvider=re.Ha)(d,m),c._OrtAddFreeDimensionOverride=(d,m,y)=>(c._OrtAddFreeDimensionOverride=re.Ia)(d,m,y),c._OrtAddSessionConfigEntry=(d,m,y)=>(c._OrtAddSessionConfigEntry=re.Ja)(d,m,y),c._OrtReleaseSessionOptions=d=>(c._OrtReleaseSessionOptions=re.Ka)(d),c._OrtCreateSession=(d,m,y)=>(c._OrtCreateSession=re.La)(d,m,y),c._OrtReleaseSession=d=>(c._OrtReleaseSession=re.Ma)(d),c._OrtGetInputOutputCount=(d,m,y)=>(c._OrtGetInputOutputCount=re.Na)(d,m,y),c._OrtGetInputName=(d,m)=>(c._OrtGetInputName=re.Oa)(d,m),c._OrtGetOutputName=(d,m)=>(c._OrtGetOutputName=re.Pa)(d,m),c._OrtFree=d=>(c._OrtFree=re.Qa)(d),c._OrtCreateTensor=(d,m,y,x,I,O)=>(c._OrtCreateTensor=re.Ra)(d,m,y,x,I,O),c._OrtGetTensorData=(d,m,y,x,I)=>(c._OrtGetTensorData=re.Sa)(d,m,y,x,I),c._OrtReleaseTensor=d=>(c._OrtReleaseTensor=re.Ta)(d),c._OrtCreateRunOptions=(d,m,y,x)=>(c._OrtCreateRunOptions=re.Ua)(d,m,y,x),c._OrtAddRunConfigEntry=(d,m,y)=>(c._OrtAddRunConfigEntry=re.Va)(d,m,y),c._OrtReleaseRunOptions=d=>(c._OrtReleaseRunOptions=re.Wa)(d),c._OrtCreateBinding=d=>(c._OrtCreateBinding=re.Xa)(d),c._OrtBindInput=(d,m,y)=>(c._OrtBindInput=re.Ya)(d,m,y),c._OrtBindOutput=(d,m,y,x)=>(c._OrtBindOutput=re.Za)(d,m,y,x),c._OrtClearBoundOutputs=d=>(c._OrtClearBoundOutputs=re._a)(d),c._OrtReleaseBinding=d=>(c._OrtReleaseBinding=re.$a)(d),c._OrtRunWithBinding=(d,m,y,x,I)=>(c._OrtRunWithBinding=re.ab)(d,m,y,x,I),c._OrtRun=(d,m,y,x,I,O,z,M)=>(c._OrtRun=re.bb)(d,m,y,x,I,O,z,M),c._OrtEndProfiling=d=>(c._OrtEndProfiling=re.cb)(d),c._JsepOutput=(d,m,y)=>(c._JsepOutput=re.db)(d,m,y),c._JsepGetNodeName=d=>(c._JsepGetNodeName=re.eb)(d);var mo,sn=()=>(sn=re.fb)(),ho=c._malloc=d=>(ho=c._malloc=re.gb)(d),Jt=c._free=d=>(Jt=c._free=re.hb)(d),Ta=(d,m,y,x,I,O)=>(Ta=re.kb)(d,m,y,x,I,O),Cl=()=>(Cl=re.lb)(),kl=(d,m,y,x,I)=>(kl=re.mb)(d,m,y,x,I),_a=d=>(_a=re.nb)(d),go=d=>(go=re.ob)(d),Dl=()=>(Dl=re.pb)(),Bl=(d,m)=>(Bl=re.qb)(d,m),bo=d=>(bo=re.rb)(d),Ia=d=>(Ia=re.sb)(d),Sa=()=>(Sa=re.tb)(),Ll=c.dynCall_ii=(d,m)=>(Ll=c.dynCall_ii=re.vb)(d,m),Rl=d=>(Rl=re.wb)(d),zl=()=>(zl=re.xb)(),Nl=d=>(Nl=re.yb)(d),Ml=()=>(Ml=re.zb)();function Fl(){0<xt||(h?(l(c),h||io(et),startWorker(c)):(io(Er),0<xt||mo||(mo=!0,c.calledRun=!0,We||(h||io(et),l(c),h||io(pt)))))}return c.___start_em_js=882450,c.___stop_em_js=882672,c.stackSave=()=>Sa(),c.stackRestore=d=>bo(d),c.stackAlloc=d=>Ia(d),c.UTF8ToString=st,c.stringToUTF8=nn,c.lengthBytesUTF8=la,Cr=function d(){mo||Fl(),mo||(Cr=d)},Fl(),p}),J_=Ph;globalThis.self?.name==="em-pthread"&&Ph()});var Tn,Q_,e2,t2,Ch,kh,r2,Dh,Hn=C(()=>{"use strict";gi();Tn=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Q_=!1||typeof location>"u"?void 0:location.origin,e2=(r,e)=>{try{let n=e??Tn;return(n?new URL(r,n):new URL(r)).origin===Q_}catch{return!1}},t2=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Ch=(Ah(),Pn($h)).default,kh=async()=>{if(!Tn)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(e2(Tn))return[void 0,Ch()];let r=await t2(Tn);return[r,Ch(r)]},r2=(Eh(),Pn(Oh)).default,Dh=async(r,e,n)=>[void 0,r2]});var Ns,Ms,Si,Bh,n2,o2,bi,Ke,Pr=C(()=>{"use strict";Hn();Ms=!1,Si=!1,Bh=!1,n2=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},o2=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},bi=async r=>{if(Ms)return Promise.resolve();if(Si)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Bh)throw new Error("previous call to 'initializeWebAssembly()' failed.");Si=!0;let e=r.initTimeout,n=r.numThreads;if(!o2())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=n2();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,f=r.wasmBinary,[c,p]=await Dh(a,i,n>1),b=!1,g=[];if(e>0&&g.push(new Promise(h=>{setTimeout(()=>{b=!0,h()},e)})),g.push(new Promise((h,v)=>{let T={numThreads:n};f?T.wasmBinary=f:(l||i)&&(T.locateFile=(w,_)=>l??(i??_)+w),p(T).then(w=>{Si=!1,Ms=!0,Ns=w,h(),c&&URL.revokeObjectURL(c)},w=>{Si=!1,Bh=!0,v(w)})})),await Promise.race(g),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ke=()=>{if(Ms&&Ns)return Ns;throw new Error("WebAssembly is not initialized yet.")}});var ot,jn,Ue,$i=C(()=>{"use strict";Pr();ot=(r,e)=>{let n=Ke(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},jn=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")jn(i,s+".",n,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ue=r=>{let e=Ke(),n=e.stackSave();try{let t=e.stackAlloc(8);e._OrtGetLastError(t,t+4);let o=e.HEAP32[t/4],i=e.HEAPU32[t/4+1],s=i?e.UTF8ToString(i):"";throw new Error(`${r} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var Lh,Rh=C(()=>{"use strict";Pr();$i();Lh=r=>{let e=Ke(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=ot(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&Ue("Can't create run options."),r?.extra!==void 0&&jn(r.extra,"",new WeakSet,(s,a)=>{let u=ot(s,t),l=ot(a,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&Ue(`Can't set a run config entry: ${s} - ${a}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(s=>e._free(s)),i}}});var i2,a2,s2,u2,zh,Nh=C(()=>{"use strict";Pr();$i();i2=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},a2=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},s2=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},u2=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=ot("deviceType",n),l=ot(a,n);Ke()._OrtAddSessionConfigEntry(r,u,l)!==0&&Ue(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=ot("preferredLayout",n),u=ot(s.preferredLayout,n);Ke()._OrtAddSessionConfigEntry(r,a,u)!==0&&Ue(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ot(o,n);Ke()._OrtAppendExecutionProvider(r,i)!==0&&Ue(`Can't append execution provider: ${o}.`)}},zh=r=>{let e=Ke(),n=0,t=[],o=r||{};s2(o);try{let i=i2(o.graphOptimizationLevel??"all"),s=a2(o.executionMode??"sequential"),a=typeof o.logId=="string"?ot(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let f=typeof o.optimizedModelFilePath=="string"?ot(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,f),n===0&&Ue("Can't create session options."),o.executionProviders&&u2(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=ot("enableGraphCapture",t),p=ot(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,c,p)!==0&&Ue(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let b=ot(c,t);e._OrtAddFreeDimensionOverride(n,b,p)!==0&&Ue(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&jn(o.extra,"",new WeakSet,(c,p)=>{let b=ot(c,t),g=ot(p,t);e._OrtAddSessionConfigEntry(n,b,g)!==0&&Ue(`Can't set a session config entry: ${c} - ${p}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n),t.forEach(s=>e._free(s)),i}}});var Kn,Or,Xr,Ai,Xn,Pi,Oi,Fs,ue=C(()=>{"use strict";Kn=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Or=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},Xr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},Ai=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},Xn=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Pi=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Oi=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool",Fs=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var Zn,Vs=C(()=>{"use strict";gi();Zn=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=$a("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=$a("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var l2,c2,Mh,Fh,Ei,f2,$e,jt=C(()=>{"use strict";ue();l2=["V","I","W","E","F"],c2=(r,e)=>{console.log(`[${l2[r]},${new Date().toISOString()}]${e}`)},Ei=(r,e)=>{Mh=r,Fh=e},f2=(r,e)=>{let n=Xn(r),t=Xn(Mh);n>=t&&c2(n,typeof e=="function"?e():e)},$e=(...r)=>{Fh&&f2(...r)}});var Ci,Gs=C(()=>{"use strict";ue();Ci=(r,e)=>new(Ai(e))(r)});var ki=C(()=>{"use strict"});var Vh,Us,Ws,d2,p2,Gh,qs,Hs,Wh,Hh=C(()=>{"use strict";jt();ki();Vh=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Us=[],Ws=r=>Math.ceil(r/16)*16,d2=r=>{for(let e=0;e<Us.length;e++){let n=Us[e];if(r<=n)return n}return Math.ceil(r/16)*16},p2=1,Gh=()=>p2++,qs=async(r,e,n,t)=>{let o=Ws(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=r.getCommandEncoder();r.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},Hs=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Vh)Us.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[])}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,s=Ws(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let f=this.backend.getCommandEncoder();this.backend.endComputePass(),f.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),$e("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`),this.buffersForUploadingPending.push(u)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Ws(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return $e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Gh();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),$e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),$e("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=d2(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let a={id:Gh(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:e}),$e("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=this.storageCache.get(e);if(!n)throw new Error("releasing data does not exist");return $e("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("data does not exist");await qs(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){for(let e of this.buffersForUploadingPending)e.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Vh.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e))}},Wh=(...r)=>new Hs(...r)});var js,le,Xe=C(()=>{"use strict";js=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=r=>new js(r)});var Ks,or,k,Zr,Di,qh,jh,ge=C(()=>{"use strict";Ks=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},or=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Ks.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;let c=Math.max(l,f);if(l&&f)a[s-u]=Math.max(l,f);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},k=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Zr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(s?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Di=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!or.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},qh=-34028234663852886e22,jh=34028234663852886e22});var Yr,Zs,ke,it,G,Me,Ys,Jr,Kt,J,Js,L,F,Bi,Xs,Kh,In,be=C(()=>{"use strict";ue();ge();Yr=64,Zs=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(r){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},ke=(r,e=1)=>{let n=Zs(r,e);return typeof n=="string"?n:n[0]},it=(r,e=1)=>{let n=Zs(r,e);return typeof n=="string"?n:n[1]},G=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:k.computeStrides(n)})}),e},Me=r=>r%4===0?4:r%2===0?2:1,Ys=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,Jr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,Kt=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,J=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Js=(r,e,n,t,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Zs(e,o),f=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],p={indices:u,value:f,storage:c,tensor:e},b=U=>typeof U=="string"?U:`${U}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",v=`${h}${r}_shape`,T=`${h}${r}_strides`,w="";for(let U=0;U<s-1;U++)w+=`
    let dim${U} = current / ${J(T,U,s)};
    let rest${U} = current % ${J(T,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;w+=`indices[${s-1}] = current;`;let _=s<2?"":`
  fn o2i_${r}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${w}
    return indices;
  }`,$=U=>(g.offsetToIndices=!0,s<2?U:`o2i_${r}(${U})`),P=[];if(s>=2)for(let U=s-1;U>=0;U--)P.push(`${J(T,U,s)} * (indices[${U}])`);let E=s<2?"":`
  fn i2o_${r}(indices: ${p.indices}) -> u32 {
    return ${P.join("+")};
  }`,B=U=>(g.indicesToOffset=!0,s<2?U:`i2o_${r}(${U})`),N=(...U)=>s===0?"0u":`${p.indices}(${U.map(b).join(",")})`,H=(U,Y)=>s<2?`${U}`:`${J(U,Y,s)}`,q=(U,Y,Be)=>s<2?`${U}=${Be};`:`${J(U,Y,s)}=${Be};`,V={},se=(U,Y)=>{g.broadcastedIndicesToOffset=!0;let Be=`${Y.name}broadcastedIndicesTo${r}Offset`;if(Be in V)return`${Be}(${U})`;let yt=[];for(let We=s-1;We>=0;We--){let Ze=Y.indicesGet("outputIndices",We+Y.rank-s);yt.push(`${H(T,We)} * (${Ze} % ${H(v,We)})`)}return V[Be]=`fn ${Be}(outputIndices: ${Y.type.indices}) -> u32 {
             return ${yt.length>0?yt.join("+"):"0u"};
           }`,`${Be}(${U})`},fe=(U,Y)=>(()=>{if(p.storage===p.value)return`${r}[${U}]=${Y};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${r}[${U}]=vec2<u32>(u32(${Y}), select(0u, 0xFFFFFFFFu, ${Y} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${r}[${U}]=vec2<u32>(u32(${Y}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${r}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Y}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),ye=U=>(()=>{if(p.storage===p.value)return`${r}[${U}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${r}[${U}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${r}[${U}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${U}] & 0xFFu), bool(${r}[${U}] & 0xFF00u), bool(${r}[${U}] & 0xFF0000u), bool(${r}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),ve=s<2?"":`
  fn get_${r}ByIndices(indices: ${p.indices}) -> ${f} {
    return ${ye(`i2o_${r}(indices)`)};
  }`,oe=s<2?"":(()=>{let U=a.map(Be=>`d${Be}: u32`).join(", "),Y=a.map(Be=>`d${Be}`).join(", ");return`
  fn get_${r}(${U}) -> ${f} {
    return get_${r}ByIndices(${N(Y)});
  }`})(),Te=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let Y=U.map(b).join(",");return s===0?ye("0u"):s===1?ye(Y[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${r}(${Y})`)},Ie=U=>s<2?ye(U):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${r}ByIndices(${U})`),te=s<2?"":`
  fn set_${r}ByIndices(indices: ${p.indices}, value: ${f}) {
    ${fe(`i2o_${r}(indices)`,"value")}
  }`,we=s<2?"":(()=>{let U=a.map(Be=>`d${Be}: u32`).join(", "),Y=a.map(Be=>`d${Be}`).join(", ");return`
  fn set_${r}(${U}, value: ${f}) {
    set_${r}ByIndices(${N(Y)}, value);
  }`})();return{impl:()=>{let U=[],Y=!1;return g.offsetToIndices&&(U.push(_),Y=!0),g.indicesToOffset&&(U.push(E),Y=!0),g.broadcastedIndicesToOffset&&(Object.values(V).forEach(Be=>U.push(Be)),Y=!0),g.set&&(U.push(we),Y=!0),g.setByIndices&&(U.push(te),Y=!0),g.get&&(U.push(oe),Y=!0),g.getByIndices&&(U.push(ve),Y=!0),!i&&Y&&U.unshift(`const ${v} = ${p.indices}(${n.join(",")});`,`const ${T} = ${p.indices}(${k.computeStrides(n).join(",")});`),U.join(`
`)},type:p,offsetToIndices:$,indicesToOffset:B,broadcastedIndicesToOffset:se,indices:N,indicesGet:H,indicesSet:q,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let Y=U[s];if(typeof Y!="string")throw new Error("value must be string");let Be=U.slice(0,s).map(b).join(",");return s===0?fe("0u",Y):s===1?fe(Be[0],Y):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${r}(${Be}, ${Y})`)},setByOffset:fe,setByIndices:(U,Y)=>s<2?fe(U,Y):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${r}ByIndices(${U}, ${Y});`),get:Te,getByOffset:ye,getByIndices:Ie,usage:t,name:r,strides:T,shape:v,rank:s}},L=(r,e,n,t=1)=>Js(r,e,n,"input",t),F=(r,e,n,t=1)=>Js(r,e,n,"output",t),Bi=(r,e,n,t=1)=>Js(r,e,n,"internal",t),Xs=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Yr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},Kh=(r,e)=>new Xs(r,e),In=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;o++){let i=n-1-o,s=r[i]||1;(e[e.length-1-o]||1)>1&&s===1&&t.unshift(i)}return t}});var m2,Xh,h2,g2,b2,at,Zh,Yh,hr=C(()=>{"use strict";ue();ge();Xe();be();m2=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.")},Xh=(r,e)=>e&&e.length!==r?[...new Array(r).keys()].reverse():e,h2=(r,e)=>k.sortBasedOnPerm(r,Xh(r.length,e)),g2=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=n.indicesSet("a",r[i],`i[${i}]`);return o+="return a;}"},b2=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},at=(r,e)=>{let n=r.dataType,t=r.dims.length,o=Xh(t,e),i=h2(r.dims,o),{newShape:s,newPerm:a}=b2(r.dims,o),u=k.areEqual(a,[2,3,1]),l=k.areEqual(a,[3,1,2]),f=s.length===2&&a[0]>a[1]||u||l,c=f?s:r.dims,p=i;f&&(c=u?[s[0],s[1]*s[2]]:l?[s[0]*s[1],s[2]]:s,p=[c[1],c[0]]);let b=L("a",n,c.length),g=F("output",n,p.length),h=16,v;return f?v=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(b,g)}
  var<workgroup> tile : array<array<${g.type.value}, ${h+1}>, ${h}>;
  ${T.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${b.getByIndices(`${b.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${g.setByIndices(`${g.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:v=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(b,g)}

  ${g2(o,t,b,g)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`,{name:f?"TransposeShared":"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let T=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:f?{x:Math.ceil(p[1]/h),y:Math.ceil(p[0]/h)}:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...G(c,p)]}},getShaderSource:v}},Zh=(r,e)=>{m2(r.inputs),r.compute(at(r.inputs[0],e.perm))},Yh=r=>le({perm:r.perm})});var y2,x2,w2,v2,T2,_2,I2,S2,$2,A2,ir,Jh,Qh,eg,tg,rg,ng,og,ig,ag,sg,ug=C(()=>{"use strict";ue();ge();be();Li();hr();y2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},x2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},w2={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},v2={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},T2=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},_2=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},I2=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},S2=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},$2=(r,e)=>{let n=[];if(!S2(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},A2=(r,e,n,t,o,i,s)=>{let a=n[0].dims,u=k.size(i),l=k.size(s),f=L("_A",n[0].dataType,a),c=F("output",o,i),p=32,b=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:r,shaderCache:e,getShaderSource:h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(f,c)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${w2[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${y2[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${x2[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${t==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${v2[t]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},ir=(r,e,n,t)=>{let o=r.inputs.length===1?n:Qs(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((b,g)=>g));let s=k.normalizeAxes(i,r.inputs[0].dims.length),a=s,u=r.inputs[0],l=$2(a,r.inputs[0].dims.length);l.length>0&&(u=r.compute(at(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=T2(a.length,u.dims.length));let[f,c]=_2(u.dims,a),p=f;o.keepDims&&(p=I2(f,s)),r.compute(A2(e,{hint:o.cacheKey,inputDependencies:["type"]},[u],t,r.inputs[0].dataType,p,c),{inputs:[u]})},Jh=(r,e)=>{ir(r,"ReduceMeanShared",e,"mean")},Qh=(r,e)=>{ir(r,"ReduceL1Shared",e,"l1")},eg=(r,e)=>{ir(r,"ReduceL2Shared",e,"l2")},tg=(r,e)=>{ir(r,"ReduceLogSumExpShared",e,"logSumExp")},rg=(r,e)=>{ir(r,"ReduceMaxShared",e,"max")},ng=(r,e)=>{ir(r,"ReduceMinShared",e,"min")},og=(r,e)=>{ir(r,"ReduceProdShared",e,"prod")},ig=(r,e)=>{ir(r,"ReduceSumShared",e,"sum")},ag=(r,e)=>{ir(r,"ReduceSumSquareShared",e,"sumSquare")},sg=(r,e)=>{ir(r,"ReduceLogSumShared",e,"logSum")}});var ar,P2,Ri,Qs,sr,O2,E2,C2,k2,D2,B2,L2,R2,z2,N2,ur,lg,cg,fg,dg,pg,mg,hg,gg,bg,yg,Li=C(()=>{"use strict";ue();ge();Xe();be();ug();ar=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},P2=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Ri=(r,e,n,t,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,f=l.length,c=k.normalizeAxes(o,f),p=!a&&c.length===0;l.forEach((v,T)=>{p||c.indexOf(T)>=0?s&&u.push(1):u.push(v)});let b=u.length,g=k.size(u);return{name:r,shaderCache:e,getShaderSource:v=>{let T=[],w=L("_A",n[0].dataType,f),_=F("output",i,b),$=t(w,_,c),P=$[2];for(let E=0,B=0;E<f;E++)p||c.indexOf(E)>=0?(s&&B++,P=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${w.indicesSet("input_indices",E,`j${E}`)}
                  ${P}
                }`):(T.push(`${w.indicesSet("input_indices",E,_.indicesGet("output_indices",B))};`),B++);return`

        ${v.registerUniform("output_size","u32").declareVariables(w,_)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${P}
          ${$[3]}
          ${$.length===4?_.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...G(l,u)]})}},Qs=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),le({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},sr=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:Qs(o,n);r.compute(Ri(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?P2:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},O2=(r,e)=>{ar(r.inputs),sr(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},E2=(r,e)=>{ar(r.inputs),sr(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},C2=(r,e)=>{ar(r.inputs),sr(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},k2=(r,e)=>{ar(r.inputs),sr(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},D2=(r,e)=>{ar(r.inputs),sr(r,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},B2=(r,e)=>{ar(r.inputs),sr(r,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=r.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},L2=(r,e)=>{ar(r.inputs),sr(r,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},R2=(r,e)=>{ar(r.inputs),sr(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},z2=(r,e)=>{ar(r.inputs),sr(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},N2=(r,e)=>{ar(r.inputs),sr(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},ur=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},lg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?B2(r,e):Jh(r,e)},cg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?E2(r,e):Qh(r,e)},fg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?C2(r,e):eg(r,e)},dg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?k2(r,e):tg(r,e)},pg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?D2(r,e):rg(r,e)},mg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?L2(r,e):ng(r,e)},hg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?R2(r,e):og(r,e)},gg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?z2(r,e):ig(r,e)},bg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?N2(r,e):ag(r,e)},yg=(r,e)=>{ur(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?O2(r,e):sg(r,e)}});var xg,wg,vg,eu,Tg=C(()=>{"use strict";ue();Xe();Li();xg=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},wg=(r,e)=>{xg(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ri("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},vg=(r,e)=>{xg(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ri("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},eu=r=>le(r)});var M2,F2,V2,G2,Sn,U2,_g,zi=C(()=>{"use strict";ue();ge();ki();be();M2=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4],a=r[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,b=p;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let _ of e.qkvHiddenSizes)if(_%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=e.qkvHiddenSizes[0],p=e.qkvHiddenSizes[1],b=e.qkvHiddenSizes[2]}let g=l;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let v=g+h,T=-1,w=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:g,totalSequenceLength:v,maxSequenceLength:T,inputHiddenSize:f,hiddenSize:c,vHiddenSize:b,headSize:Math.floor(c/e.numHeads),vHeadSize:Math.floor(b/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:w,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},F2=(r,e,n)=>{let t=Me(n),o=64,i=n/t;i<o&&(o=32);let s=Math.ceil(n/t/o),a=[{type:1,data:1/n},{type:12,data:i},{type:12,data:s}],u=ke(r.dataType,t),l=it(1,t),f=["type"],c=p=>{let b=F("x",r.dataType,r.dims,t),g=it(r.dataType),h=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${p.registerUniforms(h).declareVariables(b)}
  ${p.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${l}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${l}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(t){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${t}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${l}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${l}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(t){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${t}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${b.type.value}(${g}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${l}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${u};${t}`,inputDependencies:f},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:e},programUniforms:a})}},V2=(r,e,n,t,o,i,s,a)=>{let u=a+i.kvSequenceLength,l=[i.batchSize,i.numHeads,i.sequenceLength,u],f=i.kvNumHeads===void 0&&r>1&&t,c=f?[i.batchSize,i.numHeads,u,i.headSize]:void 0,p=s.scale===0?1/Math.sqrt(i.headSize):s.scale,b=Me(i.headSize),g=i.headSize/b,h=12,v={x:Math.ceil(u/h),y:Math.ceil(i.sequenceLength/h),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:g},{type:12,data:u},{type:12,data:i.numHeads},{type:1,data:p},{type:12,data:a},{type:12,data:i.kvSequenceLength}],w=f&&t&&k.size(t.dims)>0,_=["type","type"];w&&_.push("type"),o&&_.push("type");let $=[{dims:l,dataType:e.dataType,gpuDataType:0}];f&&$.push({dims:c,dataType:e.dataType,gpuDataType:0});let P=E=>{let B=L("q",e.dataType,e.dims,b),N=L("key",n.dataType,n.dims,b),H=[B,N];if(w){let ye=L("past_key",t.dataType,t.dims,b);H.push(ye)}o&&H.push(L("attention_bias",o.dataType,o.dims));let q=F("output",e.dataType,l),V=[q];f&&V.push(F("present_key",e.dataType,c,b));let se=it(1,b),fe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;

  var<workgroup> tileQ: array<${B.type.storage}, ${h*h}>;
  var<workgroup> tileK: array<${B.type.storage}, ${h*h}>;
  ${E.registerUniforms(fe).declareVariables(...H,...V)}
  ${E.mainStart([h,h,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>w&&f?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${f?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${se}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>w&&f?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];")()}
      ${f?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${se}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${q.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${o!==void 0};${t!==void 0};${r}`,inputDependencies:_},getRunData:()=>({outputs:$,dispatchGroup:v,programUniforms:T}),getShaderSource:P}},G2=(r,e,n,t,o,i)=>{let s=i+o.kvSequenceLength,a=o.nReps?o.nReps:1,u=o.vHiddenSize*a,l=o.kvNumHeads==null&&r>1&&t,f=l?[o.batchSize,o.numHeads,s,o.headSize]:void 0,c=[o.batchSize,o.sequenceLength,u],p=12,b={x:Math.ceil(o.vHeadSize/p),y:Math.ceil(o.sequenceLength/p),z:o.batchSize*o.numHeads},g=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:u},{type:12,data:i},{type:12,data:o.kvSequenceLength}],h=l&&t&&k.size(t.dims)>0,v=["type","type"];h&&v.push("type");let T=[{dims:c,dataType:e.dataType,gpuDataType:0}];l&&T.push({dims:f,dataType:e.dataType,gpuDataType:0});let w=_=>{let $=L("probs",e.dataType,e.dims),P=L("v",n.dataType,n.dims),E=[$,P];h&&E.push(L("past_value",t.dataType,t.dims));let N=[F("output",e.dataType,c)];l&&N.push(F("present_value",e.dataType,f));let H=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${p}u;
  var<workgroup> tileQ: array<${$.type.value}, ${p*p}>;
  var<workgroup> tileK: array<${$.type.value}, ${p*p}>;
  ${_.registerUniforms(H).declareVariables(...E,...N)}
  ${_.mainStart([p,p,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>h&&l?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${l?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${$.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>h&&l?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `)()}
        ${l?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:v},getRunData:()=>({outputs:T,dispatchGroup:b,programUniforms:g}),getShaderSource:w}},Sn=(r,e,n,t,o,i,s,a,u,l,f)=>{let c=Math.min(r.outputCount,1+(s?1:0)+(a?1:0)),p=l.kvNumHeads!==void 0||c>1?l.pastSequenceLength:0,b=p+l.kvSequenceLength,g=u&&k.size(u.dims)>0?u:void 0,h=[e,n];l.kvNumHeads===void 0&&c>1&&s&&k.size(s.dims)>0&&h.push(s),g&&h.push(g);let v=r.compute(V2(c,e,n,s,g,l,f,p),{inputs:h,outputs:l.kvNumHeads===void 0&&c>1?[-1,1]:[-1]})[0];r.compute(F2(v,l.batchSize*l.numHeads*l.sequenceLength,b),{inputs:[v],outputs:[]});let T=[v,t];l.kvNumHeads===void 0&&c>1&&a&&k.size(a.dims)>0&&T.push(a),r.compute(G2(c,v,t,a,l,p),{inputs:T,outputs:l.kvNumHeads===void 0&&c>1?[0,2]:[0]})},U2=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],f=c=>{let p=F("output_q",u[0].dataType,n),b=F("output_k",u[0].dataType,n),g=F("output_v",u[0].dataType,n),h=L("input",u[0].dataType,u[0].dims),v=L("weight",u[1].dataType,u[1].dims),T=L("bias",u[2].dataType,u[2].dims),w=h.type.storage,_=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${c.registerUniforms(_).declareVariables(h,v,T,p,b,g)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:f},{inputs:u,outputs:[-1,-1,-1]})},_g=(r,e)=>{let n=M2(r.inputs,e),[t,o,i]=U2(r,n);return Sn(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n,e)}});var W2,H2,q2,Ig,Sg=C(()=>{"use strict";mt();ue();ge();Xe();be();W2=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},H2=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,s=t?Me(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=k.size(i)/s,l=t,f=l?i.length:i,c=L("x",r[0].dataType,r[0].dims,s),p=L("scale",r[1].dataType,r[1].dims,a),b=L("bias",r[2].dataType,r[2].dims,a),g=L("inputMean",r[3].dataType,r[3].dims,a),h=L("inputVar",r[4].dataType,r[4].dims,a),v=F("y",r[0].dataType,f,s),T=()=>{let _="";if(t)_=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")_=`
            ${v.indicesSet("outputIndices","0","0")}
            let cOffset = ${v.indicesToOffset("outputIndices")};`;else{_=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<p.rank;$++)_+=`cIndices[${$}] = outputIndices[${$}];`;_+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return _},w=_=>`
  const epsilon = ${n};
  ${_.registerUniform("outputSize","u32").declareVariables(c,p,b,g,h,v)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${v.offsetToIndices(`global_idx * ${s}`)};
    ${T()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${v.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...G(i)]:[{type:12,data:u}]})}},q2=r=>le(r),Ig=(r,e)=>{let{inputs:n,outputCount:t}=r,o=q2({...e,outputCount:t});if(ce.webgpu.validateInputContent&&W2(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(H2(n,o))}});var j2,K2,$g,Ag=C(()=>{"use strict";ge();be();j2=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},K2=r=>{let e=r[0].dims,n=r[0].dims[2],t=k.size(e)/4,o=r[0].dataType,i=L("input",o,e,4),s=L("bias",o,[n],4),a=L("residual",o,e,4),u=F("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(i,s,a,u)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},$g=r=>{j2(r.inputs),r.compute(K2(r.inputs))}});var X2,De,Pg,Og,Eg,Cg,kg,Dg,Bg,Lg,Rg,Z2,zg,Ng,Mg,Fg,Yn,Vg,Ni,Gg,Ug,Wg,Hg,qg,jg,Kg,Xg,Zg,Yg,Jg,Qg,eb,tb,rb,nb,ob,ib,tu,ru,ab,sb,ub,Y2,J2,lb,Mi=C(()=>{"use strict";ue();ge();Xe();be();X2=(r,e,n,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=L("inputData",n,[a],4),f=F("outputData",t,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${r.registerUniforms(c).declareVariables(l,f)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",u)}
  }`},De=(r,e,n,t,o,i=r.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(k.size(r.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>X2(l,k.size(r.dims),r.dataType,i,n,t,a),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(l[0].dims)/64/4)},programUniforms:u})}},Pg=r=>{r.compute(De(r.inputs[0],"Abs","abs"))},Og=r=>{r.compute(De(r.inputs[0],"Acos","acos"))},Eg=r=>{r.compute(De(r.inputs[0],"Acosh","acosh"))},Cg=r=>{r.compute(De(r.inputs[0],"Asin","asin"))},kg=r=>{r.compute(De(r.inputs[0],"Asinh","asinh"))},Dg=r=>{r.compute(De(r.inputs[0],"Atan","atan"))},Bg=r=>{r.compute(De(r.inputs[0],"Atanh","atanh"))},Lg=r=>le(r),Rg=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(De(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},Z2=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return le({min:e,max:n})},zg=(r,e)=>{let n=e||Z2(r.inputs),t=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Ng=r=>{r.compute(De(r.inputs[0],"Ceil","ceil"))},Mg=r=>{r.compute(De(r.inputs[0],"Cos","cos"))},Fg=r=>{r.compute(De(r.inputs[0],"Cosh","cosh"))},Yn=r=>le(r),Vg=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Ni=(r="f32")=>`
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
}`,Gg=r=>{let e=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Ni(e)))},Ug=r=>{r.compute(De(r.inputs[0],"Exp","exp"))},Wg=r=>{r.compute(De(r.inputs[0],"Floor","floor"))},Hg=r=>{let e=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Ni(e)))},qg=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},jg=r=>{r.compute(De(r.inputs[0],"Not",e=>`!${e}`))},Kg=r=>{r.compute(De(r.inputs[0],"Neg",e=>`-${e}`))},Xg=r=>{r.compute(De(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Zg=r=>{let e=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},Yg=r=>{r.compute(De(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},Jg=r=>le(r),Qg=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},eb=r=>{r.compute(De(r.inputs[0],"Sin","sin"))},tb=r=>{r.compute(De(r.inputs[0],"Sinh","sinh"))},rb=r=>{r.compute(De(r.inputs[0],"Sqrt","sqrt"))},nb=r=>{r.compute(De(r.inputs[0],"Tan","tan"))},ob=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,ib=r=>{r.compute(De(r.inputs[0],"Tanh",ob))},tu=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${ob("v")};
}
`,ru=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,ab=r=>{let e=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"FastGelu",ru,tu(e),void 0,r.inputs[0].dataType))},sb=(r,e)=>{let n=it(r.inputs[0].dataType);return r.compute(De(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},ub=r=>{r.compute(De(r.inputs[0],"Log","log"))},Y2=(r,e)=>`
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
`,J2=r=>`quick_gelu_impl(${r})`,lb=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(De(r.inputs[0],"QuickGelu",J2,Y2(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var Q2,e1,fb,db=C(()=>{"use strict";ge();be();Mi();Q2=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},e1=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=L("input",r[0].dataType,r[0].dims,4),t=L("bias",r[0].dataType,[r[0].dims[2]],4),o=F("output",r[0].dataType,e,4),i=k.size(e)/4,s=ke(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Ni(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},fb=r=>{Q2(r.inputs),r.compute(e1(r.inputs))}});var t1,r1,lr,pb,mb,hb,gb,bb,yb,xb,wb,vb,Tb,_b=C(()=>{"use strict";ue();ge();be();t1=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p,b;typeof a=="string"?p=b=(w,_)=>`${a}((${w}),(${_}))`:typeof a=="function"?p=b=a:(p=a.scalar,b=a.vector);let g=F("outputData",f,t.length,4),h=L("aData",u,e.length,4),v=L("bData",l,n.length,4),T;if(o)if(i){let w=k.size(e)===1,_=k.size(n)===1,$=e.length>0&&e[e.length-1]%4===0,P=n.length>0&&n[n.length-1]%4===0;w||_?T=g.setByOffset("global_idx",b(w?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),_?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"))):T=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${v.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",b(s||$?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||P?v.getByOffset("offsetB / 4u"):`${v.type.value}(${v.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else T=g.setByOffset("global_idx",b(h.getByOffset("global_idx"),v.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(_,$,P="")=>{let E=`aData[indexA${$}][componentA${$}]`,B=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${g.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let offsetB${$} = ${v.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${_}[${$}] = ${P}(${p(E,B)});
          `};f===9?T=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:T=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(h,v,g)}

        ${c??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${T}
      }`},r1=(r,e,n,t,o,i,s=n.dataType)=>{let a=!k.areEqual(n.dims,t.dims),u=n.dims,l=k.size(n.dims),f=!1,c=!1,p=[a];if(a){let b=or.calcShape(n.dims,t.dims,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");u=b,l=k.size(u);let g=k.size(n.dims)===1,h=k.size(t.dims)===1,v=n.dims.length>0&&n.dims[n.dims.length-1]%4===0,T=t.dims.length>0&&t.dims[t.dims.length-1]%4===0;p.push(g),p.push(h),p.push(v),p.push(T);let w=1;for(let _=1;_<u.length;_++){let $=n.dims[n.dims.length-_]??1,P=t.dims[t.dims.length-_]??1;if($===P)w*=$;else break}w%4===0?(c=!0,f=!0):(g||h||v||T)&&(f=!0)}else f=!0;return p.push(f),{name:r,shaderCache:{hint:e+p.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>t1(b,n.dims,t.dims,u,f,a,c,o,n.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(u)/4)},...G(n.dims,t.dims,u)]})}},lr=(r,e,n,t,o,i)=>{r.compute(r1(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},pb=r=>{lr(r,"Add",(e,n)=>`${e}+${n}`)},mb=r=>{lr(r,"Div",(e,n)=>`${e}/${n}`)},hb=r=>{lr(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},gb=r=>{lr(r,"Mul",(e,n)=>`${e}*${n}`)},bb=r=>{let e=L("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;lr(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},yb=r=>{lr(r,"Sub",(e,n)=>`${e}-${n}`)},xb=r=>{lr(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},wb=r=>{lr(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},vb=r=>{lr(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Tb=r=>{lr(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var o1,i1,a1,s1,Ib,Sb,$b=C(()=>{"use strict";ue();ge();Xe();be();o1=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},i1=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,a1=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},s1=(r,e,n,t)=>{let o=k.size(n),i=new Array(r.length),s=new Array(r.length),a=0,u=[],l=[],f=[{type:12,data:o}];for(let h=0;h<r.length;++h)a+=r[h].dims[e],i[h]=a,l.push(r[h].dims.length),s[h]=L(`input${h}`,t,l[h]),u.push("rank"),f.push({type:12,data:i[h]});for(let h=0;h<r.length;++h)f.push(...G(r[h].dims));f.push(...G(n));let c=F("output",t,n.length),p=c.indicesGet("indices",e),b=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),g=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let v=0;v<r.length;v++)h.registerUniform(`sizeInConcatAxis${v}`,"u32");return h.declareVariables(...s,c)})()}

  ${i1(i.length,b)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${a1(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:g}},Ib=(r,e)=>{let n=r.inputs,t=n[0].dims,o=k.normalizeAxis(e.axis,t.length);o1(n,o);let i=t.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>k.size(a.dims)>0);r.compute(s1(s,o,i,n[0].dataType),{inputs:s})},Sb=r=>le({axis:r.axis})});var At,Pt,Ot,Fi,gr=C(()=>{"use strict";ue();ge();At=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},Pt=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},Ot=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Fi=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[qh,jh];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var ct,Vi,Jn=C(()=>{"use strict";ct=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Vi=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Gi,nu=C(()=>{"use strict";Gi=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var u1,l1,Qn,Ab,c1,eo,f1,Ui,to=C(()=>{"use strict";ue();ge();be();gr();Jn();u1=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,l1=(r,e)=>r?`
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
        }`,Qn=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32)=>{let u=e[1]*r[1],l=e[0]*r[0],f=o?u:i,c=o?i:u,p=f/e[0],b=i/e[1];if(!((o&&p===4&&r[1]===4||!o&&(p===3||p===4))&&f%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${r[1]} must be 4.
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
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${u1(o,t)}
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
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${l1(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ab=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,c1=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",eo=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=r[1]*e[1],f=r[0]*e[0],c=o?l:i,p=o?i:l;if(!(p%e[1]===0&&c%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let b=p/e[1],g=c/e[0],h=i/e[1],v=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          ${Ab(o,t)}
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

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ab(o,t)}
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
      ${c1(o)}
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
`},f1=(r,e,n,t,o,i=!1)=>{let[s,a,u]=o,[l,f,c,p]=t,b=In(s,u),g=In(a,u),h=ke(t[0].type.tensor),v=()=>{let _=f.rank,$=l.rank,P=`var aIndices: ${f.type.indices};`;for(let E=_-2-1,B=$-1;E>=0;E--,B--)P+=`
aIndices[${E}] = ${$>1?`batchIndices[${B}]`:"batchIndices"};`;return b.forEach(E=>{P+=`
aIndices[${E}] = 0;`}),P+=`
aIndices[${_-2}] = u32(row);
                   aIndices[${_-1}] = u32(colIn);`,P},T=()=>{let _=c.rank,$=l.rank,P=`var bIndices: ${c.type.indices};`;for(let E=_-2-1,B=$-1;E>=0;E--,B--)P+=`
bIndices[${E}] = ${$>1?`batchIndices[${B}]`:"batchIndices"};`;return g.forEach(E=>{P+=`
bIndices[${E}] = 0;`}),P+=`
bIndices[${_-2}] = u32(row);
                   bIndices[${_-1}] = u32(colIn);`,P};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${ct(r,h)} {
      var value = ${ct(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${v()}
        value = ${f.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${ct(r,h)} {
      var value = ${ct(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${T()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ct(r,h)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${i?"bias[colIn]":`${ct(r,h)}(bias[row])`};`:""}
        ${n}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ui=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),f=t?t.slice(0,-2):n.slice(0,-2),c=k.size(f),p=s[s.length-2],b=s[s.length-1],g=a[a.length-1],h=b%4===0&&g%4===0,v=p<=8?[4,1,1]:[4,4,1],T=[8,8,1],w=[Math.ceil(g/T[0]/v[0]),Math.ceil(p/T[1]/v[1]),Math.ceil(c/T[2]/v[2])],_=h?4:1,$=[...u,p,b/_],P=$.length,E=[...l,b,g/_],B=E.length,N=[c,p,g/_],H=[{type:6,data:p},{type:6,data:g},{type:6,data:b}];Pt(e,H),H.push(...G(f,$,E));let q=["rank","rank"],V=r.length>2;V&&(H.push(...G(r[2].dims)),q.push("rank")),H.push(...G(N));let se=fe=>{let ye=f.length,ve=Bi("batchDims",r[0].dataType,ye,1),oe=ke(r[0].dataType),Te=L("a",r[0].dataType,P,_),Ie=L("b",r[1].dataType,B,_),te=F("result",r[0].dataType,N.length,_),we=[Te,Ie];if(V){let Y=o?_:1;we.push(L("bias",r[2].dataType,r[2].dims.length,Y))}let pe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ot(e,pe);let me=ke(te.type.tensor),he=At(e,te.type.value,me),U=f1(_,V,he,[ve,Te,Ie,te],[u,l,f],o);return`
  ${fe.registerUniforms(pe).registerInternalVariables(ve).declareVariables(...we,te)}
  ${U}
  ${h?Qn(v,T,oe,ve):eo(v,T,oe,ve)}
                   `};return{name:"MatMul",shaderCache:{hint:`${v};${e.activation};${h};${o}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:H}),getShaderSource:se}}});var d1,Pb,Ob=C(()=>{"use strict";ue();jt();be();gr();Jn();nu();to();d1=(r,e,n,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let f=q=>{switch(q){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},c=q=>{switch(q){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},p=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=r?`
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
    `,g=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",v=r?"row":"col",T=r?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${v} / outWidth;
    let outCol = ${v} % outWidth;

    let WRow = ${T} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${T} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${T} % inChannels;
    var resData = ${ct(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,_=r?e&&t?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${ct(s,l)}(0.0);`:t&&n?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${ct(s,l)}(0.0);`,$=`${c(a)}`,P=ct(u,l),E=r?ct(s,l):ct(a,l),B=r?ct(a,l):ct(s,l),N=At(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${r?_:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${B} {
      ${r?$:_}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${Vi(o)}
      ${N}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Pb=(r,e,n,t,o,i,s,a,u)=>{let l=e.format==="NHWC",f=l?r[0].dims[3]:r[0].dims[1],c=n[0],p=l?n[2]:n[3],b=l?n[1]:n[2],g=l?n[3]:n[1],h=l&&(f%4===0||f%3===0)&&g%4===0,v=l?g:p*b,T=l?p*b:g,w=[8,8,1],_=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(v/w[0]/_[0]),Math.ceil(T/w[1]/_[1]),Math.ceil(c/w[2]/_[2])];$e("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let P=h?l&&f%4!==0?3:4:1,E=w[1]*_[1],B=w[0]*_[0],N=Math.max(w[0]*P,w[1]),H=t%E===0,q=o%B===0,V=i%N===0,se=h?[P,4,4]:[1,1,1],fe=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Pt(e,fe),fe.push(...G(r[0].dims,r[1].dims));let ye=["rank","rank"];s&&(fe.push(...G(r[2].dims)),ye.push("rank")),fe.push(...G(n));let ve=oe=>{let Te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ot(e,Te);let Ie=h?4:1,te=ke(r[0].dataType),we=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${te}>`:te}) {
        result[flatIndex] = ${h?`vec4<${te}>`:te}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${te}>`:te}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,pe=L("x",r[0].dataType,r[0].dims.length,P===3?1:P),me=L("w",r[1].dataType,r[1].dims.length,Ie),he=[pe,me],U=F("result",r[0].dataType,n.length,Ie);if(s){let Y=L("bias",r[2].dataType,r[2].dims.length,Ie);he.push(Y),we+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${te}>`:te} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Gi("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${oe.registerUniforms(Te).declareVariables(...he,U)}
        ${we}
        ${d1(l,H,q,V,s,e,se[0],se[1],se[2],te)}
        ${h?Qn(_,w,te,void 0,!l,N):eo(_,w,te,void 0,!l,N,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${h};${H};${q};${V};${E};${B};${N}`,inputDependencies:ye},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:fe}),getShaderSource:ve}}});var p1,Eb,Wi,m1,Cb,h1,kb,Db,Bb=C(()=>{"use strict";ue();jt();ge();be();gr();Jn();p1=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Eb=r=>typeof r=="number"?[r,r,r]:r,Wi=(r,e)=>e<=1?r:r+(r-1)*(e-1),m1=(r,e,n,t=1)=>{let o=Wi(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},Cb=(r,e,n,t,o)=>{o==null&&(o=m1(r,e[0],t[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)r[s]+2*o>=e[s]&&(i[s]=Math.trunc((r[s]-e[s]+2*o)/t[s]+1));return i},h1=(r,e,n,t,o,i,s,a,u,l)=>{let f,c,p,b;if(r==="VALID"&&(r=0),typeof r=="number"){f={top:r,bottom:r,left:r,right:r,front:r,back:r};let g=Cb([e,n,t,1],[a,u,l],1,[o,i,s],r);c=g[0],p=g[1],b=g[2]}else if(Array.isArray(r)){if(!r.every((h,v,T)=>h===T[0]))throw Error(`Unsupported padding parameter: ${r}`);f={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let g=Cb([e,n,t,1],[a,u,l],1,[o,i,s],r[0]);c=g[0],p=g[1],b=g[2]}else if(r==="SAME_UPPER"){c=Math.ceil(e/o),p=Math.ceil(n/i),b=Math.ceil(t/s);let g=(c-1)*o+a-e,h=(p-1)*i+u-n,v=(b-1)*s+l-t,T=Math.floor(g/2),w=g-T,_=Math.floor(h/2),$=h-_,P=Math.floor(v/2),E=v-P;f={top:_,bottom:$,left:P,right:E,front:T,back:w}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:f,outDepth:c,outHeight:p,outWidth:b}},kb=(r,e,n,t,o,i=!1,s="channelsLast")=>{let a,u,l,f,c;if(s==="channelsLast")[a,u,l,f,c]=r;else if(s==="channelsFirst")[a,c,u,l,f]=r;else throw new Error(`Unknown dataFormat ${s}`);let[p,,b,g,h]=e,[v,T,w]=Eb(n),[_,$,P]=Eb(t),E=Wi(b,_),B=Wi(g,$),N=Wi(h,P),{padInfo:H,outDepth:q,outHeight:V,outWidth:se}=h1(o,u,l,f,v,T,w,E,B,N),fe=i?p*c:p,ye=[0,0,0,0,0];return s==="channelsFirst"?ye=[a,fe,q,V,se]:s==="channelsLast"&&(ye=[a,q,V,se,fe]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:f,inChannels:c,outDepth:q,outHeight:V,outWidth:se,outChannels:fe,padInfo:H,strideDepth:v,strideHeight:T,strideWidth:w,filterDepth:b,filterHeight:g,filterWidth:h,effectiveFilterDepth:E,effectiveFilterHeight:B,effectiveFilterWidth:N,dilationDepth:_,dilationHeight:$,dilationWidth:P,inShape:r,outShape:ye,filterShape:e}},Db=(r,e,n,t,o,i)=>{let s=i==="channelsLast",a=s?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],f={x:n.map((w,_)=>_)},c=[Math.ceil(p1(f.x.map(w=>n[w]))/l[0]),1,1];$e("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,b=k.size(n),g=[{type:12,data:b},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Pt(e,g),g.push(...G(r[0].dims,r[1].dims));let h=["rank","rank"],v=r.length===3;v&&(g.push(...G(r[2].dims)),h.push("rank")),g.push(...G(n));let T=w=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Ot(e,_);let $=u?4:1,P=ke(r[0].dataType),E=L("x",r[0].dataType,r[0].dims.length,p===3?1:p),B=L("W",r[1].dataType,r[1].dims.length,$),N=[E,B],H=F("result",r[0].dataType,n.length,$),q="";if(v){let fe=L("bias",r[2].dataType,r[2].dims.length,$);N.push(fe),q+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${s?J("coords",4,5):J("coords",1,5)}${u?"/ 4":""}];
        }`}let V=ct(p,P),se=At(e,V,P);return`
            ${q}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${B.getByIndices("aIndices")};
            }
          ${w.registerUniforms(_).declareVariables(...N,H)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${H.offsetToIndices("global_idx")};
              let batch = ${J("coords",0,E.rank)};
              let d2 = ${s?J("coords",E.rank-1,E.rank):J("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${s?J("coords",1,E.rank):J("coords",2,E.rank)},
              ${s?J("coords",2,E.rank):J("coords",3,E.rank)},
              ${s?J("coords",3,E.rank):J("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?J("uniforms.x_shape",1,E.rank):J("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${s?J("uniforms.x_shape",2,E.rank):J("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${s?J("uniforms.x_shape",3,E.rank):J("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${s?J("uniforms.x_shape",4,E.rank):J("uniforms.x_shape",1,E.rank)};
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
              ${se}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${p};${v}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:g}),getShaderSource:T}}});var Lb,Rb,zb=C(()=>{"use strict";ue();ge();be();gr();Lb=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",s=r[0].dims,a=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],f=l/e.group,c=u&&f>=4?Me(l):1,p=k.size(n)/c,b=[{type:12,data:p},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:f}];Pt(e,b),b.push(...G(s,[a[0],a[1],a[2],a[3]/c]));let g=o?["rank","rank","rank"]:["rank","rank"];b.push(...G([n[0],n[1],n[2],n[3]/c]));let h=v=>{let T=F("output",r[0].dataType,n.length,c),w=ke(T.type.tensor),_=At(e,T.type.value,w),$=L("x",r[0].dataType,s.length),P=L("w",r[1].dataType,a.length,c),E=[$,P];o&&E.push(L("b",r[2].dataType,r[2].dims,c));let B=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ot(e,B);let N=u?`
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
            let wVal = ${P.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${P.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${v.registerUniforms(B).declareVariables(...E,T)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${T.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${T.type.value} = ${T.type.value}(0);
    ${N}
    ${i}
    ${_}
    ${T.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:b}),getShaderSource:h}},Rb=(r,e,n,t)=>{let o=r.length>2,i=Me(n[3]),s=Me(n[2]),a=k.size(n)/i/s,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],f=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Pt(e,c),c.push(...G(u,l,f));let p=(s-1)*e.strides[1]+l[1],b=g=>{let h=F("output",r[0].dataType,f.length,i),v=ke(h.type.tensor),T=At(e,h.type.value,v),w=L("x",r[0].dataType,u.length,i),_=L("w",r[1].dataType,l.length,i),$=[w,_];o&&$.push(L("b",r[2].dataType,r[2].dims,i));let P=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ot(e,E),`
  ${g.registerUniforms(E).declareVariables(...$,h)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${p}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${_.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${P}
      ${T}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${p};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:b}}});var ou,g1,Nb,iu=C(()=>{"use strict";ue();ge();to();be();gr();ou=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s[s.length-2],l=a[a.length-1],f=s[s.length-1],c=Me(l),p=Me(f),b=Me(u),g=k.size(n)/c/b,h=r.length>2,v=t?t.slice(0,-2):n.slice(0,-2),w=[k.size(v),u,l],_=[{type:12,data:g},{type:12,data:u},{type:12,data:l},{type:12,data:f}];Pt(e,_),_.push(...G(v,s,a)),h&&_.push(...G(r[2].dims)),_.push(...G(w));let $=P=>{let E=Bi("batch_dims",r[0].dataType,v.length),B=L("a",r[0].dataType,s.length,p),N=L("b",r[1].dataType,a.length,c),H=F("output",r[0].dataType,w.length,c),q=ke(H.type.tensor),V=At(e,H.type.value,q),se=[B,N],fe="";if(h){let pe=o?c:1;se.push(L("bias",r[2].dataType,r[2].dims.length,pe)),fe=`${o?`value += bias[col / ${pe}];`:`value += ${H.type.value}(bias[row + i]);`}`}let ye=s.slice(0,-2),ve=a.slice(0,-2),oe=In(ye,v),Te=In(ve,v),Ie=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ot(e,Ie);let te=(pe,me)=>{let he=pe.rank,U=pe.name;if(he===2)return`var ${U}_indices = ${pe.type.indices}(0u, 0u);`;let Y=E.rank,Be=`var ${U}_indices: ${pe.type.indices};`;for(let yt=he-2-1,We=Y-1;yt>=0;yt--,We--)Be+=`
${U}_indices[${yt}] = ${Y>1?`batch_indices[${We}]`:"batch_indices"};`;return me.forEach(yt=>{Be+=`
${U}_indices[${yt}] = 0;`}),Be+=`${U}_indices[${he-2}] = 0u;
                     ${U}_indices[${he-1}] = 0u;`,Be},we=()=>{let pe=`var a_data: ${B.type.value};`;for(let me=0;me<p;me++)pe+=`
              let b_data${me} = b[(b_offset + (k + ${me}) * uniforms.N + col) / ${c}];`;for(let me=0;me<b;me++){pe+=`a_data = a[(a_offset + (row + ${me}) * uniforms.K + k) / ${p}];`;for(let he=0;he<p;he++)pe+=`
            values[${me}] = fma(${N.type.value}(a_data${p===1?"":`[${he}]`}), b_data${he}, values[${me}]);
`}return pe};return`
  ${P.registerUniforms(Ie).registerInternalVariables(E).declareVariables(...se,H)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}
    ${te(B,oe)}
    let a_offset = ${B.indicesToOffset("a_indices")};
    ${te(N,Te)}
    let b_offset = ${N.indicesToOffset("b_indices")};
    var values: array<${H.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${we()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${fe}
      ${V}
      let cur_indices = ${H.type.indices}(batch, row + i, col);
      let offset = ${H.indicesToOffset("cur_indices")};
      ${H.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${c};${p};${b};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:$}},g1=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},Nb=r=>{g1(r.inputs);let e=or.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];n<8&&t<8?r.compute(ou(r.inputs,{activation:""},e)):r.compute(Ui(r.inputs,{activation:""},e))}});var b1,au,y1,su,uu,Mb,x1,w1,lu,Fb=C(()=>{"use strict";ge();Ob();Bb();to();zb();gr();iu();hr();b1=(r,e,n,t,o,i)=>{let s=r[0],a=r.slice(i?1:2,i?3:4),u=a.length,l=e[0],c=e.slice(2).map((g,h)=>g+(g-1)*(n[h]-1)),b=a.map((g,h)=>g+t[h]+t[h+u]).map((g,h)=>Math.floor((g-c[h]+o[h])/o[h]));return b.splice(0,0,s),b.splice(i?3:1,0,l),b},au=[2,3,1,0],y1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},su=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Zr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},uu=r=>{let e=Fi(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,s=r.kernel_shape,a=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Mb=(r,e,n,t)=>{let o=n.format==="NHWC",i=b1(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[e[0]];if(o){let N=r.kernelCustomData.wT??r.compute(at(e[1],au),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=N),E.push(N)}else E.push(e[1]);e.length===3&&E.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Rb(E,n,i,t),{inputs:E}):r.compute(Lb(E,n,i,t),{inputs:E});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],f=e[1].dims[2],c=e[1].dims[3],p=i[o?1:2],b=i[o?2:3],g=i[o?3:1],h=o&&f===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(h||f===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=i[0],B,N,H,q=[];if(o){let fe=r.kernelCustomData.wT??r.compute(at(e[1],au),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=fe),h){let ye=a*u*l;B=e[0].reshape([1,E,ye]),N=fe.reshape([1,ye,g]),H=[1,E,g]}else B=e[0].reshape([E,a*u,l]),N=fe.reshape([1,l,g]),H=[E,p*b,g];q.push(B),q.push(N)}else B=e[0].reshape([E,l,a*u]),N=e[1].reshape([1,g,l]),H=[E,g,p*b],q.push(N),q.push(B);s&&q.push(e[2]);let V=H[2],se=q[0].dims[q[0].dims.length-1];V<8&&se<8?r.compute(ou(q,n,i,H,o,t),{inputs:q}):r.compute(Ui(q,n,i,H,o,t),{inputs:q});return}let v=!0,T=r.kernelCustomData.wT??r.compute(at(e[1],au),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=T);let w=[e[0],T];s&&w.push(e[2]);let _=o?p*b:g,$=o?g:p*b,P=f*c*l;r.compute(Pb(w,n,i,_,$,P,s,v,t),{inputs:w})},x1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=su({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);Mb(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},w1=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=su(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=kb(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Db(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},lu=(r,e)=>{if(y1(r.inputs,e),r.inputs[0].dims.length===3)x1(r,e);else if(r.inputs[0].dims.length===5)w1(r,r.inputs,e);else{let n=su(e,r.inputs);Mb(r,r.inputs,n)}}});var v1,Vb,Gb=C(()=>{"use strict";ue();jt();be();gr();Jn();nu();to();v1=(r,e=!1,n,t,o=4)=>{let i=T=>{switch(T){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${t}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${T} is not supported.`)}},s=r?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=r?`
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
    `,u=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",l=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",f=r?"row":"col",c=r?"col":"row",p=`
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${f} / outWidth;
      let outCol = ${f} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${t}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${l}) || fract(xC) > 0.0) {
        return ${t}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,b=r?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${t}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${t}(0.0);`,g=`
      let col = colIn * ${o};
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${r?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${t}(0.0);
      `,h=At(n,t);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?b:g}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?g:b}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${t}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Vi(e)}
      ${h}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Vb=(r,e,n,t,o,i,s,a)=>{let u=e.format==="NHWC",l=u?r[0].dims[3]:r[0].dims[1],f=n[0],c=u?n[2]:n[3],p=u?n[1]:n[2],b=u?n[3]:n[1],g=u&&l%4===0&&l%3&&b%4===0,h=u?b:c*p,v=u?c*p:b,T=[8,8,1],w=t<=8?[4,1,1]:[4,4,1],_=[Math.ceil(h/T[0]/w[0]),Math.ceil(v/T[1]/w[1]),Math.ceil(f/T[2]/w[2])];$e("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${_}`);let $=g?4:1,P=Math.max(T[0]*$,T[1]),E=g?4:1,B=[e.kernelShape[u?1:2],e.kernelShape[u?2:3]],N=[B[0]+(e.dilations[0]<=1?0:(B[0]-1)*(e.dilations[0]-1)),B[1]+(e.dilations[1]<=1?0:(B[1]-1)*(e.dilations[1]-1))],H=[N[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),N[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],q=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:e.strides},{type:6,data:e.dilations},{type:6,data:B},{type:6,data:H}];Pt(e,q),q.push(...G(r[0].dims,r[1].dims));let V=["rank","rank"];s&&(q.push(...G(r[2].dims)),V.push("rank")),q.push(...G(n));let se=fe=>{let ye=L("x",r[0].dataType,r[0].dims.length,E),ve=L("w",r[1].dataType,r[1].dims.length,1),oe=F("result",r[0].dataType,n.length,E),Te=[ye,ve],Ie="";if(s){let pe=L("bias",r[2].dataType,r[2].dims.length,E);Te.push(pe),Ie+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${pe.type.value} {
            return bias[coords.${u?"w":"y"}${g?"/ 4":""}];
          }`}let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:B.length},{name:"pads",type:"i32",length:H.length}];Ot(e,te);let we=ke(r[0].dataType,1);if(we!=="f16"&&we!=="f32")throw new Error(`elemType ${we} is not supported.`);return`
        ${Gi("uniforms.result_strides")}
        ${fe.registerUniforms(te).declareVariables(...Te,oe)};
        ${Ie}
        ${v1(u,s,e,ye.type.value,$)}
        ${g?Qn(w,T,we,void 0,!u,P):eo(w,T,we,void 0,!u,P,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${e.cacheKey};${w};${T};${g}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:q}),getShaderSource:se}}});var T1,cu,Ub=C(()=>{"use strict";ue();jt();ge();be();T1=(r,e,n,t,o,i=!1,s,a,u=!1)=>{let l=u?1:2,f=u?2:3,c=u?3:1,p=i?2:1,b=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;t&&(b+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let g=i?4:1,h=L("W",e[1].dataType,e[1].dims.length,g),v=L("Dy",e[0].dataType,e[0].dims.length,g),T=[v,h];t&&T.push(L("bias",e[2].dataType,[n[c]].length,g));let w=F("result",e[0].dataType,n.length,g),_=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${p}>;
        for (var i = 0; i < ${p}; i++) {
          dotProd[i] = vec4<${s}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${s}(dyCorner.x) + ${s}(wR)) / ${s}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${s}(dyCorner.y) + ${s}(wC)) / ${s}(uniforms.strides.y);
            let dyC2 = (${s}(dyCorner.y) + 1.0 + ${s}(wC)) / ${s}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${v.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${v.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${c}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${v.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${v.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${p}; i = i + 1) {
          let value = dotProd[i] + ${t?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${w.set("batch","r","c + i","d1","value")};
        }
      }`,$=`
          let outputIndices = ${w.offsetToIndices("global_idx")};
          let batch = ${w.indicesGet("outputIndices",0)};
          let d1 = ${w.indicesGet("outputIndices",c)};
          let r = ${w.indicesGet("outputIndices",l)};
          let c = ${w.indicesGet("outputIndices",f)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${s}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${l}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${f}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?v.get("batch","idyR","idyC","inputChannel"):v.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${h.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${t?"bias[d1]":`${s}(0.0)`};
          ${w.setByOffset("global_idx","value")};
        `;return`
  ${r.registerUniforms(a).declareVariables(...T,w)}
  ${b}

    ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?_:$}}`},cu=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=k.size(o),s=[Math.ceil(i/64),1,1];$e("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=e.format==="NHWC",u=["rank","rank"],l=[e.strides[0],e.strides[1]],f=[e.kernelShape[a?1:2],e.kernelShape[a?2:3]],c=[e.dilations[0],e.dilations[1]],p=[f[0]+(e.dilations[0]<=1?0:(e.kernelShape[a?1:2]-1)*(e.dilations[0]-1)),f[1]+(e.dilations[1]<=1?0:(e.kernelShape[a?2:3]-1)*(e.dilations[1]-1))],b=[p[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),p[1]-1-Math.floor(e.pads[1]+e.pads[3])/2],g=!1,h=e.group,v=r[1].dims,T=v[0]/h,w=v[1],_=[{type:12,data:i},{type:12,data:l},{type:12,data:f},{type:12,data:c},{type:12,data:p},{type:6,data:b},{type:12,data:T},{type:12,data:w},...G(r[0].dims,r[1].dims)];t&&(_.push(...G(r[2].dims)),u.push("rank")),_.push(...G(o));let $=s[1]===1&&s[2]===1,P=E=>{let B=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:f.length},{name:"dilations",type:"u32",length:f.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:b.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],N=ke(r[0].dataType);return`${T1(E,r,o,t,$,g,N,B,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:_}),getShaderSource:P}}});var _1,I1,S1,Wb,Hb,$1,A1,P1,O1,qb,jb=C(()=>{"use strict";Gb();Ub();gr();hr();_1=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,I1=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},S1=(r,e,n,t,o,i,s,a,u,l)=>{let f=r.length-2,c=l.length===0;u.length<f&&u.push(...Array(f-u.length).fill(0));let p=r[0],b=e[a?3:1]*o;for(let g=0,h=r.length-f-(a?1:0);g<f;++g,++h){let v=r[h],T=c?v*s[g]:l[g],w=_1(v,s[g],i[g],e[h],n[g],T);I1(w,t,i,g,g+f),c&&l.push(s[g]*(v-1)+u[g]+(e[h]-1)*n[g]+1-i[g]-i[g+f])}l.splice(0,0,p),l.splice(a?3:1,0,b)},Wb=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<e[1].dims.length;++c)n.push(e[1].dims[c])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),s=r.outputPadding.slice(),a=e[0].dims,u=r.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;u=new Array(c).fill(1)}let l=r.strides.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;l=new Array(c).fill(1)}S1(a,n,u,r.autoPad,r.group,o,l,t,s,i);let f=Object.assign({},r);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),f},Hb=r=>{let e=Fi(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,s=r.kernelShape,a=r.pads,u=r.strides,l=r.wIsConst(),f=r.outputPadding,c=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,outputPadding:f,outputShape:c,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},$1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((f,c)=>f+c,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((f,c)=>f+c,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((f,c)=>f+c,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((f,c)=>f+c,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},A1=[2,3,1,0],P1=(r,e,n)=>{let t=Wb(n,e),o=n.format==="NHWC",i=t.outputShape,s=i[o?3:1],a=e[0].dims[o?3:1];if(t.group!==1||s===1&&a===1){r.compute(cu(e,t));return}let u=i[o?1:2],l=i[o?2:3],f=e[1].dims[2],c=e[1].dims[3],p=o?u*l:s,b=o?s:u*l,g=f*c*a,h=!0,v=r.kernelCustomData.wT??r.compute(at(e[1],A1),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=v);let T=[e[0],v],w=e.length===3;w&&(!o&&e[2].dims.length===1?T.push(e[2].reshape([e[2].dims[0],1,1])):T.push(e[2])),r.compute(Vb(T,t,i,p,b,g,w,h),{inputs:T})},O1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=Wb({...e,pads:a,strides:s,dilations:i,kernelShape:o},t);r.compute(cu(t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},qb=(r,e)=>{$1(r.inputs,e),r.inputs[0].dims.length===3?O1(r,e):P1(r,r.inputs,e)}});var E1,Kb,Xb,Zb=C(()=>{"use strict";ue();ge();Xe();be();E1=(r,e,n,t)=>{let o=k.size(e),i=e.length,s=L("input",r,i),a=F("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=k.normalizeAxis(u,i),f=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,b=J("uniforms.input_shape","uniforms.axis",i),g=t.reverse?p+(t.exclusive?" + 1":""):"0",h=t.reverse?b:p+(t.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...G(e,e)]}),getShaderSource:f}},Kb=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(E1(t,n,o,e),{inputs:[0]})},Xb=r=>{let e=r.exclusive===1,n=r.reverse===1;return le({exclusive:e,reverse:n})}});var C1,k1,D1,Yb,Jb,Qb=C(()=>{"use strict";ue();ge();Xe();be();C1=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},k1=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},D1=(r,e)=>{let n,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,f=e.mode==="DCR";u?([n,t,o,i]=r.dims,s=f?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],a=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],s=f?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],a=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=r.reshape(s),p=c.dims.length,b=r.dataType,g=L("a",b,p),h=F("output",b,p),v=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(g,h)}

  ${k1(a,p,g,h)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:T=>{let w=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],_=k.size(w),$=c.dims,P=k.sortBasedOnPerm($,a);return{outputs:[{dims:w,dataType:T[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...G($,P)]}},getShaderSource:v}},Yb=(r,e)=>{C1(r.inputs),r.compute(D1(r.inputs[0],e))},Jb=r=>le({blocksize:r.blocksize,mode:r.mode,format:r.format})});var fu,Hi,ey,B1,L1,du,pu,ty,R1,ry,ny,oy=C(()=>{"use strict";ue();ge();Xe();be();fu="[a-zA-Z]|\\.\\.\\.",Hi="("+fu+")+",ey="^"+Hi+"$",B1="("+Hi+",)*"+Hi,L1="^"+B1+"$",du=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},pu=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(L1)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(ey)))throw new Error("Invalid LHS term");let f=this.processTerm(a,!0,l,u);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Hi)))throw new Error("Invalid RHS");o.match(RegExp(fu,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(ey))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(fu,"g")),f=new du(o);return l?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let b=i-l.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+b),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<a.length;g++){let h=String.fromCharCode("0".charCodeAt(0)+g);f.addSymbol(h,p+g),this.addSymbol(h,t[u++],o)}}else f.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,t[u++],o)}),f}},ty=r=>r+"_max",R1=(r,e,n,t)=>{let i=r.map(f=>f.length).map((f,c)=>L(`input${c}`,e,f)),s=k.size(t),a=F("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),l=f=>{let c=[],p="var prod = 1.0;",b="var sum = 0.0;",g="sum += prod;",h=[],v=[],T=[],w=[],_=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((P,E)=>{if(n.rhs.symbolToIndices.has(E)){let B=n.rhs.symbolToIndices.get(E)?.[0];B!==void 0&&n.lhs.forEach((N,H)=>{if(P.inputIndices.includes(H)){let q=N.symbolToIndices.get(E);if(q===void 0)throw new Error("Invalid symbol error");q.forEach(V=>{c.push(`${i[H].indicesSet(`input${H}Indices`,V,a.indicesGet("outputIndices",B))}`)})}})}else n.lhs.forEach((B,N)=>{if(P.inputIndices.includes(N)){let H=B.symbolToIndices.get(E);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(q=>{h.push(`${i[N].indicesSet(`input${N}Indices`,q,`${E}`)}`)}),w.push(`prod *= ${i[N].getByIndices(`input${N}Indices`)};`)}}),v.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ty(E)}; ${E}++) {`),T.push("}")});let $=_?[...c,`let sum = ${i.map((P,E)=>P.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,b,...v,...h,p,...w,g,...T];return`
            ${f.registerUniforms(u.map(P=>({name:`${ty(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((P,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let f=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));f.push({type:12,data:s});let c=r.map((p,b)=>[...G(p)]).reduce((p,b)=>p.concat(b),f);return c.push(...G(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:l}},ry=(r,e)=>{let n=new pu(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,s)=>i.dims);r.compute(R1(o,r.inputs[0].dataType,n,t))},ny=r=>{let e=r.equation.replace(/\s+/g,"");return le({equation:e})}});var z1,iy,N1,M1,ay,sy=C(()=>{"use strict";ue();ge();be();z1=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},iy=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},N1=(r,e)=>r.length>e.length?iy(r,e):iy(e,r),M1=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=N1(e,n),o=r[0].dataType,i=o===9?4:1,s=Math.ceil(k.size(t)/i),a=l=>{let f=L("input",o,e.length,i),c=F("output",o,t.length,i),p;if(o===9){let b=(g,h,v="")=>`
          let outputIndices${h} = ${c.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${f.broadcastedIndicesToOffset(`outputIndices${h}`,c)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${g}[${h}] = ${v}(${f.getByOffset(`index${h}`)}[component${h}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",f.getByOffset("inputOffset"))}
      }`;return`
    ${l.registerUniform("vec_size","u32").declareVariables(f,c)}
    ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},u=[{type:12,data:s},...G(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},ay=r=>{z1(r.inputs),r.compute(M1(r.inputs),{inputs:[0]})}});var F1,uy,ly=C(()=>{"use strict";ue();ge();be();Mi();F1=r=>{let e=r[0].dataType,n=k.size(r[0].dims),t=k.size(r[1].dims),o=t%4===0,i=s=>{let a=L("x",e,[1],4),u=L("bias",e,[1],4),l=F("y",e,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${u.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(a,u,l)}

    ${tu(it(e))}

    ${s.mainStart(Yr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",ru("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Yr/4)}})}},uy=r=>{r.inputs.length<2||k.size(r.inputs[1].dims)===0?ab(r):r.compute(F1(r.inputs))}});var V1,G1,cy,fy,dy=C(()=>{"use strict";ue();ge();Xe();be();V1=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},G1=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.axis,o),s=n.slice(0);s.splice(i,1,...t);let a=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(k.size(s)/u),f=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...G(r[0].dims,r[1].dims,s)],c=p=>{let b=L("data",r[0].dataType,r[0].dims.length,u),g=L("inputIndices",r[1].dataType,r[1].dims.length),h=F("output",r[0].dataType,s.length,u),v=w=>{let _=t.length,$=`var indicesIndices${w}  = ${g.type.indices}(0);`;for(let P=0;P<_;P++)$+=`${_>1?`indicesIndices${w}[${P}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${P}]`:`outputIndices${w}`};`;$+=`
          var idx${w} = ${g.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${b.type.indices};
        `;for(let P=0,E=0;P<o;P++)P===i?($+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = u32(idx${w});`,E+=_):($+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${E}]`:`outputIndices${w}`};`,E++);return $},T;if(r[0].dataType===9){let w=(_,$,P="")=>`
          let outputIndices${$} = ${h.offsetToIndices(`outputOffset + ${$}u`)};
          ${v($)};
          let offset${$} = ${b.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${_}[${$}] = ${P}(${b.getByOffset(`index${$}`)}[component${$}]);
        `;T=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else T=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${v("")};
      let value = ${b.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,g,h)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${T}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:c}},cy=r=>le({axis:r.axis}),fy=(r,e)=>{let n=r.inputs;V1(n),r.compute(G1(r.inputs,e))}});var U1,W1,py,my,hy=C(()=>{"use strict";ue();ge();Xe();be();U1=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=k.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],s=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},W1=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.gatherAxis,o),s=k.normalizeAxis(e.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...t);let u=k.size(a),l=r[2].dataType,c=r[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...G(...r.map((g,h)=>g.dims),a)],b=g=>{let h=L("data",r[0].dataType,r[0].dims.length),v=L("inputIndices",r[1].dataType,r[1].dims.length),T=L("scales",r[2].dataType,r[2].dims.length),w=r.length>3?L("zeroPoint",r[3].dataType,r[3].dims.length):void 0,_=F("output",l,a.length),$=[h,v,T];w&&$.push(w);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(P).declareVariables(...$,_)}
        ${g.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${t.length} - 1`)};
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
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${(()=>w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${it(l)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((g,h)=>h!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(g,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:b}},py=(r,e)=>{let n=r.inputs;U1(n,e),r.compute(W1(r.inputs,e))},my=r=>le({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var H1,q1,gy,by,yy=C(()=>{"use strict";ue();ge();Xe();be();H1=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},q1=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,s=r[1].dataType,a=k.normalizeAxis(e.axis,o),u=n[a],l=i.slice(0),f=k.size(l),c=L("input",t,o),p=L("indicesInput",s,i.length),b=F("output",t,l.length),g=[{type:12,data:f},{type:6,data:u},{type:12,data:a}];return g.push(...G(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:T=>`
      ${T.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,b)}
      ${T.mainStart()}
      ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},gy=r=>le({axis:r.axis}),by=(r,e)=>{let n=r.inputs;H1(n),r.compute(q1(r.inputs,e))}});var j1,K1,xy,wy,vy=C(()=>{"use strict";ue();ge();be();j1=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},K1=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,s]=Di.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=k.size(a),l=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],f=["type","type"];r.length===3&&(l.push(...G(r[2].dims)),f.push("rank")),l.push(...G(a));let c=p=>{let b="";e.transA&&e.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let g=e.alpha===1?"":"value *= uniforms.alpha;",h=L("a",r[0].dataType,r[0].dims),v=L("b",r[1].dataType,r[1].dims),T=h.type.value,w=null,_=[h,v];r.length===3&&(w=L("c",r[2].dataType,r[2].dims.length),_.push(w));let $=F("output",r[0].dataType,a.length);_.push($);let P=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms(P).declareVariables(..._)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${T}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${g}
    ${(()=>w!=null?`let cOffset = ${w.broadcastedIndicesToOffset("vec2(m, n)",$)}; value += ${T}(uniforms.beta) * ${w.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c}},xy=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},wy=(r,e)=>{j1(r.inputs),r.compute(K1(r.inputs,e))}});var It,Y1,_y,Ty,J1,ro,Iy,mu=C(()=>{"use strict";ue();ge();Xe();ki();zi();be();hr();It=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,Y1=(r,e)=>{let n=r[0],t=It(r,1),o=It(r,2),i=It(r,3),s=It(r,4),a=It(r,5),u=It(r,6),l=It(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],b=c,g=0,h=0,v=Math.floor(p/e.numHeads);if(u&&l&&k.size(u.dims)&&k.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==e.numHeads||u.dims[3]!==v)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==f||l.dims[1]!==e.numHeads||l.dims[3]!==v)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],h=u.dims[2]}else if(u&&k.size(u.dims)||l&&k.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let T;if(t&&k.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');T=2,b=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');T=5,b=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');T=0,b=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');T=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=g+b,_=0;if(s&&k.size(s.dims)>0){_=8;let B=s.dims;throw B.length===1?B[0]===f?_=1:B[0]===3*f+2&&(_=3):B.length===2&&B[0]===f&&B[1]===w&&(_=5),_===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,P=p;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(s&&k.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&k.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==f||a.dims[1]!==e.numHeads||a.dims[2]!==c||a.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:w,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:p,vHiddenSize:P,headSize:v,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:_,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:T}},_y=r=>le({...r}),Ty=le({perm:[0,2,1,3]}),J1=(r,e,n,t,o,i,s)=>{let a=[t,o,i],u=k.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],f=c=>{let p=F("qkv_with_bias",e.dataType,a),b=L("qkv",e.dataType,a),g=L("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(h).declareVariables(b,g,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:f},{inputs:[e,n],outputs:[-1]})[0]},ro=(r,e,n,t,o,i,s,a)=>{let u=i;if(s&&k.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=J1(r,i,s,e,t,n*o,a),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(at(u,Ty.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(at(u,Ty.perm),{inputs:[u],outputs:[-1]})[0]},Iy=(r,e)=>{let n=Y1(r.inputs,e),t=r.inputs[0],o=It(r.inputs,1),i=It(r.inputs,2),s=It(r.inputs,3),a=It(r.inputs,4),u=It(r.inputs,5),l=It(r.inputs,6),f=It(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=ro(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,s,0);if(c)return Sn(r,p,o,i,a,void 0,l,f,u,n,e);if(!o||!i)throw new Error("key and value must be provided");let b=ro(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),g=ro(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Sn(r,p,b,g,a,void 0,l,f,u,n,e)}});var Sy,Q1,eI,hu,$y,gu=C(()=>{"use strict";ue();ge();be();Sy=r=>Array.from(r.getBigInt64Array(),Number),Q1=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Sy(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},eI=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},hu=(r,e)=>{let n=r[0].dims,t=e??Sy(r[1]),o=eI(n,t),i=k.size(o),s=r[0].dataType,a=L("input",s,n.length),u=F("output",s,o.length),l=f=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...G(r[0].dims,o)]}),getShaderSource:l}},$y=r=>{Q1(r.inputs),r.compute(hu(r.inputs),{inputs:[0]})}});var tI,Ay,Oy,rI,Py,Ey,Cy=C(()=>{"use strict";ue();ge();Xe();zi();be();mu();gu();hr();tI=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4];if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],f=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],c=l,p=0,b=0,g=Math.floor(f/e.numHeads),h=i&&i.dims.length!==0,v=s&&s.dims.length!==0,T=!0;if(h&&v){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');T?(p=i.dims[1],b=i.dims[1]):(p=i.dims[2],b=i.dims[2])}else if(h||v)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(t){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');w=2,c=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,c=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,c=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let _=0,$=!1,P=f;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=p+c,B=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:E,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:P,headSize:g,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:e.scale,broadcastResPosBias:B,passPastInKv:$,qkvFormat:w,isPastkvBSNH:T}},Ay=(r,e,n,t)=>{let o=[t.batchSize,t.totalSequenceLength,t.kvNumHeads,t.headSize],i=4,s=k.size(o)/i,a=t.totalSequenceLength,u=F("present_kv",n,o.length,i),l=L("new_kv",r.dataType,r.dims.length,i),f=e?L("past_kv",e.dataType,e.dims.length,i):void 0,c=Math.ceil(t.headSize/i),p={x:a,y:r.dims[0],z:1},b=e?["rank","rank"]:["rank"],g=[{type:12,data:s},{type:12,data:t.pastSequenceLength},{type:12,data:t.kvSequenceLength},{type:12,data:t.totalSequenceLength}],h=[l];f?(g.push(...G(r.dims),...G(e.dims),...G(o)),h.push(f)):g.push(...G(r.dims),...G(o));let v=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],T=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,w=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,_=e?`if (s < past_seqlen) {
        ${T}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${w}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${w}
        }`,$=P=>`

  ${P.registerUniforms(v).declareVariables(...h,u)}
  ${P.mainStart([c,t.kvNumHeads,1])}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${u.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${t.kvNumHeads}u;
    let H = ${c}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${t.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${_}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${t.kvNumHeads}${c}${!!e}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:p,programUniforms:g}),getShaderSource:$}},Oy=r=>le({...r}),rI=le({perm:[0,2,1,3]}),Py=(r,e,n,t,o)=>{let i=e,s=t.kvNumHeads,a=t.nReps;return e.dims.length===3&&t.kvSequenceLength!==0&&(i=e.reshape([t.batchSize,t.kvSequenceLength,s,t.headSize])),n?i=r.compute(Ay(i,n,i.dataType,t),{inputs:[i,n],outputs:[t.isPastkvBSNH?o:-1]})[0]:i=r.compute(Ay(i,void 0,i.dataType,t),{inputs:[i],outputs:[t.isPastkvBSNH?o:-1]})[0],a!==1&&(i=r.compute(hu([i],[1,1,1,a]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([t.batchSize,t.totalSequenceLength,s*a,t.headSize])),r.compute(at(i,rI.perm),{inputs:[i],outputs:[-1]})[0]},Ey=(r,e)=>{let n=tI(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=ro(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r.inputs[0],void 0,0),o=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,i=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,s=Py(r,r.inputs[1],o,n,1),a=Py(r,r.inputs[2],i,n,2);Sn(r,t,s,a,void 0,void 0,void 0,void 0,void 0,n,e)}});var ky,nI,oI,Dy,By=C(()=>{"use strict";ue();ge();hr();be();ky=(r,e,n,t,o,i,s,a)=>{let u=Me(i),l=u===1?"f32":`vec${u}f`,f=u===1?"vec2f":`mat2x${u}f`,c=o*s,p=[o,s,i/u],b=[o,s,2],g=["rank","type","type"],h=[];h.push(...G(p,b));let v=T=>{let w=L("x",e.dataType,3,u),_=L("scale",n.dataType,n.dims),$=L("bias",t.dataType,t.dims),P=F("output",1,3,2),E=[w,_,$,P],B=64;return`
  var<workgroup> workgroup_shared : array<${f}, ${B}>;
  const workgroup_size = ${B}u;
  ${T.declareVariables(...E)}
  ${T.mainStart(B)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${w.get("batch","channel","h")});
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
      let sum_final = ${Kt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Kt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:c},programUniforms:h}),getShaderSource:v},{inputs:[e,n,t],outputs:[-1]})[0]},nI=(r,e,n)=>{let t=e[0].dims,o=t,i=2,s=t[0],a=t[1],u=k.sizeFromDimension(t,i),l=Me(u),f=k.size(o)/l,c=ky(r,e[0],e[1],e[2],s,u,a,n.epsilon),p=[s,a,u/l],b=[s,a],g=["type","none"],h=v=>{let T=L("x",e[0].dataType,p.length,l),w=L("scale_shift",1,b.length,2),_=F("output",e[0].dataType,p.length,l),$=[T,w,_];return`
  ${v.registerUniform("output_size","u32").declareVariables(...$)}
  ${v.mainStart()}
  ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${_.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${T.getByOffset("global_idx")} * ${_.type.value}(scale_shift.x) + ${_.type.value}(scale_shift.y);
      ${_.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...G(p,b,p)]}),getShaderSource:h},{inputs:[e[0],c]})},oI=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=k.sizeFromDimension(t,1)/s,u=Me(s),l=k.size(o)/u,f=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=[0,t.length-1];for(let v=0;v<t.length-2;v++)p.push(v+1);let b=r.compute(at(r.inputs[0],p),{inputs:[r.inputs[0]],outputs:[-1]})[0],g=ky(r,b,e[1],e[2],i,a,s,n.epsilon),h=v=>{let T=ke(e[0].dataType),w=u===1?"vec2f":`mat${u}x2f`,_=E=>{let B=E===0?"x":"y",N=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${T}(${N}(scale.${B}))`;case 2:return`vec2<${T}>(${N}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${T}>(${N}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${u}`)}},$=L("input",e[0].dataType,e[0].dims,u),P=F("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${$.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${P.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${_(0)}, ${_(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:h},{inputs:[e[0],g]})},Dy=(r,e)=>{e.format==="NHWC"?oI(r,r.inputs,e):nI(r,r.inputs,e)}});var iI,aI,Ly,Ry=C(()=>{"use strict";ue();ge();be();iI=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},aI=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],s=!t&&r[2],a=o,u=k.normalizeAxis(e.axis,o.length),l=k.sizeToDimension(o,u),f=k.sizeFromDimension(o,u),c=k.size(i.dims),p=s?k.size(s.dims):0;if(c!==f||s&&p!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let b=[];for(let P=0;P<o.length;++P)P<u?b.push(o[P]):b.push(1);let g=Me(f),h=["type","type"],v=[{type:12,data:l},{type:1,data:f},{type:12,data:Math.floor(f/g)},{type:1,data:e.epsilon}];s&&h.push("type");let T=n>1,w=n>2,_=P=>{let E=ke(r[0].dataType),B=[L("x",r[0].dataType,r[0].dims,g),L("scale",i.dataType,i.dims,g)];s&&B.push(L("bias",s.dataType,s.dims,g)),B.push(F("output",r[0].dataType,a,g)),T&&B.push(F("mean_data_output",1,b)),w&&B.push(F("inv_std_output",1,b));let N=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(N).declareVariables(...B)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ys("f32",g)};
    var mean_square_vector = ${Ys("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Jr(E,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Kt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Kt("mean_square_vector",g)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Jr(E,g,"x[j + offset]")};
      let f32scale = ${Jr(E,g,"scale[j]")};
      output[j + offset] = ${B[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Jr(E,g,"bias[j]")}`:""}
      );
    }

    ${T?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:a,dataType:r[0].dataType}];return T&&$.push({dims:b,dataType:1}),w&&$.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${n};${t}`,inputDependencies:h},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:v}),getShaderSource:_}},Ly=(r,e)=>{iI(r.inputs),r.compute(aI(r.inputs,e,r.outputCount))}});var sI,uI,lI,zy,Ny,My=C(()=>{"use strict";ue();ge();Xe();be();sI=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=r[1];if(!k.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(k.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let f=r[3].dims,c=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(k.size(f)!==c)throw new Error("zeroPoints input size error.")}},uI=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=k.size(a),f=r[1].dims[2]/4,c=r[0].dataType,p=Me(e.k),b=Me(f),g=Me(s),h=a.concat([o,s]),v=o>1&&s/g%2===0?2:1,T=k.size(h)/g/v,w=64,_=[],$=[u,o,i/p],P=k.convertShape(r[1].dims).slice();P.splice(-1,1,f/b),_.push(...G($)),_.push(...G(P)),_.push(...G(r[2].dims)),r.length===4&&_.push(...G(k.convertShape(r[3].dims)));let E=[u,o,s/g];_.push(...G(E));let B=N=>{let H=$.length,q=L("a",r[0].dataType,H,p),V=L("b",12,P.length,b),se=L("scales",r[2].dataType,r[2].dims.length),fe=[q,V,se],ye=r.length===4?L("zero_points",12,r[3].dims.length):void 0;ye&&fe.push(ye);let ve=E.length,oe=F("output",r[0].dataType,ve,g),Te=ke(r[0].dataType),Ie=(()=>{switch(p){case 1:return`array<${Te}, 8>`;case 2:return`mat4x2<${Te}>`;case 4:return`mat2x4<${Te}>`;default:throw new Error(`${p}-component is not supported.`)}})(),te=()=>{let me=`
          // reuse a data
            var input_offset = ${q.indicesToOffset(`${q.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Ie};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${q.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let he=0;he<g*v;he++)me+=`
            b_value = ${b===1?`b${he}_data`:`b${he}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Ie}(${Array.from({length:4},(U,Y)=>`${Te}(b_value_lower[${Y}]), ${Te}(b_value_upper[${Y}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${Ie}(${Array.from({length:8},(U,Y)=>`(b_quantized_values[${Y}] - ${ye?`zero_point${he}`:"zero_point"}) * scale${he}`).join(", ")});`:`(b_quantized_values - ${Ie}(${Array(8).fill(`${ye?`zero_point${he}`:"zero_point"}`).join(",")})) * scale${he};`)()};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(he/g)}]${g>1?`[${he%g}]`:""} += ${Array.from({length:8/p},(U,Y)=>`${p===1?`a_data[${Y}] * b_dequantized_values[${Y}]`:`dot(a_data[${Y}], b_dequantized_values[${Y}])`}`).join(" + ")};
          `;return me},we=()=>{let me=`
            var col_index = col * ${g};
            ${ye?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Te}(8);`}
            `;for(let he=0;he<g*v;he++)me+=`
            let scale${he} = ${se.getByOffset("col_index * nBlocksPerCol + block")};
            ${ye?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ye.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${he} = ${Te}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return me},pe=()=>{let me=`col_index = col * ${g};`;for(let he=0;he<g*v;he++)me+=`
            let b${he}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return me+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Ie};
            var b_dequantized_values: ${Ie};`,me};return`
        var<workgroup> workgroup_shared: array<${oe.type.value}, ${v*w}>;
        ${N.declareVariables(...fe,oe)}
        ${N.mainStart([w,1,1])}
          let output_indices = ${oe.offsetToIndices(`(global_idx / ${w}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/p};
            ${we()}
            for (var word: u32 = 0; word < ${f}; word += ${b}) {
              ${pe()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${te()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${p};${b};${g};${v};${w}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:c}],dispatchGroup:{x:T},programUniforms:_}),getShaderSource:B}},lI=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=k.size(a),f=r[1].dims[2]/4,c=r[0].dataType,p=Me(e.k),b=Me(f),g=a.concat([o,s]),h=128,v=s%8===0?8:s%4===0?4:1,T=h/v,w=T*b*8,_=w/p,$=w/e.blockSize,P=k.size(g)/v,E=[],B=[u,o,i/p],N=k.convertShape(r[1].dims).slice();N.splice(-1,1,f/b),E.push(...G(B)),E.push(...G(N)),E.push(...G(r[2].dims)),r.length===4&&E.push(...G(k.convertShape(r[3].dims)));let H=[u,o,s];E.push(...G(H));let q=V=>{let se=B.length,fe=L("a",r[0].dataType,se,p),ye=L("b",12,N.length,b),ve=L("scales",r[2].dataType,r[2].dims.length),oe=[fe,ye,ve],Te=r.length===4?L("zero_points",12,r[3].dims.length):void 0;Te&&oe.push(Te);let Ie=H.length,te=F("output",r[0].dataType,Ie),we=ke(r[0].dataType),pe=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${we}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${we}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${we}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${we}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${fe.type.value}, ${_}>;
        var<workgroup> inter_results: array<array<${te.type.value}, ${T}>, ${v}>;
        ${V.declareVariables(...oe,te)}
        ${V.mainStart([T,v,1])}
          let output_indices = ${te.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${_};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${_}; a_offset += ${h})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${fe.getByIndices(`${fe.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${fe.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${$} + local_id.x;
            ${Te?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${we}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${we}(8);`}
            let scale = ${ve.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ye.getByIndices(`${ye.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/p};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${pe()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${we}>(${Array.from({length:4},(me,he)=>`${we}(b_value_lower[${he}]), ${we}(b_value_upper[${he}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${we}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(me,he)=>`${`dot(a_data${he}, b_dequantized_values[${he}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${te.setByIndices(`${te.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${p};${b};${T};${v}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:P},programUniforms:E}),getShaderSource:q}},zy=(r,e)=>{sI(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(lI(r.inputs,e)):r.compute(uI(r.inputs,e))},Ny=r=>le(r)});var cI,fI,dI,pI,mI,hI,gI,bI,Fy,Vy=C(()=>{"use strict";ue();ge();be();cI=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},fI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${J("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${J("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${J("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},dI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${J("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${J("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${J("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${J("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},pI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${J("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${J("uniforms.x_shape",o,e)})) {
                  k = i32(${J("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${J("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},mI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${J("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${J("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${J("uniforms.x_shape",o,e)})) {
                  k -= i32(${J("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${J("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},hI=(r,e,n)=>{switch(n.mode){case 0:return fI(r,e,n.pads.length);case 1:return dI(r,e,n.pads.length);case 2:return pI(r,e,n.pads.length);case 3:return mI(r,e,n.pads.length);default:throw new Error("Invalid mode")}},gI=(r,e)=>{let n=k.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=k.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],s=r.length>=3&&r[2].data;e.mode===0&&i.push({type:s?r[2].dataType:1,data:e.value}),i.push(...G(r[0].dims,n));let a=["rank"],u=l=>{let f=F("output",r[0].dataType,n.length),c=L("x",r[0].dataType,t.length),p=c.type.value,b=hI(f,t.length,e),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&g.push({name:"constant_value",type:s?p:"f32"}),`
            ${l.registerUniforms(g).declareVariables(c,f)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(n)/64)},programUniforms:i}),getShaderSource:u}},bI=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let a=r[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},Fy=(r,e)=>{cI(r.inputs);let n=bI(r.inputs,e);r.compute(gI(r.inputs,n),{inputs:[0]})}});var qi,Gy,Uy,Wy,Hy,yI,xI,qy,jy,Ky,Xy,Zy,Yy,Jy,Qy,ex,tx,rx,nx,ox=C(()=>{"use strict";mt();ue();ge();be();qi=r=>{if(ce.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},Gy=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Zr.adjustPoolAttributes(n,o,s,a,u,l);let f=Zr.computePoolOutputShape(n,o,a,u,s,l,e.autoPad),c=Object.assign({},e);i?Object.assign(c,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let p=f.slice();return p.push(p.splice(1,1)[0]),[c,t?p:f]},Uy=(r,e)=>{let n=e.format==="NHWC",t=k.size(r),o=k.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],f=e.pads[e.pads.length-1],c=!!(l+f);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],g=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],v=e.pads[e.pads.length-2];p=!!(h+v),i.push({type:12,data:b},{type:12,data:g},{type:12,data:h},{type:12,data:v}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=k.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,f)=>l+f);return[i,s,!!u,!1,!1]}},Wy=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p=o.format==="NHWC",b=e.type.value,g=F("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",v="",T="",w=n-(p?2:1);if(f?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
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
                `,T=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,g)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${b}(${a});
              var pad = 0;
              ${v}
              ${h}
              ${T}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,v=o.pads.length,T="";return l?T=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:T=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,g)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${b}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${J("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${J("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${J("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${J("uniforms.pads","j - 2u",v)};
                  ${T}
              }
              ${s}

              output[global_idx] = value;
            }`}},Hy=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,yI=r=>`${Hy(r)};${r.countIncludePad}`,xI=r=>`${Hy(r)};${r.storageOrder};${r.dilations}`,qy=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),jy=(r,e,n,t)=>{let[o,i]=Gy(e,t,n),s=L("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[f,c,p,b,g]=Uy(i,o);f.push(...G(e.dims,i));let h=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${p};${b};${g}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:f}),getShaderSource:v=>Wy(v,s,e.dims.length,i.length,o,u,l,0,c,p,b,g)}},Ky=r=>{let e=r.count_include_pad!==0,n=qy(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:yI(t)}},Xy=(r,e)=>{qi(r.inputs),r.compute(jy("AveragePool",r.inputs[0],!1,e))},Zy={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Yy=r=>{let e=r.format;return{format:e,...Zy,cacheKey:e}},Jy=(r,e)=>{qi(r.inputs),r.compute(jy("GlobalAveragePool",r.inputs[0],!0,e))},Qy=(r,e,n,t)=>{let[o,i]=Gy(e,t,n),s=`
      value = max(x_val, value);
    `,a="",u=L("x",e.dataType,e.dims.length),l=["rank"],[f,c,p,b,g]=Uy(i,o);return f.push(...G(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${p};${b};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:f}),getShaderSource:h=>Wy(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,c,p,b,g)}},ex=(r,e)=>{qi(r.inputs),r.compute(Qy("MaxPool",r.inputs[0],!1,e))},tx=r=>{let e=r.storage_order,n=r.dilations,t=qy(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:xI(o)}},rx=r=>{let e=r.format;return{format:e,...Zy,cacheKey:e}},nx=(r,e)=>{qi(r.inputs),r.compute(Qy("GlobalMaxPool",r.inputs[0],!0,e))}});var vI,TI,ix,ax,sx=C(()=>{"use strict";ue();ge();Xe();be();vI=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},TI=(r,e)=>{let n=k.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,s=r[1].dataType,a=k.size(i),u=t===3||t===2,l=u?[Math.ceil(k.size(r[0].dims)/4)]:r[0].dims,f=r[1].dims,c=r.length>2?r[2]:void 0,p=c?u?[Math.ceil(k.size(c.dims)/4)]:c.dims:void 0,b=f.length===0||f.length===1&&f[0]===1,g=b===!1&&f.length===1,h=Me(a),v=b&&(!u||h===4),T=v?h:1,w=v&&!u?h:1,_=L("input",u?12:t,l.length,w),$=L("scale",s,f.length),P=c?L("zero_point",u?12:t,p.length):void 0,E=F("output",s,i.length,T),B=[_,$];P&&B.push(P);let N=[l,f];c&&N.push(p);let H=[{type:12,data:a/T},{type:12,data:n},{type:12,data:e.blockSize},...G(...N,i)],q=V=>{let se=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${V.registerUniforms(se).declareVariables(...B,E)}
      ${V.mainStart()}
          ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${_.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${T===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${_.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>b?`let scale_value= ${$.getByOffset("0")}`:g?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>P?b?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:g?u?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${$.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":_.type.value}(0);`)()};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/T/64),y:1,z:1},programUniforms:H})}},ix=(r,e)=>{vI(r.inputs,e),r.compute(TI(r.inputs,e))},ax=r=>le({axis:r.axis,blockSize:r.blockSize})});var _I,II,ux,lx=C(()=>{"use strict";mt();ue();be();_I=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},II=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:r},{type:t,data:n},...G(i)],u=l=>{let f=F("output",t,i.length),c=f.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(p).declareVariables(f)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},ux=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),ce.webgpu.validateInputContent&&_I(e,n,t),r.compute(II(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var SI,$I,AI,PI,OI,EI,CI,kI,DI,BI,LI,cx,RI,zI,NI,MI,FI,fx,dx,px=C(()=>{"use strict";ue();ge();Xe();be();SI=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},$I=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},AI=(r,e,n,t,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(s>0&&r.length>s&&r[s].dims.length>0)r[s].getFloat32Array().forEach(f=>i.push(f));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&r.length>a&&r[a].dims.length===1&&r[a].dims[0]>0){if(r[a].getFloat32Array().forEach(f=>t.push(f)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");SI(t,e),e.axes.length>0&&$I(t,e.axes,l).forEach((f,c)=>t[c]=f)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},PI=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",OI=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",EI=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+n]=o[e.length+s]}),t):o},CI=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,s)=>Math.round(i*e[s]))}return o},kI=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},DI=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${J("uniforms.scales","i",t)};
        var roi_low = ${J("uniforms.roi","i",o)};
        var roi_hi = ${J("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${J("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,BI=(r,e,n,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${J("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${J("uniforms.roi","i",i)};
          var roi_hi = ${J("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${J("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",t.length)};
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
    }`,LI=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${J("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,cx=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",RI=(r,e,n,t,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${cx(r,l,s,2)}
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
    }`},zI=(r,e,n,t,o,i,s,a,u,l)=>{let f=n.length===2,c=!0,[p,b]=f?[0,1]:c?[2,3]:[1,2],g=r.type.value,h=v=>{let T=v===p?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${g} {
        var output_index = ${e.indicesGet("output_indices",v)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[v]},
        ${t[v]}, ${n[v]}, ${i[v]}, ${i[v]} + ${n.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[v]} - 1))) {
          return ${u};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${g} = originalIdx + ${g}(i);
          if (${T} < 0 || ${T} >= ${n[v]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${T} = max(0, min(${T}, ${n[v]} - 1));`)()};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",v,`u32(${T})`)};
          data[i + 1] = ${v===p?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(p)};
    ${h(b)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${g} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},NI=(r,e,n,t,o)=>{let[s,a,u,l,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${cx(r,f,s,3)}
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
    }`},MI=(r,e,n,t,o,i)=>{let s=r.dims,a=EI(i,e.axes,s.length),u=CI(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((w,_)=>w===0?1:u[_]/w),e.keepAspectRatioPolicy!=="stretch"&&(u=kI(s,l,e)));let f=F("output",r.dataType,u.length),c=L("input",r.dataType,s.length),p=k.size(u),b=s.length===u.length&&s.every((w,_)=>w===u[_]),g=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,v=c.type.value,T=w=>`
      ${b?"":`
      ${PI(e.coordinateTransformMode,v)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${LI(c,s)};
              ${OI(e.nearestMode,n,v)};
              ${BI(c,f,s,u,l.length,a.length,g)};
              `;case"linear":return`
              ${DI(f,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${RI(c,f,s,g,h)}`;if(s.length===3||s.length===5)return`${NI(c,f,s,g,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${zI(c,f,s,u,l,a,e.cubicCoeffA,g,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(c,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${b}|${s}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:a},...G(s,u)]})}},FI=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},fx=(r,e)=>{let n=[],t=[],o=[],i=FI(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");AI(r.inputs,e,i,n,t,o),r.compute(MI(r.inputs[0],e,i,n,t,o),{inputs:[0]})},dx=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,s=r.extrapolationValue,a=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return le({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var VI,GI,mx,hx=C(()=>{"use strict";ue();ge();Xe();be();VI=(r,e)=>{let[n,t,o,i]=r,{numHeads:s,rotaryEmbeddingDim:a}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!k.areEqual(t.dims,[])&&!k.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],f=o.dims[0],c=k.sizeFromDimension(n.dims,1)/l,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},GI=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=r[0].dims[0],a=k.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=a/u,f=r[2].dims[1],c=o===0?f*2:l/t,p=new Array(s,u,l/c,c-f),b=k.computeStrides(p),g=[{type:1,data:i},{type:12,data:p},{type:12,data:b},...r[0].dims.length===3?new Array({type:12,data:[a,l,c,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...G(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],h=v=>{let T=L("input",r[0].dataType,r[0].dims.length),w=L("position_ids",r[1].dataType,r[1].dims.length),_=L("cos_cache",r[2].dataType,r[2].dims.length),$=L("sin_cache",r[3].dataType,r[3].dims.length),P=F("output",r[0].dataType,r[0].dims.length);return v.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${v.declareVariables(T,w,_,$,P)}

        ${v.mainStart(Yr)}
          let half_rotary_emb_dim = uniforms.${_.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",F("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${T.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} -
                ${T.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${T.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${T.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",T.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(p)/Yr)},programUniforms:g})}},mx=(r,e)=>{VI(r.inputs,e),r.compute(GI(r.inputs,e))}});var UI,WI,gx,bx=C(()=>{"use strict";ue();ge();be();UI=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let s=r[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let s=r[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},WI=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,s=k.size(i),a=i,u=s,l=i.slice(-1)[0],f=t?i.slice(0,-1).concat(1):[],c=!o&&r.length>3,p=r.length>4,b=t&&n>1,g=t&&n>2,h=n>3,v=64,T=Me(l),w=[{type:12,data:u},{type:12,data:T},{type:12,data:l},{type:1,data:e.epsilon}],_=P=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],B=[L("x",r[0].dataType,r[0].dims,T),L("skip",r[1].dataType,r[1].dims,T),L("gamma",r[2].dataType,r[2].dims,T)];c&&B.push(L("beta",r[3].dataType,r[3].dims,T)),p&&B.push(L("bias",r[4].dataType,r[4].dims,T)),B.push(F("output",r[0].dataType,a,T)),b&&B.push(F("mean_output",1,f)),g&&B.push(F("inv_std_output",1,f)),h&&B.push(F("input_skip_bias_sum",r[0].dataType,a,T));let N=ke(r[0].dataType),H=ke(1,T);return`

      ${P.registerUniforms(E).declareVariables(...B)}
      var<workgroup> sum_shared : array<${H}, ${v}>;
      var<workgroup> sum_squared_shared : array<${H}, ${v}>;

      ${P.mainStart([v,1,1])}
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
          let bias_value = ${p?"bias[offset1d + i]":N+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Jr(N,T,"value")};
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
        let mean = ${Kt("sum",T)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Kt("square_sum",T)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${N}(mean)`}) *
            ${N}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:a,dataType:r[0].dataType}];return n>1&&$.push({dims:f,dataType:1}),n>2&&$.push({dims:f,dataType:1}),n>3&&$.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${T};${b};${g};${h}`,inputDependencies:r.map((P,E)=>"type")},getShaderSource:_,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:w})}},gx=(r,e)=>{UI(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(WI(r.inputs,e,r.outputCount,!1),{outputs:t})}});var HI,ji,qI,yx,jI,KI,xx,wx,vx=C(()=>{"use strict";ue();ge();Xe();be();HI=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},ji=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},qI=(r,e)=>{if(r.length>1){let n=ji(r,1),t=ji(r,2),o=ji(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),le({starts:n,ends:t,axes:o})}else return e},yx=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},jI=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${J("uniforms.input_shape","i",n.length)};
            let steps_i = ${J("uniforms.steps","i",n.length)};
            let signs_i = ${J("uniforms.signs","i",n.length)};
            let starts_i = ${J("uniforms.starts","i",n.length)};
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
      }`,KI=(r,e)=>{let n=r[0].dims,t=k.size(n),o=e.axes.length>0?k.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=ji(r,4);i.forEach(T=>T!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((T,w)=>yx(T,w,n,o,i)),a=e.ends.map((T,w)=>yx(T,w,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let T=0;T<n.length;++T)o.includes(T)||(s.splice(T,0,0),a.splice(T,0,n[T]),i.splice(T,0,1));let u=i.map(T=>Math.sign(T));i.forEach((T,w,_)=>{if(T<0){let $=(a[w]-s[w])/T,P=s[w],E=P+$*i[w];s[w]=E,a[w]=P,_[w]=-T}});let l=n.slice(0);o.forEach((T,w)=>{l[T]=Math.ceil((a[T]-s[T])/i[T])});let f={dims:l,dataType:r[0].dataType},c=F("output",r[0].dataType,l.length),p=L("input",r[0].dataType,r[0].dims.length),b=k.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:b},{type:12,data:s},{type:6,data:u},{type:12,data:i},...G(r[0].dims,l)],v=T=>`
      ${T.registerUniforms(g).declareVariables(p,c)}
        ${jI(p,c,n)}
        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},xx=(r,e)=>{HI(r.inputs,e);let n=qI(r.inputs,e);r.compute(KI(r.inputs,n),{inputs:[0]})},wx=r=>{let e=r.starts,n=r.ends,t=r.axes;return le({starts:e,ends:n,axes:t})}});var XI,ZI,Tx,_x,Ix=C(()=>{"use strict";ue();ge();Xe();hr();be();XI=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},ZI=(r,e)=>{let n=r.inputs[0],t=n.dims,o=k.size(t),i=64,s=t.length,a=k.normalizeAxis(e.axis,s),u=a<t.length-1,l,f=[];u?(f=Array.from({length:s},(B,N)=>N),f[a]=s-1,f[s-1]=a,l=r.compute(at(n,f),{inputs:[n],outputs:[-1]})[0]):l=n;let c=l.dims,p=c[s-1],b=o/p,g=Me(p),h=p/g,v=(B,N)=>N===4?`max(max(${B}.x, ${B}.y), max(${B}.z, ${B}.w))`:N===2?`max(${B}.x, ${B}.y)`:N===3?`max(max(${B}.x, ${B}.y), ${B}.z)`:B,T=L("x",l.dataType,l.dims,g),w=F("result",l.dataType,l.dims,g),_=T.type.value,$=ke(l.dataType)==="f32"?`var threadMax = ${_}(-3.402823e+38f);`:`var threadMax = ${_}(-65504.0h);`,P=B=>`
      var<workgroup> rowMaxShared : ${_};
      var<workgroup> rowSumShared : ${_};
      var<workgroup> threadShared : array<${_}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${_} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${_}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${B.registerUniform("packedCols","i32").declareVariables(T,w)}
      ${B.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${i};
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
          rowMaxShared = ${_}(${v("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${_}(0.0);
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
          rowSumShared = ${_}(${Kt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=r.compute({name:"Softmax",shaderCache:{hint:`${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:b},programUniforms:[{type:6,data:h}]}),getShaderSource:P},{inputs:[l],outputs:[u?-1:0]})[0];u&&r.compute(at(E,f),{inputs:[E]})},Tx=(r,e)=>{XI(r.inputs),ZI(r,e)},_x=r=>le({axis:r.axis})});var YI,JI,QI,eS,tS,Sx,$x,Ax=C(()=>{"use strict";ue();ge();Xe();be();YI=r=>{if(!r||r.length<1)throw new Error("too few inputs")},JI=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),le({numOutputs:t,axis:e.axis,splitSizes:n})},QI=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${J("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,eS=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},tS=(r,e)=>{let n=r[0].dims,t=k.size(n),o=r[0].dataType,i=k.normalizeAxis(e.axis,n.length),s=new Array(e.numOutputs),a=L("input",o,n.length),u=new Array(e.numOutputs),l=[],f=[],c=0,p=[{type:12,data:t}];for(let g=0;g<e.numOutputs;g++){c+=e.splitSizes[g],u[g]=c;let h=n.slice();h[i]=e.splitSizes[g],f.push(h),s[g]=F(`output${g}`,o,h.length),l.push({dims:f[g],dataType:r[0].dataType})}p.push({type:12,data:u},...G(n,...f));let b=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${QI(u.length)}
  ${eS(s)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${J("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:p})}},Sx=(r,e)=>{YI(r.inputs);let n=r.inputs.length===1?e:JI(r.inputs,e);r.compute(tS(r.inputs,n),{inputs:[0]})},$x=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return le({axis:e,numOutputs:t,splitSizes:n})}});var rS,nS,Px,Ox=C(()=>{"use strict";ue();ge();be();rS=(r,e,n,t,o)=>{let i=F("output_data",o,n.length,4),s=L("a_data",e[1].dataType,e[1].dims.length,4),a=L("b_data",e[2].dataType,e[2].dims.length,4),u=L("c_data",e[0].dataType,e[0].dims.length,4),l,f=(c,p,b)=>`select(${p}, ${c}, ${b})`;if(!t)l=i.setByOffset("global_idx",f(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,b,g="")=>{let h=`a_data[index_a${b}][component_a${b}]`,v=`b_data[index_b${b}][component_b${b}]`,T=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${i.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_b${b} = ${a.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_c${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${p}[${b}] = ${g}(${f(h,v,T)});
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
      }`},nS=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(k.areEqual(e,n)&&k.areEqual(n,t)),s=e,a=k.size(e);if(i){let l=or.calcShape(or.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=k.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>rS(l,r,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...G(t,e,n,s)]})}},Px=r=>{r.compute(nS(r.inputs))}});var Ex,Cx=C(()=>{"use strict";Tg();zi();Sg();Ag();db();_b();$b();Fb();jb();Zb();Qb();oy();sy();ly();dy();hy();yy();vy();Cy();By();Ry();iu();My();mu();Vy();ox();sx();lx();Li();px();hx();bx();vx();Ix();Ax();gu();hr();Mi();Ox();Ex=new Map([["Abs",[Pg]],["Acos",[Og]],["Acosh",[Eg]],["Add",[pb]],["ArgMax",[vg,eu]],["ArgMin",[wg,eu]],["Asin",[Cg]],["Asinh",[kg]],["Atan",[Dg]],["Atanh",[Bg]],["Attention",[_g]],["AveragePool",[Xy,Ky]],["BatchNormalization",[Ig]],["BiasAdd",[$g]],["BiasSplitGelu",[fb]],["Cast",[Rg,Lg]],["Ceil",[Ng]],["Clip",[zg]],["Concat",[Ib,Sb]],["Conv",[lu,uu]],["ConvTranspose",[qb,Hb]],["Cos",[Mg]],["Cosh",[Fg]],["CumSum",[Kb,Xb]],["DepthToSpace",[Yb,Jb]],["DequantizeLinear",[ix,ax]],["Div",[mb]],["Einsum",[ry,ny]],["Elu",[Vg,Yn]],["Equal",[hb]],["Erf",[Gg]],["Exp",[Ug]],["Expand",[ay]],["FastGelu",[uy]],["Floor",[Wg]],["FusedConv",[lu,uu]],["Gather",[fy,cy]],["GatherElements",[by,gy]],["GatherBlockQuantized",[py,my]],["Gelu",[Hg]],["Gemm",[wy,xy]],["GlobalAveragePool",[Jy,Yy]],["GlobalMaxPool",[nx,rx]],["Greater",[xb]],["GreaterOrEqual",[vb]],["GroupQueryAttention",[Ey,Oy]],["HardSigmoid",[Qg,Jg]],["InstanceNormalization",[Dy]],["LayerNormalization",[Ly]],["LeakyRelu",[qg,Yn]],["Less",[wb]],["LessOrEqual",[Tb]],["Log",[ub]],["MatMul",[Nb]],["MatMulNBits",[zy,Ny]],["MaxPool",[ex,tx]],["Mul",[gb]],["MultiHeadAttention",[Iy,_y]],["Neg",[Kg]],["Not",[jg]],["Pad",[Fy]],["Pow",[bb]],["QuickGelu",[lb,Yn]],["Range",[ux]],["Reciprocal",[Xg]],["ReduceMin",[mg]],["ReduceMean",[lg]],["ReduceMax",[pg]],["ReduceSum",[gg]],["ReduceProd",[hg]],["ReduceL1",[cg]],["ReduceL2",[fg]],["ReduceLogSum",[yg]],["ReduceLogSumExp",[dg]],["ReduceSumSquare",[bg]],["Relu",[Zg]],["Resize",[fx,dx]],["RotaryEmbedding",[mx]],["Sigmoid",[Yg]],["Sin",[eb]],["Sinh",[tb]],["Slice",[xx,wx]],["SkipLayerNormalization",[gx]],["Split",[Sx,$x]],["Sqrt",[rb]],["Softmax",[Tx,_x]],["Sub",[yb]],["Tan",[nb]],["Tanh",[ib]],["ThresholdedRelu",[sb,Yn]],["Tile",[$y]],["Transpose",[Zh,Yh]],["Where",[Px]]])});var Ki,kx=C(()=>{"use strict";mt();jt();be();Ki=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){$t(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of n)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),wt(e.programInfo.name)}dispose(){}build(e,n){$t(e.name);let t=this.backend.device,o=[];t.features.has("shader-f16")&&o.push("enable f16;");let i=Kh(n,this.backend.device.limits),s=e.getShaderSource(i),a=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,u=t.createShaderModule({code:a,label:e.name});$e("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=t.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return wt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let s=n*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var oS,iS,bu,Xi,Dx=C(()=>{"use strict";mt();ue();jt();Gs();Hh();Cx();kx();oS=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},iS=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${oS(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},bu=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Xi=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t};n.features.has("chromium-experimental-timestamp-query-inside-passes")?t.push("chromium-experimental-timestamp-query-inside-passes"):n.features.has("timestamp-query")&&t.push("timestamp-query"),n.features.has("shader-f16")&&t.push("shader-f16"),this.device=await n.requestDevice(o),this.adapterInfo=new bu(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Wh(this),this.programManager=new Ki(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ei(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,f=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,b=n[o*2],g=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let h=Number(b-this.queryTimeBase),v=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:Or(T.dataType)})),outputsMetadata:p.map(T=>({dims:T.dims,dataType:Or(T.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:f,startTime:h,endTime:v});else{let T="";c.forEach((_,$)=>{T+=`input[${$}]: [${_.dims}] | ${Or(_.dataType)}, `});let w="";p.forEach((_,$)=>{w+=`output[${$}]: [${_.dims}] | ${Or(_.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${f}" ${T}${w}execution time: ${v-h} ns`)}Io("GPU",`${f}::${b}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),wt()}run(e,n,t,o,i,s){$t(e.name);let a=[];for(let _=0;_<n.length;++_){let $=n[_].data;if($===0)continue;let P=this.gpuDataManager.get($);if(!P)throw new Error(`no GPU data for input: ${$}`);a.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:f}=e.getRunData(n),c=t.length===0?u.map((_,$)=>$):t;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],b=[];for(let _=0;_<u.length;++_){if(!Number.isInteger(c[_])||c[_]<-3||c[_]>=s)throw new Error(`Invalid output index: ${c[_]}`);if(c[_]===-3)continue;let $=c[_]===-1,P=c[_]===-2,E=$||P?i(u[_].dataType,u[_].dims):o(c[_],u[_].dataType,u[_].dims);if(p.push(E),E.data===0)continue;let B=this.gpuDataManager.get(E.data);if(!B)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(B),P){let N=this.kernelPersistentData.get(this.currentKernelId);N||(N=[],this.kernelPersistentData.set(this.currentKernelId,N)),N.push(B)}b.push(B)}if(a.length!==n.length||b.length!==p.length){if(b.length===0)return wt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(f){let _=0,$=[];f.forEach(N=>{let H=typeof N.data=="number"?[N.data]:N.data;if(H.length===0)return;let q=N.type===10?2:4,V,se;N.type===10?(se=H.length>4?16:H.length>2?8:H.length*q,V=H.length>4?16:q*H.length):(se=H.length<=2?H.length*q:16,V=16),_=Math.ceil(_/se)*se,$.push(_);let fe=N.type===10?8:4;_+=H.length>4?Math.ceil(H.length/fe)*V:H.length*q});let P=16;_=Math.ceil(_/P)*P;let E=new ArrayBuffer(_);f.forEach((N,H)=>{let q=$[H],V=typeof N.data=="number"?[N.data]:N.data;if(N.type===6)new Int32Array(E,q,V.length).set(V);else if(N.type===12)new Uint32Array(E,q,V.length).set(V);else if(N.type===10)new Uint16Array(E,q,V.length).set(V);else if(N.type===1)new Float32Array(E,q,V.length).set(V);else throw new Error(`Unsupported uniform type: ${Or(N.type)}`)});let B=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(B.buffer,0,E,0,_),this.gpuDataManager.release(B.id),g={offset:0,size:_,buffer:B.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),v=h[1]===1&&h[2]===1,T=iS(e,n,v),w=this.programManager.getArtifact(T);if(w||(w=this.programManager.build(e,h),this.programManager.setArtifact(T,w),$e("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),f&&w.uniformVariablesInfo){if(f.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${f.length} in program "${w.programInfo.name}".`);for(let _=0;_<f.length;_++){let $=f[_],P=$.type,E=typeof $.data=="number"?1:$.data.length,[B,N]=w.uniformVariablesInfo[_];if(P!==B||E!==N)throw new Error(`Uniform variable ${_} mismatch: expect type ${B} with size ${N}, got type ${P} with size ${E} in program "${w.programInfo.name}".`)}}if($e("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(w,a,b,h,g),wt(e.name),p}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=Ex.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,s)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),$e("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(f){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${f}`)),1}finally{l&&t.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(t,o,s);return i.set(n,[a,t]),a}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await qs(this,e,n);return Ci(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){$e("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){$e("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){$e("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var aS,Bx,Zi,yu,Lx,Rx=C(()=>{"use strict";jt();aS=1,Bx=()=>aS++,Zi=class{constructor(e,n){this.mlContext=e;this.tensorEntry=n,this.tensorCache=n?[n]:[]}get tensor(){return this.tensorEntry?.[0]}get context(){if(!this.mlContext)throw new Error("MLContext has not been set.");return this.mlContext}set context(e){if(this.mlContext&&this.mlContext!==e)throw new Error("MLTensor in use in a different MLContext.");this.mlContext=e}destroy(){for(let[e]of this.tensorCache)e.destroy();this.tensorCache=[],this.tensorEntry=void 0}trySelectTensor(e,n){for(let[t,o,i]of this.tensorCache)if(n===t){if(this.context!==e)throw new Error("MLTensor cannot be registered with a different MLContext.");return this.tensorEntry=[t,o,i],!0}return!1}async ensureTensor(e,n,t){if(this.tensorEntry){let[s,a,u]=this.tensorEntry;if(a===e&&u.every((l,f)=>l===n[f]))return s}for(let[s,a,u]of this.tensorCache)if(a===e&&u.every((l,f)=>l===n[f])){if(t&&this.tensorEntry){$e("verbose",()=>`[WebNN] Slowdown may occur, having to copy existing tensor {dataType: ${e}, shape: ${n}}`);let l=await this.context.readTensor(this.tensorEntry[0]);this.context.writeTensor(s,l)}return this.tensorEntry=[s,a,u],s}$e("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${e}, shape: ${n}}`);let o=MLTensorUsage.READ|MLTensorUsage.WRITE,i=await this.context.createTensor({dataType:e,shape:n,dimensions:n,usage:o});return this.tensorEntry=[i,e,n],this.tensorCache.push(this.tensorEntry),this.activeUpload&&(this.mlContext?.writeTensor(i,this.activeUpload),this.activeUpload=void 0),i}upload(e){if(!this.tensorEntry){this.activeUpload=new Uint8Array(e);return}this.mlContext?.writeTensor(this.tensorEntry[0],e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.tensorEntry)throw new Error("Tensor has not been created.");return e?this.context.readTensor(this.tensorEntry[0],e):this.context.readTensor(this.tensorEntry[0])}},yu=class{constructor(e){this.backend=e;this.tensorsById=new Map;this.tensorIdsByContext=new Map}reserveTensorId(){let e=Bx();return this.tensorsById.set(e,new Zi),e}releaseTensorId(e){let n=this.tensorsById.get(e);if(n){n.destroy(),this.tensorsById.delete(e);for(let[t,o]of this.tensorIdsByContext)if(o.has(e)){o.delete(e),o.size===0&&this.tensorIdsByContext.delete(t);break}}}async ensureTensor(e,n,t,o){$e("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${e}, dataType: ${n}, shape: ${t}, copyOld: ${o}}`);let i=this.tensorsById.get(e);if(!i)throw new Error("Tensor not found.");return i.context=this.backend.currentContext,this.tensorIdsByContext.has(this.backend.currentContext)||this.tensorIdsByContext.set(this.backend.currentContext,new Set),this.tensorIdsByContext.get(this.backend.currentContext)?.add(e),i.ensureTensor(n,t,o)}upload(e,n){this.tensorsById.get(e).upload(n)}async download(e,n){return $e("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`),this.tensorsById.get(e).download(n)}releaseTensorsForContext(e){let n=this.tensorIdsByContext.get(e);if(n){for(let t of n)this.tensorsById.get(t).destroy(),this.tensorsById.delete(t);this.tensorIdsByContext.delete(e)}}registerTensor(e,n,t,o){for(let[a,u]of this.tensorsById)if(u.trySelectTensor(e,n))return a;let i=Bx();this.tensorsById.set(i,new Zi(e,[n,t,o]));let s=this.tensorIdsByContext.get(e);return s||(s=new Set,this.tensorIdsByContext.set(e,s)),s.add(i),i}},Lx=(...r)=>new yu(...r)});var zx,Yi,Nx=C(()=>{"use strict";ue();Pr();Gs();Rx();jt();zx=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Yi=class{constructor(e){this.tensorManager=Lx(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;Ei(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){this.activeSessionId=e}get currentContext(){let e=this.getMLContext(this.currentSessionId);if(!e)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return e}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e)}onReleaseSession(e){let n=this.mlContextBySessionId.get(e);if(!n)return;this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);t.delete(e),t.size===0&&(this.sessionIdsByMLContext.delete(n),this.tensorManager.releaseTensorsForContext(n))}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){$e("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o){let i=zx.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e,i,t,o)}uploadTensor(e,n){if(!Ke().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");$e("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return Ci(t,n)}}registerMLTensor(e,n,t){let o=zx.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,e,o,t);return $e("verbose",()=>`[WebNN] registerMLTensor {tensor: ${e}, dataType: ${o}, dimensions: ${t}} -> {tensorId: ${i}}`),i}flush(){}}});var Mx={};un(Mx,{init:()=>sS});var no,xu,sS,Fx=C(()=>{"use strict";ue();Dx();jt();ge();Nx();no=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(k.size(e)!==k.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},xu=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=e.HEAPU32,i=t>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let a=[];for(let u=0;u<s;u++){let l=o[i++],f=o[i++],c=o[i++],p=[];for(let b=0;b<c;b++)p.push(o[i++]);a.push(new no(e,l,f,p))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(e,n){let t=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new no(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=Xr(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let f=l>0?this.backend.gpuDataManager.create(l).id:0;return new no(this.module,a,f,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.stackAlloc((1+n.length)*4),i=o>>2;this.module.HEAPU32[i++]=n.length;for(let s=0;s<n.length;s++)this.module.HEAPU32[i++]=n[s];return this.module._JsepOutput(this.opKernelContext,e,o)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},sS=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new Xi;await i.initialize(n,t),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,a,u,l=!1)=>{if(l)$e("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${a}, size=${u}`),i.memcpy(s,a);else{$e("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${a}, size=${u}`);let f=e.HEAPU8.subarray(s>>>0,(s>>>0)+u);i.upload(a,f)}},async(s,a,u)=>{$e("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(s,()=>e.HEAPU8.subarray(a>>>0,(a>>>0)+u))},(s,a,u)=>i.createKernel(s,a,u,e.UTF8ToString(e._JsepGetNodeName(a))),s=>i.releaseKernel(s),(s,a,u,l)=>{$e("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let f=new xu(e,i,a);return i.computeKernel(s,f,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Yi(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,l)=>i.ensureTensor(s,a,u,l),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var uS,yi,xi,Qr,lS,qn,wi,vi,Vx,Ti,_i,Ii,Rs=C(()=>{"use strict";Rh();Nh();ue();Pr();$i();Vs();uS=(r,e)=>{Ke()._OrtInit(r,e)!==0&&Ue("Can't initialize onnxruntime.")},yi=async r=>{uS(r.wasm.numThreads,Xn(r.logLevel))},xi=async(r,e)=>{{let n=(Fx(),Pn(Mx)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Ke(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Ke(),r)}}},Qr=new Map,lS=r=>{let e=Ke(),n=e.stackSave();try{let t=e.stackAlloc(8);return e._OrtGetInputOutputCount(r,t,t+4)!==0&&Ue("Can't get session input/output count."),[e.HEAP32[t/4],e.HEAP32[t/4+1]]}finally{e.stackRestore(n)}},qn=r=>{let e=Ke(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},wi=async(r,e)=>{let n,t,o=Ke();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=qn(r);let i=0,s=0,a=0,u=[],l=[],f=[];try{if([s,u]=zh(e),e?.externalData&&o.mountExternalData){let w=[];for(let _ of e.externalData){let $=typeof _=="string"?_:_.path;w.push(Zn(typeof _=="string"?_:_.data).then(P=>{o.mountExternalData($,P)}))}await Promise.all(w)}for(let w of e?.executionProviders??[])if((typeof w=="string"?w:w.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof w!="string"){let $=w,P=$?.context,E=$?.gpuDevice,B=$?.deviceType,N=$?.numThreads,H=$?.powerPreference;P?o.currentContext=P:E?o.currentContext=await navigator.ml.createContext(E):o.currentContext=await navigator.ml.createContext({deviceType:B,numThreads:N,powerPreference:H})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(n,t,s),i===0&&Ue("Can't create a session."),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=lS(i),b=!!e?.enableGraphCapture,g=[],h=[],v=[];for(let w=0;w<c;w++){let _=o._OrtGetInputName(i,w);_===0&&Ue("Can't get an input name."),l.push(_),g.push(o.UTF8ToString(_))}for(let w=0;w<p;w++){let _=o._OrtGetOutputName(i,w);_===0&&Ue("Can't get an output name."),f.push(_);let $=o.UTF8ToString(_);h.push($);{if(b&&e?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let P=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[$]??"cpu";if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(b&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(P)}}let T=null;return v.some(w=>w==="gpu-buffer"||w==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&Ue("Can't create IO binding."),T={handle:a,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(w=>Fs(w))}),Qr.set(i,[i,l,f,T,b,!1]),[i,g,h]}catch(c){throw l.forEach(p=>o._OrtFree(p)),f.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a),i!==0&&o._OrtReleaseSession(i),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},vi=r=>{let e=Ke(),n=Qr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,s,a]=n;s&&(a&&e._OrtClearBoundOutputs(s.handle),e._OrtReleaseBinding(s.handle)),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t),Qr.delete(r)},Vx=(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let s=Ke(),a=r[0],u=r[1],l=r[3],f,c;if(a==="string"&&(l==="gpu-buffer"||l==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let g=r[2].gpuBuffer;c=Xr(Kn(a),u);let h=s.jsepRegisterBuffer;if(!h)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=h(t,o,g,c)}else if(l==="ml-tensor"){let g=r[2].mlTensor;c=Xr(Kn(a),u);let h=s.jsepRegisterMLTensor;if(!h)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=h(g,Kn(a),u)}else{let g=r[2];if(Array.isArray(g)){c=4*g.length,f=s._malloc(c),n.push(f);let h=f/4;for(let v=0;v<g.length;v++){if(typeof g[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);s.HEAPU32[h++]=ot(g[v],n)}}else c=g.byteLength,f=s._malloc(c),n.push(f),s.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,c),f)}let p=s.stackSave(),b=s.stackAlloc(4*u.length);try{let g=b/4;u.forEach(v=>s.HEAP32[g++]=v);let h=s._OrtCreateTensor(Kn(a),f,c,b,u.length,Fs(l));h===0&&Ue(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(h)}finally{s.stackRestore(p)}},Ti=async(r,e,n,t,o,i)=>{let s=Ke(),a=Qr.get(r);if(!a)throw new Error(`cannot run inference. invalid session id: ${r}`);let u=a[0],l=a[1],f=a[2],c=a[3],p=a[4],b=a[5],g=e.length,h=t.length,v=0,T=[],w=[],_=[],$=[],P=s.stackSave(),E=s.stackAlloc(g*4),B=s.stackAlloc(g*4),N=s.stackAlloc(h*4),H=s.stackAlloc(h*4);try{s.jsepOnRunStart?.(u),[v,T]=Lh(i);for(let oe=0;oe<g;oe++)Vx(n[oe],w,$,r,e[oe],p);for(let oe=0;oe<h;oe++)Vx(o[oe],_,$,r,g+t[oe],p);let q=E/4,V=B/4,se=N/4,fe=H/4;for(let oe=0;oe<g;oe++)s.HEAPU32[q++]=w[oe],s.HEAPU32[V++]=l[e[oe]];for(let oe=0;oe<h;oe++)s.HEAPU32[se++]=_[oe],s.HEAPU32[fe++]=f[t[oe]];if(c&&!b){let{handle:oe,outputPreferredLocations:Te,outputPreferredLocationsEncoded:Ie}=c;if(l.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${l.length}).`);for(let te=0;te<g;te++){let we=e[te];await s._OrtBindInput(oe,l[we],w[te])!==0&&Ue(`Can't bind input[${te}] for session=${r}.`)}for(let te=0;te<h;te++){let we=t[te];o[te]?.[3]?s._OrtBindOutput(oe,f[we],_[te],0)!==0&&Ue(`Can't bind pre-allocated output[${te}] for session=${r}.`):s._OrtBindOutput(oe,f[we],0,Ie[we])!==0&&Ue(`Can't bind output[${te}] to ${Te[te]} for session=${r}.`)}Qr.set(r,[u,l,f,c,p,!0])}let ye;c?ye=await s._OrtRunWithBinding(u,c.handle,h,N,v):ye=await s._OrtRun(u,B,E,g,H,h,N,v),ye!==0&&Ue("failed to call OrtRun().");let ve=[];for(let oe=0;oe<h;oe++){let Te=s.HEAPU32[N/4+oe];if(Te===_[oe]){ve.push(o[oe]);continue}let Ie=s.stackSave(),te=s.stackAlloc(4*4),we=!1,pe,me=0;try{s._OrtGetTensorData(Te,te,te+4,te+8,te+12)!==0&&Ue(`Can't access output tensor data on index ${oe}.`);let U=te/4,Y=s.HEAPU32[U++];me=s.HEAPU32[U++];let Be=s.HEAPU32[U++],yt=s.HEAPU32[U++],We=[];for(let et=0;et<yt;et++)We.push(s.HEAPU32[Be/4+et]);s._OrtFree(Be);let Ze=We.reduce((et,pt)=>et*pt,1);pe=Or(Y);let Er=c?.outputPreferredLocations[t[oe]];if(pe==="string"){if(Er==="gpu-buffer"||Er==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let et=[],pt=me/4;for(let xt=0;xt<Ze;xt++){let tn=s.HEAPU32[pt++],Cr=xt===Ze-1?void 0:s.HEAPU32[pt]-tn;et.push(s.UTF8ToString(tn,Cr))}ve.push([pe,We,et,"cpu"])}else if(Er==="gpu-buffer"&&Ze>0){let et=s.jsepGetBuffer;if(!et)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let pt=et(me),xt=Xr(Y,Ze);if(xt===void 0||!Pi(pe))throw new Error(`Unsupported data type: ${pe}`);we=!0,ve.push([pe,We,{gpuBuffer:pt,download:s.jsepCreateDownloader(pt,xt,pe),dispose:()=>{s._OrtReleaseTensor(Te)}},"gpu-buffer"])}else if(Er==="ml-tensor"&&Ze>0){let et=s.jsepEnsureTensor;if(!et)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Xr(Y,Ze)===void 0||!Oi(pe))throw new Error(`Unsupported data type: ${pe}`);let xt=await et(me,Y,We,!1);we=!0,ve.push([pe,We,{mlTensor:xt,download:s.jsepCreateMLTensorDownloader(me,pe),dispose:()=>{s.jsepReleaseTensorId(me),s._OrtReleaseTensor(Te)}},"ml-tensor"])}else{let et=Ai(pe),pt=new et(Ze);new Uint8Array(pt.buffer,pt.byteOffset,pt.byteLength).set(s.HEAPU8.subarray(me,me+pt.byteLength)),ve.push([pe,We,pt,"cpu"])}}finally{s.stackRestore(Ie),pe==="string"&&me&&s._free(me),we||s._OrtReleaseTensor(Te)}}return c&&!p&&(s._OrtClearBoundOutputs(c.handle),Qr.set(r,[u,l,f,c,p,!1])),ve}finally{s.stackRestore(P),w.forEach(q=>s._OrtReleaseTensor(q)),_.forEach(q=>s._OrtReleaseTensor(q)),$.forEach(q=>s._free(q)),v!==0&&s._OrtReleaseRunOptions(v),T.forEach(q=>s._free(q))}},_i=r=>{let e=Ke(),n=Qr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&Ue("Can't get an profile file name."),e._OrtFree(o)},Ii=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var en,Ft,oo,Qi,ea,Ji,wu,vu,$n,An,fS,Gx,Ux,Wx,Hx,qx,jx,Kx,Tu=C(()=>{"use strict";mt();Rs();Pr();Hn();en=()=>!!ce.wasm.proxy&&typeof document<"u",oo=!1,Qi=!1,ea=!1,vu=new Map,$n=(r,e)=>{let n=vu.get(r);n?n.push(e):vu.set(r,[e])},An=()=>{if(oo||!Qi||ea||!Ft)throw new Error("worker not ready")},fS=r=>{switch(r.data.type){case"init-wasm":oo=!1,r.data.err?(ea=!0,wu[1](r.data.err)):(Qi=!0,wu[0]()),Ji&&(URL.revokeObjectURL(Ji),Ji=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=vu.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},Gx=async()=>{if(!Qi){if(oo)throw new Error("multiple calls to 'initWasm()' detected.");if(ea)throw new Error("previous call to 'initWasm()' failed.");if(oo=!0,en())return new Promise((r,e)=>{Ft?.terminate(),kh().then(([n,t])=>{try{Ft=t,Ft.onerror=i=>e(i),Ft.onmessage=fS,wu=[r,e];let o={type:"init-wasm",in:ce};Ft.postMessage(o),Ji=n}catch(o){e(o)}},e)});try{await bi(ce.wasm),await yi(ce),Qi=!0}catch(r){throw ea=!0,r}finally{oo=!1}}},Ux=async r=>{if(en())return An(),new Promise((e,n)=>{$n("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:ce}};Ft.postMessage(t)});await xi(ce,r)},Wx=async r=>en()?(An(),new Promise((e,n)=>{$n("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Ft.postMessage(t,[r.buffer])})):qn(r),Hx=async(r,e)=>{if(en()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return An(),new Promise((n,t)=>{$n("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Ft.postMessage(o,i)})}else return wi(r,e)},qx=async r=>{if(en())return An(),new Promise((e,n)=>{$n("release",[e,n]);let t={type:"release",in:r};Ft.postMessage(t)});vi(r)},jx=async(r,e,n,t,o,i)=>{if(en()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return An(),new Promise((s,a)=>{$n("run",[s,a]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};Ft.postMessage(l,Ii(u))})}else return Ti(r,e,n,t,o,i)},Kx=async r=>{if(en())return An(),new Promise((e,n)=>{$n("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Ft.postMessage(t)});_i(r)}});var Xx,dS,ta,Zx=C(()=>{"use strict";mt();Tu();ue();gi();Vs();Xx=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},dS=r=>{switch(r[3]){case"cpu":return new nt(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Pi(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return nt.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!Oi(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return nt.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},ta=class{async fetchModelAndCopyToWasmMemory(e){return Wx(await Zn(e))}async loadModel(e,n){$t();let t;typeof e=="string"?!1?t=await Zn(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Hx(t,n),wt()}async dispose(){return qx(this.sessionId)}async run(e,n,t){$t();let o=[],i=[];Object.entries(e).forEach(p=>{let b=p[0],g=p[1],h=this.inputNames.indexOf(b);if(h===-1)throw new Error(`invalid input '${b}'`);o.push(g),i.push(h)});let s=[],a=[];Object.entries(n).forEach(p=>{let b=p[0],g=p[1],h=this.outputNames.indexOf(b);if(h===-1)throw new Error(`invalid output '${b}'`);s.push(g),a.push(h)});let u=o.map((p,b)=>Xx(p,()=>`input "${this.inputNames[i[b]]}"`)),l=s.map((p,b)=>p?Xx(p,()=>`output "${this.outputNames[a[b]]}"`):null),f=await jx(this.sessionId,i,u,a,l,t),c={};for(let p=0;p<f.length;p++)c[this.outputNames[a[p]]]=s[p]??dS(f[p]);return wt(),c}startProfiling(){}endProfiling(){Kx(this.sessionId)}}});var Jx={};un(Jx,{OnnxruntimeWebAssemblyBackend:()=>ra,initializeFlags:()=>Yx,wasmBackend:()=>pS});var Yx,ra,pS,Qx=C(()=>{"use strict";mt();Tu();Zx();Hn();Yx=()=>{if((typeof ce.wasm.initTimeout!="number"||ce.wasm.initTimeout<0)&&(ce.wasm.initTimeout=0),ce.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ce.wasm.proxy!="boolean"&&(ce.wasm.proxy=!1),typeof ce.wasm.trace!="boolean"&&(ce.wasm.trace=!1),typeof ce.wasm.numThreads!="number"||!Number.isInteger(ce.wasm.numThreads)||ce.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ce.wasm.numThreads=1;else{let r=typeof navigator>"u"?$a("node:os").cpus().length:navigator.hardwareConcurrency;ce.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}},ra=class{async init(e){Yx(),await Gx(),await Ux(e)}async createInferenceSessionHandler(e,n){let t=new ta;return await t.loadModel(e,n),Promise.resolve(t)}},pS=new ra});mt();mt();mt();var yc="1.20.1";var YV=Ea;{let r=(_h(),Pn(Th)).onnxjsBackend;vr("webgl",r,-10)}{let r=(Qx(),Pn(Jx)).wasmBackend;vr("webgpu",r,5),vr("webnn",r,5),vr("cpu",r,10),vr("wasm",r,10)}Object.defineProperty(ce.versions,"web",{value:yc,enumerable:!0});export{Iw as InferenceSession,Io as TRACE,$t as TRACE_FUNC_BEGIN,wt as TRACE_FUNC_END,nt as Tensor,$w as TrainingSession,YV as default,ce as env,vr as registerBackend};
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
