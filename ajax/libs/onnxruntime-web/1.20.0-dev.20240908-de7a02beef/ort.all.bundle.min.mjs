/*!
 * ONNX Runtime Web v1.20.0-dev.20240908-de7a02beef
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var sv=Object.create;var yo=Object.defineProperty;var uv=Object.getOwnPropertyDescriptor;var lv=Object.getOwnPropertyNames;var cv=Object.getPrototypeOf,fv=Object.prototype.hasOwnProperty;var wa=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var C=(r,e)=>()=>(r&&(e=r(r=0)),e);var Qe=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),sn=(r,e)=>{for(var n in e)yo(r,n,{get:e[n],enumerable:!0})},Ll=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of lv(e))!fv.call(r,o)&&o!==n&&yo(r,o,{get:()=>e[o],enumerable:!(t=uv(e,o))||t.enumerable});return r};var un=(r,e,n)=>(n=r!=null?sv(cv(r)):{},Ll(e||!r||!r.__esModule?yo(n,"default",{value:r,enumerable:!0}):n,r)),Pn=r=>Ll(yo({},"__esModule",{value:!0}),r);var xo,Dr,vr,dv,vo,wo=C(()=>{"use strict";xo=new Map,Dr=[],vr=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=xo.get(r);if(t===void 0)xo.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Dr.indexOf(r);o!==-1&&Dr.splice(o,1);for(let i=0;i<Dr.length;i++)if(xo.get(Dr[i]).priority<=n){Dr.splice(i,0,r);return}Dr.push(r)}return}throw new TypeError("not a valid backend")},dv=async r=>{let e=xo.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},vo=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Dr:n,o,i=[],s=new Set;for(let u of t){let l=await dv(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var Rl=C(()=>{"use strict";wo()});var zl,Nl=C(()=>{"use strict";zl="1.20.0-dev.20240827-5d54dc1462"});var Fl,It,Ta=C(()=>{"use strict";Nl();Fl="warning",It={wasm:{},webgl:{},webgpu:{},versions:{common:zl},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);Fl=r}},get logLevel(){return Fl}};Object.defineProperty(It,"logLevel",{enumerable:!0})});var ce,Vl=C(()=>{"use strict";Ta();ce=It});var Ml,Gl,Ul=C(()=>{"use strict";Ml=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let f=i*o,c=0,p=f,b=f*2,g=-1;s==="RGBA"?(c=0,p=f,b=f*2,g=f*3):s==="RGB"?(c=0,p=f,b=f*2):s==="RBG"&&(c=0,b=f,p=f*2);for(let h=0;h<i;h++)for(let w=0;w<o;w++){let T=(r.data[c++]-l[0])*u[0],v=(r.data[p++]-l[1])*u[1],_=(r.data[b++]-l[2])*u[2],$=g===-1?255:(r.data[g++]-l[3])*u[3];t.fillStyle="rgba("+T+","+v+","+_+","+$+")",t.fillRect(w,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Gl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],s=r.dims[3]):(o=r.dims[3],i=r.dims[2],s=r.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,f;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let c=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,b=0,g=1,h=2,w=3,T=0,v=c,_=c*2,$=-1;a==="RGBA"?(T=0,v=c,_=c*2,$=c*3):a==="RGB"?(T=0,v=c,_=c*2):a==="RBG"&&(T=0,_=c,v=c*2),t=n.createImageData(o,i);for(let P=0;P<i*o;b+=p,g+=p,h+=p,w+=p,P++)t.data[b]=(r.data[T++]-f[0])*l[0],t.data[g]=(r.data[v++]-f[1])*l[1],t.data[h]=(r.data[_++]-f[2])*l[2],t.data[w]=$===-1?255:(r.data[$++]-f[3])*l[3]}else throw new Error("Can not access image data");return t}});var _a,Wl,Hl,ql,jl,Kl=C(()=>{"use strict";To();_a=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,f=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,p=0,b=1,g=2,h=3,w=0,T=l,v=l*2,_=-1;a==="RGB"&&(c=3,p=0,b=1,g=2,h=-1),u==="RGBA"?_=l*3:u==="RBG"?(w=0,v=l,T=l*2):u==="BGR"&&(v=0,T=l,w=l*2);for(let P=0;P<l;P++,p+=c,g+=c,b+=c,h+=c)f[w++]=(r[p]+s[0])/i[0],f[T++]=(r[b]+s[1])/i[1],f[v++]=(r[g]+s[2])/i[2],_!==-1&&h!==-1&&(f[_++]=(r[h]+s[3])/i[3]);return u==="RGBA"?new mt("float32",f,[1,4,n,t]):new mt("float32",f,[1,3,n,t])},Wl=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=f=>f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,b=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,b=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=b}else a.tensorFormat="RGBA",a.height=p,a.width=b;c.drawImage(r,0,0),s=c.getImageData(0,0,b,p).data}else throw new Error("Can not access image data")}else if(t){let f,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(f=e.resizedHeight,c=e.resizedWidth):(f=r.height,c=r.width),e!==void 0&&(a=e),a.format="RGBA",a.height=f,a.width=c,e!==void 0){let p=u();p.width=c,p.height=f;let b=l(p);if(b!=null)b.putImageData(r,0,0),s=b.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else s=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=u();f.width=r.width,f.height=r.height;let c=l(f);if(c!=null){let p=r.height,b=r.width;return c.drawImage(r,0,0,b,p),s=c.getImageData(0,0,b,p).data,a.height=p,a.width=b,_a(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,c)=>{let p=u(),b=l(p);if(!r||!b)return c();let g=new Image;g.crossOrigin="Anonymous",g.src=r,g.onload=()=>{p.width=g.width,p.height=g.height,b.drawImage(g,0,0,p.width,p.height);let h=b.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,f(_a(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return _a(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},Hl=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,s=[1,t,n,4];return new mt({location:"texture",type:"float32",texture:r,dims:s,download:o,dispose:i})},ql=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new mt({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},jl=(r,e,n)=>new mt({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Br,On,Xl,Zl,Yl=C(()=>{"use strict";Br=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),On=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Xl=!1,Zl=()=>{if(!Xl){Xl=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;r&&(Br.set("int64",BigInt64Array),On.set(BigInt64Array,"int64")),e&&(Br.set("uint64",BigUint64Array),On.set(BigUint64Array,"uint64")),n?(Br.set("float16",Float16Array),On.set(Float16Array,"float16")):Br.set("float16",Uint16Array)}}});var Jl,Ql,ec=C(()=>{"use strict";To();Jl=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},Ql=(r,e)=>{switch(r.location){case"cpu":return new mt(r.type,r.data,e);case"cpu-pinned":return new mt({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new mt({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new mt({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var mt,To=C(()=>{"use strict";Ul();Kl();Yl();ec();mt=class{constructor(e,n,t){Zl();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=Br.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=Br.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=On.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Jl(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,n){return Wl(e,n)}static fromTexture(e,n){return Hl(e,n)}static fromGpuBuffer(e,n){return ql(e,n)}static fromPinnedBuffer(e,n,t){return jl(e,n,t)}toDataURL(e){return Ml(this,e)}toImageData(e){return Gl(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ql(this,e)}}});var it,_o=C(()=>{"use strict";To();it=mt});var Io,tc,St,yt,Ia=C(()=>{"use strict";Ta();Io=(r,e)=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||console.timeStamp(`${r}::ORT::${e}`)},tc=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),Io("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},St=r=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||tc("BEGIN",r)},yt=r=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||tc("END",r)}});var So,rc=C(()=>{"use strict";wo();_o();Ia();So=class r{constructor(e){this.handler=e}async run(e,n,t){St();let o={},i={};if(typeof e!="object"||e===null||e instanceof it||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof it)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof it)&&(l=!0,s=!1,o[c]=p)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let f=a[l];f instanceof it?u[l]=f:u[l]=new it(f.type,f.data,f.dims)}return yt(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){St();let i,s={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let f=e,c=0,p=e.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(p=e.byteLength-c,typeof t=="number"){if(p=t,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await vo(s),l=await a.createInferenceSessionHandler(i,u);return yt(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var pv,nc=C(()=>{"use strict";rc();pv=So});var oc=C(()=>{"use strict"});var ic=C(()=>{"use strict"});var ac=C(()=>{"use strict"});var sc=C(()=>{"use strict"});var mv,$o,uc=C(()=>{"use strict";wo();_o();mv="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",$o=class r{constructor(e,n,t){this.handler=e,this.hasOptimizerModel=n,this.hasEvalModel=t}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(e,n){let t=e.evalModel||"",o=e.optimizerModel||"",i=n||{},[s,a]=await vo(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(e.checkpointState,e.trainModel,t,o,a);return new r(u,!!e.optimizerModel,!!e.evalModel)}else throw new Error(mv)}typeNarrowingForRunStep(e,n,t,o,i){let s={},a={};if(typeof t!="object"||t===null||t instanceof it||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof it)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(o);for(let c of n)if(f.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof it)&&(l=!0,u=!1,s[c]=p)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of e)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of n)s[l]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(e){let n={};for(let t in e)if(Object.hasOwnProperty.call(e,t)){let o=e[t];o instanceof it?n[t]=o:n[t]=new it(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(e,n,t){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,e,n,t),s=await this.handler.runTrainStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(e){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(e||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(e,n,t){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,e,n,t),s=await this.handler.runEvalStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(e=!0){return this.handler.getParametersSize(e)}async loadParametersBuffer(e,n=!0){let t=await this.getParametersSize(n);if(e.length!==4*t)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(e,n)}async getContiguousParameters(e=!0){return this.handler.getContiguousParameters(e)}async release(){return this.handler.dispose()}}});var hv,lc=C(()=>{"use strict";uc();hv=$o});var Sa={};sn(Sa,{InferenceSession:()=>pv,TRACE:()=>Io,TRACE_FUNC_BEGIN:()=>St,TRACE_FUNC_END:()=>yt,Tensor:()=>it,TrainingSession:()=>hv,env:()=>ce,registerBackend:()=>vr});var ft=C(()=>{"use strict";Rl();Vl();nc();_o();oc();ic();Ia();ac();sc();lc()});function wr(r,e,n,t){if(e===void 0)return bv(r);if(n===void 0)Ao(r,e,1);else if(typeof n=="number"&&t===void 0)Ao(r,e,n);else if(typeof n=="string"&&t===void 0)Ao(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")Ao(r,n,t,e);else throw new TypeError("input is valid")}function bv(r){return{verbose:wr.verbose.bind(null,r),info:wr.info.bind(null,r),warning:wr.warning.bind(null,r),error:wr.error.bind(null,r),fatal:wr.fatal.bind(null,r)}}function Ao(r,e,n,t){let o=En[t||""]||En[""];fc[r]<fc[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,gv[o.provider].log(r,e,t))}var $a,Aa,fc,gv,dc,En,Re,Oo,Eo,Co,Po,kt=C(()=>{"use strict";$a=class{log(e,n,t){}},Aa=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},fc={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},gv={none:new $a,console:new Aa},dc={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},En={"":dc};(u=>{function r(l,f){u("verbose",l,f)}u.verbose=r;function e(l,f){u("info",l,f)}u.info=e;function n(l,f){u("warning",l,f)}u.warning=n;function t(l,f){u("error",l,f)}u.error=t;function o(l,f){u("fatal",l,f)}u.fatal=o;function i(l){En={},s("",l||{})}u.reset=i;function s(l,f){if(l==="*")i(f);else{let c=En[l]||dc;En[l]={provider:f.provider||c.provider,minimalSeverity:f.minimalSeverity||c.minimalSeverity,logDateTime:f.logDateTime===void 0?c.logDateTime:f.logDateTime,logSourceLocation:f.logSourceLocation===void 0?c.logSourceLocation:f.logSourceLocation}}}u.set=s;function a(l){let f={};l.logLevel&&(f.minimalSeverity=l.logLevel),s("",f)}u.setWithEnv=a})(wr||={});Re=wr,Oo=class{constructor(e,n,t,o,i,s){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Eo=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},Co=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=Po(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async f=>{i&&await i.end(),u(f)},async f=>{i&&await i.end(),l(f)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,f)=>{u.then(()=>{l(a)},c=>{f(c)})})}return a}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=Po();return this.flush(o),new Oo(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new Oo(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Eo(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=Po();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Eo(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Re.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=Po()}}get started(){return this._started}},Po=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function pc(r,e,n){for(let t of n){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&yv(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function yv(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var mc=C(()=>{"use strict"});var hc=Qe(Pa=>{"use strict";Pa.__esModule=!0;var xv=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();Pa.Guid=xv});function Ve(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function dt(r){return(r&&r.__isLong__)===!0}function gc(r){var e=Math.clz32(r&-r);return r?31-e:e}function Lr(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=yc[r],t)?t:(n=De(r,0,!0),o&&(yc[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=bc[r],t)?t:(n=De(r,r<0?-1:0,!1),o&&(bc[r]=n),n))}function Bt(r,e){if(isNaN(r))return e?fr:Mt;if(e){if(r<0)return fr;if(r>=Tc)return Sc}else{if(r<=-vc)return xt;if(r+1>=vc)return Ic}return r<0?Bt(-r,e).neg():De(r%cn|0,r/cn|0,e)}function De(r,e,n){return new Ve(r,e,n)}function Ea(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?fr:Mt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Ea(r.substring(1),e,n).neg();for(var o=Bt(ko(n,8)),i=Mt,s=0;s<r.length;s+=8){var a=Math.min(8,r.length-s),u=parseInt(r.substring(s,s+a),n);if(a<8){var l=Bt(ko(n,a));i=i.mul(l).add(Bt(u))}else i=i.mul(o),i=i.add(Bt(u))}return i.unsigned=e,i}function Gt(r,e){return typeof r=="number"?Bt(r,e):typeof r=="string"?Ea(r,e):De(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var Dt,bc,yc,ko,xc,vv,cn,Tc,vc,wc,Mt,fr,ln,_c,Oa,Ic,Sc,xt,U,dr,Ca=C(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ve.prototype.__isLong__;Object.defineProperty(Ve.prototype,"__isLong__",{value:!0});Ve.isLong=dt;bc={},yc={};Ve.fromInt=Lr;Ve.fromNumber=Bt;Ve.fromBits=De;ko=Math.pow;Ve.fromString=Ea;Ve.fromValue=Gt;xc=65536,vv=1<<24,cn=xc*xc,Tc=cn*cn,vc=Tc/2,wc=Lr(vv),Mt=Lr(0);Ve.ZERO=Mt;fr=Lr(0,!0);Ve.UZERO=fr;ln=Lr(1);Ve.ONE=ln;_c=Lr(1,!0);Ve.UONE=_c;Oa=Lr(-1);Ve.NEG_ONE=Oa;Ic=De(-1,2147483647,!1);Ve.MAX_VALUE=Ic;Sc=De(-1,-1,!0);Ve.MAX_UNSIGNED_VALUE=Sc;xt=De(0,-2147483648,!1);Ve.MIN_VALUE=xt;U=Ve.prototype;U.toInt=function(){return this.unsigned?this.low>>>0:this.low};U.toNumber=function(){return this.unsigned?(this.high>>>0)*cn+(this.low>>>0):this.high*cn+(this.low>>>0)};U.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(xt)){var n=Bt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Bt(ko(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,f=l.toString(e);if(s=u,s.isZero())return f+a;for(;f.length<6;)f="0"+f;a=""+f+a}};U.getHighBits=function(){return this.high};U.getHighBitsUnsigned=function(){return this.high>>>0};U.getLowBits=function(){return this.low};U.getLowBitsUnsigned=function(){return this.low>>>0};U.getNumBitsAbs=function(){if(this.isNegative())return this.eq(xt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};U.isZero=function(){return this.high===0&&this.low===0};U.eqz=U.isZero;U.isNegative=function(){return!this.unsigned&&this.high<0};U.isPositive=function(){return this.unsigned||this.high>=0};U.isOdd=function(){return(this.low&1)===1};U.isEven=function(){return(this.low&1)===0};U.equals=function(e){return dt(e)||(e=Gt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};U.eq=U.equals;U.notEquals=function(e){return!this.eq(e)};U.neq=U.notEquals;U.ne=U.notEquals;U.lessThan=function(e){return this.comp(e)<0};U.lt=U.lessThan;U.lessThanOrEqual=function(e){return this.comp(e)<=0};U.lte=U.lessThanOrEqual;U.le=U.lessThanOrEqual;U.greaterThan=function(e){return this.comp(e)>0};U.gt=U.greaterThan;U.greaterThanOrEqual=function(e){return this.comp(e)>=0};U.gte=U.greaterThanOrEqual;U.ge=U.greaterThanOrEqual;U.compare=function(e){if(dt(e)||(e=Gt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};U.comp=U.compare;U.negate=function(){return!this.unsigned&&this.eq(xt)?xt:this.not().add(ln)};U.neg=U.negate;U.add=function(e){dt(e)||(e=Gt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,f=0,c=0,p=0,b=0;return b+=i+l,p+=b>>>16,b&=65535,p+=o+u,c+=p>>>16,p&=65535,c+=t+a,f+=c>>>16,c&=65535,f+=n+s,f&=65535,De(p<<16|b,f<<16|c,this.unsigned)};U.subtract=function(e){return dt(e)||(e=Gt(e)),this.add(e.neg())};U.sub=U.subtract;U.multiply=function(e){if(this.isZero())return this;if(dt(e)||(e=Gt(e)),Dt){var n=Dt.mul(this.low,this.high,e.low,e.high);return De(n,Dt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?fr:Mt;if(this.eq(xt))return e.isOdd()?xt:Mt;if(e.eq(xt))return this.isOdd()?xt:Mt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(wc)&&e.lt(wc))return Bt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,f=e.low&65535,c=0,p=0,b=0,g=0;return g+=s*f,b+=g>>>16,g&=65535,b+=i*f,p+=b>>>16,b&=65535,b+=s*l,p+=b>>>16,b&=65535,p+=o*f,c+=p>>>16,p&=65535,p+=i*l,c+=p>>>16,p&=65535,p+=s*u,c+=p>>>16,p&=65535,c+=t*f+o*l+i*u+s*a,c&=65535,De(b<<16|g,c<<16|p,this.unsigned)};U.mul=U.multiply;U.divide=function(e){if(dt(e)||(e=Gt(e)),e.isZero())throw Error("division by zero");if(Dt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high);return De(n,Dt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?fr:Mt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return fr;if(e.gt(this.shru(1)))return _c;i=fr}else{if(this.eq(xt)){if(e.eq(ln)||e.eq(Oa))return xt;if(e.eq(xt))return ln;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(Mt)?e.isNegative()?ln:Oa:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(xt))return this.unsigned?fr:Mt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Mt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:ko(2,a-48),l=Bt(t),f=l.mul(e);f.isNegative()||f.gt(o);)t-=u,l=Bt(t,this.unsigned),f=l.mul(e);l.isZero()&&(l=ln),i=i.add(l),o=o.sub(f)}return i};U.div=U.divide;U.modulo=function(e){if(dt(e)||(e=Gt(e)),Dt){var n=(this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high);return De(n,Dt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};U.mod=U.modulo;U.rem=U.modulo;U.not=function(){return De(~this.low,~this.high,this.unsigned)};U.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};U.clz=U.countLeadingZeros;U.countTrailingZeros=function(){return this.low?gc(this.low):gc(this.high)+32};U.ctz=U.countTrailingZeros;U.and=function(e){return dt(e)||(e=Gt(e)),De(this.low&e.low,this.high&e.high,this.unsigned)};U.or=function(e){return dt(e)||(e=Gt(e)),De(this.low|e.low,this.high|e.high,this.unsigned)};U.xor=function(e){return dt(e)||(e=Gt(e)),De(this.low^e.low,this.high^e.high,this.unsigned)};U.shiftLeft=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?De(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):De(0,this.low<<e-32,this.unsigned)};U.shl=U.shiftLeft;U.shiftRight=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?De(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):De(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};U.shr=U.shiftRight;U.shiftRightUnsigned=function(e){return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?De(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?De(this.high,0,this.unsigned):De(this.high>>>e-32,0,this.unsigned)};U.shru=U.shiftRightUnsigned;U.shr_u=U.shiftRightUnsigned;U.rotateLeft=function(e){var n;return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?De(this.high,this.low,this.unsigned):e<32?(n=32-e,De(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,De(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};U.rotl=U.rotateLeft;U.rotateRight=function(e){var n;return dt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?De(this.high,this.low,this.unsigned):e<32?(n=32-e,De(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,De(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};U.rotr=U.rotateRight;U.toSigned=function(){return this.unsigned?De(this.low,this.high,!1):this};U.toUnsigned=function(){return this.unsigned?this:De(this.low,this.high,!0)};U.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};U.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};U.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Ve.fromBytes=function(e,n,t){return t?Ve.fromBytesLE(e,n):Ve.fromBytesBE(e,n)};Ve.fromBytesLE=function(e,n){return new Ve(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Ve.fromBytesBE=function(e,n){return new Ve(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};dr=Ve});var k,Do=C(()=>{k={};k.Offset;k.Table;k.SIZEOF_SHORT=2;k.SIZEOF_INT=4;k.FILE_IDENTIFIER_LENGTH=4;k.SIZE_PREFIX_LENGTH=4;k.Encoding={UTF8_BYTES:1,UTF16_STRING:2};k.int32=new Int32Array(2);k.float32=new Float32Array(k.int32.buffer);k.float64=new Float64Array(k.int32.buffer);k.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;k.Long=function(r,e){this.low=r|0,this.high=e|0};k.Long.create=function(r,e){return r==0&&e==0?k.Long.ZERO:new k.Long(r,e)};k.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};k.Long.prototype.equals=function(r){return this.low==r.low&&this.high==r.high};k.Long.ZERO=new k.Long(0,0);k.Builder=function(r){if(r)var e=r;else var e=1024;this.bb=k.ByteBuffer.allocate(e),this.space=e,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};k.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};k.Builder.prototype.forceDefaults=function(r){this.force_defaults=r};k.Builder.prototype.dataBuffer=function(){return this.bb};k.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};k.Builder.prototype.prep=function(r,e){r>this.minalign&&(this.minalign=r);for(var n=~(this.bb.capacity()-this.space+e)+1&r-1;this.space<n+r+e;){var t=this.bb.capacity();this.bb=k.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)};k.Builder.prototype.pad=function(r){for(var e=0;e<r;e++)this.bb.writeInt8(--this.space,0)};k.Builder.prototype.writeInt8=function(r){this.bb.writeInt8(this.space-=1,r)};k.Builder.prototype.writeInt16=function(r){this.bb.writeInt16(this.space-=2,r)};k.Builder.prototype.writeInt32=function(r){this.bb.writeInt32(this.space-=4,r)};k.Builder.prototype.writeInt64=function(r){this.bb.writeInt64(this.space-=8,r)};k.Builder.prototype.writeFloat32=function(r){this.bb.writeFloat32(this.space-=4,r)};k.Builder.prototype.writeFloat64=function(r){this.bb.writeFloat64(this.space-=8,r)};k.Builder.prototype.addInt8=function(r){this.prep(1,0),this.writeInt8(r)};k.Builder.prototype.addInt16=function(r){this.prep(2,0),this.writeInt16(r)};k.Builder.prototype.addInt32=function(r){this.prep(4,0),this.writeInt32(r)};k.Builder.prototype.addInt64=function(r){this.prep(8,0),this.writeInt64(r)};k.Builder.prototype.addFloat32=function(r){this.prep(4,0),this.writeFloat32(r)};k.Builder.prototype.addFloat64=function(r){this.prep(8,0),this.writeFloat64(r)};k.Builder.prototype.addFieldInt8=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(r))};k.Builder.prototype.addFieldInt16=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(r))};k.Builder.prototype.addFieldInt32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(r))};k.Builder.prototype.addFieldInt64=function(r,e,n){(this.force_defaults||!e.equals(n))&&(this.addInt64(e),this.slot(r))};k.Builder.prototype.addFieldFloat32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(r))};k.Builder.prototype.addFieldFloat64=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(r))};k.Builder.prototype.addFieldOffset=function(r,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(r))};k.Builder.prototype.addFieldStruct=function(r,e,n){e!=n&&(this.nested(e),this.slot(r))};k.Builder.prototype.nested=function(r){if(r!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};k.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};k.Builder.prototype.slot=function(r){this.vtable[r]=this.offset()};k.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};k.Builder.growByteBuffer=function(r){var e=r.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var n=e<<1,t=k.ByteBuffer.allocate(n);return t.setPosition(n-e),t.bytes().set(r.bytes(),n-e),t};k.Builder.prototype.addOffset=function(r){this.prep(k.SIZEOF_INT,0),this.writeInt32(this.offset()-r+k.SIZEOF_INT)};k.Builder.prototype.startObject=function(r){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=r;for(var e=0;e<r;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()};k.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var r=this.offset(),e=this.vtable_in_use-1;e>=0&&this.vtable[e]==0;e--);for(var n=e+1;e>=0;e--)this.addInt16(this.vtable[e]!=0?r-this.vtable[e]:0);var t=2;this.addInt16(r-this.object_start);var o=(n+t)*k.SIZEOF_SHORT;this.addInt16(o);var i=0,s=this.space;e:for(e=0;e<this.vtables.length;e++){var a=this.bb.capacity()-this.vtables[e];if(o==this.bb.readInt16(a)){for(var u=k.SIZEOF_SHORT;u<o;u+=k.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(a+u))continue e;i=this.vtables[e];break}}return i?(this.space=this.bb.capacity()-r,this.bb.writeInt32(this.space,i-r)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-r,this.offset()-r)),this.isNested=!1,r};k.Builder.prototype.finish=function(r,e,n){var t=n?k.SIZE_PREFIX_LENGTH:0;if(e){var o=e;if(this.prep(this.minalign,k.SIZEOF_INT+k.FILE_IDENTIFIER_LENGTH+t),o.length!=k.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+k.FILE_IDENTIFIER_LENGTH);for(var i=k.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(o.charCodeAt(i))}this.prep(this.minalign,k.SIZEOF_INT+t),this.addOffset(r),t&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};k.Builder.prototype.finishSizePrefixed=function(r,e){this.finish(r,e,!0)};k.Builder.prototype.requiredField=function(r,e){var n=this.bb.capacity()-r,t=n-this.bb.readInt32(n),o=this.bb.readInt16(t+e)!=0;if(!o)throw new Error("FlatBuffers: field "+e+" must be set")};k.Builder.prototype.startVector=function(r,e,n){this.notNested(),this.vector_num_elems=e,this.prep(k.SIZEOF_INT,r*e),this.prep(n,r*e)};k.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};k.Builder.prototype.createString=function(r){if(r instanceof Uint8Array)var e=r;else for(var e=[],n=0;n<r.length;){var t,o=r.charCodeAt(n++);if(o<55296||o>=56320)t=o;else{var i=r.charCodeAt(n++);t=(o<<10)+i+(65536-56623104-56320)}t<128?e.push(t):(t<2048?e.push(t>>6&31|192):(t<65536?e.push(t>>12&15|224):e.push(t>>18&7|240,t>>12&63|128),e.push(t>>6&63|128)),e.push(t&63|128))}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(var n=0,s=this.space,a=this.bb.bytes();n<e.length;n++)a[s++]=e[n];return this.endVector()};k.Builder.prototype.createLong=function(r,e){return k.Long.create(r,e)};k.ByteBuffer=function(r){this.bytes_=r,this.position_=0};k.ByteBuffer.allocate=function(r){return new k.ByteBuffer(new Uint8Array(r))};k.ByteBuffer.prototype.clear=function(){this.position_=0};k.ByteBuffer.prototype.bytes=function(){return this.bytes_};k.ByteBuffer.prototype.position=function(){return this.position_};k.ByteBuffer.prototype.setPosition=function(r){this.position_=r};k.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};k.ByteBuffer.prototype.readInt8=function(r){return this.readUint8(r)<<24>>24};k.ByteBuffer.prototype.readUint8=function(r){return this.bytes_[r]};k.ByteBuffer.prototype.readInt16=function(r){return this.readUint16(r)<<16>>16};k.ByteBuffer.prototype.readUint16=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8};k.ByteBuffer.prototype.readInt32=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8|this.bytes_[r+2]<<16|this.bytes_[r+3]<<24};k.ByteBuffer.prototype.readUint32=function(r){return this.readInt32(r)>>>0};k.ByteBuffer.prototype.readInt64=function(r){return new k.Long(this.readInt32(r),this.readInt32(r+4))};k.ByteBuffer.prototype.readUint64=function(r){return new k.Long(this.readUint32(r),this.readUint32(r+4))};k.ByteBuffer.prototype.readFloat32=function(r){return k.int32[0]=this.readInt32(r),k.float32[0]};k.ByteBuffer.prototype.readFloat64=function(r){return k.int32[k.isLittleEndian?0:1]=this.readInt32(r),k.int32[k.isLittleEndian?1:0]=this.readInt32(r+4),k.float64[0]};k.ByteBuffer.prototype.writeInt8=function(r,e){this.bytes_[r]=e};k.ByteBuffer.prototype.writeUint8=function(r,e){this.bytes_[r]=e};k.ByteBuffer.prototype.writeInt16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};k.ByteBuffer.prototype.writeUint16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};k.ByteBuffer.prototype.writeInt32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};k.ByteBuffer.prototype.writeUint32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};k.ByteBuffer.prototype.writeInt64=function(r,e){this.writeInt32(r,e.low),this.writeInt32(r+4,e.high)};k.ByteBuffer.prototype.writeUint64=function(r,e){this.writeUint32(r,e.low),this.writeUint32(r+4,e.high)};k.ByteBuffer.prototype.writeFloat32=function(r,e){k.float32[0]=e,this.writeInt32(r,k.int32[0])};k.ByteBuffer.prototype.writeFloat64=function(r,e){k.float64[0]=e,this.writeInt32(r,k.int32[k.isLittleEndian?0:1]),this.writeInt32(r+4,k.int32[k.isLittleEndian?1:0])};k.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+k.SIZEOF_INT+k.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var r="",e=0;e<k.FILE_IDENTIFIER_LENGTH;e++)r+=String.fromCharCode(this.readInt8(this.position_+k.SIZEOF_INT+e));return r};k.ByteBuffer.prototype.__offset=function(r,e){var n=r-this.readInt32(r);return e<this.readInt16(n)?this.readInt16(n+e):0};k.ByteBuffer.prototype.__union=function(r,e){return r.bb_pos=e+this.readInt32(e),r.bb=this,r};k.ByteBuffer.prototype.__string=function(r,e){r+=this.readInt32(r);var n=this.readInt32(r),t="",o=0;if(r+=k.SIZEOF_INT,e===k.Encoding.UTF8_BYTES)return this.bytes_.subarray(r,r+n);for(;o<n;){var i,s=this.readUint8(r+o++);if(s<192)i=s;else{var a=this.readUint8(r+o++);if(s<224)i=(s&31)<<6|a&63;else{var u=this.readUint8(r+o++);if(s<240)i=(s&15)<<12|(a&63)<<6|u&63;else{var l=this.readUint8(r+o++);i=(s&7)<<18|(a&63)<<12|(u&63)<<6|l&63}}}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode((i>>10)+55296,(i&1024-1)+56320))}return t};k.ByteBuffer.prototype.__indirect=function(r){return r+this.readInt32(r)};k.ByteBuffer.prototype.__vector=function(r){return r+this.readInt32(r)+k.SIZEOF_INT};k.ByteBuffer.prototype.__vector_len=function(r){return this.readInt32(r+this.readInt32(r))};k.ByteBuffer.prototype.__has_identifier=function(r){if(r.length!=k.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+k.FILE_IDENTIFIER_LENGTH);for(var e=0;e<k.FILE_IDENTIFIER_LENGTH;e++)if(r.charCodeAt(e)!=this.readInt8(this.position_+k.SIZEOF_INT+e))return!1;return!0};k.ByteBuffer.prototype.createLong=function(r,e){return k.Long.create(r,e)}});var ee,Cn=C(()=>{"use strict";Do();(e=>{let r;(t=>{let n;(i=>{let o;(_=>(_[_.UNDEFINED=0]="UNDEFINED",_[_.FLOAT=1]="FLOAT",_[_.INT=2]="INT",_[_.STRING=3]="STRING",_[_.TENSOR=4]="TENSOR",_[_.GRAPH=5]="GRAPH",_[_.FLOATS=6]="FLOATS",_[_.INTS=7]="INTS",_[_.STRINGS=8]="STRINGS",_[_.TENSORS=9]="TENSORS",_[_.GRAPHS=10]="GRAPHS",_[_.SPARSE_TENSOR=11]="SPARSE_TENSOR",_[_.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(o=i.AttributeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(o=i.DimensionValueType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(M=>(M[M.UNDEFINED=0]="UNDEFINED",M[M.FLOAT=1]="FLOAT",M[M.UINT8=2]="UINT8",M[M.INT8=3]="INT8",M[M.UINT16=4]="UINT16",M[M.INT16=5]="INT16",M[M.INT32=6]="INT32",M[M.INT64=7]="INT64",M[M.STRING=8]="STRING",M[M.BOOL=9]="BOOL",M[M.FLOAT16=10]="FLOAT16",M[M.DOUBLE=11]="DOUBLE",M[M.UINT32=12]="UINT32",M[M.UINT64=13]="UINT64",M[M.COMPLEX64=14]="COMPLEX64",M[M.COMPLEX128=15]="COMPLEX128",M[M.BFLOAT16=16]="BFLOAT16",M[M.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",M[M.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",M[M.FLOAT8E5M2=19]="FLOAT8E5M2",M[M.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(o=i.TensorDataType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(o=i.NodeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{let o;(f=>(f[f.NONE=0]="NONE",f[f.tensor_type=1]="tensor_type",f[f.sequence_type=2]="sequence_type",f[f.map_type=3]="map_type"))(o=i.TypeInfoValue||={})})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsShape(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dim(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}dimLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}static startShape(a){a.startObject(1)}static addDim(a,u){a.addFieldOffset(0,u,0)}static createDimVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startDimVector(a,u){a.startVector(4,u,4)}static endShape(a){return a.endObject()}static createShape(a,u){return o.startShape(a),o.addDim(a,u),o.endShape(a)}}i.Shape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimension(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimension(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}value(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimension(a){a.startObject(2)}static addValue(a,u){a.addFieldOffset(0,u,0)}static addDenotation(a,u){a.addFieldOffset(1,u,0)}static endDimension(a){return a.endObject()}static createDimension(a,u,l){return o.startDimension(a),o.addValue(a,u),o.addDenotation(a,l),o.endDimension(a)}}i.Dimension=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimensionValue(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimensionValue(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dimType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt8(this.bb_pos+a):0}dimValue(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}dimParam(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimensionValue(a){a.startObject(3)}static addDimType(a,u){a.addFieldInt8(0,u,0)}static addDimValue(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static addDimParam(a,u){a.addFieldOffset(2,u,0)}static endDimensionValue(a){return a.endObject()}static createDimensionValue(a,u,l,f){return o.startDimensionValue(a),o.addDimType(a,u),o.addDimValue(a,l),o.addDimParam(a,f),o.endDimensionValue(a)}}i.DimensionValue=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensorTypeAndShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}shape(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,u){a.addFieldInt32(0,u,0)}static addShape(a,u){a.addFieldOffset(1,u,0)}static endTensorTypeAndShape(a){return a.endObject()}static createTensorTypeAndShape(a,u,l){return o.startTensorTypeAndShape(a),o.addElemType(a,u),o.addShape(a,l),o.endTensorTypeAndShape(a)}}i.TensorTypeAndShape=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsMapType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}keyType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}valueType(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,u){a.addFieldInt32(0,u,0)}static addValueType(a,u){a.addFieldOffset(1,u,0)}static endMapType(a){return a.endObject()}static createMapType(a,u,l){return o.startMapType(a),o.addKeyType(a,u),o.addValueType(a,l),o.endMapType(a)}}i.MapType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSequenceType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSequenceType(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(a){a.startObject(1)}static addElemType(a,u){a.addFieldOffset(0,u,0)}static endSequenceType(a){return a.endObject()}static createSequenceType(a,u){return o.startSequenceType(a),o.addElemType(a,u),o.endSequenceType(a)}}i.SequenceType=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(a,u,l,f){return a.prep(4,12),a.writeInt32(f),a.writeInt32(l),a.writeInt32(u),a.offset()}}i.EdgeEnd=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNodeEdge(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNodeEdge(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndex(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readUint32(this.bb_pos+a):0}inputEdges(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}inputEdgesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}outputEdges(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}outputEdgesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNodeEdge(a){a.startObject(3)}static addNodeIndex(a,u){a.addFieldInt32(0,u,0)}static addInputEdges(a,u){a.addFieldOffset(1,u,0)}static startInputEdgesVector(a,u){a.startVector(12,u,4)}static addOutputEdges(a,u){a.addFieldOffset(2,u,0)}static startOutputEdgesVector(a,u){a.startVector(12,u,4)}static endNodeEdge(a){return a.endObject()}static createNodeEdge(a,u,l,f){return o.startNodeEdge(a),o.addNodeIndex(a,u),o.addInputEdges(a,l),o.addOutputEdges(a,f),o.endNodeEdge(a)}}i.NodeEdge=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNode(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}sinceVersion(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):0}executionProviderType(a){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,a):null}inputs(a,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new e.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}attributesLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+a*4):0}inputArgCountsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){let a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}implicitInputsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDomain(a,u){a.addFieldOffset(2,u,0)}static addSinceVersion(a,u){a.addFieldInt32(3,u,0)}static addIndex(a,u){a.addFieldInt32(4,u,0)}static addOpType(a,u){a.addFieldOffset(5,u,0)}static addType(a,u){a.addFieldInt32(6,u,0)}static addExecutionProviderType(a,u){a.addFieldOffset(7,u,0)}static addInputs(a,u){a.addFieldOffset(8,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(9,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addAttributes(a,u){a.addFieldOffset(10,u,0)}static createAttributesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startAttributesVector(a,u){a.startVector(4,u,4)}static addInputArgCounts(a,u){a.addFieldOffset(11,u,0)}static createInputArgCountsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startInputArgCountsVector(a,u){a.startVector(4,u,4)}static addImplicitInputs(a,u){a.addFieldOffset(12,u,0)}static createImplicitInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startImplicitInputsVector(a,u){a.startVector(4,u,4)}static endNode(a){return a.endObject()}static createNode(a,u,l,f,c,p,b,g,h,w,T,v,_,$){return o.startNode(a),o.addName(a,u),o.addDocString(a,l),o.addDomain(a,f),o.addSinceVersion(a,c),o.addIndex(a,p),o.addOpType(a,b),o.addType(a,g),o.addExecutionProviderType(a,h),o.addInputs(a,w),o.addOutputs(a,T),o.addAttributes(a,v),o.addInputArgCounts(a,_),o.addImplicitInputs(a,$),o.endNode(a)}}i.Node=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsValueInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsValueInfo(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(a){a.startObject(3)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldOffset(2,u,0)}static endValueInfo(a){return a.endObject()}static createValueInfo(a,u,l,f){return o.startValueInfo(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.endValueInfo(a)}}i.ValueInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTypeInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTypeInfo(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}denotation(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}valueType(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readUint8(this.bb_pos+a):0}value(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(a,this.bb_pos+u):null}static startTypeInfo(a){a.startObject(3)}static addDenotation(a,u){a.addFieldOffset(0,u,0)}static addValueType(a,u){a.addFieldInt8(1,u,0)}static addValue(a,u){a.addFieldOffset(2,u,0)}static endTypeInfo(a){return a.endObject()}static createTypeInfo(a,u,l,f){return o.startTypeInfo(a),o.addDenotation(a,u),o.addValueType(a,l),o.addValue(a,f),o.endTypeInfo(a)}}i.TypeInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsOperatorSetId(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsOperatorSetId(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}domain(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}version(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}static startOperatorSetId(a){a.startObject(2)}static addDomain(a,u){a.addFieldOffset(0,u,0)}static addVersion(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static endOperatorSetId(a){return a.endObject()}static createOperatorSetId(a,u,l){return o.startOperatorSetId(a),o.addDomain(a,u),o.addVersion(a,l),o.endOperatorSetId(a)}}i.OperatorSetId=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensor(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}dataType(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}rawData(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+a):0}rawDataLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}rawDataArray(){let a=this.bb.__offset(this.bb_pos,12);return a?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}stringData(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringDataLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}static startTensor(a){a.startObject(6)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static addDataType(a,u){a.addFieldInt32(3,u,0)}static addRawData(a,u){a.addFieldOffset(4,u,0)}static createRawDataVector(a,u){a.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)a.addInt8(u[l]);return a.endVector()}static startRawDataVector(a,u){a.startVector(1,u,1)}static addStringData(a,u){a.addFieldOffset(5,u,0)}static createStringDataVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringDataVector(a,u){a.startVector(4,u,4)}static endTensor(a){return a.endObject()}static createTensor(a,u,l,f,c,p,b){return o.startTensor(a),o.addName(a,u),o.addDocString(a,l),o.addDims(a,f),o.addDataType(a,c),o.addRawData(a,p),o.addStringData(a,b),o.endTensor(a)}}i.Tensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSparseTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSparseTensor(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}values(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSparseTensor(a){a.startObject(3)}static addValues(a,u){a.addFieldOffset(0,u,0)}static addIndices(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static endSparseTensor(a){return a.endObject()}static createSparseTensor(a,u,l,f){return o.startSparseTensor(a),o.addValues(a,u),o.addIndices(a,l),o.addDims(a,f),o.endSparseTensor(a)}}i.SparseTensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsAttribute(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsAttribute(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt32(this.bb_pos+a):0}f(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readFloat32(this.bb_pos+a):0}i(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}s(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}t(a){let u=this.bb.__offset(this.bb_pos,16);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+a*4):0}floatsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}floatsArray(){let a=this.bb.__offset(this.bb_pos,20);return a?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}ints(a){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}intsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}strings(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringsLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}tensors(a,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}tensorsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}graphs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}graphsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startAttribute(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldInt32(2,u,0)}static addF(a,u){a.addFieldFloat32(3,u,0)}static addI(a,u){a.addFieldInt64(4,u,a.createLong(0,0))}static addS(a,u){a.addFieldOffset(5,u,0)}static addT(a,u){a.addFieldOffset(6,u,0)}static addG(a,u){a.addFieldOffset(7,u,0)}static addFloats(a,u){a.addFieldOffset(8,u,0)}static createFloatsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addFloat32(u[l]);return a.endVector()}static startFloatsVector(a,u){a.startVector(4,u,4)}static addInts(a,u){a.addFieldOffset(9,u,0)}static createIntsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startIntsVector(a,u){a.startVector(8,u,8)}static addStrings(a,u){a.addFieldOffset(10,u,0)}static createStringsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringsVector(a,u){a.startVector(4,u,4)}static addTensors(a,u){a.addFieldOffset(11,u,0)}static createTensorsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startTensorsVector(a,u){a.startVector(4,u,4)}static addGraphs(a,u){a.addFieldOffset(12,u,0)}static createGraphsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startGraphsVector(a,u){a.startVector(4,u,4)}static endAttribute(a){return a.endObject()}static createAttribute(a,u,l,f,c,p,b,g,h,w,T,v,_,$){return o.startAttribute(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,f),o.addF(a,c),o.addI(a,p),o.addS(a,b),o.addT(a,g),o.addG(a,h),o.addFloats(a,w),o.addInts(a,T),o.addStrings(a,v),o.addTensors(a,_),o.addGraphs(a,$),o.endAttribute(a)}}i.Attribute=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsGraph(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsGraph(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}initializers(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}initializersLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeArgs(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeArgsLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}nodes(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}maxNodeIndex(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readUint32(this.bb_pos+a):0}nodeEdges(a,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new e.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeEdgesLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}inputs(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__vector_len(this.bb_pos+a):0}sparseInitializers(a,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new e.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}sparseInitializersLength(){let a=this.bb.__offset(this.bb_pos,18);return a?this.bb.__vector_len(this.bb_pos+a):0}static startGraph(a){a.startObject(8)}static addInitializers(a,u){a.addFieldOffset(0,u,0)}static createInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInitializersVector(a,u){a.startVector(4,u,4)}static addNodeArgs(a,u){a.addFieldOffset(1,u,0)}static createNodeArgsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeArgsVector(a,u){a.startVector(4,u,4)}static addNodes(a,u){a.addFieldOffset(2,u,0)}static createNodesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodesVector(a,u){a.startVector(4,u,4)}static addMaxNodeIndex(a,u){a.addFieldInt32(3,u,0)}static addNodeEdges(a,u){a.addFieldOffset(4,u,0)}static createNodeEdgesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeEdgesVector(a,u){a.startVector(4,u,4)}static addInputs(a,u){a.addFieldOffset(5,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(6,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addSparseInitializers(a,u){a.addFieldOffset(7,u,0)}static createSparseInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSparseInitializersVector(a,u){a.startVector(4,u,4)}static endGraph(a){return a.endObject()}static createGraph(a,u,l,f,c,p,b,g,h){return o.startGraph(a),o.addInitializers(a,u),o.addNodeArgs(a,l),o.addNodes(a,f),o.addMaxNodeIndex(a,c),o.addNodeEdges(a,p),o.addInputs(a,b),o.addOutputs(a,g),o.addSparseInitializers(a,h),o.endGraph(a)}}i.Graph=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsModel(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsModel(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}irVersion(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}opsetImport(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}opsetImportLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}producerName(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}producerVersion(a){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,a):null}modelVersion(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}docString(a){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,a):null}graph(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,a):null}static startModel(a){a.startObject(9)}static addIrVersion(a,u){a.addFieldInt64(0,u,a.createLong(0,0))}static addOpsetImport(a,u){a.addFieldOffset(1,u,0)}static createOpsetImportVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOpsetImportVector(a,u){a.startVector(4,u,4)}static addProducerName(a,u){a.addFieldOffset(2,u,0)}static addProducerVersion(a,u){a.addFieldOffset(3,u,0)}static addDomain(a,u){a.addFieldOffset(4,u,0)}static addModelVersion(a,u){a.addFieldInt64(5,u,a.createLong(0,0))}static addDocString(a,u){a.addFieldOffset(6,u,0)}static addGraph(a,u){a.addFieldOffset(7,u,0)}static addGraphDocString(a,u){a.addFieldOffset(8,u,0)}static endModel(a){return a.endObject()}static createModel(a,u,l,f,c,p,b,g,h,w){return o.startModel(a),o.addIrVersion(a,u),o.addOpsetImport(a,l),o.addProducerName(a,f),o.addProducerVersion(a,c),o.addDomain(a,p),o.addModelVersion(a,b),o.addDocString(a,g),o.addGraph(a,h),o.addGraphDocString(a,w),o.endModel(a)}}i.Model=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsKernelCreateInfos(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsKernelCreateInfos(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndices(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+a*4):0}nodeIndicesLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeIndicesArray(){let a=this.bb.__offset(this.bb_pos,4);return a?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}kernelDefHashes(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startKernelCreateInfos(a){a.startObject(2)}static addNodeIndices(a,u){a.addFieldOffset(0,u,0)}static createNodeIndicesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startNodeIndicesVector(a,u){a.startVector(4,u,4)}static addKernelDefHashes(a,u){a.addFieldOffset(1,u,0)}static createKernelDefHashesVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startKernelDefHashesVector(a,u){a.startVector(8,u,8)}static endKernelCreateInfos(a){return a.endObject()}static createKernelCreateInfos(a,u,l){return o.startKernelCreateInfos(a),o.addNodeIndices(a,u),o.addKernelDefHashes(a,l),o.endKernelCreateInfos(a)}}i.KernelCreateInfos=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSubGraphSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSubGraphSessionState(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}graphId(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(a){a.startObject(2)}static addGraphId(a,u){a.addFieldOffset(0,u,0)}static addSessionState(a,u){a.addFieldOffset(1,u,0)}static endSubGraphSessionState(a){let u=a.endObject();return a.requiredField(u,4),u}static createSubGraphSessionState(a,u,l){return o.startSubGraphSessionState(a),o.addGraphId(a,u),o.addSessionState(a,l),o.endSubGraphSessionState(a)}}i.SubGraphSessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSessionState(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}subGraphSessionStatesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSessionState(a){a.startObject(2)}static addKernels(a,u){a.addFieldOffset(0,u,0)}static addSubGraphSessionStates(a,u){a.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSubGraphSessionStatesVector(a,u){a.startVector(4,u,4)}static endSessionState(a){return a.endObject()}static createSessionState(a,u,l){return o.startSessionState(a),o.addKernels(a,u),o.addSubGraphSessionStates(a,l),o.endSessionState(a)}}i.SessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsInferenceSession(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,u){return a.setPosition(a.position()+k.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}model(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(a){a.startObject(3)}static addOrtVersion(a,u){a.addFieldOffset(0,u,0)}static addModel(a,u){a.addFieldOffset(1,u,0)}static addSessionState(a,u){a.addFieldOffset(2,u,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,u){a.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,u){a.finish(u,"ORTM",!0)}static createInferenceSession(a,u,l,f){return o.startInferenceSession(a),o.addOrtVersion(a,u),o.addModel(a,l),o.addSessionState(a,f),o.endInferenceSession(a)}}i.InferenceSession=o})(n=t.fbs||={})})(r=e.experimental||={})})(ee||={})});var Ac=Qe((n$,$c)=>{"use strict";$c.exports=wv;function wv(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(a,u){n[t]=function(f){if(i)if(i=!1,f)u(f);else{for(var c=new Array(arguments.length-1),p=0;p<c.length;)c[p++]=arguments[p];a.apply(null,c)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Cc=Qe(Ec=>{"use strict";var Bo=Ec;Bo.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var fn=new Array(64),Oc=new Array(123);for(Ut=0;Ut<64;)Oc[fn[Ut]=Ut<26?Ut+65:Ut<52?Ut+71:Ut<62?Ut-4:Ut-59|43]=Ut++;var Ut;Bo.encode=function(e,n,t){for(var o=null,i=[],s=0,a=0,u;n<t;){var l=e[n++];switch(a){case 0:i[s++]=fn[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=fn[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=fn[u|l>>6],i[s++]=fn[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=fn[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var Pc="invalid encoding";Bo.decode=function(e,n,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=Oc[u])===void 0)throw Error(Pc);switch(i){case 0:s=u,i=1;break;case 1:n[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:n[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:n[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(Pc);return t-o};Bo.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Dc=Qe((i$,kc)=>{"use strict";kc.exports=Lo;function Lo(){this._listeners={}}Lo.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Lo.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Lo.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Vc=Qe((a$,Fc)=>{"use strict";Fc.exports=Bc(Bc);function Bc(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3]}function i(u,l,f){e[0]=u,l[f]=n[3],l[f+1]=n[2],l[f+2]=n[1],l[f+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function a(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?s:a,r.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}r.writeFloatLE=e.bind(null,Lc),r.writeFloatBE=e.bind(null,Rc);function n(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,zc),r.readFloatBE=n.bind(null,Nc)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,f){e[0]=u,l[f]=n[0],l[f+1]=n[1],l[f+2]=n[2],l[f+3]=n[3],l[f+4]=n[4],l[f+5]=n[5],l[f+6]=n[6],l[f+7]=n[7]}function i(u,l,f){e[0]=u,l[f]=n[7],l[f+1]=n[6],l[f+2]=n[5],l[f+3]=n[4],l[f+4]=n[3],l[f+5]=n[2],l[f+6]=n[1],l[f+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function a(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?s:a,r.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var f;if(s<22250738585072014e-324)f=s/5e-324,t(f>>>0,a,u+o),t((l<<31|f/4294967296)>>>0,a,u+i);else{var c=Math.floor(Math.log(s)/Math.LN2);c===1024&&(c=1023),f=s*Math.pow(2,-c),t(f*4503599627370496>>>0,a,u+o),t((l<<31|c+1023<<20|f*1048576&1048575)>>>0,a,u+i)}}}r.writeDoubleLE=e.bind(null,Lc,0,4),r.writeDoubleBE=e.bind(null,Rc,4,0);function n(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),f=(l>>31)*2+1,c=l>>>20&2047,p=4294967296*(l&1048575)+u;return c===2047?p?NaN:f*(1/0):c===0?f*5e-324*p:f*Math.pow(2,c-1075)*(p+4503599627370496)}r.readDoubleLE=n.bind(null,zc,0,4),r.readDoubleBE=n.bind(null,Nc,4,0)}(),r}function Lc(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Rc(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function zc(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function Nc(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Mc=Qe((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var Uc=Qe(Gc=>{"use strict";var ka=Gc;ka.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};ka.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,s=[],a=0,u;n<t;)u=e[n++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};ka.write=function(e,n,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Hc=Qe((u$,Wc)=>{"use strict";Wc.exports=Tv;function Tv(r,e,n){var t=n||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return r(u);s+u>t&&(i=r(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var jc=Qe((l$,qc)=>{"use strict";qc.exports=at;var kn=_r();function at(r,e){this.lo=r>>>0,this.hi=e>>>0}var Rr=at.zero=new at(0,0);Rr.toNumber=function(){return 0};Rr.zzEncode=Rr.zzDecode=function(){return this};Rr.length=function(){return 1};var _v=at.zeroHash="\0\0\0\0\0\0\0\0";at.fromNumber=function(e){if(e===0)return Rr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new at(t,o)};at.from=function(e){if(typeof e=="number")return at.fromNumber(e);if(kn.isString(e))if(kn.Long)e=kn.Long.fromString(e);else return at.fromNumber(parseInt(e,10));return e.low||e.high?new at(e.low>>>0,e.high>>>0):Rr};at.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};at.prototype.toLong=function(e){return kn.Long?new kn.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Tr=String.prototype.charCodeAt;at.fromHash=function(e){return e===_v?Rr:new at((Tr.call(e,0)|Tr.call(e,1)<<8|Tr.call(e,2)<<16|Tr.call(e,3)<<24)>>>0,(Tr.call(e,4)|Tr.call(e,5)<<8|Tr.call(e,6)<<16|Tr.call(e,7)<<24)>>>0)};at.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};at.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};at.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};at.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var _r=Qe(Da=>{"use strict";var re=Da;re.asPromise=Ac();re.base64=Cc();re.EventEmitter=Dc();re.float=Vc();re.inquire=Mc();re.utf8=Uc();re.pool=Hc();re.LongBits=jc();re.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);re.global=re.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Da;re.emptyArray=Object.freeze?Object.freeze([]):[];re.emptyObject=Object.freeze?Object.freeze({}):{};re.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};re.isString=function(e){return typeof e=="string"||e instanceof String};re.isObject=function(e){return e&&typeof e=="object"};re.isset=re.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};re.Buffer=function(){try{var r=re.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();re._Buffer_from=null;re._Buffer_allocUnsafe=null;re.newBuffer=function(e){return typeof e=="number"?re.Buffer?re._Buffer_allocUnsafe(e):new re.Array(e):re.Buffer?re._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};re.Array=typeof Uint8Array<"u"?Uint8Array:Array;re.Long=re.global.dcodeIO&&re.global.dcodeIO.Long||re.global.Long||re.inquire("long");re.key2Re=/^true|false|0|1$/;re.key32Re=/^-?(?:0|[1-9][0-9]*)$/;re.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;re.longToHash=function(e){return e?re.LongBits.from(e).toHash():re.LongBits.zeroHash};re.longFromHash=function(e,n){var t=re.LongBits.fromHash(e);return re.Long?re.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function Kc(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}re.merge=Kc;re.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Xc(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Kc(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}re.newError=Xc;re.ProtocolError=Xc("ProtocolError");re.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};re.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};re.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};re._configure=function(){var r=re.Buffer;if(!r){re._Buffer_from=re._Buffer_allocUnsafe=null;return}re._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},re._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var Va=Qe((f$,Qc)=>{"use strict";Qc.exports=Pe;var Lt=_r(),Ba,Ro=Lt.LongBits,Zc=Lt.base64,Yc=Lt.utf8;function Dn(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function Ra(){}function Iv(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function Pe(){this.len=0,this.head=new Dn(Ra,0,0),this.tail=this.head,this.states=null}var Jc=function(){return Lt.Buffer?function(){return(Pe.create=function(){return new Ba})()}:function(){return new Pe}};Pe.create=Jc();Pe.alloc=function(e){return new Lt.Array(e)};Lt.Array!==Array&&(Pe.alloc=Lt.pool(Pe.alloc,Lt.Array.prototype.subarray));Pe.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Dn(e,n,t),this.len+=n,this};function za(r,e,n){e[n]=r&255}function Sv(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Na(r,e){this.len=r,this.next=void 0,this.val=e}Na.prototype=Object.create(Dn.prototype);Na.prototype.fn=Sv;Pe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Na((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Pe.prototype.int32=function(e){return e<0?this._push(Fa,10,Ro.fromNumber(e)):this.uint32(e)};Pe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Fa(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}Pe.prototype.uint64=function(e){var n=Ro.from(e);return this._push(Fa,n.length(),n)};Pe.prototype.int64=Pe.prototype.uint64;Pe.prototype.sint64=function(e){var n=Ro.from(e).zzEncode();return this._push(Fa,n.length(),n)};Pe.prototype.bool=function(e){return this._push(za,1,e?1:0)};function La(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}Pe.prototype.fixed32=function(e){return this._push(La,4,e>>>0)};Pe.prototype.sfixed32=Pe.prototype.fixed32;Pe.prototype.fixed64=function(e){var n=Ro.from(e);return this._push(La,4,n.lo)._push(La,4,n.hi)};Pe.prototype.sfixed64=Pe.prototype.fixed64;Pe.prototype.float=function(e){return this._push(Lt.float.writeFloatLE,4,e)};Pe.prototype.double=function(e){return this._push(Lt.float.writeDoubleLE,8,e)};var $v=Lt.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};Pe.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(za,1,0);if(Lt.isString(e)){var t=Pe.alloc(n=Zc.length(e));Zc.decode(e,t,0),e=t}return this.uint32(n)._push($v,n,e)};Pe.prototype.string=function(e){var n=Yc.length(e);return n?this.uint32(n)._push(Yc.write,n,e):this._push(za,1,0)};Pe.prototype.fork=function(){return this.states=new Iv(this),this.head=this.tail=new Dn(Ra,0,0),this.len=0,this};Pe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Dn(Ra,0,0),this.len=0),this};Pe.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};Pe.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};Pe._configure=function(r){Ba=r,Pe.create=Jc(),Ba._configure()}});var rf=Qe((d$,tf)=>{"use strict";tf.exports=Jt;var ef=Va();(Jt.prototype=Object.create(ef.prototype)).constructor=Jt;var Ir=_r();function Jt(){ef.call(this)}Jt._configure=function(){Jt.alloc=Ir._Buffer_allocUnsafe,Jt.writeBytesBuffer=Ir.Buffer&&Ir.Buffer.prototype instanceof Uint8Array&&Ir.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};Jt.prototype.bytes=function(e){Ir.isString(e)&&(e=Ir._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(Jt.writeBytesBuffer,n,e),this};function Av(r,e,n){r.length<40?Ir.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}Jt.prototype.string=function(e){var n=Ir.Buffer.byteLength(e);return this.uint32(n),n&&this._push(Av,n,e),this};Jt._configure()});var Ua=Qe((p$,uf)=>{"use strict";uf.exports=Xe;var Wt=_r(),Ga,af=Wt.LongBits,Pv=Wt.utf8;function Ht(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Xe(r){this.buf=r,this.pos=0,this.len=r.length}var nf=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Xe(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Xe(e);throw Error("illegal buffer")},sf=function(){return Wt.Buffer?function(n){return(Xe.create=function(o){return Wt.Buffer.isBuffer(o)?new Ga(o):nf(o)})(n)}:nf};Xe.create=sf();Xe.prototype._slice=Wt.Array.prototype.subarray||Wt.Array.prototype.slice;Xe.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Ht(this,10);return e}}();Xe.prototype.int32=function(){return this.uint32()|0};Xe.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Ma(){var r=new af(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Ht(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw Ht(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Xe.prototype.bool=function(){return this.uint32()!==0};function zo(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Xe.prototype.fixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return zo(this.buf,this.pos+=4)};Xe.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Ht(this,4);return zo(this.buf,this.pos+=4)|0};function of(){if(this.pos+8>this.len)throw Ht(this,8);return new af(zo(this.buf,this.pos+=4),zo(this.buf,this.pos+=4))}Xe.prototype.float=function(){if(this.pos+4>this.len)throw Ht(this,4);var e=Wt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Xe.prototype.double=function(){if(this.pos+8>this.len)throw Ht(this,4);var e=Wt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Xe.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw Ht(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Wt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Xe.prototype.string=function(){var e=this.bytes();return Pv.read(e,0,e.length)};Xe.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Ht(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Ht(this);while(this.buf[this.pos++]&128);return this};Xe.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Xe._configure=function(r){Ga=r,Xe.create=sf(),Ga._configure();var e=Wt.Long?"toLong":"toNumber";Wt.merge(Xe.prototype,{int64:function(){return Ma.call(this)[e](!1)},uint64:function(){return Ma.call(this)[e](!0)},sint64:function(){return Ma.call(this).zzDecode()[e](!1)},fixed64:function(){return of.call(this)[e](!0)},sfixed64:function(){return of.call(this)[e](!1)}})}});var df=Qe((m$,ff)=>{"use strict";ff.exports=zr;var cf=Ua();(zr.prototype=Object.create(cf.prototype)).constructor=zr;var lf=_r();function zr(r){cf.call(this,r)}zr._configure=function(){lf.Buffer&&(zr.prototype._slice=lf.Buffer.prototype.slice)};zr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};zr._configure()});var mf=Qe((h$,pf)=>{"use strict";pf.exports=Bn;var Wa=_r();(Bn.prototype=Object.create(Wa.EventEmitter.prototype)).constructor=Bn;function Bn(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Wa.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Bn.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return Wa.asPromise(r,s,e,n,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(f){return s.emit("error",f,e),i(f)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Bn.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var gf=Qe(hf=>{"use strict";var Ov=hf;Ov.Service=mf()});var yf=Qe((b$,bf)=>{"use strict";bf.exports={}});var wf=Qe(vf=>{"use strict";var vt=vf;vt.build="minimal";vt.Writer=Va();vt.BufferWriter=rf();vt.Reader=Ua();vt.BufferReader=df();vt.util=_r();vt.rpc=gf();vt.roots=yf();vt.configure=xf;function xf(){vt.util._configure(),vt.Writer._configure(vt.BufferWriter),vt.Reader._configure(vt.BufferReader)}xf()});var _f=Qe((x$,Tf)=>{"use strict";Tf.exports=wf()});var dn=Qe((v$,If)=>{"use strict";var Me=_f(),q=Me.Reader,Ze=Me.Writer,A=Me.util,S=Me.roots.default||(Me.roots.default={});S.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.s=A.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=A.emptyArray,e.prototype.ints=A.emptyArray,e.prototype.strings=A.emptyArray,e.prototype.tensors=A.emptyArray,e.prototype.graphs=A.emptyArray,e.prototype.sparseTensors=A.emptyArray,e.prototype.typeProtos=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!A.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!A.isInteger(t.i)&&!(t.i&&A.isInteger(t.i.low)&&A.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||A.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!A.isInteger(t.ints[i])&&!(t.ints[i]&&A.isInteger(t.ints[i].low)&&A.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||A.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(A.Long?(o.i=A.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?A.base64.decode(t.s,o.s=A.newBuffer(A.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)A.Long?(o.ints[i]=A.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new A.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?A.base64.decode(t.strings[i],o.strings[i]=A.newBuffer(A.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,A.Long){var s=new A.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=A.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?A.Long.prototype.toString.call(t.i):o.longs===Number?new A.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?A.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?A.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new A.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?A.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=S.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=S.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=S.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ze.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=A.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!A.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=S.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=A.emptyArray,e.prototype.updateBinding=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=A.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=A.Long?A.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=A.emptyArray,e.prototype.trainingInfo=A.emptyArray,e.prototype.functions=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!A.isInteger(t.irVersion)&&!(t.irVersion&&A.isInteger(t.irVersion.low)&&A.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!A.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!A.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!A.isInteger(t.modelVersion)&&!(t.modelVersion&&A.isInteger(t.modelVersion.low)&&A.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(A.Long?(o.irVersion=A.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(A.Long?(o.modelVersion=A.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(A.Long){var s=new A.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",A.Long){var s=new A.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?A.Long.prototype.toString.call(t.irVersion):o.longs===Number?new A.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?A.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new A.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=S.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ze.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!A.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!A.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!A.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=A.emptyArray,e.prototype.name="",e.prototype.initializer=A.emptyArray,e.prototype.sparseInitializer=A.emptyArray,e.prototype.docString="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.valueInfo=A.emptyArray,e.prototype.quantizationAnnotation=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=S.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=S.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=S.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=S.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=A.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=A.emptyArray,e.prototype.int32Data=A.emptyArray,e.prototype.stringData=A.emptyArray,e.prototype.int64Data=A.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=A.newBuffer([]),e.prototype.externalData=A.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=A.emptyArray,e.prototype.uint64Data=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!A.isInteger(t.dims[o])&&!(t.dims[o]&&A.isInteger(t.dims[o].low)&&A.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!A.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!A.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||A.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!A.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&A.isInteger(t.int64Data[o].low)&&A.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||A.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!A.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&A.isInteger(t.uint64Data[o].low)&&A.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?A.base64.decode(t.stringData[i],o.stringData[i]=A.newBuffer(A.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)A.Long?(o.int64Data[i]=A.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new A.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?A.base64.decode(t.rawData,o.rawData=A.newBuffer(A.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)A.Long?(o.uint64Data[i]=A.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new A.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=A.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?A.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new A.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?A.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?A.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new A.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=S.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=A.Long?A.Long.fromBits(0,0,!1):0,n.prototype.end=A.Long?A.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Ze.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof q||(o=q.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},n.decodeDelimited=function(o){return o instanceof q||(o=new q(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!A.isInteger(o.begin)&&!(o.begin&&A.isInteger(o.begin.low)&&A.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!A.isInteger(o.end)&&!(o.end&&A.isInteger(o.end.low)&&A.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(A.Long?(i.begin=A.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(A.Long?(i.end=A.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(A.Long){var a=new A.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(A.Long){var a=new A.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?A.Long.prototype.toString.call(o.begin):i.longs===Number?new A.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?A.Long.prototype.toString.call(o.end):i.longs===Number?new A.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!A.isInteger(t.dims[i])&&!(t.dims[i]&&A.isInteger(t.dims[i].low)&&A.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)A.Long?(o.dims[i]=A.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new A.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?A.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new A.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=A.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:A.oneOfGetter(t=["dimValue","dimParam"]),set:A.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,s){return s||(s=Ze.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},n.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},n.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!A.isInteger(i.dimValue)&&!(i.dimValue&&A.isInteger(i.dimValue.low)&&A.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!A.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!A.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var s=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(A.Long?(s.dimValue=A.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},n.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?A.Long.prototype.toString.call(i.dimValue):s.longs===Number?new A.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:A.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:A.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Ze.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof q||(o=q.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new S.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof q||(o=new q(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!A.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ze.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var s=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ze.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var s=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ze.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!A.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=S.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var s=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=S.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ze.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=S.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var s=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=S.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ze.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof q||(i=q.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new S.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof q||(i=new q(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!A.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=S.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var s=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=S.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=A.Long?A.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ze.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!A.isInteger(t.version)&&!(t.version&&A.isInteger(t.version.low)&&A.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(A.Long?(o.version=A.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",A.Long){var s=new A.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?A.Long.prototype.toString.call(t.version):o.longs===Number?new A.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=A.emptyArray,e.prototype.output=A.emptyArray,e.prototype.attribute=A.emptyArray,e.prototype.attributeProto=A.emptyArray,e.prototype.node=A.emptyArray,e.prototype.docString="",e.prototype.opsetImport=A.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ze.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof q||(t=q.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new S.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof q||(t=new q(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!A.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!A.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!A.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!A.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!A.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!A.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=S.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=S.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Me.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();If.exports=S});function pn(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Rn(r){return new TextDecoder().decode(r)}var Ge,Nr,Ha,ht,No,ct,wt,Q,Ln,Fr,Vr,Mr,Be=C(()=>{"use strict";Do();Ca();Ge=un(dn());Gr();Nr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},Ha=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},ht=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Ha.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;a[s-u]=Math.max(l,f)}return a}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let s=r.calcShape(e.dims,n.dims);if(s){if(o&&!Q.areEqual(s,e.dims))return;let a=Q.size(s),u=o?e:new et(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(s.length),f=new Array(e.dims.length),c=new Array(n.dims.length),p=0,b=0,g=!1,h=!1;e.dims.length===0&&(p=e.get([]),g=!0),n.dims.length===0&&(b=n.get([]),h=!0);let w;for(let T=0;T<a;T++){w=T;for(let v=s.length-1;v>=0;v--)l[v]=w%s[v],w=Math.floor(w/s[v]);g||(r.fillIndex(l,e.dims,f),p=e.get(f)),h||(r.fillIndex(l,n.dims,c),b=n.get(c)),u.set(l,t(p,b))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(n[n.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},No=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!ht.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},ct=class r{static tensorDataTypeFromProto(e){switch(e){case Ge.onnx.TensorProto.DataType.INT8:return"int8";case Ge.onnx.TensorProto.DataType.UINT8:return"uint8";case Ge.onnx.TensorProto.DataType.BOOL:return"bool";case Ge.onnx.TensorProto.DataType.INT16:return"int16";case Ge.onnx.TensorProto.DataType.UINT16:return"uint16";case Ge.onnx.TensorProto.DataType.INT32:return"int32";case Ge.onnx.TensorProto.DataType.UINT32:return"uint32";case Ge.onnx.TensorProto.DataType.FLOAT:return"float32";case Ge.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ge.onnx.TensorProto.DataType.STRING:return"string";case Ge.onnx.TensorProto.DataType.INT64:return"int32";case Ge.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ge.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ge.onnx.TensorProto.DataType.INT8;case"uint8":return Ge.onnx.TensorProto.DataType.UINT8;case"bool":return Ge.onnx.TensorProto.DataType.BOOL;case"int16":return Ge.onnx.TensorProto.DataType.INT16;case"uint16":return Ge.onnx.TensorProto.DataType.UINT16;case"int32":return Ge.onnx.TensorProto.DataType.INT32;case"uint32":return Ge.onnx.TensorProto.DataType.UINT32;case"float32":return Ge.onnx.TensorProto.DataType.FLOAT;case"float64":return Ge.onnx.TensorProto.DataType.DOUBLE;case"string":return Ge.onnx.TensorProto.DataType.STRING;case"int64":return Ge.onnx.TensorProto.DataType.INT64;case"uint64":return Ge.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>dr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(wt.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},wt=class{static longToNumber(e,n){return dr.isLong(e)?e.toNumber():e instanceof k.Long?dr.fromValue({low:e.low,high:e.high,unsigned:n??!1}).toNumber():e}static isLong(e){return dr.isLong(e)||e instanceof k.Long}},Q=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];s*=o[u]}}let a=r.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(n).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let s=r.normalizeAxis(n[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Ln=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[n]=t[a],i.push(u)}return[i,s]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Fr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)r.adjustPadAndReturnShape(e[a+2],n[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Vr=-34028234663852886e22,Mr=34028234663852886e22});function Ev(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function Sf(r){switch(r){case ye.onnx.TensorProto.DataType.UINT8:case ye.onnx.TensorProto.DataType.INT8:case ye.onnx.TensorProto.DataType.BOOL:return 1;case ye.onnx.TensorProto.DataType.UINT16:case ye.onnx.TensorProto.DataType.INT16:return 2;case ye.onnx.TensorProto.DataType.FLOAT:case ye.onnx.TensorProto.DataType.INT32:case ye.onnx.TensorProto.DataType.UINT32:return 4;case ye.onnx.TensorProto.DataType.INT64:case ye.onnx.TensorProto.DataType.DOUBLE:case ye.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ye.onnx.TensorProto.DataType[r]}`)}}function Cv(r,e){return new(Pf(e))(r)}function Pf(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function ja(r,e){if(e===ye.onnx.TensorProto.DataType.INT64||e===qa.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===ye.onnx.TensorProto.DataType.UINT32||e===qa.TensorDataType.UINT32||e===ye.onnx.TensorProto.DataType.UINT64||e===qa.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ye.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function $f(r,e,n){switch(e){case ye.onnx.TensorProto.DataType.BOOL:case ye.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case ye.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case ye.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case ye.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case ye.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case ye.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case ye.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case ye.onnx.TensorProto.DataType.INT64:return ja(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case ye.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case ye.onnx.TensorProto.DataType.UINT64:return ja(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${ye.onnx.TensorProto.DataType[e]}`)}}var Af,ye,qa,et,Gr=C(()=>{"use strict";Af=un(hc());Ca();Cn();ye=un(dn());Be();qa=ee.experimental.fbs,et=class r{constructor(e,n,t,o,i,s=Af.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=Q.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=Pf(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*Ev(n));this.cache=Cv(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[Q.indicesToOffset(e,this.strides)]}set(e,n){this.data[Q.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=Q.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ct.tensorDataTypeFromProto(e.dataType),t=ct.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,s)=>{o.data[s]=Rn(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=Sf(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=$f(s,e.dataType,l*a);i[l]=f}}else{let i;switch(e.dataType){case ye.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case ye.onnx.TensorProto.DataType.INT32:case ye.onnx.TensorProto.DataType.INT16:case ye.onnx.TensorProto.DataType.UINT16:case ye.onnx.TensorProto.DataType.INT8:case ye.onnx.TensorProto.DataType.UINT8:case ye.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case ye.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case ye.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case ye.onnx.TensorProto.DataType.UINT32:case ye.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];dr.isLong(u)?s[a]=ja(u,e.dataType):s[a]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ct.tensorDimsFromORTFormat(e),t=ct.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=Sf(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let f=$f(s,e.dataType(),l*a);i[l]=f}}return o}}});function oe(r){return r===1?kv:Dv}function Of(r){let e=oe(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Ef(r){let e=oe(r);return`${e.version}
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

    `}function Cf(r,e){let n=oe(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var kv,Dv,He=C(()=>{"use strict";kv={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},Dv={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var $e=C(()=>{"use strict"});async function Ka(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,s=()=>{if(r()){t();return}i++;let a=e(i);if(n!=null&&i>=n){o();return}setTimeout(s,a)};s()})}function Fo(r){return pn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function kf(r){return pn(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function mn(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function hn(r,e){return e.map(n=>r[n]).join(", ")}function gt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function qt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var Qt=C(()=>{"use strict";Be()});function Bv(r,e){return qt(e).map(n=>`${r}.${n}`)}function gn(r,e){return e===1?[r]:Bv(r,e)}function er(){return`
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
  `}var Ur=C(()=>{"use strict";Qt()});function Rv(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function zv(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(n>2)for(let u=0;u<n-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function Nv(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Df,Lv,Bf,Lf=C(()=>{"use strict";He();$e();Qt();Ur();Df={name:"pack",inputNames:["A"],inputTypes:[1]},Lv=(r,e)=>{let n=oe(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=gt(i),a=gn("rc",i),u=Nv(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let f=Rv(i,l,a),c=zv(t,a),p=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${f}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${c});
          }
        }
      `;return{...Df,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:p}},Bf=(r,e)=>({...Df,get:()=>Lv(r,e)})});function Xa(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function zf(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function Mv(r){let e=Q.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${n[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${n[s+1]} = ${t} - ${n[s]} * ${i}`:`index -= ${n[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function Gv(r){let e=Q.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Fv,Vv,Rf,Nf=C(()=>{"use strict";Be();He();$e();Ur();Fv=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),Vv=(r,e,n,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let f="";switch(l){case 0:f="outputCoords = rc;";break;case 1:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:f="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${f}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=oe(r.session.backend.glContext.version),u=`
      ${Mv(o)}
      ${Gv(i)}
      ${er()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Rf=(r,e,n)=>{let t=Fv(n);return{...t,get:()=>Vv(r,e,t,n)}}});var Za,Ff=C(()=>{"use strict";He();$e();Za=(r,e)=>{let n=e.shape,t=oe(r.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function Wv(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Vf,Uv,Mf,Gf=C(()=>{"use strict";He();$e();Qt();Ur();Vf={name:"unpack",inputNames:["A"],inputTypes:[2]},Uv=(r,e)=>{let n=e.dims.length,t=gn("rc",n),o=t.slice(-2),i=gt(n),s=er(),u=e.dims.length===0?"":Wv(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,f=oe(r.session.backend.glContext.version),c=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${f.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Vf,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},Mf=(r,e)=>({...Vf,get:()=>Uv(r,e)})});var Vo,zn,Mo,Nn=C(()=>{"use strict";kt();Vo=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Re.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Re.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},zn=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Re.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Mo=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Fn,Uf,Ya,Wf=C(()=>{"use strict";Be();$e();Fn=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,s=n===4?e.length-1:void 0,a=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Ya(r,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},Uf=(r,e,n)=>{let t=Fn(r,e,n);return[t.width,t.height]},Ya=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:n,isPacked:i,shape:l,strides:Q.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var qv,Go,qf=C(()=>{"use strict";kt();Gr();Be();Lf();Nf();Ff();Gf();Nn();Wf();$e();qv=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Go=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return Uf(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=qv(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=Fn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Fn(this.session.layoutStrategy,e.dims,n);if(n===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=Fn(this.session.layoutStrategy,u,n),f=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let c=a[0],p=a[1]*a[2]*a[3],b=Math.ceil(p*1/4)*4,g=c*b;f=new Float32Array(g);for(let h=0;h<c;++h){let w=h*p,T=h*b+h%1*p;f.set(e.numberData.subarray(w,w+p),T)}}return this.createTextureData(l,e.type,f,e,1)}}if(n===2){let i=Ya(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Re.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,s,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:Q.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(zf(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:Q.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Xa(e.dims),i=Xa(n),s=this.reshapePacked(e,o),a=this.run(Rf(this,s,i),[s]);return this.reshapePacked(a,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let s={...e,tensor:o||new et(e.unpackedShape,n,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Za(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Za(this,e))}pack(e){return this.executeProgram(Bf(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Mf(this,e.tensor),[e.tensor])}}});var Ja,me,st=C(()=>{"use strict";Ja=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},me=r=>new Ja(r)});var jf,Kf,Xf,jv,Kv,Zf=C(()=>{"use strict";st();He();$e();jf={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Kf=(r,e,n)=>(Kv(e),[r.run({...jf,cacheHint:n.cacheKey,get:()=>jv(r,e,n)},e)]),Xf=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return me({epsilon:e,momentum:n,spatial:t})},jv=(r,e,n)=>{let t=oe(r.session.backend.glContext.version),o=e[0].dims.length,[i,s]=r.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...jf,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},Kv=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Uo,Rt,X,Vn,Wo,pr=C(()=>{"use strict";Uo=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Rt=class{constructor(e){this.context=e}},X=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Vn=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Wo=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function Zv(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function Yv(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function Jv(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function Qv(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function ew(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function tw(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function rw(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function nw(){let r="and_";return{body:`
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
  `,name:r,type:0}}function ow(){let r="or_";return{body:`
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
  `,name:r,type:0}}function iw(){let r="xor_";return{body:`
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
  `,name:r,type:0}}function aw(){return uw("pow")}function sw(){let r="prelu_";return{body:`
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
  `,name:r,type:0}}function uw(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var zt,lw,Yf,Jf,Qf,ed,td,rd,nd,od,id,ad,sd,ud,ld=C(()=>{"use strict";Be();pr();He();$e();zt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>lw(r,e,n,t)}},lw=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!Q.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=r.session.pack;if(i){let f=ht.calcShape(e[0].dims,e[1].dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");s=f;let c=s.length,p=e[0].dims.length!==0?e[0].dims.length:1,b=e[1].dims.length!==0?e[1].dims.length:1,g=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",w=oe(r.session.backend.glContext.version),T=a?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${w.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${c}]) {
        int aindices[${p}];
        int bindices[${b}];
        ${g}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:T,hasMain:a}}let u=oe(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Yf=(r,e)=>[r.run(zt(r,e,Zv()),e)],Jf=(r,e)=>[r.run(zt(r,e,nw(),"bool"),e)],Qf=(r,e)=>[r.run(zt(r,e,Yv()),e)],ed=(r,e)=>[r.run(zt(r,e,ew(),"bool"),e)],td=(r,e)=>[r.run(zt(r,e,tw(),"bool"),e)],rd=(r,e)=>[r.run(zt(r,e,rw(),"bool"),e)],nd=(r,e)=>[r.run(zt(r,e,Jv()),e)],od=(r,e)=>[r.run(zt(r,e,ow(),"bool"),e)],id=(r,e)=>[r.run(zt(r,e,aw()),e)],ad=(r,e)=>[r.run(zt(r,e,sw()),e)],sd=(r,e)=>[r.run(zt(r,e,Qv()),e)],ud=(r,e)=>[r.run(zt(r,e,iw(),"bool"),e)]});var cd,fd,fw,dd=C(()=>{"use strict";Be();cd=(r,e,n)=>(fw(e),[r.cast(e[0],n)]),fd=r=>ct.tensorDataTypeFromProto(r.attributes.getInt("to")),fw=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var dw,pw,pd,Ho,md=C(()=>{"use strict";He();$e();Qt();Ur();dw=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),pw=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<n.length;P++){let E=n[P].dims.slice();for(let R=0;R<o.length;R++)if(R===t)i[t]+=E[R];else if(o[R]!==E[R])throw new Error("non concat dimensions must match")}let s=i.length,a=gn("coords",s),u=gt(s),l=er(),f=n.map(P=>P.dims),c=qt(s),p=new Array(f.length-1);p[0]=f[0][t];for(let P=1;P<p.length;P++)p[P]=p[P-1]+f[P][t];let b=c[t],g=c.slice(-2),h=c.join(),w=`if (${b} < ${p[0]}) {
        return getChannel(
            getX0(${h}), vec2(${g.join()}));
        }`;for(let P=1;P<p.length;P++){let E=p[P-1];w+=`
            if (${b} < ${p[P]}  && ${b} >= ${p[P-1]}) {
              return getChannel(
                getX${P}(${Ho(c,b,E)}),
                vec2(${Ho(g,b,E)}));
            }`}let T=p.length,v=p[p.length-1];w+=`
            return getChannel(
              getX${T}(${Ho(c,b,v)}),
              vec2(${Ho(g,b,v)}));`;let _=oe(r.session.backend.glContext.version),$=`
          ${l}
          float getValue(${c.map(P=>"int "+P)}) {
            ${w}
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
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:$,hasMain:!0}},pd=(r,e,n)=>{let t=dw(e.length,n.cacheKey);return{...t,get:()=>pw(r,t,e,n.axis)}},Ho=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,s)=>s===t?`${i} - ${n}`:i).join()}});var hd,mw,hw,gw,gd,bw,yw,xw,bd,vw,yd=C(()=>{"use strict";st();$e();md();hd=(r,e,n)=>(vw(e),r.session.pack&&e[0].dims.length>1?[r.run(pd(r,e,n),e)]:[r.run(gw(r,e,n),e)]),mw=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),hw=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let b=1;b<n.length;b++){let g=n[b].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=g[h];else if(o[h]!==g[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(n.length),u=0;for(let b=0;b<a.length;++b)u+=n[b].dims[t],a[b]=u;let l="";n.length<5?l=gd(a):l=bw(a);let f=yw(n.length,s),c=xw(a),p=`
        ${f}
        ${c}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:p}},gw=(r,e,n)=>{let t=mw(e.length,n.cacheKey);return{...t,get:()=>hw(r,t,e,n.axis)}},gd=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,bw=r=>gd(r),yw=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},xw=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},bd=r=>me({axis:r.attributes.getInt("axis")}),vw=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function ww(){return Nt("abs")}function Tw(){return Nt("acos")}function _w(){return Nt("asin")}function Iw(){return Nt("atan")}function Sw(){return Nt("ceil")}function $w(){return Nt("cos")}function Aw(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Pw(){return Nt("exp")}function Ow(){return Nt("floor")}function Qa(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function Ew(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function Cw(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function kw(){return Nt("log")}function Dw(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function Bw(){let r="not";return{body:`
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
  `,name:r,type:0}}function Lw(){return Nt("sin")}function es(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function ts(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function Rw(){return Nt("sqrt")}function zw(){return Nt("tan")}function Nw(){let r="tanh";return{body:`
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
  `,name:r,type:0}}var Fw,Ye,xd,vd,wd,Td,rs,_d,Id,Vw,Sd,$d,Ad,Pd,Od,Ed,ns,Cd,kd,Dd,Bd,Ld,Rd,zd,Nd,Fd,Vd,Md,os=C(()=>{"use strict";st();Be();pr();He();$e();Fw=(r,e,n,t)=>{let o=r.session.pack?2:0,i=oe(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},Ye=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>Fw(r,i,e,n)}},xd=(r,e)=>[r.run(Ye(r,e[0],ww()),e)],vd=(r,e)=>[r.run(Ye(r,e[0],Tw()),e)],wd=(r,e)=>[r.run(Ye(r,e[0],_w()),e)],Td=(r,e)=>[r.run(Ye(r,e[0],Iw()),e)],rs=(r,e,n)=>[r.run(Ye(r,e[0],Qa(n.min,n.max),n.cacheKey),e)],_d=r=>me({min:r.attributes.getFloat("min",Vr),max:r.attributes.getFloat("max",Mr)}),Id=(r,e)=>{let n=Vw(r,e);return rs(r,[e[0]],n)},Vw=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Vr,t=e.length>=3?e[2].numberData[0]:Mr;return me({min:n,max:t})},Sd=(r,e)=>[r.run(Ye(r,e[0],Sw()),e)],$d=(r,e)=>[r.run(Ye(r,e[0],$w()),e)],Ad=(r,e,n)=>[r.run(Ye(r,e[0],Aw(n.alpha),n.cacheKey),e)],Pd=r=>me({alpha:r.attributes.getFloat("alpha",1)}),Od=(r,e)=>[r.run(Ye(r,e[0],Pw()),e)],Ed=(r,e)=>[r.run(Ye(r,e[0],Ow()),e)],ns=(r,e)=>[r.run(Ye(r,e[0],Ew()),e)],Cd=(r,e,n)=>[r.run(Ye(r,e[0],Cw(n.alpha),n.cacheKey),e)],kd=r=>me({alpha:r.attributes.getFloat("alpha",.01)}),Dd=(r,e)=>[r.run(Ye(r,e[0],kw()),e)],Bd=(r,e)=>[r.run(Ye(r,e[0],Dw()),e)],Ld=(r,e)=>[r.run(Ye(r,e[0],Bw()),e)],Rd=(r,e)=>[r.run(Ye(r,e[0],es()),e)],zd=(r,e)=>[r.run(Ye(r,e[0],ts()),e)],Nd=(r,e)=>[r.run(Ye(r,e[0],Lw()),e)],Fd=(r,e)=>[r.run(Ye(r,e[0],Rw()),e)],Vd=(r,e)=>[r.run(Ye(r,e[0],zw()),e)],Md=(r,e)=>[r.run(Ye(r,e[0],Nw()),e)]});function tr(r){let e;switch(r.activation){case"Relu":e=es();break;case"Sigmoid":e=ts();break;case"Clip":e=Qa(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var bn,Wr=C(()=>{"use strict";Be();os();bn=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Vr,Mr]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var Gw,Uw,Gd,Ud=C(()=>{"use strict";kt();He();$e();qo();Wr();Gw=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),Uw=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;Re.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=yn(s,a,t.dilations,t.pads,t.strides),f=oe(r.session.backend.glContext.version),{activationFunction:c,applyActivation:p}=tr(t),b=`
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
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Gd=(r,e,n)=>{let t=Gw(e.length>2,n.cacheKey);return{...t,get:()=>Uw(r,e,t,n)}}});var Ww,Hw,Wd,Hd=C(()=>{"use strict";He();$e();Ur();Ww=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),Hw=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=2,l=3,f=o.length,c=[a[1]*a[2]*a[3],o[2]*o[3]],p=a[2]*a[3],b=er(),g=oe(r.session.backend.glContext.version),h="";for(let T=0;T<=1;T++)for(let v=0;v<=1;v++)h+=`
            blockIndex = rc.x + ${v};
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
                    result[${T*2+v}] = getChannel(
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
          ${h}
          ${g.output} = result;
      }
            `;return{...e,output:{dims:c,type:n.type,textureType:2},shaderSource:w,hasMain:!0}},Wd=(r,e,n,t,o)=>{let i=Ww(o.cacheKey);return{...i,get:()=>Hw(r,i,e,n,t,o)}}});function jw(r,e,n){let t=e[0].dims,o=e[1].dims,i=ht.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=gt(i.length),a=qt(),{activationFunction:u,applyActivation:l}=tr(n),f=e.length>2,c=f?"value += getBiasForMatmul();":"",p=f?`${as(s,a,e[2].dims,i,!1)}`:"",b=i.length,g=t.length,h=o.length,w=t[t.length-1],T=`
    ${u}
    ${p}
    float process(int indices[${b}]) {
        int a[${g}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${w}; ++k) {
            a[${g-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${c}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:T}}function is(r,e){let n=qw(r.length>2,e.activationCacheKey);return{...n,get:()=>jw(n,r,e)}}function as(r,e,n,t,o){let i="",s=n.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=n.map((h,w)=>`coords.${e[w+u]}`).join(", ");let f=ht.getBroadcastDims(n,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
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
}`}var qd,jd,qw,Kw,jo=C(()=>{"use strict";Be();$e();Qt();Wr();ss();qd=(r,e,n)=>(Kw(e),r.session.pack?[r.run(Ko(r,e,n),e)]:[r.run(is(e,n),e)]),jd=r=>bn(r.attributes),qw=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});Kw=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function Yw(r,e,n,t){let o=[],i=[],s=n[0].dims,a=n[1].dims,u=s.length,l=a.length,f=t.length,c=f-u,p=f-l;o=s.map((_,$)=>`coords.${e[$+c]}`),o[u-1]="i*2",o.join(", "),i=a.map((_,$)=>`coords.${e[$+p]}`),i[l-2]="i*2",i.join(", ");let b=ht.getBroadcastDims(s,t),g=ht.getBroadcastDims(a,t),h=b.map(_=>`coords.${e[_+c]} = 0;`).join(`
`),w=g.map(_=>`coords.${e[_+p]} = 0;`).join(`
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
  ${w}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function Jw(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function Qw(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var Xw,Zw,Ko,ss=C(()=>{"use strict";Be();He();$e();Qt();Wr();jo();Xw=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),Zw=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",s=n[0].dims,a=n[1].dims,u=ht.calcShape(s,a,!0),l=!Q.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let f=s[s.length-1],c=Math.ceil(f/2),p=s.length,b=a.length,g=oe(r.session.backend.glContext.version),h=gt(u.length),w=u.length,T=qt(),{activationFunction:v,applyActivation:_}=tr(t),$=o?`${as(h,T,n[2].dims,u,!0)}`:"",P=l?`${Yw(h,T,n,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${Jw(T,p)})`,R=l?"getBAtOutCoordsMatmul(i)":`getB(${Qw(T,b)})`,F=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${T[w-1]}; rc.${T[w-1]} =
          rc.${T[w-2]}; rc.${T[w-2]} = lastDim;
      `,H=`
            ${P}
            ${$}
            ${v}
            void main() {
              ${F}

              vec4 value = vec4(0);
              for (int i = 0; i < ${c}; i++) {
                vec4 a = ${E};
                vec4 b = ${R};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${_}
              ${g.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:H,hasMain:!0}},Ko=(r,e,n)=>{let t=Xw(e.length>2,n.activationCacheKey);return{...t,get:()=>Zw(r,t,e,n)}}});var Kd,Xd=C(()=>{"use strict";qo();Hd();ss();Kd=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=yn(t,o,n.dilations,n.pads,n.strides),s=r.run(Wd(r,e[0],e[1],i,n),[e[0]]),a=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=r.run(Ko(r,u,n),u);return r.reshapePacked(l,i)}});var eT,tT,Zd,us,ls=C(()=>{"use strict";$e();eT=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),tT=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=o.length,l=us(s,a,o,4),f=`
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
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:f}},Zd=(r,e,n,t,o)=>{let i=eT(o.cacheKey);return{...i,get:()=>tT(r,i,e,n,t,o)}},us=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var rT,nT,Yd,Jd=C(()=>{"use strict";Be();He();$e();Wr();ls();rT=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),nT=(r,e,n,t,o)=>{let i=n[0].dims,s=n[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=us(i,s,t),[l,f]=r.calculateTextureWidthAndHeight(a,4),c=Q.computeStrides(u),[p,b]=r.calculateTextureWidthAndHeight(u,4),g=t.length,h=n.length<3?"0.0":"_B(b)",w=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:T,applyActivation:v}=tr(o),_=oe(r.session.backend.glContext.version),$=`
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
  for (int i = 0; i < ${w}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${p}, ${b});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${f});
    value += dot(${_.texture2D}(Im2Col, im2colCoords), ${_.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${v}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:$}},Yd=(r,e,n,t)=>{let o=rT(e.length>2,t);return{...o,get:()=>nT(r,o,e,n,t)}}});var yn,cs,oT,iT,aT,sT,fs,uT,qo=C(()=>{"use strict";st();Be();Ud();Xd();Jd();Wr();ls();jo();yn=(r,e,n,t,o)=>{let i=r[0],s=r.slice(2),a=s.length,u=e[0],f=e.slice(2).map((g,h)=>g+(g-1)*(n[h]-1)),p=s.map((g,h)=>g+t[h]+t[h+a]).map((g,h)=>Math.floor((g-f[h]+o[h])/o[h]));return[i,u].concat(...p)},cs=(r,e,n)=>(uT(e,n),oT(r,e,n)),oT=(r,e,n)=>{let t=sT(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Gd(r,e,t),e)]:i&&o?[iT(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Kd(r,e,t)]:[aT(r,e,t)]},iT=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=yn(t,o,n.dilations,n.pads,n.strides),s=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=r.run(is(u,n),u);return r.reshapeUnpacked(l,i)},aT=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=yn(t,o,n.dilations,n.pads,n.strides),s=r.run(Zd(r,e[0],e[1],i,n),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return r.run(Yd(r,e,i,n),a)},sT=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Fr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},fs=r=>{let e=r.attributes,n=bn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return me({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...n})},uT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var lT,cT,fT,Qd,dT,pT,mT,hT,gT,bT,ep,yT,tp=C(()=>{"use strict";st();He();$e();Wr();lT=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,cT=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},fT=(r,e,n,t,o,i,s,a)=>{let u=r.length-2,l=a.length===0;for(let f=0;f<u;++f){let c=l?r[f+2]*i[f]:a[f],p=lT(r[f+2],i[f],o[f],e[f],n[f],c);cT(p,t,o,f,f+u),l&&a.push(i[f]*(r[f+2]-1)+s[f]+(e[f]-1)*n[f]+1-o[f]-o[f+u])}},Qd=(r,e,n)=>(yT(e,n),dT(r,e,n)),dT=(r,e,n)=>{let t=bT(n,e);return[gT(r,e,t)]},pT=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),mT=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,f=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],c=oe(r.session.backend.glContext.version),{activationFunction:p,applyActivation:b}=tr(t),g=`
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
`;return{...n,output:{dims:f,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},hT=(r,e,n)=>{let t=pT(e.length>2,n.cacheKey);return{...t,get:()=>mT(r,e,t,n)}},gT=(r,e,n)=>r.run(hT(r,e,n),e),bT=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)n.push(e[1].dims[a]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;fT(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let s=Object.assign({},r);return Object.assign(s,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),s},ep=r=>{let e=r.attributes,n=bn(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),f=e.getInts("strides",[1,1]);return me({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:f,...n})},yT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var rp,Hr,np,xT,op,vT,wT,TT,Xo=C(()=>{"use strict";st();Be();$e();rp={name:"Transpose",inputNames:["A"],inputTypes:[0]},Hr=(r,e,n)=>(TT(e),[r.run({...rp,cacheHint:n.cacheKey,get:()=>xT(r,e[0],n.perm)},e)]),np=r=>me({perm:r.attributes.getInts("perm",[])}),xT=(r,e,n)=>{let t=e.dims;n=op(t,n);let o=vT(t,n),i=t.length,s=`
      ${wT("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...rp,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},op=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),vT=(r,e)=>(e=op(r,e),Q.sortBasedOnPerm(r,e)),wT=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},TT=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var ip,ap,_T,sp=C(()=>{"use strict";Xo();ip=(r,e,n)=>{_T(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=r.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=Hr(r,[a],u),f=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,f)]},ap=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},_T=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var up,lp,IT,cp=C(()=>{"use strict";Be();up=(r,e,n)=>{IT(e,n);let t=Q.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},lp=r=>r.attributes.getInt("axis",1),IT=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var Sr,Mn=C(()=>{"use strict";Sr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var fp,dp,ST,$T,AT,PT,pp=C(()=>{"use strict";st();Mn();Be();$e();fp=(r,e,n)=>(PT(e,n.axis),[r.run(AT(r,e,n),e)]),dp=r=>me({axis:r.attributes.getInt("axis",0)}),ST={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},$T=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),s=new Array(o.length+i.length-1);t=Q.normalizeAxis(t,o.length);let a=[];for(let p=0;p<s.length;p++)p<t?(s[p]=o[p],a.push(`inputIdx[${p}] = outputIdx[${p}];`)):p<t+i.length?(s[p]=i[p-t],a.push(`indexDataIdx[${p-t}] = outputIdx[${p}];`)):(s[p]=o[p-i.length+1],a.push(`inputIdx[${p-i.length+1}] = outputIdx[${p}];`));let u=s.length||1,l=o.length,f=i.length||1,c=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${f}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:n[0].type,textureType:0},shaderSource:c}},AT=(r,e,n)=>{let t={...ST,cacheHint:n.cacheKey};return{...t,get:()=>$T(r,t,e,n.axis)}},PT=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(Sr.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var ds,mp,hp,gp,OT,ET,CT,bp=C(()=>{"use strict";st();Be();$e();ds=(r,e,n)=>(CT(e,n),[r.run(OT(e,n),e)]),mp=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return me({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},hp=r=>mp(r,!1),gp=r=>mp(r,!0),OT=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>ET(n,r,e)}},ET=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=No.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let f=a.length,c=e.length===3?`int c[${e[2].dims.length}];`:"",p=e.length===3?"bcastIndices_C(indices, c);":"",b=e.length===3?"value += beta * _C(c);":"",g=`
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
      }`;return{...r,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:g}},CT=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var yp,xp,kT,DT,BT,LT,RT,vp=C(()=>{"use strict";st();$e();yp=(r,e,n)=>(RT(e),[r.run(BT(r,e,n),e)]),xp=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return me({scale:e,bias:n})},kT={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},DT=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,a=`
      ${LT(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},BT=(r,e,n)=>{let t={...kT,cacheHint:n.cacheKey};return{...t,get:()=>DT(r,t,e,n)}},LT=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},RT=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Tp,_p,wp,zT,NT,FT,VT,MT,GT,Ip=C(()=>{"use strict";He();$e();Tp=(r,e,n)=>{GT(e);let t=r.run(NT(e[0]),e);return[r.run(MT(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},_p=r=>r.attributes.getFloat("epsilon",1e-5),wp={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},zT=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],s=`
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
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},NT=r=>({...wp,get:()=>zT(wp,r)}),FT={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},VT=(r,e,n,t,o)=>{let i=oe(r.session.backend.glContext.version),[s,a]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],f=`
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
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:f}},MT=(r,e,n,t)=>{let o={...FT,cacheHint:`${n}`};return{...o,get:()=>VT(r,o,e,n,t)}},GT=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function UT(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...Ap,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function WT(r,e){return{...Ap,cacheHint:e.cacheKey,get:()=>UT(r,e)}}var Sp,$p,Ap,HT,Pp=C(()=>{"use strict";st();$e();Sp=(r,e,n)=>(HT(e),[r.run(WT(e,n),e)]),$p=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return me({alpha:e,beta:n,bias:t,size:o})},Ap={name:"LRN",inputNames:["X"],inputTypes:[0]};HT=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var qT,ps,Op,Ep,Cp,jT,KT,XT,ZT,YT,JT,QT,e_,kp=C(()=>{"use strict";st();Be();He();$e();qT={name:"Pad",inputNames:["A"],inputTypes:[0]},ps=(r,e,n)=>(XT(e),[r.run({...qT,cacheHint:n.cacheKey,get:()=>KT(r,e[0],n)},e)]),Op=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return me({mode:e,value:n,pads:t})},Ep=(r,e,n)=>{ZT(e);let t=jT(r,e,n);return ps(r,[e[0]],t)},Cp=r=>r.attributes.getString("mode","constant"),jT=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return me({mode:n,pads:t,value:o})},KT=(r,e,n)=>{let t=Q.padShape(e.dims.slice(),n.pads),o=t.length,s=`
      ${YT(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},XT=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},ZT=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},YT=(r,e,n)=>{let t=oe(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),s=Q.computeStrides(e.dims);switch(n.mode){case"constant":return JT(t,e.dims,s,o,i,n.pads,n.value);case"reflect":return QT(t,e.dims,s,o,i,n.pads);case"edge":return e_(t,e.dims,s,o,i,n.pads);default:throw new Error("Invalid mode")}},JT=(r,e,n,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
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
      `},QT=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
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
      `},e_=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
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
      `}});var Bp,Lp,Rp,zp,Np,Fp,Vp,Mp,Gp,t_,Dp,Up,Yo,Wp,Zo,r_,Hp=C(()=>{"use strict";st();Be();$e();Bp=(r,e,n)=>{Yo(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Rp(e,t,!1,n)},e)]},Lp=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),s=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return me({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:s})},Rp=(r,e,n,t)=>{let[o,i]=Gp(r,t,n),s=Q.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let f=`
        ${Wp(r[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:f}},zp=(r,e,n)=>{Yo(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Rp(e,t,!0,n)},e)]},Np=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return me({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Fp=(r,e,n)=>{Yo(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Mp(e,t,!1,n)},e)]},Vp=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),s=r.attributes.getInt("storage_order",0),a=r.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return me({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},Mp=(r,e,n,t)=>{let[o,i]=Gp(r,t,n),s=`
      value = max(_X(x), value);
    `,a="",l=`
      ${Wp(r[0].dims,o,s,a,"-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Gp=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();Fr.adjustPoolAttributes(n,t,i,s,a,u);let l=Fr.computePoolOutputShape(n,t,s,a,i,u,e.autoPad),f=Object.assign({},e);return o?Object.assign(f,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[f,l]},t_={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Dp={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Up=(r,e)=>(Yo(e),[r.run({...Dp,get:()=>Mp(e,Dp,!0,t_)},e)]),Yo=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Wp=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],f=r[i-1],c="",p="",b="";if(u+l!==0?c=`
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
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],w=e.strides[e.strides.length-2],T=e.pads[e.pads.length/2-2],v=e.pads[e.pads.length-2],_=r[i-2];T+v!==0?p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${T} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${_}) {
                pad+= ${s};
                continue;
              }
          `:p=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${w} - ${T} + j;
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
      `}else{let s=Q.size(e.kernelShape),a=Q.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,f=r_(u),c=Zo(r,"inputDims"),p=Zo(e.pads,"pads"),b=Zo(a,"kernelStrides"),g=Zo(e.strides,"strides"),h=e.pads.reduce((v,_)=>v+_),w="";return h?w=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:w=`
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
              ${w}
          }
          ${t}

          return value;
        }
      `}},Zo=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},r_=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var qr,$r,n_,o_,qp,jp,Kp,Xp,Zp,Yp,Jp,Qp=C(()=>{"use strict";st();Mn();Be();$e();qr=(r,e,n,t,o)=>{o_(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>n_(r,e,n,t,o,i)},e)]},$r=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return me({axes:e,keepDims:n})},n_=(r,e,n,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=Q.normalizeAxes(n.axes,e[0].dims.length),f=o(e,l),c=f[1];for(let g=0;g<e[0].dims.length;g++)l.indexOf(g)>=0||l.length===0?(n.keepDims&&s.push(1),c=`
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
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:b}},o_=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(Sr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},qp=(r,e,n)=>qr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),jp=(r,e,n)=>qr(r,e,n,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),Kp=(r,e,n)=>qr(r,e,n,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Xp=(r,e,n)=>qr(r,e,n,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Zp=(r,e,n)=>qr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Yp=(r,e,n)=>qr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Jp=(r,e,n)=>qr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var em,tm=C(()=>{"use strict";Be();em=(r,e)=>{let n=Q.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var rm,ms,nm,om,Gn,i_,hs,Jo,gs=C(()=>{"use strict";st();He();$e();rm={name:"Upsample",inputNames:["X"],inputTypes:[0]},ms=(r,e,n)=>(hs(e,n),[r.run({...rm,cacheHint:n.cacheKey,get:()=>i_(r,e,n)},e)]),nm=r=>Gn(r,7),om=r=>Gn(r,9),Gn=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),Jo(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),s=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let f=r.attributes.getFloat("cubic_coeff_a",-.75),c=r.attributes.getInt("exclude_outside",0)!==0;if(c&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",b=0,g=0,h=0;return e>10?r.inputs.length>2?(b=1,g=2,h=3):(g=1,h=2):e===9&&(g=1),me({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:f,excludeOutside:c,useNearest2xOptimization:p,roiInputIdx:b,scalesInputIdx:g,sizesInputIdx:h})},i_=(r,e,n)=>{let t=oe(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,w)=>Math.floor(h*n.scales[w])),[a,u]=r.calculateTextureWidthAndHeight(s,0),l=s.length,f=new Array(l),c=new Array(l),p=`
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
    }`;return{...rm,output:{dims:s,type:e[0].type,textureType:0},shaderSource:g,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(h=>Math.ceil(h))}]}},hs=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},Jo=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var bs,ys,im,am,a_,s_,u_,l_,sm=C(()=>{"use strict";He();$e();Qt();Ur();gs();bs={name:"Resize",inputNames:["A"],inputTypes:[2]},ys=(r,e,n)=>(hs(e,n),[r.run({...bs,cacheHint:n.cacheKey,get:()=>a_(r,e,n)},e)]),im=r=>Gn(r,10),am=r=>Gn(r,11),a_=(r,e,n)=>{let t=oe(r.session.backend.glContext.version),[o,i]=s_(e,n);if(o.every(_=>_===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...bs,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
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
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let w=gt(a),T=er(),v=`
            const vec2 inputWH = vec2(${c}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${b}), float(${g}), float(${b}), float(${g}));
            ${T}
            ${h}
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
        `;return{...bs,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:v}},s_=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let a=r[e.scalesInputIdx];if(a&&a.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=u_(a,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=l_(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},u_=(r,e,n)=>{let t=Array.from(r.floatData);return Jo(t,e,n),t},l_=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(r[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=r[s]/e[s];return Jo(i,n,t),i}});var um,c_,lm=C(()=>{"use strict";Gr();um=(r,e)=>(c_(e),[new et([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),c_=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var xs,cm,fm,dm,f_,pm,d_,p_,mm=C(()=>{"use strict";st();Mn();Be();$e();xs={name:"Slice",inputNames:["A"],inputTypes:[0]},cm=(r,e,n)=>(f_(e),[r.run({...xs,cacheHint:n.cacheKey,get:()=>dm(r,e[0],n)},e)]),fm=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return me({starts:e,ends:n,axes:t})},dm=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((c,p)=>p):n.axes,o=Q.normalizeAxes(t,e.dims.length),i=n.starts.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:Q.normalizeAxis(c,e.dims[o[p]])),s=n.ends.map((c,p)=>c>e.dims[o[p]]-1?e.dims[o[p]]:Q.normalizeAxis(c,e.dims[o[p]])),a=e.dims.slice(),u=[];for(let c=0;c<o.length;c++)a[o[c]]=s[c]-i[c],i[c]>0&&u.push(`outputIdx[${o[c]}] += ${i[c]};`);let f=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...xs,output:{dims:a,type:e.type,textureType:0},shaderSource:f}},f_=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(Sr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},pm=(r,e)=>{p_(e);let n=d_(r,e);return[r.run({...xs,cacheHint:n.cacheKey,get:()=>dm(r,e[0],n)},[e[0]])]},d_=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},p_=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var hm,gm,bm,ym,xm,vm,wm,Tm,m_,h_,g_,_m,Im=C(()=>{"use strict";st();Be();He();$e();Xo();hm={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},gm={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},bm={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},ym=(r,e,n)=>{_m(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(n.axis,t.length),i=Q.sizeToDimension(t,o),s=Q.sizeFromDimension(t,o);return Tm(r,e,n,i,s)},xm=r=>me({axis:r.attributes.getInt("axis",1)}),vm=r=>me({axis:r.attributes.getInt("axis",-1)}),wm=(r,e,n)=>{_m(e);let t=e[0].dims.slice(),o=Q.normalizeAxis(n.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],f;s&&(u=Array.from({length:i}).map((g,h)=>h),u[o]=i-1,u[i-1]=o,u.map(g=>a.push(t[g])),f=me({perm:u}),l=Hr(r,e,f));let c=s?Q.sizeToDimension(a,i-1):Q.sizeToDimension(t,i-1),p=s?Q.sizeFromDimension(a,i-1):Q.sizeFromDimension(t,i-1),b=Tm(r,s?l:e,n,c,p);return s?Hr(r,b,f):b},Tm=(r,e,n,t,o)=>{let i=m_(r,e[0],t,o,[t]),s=r.run({...hm,cacheHint:n.cacheKey,get:()=>i},e),a=h_(r,e[0],t,o,i.output.dims,[t]),u=r.run({...gm,cacheHint:n.cacheKey,get:()=>a},[e[0],s]),l=g_(r,e[0],t,o,i.output.dims,a.output.dims);return[r.run({...bm,cacheHint:n.cacheKey,get:()=>l},[e[0],s,u])]},m_=(r,e,n,t,o)=>{let[i,s]=r.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=oe(r.session.backend.glContext.version),l=`
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
      }`;return{...hm,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},h_=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=oe(r.session.backend.glContext.version),f=`
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
      }`;return{...gm,output:{dims:i,type:e.type,textureType:0},shaderSource:f}},g_=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...bm,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},_m=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Sm,$m,Am,b_,y_,x_,Pm=C(()=>{"use strict";st();Be();$e();Sm={name:"Split",inputNames:["A"],inputTypes:[0]},$m=(r,e,n)=>{x_(e);let t=Q.normalizeAxis(n.axis,e[0].dims.length),o=b_(r,e,t,n),i=[];for(let s=0;s<o;++s)i.push(r.run({...Sm,cacheHint:`${n.cacheKey};${s}`,get:()=>y_(r,e[0],n,t,s)},e));return i},Am=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return me({axis:e,split:n,numOutputs:t})},b_=(r,e,n,t)=>{let[,o]=Ln.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},y_=(r,e,n,t,o)=>{let[i,s]=Ln.splitShape(e.dims,t,n.split,n.numOutputs),a=s[o],u=i[o],f=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...Sm,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:f}},x_=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var vs,Om,Em,v_,w_,Cm=C(()=>{"use strict";Be();vs=(r,e,n)=>{v_(e);let t=Q.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Om=(r,e)=>(w_(e),vs(r,[e[0]],Array.from(e[1].integerData))),Em=r=>r.attributes.getInts("axes"),v_=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},w_=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var km,T_,__,Dm=C(()=>{"use strict";He();$e();km=(r,e)=>{__(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>T_(r,e,n)},e)]},T_=(r,e,n)=>{let t=oe(r.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},__=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Bm,I_,S_,Lm=C(()=>{"use strict";Mn();$e();Bm=(r,e)=>{S_(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>I_(r,e,n)},e)]},I_=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},S_=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(Sr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var ws,Rm,zm,$_,A_,Nm=C(()=>{"use strict";Be();ws=(r,e,n)=>{$_(e);let t=Q.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Rm=(r,e)=>(A_(e),ws(r,[e[0]],Array.from(e[1].integerData))),zm=r=>r.attributes.getInts("axes"),$_=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},A_=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Fm,Vm=C(()=>{"use strict";Zf();ld();dd();yd();qo();tp();sp();cp();pp();bp();vp();Ip();Pp();jo();kp();Hp();Qp();tm();sm();lm();mm();Im();Pm();Cm();Dm();Lm();Xo();os();Nm();gs();Fm=[["Abs","","6+",xd],["Acos","","7+",vd],["Add","","7+",Yf],["And","","7+",Jf],["Asin","","7+",wd],["Atan","","7+",Td],["AveragePool","","7+",Bp,Lp],["BatchNormalization","","7+",Kf,Xf],["Cast","","6+",cd,fd],["Ceil","","6+",Sd],["Clip","","6-10",rs,_d],["Clip","","11+",Id],["Concat","","4+",hd,bd],["Conv","","1+",cs,fs],["ConvTranspose","","1+",Qd,ep],["Cos","","7+",$d],["Div","","7+",Qf],["Dropout","","7+",ns],["DepthToSpace","","1+",ip,ap],["Equal","","7+",ed],["Elu","","6+",Ad,Pd],["Exp","","6+",Od],["Flatten","","1+",up,lp],["Floor","","6+",Ed],["FusedConv","com.microsoft","1+",cs,fs],["Gather","","1+",fp,dp],["Gemm","","7-10",ds,hp],["Gemm","","11+",ds,gp],["GlobalAveragePool","","1+",zp,Np],["GlobalMaxPool","","1+",Up],["Greater","","7+",td],["Identity","","1+",ns],["ImageScaler","","1+",yp,xp],["InstanceNormalization","","6+",Tp,_p],["LeakyRelu","","6+",Cd,kd],["Less","","7+",rd],["LRN","","1+",Sp,$p],["Log","","6+",Dd],["MatMul","","1+",qd,jd],["MaxPool","","1+",Fp,Vp],["Mul","","7+",nd],["Neg","","6+",Bd],["Not","","1+",Ld],["Or","","7+",od],["Pad","","2-10",ps,Op],["Pad","","11+",Ep,Cp],["Pow","","7+",id],["PRelu","","7+",ad],["ReduceLogSum","","1+",Yp,$r],["ReduceMax","","1+",Kp,$r],["ReduceMean","","1+",jp,$r],["ReduceMin","","1+",Xp,$r],["ReduceProd","","1+",Zp,$r],["ReduceSum","","1-12",qp,$r],["ReduceSumSquare","","1+",Jp,$r],["Relu","","6+",Rd],["Reshape","","5+",em],["Resize","","10",ys,im],["Resize","","11+",ys,am],["Shape","","1+",um],["Sigmoid","","6+",zd],["Sin","","7+",Nd],["Slice","","10+",pm],["Slice","","1-9",cm,fm],["Softmax","","1-12",ym,xm],["Softmax","","13+",wm,vm],["Split","","2-12",$m,Am],["Sqrt","","6+",Fd],["Squeeze","","1-12",vs,Em],["Squeeze","","13+",Om],["Sub","","7+",sd],["Sum","","6+",km],["Tan","","7+",Vd],["Tanh","","6+",Md],["Tile","","6+",Bm],["Transpose","","1+",Hr,np],["Upsample","","7-8",ms,nm],["Upsample","","9",ms,om],["Unsqueeze","","1-12",ws,zm],["Unsqueeze","","13+",Rm],["Xor","","7+",ud]]});function Gm(r){let e={},n;for(;(n=Mm.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=P_.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let s=n[1],a=n[2],u=n[3].split(","),l=s?`${s} ${a};`:"",f=e[t].body,c="";e[t].params.forEach((b,g)=>{b&&(c+=`${b.type} ${b.name} = ${u[g]};
`)}),f=`${c}
 ${f}`,f=f.replace("return",`${a} = `);let p=`
      ${l}
      {
        ${f}
      }
      `;r=r.replace(n[0],p)}}return r=r.replace(Mm,""),r}var Mm,P_,Um=C(()=>{"use strict";Mm=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,P_="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function xn(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:O_(e,r).sort(),s=0;for(let a=0;a<r.length;++a){if(i!=null){if(i[s]===a&&r[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${r[a]}' is not 1`);(i[s]==null||i[s]>a)&&r[a]===1&&(n.push(r[a]),t.push(a)),i[s]<=a&&s++}r[a]!==1&&(n.push(r[a]),t.push(a))}return{newShape:n,keptDims:t}}function O_(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),pn(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),pn(r.every(E_),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function E_(r){return r%1===0}function C_(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Wm(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var Qo,Ts=C(()=>{"use strict";kt();Be();Qo=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let a=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,f)=>l*f),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,f)=>l*f);if(a>o||u>o)Re.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=xn(i).newShape);let s=C_(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Wm(s/4).map(a=>a*2):Wm(s)}}});var ei,Hm=C(()=>{"use strict";Be();pr();He();Ts();Qt();ei=class extends Rt{constructor(n){super(n)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let n="offsetToCoords";return{offsetToCoords:new X(`
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
        ${oe(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new X(u),i}getUnpackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[s]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[s]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[s]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[s]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[s]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${oe(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
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
      `,new X(i))}getOutputPacked2DCoords(n,t){let o="";if(Nr.arraysEqual(n,t))return o=`
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
      `),t="sampleTexture";let o=oe(this.context.glContext.version);return n[t]=new X(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),n}getInputsSamplingSnippets(){let n={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let s=this.context.inputTextureLayouts[i],a=Fo(o);s.isPacked?n[a]=this.getPackedSamplerFromInput(a,o,s):n[a]=this.getUnpackedSamplerFromInput(a,o,s);let u=kf(o);s.unpackedShape.length<=t.unpackedShape.length&&(s.isPacked?n[u]=this.getPackedSamplerAtOutputCoords(u,s,t,o):n[u]=this.getUnpackedSamplerAtOutputCoords(u,s,t,o))}),n}getPackedSamplerAtOutputCoords(n,t,o,i){let s=t.unpackedShape,a=o.unpackedShape,l=Fo(i),f=s.length,c=a.length,p=ht.getBroadcastDims(s,a),b=gt(c),g=c-f,h,w=qt();f===0?h="":c<2&&p.length>=1?h="coords = 0;":h=p.map(H=>`coords.${w[H+g]} = 0;`).join(`
`);let T="";c<2&&f>0?T="coords":T=s.map((H,j)=>`coords.${w[j+g]}`).join(", ");let v="return outputValue;",$=Q.size(s)===1,E=Q.size(a)===1;if(f===1&&!$&&!E)v=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if($&&!E)c===1?v=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:v=`
          return vec4(outputValue.x);
        `;else if(p.length){let H=f-2,j=f-1;p.indexOf(H)>-1&&p.indexOf(j)>-1?v="return vec4(outputValue.x);":p.indexOf(H)>-1?v="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(j)>-1&&(v="return vec4(outputValue.xx, outputValue.zz);")}let R=`
        int lastDim = coords.${w[c-1]};
        coords.${w[c-1]} = coords.${w[c-2]};
        coords.${w[c-2]} = lastDim;
      `,F=`
      vec4 ${n}() {
        ${b} coords = getOutputCoords();
        ${R}
        ${h}
        vec4 outputValue = ${l}(${T});
        ${v}
      }
    `;return new X(F,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(n,t,o,i){let s=[o.width,o.height],a=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,f=t.unpackedShape,c=o.unpackedShape,p=Fo(i);if(u===l&&Nr.arraysEqual(a,s)){let $=`
          float ${n}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new X($,["coordinates.sampleTexture"])}let b=gt(l),g=ht.getBroadcastDims(f,c),h=l-u,w,T=qt();u===0?w="":l<2&&g.length>=1?w="coords = 0;":w=g.map($=>`coords.${T[$+h]} = 0;`).join(`
`);let v="";l<2&&u>0?v="coords":v=t.unpackedShape.map(($,P)=>`coords.${T[P+h]}`).join(", ");let _=`
        float ${n}() {
          ${b} coords = getOutputCoords();
          ${w}
          return ${p}(${v});
        }
      `;return new X(_,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(n,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(n,t);case 1:return this.getPackedSampler1D(n,t,o);case 2:return this.getPackedSampler2D(n,t,o);case 3:return this.getPackedSampler3D(n,t,o);default:return this.getPackedSamplerND(n,t,o)}}getUnpackedSamplerFromInput(n,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(n,t,o);case 1:return this.getUnpackedSampler1D(n,t,o);case 2:return this.getUnpackedSampler2D(n,t,o);case 3:return this.getUnpackedSampler3D(n,t,o);case 4:return this.getUnpackedSampler4D(n,t,o);case 5:return this.getUnpackedSampler5D(n,t,o);case 6:return this.getUnpackedSampler6D(n,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(n,t){let o=oe(this.context.glContext.version),i=`
          vec4 ${n}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new X(i)}getPackedSampler1D(n,t,o){let i=[o.width,o.height],s=[i[1],i[0]],a=oe(this.context.glContext.version),l=`vec4 ${n}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new X(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=oe(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&Nr.arraysEqual(i,s)){let g=`vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new X(g)}let f=s,c=Math.ceil(i[1]/2),b=`vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${f[1]}, ${f[0]}, ${c}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new X(b,["coordinates.packedUVfrom2D"])}getPackedSampler3D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=[s[0],s[1]],u=oe(this.context.glContext.version);if(i[0]===1){let h=i.slice(1),w=[1,2],T=mn(i,h),v=["b","row","col"],_=JSON.parse(JSON.stringify(o));_.unpackedShape=T;let $=this.getPackedSamplerFromInput(n,t,_),E=`${$.routineBody}
      vec4 ${n}(int b, int row, int col) {
        return ${n}(${hn(v,w)});
      } `;return new X(E,$.dependencies)}let l=a[0],f=a[1],c=Math.ceil(i[2]/2),p=c*Math.ceil(i[1]/2),g=`vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${f}, ${l}, ${p}, ${c}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new X(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(n,t,o){let i=o.unpackedShape,s=i.length,a=[o.width,o.height],u=oe(this.context.glContext.version),l=[a[0],a[1]],f=l[1],c=l[0],p=Math.ceil(i[s-1]/2),b=p*Math.ceil(i[s-2]/2),g="int b, int row, int col",h=`b * ${b} + (row / 2) * ${p} + (col / 2)`;for(let v=2;v<s-1;v++)g=`int b${v}, `+g,b*=i[s-v-1],h=`b${v} * ${b} + `+h;let T=`vec4 ${n}(${g}) {
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
      `;return new X(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.height,o.width];if(s!=null&&Nr.arraysEqual(i,s)){let b=s[1],g=s[0],h=`
          float ${n}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${b}.0, ${g}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new X(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:u}=xn(i),l=a;if(l.length<i.length){let b=mn(i,l),g=JSON.parse(JSON.stringify(o));g.unpackedShape=b;let h=["col","row"],w=`
          ${this.getUnpackedSamplerFromInput(n,t,g).routineBody}
          float ${n}(int row, int col) {
            return ${n}(${hn(h,u)});
          }
        `;return new X(w,["coordinates.sampleTexture"])}let f=s[1],c=s[0];if(c===1){let b=`
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
      `;return new X(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(n,t,o){let i=o.unpackedShape,s=i[1]*i[2],a=i[2],{newShape:u,keptDims:l}=xn(i),f=u;if(f.length<i.length){let g=mn(i,f),h=["batch","col","row"],w=JSON.parse(JSON.stringify(o));w.unpackedShape=g;let T=this.getUnpackedSamplerFromInput(n,t,w),v=l.reverse(),_=`
          ${T.routineBody}
          float ${n}(int batch, int row, int col) {
            return ${n}(${hn(h,v)});
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
      `;return new X(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(n,t,o){let i=o.unpackedShape,s=i[4],a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:f,keptDims:c}=xn(i);if(f.length<i.length){let h=mn(i,f),w=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(o));T.unpackedShape=h;let v=`
          ${this.getUnpackedSamplerFromInput(n,t,T).routineBody}
          float ${n}(int row, int col, int depth, int depth2, int depth3) {
            return ${n}(${hn(w,c)});
          }
        `;return new X(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=o.width,b=o.height,g=`
        float ${n}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${a} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${p}, ${b}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new X(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(n,t,o){let i=o.unpackedShape,s=i[5],a=i[4]*s,u=i[3]*a,l=i[2]*u,f=i[1]*l,{newShape:c,keptDims:p}=xn(i);if(c.length<i.length){let w=mn(i,c),T=["row","col","depth","depth2","depth3","depth4"],v=JSON.parse(JSON.stringify(o));v.unpackedShape=w;let _=`
            ${this.getUnpackedSamplerFromInput(n,t,v).routineBody}
            float ${n}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${n}(${hn(T,p)});
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
    `;return{toVec:new X(u,["coordinates.coordsToOffset"])}}valueFrom(){let n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;n[u]=new X(this.getValueFromSingle(t,a,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",n[u]=new X(this.getValueFromSingle(t,a,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),n}getValueFromSingle(n,t,o,i,s){let a=`_${n}`;s&&(a=a+"_T");let u=oe(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${n}, coords));
          return value;
        }
        `}getPackedValueFrom(n,t,o,i,s){let a=`_${n}_Pack`;s&&(a=a+"_T");let u=oe(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${n}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${n}, coords);
        }
        `}}});var ti,qm=C(()=>{"use strict";pr();ti=class r extends Rt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new X(`highp vec4 encode(highp float f) {
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
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var ri,jm=C(()=>{"use strict";pr();He();ri=class extends Rt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=oe(this.context.glContext.version);return{setFragColor:new X(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new X(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ni,Km=C(()=>{"use strict";pr();ni=class r extends Rt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let c=0;c<s;++c)l+=`
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
        `;e[s]=new X(u)}),e}}});var oi,Xm=C(()=>{"use strict";pr();oi=class extends Rt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<n;++l)a+=`
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
    `;return{getVecItem:new X(o)}}}});var _s,Zm=C(()=>{"use strict";Hm();qm();jm();Km();Xm();_s={encoding:ti,fragcolor:ri,vec:oi,shapeUtils:ni,coordinates:ei}});var ii,Ym=C(()=>{"use strict";pr();Um();Zm();He();ii=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Uo(e,n,t,o),Object.keys(_s).forEach(s=>{let a=new _s[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let f=s+"."+l,c;i[f]?(c=i[f],c.routineBody=u[l].routineBody):(c=new Vn(f,u[l].routineBody),i[f]=c);let p=u[l].dependencies;if(p)for(let b=0;b<p.length;++b)if(i[p[b]])c.addDependency(i[p[b]]);else{let g=new Vn(p[b]);i[p[b]]=g,c.addDependency(g)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Cf(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Gm(n),`${Ef(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Wo.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ai,Jm=C(()=>{"use strict";ft();kt();Ym();He();ai=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(s){throw Re.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ii(this.glContext,e,n,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){Re.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Of(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ce.debug&&Re.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Re.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let f=n.find(c=>c.name===s)?.data;if(a!=="sampler2D"&&!f)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,f):o.uniform1f(u,f);break;case"int":l?o.uniform1iv(u,f):o.uniform1i(u,f);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var si,Qm=C(()=>{"use strict";kt();Nn();si=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let a=n.width,u=n.height,l,f;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,f=this.inUseTextures.get(l),f||(f=[],this.inUseTextures.set(l,f));let p=this.idleTextures.get(l);if(p&&p.length>0){let b=p.pop();return f.push(b),o===1&&this.glContext.updateTexture(b,a,u,s,this.toTextureData(e,t)),b}}Re.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let c=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(f.push(c),this.textureLookup.set(c,l)),c}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,f)=>l*f)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),a=this.toTensorData(n,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||n)&&(Re.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ui,eh=C(()=>{"use strict";kt();mc();qf();Vm();Jm();Ts();Qm();ui=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new Qo(e.glContext.maxTextureSize),this.programManager=new ai(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new si(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Go(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Re.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=pc(e,n,Fm);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function k_(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Un,th=C(()=>{"use strict";ft();Nn();Nn();Qt();Un=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,n,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,n*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,s),l=u.allocate(n*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,n,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ce.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Vo(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new zn(this.gl,n):new zn(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Mo(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,s;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await Ka(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=k_(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await Ka(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Is(r){let e;if((!r||r==="webgl2")&&"webgl2"in vn?e=vn.webgl2:(!r||r==="webgl")&&"webgl"in vn&&(e=vn.webgl),!e)try{let t=B_();e=rh(t,r)}catch{let o=D_();e=rh(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return vn[r]=e,n.isContextLost()?(delete vn[r],Is(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function rh(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Un(t,2)}catch(i){Re.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Un(t,1)}catch(i){Re.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function D_(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function B_(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var vn,nh=C(()=>{"use strict";kt();th();vn={}});var li,oh=C(()=>{"use strict";ft();kt();eh();nh();li=class{get contextId(){return ce.webgl.contextId}set contextId(e){ce.webgl.contextId=e}get matmulMaxBatchSize(){return ce.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ce.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ce.webgl.textureCacheMode}set textureCacheMode(e){ce.webgl.textureCacheMode=e}get pack(){return ce.webgl.pack}set pack(e){ce.webgl.pack=e}get async(){return ce.webgl.async}set async(e){ce.webgl.async=e}initialize(){try{return this.glContext=Is(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Re.setWithEnv(ce),ce.webgl.context||Object.defineProperty(ce.webgl,"context",{value:this.glContext.gl}),Re.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Re.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ui(this,e)}dispose(){this.glContext.dispose()}}});async function Ss(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=ih.get(n);if(t)return t;let o=await R_(n);if(o)return o}}else return Ss(["webgl"]);throw new Error("no available backend to use")}async function R_(r){let e=L_;if(typeof e[r]<"u"&&z_(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return ih.set(r,n),n}}function z_(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var ih,L_,ah=C(()=>{"use strict";oh();ih=new Map,L_={webgl:new li}});var $s,ci,sh=C(()=>{"use strict";kt();$s=class{constructor(e,n){this.op=e;this.node=n}},ci=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new $s(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((f,c)=>{let p=o[c];this._values[p]=f});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let f=i[u++],c=this._ops[f],p=c.node.inputs.map(w=>this._values[w]);if(p.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${c.node}`);let b=p;Re.verbose("ExecPlan",`Running op:${c.node.name} (${b.map((w,T)=>`'${c.node.inputs[T]}': ${w.type}[${w.dims.join(",")}]`).join(", ")})`);let g=await this.profiler.event("node",c.node.name,async()=>c.op.impl(t,b,c.op.context));if(g.length!==c.node.outputs.length)throw new Error("the size of output does not match model definition.");g.forEach((w,T)=>{let v=c.node.outputs[T];if(this._values[v])throw new Error(`output [${v}] already has value: op:${c.node.name}`);this._values[v]=w});let h=new Set;g.forEach((w,T)=>{let v=c.node.outputs[T];for(let _ of s[v].to){let $=a[_],P=!0;for(let E of $.inputs)if(!this._values[E]){P=!1;break}P&&h.add(_)}}),i.push(...h)}let l=[];for(let f=0;f<this.graph.getOutputIndices().length;f++){let c=this.graph.getOutputIndices()[f],p=this._values[c];if(p===void 0)throw new Error(`required output [${c}] does not have value`);c===0?await p.getData():p.data,l.push(p)}return Re.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var _e,Ft,Wn,uh=C(()=>{"use strict";Cn();_e=un(dn());Gr();Be();Ft=ee.experimental.fbs,Wn=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof _e.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Ft.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof _e.onnx.AttributeProto?e.type:e.type();switch(n){case _e.onnx.AttributeProto.AttributeType.FLOAT:return"float";case _e.onnx.AttributeProto.AttributeType.INT:return"int";case _e.onnx.AttributeProto.AttributeType.STRING:return"string";case _e.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case _e.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case _e.onnx.AttributeProto.AttributeType.INTS:return"ints";case _e.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case _e.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${_e.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof _e.onnx.AttributeProto?e.type:e.type();if(n===_e.onnx.AttributeProto.AttributeType.GRAPH||n===_e.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===_e.onnx.AttributeProto.AttributeType.INT&&wt.isLong(t))return wt.longToNumber(t);if(n===_e.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=wt.longToNumber(a)}return i}if(n===_e.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof _e.onnx.AttributeProto?et.fromProto(t):et.fromOrtTensor(t);if(n===_e.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof _e.onnx.AttributeProto)return t.map(i=>et.fromProto(i));if(e instanceof Ft.Attribute)return t.map(i=>et.fromOrtTensor(i))}return n===_e.onnx.AttributeProto.AttributeType.STRING&&e instanceof _e.onnx.AttributeProto?Rn(t):n===_e.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof _e.onnx.AttributeProto?t.map(Rn):t}static getValueNoCheck(e){return e instanceof _e.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case _e.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case _e.onnx.AttributeProto.AttributeType.INT:return e.i;case _e.onnx.AttributeProto.AttributeType.STRING:return e.s;case _e.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case _e.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case _e.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case _e.onnx.AttributeProto.AttributeType.INTS:return e.ints;case _e.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case _e.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case _e.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${_e.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Ft.AttributeType.FLOAT:return e.f();case Ft.AttributeType.INT:return e.i();case Ft.AttributeType.STRING:return e.s();case Ft.AttributeType.TENSOR:return e.t();case Ft.AttributeType.GRAPH:return e.g();case Ft.AttributeType.FLOATS:return e.floatsArray();case Ft.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case Ft.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case Ft.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${Ft.AttributeType[e.type()]}`)}}}});var Ps,fi,Os,rr,di,As,lh=C(()=>{"use strict";uh();Cn();Ps=un(dn());Gr();Be();fi=ee.experimental.fbs,Os={from:(r,e)=>new As(r,e)},rr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ct.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},di=class{constructor(e,n){e instanceof Ps.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Wn(e.attribute)):e instanceof fi.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Wn(ct.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},As=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Ps.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof fi.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new rr(i))-1;n.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=n.get(i.name);if(s===void 0){let a=new rr;a.type={shape:{dims:ct.tensorDimsFromProto(i.dims)},tensorType:ct.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,n.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=et.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new rr(i))-1;n.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new di(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new rr)-1,n.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=et.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(n.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new rr;if(e.nodeArgs(a)?.type()?.valueType()!==fi.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let f=e.nodeArgs(a).type().value(new fi.TensorTypeAndShape),c=ct.tensorDataTypeFromProto(f.elemType()),p=f.shape(),b=[];for(let h=0;h<p.dimLength();h++)b.push(wt.longToNumber(p.dim(h).value().dimValue()));u.type={shape:{dims:b},tensorType:c};let g=this._allData.push(u)-1;n.set(s,g),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=n.get(s.name());if(a===void 0){let u=new rr,l=ct.tensorDimsFromORTFormat(s),f=ct.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:f},a=this._allData.push(u)-1,n.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=et.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(n.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new rr)-1;n.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new di(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),f=n.get(l);if(typeof f>"u"&&(f=this._allData.push(new rr)-1,n.set(l,f)),s.outputs.push(f),this._allData[f]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${f}`);if(this._allData[f]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[f]._from=-1,this._allData[f].tensor=et.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),f=n.get(l);if(typeof f>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(f),this._allData[f]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&n.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=n[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let a=1;a<n.outputs.length;a++)if(this._allData[n.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let a=0;a<n.inputs.length;a++){let u=this._allData[n.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Vr,Mr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var ch,N_,pi,fh=C(()=>{"use strict";Do();lh();Cn();ch=un(dn());Be();N_=ee.experimental.fbs,pi=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=ch.onnx.ModelProto.decode(e);if(wt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:wt.longToNumber(i.version)})),this._graph=Os.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new k.ByteBuffer(e),o=N_.InferenceSession.getRootAsInferenceSession(t).model();if(wt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:wt.longToNumber(a.version())})}this._graph=Os.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var mi,dh=C(()=>{"use strict";ah();sh();kt();fh();mi=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Co.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Ss(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new pi,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ci(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let s=e.get(n[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],s=n[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var hi,ph=C(()=>{"use strict";ft();Gr();hi=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new et(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new it(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var mh={};sn(mh,{onnxjsBackend:()=>F_});var Es,F_,hh=C(()=>{"use strict";dh();ph();Es=class{async init(){}async createInferenceSessionHandler(e,n){let t=new mi(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new hi(t)}},F_=new Es});var gi=C(()=>{"use strict"});var yh={};sn(yh,{default:()=>V_});var gh,bh,V_,xh=C(()=>{"use strict";Cs();jr();Hn();gh="ort-wasm-proxy-worker",bh=globalThis.self?.name===gh;bh&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":bi(n.wasm).then(()=>{yi(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;xi(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=qn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;vi(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":wi(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;Ti(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Ii([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":_i(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});V_=bh?null:r=>new Worker(r??wn,{type:"module",name:gh})});var wh={};sn(wh,{default:()=>M_});var ks,vh,M_,Th=C(()=>{"use strict";vh=(ks=import.meta.url,async function(r={}){function e(){return Ie.buffer!=Se.buffer&&tt(),Se}function n(){return Ie.buffer!=Se.buffer&&tt(),ue}function t(){return Ie.buffer!=Se.buffer&&tt(),ze}function o(){return Ie.buffer!=Se.buffer&&tt(),xe}function i(){return Ie.buffer!=Se.buffer&&tt(),be}function s(){return Ie.buffer!=Se.buffer&&tt(),ve}function a(){return Ie.buffer!=Se.buffer&&tt(),G}function u(){return Ie.buffer!=Se.buffer&&tt(),bt}var l,f,c=Object.assign({},r),p=new Promise((d,m)=>{l=d,f=m}),b=typeof window=="object",g=typeof importScripts=="function",h=g&&self.name=="em-pthread";c.mountExternalData=(d,m)=>{d.startsWith("./")&&(d=d.substring(2)),(c.Fb||(c.Fb=new Map)).set(d,m)},c.unmountExternalData=()=>{delete c.Fb};var w=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let T=()=>{let d=(y,x,I)=>(...O)=>{let z=Zt,N=x?.();O=y(...O);let K=x?.();return N!==K&&(y=K,I(N),x=I=null),Zt!=z?new Promise((Z,ne)=>{pa={resolve:Z,reject:ne}}):O},m=y=>async(...x)=>{try{if(c.Eb)throw Error("Session already started");let I=c.Eb={cc:x[0],errors:[]},O=await y(...x);if(c.Eb!==I)throw Error("Session mismatch");c.Mb?.flush();let z=I.errors;if(0<z.length){let N=await Promise.all(z);if(N=N.filter(K=>K),0<N.length)throw Error(N.join(`
`))}return O}finally{c.Eb=null}};c._OrtCreateSession=d(c._OrtCreateSession,()=>c._OrtCreateSession,y=>c._OrtCreateSession=y),c._OrtRun=m(d(c._OrtRun,()=>c._OrtRun,y=>c._OrtRun=y)),c._OrtRunWithBinding=m(d(c._OrtRunWithBinding,()=>c._OrtRunWithBinding,y=>c._OrtRunWithBinding=y)),c._OrtBindInput=d(c._OrtBindInput,()=>c._OrtBindInput,y=>c._OrtBindInput=y),T=void 0};c.jsepInit=(d,m)=>{if(T?.(),d==="webgpu"){[c.Mb,c.Tb,c.Xb,c.Nb,c.Wb,c.jb,c.Yb,c.$b,c.Ub,c.Vb,c.Zb]=m;let y=c.Mb;c.jsepRegisterBuffer=(x,I,O,z)=>y.registerBuffer(x,I,O,z),c.jsepGetBuffer=x=>y.getBuffer(x),c.jsepCreateDownloader=(x,I,O)=>y.createDownloader(x,I,O),c.jsepOnReleaseSession=x=>{y.onReleaseSession(x)},c.jsepOnRunStart=x=>y.onRunStart(x),c.ac=(x,I)=>{y.upload(x,I)}}};var v,_,$=Object.assign({},c),P="./this.program",E=(d,m)=>{throw m},R="";(b||g)&&(g?R=self.location.href:typeof document<"u"&&document.currentScript&&(R=document.currentScript.src),ks&&(R=ks),R=R.startsWith("blob:")?"":R.substr(0,R.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(_=d=>{var m=new XMLHttpRequest;return m.open("GET",d,!1),m.responseType="arraybuffer",m.send(null),new Uint8Array(m.response)}),v=(d,m,y)=>{var x=new XMLHttpRequest;x.open("GET",d,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?m(x.response):y()},x.onerror=y,x.send(null)});var F,H=console.log.bind(console),j=console.error.bind(console),M=H,ae=j;if(Object.assign(c,$),$=null,h){let d=function(m){try{var y=m.data,x=y.cmd;if(x==="load"){let I=[];self.onmessage=O=>I.push(O),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let O of I)d(O);self.onmessage=d};for(let O of y.handlers)c[O]&&!c[O].proxy||(c[O]=(...z)=>{postMessage({Lb:"callHandler",lc:O,args:z})},O=="print"&&(M=c[O]),O=="printErr"&&(ae=c[O]));Ie=y.wasmMemory,tt(),he(y.wasmModule)}else if(x==="run"){ba(y.pthread_ptr,0,0,1,0,0),ca(y.pthread_ptr),Hx(),$u(),ge||(_l(),ge=!0);try{qx(y.start_routine,y.arg)}catch(I){if(I!="unwind")throw I}}else x==="cancel"?an()&&go(-1):y.target!=="setimmediate"&&(x==="checkMailbox"?ge&&ao():x&&(ae(`worker: received unknown command ${x}`),ae(y)))}catch(I){throw Il(),I}};var nS=d,he,ge=!1;ae=function(...m){m=m.join(" "),console.error(m)},self.alert=function(...m){postMessage({Lb:"alert",text:m.join(" "),nc:an()})},c.instantiateWasm=(m,y)=>new Promise(x=>{he=I=>{I=new WebAssembly.Instance(I,wu()),y(I),x()}}),self.onunhandledrejection=m=>{throw m.reason||m},self.onmessage=d}c.wasmBinary&&(F=c.wasmBinary);var Ie,ie,Ae,Se,ue,ze,xe,be,ve,G,J,Ce,bt,je=!1;function tt(){var d=Ie.buffer;c.HEAP8=Se=new Int8Array(d),c.HEAP16=ze=new Int16Array(d),c.HEAPU8=ue=new Uint8Array(d),c.HEAPU16=xe=new Uint16Array(d),c.HEAP32=be=new Int32Array(d),c.HEAPU32=ve=new Uint32Array(d),c.HEAPF32=G=new Float32Array(d),c.HEAPF64=bt=new Float64Array(d),c.HEAP64=J=new BigInt64Array(d),c.HEAPU64=Ce=new BigUint64Array(d)}if(!h){if(!((Ie=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof w))throw ae("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");tt()}var An=[],lt=[],pt=[],Ot=0,en=null,Or=null;function gu(){if(--Ot==0&&(en!==null&&(clearInterval(en),en=null),Or)){var d=Or;Or=null,d()}}function tn(d){throw ae(d="Aborted("+d+")"),je=!0,Ae=1,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),f(d),d}var Ji,bu=d=>d.startsWith("data:application/octet-stream;base64,"),yu=d=>d.startsWith("file://");function xu(d){if(d==Ji&&F)return new Uint8Array(F);if(_)return _(d);throw"both async and sync fetching of the wasm failed"}function vu(d,m,y){return function(x){if(!F&&(b||g)){if(typeof fetch=="function"&&!yu(x))return fetch(x,{credentials:"same-origin"}).then(I=>{if(!I.ok)throw`failed to load wasm binary file at '${x}'`;return I.arrayBuffer()}).catch(()=>xu(x));if(v)return new Promise((I,O)=>{v(x,z=>I(new Uint8Array(z)),O)})}return Promise.resolve().then(()=>xu(x))}(d).then(x=>WebAssembly.instantiate(x,m)).then(y,x=>{ae(`failed to asynchronously prepare wasm: ${x}`),tn(x)})}function wu(){return{a:{M:Wx,za:Ux,b:Kx,$:Eu,z:Du,pa:Bu,X:Ru,Z:zu,qa:Nu,na:Fu,ga:Vu,ma:Mu,J:Gu,Y:Uu,V:Wu,oa:Hu,W:qu,va:Xx,D:Yx,P:Jx,O:e0,C:r0,s:n0,p:o0,E:i0,y:d0,Q:p0,ta:m0,ja:h0,T:g0,aa:b0,F:y0,ia:ca,sa:x0,u:v0,B:_0,o:I0,m:$0,c:ua,n:A0,k:E0,Aa:C0,r:k0,g:D0,v:B0,l:L0,f:R0,i:z0,j:N0,h:F0,e:V0,da:M0,ea:G0,fa:U0,ba:al,ca:sl,S:W0,d:H0,N:q0,G:j0,K:K0,w:X0,ra:Z0,U:Y0,t:ll,x:J0,L:Q0,R:ev,ya:tv,xa:rv,ka:dl,la:pl,_:na,A:ml,I:hl,ha:gl,H:bl,a:Ie,wa:ra,ua:vl,q:iv}}}var Qi={859316:(d,m,y,x,I)=>{if(c===void 0||!c.Fb)return 1;if((d=ot(d>>>0)).startsWith("./")&&(d=d.substring(2)),!(d=c.Fb.get(d)))return 2;if(x>>>=0,(m>>>=0)+(y>>>=0)>d.byteLength)return 3;try{let O=d.subarray(m,m+y);switch(I){case 0:n().set(O,x>>>0);break;case 1:c.ac(x,O);break;default:return 4}return 0}catch{return 4}},859999:()=>{c.Ub()},860030:()=>{c.Vb()},860059:()=>{c.Zb()},860084:d=>c.Tb(d),860117:d=>c.Xb(d),860149:(d,m,y)=>{c.Nb(d,m,y,!0)},860188:(d,m,y)=>{c.Nb(d,m,y)},860221:()=>typeof wasmOffsetConverter<"u",860278:d=>{c.jb("Abs",d,void 0)},860329:d=>{c.jb("Neg",d,void 0)},860380:d=>{c.jb("Floor",d,void 0)},860433:d=>{c.jb("Ceil",d,void 0)},860485:d=>{c.jb("Reciprocal",d,void 0)},860543:d=>{c.jb("Sqrt",d,void 0)},860595:d=>{c.jb("Exp",d,void 0)},860646:d=>{c.jb("Erf",d,void 0)},860697:d=>{c.jb("Sigmoid",d,void 0)},860752:(d,m,y)=>{c.jb("HardSigmoid",d,{alpha:m,beta:y})},860831:d=>{c.jb("Log",d,void 0)},860882:d=>{c.jb("Sin",d,void 0)},860933:d=>{c.jb("Cos",d,void 0)},860984:d=>{c.jb("Tan",d,void 0)},861035:d=>{c.jb("Asin",d,void 0)},861087:d=>{c.jb("Acos",d,void 0)},861139:d=>{c.jb("Atan",d,void 0)},861191:d=>{c.jb("Sinh",d,void 0)},861243:d=>{c.jb("Cosh",d,void 0)},861295:d=>{c.jb("Asinh",d,void 0)},861348:d=>{c.jb("Acosh",d,void 0)},861401:d=>{c.jb("Atanh",d,void 0)},861454:d=>{c.jb("Tanh",d,void 0)},861506:d=>{c.jb("Not",d,void 0)},861557:(d,m,y)=>{c.jb("Clip",d,{min:m,max:y})},861626:d=>{c.jb("Clip",d,void 0)},861678:(d,m)=>{c.jb("Elu",d,{alpha:m})},861736:d=>{c.jb("Gelu",d,void 0)},861788:d=>{c.jb("Relu",d,void 0)},861840:(d,m)=>{c.jb("LeakyRelu",d,{alpha:m})},861904:(d,m)=>{c.jb("ThresholdedRelu",d,{alpha:m})},861974:(d,m)=>{c.jb("Cast",d,{to:m})},862032:d=>{c.jb("Add",d,void 0)},862083:d=>{c.jb("Sub",d,void 0)},862134:d=>{c.jb("Mul",d,void 0)},862185:d=>{c.jb("Div",d,void 0)},862236:d=>{c.jb("Pow",d,void 0)},862287:d=>{c.jb("Equal",d,void 0)},862340:d=>{c.jb("Greater",d,void 0)},862395:d=>{c.jb("GreaterOrEqual",d,void 0)},862457:d=>{c.jb("Less",d,void 0)},862509:d=>{c.jb("LessOrEqual",d,void 0)},862568:(d,m,y,x,I)=>{c.jb("ReduceMean",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},862727:(d,m,y,x,I)=>{c.jb("ReduceMax",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},862885:(d,m,y,x,I)=>{c.jb("ReduceMin",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863043:(d,m,y,x,I)=>{c.jb("ReduceProd",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863202:(d,m,y,x,I)=>{c.jb("ReduceSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863360:(d,m,y,x,I)=>{c.jb("ReduceL1",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863517:(d,m,y,x,I)=>{c.jb("ReduceL2",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863674:(d,m,y,x,I)=>{c.jb("ReduceLogSum",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863835:(d,m,y,x,I)=>{c.jb("ReduceSumSquare",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},863999:(d,m,y,x,I)=>{c.jb("ReduceLogSumExp",d,{keepDims:!!m,noopWithEmptyAxes:!!y,axes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},864163:d=>{c.jb("Where",d,void 0)},864216:(d,m,y)=>{c.jb("Transpose",d,{perm:m?Array.from(i().subarray(m>>>0,y>>>0)):[]})},864324:(d,m,y,x)=>{c.jb("DepthToSpace",d,{blocksize:m,mode:ot(y),format:x?"NHWC":"NCHW"})},864457:(d,m,y,x)=>{c.jb("DepthToSpace",d,{blocksize:m,mode:ot(y),format:x?"NHWC":"NCHW"})},864590:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L,we)=>{c.jb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[I],pads:[O,z],strides:[N],wIsConst:()=>!!e()[Z>>>0],outputPadding:ne?Array.from(i().subarray(ne>>>0,Te>>>0)):[],outputShape:ke?Array.from(i().subarray(ke>>>0,L>>>0)):[],activation:ot(we)})},864991:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("ConvTranspose",d,{format:N?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(y>>>0,2+(y>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(i().subarray(O>>>0,4+(O>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],outputShape:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[],activation:ot(L)})},865556:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L,we)=>{c.jb("ConvTranspose",d,{format:K?"NHWC":"NCHW",autoPad:m,dilations:[y],group:x,kernelShape:[I],pads:[O,z],strides:[N],wIsConst:()=>!!e()[Z>>>0],outputPadding:ne?Array.from(i().subarray(ne>>>0,Te>>>0)):[],outputShape:ke?Array.from(i().subarray(ke>>>0,L>>>0)):[],activation:ot(we)})},865957:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("ConvTranspose",d,{format:N?"NHWC":"NCHW",autoPad:m,dilations:Array.from(i().subarray(y>>>0,2+(y>>>0)>>>0)),group:x,kernelShape:Array.from(i().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(i().subarray(O>>>0,4+(O>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!e()[K>>>0],outputPadding:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],outputShape:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[],activation:ot(L)})},866522:(d,m)=>{c.jb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},866613:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("AveragePool",d,{format:L?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:N?Array.from(i().subarray(N>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],strides:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[]})},867028:(d,m)=>{c.jb("GlobalAveragePool",d,{format:m?"NHWC":"NCHW"})},867119:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("AveragePool",d,{format:L?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:N?Array.from(i().subarray(N>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],strides:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[]})},867534:(d,m)=>{c.jb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},867621:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("MaxPool",d,{format:L?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:N?Array.from(i().subarray(N>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],strides:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[]})},868032:(d,m)=>{c.jb("GlobalMaxPool",d,{format:m?"NHWC":"NCHW"})},868119:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L)=>{c.jb("MaxPool",d,{format:L?"NHWC":"NCHW",auto_pad:m,ceil_mode:y,count_include_pad:x,storage_order:I,dilations:O?Array.from(i().subarray(O>>>0,z>>>0)):[],kernel_shape:N?Array.from(i().subarray(N>>>0,K>>>0)):[],pads:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],strides:Te?Array.from(i().subarray(Te>>>0,ke>>>0)):[]})},868530:(d,m,y,x,I)=>{c.jb("Gemm",d,{alpha:m,beta:y,transA:x,transB:I})},868634:d=>{c.jb("MatMul",d,void 0)},868688:(d,m,y,x)=>{c.jb("ArgMax",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},868796:(d,m,y,x)=>{c.jb("ArgMin",d,{keepDims:!!m,selectLastIndex:!!y,axis:x})},868904:(d,m)=>{c.jb("Softmax",d,{axis:m})},868967:(d,m)=>{c.jb("Concat",d,{axis:m})},869027:(d,m,y,x,I)=>{c.jb("Split",d,{axis:m,numOutputs:y,splitSizes:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},869167:d=>{c.jb("Expand",d,void 0)},869221:(d,m)=>{c.jb("Gather",d,{axis:Number(m)})},869292:(d,m)=>{c.jb("GatherElements",d,{axis:Number(m)})},869371:(d,m,y,x,I,O,z,N,K,Z,ne)=>{c.jb("Resize",d,{antialias:m,axes:y?Array.from(i().subarray(y>>>0,x>>>0)):[],coordinateTransformMode:ot(I),cubicCoeffA:O,excludeOutside:z,extrapolationValue:N,keepAspectRatioPolicy:ot(K),mode:ot(Z),nearestMode:ot(ne)})},869717:(d,m,y,x,I,O,z)=>{c.jb("Slice",d,{starts:m?Array.from(i().subarray(m>>>0,y>>>0)):[],ends:x?Array.from(i().subarray(x>>>0,I>>>0)):[],axes:O?Array.from(i().subarray(O>>>0,z>>>0)):[]})},869933:d=>{c.jb("Tile",d,void 0)},869985:(d,m,y)=>{c.jb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},870099:(d,m,y)=>{c.jb("InstanceNormalization",d,{epsilon:m,format:y?"NHWC":"NCHW"})},870213:d=>{c.jb("Range",d,void 0)},870266:(d,m)=>{c.jb("Einsum",d,{equation:ot(m)})},870347:(d,m,y,x,I)=>{c.jb("Pad",d,{mode:m,value:y,pads:x?Array.from(i().subarray(x>>>0,I>>>0)):[]})},870474:(d,m,y,x,I,O)=>{c.jb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!I,trainingMode:!!x,format:O?"NHWC":"NCHW"})},870643:(d,m,y,x,I,O)=>{c.jb("BatchNormalization",d,{epsilon:m,momentum:y,spatial:!!I,trainingMode:!!x,format:O?"NHWC":"NCHW"})},870812:(d,m,y)=>{c.jb("CumSum",d,{exclusive:Number(m),reverse:Number(y)})},870909:(d,m,y)=>{c.jb("DequantizeLinear",d,{axis:m,blockSize:y})},870999:(d,m,y,x,I,O,z,N,K)=>{c.jb("Attention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:I,doRotary:O,qkvHiddenSizes:z?Array.from(i().subarray(Number(N)>>>0,Number(N)+z>>>0)):[],pastPresentShareBuffer:!!K})},871271:d=>{c.jb("BiasAdd",d,void 0)},871326:d=>{c.jb("BiasSplitGelu",d,void 0)},871387:d=>{c.jb("FastGelu",d,void 0)},871443:(d,m,y,x,I,O,z,N,K,Z,ne,Te,ke,L,we,qe)=>{c.jb("Conv",d,{format:Te?"NHWC":"NCHW",auto_pad:m,dilations:y?Array.from(i().subarray(y>>>0,x>>>0)):[],group:I,kernel_shape:O?Array.from(i().subarray(O>>>0,z>>>0)):[],pads:N?Array.from(i().subarray(N>>>0,K>>>0)):[],strides:Z?Array.from(i().subarray(Z>>>0,ne>>>0)):[],w_is_const:()=>!!e()[ke>>>0],activation:ot(L),activation_params:we?Array.from(a().subarray(we>>>0,qe>>>0)):[]})},871939:d=>{c.jb("Gelu",d,void 0)},871991:(d,m,y,x)=>{c.jb("GroupQueryAttention",d,{numHeads:m,kvNumHeads:y,scale:x})},872104:(d,m,y,x)=>{c.jb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},872215:(d,m,y,x)=>{c.jb("LayerNormalization",d,{axis:m,epsilon:y,simplified:!!x})},872326:(d,m,y,x,I,O)=>{c.jb("MatMulNBits",d,{k:m,n:y,accuracyLevel:x,bits:I,blockSize:O})},872453:(d,m,y,x,I,O)=>{c.jb("MultiHeadAttention",d,{numHeads:m,isUnidirectional:y,maskFilterValue:x,scale:I,doRotary:O})},872612:(d,m)=>{c.jb("QuickGelu",d,{alpha:m})},872676:(d,m,y,x,I)=>{c.jb("RotaryEmbedding",d,{interleaved:!!m,numHeads:y,rotaryEmbeddingDim:x,scale:I})},872815:(d,m,y)=>{c.jb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},872917:(d,m,y)=>{c.jb("SkipLayerNormalization",d,{epsilon:m,simplified:!!y})},873019:(d,m,y,x)=>{c.jb("GatherBlockQuantized",d,{gatherAxis:m,quantizeAxis:y,blockSize:x})},873140:d=>{c.Yb(d)},873174:(d,m)=>c.$b(d,m,c.Eb.cc,c.Eb.errors)};function Ux(d,m,y){return tl(async()=>{await c.Wb(d,m,y)})}function Wx(){return typeof wasmOffsetConverter<"u"}function ea(d){this.name="ExitStatus",this.message=`Program terminated with exit(${d})`,this.status=d}var ta=d=>{d.terminate(),d.onmessage=()=>{}},Tu=d=>{gr.length==0&&(Pu(),Au(gr[0]));var m=gr.pop();if(!m)return 6;Cr.push(m),Kt[d.Ab]=m,m.Ab=d.Ab;var y={cmd:"run",start_routine:d.dc,arg:d.Pb,pthread_ptr:d.Ab};return m.postMessage(y,d.jc),0},Er=0,We=(d,m,...y)=>{for(var x=2*y.length,I=va(),O=xa(8*x),z=O>>>3,N=0;N<y.length;N++){var K=y[N];typeof K=="bigint"?(J[z+2*N]=1n,J[z+2*N+1]=K):(J[z+2*N]=0n,u()[z+2*N+1>>>0]=K)}return d=Sl(d,0,x,O,m),bo(I),d};function ra(d){if(h)return We(0,1,d);if(Ae=d,!(0<Er)){for(var m of Cr)ta(m);for(m of gr)ta(m);gr=[],Cr=[],Kt=[],je=!0}E(d,new ea(d))}function _u(d){if(h)return We(1,0,d);na(d)}var na=d=>{if(Ae=d,h)throw _u(d),"unwind";ra(d)},gr=[],Cr=[],Iu=[],Kt={},Su=d=>{var m=d.Ab;delete Kt[m],gr.push(d),Cr.splice(Cr.indexOf(d),1),d.Ab=0,ya(m)};function $u(){Iu.forEach(d=>d())}var Au=d=>new Promise(m=>{d.onmessage=I=>{var O=(I=I.data).cmd;if(I.targetThread&&I.targetThread!=an()){var z=Kt[I.targetThread];z?z.postMessage(I,I.transferList):ae(`Internal error! Worker sent a message "${O}" to target pthread ${I.targetThread}, but that thread no longer exists!`)}else O==="checkMailbox"?ao():O==="spawnThread"?Tu(I):O==="cleanupThread"?Su(Kt[I.thread]):O==="killThread"?(I=I.thread,O=Kt[I],delete Kt[I],ta(O),ya(I),Cr.splice(Cr.indexOf(O),1),O.Ab=0):O==="cancelThread"?Kt[I.thread].postMessage({cmd:"cancel"}):O==="loaded"?(d.loaded=!0,m(d)):O==="alert"?alert(`Thread ${I.threadId}: ${I.text}`):I.target==="setimmediate"?d.postMessage(I):O==="callHandler"?c[I.handler](...I.args):O&&ae(`worker sent an unknown command ${O}`)},d.onerror=I=>{throw ae(`worker sent an error! ${I.filename}:${I.lineno}: ${I.message}`),I};var y,x=[];for(y of[])c.hasOwnProperty(y)&&x.push(y);d.postMessage({cmd:"load",handlers:x,wasmMemory:Ie,wasmModule:ie})});function Pu(){var d=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});gr.push(d)}var io=d=>{for(;0<d.length;)d.shift()(c)},Hx=()=>{var d=an(),m=s()[d+52>>>2>>>0];d=s()[d+56>>>2>>>0],Al(m,m-d),bo(m)},qx=(d,m)=>{Er=0,d=Pl(d,m),0<Er?Ae=d:go(d)};class jx{constructor(m){this.Ib=m-24}}function Kx(d,m,y){var x=new jx(d>>>=0);throw m>>>=0,y>>>=0,s()[x.Ib+16>>>2>>>0]=0,s()[x.Ib+4>>>2>>>0]=m,s()[x.Ib+8>>>2>>>0]=y,d}function Ou(d,m,y,x){return h?We(2,1,d,m,y,x):Eu(d,m,y,x)}function Eu(d,m,y,x){if(d>>>=0,m>>>=0,y>>>=0,x>>>=0,w===void 0)return ae("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var I=[];return h&&I.length===0?Ou(d,m,y,x):(d={dc:y,Ab:d,Pb:x,jc:I},h?(d.Lb="spawnThread",postMessage(d,I),0):Tu(d))}var Cu=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ku=(d,m,y)=>{var x=(m>>>=0)+y;for(y=m;d[y]&&!(y>=x);)++y;if(16<y-m&&d.buffer&&Cu)return Cu.decode(d.buffer instanceof w?d.slice(m,y):d.subarray(m,y));for(x="";m<y;){var I=d[m++];if(128&I){var O=63&d[m++];if((224&I)==192)x+=String.fromCharCode((31&I)<<6|O);else{var z=63&d[m++];65536>(I=(240&I)==224?(15&I)<<12|O<<6|z:(7&I)<<18|O<<12|z<<6|63&d[m++])?x+=String.fromCharCode(I):(I-=65536,x+=String.fromCharCode(55296|I>>10,56320|1023&I))}}else x+=String.fromCharCode(I)}return x},ot=(d,m)=>(d>>>=0)?ku(n(),d,m):"";function Du(d,m,y){return h?We(3,1,d,m,y):0}function Bu(d,m){if(h)return We(4,1,d,m)}var oa=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);127>=x?m++:2047>=x?m+=2:55296<=x&&57343>=x?(m+=4,++y):m+=3}return m},Lu=(d,m,y,x)=>{if(!(0<x))return 0;var I=y>>>=0;x=y+x-1;for(var O=0;O<d.length;++O){var z=d.charCodeAt(O);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&d.charCodeAt(++O)),127>=z){if(y>=x)break;m[y++>>>0]=z}else{if(2047>=z){if(y+1>=x)break;m[y++>>>0]=192|z>>6}else{if(65535>=z){if(y+2>=x)break;m[y++>>>0]=224|z>>12}else{if(y+3>=x)break;m[y++>>>0]=240|z>>18,m[y++>>>0]=128|z>>12&63}m[y++>>>0]=128|z>>6&63}m[y++>>>0]=128|63&z}}return m[y>>>0]=0,y-I},rn=(d,m,y)=>Lu(d,n(),m,y);function Ru(d,m){if(h)return We(5,1,d,m)}function zu(d,m,y){if(h)return We(6,1,d,m,y)}function Nu(d,m,y){return h?We(7,1,d,m,y):0}function Fu(d,m){if(h)return We(8,1,d,m)}function Vu(d,m,y){if(h)return We(9,1,d,m,y)}function Mu(d,m,y,x){if(h)return We(10,1,d,m,y,x)}function Gu(d,m,y,x){if(h)return We(11,1,d,m,y,x)}function Uu(d,m,y,x){if(h)return We(12,1,d,m,y,x)}function Wu(d){if(h)return We(13,1,d)}function Hu(d,m){if(h)return We(14,1,d,m)}function qu(d,m,y){if(h)return We(15,1,d,m,y)}var ju,br,Xx=()=>{tn("")},Xt=d=>{for(var m="";n()[d>>>0];)m+=ju[n()[d++>>>0]];return m},ia={},aa={},Zx={};function lr(d,m,y={}){if(!("argPackAdvance"in m))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(x,I,O={}){var z=I.name;if(!x)throw new br(`type "${z}" must have a positive integer typeid pointer`);if(aa.hasOwnProperty(x)){if(O.Rb)return;throw new br(`Cannot register type '${z}' twice`)}aa[x]=I,delete Zx[x],ia.hasOwnProperty(x)&&(I=ia[x],delete ia[x],I.forEach(N=>N()))}(d,m,y)}var Ku=(d,m,y)=>{switch(m){case 1:return y?x=>e()[x>>>0]:x=>n()[x>>>0];case 2:return y?x=>t()[x>>>1>>>0]:x=>o()[x>>>1>>>0];case 4:return y?x=>i()[x>>>2>>>0]:x=>s()[x>>>2>>>0];case 8:return y?x=>J[x>>>3]:x=>Ce[x>>>3];default:throw new TypeError(`invalid integer width (${m}): ${d}`)}};function Yx(d,m,y){y>>>=0,lr(d>>>=0,{name:m=Xt(m>>>0),fromWireType:x=>x,toWireType:function(x,I){if(typeof I!="bigint"&&typeof I!="number")throw I=I===null?"null":(x=typeof I)=="object"||x==="array"||x==="function"?I.toString():""+I,new TypeError(`Cannot convert "${I}" to ${this.name}`);return typeof I=="number"&&(I=BigInt(I)),I},argPackAdvance:yr,readValueFromPointer:Ku(m,y,m.indexOf("u")==-1),Db:null})}var yr=8;function Jx(d,m,y,x){lr(d>>>=0,{name:m=Xt(m>>>0),fromWireType:function(I){return!!I},toWireType:function(I,O){return O?y:x},argPackAdvance:yr,readValueFromPointer:function(I){return this.fromWireType(n()[I>>>0])},Db:null})}var sa=[],cr=[];function ua(d){9<(d>>>=0)&&--cr[d+1]==0&&(cr[d]=void 0,sa.push(d))}var Et=d=>{if(!d)throw new br("Cannot use deleted val. handle = "+d);return cr[d]},Ct=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let m=sa.pop()||cr.length;return cr[m]=d,cr[m+1]=1,m}};function la(d){return this.fromWireType(s()[d>>>2>>>0])}var Qx={name:"emscripten::val",fromWireType:d=>{var m=Et(d);return ua(d),m},toWireType:(d,m)=>Ct(m),argPackAdvance:yr,readValueFromPointer:la,Db:null};function e0(d){return lr(d>>>0,Qx)}var t0=(d,m)=>{switch(m){case 4:return function(y){return this.fromWireType(a()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(u()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${m}): ${d}`)}};function r0(d,m,y){y>>>=0,lr(d>>>=0,{name:m=Xt(m>>>0),fromWireType:x=>x,toWireType:(x,I)=>I,argPackAdvance:yr,readValueFromPointer:t0(m,y),Db:null})}function n0(d,m,y,x,I){if(d>>>=0,y>>>=0,m=Xt(m>>>0),I===-1&&(I=4294967295),I=N=>N,x===0){var O=32-8*y;I=N=>N<<O>>>O}var z=m.includes("unsigned")?function(N,K){return K>>>0}:function(N,K){return K};lr(d,{name:m,fromWireType:I,toWireType:z,argPackAdvance:yr,readValueFromPointer:Ku(m,y,x!==0),Db:null})}function o0(d,m,y){function x(O){var z=s()[O>>>2>>>0];return O=s()[O+4>>>2>>>0],new I(e().buffer,O,z)}var I=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][m];lr(d>>>=0,{name:y=Xt(y>>>0),fromWireType:x,argPackAdvance:yr,readValueFromPointer:x},{Rb:!0})}function i0(d,m){d>>>=0;var y=(m=Xt(m>>>0))==="std::string";lr(d,{name:m,fromWireType:function(x){var I=s()[x>>>2>>>0],O=x+4;if(y)for(var z=O,N=0;N<=I;++N){var K=O+N;if(N==I||n()[K>>>0]==0){if(z=ot(z,K-z),Z===void 0)var Z=z;else Z+=String.fromCharCode(0),Z+=z;z=K+1}}else{for(Z=Array(I),N=0;N<I;++N)Z[N]=String.fromCharCode(n()[O+N>>>0]);Z=Z.join("")}return Yt(x),Z},toWireType:function(x,I){I instanceof ArrayBuffer&&(I=new Uint8Array(I));var O=typeof I=="string";if(!(O||I instanceof Uint8Array||I instanceof Uint8ClampedArray||I instanceof Int8Array))throw new br("Cannot pass non-string to std::string");var z=y&&O?oa(I):I.length,N=ho(4+z+1),K=N+4;if(s()[N>>>2>>>0]=z,y&&O)rn(I,K,z+1);else if(O)for(O=0;O<z;++O){var Z=I.charCodeAt(O);if(255<Z)throw Yt(K),new br("String has UTF-16 code units that do not fit in 8 bits");n()[K+O>>>0]=Z}else for(O=0;O<z;++O)n()[K+O>>>0]=I[O];return x!==null&&x.push(Yt,N),N},argPackAdvance:yr,readValueFromPointer:la,Db(x){Yt(x)}})}var Xu=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,a0=(d,m)=>{for(var y=d>>1,x=y+m/2;!(y>=x)&&o()[y>>>0];)++y;if(32<(y<<=1)-d&&Xu)return Xu.decode(n().slice(d,y));for(y="",x=0;!(x>=m/2);++x){var I=t()[d+2*x>>>1>>>0];if(I==0)break;y+=String.fromCharCode(I)}return y},s0=(d,m,y)=>{if(y??=2147483647,2>y)return 0;var x=m;y=(y-=2)<2*d.length?y/2:d.length;for(var I=0;I<y;++I){var O=d.charCodeAt(I);t()[m>>>1>>>0]=O,m+=2}return t()[m>>>1>>>0]=0,m-x},u0=d=>2*d.length,l0=(d,m)=>{for(var y=0,x="";!(y>=m/4);){var I=i()[d+4*y>>>2>>>0];if(I==0)break;++y,65536<=I?(I-=65536,x+=String.fromCharCode(55296|I>>10,56320|1023&I)):x+=String.fromCharCode(I)}return x},c0=(d,m,y)=>{if(m>>>=0,y??=2147483647,4>y)return 0;var x=m;y=x+y-4;for(var I=0;I<d.length;++I){var O=d.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&d.charCodeAt(++I)),i()[m>>>2>>>0]=O,(m+=4)+4>y)break}return i()[m>>>2>>>0]=0,m-x},f0=d=>{for(var m=0,y=0;y<d.length;++y){var x=d.charCodeAt(y);55296<=x&&57343>=x&&++y,m+=4}return m};function d0(d,m,y){if(d>>>=0,m>>>=0,y=Xt(y>>>=0),m===2)var x=a0,I=s0,O=u0,z=N=>o()[N>>>1>>>0];else m===4&&(x=l0,I=c0,O=f0,z=N=>s()[N>>>2>>>0]);lr(d,{name:y,fromWireType:N=>{for(var K,Z=s()[N>>>2>>>0],ne=N+4,Te=0;Te<=Z;++Te){var ke=N+4+Te*m;Te!=Z&&z(ke)!=0||(ne=x(ne,ke-ne),K===void 0?K=ne:(K+=String.fromCharCode(0),K+=ne),ne=ke+m)}return Yt(N),K},toWireType:(N,K)=>{if(typeof K!="string")throw new br(`Cannot pass non-string to C++ string type ${y}`);var Z=O(K),ne=ho(4+Z+m);return s()[ne>>>2>>>0]=Z/m,I(K,ne+4,Z+m),N!==null&&N.push(Yt,ne),ne},argPackAdvance:yr,readValueFromPointer:la,Db(N){Yt(N)}})}function p0(d,m){lr(d>>>=0,{Sb:!0,name:m=Xt(m>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var m0=()=>1;function h0(d){ba(d>>>0,!g,1,!b,131072,!1),$u()}var Zu=d=>{if(!je)try{if(d(),!(0<Er))try{h?go(Ae):na(Ae)}catch(m){m instanceof ea||m=="unwind"||E(1,m)}}catch(m){m instanceof ea||m=="unwind"||E(1,m)}};function ca(d){d>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(i(),d>>>2,d).value.then(ao),d+=128,Atomics.store(i(),d>>>2,1))}var ao=()=>{var d=an();d&&(ca(d),Zu($l))};function g0(d,m){(d>>>=0)==m>>>0?setTimeout(ao):h?postMessage({targetThread:d,cmd:"checkMailbox"}):(d=Kt[d])&&d.postMessage({cmd:"checkMailbox"})}var fa=[];function b0(d,m,y,x,I){for(m>>>=0,x/=2,fa.length=x,y=I>>>0>>>3,I=0;I<x;I++)fa[I]=J[y+2*I]?J[y+2*I+1]:u()[y+2*I+1>>>0];return(m?Qi[m]:av[d])(...fa)}function y0(d){d>>>=0,h?postMessage({cmd:"cleanupThread",thread:d}):Su(Kt[d])}function x0(d){}var da=(d,m)=>{var y=aa[d];if(y===void 0)throw d=Tl(d),y=Xt(d),Yt(d),new br(`${m} has unknown type ${y}`);return y},Yu=(d,m,y)=>{var x=[];return d=d.toWireType(x,y),x.length&&(s()[m>>>2>>>0]=Ct(x)),d};function v0(d,m,y){return m>>>=0,y>>>=0,d=Et(d>>>0),m=da(m,"emval::as"),Yu(m,y,d)}var so=d=>{try{d()}catch(m){tn(m)}},xr=0,Zt=null,Ju=0,uo=[],Qu={},el={},w0=0,pa=null,T0=[];function tl(d){return function(m){if(!je){if(xr===0){var y=!1,x=!1;m((I=0)=>{if(!je&&(Ju=I,y=!0,x)){xr=2,so(()=>Cl(Zt)),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.resume(),I=!1;try{var O=function(){var K=i()[Zt+8>>>2>>>0];return K=te[el[K]],--Er,K()}()}catch(K){O=K,I=!0}var z=!1;if(!Zt){var N=pa;N&&(pa=null,(I?N.reject:N.resolve)(O),z=!0)}if(I&&!z)throw O}}),x=!0,y||(xr=1,Zt=function(){var I=ho(65548),O=I+12;s()[I>>>2>>>0]=O,s()[I+4>>>2>>>0]=O+65536,O=uo[0];var z=Qu[O];return z===void 0&&(z=w0++,Qu[O]=z,el[z]=O),O=z,i()[I+8>>>2>>>0]=O,I}(),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.pause(),so(()=>Ol(Zt)))}else xr===2?(xr=0,so(kl),Yt(Zt),Zt=null,T0.forEach(Zu)):tn(`invalid state: ${xr}`);return Ju}}(m=>{d().then(m)})}function _0(d){return d>>>=0,tl(()=>(d=Et(d)).then(Ct))}var lo=[];function I0(d,m,y,x){return y>>>=0,x>>>=0,(d=lo[d>>>0])(null,m=Et(m>>>0),y,x)}var S0={},co=d=>{var m=S0[d];return m===void 0?Xt(d):m};function $0(d,m,y,x,I){return y>>>=0,x>>>=0,I>>>=0,(d=lo[d>>>0])(m=Et(m>>>0),m[y=co(y)],x,I)}var rl=()=>typeof globalThis=="object"?globalThis:Function("return this")();function A0(d){return(d>>>=0)==0?Ct(rl()):(d=co(d),Ct(rl()[d]))}var P0=d=>{var m=lo.length;return lo.push(d),m},O0=(d,m)=>{for(var y=Array(d),x=0;x<d;++x)y[x]=da(s()[m+4*x>>>2>>>0],"parameter "+x);return y},nl=(d,m)=>Object.defineProperty(m,"name",{value:d});function E0(d,m,y){var x=(m=O0(d,m>>>0)).shift();d--;var I=`return function (obj, func, destructorsRef, args) {
`,O=0,z=[];y===0&&z.push("obj");for(var N=["retType"],K=[x],Z=0;Z<d;++Z)z.push("arg"+Z),N.push("argType"+Z),K.push(m[Z]),I+=`  var arg${Z} = argType${Z}.readValueFromPointer(args${O?"+"+O:""});
`,O+=m[Z].argPackAdvance;return I+=`  var rv = ${y===1?"new func":"func.call"}(${z.join(", ")});
`,x.Sb||(N.push("emval_returnValue"),K.push(Yu),I+=`  return emval_returnValue(retType, destructorsRef, rv);
`),N.push(I+`};
`),d=function(ne){var Te=Function;if(!(Te instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof Te} which is not a function`);var ke=nl(Te.name||"unknownFunctionName",function(){});return ke.prototype=Te.prototype,ke=new ke,(ne=Te.apply(ke,ne))instanceof Object?ne:ke}(N)(...K),y=`methodCaller<(${m.map(ne=>ne.name).join(", ")}) => ${x.name}>`,P0(nl(y,d))}function C0(d){return d=co(d>>>0),Ct(c[d])}function k0(d,m){return m>>>=0,d=Et(d>>>0),m=Et(m),Ct(d[m])}function D0(d){9<(d>>>=0)&&(cr[d+1]+=1)}function B0(){return Ct([])}function L0(d){d=Et(d>>>0);for(var m=Array(d.length),y=0;y<d.length;y++)m[y]=d[y];return Ct(m)}function R0(d){return Ct(co(d>>>0))}function z0(){return Ct({})}function N0(d){for(var m=Et(d>>>=0);m.length;){var y=m.pop();m.pop()(y)}ua(d)}function F0(d,m,y){m>>>=0,y>>>=0,d=Et(d>>>0),m=Et(m),y=Et(y),d[m]=y}function V0(d,m){return m>>>=0,d=(d=da(d>>>0,"_emval_take_value")).readValueFromPointer(m),Ct(d)}function M0(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getUTCSeconds(),i()[m+4>>>2>>>0]=d.getUTCMinutes(),i()[m+8>>>2>>>0]=d.getUTCHours(),i()[m+12>>>2>>>0]=d.getUTCDate(),i()[m+16>>>2>>>0]=d.getUTCMonth(),i()[m+20>>>2>>>0]=d.getUTCFullYear()-1900,i()[m+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[m+28>>>2>>>0]=d}var nn=d=>d%4==0&&(d%100!=0||d%400==0),ol=[0,31,60,91,121,152,182,213,244,274,305,335],il=[0,31,59,90,120,151,181,212,243,273,304,334];function G0(d,m){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),m>>>=0,d=new Date(1e3*d),i()[m>>>2>>>0]=d.getSeconds(),i()[m+4>>>2>>>0]=d.getMinutes(),i()[m+8>>>2>>>0]=d.getHours(),i()[m+12>>>2>>>0]=d.getDate(),i()[m+16>>>2>>>0]=d.getMonth(),i()[m+20>>>2>>>0]=d.getFullYear()-1900,i()[m+24>>>2>>>0]=d.getDay();var y=(nn(d.getFullYear())?ol:il)[d.getMonth()]+d.getDate()-1|0;i()[m+28>>>2>>>0]=y,i()[m+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var x=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=x&&d.getTimezoneOffset()==Math.min(x,y)),i()[m+32>>>2>>>0]=d}function U0(d){d>>>=0;var m=new Date(i()[d+20>>>2>>>0]+1900,i()[d+16>>>2>>>0],i()[d+12>>>2>>>0],i()[d+8>>>2>>>0],i()[d+4>>>2>>>0],i()[d>>>2>>>0],0),y=i()[d+32>>>2>>>0],x=m.getTimezoneOffset(),I=new Date(m.getFullYear(),6,1).getTimezoneOffset(),O=new Date(m.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(O,I);return 0>y?i()[d+32>>>2>>>0]=+(I!=O&&z==x):0<y!=(z==x)&&(I=Math.max(O,I),m.setTime(m.getTime()+6e4*((0<y?z:I)-x))),i()[d+24>>>2>>>0]=m.getDay(),y=(nn(m.getFullYear())?ol:il)[m.getMonth()]+m.getDate()-1|0,i()[d+28>>>2>>>0]=y,i()[d>>>2>>>0]=m.getSeconds(),i()[d+4>>>2>>>0]=m.getMinutes(),i()[d+8>>>2>>>0]=m.getHours(),i()[d+12>>>2>>>0]=m.getDate(),i()[d+16>>>2>>>0]=m.getMonth(),i()[d+20>>>2>>>0]=m.getYear(),d=m.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function al(d,m,y,x,I,O,z){return h?We(16,1,d,m,y,x,I,O,z):-52}function sl(d,m,y,x,I,O){if(h)return We(17,1,d,m,y,x,I,O)}function W0(d,m,y,x){d>>>=0,m>>>=0,y>>>=0,x>>>=0;var I=new Date().getFullYear(),O=new Date(I,0,1),z=new Date(I,6,1);I=O.getTimezoneOffset();var N=z.getTimezoneOffset(),K=Math.max(I,N);s()[d>>>2>>>0]=60*K,i()[m>>>2>>>0]=+(I!=N),O=(d=Z=>Z.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(O),z=d(z),N<I?(rn(O,y,17),rn(z,x,17)):(rn(O,x,17),rn(z,y,17))}var ma=[],ul=(d,m)=>{ma.length=0;for(var y;y=n()[d++>>>0];){var x=y!=105;m+=(x&=y!=112)&&m%8?4:0,ma.push(y==112?s()[m>>>2>>>0]:y==106?J[m>>>3]:y==105?i()[m>>>2>>>0]:u()[m>>>3>>>0]),m+=x?8:4}return ma};function H0(d,m,y){return d>>>=0,m=ul(m>>>0,y>>>0),Qi[d](...m)}function q0(d,m,y){return d>>>=0,m=ul(m>>>0,y>>>0),Qi[d](...m)}var j0=()=>{},K0=()=>Date.now();function X0(d,m){return ae(ot(d>>>0,m>>>0))}var ll,Z0=()=>{throw Er+=1,"unwind"};function Y0(){return 4294901760}ll=()=>performance.timeOrigin+performance.now();var J0=()=>navigator.hardwareConcurrency;function Q0(){return tn("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function ev(d){d>>>=0;var m=n().length;if(d<=m||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var x=m*(1+.2/y);x=Math.min(x,d+100663296);var I=Math;x=Math.max(d,x);e:{I=(I.min.call(I,4294901760,x+(65536-x%65536)%65536)-Ie.buffer.byteLength+65535)/65536;try{Ie.grow(I),tt();var O=1;break e}catch{}O=void 0}if(O)return!0}return!1}var fo=()=>(tn("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),on={},cl=d=>{d.forEach(m=>{var y=fo();y&&(on[y]=m)})};function tv(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),cl(d),on.Ob=fo(),on.bc=d,on.Ob}function rv(d,m,y){if(d>>>=0,m>>>=0,on.Ob==d)var x=on.bc;else(x=Error().stack.toString().split(`
`))[0]=="Error"&&x.shift(),cl(x);for(var I=3;x[I]&&fo()!=d;)++I;for(d=0;d<y&&x[d+I];++d)i()[m+4*d>>>2>>>0]=fo();return d}var ha,ga={},fl=()=>{if(!ha){var d,m={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:P||"./this.program"};for(d in ga)ga[d]===void 0?delete m[d]:m[d]=ga[d];var y=[];for(d in m)y.push(`${d}=${m[d]}`);ha=y}return ha};function dl(d,m){if(h)return We(18,1,d,m);d>>>=0,m>>>=0;var y=0;return fl().forEach((x,I)=>{var O=m+y;for(I=s()[d+4*I>>>2>>>0]=O,O=0;O<x.length;++O)e()[I++>>>0]=x.charCodeAt(O);e()[I>>>0]=0,y+=x.length+1}),0}function pl(d,m){if(h)return We(19,1,d,m);d>>>=0,m>>>=0;var y=fl();s()[d>>>2>>>0]=y.length;var x=0;return y.forEach(I=>x+=I.length+1),s()[m>>>2>>>0]=x,0}function ml(d){return h?We(20,1,d):52}function hl(d,m,y,x){return h?We(21,1,d,m,y,x):52}function gl(d,m,y,x){return h?We(22,1,d,m,y,x):70}var nv=[null,[],[]];function bl(d,m,y,x){if(h)return We(23,1,d,m,y,x);m>>>=0,y>>>=0,x>>>=0;for(var I=0,O=0;O<y;O++){var z=s()[m>>>2>>>0],N=s()[m+4>>>2>>>0];m+=8;for(var K=0;K<N;K++){var Z=n()[z+K>>>0],ne=nv[d];Z===0||Z===10?((d===1?M:ae)(ku(ne,0)),ne.length=0):ne.push(Z)}I+=N}return s()[x>>>2>>>0]=I,0}var yl=[31,29,31,30,31,30,31,31,30,31,30,31],xl=[31,28,31,30,31,30,31,31,30,31,30,31],ov=(d,m)=>{e().set(d,m>>>0)};function vl(d,m,y,x){function I(L,we,qe){for(L=typeof L=="number"?L.toString():L||"";L.length<we;)L=qe[0]+L;return L}function O(L,we){return I(L,we,"0")}function z(L,we){function qe(Bl){return 0>Bl?-1:0<Bl?1:0}var kr;return(kr=qe(L.getFullYear()-we.getFullYear()))===0&&(kr=qe(L.getMonth()-we.getMonth()))===0&&(kr=qe(L.getDate()-we.getDate())),kr}function N(L){switch(L.getDay()){case 0:return new Date(L.getFullYear()-1,11,29);case 1:return L;case 2:return new Date(L.getFullYear(),0,3);case 3:return new Date(L.getFullYear(),0,2);case 4:return new Date(L.getFullYear(),0,1);case 5:return new Date(L.getFullYear()-1,11,31);case 6:return new Date(L.getFullYear()-1,11,30)}}function K(L){var we=L.Bb;for(L=new Date(new Date(L.Cb+1900,0,1).getTime());0<we;){var qe=L.getMonth(),kr=(nn(L.getFullYear())?yl:xl)[qe];if(!(we>kr-L.getDate())){L.setDate(L.getDate()+we);break}we-=kr-L.getDate()+1,L.setDate(1),11>qe?L.setMonth(qe+1):(L.setMonth(0),L.setFullYear(L.getFullYear()+1))}return qe=new Date(L.getFullYear()+1,0,4),we=N(new Date(L.getFullYear(),0,4)),qe=N(qe),0>=z(we,L)?0>=z(qe,L)?L.getFullYear()+1:L.getFullYear():L.getFullYear()-1}d>>>=0,m>>>=0,y>>>=0,x>>>=0;var Z=s()[x+40>>>2>>>0];for(var ne in x={hc:i()[x>>>2>>>0],fc:i()[x+4>>>2>>>0],Gb:i()[x+8>>>2>>>0],Kb:i()[x+12>>>2>>>0],Hb:i()[x+16>>>2>>>0],Cb:i()[x+20>>>2>>>0],ub:i()[x+24>>>2>>>0],Bb:i()[x+28>>>2>>>0],oc:i()[x+32>>>2>>>0],ec:i()[x+36>>>2>>>0],ic:Z?ot(Z):""},y=ot(y),Z={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})y=y.replace(new RegExp(ne,"g"),Z[ne]);var Te="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ke="January February March April May June July August September October November December".split(" ");for(ne in Z={"%a":L=>Te[L.ub].substring(0,3),"%A":L=>Te[L.ub],"%b":L=>ke[L.Hb].substring(0,3),"%B":L=>ke[L.Hb],"%C":L=>O((L.Cb+1900)/100|0,2),"%d":L=>O(L.Kb,2),"%e":L=>I(L.Kb,2," "),"%g":L=>K(L).toString().substring(2),"%G":K,"%H":L=>O(L.Gb,2),"%I":L=>((L=L.Gb)==0?L=12:12<L&&(L-=12),O(L,2)),"%j":L=>{for(var we=0,qe=0;qe<=L.Hb-1;we+=(nn(L.Cb+1900)?yl:xl)[qe++]);return O(L.Kb+we,3)},"%m":L=>O(L.Hb+1,2),"%M":L=>O(L.fc,2),"%n":()=>`
`,"%p":L=>0<=L.Gb&&12>L.Gb?"AM":"PM","%S":L=>O(L.hc,2),"%t":()=>"	","%u":L=>L.ub||7,"%U":L=>O(Math.floor((L.Bb+7-L.ub)/7),2),"%V":L=>{var we=Math.floor((L.Bb+7-(L.ub+6)%7)/7);if(2>=(L.ub+371-L.Bb-2)%7&&we++,we)we==53&&((qe=(L.ub+371-L.Bb)%7)==4||qe==3&&nn(L.Cb)||(we=1));else{we=52;var qe=(L.ub+7-L.Bb-1)%7;(qe==4||qe==5&&nn(L.Cb%400-1))&&we++}return O(we,2)},"%w":L=>L.ub,"%W":L=>O(Math.floor((L.Bb+7-(L.ub+6)%7)/7),2),"%y":L=>(L.Cb+1900).toString().substring(2),"%Y":L=>L.Cb+1900,"%z":L=>{var we=0<=(L=L.ec);return L=Math.abs(L)/60,(we?"+":"-")+("0000"+(L/60*100+L%60)).slice(-4)},"%Z":L=>L.ic,"%%":()=>"%"},y=y.replace(/%%/g,"\0\0"),Z)y.includes(ne)&&(y=y.replace(new RegExp(ne,"g"),Z[ne](x)));return ne=function(L){var we=Array(oa(L)+1);return Lu(L,we,0,we.length),we}(y=y.replace(/\0\0/g,"%")),ne.length>m?0:(ov(ne,d),ne.length-1)}function iv(d,m,y,x){return vl(d>>>0,m>>>0,y>>>0,x>>>0)}h||function(){for(var d=c.numThreads-1;d--;)Pu();An.unshift(()=>{Ot++,function(m){h?m():Promise.all(gr.map(Au)).then(m)}(()=>gu())})}();for(var wl=Array(256),po=0;256>po;++po)wl[po]=String.fromCharCode(po);ju=wl,br=c.BindingError=class extends Error{constructor(d){super(d),this.name="BindingError"}},c.InternalError=class extends Error{constructor(d){super(d),this.name="InternalError"}},cr.push(0,1,void 0,1,null,1,!0,1,!1,1),c.count_emval_handles=()=>cr.length/2-5-sa.length;var av=[ra,_u,Ou,Du,Bu,Ru,zu,Nu,Fu,Vu,Mu,Gu,Uu,Wu,Hu,qu,al,sl,dl,pl,ml,hl,gl,bl],te=function(){function d(y,x){return te=y.exports,te=function(){var I=te,O={};for(let[z,N]of Object.entries(I))O[z]=typeof N=="function"?(...K)=>{uo.push(z);try{return N(...K)}finally{je||(uo.pop(),Zt&&xr===1&&uo.length===0&&(xr=0,Er+=1,so(El),typeof Fibers<"u"&&Fibers.pc()))}}:N;return O}(),te=function(){var I=te,O=N=>K=>N(K)>>>0,z=N=>()=>N()>>>0;return(I=Object.assign({},I)).Ca=O(I.Ca),I.fb=z(I.fb),I.gb=O(I.gb),I.emscripten_main_runtime_thread_id=z(I.emscripten_main_runtime_thread_id),I.sb=O(I.sb),I.tb=z(I.tb),I}(),Iu.push(te.ib),lt.unshift(te.Ba),ie=x,gu(),te}var m=wu();if(Ot++,c.instantiateWasm)try{return c.instantiateWasm(m,d)}catch(y){ae(`Module.instantiateWasm callback failed with error: ${y}`),f(y)}return Ji||=c.locateFile?bu("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":c.locateFile?c.locateFile("ort-wasm-simd-threaded.jsep.wasm",R):R+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(y,x){var I=Ji;return F||typeof WebAssembly.instantiateStreaming!="function"||bu(I)||yu(I)||typeof fetch!="function"?vu(I,y,x):fetch(I,{credentials:"same-origin"}).then(O=>WebAssembly.instantiateStreaming(O,y).then(x,function(z){return ae(`wasm streaming compile failed: ${z}`),ae("falling back to ArrayBuffer instantiation"),vu(I,y,x)}))}(m,function(y){d(y.instance,y.module)}).catch(f),{}}(),Tl=d=>(Tl=te.Ca)(d),_l=()=>(_l=te.Da)();c._OrtInit=(d,m)=>(c._OrtInit=te.Ea)(d,m),c._OrtGetLastError=(d,m)=>(c._OrtGetLastError=te.Fa)(d,m),c._OrtCreateSessionOptions=(d,m,y,x,I,O,z,N,K,Z)=>(c._OrtCreateSessionOptions=te.Ga)(d,m,y,x,I,O,z,N,K,Z),c._OrtAppendExecutionProvider=(d,m)=>(c._OrtAppendExecutionProvider=te.Ha)(d,m),c._OrtAddFreeDimensionOverride=(d,m,y)=>(c._OrtAddFreeDimensionOverride=te.Ia)(d,m,y),c._OrtAddSessionConfigEntry=(d,m,y)=>(c._OrtAddSessionConfigEntry=te.Ja)(d,m,y),c._OrtReleaseSessionOptions=d=>(c._OrtReleaseSessionOptions=te.Ka)(d),c._OrtCreateSession=(d,m,y)=>(c._OrtCreateSession=te.La)(d,m,y),c._OrtReleaseSession=d=>(c._OrtReleaseSession=te.Ma)(d),c._OrtGetInputOutputCount=(d,m,y)=>(c._OrtGetInputOutputCount=te.Na)(d,m,y),c._OrtGetInputName=(d,m)=>(c._OrtGetInputName=te.Oa)(d,m),c._OrtGetOutputName=(d,m)=>(c._OrtGetOutputName=te.Pa)(d,m),c._OrtFree=d=>(c._OrtFree=te.Qa)(d),c._OrtCreateTensor=(d,m,y,x,I,O)=>(c._OrtCreateTensor=te.Ra)(d,m,y,x,I,O),c._OrtGetTensorData=(d,m,y,x,I)=>(c._OrtGetTensorData=te.Sa)(d,m,y,x,I),c._OrtReleaseTensor=d=>(c._OrtReleaseTensor=te.Ta)(d),c._OrtCreateRunOptions=(d,m,y,x)=>(c._OrtCreateRunOptions=te.Ua)(d,m,y,x),c._OrtAddRunConfigEntry=(d,m,y)=>(c._OrtAddRunConfigEntry=te.Va)(d,m,y),c._OrtReleaseRunOptions=d=>(c._OrtReleaseRunOptions=te.Wa)(d),c._OrtCreateBinding=d=>(c._OrtCreateBinding=te.Xa)(d),c._OrtBindInput=(d,m,y)=>(c._OrtBindInput=te.Ya)(d,m,y),c._OrtBindOutput=(d,m,y,x)=>(c._OrtBindOutput=te.Za)(d,m,y,x),c._OrtClearBoundOutputs=d=>(c._OrtClearBoundOutputs=te._a)(d),c._OrtReleaseBinding=d=>(c._OrtReleaseBinding=te.$a)(d),c._OrtRunWithBinding=(d,m,y,x,I)=>(c._OrtRunWithBinding=te.ab)(d,m,y,x,I),c._OrtRun=(d,m,y,x,I,O,z,N)=>(c._OrtRun=te.bb)(d,m,y,x,I,O,z,N),c._OrtEndProfiling=d=>(c._OrtEndProfiling=te.cb)(d),c._JsepOutput=(d,m,y)=>(c._JsepOutput=te.db)(d,m,y),c._JsepGetNodeName=d=>(c._JsepGetNodeName=te.eb)(d);var mo,an=()=>(an=te.fb)(),ho=c._malloc=d=>(ho=c._malloc=te.gb)(d),Yt=c._free=d=>(Yt=c._free=te.hb)(d),ba=(d,m,y,x,I,O)=>(ba=te.kb)(d,m,y,x,I,O),Il=()=>(Il=te.lb)(),Sl=(d,m,y,x,I)=>(Sl=te.mb)(d,m,y,x,I),ya=d=>(ya=te.nb)(d),go=d=>(go=te.ob)(d),$l=()=>($l=te.pb)(),Al=(d,m)=>(Al=te.qb)(d,m),bo=d=>(bo=te.rb)(d),xa=d=>(xa=te.sb)(d),va=()=>(va=te.tb)(),Pl=c.dynCall_ii=(d,m)=>(Pl=c.dynCall_ii=te.vb)(d,m),Ol=d=>(Ol=te.wb)(d),El=()=>(El=te.xb)(),Cl=d=>(Cl=te.yb)(d),kl=()=>(kl=te.zb)();function Dl(){0<Ot||(h?(l(c),h||io(lt),startWorker(c)):(io(An),0<Ot||mo||(mo=!0,c.calledRun=!0,je||(h||io(lt),l(c),h||io(pt)))))}return c.___start_em_js=873286,c.___stop_em_js=873508,c.stackSave=()=>va(),c.stackRestore=d=>bo(d),c.stackAlloc=d=>xa(d),c.UTF8ToString=ot,c.stringToUTF8=rn,c.lengthBytesUTF8=oa,Or=function d(){mo||Dl(),mo||(Or=d)},Dl(),p}),M_=vh;globalThis.self?.name==="em-pthread"&&vh()});var wn,G_,U_,W_,_h,Ih,H_,Sh,Hn=C(()=>{"use strict";gi();wn=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),G_=!1||typeof location>"u"?void 0:location.origin,U_=(r,e)=>{try{let n=e??wn;return(n?new URL(r,n):new URL(r)).origin===G_}catch{return!1}},W_=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},_h=(xh(),Pn(yh)).default,Ih=async()=>{if(!wn)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(U_(wn))return[void 0,_h()];let r=await W_(wn);return[r,_h(r)]},H_=(Th(),Pn(wh)).default,Sh=async(r,e,n)=>[void 0,H_]});var Ds,Bs,Si,$h,q_,j_,bi,Je,jr=C(()=>{"use strict";Hn();Bs=!1,Si=!1,$h=!1,q_=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},j_=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},bi=async r=>{if(Bs)return Promise.resolve();if(Si)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if($h)throw new Error("previous call to 'initializeWebAssembly()' failed.");Si=!0;let e=r.initTimeout,n=r.numThreads;if(!j_())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=q_();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,f=r.wasmBinary,[c,p]=await Sh(a,i,n>1),b=!1,g=[];if(e>0&&g.push(new Promise(h=>{setTimeout(()=>{b=!0,h()},e)})),g.push(new Promise((h,w)=>{let T={numThreads:n};f?T.wasmBinary=f:(l||i)&&(T.locateFile=(v,_)=>l??(i??_)+v),p(T).then(v=>{Si=!1,Bs=!0,Ds=v,h(),c&&URL.revokeObjectURL(c)},v=>{Si=!1,$h=!0,w(v)})})),await Promise.race(g),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Je=()=>{if(Bs&&Ds)return Ds;throw new Error("WebAssembly is not initialized yet.")}});var rt,jn,Ue,$i=C(()=>{"use strict";jr();rt=(r,e)=>{let n=Je(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},jn=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")jn(i,s+".",n,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ue=r=>{let e=Je(),n=e.stackSave();try{let t=e.stackAlloc(8);e._OrtGetLastError(t,t+4);let o=e.HEAP32[t/4],i=e.HEAPU32[t/4+1],s=i?e.UTF8ToString(i):"";throw new Error(`${r} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var Ah,Ph=C(()=>{"use strict";jr();$i();Ah=r=>{let e=Je(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=rt(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&Ue("Can't create run options."),r?.extra!==void 0&&jn(r.extra,"",new WeakSet,(s,a)=>{let u=rt(s,t),l=rt(a,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&Ue(`Can't set a run config entry: ${s} - ${a}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(s=>e._free(s)),i}}});var K_,X_,Z_,Y_,Oh,Eh=C(()=>{"use strict";jr();$i();K_=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},X_=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},Z_=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},Y_=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=rt("deviceType",n),l=rt(a,n);Je()._OrtAddSessionConfigEntry(r,u,l)!==0&&Ue(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=rt("preferredLayout",n),u=rt(s.preferredLayout,n);Je()._OrtAddSessionConfigEntry(r,a,u)!==0&&Ue(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=rt(o,n);Je()._OrtAppendExecutionProvider(r,i)!==0&&Ue(`Can't append execution provider: ${o}.`)}},Oh=r=>{let e=Je(),n=0,t=[],o=r||{};Z_(o);try{let i=K_(o.graphOptimizationLevel??"all"),s=X_(o.executionMode??"sequential"),a=typeof o.logId=="string"?rt(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let f=typeof o.optimizedModelFilePath=="string"?rt(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,f),n===0&&Ue("Can't create session options."),o.executionProviders&&Y_(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=rt("enableGraphCapture",t),p=rt(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,c,p)!==0&&Ue(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let b=rt(c,t);e._OrtAddFreeDimensionOverride(n,b,p)!==0&&Ue(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&jn(o.extra,"",new WeakSet,(c,p)=>{let b=rt(c,t),g=rt(p,t);e._OrtAddSessionConfigEntry(n,b,g)!==0&&Ue(`Can't set a session config entry: ${c} - ${p}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n),t.forEach(s=>e._free(s)),i}}});var Ls,Ar,Kn,Ai,Xn,Pi,Rs,se=C(()=>{"use strict";Ls=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Ar=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},Kn=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},Ai=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},Xn=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Pi=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Rs=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${r}`)}}});var Zn,zs=C(()=>{"use strict";gi();Zn=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=wa("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=wa("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var J_,Q_,Ch,kh,Dh,e2,Ne,mr=C(()=>{"use strict";se();J_=["V","I","W","E","F"],Q_=(r,e)=>{console.log(`[${J_[r]},${new Date().toISOString()}]${e}`)},Dh=(r,e)=>{Ch=r,kh=e},e2=(r,e)=>{let n=Xn(r),t=Xn(Ch);n>=t&&Q_(n,typeof e=="function"?e():e)},Ne=(...r)=>{kh&&e2(...r)}});var Bh,Lh=C(()=>{"use strict";se();Bh=(r,e)=>new(Ai(e))(r)});var Oi=C(()=>{"use strict"});var Rh,Ns,Fs,t2,r2,zh,Ms,Vs,Fh,Vh=C(()=>{"use strict";mr();Oi();Rh=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ns=[],Fs=r=>Math.ceil(r/16)*16,t2=r=>{for(let e=0;e<Ns.length;e++){let n=Ns[e];if(r<=n)return n}return Math.ceil(r/16)*16},r2=1,zh=()=>r2++,Ms=async(r,e,n,t)=>{let o=Fs(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=r.getCommandEncoder();r.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},Vs=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[n]of Rh)Ns.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[])}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,s=Fs(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let f=this.backend.getCommandEncoder();this.backend.endComputePass(),f.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),Ne("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`),this.buffersForUploadingPending.push(u)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Fs(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=this.externalBuffers.get(t),o===void 0)throw new Error("previous buffer is not registered");if(e===t)return Ne("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(t)}else o=zh();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),this.externalBuffers.set(e,o),Ne("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){let n=this.externalBuffers.get(e);n!==void 0&&(this.storageCache.delete(n),this.externalBuffers.delete(e),Ne("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${n}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=t2(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let a={id:zh(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:e}),Ne("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=this.storageCache.get(e);if(!n)throw new Error("releasing data does not exist");return Ne("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("data does not exist");await Ms(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){for(let e of this.buffersForUploadingPending)e.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Rh.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e))}},Fh=(...r)=>new Vs(...r)});var Gs,le,Ke=C(()=>{"use strict";Gs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=r=>new Gs(r)});var Us,nr,D,Kr,Ei,Mh,Gh,fe=C(()=>{"use strict";Us=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},nr=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Us.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],f=i-u<0?1:n[i-u];if(l!==f&&l>1&&f>1)return;let c=Math.max(l,f);if(l&&f)a[s-u]=Math.max(l,f);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},D=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Kr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(s?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((e+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Ei=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!nr.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Mh=-34028234663852886e22,Gh=34028234663852886e22});var Xr,Hs,Le,nt,W,Fe,Pr,Zr,jt,Y,qs,B,V,Ci,Ws,Uh,_n,pe=C(()=>{"use strict";se();fe();Xr=64,Hs=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(r){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},Le=(r,e=1)=>{let n=Hs(r,e);return typeof n=="string"?n:n[0]},nt=(r,e=1)=>{let n=Hs(r,e);return typeof n=="string"?n:n[1]},W=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:D.computeStrides(n)})}),e},Fe=r=>r%4===0?4:r%2===0?2:1,Pr=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,Zr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,jt=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,Y=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,qs=(r,e,n,t,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Hs(e,o),f=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],p={indices:u,value:f,storage:c,tensor:e},b=G=>typeof G=="string"?G:`${G}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",w=`${h}${r}_shape`,T=`${h}${r}_strides`,v="";for(let G=0;G<s-1;G++)v+=`
    let dim${G} = current / ${Y(T,G,s)};
    let rest${G} = current % ${Y(T,G,s)};
    indices[${G}] = dim${G};
    current = rest${G};
    `;v+=`indices[${s-1}] = current;`;let _=s<2?"":`
  fn o2i_${r}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${v}
    return indices;
  }`,$=G=>(g.offsetToIndices=!0,s<2?G:`o2i_${r}(${G})`),P=[];if(s>=2)for(let G=s-1;G>=0;G--)P.push(`${Y(T,G,s)} * (indices[${G}])`);let E=s<2?"":`
  fn i2o_${r}(indices: ${p.indices}) -> u32 {
    return ${P.join("+")};
  }`,R=G=>(g.indicesToOffset=!0,s<2?G:`i2o_${r}(${G})`),F=(...G)=>s===0?"0u":`${p.indices}(${G.map(b).join(",")})`,H=(G,J)=>s<2?`${G}`:`${Y(G,J,s)}`,j=(G,J,Ce)=>s<2?`${G}=${Ce};`:`${Y(G,J,s)}=${Ce};`,M={},ae=(G,J)=>{g.broadcastedIndicesToOffset=!0;let Ce=`${J.name}broadcastedIndicesTo${r}Offset`;if(Ce in M)return`${Ce}(${G})`;let bt=[];for(let je=s-1;je>=0;je--){let tt=J.indicesGet("outputIndices",je+J.rank-s);bt.push(`${H(T,je)} * (${tt} % ${H(w,je)})`)}return M[Ce]=`fn ${Ce}(outputIndices: ${J.type.indices}) -> u32 {
             return ${bt.length>0?bt.join("+"):"0u"};
           }`,`${Ce}(${G})`},he=(G,J)=>(()=>{if(p.storage===p.value)return`${r}[${G}]=${J};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${r}[${G}]=vec2<u32>(u32(${J}), select(0u, 0xFFFFFFFFu, ${J} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${r}[${G}]=vec2<u32>(u32(${J}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${r}[${G}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${J}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),ge=G=>(()=>{if(p.storage===p.value)return`${r}[${G}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${r}[${G}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${r}[${G}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${G}] & 0xFFu), bool(${r}[${G}] & 0xFF00u), bool(${r}[${G}] & 0xFF0000u), bool(${r}[${G}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),Ie=s<2?"":`
  fn get_${r}ByIndices(indices: ${p.indices}) -> ${f} {
    return ${ge(`i2o_${r}(indices)`)};
  }`,ie=s<2?"":(()=>{let G=a.map(Ce=>`d${Ce}: u32`).join(", "),J=a.map(Ce=>`d${Ce}`).join(", ");return`
  fn get_${r}(${G}) -> ${f} {
    return get_${r}ByIndices(${F(J)});
  }`})(),Ae=(...G)=>{if(G.length!==s)throw new Error(`indices length must be ${s}`);let J=G.map(b).join(",");return s===0?ge("0u"):s===1?ge(J[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${r}(${J})`)},Se=G=>s<2?ge(G):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${r}ByIndices(${G})`),ue=s<2?"":`
  fn set_${r}ByIndices(indices: ${p.indices}, value: ${f}) {
    ${he(`i2o_${r}(indices)`,"value")}
  }`,ze=s<2?"":(()=>{let G=a.map(Ce=>`d${Ce}: u32`).join(", "),J=a.map(Ce=>`d${Ce}`).join(", ");return`
  fn set_${r}(${G}, value: ${f}) {
    set_${r}ByIndices(${F(J)}, value);
  }`})();return{impl:()=>{let G=[],J=!1;return g.offsetToIndices&&(G.push(_),J=!0),g.indicesToOffset&&(G.push(E),J=!0),g.broadcastedIndicesToOffset&&(Object.values(M).forEach(Ce=>G.push(Ce)),J=!0),g.set&&(G.push(ze),J=!0),g.setByIndices&&(G.push(ue),J=!0),g.get&&(G.push(ie),J=!0),g.getByIndices&&(G.push(Ie),J=!0),!i&&J&&G.unshift(`const ${w} = ${p.indices}(${n.join(",")});`,`const ${T} = ${p.indices}(${D.computeStrides(n).join(",")});`),G.join(`
`)},type:p,offsetToIndices:$,indicesToOffset:R,broadcastedIndicesToOffset:ae,indices:F,indicesGet:H,indicesSet:j,set:(...G)=>{if(G.length!==s+1)throw new Error(`indices length must be ${s}`);let J=G[s];if(typeof J!="string")throw new Error("value must be string");let Ce=G.slice(0,s).map(b).join(",");return s===0?he("0u",J):s===1?he(Ce[0],J):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${r}(${Ce}, ${J})`)},setByOffset:he,setByIndices:(G,J)=>s<2?he(G,J):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${r}ByIndices(${G}, ${J});`),get:Ae,getByOffset:ge,getByIndices:Se,usage:t,name:r,strides:T,shape:w,rank:s}},B=(r,e,n,t=1)=>qs(r,e,n,"input",t),V=(r,e,n,t=1)=>qs(r,e,n,"output",t),Ci=(r,e,n,t=1)=>qs(r,e,n,"internal",t),Ws=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Xr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let local_idx = local_id.x;
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},Uh=(r,e)=>new Ws(r,e),_n=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;o++){let i=n-1-o,s=r[i]||1;(e[e.length-1-o]||1)>1&&s===1&&t.unshift(i)}return t}});var n2,Wh,o2,i2,a2,Tt,Hh,qh,Yr=C(()=>{"use strict";se();fe();Ke();pe();n2=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.")},Wh=(r,e)=>e&&e.length!==r?[...new Array(r).keys()].reverse():e,o2=(r,e)=>D.sortBasedOnPerm(r,Wh(r.length,e)),i2=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},a2=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},Tt=(r,e)=>{let n=r.dataType,t=r.dims.length,o=Wh(t,e),i=o2(r.dims,o),{newShape:s,newPerm:a}=a2(r.dims,o),u=D.areEqual(a,[2,3,1]),l=D.areEqual(a,[3,1,2]),f=s.length===2&&a[0]>a[1]||u||l,c=f?s:r.dims,p=i;f&&(c=u?[s[0],s[1]*s[2]]:l?[s[0]*s[1],s[2]]:s,p=[c[1],c[0]]);let b=B("a",n,c.length),g=V("output",n,p.length),h=16,w;return f?w=T=>`
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
  }`:w=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(b,g)}

  ${i2(o,t,b,g)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`,{name:f?"TransposeShared":"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let T=D.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:f?{x:Math.ceil(p[1]/h),y:Math.ceil(p[0]/h)}:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...W(c,p)]}},getShaderSource:w}},Hh=(r,e)=>{n2(r.inputs),r.compute(Tt(r.inputs[0],e.perm))},qh=r=>le({perm:r.perm})});var s2,u2,l2,c2,f2,d2,p2,m2,h2,g2,or,jh,Kh,Xh,Zh,Yh,Jh,Qh,eg,tg,rg,ng=C(()=>{"use strict";se();fe();pe();ki();Yr();s2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},u2={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},l2={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},c2={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},f2=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},d2=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},p2=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},m2=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},h2=(r,e)=>{let n=[];if(!m2(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},g2=(r,e,n,t,o,i,s)=>{let a=n[0].dims,u=D.size(i),l=D.size(s),f=B("_A",n[0].dataType,a),c=V("output",o,i),p=32,b=`
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

          var bestValue = f32(${l2[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${s2[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${u2[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${t==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${c2[t]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},or=(r,e,n,t)=>{let o=r.inputs.length===1?n:js(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((b,g)=>g));let s=D.normalizeAxes(i,r.inputs[0].dims.length),a=s,u=r.inputs[0],l=h2(a,r.inputs[0].dims.length);l.length>0&&(u=r.compute(Tt(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=f2(a.length,u.dims.length));let[f,c]=d2(u.dims,a),p=f;o.keepDims&&(p=p2(f,s)),r.compute(g2(e,{hint:o.cacheKey,inputDependencies:["type"]},[u],t,r.inputs[0].dataType,p,c),{inputs:[u]})},jh=(r,e)=>{or(r,"ReduceMeanShared",e,"mean")},Kh=(r,e)=>{or(r,"ReduceL1Shared",e,"l1")},Xh=(r,e)=>{or(r,"ReduceL2Shared",e,"l2")},Zh=(r,e)=>{or(r,"ReduceLogSumExpShared",e,"logSumExp")},Yh=(r,e)=>{or(r,"ReduceMaxShared",e,"max")},Jh=(r,e)=>{or(r,"ReduceMinShared",e,"min")},Qh=(r,e)=>{or(r,"ReduceProdShared",e,"prod")},eg=(r,e)=>{or(r,"ReduceSumShared",e,"sum")},tg=(r,e)=>{or(r,"ReduceSumSquareShared",e,"sumSquare")},rg=(r,e)=>{or(r,"ReduceLogSumShared",e,"logSum")}});var ir,b2,Di,js,ar,y2,x2,v2,w2,T2,_2,I2,S2,$2,A2,sr,og,ig,ag,sg,ug,lg,cg,fg,dg,pg,ki=C(()=>{"use strict";se();fe();Ke();pe();ng();ir=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},b2=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Di=(r,e,n,t,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,f=l.length,c=D.normalizeAxes(o,f),p=!a&&c.length===0;l.forEach((w,T)=>{p||c.indexOf(T)>=0?s&&u.push(1):u.push(w)});let b=u.length,g=D.size(u);return{name:r,shaderCache:e,getShaderSource:w=>{let T=[],v=B("_A",n[0].dataType,f),_=V("output",i,b),$=t(v,_,c),P=$[2];for(let E=0,R=0;E<f;E++)p||c.indexOf(E)>=0?(s&&R++,P=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${P}
                }`):(T.push(`${v.indicesSet("input_indices",E,_.indicesGet("output_indices",R))};`),R++);return`

        ${w.registerUniform("output_size","u32").declareVariables(v,_)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${P}
          ${$[3]}
          ${$.length===4?_.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...W(l,u)]})}},js=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),le({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},ar=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:js(o,n);r.compute(Di(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?b2:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},y2=(r,e)=>{ir(r.inputs),ar(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},x2=(r,e)=>{ir(r.inputs),ar(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},v2=(r,e)=>{ir(r.inputs),ar(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},w2=(r,e)=>{ir(r.inputs),ar(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},T2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},_2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=r.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},I2=(r,e)=>{ir(r.inputs),ar(r,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},S2=(r,e)=>{ir(r.inputs),ar(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},$2=(r,e)=>{ir(r.inputs),ar(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},A2=(r,e)=>{ir(r.inputs),ar(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},sr=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},og=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?_2(r,e):jh(r,e)},ig=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?x2(r,e):Kh(r,e)},ag=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?v2(r,e):Xh(r,e)},sg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?w2(r,e):Zh(r,e)},ug=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?T2(r,e):Yh(r,e)},lg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?I2(r,e):Jh(r,e)},cg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?S2(r,e):Qh(r,e)},fg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?$2(r,e):eg(r,e)},dg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?A2(r,e):tg(r,e)},pg=(r,e)=>{sr(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?y2(r,e):rg(r,e)}});var mg,hg,gg,Ks,bg=C(()=>{"use strict";se();Ke();ki();mg=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},hg=(r,e)=>{mg(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Di("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},gg=(r,e)=>{mg(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Di("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Ks=r=>le(r)});var P2,O2,E2,C2,In,k2,yg,Bi=C(()=>{"use strict";se();fe();Oi();pe();P2=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4],a=r[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,b=p;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let _ of e.qkvHiddenSizes)if(_%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=e.qkvHiddenSizes[0],p=e.qkvHiddenSizes[1],b=e.qkvHiddenSizes[2]}let g=l;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let w=g+h,T=-1,v=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:T,inputHiddenSize:f,hiddenSize:c,vHiddenSize:b,headSize:Math.floor(c/e.numHeads),vHeadSize:Math.floor(b/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:v,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},O2=(r,e,n)=>{let t=Fe(n),o=64,i=n/t;i<o&&(o=32);let s=Math.ceil(n/t/o),a=[{type:1,data:1/n},{type:12,data:i},{type:12,data:s}],u=Le(r.dataType,t),l=nt(1,t),f=["type"],c=p=>{let b=V("x",r.dataType,r.dims,t),g=nt(r.dataType),h=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${u};${t}`,inputDependencies:f},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:e},programUniforms:a})}},E2=(r,e,n,t,o,i,s,a)=>{let u=a+i.kvSequenceLength,l=[i.batchSize,i.numHeads,i.sequenceLength,u],f=i.kvNumHeads===void 0&&r>1&&t,c=f?[i.batchSize,i.numHeads,u,i.headSize]:void 0,p=s.scale===0?1/Math.sqrt(i.headSize):s.scale,b=Fe(i.headSize),g=i.headSize/b,h=12,w={x:Math.ceil(u/h),y:Math.ceil(i.sequenceLength/h),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:g},{type:12,data:u},{type:12,data:i.numHeads},{type:1,data:p},{type:12,data:a},{type:12,data:i.kvSequenceLength}],v=f&&t&&D.size(t.dims)>0,_=["type","type"];v&&_.push("type"),o&&_.push("type");let $=[{dims:l,dataType:e.dataType,gpuDataType:0}];f&&$.push({dims:c,dataType:e.dataType,gpuDataType:0});let P=E=>{let R=B("q",e.dataType,e.dims,b),F=B("key",n.dataType,n.dims,b),H=[R,F];if(v){let ge=B("past_key",t.dataType,t.dims,b);H.push(ge)}o&&H.push(B("attention_bias",o.dataType,o.dims));let j=V("output",e.dataType,l),M=[j];f&&M.push(V("present_key",e.dataType,c,b));let ae=nt(1,b),he=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;

  var<workgroup> tileQ: array<${R.type.storage}, ${h*h}>;
  var<workgroup> tileK: array<${R.type.storage}, ${h*h}>;
  ${E.registerUniforms(he).declareVariables(...H,...M)}
  ${E.mainStart([h,h,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>v&&f?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${f?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${ae}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>v&&f?`
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
        value += ${ae}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${j.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${o!==void 0};${t!==void 0};${r}`,inputDependencies:_},getRunData:()=>({outputs:$,dispatchGroup:w,programUniforms:T}),getShaderSource:P}},C2=(r,e,n,t,o,i)=>{let s=i+o.kvSequenceLength,a=o.nReps?o.nReps:1,u=o.vHiddenSize*a,l=o.kvNumHeads==null&&r>1&&t,f=l?[o.batchSize,o.numHeads,s,o.headSize]:void 0,c=[o.batchSize,o.sequenceLength,u],p=12,b={x:Math.ceil(o.vHeadSize/p),y:Math.ceil(o.sequenceLength/p),z:o.batchSize*o.numHeads},g=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:u},{type:12,data:i},{type:12,data:o.kvSequenceLength}],h=l&&t&&D.size(t.dims)>0,w=["type","type"];h&&w.push("type");let T=[{dims:c,dataType:e.dataType,gpuDataType:0}];l&&T.push({dims:f,dataType:e.dataType,gpuDataType:0});let v=_=>{let $=B("probs",e.dataType,e.dims),P=B("v",n.dataType,n.dims),E=[$,P];h&&E.push(B("past_value",t.dataType,t.dims));let F=[V("output",e.dataType,c)];l&&F.push(V("present_value",e.dataType,f));let H=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${p}u;
  var<workgroup> tileQ: array<${$.type.value}, ${p*p}>;
  var<workgroup> tileK: array<${$.type.value}, ${p*p}>;
  ${_.registerUniforms(H).declareVariables(...E,...F)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:w},getRunData:()=>({outputs:T,dispatchGroup:b,programUniforms:g}),getShaderSource:v}},In=(r,e,n,t,o,i,s,a,u,l,f)=>{let c=Math.min(r.outputCount,1+(s?1:0)+(a?1:0)),p=l.kvNumHeads!==void 0||c>1?l.pastSequenceLength:0,b=p+l.kvSequenceLength,g=u&&D.size(u.dims)>0?u:void 0,h=[e,n];l.kvNumHeads===void 0&&c>1&&s&&D.size(s.dims)>0&&h.push(s),g&&h.push(g);let w=r.compute(E2(c,e,n,s,g,l,f,p),{inputs:h,outputs:l.kvNumHeads===void 0&&c>1?[-1,1]:[-1]})[0];r.compute(O2(w,l.batchSize*l.numHeads*l.sequenceLength,b),{inputs:[w],outputs:[]});let T=[w,t];l.kvNumHeads===void 0&&c>1&&a&&D.size(a.dims)>0&&T.push(a),r.compute(C2(c,w,t,a,l,p),{inputs:T,outputs:l.kvNumHeads===void 0&&c>1?[0,2]:[0]})},k2=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],f=c=>{let p=V("output_q",u[0].dataType,n),b=V("output_k",u[0].dataType,n),g=V("output_v",u[0].dataType,n),h=B("input",u[0].dataType,u[0].dims),w=B("weight",u[1].dataType,u[1].dims),T=B("bias",u[2].dataType,u[2].dims),v=h.type.storage,_=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${c.registerUniforms(_).declareVariables(h,w,T,p,b,g)}
  ${c.mainStart([s,s,1])}
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:f},{inputs:u,outputs:[-1,-1,-1]})},yg=(r,e)=>{let n=P2(r.inputs,e),[t,o,i]=k2(r,n);return In(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n,e)}});var D2,B2,L2,xg,vg=C(()=>{"use strict";ft();se();fe();Ke();pe();D2=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},B2=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,s=t?Fe(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=D.size(i)/s,l=t,f=l?i.length:i,c=B("x",r[0].dataType,r[0].dims,s),p=B("scale",r[1].dataType,r[1].dims,a),b=B("bias",r[2].dataType,r[2].dims,a),g=B("inputMean",r[3].dataType,r[3].dims,a),h=B("inputVar",r[4].dataType,r[4].dims,a),w=V("y",r[0].dataType,f,s),T=()=>{let _="";if(t)_=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")_=`
            ${w.indicesSet("outputIndices","0","0")}
            let cOffset = ${w.indicesToOffset("outputIndices")};`;else{_=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<p.rank;$++)_+=`cIndices[${$}] = outputIndices[${$}];`;_+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return _},v=_=>`
  const epsilon = ${n};
  ${_.registerUniform("outputSize","u32").declareVariables(c,p,b,g,h,w)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${w.offsetToIndices(`global_idx * ${s}`)};
    ${T()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${w.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...W(i)]:[{type:12,data:u}]})}},L2=r=>le(r),xg=(r,e)=>{let{inputs:n,outputCount:t}=r,o=L2({...e,outputCount:t});if(ce.webgpu.validateInputContent&&D2(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(B2(n,o))}});var R2,z2,wg,Tg=C(()=>{"use strict";fe();pe();R2=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},z2=r=>{let e=r[0].dims,n=r[0].dims[2],t=D.size(e)/4,o=r[0].dataType,i=B("input",o,e,4),s=B("bias",o,[n],4),a=B("residual",o,e,4),u=V("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(i,s,a,u)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},wg=r=>{R2(r.inputs),r.compute(z2(r.inputs))}});var N2,Ee,_g,Ig,Sg,$g,Ag,Pg,Og,Eg,Cg,F2,kg,Dg,Bg,Lg,Yn,Rg,Li,zg,Ng,Fg,Vg,Mg,Gg,Ug,Wg,Hg,qg,jg,Kg,Xg,Zg,Yg,Jg,Qg,eb,Xs,Zs,tb,rb,nb,V2,M2,ob,Ri=C(()=>{"use strict";se();fe();Ke();pe();N2=(r,e,n,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=B("inputData",n,[a],4),f=V("outputData",t,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${r.registerUniforms(c).declareVariables(l,f)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",u)}
  }`},Ee=(r,e,n,t,o,i=r.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(D.size(r.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>N2(l,D.size(r.dims),r.dataType,i,n,t,a),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(D.size(l[0].dims)/64/4)},programUniforms:u})}},_g=r=>{r.compute(Ee(r.inputs[0],"Abs","abs"))},Ig=r=>{r.compute(Ee(r.inputs[0],"Acos","acos"))},Sg=r=>{r.compute(Ee(r.inputs[0],"Acosh","acosh"))},$g=r=>{r.compute(Ee(r.inputs[0],"Asin","asin"))},Ag=r=>{r.compute(Ee(r.inputs[0],"Asinh","asinh"))},Pg=r=>{r.compute(Ee(r.inputs[0],"Atan","atan"))},Og=r=>{r.compute(Ee(r.inputs[0],"Atanh","atanh"))},Eg=r=>le(r),Cg=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(Ee(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},F2=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return le({min:e,max:n})},kg=(r,e)=>{let n=e||F2(r.inputs),t=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Dg=r=>{r.compute(Ee(r.inputs[0],"Ceil","ceil"))},Bg=r=>{r.compute(Ee(r.inputs[0],"Cos","cos"))},Lg=r=>{r.compute(Ee(r.inputs[0],"Cosh","cosh"))},Yn=r=>le(r),Rg=(r,e)=>{let n=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Li=(r="f32")=>`
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
}`,zg=r=>{let e=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Li(e)))},Ng=r=>{r.compute(Ee(r.inputs[0],"Exp","exp"))},Fg=r=>{r.compute(Ee(r.inputs[0],"Floor","floor"))},Vg=r=>{let e=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Li(e)))},Mg=(r,e)=>{let n=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},Gg=r=>{r.compute(Ee(r.inputs[0],"Not",e=>`!${e}`))},Ug=r=>{r.compute(Ee(r.inputs[0],"Neg",e=>`-${e}`))},Wg=r=>{r.compute(Ee(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Hg=r=>{let e=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},qg=r=>{r.compute(Ee(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},jg=r=>le(r),Kg=(r,e)=>{let n=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},Xg=r=>{r.compute(Ee(r.inputs[0],"Sin","sin"))},Zg=r=>{r.compute(Ee(r.inputs[0],"Sinh","sinh"))},Yg=r=>{r.compute(Ee(r.inputs[0],"Sqrt","sqrt"))},Jg=r=>{r.compute(Ee(r.inputs[0],"Tan","tan"))},Qg=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,eb=r=>{r.compute(Ee(r.inputs[0],"Tanh",Qg))},Xs=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${Qg("v")};
}
`,Zs=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,tb=r=>{let e=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"FastGelu",Zs,Xs(e),void 0,r.inputs[0].dataType))},rb=(r,e)=>{let n=nt(r.inputs[0].dataType);return r.compute(Ee(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},nb=r=>{r.compute(Ee(r.inputs[0],"Log","log"))},V2=(r,e)=>`
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
`,M2=r=>`quick_gelu_impl(${r})`,ob=(r,e)=>{let n=nt(r.inputs[0].dataType);r.compute(Ee(r.inputs[0],"QuickGelu",M2,V2(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var G2,U2,ab,sb=C(()=>{"use strict";fe();pe();Ri();G2=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},U2=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=B("input",r[0].dataType,r[0].dims,4),t=B("bias",r[0].dataType,[r[0].dims[2]],4),o=V("output",r[0].dataType,e,4),i=D.size(e)/4,s=Le(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Li(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ab=r=>{G2(r.inputs),r.compute(U2(r.inputs))}});var W2,H2,ur,ub,lb,cb,fb,db,pb,mb,hb,gb,bb,yb=C(()=>{"use strict";se();fe();pe();W2=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p,b;typeof a=="string"?p=b=(v,_)=>`${a}((${v}),(${_}))`:typeof a=="function"?p=b=a:(p=a.scalar,b=a.vector);let g=V("outputData",f,t.length,4),h=B("aData",u,e.length,4),w=B("bData",l,n.length,4),T;if(o)if(i){let v=D.size(e)===1,_=D.size(n)===1,$=e.length>0&&e[e.length-1]%4===0,P=n.length>0&&n[n.length-1]%4===0;v||_?T=g.setByOffset("global_idx",b(v?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),_?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"))):T=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${w.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",b(s||$?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||P?w.getByOffset("offsetB / 4u"):`${w.type.value}(${w.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else T=g.setByOffset("global_idx",b(h.getByOffset("global_idx"),w.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(_,$,P="")=>{let E=`aData[indexA${$}][componentA${$}]`,R=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${g.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let offsetB${$} = ${w.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${_}[${$}] = ${P}(${p(E,R)});
          `};f===9?T=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:T=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(h,w,g)}

        ${c??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${T}
      }`},H2=(r,e,n,t,o,i,s=n.dataType)=>{let a=!D.areEqual(n.dims,t.dims),u=n.dims,l=D.size(n.dims),f=!1,c=!1,p=[a];if(a){let b=nr.calcShape(n.dims,t.dims,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");u=b,l=D.size(u);let g=D.size(n.dims)===1,h=D.size(t.dims)===1,w=n.dims.length>0&&n.dims[n.dims.length-1]%4===0,T=t.dims.length>0&&t.dims[t.dims.length-1]%4===0;p.push(g),p.push(h),p.push(w),p.push(T);let v=1;for(let _=1;_<u.length;_++){let $=n.dims[n.dims.length-_]??1,P=t.dims[t.dims.length-_]??1;if($===P)v*=$;else break}v%4===0?(c=!0,f=!0):(g||h||w||T)&&(f=!0)}else f=!0;return p.push(f),{name:r,shaderCache:{hint:e+p.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>W2(b,n.dims,t.dims,u,f,a,c,o,n.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(u)/4)},...W(n.dims,t.dims,u)]})}},ur=(r,e,n,t,o,i)=>{r.compute(H2(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},ub=r=>{ur(r,"Add",(e,n)=>`${e}+${n}`)},lb=r=>{ur(r,"Div",(e,n)=>`${e}/${n}`)},cb=r=>{ur(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},fb=r=>{ur(r,"Mul",(e,n)=>`${e}*${n}`)},db=r=>{let e=B("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;ur(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},pb=r=>{ur(r,"Sub",(e,n)=>`${e}-${n}`)},mb=r=>{ur(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},hb=r=>{ur(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},gb=r=>{ur(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},bb=r=>{ur(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var j2,K2,X2,Z2,xb,vb,wb=C(()=>{"use strict";se();fe();Ke();pe();j2=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},K2=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,X2=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},Z2=(r,e,n,t)=>{let o=D.size(n),i=new Array(r.length),s=new Array(r.length),a=0,u=[],l=[],f=[{type:12,data:o}];for(let h=0;h<r.length;++h)a+=r[h].dims[e],i[h]=a,l.push(r[h].dims.length),s[h]=B(`input${h}`,t,l[h]),u.push("rank"),f.push({type:12,data:i[h]});for(let h=0;h<r.length;++h)f.push(...W(r[h].dims));f.push(...W(n));let c=V("output",t,n.length),p=c.indicesGet("indices",e),b=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),g=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let w=0;w<r.length;w++)h.registerUniform(`sizeInConcatAxis${w}`,"u32");return h.declareVariables(...s,c)})()}

  ${K2(i.length,b)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${X2(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:g}},xb=(r,e)=>{let n=r.inputs,t=n[0].dims,o=D.normalizeAxis(e.axis,t.length);j2(n,o);let i=t.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>D.size(a.dims)>0);r.compute(Z2(s,o,i,n[0].dataType),{inputs:s})},vb=r=>le({axis:r.axis})});var $t,At,Pt,zi,hr=C(()=>{"use strict";se();fe();$t=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},At=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},Pt=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},zi=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[Mh,Gh];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var ut,Ni,Jn=C(()=>{"use strict";ut=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Ni=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Fi,Ys=C(()=>{"use strict";Fi=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var Y2,J2,Qn,Tb,Q2,eo,e1,Vi,to=C(()=>{"use strict";se();fe();pe();hr();Jn();Y2=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,J2=(r,e)=>r?`
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
          ${Y2(o,t)}
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

          ${J2(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Tb=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,Q2=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",eo=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=r[1]*e[1],f=r[0]*e[0],c=o?l:i,p=o?i:l;if(!(p%e[1]===0&&c%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let b=p/e[1],g=c/e[0],h=i/e[1],w=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          ${Tb(o,t)}
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
      ${Tb(o,t)}
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
      ${Q2(o)}
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
    ${w}
  }
`},e1=(r,e,n,t,o,i=!1)=>{let[s,a,u]=o,[l,f,c,p]=t,b=_n(s,u),g=_n(a,u),h=Le(t[0].type.tensor),w=()=>{let _=f.rank,$=l.rank,P=`var aIndices: ${f.type.indices};`;for(let E=_-2-1,R=$-1;E>=0;E--,R--)P+=`
aIndices[${E}] = ${$>1?`batchIndices[${R}]`:"batchIndices"};`;return b.forEach(E=>{P+=`
aIndices[${E}] = 0;`}),P+=`
aIndices[${_-2}] = u32(row);
                   aIndices[${_-1}] = u32(colIn);`,P},T=()=>{let _=c.rank,$=l.rank,P=`var bIndices: ${c.type.indices};`;for(let E=_-2-1,R=$-1;E>=0;E--,R--)P+=`
bIndices[${E}] = ${$>1?`batchIndices[${R}]`:"batchIndices"};`;return g.forEach(E=>{P+=`
bIndices[${E}] = 0;`}),P+=`
bIndices[${_-2}] = u32(row);
                   bIndices[${_-1}] = u32(colIn);`,P};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${ut(r,h)} {
      var value = ${ut(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${w()}
        value = ${f.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${ut(r,h)} {
      var value = ${ut(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${T()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ut(r,h)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${i?"bias[colIn]":`${ut(r,h)}(bias[row])`};`:""}
        ${n}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Vi=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),f=t?t.slice(0,-2):n.slice(0,-2),c=D.size(f),p=s[s.length-2],b=s[s.length-1],g=a[a.length-1],h=b%4===0&&g%4===0,w=p<=8?[4,1,1]:[4,4,1],T=[8,8,1],v=[Math.ceil(g/T[0]/w[0]),Math.ceil(p/T[1]/w[1]),Math.ceil(c/T[2]/w[2])],_=h?4:1,$=[...u,p,b/_],P=$.length,E=[...l,b,g/_],R=E.length,F=[c,p,g/_],H=[{type:6,data:p},{type:6,data:g},{type:6,data:b}];At(e,H),H.push(...W(f,$,E));let j=["rank","rank"],M=r.length>2;M&&(H.push(...W(r[2].dims)),j.push("rank")),H.push(...W(F));let ae=he=>{let ge=f.length,Ie=Ci("batchDims",r[0].dataType,ge,1),ie=Le(r[0].dataType),Ae=B("a",r[0].dataType,P,_),Se=B("b",r[1].dataType,R,_),ue=V("result",r[0].dataType,F.length,_),ze=[Ae,Se];if(M){let J=o?_:1;ze.push(B("bias",r[2].dataType,r[2].dims.length,J))}let xe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Pt(e,xe);let be=Le(ue.type.tensor),ve=$t(e,ue.type.value,be),G=e1(_,M,ve,[Ie,Ae,Se,ue],[u,l,f],o);return`
  ${he.registerUniforms(xe).registerInternalVariables(Ie).declareVariables(...ze,ue)}
  ${G}
  ${h?Qn(w,T,ie,Ie):eo(w,T,ie,Ie)}
                   `};return{name:"MatMul",shaderCache:{hint:`${w};${e.activation};${h};${o}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:H}),getShaderSource:ae}}});var t1,_b,Ib=C(()=>{"use strict";se();mr();pe();hr();Jn();Ys();to();t1=(r,e,n,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let f=j=>{switch(j){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${j} is not supported.`)}},c=j=>{switch(j){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${j} is not supported.`)}},p=r?`
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
    `,g=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",w=r?"row":"col",T=r?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${w} / outWidth;
    let outCol = ${w} % outWidth;

    let WRow = ${T} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${T} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${T} % inChannels;
    var resData = ${ut(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,_=r?e&&t?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${ut(s,l)}(0.0);`:t&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${ut(s,l)}(0.0);`,$=`${c(a)}`,P=ut(u,l),E=r?ut(s,l):ut(a,l),R=r?ut(a,l):ut(s,l),F=$t(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${r?_:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${r?$:_}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${Ni(o)}
      ${F}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},_b=(r,e,n,t,o,i,s,a,u)=>{let l=e.format==="NHWC",f=l?r[0].dims[3]:r[0].dims[1],c=n[0],p=l?n[2]:n[3],b=l?n[1]:n[2],g=l?n[3]:n[1],h=l&&(f%4===0||f%3===0)&&g%4===0,w=l?g:p*b,T=l?p*b:g,v=[8,8,1],_=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(w/v[0]/_[0]),Math.ceil(T/v[1]/_[1]),Math.ceil(c/v[2]/_[2])];Ne("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let P=h?l&&f%4!==0?3:4:1,E=v[1]*_[1],R=v[0]*_[0],F=Math.max(v[0]*P,v[1]),H=t%E===0,j=o%R===0,M=i%F===0,ae=h?[P,4,4]:[1,1,1],he=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];At(e,he),he.push(...W(r[0].dims,r[1].dims));let ge=["rank","rank"];s&&(he.push(...W(r[2].dims)),ge.push("rank")),he.push(...W(n));let Ie=ie=>{let Ae=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Pt(e,Ae);let Se=h?4:1,ue=Le(r[0].dataType),ze=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${ue}>`:ue}) {
        result[flatIndex] = ${h?`vec4<${ue}>`:ue}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${ue}>`:ue}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,xe=B("x",r[0].dataType,r[0].dims.length,P===3?1:P),be=B("w",r[1].dataType,r[1].dims.length,Se),ve=[xe,be],G=V("result",r[0].dataType,n.length,Se);if(s){let J=B("bias",r[2].dataType,r[2].dims.length,Se);ve.push(J),ze+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${ue}>`:ue} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Fi("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${ie.registerUniforms(Ae).declareVariables(...ve,G)}
        ${ze}
        ${t1(l,H,j,M,s,e,ae[0],ae[1],ae[2],ue)}
        ${h?Qn(_,v,ue,void 0,!l,F):eo(_,v,ue,void 0,!l,F,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${h};${H};${j};${M};${E};${R};${F}`,inputDependencies:ge},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:he}),getShaderSource:Ie}}});var r1,Sb,Mi,n1,$b,o1,Ab,Pb,Ob=C(()=>{"use strict";se();mr();fe();pe();hr();Jn();r1=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Sb=r=>typeof r=="number"?[r,r,r]:r,Mi=(r,e)=>e<=1?r:r+(r-1)*(e-1),n1=(r,e,n,t=1)=>{let o=Mi(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},$b=(r,e,n,t,o)=>{o==null&&(o=n1(r,e[0],t[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)r[s]+2*o>=e[s]&&(i[s]=Math.trunc((r[s]-e[s]+2*o)/t[s]+1));return i},o1=(r,e,n,t,o,i,s,a,u,l)=>{let f,c,p,b;if(r==="VALID"&&(r=0),typeof r=="number"){f={top:r,bottom:r,left:r,right:r,front:r,back:r};let g=$b([e,n,t,1],[a,u,l],1,[o,i,s],r);c=g[0],p=g[1],b=g[2]}else if(Array.isArray(r)){if(!r.every((h,w,T)=>h===T[0]))throw Error(`Unsupported padding parameter: ${r}`);f={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let g=$b([e,n,t,1],[a,u,l],1,[o,i,s],r[0]);c=g[0],p=g[1],b=g[2]}else if(r==="SAME_UPPER"){c=Math.ceil(e/o),p=Math.ceil(n/i),b=Math.ceil(t/s);let g=(c-1)*o+a-e,h=(p-1)*i+u-n,w=(b-1)*s+l-t,T=Math.floor(g/2),v=g-T,_=Math.floor(h/2),$=h-_,P=Math.floor(w/2),E=w-P;f={top:_,bottom:$,left:P,right:E,front:T,back:v}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:f,outDepth:c,outHeight:p,outWidth:b}},Ab=(r,e,n,t,o,i=!1,s="channelsLast")=>{let a,u,l,f,c;if(s==="channelsLast")[a,u,l,f,c]=r;else if(s==="channelsFirst")[a,c,u,l,f]=r;else throw new Error(`Unknown dataFormat ${s}`);let[p,,b,g,h]=e,[w,T,v]=Sb(n),[_,$,P]=Sb(t),E=Mi(b,_),R=Mi(g,$),F=Mi(h,P),{padInfo:H,outDepth:j,outHeight:M,outWidth:ae}=o1(o,u,l,f,w,T,v,E,R,F),he=i?p*c:p,ge=[0,0,0,0,0];return s==="channelsFirst"?ge=[a,he,j,M,ae]:s==="channelsLast"&&(ge=[a,j,M,ae,he]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:f,inChannels:c,outDepth:j,outHeight:M,outWidth:ae,outChannels:he,padInfo:H,strideDepth:w,strideHeight:T,strideWidth:v,filterDepth:b,filterHeight:g,filterWidth:h,effectiveFilterDepth:E,effectiveFilterHeight:R,effectiveFilterWidth:F,dilationDepth:_,dilationHeight:$,dilationWidth:P,inShape:r,outShape:ge,filterShape:e}},Pb=(r,e,n,t,o,i)=>{let s=i==="channelsLast",a=s?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],f={x:n.map((v,_)=>_)},c=[Math.ceil(r1(f.x.map(v=>n[v]))/l[0]),1,1];Ne("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,b=D.size(n),g=[{type:12,data:b},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];At(e,g),g.push(...W(r[0].dims,r[1].dims));let h=["rank","rank"],w=r.length===3;w&&(g.push(...W(r[2].dims)),h.push("rank")),g.push(...W(n));let T=v=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Pt(e,_);let $=u?4:1,P=Le(r[0].dataType),E=B("x",r[0].dataType,r[0].dims.length,p===3?1:p),R=B("W",r[1].dataType,r[1].dims.length,$),F=[E,R],H=V("result",r[0].dataType,n.length,$),j="";if(w){let he=B("bias",r[2].dataType,r[2].dims.length,$);F.push(he),j+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${s?Y("coords",4,5):Y("coords",1,5)}${u?"/ 4":""}];
        }`}let M=ut(p,P),ae=$t(e,M,P);return`
            ${j}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${v.registerUniforms(_).declareVariables(...F,H)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${H.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,E.rank)};
              let d2 = ${s?Y("coords",E.rank-1,E.rank):Y("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${s?Y("coords",1,E.rank):Y("coords",2,E.rank)},
              ${s?Y("coords",2,E.rank):Y("coords",3,E.rank)},
              ${s?Y("coords",3,E.rank):Y("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Y("uniforms.x_shape",1,E.rank):Y("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${s?Y("uniforms.x_shape",2,E.rank):Y("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${s?Y("uniforms.x_shape",3,E.rank):Y("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${s?Y("uniforms.x_shape",4,E.rank):Y("uniforms.x_shape",1,E.rank)};
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
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${ae}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${p};${w}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:g}),getShaderSource:T}}});var Eb,Cb,kb=C(()=>{"use strict";se();fe();pe();hr();Eb=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",s=r[0].dims,a=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],f=l/e.group,c=u&&f>=4?Fe(l):1,p=D.size(n)/c,b=[{type:12,data:p},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:f}];At(e,b),b.push(...W(s,[a[0],a[1],a[2],a[3]/c]));let g=o?["rank","rank","rank"]:["rank","rank"];b.push(...W([n[0],n[1],n[2],n[3]/c]));let h=w=>{let T=V("output",r[0].dataType,n.length,c),v=Le(T.type.tensor),_=$t(e,T.type.value,v),$=B("x",r[0].dataType,s.length),P=B("w",r[1].dataType,a.length,c),E=[$,P];o&&E.push(B("b",r[2].dataType,r[2].dims,c));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Pt(e,R);let F=u?`
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
  ${w.registerUniforms(R).declareVariables(...E,T)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${T.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${T.type.value} = ${T.type.value}(0);
    ${F}
    ${i}
    ${_}
    ${T.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:b}),getShaderSource:h}},Cb=(r,e,n,t)=>{let o=r.length>2,i=Fe(n[3]),s=Fe(n[2]),a=D.size(n)/i/s,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],f=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];At(e,c),c.push(...W(u,l,f));let p=(s-1)*e.strides[1]+l[1],b=g=>{let h=V("output",r[0].dataType,f.length,i),w=Le(h.type.tensor),T=$t(e,h.type.value,w),v=B("x",r[0].dataType,u.length,i),_=B("w",r[1].dataType,l.length,i),$=[v,_];o&&$.push(B("b",r[2].dataType,r[2].dims,i));let P=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Pt(e,E),`
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

    var x_vals: array<${v.type.value}, ${p}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
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
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${p};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:b}}});var Js,i1,Db,Qs=C(()=>{"use strict";se();fe();to();pe();hr();Js=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s[s.length-2],l=a[a.length-1],f=s[s.length-1],c=Fe(l),p=Fe(f),b=Fe(u),g=D.size(n)/c/b,h=r.length>2,w=t?t.slice(0,-2):n.slice(0,-2),v=[D.size(w),u,l],_=[{type:12,data:g},{type:12,data:u},{type:12,data:l},{type:12,data:f}];At(e,_),_.push(...W(w,s,a)),h&&_.push(...W(r[2].dims)),_.push(...W(v));let $=P=>{let E=Ci("batch_dims",r[0].dataType,w.length),R=B("a",r[0].dataType,s.length,p),F=B("b",r[1].dataType,a.length,c),H=V("output",r[0].dataType,v.length,c),j=Le(H.type.tensor),M=$t(e,H.type.value,j),ae=[R,F],he="";if(h){let xe=o?c:1;ae.push(B("bias",r[2].dataType,r[2].dims.length,xe)),he=`${o?`value += bias[col / ${xe}];`:`value += ${H.type.value}(bias[row + i]);`}`}let ge=s.slice(0,-2),Ie=a.slice(0,-2),ie=_n(ge,w),Ae=_n(Ie,w),Se=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Pt(e,Se);let ue=(xe,be)=>{let ve=xe.rank,G=xe.name;if(ve===2)return`var ${G}_indices = ${xe.type.indices}(0u, 0u);`;let J=E.rank,Ce=`var ${G}_indices: ${xe.type.indices};`;for(let bt=ve-2-1,je=J-1;bt>=0;bt--,je--)Ce+=`
${G}_indices[${bt}] = ${J>1?`batch_indices[${je}]`:"batch_indices"};`;return be.forEach(bt=>{Ce+=`
${G}_indices[${bt}] = 0;`}),Ce+=`${G}_indices[${ve-2}] = 0u;
                     ${G}_indices[${ve-1}] = 0u;`,Ce},ze=()=>{let xe=`var a_data: ${R.type.value};`;for(let be=0;be<p;be++)xe+=`
              let b_data${be} = b[(b_offset + (k + ${be}) * uniforms.N + col) / ${c}];`;for(let be=0;be<b;be++){xe+=`a_data = a[(a_offset + (row + ${be}) * uniforms.K + k) / ${p}];`;for(let ve=0;ve<p;ve++)xe+=`
            values[${be}] = fma(${F.type.value}(a_data${p===1?"":`[${ve}]`}), b_data${ve}, values[${be}]);
`}return xe};return`
  ${P.registerUniforms(Se).registerInternalVariables(E).declareVariables(...ae,H)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}
    ${ue(R,ie)}
    let a_offset = ${R.indicesToOffset("a_indices")};
    ${ue(F,Ae)}
    let b_offset = ${F.indicesToOffset("b_indices")};
    var values: array<${H.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${ze()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${he}
      ${M}
      let cur_indices = ${H.type.indices}(batch, row + i, col);
      let offset = ${H.indicesToOffset("cur_indices")};
      ${H.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${c};${p};${b};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:$}},i1=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},Db=r=>{i1(r.inputs);let e=nr.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];n<8&&t<8?r.compute(Js(r.inputs,{activation:""},e)):r.compute(Vi(r.inputs,{activation:""},e))}});var a1,eu,s1,tu,ru,Bb,u1,l1,nu,Lb=C(()=>{"use strict";fe();Ib();Ob();to();kb();hr();Qs();Yr();a1=(r,e,n,t,o,i)=>{let s=r[0],a=r.slice(i?1:2,i?3:4),u=a.length,l=e[0],c=e.slice(2).map((g,h)=>g+(g-1)*(n[h]-1)),b=a.map((g,h)=>g+t[h]+t[h+u]).map((g,h)=>Math.floor((g-c[h]+o[h])/o[h]));return b.splice(0,0,s),b.splice(i?3:1,0,l),b},eu=[2,3,1,0],s1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},tu=(r,e)=>{let n=r.kernelShape.slice();for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Kr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},ru=r=>{let e=zi(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,s=r.kernel_shape,a=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Bb=(r,e,n,t)=>{let o=n.format==="NHWC",i=a1(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[e[0]];if(o){let F=r.kernelCustomData.wT??r.compute(Tt(e[1],eu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=F),E.push(F)}else E.push(e[1]);e.length===3&&E.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Cb(E,n,i,t),{inputs:E}):r.compute(Eb(E,n,i,t),{inputs:E});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],f=e[1].dims[2],c=e[1].dims[3],p=i[o?1:2],b=i[o?2:3],g=i[o?3:1],h=o&&f===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(h||f===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=i[0],R,F,H,j=[];if(o){let he=r.kernelCustomData.wT??r.compute(Tt(e[1],eu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=he),h){let ge=a*u*l;R=e[0].reshape([1,E,ge]),F=he.reshape([1,ge,g]),H=[1,E,g]}else R=e[0].reshape([E,a*u,l]),F=he.reshape([1,l,g]),H=[E,p*b,g];j.push(R),j.push(F)}else R=e[0].reshape([E,l,a*u]),F=e[1].reshape([1,g,l]),H=[E,g,p*b],j.push(F),j.push(R);s&&j.push(e[2]);let M=H[2],ae=j[0].dims[j[0].dims.length-1];M<8&&ae<8?r.compute(Js(j,n,i,H,o,t),{inputs:j}):r.compute(Vi(j,n,i,H,o,t),{inputs:j});return}let w=!0,T=r.kernelCustomData.wT??r.compute(Tt(e[1],eu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=T);let v=[e[0],T];s&&v.push(e[2]);let _=o?p*b:g,$=o?g:p*b,P=f*c*l;r.compute(_b(v,n,i,_,$,P,s,w,t),{inputs:v})},u1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=tu({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);Bb(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},l1=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=tu(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Ab(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Pb(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},nu=(r,e)=>{if(s1(r.inputs,e),r.inputs[0].dims.length===3)u1(r,e);else if(r.inputs[0].dims.length===5)l1(r,r.inputs,e);else{let n=tu(e,r.inputs);Bb(r,r.inputs,n)}}});var c1,Rb,zb=C(()=>{"use strict";se();mr();pe();hr();Jn();Ys();to();c1=(r,e=!1,n,t,o=4)=>{let i=T=>{switch(T){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
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
      `,h=$t(n,t);return`
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
      ${Ni(e)}
      ${h}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Rb=(r,e,n,t,o,i,s,a)=>{let u=e.format==="NHWC",l=u?r[0].dims[3]:r[0].dims[1],f=n[0],c=u?n[2]:n[3],p=u?n[1]:n[2],b=u?n[3]:n[1],g=u&&l%4===0&&l%3&&b%4===0,h=u?b:c*p,w=u?c*p:b,T=[8,8,1],v=t<=8?[4,1,1]:[4,4,1],_=[Math.ceil(h/T[0]/v[0]),Math.ceil(w/T[1]/v[1]),Math.ceil(f/T[2]/v[2])];Ne("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${_}`);let $=g?4:1,P=Math.max(T[0]*$,T[1]),E=g?4:1,R=[e.kernelShape[u?1:2],e.kernelShape[u?2:3]],F=[R[0]+(e.dilations[0]<=1?0:(R[0]-1)*(e.dilations[0]-1)),R[1]+(e.dilations[1]<=1?0:(R[1]-1)*(e.dilations[1]-1))],H=[F[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),F[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],j=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:e.strides},{type:6,data:e.dilations},{type:6,data:R},{type:6,data:H}];At(e,j),j.push(...W(r[0].dims,r[1].dims));let M=["rank","rank"];s&&(j.push(...W(r[2].dims)),M.push("rank")),j.push(...W(n));let ae=he=>{let ge=B("x",r[0].dataType,r[0].dims.length,E),Ie=B("w",r[1].dataType,r[1].dims.length,1),ie=V("result",r[0].dataType,n.length,E),Ae=[ge,Ie],Se="";if(s){let xe=B("bias",r[2].dataType,r[2].dims.length,E);Ae.push(xe),Se+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${xe.type.value} {
            return bias[coords.${u?"w":"y"}${g?"/ 4":""}];
          }`}let ue=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:R.length},{name:"pads",type:"i32",length:H.length}];Pt(e,ue);let ze=Le(r[0].dataType,1);if(ze!=="f16"&&ze!=="f32")throw new Error(`elemType ${ze} is not supported.`);return`
        ${Fi("uniforms.result_strides")}
        ${he.registerUniforms(ue).declareVariables(...Ae,ie)};
        ${Se}
        ${c1(u,s,e,ge.type.value,$)}
        ${g?Qn(v,T,ze,void 0,!u,P):eo(v,T,ze,void 0,!u,P,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${e.cacheKey};${v};${T};${g}`,inputDependencies:M},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:j}),getShaderSource:ae}}});var f1,ou,Nb=C(()=>{"use strict";se();mr();fe();pe();f1=(r,e,n,t,o,i=!1,s,a,u=!1)=>{let l=u?1:2,f=u?2:3,c=u?3:1,p=i?2:1,b=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;t&&(b+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let g=i?4:1,h=B("W",e[1].dataType,e[1].dims.length,g),w=B("Dy",e[0].dataType,e[0].dims.length,g),T=[w,h];t&&T.push(B("bias",e[2].dataType,[n[c]].length,g));let v=V("result",e[0].dataType,n.length,g),_=`{
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

                var xValue = ${w.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${w.get("batch","idyR","idyC2","d2")};

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

                var xValue = ${w.get("batch","idyR","idyC","d2")};
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

                var xValue = ${w.get("batch","idyR","idyC2","d2")};
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
          ${v.set("batch","r","c + i","d1","value")};
        }
      }`,$=`
          let outputIndices = ${v.offsetToIndices("global_idx")};
          let batch = ${v.indicesGet("outputIndices",0)};
          let d1 = ${v.indicesGet("outputIndices",c)};
          let r = ${v.indicesGet("outputIndices",l)};
          let c = ${v.indicesGet("outputIndices",f)};
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
                let xValue = ${u?w.get("batch","idyR","idyC","inputChannel"):w.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${h.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${t?"bias[d1]":`${s}(0.0)`};
          ${v.setByOffset("global_idx","value")};
        `;return`
  ${r.registerUniforms(a).declareVariables(...T,v)}
  ${b}

    ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?_:$}}`},ou=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=D.size(o),s=[Math.ceil(i/64),1,1];Ne("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=e.format==="NHWC",u=["rank","rank"],l=[e.strides[0],e.strides[1]],f=[e.kernelShape[a?1:2],e.kernelShape[a?2:3]],c=[e.dilations[0],e.dilations[1]],p=[f[0]+(e.dilations[0]<=1?0:(e.kernelShape[a?1:2]-1)*(e.dilations[0]-1)),f[1]+(e.dilations[1]<=1?0:(e.kernelShape[a?2:3]-1)*(e.dilations[1]-1))],b=[p[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),p[1]-1-Math.floor(e.pads[1]+e.pads[3])/2],g=!1,h=e.group,w=r[1].dims,T=w[0]/h,v=w[1],_=[{type:12,data:i},{type:12,data:l},{type:12,data:f},{type:12,data:c},{type:12,data:p},{type:6,data:b},{type:12,data:T},{type:12,data:v},...W(r[0].dims,r[1].dims)];t&&(_.push(...W(r[2].dims)),u.push("rank")),_.push(...W(o));let $=s[1]===1&&s[2]===1,P=E=>{let R=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:f.length},{name:"dilations",type:"u32",length:f.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:b.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Le(r[0].dataType);return`${f1(E,r,o,t,$,g,F,R,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:_}),getShaderSource:P}}});var d1,p1,m1,Fb,Vb,h1,g1,b1,y1,Mb,Gb=C(()=>{"use strict";zb();Nb();hr();Yr();d1=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,p1=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},m1=(r,e,n,t,o,i,s,a,u,l)=>{let f=r.length-2,c=l.length===0;if(u.length===0)for(let g=0;g<f;++g)u.push(0);let p=r[0],b=e[a?3:1]*o;for(let g=0,h=r.length-f-(a?1:0);g<f;++g,++h){let w=r[h],T=c?w*s[g]:l[g],v=d1(w,s[g],i[g],e[h],n[g],T);p1(v,t,i,g,g+f),c&&l.push(s[g]*(w-1)+u[g]+(e[h]-1)*n[g]+1-i[g]-i[g+f])}l.splice(0,0,p),l.splice(a?3:1,0,b)},Fb=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<e[1].dims.length;++c)n.push(e[1].dims[c])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),s=r.outputPadding.slice(),a=e[0].dims,u=r.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;u=new Array(c).fill(1)}let l=r.strides.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;l=new Array(c).fill(1)}m1(a,n,u,r.autoPad,r.group,o,l,t,s,i);let f=Object.assign({},r);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),f},Vb=r=>{let e=zi(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,s=r.kernelShape,a=r.pads,u=r.strides,l=r.wIsConst(),f=r.outputPadding,c=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,outputPadding:f,outputShape:c,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},h1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((f,c)=>f+c,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((f,c)=>f+c,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((f,c)=>f+c,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((f,c)=>f+c,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},g1=[2,3,1,0],b1=(r,e,n)=>{let t=Fb(n,e),o=n.format==="NHWC",i=t.outputShape,s=i[o?3:1],a=e[0].dims[o?3:1];if(t.group!==1||s===1&&a===1){r.compute(ou(e,t));return}let u=i[o?1:2],l=i[o?2:3],f=e[1].dims[2],c=e[1].dims[3],p=o?u*l:s,b=o?s:u*l,g=f*c*a,h=!0,w=r.kernelCustomData.wT??r.compute(Tt(e[1],g1),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=w);let T=[e[0],w],v=e.length===3;v&&(!o&&e[2].dims.length===1?T.push(e[2].reshape([e[2].dims[0],1,1])):T.push(e[2])),r.compute(Rb(T,t,i,p,b,g,v,h),{inputs:T})},y1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=Fb({...e,pads:a,strides:s,dilations:i,kernelShape:o},t);r.compute(ou(t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},Mb=(r,e)=>{h1(r.inputs,e),r.inputs[0].dims.length===3?y1(r,e):b1(r,r.inputs,e)}});var x1,Ub,Wb,Hb=C(()=>{"use strict";se();fe();Ke();pe();x1=(r,e,n,t)=>{let o=D.size(e),i=e.length,s=B("input",r,i),a=V("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=D.normalizeAxis(u,i),f=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,b=Y("uniforms.input_shape","uniforms.axis",i),g=t.reverse?p+(t.exclusive?" + 1":""):"0",h=t.reverse?b:p+(t.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...W(e,e)]}),getShaderSource:f}},Ub=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(x1(t,n,o,e),{inputs:[0]})},Wb=r=>{let e=r.exclusive===1,n=r.reverse===1;return le({exclusive:e,reverse:n})}});var v1,w1,T1,qb,jb,Kb=C(()=>{"use strict";se();fe();Ke();pe();v1=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},w1=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},T1=(r,e)=>{let n,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,f=e.mode==="DCR";u?([n,t,o,i]=r.dims,s=f?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],a=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],s=f?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],a=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=r.reshape(s),p=c.dims.length,b=r.dataType,g=B("a",b,p),h=V("output",b,p),w=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(g,h)}

  ${w1(a,p,g,h)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:T=>{let v=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],_=D.size(v),$=c.dims,P=D.sortBasedOnPerm($,a);return{outputs:[{dims:v,dataType:T[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...W($,P)]}},getShaderSource:w}},qb=(r,e)=>{v1(r.inputs),r.compute(T1(r.inputs[0],e))},jb=r=>le({blocksize:r.blocksize,mode:r.mode,format:r.format})});var iu,Gi,Xb,_1,I1,au,su,Zb,S1,Yb,Jb,Qb=C(()=>{"use strict";se();fe();Ke();pe();iu="[a-zA-Z]|\\.\\.\\.",Gi="("+iu+")+",Xb="^"+Gi+"$",_1="("+Gi+",)*"+Gi,I1="^"+_1+"$",au=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},su=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(I1)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(Xb)))throw new Error("Invalid LHS term");let f=this.processTerm(a,!0,l,u);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Gi)))throw new Error("Invalid RHS");o.match(RegExp(iu,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(Xb))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(iu,"g")),f=new au(o);return l?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let b=i-l.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+b),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<a.length;g++){let h=String.fromCharCode("0".charCodeAt(0)+g);f.addSymbol(h,p+g),this.addSymbol(h,t[u++],o)}}else f.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,t[u++],o)}),f}},Zb=r=>r+"_max",S1=(r,e,n,t)=>{let i=r.map(f=>f.length).map((f,c)=>B(`input${c}`,e,f)),s=D.size(t),a=V("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),l=f=>{let c=[],p="var prod = 1.0;",b="var sum = 0.0;",g="sum += prod;",h=[],w=[],T=[],v=[],_=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((P,E)=>{if(n.rhs.symbolToIndices.has(E)){let R=n.rhs.symbolToIndices.get(E)?.[0];R!==void 0&&n.lhs.forEach((F,H)=>{if(P.inputIndices.includes(H)){let j=F.symbolToIndices.get(E);if(j===void 0)throw new Error("Invalid symbol error");j.forEach(M=>{c.push(`${i[H].indicesSet(`input${H}Indices`,M,a.indicesGet("outputIndices",R))}`)})}})}else n.lhs.forEach((R,F)=>{if(P.inputIndices.includes(F)){let H=R.symbolToIndices.get(E);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(j=>{h.push(`${i[F].indicesSet(`input${F}Indices`,j,`${E}`)}`)}),v.push(`prod *= ${i[F].getByIndices(`input${F}Indices`)};`)}}),w.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${Zb(E)}; ${E}++) {`),T.push("}")});let $=_?[...c,`let sum = ${i.map((P,E)=>P.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,b,...w,...h,p,...v,g,...T];return`
            ${f.registerUniforms(u.map(P=>({name:`${Zb(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((P,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let f=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));f.push({type:12,data:s});let c=r.map((p,b)=>[...W(p)]).reduce((p,b)=>p.concat(b),f);return c.push(...W(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:l}},Yb=(r,e)=>{let n=new su(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,s)=>i.dims);r.compute(S1(o,r.inputs[0].dataType,n,t))},Jb=r=>{let e=r.equation.replace(/\s+/g,"");return le({equation:e})}});var $1,ey,A1,P1,ty,ry=C(()=>{"use strict";se();fe();pe();$1=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ey=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},A1=(r,e)=>r.length>e.length?ey(r,e):ey(e,r),P1=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=A1(e,n),o=r[0].dataType,i=o===9?4:1,s=Math.ceil(D.size(t)/i),a=l=>{let f=B("input",o,e.length,i),c=V("output",o,t.length,i),p;if(o===9){let b=(g,h,w="")=>`
          let outputIndices${h} = ${c.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${f.broadcastedIndicesToOffset(`outputIndices${h}`,c)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${g}[${h}] = ${w}(${f.getByOffset(`index${h}`)}[component${h}]);
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
    ${p}`},u=[{type:12,data:s},...W(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},ty=r=>{$1(r.inputs),r.compute(P1(r.inputs),{inputs:[0]})}});var O1,ny,oy=C(()=>{"use strict";se();fe();pe();Ri();O1=r=>{let e=r[0].dataType,n=D.size(r[0].dims),t=D.size(r[1].dims),o=t%4===0,i=s=>{let a=B("x",e,[1],4),u=B("bias",e,[1],4),l=V("y",e,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${u.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(a,u,l)}

    ${Xs(nt(e))}

    ${s.mainStart(Xr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Zs("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Xr/4)}})}},ny=r=>{r.inputs.length<2||D.size(r.inputs[1].dims)===0?tb(r):r.compute(O1(r.inputs))}});var E1,C1,iy,ay,sy=C(()=>{"use strict";se();fe();Ke();pe();E1=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},C1=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=D.normalizeAxis(e.axis,o),s=n.slice(0);s.splice(i,1,...t);let a=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(D.size(s)/u),f=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...W(r[0].dims,r[1].dims,s)],c=p=>{let b=B("data",r[0].dataType,r[0].dims.length,u),g=B("inputIndices",r[1].dataType,r[1].dims.length),h=V("output",r[0].dataType,s.length,u),w=v=>{let _=t.length,$=`var indicesIndices${v}  = ${g.type.indices}(0);`;for(let P=0;P<_;P++)$+=`${_>1?`indicesIndices${v}[${P}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${P}]`:`outputIndices${v}`};`;$+=`
          var idx${v} = ${g.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${b.type.indices};
        `;for(let P=0,E=0;P<o;P++)P===i?($+=`${o>1?`dataIndices${v}[${P}]`:`dataIndices${v}`} = u32(idx${v});`,E+=_):($+=`${o>1?`dataIndices${v}[${P}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${E}]`:`outputIndices${v}`};`,E++);return $},T;if(r[0].dataType===9){let v=(_,$,P="")=>`
          let outputIndices${$} = ${h.offsetToIndices(`outputOffset + ${$}u`)};
          ${w($)};
          let offset${$} = ${b.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${_}[${$}] = ${P}(${b.getByOffset(`index${$}`)}[component${$}]);
        `;T=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else T=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${w("")};
      let value = ${b.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,g,h)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${T}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:c}},iy=r=>le({axis:r.axis}),ay=(r,e)=>{let n=r.inputs;E1(n),r.compute(C1(r.inputs,e))}});var k1,D1,uy,ly,cy=C(()=>{"use strict";se();fe();Ke();pe();k1=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=D.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],s=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},D1=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=D.normalizeAxis(e.gatherAxis,o),s=D.normalizeAxis(e.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...t);let u=D.size(a),l=r[2].dataType,c=r[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...W(...r.map((g,h)=>g.dims),a)],b=g=>{let h=B("data",r[0].dataType,r[0].dims.length),w=B("inputIndices",r[1].dataType,r[1].dims.length),T=B("scales",r[2].dataType,r[2].dims.length),v=r.length>3?B("zeroPoint",r[3].dataType,r[3].dims.length):void 0,_=V("output",l,a.length),$=[h,w,T];v&&$.push(v);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(P).declareVariables(...$,_)}
        ${g.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
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
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${nt(l)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((g,h)=>h!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(g,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:b}},uy=(r,e)=>{let n=r.inputs;k1(n,e),r.compute(D1(r.inputs,e))},ly=r=>le({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var B1,L1,fy,dy,py=C(()=>{"use strict";se();fe();Ke();pe();B1=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},L1=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,s=r[1].dataType,a=D.normalizeAxis(e.axis,o),u=n[a],l=i.slice(0),f=D.size(l),c=B("input",t,o),p=B("indicesInput",s,i.length),b=V("output",t,l.length),g=[{type:12,data:f},{type:6,data:u},{type:12,data:a}];return g.push(...W(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:T=>`
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
  }`}},fy=r=>le({axis:r.axis}),dy=(r,e)=>{let n=r.inputs;B1(n),r.compute(L1(r.inputs,e))}});var R1,z1,my,hy,gy=C(()=>{"use strict";se();fe();pe();R1=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},z1=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,s]=Ei.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=D.size(a),l=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],f=["type","type"];r.length===3&&(l.push(...W(r[2].dims)),f.push("rank")),l.push(...W(a));let c=p=>{let b="";e.transA&&e.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let g=e.alpha===1?"":"value *= uniforms.alpha;",h=B("a",r[0].dataType,r[0].dims),w=B("b",r[1].dataType,r[1].dims),T=h.type.value,v=null,_=[h,w];r.length===3&&(v=B("c",r[2].dataType,r[2].dims.length),_.push(v));let $=V("output",r[0].dataType,a.length);_.push($);let P=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
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
    ${(()=>v!=null?`let cOffset = ${v.broadcastedIndicesToOffset("vec2(m, n)",$)}; value += ${T}(uniforms.beta) * ${v.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c}},my=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},hy=(r,e)=>{R1(r.inputs),r.compute(z1(r.inputs,e))}});var _t,V1,yy,by,M1,ro,xy,uu=C(()=>{"use strict";se();fe();Ke();Oi();Bi();pe();Yr();_t=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,V1=(r,e)=>{let n=r[0],t=_t(r,1),o=_t(r,2),i=_t(r,3),s=_t(r,4),a=_t(r,5),u=_t(r,6),l=_t(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],b=c,g=0,h=0,w=Math.floor(p/e.numHeads);if(u&&l&&D.size(u.dims)&&D.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==e.numHeads||u.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==f||l.dims[1]!==e.numHeads||l.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],h=u.dims[2]}else if(u&&D.size(u.dims)||l&&D.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let T;if(t&&D.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');T=2,b=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');T=5,b=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');T=0,b=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');T=3}if(i&&D.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=g+b,_=0;if(s&&D.size(s.dims)>0){_=8;let R=s.dims;throw R.length===1?R[0]===f?_=1:R[0]===3*f+2&&(_=3):R.length===2&&R[0]===f&&R[1]===v&&(_=5),_===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,P=p;if(o&&D.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(s&&D.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&D.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==f||a.dims[1]!==e.numHeads||a.dims[2]!==c||a.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:v,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:p,vHiddenSize:P,headSize:w,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:_,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:T}},yy=r=>le({...r}),by=le({perm:[0,2,1,3]}),M1=(r,e,n,t,o,i,s)=>{let a=[t,o,i],u=D.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],f=c=>{let p=V("qkv_with_bias",e.dataType,a),b=B("qkv",e.dataType,a),g=B("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(h).declareVariables(b,g,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:f},{inputs:[e,n],outputs:[-1]})[0]},ro=(r,e,n,t,o,i,s,a)=>{let u=i;if(s&&D.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=M1(r,i,s,e,t,n*o,a),u=u.reshape([e,t,n,o]),r.compute(Tt(u,by.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),r.compute(Tt(u,by.perm),{inputs:[u],outputs:[-1]})[0]},xy=(r,e)=>{let n=V1(r.inputs,e),t=r.inputs[0],o=_t(r.inputs,1),i=_t(r.inputs,2),s=_t(r.inputs,3),a=_t(r.inputs,4),u=_t(r.inputs,5),l=_t(r.inputs,6),f=_t(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=ro(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,s,0);if(c)return In(r,p,o,i,a,void 0,l,f,u,n,e);if(!o||!i)throw new Error("key and value must be provided");let b=ro(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),g=ro(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);In(r,p,b,g,a,void 0,l,f,u,n,e)}});var vy,G1,U1,lu,wy,cu=C(()=>{"use strict";se();fe();pe();vy=r=>Array.from(r.getBigInt64Array(),Number),G1=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(vy(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},U1=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},lu=(r,e)=>{let n=r[0].dims,t=e??vy(r[1]),o=U1(n,t),i=D.size(o),s=r[0].dataType,a=B("input",s,n.length),u=V("output",s,o.length),l=f=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...W(r[0].dims,o)]}),getShaderSource:l}},wy=r=>{G1(r.inputs),r.compute(lu(r.inputs),{inputs:[0]})}});var W1,Ty,Iy,H1,_y,Sy,$y=C(()=>{"use strict";se();fe();Ke();Bi();pe();uu();cu();Yr();W1=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4];if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],f=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],c=l,p=0,b=0,g=Math.floor(f/e.numHeads),h=i&&i.dims.length!==0,w=s&&s.dims.length!==0,T=!0;if(h&&w){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');T?(p=i.dims[1],b=i.dims[1]):(p=i.dims[2],b=i.dims[2])}else if(h||w)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(t){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');v=2,c=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,c=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,c=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let _=0,$=!1,P=f;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=p+c,R=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:E,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:P,headSize:g,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:e.scale,broadcastResPosBias:R,passPastInKv:$,qkvFormat:v,isPastkvBSNH:T}},Ty=(r,e,n,t)=>{let o=[t.batchSize,t.totalSequenceLength,t.kvNumHeads,t.headSize],i=4,s=D.size(o)/i,a=t.totalSequenceLength,u=V("present_kv",n,o.length,i),l=B("new_kv",r.dataType,r.dims.length,i),f=e?B("past_kv",e.dataType,e.dims.length,i):void 0,c=Math.ceil(t.headSize/i),p={x:a,y:r.dims[0],z:1},b=e?["rank","rank"]:["rank"],g=[{type:12,data:s},{type:12,data:t.pastSequenceLength},{type:12,data:t.kvSequenceLength},{type:12,data:t.totalSequenceLength}],h=[l];f?(g.push(...W(r.dims),...W(e.dims),...W(o)),h.push(f)):g.push(...W(r.dims),...W(o));let w=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],T=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,v=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,_=e?`if (s < past_seqlen) {
        ${T}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${v}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${v}
        }`,$=P=>`

  ${P.registerUniforms(w).declareVariables(...h,u)}
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
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${t.kvNumHeads}${c}${!!e}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:p,programUniforms:g}),getShaderSource:$}},Iy=r=>le({...r}),H1=le({perm:[0,2,1,3]}),_y=(r,e,n,t,o)=>{let i=e,s=t.kvNumHeads,a=t.nReps;return e.dims.length===3&&t.kvSequenceLength!==0&&(i=e.reshape([t.batchSize,t.kvSequenceLength,s,t.headSize])),n?i=r.compute(Ty(i,n,i.dataType,t),{inputs:[i,n],outputs:[t.isPastkvBSNH?o:-1]})[0]:i=r.compute(Ty(i,void 0,i.dataType,t),{inputs:[i],outputs:[t.isPastkvBSNH?o:-1]})[0],a!==1&&(i=r.compute(lu([i],[1,1,1,a]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([t.batchSize,t.totalSequenceLength,s*a,t.headSize])),r.compute(Tt(i,H1.perm),{inputs:[i],outputs:[-1]})[0]},Sy=(r,e)=>{let n=W1(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=ro(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r.inputs[0],void 0,0),o=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,i=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,s=_y(r,r.inputs[1],o,n,1),a=_y(r,r.inputs[2],i,n,2);In(r,t,s,a,void 0,void 0,void 0,void 0,void 0,n,e)}});var q1,j1,K1,Ay,Py=C(()=>{"use strict";se();fe();pe();q1=(r,e)=>{let n=r[0].dims,t=n,o=2,i=D.sizeToDimension(n,o),s=D.sizeFromDimension(n,o),a=Fe(s),u=s/a,l=[n[0],n[1],u],f=["rank","type","type"],c=[{type:12,data:s},{type:12,data:u}];c.push(...W(l,l));let p=b=>{let g=B("x",r[0].dataType,l.length,a),h=B("scale",r[1].dataType,r[1].dims),w=B("bias",r[2].dataType,r[2].dims),T=V("output",r[0].dataType,l.length,a),v=[g,h,w,T],_=g.type.value,$=a===1?"f32":`vec${a}<f32>`,P=64,E=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${$}, ${P}>;
  const workgroupSize = ${P}u;
  ${b.registerUniforms(E).declareVariables(...v)}
  ${b.mainStart(P)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${$}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${$}(${g.get("batch","channel","h")});
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the mean of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      meanShared = ${jt("workgroupShared[0]",a)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${$}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${$}(${g.get("batch","channel","h")}) - ${$}(meanShared);
      initial = initial + deviation * deviation;
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the sum of square of deviation of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      squaredNormShared = ${jt("workgroupShared[0]",a)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${e.epsilon}));
    let channelScale = invStdDev * f32(${h.getByOffset("channel")});
    let channelShift = f32(${w.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${g.get("batch","channel","h")} * ${_}(${$}(channelScale)) + ${_}(${$}(channelShift));
      ${T.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${e.epsilon};${a}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:i},programUniforms:c}),getShaderSource:p}},j1=(r,e,n,t,o,i,s,a)=>{let u=Fe(s),l=64,f=u===1?"vec2f":`mat2x${u}f`,c=u===1?"f32":`vec${u}f`,p=(E,R)=>`${f}(${E}, ${R})`,b=o*s/u,g=Math.ceil(i/l),h=["type"],w=[{type:12,data:g},{type:12,data:i},{type:12,data:Math.floor(s/u)},{type:12,data:Math.floor(i*s/u)}],T=E=>{let R=B("input",e.dataType,e.dims,u);return`
  ${E.declareVariables(R)}
  @group(0) @binding(1) var<storage, read_write> output : array<${f}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${E.mainStart(l)}
    let currentImageNumber = global_idx / ${l} / uniforms.C;
    let currentChannelNumber = (global_idx / ${l}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${Pr("f32",u)};
    var squaredSum = ${Pr("f32",u)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${c}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${p("sum","squaredSum")};
  }`},v=r.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${u}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:[o,s,l,2],dataType:1}],dispatchGroup:{x:o*s/u},programUniforms:w}),getShaderSource:T},{inputs:[e],outputs:[-1]})[0],_=[{type:12,data:b},{type:12,data:i},{type:12,data:Math.floor(s/u)},{type:12,data:Math.floor(l*s/u)}],$=["type","type","type"],P=E=>{let R=B("scale",n.dataType,n.dims,u),F=B("bias",t.dataType,t.dims,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${f}>;
  @group(0) @binding(1) var<storage, read> scale : array<${R.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${F.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${f}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${Pr("f32",u)};
    var squaredSum = ${Pr("f32",u)};
    for (var i: u32 = 0; i < min(${l}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${l}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${a}));
    let channelScale = invStdDev * ${c}(scale[currentChannelNumber]);
    let channelShift = ${c}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${p("channelScale","channelShift")};
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:[o,s,2],dataType:1}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:P},{inputs:[v,n,t],outputs:[-1]})[0]},K1=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=D.sizeFromDimension(t,1)/s,u=Fe(s),l=D.size(o)/u,f=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=j1(r,e[0],e[1],e[2],i,a,s,n.epsilon),b=g=>{let h=Le(e[0].dataType),w=u===1?"vec2f":`mat2x${u}f`,T=u===1?h:`vec${u}<${h}>`,v=B("input",e[0].dataType,e[0].dims,u),_=V("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${v.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${_.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${g.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${T}(scale[0]), ${T}(scale[1]));
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:b},{inputs:[e[0],p]})},Ay=(r,e)=>{e.format==="NHWC"?K1(r,r.inputs,e):r.compute(q1(r.inputs,e))}});var X1,Z1,Oy,Ey=C(()=>{"use strict";se();fe();pe();X1=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Z1=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],s=!t&&r[2],a=o,u=D.normalizeAxis(e.axis,o.length),l=D.sizeToDimension(o,u),f=D.sizeFromDimension(o,u),c=D.size(i.dims),p=s?D.size(s.dims):0;if(c!==f||s&&p!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let b=[];for(let P=0;P<o.length;++P)P<u?b.push(o[P]):b.push(1);let g=Fe(f),h=["type","type"],w=[{type:12,data:l},{type:1,data:f},{type:12,data:Math.floor(f/g)},{type:1,data:e.epsilon}];s&&h.push("type");let T=n>1,v=n>2,_=P=>{let E=Le(r[0].dataType),R=[B("x",r[0].dataType,r[0].dims,g),B("scale",i.dataType,i.dims,g)];s&&R.push(B("bias",s.dataType,s.dims,g)),R.push(V("output",r[0].dataType,a,g)),T&&R.push(V("mean_data_output",1,b)),v&&R.push(V("inv_std_output",1,b));let F=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(F).declareVariables(...R)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Pr("f32",g)};
    var mean_square_vector = ${Pr("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Zr(E,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${jt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${jt("mean_square_vector",g)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Zr(E,g,"x[j + offset]")};
      let f32scale = ${Zr(E,g,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Zr(E,g,"bias[j]")}`:""}
      );
    }

    ${T?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:a,dataType:r[0].dataType}];return T&&$.push({dims:b,dataType:1}),v&&$.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${n};${t}`,inputDependencies:h},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:w}),getShaderSource:_}},Oy=(r,e)=>{X1(r.inputs),r.compute(Z1(r.inputs,e,r.outputCount))}});var Y1,J1,Cy,ky,Dy=C(()=>{"use strict";se();fe();Ke();pe();Y1=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=r[1];if(!D.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(D.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let f=r[3].dims,c=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(D.size(f)!==c)throw new Error("zeroPoints input size error.")}},J1=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=D.size(a),f=r[1].dims[2]/4,c=r[0].dataType,p=Fe(e.k),b=Fe(f),g=Fe(s),h=a.concat([o,s]),w=o>1&&s/g%2===0?2:1,T=D.size(h)/g/w,v=64,_=[],$=[u,o,i/p],P=D.convertShape(r[1].dims).slice();P.splice(-1,1,f/b),_.push(...W($)),_.push(...W(P)),_.push(...W(r[2].dims)),r.length===4&&_.push(...W(D.convertShape(r[3].dims)));let E=[u,o,s/g];_.push(...W(E));let R=F=>{let H=$.length,j=B("a",r[0].dataType,H,p),M=B("b",12,P.length,b),ae=B("scales",r[2].dataType,r[2].dims.length),he=[j,M,ae],ge=r.length===4?B("zero_points",12,r[3].dims.length):void 0;ge&&he.push(ge);let Ie=E.length,ie=V("output",r[0].dataType,Ie,g),Ae=Le(r[0].dataType),Se=(()=>{switch(p){case 1:return`array<${Ae}, 8>`;case 2:return`mat4x2<${Ae}>`;case 4:return`mat2x4<${Ae}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ue=()=>{let be=`
          // reuse a data
            var input_offset = ${j.indicesToOffset(`${j.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Se};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${j.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ve=0;ve<g*w;ve++)be+=`
            b_value = ${b===1?`b${ve}_data`:`b${ve}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Se}(${Array.from({length:4},(G,J)=>`${Ae}(b_value_lower[${J}]), ${Ae}(b_value_upper[${J}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${Se}(${Array.from({length:8},(G,J)=>`(b_quantized_values[${J}] - ${ge?`zero_point${ve}`:"zero_point"}) * scale${ve}`).join(", ")});`:`(b_quantized_values - ${Se}(${Array(8).fill(`${ge?`zero_point${ve}`:"zero_point"}`).join(",")})) * scale${ve};`)()};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(ve/g)}]${g>1?`[${ve%g}]`:""} += ${Array.from({length:8/p},(G,J)=>`${p===1?`a_data[${J}] * b_dequantized_values[${J}]`:`dot(a_data[${J}], b_dequantized_values[${J}])`}`).join(" + ")};
          `;return be},ze=()=>{let be=`
            var col_index = col * ${g};
            ${ge?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Ae}(8);`}
            `;for(let ve=0;ve<g*w;ve++)be+=`
            let scale${ve} = ${ae.getByOffset("col_index * nBlocksPerCol + block")};
            ${ge?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ge.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ve} = ${Ae}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return be},xe=()=>{let be=`col_index = col * ${g};`;for(let ve=0;ve<g*w;ve++)be+=`
            let b${ve}_data = ${M.getByIndices(`${M.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return be+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Se};
            var b_dequantized_values: ${Se};`,be};return`
        var<workgroup> workgroup_shared: array<${ie.type.value}, ${w*v}>;
        ${F.declareVariables(...he,ie)}
        ${F.mainStart([v,1,1])}
          let output_indices = ${ie.offsetToIndices(`(global_idx / ${v}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/p};
            ${ze()}
            for (var word: u32 = 0; word < ${f}; word += ${b}) {
              ${xe()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${ue()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${ie.type.value} = ${ie.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${ie.setByIndices(`${ie.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${p};${b};${g};${w};${v}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:c}],dispatchGroup:{x:T},programUniforms:_}),getShaderSource:R}},Cy=(r,e)=>{Y1(r.inputs,e),r.compute(J1(r.inputs,e))},ky=r=>le(r)});var Q1,eI,tI,rI,nI,oI,iI,aI,By,Ly=C(()=>{"use strict";se();fe();pe();Q1=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},eI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},tI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},rI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k = i32(${Y("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},nI=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k -= i32(${Y("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},oI=(r,e,n)=>{switch(n.mode){case 0:return eI(r,e,n.pads.length);case 1:return tI(r,e,n.pads.length);case 2:return rI(r,e,n.pads.length);case 3:return nI(r,e,n.pads.length);default:throw new Error("Invalid mode")}},iI=(r,e)=>{let n=D.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=D.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],s=r.length>=3&&r[2].data;e.mode===0&&i.push({type:s?r[2].dataType:1,data:e.value}),i.push(...W(r[0].dims,n));let a=["rank"],u=l=>{let f=V("output",r[0].dataType,n.length),c=B("x",r[0].dataType,t.length),p=c.type.value,b=oI(f,t.length,e),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&g.push({name:"constant_value",type:s?p:"f32"}),`
            ${l.registerUniforms(g).declareVariables(c,f)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:i}),getShaderSource:u}},aI=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let a=r[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},By=(r,e)=>{Q1(r.inputs);let n=aI(r.inputs,e);r.compute(iI(r.inputs,n),{inputs:[0]})}});var Ui,Ry,zy,Ny,Fy,sI,uI,Vy,My,Gy,Uy,Wy,Hy,qy,jy,Ky,Xy,Zy,Yy,Jy=C(()=>{"use strict";ft();se();fe();pe();Ui=r=>{if(ce.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},Ry=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Kr.adjustPoolAttributes(n,o,s,a,u,l);let f=Kr.computePoolOutputShape(n,o,a,u,s,l,e.autoPad),c=Object.assign({},e);i?Object.assign(c,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let p=f.slice();return p.push(p.splice(1,1)[0]),[c,t?p:f]},zy=(r,e)=>{let n=e.format==="NHWC",t=D.size(r),o=D.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],f=e.pads[e.pads.length-1],c=!!(l+f);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],g=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2];p=!!(h+w),i.push({type:12,data:b},{type:12,data:g},{type:12,data:h},{type:12,data:w}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=D.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,f)=>l+f);return[i,s,!!u,!1,!1]}},Ny=(r,e,n,t,o,i,s,a,u,l,f,c)=>{let p=o.format==="NHWC",b=e.type.value,g=V("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",w="",T="",v=n-(p?2:1);if(f?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=n-(p?3:2);c?w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:w=`
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
              ${w}
              ${h}
              ${T}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,w=o.pads.length,T="";return l?T=`
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
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${Y("uniforms.pads","j - 2u",w)};
                  ${T}
              }
              ${s}

              output[global_idx] = value;
            }`}},Fy=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,sI=r=>`${Fy(r)};${r.countIncludePad}`,uI=r=>`${Fy(r)};${r.storageOrder};${r.dilations}`,Vy=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),My=(r,e,n,t)=>{let[o,i]=Ry(e,t,n),s=B("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[f,c,p,b,g]=zy(i,o);f.push(...W(e.dims,i));let h=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${p};${b};${g}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:f}),getShaderSource:w=>Ny(w,s,e.dims.length,i.length,o,u,l,0,c,p,b,g)}},Gy=r=>{let e=r.count_include_pad!==0,n=Vy(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:sI(t)}},Uy=(r,e)=>{Ui(r.inputs),r.compute(My("AveragePool",r.inputs[0],!1,e))},Wy={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Hy=r=>{let e=r.format;return{format:e,...Wy,cacheKey:e}},qy=(r,e)=>{Ui(r.inputs),r.compute(My("GlobalAveragePool",r.inputs[0],!0,e))},jy=(r,e,n,t)=>{let[o,i]=Ry(e,t,n),s=`
      value = max(x_val, value);
    `,a="",u=B("x",e.dataType,e.dims.length),l=["rank"],[f,c,p,b,g]=zy(i,o);return f.push(...W(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${p};${b};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:f}),getShaderSource:h=>Ny(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,c,p,b,g)}},Ky=(r,e)=>{Ui(r.inputs),r.compute(jy("MaxPool",r.inputs[0],!1,e))},Xy=r=>{let e=r.storage_order,n=r.dilations,t=Vy(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:uI(o)}},Zy=r=>{let e=r.format;return{format:e,...Wy,cacheKey:e}},Yy=(r,e)=>{Ui(r.inputs),r.compute(jy("GlobalMaxPool",r.inputs[0],!0,e))}});var cI,fI,Qy,ex,tx=C(()=>{"use strict";se();fe();Ke();pe();cI=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},fI=(r,e)=>{let n=D.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,s=r[1].dataType,a=D.size(i),u=t===3||t===2,l=u?[Math.ceil(D.size(r[0].dims)/4)]:r[0].dims,f=r[1].dims,c=r.length>2?r[2]:void 0,p=c?u?[Math.ceil(D.size(c.dims)/4)]:c.dims:void 0,b=f.length===0||f.length===1&&f[0]===1,g=b===!1&&f.length===1,h=Fe(a),w=b&&(!u||h===4),T=w?h:1,v=w&&!u?h:1,_=B("input",u?12:t,l.length,v),$=B("scale",s,f.length),P=c?B("zero_point",u?12:t,p.length):void 0,E=V("output",s,i.length,T),R=[_,$];P&&R.push(P);let F=[l,f];c&&F.push(p);let H=[{type:12,data:a/T},{type:12,data:n},{type:12,data:e.blockSize},...W(...F,i)],j=M=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${M.registerUniforms(ae).declareVariables(...R,E)}
      ${M.mainStart()}
          ${M.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:j,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/T/64),y:1,z:1},programUniforms:H})}},Qy=(r,e)=>{cI(r.inputs,e),r.compute(fI(r.inputs,e))},ex=r=>le({axis:r.axis,blockSize:r.blockSize})});var dI,pI,rx,nx=C(()=>{"use strict";ft();se();pe();dI=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},pI=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:r},{type:t,data:n},...W(i)],u=l=>{let f=V("output",t,i.length),c=f.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(p).declareVariables(f)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},rx=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),ce.webgpu.validateInputContent&&dI(e,n,t),r.compute(pI(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var mI,hI,gI,bI,yI,xI,vI,wI,TI,_I,II,ox,SI,$I,AI,PI,OI,ix,ax,sx=C(()=>{"use strict";se();fe();Ke();pe();mI=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},hI=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},gI=(r,e,n,t,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(s>0&&r.length>s&&r[s].dims.length>0)r[s].getFloat32Array().forEach(f=>i.push(f));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&r.length>a&&r[a].dims.length>0){if(r[a].getFloat32Array().forEach(f=>t.push(f)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");mI(t,e),e.axes.length>0&&hI(t,e.axes,l).forEach((f,c)=>t[c]=f)}if(u>0&&r.length>u&&(r[u].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==l||n>=18&&o.length===e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},bI=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",yI=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",xI=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+n]=o[e.length+s]}),t):o},vI=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,s)=>Math.round(i*e[s]))}return o},wI=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},TI=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",t)};
        var roi_low = ${Y("uniforms.roi","i",o)};
        var roi_hi = ${Y("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,_I=(r,e,n,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",i)};
          var roi_hi = ${Y("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${Y("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",t.length)};
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
    }`,II=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,ox=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",SI=(r,e,n,t,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${ox(r,l,s,2)}
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
    }`},$I=(r,e,n,t,o,i,s,a,u,l)=>{let f=n.length===2,c=!0,[p,b]=f?[0,1]:c?[2,3]:[1,2],g=r.type.value,h=w=>{let T=w===p?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${g} {
        var output_index = ${e.indicesGet("output_indices",w)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[w]},
        ${t[w]}, ${n[w]}, ${i[w]}, ${i[w]} + ${n.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[w]} - 1))) {
          return ${u};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${g} = originalIdx + ${g}(i);
          if (${T} < 0 || ${T} >= ${n[w]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${T} = max(0, min(${T}, ${n[w]} - 1));`)()};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",w,`u32(${T})`)};
          data[i + 1] = ${w===p?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    `},AI=(r,e,n,t,o)=>{let[s,a,u,l,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${ox(r,f,s,3)}
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
    }`},PI=(r,e,n,t,o,i)=>{let s=r.dims,a=xI(i,e.axes,s.length),u=vI(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((v,_)=>v===0?1:u[_]/v),e.keepAspectRatioPolicy!=="stretch"&&(u=wI(s,l,e)));let f=V("output",r.dataType,u.length),c=B("input",r.dataType,s.length),p=D.size(u),b=s.length===u.length&&s.every((v,_)=>v===u[_]),g=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,w=c.type.value,T=v=>`
      ${b?"":`
      ${bI(e.coordinateTransformMode,w)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${II(c,s)};
              ${yI(e.nearestMode,n,w)};
              ${_I(c,f,s,u,l.length,a.length,g)};
              `;case"linear":return`
              ${TI(f,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${SI(c,f,s,g,h)}`;if(s.length===3||s.length===5)return`${AI(c,f,s,g,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${$I(c,f,s,u,l,a,e.cubicCoeffA,g,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(c,f)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${b}|${s}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:a},...W(s,u)]})}},OI=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},ix=(r,e)=>{let n=[],t=[],o=[],i=OI(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");gI(r.inputs,e,i,n,t,o),r.compute(PI(r.inputs[0],e,i,n,t,o),{inputs:[0]})},ax=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,s=r.extrapolationValue,a=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return le({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var EI,CI,ux,lx=C(()=>{"use strict";se();fe();Ke();pe();EI=(r,e)=>{let[n,t,o,i]=r,{numHeads:s,rotaryEmbeddingDim:a}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!D.areEqual(t.dims,[])&&!D.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!D.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],f=o.dims[0],c=D.sizeFromDimension(n.dims,1)/l,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},CI=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=r[0].dims[0],a=D.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=a/u,f=r[2].dims[1],c=o===0?f*2:l/t,p=new Array(s,u,l/c,c-f),b=D.computeStrides(p),g=[{type:1,data:i},{type:12,data:p},{type:12,data:b},...r[0].dims.length===3?new Array({type:12,data:[a,l,c,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...W(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],h=w=>{let T=B("input",r[0].dataType,r[0].dims.length),v=B("position_ids",r[1].dataType,r[1].dims.length),_=B("cos_cache",r[2].dataType,r[2].dims.length),$=B("sin_cache",r[3].dataType,r[3].dims.length),P=V("output",r[0].dataType,r[0].dims.length);return w.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${w.declareVariables(T,v,_,$,P)}

        ${w.mainStart(Xr)}
          let half_rotary_emb_dim = uniforms.${_.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",V("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
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
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(p)/Xr)},programUniforms:g})}},ux=(r,e)=>{EI(r.inputs,e),r.compute(CI(r.inputs,e))}});var kI,DI,cx,fx=C(()=>{"use strict";se();fe();pe();kI=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let s=r[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let s=r[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},DI=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,s=D.size(i),a=i,u=s,l=i.slice(-1)[0],f=t?i.slice(0,-1).concat(1):[],c=!o&&r.length>3,p=r.length>4,b=t&&n>1,g=t&&n>2,h=n>3,w=64,T=Fe(l),v=[{type:12,data:u},{type:12,data:T},{type:12,data:l},{type:1,data:e.epsilon}],_=P=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[B("x",r[0].dataType,r[0].dims,T),B("skip",r[1].dataType,r[1].dims,T),B("gamma",r[2].dataType,r[2].dims,T)];c&&R.push(B("beta",r[3].dataType,r[3].dims,T)),p&&R.push(B("bias",r[4].dataType,r[4].dims,T)),R.push(V("output",r[0].dataType,a,T)),b&&R.push(V("mean_output",1,f)),g&&R.push(V("inv_std_output",1,f)),h&&R.push(V("input_skip_bias_sum",r[0].dataType,a,T));let F=Le(r[0].dataType),H=Le(1,T);return`

      ${P.registerUniforms(E).declareVariables(...R)}
      var<workgroup> sum_shared : array<${H}, ${w}>;
      var<workgroup> sum_squared_shared : array<${H}, ${w}>;

      ${P.mainStart([w,1,1])}
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
          let bias_value = ${p?"bias[offset1d + i]":F+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Zr(F,T,"value")};
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
        let mean = ${jt("sum",T)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${jt("square_sum",T)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${F}(mean)`}) *
            ${F}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:a,dataType:r[0].dataType}];return n>1&&$.push({dims:f,dataType:1}),n>2&&$.push({dims:f,dataType:1}),n>3&&$.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${T};${b};${g};${h}`,inputDependencies:r.map((P,E)=>"type")},getShaderSource:_,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:v})}},cx=(r,e)=>{kI(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(DI(r.inputs,e,r.outputCount,!1),{outputs:t})}});var BI,Wi,LI,dx,RI,zI,px,mx,hx=C(()=>{"use strict";se();fe();Ke();pe();BI=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Wi=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},LI=(r,e)=>{if(r.length>1){let n=Wi(r,1),t=Wi(r,2),o=Wi(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),le({starts:n,ends:t,axes:o})}else return e},dx=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},RI=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",n.length)};
            let steps_i = ${Y("uniforms.steps","i",n.length)};
            let signs_i = ${Y("uniforms.signs","i",n.length)};
            let starts_i = ${Y("uniforms.starts","i",n.length)};
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
      }`,zI=(r,e)=>{let n=r[0].dims,t=D.size(n),o=e.axes.length>0?D.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Wi(r,4);i.forEach(T=>T!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((T,v)=>dx(T,v,n,o,i)),a=e.ends.map((T,v)=>dx(T,v,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let T=0;T<n.length;++T)o.includes(T)||(s.splice(T,0,0),a.splice(T,0,n[T]),i.splice(T,0,1));let u=i.map(T=>Math.sign(T));i.forEach((T,v,_)=>{if(T<0){let $=(a[v]-s[v])/T,P=s[v],E=P+$*i[v];s[v]=E,a[v]=P,_[v]=-T}});let l=n.slice(0);o.forEach((T,v)=>{l[T]=Math.ceil((a[T]-s[T])/i[T])});let f={dims:l,dataType:r[0].dataType},c=V("output",r[0].dataType,l.length),p=B("input",r[0].dataType,r[0].dims.length),b=D.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:b},{type:12,data:s},{type:6,data:u},{type:12,data:i},...W(r[0].dims,l)],w=T=>`
      ${T.registerUniforms(g).declareVariables(p,c)}
        ${RI(p,c,n)}
        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},px=(r,e)=>{BI(r.inputs,e);let n=LI(r.inputs,e);r.compute(zI(r.inputs,n),{inputs:[0]})},mx=r=>{let e=r.starts,n=r.ends,t=r.axes;return le({starts:e,ends:n,axes:t})}});var NI,FI,gx,bx,yx=C(()=>{"use strict";se();fe();Ke();pe();NI=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},FI=(r,e)=>{let n=r.dims,t=D.size(n),o=64,i=e.axis;if(i<0&&(i=n.length+i),i<n.length-1)throw new Error("softmax only supports last axis for now.");let s=n[i],a=t/s,u=Fe(s),l=s/u,f=(w,T)=>T===4?`max(max(${w}.x, ${w}.y), max(${w}.z, ${w}.w))`:T===2?`max(${w}.x, ${w}.y)`:T===3?`max(max(${w}.x, ${w}.y), ${w}.z)`:w,c=B("x",r.dataType,r.dims,u),p=V("result",r.dataType,r.dims,u),b=c.type.value,g=Le(r.dataType)==="f32"?`var threadMax = ${b}(-3.402823e+38f);`:`var threadMax = ${b}(-65504.0h);`,h=w=>`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${o}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${w.registerUniform("packedCols","i32").declareVariables(c,p)}
      ${w.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${o};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${g}
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
          rowMaxShared = ${b}(${f("threadShared[0]",u)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
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
          rowSumShared = ${b}(${jt("threadShared[0]",u)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${u}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.dataType}],dispatchGroup:{x:a},programUniforms:[{type:6,data:l}]}),getShaderSource:h}},gx=(r,e)=>{NI(r.inputs),r.compute(FI(r.inputs[0],e))},bx=r=>le({axis:r.axis})});var VI,MI,GI,UI,WI,xx,vx,wx=C(()=>{"use strict";se();fe();Ke();pe();VI=r=>{if(!r||r.length<1)throw new Error("too few inputs")},MI=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),le({numOutputs:t,axis:e.axis,splitSizes:n})},GI=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,UI=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},WI=(r,e)=>{let n=r[0].dims,t=D.size(n),o=r[0].dataType,i=D.normalizeAxis(e.axis,n.length),s=new Array(e.numOutputs),a=B("input",o,n.length),u=new Array(e.numOutputs),l=[],f=[],c=0,p=[{type:12,data:t}];for(let g=0;g<e.numOutputs;g++){c+=e.splitSizes[g],u[g]=c;let h=n.slice();h[i]=e.splitSizes[g],f.push(h),s[g]=V(`output${g}`,o,h.length),l.push({dims:f[g],dataType:r[0].dataType})}p.push({type:12,data:u},...W(n,...f));let b=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${GI(u.length)}
  ${UI(s)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:p})}},xx=(r,e)=>{VI(r.inputs);let n=r.inputs.length===1?e:MI(r.inputs,e);r.compute(WI(r.inputs,n),{inputs:[0]})},vx=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return le({axis:e,numOutputs:t,splitSizes:n})}});var HI,qI,Tx,_x=C(()=>{"use strict";se();fe();pe();HI=(r,e,n,t,o)=>{let i=V("output_data",o,n.length,4),s=B("a_data",e[1].dataType,e[1].dims.length,4),a=B("b_data",e[2].dataType,e[2].dims.length,4),u=B("c_data",e[0].dataType,e[0].dims.length,4),l,f=(c,p,b)=>`select(${p}, ${c}, ${b})`;if(!t)l=i.setByOffset("global_idx",f(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,b,g="")=>{let h=`a_data[index_a${b}][component_a${b}]`,w=`b_data[index_b${b}][component_b${b}]`,T=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
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
            ${p}[${b}] = ${g}(${f(h,w,T)});
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
      }`},qI=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(D.areEqual(e,n)&&D.areEqual(n,t)),s=e,a=D.size(e);if(i){let l=nr.calcShape(nr.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=D.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>HI(l,r,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...W(t,e,n,s)]})}},Tx=r=>{r.compute(qI(r.inputs))}});var Ix,Sx=C(()=>{"use strict";bg();Bi();vg();Tg();sb();yb();wb();Lb();Gb();Hb();Kb();Qb();ry();oy();sy();cy();py();gy();$y();Py();Ey();Qs();Dy();uu();Ly();Jy();tx();nx();ki();sx();lx();fx();hx();yx();wx();cu();Yr();Ri();_x();Ix=new Map([["Abs",[_g]],["Acos",[Ig]],["Acosh",[Sg]],["Add",[ub]],["ArgMax",[gg,Ks]],["ArgMin",[hg,Ks]],["Asin",[$g]],["Asinh",[Ag]],["Atan",[Pg]],["Atanh",[Og]],["Attention",[yg]],["AveragePool",[Uy,Gy]],["BatchNormalization",[xg]],["BiasAdd",[wg]],["BiasSplitGelu",[ab]],["Cast",[Cg,Eg]],["Ceil",[Dg]],["Clip",[kg]],["Concat",[xb,vb]],["Conv",[nu,ru]],["ConvTranspose",[Mb,Vb]],["Cos",[Bg]],["Cosh",[Lg]],["CumSum",[Ub,Wb]],["DepthToSpace",[qb,jb]],["DequantizeLinear",[Qy,ex]],["Div",[lb]],["Einsum",[Yb,Jb]],["Elu",[Rg,Yn]],["Equal",[cb]],["Erf",[zg]],["Exp",[Ng]],["Expand",[ty]],["FastGelu",[ny]],["Floor",[Fg]],["FusedConv",[nu,ru]],["Gather",[ay,iy]],["GatherElements",[dy,fy]],["GatherBlockQuantized",[uy,ly]],["Gelu",[Vg]],["Gemm",[hy,my]],["GlobalAveragePool",[qy,Hy]],["GlobalMaxPool",[Yy,Zy]],["Greater",[mb]],["GreaterOrEqual",[gb]],["GroupQueryAttention",[Sy,Iy]],["HardSigmoid",[Kg,jg]],["InstanceNormalization",[Ay]],["LayerNormalization",[Oy]],["LeakyRelu",[Mg,Yn]],["Less",[hb]],["LessOrEqual",[bb]],["Log",[nb]],["MatMul",[Db]],["MatMulNBits",[Cy,ky]],["MaxPool",[Ky,Xy]],["Mul",[fb]],["MultiHeadAttention",[xy,yy]],["Neg",[Ug]],["Not",[Gg]],["Pad",[By]],["Pow",[db]],["QuickGelu",[ob,Yn]],["Range",[rx]],["Reciprocal",[Wg]],["ReduceMin",[lg]],["ReduceMean",[og]],["ReduceMax",[ug]],["ReduceSum",[fg]],["ReduceProd",[cg]],["ReduceL1",[ig]],["ReduceL2",[ag]],["ReduceLogSum",[pg]],["ReduceLogSumExp",[sg]],["ReduceSumSquare",[dg]],["Relu",[Hg]],["Resize",[ix,ax]],["RotaryEmbedding",[ux]],["Sigmoid",[qg]],["Sin",[Xg]],["Sinh",[Zg]],["Slice",[px,mx]],["SkipLayerNormalization",[cx]],["Split",[xx,vx]],["Sqrt",[Yg]],["Softmax",[gx,bx]],["Sub",[pb]],["Tan",[Jg]],["Tanh",[eb]],["ThresholdedRelu",[rb,Yn]],["Tile",[wy]],["Transpose",[Hh,qh]],["Where",[Tx]]])});var Hi,$x=C(()=>{"use strict";ft();mr();pe();Hi=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){St(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of n)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,n){St(e.name);let t=this.backend.device,o=[];t.features.has("shader-f16")&&o.push("enable f16;");let i=Uh(n,this.backend.device.limits),s=e.getShaderSource(i),a=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,u=t.createShaderModule({code:a,label:e.name});Ne("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=t.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let s=n*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var jI,KI,fu,qi,Ax=C(()=>{"use strict";ft();se();mr();Lh();Vh();Sx();$x();jI=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},KI=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${jI(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},fu=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},qi=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t};n.features.has("chromium-experimental-timestamp-query-inside-passes")?t.push("chromium-experimental-timestamp-query-inside-passes"):n.features.has("timestamp-query")&&t.push("timestamp-query"),n.features.has("shader-f16")&&t.push("shader-f16"),this.device=await n.requestDevice(o),this.adapterInfo=new fu(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Fh(this),this.programManager=new Hi(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Dh(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;St(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,f=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,b=n[o*2],g=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let h=Number(b-this.queryTimeBase),w=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:Ar(T.dataType)})),outputsMetadata:p.map(T=>({dims:T.dims,dataType:Ar(T.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:f,startTime:h,endTime:w});else{let T="";c.forEach((_,$)=>{T+=`input[${$}]: [${_.dims}] | ${Ar(_.dataType)}, `});let v="";p.forEach((_,$)=>{v+=`output[${$}]: [${_.dims}] | ${Ar(_.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${f}" ${T}${v}execution time: ${w-h} ns`)}Io("GPU",`${f}::${b}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),yt()}run(e,n,t,o,i,s){St(e.name);let a=[];for(let _=0;_<n.length;++_){let $=n[_].data;if($===0)continue;let P=this.gpuDataManager.get($);if(!P)throw new Error(`no GPU data for input: ${$}`);a.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:f}=e.getRunData(n),c=t.length===0?u.map((_,$)=>$):t;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],b=[];for(let _=0;_<u.length;++_){if(!Number.isInteger(c[_])||c[_]<-3||c[_]>=s)throw new Error(`Invalid output index: ${c[_]}`);if(c[_]===-3)continue;let $=c[_]===-1,P=c[_]===-2,E=$||P?i(u[_].dataType,u[_].dims):o(c[_],u[_].dataType,u[_].dims);if(p.push(E),E.data===0)continue;let R=this.gpuDataManager.get(E.data);if(!R)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(R),P){let F=this.kernelPersistentData.get(this.currentKernelId);F||(F=[],this.kernelPersistentData.set(this.currentKernelId,F)),F.push(R)}b.push(R)}if(a.length!==n.length||b.length!==p.length){if(b.length===0)return yt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(f){let _=0,$=[];f.forEach(F=>{let H=typeof F.data=="number"?[F.data]:F.data;if(H.length===0)return;let j=F.type===10?2:4,M,ae;F.type===10?(ae=H.length>4?16:H.length>2?8:H.length*j,M=H.length>4?16:j*H.length):(ae=H.length<=2?H.length*j:16,M=16),_=Math.ceil(_/ae)*ae,$.push(_);let he=F.type===10?8:4;_+=H.length>4?Math.ceil(H.length/he)*M:H.length*j});let P=16;_=Math.ceil(_/P)*P;let E=new ArrayBuffer(_);f.forEach((F,H)=>{let j=$[H],M=typeof F.data=="number"?[F.data]:F.data;if(F.type===6)new Int32Array(E,j,M.length).set(M);else if(F.type===12)new Uint32Array(E,j,M.length).set(M);else if(F.type===10)new Uint16Array(E,j,M.length).set(M);else if(F.type===1)new Float32Array(E,j,M.length).set(M);else throw new Error(`Unsupported uniform type: ${Ar(F.type)}`)});let R=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,E,0,_),this.gpuDataManager.release(R.id),g={offset:0,size:_,buffer:R.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),w=h[1]===1&&h[2]===1,T=KI(e,n,w),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,h),this.programManager.setArtifact(T,v),Ne("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),f&&v.uniformVariablesInfo){if(f.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${f.length} in program "${v.programInfo.name}".`);for(let _=0;_<f.length;_++){let $=f[_],P=$.type,E=typeof $.data=="number"?1:$.data.length,[R,F]=v.uniformVariablesInfo[_];if(P!==R||E!==F)throw new Error(`Uniform variable ${_} mismatch: expect type ${R} with size ${F}, got type ${P} with size ${E} in program "${v.programInfo.name}".`)}}if(Ne("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(v,a,b,h,g),yt(e.name),p}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=Ix.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,s)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),Ne("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(f){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${f}`)),1}finally{l&&t.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(t,o,s?.[1]);return i.set(n,[a,t]),a}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[1])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await Ms(this,e,n);return Bh(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ne("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ne("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ne("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Px={};sn(Px,{init:()=>XI});var no,du,XI,Ox=C(()=>{"use strict";se();Ax();mr();fe();no=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(D.size(e)!==D.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},du=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=e.HEAPU32,i=t>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let a=[];for(let u=0;u<s;u++){let l=o[i++],f=o[i++],c=o[i++],p=[];for(let b=0;b<c;b++)p.push(o[i++]);a.push(new no(e,l,f,p))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(e,n){let t=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new no(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=Kn(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let f=l>0?this.backend.gpuDataManager.create(l).id:0;return new no(this.module,a,f,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.stackAlloc((1+n.length)*4),i=o>>2;this.module.HEAPU32[i++]=n.length;for(let s=0;s<n.length;s++)this.module.HEAPU32[i++]=n[s];return this.module._JsepOutput(this.opKernelContext,e,o)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},XI=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new qi;await i.initialize(n,t),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,a,u,l=!1)=>{if(l)Ne("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${a}, size=${u}`),i.memcpy(s,a);else{Ne("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${a}, size=${u}`);let f=e.HEAPU8.subarray(s>>>0,(s>>>0)+u);i.upload(a,f)}},async(s,a,u)=>{Ne("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(s,()=>e.HEAPU8.subarray(a>>>0,(a>>>0)+u))},(s,a,u)=>i.createKernel(s,a,u,e.UTF8ToString(e._JsepGetNodeName(a))),s=>i.releaseKernel(s),(s,a,u,l)=>{Ne("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let f=new du(e,i,a);return i.computeKernel(s,f,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else o("webnn")}});var ZI,yi,xi,Jr,YI,qn,vi,wi,Ex,Ti,_i,Ii,Cs=C(()=>{"use strict";Ph();Eh();se();jr();$i();zs();ZI=(r,e)=>{Je()._OrtInit(r,e)!==0&&Ue("Can't initialize onnxruntime.")},yi=async r=>{ZI(r.wasm.numThreads,Xn(r.logLevel))},xi=async(r,e)=>{{let n=(Ox(),Pn(Px)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Je(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Je(),r)}}},Jr=new Map,YI=r=>{let e=Je(),n=e.stackSave();try{let t=e.stackAlloc(8);return e._OrtGetInputOutputCount(r,t,t+4)!==0&&Ue("Can't get session input/output count."),[e.HEAP32[t/4],e.HEAP32[t/4+1]]}finally{e.stackRestore(n)}},qn=r=>{let e=Je(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},vi=async(r,e)=>{let n,t,o=Je();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=qn(r);let i=0,s=0,a=0,u=[],l=[],f=[];try{if([s,u]=Oh(e),e?.externalData&&o.mountExternalData){let v=[];for(let _ of e.externalData){let $=typeof _=="string"?_:_.path;v.push(Zn(typeof _=="string"?_:_.data).then(P=>{o.mountExternalData($,P)}))}await Promise.all(v)}for(let v of e?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let $=v,P=$?.context,E=$?.gpuDevice,R=$?.deviceType,F=$?.numThreads,H=$?.powerPreference;P?o.currentContext=P:E?o.currentContext=await navigator.ml.createContext(E):o.currentContext=await navigator.ml.createContext({deviceType:R,numThreads:F,powerPreference:H})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(n,t,s),i===0&&Ue("Can't create a session."),o.currentContext&&(o.currentContext=void 0);let[c,p]=YI(i),b=!!e?.enableGraphCapture,g=[],h=[],w=[];for(let v=0;v<c;v++){let _=o._OrtGetInputName(i,v);_===0&&Ue("Can't get an input name."),l.push(_),g.push(o.UTF8ToString(_))}for(let v=0;v<p;v++){let _=o._OrtGetOutputName(i,v);_===0&&Ue("Can't get an output name."),f.push(_);let $=o.UTF8ToString(_);h.push($);{if(b&&e?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let P=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[$]??"cpu";if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}.`);if(b&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(P)}}let T=null;return w.some(v=>v==="gpu-buffer")&&(a=o._OrtCreateBinding(i),a===0&&Ue("Can't create IO binding."),T={handle:a,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(v=>Rs(v))}),Jr.set(i,[i,l,f,T,b,!1]),[i,g,h]}catch(c){throw l.forEach(p=>o._OrtFree(p)),f.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a),i!==0&&o._OrtReleaseSession(i),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},wi=r=>{let e=Je(),n=Jr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,s,a]=n;s&&(a&&e._OrtClearBoundOutputs(s.handle),e._OrtReleaseBinding(s.handle)),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t),Jr.delete(r)},Ex=(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let s=Je(),a=r[0],u=r[1],l=r[3],f,c;if(a==="string"&&l==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let g=r[2].gpuBuffer;c=Kn(Ls(a),u);let h=s.jsepRegisterBuffer;if(!h)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=h(t,o,g,c)}else{let g=r[2];if(Array.isArray(g)){c=4*g.length,f=s._malloc(c),n.push(f);let h=f/4;for(let w=0;w<g.length;w++){if(typeof g[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);s.HEAPU32[h++]=rt(g[w],n)}}else c=g.byteLength,f=s._malloc(c),n.push(f),s.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,c),f)}let p=s.stackSave(),b=s.stackAlloc(4*u.length);try{let g=b/4;u.forEach(w=>s.HEAP32[g++]=w);let h=s._OrtCreateTensor(Ls(a),f,c,b,u.length,Rs(l));h===0&&Ue(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(h)}finally{s.stackRestore(p)}},Ti=async(r,e,n,t,o,i)=>{let s=Je(),a=Jr.get(r);if(!a)throw new Error(`cannot run inference. invalid session id: ${r}`);let u=a[0],l=a[1],f=a[2],c=a[3],p=a[4],b=a[5],g=e.length,h=t.length,w=0,T=[],v=[],_=[],$=[],P=s.stackSave(),E=s.stackAlloc(g*4),R=s.stackAlloc(g*4),F=s.stackAlloc(h*4),H=s.stackAlloc(h*4);try{[w,T]=Ah(i);for(let ie=0;ie<g;ie++)Ex(n[ie],v,$,r,e[ie],p);for(let ie=0;ie<h;ie++)Ex(o[ie],_,$,r,g+t[ie],p);let j=E/4,M=R/4,ae=F/4,he=H/4;for(let ie=0;ie<g;ie++)s.HEAPU32[j++]=v[ie],s.HEAPU32[M++]=l[e[ie]];for(let ie=0;ie<h;ie++)s.HEAPU32[ae++]=_[ie],s.HEAPU32[he++]=f[t[ie]];if(c&&!b){let{handle:ie,outputPreferredLocations:Ae,outputPreferredLocationsEncoded:Se}=c;if(l.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${l.length}).`);for(let ue=0;ue<g;ue++){let ze=e[ue];await s._OrtBindInput(ie,l[ze],v[ue])!==0&&Ue(`Can't bind input[${ue}] for session=${r}.`)}for(let ue=0;ue<h;ue++){let ze=t[ue];o[ue]?.[3]?s._OrtBindOutput(ie,f[ze],_[ue],0)!==0&&Ue(`Can't bind pre-allocated output[${ue}] for session=${r}.`):s._OrtBindOutput(ie,f[ze],0,Se[ze])!==0&&Ue(`Can't bind output[${ue}] to ${Ae[ue]} for session=${r}.`)}Jr.set(r,[u,l,f,c,p,!0])}s.jsepOnRunStart?.(u);let ge;c?ge=await s._OrtRunWithBinding(u,c.handle,h,F,w):ge=await s._OrtRun(u,R,E,g,H,h,F,w),ge!==0&&Ue("failed to call OrtRun().");let Ie=[];for(let ie=0;ie<h;ie++){let Ae=s.HEAPU32[F/4+ie];if(Ae===_[ie]){Ie.push(o[ie]);continue}let Se=s.stackSave(),ue=s.stackAlloc(4*4),ze=!1,xe,be=0;try{s._OrtGetTensorData(Ae,ue,ue+4,ue+8,ue+12)!==0&&Ue(`Can't access output tensor data on index ${ie}.`);let G=ue/4,J=s.HEAPU32[G++];be=s.HEAPU32[G++];let Ce=s.HEAPU32[G++],bt=s.HEAPU32[G++],je=[];for(let lt=0;lt<bt;lt++)je.push(s.HEAPU32[Ce/4+lt]);s._OrtFree(Ce);let tt=je.reduce((lt,pt)=>lt*pt,1);xe=Ar(J);let An=c?.outputPreferredLocations[t[ie]];if(xe==="string"){if(An==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let lt=[],pt=be/4;for(let Ot=0;Ot<tt;Ot++){let en=s.HEAPU32[pt++],Or=Ot===tt-1?void 0:s.HEAPU32[pt]-en;lt.push(s.UTF8ToString(en,Or))}Ie.push([xe,je,lt,"cpu"])}else if(An==="gpu-buffer"&&tt>0){let lt=s.jsepGetBuffer;if(!lt)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let pt=lt(be),Ot=Kn(J,tt);if(Ot===void 0||!Pi(xe))throw new Error(`Unsupported data type: ${xe}`);ze=!0,Ie.push([xe,je,{gpuBuffer:pt,download:s.jsepCreateDownloader(pt,Ot,xe),dispose:()=>{s._OrtReleaseTensor(Ae)}},"gpu-buffer"])}else{let lt=Ai(xe),pt=new lt(tt);new Uint8Array(pt.buffer,pt.byteOffset,pt.byteLength).set(s.HEAPU8.subarray(be,be+pt.byteLength)),Ie.push([xe,je,pt,"cpu"])}}finally{s.stackRestore(Se),xe==="string"&&be&&s._free(be),ze||s._OrtReleaseTensor(Ae)}}return c&&!p&&(s._OrtClearBoundOutputs(c.handle),Jr.set(r,[u,l,f,c,p,!1])),Ie}finally{s.stackRestore(P),v.forEach(j=>s._OrtReleaseTensor(j)),_.forEach(j=>s._OrtReleaseTensor(j)),$.forEach(j=>s._free(j)),w!==0&&s._OrtReleaseRunOptions(w),T.forEach(j=>s._free(j))}},_i=r=>{let e=Je(),n=Jr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&Ue("Can't get an profile file name."),e._OrtFree(o)},Ii=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Qr,Vt,oo,Ki,Xi,ji,pu,mu,Sn,$n,QI,Cx,kx,Dx,Bx,Lx,Rx,zx,hu=C(()=>{"use strict";ft();Cs();jr();Hn();Qr=()=>!!ce.wasm.proxy&&typeof document<"u",oo=!1,Ki=!1,Xi=!1,mu=new Map,Sn=(r,e)=>{let n=mu.get(r);n?n.push(e):mu.set(r,[e])},$n=()=>{if(oo||!Ki||Xi||!Vt)throw new Error("worker not ready")},QI=r=>{switch(r.data.type){case"init-wasm":oo=!1,r.data.err?(Xi=!0,pu[1](r.data.err)):(Ki=!0,pu[0]()),ji&&(URL.revokeObjectURL(ji),ji=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=mu.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},Cx=async()=>{if(!Ki){if(oo)throw new Error("multiple calls to 'initWasm()' detected.");if(Xi)throw new Error("previous call to 'initWasm()' failed.");if(oo=!0,Qr())return new Promise((r,e)=>{Vt?.terminate(),Ih().then(([n,t])=>{try{Vt=t,Vt.onerror=i=>e(i),Vt.onmessage=QI,pu=[r,e];let o={type:"init-wasm",in:ce};Vt.postMessage(o),ji=n}catch(o){e(o)}},e)});try{await bi(ce.wasm),await yi(ce),Ki=!0}catch(r){throw Xi=!0,r}finally{oo=!1}}},kx=async r=>{if(Qr())return $n(),new Promise((e,n)=>{Sn("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:ce}};Vt.postMessage(t)});await xi(ce,r)},Dx=async r=>Qr()?($n(),new Promise((e,n)=>{Sn("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Vt.postMessage(t,[r.buffer])})):qn(r),Bx=async(r,e)=>{if(Qr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return $n(),new Promise((n,t)=>{Sn("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Vt.postMessage(o,i)})}else return vi(r,e)},Lx=async r=>{if(Qr())return $n(),new Promise((e,n)=>{Sn("release",[e,n]);let t={type:"release",in:r};Vt.postMessage(t)});wi(r)},Rx=async(r,e,n,t,o,i)=>{if(Qr()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return $n(),new Promise((s,a)=>{Sn("run",[s,a]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};Vt.postMessage(l,Ii(u))})}else return Ti(r,e,n,t,o,i)},zx=async r=>{if(Qr())return $n(),new Promise((e,n)=>{Sn("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Vt.postMessage(t)});_i(r)}});var Nx,eS,Zi,Fx=C(()=>{"use strict";ft();hu();se();gi();zs();Nx=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},eS=r=>{switch(r[3]){case"cpu":return new it(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Pi(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return it.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},Zi=class{async fetchModelAndCopyToWasmMemory(e){return Dx(await Zn(e))}async loadModel(e,n){St();let t;typeof e=="string"?!1?t=await Zn(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Bx(t,n),yt()}async dispose(){return Lx(this.sessionId)}async run(e,n,t){St();let o=[],i=[];Object.entries(e).forEach(p=>{let b=p[0],g=p[1],h=this.inputNames.indexOf(b);if(h===-1)throw new Error(`invalid input '${b}'`);o.push(g),i.push(h)});let s=[],a=[];Object.entries(n).forEach(p=>{let b=p[0],g=p[1],h=this.outputNames.indexOf(b);if(h===-1)throw new Error(`invalid output '${b}'`);s.push(g),a.push(h)});let u=o.map((p,b)=>Nx(p,()=>`input "${this.inputNames[i[b]]}"`)),l=s.map((p,b)=>p?Nx(p,()=>`output "${this.outputNames[a[b]]}"`):null),f=await Rx(this.sessionId,i,u,a,l,t),c={};for(let p=0;p<f.length;p++)c[this.outputNames[a[p]]]=s[p]??eS(f[p]);return yt(),c}startProfiling(){}endProfiling(){zx(this.sessionId)}}});var tS,Yi,Vx=C(()=>{"use strict";ft();hu();Fx();Hn();tS=()=>{if((typeof ce.wasm.initTimeout!="number"||ce.wasm.initTimeout<0)&&(ce.wasm.initTimeout=0),ce.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ce.wasm.proxy!="boolean"&&(ce.wasm.proxy=!1),typeof ce.wasm.trace!="boolean"&&(ce.wasm.trace=!1),typeof ce.wasm.numThreads!="number"||!Number.isInteger(ce.wasm.numThreads)||ce.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ce.wasm.numThreads=1;else{let r=typeof navigator>"u"?wa("node:os").cpus().length:navigator.hardwareConcurrency;ce.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}},Yi=class{async init(e){tS(),await Cx(),await kx(e)}async createInferenceSessionHandler(e,n){let t=new Zi;return await t.loadModel(e,n),Promise.resolve(t)}}});var Mx={};sn(Mx,{wasmBackend:()=>rS});var rS,Gx=C(()=>{"use strict";Vx();rS=new Yi});ft();ft();ft();var cc="1.20.0-dev.20240908-de7a02beef";var CM=Sa;{let r=(hh(),Pn(mh)).onnxjsBackend;vr("webgl",r,-10)}{let r=(Gx(),Pn(Mx)).wasmBackend;vr("webgpu",r,5),vr("webnn",r,5),vr("cpu",r,10),vr("wasm",r,10)}Object.defineProperty(ce.versions,"web",{value:cc,enumerable:!0});export{pv as InferenceSession,Io as TRACE,St as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,it as Tensor,hv as TrainingSession,CM as default,ce as env,vr as registerBackend};
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
