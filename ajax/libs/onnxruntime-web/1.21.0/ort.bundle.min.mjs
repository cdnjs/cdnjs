/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Un=Object.defineProperty;var Af=Object.getOwnPropertyDescriptor;var kf=Object.getOwnPropertyNames;var Ef=Object.prototype.hasOwnProperty;var Nn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var G=(e,t)=>()=>(e&&(t=e(e=0)),t);var Zt=(e,t)=>{for(var n in t)Un(e,n,{get:t[n],enumerable:!0})},Pf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of kf(t))!Ef.call(e,o)&&o!==n&&Un(e,o,{get:()=>t[o],enumerable:!(r=Af(t,o))||r.enumerable});return e};var br=e=>Pf(Un({},"__esModule",{value:!0}),e);var _r,Tt,Ct,zf,Wa,Vn=G(()=>{"use strict";_r=new Map,Tt=[],Ct=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=_r.get(e);if(r===void 0)_r.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=Tt.indexOf(e);o!==-1&&Tt.splice(o,1);for(let a=0;a<Tt.length;a++)if(_r.get(Tt[a]).priority<=n){Tt.splice(a,0,e);return}Tt.push(e)}return}throw new TypeError("not a valid backend")},zf=async e=>{let t=_r.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Wa=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?Tt:n,o,a=[],s=new Set;for(let l of r){let p=await zf(l);typeof p=="string"?a.push({name:l,err:p}):(o||(o=p),o===p&&s.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let d=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,p)=>p==="executionProviders"?d:Reflect.get(l,p)})]}});var La=G(()=>{"use strict";Vn()});var Ga,Ha=G(()=>{"use strict";Ga="1.21.0"});var Fa,Ue,Wn=G(()=>{"use strict";Ha();Fa="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:Ga},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Fa=e}},get logLevel(){return Fa}};Object.defineProperty(Ue,"logLevel",{enumerable:!0})});var we,qa=G(()=>{"use strict";Wn();we=Ue});var Ka,ja,Za=G(()=>{"use strict";Ka=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,p;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let f=a*o,h=0,y=f,_=f*2,b=-1;s==="RGBA"?(h=0,y=f,_=f*2,b=f*3):s==="RGB"?(h=0,y=f,_=f*2):s==="RBG"&&(h=0,_=f,y=f*2);for(let w=0;w<a;w++)for(let S=0;S<o;S++){let $=(e.data[h++]-p[0])*l[0],v=(e.data[y++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],C=b===-1?255:(e.data[b++]-p[3])*l[3];r.fillStyle="rgba("+$+","+v+","+T+","+C+")",r.fillRect(S,w,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ja=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let h=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,b=1,w=2,S=3,$=0,v=h,T=h*2,C=-1;d==="RGBA"?($=0,v=h,T=h*2,C=h*3):d==="RGB"?($=0,v=h,T=h*2):d==="RBG"&&($=0,T=h,v=h*2),r=n.createImageData(o,a);for(let A=0;A<a*o;_+=y,b+=y,w+=y,S+=y,A++)r.data[_]=(e.data[$++]-f[0])*p[0],r.data[b]=(e.data[v++]-f[1])*p[1],r.data[w]=(e.data[T++]-f[2])*p[2],r.data[S]=C===-1?255:(e.data[C++]-f[3])*p[3]}else throw new Error("Can not access image data");return r}});var Ln,Qa,Ya,Xa,Ja,es,ts=G(()=>{"use strict";wr();Ln=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=n*r,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,y=0,_=1,b=2,w=3,S=0,$=p,v=p*2,T=-1;d==="RGB"&&(h=3,y=0,_=1,b=2,w=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,v=p,$=p*2):l==="BGR"&&(v=0,$=p,S=p*2);for(let A=0;A<p;A++,y+=h,b+=h,_+=h,w+=h)f[S++]=(e[y]+s[0])/a[0],f[$++]=(e[_]+s[1])/a[1],f[v++]=(e[b]+s[2])/a[2],T!==-1&&w!==-1&&(f[T++]=(e[w]+s[3])/a[3]);return l==="RGBA"?new De("float32",f,[1,4,n,r]):new De("float32",f,[1,3,n,r])},Qa=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=y,d.width=_}else d.tensorFormat="RGBA",d.height=y,d.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(r){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=f,d.width=h,t!==void 0){let y=l();y.width=h,y.height=f;let _=p(y);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;return h.drawImage(e,0,0,_,y),s=h.getImageData(0,0,_,y).data,d.height=y,d.width=_,Ln(s,d)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,h)=>{let y=l(),_=p(y);if(!e||!_)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{y.width=b.width,y.height=b.height,_.drawImage(b,0,0,y.width,y.height);let w=_.getImageData(0,0,y.width,y.height);d.height=y.height,d.width=y.width,f(Ln(w.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Ln(s,d);throw new Error("Input data provided is not supported - aborted tensor creation")},Ya=(e,t)=>{let{width:n,height:r,download:o,dispose:a}=t,s=[1,r,n,4];return new De({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},Xa=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:a})},Ja=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:a})},es=(e,t,n)=>new De({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var It,Qt,rs,ns,os=G(()=>{"use strict";It=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),rs=!1,ns=()=>{if(!rs){rs=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(It.set("int64",BigInt64Array),Qt.set(BigInt64Array,"int64")),t&&(It.set("uint64",BigUint64Array),Qt.set(BigUint64Array,"uint64")),r?(It.set("float16",n),Qt.set(n,"float16")):It.set("float16",Uint16Array)}}});var is,as,ss=G(()=>{"use strict";wr();is=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},as=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var De,wr=G(()=>{"use strict";Za();ts();os();ss();De=class{constructor(t,n,r){ns();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let d=It.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");d=n}else{let p=It.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?d=p.from(n,BigInt):d=p.from(n)}else if(n instanceof p)d=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&n instanceof Uint16Array&&p!==Uint16Array)d=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(l=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",d=t;else if(p==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let p=Qt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");a=l,this.cpuData=d,this.dataLocation="cpu"}let s=is(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,n){return Qa(t,n)}static fromTexture(t,n){return Ya(t,n)}static fromGpuBuffer(t,n){return Xa(t,n)}static fromMLTensor(t,n){return Ja(t,n)}static fromPinnedBuffer(t,n,r){return es(t,n,r)}toDataURL(t){return Ka(this,t)}toImageData(t){return ja(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return as(this,t)}}});var qe,Gn=G(()=>{"use strict";wr();qe=De});var vr,us,Ne,Be,Hn=G(()=>{"use strict";Wn();vr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},us=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),vr("CPU",a);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},Ne=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||us("BEGIN",e)},Be=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||us("END",e)}});var $r,ds=G(()=>{"use strict";Vn();Gn();Hn();$r=class e{constructor(t){this.handler=t}async run(t,n,r){Ne();let o={},a={};if(typeof t!="object"||t===null||t instanceof qe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof qe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of n){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let y=n[h];(y===null||y instanceof qe)&&(p=!0,s=!1,o[h]=y)}if(p){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)o[p]=null;let d=await this.handler.run(t,o,a),l={};for(let p in d)if(Object.hasOwnProperty.call(d,p)){let f=d[p];f instanceof qe?l[p]=f:l[p]=new qe(f.type,f.data,f.dims)}return Be(),l}async release(){return this.handler.dispose()}static async create(t,n,r,o){Ne();let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,y=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(y=t.byteLength-h,typeof r=="number"){if(y=r,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||h+y>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,h,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await Wa(s),p=await d.createInferenceSessionHandler(a,l);return Be(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Of,ls=G(()=>{"use strict";ds();Of=$r});var cs=G(()=>{"use strict"});var ps=G(()=>{"use strict"});var ms=G(()=>{"use strict"});var fs=G(()=>{"use strict"});var Fn={};Zt(Fn,{InferenceSession:()=>Of,TRACE:()=>vr,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Be,Tensor:()=>qe,env:()=>we,registerBackend:()=>Ct});var Ge=G(()=>{"use strict";La();qa();ls();Gn();cs();ps();Hn();ms();fs()});var xr=G(()=>{"use strict"});var bs={};Zt(bs,{default:()=>Df});var gs,ys,Df,_s=G(()=>{"use strict";qn();bt();Sr();gs="ort-wasm-proxy-worker",ys=globalThis.self?.name===gs;ys&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Tr(n.wasm).then(()=>{Cr(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;Ir(o,r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:r}=n,o=Yt(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;Ar(r,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":kr(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:a,outputIndices:s,options:d}=n;Er(r,o,a,s,new Array(s.length).fill(null),d).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},zr([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Pr(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Df=ys?null:e=>new Worker(e??Ve,{type:"module",name:gs})});var vs={};Zt(vs,{default:()=>Bf});var Kn,ws,Bf,Mf,$s=G(()=>{"use strict";ws=(Kn=import.meta.url,async function(e={}){var t,n,r=e,o=new Promise((i,u)=>{t=i,n=u}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",d=s&&self.name?.startsWith("em-pthread");r.mountExternalData=(i,u)=>{i.startsWith("./")&&(i=i.substring(2)),(r.Bd||(r.Bd=new Map)).set(i,u)},r.unmountExternalData=()=>{delete r.Bd};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let p=()=>{let i=(c,m,g)=>(...x)=>{let I=Je,z=m?.();x=c(...x);let B=m?.();return z!==B&&(c=B,g(z),m=g=null),Je!=I?new Promise((L,q)=>{En={resolve:L,reject:q}}):x},u=c=>async(...m)=>{try{if(r.Cd)throw Error("Session already started");let g=r.Cd={be:m[0],errors:[]},x=await c(...m);if(r.Cd!==g)throw Error("Session mismatch");r.Dd?.flush();let I=g.errors;if(0<I.length){let z=await Promise.all(I);if(z=z.filter(B=>B),0<z.length)throw Error(z.join(`
`))}return x}finally{r.Cd=null}};r._OrtCreateSession=i(r._OrtCreateSession,()=>r._OrtCreateSession,c=>r._OrtCreateSession=c),r._OrtRun=u(i(r._OrtRun,()=>r._OrtRun,c=>r._OrtRun=c)),r._OrtRunWithBinding=u(i(r._OrtRunWithBinding,()=>r._OrtRunWithBinding,c=>r._OrtRunWithBinding=c)),r._OrtBindInput=i(r._OrtBindInput,()=>r._OrtBindInput,c=>r._OrtBindInput=c),p=void 0};r.jsepInit=(i,u)=>{if(p?.(),i==="webgpu"){[r.Dd,r.Rd,r.Vd,r.Hd,r.Ud,r.hc,r.Wd,r.Zd,r.Sd,r.Td,r.Xd]=u;let c=r.Dd;r.jsepRegisterBuffer=(m,g,x,I)=>c.registerBuffer(m,g,x,I),r.jsepGetBuffer=m=>c.getBuffer(m),r.jsepCreateDownloader=(m,g,x)=>c.createDownloader(m,g,x),r.jsepOnCreateSession=m=>{c.onCreateSession(m)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepOnRunStart=m=>c.onRunStart(m),r.$d=(m,g)=>{c.upload(m,g)}}else if(i==="webnn"){[r.Dd,r.Yd,r.Id,r.jsepEnsureTensor,r.Jd,r.jsepDownloadTensor]=u,r.jsepReleaseTensorId=r.Id,r.jsepUploadTensor=r.Jd;let c=r.Dd;r.jsepOnRunStart=m=>c.onRunStart(m),r.jsepOnRunEnd=c.onRunEnd.bind(c),r.jsepRegisterMLContext=(m,g)=>{c.registerMLContext(m,g)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepCreateMLTensorDownloader=(m,g)=>c.createMLTensorDownloader(m,g),r.jsepRegisterMLTensor=(m,g,x,I)=>c.registerMLTensor(m,g,x,I),r.jsepCreateMLContext=m=>c.createMLContext(m),r.jsepRegisterMLConstant=(m,g,x,I,z)=>c.registerMLConstant(m,g,x,I,z,r.Bd),r.jsepRegisterGraphInput=c.registerGraphInput.bind(c),r.jsepIsGraphInput=c.isGraphInput.bind(c),r.jsepCreateTemporaryTensor=c.createTemporaryTensor.bind(c)}};var f,h,y=Object.assign({},r),_=(i,u)=>{throw u},b="";(a||s)&&(s?b=self.location.href:typeof document<"u"&&document.currentScript&&(b=document.currentScript.src),Kn&&(b=Kn),b=b.startsWith("blob:")?"":b.slice(0,b.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(h=i=>{var u=new XMLHttpRequest;return u.open("GET",i,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),f=async i=>{if(le(i))return new Promise((c,m)=>{var g=new XMLHttpRequest;g.open("GET",i,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?c(g.response):m(g.status)},g.onerror=m,g.send(null)});var u=await fetch(i,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var w=console.log.bind(console),S=console.error.bind(console),$=w,v=S;Object.assign(r,y),y=null;var T,C,A,k,O,M,V,F,j,ne,W,J,ve,Q=r.wasmBinary,ee=!1,le=i=>i.startsWith("file://");function Z(){return T.buffer!=k.buffer&&be(),k}function pe(){return T.buffer!=k.buffer&&be(),O}function ke(){return T.buffer!=k.buffer&&be(),M}function Se(){return T.buffer!=k.buffer&&be(),V}function D(){return T.buffer!=k.buffer&&be(),F}function R(){return T.buffer!=k.buffer&&be(),j}function Y(){return T.buffer!=k.buffer&&be(),ne}function fe(){return T.buffer!=k.buffer&&be(),ve}if(d){let i=function(u){try{var c=u.data,m=c.yd;if(m==="load"){let g=[];self.onmessage=x=>g.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of g)i(x);self.onmessage=i};for(let x of c.Od)r[x]&&!r[x].proxy||(r[x]=(...I)=>{postMessage({yd:"callHandler",Nd:x,args:I})},x=="print"&&($=r[x]),x=="printErr"&&(v=r[x]));T=c.he,be(),Fe(c.ie)}else if(m==="run"){cp(c.xd),Dn(c.xd,0,0,1,0,0),Lo(),An(c.xd),xe||(Mi(),xe=!0);try{pp(c.de,c.Fd)}catch(g){if(g!="unwind")throw g}}else c.target!=="setimmediate"&&(m==="checkMailbox"?xe&&ur():m&&(v(`worker: received unknown command ${m}`),v(c)))}catch(g){throw Ri(),g}};var ub=i,Fe,xe=!1;v=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:gr()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=i}function be(){var i=T.buffer;r.HEAP8=k=new Int8Array(i),r.HEAP16=M=new Int16Array(i),r.HEAPU8=O=new Uint8Array(i),r.HEAPU16=V=new Uint16Array(i),r.HEAP32=F=new Int32Array(i),r.HEAPU32=j=new Uint32Array(i),r.HEAPF32=ne=new Float32Array(i),r.HEAPF64=ve=new Float64Array(i),r.HEAP64=W=new BigInt64Array(i),r.HEAPU64=J=new BigUint64Array(i)}function Ye(){d?startWorker(r):U.Bb()}d||(T=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),be());var Gt,xt=0,Ht=null;function Bo(){if(--xt==0&&Ht){var i=Ht;Ht=null,i()}}function ut(i){throw v(i="Aborted("+i+")"),ee=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),n(i),i}function Mo(){return{a:{Ta:lp,Va:dp,W:mp,la:fp,b:gp,u:yp,R:bp,Za:_p,d:wp,pb:qo,g:hp,T:Zo,Ga:Qo,lb:Xo,nb:Jo,Ha:ei,Ea:ti,wb:ri,Da:ni,pa:oi,mb:ii,jb:ai,Fa:si,kb:ui,Ma:vp,za:xp,eb:Sp,cb:Cp,ya:Ap,V:kp,N:Ep,db:Pp,ma:Up,fb:Np,zb:Vp,hb:Wp,qb:Lp,ab:Gp,Aa:Hp,yb:An,Ja:Fp,S:qp,Wa:Kp,$:Qp,G:Yp,E:Jp,m:Tn,H:em,B:nm,X:om,J:im,v:am,O:sm,D:um,t:dm,A:lm,z:cm,w:pm,r:mm,tb:fm,ub:hm,vb:gm,rb:$i,sb:xi,bb:Si,Oa:bm,La:vm,y:$m,ja:xm,Ba:Sm,Ka:_m,qa:Tm,Ia:Cm,ib:Im,U:ym,fa:Am,Sa:km,gb:Em,Qa:Pm,Pa:zm,Ab:Ai,Ca:ki,ob:_n,aa:Ei,oa:Pi,xb:zi,na:Oi,$a:af,ia:_f,sa:Sf,ga:nf,da:pf,ua:$f,p:tf,e:Nm,c:Rm,ea:lf,f:Vm,n:Lm,k:Ym,Y:Hm,ka:Xm,j:rf,wa:df,Ra:If,ca:yf,Ua:Cf,P:cf,K:qm,_:gf,Q:of,Z:wf,x:Fm,l:Um,va:hf,i:Mm,h:Gm,ra:Tf,ta:xf,o:Wm,q:Km,s:Zm,I:Qm,C:ef,L:Jm,xa:uf,_a:sf,F:bf,Ya:mf,ba:vf,M:jm,Xa:ff,ha:Dm,a:T,Na:bn}}}var hn={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(i,u,c,m,g)=>{if(r===void 0||!r.Bd)return 1;if((i=Ae(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=r.Bd.get(i)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),m=Number(m>>>0),u+c>i.byteLength)return 3;try{let x=i.subarray(u,u+c);switch(g){case 0:pe().set(x,m>>>0);break;case 1:r.$d(m,x);break;default:return 4}return 0}catch{return 4}},1320198:(i,u,c)=>{r.Jd(i,pe().subarray(u>>>0,u+c>>>0))},1320261:()=>r.Yd(),1320302:i=>{r.Id(i)},1320338:()=>{r.Sd()},1320369:()=>{r.Td()},1320398:()=>{r.Xd()},1320423:i=>r.Rd(i),1320456:i=>r.Vd(i),1320488:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c),!0)},1320551:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c))},1320608:i=>{r.hc("Abs",i,void 0)},1320659:i=>{r.hc("Neg",i,void 0)},1320710:i=>{r.hc("Floor",i,void 0)},1320763:i=>{r.hc("Ceil",i,void 0)},1320815:i=>{r.hc("Reciprocal",i,void 0)},1320873:i=>{r.hc("Sqrt",i,void 0)},1320925:i=>{r.hc("Exp",i,void 0)},1320976:i=>{r.hc("Erf",i,void 0)},1321027:i=>{r.hc("Sigmoid",i,void 0)},1321082:(i,u,c)=>{r.hc("HardSigmoid",i,{alpha:u,beta:c})},1321161:i=>{r.hc("Log",i,void 0)},1321212:i=>{r.hc("Sin",i,void 0)},1321263:i=>{r.hc("Cos",i,void 0)},1321314:i=>{r.hc("Tan",i,void 0)},1321365:i=>{r.hc("Asin",i,void 0)},1321417:i=>{r.hc("Acos",i,void 0)},1321469:i=>{r.hc("Atan",i,void 0)},1321521:i=>{r.hc("Sinh",i,void 0)},1321573:i=>{r.hc("Cosh",i,void 0)},1321625:i=>{r.hc("Asinh",i,void 0)},1321678:i=>{r.hc("Acosh",i,void 0)},1321731:i=>{r.hc("Atanh",i,void 0)},1321784:i=>{r.hc("Tanh",i,void 0)},1321836:i=>{r.hc("Not",i,void 0)},1321887:(i,u,c)=>{r.hc("Clip",i,{min:u,max:c})},1321956:i=>{r.hc("Clip",i,void 0)},1322008:(i,u)=>{r.hc("Elu",i,{alpha:u})},1322066:i=>{r.hc("Gelu",i,void 0)},1322118:i=>{r.hc("Relu",i,void 0)},1322170:(i,u)=>{r.hc("LeakyRelu",i,{alpha:u})},1322234:(i,u)=>{r.hc("ThresholdedRelu",i,{alpha:u})},1322304:(i,u)=>{r.hc("Cast",i,{to:u})},1322362:i=>{r.hc("Add",i,void 0)},1322413:i=>{r.hc("Sub",i,void 0)},1322464:i=>{r.hc("Mul",i,void 0)},1322515:i=>{r.hc("Div",i,void 0)},1322566:i=>{r.hc("Pow",i,void 0)},1322617:i=>{r.hc("Equal",i,void 0)},1322670:i=>{r.hc("Greater",i,void 0)},1322725:i=>{r.hc("GreaterOrEqual",i,void 0)},1322787:i=>{r.hc("Less",i,void 0)},1322839:i=>{r.hc("LessOrEqual",i,void 0)},1322898:(i,u,c,m,g)=>{r.hc("ReduceMean",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323073:(i,u,c,m,g)=>{r.hc("ReduceMax",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323247:(i,u,c,m,g)=>{r.hc("ReduceMin",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323421:(i,u,c,m,g)=>{r.hc("ReduceProd",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323596:(i,u,c,m,g)=>{r.hc("ReduceSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323770:(i,u,c,m,g)=>{r.hc("ReduceL1",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323943:(i,u,c,m,g)=>{r.hc("ReduceL2",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324116:(i,u,c,m,g)=>{r.hc("ReduceLogSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324293:(i,u,c,m,g)=>{r.hc("ReduceSumSquare",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324473:(i,u,c,m,g)=>{r.hc("ReduceLogSumExp",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324653:i=>{r.hc("Where",i,void 0)},1324706:(i,u,c)=>{r.hc("Transpose",i,{perm:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1324830:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ae(c),format:m?"NHWC":"NCHW"})},1324963:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ae(c),format:m?"NHWC":"NCHW"})},1325096:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e,Le)=>{r.hc("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,I],strides:[z],wIsConst:()=>!!Z()[L>>>0],outputPadding:q?Array.from(D().subarray(Number(q)>>>0,Number(X)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number($e)>>>0)):[],activation:Ae(Le)})},1325529:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!Z()[B>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[],activation:Ae($e)})},1326190:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e,Le)=>{r.hc("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,I],strides:[z],wIsConst:()=>!!Z()[L>>>0],outputPadding:q?Array.from(D().subarray(Number(q)>>>0,Number(X)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number($e)>>>0)):[],activation:Ae(Le)})},1326623:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!Z()[B>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[],activation:Ae($e)})},1327284:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1327375:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("AveragePool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[]})},1327854:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1327945:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("AveragePool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[]})},1328424:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1328511:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("MaxPool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[]})},1328986:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1329073:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>{r.hc("MaxPool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(ue)>>>0)):[]})},1329548:(i,u,c,m,g)=>{r.hc("Gemm",i,{alpha:u,beta:c,transA:m,transB:g})},1329652:i=>{r.hc("MatMul",i,void 0)},1329706:(i,u,c,m)=>{r.hc("ArgMax",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1329814:(i,u,c,m)=>{r.hc("ArgMin",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1329922:(i,u)=>{r.hc("Softmax",i,{axis:u})},1329985:(i,u)=>{r.hc("Concat",i,{axis:u})},1330045:(i,u,c,m,g)=>{r.hc("Split",i,{axis:u,numOutputs:c,splitSizes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330201:i=>{r.hc("Expand",i,void 0)},1330255:(i,u)=>{r.hc("Gather",i,{axis:Number(u)})},1330326:(i,u)=>{r.hc("GatherElements",i,{axis:Number(u)})},1330405:(i,u)=>{r.hc("GatherND",i,{batch_dims:Number(u)})},1330484:(i,u,c,m,g,x,I,z,B,L,q)=>{r.hc("Resize",i,{antialias:u,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ae(g),cubicCoeffA:x,excludeOutside:I,extrapolationValue:z,keepAspectRatioPolicy:Ae(B),mode:Ae(L),nearestMode:Ae(q)})},1330846:(i,u,c,m,g,x,I)=>{r.hc("Slice",i,{starts:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[]})},1331110:i=>{r.hc("Tile",i,void 0)},1331162:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1331276:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1331390:i=>{r.hc("Range",i,void 0)},1331443:(i,u)=>{r.hc("Einsum",i,{equation:Ae(u)})},1331524:(i,u,c,m,g)=>{r.hc("Pad",i,{mode:u,value:c,pads:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1331667:(i,u,c,m,g,x)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1331836:(i,u,c,m,g,x)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1332005:(i,u,c)=>{r.hc("CumSum",i,{exclusive:Number(u),reverse:Number(c)})},1332102:(i,u,c)=>{r.hc("DequantizeLinear",i,{axis:u,blockSize:c})},1332192:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ae(c),padding_mode:Ae(m),format:g?"NHWC":"NCHW"})},1332362:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ae(c),padding_mode:Ae(m),format:g?"NHWC":"NCHW"})},1332532:(i,u)=>{r.hc("ScatterND",i,{reduction:Ae(u)})},1332617:(i,u,c,m,g,x,I,z,B)=>{r.hc("Attention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x,qkvHiddenSizes:I?Array.from(D().subarray(Number(z)>>>0,Number(z)+I>>>0)):[],pastPresentShareBuffer:!!B})},1332889:i=>{r.hc("BiasAdd",i,void 0)},1332944:i=>{r.hc("BiasSplitGelu",i,void 0)},1333005:i=>{r.hc("FastGelu",i,void 0)},1333061:(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e,Le,jt)=>{r.hc("Conv",i,{format:X?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],group:g,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],pads:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],strides:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],w_is_const:()=>!!Z()[Number(ue)>>>0],activation:Ae($e),activation_params:Le?Array.from(Y().subarray(Number(Le)>>>0,Number(jt)>>>0)):[]})},1333645:i=>{r.hc("Gelu",i,void 0)},1333697:(i,u,c,m,g,x,I,z,B)=>{r.hc("GroupQueryAttention",i,{numHeads:u,kvNumHeads:c,scale:m,softcap:g,doRotary:x,rotaryInterleaved:I,smoothSoftmax:z,localWindowSize:B})},1333914:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1334025:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1334136:(i,u,c,m,g,x)=>{r.hc("MatMulNBits",i,{k:u,n:c,accuracyLevel:m,bits:g,blockSize:x})},1334263:(i,u,c,m,g,x)=>{r.hc("MultiHeadAttention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x})},1334422:(i,u)=>{r.hc("QuickGelu",i,{alpha:u})},1334486:(i,u,c,m,g)=>{r.hc("RotaryEmbedding",i,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:m,scale:g})},1334625:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1334727:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1334829:(i,u,c,m)=>{r.hc("GatherBlockQuantized",i,{gatherAxis:u,quantizeAxis:c,blockSize:m})},1334950:i=>{r.Wd(i)},1334984:(i,u)=>r.Zd(Number(i),Number(u),r.Cd.be,r.Cd.errors)};function dp(i,u,c){return gi(async()=>{await r.Ud(Number(i),Number(u),Number(c))})}function lp(){return typeof wasmOffsetConverter<"u"}class gn{name="ExitStatus";constructor(u){this.message=`Program terminated with exit(${u})`,this.status=u}}var Ro=i=>{i.terminate(),i.onmessage=()=>{}},yn=[],Uo=i=>{ft.length==0&&(Ho(),Go(ft[0]));var u=ft.pop();if(!u)return 6;Ft.push(u),St[i.xd]=u,u.xd=i.xd;var c={yd:"run",de:i.ce,Fd:i.Fd,xd:i.xd};return u.postMessage(c,i.Ld),0},mt=0,Te=(i,u,...c)=>{for(var m=2*c.length,g=ie(),x=Mn(8*m),I=x>>>3,z=0;z<c.length;z++){var B=c[z];typeof B=="bigint"?(W[I+2*z]=1n,W[I+2*z+1]=B):(W[I+2*z]=0n,fe()[I+2*z+1>>>0]=B)}return i=Ui(i,0,m,x,u),oe(g),i};function bn(i){if(d)return Te(0,1,i);if(A=i,!(0<mt)){for(var u of Ft)Ro(u);for(u of ft)Ro(u);ft=[],Ft=[],St={},ee=!0}_(0,new gn(i))}function No(i){if(d)return Te(1,0,i);_n(i)}var _n=i=>{if(A=i,d)throw No(i),"unwind";bn(i)},ft=[],Ft=[],Vo=[],St={},Wo=i=>{var u=i.xd;delete St[u],ft.push(i),Ft.splice(Ft.indexOf(i),1),i.xd=0,Ni(u)};function Lo(){Vo.forEach(i=>i())}var Go=i=>new Promise(u=>{i.onmessage=g=>{var x=(g=g.data).yd;if(g.Ed&&g.Ed!=gr()){var I=St[g.Ed];I?I.postMessage(g,g.Ld):v(`Internal error! Worker sent a message "${x}" to target pthread ${g.Ed}, but that thread no longer exists!`)}else x==="checkMailbox"?ur():x==="spawnThread"?Uo(g):x==="cleanupThread"?Wo(St[g.ee]):x==="loaded"?(i.loaded=!0,u(i)):x==="alert"?alert(`Thread ${g.fe}: ${g.text}`):g.target==="setimmediate"?i.postMessage(g):x==="callHandler"?r[g.Nd](...g.args):x&&v(`worker sent an unknown command ${x}`)},i.onerror=g=>{throw v(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var c,m=[];for(c of[])r.propertyIsEnumerable(c)&&m.push(c);i.postMessage({yd:"load",Od:m,he:T,ie:C})});function Ho(){var i=new Worker(import.meta.url.startsWith("file:")?new URL("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ft.push(i)}var cp=i=>{be();var u=R()[i+52>>>2>>>0];i=R()[i+56>>>2>>>0],Li(u,u-i),oe(u)},pp=(i,u)=>{mt=0,i=Rn(i,u),0<mt?A=i:Bn(i)},sr=[];function mp(i){var u=new wn(i>>>=0);if(Z()[u.wd+12>>>0]==0){var c=1;Z()[u.wd+12>>>0]=c}return c=0,Z()[u.wd+13>>>0]=c,sr.push(u),Hi(i),qi(i)}var Dt=0,fp=()=>{se(0,0);var i=sr.pop();Gi(i.Gd),Dt=0};class wn{constructor(u){this.Gd=u,this.wd=u-24}}function hp(i){throw Dt||=i>>>0,Dt}var vn=i=>{var u=Dt;if(!u)return Kt(0),0;var c=new wn(u);R()[c.wd+16>>>2>>>0]=u;var m=R()[c.wd+4>>>2>>>0];if(!m)return Kt(0),u;for(var g of i){if(g===0||g===m)break;if(Fi(g,m,c.wd+16))return Kt(g),u}return Kt(m),u};function gp(){return vn([])}function yp(i){return vn([i>>>0])}function bp(i,u){return vn([i>>>0,u>>>0])}var _p=()=>{var i=sr.pop();i||ut("no exception to throw");var u=i.Gd;if(Z()[i.wd+13>>>0]==0){sr.push(i);var c=1;Z()[i.wd+13>>>0]=c,c=0,Z()[i.wd+12>>>0]=c}throw Dt=u};function wp(i,u,c){var m=new wn(i>>>=0);throw u>>>=0,c>>>=0,R()[m.wd+16>>>2>>>0]=0,R()[m.wd+4>>>2>>>0]=u,R()[m.wd+8>>>2>>>0]=c,Dt=i}function Fo(i,u,c,m){return d?Te(2,1,i,u,c,m):qo(i,u,c,m)}function qo(i,u,c,m){if(i>>>=0,c>>>=0,m>>>=0,l===void 0)return 6;var g=[];return d&&g.length===0?Fo(i,u>>>=0,c,m):(i={ce:c,xd:i,Fd:m,Ld:g},d?(i.yd="spawnThread",postMessage(i,g),0):Uo(i))}var Ko=typeof TextDecoder<"u"?new TextDecoder:void 0,jo=(i,u=0,c=NaN)=>{var m=(u>>>=0)+c;for(c=u;i[c]&&!(c>=m);)++c;if(16<c-u&&i.buffer&&Ko)return Ko.decode(i.buffer instanceof ArrayBuffer?i.subarray(u,c):i.slice(u,c));for(m="";u<c;){var g=i[u++];if(128&g){var x=63&i[u++];if((224&g)==192)m+=String.fromCharCode((31&g)<<6|x);else{var I=63&i[u++];65536>(g=(240&g)==224?(15&g)<<12|x<<6|I:(7&g)<<18|x<<12|I<<6|63&i[u++])?m+=String.fromCharCode(g):(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else m+=String.fromCharCode(g)}return m},Ae=(i,u)=>(i>>>=0)?jo(pe(),i,u):"";function Zo(i,u,c){return d?Te(3,1,i,u,c):0}function Qo(i,u){if(d)return Te(4,1,i,u)}var Yo=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);127>=m?u++:2047>=m?u+=2:55296<=m&&57343>=m?(u+=4,++c):u+=3}return u},Bt=(i,u,c)=>{var m=pe();if(u>>>=0,0<c){var g=u;c=u+c-1;for(var x=0;x<i.length;++x){var I=i.charCodeAt(x);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&i.charCodeAt(++x)),127>=I){if(u>=c)break;m[u++>>>0]=I}else{if(2047>=I){if(u+1>=c)break;m[u++>>>0]=192|I>>6}else{if(65535>=I){if(u+2>=c)break;m[u++>>>0]=224|I>>12}else{if(u+3>=c)break;m[u++>>>0]=240|I>>18,m[u++>>>0]=128|I>>12&63}m[u++>>>0]=128|I>>6&63}m[u++>>>0]=128|63&I}}m[u>>>0]=0,i=u-g}else i=0;return i};function Xo(i,u){if(d)return Te(5,1,i,u)}function Jo(i,u,c){if(d)return Te(6,1,i,u,c)}function ei(i,u,c){return d?Te(7,1,i,u,c):0}function ti(i,u){if(d)return Te(8,1,i,u)}function ri(i,u,c){if(d)return Te(9,1,i,u,c)}function ni(i,u,c,m){if(d)return Te(10,1,i,u,c,m)}function oi(i,u,c,m){if(d)return Te(11,1,i,u,c,m)}function ii(i,u,c,m){if(d)return Te(12,1,i,u,c,m)}function ai(i){if(d)return Te(13,1,i)}function si(i,u){if(d)return Te(14,1,i,u)}function ui(i,u,c){if(d)return Te(15,1,i,u,c)}var di,ht,vp=()=>ut(""),Xe=i=>{for(var u="";pe()[i>>>0];)u+=di[pe()[i++>>>0]];return u},$n={},xn={},$p={};function dt(i,u,c={}){return function(m,g,x={}){var I=g.name;if(!m)throw new ht(`type "${I}" must have a positive integer typeid pointer`);if(xn.hasOwnProperty(m)){if(x.Pd)return;throw new ht(`Cannot register type '${I}' twice`)}xn[m]=g,delete $p[m],$n.hasOwnProperty(m)&&(g=$n[m],delete $n[m],g.forEach(z=>z()))}(i,u,c)}var li=(i,u,c)=>{switch(u){case 1:return c?m=>Z()[m>>>0]:m=>pe()[m>>>0];case 2:return c?m=>ke()[m>>>1>>>0]:m=>Se()[m>>>1>>>0];case 4:return c?m=>D()[m>>>2>>>0]:m=>R()[m>>>2>>>0];case 8:return c?m=>W[m>>>3]:m=>J[m>>>3];default:throw new TypeError(`invalid integer width (${u}): ${i}`)}};function xp(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:function(m,g){if(typeof g!="bigint"&&typeof g!="number")throw g=g===null?"null":(m=typeof g)=="object"||m==="array"||m==="function"?g.toString():""+g,new TypeError(`Cannot convert "${g}" to ${this.name}`);return typeof g=="number"&&(g=BigInt(g)),g},zd:gt,readValueFromPointer:li(u,c,u.indexOf("u")==-1),Ad:null})}var gt=8;function Sp(i,u,c,m){dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(g){return!!g},toWireType:function(g,x){return x?c:m},zd:gt,readValueFromPointer:function(g){return this.fromWireType(pe()[g>>>0])},Ad:null})}var Sn=[],lt=[];function Tn(i){9<(i>>>=0)&&--lt[i+1]==0&&(lt[i]=void 0,Sn.push(i))}var Re=i=>{if(!i)throw new ht("Cannot use deleted val. handle = "+i);return lt[i]},We=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=Sn.pop()||lt.length;return lt[u]=i,lt[u+1]=1,u}};function Cn(i){return this.fromWireType(R()[i>>>2>>>0])}var Tp={name:"emscripten::val",fromWireType:i=>{var u=Re(i);return Tn(i),u},toWireType:(i,u)=>We(u),zd:gt,readValueFromPointer:Cn,Ad:null};function Cp(i){return dt(i>>>0,Tp)}var Ip=(i,u)=>{switch(u){case 4:return function(c){return this.fromWireType(Y()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(fe()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${i}`)}};function Ap(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:(m,g)=>g,zd:gt,readValueFromPointer:Ip(u,c),Ad:null})}function kp(i,u,c,m,g){if(i>>>=0,c>>>=0,u=Xe(u>>>0),g===-1&&(g=4294967295),g=z=>z,m===0){var x=32-8*c;g=z=>z<<x>>>x}var I=u.includes("unsigned")?function(z,B){return B>>>0}:function(z,B){return B};dt(i,{name:u,fromWireType:g,toWireType:I,zd:gt,readValueFromPointer:li(u,c,m!==0),Ad:null})}function Ep(i,u,c){function m(x){var I=R()[x>>>2>>>0];return x=R()[x+4>>>2>>>0],new g(Z().buffer,x,I)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];dt(i>>>=0,{name:c=Xe(c>>>0),fromWireType:m,zd:gt,readValueFromPointer:m},{Pd:!0})}function Pp(i,u){dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(c){for(var m,g=R()[c>>>2>>>0],x=c+4,I=x,z=0;z<=g;++z){var B=x+z;z!=g&&pe()[B>>>0]!=0||(I=Ae(I,B-I),m===void 0?m=I:(m+="\0",m+=I),I=B+1)}return et(c),m},toWireType:function(c,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var g=typeof m=="string";if(!(g||m instanceof Uint8Array||m instanceof Uint8ClampedArray||m instanceof Int8Array))throw new ht("Cannot pass non-string to std::string");var x=g?Yo(m):m.length,I=yr(4+x+1),z=I+4;if(R()[I>>>2>>>0]=x,g)Bt(m,z,x+1);else if(g)for(g=0;g<x;++g){var B=m.charCodeAt(g);if(255<B)throw et(I),new ht("String has UTF-16 code units that do not fit in 8 bits");pe()[z+g>>>0]=B}else for(g=0;g<x;++g)pe()[z+g>>>0]=m[g];return c!==null&&c.push(et,I),I},zd:gt,readValueFromPointer:Cn,Ad(c){et(c)}})}var ci=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,zp=(i,u)=>{for(var c=i>>1,m=c+u/2;!(c>=m)&&Se()[c>>>0];)++c;if(32<(c<<=1)-i&&ci)return ci.decode(pe().slice(i,c));for(c="",m=0;!(m>=u/2);++m){var g=ke()[i+2*m>>>1>>>0];if(g==0)break;c+=String.fromCharCode(g)}return c},Op=(i,u,c)=>{if(c??=2147483647,2>c)return 0;var m=u;c=(c-=2)<2*i.length?c/2:i.length;for(var g=0;g<c;++g){var x=i.charCodeAt(g);ke()[u>>>1>>>0]=x,u+=2}return ke()[u>>>1>>>0]=0,u-m},Dp=i=>2*i.length,Bp=(i,u)=>{for(var c=0,m="";!(c>=u/4);){var g=D()[i+4*c>>>2>>>0];if(g==0)break;++c,65536<=g?(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g)):m+=String.fromCharCode(g)}return m},Mp=(i,u,c)=>{if(u>>>=0,c??=2147483647,4>c)return 0;var m=u;c=m+c-4;for(var g=0;g<i.length;++g){var x=i.charCodeAt(g);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&i.charCodeAt(++g)),D()[u>>>2>>>0]=x,(u+=4)+4>c)break}return D()[u>>>2>>>0]=0,u-m},Rp=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);55296<=m&&57343>=m&&++c,u+=4}return u};function Up(i,u,c){if(i>>>=0,u>>>=0,c=Xe(c>>>=0),u===2)var m=zp,g=Op,x=Dp,I=z=>Se()[z>>>1>>>0];else u===4&&(m=Bp,g=Mp,x=Rp,I=z=>R()[z>>>2>>>0]);dt(i,{name:c,fromWireType:z=>{for(var B,L=R()[z>>>2>>>0],q=z+4,X=0;X<=L;++X){var ue=z+4+X*u;X!=L&&I(ue)!=0||(q=m(q,ue-q),B===void 0?B=q:(B+="\0",B+=q),q=ue+u)}return et(z),B},toWireType:(z,B)=>{if(typeof B!="string")throw new ht(`Cannot pass non-string to C++ string type ${c}`);var L=x(B),q=yr(4+L+u);return R()[q>>>2>>>0]=L/u,g(B,q+4,L+u),z!==null&&z.push(et,q),q},zd:gt,readValueFromPointer:Cn,Ad(z){et(z)}})}function Np(i,u){dt(i>>>=0,{Qd:!0,name:u=Xe(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function Vp(i){Dn(i>>>0,!s,1,!a,131072,!1),Lo()}var In=i=>{if(!ee)try{if(i(),!(0<mt))try{d?Bn(A):_n(A)}catch(u){u instanceof gn||u=="unwind"||_(0,u)}}catch(u){u instanceof gn||u=="unwind"||_(0,u)}};function An(i){i>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(D(),i>>>2,i).value.then(ur),i+=128,Atomics.store(D(),i>>>2,1))}var ur=()=>{var i=gr();i&&(An(i),In(Wi))};function Wp(i,u){(i>>>=0)==u>>>0?setTimeout(ur):d?postMessage({Ed:i,yd:"checkMailbox"}):(i=St[i])&&i.postMessage({yd:"checkMailbox"})}var kn=[];function Lp(i,u,c,m,g){for(u>>>=0,m/=2,kn.length=m,c=g>>>0>>>3,g=0;g<m;g++)kn[g]=W[c+2*g]?W[c+2*g+1]:fe()[c+2*g+1>>>0];return(u?hn[u]:Bm[i])(...kn)}var Gp=()=>{mt=0};function Hp(i){i>>>=0,d?postMessage({yd:"cleanupThread",ee:i}):Wo(St[i])}function Fp(i){}var dr=(i,u)=>{var c=xn[i];if(c===void 0)throw i=Bi(i),c=Xe(i),et(i),new ht(`${u} has unknown type ${c}`);return c},pi=(i,u,c)=>{var m=[];return i=i.toWireType(m,c),m.length&&(R()[u>>>2>>>0]=We(m)),i};function qp(i,u,c){return u>>>=0,c>>>=0,i=Re(i>>>0),u=dr(u,"emval::as"),pi(u,c,i)}function Kp(i,u){return u>>>=0,i=Re(i>>>0),(u=dr(u,"emval::as")).toWireType(null,i)}var lr=i=>{try{i()}catch(u){ut(u)}},yt=0,Je=null,mi=0,cr=[],fi={},hi={},jp=0,En=null,Zp=[];function gi(i){return function(u){if(!ee){if(yt===0){var c=!1,m=!1;u((g=0)=>{if(!ee&&(mi=g,c=!0,m)){yt=2,lr(()=>Na(Je)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),g=!1;try{var x=function(){var B=D()[Je+8>>>2>>>0];return B=U[hi[B]],--mt,B()}()}catch(B){x=B,g=!0}var I=!1;if(!Je){var z=En;z&&(En=null,(g?z.reject:z.resolve)(x),I=!0)}if(g&&!I)throw x}}),m=!0,c||(yt=1,Je=function(){var g=yr(65548),x=g+12;R()[g>>>2>>>0]=x,R()[g+4>>>2>>>0]=x+65536,x=cr[0];var I=fi[x];return I===void 0&&(I=jp++,fi[x]=I,hi[I]=x),x=I,D()[g+8>>>2>>>0]=x,g}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),lr(()=>Ra(Je)))}else yt===2?(yt=0,lr(Va),et(Je),Je=null,Zp.forEach(In)):ut(`invalid state: ${yt}`);return mi}}(u=>{i().then(u)})}function Qp(i){return i>>>=0,gi(async()=>{var u=await Re(i);return We(u)})}var pr=[];function Yp(i,u,c,m){return c>>>=0,m>>>=0,(i=pr[i>>>0])(null,u=Re(u>>>0),c,m)}var Xp={},mr=i=>{var u=Xp[i];return u===void 0?Xe(i):u};function Jp(i,u,c,m,g){return c>>>=0,m>>>=0,g>>>=0,(i=pr[i>>>0])(u=Re(u>>>0),u[c=mr(c)],m,g)}var yi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function em(i){return(i>>>=0)==0?We(yi()):(i=mr(i),We(yi()[i]))}var tm=i=>{var u=pr.length;return pr.push(i),u},rm=(i,u)=>{for(var c=Array(i),m=0;m<i;++m)c[m]=dr(R()[u+4*m>>>2>>>0],"parameter "+m);return c},bi=(i,u)=>Object.defineProperty(u,"name",{value:i});function nm(i,u,c){var m=(u=rm(i,u>>>0)).shift();i--;var g=`return function (obj, func, destructorsRef, args) {
`,x=0,I=[];c===0&&I.push("obj");for(var z=["retType"],B=[m],L=0;L<i;++L)I.push("arg"+L),z.push("argType"+L),B.push(u[L]),g+=`  var arg${L} = argType${L}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[L].zd;return g+=`  var rv = ${c===1?"new func":"func.call"}(${I.join(", ")});
`,m.Qd||(z.push("emval_returnValue"),B.push(pi),g+=`  return emval_returnValue(retType, destructorsRef, rv);
`),z.push(g+`};
`),i=function(q){var X=Function;if(!(X instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof X} which is not a function`);var ue=bi(X.name||"unknownFunctionName",function(){});return ue.prototype=X.prototype,ue=new ue,(q=X.apply(ue,q))instanceof Object?q:ue}(z)(...B),c=`methodCaller<(${u.map(q=>q.name).join(", ")}) => ${m.name}>`,tm(bi(c,i))}function om(i){return i=mr(i>>>0),We(r[i])}function im(i,u){return u>>>=0,i=Re(i>>>0),u=Re(u),We(i[u])}function am(i){9<(i>>>=0)&&(lt[i+1]+=1)}function sm(){return We([])}function um(i){i=Re(i>>>0);for(var u=Array(i.length),c=0;c<i.length;c++)u[c]=i[c];return We(u)}function dm(i){return We(mr(i>>>0))}function lm(){return We({})}function cm(i){for(var u=Re(i>>>=0);u.length;){var c=u.pop();u.pop()(c)}Tn(i)}function pm(i,u,c){u>>>=0,c>>>=0,i=Re(i>>>0),u=Re(u),c=Re(c),i[u]=c}function mm(i,u){return u>>>=0,i=(i=dr(i>>>0,"_emval_take_value")).readValueFromPointer(u),We(i)}function fm(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),D()[u>>>2>>>0]=i.getUTCSeconds(),D()[u+4>>>2>>>0]=i.getUTCMinutes(),D()[u+8>>>2>>>0]=i.getUTCHours(),D()[u+12>>>2>>>0]=i.getUTCDate(),D()[u+16>>>2>>>0]=i.getUTCMonth(),D()[u+20>>>2>>>0]=i.getUTCFullYear()-1900,D()[u+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[u+28>>>2>>>0]=i}var _i=i=>i%4==0&&(i%100!=0||i%400==0),wi=[0,31,60,91,121,152,182,213,244,274,305,335],vi=[0,31,59,90,120,151,181,212,243,273,304,334];function hm(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),D()[u>>>2>>>0]=i.getSeconds(),D()[u+4>>>2>>>0]=i.getMinutes(),D()[u+8>>>2>>>0]=i.getHours(),D()[u+12>>>2>>>0]=i.getDate(),D()[u+16>>>2>>>0]=i.getMonth(),D()[u+20>>>2>>>0]=i.getFullYear()-1900,D()[u+24>>>2>>>0]=i.getDay();var c=(_i(i.getFullYear())?wi:vi)[i.getMonth()]+i.getDate()-1|0;D()[u+28>>>2>>>0]=c,D()[u+36>>>2>>>0]=-60*i.getTimezoneOffset(),c=new Date(i.getFullYear(),6,1).getTimezoneOffset();var m=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(c!=m&&i.getTimezoneOffset()==Math.min(m,c)),D()[u+32>>>2>>>0]=i}function gm(i){i>>>=0;var u=new Date(D()[i+20>>>2>>>0]+1900,D()[i+16>>>2>>>0],D()[i+12>>>2>>>0],D()[i+8>>>2>>>0],D()[i+4>>>2>>>0],D()[i>>>2>>>0],0),c=D()[i+32>>>2>>>0],m=u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),I=Math.min(x,g);return 0>c?D()[i+32>>>2>>>0]=+(g!=x&&I==m):0<c!=(I==m)&&(g=Math.max(x,g),u.setTime(u.getTime()+6e4*((0<c?I:g)-m))),D()[i+24>>>2>>>0]=u.getDay(),c=(_i(u.getFullYear())?wi:vi)[u.getMonth()]+u.getDate()-1|0,D()[i+28>>>2>>>0]=c,D()[i>>>2>>>0]=u.getSeconds(),D()[i+4>>>2>>>0]=u.getMinutes(),D()[i+8>>>2>>>0]=u.getHours(),D()[i+12>>>2>>>0]=u.getDate(),D()[i+16>>>2>>>0]=u.getMonth(),D()[i+20>>>2>>>0]=u.getYear(),i=u.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function $i(i,u,c,m,g,x,I){return d?Te(16,1,i,u,c,m,g,x,I):-52}function xi(i,u,c,m,g,x){if(d)return Te(17,1,i,u,c,m,g,x)}var qt={},ym=()=>performance.timeOrigin+performance.now();function Si(i,u){if(d)return Te(18,1,i,u);if(qt[i]&&(clearTimeout(qt[i].id),delete qt[i]),!u)return 0;var c=setTimeout(()=>{delete qt[i],In(()=>Vi(i,performance.timeOrigin+performance.now()))},u);return qt[i]={id:c,ke:u},0}function bm(i,u,c,m){i>>>=0,u>>>=0,c>>>=0,m>>>=0;var g=new Date().getFullYear(),x=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var I=Math.max(x,g);R()[i>>>2>>>0]=60*I,D()[u>>>2>>>0]=+(x!=g),i=(u=z=>{var B=Math.abs(z);return`UTC${0<=z?"-":"+"}${String(Math.floor(B/60)).padStart(2,"0")}${String(B%60).padStart(2,"0")}`})(x),u=u(g),g<x?(Bt(i,c,17),Bt(u,m,17)):(Bt(i,m,17),Bt(u,c,17))}var _m=()=>Date.now(),wm=1;function vm(i,u,c){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!wm)return 52;i=performance.timeOrigin+performance.now()}return W[c>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var Pn=[],Ti=(i,u)=>{Pn.length=0;for(var c;c=pe()[i++>>>0];){var m=c!=105;u+=(m&=c!=112)&&u%8?4:0,Pn.push(c==112?R()[u>>>2>>>0]:c==106?W[u>>>3]:c==105?D()[u>>>2>>>0]:fe()[u>>>3>>>0]),u+=m?8:4}return Pn};function $m(i,u,c){return i>>>=0,u=Ti(u>>>0,c>>>0),hn[i](...u)}function xm(i,u,c){return i>>>=0,u=Ti(u>>>0,c>>>0),hn[i](...u)}var Sm=()=>{};function Tm(i,u){return v(Ae(i>>>0,u>>>0))}var Cm=()=>{throw mt+=1,"unwind"};function Im(){return 4294901760}var Am=()=>navigator.hardwareConcurrency;function km(){return ut("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Em(i){i>>>=0;var u=pe().length;if(i<=u||4294901760<i)return!1;for(var c=1;4>=c;c*=2){var m=u*(1+.2/c);m=Math.min(m,i+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(i,m)/65536))-T.buffer.byteLength+65535)/65536|0;try{T.grow(m),be();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}var fr=()=>(ut("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Mt={},Ci=i=>{i.forEach(u=>{var c=fr();c&&(Mt[c]=u)})};function Pm(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Ci(i),Mt.Kd=fr(),Mt.ae=i,Mt.Kd}function zm(i,u,c){if(i>>>=0,u>>>=0,Mt.Kd==i)var m=Mt.ae;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Ci(m);for(var g=3;m[g]&&fr()!=i;)++g;for(i=0;i<c&&m[i+g];++i)D()[u+4*i>>>2>>>0]=fr();return i}var zn,On={},Ii=()=>{if(!zn){var i,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in On)On[i]===void 0?delete u[i]:u[i]=On[i];var c=[];for(i in u)c.push(`${i}=${u[i]}`);zn=c}return zn};function Ai(i,u){if(d)return Te(19,1,i,u);i>>>=0,u>>>=0;var c=0;return Ii().forEach((m,g)=>{var x=u+c;for(g=R()[i+4*g>>>2>>>0]=x,x=0;x<m.length;++x)Z()[g++>>>0]=m.charCodeAt(x);Z()[g>>>0]=0,c+=m.length+1}),0}function ki(i,u){if(d)return Te(20,1,i,u);i>>>=0,u>>>=0;var c=Ii();R()[i>>>2>>>0]=c.length;var m=0;return c.forEach(g=>m+=g.length+1),R()[u>>>2>>>0]=m,0}function Ei(i){return d?Te(21,1,i):52}function Pi(i,u,c,m){return d?Te(22,1,i,u,c,m):52}function zi(i,u,c,m){return d?Te(23,1,i,u,c,m):70}var Om=[null,[],[]];function Oi(i,u,c,m){if(d)return Te(24,1,i,u,c,m);u>>>=0,c>>>=0,m>>>=0;for(var g=0,x=0;x<c;x++){var I=R()[u>>>2>>>0],z=R()[u+4>>>2>>>0];u+=8;for(var B=0;B<z;B++){var L=pe()[I+B>>>0],q=Om[i];L===0||L===10?((i===1?$:v)(jo(q)),q.length=0):q.push(L)}g+=z}return R()[m>>>2>>>0]=g,0}function Dm(i){return i>>>0}d||function(){for(var i=r.numThreads-1;i--;)Ho();yn.unshift(()=>{xt++,function(u){d?u():Promise.all(ft.map(Go)).then(u)}(()=>Bo())})}();for(var Di=Array(256),hr=0;256>hr;++hr)Di[hr]=String.fromCharCode(hr);di=Di,ht=r.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}},r.InternalError=class extends Error{constructor(i){super(i),this.name="InternalError"}},lt.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>lt.length/2-5-Sn.length;var U,Bm=[bn,No,Fo,Zo,Qo,Xo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,$i,xi,Si,Ai,ki,Ei,Pi,zi,Oi];(async function(){function i(m,g){return U=m.exports,U=function(){var x=U,I={};for(let[z,B]of Object.entries(x))I[z]=typeof B=="function"?(...L)=>{cr.push(z);try{return B(...L)}finally{ee||(cr.pop(),Je&&yt===1&&cr.length===0&&(yt=0,mt+=1,lr(Ua),typeof Fibers<"u"&&Fibers.le()))}}:B;return I}(),U=function(){var x=U,I=B=>L=>B(L)>>>0,z=B=>()=>B()>>>0;return(x=Object.assign({},x)).Cb=I(x.Cb),x.fc=z(x.fc),x.ic=I(x.ic),x.vc=I(x.vc),x.wc=z(x.wc),x.Ac=I(x.Ac),x}(),Vo.push(U.jc),C=g,Bo(),U}xt++;var u=Mo();if(r.instantiateWasm)return new Promise(m=>{r.instantiateWasm(u,(g,x)=>{i(g,x),m(g.exports)})});if(d)return new Promise(m=>{Fe=g=>{var x=new WebAssembly.Instance(g,Mo());m(i(x,g))}});Gt??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",b):b+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var c=await async function(m){var g=Gt;if(!Q&&typeof WebAssembly.instantiateStreaming=="function"&&!le(g))try{var x=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,m)}catch(I){v(`wasm streaming compile failed: ${I}`),v("falling back to ArrayBuffer instantiation")}return async function(I,z){try{var B=await async function(L){if(!Q)try{var q=await f(L);return new Uint8Array(q)}catch{}if(L==Gt&&Q)L=new Uint8Array(Q);else{if(!h)throw"both async and sync fetching of the wasm failed";L=h(L)}return L}(I);return await WebAssembly.instantiate(B,z)}catch(L){v(`failed to asynchronously prepare wasm: ${L}`),ut(L)}}(g,m)}(u);return i(c.instance,c.module)}catch(m){return n(m),Promise.reject(m)}})();var Bi=i=>(Bi=U.Cb)(i),Mi=()=>(Mi=U.Db)();r._OrtInit=(i,u)=>(r._OrtInit=U.Eb)(i,u),r._OrtGetLastError=(i,u)=>(r._OrtGetLastError=U.Fb)(i,u),r._OrtCreateSessionOptions=(i,u,c,m,g,x,I,z,B,L)=>(r._OrtCreateSessionOptions=U.Gb)(i,u,c,m,g,x,I,z,B,L),r._OrtAppendExecutionProvider=(i,u)=>(r._OrtAppendExecutionProvider=U.Hb)(i,u),r._OrtAddFreeDimensionOverride=(i,u,c)=>(r._OrtAddFreeDimensionOverride=U.Ib)(i,u,c),r._OrtAddSessionConfigEntry=(i,u,c)=>(r._OrtAddSessionConfigEntry=U.Jb)(i,u,c),r._OrtReleaseSessionOptions=i=>(r._OrtReleaseSessionOptions=U.Kb)(i),r._OrtCreateSession=(i,u,c)=>(r._OrtCreateSession=U.Lb)(i,u,c),r._OrtReleaseSession=i=>(r._OrtReleaseSession=U.Mb)(i),r._OrtGetInputOutputCount=(i,u,c)=>(r._OrtGetInputOutputCount=U.Nb)(i,u,c),r._OrtGetInputName=(i,u)=>(r._OrtGetInputName=U.Ob)(i,u),r._OrtGetOutputName=(i,u)=>(r._OrtGetOutputName=U.Pb)(i,u),r._OrtFree=i=>(r._OrtFree=U.Qb)(i),r._OrtCreateTensor=(i,u,c,m,g,x)=>(r._OrtCreateTensor=U.Rb)(i,u,c,m,g,x),r._OrtGetTensorData=(i,u,c,m,g)=>(r._OrtGetTensorData=U.Sb)(i,u,c,m,g),r._OrtReleaseTensor=i=>(r._OrtReleaseTensor=U.Tb)(i),r._OrtCreateRunOptions=(i,u,c,m)=>(r._OrtCreateRunOptions=U.Ub)(i,u,c,m),r._OrtAddRunConfigEntry=(i,u,c)=>(r._OrtAddRunConfigEntry=U.Vb)(i,u,c),r._OrtReleaseRunOptions=i=>(r._OrtReleaseRunOptions=U.Wb)(i),r._OrtCreateBinding=i=>(r._OrtCreateBinding=U.Xb)(i),r._OrtBindInput=(i,u,c)=>(r._OrtBindInput=U.Yb)(i,u,c),r._OrtBindOutput=(i,u,c,m)=>(r._OrtBindOutput=U.Zb)(i,u,c,m),r._OrtClearBoundOutputs=i=>(r._OrtClearBoundOutputs=U._b)(i),r._OrtReleaseBinding=i=>(r._OrtReleaseBinding=U.$b)(i),r._OrtRunWithBinding=(i,u,c,m,g)=>(r._OrtRunWithBinding=U.ac)(i,u,c,m,g),r._OrtRun=(i,u,c,m,g,x,I,z)=>(r._OrtRun=U.bc)(i,u,c,m,g,x,I,z),r._OrtEndProfiling=i=>(r._OrtEndProfiling=U.cc)(i),r._JsepOutput=(i,u,c)=>(r._JsepOutput=U.dc)(i,u,c),r._JsepGetNodeName=i=>(r._JsepGetNodeName=U.ec)(i);var gr=()=>(gr=U.fc)(),et=r._free=i=>(et=r._free=U.gc)(i),yr=r._malloc=i=>(yr=r._malloc=U.ic)(i),Dn=(i,u,c,m,g,x)=>(Dn=U.kc)(i,u,c,m,g,x),Ri=()=>(Ri=U.lc)(),Ui=(i,u,c,m,g)=>(Ui=U.mc)(i,u,c,m,g),Ni=i=>(Ni=U.nc)(i),Bn=i=>(Bn=U.oc)(i),Vi=(i,u)=>(Vi=U.pc)(i,u),Wi=()=>(Wi=U.qc)(),se=(i,u)=>(se=U.rc)(i,u),Kt=i=>(Kt=U.sc)(i),Li=(i,u)=>(Li=U.tc)(i,u),oe=i=>(oe=U.uc)(i),Mn=i=>(Mn=U.vc)(i),ie=()=>(ie=U.wc)(),Gi=i=>(Gi=U.xc)(i),Hi=i=>(Hi=U.yc)(i),Fi=(i,u,c)=>(Fi=U.zc)(i,u,c),qi=i=>(qi=U.Ac)(i),Ki=r.dynCall_iii=(i,u,c)=>(Ki=r.dynCall_iii=U.Bc)(i,u,c),ji=r.dynCall_vi=(i,u)=>(ji=r.dynCall_vi=U.Cc)(i,u),Rn=r.dynCall_ii=(i,u)=>(Rn=r.dynCall_ii=U.Dc)(i,u),Zi=r.dynCall_vii=(i,u,c)=>(Zi=r.dynCall_vii=U.Ec)(i,u,c),Qi=r.dynCall_iiii=(i,u,c,m)=>(Qi=r.dynCall_iiii=U.Fc)(i,u,c,m),Yi=r.dynCall_viii=(i,u,c,m)=>(Yi=r.dynCall_viii=U.Gc)(i,u,c,m),Xi=r.dynCall_iiiii=(i,u,c,m,g)=>(Xi=r.dynCall_iiiii=U.Hc)(i,u,c,m,g),Ji=r.dynCall_viiii=(i,u,c,m,g)=>(Ji=r.dynCall_viiii=U.Ic)(i,u,c,m,g),ea=r.dynCall_viiiiii=(i,u,c,m,g,x,I)=>(ea=r.dynCall_viiiiii=U.Jc)(i,u,c,m,g,x,I),ta=r.dynCall_viiiiiii=(i,u,c,m,g,x,I,z)=>(ta=r.dynCall_viiiiiii=U.Kc)(i,u,c,m,g,x,I,z),ra=r.dynCall_ji=(i,u)=>(ra=r.dynCall_ji=U.Lc)(i,u),na=r.dynCall_v=i=>(na=r.dynCall_v=U.Mc)(i),oa=r.dynCall_viiiii=(i,u,c,m,g,x)=>(oa=r.dynCall_viiiii=U.Nc)(i,u,c,m,g,x),ia=r.dynCall_i=i=>(ia=r.dynCall_i=U.Oc)(i),aa=r.dynCall_fii=(i,u,c)=>(aa=r.dynCall_fii=U.Pc)(i,u,c),sa=r.dynCall_viiiiiiii=(i,u,c,m,g,x,I,z,B)=>(sa=r.dynCall_viiiiiiii=U.Qc)(i,u,c,m,g,x,I,z,B),ua=r.dynCall_viiiiiiiiii=(i,u,c,m,g,x,I,z,B,L,q)=>(ua=r.dynCall_viiiiiiiiii=U.Rc)(i,u,c,m,g,x,I,z,B,L,q),da=r.dynCall_jiii=(i,u,c,m)=>(da=r.dynCall_jiii=U.Sc)(i,u,c,m),la=r.dynCall_dii=(i,u,c)=>(la=r.dynCall_dii=U.Tc)(i,u,c),ca=r.dynCall_viiiiiiiii=(i,u,c,m,g,x,I,z,B,L)=>(ca=r.dynCall_viiiiiiiii=U.Uc)(i,u,c,m,g,x,I,z,B,L),pa=r.dynCall_viiiiiiiiiii=(i,u,c,m,g,x,I,z,B,L,q,X)=>(pa=r.dynCall_viiiiiiiiiii=U.Vc)(i,u,c,m,g,x,I,z,B,L,q,X),ma=r.dynCall_iiiiii=(i,u,c,m,g,x)=>(ma=r.dynCall_iiiiii=U.Wc)(i,u,c,m,g,x),fa=r.dynCall_iij=(i,u,c)=>(fa=r.dynCall_iij=U.Xc)(i,u,c),ha=r.dynCall_iiiiiiiiii=(i,u,c,m,g,x,I,z,B,L)=>(ha=r.dynCall_iiiiiiiiii=U.Yc)(i,u,c,m,g,x,I,z,B,L),ga=r.dynCall_iiiiiiiiiii=(i,u,c,m,g,x,I,z,B,L,q)=>(ga=r.dynCall_iiiiiiiiiii=U.Zc)(i,u,c,m,g,x,I,z,B,L,q),ya=r.dynCall_vij=(i,u,c)=>(ya=r.dynCall_vij=U._c)(i,u,c),ba=r.dynCall_iiif=(i,u,c,m)=>(ba=r.dynCall_iiif=U.$c)(i,u,c,m),_a=r.dynCall_iiij=(i,u,c,m)=>(_a=r.dynCall_iiij=U.ad)(i,u,c,m),wa=r.dynCall_fiii=(i,u,c,m)=>(wa=r.dynCall_fiii=U.bd)(i,u,c,m),va=r.dynCall_viiiiiiiiiiiii=(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)=>(va=r.dynCall_viiiiiiiiiiiii=U.cd)(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e),$a=r.dynCall_vjiii=(i,u,c,m,g)=>($a=r.dynCall_vjiii=U.dd)(i,u,c,m,g),xa=r.dynCall_vif=(i,u,c)=>(xa=r.dynCall_vif=U.ed)(i,u,c),Sa=r.dynCall_iiiiiii=(i,u,c,m,g,x,I)=>(Sa=r.dynCall_iiiiiii=U.fd)(i,u,c,m,g,x,I),Ta=r.dynCall_iiiij=(i,u,c,m,g)=>(Ta=r.dynCall_iiiij=U.gd)(i,u,c,m,g),Ca=r.dynCall_iiiiiiii=(i,u,c,m,g,x,I,z)=>(Ca=r.dynCall_iiiiiiii=U.hd)(i,u,c,m,g,x,I,z),Ia=r.dynCall_viiiiiiiiiiii=(i,u,c,m,g,x,I,z,B,L,q,X,ue)=>(Ia=r.dynCall_viiiiiiiiiiii=U.id)(i,u,c,m,g,x,I,z,B,L,q,X,ue),Aa=r.dynCall_diii=(i,u,c,m)=>(Aa=r.dynCall_diii=U.jd)(i,u,c,m),ka=r.dynCall_jiiii=(i,u,c,m,g)=>(ka=r.dynCall_jiiii=U.kd)(i,u,c,m,g),Ea=r.dynCall_viiij=(i,u,c,m,g)=>(Ea=r.dynCall_viiij=U.ld)(i,u,c,m,g),Pa=r.dynCall_fiiii=(i,u,c,m,g)=>(Pa=r.dynCall_fiiii=U.md)(i,u,c,m,g),za=r.dynCall_viiif=(i,u,c,m,g)=>(za=r.dynCall_viiif=U.nd)(i,u,c,m,g),Oa=r.dynCall_diiii=(i,u,c,m,g)=>(Oa=r.dynCall_diiii=U.od)(i,u,c,m,g),Da=r.dynCall_viiid=(i,u,c,m,g)=>(Da=r.dynCall_viiid=U.pd)(i,u,c,m,g),Ba=r.dynCall_iiiijii=(i,u,c,m,g,x,I)=>(Ba=r.dynCall_iiiijii=U.qd)(i,u,c,m,g,x,I),Ma=r.dynCall_iiiiiij=(i,u,c,m,g,x,I)=>(Ma=r.dynCall_iiiiiij=U.rd)(i,u,c,m,g,x,I),Ra=i=>(Ra=U.sd)(i),Ua=()=>(Ua=U.td)(),Na=i=>(Na=U.ud)(i),Va=()=>(Va=U.vd)();function Mm(i,u,c){var m=ie();try{Zi(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function Rm(i,u,c){var m=ie();try{return Ki(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function Um(i,u){var c=ie();try{ji(i,u)}catch(m){if(oe(c),m!==m+0)throw m;se(1,0)}}function Nm(i,u){var c=ie();try{return Rn(i,u)}catch(m){if(oe(c),m!==m+0)throw m;se(1,0)}}function Vm(i,u,c,m){var g=ie();try{return Qi(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function Wm(i,u,c,m,g){var x=ie();try{Ji(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function Lm(i,u,c,m,g){var x=ie();try{return Xi(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function Gm(i,u,c,m){var g=ie();try{Yi(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function Hm(i,u,c,m,g,x,I){var z=ie();try{return Sa(i,u,c,m,g,x,I)}catch(B){if(oe(z),B!==B+0)throw B;se(1,0)}}function Fm(i){var u=ie();try{na(i)}catch(c){if(oe(u),c!==c+0)throw c;se(1,0)}}function qm(i,u,c){var m=ie();try{return fa(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function Km(i,u,c,m,g,x){var I=ie();try{oa(i,u,c,m,g,x)}catch(z){if(oe(I),z!==z+0)throw z;se(1,0)}}function jm(i,u,c){var m=ie();try{ya(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function Zm(i,u,c,m,g,x,I){var z=ie();try{ea(i,u,c,m,g,x,I)}catch(B){if(oe(z),B!==B+0)throw B;se(1,0)}}function Qm(i,u,c,m,g,x,I,z){var B=ie();try{ta(i,u,c,m,g,x,I,z)}catch(L){if(oe(B),L!==L+0)throw L;se(1,0)}}function Ym(i,u,c,m,g,x){var I=ie();try{return ma(i,u,c,m,g,x)}catch(z){if(oe(I),z!==z+0)throw z;se(1,0)}}function Xm(i,u,c,m,g,x,I,z){var B=ie();try{return Ca(i,u,c,m,g,x,I,z)}catch(L){if(oe(B),L!==L+0)throw L;se(1,0)}}function Jm(i,u,c,m,g,x,I,z,B,L){var q=ie();try{ca(i,u,c,m,g,x,I,z,B,L)}catch(X){if(oe(q),X!==X+0)throw X;se(1,0)}}function ef(i,u,c,m,g,x,I,z,B){var L=ie();try{sa(i,u,c,m,g,x,I,z,B)}catch(q){if(oe(L),q!==q+0)throw q;se(1,0)}}function tf(i){var u=ie();try{return ia(i)}catch(c){if(oe(u),c!==c+0)throw c;se(1,0)}}function rf(i,u,c,m,g,x,I,z,B,L){var q=ie();try{return ha(i,u,c,m,g,x,I,z,B,L)}catch(X){if(oe(q),X!==X+0)throw X;se(1,0)}}function nf(i,u,c){var m=ie();try{return aa(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function of(i,u,c,m){var g=ie();try{return da(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;return se(1,0),0n}}function af(i,u,c){var m=ie();try{return la(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function sf(i,u,c,m,g,x,I,z,B,L,q,X){var ue=ie();try{pa(i,u,c,m,g,x,I,z,B,L,q,X)}catch($e){if(oe(ue),$e!==$e+0)throw $e;se(1,0)}}function uf(i,u,c,m,g,x,I,z,B,L,q){var X=ie();try{ua(i,u,c,m,g,x,I,z,B,L,q)}catch(ue){if(oe(X),ue!==ue+0)throw ue;se(1,0)}}function df(i,u,c,m,g,x,I,z,B,L,q){var X=ie();try{return ga(i,u,c,m,g,x,I,z,B,L,q)}catch(ue){if(oe(X),ue!==ue+0)throw ue;se(1,0)}}function lf(i,u,c,m){var g=ie();try{return ba(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function cf(i,u,c,m){var g=ie();try{return _a(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function pf(i,u,c,m){var g=ie();try{return wa(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function mf(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e){var Le=ie();try{va(i,u,c,m,g,x,I,z,B,L,q,X,ue,$e)}catch(jt){if(oe(Le),jt!==jt+0)throw jt;se(1,0)}}function ff(i,u,c,m,g){var x=ie();try{$a(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function hf(i,u,c){var m=ie();try{xa(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;se(1,0)}}function gf(i,u){var c=ie();try{return ra(i,u)}catch(m){if(oe(c),m!==m+0)throw m;return se(1,0),0n}}function yf(i,u,c,m,g){var x=ie();try{return Ta(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function bf(i,u,c,m,g,x,I,z,B,L,q,X,ue){var $e=ie();try{Ia(i,u,c,m,g,x,I,z,B,L,q,X,ue)}catch(Le){if(oe($e),Le!==Le+0)throw Le;se(1,0)}}function _f(i,u,c,m){var g=ie();try{return Aa(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;se(1,0)}}function wf(i,u,c,m,g){var x=ie();try{return ka(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;return se(1,0),0n}}function vf(i,u,c,m,g){var x=ie();try{Ea(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function $f(i,u,c,m,g){var x=ie();try{return Pa(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function xf(i,u,c,m,g){var x=ie();try{za(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function Sf(i,u,c,m,g){var x=ie();try{return Oa(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function Tf(i,u,c,m,g){var x=ie();try{Da(i,u,c,m,g)}catch(I){if(oe(x),I!==I+0)throw I;se(1,0)}}function Cf(i,u,c,m,g,x,I){var z=ie();try{return Ba(i,u,c,m,g,x,I)}catch(B){if(oe(z),B!==B+0)throw B;se(1,0)}}function If(i,u,c,m,g,x,I){var z=ie();try{return Ma(i,u,c,m,g,x,I)}catch(B){if(oe(z),B!==B+0)throw B;se(1,0)}}return r.stackSave=()=>ie(),r.stackRestore=i=>oe(i),r.stackAlloc=i=>Mn(i),r.setValue=function(i,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":Z()[i>>>0]=u;break;case"i16":ke()[i>>>1>>>0]=u;break;case"i32":D()[i>>>2>>>0]=u;break;case"i64":W[i>>>3]=BigInt(u);break;case"float":Y()[i>>>2>>>0]=u;break;case"double":fe()[i>>>3>>>0]=u;break;case"*":R()[i>>>2>>>0]=u;break;default:ut(`invalid type for setValue: ${c}`)}},r.getValue=function(i,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return Z()[i>>>0];case"i16":return ke()[i>>>1>>>0];case"i32":return D()[i>>>2>>>0];case"i64":return W[i>>>3];case"float":return Y()[i>>>2>>>0];case"double":return fe()[i>>>3>>>0];case"*":return R()[i>>>2>>>0];default:ut(`invalid type for getValue: ${u}`)}},r.UTF8ToString=Ae,r.stringToUTF8=Bt,r.lengthBytesUTF8=Yo,function i(){if(0<xt)Ht=i;else if(d)t(r),Ye();else{for(;0<yn.length;)yn.shift()(r);0<xt?Ht=i:(r.calledRun=!0,ee||(Ye(),t(r)))}}(),r.PTR_SIZE=4,o}),Bf=ws,Mf=globalThis.self?.name?.startsWith("em-pthread");Mf&&ws()});var Ts,Rf,Ve,Cs,jn,Uf,Nf,Is,Vf,xs,As,Ss,ks,Sr=G(()=>{"use strict";xr();Ts=typeof location>"u"?void 0:location.origin,Rf=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.bundle.min.mjs",import.meta.url).href,Ts).href:import.meta.url},Ve=Rf(),Cs=()=>{if(Ve&&!Ve.startsWith("blob:"))return Ve.substring(0,Ve.lastIndexOf("/")+1)},jn=(e,t)=>{try{let n=t??Ve;return(n?new URL(e,n):new URL(e)).origin===Ts}catch{return!1}},Uf=(e,t)=>{let n=t??Ve;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Nf=(e,t)=>`${t??"./"}${e}`,Is=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Vf=async e=>(await import(/*webpackIgnore:true*/e)).default,xs=(_s(),br(bs)).default,As=async()=>{if(!Ve)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(jn(Ve))return[void 0,xs()];let e=await Is(Ve);return[e,xs(e)]},Ss=($s(),br(vs)).default,ks=async(e,t,n)=>{if(!e&&!t&&Ss&&Ve&&jn(Ve))return[void 0,Ss];{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??Uf(r,t),a=!!1&&n&&o&&!jn(o,t),s=a?await Is(o):o??Nf(r,t);return[a?s:void 0,await Vf(s)]}}});var Zn,Qn,Or,Es,Wf,Lf,Tr,Ie,bt=G(()=>{"use strict";Sr();Qn=!1,Or=!1,Es=!1,Wf=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Lf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tr=async e=>{if(Qn)return Promise.resolve();if(Or)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Es)throw new Error("previous call to 'initializeWebAssembly()' failed.");Or=!0;let t=e.initTimeout,n=e.numThreads;if(!Lf())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=Wf();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,d=s?.href??s,l=o?.wasm,p=l?.href??l,f=e.wasmBinary,[h,y]=await ks(d,a,n>1),_=!1,b=[];if(t>0&&b.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),b.push(new Promise((w,S)=>{let $={numThreads:n};if(f)$.wasmBinary=f;else if(p||a)$.locateFile=v=>p??a+v;else if(d&&d.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,d).href;else if(h){let v=Cs();v&&($.locateFile=T=>v+T)}y($).then(v=>{Or=!1,Qn=!0,Zn=v,w(),h&&URL.revokeObjectURL(h)},v=>{Or=!1,Es=!0,S(v)})})),await Promise.race(b),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(Qn&&Zn)return Zn;throw new Error("WebAssembly is not initialized yet.")}});var Pe,Xt,he,Dr=G(()=>{"use strict";bt();Pe=(e,t)=>{let n=Ie(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},Xt=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")Xt(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},he=e=>{let t=Ie(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let a=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),d=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(n)}}});var Ps,zs=G(()=>{"use strict";bt();Dr();Ps=e=>{let t=Ie(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Pe(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),n===0&&he("Can't create run options."),e?.extra!==void 0&&Xt(e.extra,"",new WeakSet,(s,d)=>{let l=Pe(s,r),p=Pe(d,r);t._OrtAddRunConfigEntry(n,l,p)!==0&&he(`Can't set a run config entry: ${s} - ${d}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}});var Gf,Hf,Ff,qf,Os,Ds=G(()=>{"use strict";bt();Dr();Gf=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Hf=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Ff=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},qf=(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name;switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let d=r?.deviceType;if(d){let l=Pe("deviceType",n),p=Pe(d,n);Ie()._OrtAddSessionConfigEntry(e,l,p)!==0&&he(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof r!="string"){let s=r;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let d=Pe("preferredLayout",n),l=Pe(s.preferredLayout,n);Ie()._OrtAddSessionConfigEntry(e,d,l)!==0&&he(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Pe(o,n);Ie()._OrtAppendExecutionProvider(e,a)!==0&&he(`Can't append execution provider: ${o}.`)}},Os=e=>{let t=Ie(),n=0,r=[],o=e||{};Ff(o);try{let a=Gf(o.graphOptimizationLevel??"all"),s=Hf(o.executionMode??"sequential"),d=typeof o.logId=="string"?Pe(o.logId,r):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof o.optimizedModelFilePath=="string"?Pe(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,d,l,p,f),n===0&&he("Can't create session options."),o.executionProviders&&qf(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let h=Pe("enableGraphCapture",r),y=Pe(o.enableGraphCapture.toString(),r);t._OrtAddSessionConfigEntry(n,h,y)!==0&&he(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[h,y]of Object.entries(o.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=Pe(h,r);t._OrtAddFreeDimensionOverride(n,_,y)!==0&&he(`Can't set a free dimension override: ${h} - ${y}.`)}return o.extra!==void 0&&Xt(o.extra,"",new WeakSet,(h,y)=>{let _=Pe(h,r),b=Pe(y,r);t._OrtAddSessionConfigEntry(n,_,b)!==0&&he(`Can't set a session config entry: ${h} - ${y}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&he("Can't release session options."),r.forEach(s=>t._free(s)),a}}});var Rt,_t,wt,Br,Jt,Mr,Rr,Yn,te=G(()=>{"use strict";Rt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},_t=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return n>0?Math.ceil(r*n):void 0},Br=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Jt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Rr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Yn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var er,Xn=G(()=>{"use strict";xr();er=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Nn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Nn("node:fs"),r=n(e),o=[];for await(let a of r)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(d){if(d instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let s=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Kf,jf,Bs,Ms,Ur,Zf,me,tt=G(()=>{"use strict";te();Kf=["V","I","W","E","F"],jf=(e,t)=>{console.log(`[${Kf[e]},${new Date().toISOString()}]${t}`)},Ur=(e,t)=>{Bs=e,Ms=t},Zf=(e,t)=>{let n=Jt(e),r=Jt(Bs);n>=r&&jf(n,typeof t=="function"?t():t)},me=(...e)=>{Ms&&Zf(...e)}});var Nr,Jn=G(()=>{"use strict";te();Nr=(e,t)=>new(Br(t))(e)});var Vr=G(()=>{"use strict"});var Rs,eo,to,Qf,Yf,Us,no,ro,Vs,Ws=G(()=>{"use strict";tt();Vr();Rs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),eo=[],to=e=>Math.ceil(Number(e)/16)*16,Qf=e=>{for(let t=0;t<eo.length;t++){let n=eo[t];if(e<=n)return n}return Math.ceil(e/16)*16},Yf=1,Us=()=>Yf++,no=async(e,t,n,r)=>{let o=to(n),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let d=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(d,0,n)),l}else return new Uint8Array(d.slice(0,n))}finally{a.destroy()}},ro=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Rs)eo.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,a=n.byteLength,s=to(a),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${a}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(r,o,a)),l.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(l,0,d.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),l.destroy(),me("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=to(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Us();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),me("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Qf(t),o,a=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let p=(a?this.freeBuffers:this.freeUniformBuffers).get(r);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let d={id:Us(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),me("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return me("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await no(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=Rs.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(me("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Vs=(...e)=>new ro(...e)});var oo,re,Ce=G(()=>{"use strict";oo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new oo(e)});var io,rt,E,kt,Wr,Ls,Gs,ae=G(()=>{"use strict";io=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},rt=class{static calcShape(t,n,r=!1){let o=t.length,a=n.length;if(o===0)return n;if(a===0)return t;let s=Math.max(t.length,n.length),d=new Array(s);if(r){if(o<2||a<2)return;let l=io.calcMatMulShape([t[o-2],t[o-1]],[n[a-2],n[a-1]]);if(l===void 0)return;[d[s-2],d[s-1]]=l}for(let l=r?3:1;l<=s;l++){let p=o-l<0?1:t[o-l],f=a-l<0?1:n[a-l];if(p!==f&&p>1&&f>1)return;let h=Math.max(p,f);if(p&&f)d[s-l]=Math.max(p,f);else{if(h>1)return;d[s-l]=0}}return d}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let a=1;a<=r;a++)if(t[r-a]!==1&&t[r-a]!==n[o-a])return!1;return!0}},E=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){o[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,n/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,a)=>o+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},kt=class e{static adjustPoolAttributes(t,n,r,o,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<n.length-2;d++)d>=r.length?r.push(n[d+2]):r[d]=n[d+2];for(let d=0;d<r.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<r.length;d++)if(d<a.length){if(a[d]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let d=0;d<r.length*2;d++)if(d<s.length){if(s[d]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let d=0;d<r.length;d++){if(r[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[d]>=r[d]||s[d+r.length]>=r[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,a,s,d){if(d){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],r[l],o[l],a,l,l+t.length-2,d)}}static computePoolOutputShape(t,n,r,o,a,s,d){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,r,o,a,s,d),l}static computeConvOutputShape(t,n,r,o,a,s,d){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,r,o,a,s,d),l}static computeShapeHelper(t,n,r,o,a,s,d,l){if(t)for(let p=0;p<n.length-2;p++)r.push(1);else for(let p=0;p<n.length-2;p++)r.push(e.adjustPadAndReturnShape(n[p+2],o[p],a[p],s[p],d,p,p+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,o,a,s,d,l){let p=r*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[d]=0,Math.floor((t-p)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+n-1)/n-1)*n+o-t;return a[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),a[d]=h-a[s],Math.floor((t+h-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[d]-p)/n+1)}},Wr=class{static getShapeOfGemmResult(t,n,r,o,a){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,d,l;n?(s=t[1],d=t[0]):(s=t[0],d=t[1]);let p=-1;if(o?(l=r[0],p=1):(l=r[1],p=0),r[p]!==d)throw new Error("dimension mismatch");if(s<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(a&&!rt.isValidBroadcast(a,[s,l]))throw new Error("gemm: invalid bias shape for broadcast");return[s,l,d]}},Ls=-34028234663852886e22,Gs=34028234663852886e22});var Et,so,_e,ze,H,ge,uo,Pt,Ke,K,Lr,P,N,Hs,Gr,ao,Fs,ce=G(()=>{"use strict";te();ae();Et=64,so=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},_e=(e,t=1)=>{let n=so(e,t);return typeof n=="string"?n:n[0]},ze=(e,t=1)=>{let n=so(e,t);return typeof n=="string"?n:n[1]},H=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:E.computeStrides(n)})}),t},ge=e=>e%4===0?4:e%2===0?2:1,uo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Pt=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Ke=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Lr=(e,t,n,r,o)=>{let a=typeof n=="number",s=a?n:n.length,d=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=so(t,o),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],y={indices:l,value:f,storage:h,tensor:t},_=R=>typeof R=="string"?R:`${R}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",S=`${w}${e}_shape`,$=`${w}${e}_strides`,v="";for(let R=0;R<s-1;R++)v+=`
    let dim${R} = current / ${K($,R,s)};
    let rest${R} = current % ${K($,R,s)};
    indices[${R}] = dim${R};
    current = rest${R};
    `;v+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${v}
    return indices;
  }`,C=R=>(b.offsetToIndices=!0,s<2?R:`o2i_${e}(${R})`),A=[];if(s>=2)for(let R=s-1;R>=0;R--)A.push(`${K($,R,s)} * (indices[${R}])`);let k=s<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${A.join("+")};
  }`,O=R=>(b.indicesToOffset=!0,s<2?R:`i2o_${e}(${R})`),M=(...R)=>s===0?"0u":`${y.indices}(${R.map(_).join(",")})`,V=(R,Y)=>s<2?`${R}`:`${K(R,Y,s)}`,F=(R,Y,fe)=>s<2?`${R}=${fe};`:`${K(R,Y,s)}=${fe};`,j={},ne=(R,Y)=>{b.broadcastedIndicesToOffset=!0;let fe=`${Y.name}broadcastedIndicesTo${e}Offset`;if(fe in j)return`${fe}(${R})`;let Fe=[];for(let xe=s-1;xe>=0;xe--){let be=Y.indicesGet("outputIndices",xe+Y.rank-s);Fe.push(`${V($,xe)} * (${be} % ${V(S,xe)})`)}return j[fe]=`fn ${fe}(outputIndices: ${Y.type.indices}) -> u32 {
             return ${Fe.length>0?Fe.join("+"):"0u"};
           }`,`${fe}(${R})`},W=(R,Y)=>(()=>{if(y.storage===y.value)return`${e}[${R}]=${Y};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${R}]=vec2<u32>(u32(${Y}), select(0u, 0xFFFFFFFFu, ${Y} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${R}]=vec2<u32>(u32(${Y}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${R}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Y}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),J=R=>(()=>{if(y.storage===y.value)return`${e}[${R}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${R}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${R}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${R}] & 0xFFu), bool(${e}[${R}] & 0xFF00u), bool(${e}[${R}] & 0xFF0000u), bool(${e}[${R}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),ve=s<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${f} {
    return ${J(`i2o_${e}(indices)`)};
  }`,Q=s<2?"":(()=>{let R=d.map(fe=>`d${fe}: u32`).join(", "),Y=d.map(fe=>`d${fe}`).join(", ");return`
  fn get_${e}(${R}) -> ${f} {
    return get_${e}ByIndices(${M(Y)});
  }`})(),ee=(...R)=>{if(R.length!==s)throw new Error(`indices length must be ${s}`);let Y=R.map(_).join(",");return s===0?J("0u"):s===1?J(Y[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${Y})`)},le=R=>s<2?J(R):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${R})`),Z=s<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${f}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,pe=s<2?"":(()=>{let R=d.map(fe=>`d${fe}: u32`).join(", "),Y=d.map(fe=>`d${fe}`).join(", ");return`
  fn set_${e}(${R}, value: ${f}) {
    set_${e}ByIndices(${M(Y)}, value);
  }`})();return{impl:()=>{let R=[],Y=!1;return b.offsetToIndices&&(R.push(T),Y=!0),b.indicesToOffset&&(R.push(k),Y=!0),b.broadcastedIndicesToOffset&&(Object.values(j).forEach(fe=>R.push(fe)),Y=!0),b.set&&(R.push(pe),Y=!0),b.setByIndices&&(R.push(Z),Y=!0),b.get&&(R.push(Q),Y=!0),b.getByIndices&&(R.push(ve),Y=!0),!a&&Y&&R.unshift(`const ${S} = ${y.indices}(${n.join(",")});`,`const ${$} = ${y.indices}(${E.computeStrides(n).join(",")});`),R.join(`
`)},type:y,offsetToIndices:C,indicesToOffset:O,broadcastedIndicesToOffset:ne,indices:M,indicesGet:V,indicesSet:F,set:(...R)=>{if(R.length!==s+1)throw new Error(`indices length must be ${s}`);let Y=R[s];if(typeof Y!="string")throw new Error("value must be string");let fe=R.slice(0,s).map(_).join(",");return s===0?W("0u",Y):s===1?W(fe[0],Y):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${fe}, ${Y})`)},setByOffset:W,setByIndices:(R,Y)=>s<2?W(R,Y):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${R}, ${Y});`),get:ee,getByOffset:J,getByIndices:le,usage:r,name:e,strides:$,shape:S,rank:s}},P=(e,t,n,r=1)=>Lr(e,t,n,"input",r),N=(e,t,n,r=1)=>Lr(e,t,n,"output",r),Hs=(e,t,n)=>Lr(e,t,n,"atomicOutput",1),Gr=(e,t,n,r=1)=>Lr(e,t,n,"internal",r),ao=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Et){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${d}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},Fs=(e,t)=>new ao(e,t)});var Xf,qs,Jf,eh,th,rh,Oe,Ks,js,ct=G(()=>{"use strict";te();ae();Ce();ce();Xf=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},qs=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Jf=(e,t)=>E.sortBasedOnPerm(e,qs(e.length,t)),eh=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},th=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},rh=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},Oe=(e,t)=>{let n=e.dataType,r=e.dims.length,o=qs(r,t),a=Jf(e.dims,o),s=e.dims,d=a,l=r<2||rh(o,e.dims),p;if(l)return p=w=>{let S=P("input",n,s,4),$=N("output",n,d,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=th(e.dims,o),y=E.areEqual(h,[2,3,1]),_=E.areEqual(h,[3,1,2]);if(f.length===2||y||_){s=y?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,d=[s[1],s[0]];let w=16;return p=S=>{let $=P("a",n,s.length),v=N("output",n,d.length);return`
  ${S.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${S.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/w),y:Math.ceil(d[0]/w)},programUniforms:[{type:12,data:S},...H(s,d)]}},getShaderSource:p}}return p=w=>{let S=P("a",n,s.length),$=N("output",n,d.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}

  ${eh(o,r,S,$)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...H(s,d)]}},getShaderSource:p}},Ks=(e,t)=>{Xf(e.inputs,t.perm),e.compute(Oe(e.inputs[0],t.perm))},js=e=>re({perm:e.perm})});var nh,oh,ih,ah,sh,uh,dh,lh,ch,ph,nt,Zs,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou,iu=G(()=>{"use strict";te();ae();ce();Hr();ct();nh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},oh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ih={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ah={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},sh=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},uh=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let o=t.map(a=>e[a]);return[n,o]},dh=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[o++]):r.push(1);return r},lh=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},ch=(e,t)=>{let n=[];if(!lh(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},ph=(e,t,n,r,o,a,s)=>{let d=n[0].dims,l=E.size(a),p=E.size(s),f=P("_A",n[0].dataType,d),h=N("output",o,a),y=64;l===1&&(y=256);let _=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,b=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(f,h)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ih[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${nh[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${oh[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${ah[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},nt=(e,t,n,r)=>{let o=e.inputs.length===1?n:lo(e.inputs,n),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,b)=>b));let s=E.normalizeAxes(a,e.inputs[0].dims.length),d=s,l=e.inputs[0],p=ch(d,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Oe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],d=sh(d.length,l.dims.length));let[f,h]=uh(l.dims,d),y=f;o.keepDims&&(y=dh(f,s)),e.compute(ph(t,o.cacheKey,[l],r,e.inputs[0].dataType,y,h),{inputs:[l]})},Zs=(e,t)=>{nt(e,"ReduceMeanShared",t,"mean")},Qs=(e,t)=>{nt(e,"ReduceL1Shared",t,"l1")},Ys=(e,t)=>{nt(e,"ReduceL2Shared",t,"l2")},Xs=(e,t)=>{nt(e,"ReduceLogSumExpShared",t,"logSumExp")},Js=(e,t)=>{nt(e,"ReduceMaxShared",t,"max")},eu=(e,t)=>{nt(e,"ReduceMinShared",t,"min")},tu=(e,t)=>{nt(e,"ReduceProdShared",t,"prod")},ru=(e,t)=>{nt(e,"ReduceSumShared",t,"sum")},nu=(e,t)=>{nt(e,"ReduceSumSquareShared",t,"sumSquare")},ou=(e,t)=>{nt(e,"ReduceLogSumShared",t,"logSum")}});var ot,mh,Fr,lo,it,fh,hh,gh,yh,bh,_h,wh,vh,$h,xh,at,au,su,uu,du,lu,cu,pu,mu,fu,hu,Hr=G(()=>{"use strict";te();ae();Ce();ce();iu();ot=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},mh=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fr=(e,t,n,r,o,a,s=!1,d=!1)=>{let l=[],p=n[0].dims,f=p.length,h=E.normalizeAxes(o,f),y=!d&&h.length===0;p.forEach((S,$)=>{y||h.indexOf($)>=0?s&&l.push(1):l.push(S)});let _=l.length,b=E.size(l);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],v=P("_A",n[0].dataType,f),T=N("output",a,_),C=r(v,T,h),A=C[2];for(let k=0,O=0;k<f;k++)y||h.indexOf(k)>=0?(s&&O++,A=`for(var j${k}: u32 = 0; j${k} < ${p[k]}; j${k}++) {
                  ${C[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${v.indicesSet("input_indices",k,`j${k}`)}
                  ${A}
                }`):($.push(`${v.indicesSet("input_indices",k,T.indicesGet("output_indices",O))};`),O++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,T)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${A}
          ${C[3]}
          ${C.length===4?T.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...H(p,l)]})}},lo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),re({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},it=(e,t,n,r)=>{let o=e.inputs,a=o.length===1?n:lo(o,n);e.compute(Fr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?mh:r,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},fh=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},hh=(e,t)=>{ot(e.inputs),it(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},gh=(e,t)=>{ot(e.inputs),it(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},yh=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},bh=(e,t)=>{ot(e.inputs),it(e,"ReduceMax",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",d,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},_h=(e,t)=>{ot(e.inputs),it(e,"ReduceMean",t,(r,o,a)=>{let s=1;for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&(s*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},wh=(e,t)=>{ot(e.inputs),it(e,"ReduceMin",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},vh=(e,t)=>{ot(e.inputs),it(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},$h=(e,t)=>{ot(e.inputs),it(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},xh=(e,t)=>{ot(e.inputs),it(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},at=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:o*=e[a];return o<32&&r>1024},au=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_h(e,t):Zs(e,t)},su=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hh(e,t):Qs(e,t)},uu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gh(e,t):Ys(e,t)},du=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yh(e,t):Xs(e,t)},lu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bh(e,t):Js(e,t)},cu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wh(e,t):eu(e,t)},pu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vh(e,t):tu(e,t)},mu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$h(e,t):ru(e,t)},fu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xh(e,t):nu(e,t)},hu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fh(e,t):ou(e,t)}});var gu,yu,bu,co,_u=G(()=>{"use strict";te();Ce();Hr();gu=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},yu=(e,t)=>{gu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},bu=(e,t)=>{gu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},co=e=>re(e)});var Sh,po,Th,Ch,Ih,Ut,Ah,wu,qr=G(()=>{"use strict";te();ae();Vr();ce();Sh=(e,t)=>{let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4],d=e[5];if(s&&d)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],p=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=o.dims[0]/3,y=h,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let b=p;if(h!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==h+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let S=b+w,$=-1,v=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:w,kvSequenceLength:b,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},po=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Th=(e,t,n,r,o,a,s,d)=>{let l=ge(s?1:a),p=64,f=a/l;f<p&&(p=32);let h=Math.ceil(a/l/p),y=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:f},{type:12,data:h}],_=_e(e.dataType,l),b=ze(1,l),w=["type"];s&&w.push("type"),d&&w.push("type");let S=$=>{let v=N("x",e.dataType,e.dims,l),T=[v],C=s?P("seq_lens",s.dataType,s.dims):void 0;C&&T.push(C);let A=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;A&&T.push(A);let k=ze(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(O).declareVariables(...T)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${po(C,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${k}(1.0) / ${k}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${k}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:w},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(a/p),y:o,z:t*n},programUniforms:y})}},Ch=(e,t,n,r,o,a,s,d,l)=>{let p=s+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,p],h=e>1&&r,y=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,y,p,a.headSize]:void 0,b=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=ge(a.headSize),$=a.headSize/S,v=12,T={x:Math.ceil(p/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],A=h&&r&&E.size(r.dims)>0,k=["type","type"];A&&k.push("type"),o&&k.push("type"),d&&k.push("type"),l&&k.push("type");let O=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&O.push({dims:_,dataType:t.dataType,gpuDataType:0});let M=V=>{let F=P("q",t.dataType,t.dims,S),j=P("key",n.dataType,n.dims,S),ne=[F,j];if(A){let Z=P("past_key",r.dataType,r.dims,S);ne.push(Z)}o&&ne.push(P("attention_bias",o.dataType,o.dims));let W=d?P("seq_lens",d.dataType,d.dims):void 0;W&&ne.push(W);let J=l?P("total_sequence_length_input",l.dataType,l.dims):void 0;J&&ne.push(J);let ve=N("output",t.dataType,f),Q=[ve];h&&Q.push(N("present_key",t.dataType,_,S));let ee=ze(1,S),le=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${V.registerUniforms(le).declareVariables(...ne,...Q)}
  ${V.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${po(W,J,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${ve.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${r!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:O,dispatchGroup:T,programUniforms:C}),getShaderSource:M}},Ih=(e,t,n,r,o,a,s=void 0,d=void 0)=>{let l=a+o.kvSequenceLength,p=o.nReps?o.nReps:1,f=o.vHiddenSize*p,h=e>1&&r,y=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=h?[o.batchSize,y,l,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,f],w=12,S={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=h&&r&&E.size(r.dims)>0,T=["type","type"];v&&T.push("type"),s&&T.push("type"),d&&T.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&C.push({dims:_,dataType:t.dataType,gpuDataType:0});let A=k=>{let O=P("probs",t.dataType,t.dims),M=P("v",n.dataType,n.dims),V=[O,M];v&&V.push(P("past_value",r.dataType,r.dims));let F=s?P("seq_lens",s.dataType,s.dims):void 0;s&&V.push(F);let j=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;d&&V.push(j);let W=[N("output",t.dataType,b)];h&&W.push(N("present_value",t.dataType,_));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${O.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${O.type.value}, ${w*w}>;
  ${k.registerUniforms(J).declareVariables(...V,...W)}
  ${k.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${po(F,j,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${v&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:C,dispatchGroup:S,programUniforms:$}),getShaderSource:A}},Ut=(e,t,n,r,o,a,s,d,l,p,f=void 0,h=void 0)=>{let y=Math.min(e.outputCount,1+(s?1:0)+(d?1:0)),_=y>1?p.pastSequenceLength:0,b=_+p.kvSequenceLength,w=l&&E.size(l.dims)>0?l:void 0,S=[t,n];y>1&&s&&E.size(s.dims)>0&&S.push(s),w&&S.push(w),f&&S.push(f),h&&S.push(h);let $=e.compute(Ch(y,t,n,s,w,p,_,f,h),{inputs:S,outputs:y>1?[-1,1]:[-1]})[0];e.compute(Th($,p.batchSize,p.numHeads,_,p.sequenceLength,b,f,h),{inputs:f&&h?[$,f,h]:[$],outputs:[]});let v=[$,r];y>1&&d&&E.size(d.dims)>0&&v.push(d),f&&v.push(f),h&&v.push(h),e.compute(Ih(y,$,r,d,p,_,f,h),{inputs:v,outputs:y>1?[0,2]:[0]})},Ah=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,d={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:r},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let y=N("output_q",l[0].dataType,n),_=N("output_k",l[0].dataType,n),b=N("output_v",l[0].dataType,n),w=P("input",l[0].dataType,l[0].dims),S=P("weight",l[1].dataType,l[1].dims),$=P("bias",l[2].dataType,l[2].dims),v=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${h.registerUniforms(T).declareVariables(w,S,$,y,_,b)}
  ${h.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},wu=(e,t)=>{let n=Sh(e.inputs,t),[r,o,a]=Ah(e,n);return Ut(e,r,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var kh,Eh,Ph,vu,$u=G(()=>{"use strict";Ge();te();ae();Ce();ce();kh=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,a)=>{let s=o.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((d,l)=>{if(d!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Eh=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,a=e[0].dims,s=r?ge(a[a.length-1]):1,d=o==="NHWC"&&a.length>1?s:1,l=E.size(a)/s,p=r,f=p?a.length:a,h=P("x",e[0].dataType,e[0].dims,s),y=P("scale",e[1].dataType,e[1].dims,d),_=P("bias",e[2].dataType,e[2].dims,d),b=P("inputMean",e[3].dataType,e[3].dims,d),w=P("inputVar",e[4].dataType,e[4].dims,d),S=N("y",e[0].dataType,f,s),$=()=>{let T="";if(r)T=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<y.rank;C++)T+=`cIndices[${C}] = outputIndices[${C}];`;T+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return T},v=T=>`
  const epsilon = ${n};
  ${T.registerUniform("outputSize","u32").declareVariables(h,y,_,b,w,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...H(a)]:[{type:12,data:l}]})}},Ph=e=>re(e),vu=(e,t)=>{let{inputs:n,outputCount:r}=e,o=Ph({...t,outputCount:r});if(we.webgpu.validateInputContent&&kh(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Eh(n,o))}});var zh,Oh,xu,Su=G(()=>{"use strict";ae();ce();zh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Oh=e=>{let t=e[0].dims,n=e[0].dims[2],r=E.size(t)/4,o=e[0].dataType,a=P("input",o,t,4),s=P("bias",o,[n],4),d=P("residual",o,t,4),l=N("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(a,s,d,l)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},xu=e=>{zh(e.inputs),e.compute(Oh(e.inputs))}});var Dh,ye,Tu,Cu,Iu,Au,ku,Eu,Pu,zu,Ou,Bh,Du,Bu,Mu,Ru,tr,Uu,Kr,Nu,Vu,Wu,Lu,Gu,Hu,Fu,qu,Ku,ju,Zu,Qu,Yu,Xu,Ju,ed,td,rd,mo,fo,nd,od,id,Mh,Rh,ad,jr=G(()=>{"use strict";te();ae();Ce();ce();Dh=(e,t,n,r,o,a,s)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let p=P("inputData",n,[d],4),f=N("outputData",r,[d],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},ye=(e,t,n,r,o,a=e.dataType,s,d)=>{let l=[{type:12,data:Math.ceil(E.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Dh(p,E.size(e.dims),e.dataType,a,n,r,d),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(E.size(p[0].dims)/64/4)},programUniforms:l})}},Tu=e=>{e.compute(ye(e.inputs[0],"Abs","abs"))},Cu=e=>{e.compute(ye(e.inputs[0],"Acos","acos"))},Iu=e=>{e.compute(ye(e.inputs[0],"Acosh","acosh"))},Au=e=>{e.compute(ye(e.inputs[0],"Asin","asin"))},ku=e=>{e.compute(ye(e.inputs[0],"Asinh","asinh"))},Eu=e=>{e.compute(ye(e.inputs[0],"Atan","atan"))},Pu=e=>{e.compute(ye(e.inputs[0],"Atanh","atanh"))},zu=e=>re(e),Ou=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ye(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Bh=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:n})},Du=(e,t)=>{let n=t||Bh(e.inputs),r=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Bu=e=>{e.compute(ye(e.inputs[0],"Ceil","ceil"))},Mu=e=>{e.compute(ye(e.inputs[0],"Cos","cos"))},Ru=e=>{e.compute(ye(e.inputs[0],"Cosh","cosh"))},tr=e=>re(e),Uu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Nu=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Kr(t)))},Vu=e=>{e.compute(ye(e.inputs[0],"Exp","exp"))},Wu=e=>{e.compute(ye(e.inputs[0],"Floor","floor"))},Lu=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Kr(t)))},Gu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Hu=e=>{e.compute(ye(e.inputs[0],"Not",t=>`!${t}`))},Fu=e=>{e.compute(ye(e.inputs[0],"Neg",t=>`-${t}`))},qu=e=>{e.compute(ye(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Ku=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},ju=e=>{e.compute(ye(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Zu=e=>re(e),Qu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},Yu=e=>{e.compute(ye(e.inputs[0],"Sin","sin"))},Xu=e=>{e.compute(ye(e.inputs[0],"Sinh","sinh"))},Ju=e=>{e.compute(ye(e.inputs[0],"Sqrt","sqrt"))},ed=e=>{e.compute(ye(e.inputs[0],"Tan","tan"))},td=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,rd=e=>{e.compute(ye(e.inputs[0],"Tanh",td))},mo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${td("v")};
}
`,fo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,nd=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"FastGelu",fo,mo(t),void 0,e.inputs[0].dataType))},od=(e,t)=>{let n=ze(e.inputs[0].dataType);return e.compute(ye(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},id=e=>{e.compute(ye(e.inputs[0],"Log","log"))},Mh=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Rh=e=>`quick_gelu_impl(${e})`,ad=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"QuickGelu",Rh,Mh(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Uh,Nh,ud,dd=G(()=>{"use strict";ae();ce();jr();Uh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Nh=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=P("input",e[0].dataType,e[0].dims,4),r=P("bias",e[0].dataType,[e[0].dims[2]],4),o=N("output",e[0].dataType,t,4),a=E.size(t)/4,s=_e(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(n,r,o)}

  ${Kr(s)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ud=e=>{Uh(e.inputs),e.compute(Nh(e.inputs))}});var Vh,Wh,st,ld,cd,pd,md,fd,hd,gd,yd,bd,_d,wd=G(()=>{"use strict";te();ae();ce();Vh=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y,_;typeof d=="string"?y=_=(v,T)=>`${d}((${v}),(${T}))`:typeof d=="function"?y=_=d:(y=d.scalar,_=d.vector);let b=N("outputData",f,r.length,4),w=P("aData",l,t.length,4),S=P("bData",p,n.length,4),$;if(o)if(a){let v=E.size(t)===1,T=E.size(n)===1,C=t.length>0&&t[t.length-1]%4===0,A=n.length>0&&n[n.length-1]%4===0;v||T?$=b.setByOffset("global_idx",_(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",_(s||C?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||A?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=b.setByOffset("global_idx",_(w.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(T,C,A="")=>{let k=`aData[indexA${C}][componentA${C}]`,O=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${S.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${T}[${C}] = ${A}(${y(k,O)});
          `};f===9?$=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,S,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Wh=(e,t,n,r,o,a,s=n.dataType)=>{let d=n.dims.map(w=>Number(w)??1),l=r.dims.map(w=>Number(w)??1),p=!E.areEqual(d,l),f=d,h=E.size(d),y=!1,_=!1,b=[p];if(p){let w=rt.calcShape(d,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");f=w.slice(),h=E.size(f);let S=E.size(d)===1,$=E.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;b.push(S),b.push($),b.push(v),b.push(T);let C=1;for(let A=1;A<f.length;A++){let k=d[d.length-A],O=l[l.length-A];if(k===O)C*=k;else break}C%4===0?(_=!0,y=!0):(S||$||v||T)&&(y=!0)}else y=!0;return b.push(y),{name:e,shaderCache:{hint:t+b.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Vh(w,d,l,f,y,p,_,o,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(E.size(f)/4)},...H(d,l,f)]})}},st=(e,t,n,r,o,a)=>{e.compute(Wh(t,o??"",e.inputs[0],e.inputs[1],n,r,a))},ld=e=>{st(e,"Add",(t,n)=>`${t}+${n}`)},cd=e=>{st(e,"Div",(t,n)=>`${t}/${n}`)},pd=e=>{st(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},md=e=>{st(e,"Mul",(t,n)=>`${t}*${n}`)},fd=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;st(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},hd=e=>{st(e,"Sub",(t,n)=>`${t}-${n}`)},gd=e=>{st(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},yd=e=>{st(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},bd=e=>{st(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},_d=e=>{st(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Gh,Hh,Fh,qh,vd,$d,xd=G(()=>{"use strict";te();ae();Ce();ce();Gh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,a=r.dims.length;e.forEach((s,d)=>{if(d!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==r.dims[p])throw new Error("non concat dimensions must match")})}})},Hh=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Fh=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(a):o===0?r.push(`if (inputIndex == ${o}u) { ${a} }`):o===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${o}) { ${a} }`)}return r.join(`
`)},qh=(e,t,n,r)=>{let o=E.size(n),a=new Array(e.length),s=new Array(e.length),d=0,l=[],p=[],f=[{type:12,data:o}];for(let w=0;w<e.length;++w)d+=e[w].dims[t],a[w]=d,p.push(e[w].dims.length),s[w]=P(`input${w}`,r,p[w]),l.push("rank"),f.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)f.push(...H(e[w].dims));f.push(...H(n));let h=N("output",r,n.length),y=h.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),b=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)w.registerUniform(`sizeInConcatAxis${S}`,"u32");return w.declareVariables(...s,h)})()}

  ${Hh(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Fh(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:b}},vd=(e,t)=>{let n=e.inputs,r=n[0].dims,o=E.normalizeAxis(t.axis,r.length);Gh(n,o);let a=r.slice();a[o]=n.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let s=n.filter(d=>E.size(d.dims)>0);e.compute(qh(s,o,a,n[0].dataType),{inputs:s})},$d=e=>re({axis:e.axis})});var je,Ze,Qe,Zr,vt=G(()=>{"use strict";te();ae();je=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ze=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Qe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[Ls,Gs];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var Ee,Sd,Qr=G(()=>{"use strict";Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Sd=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Td,Cd=G(()=>{"use strict";Td=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var rr,Yr,Xr=G(()=>{"use strict";te();ae();ce();vt();rr=(e,t,n,r,o)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,d)=>`
      if (${K(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,K(o,d+a,r))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},Yr=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s[s.length-2],p=d[d.length-1],f=s[s.length-1],h=ge(p),y=ge(f),_=ge(l),b=E.size(n)/h/_,w=e.length>2,S=r?r.slice(0,-2):n.slice(0,-2),v=[E.size(S),l,p],T=[{type:12,data:b},{type:12,data:l},{type:12,data:p},{type:12,data:f}];Ze(t,T),T.push(...H(S,s,d)),w&&T.push(...H(e[2].dims)),T.push(...H(v));let C=A=>{let k=Gr("batch_dims",e[0].dataType,S.length),O=P("a",e[0].dataType,s.length,y),M=P("b",e[1].dataType,d.length,h),V=N("output",e[0].dataType,v.length,h),F=_e(V.type.tensor),j=je(t,V.type.value,F),ne=[O,M],W="";if(w){let Q=o?h:1;ne.push(P("bias",e[2].dataType,e[2].dims.length,Q)),W=`${o?`value += bias[col / ${Q}];`:`value += ${V.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qe(t,J);let ve=()=>{let Q=`var a_data: ${O.type.value};`;for(let ee=0;ee<y;ee++)Q+=`
              let b_data${ee} = b[(b_offset + (k + ${ee}) * uniforms.N + col) / ${h}];`;for(let ee=0;ee<_;ee++){Q+=`a_data = a[(a_offset + (row + ${ee}) * uniforms.K + k) / ${y}];`;for(let le=0;le<y;le++)Q+=`
            values[${ee}] = fma(${M.type.value}(a_data${y===1?"":`[${le}]`}), b_data${le}, values[${ee}]);
`}return Q};return`
  ${A.registerUniforms(J).registerInternalVariables(k).declareVariables(...ne,V)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${rr("a_indices",O,O.rank-2,k.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${M.type.indices};
    ${rr("b_indices",M,M.rank-2,k.rank,"batch_indices")}
    ${M.indicesSet("b_indices",M.rank-2,0)}
    ${M.indicesSet("b_indices",M.rank-1,0)}
    let b_offset = ${M.indicesToOffset("b_indices")};
    var values: array<${V.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${ve()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${W}
      ${j}
      let cur_indices = ${V.type.indices}(batch, row + i, col);
      let offset = ${V.indicesToOffset("cur_indices")};
      ${V.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${y};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:T}),getShaderSource:C}}});var Kh,jh,ho,Id,Zh,go,Qh,nr,Jr=G(()=>{"use strict";te();ae();ce();vt();Xr();Qr();Kh=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,jh=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ho=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=o?l:a,h=o?a:l,y=f/t[0],_=a/t[1];if(!((o&&y===4&&e[1]===4||!o&&(y===3||y===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${n}>, ${f/y}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Kh(o,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${jh(o,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Id=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Zh=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",go=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=o?p:a,y=o?a:p;if(!(y%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],b=h/t[0],w=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Id(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Id(o,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
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
      ${Zh(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${f}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Qh=(e,t,n,r,o=!1)=>{let[a,s,d,l]=r,p=_e(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${rr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${d.type.indices};
        ${rr("bIndices",d,d.rank-2,a.rank,"batchIndices")}
        ${d.indicesSet("bIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("bIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},nr=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s.slice(0,-2),p=d.slice(0,-2),f=r?r.slice(0,-2):n.slice(0,-2),h=E.size(f),y=s[s.length-2],_=s[s.length-1],b=d[d.length-1],w=_%4===0&&b%4===0,S=y<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(b/$[0]/S[0]),Math.ceil(y/$[1]/S[1]),Math.ceil(h/$[2]/S[2])],T=w?4:1,C=[...l,y,_/T],A=C.length,k=[...p,_,b/T],O=k.length,M=[h,y,b/T],V=[{type:6,data:y},{type:6,data:b},{type:6,data:_}];Ze(t,V),V.push(...H(f,C,k));let F=["rank","rank"],j=e.length>2;j&&(V.push(...H(e[2].dims)),F.push("rank")),V.push(...H(M));let ne=W=>{let J=f.length,ve=Gr("batchDims",e[0].dataType,J,1),Q=_e(e[0].dataType),ee=P("a",e[0].dataType,A,T),le=P("b",e[1].dataType,O,T),Z=N("result",e[0].dataType,M.length,T),pe=[ee,le];if(j){let Y=o?T:1;pe.push(P("bias",e[2].dataType,e[2].dims.length,Y))}let ke=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qe(t,ke);let Se=_e(Z.type.tensor),D=je(t,Z.type.value,Se),R=Qh(T,j,D,[ve,ee,le,Z],o);return`
  ${W.registerUniforms(ke).registerInternalVariables(ve).declareVariables(...pe,Z)}
  ${R}
  ${w?ho(S,$,Q,ve):go(S,$,Q,ve)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${w};${o}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:V}),getShaderSource:ne}}});var Yh,Ad,kd=G(()=>{"use strict";te();tt();ce();vt();Qr();Cd();Jr();Yh=(e,t,n,r,o=!1,a,s=4,d=4,l=4,p="f32")=>{let f=F=>{switch(F){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},h=F=>{switch(F){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},y=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ee(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${w}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,T=e?t&&r?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ee(s,p)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ee(s,p)}(0.0);`,C=e?r&&n?h(d):`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(d)}
    }
    return ${Ee(d,p)}(0.0);`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(d)}
    }
    return ${Ee(d,p)}(0.0);`,A=Ee(l,p),k=e?Ee(s,p):Ee(d,p),O=e?Ee(d,p):Ee(s,p),M=je(a,A,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?T:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?C:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Sd(o)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ad=(e,t,n,r,o,a,s,d,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=n[0],y=p?n[2]:n[3],_=p?n[1]:n[2],b=p?n[3]:n[1],w=p&&(f%4===0||f%3===0)&&b%4===0,S=p?b:y*_,$=p?y*_:b,v=[8,8,1],T=r<=8?[4,1,1]:[4,4,1],C=[Math.ceil(S/v[0]/T[0]),Math.ceil($/v[1]/T[1]),Math.ceil(h/v[2]/T[2])];me("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let A=w?p&&f%4!==0?3:4:1,k=v[1]*T[1],O=v[0]*T[0],M=Math.max(v[0]*A,v[1]),V=r%k===0,F=o%O===0,j=a%M===0,ne=w?[A,4,4]:[1,1,1],W=[{type:6,data:r},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ze(t,W),W.push(...H(e[0].dims,e[1].dims));let J=["rank","rank"];s&&(W.push(...H(e[2].dims)),J.push("rank")),W.push(...H(n));let ve=Q=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qe(t,ee);let le=w?4:1,Z=_e(e[0].dataType),pe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${w?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,ke=P("x",e[0].dataType,e[0].dims.length,A===3?1:A),Se=P("w",e[1].dataType,e[1].dims.length,le),D=[ke,Se],R=N("result",e[0].dataType,n.length,le);if(s){let Y=P("bias",e[2].dataType,e[2].dims.length,le);D.push(Y),pe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${Z}>`:Z} {
          return bias[coords.${p?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Td("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Q.registerUniforms(ee).declareVariables(...D,R)}
        ${pe}
        ${Yh(p,V,F,j,s,t,ne[0],ne[1],ne[2],Z)}
        ${w?ho(T,v,Z,void 0,!p,M):go(T,v,Z,void 0,!p,M,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${w};${V};${F};${j};${k};${O};${M}`,inputDependencies:J},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:W}),getShaderSource:ve}}});var Xh,Ed,en,Jh,Pd,eg,zd,Od,Dd=G(()=>{"use strict";te();tt();ae();ce();vt();Qr();Xh=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ed=e=>typeof e=="number"?[e,e,e]:e,en=(e,t)=>t<=1?e:e+(e-1)*(t-1),Jh=(e,t,n,r=1)=>{let o=en(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},Pd=(e,t,n,r,o)=>{o==null&&(o=Jh(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return a},eg=(e,t,n,r,o,a,s,d,l,p)=>{let f,h,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Pd([t,n,r,1],[d,l,p],1,[o,a,s],e);h=b[0],y=b[1],_=b[2]}else if(Array.isArray(e)){if(!e.every((w,S,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Pd([t,n,r,1],[d,l,p],1,[o,a,s],e[0]);h=b[0],y=b[1],_=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/o),y=Math.ceil(n/a),_=Math.ceil(r/s);let b=(h-1)*o+d-t,w=(y-1)*a+l-n,S=(_-1)*s+p-r,$=Math.floor(b/2),v=b-$,T=Math.floor(w/2),C=w-T,A=Math.floor(S/2),k=S-A;f={top:T,bottom:C,left:A,right:k,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:y,outWidth:_}},zd=(e,t,n,r,o,a=!1,s="channelsLast")=>{let d,l,p,f,h;if(s==="channelsLast")[d,l,p,f,h]=e;else if(s==="channelsFirst")[d,h,l,p,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[y,,_,b,w]=t,[S,$,v]=Ed(n),[T,C,A]=Ed(r),k=en(_,T),O=en(b,C),M=en(w,A),{padInfo:V,outDepth:F,outHeight:j,outWidth:ne}=eg(o,l,p,f,S,$,v,k,O,M),W=a?y*h:y,J=[0,0,0,0,0];return s==="channelsFirst"?J=[d,W,F,j,ne]:s==="channelsLast"&&(J=[d,F,j,ne,W]),{batchSize:d,dataFormat:s,inDepth:l,inHeight:p,inWidth:f,inChannels:h,outDepth:F,outHeight:j,outWidth:ne,outChannels:W,padInfo:V,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:b,filterWidth:w,effectiveFilterDepth:k,effectiveFilterHeight:O,effectiveFilterWidth:M,dilationDepth:T,dilationHeight:C,dilationWidth:A,inShape:e,outShape:J,filterShape:t}},Od=(e,t,n,r,o,a)=>{let s=a==="channelsLast",d=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],f={x:n.map((v,T)=>T)},h=[Math.ceil(Xh(f.x.map(v=>n[v]))/p[0]),1,1];me("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let y=l?s&&d%4!==0?3:4:1,_=E.size(n),b=[{type:12,data:_},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ze(t,b),b.push(...H(e[0].dims,e[1].dims));let w=["rank","rank"],S=e.length===3;S&&(b.push(...H(e[2].dims)),w.push("rank")),b.push(...H(n));let $=v=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Qe(t,T);let C=l?4:1,A=_e(e[0].dataType),k=P("x",e[0].dataType,e[0].dims.length,y===3?1:y),O=P("W",e[1].dataType,e[1].dims.length,C),M=[k,O],V=N("result",e[0].dataType,n.length,C),F="";if(S){let W=P("bias",e[2].dataType,e[2].dims.length,C);M.push(W),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${A}>`:A} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}${l?"/ 4":""}];
        }`}let j=Ee(y,A),ne=je(t,j,A);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${v.registerUniforms(T).declareVariables(...M,V)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${V.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,k.rank)};
              let d2 = ${s?K("coords",k.rank-1,k.rank):K("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,k.rank):K("coords",2,k.rank)},
              ${s?K("coords",2,k.rank):K("coords",3,k.rank)},
              ${s?K("coords",3,k.rank):K("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,k.rank):K("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,k.rank):K("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,k.rank):K("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,k.rank):K("uniforms.x_shape",1,k.rank)};
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
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${ne}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${y};${S}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:b}),getShaderSource:$}}});var Bd,Md,Rd=G(()=>{"use strict";te();ae();ce();vt();Bd=(e,t,n,r)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,d=e[1].dims,l=t.format==="NHWC",p=l?n[3]:n[1],f=p/t.group,h=l&&f>=4?ge(p):1,y=E.size(n)/h,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Ze(t,_),_.push(...H(s,[d[0],d[1],d[2],d[3]/h]));let b=o?["rank","rank","rank"]:["rank","rank"];_.push(...H([n[0],n[1],n[2],n[3]/h]));let w=S=>{let $=N("output",e[0].dataType,n.length,h),v=_e($.type.tensor),T=je(t,$.type.value,v),C=P("x",e[0].dataType,s.length),A=P("w",e[1].dataType,d.length,h),k=[C,A];o&&k.push(P("b",e[2].dataType,e[2].dims,h));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qe(t,O);let M=l?`
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
            let xVal = ${C.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(O).declareVariables(...k,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${M}
    ${a}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},Md=(e,t,n,r)=>{let o=e.length>2,a=ge(n[3]),s=ge(n[2]),d=E.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[n[0],n[1],n[2],n[3]/a],h=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ze(t,h),h.push(...H(l,p,f));let y=(s-1)*t.strides[1]+p[1],_=b=>{let w=N("output",e[0].dataType,f.length,a),S=_e(w.type.tensor),$=je(t,w.type.value,S),v=P("x",e[0].dataType,l.length,a),T=P("w",e[1].dataType,p.length,a),C=[v,T];o&&C.push(P("b",e[2].dataType,e[2].dims,a));let A=o?"value += b[output_channel];":"",k=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qe(t,k),`
  ${b.registerUniforms(k).declareVariables(...C,w)}
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

    var x_vals: array<${v.type.value}, ${y}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${y}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${A}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${y};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}}});var tg,yo,rg,bo,_o,Ud,ng,og,wo,Nd=G(()=>{"use strict";ae();kd();Dd();Jr();Rd();vt();Xr();ct();tg=(e,t,n,r,o,a)=>{let s=e[0],d=e.slice(a?1:2,a?3:4),l=d.length,p=t[0],h=t.slice(2).map((b,w)=>b+(b-1)*(n[w]-1)),_=d.map((b,w)=>b+r[w]+r[w+l]).map((b,w)=>Math.floor((b-h[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,p),_},yo=[2,3,1,0],rg=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},bo=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();kt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},_o=e=>{let t=Zr(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,d=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Ud=(e,t,n,r)=>{let o=n.format==="NHWC",a=tg(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let k=[t[0]];if(o){let M=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=M),k.push(M)}else k.push(t[1]);t.length===3&&k.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Md(k,n,a,r),{inputs:k}):e.compute(Bd(k,n,a,r),{inputs:k});return}let s=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],p=t[0].dims[o?3:1],f=t[1].dims[2],h=t[1].dims[3],y=a[o?1:2],_=a[o?2:3],b=a[o?3:1],w=o&&f===d&&h===l&&n.pads[0]===0&&n.pads[1]===0;if(w||f===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let k=a[0],O,M,V,F=[];if(o){let W=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),w){let J=d*l*p;O=t[0].reshape([1,k,J]),M=W.reshape([1,J,b]),V=[1,k,b]}else O=t[0].reshape([k,d*l,p]),M=W.reshape([1,p,b]),V=[k,y*_,b];F.push(O),F.push(M)}else O=t[0].reshape([k,p,d*l]),M=t[1].reshape([1,b,p]),V=[k,b,y*_],F.push(M),F.push(O);s&&F.push(t[2]);let j=V[2],ne=F[0].dims[F[0].dims.length-1];j<8&&ne<8?e.compute(Yr(F,n,a,V,o,r),{inputs:F}):e.compute(nr(F,n,a,V,o,r),{inputs:F});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];s&&v.push(t[2]);let T=o?y*_:b,C=o?b:y*_,A=f*h*p;e.compute(Ad(v,n,a,T,C,A,s,S,r),{inputs:v})},ng=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=bo({...t,pads:o,strides:a,dilations:s,kernelShape:d},r);Ud(e,r,l,p=>n?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},og=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=bo(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=zd(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Od(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},wo=(e,t)=>{if(rg(e.inputs,t),e.inputs[0].dims.length===3)ng(e,t);else if(e.inputs[0].dims.length===5)og(e,e.inputs,t);else{let n=bo(t,e.inputs);Ud(e,e.inputs,n)}}});var Vd,Wd=G(()=>{"use strict";te();tt();ae();ce();Vd=(e,t,n)=>{let r=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,d=e[1].dims,l=d[2]/s,p=d[3],f=a?ge(l):1,h=a?ge(p):1,y=a?p===1?f:h:1,_=E.size(o)/h,b=[Math.ceil(_/64),1,1];me("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let w=["rank","rank"],S=[t.strides[0],t.strides[1]],$=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],v=[t.dilations[0],t.dilations[1]],T=[$[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),$[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],C=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],A=[{type:12,data:_},{type:12,data:S},{type:12,data:$},{type:12,data:v},{type:12,data:T},{type:6,data:C},{type:12,data:l},{type:12,data:p},...H(e[0].dims,e[1].dims)];r&&(A.push(...H(e[2].dims)),w.push("rank")),A.push(...H(o));let k=O=>{let M=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:T.length},{name:"pads",type:"i32",length:C.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=_e(e[0].dataType),F=a?1:2,j=a?2:3,ne=a?3:1,W=P("W",e[1].dataType,e[1].dims.length,y),J=P("Dy",e[0].dataType,e[0].dims.length,f),ve=[J,W];r&&ve.push(P("bias",e[2].dataType,[o[ne]].length,h));let Q=N("result",e[0].dataType,o.length,h),ee=()=>{let Z="";if(f===1)Z+=`
        let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${W.getByOffset(`w_offset / ${y}`)};
        dotProd = dotProd + xValue * wValue;`;else if(p===1)Z+=`
          let wValue = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${y}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let pe=0;pe<f;pe++)Z+=`
            let wValue${pe} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${pe}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${pe}] * wValue${pe};`;return Z},le=`
            let outputIndices = ${Q.offsetToIndices(`global_idx * ${h}`)};
            let batch = ${Q.indicesGet("outputIndices",0)};
            let d1 = ${Q.indicesGet("outputIndices",ne)};
            let r = ${Q.indicesGet("outputIndices",F)};
            let c = ${Q.indicesGet("outputIndices",j)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Q.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${j}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${f}) {
                  let xValue = ${a?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):J.get("batch","inputChannel","idyR","idyC")};
                  ${ee()}
                  inputChannel = inputChannel + ${f};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${h}]`:""};
            ${Q.setByOffset("global_idx","value")};
          `;return`
    ${O.registerUniforms(M).declareVariables(...ve,Q)}
      ${O.mainStart()}
      ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${le}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${y}${h}${p===1}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:A}),getShaderSource:k}}});var ig,ag,sg,Ld,Gd,ug,Hd,dg,Fd,qd=G(()=>{"use strict";Wd();vt();ct();ig=(e,t,n,r,o,a)=>(e-1)*t+n+(r-1)*o+1-a,ag=(e,t,n,r,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[o]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[o]=a)},sg=(e,t,n,r,o,a,s,d,l,p)=>{let f=e.length-2,h=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let y=e[0],_=t[d?3:1]*o;for(let b=0,w=e.length-f-(d?1:0);b<f;++b,++w){let S=e[w],$=h?S*s[b]:p[b],v=ig(S,s[b],a[b],t[w],n[b],$);ag(v,r,a,b,b+f),h&&p.push(s[b]*(S-1)+l[b]+(t[w]-1)*n[b]+1-a[b]-a[b+f])}p.splice(0,0,y),p.splice(d?3:1,0,_)},Ld=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,y)=>h*y,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}sg(d,n,l,e.autoPad,e.group,o,p,r,s,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:a,dilations:l,strides:p}),f},Gd=e=>{let t=Zr(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,d=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,outputPadding:f,outputShape:h,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ug=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((f,h)=>f+h,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((f,h)=>f+h,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((f,h)=>f+h,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((f,h)=>f+h,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Hd=(e,t,n,r)=>{let o=e.kernelCustomData.wT??e.compute(Oe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(Vd(a,n,r),{inputs:a})},dg=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let p=Ld({...t,pads:d,strides:s,dilations:a,kernelShape:o,outputPadding:l},r);Hd(e,r,p,f=>n?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},Fd=(e,t)=>{if(ug(e.inputs,t),e.inputs[0].dims.length===3)dg(e,t);else{let n=Ld(t,e.inputs);Hd(e,e.inputs,n)}}});var lg,Kd,jd,Zd=G(()=>{"use strict";te();ae();Ce();ce();lg=(e,t,n,r)=>{let o=E.size(t),a=t.length,s=P("input",e,a),d=N("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),p=E.normalizeAxis(l,a),f=h=>{let y=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),b=r.reverse?y+(r.exclusive?" + 1":""):"0",w=r.reverse?_:y+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,d)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...H(t,t)]}),getShaderSource:f}},Kd=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(lg(r,n,o,t),{inputs:[0]})},jd=e=>{let t=e.exclusive===1,n=e.reverse===1;return re({exclusive:t,reverse:n})}});var cg,pg,mg,Qd,Yd,Xd=G(()=>{"use strict";te();ae();Ce();ce();cg=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},pg=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)o.push(n.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},mg=(e,t)=>{let n,r,o,a,s,d,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([n,r,o,a]=e.dims,s=f?[n,r,o,p,p,a/p**2]:[n,r,o,a/p**2,p,p],d=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[n,p,p,a/p**2,r,o]:[n,a/p**2,p,p,r,o],d=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),y=h.dims.length,_=e.dataType,b=P("a",_,y),w=N("output",_,y),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(b,w)}

  ${pg(d,y,b,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[n,r*p,o*p,a/p**2]:[n,a/p**2,r*p,o*p],T=E.size(v),C=h.dims,A=E.sortBasedOnPerm(C,d);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...H(C,A)]}},getShaderSource:S}},Qd=(e,t)=>{cg(e.inputs),e.compute(mg(e.inputs[0],t))},Yd=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var vo,tn,Jd,fg,hg,$o,xo,el,gg,tl,rl,nl=G(()=>{"use strict";te();ae();Ce();ce();vo="[a-zA-Z]|\\.\\.\\.",tn="("+vo+")+",Jd="^"+tn+"$",fg="("+tn+",)*"+tn,hg="^"+fg+"$",$o=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},xo=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(hg)))throw new Error("Invalid LHS term");if(r.split(",").forEach((d,l)=>{let p=t[l].dims.slice();if(!d.match(RegExp(Jd)))throw new Error("Invalid LHS term");let f=this.processTerm(d,!0,p,l);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(tn)))throw new Error("Invalid RHS");o.match(RegExp(vo,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let a=r.length,s=!1,d=[],l=0;if(!t.match(RegExp(Jd))&&!n&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(vo,"g")),f=new $o(o);return p?.forEach((h,y)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(d=r.slice(l,l+_),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<d.length;b++){let w=String.fromCharCode(48+b);f.addSymbol(w,y+b),this.addSymbol(w,r[l++],o)}}else f.addSymbol(h,y+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[l++],o)}),f}},el=e=>e+"_max",gg=(e,t,n,r)=>{let a=e.map(f=>f.length).map((f,h)=>P(`input${h}`,t,f)),s=E.size(r),d=N("output",t,r.length),l=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),p=f=>{let h=[],y="var prod = 1.0;",_="var sum = 0.0;",b="sum += prod;",w=[],S=[],$=[],v=[],T=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((A,k)=>{if(n.rhs.symbolToIndices.has(k)){let O=n.rhs.symbolToIndices.get(k)?.[0];O!==void 0&&n.lhs.forEach((M,V)=>{if(A.inputIndices.includes(V)){let F=M.symbolToIndices.get(k);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(j=>{h.push(`${a[V].indicesSet(`input${V}Indices`,j,d.indicesGet("outputIndices",O))}`)})}})}else n.lhs.forEach((O,M)=>{if(A.inputIndices.includes(M)){let V=O.symbolToIndices.get(k);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(F=>{w.push(`${a[M].indicesSet(`input${M}Indices`,F,`${k}`)}`)}),v.push(`prod *= ${a[M].getByIndices(`input${M}Indices`)};`)}}),S.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${el(k)}; ${k}++) {`),$.push("}")});let C=T?[...h,`let sum = ${a.map((A,k)=>A.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...h,_,...S,...w,y,...v,b,...$];return`
            ${f.registerUniforms(l.map(A=>({name:`${el(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,d)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${a.map((A,k)=>`var input${k}Indices: ${a[k].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let f=l.filter(y=>n.symbolToInfo.has(y)).map(y=>({type:12,data:n.symbolToInfo.get(y)?.dimValue||0}));f.push({type:12,data:s});let h=e.map((y,_)=>[...H(y)]).reduce((y,_)=>y.concat(_),f);return h.push(...H(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:p}},tl=(e,t)=>{let n=new xo(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(gg(o,e.inputs[0].dataType,n,r))},rl=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var yg,ol,bg,_g,il,al=G(()=>{"use strict";te();ae();ce();yg=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ol=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},bg=(e,t)=>e.length>t.length?ol(e,t):ol(t,e),_g=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=bg(t,n),o=e[0].dataType,a=o===9||E.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,d=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(E.size(r)/d),p=h=>{let y=P("input",o,t.length,s),_=N("output",o,r.length,d),b;if(o===9){let w=(S,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${y.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${v}(${y.getByOffset(`index${$}`)}[component${$}]);
        `;b=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${y.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${y.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(y,_)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},f=[{type:12,data:l},...H(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${d}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},il=e=>{yg(e.inputs),e.compute(_g(e.inputs),{inputs:[0]})}});var wg,sl,ul=G(()=>{"use strict";te();ae();ce();jr();wg=e=>{let t=e[0].dataType,n=E.size(e[0].dims),r=E.size(e[1].dims),o=r%4===0,a=s=>{let d=P("x",t,[1],4),l=P("bias",t,[1],4),p=N("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(d,l,p)}

    ${mo(ze(t))}

    ${s.mainStart(Et)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",fo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Et/4)}})}},sl=e=>{e.inputs.length<2||E.size(e.inputs[1].dims)===0?nd(e):e.compute(wg(e.inputs))}});var vg,$g,dl,ll,cl=G(()=>{"use strict";te();ae();Ce();ce();vg=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},$g=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(a,1,...r);let d=n[a],l=e[0].dataType===9?4:1,p=Math.ceil(E.size(s)/l),f=[{type:12,data:p},{type:6,data:d},{type:12,data:a},...H(e[0].dims,e[1].dims,s)],h=y=>{let _=P("data",e[0].dataType,e[0].dims.length,l),b=P("inputIndices",e[1].dataType,e[1].dims.length),w=N("output",e[0].dataType,s.length,l),S=v=>{let T=r.length,C=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let A=0;A<T;A++)C+=`${T>1?`indicesIndices${v}[${A}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${A}]`:`outputIndices${v}`};`;C+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let A=0,k=0;A<o;A++)A===a?(C+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = u32(idx${v});`,k+=T):(C+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${k}]`:`outputIndices${v}`};`,k++);return C},$;if(e[0].dataType===9){let v=(T,C,A="")=>`
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${S(C)};
          let offset${C} = ${_.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${T}[${C}] = ${A}(${_.getByOffset(`index${C}`)}[component${C}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,b,w)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},dl=e=>re({axis:e.axis}),ll=(e,t)=>{let n=e.inputs;vg(n),e.compute($g(e.inputs,t))}});var xg,pl,ml,fl=G(()=>{"use strict";te();ae();ce();xg=(e,t,n,r,o,a,s,d,l)=>{let p=[{type:12,data:a},{type:12,data:r},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:d},{type:12,data:l}],f=[a];p.push(...H(t.dims,f));let h=y=>{let _=P("indices_data",t.dataType,t.dims.length),b=N("input_slice_offsets_data",12,1,1),w=[_,b],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(S).declareVariables(...w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},pl=(e,t)=>{let n=e.inputs,r=n[0].dims,o=n[0].dataType,a=n[1].dims,s=a[a.length-1],d=E.sizeToDimension(a,a.length-1),l=E.sizeFromDimension(r,t.batchDims+s),p=E.sizeToDimension(r,t.batchDims),f=E.sizeFromDimension(r,t.batchDims),h=d/p,y=new Array(s),_=l;for(let C=0;C<s;++C)y[s-1-C]=_,_*=r[t.batchDims+s-1-C];let b=xg(e,n[1],y,t.batchDims,r,d,h,f,s),w=t.batchDims+s;if(w>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(r.slice(w)),$=E.size(S),v=[{type:12,data:$},{type:12,data:l},...H(n[0].dims,b.dims,S)],T=C=>{let A=P("data",n[0].dataType,n[0].dims.length),k=P("slice_offsets",12,b.dims.length),O=N("output",n[0].dataType,S.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,k,O)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:T},{inputs:[n[0],b]})},ml=e=>({batchDims:e.batch_dims,cacheKey:""})});var Sg,Tg,hl,gl,yl=G(()=>{"use strict";te();ae();Ce();ce();Sg=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=E.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===n?Math.ceil(d/r)===a.dims[l]:d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((d,l)=>d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Tg=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.gatherAxis,o),s=E.normalizeAxis(t.quantizeAxis,o),d=n.slice(0);d.splice(a,1,...r);let l=E.size(d),p=e[2].dataType,h=e[0].dataType===22,y=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...H(...e.map((b,w)=>b.dims),d)],_=b=>{let w=P("data",e[0].dataType,e[0].dims.length),S=P("inputIndices",e[1].dataType,e[1].dims.length),$=P("scales",e[2].dataType,e[2].dims.length),v=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,T=N("output",p,d.length),C=[w,S,$];v&&C.push(v);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(A).declareVariables(...C,T)}
        ${b.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${T.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${T.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${T.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${T.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ze(p)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,w)=>w!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,w)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:_}},hl=(e,t)=>{let n=e.inputs;Sg(n,t),e.compute(Tg(e.inputs,t))},gl=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Cg,Ig,bl,_l,wl=G(()=>{"use strict";te();ae();Ce();ce();Cg=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ig=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,a=e[1].dims,s=e[1].dataType,d=E.normalizeAxis(t.axis,o),l=n[d],p=a.slice(0),f=E.size(p),h=P("input",r,o),y=P("indicesInput",s,a.length),_=N("output",r,p.length),b=[{type:12,data:f},{type:6,data:l},{type:12,data:d}];return b.push(...H(n,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,y,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},bl=e=>re({axis:e.axis}),_l=(e,t)=>{let n=e.inputs;Cg(n),e.compute(Ig(e.inputs,t))}});var Ag,kg,vl,$l,xl=G(()=>{"use strict";te();ae();ce();Ag=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},kg=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,a,s]=Wr.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),d=[o,a];if(!d)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),f=Math.ceil(o/l),h=!0,y=E.size(d),_=[{type:12,data:h?p:y},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(_.push(...H(e[2].dims)),b.push("rank")),_.push(...H(d));let w=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",C=P("a",e[0].dataType,e[0].dims),A=P("b",e[1].dataType,e[1].dims),k=C.type.value,O=null,M=[C,A];e.length===3&&(O=P("c",e[2].dataType,e[2].dims.length),M.push(O));let V=N("output",e[0].dataType,d.length);M.push(V);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...M)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${k}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${T}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${k}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let v=P("a",e[0].dataType,e[0].dims),T=P("b",e[1].dataType,e[1].dims),C=null,A=[v,T];e.length===3&&(C=P("c",e[2].dataType,e[2].dims.length),A.push(C));let k=N("output",e[0].dataType,d.length);A.push(k);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",V="";t.transA&&t.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(V=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(O).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${k.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${k.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},vl=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},$l=(e,t)=>{Ag(e.inputs),e.compute(kg(e.inputs,t))}});var pt,$t,Nt,Vt,Eg,Pg,zg,Og,Dg,Bg,Mg,Rg,Sl,Tl,Cl=G(()=>{"use strict";te();ae();Ce();ce();[pt,$t,Nt,Vt]=[0,1,2,3],Eg=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Pg=`
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
`,zg=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Og=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Dg=e=>`
  ${e.paddingMode==="reflection"?`
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
`,Bg=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${pt}] = batch;
     indices[${$t}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Nt}] = u32(r);
            indices[${Vt}] = u32(c);
          }
        `;case"border":return`
          indices[${Nt}] = u32(clamp(r, 0, H - 1));
          indices[${Vt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Nt}] = gs_reflect(r, border[1], border[3]);
          indices[${Vt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Mg=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${pt}], indices[${$t}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${pt}], indices[${$t}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${pt}], indices[${$t}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Rg=(e,t)=>{let n=P("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=P("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[pt,$t,Nt,Vt]=[0,3,1,2]);let s=N("output",e[0].dataType,a.length),d=n.type.value,l=E.size(a),p=[{type:12,data:l},...H(e[0].dims,r,a)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${Pg}
  ${zg(d)}
  ${Og(t)}
  ${Dg(t)}
  ${Bg(n,d,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Nt}]);
      let W_in = i32(uniforms.x_shape[${Vt}]);

      ${t.alignCorners===0?`
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
      var grid_indices = vec3<u32>(indices[${pt}], indices[${Nt}], indices[${Vt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Mg(s,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let y=E.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:f}},Sl=(e,t)=>{Eg(e.inputs),e.compute(Rg(e.inputs,t))},Tl=e=>re({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Me,Vg,Al,Il,Wg,or,kl,So=G(()=>{"use strict";te();ae();Ce();Vr();qr();ce();ct();Me=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Vg=(e,t)=>{let n=e[0],r=Me(e,1),o=Me(e,2),a=Me(e,3),s=Me(e,4),d=Me(e,5),l=Me(e,6),p=Me(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],h=n.dims[1],y=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],_=h,b=0,w=0,S=Math.floor(y/t.numHeads);if(l&&p&&E.size(l.dims)&&E.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],w=l.dims[2]}else if(l&&E.size(l.dims)||p&&E.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(r&&E.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&E.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+_,T=0;if(s&&E.size(s.dims)>0){T=8;let O=s.dims;throw O.length===1?O[0]===f?T=1:O[0]===3*f+2&&(T=3):O.length===2&&O[0]===f&&O[1]===v&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,A=y;if(o&&E.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],C=!0}}let k=!1;if(s&&E.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(d&&E.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[2]!==h||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:y,vHiddenSize:A,headSize:S,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:k,passPastInKv:C,qkvFormat:$}},Al=e=>re({...e}),Il=re({perm:[0,2,1,3]}),Wg=(e,t,n,r,o,a,s)=>{let d=[r,o,a],l=E.size(d),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],f=h=>{let y=N("qkv_with_bias",t.dataType,d),_=P("qkv",t.dataType,d),b=P("bias",n.dataType,d),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(w).declareVariables(_,b,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,n],outputs:[-1]})[0]},or=(e,t,n,r,o,a,s,d)=>{let l=a;if(s&&E.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Wg(e,a,s,t,r,n*o,d),l=l.reshape([t,r,n,o]),n===1||r===1?l:e.compute(Oe(l,Il.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,o])),n===1||r===1?l:e.compute(Oe(l,Il.perm),{inputs:[l],outputs:[-1]})[0]},kl=(e,t)=>{let n=Vg(e.inputs,t),r=e.inputs[0],o=Me(e.inputs,1),a=Me(e.inputs,2),s=Me(e.inputs,3),d=Me(e.inputs,4),l=Me(e.inputs,5),p=Me(e.inputs,6),f=Me(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let h=o&&a&&o.dims.length===4&&a.dims.length===4,y=or(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(h)return Ut(e,y,o,a,d,void 0,p,f,l,n);if(!o||!a)throw new Error("key and value must be provided");let _=or(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),b=or(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);Ut(e,y,_,b,d,void 0,p,f,l,n)}});var Lg,Gg,Hg,Fg,To,El,Pl,Co=G(()=>{"use strict";te();ae();Ce();ce();Lg=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Gg=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),re({numOutputs:r,axis:t.axis,splitSizes:n})},Hg=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Fg=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},To=(e,t)=>{let n=e[0].dims,r=E.size(n),o=e[0].dataType,a=E.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),d=P("input",o,n.length),l=new Array(t.numOutputs),p=[],f=[],h=0,y=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],l[b]=h;let w=n.slice();w[a]=t.splitSizes[b],f.push(w),s[b]=N(`output${b}`,o,w.length),p.push({dims:f[b],dataType:e[0].dataType})}y.push({type:12,data:l},...H(n,...f));let _=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...s)}
  ${Hg(l.length)}
  ${Fg(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:y})}},El=(e,t)=>{Lg(e.inputs);let n=e.inputs.length===1?t:Gg(e.inputs,t);e.compute(To(e.inputs,n),{inputs:[0]})},Pl=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:r,splitSizes:n})}});var qg,Kg,zl,Ol,Dl=G(()=>{"use strict";Ce();qr();So();Co();ct();qg=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=n.dims[0],p=n.dims[1],f=n.dims.length===3?d?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=p,y=0,_=!r||r.dims.length===0,b=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=b*t.numHeads);let w=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=a.dims[2]}else if(w||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let T=0,C=!1,A=t.kvNumHeads?b*t.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],C=!0}}let k=e.length>4?e[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:A,headSize:b,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:v}},Kg=re({perm:[0,2,1,3]}),zl=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(Oe(r,Kg.perm),{inputs:[r],outputs:[-1]})[0]),r},Ol=(e,t)=>{let n=qg(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=re({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,f*n.headSize,f*n.headSize]}),[y,_,b]=!o&&!a?e.compute(To([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,a],w=or(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,y,void 0,0);Ut(e,w,zl(e,_,n),zl(e,b,n),void 0,void 0,s,d,void 0,n,l,p)}});var Bl,jg,Zg,Ml,Rl=G(()=>{"use strict";te();ae();ct();ce();Bl=(e,t,n,r,o,a,s,d)=>{let l=ge(a),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,h=o*s,y=64;h===1&&(y=256);let _=[o,s,a/l],b=[o,s,2],w=["rank","type","type"],S=[];S.push(...H(_,b));let $=v=>{let T=P("x",t.dataType,3,l),C=P("scale",n.dataType,n.dims),A=P("bias",r.dataType,r.dims),k=N("output",1,3,2),O=[T,C,A,k];return`
  var<workgroup> workgroup_shared : array<${f}, ${y}>;
  const workgroup_size = ${y}u;
  ${v.declareVariables(...O)}
  ${v.mainStart(y)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
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
      let sum_final = ${Ke("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ke("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:S}),getShaderSource:$},{inputs:[t,n,r],outputs:[-1]})[0]},jg=(e,t,n)=>{let r=t[0].dims,o=r,a=2,s=r[0],d=r[1],l=E.sizeFromDimension(r,a),p=ge(l),f=E.size(o)/p,h=Bl(e,t[0],t[1],t[2],s,l,d,n.epsilon),y=[s,d,l/p],_=[s,d],b=["type","none"],w=S=>{let $=P("x",t[0].dataType,y.length,p),v=P("scale_shift",1,_.length,2),T=N("output",t[0].dataType,y.length,p),C=[$,v,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...C)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...H(y,_,y)]}),getShaderSource:w},{inputs:[t[0],h]})},Zg=(e,t,n)=>{let r=t[0].dims,o=r,a=r[0],s=r[r.length-1],d=E.sizeFromDimension(r,1)/s,l=ge(s),p=E.size(o)/l,f=[{type:12,data:d},{type:12,data:Math.floor(s/l)}],h=["type","type"],y=!1,_=[0,r.length-1];for(let $=0;$<r.length-2;$++)y=y||r[$+1]!==1,_.push($+1);y=y&&r[r.length-1]!==1;let b=y?e.compute(Oe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},($,v)=>r[_[v]])),w=Bl(e,b,t[1],t[2],a,d,s,n.epsilon),S=$=>{let v=_e(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,C=O=>{let M=O===0?"x":"y",V=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${V}(scale.${M}))`;case 2:return`vec2<${v}>(${V}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${v}>(${V}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${l}`)}},A=P("input",t[0].dataType,t[0].dims,l),k=N("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${k.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:S},{inputs:[t[0],w]})},Ml=(e,t)=>{t.format==="NHWC"?Zg(e,e.inputs,t):jg(e,e.inputs,t)}});var Qg,Yg,Ul,Nl=G(()=>{"use strict";te();ae();ce();Qg=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Yg=(e,t,n)=>{let r=t.simplified,o=e[0].dims,a=e[1],s=!r&&e[2],d=o,l=E.normalizeAxis(t.axis,o.length),p=E.sizeToDimension(o,l),f=E.sizeFromDimension(o,l),h=E.size(a.dims),y=s?E.size(s.dims):0;if(h!==f||s&&y!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${y}`);let _=[];for(let A=0;A<o.length;++A)A<l?_.push(o[A]):_.push(1);let b=ge(f),w=["type","type"],S=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:t.epsilon}];s&&w.push("type");let $=n>1,v=n>2,T=A=>{let k=_e(e[0].dataType),O=[P("x",e[0].dataType,e[0].dims,b),P("scale",a.dataType,a.dims,b)];s&&O.push(P("bias",s.dataType,s.dims,b)),O.push(N("output",e[0].dataType,d,b)),$&&O.push(N("mean_data_output",1,_)),v&&O.push(N("inv_std_output",1,_));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(M).declareVariables(...O)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${uo("f32",b)};
    var mean_square_vector = ${uo("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pt(k,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ke("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ke("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pt(k,b,"x[j + offset]")};
      let f32scale = ${Pt(k,b,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Pt(k,b,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:d,dataType:e[0].dataType}];return $&&C.push({dims:_,dataType:1}),v&&C.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:w},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},Ul=(e,t)=>{Qg(e.inputs),e.compute(Yg(e.inputs,t,e.outputCount))}});var Xg,Vl,Wl=G(()=>{"use strict";ae();Xr();Jr();Xg=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Vl=e=>{Xg(e.inputs);let t=rt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Yr(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=E.size(e.inputs[0].dims.slice(0,-2)),s=E.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let d=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),p=[1,a,n],f=[d,l];e.compute(nr(f,{activation:""},t,p),{inputs:f})}else e.compute(nr(e.inputs,{activation:""},t))}}});var Jg,ey,ty,Ll,Gl,Hl=G(()=>{"use strict";te();ae();Ce();ce();Jg=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!E.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(E.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let f=e[3].dims,h=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(E.size(f)!==h)throw new Error("zeroPoints input size error.")}},ey=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=E.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=ge(t.k),_=ge(f),b=ge(s),w=d.concat([o,s]),S=o>1&&s/b%2===0?2:1,$=E.size(w)/b/S,v=64,T=[],C=[l,o,a/y],A=E.convertShape(e[1].dims).slice();A.splice(-1,1,f/_),T.push(...H(C)),T.push(...H(A)),T.push(...H(e[2].dims)),e.length===4&&T.push(...H(E.convertShape(e[3].dims)));let k=[l,o,s/b];T.push(...H(k));let O=M=>{let V=C.length,F=P("a",e[0].dataType,V,y),j=P("b",12,A.length,_),ne=P("scales",e[2].dataType,e[2].dims.length),W=[F,j,ne],J=e.length===4?P("zero_points",12,e[3].dims.length):void 0;J&&W.push(J);let ve=k.length,Q=N("output",e[0].dataType,ve,b),ee=_e(e[0].dataType),le=(()=>{switch(y){case 1:return`array<${ee}, 8>`;case 2:return`mat4x2<${ee}>`;case 4:return`mat2x4<${ee}>`;default:throw new Error(`${y}-component is not supported.`)}})(),Z=()=>{let Se=`
          // reuse a data
            var input_offset = ${F.indicesToOffset(`${F.type.indices}(batch, row, word_offset)`)};
            var a_data: ${le};
            for (var j: u32 = 0; j < ${8/y}; j++) {
              a_data[j] = ${F.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let D=0;D<b*S;D++)Se+=`
            b_value = ${_===1?`b${D}_data`:`b${D}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${le}(${Array.from({length:4},(R,Y)=>`${ee}(b_value_lower[${Y}]), ${ee}(b_value_upper[${Y}])`).join(", ")});
            b_dequantized_values = ${y===1?`${le}(${Array.from({length:8},(R,Y)=>`(b_quantized_values[${Y}] - ${J?`zero_point${D}`:"zero_point"}) * scale${D}`).join(", ")});`:`(b_quantized_values - ${le}(${Array(8).fill(`${J?`zero_point${D}`:"zero_point"}`).join(",")})) * scale${D};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(D/b)}]${b>1?`[${D%b}]`:""} += ${Array.from({length:8/y},(R,Y)=>`${y===1?`a_data[${Y}] * b_dequantized_values[${Y}]`:`dot(a_data[${Y}], b_dequantized_values[${Y}])`}`).join(" + ")};
          `;return Se},pe=()=>{let Se=`
            var col_index = col * ${b};
            ${J?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ee}(8);`}
            `;for(let D=0;D<b*S;D++)Se+=`
            let scale${D} = ${ne.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${D} = ${ee}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Se},ke=()=>{let Se=`col_index = col * ${b};`;for(let D=0;D<b*S;D++)Se+=`
            let b${D}_data = ${j.getByIndices(`${j.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Se+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${le};
            var b_dequantized_values: ${le};`,Se};return`
        var<workgroup> workgroup_shared: array<${Q.type.value}, ${S*v}>;
        ${M.declareVariables(...W,Q)}
        ${M.mainStart([v,1,1])}
          let output_indices = ${Q.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/y};
            ${pe()}
            for (var word: u32 = 0; word < ${f}; word += ${_}) {
              ${ke()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${Z()}
                word_offset += ${8/y};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${y};${_};${b};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:h}],dispatchGroup:{x:$},programUniforms:T}),getShaderSource:O}},ty=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=E.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=ge(t.k),_=ge(f),b=d.concat([o,s]),w=128,S=s%8===0?8:s%4===0?4:1,$=w/S,v=$*_*8,T=v/y,C=v/t.blockSize,A=E.size(b)/S,k=[],O=[l,o,a/y],M=E.convertShape(e[1].dims).slice();M.splice(-1,1,f/_),k.push(...H(O)),k.push(...H(M)),k.push(...H(e[2].dims)),e.length===4&&k.push(...H(E.convertShape(e[3].dims)));let V=[l,o,s];k.push(...H(V));let F=j=>{let ne=O.length,W=P("a",e[0].dataType,ne,y),J=P("b",12,M.length,_),ve=P("scales",e[2].dataType,e[2].dims.length),Q=[W,J,ve],ee=e.length===4?P("zero_points",12,e[3].dims.length):void 0;ee&&Q.push(ee);let le=V.length,Z=N("output",e[0].dataType,le),pe=_e(e[0].dataType),ke=()=>{switch(y){case 1:return`
          let a_data0 = vec4<${pe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${pe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${pe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${pe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${y}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${$}>, ${S}>;
        ${j.declareVariables(...Q,Z)}
        ${j.mainStart([$,S,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
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
            let block = tile * ${C} + local_id.x;
            ${ee?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${pe}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${pe}(8);`}
            let scale = ${ve.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${J.getByIndices(`${J.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/y};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${ke()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${pe}>(${Array.from({length:4},(Se,D)=>`${pe}(b_value_lower[${D}]), ${pe}(b_value_upper[${D}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${pe}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Se,D)=>`${`dot(a_data${D}, b_dequantized_values[${D}])`}`).join(" + ")};
              word_offset += ${8/y};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${y};${_};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:A},programUniforms:k}),getShaderSource:F}},Ll=(e,t)=>{Jg(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ty(e.inputs,t)):e.compute(ey(e.inputs,t))},Gl=e=>re(e)});var ry,ny,oy,iy,ay,sy,uy,dy,Fl,ql=G(()=>{"use strict";te();ae();ce();ry=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ny=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},oy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},iy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k = i32(${K("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},ay=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k -= i32(${K("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},sy=(e,t,n)=>{switch(n.mode){case 0:return ny(e,t,n.pads.length);case 1:return oy(e,t,n.pads.length);case 2:return iy(e,t,n.pads.length);case 3:return ay(e,t,n.pads.length);default:throw new Error("Invalid mode")}},uy=(e,t)=>{let n=E.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=E.size(n),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...H(e[0].dims,n));let d=["rank"],l=p=>{let f=N("output",e[0].dataType,n.length),h=P("x",e[0].dataType,r.length),y=h.type.value,_=sy(f,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?y:"f32"}),`
            ${p.registerUniforms(b).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(n)/64)},programUniforms:a}),getShaderSource:l}},dy=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)a[Number(d[l])]=Number(n[l]),a[Number(d[l])+o]=Number(n[l+d.length])}else n.forEach((d,l)=>a[Number(l)]=Number(d));let s=[];return a.forEach(d=>s.push(d)),{mode:t.mode,value:r,pads:s}}else return t},Fl=(e,t)=>{ry(e.inputs);let n=dy(e.inputs,t);e.compute(uy(e.inputs,n),{inputs:[0]})}});var rn,Kl,jl,Zl,Ql,ly,cy,Yl,Xl,Jl,ec,tc,rc,nc,oc,ic,ac,sc,uc,dc=G(()=>{"use strict";Ge();te();ae();ce();rn=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Kl=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),d=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();kt.adjustPoolAttributes(n,o,s,d,l,p);let f=kt.computePoolOutputShape(n,o,d,l,s,p,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:d,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:d,pads:p,cacheKey:t.cacheKey});let y=f.slice();return y.push(y.splice(1,1)[0]),[h,r?y:f]},jl=(e,t)=>{let n=t.format==="NHWC",r=E.size(e),o=E.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);a.push({type:12,data:d},{type:12,data:l},{type:12,data:p},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];y=!!(w+S),a.push({type:12,data:_},{type:12,data:b},{type:12,data:w},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,y]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=E.computeStrides(t.kernelShape);a.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[a,s,!!l,!1,!1]}},Zl=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y=o.format==="NHWC",_=t.type.value,b=N("output",t.type.tensor,r);if(o.kernelShape.length<=2){let w="",S="",$="",v=n-(y?2:1);if(f?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,o.kernelShape.length===2){let C=n-(y?3:2);h?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${_}(${d});
              var pad = 0;
              ${S}
              ${w}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,S=o.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${n-w}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${n-w}u`,w)}
                    + offsets[j - ${n-w}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Ql=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ly=e=>`${Ql(e)};${e.countIncludePad}`,cy=e=>`${Ql(e)};${e.storageOrder};${e.dilations}`,Yl=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Xl=(e,t,n,r)=>{let[o,a]=Kl(t,r,n),s=P("x",t.dataType,t.dims.length),d=s.type.value,l="value += x_val;",p="";o.countIncludePad?p+=`value /= ${d}(uniforms.kernelSize);`:p+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[f,h,y,_,b]=jl(a,o);f.push(...H(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:f}),getShaderSource:S=>Zl(S,s,t.dims.length,a.length,o,l,p,0,h,y,_,b)}},Jl=e=>{let t=e.count_include_pad!==0,n=Yl(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:ly(r)}},ec=(e,t)=>{rn(e.inputs),e.compute(Xl("AveragePool",e.inputs[0],!1,t))},tc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},rc=e=>{let t=e.format;return{format:t,...tc,cacheKey:t}},nc=(e,t)=>{rn(e.inputs),e.compute(Xl("GlobalAveragePool",e.inputs[0],!0,t))},oc=(e,t,n,r)=>{let[o,a]=Kl(t,r,n),s=`
      value = max(x_val, value);
    `,d="",l=P("x",t.dataType,t.dims.length),p=["rank"],[f,h,y,_,b]=jl(a,o);return f.push(...H(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:f}),getShaderSource:w=>Zl(w,l,t.dims.length,a.length,o,s,d,t.dataType===10?-65504:-1e5,h,y,_,b)}},ic=(e,t)=>{rn(e.inputs),e.compute(oc("MaxPool",e.inputs[0],!1,t))},ac=e=>{let t=e.storage_order,n=e.dilations,r=Yl(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:cy(o)}},sc=e=>{let t=e.format;return{format:t,...tc,cacheKey:t}},uc=(e,t)=>{rn(e.inputs),e.compute(oc("GlobalMaxPool",e.inputs[0],!0,t))}});var my,fy,lc,cc,pc=G(()=>{"use strict";te();ae();Ce();ce();my=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},fy=(e,t)=>{let n=E.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,a=e[0].dims,s=e[1].dataType,d=E.size(a),l=r===3||r===2,p=l?[Math.ceil(E.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,y=h?l?[Math.ceil(E.size(h.dims)/4)]:h.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,b=_===!1&&f.length===1,w=ge(d),S=_&&(!l||w===4),$=S?w:1,v=S&&!l?w:1,T=P("input",l?12:r,p.length,v),C=P("scale",s,f.length),A=h?P("zero_point",l?12:r,y.length):void 0,k=N("output",s,a.length,$),O=[T,C];A&&O.push(A);let M=[p,f];h&&M.push(y);let V=[{type:12,data:d/$},{type:12,data:n},{type:12,data:t.blockSize},...H(...M,a)],F=j=>{let ne=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${j.registerUniforms(ne).declareVariables(...O,k)}
      ${j.mainStart()}
          ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?_?l?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:b?l?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:V})}},lc=(e,t)=>{my(e.inputs,t),e.compute(fy(e.inputs,t))},cc=e=>re({axis:e.axis,blockSize:e.blockSize})});var hy,gy,mc,fc=G(()=>{"use strict";Ge();te();ce();hy=(e,t,n)=>{let r=e===t,o=e<t&&n<0,a=e>t&&n>0;if(r||o||a)throw new Error("Range these inputs' contents are invalid.")},gy=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),a=[o],s=o,d=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...H(a)],l=p=>{let f=N("output",r,a.length),h=f.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(y).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},mc=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&hy(t,n,r),e.compute(gy(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var yy,by,hc,gc,yc=G(()=>{"use strict";te();ae();Ce();ce();yy=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${o}bitcast<${r}>(oldValue) + (${n})${a}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${o}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${o}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},by=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n,a=1,s=Math.ceil(E.size(r)/a),d=r[r.length-1],l=E.sizeFromDimension(n,d),p=[{type:12,data:s},{type:12,data:d},{type:12,data:l},...H(e[1].dims,e[2].dims,o)],f=h=>{let y=P("indices",e[1].dataType,e[1].dims.length),_=P("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Hs("output",e[0].dataType,o.length):N("output",e[0].dataType,o.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${E.size(r)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
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

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
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
    ${yy(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f}},hc=e=>re({reduction:e.reduction}),gc=(e,t)=>{e.compute(by(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var _y,wy,vy,bc,$y,xy,Sy,Ty,Cy,Iy,Ay,ky,_c,Ey,Py,zy,Oy,Dy,wc,vc,$c=G(()=>{"use strict";te();ae();Ce();ce();_y=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},wy=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,a)=>r[o]=e[a]),r},vy=(e,t,n,r,o,a)=>{let[s,d,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(f=>r.push(f)),r.length!==0&&r.length!==p&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");_y(r,t),t.axes.length>0&&wy(r,t.axes,p).forEach((f,h)=>r[h]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==p&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},bc=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,$y=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${bc("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${bc("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xy=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Sy=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=o[s],r[s+n]=o[t.length+s]}),r):o},Ty=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>o.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>o[a]=n[s])}else n.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},Cy=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},Iy=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",r)};
        var roi_low = ${K("uniforms.roi","i",o)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ay=(e,t,n,r,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",a)};
          var roi_hi = ${K("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${K("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,ky=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,_c=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",Ey=(e,t,n,r,o)=>{let[s,d,l,p]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${n[l]} - 1))`)};
      ${_c(e,p,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${d}];
      var col:${f} = originalIndices[${l}];
      ${r?`if (row < 0 || row > (${n[d]} - 1) || col < 0 || col > (${n[l]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[d]} - 1));
      col = max(0, min(col, ${n[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${p}])`:"0"};
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
    }`},Py=(e,t,n,r,o,a,s,d,l,p)=>{let f=n.length===2,h=!0,[y,_]=f?[0,1]:h?[2,3]:[1,2],b=e.type.value,w=S=>{let $=S===y?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${r[S]}, ${n[S]}, ${a[S]}, ${a[S]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${n[S]} - 1))) {
          return ${l};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${b} = originalIdx + ${b}(i);
          if (${$} < 0 || ${$} >= ${n[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${n[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===y?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(y)};
    ${w(_)};
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

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${b} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},zy=(e,t,n,r,o)=>{let[s,d,l,p,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${n[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${n[p]} - 1))`)};
      ${_c(e,f,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${d}];
      var height:${h} = originalIndices[${l}];
      var width:${h} = originalIndices[${p}];
      ${r?`if (depth < 0 || depth > (${n[d]} - 1) || height < 0 || height > (${n[l]} - 1) || width < 0 || (width > ${n[p]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[d]} - 1));
      height = max(0, min(height, ${n[l]} - 1));
      width = max(0, min(width, ${n[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
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
    }`},Oy=(e,t,n,r,o,a)=>{let s=e.dims,d=Sy(a,t.axes,s.length),l=Ty(s,r,o,t.axes),p=r.slice();r.length===0&&(p=s.map((v,T)=>v===0?1:l[T]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Cy(s,p,t)));let f=N("output",e.dataType,l.length),h=P("input",e.dataType,s.length),y=E.size(l),_=s.length===l.length&&s.every((v,T)=>v===l[T]),b=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,S=h.type.value,$=v=>`
      ${_?"":`
      ${$y(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${ky(h,s)};
              ${xy(t.nearestMode,n,S)};
              ${Ay(h,f,s,l,p.length,d.length,b)};
              `;case"linear":return`
              ${Iy(f,s,l,p.length,d.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ey(h,f,s,b,w)}`;if(s.length===3||s.length===5)return`${zy(h,f,s,b,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Py(h,f,s,l,p,d,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",d.length).declareVariables(h,f)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${o.length>0?o:""}|${d.length>0?d:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:d},...H(s,l)]})}},Dy=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},wc=(e,t)=>{let n=[],r=[],o=[],a=Dy(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");vy(e.inputs,t,a,n,r,o),e.compute(Oy(e.inputs[0],t,a,n,r,o),{inputs:[0]})},vc=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:d,mode:l,nearestMode:p})}});var By,My,xc,Sc=G(()=>{"use strict";te();ae();Ce();ce();By=(e,t)=>{let[n,r,o,a]=e,{numHeads:s,rotaryEmbeddingDim:d}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!E.areEqual(r.dims,[])&&!E.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!E.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],p=n.dims[n.dims.length-2],f=o.dims[0],h=E.sizeFromDimension(n.dims,1)/p,y=d===0?o.dims[1]*2:h/s;if(d>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(p!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(y/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},My=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],d=E.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=d/l,f=e[2].dims[1],h=o===0?f*2:p/r,y=new Array(s,l,p/h,h-f),_=E.computeStrides(y),b=[{type:1,data:a},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[d,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,h,l*h,1]}):[],...H(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=S=>{let $=P("input",e[0].dataType,e[0].dims.length),v=P("position_ids",e[1].dataType,e[1].dims.length),T=P("cos_cache",e[2].dataType,e[2].dims.length),C=P("sin_cache",e[3].dataType,e[3].dims.length),A=N("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables($,v,T,C,A)}

        ${S.mainStart(Et)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",N("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(y)/Et)},programUniforms:b})}},xc=(e,t)=>{By(e.inputs,t),e.compute(My(e.inputs,t))}});var Ry,Uy,Tc,Cc=G(()=>{"use strict";te();ae();ce();Ry=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Uy=(e,t,n,r)=>{let o=t.simplified,a=e[0].dims,s=E.size(a),d=a,l=s,p=a.slice(-1)[0],f=r?a.slice(0,-1).concat(1):[],h=!o&&e.length>3,y=e.length>4,_=r&&n>1,b=r&&n>2,w=n>3,S=64,$=ge(p),v=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],T=A=>{let k=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",e[0].dataType,e[0].dims,$),P("skip",e[1].dataType,e[1].dims,$),P("gamma",e[2].dataType,e[2].dims,$)];h&&O.push(P("beta",e[3].dataType,e[3].dims,$)),y&&O.push(P("bias",e[4].dataType,e[4].dims,$)),O.push(N("output",e[0].dataType,d,$)),_&&O.push(N("mean_output",1,f)),b&&O.push(N("inv_std_output",1,f)),w&&O.push(N("input_skip_bias_sum",e[0].dataType,d,$));let M=_e(e[0].dataType),V=_e(1,$);return`

      ${A.registerUniforms(k).declareVariables(...O)}
      var<workgroup> sum_shared : array<${V}, ${S}>;
      var<workgroup> sum_squared_shared : array<${V}, ${S}>;

      ${A.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Pt(M,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
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
        let mean = ${Ke("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ke("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:d,dataType:e[0].dataType}];return n>1&&C.push({dims:f,dataType:1}),n>2&&C.push({dims:f,dataType:1}),n>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${b};${w}`,inputDependencies:e.map((A,k)=>"type")},getShaderSource:T,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:v})}},Tc=(e,t)=>{Ry(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Uy(e.inputs,t,e.outputCount,!1),{outputs:r})}});var Ny,nn,Vy,Ic,Wy,Ly,Ac,kc,Ec=G(()=>{"use strict";te();ae();Ce();ce();Ny=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},nn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},Vy=(e,t)=>{if(e.length>1){let n=nn(e,1),r=nn(e,2),o=nn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:n,ends:r,axes:o})}else return t},Ic=(e,t,n,r,o)=>{let a=e;return e<0&&(a+=n[r[t]]),o[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Wy=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",n.length)};
            let steps_i = ${K("uniforms.steps","i",n.length)};
            let signs_i = ${K("uniforms.signs","i",n.length)};
            let starts_i = ${K("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Ly=(e,t)=>{let n=e[0].dims,r=E.size(n),o=t.axes.length>0?E.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=nn(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map(($,v)=>Ic($,v,n,o,a)),d=t.ends.map(($,v)=>Ic($,v,n,o,a));if(o.length!==s.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let $=0;$<n.length;++$)o.includes($)||(s.splice($,0,0),d.splice($,0,n[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,v,T)=>{if($<0){let C=(d[v]-s[v])/$,A=s[v],k=A+C*a[v];s[v]=k,d[v]=A,T[v]=-$}});let p=n.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((d[$]-s[$])/a[$])});let f={dims:p,dataType:e[0].dataType},h=N("output",e[0].dataType,p.length),y=P("input",e[0].dataType,e[0].dims.length),_=E.size(p),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...H(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(b).declareVariables(y,h)}
        ${Wy(y,h,n)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:w})}},Ac=(e,t)=>{Ny(e.inputs,t);let n=Vy(e.inputs,t);e.compute(Ly(e.inputs,n),{inputs:[0]})},kc=e=>{let t=e.starts,n=e.ends,r=e.axes;return re({starts:t,ends:n,axes:r})}});var Gy,Hy,Pc,zc,Oc=G(()=>{"use strict";te();ae();Ce();ct();ce();Gy=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Hy=(e,t)=>{let n=e.inputs[0],r=n.dims,o=E.size(r),a=r.length,s=E.normalizeAxis(t.axis,a),d=s<r.length-1,l,p=[];d?(p=Array.from({length:a},(O,M)=>M),p[s]=a-1,p[a-1]=s,l=e.compute(Oe(n,p),{inputs:[n],outputs:[-1]})[0]):l=n;let f=l.dims,h=f[a-1],y=o/h,_=ge(h),b=h/_,w=64;y===1&&(w=256);let S=(O,M)=>M===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:M===2?`max(${O}.x, ${O}.y)`:M===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,$=P("x",l.dataType,l.dims,_),v=N("result",l.dataType,l.dims,_),T=$.type.value,C=_e(l.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,A=O=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables($,v)}
      ${O.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
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
          rowMaxShared = ${T}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
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
          rowSumShared = ${T}(${Ke("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,k=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:b}]}),getShaderSource:A},{inputs:[l],outputs:[d?-1:0]})[0];d&&e.compute(Oe(k,p),{inputs:[k]})},Pc=(e,t)=>{Gy(e.inputs),Hy(e,t)},zc=e=>re({axis:e.axis})});var Dc,Fy,qy,Ky,Bc,Mc=G(()=>{"use strict";te();ae();ce();Dc=e=>Array.from(e.getBigInt64Array(),Number),Fy=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Dc(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},qy=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Ky=(e,t)=>{let n=e[0].dims,r=t??Dc(e[1]),o=qy(n,r),a=E.size(o),s=e[0].dataType,d=P("input",s,n.length),l=N("output",s,o.length),p=f=>`
      const inputShape = ${d.indices(...n)};
      ${f.registerUniform("output_size","u32").declareVariables(d,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...H(e[0].dims,o)]}),getShaderSource:p}},Bc=e=>{Fy(e.inputs),e.compute(Ky(e.inputs),{inputs:[0]})}});var jy,Zy,Rc,Uc=G(()=>{"use strict";te();ae();ce();jy=(e,t,n,r,o)=>{let a=N("output_data",o,n.length,4),s=P("a_data",t[1].dataType,t[1].dims.length,4),d=P("b_data",t[2].dataType,t[2].dims.length,4),l=P("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,y,_)=>`select(${y}, ${h}, ${_})`;if(!r)p=a.setByOffset("global_idx",f(s.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(y,_,b="")=>{let w=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${y}[${_}] = ${b}(${f(w,S,$)});
          `};o===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,d,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Zy=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,a=!(E.areEqual(t,n)&&E.areEqual(n,r)),s=t,d=E.size(t);if(a){let p=rt.calcShape(rt.calcShape(t,n,!1),r,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,d=E.size(s)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>jy(p,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...H(r,t,n,s)]})}},Rc=e=>{e.compute(Zy(e.inputs))}});var Nc,Vc=G(()=>{"use strict";_u();qr();$u();Su();dd();wd();xd();Nd();qd();Zd();Xd();nl();al();ul();cl();fl();yl();wl();xl();Cl();Dl();Rl();Nl();Wl();Hl();So();ql();dc();pc();fc();yc();Hr();$c();Sc();Cc();Ec();Oc();Co();Mc();ct();jr();Uc();Nc=new Map([["Abs",[Tu]],["Acos",[Cu]],["Acosh",[Iu]],["Add",[ld]],["ArgMax",[bu,co]],["ArgMin",[yu,co]],["Asin",[Au]],["Asinh",[ku]],["Atan",[Eu]],["Atanh",[Pu]],["Attention",[wu]],["AveragePool",[ec,Jl]],["BatchNormalization",[vu]],["BiasAdd",[xu]],["BiasSplitGelu",[ud]],["Cast",[Ou,zu]],["Ceil",[Bu]],["Clip",[Du]],["Concat",[vd,$d]],["Conv",[wo,_o]],["ConvTranspose",[Fd,Gd]],["Cos",[Mu]],["Cosh",[Ru]],["CumSum",[Kd,jd]],["DepthToSpace",[Qd,Yd]],["DequantizeLinear",[lc,cc]],["Div",[cd]],["Einsum",[tl,rl]],["Elu",[Uu,tr]],["Equal",[pd]],["Erf",[Nu]],["Exp",[Vu]],["Expand",[il]],["FastGelu",[sl]],["Floor",[Wu]],["FusedConv",[wo,_o]],["Gather",[ll,dl]],["GatherElements",[_l,bl]],["GatherBlockQuantized",[hl,gl]],["GatherND",[pl,ml]],["Gelu",[Lu]],["Gemm",[$l,vl]],["GlobalAveragePool",[nc,rc]],["GlobalMaxPool",[uc,sc]],["Greater",[gd]],["GreaterOrEqual",[bd]],["GridSample",[Sl,Tl]],["GroupQueryAttention",[Ol]],["HardSigmoid",[Qu,Zu]],["InstanceNormalization",[Ml]],["LayerNormalization",[Ul]],["LeakyRelu",[Gu,tr]],["Less",[yd]],["LessOrEqual",[_d]],["Log",[id]],["MatMul",[Vl]],["MatMulNBits",[Ll,Gl]],["MaxPool",[ic,ac]],["Mul",[md]],["MultiHeadAttention",[kl,Al]],["Neg",[Fu]],["Not",[Hu]],["Pad",[Fl]],["Pow",[fd]],["QuickGelu",[ad,tr]],["Range",[mc]],["Reciprocal",[qu]],["ReduceMin",[cu]],["ReduceMean",[au]],["ReduceMax",[lu]],["ReduceSum",[mu]],["ReduceProd",[pu]],["ReduceL1",[su]],["ReduceL2",[uu]],["ReduceLogSum",[hu]],["ReduceLogSumExp",[du]],["ReduceSumSquare",[fu]],["Relu",[Ku]],["Resize",[wc,vc]],["RotaryEmbedding",[xc]],["ScatterND",[gc,hc]],["Sigmoid",[ju]],["Sin",[Yu]],["Sinh",[Xu]],["Slice",[Ac,kc]],["SkipLayerNormalization",[Tc]],["Split",[El,Pl]],["Sqrt",[Ju]],["Softmax",[Pc,zc]],["Sub",[hd]],["Tan",[ed]],["Tanh",[rd]],["ThresholdedRelu",[od,tr]],["Tile",[Bc]],["Transpose",[Ks,js]],["Where",[Rc]]])});var on,Wc=G(()=>{"use strict";Ge();tt();ce();on=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,a){Ne(t.programInfo.name);let s=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let f of n)l.push({binding:l.length,resource:{buffer:f.buffer}});for(let f of r)l.push({binding:l.length,resource:{buffer:f.buffer}});a&&l.push({binding:l.length,resource:a});let p=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}d.setPipeline(t.computePipeline),d.setBindGroup(0,p),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Be(t.programInfo.name)}dispose(){}build(t,n){Ne(t.name);let r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(h=>{r.features.has(h.feature)&&o.push(`enable ${h.extension};`)});let s=Fs(n,this.backend.device.limits),d=t.getShaderSource(s),l=`${o.join(`
`)}
${s.additionalImplementations}
${d}`,p=r.createShaderModule({code:l,label:t.name});me("verbose",()=>`[WebGPU] ${t.name} shader code: ${l}`);let f=r.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Be(t.name),{programInfo:t,computePipeline:f,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=a&&r<=a&&o<=a)return[n,r,o];let s=n*r*o,d=Math.ceil(Math.sqrt(s));if(d>a){if(d=Math.ceil(Math.cbrt(s)),d>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Qy,Yy,Io,Ao,an,Lc=G(()=>{"use strict";Ge();te();tt();Jn();Ws();Vc();Wc();Qy=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let a=e[r].dims.length;n.push(`${o};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Yy=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Qy(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Io=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Ao=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let n=t.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},an=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>n.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups")&&a("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new Ao(this.device),this.adapterInfo=new Io(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Vs(this),this.programManager=new on(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ur(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let a=r[o],s=a.kernelId,d=this.kernels.get(s),l=d.kernelType,p=d.kernelName,f=a.programName,h=a.inputTensorViews,y=a.outputTensorViews,_=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),S=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map($=>({dims:$.dims,dataType:_t($.dataType)})),outputsMetadata:y.map($=>({dims:$.dims,dataType:_t($.dataType)})),kernelId:s,kernelType:l,kernelName:p,programName:f,startTime:w,endTime:S});else{let $="";h.forEach((T,C)=>{$+=`input[${C}]: [${T.dims}] | ${_t(T.dataType)}, `});let v="";y.forEach((T,C)=>{v+=`output[${C}]: [${T.dims}] | ${_t(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${p}|${f}" ${$}${v}execution time: ${S-w} ns`)}vr("GPU",`${f}::${_}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Be()}run(t,n,r,o,a,s){Ne(t.name);let d=[];for(let T=0;T<n.length;++T){let C=n[T].data;if(C===0)continue;let A=this.gpuDataManager.get(C);if(!A)throw new Error(`no GPU data for input: ${C}`);d.push(A)}let{outputs:l,dispatchGroup:p,programUniforms:f}=t.getRunData(n),h=r.length===0?l.map((T,C)=>C):r;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let y=[],_=[];for(let T=0;T<l.length;++T){if(!Number.isInteger(h[T])||h[T]<-3||h[T]>=s)throw new Error(`Invalid output index: ${h[T]}`);if(h[T]===-3)continue;let C=h[T]===-1,A=h[T]===-2,k=C||A?a(l[T].dataType,l[T].dims):o(h[T],l[T].dataType,l[T].dims);if(y.push(k),k.data===0)continue;let O=this.gpuDataManager.get(k.data);if(!O)throw new Error(`no GPU data for output: ${k.data}`);if(C&&this.temporaryData.push(O),A){let M=this.kernelPersistentData.get(this.currentKernelId);M||(M=[],this.kernelPersistentData.set(this.currentKernelId,M)),M.push(O)}_.push(O)}if(d.length!==n.length||_.length!==y.length){if(_.length===0)return Be(t.name),y;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(f){let T=0,C=[];f.forEach(M=>{let V=typeof M.data=="number"?[M.data]:M.data;if(V.length===0)return;let F=M.type===10?2:4,j,ne;M.type===10?(ne=V.length>4?16:V.length>2?8:V.length*F,j=V.length>4?16:F*V.length):(ne=V.length<=2?V.length*F:16,j=16),T=Math.ceil(T/ne)*ne,C.push(T);let W=M.type===10?8:4;T+=V.length>4?Math.ceil(V.length/W)*j:V.length*F});let A=16;T=Math.ceil(T/A)*A;let k=new ArrayBuffer(T);f.forEach((M,V)=>{let F=C[V],j=typeof M.data=="number"?[M.data]:M.data;if(M.type===6)new Int32Array(k,F,j.length).set(j);else if(M.type===12)new Uint32Array(k,F,j.length).set(j);else if(M.type===10)new Uint16Array(k,F,j.length).set(j);else if(M.type===1)new Float32Array(k,F,j.length).set(j);else throw new Error(`Unsupported uniform type: ${_t(M.type)}`)});let O=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,k,0,T),this.gpuDataManager.release(O.id),b={offset:0,size:T,buffer:O.buffer}}let w=this.programManager.normalizeDispatchGroupSize(p),S=w[1]===1&&w[2]===1,$=Yy(t,n,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,w),this.programManager.setArtifact($,v),me("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),f&&v.uniformVariablesInfo){if(f.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${f.length} in program "${v.programInfo.name}".`);for(let T=0;T<f.length;T++){let C=f[T],A=C.type,k=typeof C.data=="number"?1:C.data.length,[O,M]=v.uniformVariablesInfo[T];if(A!==O||k!==M)throw new Error(`Uniform variable ${T} mismatch: expect type ${O} with size ${M}, got type ${A} with size ${k} in program "${v.programInfo.name}".`)}}if(me("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:n,outputTensorViews:y};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run(v,d,_,w,b),Be(t.name),y}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let a=Nc.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),me("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),d(n,l[1]),0}catch(f){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${f}`)),1}finally{p&&r.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${a}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(n),d=this.gpuDataManager.registerExternalBuffer(r,o,s);return a.set(n,[d,r]),d}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await no(this,t,n);return Nr(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){me("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){me("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){me("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Xy,Gc,Jy,Hc,sn,un,ko,Fc,qc=G(()=>{"use strict";tt();Xy=1,Gc=()=>Xy++,Jy=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Hc=(e,t)=>{let n=Jy.get(e);if(!n)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((r,o)=>r*o)*n/8):0},sn=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Hc(this.dataType,this.tensorShape)}destroy(){me("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,n,r){return this.mlContext===t&&this.dataType===n&&this.tensorShape.length===r.length&&this.tensorShape.every((o,a)=>o===r[a])}},un=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,n,r,o){let a=this.tensorManager.getMLContext(t);if(this.wrapper){if(this.wrapper.canReuseTensor(a,n,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Hc(n,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,r,s,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else me("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},ko=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let n=this.backend.getMLContext(t);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let t=Gc();return this.tensorTrackersById.set(t,new un(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o,a){me("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${r}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(n);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,r,o,a)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){me("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let a=this.getMLContext(t),s=Gc(),d=new sn({sessionId:t,context:a,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(s,new un(this,d)),this.externalTensors.add(d),s}async getCachedTensor(t,n,r,o,a,s){let d=this.getMLContext(t);for(let[p,f]of this.freeTensors.entries())if(f.canReuseTensor(d,n,r)){me("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, shape: ${r}}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=t,h}me("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, shape: ${r}}`);let l=await d.createTensor({dataType:n,shape:r,dimensions:r,usage:o,writable:a,readable:s});return new sn({sessionId:t,context:d,tensor:l,dataType:n,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Fc=(...e)=>new ko(...e)});var Eo,eb,dn,Kc=G(()=>{"use strict";te();bt();Jn();qc();tt();Eo=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),eb=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,a)=>o===r[a]&&e[o]===t[o])},dn=class{constructor(t){this.tensorManager=Fc(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Ur(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){me("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){me("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let n=this.temporarySessionTensorIds.get(t);if(n){for(let r of n)me("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>eb(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(a=>a.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){me("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o,a){let s=Eo.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,n,s,o,a)}async createTemporaryTensor(t,n,r){me("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${r}}`);let o=Eo.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,r,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,n){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");me("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Nr(r,n)}}registerMLTensor(t,n,r,o){let a=Eo.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(t,n,a,o);return me("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,n,r,o,a,s){if(!s)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let l=s.get(d);if(!l)throw new Error(`File with name ${d} not found in preloaded files.`);if(n+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(n,n+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(p);break;case"float16":f=new Uint16Array(p);break;case"int32":f=new Int32Array(p);break;case"uint32":f=new Uint32Array(p);break;case"int64":f=new BigInt64Array(p);break;case"uint64":f=new BigUint64Array(p);break;case"int8":f=new Int8Array(p);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return me("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}}`),o.constant(a,f)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,n){let r=this.sessionGraphInputs.get(t);return r?r.includes(n):!1}flush(){}}});var jc={};Zt(jc,{init:()=>tb});var ir,Po,tb,Zc=G(()=>{"use strict";te();Lc();tt();ae();Kc();ir=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(E.size(t)!==E.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Po=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=t.PTR_SIZE,a=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let d=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let l=[];for(let p=0;p<d;p++){let f=Number(t.getValue(o*a++,s)),h=Number(t.getValue(o*a++,"*")),y=Number(t.getValue(o*a++,s)),_=[];for(let b=0;b<y;b++)_.push(Number(t.getValue(o*a++,s)));l.push(new ir(t,f,h,_))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,n){let r=n?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=n?.outputs??[],a=(d,l,p)=>new ir(this.module,l,this.output(d,p),p),s=(d,l)=>{let p=wt(d,l);if(!p)throw new Error(`Unsupported data type: ${d}`);let f=p>0?this.backend.gpuDataManager.create(p).id:0;return new ir(this.module,d,f,l)};return this.backend.run(t,r,o,a,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,a);for(let d=0;d<n.length;d++)this.module.setValue(s+o*(d+1),n[d],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},tb=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=new an;await a.initialize(n,r),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,d,l,p=!1)=>{if(p)me("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(d)}, size=${Number(l)}`),a.memcpy(Number(s),Number(d));else{me("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let f=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(d),f)}},async(s,d,l)=>{me("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${d}, size=${l}`),await a.download(Number(s),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(s,d,l)=>a.createKernel(s,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),s=>a.releaseKernel(s),(s,d,l,p)=>{me("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${d}`);let f=new Po(t,a,Number(d));return a.computeKernel(Number(s),f,p)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let a=new dn(n);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,d,l,p,f)=>a.ensureTensor(s,d,l,p,f),(s,d)=>{a.uploadTensor(s,d)},async(s,d)=>a.downloadTensor(s,d)])}}});var rb,Cr,Ir,zt,nb,Yt,Ar,kr,Qc,Er,Pr,zr,qn=G(()=>{"use strict";zs();Ds();te();bt();Dr();Xn();rb=(e,t)=>{Ie()._OrtInit(e,t)!==0&&he("Can't initialize onnxruntime.")},Cr=async e=>{rb(e.wasm.numThreads,Jt(e.logLevel))},Ir=async(e,t)=>{{let n=(Zc(),br(jc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Ie(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Ie(),e)}}},zt=new Map,nb=e=>{let t=Ie(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&he("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},Yt=e=>{let t=Ie(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Ar=async(e,t)=>{let n,r,o=Ie();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Yt(e);let a=0,s=0,d=0,l=[],p=[],f=[];try{if([s,l]=Os(t),t?.externalData&&o.mountExternalData){let v=[];for(let T of t.externalData){let C=typeof T=="string"?T:T.path;v.push(er(typeof T=="string"?T:T.data).then(A=>{o.mountExternalData(C,A)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof v!="string"){let C=v,A=C?.context,k=C?.gpuDevice,O=C?.deviceType,M=C?.powerPreference;A?o.currentContext=A:k?o.currentContext=await o.jsepCreateMLContext(k):o.currentContext=await o.jsepCreateMLContext({deviceType:O,powerPreference:M})}else o.currentContext=await o.jsepCreateMLContext();break}a=await o._OrtCreateSession(n,r,s),a===0&&he("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[h,y]=nb(a),_=!!t?.enableGraphCapture,b=[],w=[],S=[];for(let v=0;v<h;v++){let T=o._OrtGetInputName(a,v);T===0&&he("Can't get an input name."),p.push(T),b.push(o.UTF8ToString(T))}for(let v=0;v<y;v++){let T=o._OrtGetOutputName(a,v);T===0&&he("Can't get an output name."),f.push(T);let C=o.UTF8ToString(T);w.push(C);{if(_&&t?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let A=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[C]??"cpu";if(A!=="cpu"&&A!=="cpu-pinned"&&A!=="gpu-buffer"&&A!=="ml-tensor")throw new Error(`Not supported preferred output location: ${A}.`);if(_&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(A)}}let $=null;return S.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(a),d===0&&he("Can't create IO binding."),$={handle:d,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(v=>Yn(v))}),zt.set(a,[a,p,f,$,_,!1]),[a,b,w]}catch(h){throw p.forEach(y=>o._OrtFree(y)),f.forEach(y=>o._OrtFree(y)),d!==0&&o._OrtReleaseBinding(d)!==0&&he("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&he("Can't release session."),h}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),l.forEach(h=>o._free(h)),o.unmountExternalData?.()}},kr=e=>{let t=Ie(),n=zt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,a,s,d]=n;s&&(d&&t._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&he("Can't release session."),zt.delete(e)},Qc=async(e,t,n,r,o,a=!1)=>{if(!e){t.push(0);return}let s=Ie(),d=s.PTR_SIZE,l=e[0],p=e[1],f=e[3],h=f,y,_;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let S=e[2].gpuBuffer;_=wt(Rt(l),p);let $=s.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=$(r,o,S,_)}else if(f==="ml-tensor"){let S=e[2].mlTensor;_=wt(Rt(l),p);let $=s.jsepRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=$(r,S,Rt(l),p)}else{let S=e[2];if(Array.isArray(S)){_=d*S.length,y=s._malloc(_),n.push(y);for(let $=0;$<S.length;$++){if(typeof S[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);s.setValue(y+$*d,Pe(S[$],n),"*")}}else{let $=s.jsepIsGraphInput;if(l!=="string"&&$){let v=s._OrtGetInputName(r,o),T=s.UTF8ToString(v);if($(r,T)){let C=Rt(l);_=wt(C,p),h="ml-tensor";let A=s.jsepCreateTemporaryTensor,k=s.jsepUploadTensor;if(!A||!k)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await A(r,C,p);k(O,new Uint8Array(S.buffer,S.byteOffset,S.byteLength)),y=O}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}}let b=s.stackSave(),w=s.stackAlloc(4*p.length);try{p.forEach(($,v)=>s.setValue(w+v*d,$,d===4?"i32":"i64"));let S=s._OrtCreateTensor(Rt(l),y,_,w,p.length,Yn(h));S===0&&he(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(S)}finally{s.stackRestore(b)}},Er=async(e,t,n,r,o,a)=>{let s=Ie(),d=s.PTR_SIZE,l=zt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],f=l[1],h=l[2],y=l[3],_=l[4],b=l[5],w=t.length,S=r.length,$=0,v=[],T=[],C=[],A=[],k=s.stackSave(),O=s.stackAlloc(w*d),M=s.stackAlloc(w*d),V=s.stackAlloc(S*d),F=s.stackAlloc(S*d);try{[$,v]=Ps(a);for(let W=0;W<w;W++)await Qc(n[W],T,A,e,t[W],_);for(let W=0;W<S;W++)await Qc(o[W],C,A,e,w+r[W],_);for(let W=0;W<w;W++)s.setValue(O+W*d,T[W],"*"),s.setValue(M+W*d,f[t[W]],"*");for(let W=0;W<S;W++)s.setValue(V+W*d,C[W],"*"),s.setValue(F+W*d,h[r[W]],"*");if(y&&!b){let{handle:W,outputPreferredLocations:J,outputPreferredLocationsEncoded:ve}=y;if(f.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${f.length}).`);for(let Q=0;Q<w;Q++){let ee=t[Q];await s._OrtBindInput(W,f[ee],T[Q])!==0&&he(`Can't bind input[${Q}] for session=${e}.`)}for(let Q=0;Q<S;Q++){let ee=r[Q];o[Q]?.[3]?s._OrtBindOutput(W,h[ee],C[Q],0)!==0&&he(`Can't bind pre-allocated output[${Q}] for session=${e}.`):s._OrtBindOutput(W,h[ee],0,ve[ee])!==0&&he(`Can't bind output[${Q}] to ${J[Q]} for session=${e}.`)}zt.set(e,[p,f,h,y,_,!0])}s.jsepOnRunStart?.(p);let j;y?j=await s._OrtRunWithBinding(p,y.handle,S,V,$):j=await s._OrtRun(p,M,O,w,F,S,V,$),j!==0&&he("failed to call OrtRun().");let ne=[];for(let W=0;W<S;W++){let J=Number(s.getValue(V+W*d,"*"));if(J===C[W]){ne.push(o[W]);continue}let ve=s.stackSave(),Q=s.stackAlloc(4*d),ee=!1,le,Z=0;try{s._OrtGetTensorData(J,Q,Q+d,Q+2*d,Q+3*d)!==0&&he(`Can't access output tensor data on index ${W}.`);let ke=d===4?"i32":"i64",Se=Number(s.getValue(Q,ke));Z=s.getValue(Q+d,"*");let D=s.getValue(Q+d*2,"*"),R=Number(s.getValue(Q+d*3,ke)),Y=[];for(let xe=0;xe<R;xe++)Y.push(Number(s.getValue(D+xe*d,ke)));s._OrtFree(D)!==0&&he("Can't free memory for tensor dims.");let fe=Y.reduce((xe,be)=>xe*be,1);le=_t(Se);let Fe=y?.outputPreferredLocations[r[W]];if(le==="string"){if(Fe==="gpu-buffer"||Fe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let be=0;be<fe;be++){let Ye=s.getValue(Z+be*d,"*"),Gt=s.getValue(Z+(be+1)*d,"*"),xt=be===fe-1?void 0:Gt-Ye;xe.push(s.UTF8ToString(Ye,xt))}ne.push([le,Y,xe,"cpu"])}else if(Fe==="gpu-buffer"&&fe>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=xe(Z),Ye=wt(Se,fe);if(Ye===void 0||!Mr(le))throw new Error(`Unsupported data type: ${le}`);ee=!0,ne.push([le,Y,{gpuBuffer:be,download:s.jsepCreateDownloader(be,Ye,le),dispose:()=>{s._OrtReleaseTensor(J)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(Fe==="ml-tensor"&&fe>0){let xe=s.jsepEnsureTensor;if(!xe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(Se,fe)===void 0||!Rr(le))throw new Error(`Unsupported data type: ${le}`);let Ye=await xe(e,Z,Se,Y,!1);ee=!0,ne.push([le,Y,{mlTensor:Ye,download:s.jsepCreateMLTensorDownloader(Z,le),dispose:()=>{s.jsepReleaseTensorId(Z),s._OrtReleaseTensor(J)}},"ml-tensor"])}else{let xe=Br(le),be=new xe(fe);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(s.HEAPU8.subarray(Z,Z+be.byteLength)),ne.push([le,Y,be,"cpu"])}}finally{s.stackRestore(ve),le==="string"&&Z&&s._free(Z),ee||s._OrtReleaseTensor(J),s.jsepOnRunEnd?.(p)}}return y&&!_&&(s._OrtClearBoundOutputs(y.handle)!==0&&he("Can't clear bound outputs."),zt.set(e,[p,f,h,y,_,!1])),ne}finally{s.stackRestore(k),T.forEach(j=>s._OrtReleaseTensor(j)),C.forEach(j=>s._OrtReleaseTensor(j)),A.forEach(j=>s._free(j)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(j=>s._free(j))}},Pr=e=>{let t=Ie(),n=zt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&he("Can't get an profile file name."),t._OrtFree(o)},zr=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Ot,He,ar,cn,pn,ln,zo,Oo,Wt,Lt,ib,Yc,Xc,Jc,ep,tp,rp,np,Do=G(()=>{"use strict";Ge();qn();bt();Sr();Ot=()=>!!we.wasm.proxy&&typeof document<"u",ar=!1,cn=!1,pn=!1,Oo=new Map,Wt=(e,t)=>{let n=Oo.get(e);n?n.push(t):Oo.set(e,[t])},Lt=()=>{if(ar||!cn||pn||!He)throw new Error("worker not ready")},ib=e=>{switch(e.data.type){case"init-wasm":ar=!1,e.data.err?(pn=!0,zo[1](e.data.err)):(cn=!0,zo[0]()),ln&&(URL.revokeObjectURL(ln),ln=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Oo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Yc=async()=>{if(!cn){if(ar)throw new Error("multiple calls to 'initWasm()' detected.");if(pn)throw new Error("previous call to 'initWasm()' failed.");if(ar=!0,Ot())return new Promise((e,t)=>{He?.terminate(),As().then(([n,r])=>{try{He=r,He.onerror=a=>t(a),He.onmessage=ib,zo=[e,t];let o={type:"init-wasm",in:we};!o.in.wasm.wasmPaths&&(n||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),He.postMessage(o),ln=n}catch(o){t(o)}},t)});try{await Tr(we.wasm),await Cr(we),cn=!0}catch(e){throw pn=!0,e}finally{ar=!1}}},Xc=async e=>{if(Ot())return Lt(),new Promise((t,n)=>{Wt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:we}};He.postMessage(r)});await Ir(we,e)},Jc=async e=>Ot()?(Lt(),new Promise((t,n)=>{Wt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};He.postMessage(r,[e.buffer])})):Yt(e),ep=async(e,t)=>{if(Ot()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Lt(),new Promise((n,r)=>{Wt("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),He.postMessage(o,a)})}else return Ar(e,t)},tp=async e=>{if(Ot())return Lt(),new Promise((t,n)=>{Wt("release",[t,n]);let r={type:"release",in:e};He.postMessage(r)});kr(e)},rp=async(e,t,n,r,o,a)=>{if(Ot()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Lt(),new Promise((s,d)=>{Wt("run",[s,d]);let l=n,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};He.postMessage(p,zr(l))})}else return Er(e,t,n,r,o,a)},np=async e=>{if(Ot())return Lt(),new Promise((t,n)=>{Wt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};He.postMessage(r)});Pr(e)}});var op,ab,mn,ip=G(()=>{"use strict";Ge();Do();te();xr();Xn();op=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ab=e=>{switch(e[3]){case"cpu":return new qe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return qe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Rr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return qe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},mn=class{async fetchModelAndCopyToWasmMemory(t){return Jc(await er(t))}async loadModel(t,n){Ne();let r;typeof t=="string"?r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await ep(r,n),Be()}async dispose(){return tp(this.sessionId)}async run(t,n,r){Ne();let o=[],a=[];Object.entries(t).forEach(y=>{let _=y[0],b=y[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(b),a.push(w)});let s=[],d=[];Object.entries(n).forEach(y=>{let _=y[0],b=y[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(b),d.push(w)});let l=o.map((y,_)=>op(y,()=>`input "${this.inputNames[a[_]]}"`)),p=s.map((y,_)=>y?op(y,()=>`output "${this.outputNames[d[_]]}"`):null),f=await rp(this.sessionId,a,l,d,p,r),h={};for(let y=0;y<f.length;y++)h[this.outputNames[d[y]]]=s[y]??ab(f[y]);return Be(),h}startProfiling(){}endProfiling(){np(this.sessionId)}}});var sp={};Zt(sp,{OnnxruntimeWebAssemblyBackend:()=>fn,initializeFlags:()=>ap,wasmBackend:()=>sb});var ap,fn,sb,up=G(()=>{"use strict";Ge();Do();ip();ap=()=>{if((typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0),we.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let e=typeof navigator>"u"?Nn("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},fn=class{async init(t){ap(),await Yc(),await Xc(t)}async createInferenceSessionHandler(t,n){let r=new mn;return await r.loadModel(t,n),Promise.resolve(r)}},sb=new fn});Ge();Ge();Ge();var hs="1.21.0";var lT=Fn;{let e=(up(),br(sp)).wasmBackend;Ct("webgpu",e,5),Ct("webnn",e,5),Ct("cpu",e,10),Ct("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:hs,enumerable:!0});export{Of as InferenceSession,vr as TRACE,Ne as TRACE_FUNC_BEGIN,Be as TRACE_FUNC_END,qe as Tensor,lT as default,we as env,Ct as registerBackend};
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
//# sourceMappingURL=ort.bundle.min.mjs.map
