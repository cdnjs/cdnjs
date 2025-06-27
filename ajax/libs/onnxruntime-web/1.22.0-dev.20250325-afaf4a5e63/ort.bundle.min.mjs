/*!
 * ONNX Runtime Web v1.22.0-dev.20250325-afaf4a5e63
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Vn=Object.defineProperty;var Df=Object.getOwnPropertyDescriptor;var Mf=Object.getOwnPropertyNames;var Rf=Object.prototype.hasOwnProperty;var Wn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var W=(e,t)=>()=>(e&&(t=e(e=0)),t);var Nt=(e,t)=>{for(var r in t)Vn(e,r,{get:t[r],enumerable:!0})},Uf=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Mf(t))!Rf.call(e,o)&&o!==r&&Vn(e,o,{get:()=>t[o],enumerable:!(n=Df(t,o))||n.enumerable});return e};var Yt=e=>Uf(Vn({},"__esModule",{value:!0}),e);var wr,Tt,It,Nf,qa,Ln=W(()=>{"use strict";wr=new Map,Tt=[],It=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=wr.get(e);if(n===void 0)wr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=Tt.indexOf(e);o!==-1&&Tt.splice(o,1);for(let a=0;a<Tt.length;a++)if(wr.get(Tt[a]).priority<=r){Tt.splice(a,0,e);return}Tt.push(e)}return}throw new TypeError("not a valid backend")},Nf=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},qa=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?Tt:r,o,a=[],s=new Set;for(let l of n){let p=await Nf(l);typeof p=="string"?a.push({name:l,err:p}):(o||(o=p),o===p&&s.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let d=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,p)=>p==="executionProviders"?d:Reflect.get(l,p)})]}});var Ka=W(()=>{"use strict";Ln()});var ja,Za=W(()=>{"use strict";ja="1.22.0-dev.20250325-afaf4a5e63"});var Qa,Ne,Gn=W(()=>{"use strict";Za();Qa="warning",Ne={wasm:{},webgl:{},webgpu:{},versions:{common:ja},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Qa=e}},get logLevel(){return Qa}};Object.defineProperty(Ne,"logLevel",{enumerable:!0})});var $e,Ya=W(()=>{"use strict";Gn();$e=Ne});var Xa,Ja,es=W(()=>{"use strict";Xa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,p;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let f=a*o,h=0,y=f,_=f*2,b=-1;s==="RGBA"?(h=0,y=f,_=f*2,b=f*3):s==="RGB"?(h=0,y=f,_=f*2):s==="RBG"&&(h=0,_=f,y=f*2);for(let w=0;w<a;w++)for(let T=0;T<o;T++){let $=(e.data[h++]-p[0])*l[0],v=(e.data[y++]-p[1])*l[1],S=(e.data[_++]-p[2])*l[2],I=b===-1?255:(e.data[b++]-p[3])*l[3];n.fillStyle="rgba("+$+","+v+","+S+","+I+")",n.fillRect(T,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ja=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let h=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,b=1,w=2,T=3,$=0,v=h,S=h*2,I=-1;d==="RGBA"?($=0,v=h,S=h*2,I=h*3):d==="RGB"?($=0,v=h,S=h*2):d==="RBG"&&($=0,S=h,v=h*2),n=r.createImageData(o,a);for(let k=0;k<a*o;_+=y,b+=y,w+=y,T+=y,k++)n.data[_]=(e.data[$++]-f[0])*p[0],n.data[b]=(e.data[v++]-f[1])*p[1],n.data[w]=(e.data[S++]-f[2])*p[2],n.data[T]=I===-1?255:(e.data[I++]-f[3])*p[3]}else throw new Error("Can not access image data");return n}});var Hn,ts,rs,ns,os,is,as=W(()=>{"use strict";vr();Hn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*n,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,y=0,_=1,b=2,w=3,T=0,$=p,v=p*2,S=-1;d==="RGB"&&(h=3,y=0,_=1,b=2,w=-1),l==="RGBA"?S=p*3:l==="RBG"?(T=0,v=p,$=p*2):l==="BGR"&&(v=0,$=p,T=p*2);for(let k=0;k<p;k++,y+=h,b+=h,_+=h,w+=h)f[T++]=(e[y]+s[0])/a[0],f[$++]=(e[_]+s[1])/a[1],f[v++]=(e[b]+s[2])/a[2],S!==-1&&w!==-1&&(f[S++]=(e[w]+s[3])/a[3]);return l==="RGBA"?new Be("float32",f,[1,4,r,n]):new Be("float32",f,[1,3,r,n])},ts=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=y,d.width=_}else d.tensorFormat="RGBA",d.height=y,d.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(n){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=f,d.width=h,t!==void 0){let y=l();y.width=h,y.height=f;let _=p(y);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;return h.drawImage(e,0,0,_,y),s=h.getImageData(0,0,_,y).data,d.height=y,d.width=_,Hn(s,d)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,h)=>{let y=l(),_=p(y);if(!e||!_)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{y.width=b.width,y.height=b.height,_.drawImage(b,0,0,y.width,y.height);let w=_.getImageData(0,0,y.width,y.height);d.height=y.height,d.width=y.width,f(Hn(w.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Hn(s,d);throw new Error("Input data provided is not supported - aborted tensor creation")},rs=(e,t)=>{let{width:r,height:n,download:o,dispose:a}=t,s=[1,n,r,4];return new Be({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},ns=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:a}=t;return new Be({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:a})},os=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:a}=t;return new Be({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:a})},is=(e,t,r)=>new Be({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Ct,Xt,ss,us,ds=W(()=>{"use strict";Ct=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Xt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ss=!1,us=()=>{if(!ss){ss=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(Ct.set("int64",BigInt64Array),Xt.set(BigInt64Array,"int64")),t&&(Ct.set("uint64",BigUint64Array),Xt.set(BigUint64Array,"uint64")),n?(Ct.set("float16",r),Xt.set(r,"float16")):Ct.set("float16",Uint16Array)}}});var ls,cs,ps=W(()=>{"use strict";vr();ls=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},cs=(e,t)=>{switch(e.location){case"cpu":return new Be(e.type,e.data,t);case"cpu-pinned":return new Be({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Be({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Be({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Be,vr=W(()=>{"use strict";es();as();ds();ps();Be=class{constructor(t,r,n){us();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let d=Ct.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let p=Ct.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?d=p.from(r,BigInt):d=p.from(r)}else if(r instanceof p)d=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&r instanceof Uint16Array&&p!==Uint16Array)d=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",d=t;else if(p==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let p=Xt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");a=l,this.cpuData=d,this.dataLocation="cpu"}let s=ls(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,r){return ts(t,r)}static fromTexture(t,r){return rs(t,r)}static fromGpuBuffer(t,r){return ns(t,r)}static fromMLTensor(t,r){return os(t,r)}static fromPinnedBuffer(t,r,n){return is(t,r,n)}toDataURL(t){return Xa(this,t)}toImageData(t){return Ja(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return cs(this,t)}}});var Ke,Fn=W(()=>{"use strict";vr();Ke=Be});var $r,ms,Ve,Me,qn=W(()=>{"use strict";Gn();$r=(e,t)=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||console.timeStamp(`${e}::ORT::${t}`)},ms=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),$r("CPU",a);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ve=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||ms("BEGIN",e)},Me=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||ms("END",e)}});var xr,fs=W(()=>{"use strict";Ln();Fn();qn();xr=class e{constructor(t){this.handler=t}async run(t,r,n){Ve();let o={},a={};if(typeof t!="object"||t===null||t instanceof Ke||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ke)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(r);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let y=r[h];(y===null||y instanceof Ke)&&(p=!0,s=!1,o[h]=y)}if(p){if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)o[p]=null;let d=await this.handler.run(t,o,a),l={};for(let p in d)if(Object.hasOwnProperty.call(d,p)){let f=d[p];f instanceof Ke?l[p]=f:l[p]=new Ke(f.type,f.data,f.dims)}return Me(),l}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ve();let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,y=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(y=t.byteLength-h,typeof n=="number"){if(y=n,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||h+y>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,h,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await qa(s),p=await d.createInferenceSessionHandler(a,l);return Me(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var Vf,hs=W(()=>{"use strict";fs();Vf=xr});var gs=W(()=>{"use strict"});var ys=W(()=>{"use strict"});var bs=W(()=>{"use strict"});var _s=W(()=>{"use strict"});var Kn={};Nt(Kn,{InferenceSession:()=>Vf,TRACE:()=>$r,TRACE_FUNC_BEGIN:()=>Ve,TRACE_FUNC_END:()=>Me,Tensor:()=>Ke,env:()=>$e,registerBackend:()=>It});var Fe=W(()=>{"use strict";Ka();Ya();hs();Fn();gs();ys();qn();bs();_s()});var Sr=W(()=>{"use strict"});var xs={};Nt(xs,{default:()=>Wf});var vs,$s,Wf,Ss=W(()=>{"use strict";jn();_t();Tr();vs="ort-wasm-proxy-worker",$s=globalThis.self?.name===vs;$s&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ir(r.wasm).then(()=>{Cr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Ar(o,n).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:n}=r,o=Jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Er(n,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":kr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:a,outputIndices:s,options:d}=r;Pr(n,o,a,s,new Array(s.length).fill(null),d).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Or([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":zr(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Wf=$s?null:e=>new Worker(e??We,{type:"module",name:vs})});var Is={};Nt(Is,{default:()=>Lf});var Zn,Ts,Lf,Gf,Cs=W(()=>{"use strict";Ts=(Zn=import.meta.url,async function(e={}){var t,r,n=e,o=new Promise((i,u)=>{t=i,r=u}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",d=s&&self.name?.startsWith("em-pthread");n.mountExternalData=(i,u)=>{i.startsWith("./")&&(i=i.substring(2)),(n.Bd||(n.Bd=new Map)).set(i,u)},n.unmountExternalData=()=>{delete n.Bd};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,le:!0}).buffer.constructor;let p=i=>async(...u)=>{try{if(n.Cd)throw Error("Session already started");let c=n.Cd={ae:u[0],errors:[]},m=await i(...u);if(n.Cd!==c)throw Error("Session mismatch");n.Gd?.flush();let g=c.errors;if(0<g.length){let x=await Promise.all(g);if(x=x.filter(C=>C),0<x.length)throw Error(x.join(`
`))}return m}finally{n.Cd=null}};n.jsepInit=(i,u)=>{if(i==="webgpu"){[n.Gd,n.Rd,n.Vd,n.Hd,n.Ud,n.vd,n.Wd,n.Yd,n.Sd,n.Td,n.Xd]=u;let c=n.Gd;n.jsepRegisterBuffer=(m,g,x,C)=>c.registerBuffer(m,g,x,C),n.jsepGetBuffer=m=>c.getBuffer(m),n.jsepCreateDownloader=(m,g,x)=>c.createDownloader(m,g,x),n.jsepOnCreateSession=m=>{c.onCreateSession(m)},n.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},n.jsepOnRunStart=m=>c.onRunStart(m),n.Zd=(m,g)=>{c.upload(m,g)}}else if(i==="webnn"){let c=u[0];[n.je,n.Kd,n.webnnEnsureTensor,n.Ld,n.webnnDownloadTensor]=u.slice(1),n.webnnReleaseTensorId=n.Kd,n.webnnUploadTensor=n.Ld,n.webnnOnRunStart=m=>c.onRunStart(m),n.webnnOnRunEnd=c.onRunEnd.bind(c),n.webnnRegisterMLContext=(m,g)=>{c.registerMLContext(m,g)},n.webnnOnReleaseSession=m=>{c.onReleaseSession(m)},n.webnnCreateMLTensorDownloader=(m,g)=>c.createMLTensorDownloader(m,g),n.webnnRegisterMLTensor=(m,g,x,C)=>c.registerMLTensor(m,g,x,C),n.webnnCreateMLContext=m=>c.createMLContext(m),n.webnnRegisterMLConstant=(m,g,x,C,B,M)=>c.registerMLConstant(m,g,x,C,B,n.Bd,M),n.webnnRegisterGraphInput=c.registerGraphInput.bind(c),n.webnnIsGraphInput=c.isGraphInput.bind(c),n.webnnCreateTemporaryTensor=c.createTemporaryTensor.bind(c),n.webnnIsInt64Supported=c.isInt64Supported.bind(c)}};let f=()=>{let i=(u,c,m)=>(...g)=>{let x=Je,C=c?.();g=u(...g);let B=c?.();return C!==B&&(u=B,m(C),c=m=null),Je!=x?new Promise((M,V)=>{zn={resolve:M,reject:V}}):g};(()=>{for(let u of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[u]=i(n[u],()=>n[u],c=>n[u]=c)})(),p!==void 0&&(n._OrtRun=p(n._OrtRun),n._OrtRunWithBinding=p(n._OrtRunWithBinding)),f=void 0};n.asyncInit=()=>{f?.()};var h,y,_=Object.assign({},n),b=(i,u)=>{throw u},w="";(a||s)&&(s?w=self.location.href:typeof document<"u"&&document.currentScript&&(w=document.currentScript.src),Zn&&(w=Zn),w=w.startsWith("blob:")?"":w.slice(0,w.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(y=i=>{var u=new XMLHttpRequest;return u.open("GET",i,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),h=async i=>{if(ee(i))return new Promise((c,m)=>{var g=new XMLHttpRequest;g.open("GET",i,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?c(g.response):m(g.status)},g.onerror=m,g.send(null)});var u=await fetch(i,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var T=console.log.bind(console),$=console.error.bind(console),v=T,S=$;Object.assign(n,_),_=null;var I,k,A,O,D,R,F,Z,X,H,Y,xe,q,Q=n.wasmBinary,ne=!1,ee=i=>i.startsWith("file://");function me(){return I.buffer!=O.buffer&&Pe(),O}function _e(){return I.buffer!=O.buffer&&Pe(),D}function ve(){return I.buffer!=O.buffer&&Pe(),R}function oe(){return I.buffer!=O.buffer&&Pe(),F}function E(){return I.buffer!=O.buffer&&Pe(),Z}function G(){return I.buffer!=O.buffer&&Pe(),X}function fe(){return I.buffer!=O.buffer&&Pe(),H}function De(){return I.buffer!=O.buffer&&Pe(),q}if(d){let i=function(u){try{var c=u.data,m=c.yd;if(m==="load"){let g=[];self.onmessage=x=>g.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of g)i(x);self.onmessage=i};for(let x of c.Od)n[x]&&!n[x].proxy||(n[x]=(...C)=>{postMessage({yd:"callHandler",Nd:x,args:C})},x=="print"&&(v=n[x]),x=="printErr"&&(S=n[x]));I=c.ge,Pe(),Te(c.he)}else if(m==="run"){bp(c.xd),Mn(c.xd,0,0,1,0,0),Ko(),kn(c.xd),Ie||(Wi(),Ie=!0);try{_p(c.ce,c.Ed)}catch(g){if(g!="unwind")throw g}}else c.target!=="setimmediate"&&(m==="checkMailbox"?Ie&&lr():m&&(S(`worker: received unknown command ${m}`),S(c)))}catch(g){throw Li(),g}};var hb=i,Te,Ie=!1;S=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),ee:br()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=i}function Pe(){var i=I.buffer;n.HEAP8=O=new Int8Array(i),n.HEAP16=R=new Int16Array(i),n.HEAPU8=D=new Uint8Array(i),n.HEAPU16=F=new Uint16Array(i),n.HEAP32=Z=new Int32Array(i),n.HEAPU32=X=new Uint32Array(i),n.HEAPF32=H=new Float32Array(i),n.HEAPF64=q=new Float64Array(i),n.HEAP64=Y=new BigInt64Array(i),n.HEAPU64=xe=new BigUint64Array(i)}function xt(){d?startWorker(n):N.Bb()}d||(I=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Pe());var Bt,Dt=0,qt=null;function Vo(){if(--Dt==0&&qt){var i=qt;qt=null,i()}}function dt(i){throw S(i="Aborted("+i+")"),ne=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),r(i),i}function Wo(){return{a:{Ta:yp,Va:gp,W:wp,la:vp,b:xp,u:Sp,S:Tp,Za:Ip,d:Cp,pb:Yo,g:$p,T:ei,Ga:ti,lb:ni,nb:oi,Ha:ii,Ea:ai,wb:si,Da:ui,pa:di,mb:li,jb:ci,Fa:pi,kb:mi,Ma:Ap,za:kp,eb:Pp,cb:Op,ya:Dp,V:Mp,N:Rp,db:Up,ma:Fp,fb:qp,zb:Kp,hb:jp,qb:Zp,ab:Qp,Aa:Yp,yb:kn,Ja:Xp,Q:Jp,Wa:em,$:nm,H:om,D:am,l:Cn,F:sm,A:lm,X:cm,J:pm,v:mm,O:fm,E:hm,s:gm,B:ym,z:bm,w:_m,r:wm,tb:vm,ub:$m,vb:xm,rb:Ci,sb:Ai,bb:Ei,Oa:Tm,La:Am,y:Em,ja:km,Ba:Pm,Ka:Im,qa:zm,Ia:Om,ib:Bm,U:Sm,fa:Dm,Sa:Mm,gb:Rm,Qa:Um,Pa:Nm,Ab:Oi,Ca:Bi,ob:vn,aa:Di,oa:Mi,xb:Ri,na:Ui,$a:mf,ia:If,sa:Pf,ga:cf,da:_f,ua:Ef,p:df,e:qm,c:Hm,ea:yf,f:Km,n:Zm,k:of,Y:Ym,ka:af,j:lf,wa:gf,Ra:Bf,ca:Sf,Ua:Of,P:bf,K:Jm,_:xf,R:pf,Z:Cf,x:Xm,m:Fm,va:$f,i:Gm,h:Qm,ra:zf,ta:kf,o:jm,q:ef,t:rf,I:nf,C:uf,L:sf,xa:hf,_a:ff,G:Tf,Ya:wf,ba:Af,M:tf,Xa:vf,ha:Wm,a:I,Na:wn}}}var yn={1325506:()=>typeof wasmOffsetConverter<"u",1325563:(i,u,c,m,g)=>{if(n===void 0||!n.Bd)return 1;if((i=Ee(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=n.Bd.get(i)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),m=Number(m>>>0),u+c>i.byteLength)return 3;try{let x=i.subarray(u,u+c);switch(g){case 0:_e().set(x,m>>>0);break;case 1:n.ie?n.ie(m,x):n.Zd(m,x);break;default:return 4}return 0}catch{return 4}},1326387:(i,u,c)=>{n.Ld(i,_e().subarray(u>>>0,u+c>>>0))},1326451:()=>n.je(),1326493:i=>{n.Kd(i)},1326530:()=>{n.Sd()},1326561:()=>{n.Td()},1326590:()=>{n.Xd()},1326615:i=>n.Rd(i),1326648:i=>n.Vd(i),1326680:(i,u,c)=>{n.Hd(Number(i),Number(u),Number(c),!0)},1326743:(i,u,c)=>{n.Hd(Number(i),Number(u),Number(c))},1326800:i=>{n.vd("Abs",i,void 0)},1326851:i=>{n.vd("Neg",i,void 0)},1326902:i=>{n.vd("Floor",i,void 0)},1326955:i=>{n.vd("Ceil",i,void 0)},1327007:i=>{n.vd("Reciprocal",i,void 0)},1327065:i=>{n.vd("Sqrt",i,void 0)},1327117:i=>{n.vd("Exp",i,void 0)},1327168:i=>{n.vd("Erf",i,void 0)},1327219:i=>{n.vd("Sigmoid",i,void 0)},1327274:(i,u,c)=>{n.vd("HardSigmoid",i,{alpha:u,beta:c})},1327353:i=>{n.vd("Log",i,void 0)},1327404:i=>{n.vd("Sin",i,void 0)},1327455:i=>{n.vd("Cos",i,void 0)},1327506:i=>{n.vd("Tan",i,void 0)},1327557:i=>{n.vd("Asin",i,void 0)},1327609:i=>{n.vd("Acos",i,void 0)},1327661:i=>{n.vd("Atan",i,void 0)},1327713:i=>{n.vd("Sinh",i,void 0)},1327765:i=>{n.vd("Cosh",i,void 0)},1327817:i=>{n.vd("Asinh",i,void 0)},1327870:i=>{n.vd("Acosh",i,void 0)},1327923:i=>{n.vd("Atanh",i,void 0)},1327976:i=>{n.vd("Tanh",i,void 0)},1328028:i=>{n.vd("Not",i,void 0)},1328079:(i,u,c)=>{n.vd("Clip",i,{min:u,max:c})},1328148:i=>{n.vd("Clip",i,void 0)},1328200:(i,u)=>{n.vd("Elu",i,{alpha:u})},1328258:i=>{n.vd("Gelu",i,void 0)},1328310:i=>{n.vd("Relu",i,void 0)},1328362:(i,u)=>{n.vd("LeakyRelu",i,{alpha:u})},1328426:(i,u)=>{n.vd("ThresholdedRelu",i,{alpha:u})},1328496:(i,u)=>{n.vd("Cast",i,{to:u})},1328554:i=>{n.vd("Add",i,void 0)},1328605:i=>{n.vd("Sub",i,void 0)},1328656:i=>{n.vd("Mul",i,void 0)},1328707:i=>{n.vd("Div",i,void 0)},1328758:i=>{n.vd("Pow",i,void 0)},1328809:i=>{n.vd("Equal",i,void 0)},1328862:i=>{n.vd("Greater",i,void 0)},1328917:i=>{n.vd("GreaterOrEqual",i,void 0)},1328979:i=>{n.vd("Less",i,void 0)},1329031:i=>{n.vd("LessOrEqual",i,void 0)},1329090:(i,u,c,m,g)=>{n.vd("ReduceMean",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1329265:(i,u,c,m,g)=>{n.vd("ReduceMax",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1329439:(i,u,c,m,g)=>{n.vd("ReduceMin",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1329613:(i,u,c,m,g)=>{n.vd("ReduceProd",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1329788:(i,u,c,m,g)=>{n.vd("ReduceSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1329962:(i,u,c,m,g)=>{n.vd("ReduceL1",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330135:(i,u,c,m,g)=>{n.vd("ReduceL2",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330308:(i,u,c,m,g)=>{n.vd("ReduceLogSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330485:(i,u,c,m,g)=>{n.vd("ReduceSumSquare",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330665:(i,u,c,m,g)=>{n.vd("ReduceLogSumExp",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330845:i=>{n.vd("Where",i,void 0)},1330898:(i,u,c)=>{n.vd("Transpose",i,{perm:u?Array.from(E().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1331022:(i,u,c,m)=>{n.vd("DepthToSpace",i,{blocksize:u,mode:Ee(c),format:m?"NHWC":"NCHW"})},1331155:(i,u,c,m)=>{n.vd("DepthToSpace",i,{blocksize:u,mode:Ee(c),format:m?"NHWC":"NCHW"})},1331288:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se,He)=>{n.vd("ConvTranspose",i,{format:M?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,C],strides:[B],wIsConst:()=>!!me()[V>>>0],outputPadding:K?Array.from(E().subarray(Number(K)>>>0,Number(J)>>>0)):[],outputShape:le?Array.from(E().subarray(Number(le)>>>0,Number(Se)>>>0)):[],activation:Ee(He)})},1331721:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:Array.from(E().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(E().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(E().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(E().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!me()[M>>>0],outputPadding:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],outputShape:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[],activation:Ee(Se)})},1332382:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se,He)=>{n.vd("ConvTranspose",i,{format:M?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,C],strides:[B],wIsConst:()=>!!me()[V>>>0],outputPadding:K?Array.from(E().subarray(Number(K)>>>0,Number(J)>>>0)):[],outputShape:le?Array.from(E().subarray(Number(le)>>>0,Number(Se)>>>0)):[],activation:Ee(He)})},1332815:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:Array.from(E().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(E().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(E().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(E().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!me()[M>>>0],outputPadding:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],outputShape:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[],activation:Ee(Se)})},1333476:(i,u)=>{n.vd("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1333567:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("AveragePool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:B?Array.from(E().subarray(Number(B)>>>0,Number(M)>>>0)):[],pads:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],strides:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[]})},1334046:(i,u)=>{n.vd("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1334137:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("AveragePool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:B?Array.from(E().subarray(Number(B)>>>0,Number(M)>>>0)):[],pads:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],strides:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[]})},1334616:(i,u)=>{n.vd("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1334703:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("MaxPool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:B?Array.from(E().subarray(Number(B)>>>0,Number(M)>>>0)):[],pads:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],strides:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[]})},1335178:(i,u)=>{n.vd("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1335265:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>{n.vd("MaxPool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:B?Array.from(E().subarray(Number(B)>>>0,Number(M)>>>0)):[],pads:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],strides:J?Array.from(E().subarray(Number(J)>>>0,Number(le)>>>0)):[]})},1335740:(i,u,c,m,g)=>{n.vd("Gemm",i,{alpha:u,beta:c,transA:m,transB:g})},1335844:i=>{n.vd("MatMul",i,void 0)},1335898:(i,u,c,m)=>{n.vd("ArgMax",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1336006:(i,u,c,m)=>{n.vd("ArgMin",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1336114:(i,u)=>{n.vd("Softmax",i,{axis:u})},1336177:(i,u)=>{n.vd("Concat",i,{axis:u})},1336237:(i,u,c,m,g)=>{n.vd("Split",i,{axis:u,numOutputs:c,splitSizes:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1336393:i=>{n.vd("Expand",i,void 0)},1336447:(i,u)=>{n.vd("Gather",i,{axis:Number(u)})},1336518:(i,u)=>{n.vd("GatherElements",i,{axis:Number(u)})},1336597:(i,u)=>{n.vd("GatherND",i,{batch_dims:Number(u)})},1336676:(i,u,c,m,g,x,C,B,M,V,K)=>{n.vd("Resize",i,{antialias:u,axes:c?Array.from(E().subarray(Number(c)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ee(g),cubicCoeffA:x,excludeOutside:C,extrapolationValue:B,keepAspectRatioPolicy:Ee(M),mode:Ee(V),nearestMode:Ee(K)})},1337038:(i,u,c,m,g,x,C)=>{n.vd("Slice",i,{starts:u?Array.from(E().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[],axes:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[]})},1337302:i=>{n.vd("Tile",i,void 0)},1337354:(i,u,c)=>{n.vd("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1337468:(i,u,c)=>{n.vd("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1337582:i=>{n.vd("Range",i,void 0)},1337635:(i,u)=>{n.vd("Einsum",i,{equation:Ee(u)})},1337716:(i,u,c,m,g)=>{n.vd("Pad",i,{mode:u,value:c,pads:m?Array.from(E().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1337859:(i,u,c,m,g,x)=>{n.vd("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1338028:(i,u,c,m,g,x)=>{n.vd("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1338197:(i,u,c)=>{n.vd("CumSum",i,{exclusive:Number(u),reverse:Number(c)})},1338294:(i,u,c)=>{n.vd("DequantizeLinear",i,{axis:u,blockSize:c})},1338384:(i,u,c,m,g)=>{n.vd("GridSample",i,{align_corners:u,mode:Ee(c),padding_mode:Ee(m),format:g?"NHWC":"NCHW"})},1338554:(i,u,c,m,g)=>{n.vd("GridSample",i,{align_corners:u,mode:Ee(c),padding_mode:Ee(m),format:g?"NHWC":"NCHW"})},1338724:(i,u)=>{n.vd("ScatterND",i,{reduction:Ee(u)})},1338809:(i,u,c,m,g,x,C,B,M)=>{n.vd("Attention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x,qkvHiddenSizes:C?Array.from(E().subarray(Number(B)>>>0,Number(B)+C>>>0)):[],pastPresentShareBuffer:!!M})},1339081:i=>{n.vd("BiasAdd",i,void 0)},1339136:i=>{n.vd("BiasSplitGelu",i,void 0)},1339197:i=>{n.vd("FastGelu",i,void 0)},1339253:(i,u,c,m,g,x,C,B,M,V,K,J,le,Se,He,Qt)=>{n.vd("Conv",i,{format:J?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(E().subarray(Number(c)>>>0,Number(m)>>>0)):[],group:g,kernel_shape:x?Array.from(E().subarray(Number(x)>>>0,Number(C)>>>0)):[],pads:B?Array.from(E().subarray(Number(B)>>>0,Number(M)>>>0)):[],strides:V?Array.from(E().subarray(Number(V)>>>0,Number(K)>>>0)):[],w_is_const:()=>!!me()[Number(le)>>>0],activation:Ee(Se),activation_params:He?Array.from(fe().subarray(Number(He)>>>0,Number(Qt)>>>0)):[]})},1339837:i=>{n.vd("Gelu",i,void 0)},1339889:(i,u,c,m,g,x,C,B,M)=>{n.vd("GroupQueryAttention",i,{numHeads:u,kvNumHeads:c,scale:m,softcap:g,doRotary:x,rotaryInterleaved:C,smoothSoftmax:B,localWindowSize:M})},1340106:(i,u,c,m)=>{n.vd("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1340217:(i,u,c,m)=>{n.vd("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1340328:(i,u,c,m,g,x)=>{n.vd("MatMulNBits",i,{k:u,n:c,accuracyLevel:m,bits:g,blockSize:x})},1340455:(i,u,c,m,g,x)=>{n.vd("MultiHeadAttention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x})},1340614:(i,u)=>{n.vd("QuickGelu",i,{alpha:u})},1340678:(i,u,c,m,g)=>{n.vd("RotaryEmbedding",i,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:m,scale:g})},1340817:(i,u,c)=>{n.vd("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1340919:(i,u,c)=>{n.vd("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1341021:(i,u,c,m)=>{n.vd("GatherBlockQuantized",i,{gatherAxis:u,quantizeAxis:c,blockSize:m})},1341142:i=>{n.Wd(i)},1341176:(i,u)=>n.Yd(Number(i),Number(u),n.Cd.ae,n.Cd.errors)};function gp(i,u,c){return vi(async()=>{await n.Ud(Number(i),Number(u),Number(c))})}function yp(){return typeof wasmOffsetConverter<"u"}class bn{name="ExitStatus";constructor(u){this.message=`Program terminated with exit(${u})`,this.status=u}}var Lo=i=>{i.terminate(),i.onmessage=()=>{}},_n=[],Go=i=>{ht.length==0&&(Zo(),jo(ht[0]));var u=ht.pop();if(!u)return 6;Kt.push(u),St[i.xd]=u,u.xd=i.xd;var c={yd:"run",ce:i.be,Ed:i.Ed,xd:i.xd};return u.postMessage(c,i.Jd),0},ft=0,Ce=(i,u,...c)=>{for(var m=2*c.length,g=ae(),x=Un(8*m),C=x>>>3,B=0;B<c.length;B++){var M=c[B];typeof M=="bigint"?(Y[C+2*B]=1n,Y[C+2*B+1]=M):(Y[C+2*B]=0n,De()[C+2*B+1>>>0]=M)}return i=Gi(i,0,m,x,u),ie(g),i};function wn(i){if(d)return Ce(0,1,i);if(A=i,!(0<ft)){for(var u of Kt)Lo(u);for(u of ht)Lo(u);ht=[],Kt=[],St={},ne=!0}b(0,new bn(i))}function Ho(i){if(d)return Ce(1,0,i);vn(i)}var vn=i=>{if(A=i,d)throw Ho(i),"unwind";wn(i)},ht=[],Kt=[],Fo=[],St={},qo=i=>{var u=i.xd;delete St[u],ht.push(i),Kt.splice(Kt.indexOf(i),1),i.xd=0,Hi(u)};function Ko(){Fo.forEach(i=>i())}var jo=i=>new Promise(u=>{i.onmessage=g=>{var x=(g=g.data).yd;if(g.Dd&&g.Dd!=br()){var C=St[g.Dd];C?C.postMessage(g,g.Jd):S(`Internal error! Worker sent a message "${x}" to target pthread ${g.Dd}, but that thread no longer exists!`)}else x==="checkMailbox"?lr():x==="spawnThread"?Go(g):x==="cleanupThread"?qo(St[g.de]):x==="loaded"?(i.loaded=!0,u(i)):x==="alert"?alert(`Thread ${g.ee}: ${g.text}`):g.target==="setimmediate"?i.postMessage(g):x==="callHandler"?n[g.Nd](...g.args):x&&S(`worker sent an unknown command ${x}`)},i.onerror=g=>{throw S(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var c,m=[];for(c of[])n.propertyIsEnumerable(c)&&m.push(c);i.postMessage({yd:"load",Od:m,ge:I,he:k})});function Zo(){var i=new Worker((()=>{let u=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new u("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ht.push(i)}var bp=i=>{Pe();var u=G()[i+52>>>2>>>0];i=G()[i+56>>>2>>>0],Ki(u,u-i),ie(u)},_p=(i,u)=>{ft=0,i=Nn(i,u),0<ft?A=i:Rn(i)},dr=[];function wp(i){var u=new $n(i>>>=0);if(me()[u.wd+12>>>0]==0){var c=1;me()[u.wd+12>>>0]=c}return c=0,me()[u.wd+13>>>0]=c,dr.push(u),Zi(i),Yi(i)}var Mt=0,vp=()=>{de(0,0);var i=dr.pop();ji(i.Fd),Mt=0};class $n{constructor(u){this.Fd=u,this.wd=u-24}}function $p(i){throw Mt||=i>>>0,Mt}var xn=i=>{var u=Mt;if(!u)return Zt(0),0;var c=new $n(u);G()[c.wd+16>>>2>>>0]=u;var m=G()[c.wd+4>>>2>>>0];if(!m)return Zt(0),u;for(var g of i){if(g===0||g===m)break;if(Qi(g,m,c.wd+16))return Zt(g),u}return Zt(m),u};function xp(){return xn([])}function Sp(i){return xn([i>>>0])}function Tp(i,u){return xn([i>>>0,u>>>0])}var Ip=()=>{var i=dr.pop();i||dt("no exception to throw");var u=i.Fd;if(me()[i.wd+13>>>0]==0){dr.push(i);var c=1;me()[i.wd+13>>>0]=c,c=0,me()[i.wd+12>>>0]=c}throw Mt=u};function Cp(i,u,c){var m=new $n(i>>>=0);throw u>>>=0,c>>>=0,G()[m.wd+16>>>2>>>0]=0,G()[m.wd+4>>>2>>>0]=u,G()[m.wd+8>>>2>>>0]=c,Mt=i}function Qo(i,u,c,m){return d?Ce(2,1,i,u,c,m):Yo(i,u,c,m)}function Yo(i,u,c,m){if(i>>>=0,c>>>=0,m>>>=0,l===void 0)return 6;var g=[];return d&&g.length===0?Qo(i,u>>>=0,c,m):(i={be:c,xd:i,Ed:m,Jd:g},d?(i.yd="spawnThread",postMessage(i,g),0):Go(i))}var Xo=typeof TextDecoder<"u"?new TextDecoder:void 0,Jo=(i,u=0,c=NaN)=>{var m=(u>>>=0)+c;for(c=u;i[c]&&!(c>=m);)++c;if(16<c-u&&i.buffer&&Xo)return Xo.decode(i.buffer instanceof ArrayBuffer?i.subarray(u,c):i.slice(u,c));for(m="";u<c;){var g=i[u++];if(128&g){var x=63&i[u++];if((224&g)==192)m+=String.fromCharCode((31&g)<<6|x);else{var C=63&i[u++];65536>(g=(240&g)==224?(15&g)<<12|x<<6|C:(7&g)<<18|x<<12|C<<6|63&i[u++])?m+=String.fromCharCode(g):(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else m+=String.fromCharCode(g)}return m},Ee=(i,u)=>(i>>>=0)?Jo(_e(),i,u):"";function ei(i,u,c){return d?Ce(3,1,i,u,c):0}function ti(i,u){if(d)return Ce(4,1,i,u)}var ri=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);127>=m?u++:2047>=m?u+=2:55296<=m&&57343>=m?(u+=4,++c):u+=3}return u},Rt=(i,u,c)=>{var m=_e();if(u>>>=0,0<c){var g=u;c=u+c-1;for(var x=0;x<i.length;++x){var C=i.charCodeAt(x);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&i.charCodeAt(++x)),127>=C){if(u>=c)break;m[u++>>>0]=C}else{if(2047>=C){if(u+1>=c)break;m[u++>>>0]=192|C>>6}else{if(65535>=C){if(u+2>=c)break;m[u++>>>0]=224|C>>12}else{if(u+3>=c)break;m[u++>>>0]=240|C>>18,m[u++>>>0]=128|C>>12&63}m[u++>>>0]=128|C>>6&63}m[u++>>>0]=128|63&C}}m[u>>>0]=0,i=u-g}else i=0;return i};function ni(i,u){if(d)return Ce(5,1,i,u)}function oi(i,u,c){if(d)return Ce(6,1,i,u,c)}function ii(i,u,c){return d?Ce(7,1,i,u,c):0}function ai(i,u){if(d)return Ce(8,1,i,u)}function si(i,u,c){if(d)return Ce(9,1,i,u,c)}function ui(i,u,c,m){if(d)return Ce(10,1,i,u,c,m)}function di(i,u,c,m){if(d)return Ce(11,1,i,u,c,m)}function li(i,u,c,m){if(d)return Ce(12,1,i,u,c,m)}function ci(i){if(d)return Ce(13,1,i)}function pi(i,u){if(d)return Ce(14,1,i,u)}function mi(i,u,c){if(d)return Ce(15,1,i,u,c)}var fi,gt,Ap=()=>dt(""),Xe=i=>{for(var u="";_e()[i>>>0];)u+=fi[_e()[i++>>>0]];return u},Sn={},Tn={},Ep={};function lt(i,u,c={}){return function(m,g,x={}){var C=g.name;if(!m)throw new gt(`type "${C}" must have a positive integer typeid pointer`);if(Tn.hasOwnProperty(m)){if(x.Pd)return;throw new gt(`Cannot register type '${C}' twice`)}Tn[m]=g,delete Ep[m],Sn.hasOwnProperty(m)&&(g=Sn[m],delete Sn[m],g.forEach(B=>B()))}(i,u,c)}var hi=(i,u,c)=>{switch(u){case 1:return c?m=>me()[m>>>0]:m=>_e()[m>>>0];case 2:return c?m=>ve()[m>>>1>>>0]:m=>oe()[m>>>1>>>0];case 4:return c?m=>E()[m>>>2>>>0]:m=>G()[m>>>2>>>0];case 8:return c?m=>Y[m>>>3]:m=>xe[m>>>3];default:throw new TypeError(`invalid integer width (${u}): ${i}`)}};function kp(i,u,c){c>>>=0,lt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:function(m,g){if(typeof g!="bigint"&&typeof g!="number")throw g=g===null?"null":(m=typeof g)=="object"||m==="array"||m==="function"?g.toString():""+g,new TypeError(`Cannot convert "${g}" to ${this.name}`);return typeof g=="number"&&(g=BigInt(g)),g},zd:yt,readValueFromPointer:hi(u,c,u.indexOf("u")==-1),Ad:null})}var yt=8;function Pp(i,u,c,m){lt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(g){return!!g},toWireType:function(g,x){return x?c:m},zd:yt,readValueFromPointer:function(g){return this.fromWireType(_e()[g>>>0])},Ad:null})}var In=[],ct=[];function Cn(i){9<(i>>>=0)&&--ct[i+1]==0&&(ct[i]=void 0,In.push(i))}var Ue=i=>{if(!i)throw new gt("Cannot use deleted val. handle = "+i);return ct[i]},Ge=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=In.pop()||ct.length;return ct[u]=i,ct[u+1]=1,u}};function An(i){return this.fromWireType(G()[i>>>2>>>0])}var zp={name:"emscripten::val",fromWireType:i=>{var u=Ue(i);return Cn(i),u},toWireType:(i,u)=>Ge(u),zd:yt,readValueFromPointer:An,Ad:null};function Op(i){return lt(i>>>0,zp)}var Bp=(i,u)=>{switch(u){case 4:return function(c){return this.fromWireType(fe()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(De()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${i}`)}};function Dp(i,u,c){c>>>=0,lt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:(m,g)=>g,zd:yt,readValueFromPointer:Bp(u,c),Ad:null})}function Mp(i,u,c,m,g){if(i>>>=0,c>>>=0,u=Xe(u>>>0),g===-1&&(g=4294967295),g=B=>B,m===0){var x=32-8*c;g=B=>B<<x>>>x}var C=u.includes("unsigned")?function(B,M){return M>>>0}:function(B,M){return M};lt(i,{name:u,fromWireType:g,toWireType:C,zd:yt,readValueFromPointer:hi(u,c,m!==0),Ad:null})}function Rp(i,u,c){function m(x){var C=G()[x>>>2>>>0];return x=G()[x+4>>>2>>>0],new g(me().buffer,x,C)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];lt(i>>>=0,{name:c=Xe(c>>>0),fromWireType:m,zd:yt,readValueFromPointer:m},{Pd:!0})}function Up(i,u){lt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(c){for(var m,g=G()[c>>>2>>>0],x=c+4,C=x,B=0;B<=g;++B){var M=x+B;B!=g&&_e()[M>>>0]!=0||(C=Ee(C,M-C),m===void 0?m=C:(m+="\0",m+=C),C=M+1)}return et(c),m},toWireType:function(c,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var g=typeof m=="string";if(!(g||m instanceof Uint8Array||m instanceof Uint8ClampedArray||m instanceof Int8Array))throw new gt("Cannot pass non-string to std::string");var x=g?ri(m):m.length,C=_r(4+x+1),B=C+4;if(G()[C>>>2>>>0]=x,g)Rt(m,B,x+1);else if(g)for(g=0;g<x;++g){var M=m.charCodeAt(g);if(255<M)throw et(C),new gt("String has UTF-16 code units that do not fit in 8 bits");_e()[B+g>>>0]=M}else for(g=0;g<x;++g)_e()[B+g>>>0]=m[g];return c!==null&&c.push(et,C),C},zd:yt,readValueFromPointer:An,Ad(c){et(c)}})}var gi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Np=(i,u)=>{for(var c=i>>1,m=c+u/2;!(c>=m)&&oe()[c>>>0];)++c;if(32<(c<<=1)-i&&gi)return gi.decode(_e().slice(i,c));for(c="",m=0;!(m>=u/2);++m){var g=ve()[i+2*m>>>1>>>0];if(g==0)break;c+=String.fromCharCode(g)}return c},Vp=(i,u,c)=>{if(c??=2147483647,2>c)return 0;var m=u;c=(c-=2)<2*i.length?c/2:i.length;for(var g=0;g<c;++g){var x=i.charCodeAt(g);ve()[u>>>1>>>0]=x,u+=2}return ve()[u>>>1>>>0]=0,u-m},Wp=i=>2*i.length,Lp=(i,u)=>{for(var c=0,m="";!(c>=u/4);){var g=E()[i+4*c>>>2>>>0];if(g==0)break;++c,65536<=g?(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g)):m+=String.fromCharCode(g)}return m},Gp=(i,u,c)=>{if(u>>>=0,c??=2147483647,4>c)return 0;var m=u;c=m+c-4;for(var g=0;g<i.length;++g){var x=i.charCodeAt(g);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&i.charCodeAt(++g)),E()[u>>>2>>>0]=x,(u+=4)+4>c)break}return E()[u>>>2>>>0]=0,u-m},Hp=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);55296<=m&&57343>=m&&++c,u+=4}return u};function Fp(i,u,c){if(i>>>=0,u>>>=0,c=Xe(c>>>=0),u===2)var m=Np,g=Vp,x=Wp,C=B=>oe()[B>>>1>>>0];else u===4&&(m=Lp,g=Gp,x=Hp,C=B=>G()[B>>>2>>>0]);lt(i,{name:c,fromWireType:B=>{for(var M,V=G()[B>>>2>>>0],K=B+4,J=0;J<=V;++J){var le=B+4+J*u;J!=V&&C(le)!=0||(K=m(K,le-K),M===void 0?M=K:(M+="\0",M+=K),K=le+u)}return et(B),M},toWireType:(B,M)=>{if(typeof M!="string")throw new gt(`Cannot pass non-string to C++ string type ${c}`);var V=x(M),K=_r(4+V+u);return G()[K>>>2>>>0]=V/u,g(M,K+4,V+u),B!==null&&B.push(et,K),K},zd:yt,readValueFromPointer:An,Ad(B){et(B)}})}function qp(i,u){lt(i>>>=0,{Qd:!0,name:u=Xe(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function Kp(i){Mn(i>>>0,!s,1,!a,131072,!1),Ko()}var En=i=>{if(!ne)try{if(i(),!(0<ft))try{d?Rn(A):vn(A)}catch(u){u instanceof bn||u=="unwind"||b(0,u)}}catch(u){u instanceof bn||u=="unwind"||b(0,u)}};function kn(i){i>>>=0,typeof Atomics.fe=="function"&&(Atomics.fe(E(),i>>>2,i).value.then(lr),i+=128,Atomics.store(E(),i>>>2,1))}var lr=()=>{var i=br();i&&(kn(i),En(qi))};function jp(i,u){(i>>>=0)==u>>>0?setTimeout(lr):d?postMessage({Dd:i,yd:"checkMailbox"}):(i=St[i])&&i.postMessage({yd:"checkMailbox"})}var Pn=[];function Zp(i,u,c,m,g){for(u>>>=0,m/=2,Pn.length=m,c=g>>>0>>>3,g=0;g<m;g++)Pn[g]=Y[c+2*g]?Y[c+2*g+1]:De()[c+2*g+1>>>0];return(u?yn[u]:Lm[i])(...Pn)}var Qp=()=>{ft=0};function Yp(i){i>>>=0,d?postMessage({yd:"cleanupThread",de:i}):qo(St[i])}function Xp(i){}var cr=(i,u)=>{var c=Tn[i];if(c===void 0)throw i=Vi(i),c=Xe(i),et(i),new gt(`${u} has unknown type ${c}`);return c},yi=(i,u,c)=>{var m=[];return i=i.toWireType(m,c),m.length&&(G()[u>>>2>>>0]=Ge(m)),i};function Jp(i,u,c){return u>>>=0,c>>>=0,i=Ue(i>>>0),u=cr(u,"emval::as"),yi(u,c,i)}function em(i,u){return u>>>=0,i=Ue(i>>>0),(u=cr(u,"emval::as")).toWireType(null,i)}var pr=i=>{try{i()}catch(u){dt(u)}},bt=0,Je=null,bi=0,mr=[],_i={},wi={},tm=0,zn=null,rm=[];function vi(i){return function(u){if(!ne){if(bt===0){var c=!1,m=!1;u((g=0)=>{if(!ne&&(bi=g,c=!0,m)){bt=2,pr(()=>Ha(Je)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),g=!1;try{var x=function(){var M=E()[Je+8>>>2>>>0];return M=N[wi[M]],--ft,M()}()}catch(M){x=M,g=!0}var C=!1;if(!Je){var B=zn;B&&(zn=null,(g?B.reject:B.resolve)(x),C=!0)}if(g&&!C)throw x}}),m=!0,c||(bt=1,Je=function(){var g=_r(65548),x=g+12;G()[g>>>2>>>0]=x,G()[g+4>>>2>>>0]=x+65536,x=mr[0];var C=_i[x];return C===void 0&&(C=tm++,_i[x]=C,wi[C]=x),x=C,E()[g+8>>>2>>>0]=x,g}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),pr(()=>La(Je)))}else bt===2?(bt=0,pr(Fa),et(Je),Je=null,rm.forEach(En)):dt(`invalid state: ${bt}`);return bi}}(u=>{i().then(u)})}function nm(i){return i>>>=0,vi(async()=>{var u=await Ue(i);return Ge(u)})}var fr=[];function om(i,u,c,m){return c>>>=0,m>>>=0,(i=fr[i>>>0])(null,u=Ue(u>>>0),c,m)}var im={},hr=i=>{var u=im[i];return u===void 0?Xe(i):u};function am(i,u,c,m,g){return c>>>=0,m>>>=0,g>>>=0,(i=fr[i>>>0])(u=Ue(u>>>0),u[c=hr(c)],m,g)}var $i=()=>typeof globalThis=="object"?globalThis:Function("return this")();function sm(i){return(i>>>=0)==0?Ge($i()):(i=hr(i),Ge($i()[i]))}var um=i=>{var u=fr.length;return fr.push(i),u},dm=(i,u)=>{for(var c=Array(i),m=0;m<i;++m)c[m]=cr(G()[u+4*m>>>2>>>0],"parameter "+m);return c},xi=(i,u)=>Object.defineProperty(u,"name",{value:i});function lm(i,u,c){var m=(u=dm(i,u>>>0)).shift();i--;var g=`return function (obj, func, destructorsRef, args) {
`,x=0,C=[];c===0&&C.push("obj");for(var B=["retType"],M=[m],V=0;V<i;++V)C.push("arg"+V),B.push("argType"+V),M.push(u[V]),g+=`  var arg${V} = argType${V}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[V].zd;return g+=`  var rv = ${c===1?"new func":"func.call"}(${C.join(", ")});
`,m.Qd||(B.push("emval_returnValue"),M.push(yi),g+=`  return emval_returnValue(retType, destructorsRef, rv);
`),B.push(g+`};
`),i=function(K){var J=Function;if(!(J instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof J} which is not a function`);var le=xi(J.name||"unknownFunctionName",function(){});return le.prototype=J.prototype,le=new le,(K=J.apply(le,K))instanceof Object?K:le}(B)(...M),c=`methodCaller<(${u.map(K=>K.name).join(", ")}) => ${m.name}>`,um(xi(c,i))}function cm(i){return i=hr(i>>>0),Ge(n[i])}function pm(i,u){return u>>>=0,i=Ue(i>>>0),u=Ue(u),Ge(i[u])}function mm(i){9<(i>>>=0)&&(ct[i+1]+=1)}function fm(){return Ge([])}function hm(i){i=Ue(i>>>0);for(var u=Array(i.length),c=0;c<i.length;c++)u[c]=i[c];return Ge(u)}function gm(i){return Ge(hr(i>>>0))}function ym(){return Ge({})}function bm(i){for(var u=Ue(i>>>=0);u.length;){var c=u.pop();u.pop()(c)}Cn(i)}function _m(i,u,c){u>>>=0,c>>>=0,i=Ue(i>>>0),u=Ue(u),c=Ue(c),i[u]=c}function wm(i,u){return u>>>=0,i=(i=cr(i>>>0,"_emval_take_value")).readValueFromPointer(u),Ge(i)}function vm(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),E()[u>>>2>>>0]=i.getUTCSeconds(),E()[u+4>>>2>>>0]=i.getUTCMinutes(),E()[u+8>>>2>>>0]=i.getUTCHours(),E()[u+12>>>2>>>0]=i.getUTCDate(),E()[u+16>>>2>>>0]=i.getUTCMonth(),E()[u+20>>>2>>>0]=i.getUTCFullYear()-1900,E()[u+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,E()[u+28>>>2>>>0]=i}var Si=i=>i%4==0&&(i%100!=0||i%400==0),Ti=[0,31,60,91,121,152,182,213,244,274,305,335],Ii=[0,31,59,90,120,151,181,212,243,273,304,334];function $m(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),E()[u>>>2>>>0]=i.getSeconds(),E()[u+4>>>2>>>0]=i.getMinutes(),E()[u+8>>>2>>>0]=i.getHours(),E()[u+12>>>2>>>0]=i.getDate(),E()[u+16>>>2>>>0]=i.getMonth(),E()[u+20>>>2>>>0]=i.getFullYear()-1900,E()[u+24>>>2>>>0]=i.getDay();var c=(Si(i.getFullYear())?Ti:Ii)[i.getMonth()]+i.getDate()-1|0;E()[u+28>>>2>>>0]=c,E()[u+36>>>2>>>0]=-60*i.getTimezoneOffset(),c=new Date(i.getFullYear(),6,1).getTimezoneOffset();var m=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(c!=m&&i.getTimezoneOffset()==Math.min(m,c)),E()[u+32>>>2>>>0]=i}function xm(i){i>>>=0;var u=new Date(E()[i+20>>>2>>>0]+1900,E()[i+16>>>2>>>0],E()[i+12>>>2>>>0],E()[i+8>>>2>>>0],E()[i+4>>>2>>>0],E()[i>>>2>>>0],0),c=E()[i+32>>>2>>>0],m=u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),C=Math.min(x,g);return 0>c?E()[i+32>>>2>>>0]=+(g!=x&&C==m):0<c!=(C==m)&&(g=Math.max(x,g),u.setTime(u.getTime()+6e4*((0<c?C:g)-m))),E()[i+24>>>2>>>0]=u.getDay(),c=(Si(u.getFullYear())?Ti:Ii)[u.getMonth()]+u.getDate()-1|0,E()[i+28>>>2>>>0]=c,E()[i>>>2>>>0]=u.getSeconds(),E()[i+4>>>2>>>0]=u.getMinutes(),E()[i+8>>>2>>>0]=u.getHours(),E()[i+12>>>2>>>0]=u.getDate(),E()[i+16>>>2>>>0]=u.getMonth(),E()[i+20>>>2>>>0]=u.getYear(),i=u.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function Ci(i,u,c,m,g,x,C){return d?Ce(16,1,i,u,c,m,g,x,C):-52}function Ai(i,u,c,m,g,x){if(d)return Ce(17,1,i,u,c,m,g,x)}var jt={},Sm=()=>performance.timeOrigin+performance.now();function Ei(i,u){if(d)return Ce(18,1,i,u);if(jt[i]&&(clearTimeout(jt[i].id),delete jt[i]),!u)return 0;var c=setTimeout(()=>{delete jt[i],En(()=>Fi(i,performance.timeOrigin+performance.now()))},u);return jt[i]={id:c,me:u},0}function Tm(i,u,c,m){i>>>=0,u>>>=0,c>>>=0,m>>>=0;var g=new Date().getFullYear(),x=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var C=Math.max(x,g);G()[i>>>2>>>0]=60*C,E()[u>>>2>>>0]=+(x!=g),i=(u=B=>{var M=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(M/60)).padStart(2,"0")}${String(M%60).padStart(2,"0")}`})(x),u=u(g),g<x?(Rt(i,c,17),Rt(u,m,17)):(Rt(i,m,17),Rt(u,c,17))}var Im=()=>Date.now(),Cm=1;function Am(i,u,c){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!Cm)return 52;i=performance.timeOrigin+performance.now()}return Y[c>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var On=[],ki=(i,u)=>{On.length=0;for(var c;c=_e()[i++>>>0];){var m=c!=105;u+=(m&=c!=112)&&u%8?4:0,On.push(c==112?G()[u>>>2>>>0]:c==106?Y[u>>>3]:c==105?E()[u>>>2>>>0]:De()[u>>>3>>>0]),u+=m?8:4}return On};function Em(i,u,c){return i>>>=0,u=ki(u>>>0,c>>>0),yn[i](...u)}function km(i,u,c){return i>>>=0,u=ki(u>>>0,c>>>0),yn[i](...u)}var Pm=()=>{};function zm(i,u){return S(Ee(i>>>0,u>>>0))}var Om=()=>{throw ft+=1,"unwind"};function Bm(){return 4294901760}var Dm=()=>navigator.hardwareConcurrency;function Mm(){return dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Rm(i){i>>>=0;var u=_e().length;if(i<=u||4294901760<i)return!1;for(var c=1;4>=c;c*=2){var m=u*(1+.2/c);m=Math.min(m,i+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(i,m)/65536))-I.buffer.byteLength+65535)/65536|0;try{I.grow(m),Pe();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}var gr=()=>(dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ut={},Pi=i=>{i.forEach(u=>{var c=gr();c&&(Ut[c]=u)})};function Um(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Pi(i),Ut.Id=gr(),Ut.$d=i,Ut.Id}function Nm(i,u,c){if(i>>>=0,u>>>=0,Ut.Id==i)var m=Ut.$d;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Pi(m);for(var g=3;m[g]&&gr()!=i;)++g;for(i=0;i<c&&m[i+g];++i)E()[u+4*i>>>2>>>0]=gr();return i}var Bn,Dn={},zi=()=>{if(!Bn){var i,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in Dn)Dn[i]===void 0?delete u[i]:u[i]=Dn[i];var c=[];for(i in u)c.push(`${i}=${u[i]}`);Bn=c}return Bn};function Oi(i,u){if(d)return Ce(19,1,i,u);i>>>=0,u>>>=0;var c=0;return zi().forEach((m,g)=>{var x=u+c;for(g=G()[i+4*g>>>2>>>0]=x,x=0;x<m.length;++x)me()[g++>>>0]=m.charCodeAt(x);me()[g>>>0]=0,c+=m.length+1}),0}function Bi(i,u){if(d)return Ce(20,1,i,u);i>>>=0,u>>>=0;var c=zi();G()[i>>>2>>>0]=c.length;var m=0;return c.forEach(g=>m+=g.length+1),G()[u>>>2>>>0]=m,0}function Di(i){return d?Ce(21,1,i):52}function Mi(i,u,c,m){return d?Ce(22,1,i,u,c,m):52}function Ri(i,u,c,m){return d?Ce(23,1,i,u,c,m):70}var Vm=[null,[],[]];function Ui(i,u,c,m){if(d)return Ce(24,1,i,u,c,m);u>>>=0,c>>>=0,m>>>=0;for(var g=0,x=0;x<c;x++){var C=G()[u>>>2>>>0],B=G()[u+4>>>2>>>0];u+=8;for(var M=0;M<B;M++){var V=_e()[C+M>>>0],K=Vm[i];V===0||V===10?((i===1?v:S)(Jo(K)),K.length=0):K.push(V)}g+=B}return G()[m>>>2>>>0]=g,0}function Wm(i){return i>>>0}d||function(){for(var i=n.numThreads-1;i--;)Zo();_n.unshift(()=>{Dt++,function(u){d?u():Promise.all(ht.map(jo)).then(u)}(()=>Vo())})}();for(var Ni=Array(256),yr=0;256>yr;++yr)Ni[yr]=String.fromCharCode(yr);fi=Ni,gt=n.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}},n.InternalError=class extends Error{constructor(i){super(i),this.name="InternalError"}},ct.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>ct.length/2-5-In.length;var N,Lm=[wn,Ho,Qo,ei,ti,ni,oi,ii,ai,si,ui,di,li,ci,pi,mi,Ci,Ai,Ei,Oi,Bi,Di,Mi,Ri,Ui];(async function(){function i(m,g){return N=m.exports,N=function(){var x=N,C={};for(let[B,M]of Object.entries(x))C[B]=typeof M=="function"?(...V)=>{mr.push(B);try{return M(...V)}finally{ne||(mr.pop(),Je&&bt===1&&mr.length===0&&(bt=0,ft+=1,pr(Ga),typeof Fibers<"u"&&Fibers.ne()))}}:M;return C}(),N=function(){var x=N,C=M=>V=>M(V)>>>0,B=M=>()=>M()>>>0;return(x=Object.assign({},x)).Cb=C(x.Cb),x.ec=B(x.ec),x.hc=C(x.hc),x.uc=C(x.uc),x.vc=B(x.vc),x.zc=C(x.zc),x}(),Fo.push(N.ic),k=g,Vo(),N}Dt++;var u=Wo();if(n.instantiateWasm)return new Promise(m=>{n.instantiateWasm(u,(g,x)=>{i(g,x),m(g.exports)})});if(d)return new Promise(m=>{Te=g=>{var x=new WebAssembly.Instance(g,Wo());m(i(x,g))}});Bt??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var c=await async function(m){var g=Bt;if(!Q&&typeof WebAssembly.instantiateStreaming=="function"&&!ee(g))try{var x=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,m)}catch(C){S(`wasm streaming compile failed: ${C}`),S("falling back to ArrayBuffer instantiation")}return async function(C,B){try{var M=await async function(V){if(!Q)try{var K=await h(V);return new Uint8Array(K)}catch{}if(V==Bt&&Q)V=new Uint8Array(Q);else{if(!y)throw"both async and sync fetching of the wasm failed";V=y(V)}return V}(C);return await WebAssembly.instantiate(M,B)}catch(V){S(`failed to asynchronously prepare wasm: ${V}`),dt(V)}}(g,m)}(u);return i(c.instance,c.module)}catch(m){return r(m),Promise.reject(m)}})();var Vi=i=>(Vi=N.Cb)(i),Wi=()=>(Wi=N.Db)();n._OrtInit=(i,u)=>(n._OrtInit=N.Eb)(i,u),n._OrtGetLastError=(i,u)=>(n._OrtGetLastError=N.Fb)(i,u),n._OrtCreateSessionOptions=(i,u,c,m,g,x,C,B,M,V)=>(n._OrtCreateSessionOptions=N.Gb)(i,u,c,m,g,x,C,B,M,V),n._OrtAppendExecutionProvider=(i,u,c,m,g)=>(n._OrtAppendExecutionProvider=N.Hb)(i,u,c,m,g),n._OrtAddFreeDimensionOverride=(i,u,c)=>(n._OrtAddFreeDimensionOverride=N.Ib)(i,u,c),n._OrtAddSessionConfigEntry=(i,u,c)=>(n._OrtAddSessionConfigEntry=N.Jb)(i,u,c),n._OrtReleaseSessionOptions=i=>(n._OrtReleaseSessionOptions=N.Kb)(i),n._OrtCreateSession=(i,u,c)=>(n._OrtCreateSession=N.Lb)(i,u,c),n._OrtReleaseSession=i=>(n._OrtReleaseSession=N.Mb)(i),n._OrtGetInputOutputCount=(i,u,c)=>(n._OrtGetInputOutputCount=N.Nb)(i,u,c),n._OrtGetInputOutputMetadata=(i,u,c,m)=>(n._OrtGetInputOutputMetadata=N.Ob)(i,u,c,m),n._OrtFree=i=>(n._OrtFree=N.Pb)(i),n._OrtCreateTensor=(i,u,c,m,g,x)=>(n._OrtCreateTensor=N.Qb)(i,u,c,m,g,x),n._OrtGetTensorData=(i,u,c,m,g)=>(n._OrtGetTensorData=N.Rb)(i,u,c,m,g),n._OrtReleaseTensor=i=>(n._OrtReleaseTensor=N.Sb)(i),n._OrtCreateRunOptions=(i,u,c,m)=>(n._OrtCreateRunOptions=N.Tb)(i,u,c,m),n._OrtAddRunConfigEntry=(i,u,c)=>(n._OrtAddRunConfigEntry=N.Ub)(i,u,c),n._OrtReleaseRunOptions=i=>(n._OrtReleaseRunOptions=N.Vb)(i),n._OrtCreateBinding=i=>(n._OrtCreateBinding=N.Wb)(i),n._OrtBindInput=(i,u,c)=>(n._OrtBindInput=N.Xb)(i,u,c),n._OrtBindOutput=(i,u,c,m)=>(n._OrtBindOutput=N.Yb)(i,u,c,m),n._OrtClearBoundOutputs=i=>(n._OrtClearBoundOutputs=N.Zb)(i),n._OrtReleaseBinding=i=>(n._OrtReleaseBinding=N._b)(i),n._OrtRunWithBinding=(i,u,c,m,g)=>(n._OrtRunWithBinding=N.$b)(i,u,c,m,g),n._OrtRun=(i,u,c,m,g,x,C,B)=>(n._OrtRun=N.ac)(i,u,c,m,g,x,C,B),n._OrtEndProfiling=i=>(n._OrtEndProfiling=N.bc)(i),n._JsepOutput=(i,u,c)=>(n._JsepOutput=N.cc)(i,u,c),n._JsepGetNodeName=i=>(n._JsepGetNodeName=N.dc)(i);var br=()=>(br=N.ec)(),et=n._free=i=>(et=n._free=N.fc)(i),_r=n._malloc=i=>(_r=n._malloc=N.hc)(i),Mn=(i,u,c,m,g,x)=>(Mn=N.jc)(i,u,c,m,g,x),Li=()=>(Li=N.kc)(),Gi=(i,u,c,m,g)=>(Gi=N.lc)(i,u,c,m,g),Hi=i=>(Hi=N.mc)(i),Rn=i=>(Rn=N.nc)(i),Fi=(i,u)=>(Fi=N.oc)(i,u),qi=()=>(qi=N.pc)(),de=(i,u)=>(de=N.qc)(i,u),Zt=i=>(Zt=N.rc)(i),Ki=(i,u)=>(Ki=N.sc)(i,u),ie=i=>(ie=N.tc)(i),Un=i=>(Un=N.uc)(i),ae=()=>(ae=N.vc)(),ji=i=>(ji=N.wc)(i),Zi=i=>(Zi=N.xc)(i),Qi=(i,u,c)=>(Qi=N.yc)(i,u,c),Yi=i=>(Yi=N.zc)(i),Xi=n.dynCall_iii=(i,u,c)=>(Xi=n.dynCall_iii=N.Ac)(i,u,c),Ji=n.dynCall_vi=(i,u)=>(Ji=n.dynCall_vi=N.Bc)(i,u),Nn=n.dynCall_ii=(i,u)=>(Nn=n.dynCall_ii=N.Cc)(i,u),ea=n.dynCall_vii=(i,u,c)=>(ea=n.dynCall_vii=N.Dc)(i,u,c),ta=n.dynCall_iiii=(i,u,c,m)=>(ta=n.dynCall_iiii=N.Ec)(i,u,c,m),ra=n.dynCall_viii=(i,u,c,m)=>(ra=n.dynCall_viii=N.Fc)(i,u,c,m),na=n.dynCall_iiiii=(i,u,c,m,g)=>(na=n.dynCall_iiiii=N.Gc)(i,u,c,m,g),oa=n.dynCall_viiii=(i,u,c,m,g)=>(oa=n.dynCall_viiii=N.Hc)(i,u,c,m,g),ia=n.dynCall_viiiiii=(i,u,c,m,g,x,C)=>(ia=n.dynCall_viiiiii=N.Ic)(i,u,c,m,g,x,C),aa=n.dynCall_viiiiiii=(i,u,c,m,g,x,C,B)=>(aa=n.dynCall_viiiiiii=N.Jc)(i,u,c,m,g,x,C,B),sa=n.dynCall_ji=(i,u)=>(sa=n.dynCall_ji=N.Kc)(i,u),ua=n.dynCall_v=i=>(ua=n.dynCall_v=N.Lc)(i),da=n.dynCall_viiiii=(i,u,c,m,g,x)=>(da=n.dynCall_viiiii=N.Mc)(i,u,c,m,g,x),la=n.dynCall_i=i=>(la=n.dynCall_i=N.Nc)(i),ca=n.dynCall_fii=(i,u,c)=>(ca=n.dynCall_fii=N.Oc)(i,u,c),pa=n.dynCall_viiiiiiii=(i,u,c,m,g,x,C,B,M)=>(pa=n.dynCall_viiiiiiii=N.Pc)(i,u,c,m,g,x,C,B,M),ma=n.dynCall_viiiiiiiiii=(i,u,c,m,g,x,C,B,M,V,K)=>(ma=n.dynCall_viiiiiiiiii=N.Qc)(i,u,c,m,g,x,C,B,M,V,K),fa=n.dynCall_jiii=(i,u,c,m)=>(fa=n.dynCall_jiii=N.Rc)(i,u,c,m),ha=n.dynCall_dii=(i,u,c)=>(ha=n.dynCall_dii=N.Sc)(i,u,c),ga=n.dynCall_viiiiiiiii=(i,u,c,m,g,x,C,B,M,V)=>(ga=n.dynCall_viiiiiiiii=N.Tc)(i,u,c,m,g,x,C,B,M,V),ya=n.dynCall_viiiiiiiiiii=(i,u,c,m,g,x,C,B,M,V,K,J)=>(ya=n.dynCall_viiiiiiiiiii=N.Uc)(i,u,c,m,g,x,C,B,M,V,K,J),ba=n.dynCall_iiiiii=(i,u,c,m,g,x)=>(ba=n.dynCall_iiiiii=N.Vc)(i,u,c,m,g,x),_a=n.dynCall_iij=(i,u,c)=>(_a=n.dynCall_iij=N.Wc)(i,u,c),wa=n.dynCall_iiiiiiiiii=(i,u,c,m,g,x,C,B,M,V)=>(wa=n.dynCall_iiiiiiiiii=N.Xc)(i,u,c,m,g,x,C,B,M,V),va=n.dynCall_iiiiiiiiiii=(i,u,c,m,g,x,C,B,M,V,K)=>(va=n.dynCall_iiiiiiiiiii=N.Yc)(i,u,c,m,g,x,C,B,M,V,K),$a=n.dynCall_vij=(i,u,c)=>($a=n.dynCall_vij=N.Zc)(i,u,c),xa=n.dynCall_iiif=(i,u,c,m)=>(xa=n.dynCall_iiif=N._c)(i,u,c,m),Sa=n.dynCall_iiij=(i,u,c,m)=>(Sa=n.dynCall_iiij=N.$c)(i,u,c,m),Ta=n.dynCall_fiii=(i,u,c,m)=>(Ta=n.dynCall_fiii=N.ad)(i,u,c,m),Ia=n.dynCall_viiiiiiiiiiiii=(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)=>(Ia=n.dynCall_viiiiiiiiiiiii=N.bd)(i,u,c,m,g,x,C,B,M,V,K,J,le,Se),Ca=n.dynCall_vjiii=(i,u,c,m,g)=>(Ca=n.dynCall_vjiii=N.cd)(i,u,c,m,g),Aa=n.dynCall_vif=(i,u,c)=>(Aa=n.dynCall_vif=N.dd)(i,u,c),Ea=n.dynCall_iiiiiii=(i,u,c,m,g,x,C)=>(Ea=n.dynCall_iiiiiii=N.ed)(i,u,c,m,g,x,C),ka=n.dynCall_iiiij=(i,u,c,m,g)=>(ka=n.dynCall_iiiij=N.fd)(i,u,c,m,g),Pa=n.dynCall_iiiiiiii=(i,u,c,m,g,x,C,B)=>(Pa=n.dynCall_iiiiiiii=N.gd)(i,u,c,m,g,x,C,B),za=n.dynCall_viiiiiiiiiiii=(i,u,c,m,g,x,C,B,M,V,K,J,le)=>(za=n.dynCall_viiiiiiiiiiii=N.hd)(i,u,c,m,g,x,C,B,M,V,K,J,le),Oa=n.dynCall_diii=(i,u,c,m)=>(Oa=n.dynCall_diii=N.id)(i,u,c,m),Ba=n.dynCall_jiiii=(i,u,c,m,g)=>(Ba=n.dynCall_jiiii=N.jd)(i,u,c,m,g),Da=n.dynCall_viiij=(i,u,c,m,g)=>(Da=n.dynCall_viiij=N.kd)(i,u,c,m,g),Ma=n.dynCall_fiiii=(i,u,c,m,g)=>(Ma=n.dynCall_fiiii=N.ld)(i,u,c,m,g),Ra=n.dynCall_viiif=(i,u,c,m,g)=>(Ra=n.dynCall_viiif=N.md)(i,u,c,m,g),Ua=n.dynCall_diiii=(i,u,c,m,g)=>(Ua=n.dynCall_diiii=N.nd)(i,u,c,m,g),Na=n.dynCall_viiid=(i,u,c,m,g)=>(Na=n.dynCall_viiid=N.od)(i,u,c,m,g),Va=n.dynCall_iiiijii=(i,u,c,m,g,x,C)=>(Va=n.dynCall_iiiijii=N.pd)(i,u,c,m,g,x,C),Wa=n.dynCall_iiiiiij=(i,u,c,m,g,x,C)=>(Wa=n.dynCall_iiiiiij=N.qd)(i,u,c,m,g,x,C),La=i=>(La=N.rd)(i),Ga=()=>(Ga=N.sd)(),Ha=i=>(Ha=N.td)(i),Fa=()=>(Fa=N.ud)();function Gm(i,u,c){var m=ae();try{ea(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function Hm(i,u,c){var m=ae();try{return Xi(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function Fm(i,u){var c=ae();try{Ji(i,u)}catch(m){if(ie(c),m!==m+0)throw m;de(1,0)}}function qm(i,u){var c=ae();try{return Nn(i,u)}catch(m){if(ie(c),m!==m+0)throw m;de(1,0)}}function Km(i,u,c,m){var g=ae();try{return ta(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function jm(i,u,c,m,g){var x=ae();try{oa(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Zm(i,u,c,m,g){var x=ae();try{return na(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Qm(i,u,c,m){var g=ae();try{ra(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function Ym(i,u,c,m,g,x,C){var B=ae();try{return Ea(i,u,c,m,g,x,C)}catch(M){if(ie(B),M!==M+0)throw M;de(1,0)}}function Xm(i){var u=ae();try{ua(i)}catch(c){if(ie(u),c!==c+0)throw c;de(1,0)}}function Jm(i,u,c){var m=ae();try{return _a(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function ef(i,u,c,m,g,x){var C=ae();try{da(i,u,c,m,g,x)}catch(B){if(ie(C),B!==B+0)throw B;de(1,0)}}function tf(i,u,c){var m=ae();try{$a(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function rf(i,u,c,m,g,x,C){var B=ae();try{ia(i,u,c,m,g,x,C)}catch(M){if(ie(B),M!==M+0)throw M;de(1,0)}}function nf(i,u,c,m,g,x,C,B){var M=ae();try{aa(i,u,c,m,g,x,C,B)}catch(V){if(ie(M),V!==V+0)throw V;de(1,0)}}function of(i,u,c,m,g,x){var C=ae();try{return ba(i,u,c,m,g,x)}catch(B){if(ie(C),B!==B+0)throw B;de(1,0)}}function af(i,u,c,m,g,x,C,B){var M=ae();try{return Pa(i,u,c,m,g,x,C,B)}catch(V){if(ie(M),V!==V+0)throw V;de(1,0)}}function sf(i,u,c,m,g,x,C,B,M,V){var K=ae();try{ga(i,u,c,m,g,x,C,B,M,V)}catch(J){if(ie(K),J!==J+0)throw J;de(1,0)}}function uf(i,u,c,m,g,x,C,B,M){var V=ae();try{pa(i,u,c,m,g,x,C,B,M)}catch(K){if(ie(V),K!==K+0)throw K;de(1,0)}}function df(i){var u=ae();try{return la(i)}catch(c){if(ie(u),c!==c+0)throw c;de(1,0)}}function lf(i,u,c,m,g,x,C,B,M,V){var K=ae();try{return wa(i,u,c,m,g,x,C,B,M,V)}catch(J){if(ie(K),J!==J+0)throw J;de(1,0)}}function cf(i,u,c){var m=ae();try{return ca(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function pf(i,u,c,m){var g=ae();try{return fa(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;return de(1,0),0n}}function mf(i,u,c){var m=ae();try{return ha(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function ff(i,u,c,m,g,x,C,B,M,V,K,J){var le=ae();try{ya(i,u,c,m,g,x,C,B,M,V,K,J)}catch(Se){if(ie(le),Se!==Se+0)throw Se;de(1,0)}}function hf(i,u,c,m,g,x,C,B,M,V,K){var J=ae();try{ma(i,u,c,m,g,x,C,B,M,V,K)}catch(le){if(ie(J),le!==le+0)throw le;de(1,0)}}function gf(i,u,c,m,g,x,C,B,M,V,K){var J=ae();try{return va(i,u,c,m,g,x,C,B,M,V,K)}catch(le){if(ie(J),le!==le+0)throw le;de(1,0)}}function yf(i,u,c,m){var g=ae();try{return xa(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function bf(i,u,c,m){var g=ae();try{return Sa(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function _f(i,u,c,m){var g=ae();try{return Ta(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function wf(i,u,c,m,g,x,C,B,M,V,K,J,le,Se){var He=ae();try{Ia(i,u,c,m,g,x,C,B,M,V,K,J,le,Se)}catch(Qt){if(ie(He),Qt!==Qt+0)throw Qt;de(1,0)}}function vf(i,u,c,m,g){var x=ae();try{Ca(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function $f(i,u,c){var m=ae();try{Aa(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;de(1,0)}}function xf(i,u){var c=ae();try{return sa(i,u)}catch(m){if(ie(c),m!==m+0)throw m;return de(1,0),0n}}function Sf(i,u,c,m,g){var x=ae();try{return ka(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Tf(i,u,c,m,g,x,C,B,M,V,K,J,le){var Se=ae();try{za(i,u,c,m,g,x,C,B,M,V,K,J,le)}catch(He){if(ie(Se),He!==He+0)throw He;de(1,0)}}function If(i,u,c,m){var g=ae();try{return Oa(i,u,c,m)}catch(x){if(ie(g),x!==x+0)throw x;de(1,0)}}function Cf(i,u,c,m,g){var x=ae();try{return Ba(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;return de(1,0),0n}}function Af(i,u,c,m,g){var x=ae();try{Da(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Ef(i,u,c,m,g){var x=ae();try{return Ma(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function kf(i,u,c,m,g){var x=ae();try{Ra(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Pf(i,u,c,m,g){var x=ae();try{return Ua(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function zf(i,u,c,m,g){var x=ae();try{Na(i,u,c,m,g)}catch(C){if(ie(x),C!==C+0)throw C;de(1,0)}}function Of(i,u,c,m,g,x,C){var B=ae();try{return Va(i,u,c,m,g,x,C)}catch(M){if(ie(B),M!==M+0)throw M;de(1,0)}}function Bf(i,u,c,m,g,x,C){var B=ae();try{return Wa(i,u,c,m,g,x,C)}catch(M){if(ie(B),M!==M+0)throw M;de(1,0)}}return n.stackSave=()=>ae(),n.stackRestore=i=>ie(i),n.stackAlloc=i=>Un(i),n.setValue=function(i,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":me()[i>>>0]=u;break;case"i16":ve()[i>>>1>>>0]=u;break;case"i32":E()[i>>>2>>>0]=u;break;case"i64":Y[i>>>3]=BigInt(u);break;case"float":fe()[i>>>2>>>0]=u;break;case"double":De()[i>>>3>>>0]=u;break;case"*":G()[i>>>2>>>0]=u;break;default:dt(`invalid type for setValue: ${c}`)}},n.getValue=function(i,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return me()[i>>>0];case"i16":return ve()[i>>>1>>>0];case"i32":return E()[i>>>2>>>0];case"i64":return Y[i>>>3];case"float":return fe()[i>>>2>>>0];case"double":return De()[i>>>3>>>0];case"*":return G()[i>>>2>>>0];default:dt(`invalid type for getValue: ${u}`)}},n.UTF8ToString=Ee,n.stringToUTF8=Rt,n.lengthBytesUTF8=ri,function i(){if(0<Dt)qt=i;else if(d)t(n),xt();else{for(;0<_n.length;)_n.shift()(n);0<Dt?qt=i:(n.calledRun=!0,ne||(xt(),t(n)))}}(),n.PTR_SIZE=4,o}),Lf=Ts,Gf=globalThis.self?.name?.startsWith("em-pthread");Gf&&Ts()});var ks,Yn,Hf,We,Ps,Qn,Ff,qf,zs,Kf,As,Os,Es,Bs,Tr=W(()=>{"use strict";Sr();ks=typeof location>"u"?void 0:location.origin,Yn=import.meta.url>"file:"&&import.meta.url<"file;",Hf=()=>{if(!!1){if(Yn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ks).href}return import.meta.url}},We=Hf(),Ps=()=>{if(We&&!We.startsWith("blob:"))return We.substring(0,We.lastIndexOf("/")+1)},Qn=(e,t)=>{try{let r=t??We;return(r?new URL(e,r):new URL(e)).origin===ks}catch{return!1}},Ff=(e,t)=>{let r=t??We;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},qf=(e,t)=>`${t??"./"}${e}`,zs=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Kf=async e=>(await import(/*webpackIgnore:true*/e)).default,As=(Ss(),Yt(xs)).default,Os=async()=>{if(!We)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Qn(We))return[void 0,As()];let e=await zs(We);return[e,As(e)]},Es=(Cs(),Yt(Is)).default,Bs=async(e,t,r)=>{if(!e&&!t&&Es&&We&&Qn(We))return[void 0,Es];{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??Ff(n,t),a=!!1&&r&&o&&!Qn(o,t),s=a?await zs(o):o??qf(n,t);return[a?s:void 0,await Kf(s)]}}});var Xn,Jn,Br,Ds,jf,Zf,Ir,be,_t=W(()=>{"use strict";Tr();Jn=!1,Br=!1,Ds=!1,jf=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Zf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ir=async e=>{if(Jn)return Promise.resolve();if(Br)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ds)throw new Error("previous call to 'initializeWebAssembly()' failed.");Br=!0;let t=e.initTimeout,r=e.numThreads;if(!Zf())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=jf();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,d=s?.href??s,l=o?.wasm,p=l?.href??l,f=e.wasmBinary,[h,y]=await Bs(d,a,r>1),_=!1,b=[];if(t>0&&b.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),b.push(new Promise((w,T)=>{let $={numThreads:r};if(f)$.wasmBinary=f;else if(p||a)$.locateFile=v=>p??a+v;else if(d&&d.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,d).href;else if(h){let v=Ps();v&&($.locateFile=S=>v+S)}y($).then(v=>{Br=!1,Jn=!0,Xn=v,w(),h&&URL.revokeObjectURL(h)},v=>{Br=!1,Ds=!0,T(v)})})),await Promise.race(b),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},be=()=>{if(Jn&&Xn)return Xn;throw new Error("WebAssembly is not initialized yet.")}});var Le,er,ge,Dr=W(()=>{"use strict";_t();Le=(e,t)=>{let r=be(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},er=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")er(a,s+".",r,n);else if(typeof a=="string"||typeof a=="number")n(s,a.toString());else if(typeof a=="boolean")n(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ge=e=>{let t=be(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let a=Number(t.getValue(o,n===4?"i32":"i64")),s=t.getValue(o+n,"*"),d=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(r)}}});var Ms,Rs=W(()=>{"use strict";_t();Dr();Ms=e=>{let t=be(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Le(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),r===0&&ge("Can't create run options."),e?.extra!==void 0&&er(e.extra,"",new WeakSet,(s,d)=>{let l=Le(s,n),p=Le(d,n);t._OrtAddRunConfigEntry(r,l,p)!==0&&ge(`Can't set a run config entry: ${s} - ${d}.`)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),a}}});var Qf,Yf,Xf,Mr,Jf,Us,Ns=W(()=>{"use strict";_t();Dr();Qf=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Yf=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Xf=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Mr=(e,t,r,n)=>{let o=Le(t,n),a=Le(r,n);be()._OrtAddSessionConfigEntry(e,o,a)!==0&&ge(`Can't set a session config entry: ${t} - ${r}.`)},Jf=async(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name,a=[];switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let h=n?.deviceType;h&&Mr(e,"deviceType",h,r)}break;case"webgpu":if(o="JS",typeof n!="string"){let f=n;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Mr(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let s=Le(o,r),d=a.length,l=0,p=0;if(d>0){l=be()._malloc(d*be().PTR_SIZE),r.push(l),p=be()._malloc(d*be().PTR_SIZE),r.push(p);for(let f=0;f<d;f++)be().setValue(l+f*be().PTR_SIZE,a[f][0],"*"),be().setValue(p+f*be().PTR_SIZE,a[f][1],"*")}await be()._OrtAppendExecutionProvider(e,s,l,p,d)!==0&&ge(`Can't append execution provider: ${o}.`)}},Us=async e=>{let t=be(),r=0,n=[],o=e||{};Xf(o);try{let a=Qf(o.graphOptimizationLevel??"all"),s=Yf(o.executionMode??"sequential"),d=typeof o.logId=="string"?Le(o.logId,n):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof o.optimizedModelFilePath=="string"?Le(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,d,l,p,f),r===0&&ge("Can't create session options."),o.executionProviders&&await Jf(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Mr(r,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[h,y]of Object.entries(o.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=Le(h,n);t._OrtAddFreeDimensionOverride(r,_,y)!==0&&ge(`Can't set a free dimension override: ${h} - ${y}.`)}return o.extra!==void 0&&er(o.extra,"",new WeakSet,(h,y)=>{Mr(r,h,y,n)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ge("Can't release session options."),n.forEach(s=>t._free(s)),a}}});var Vt,tt,wt,Rr,tr,Ur,Nr,eo,re=W(()=>{"use strict";Vt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},tt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return r>0?Math.ceil(n*r):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},tr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",eo=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var rr,to=W(()=>{"use strict";Sr();rr=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Wn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Wn("node:fs"),n=r(e),o=[];for await(let a of n)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let l=Math.ceil(n/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let s=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var eh,th,Vs,Ws,Vr,rh,pe,rt=W(()=>{"use strict";re();eh=["V","I","W","E","F"],th=(e,t)=>{console.log(`[${eh[e]},${new Date().toISOString()}]${t}`)},Vr=(e,t)=>{Vs=e,Ws=t},rh=(e,t)=>{let r=tr(e),n=tr(Vs);r>=n&&th(r,typeof t=="function"?t():t)},pe=(...e)=>{Ws&&rh(...e)}});var ro,nt,P,Et,Wr,Ls,Gs,se=W(()=>{"use strict";ro=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},nt=class{static calcShape(t,r,n=!1){let o=t.length,a=r.length;if(o===0)return r;if(a===0)return t;let s=Math.max(t.length,r.length),d=new Array(s);if(n){if(o<2||a<2)return;let l=ro.calcMatMulShape([t[o-2],t[o-1]],[r[a-2],r[a-1]]);if(l===void 0)return;[d[s-2],d[s-1]]=l}for(let l=n?3:1;l<=s;l++){let p=o-l<0?1:t[o-l],f=a-l<0?1:r[a-l];if(p!==f&&p>1&&f>1)return;let h=Math.max(p,f);if(p&&f)d[s-l]=Math.max(p,f);else{if(h>1)return;d[s-l]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let a=1;a<=n;a++)if(t[n-a]!==1&&t[n-a]!==r[o-a])return!1;return!0}},P=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),a=n-1;for(;a>=0;){if(t[a]%r===0){o[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,r/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let a=r;a<n;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,a)=>o+r[a]+r[a+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Et=class e{static adjustPoolAttributes(t,r,n,o,a,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<a.length){if(a[d]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let d=0;d<n.length*2;d++)if(d<s.length){if(s[d]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[d]>=n[d]||s[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,a,s,d){if(d){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],n[l],o[l],a,l,l+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,a,s,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,o,a,s,d),l}static computeConvOutputShape(t,r,n,o,a,s,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return e.computeShapeHelper(!1,t,l,n,o,a,s,d),l}static computeShapeHelper(t,r,n,o,a,s,d,l){if(t)for(let p=0;p<r.length-2;p++)n.push(1);else for(let p=0;p<r.length-2;p++)n.push(e.adjustPadAndReturnShape(r[p+2],o[p],a[p],s[p],d,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,o,a,s,d,l){let p=n*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[d]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+o-t;return a[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),a[d]=h-a[s],Math.floor((t+h-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[d]-p)/r+1)}},Wr=class{static getShapeOfGemmResult(t,r,n,o,a){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,d,l;r?(s=t[1],d=t[0]):(s=t[0],d=t[1]);let p=-1;if(o?(l=n[0],p=1):(l=n[1],p=0),n[p]!==d)throw new Error("dimension mismatch");if(s<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(a&&!nt.isValidBroadcast(a,[s,l]))throw new Error("gemm: invalid bias shape for broadcast");return[s,l,d]}},Ls=-34028234663852886e22,Gs=34028234663852886e22});var Lr,no=W(()=>{"use strict";re();Lr=(e,t)=>new(Rr(t))(e)});var io,Fs,nh,Hs,oh,qs,Gr,Hr,oo,Ks,js=W(()=>{"use strict";rt();io=(e,t=!0)=>{if(e.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=e.byteLength/8,n=new BigInt64Array(e.buffer,e.byteOffset,r),o=new Int32Array(r);for(let a=0;a<r;a++){let s=n[a];if(s>2147483647n||s<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${a}: ${s}`);o[a]=Number(s)}return t?new Uint8Array(o.buffer):o},Fs=(e,t=!0)=>{if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r),o=BigInt64Array.from(n,BigInt);return t?new Uint8Array(o.buffer):o},nh=1,Hs=()=>nh++,oh=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qs=(e,t)=>{let r=oh.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},Gr=class{constructor(t){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:n,tensor:o,dataType:a,shape:s,shouldConvertInt64toInt32:d=!1}=t;this.sessionId=r,this.mlContext=n,this.mlTensor=o,this.dataType=a,this.tensorShape=s,this.shouldConvertInt64toInt32=d}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return qs(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t,r){if(t){let n=await this.mlContext.readTensor(this.mlTensor),o=Fs(new Uint8Array(n));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?this.mlContext.readTensor(this.mlTensor,r):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,r,n){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,a)=>o===n[a])}setIsInt64ToInt32Converted(t){this.isInt64ToInt32Converted=t}},Hr=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n,o){let a=r,s=this.tensorManager.getMLContext(t),d=a==="int64"&&!s.opSupportLimits().input.dataTypes.includes("int64");if(d&&(a="int32",pe("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(s,a,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==qs(a,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let l=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,a,n,l,!0,!0,d),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(r=io(t,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),r.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?Fs(this.activeUpload):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,t):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},oo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let t=Hs();return this.tensorTrackersById.set(t,new Hr(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o,a){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(r);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,n,o,a)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let a=this.getMLContext(t),s=Hs(),d=new Gr({sessionId:t,context:a,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(s,new Hr(this,d)),this.externalTensors.add(d),s}async getCachedTensor(t,r,n,o,a,s,d=!1){let l=this.getMLContext(t);for(let[f,h]of this.freeTensors.entries())if(h.canReuseTensor(l,r,n)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${n}}`);let y=this.freeTensors.splice(f,1)[0];return y.sessionId=t,y}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${n}}`);let p=await l.createTensor({dataType:r,shape:n,dimensions:n,usage:o,writable:a,readable:s});return new Gr({sessionId:t,context:l,tensor:p,dataType:r,shape:n,shouldConvertInt64toInt32:d})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Ks=(...e)=>new oo(...e)});var ao,ih,Fr,Zs=W(()=>{"use strict";re();_t();no();js();rt();ao=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ih=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,a)=>o===n[a]&&e[o]===t[o])},Fr=class{constructor(t){this.tensorManager=Ks(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Vr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let n of r)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>ih(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(a=>a.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o,a){let s=ao.get(n);if(!s)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,s,o,a)}async createTemporaryTensor(t,r,n){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=ao.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,n,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,r){if(!be().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Lr(n,r)}}registerMLTensor(t,r,n,o){let a=ao.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);let s=this.tensorManager.registerTensor(t,r,a,o);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,r,n,o,a,s,d=!1){if(!s)throw new Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let p=s.get(l);if(!p)throw new Error(`File with name ${l} not found in preloaded files.`);if(r+n>p.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let f=p.slice(r,r+n).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(f);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(f):new Uint16Array(f);break;case"int32":h=new Int32Array(f);break;case"uint32":h=new Uint32Array(f);break;case"int64":d?(h=io(new Uint8Array(f),!1),a.dataType="int32"):h=new BigInt64Array(f);break;case"uint64":h=new BigUint64Array(f);break;case"int8":h=new Int8Array(f);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(f);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${d?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(a,h)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,r){let n=this.sessionGraphInputs.get(t);return n?n.includes(r):!1}isInt64Supported(t){return!!this.mlContextBySessionId.get(t)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var qr=W(()=>{"use strict"});var Qs,so,uo,ah,sh,Ys,co,lo,Js,eu=W(()=>{"use strict";rt();qr();Qs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),so=[],uo=e=>Math.ceil(Number(e)/16)*16,ah=e=>{for(let t=0;t<so.length;t++){let r=so[t];if(e<=r)return r}return Math.ceil(e/16)*16},sh=1,Ys=()=>sh++,co=async(e,t,r,n)=>{let o=uo(r),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let d=a.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(d,0,r)),l}else return new Uint8Array(d.slice(0,r))}finally{a.destroy()}},lo=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Qs)so.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,a=r.byteLength,s=uo(a),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${a}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(n,o,a)),l.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(l,0,d.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=uo(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ys();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=ah(t),o,a=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let p=(a?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:Ys(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await co(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Qs.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Js=(...e)=>new lo(...e)});var po,te,Ae=W(()=>{"use strict";po=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},te=e=>new po(e)});var kt,fo,we,ze,L,he,ho,Pt,je,j,Kr,z,U,tu,jr,mo,ru,ce=W(()=>{"use strict";re();se();kt=64,fo=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},we=(e,t=1)=>{let r=fo(e,t);return typeof r=="string"?r:r[0]},ze=(e,t=1)=>{let r=fo(e,t);return typeof r=="string"?r:r[1]},L=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:P.computeStrides(r)})}),t},he=e=>e%4===0?4:e%2===0?2:1,ho=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Pt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,je=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Kr=(e,t,r,n,o)=>{let a=typeof r=="number",s=a?r:r.length,d=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=fo(t,o),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],y={indices:l,value:f,storage:h,tensor:t},_=E=>typeof E=="string"?E:`${E}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",T=`${w}${e}_shape`,$=`${w}${e}_strides`,v="";for(let E=0;E<s-1;E++)v+=`
    let dim${E} = current / ${j($,E,s)};
    let rest${E} = current % ${j($,E,s)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;v+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${v}
    return indices;
  }`,I=E=>(b.offsetToIndices=!0,s<2?E:`o2i_${e}(${E})`),k=[];if(s>=2)for(let E=s-1;E>=0;E--)k.push(`${j($,E,s)} * (indices[${E}])`);let A=s<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${k.join("+")};
  }`,O=E=>(b.indicesToOffset=!0,s<2?E:`i2o_${e}(${E})`),D=(...E)=>s===0?"0u":`${y.indices}(${E.map(_).join(",")})`,R=(E,G)=>s<2?`${E}`:`${j(E,G,s)}`,F=(E,G,fe)=>s<2?`${E}=${fe};`:`${j(E,G,s)}=${fe};`,Z={},X=(E,G)=>{b.broadcastedIndicesToOffset=!0;let fe=`${G.name}broadcastedIndicesTo${e}Offset`;if(fe in Z)return`${fe}(${E})`;let De=[];for(let Te=s-1;Te>=0;Te--){let Ie=G.indicesGet("outputIndices",Te+G.rank-s);De.push(`${R($,Te)} * (${Ie} % ${R(T,Te)})`)}return Z[fe]=`fn ${fe}(outputIndices: ${G.type.indices}) -> u32 {
             return ${De.length>0?De.join("+"):"0u"};
           }`,`${fe}(${E})`},H=(E,G)=>(()=>{if(y.storage===y.value)return`${e}[${E}]=${G};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${E}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${E}]=vec2<u32>(u32(${G}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),Y=E=>(()=>{if(y.storage===y.value)return`${e}[${E}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${E}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${E}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${E}] & 0xFFu), bool(${e}[${E}] & 0xFF00u), bool(${e}[${E}] & 0xFF0000u), bool(${e}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),xe=s<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${f} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,q=s<2?"":(()=>{let E=d.map(fe=>`d${fe}: u32`).join(", "),G=d.map(fe=>`d${fe}`).join(", ");return`
  fn get_${e}(${E}) -> ${f} {
    return get_${e}ByIndices(${D(G)});
  }`})(),Q=(...E)=>{if(E.length!==s)throw new Error(`indices length must be ${s}`);let G=E.map(_).join(",");return s===0?Y("0u"):s===1?Y(G[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${G})`)},ne=E=>s<2?Y(E):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${E})`),ee=s<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${f}) {
    ${H(`i2o_${e}(indices)`,"value")}
  }`,me=s<2?"":(()=>{let E=d.map(fe=>`d${fe}: u32`).join(", "),G=d.map(fe=>`d${fe}`).join(", ");return`
  fn set_${e}(${E}, value: ${f}) {
    set_${e}ByIndices(${D(G)}, value);
  }`})();return{impl:()=>{let E=[],G=!1;return b.offsetToIndices&&(E.push(S),G=!0),b.indicesToOffset&&(E.push(A),G=!0),b.broadcastedIndicesToOffset&&(Object.values(Z).forEach(fe=>E.push(fe)),G=!0),b.set&&(E.push(me),G=!0),b.setByIndices&&(E.push(ee),G=!0),b.get&&(E.push(q),G=!0),b.getByIndices&&(E.push(xe),G=!0),!a&&G&&E.unshift(`const ${T} = ${y.indices}(${r.join(",")});`,`const ${$} = ${y.indices}(${P.computeStrides(r).join(",")});`),E.join(`
`)},type:y,offsetToIndices:I,indicesToOffset:O,broadcastedIndicesToOffset:X,indices:D,indicesGet:R,indicesSet:F,set:(...E)=>{if(E.length!==s+1)throw new Error(`indices length must be ${s}`);let G=E[s];if(typeof G!="string")throw new Error("value must be string");let fe=E.slice(0,s).map(_).join(",");return s===0?H("0u",G):s===1?H(fe[0],G):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${fe}, ${G})`)},setByOffset:H,setByIndices:(E,G)=>s<2?H(E,G):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${E}, ${G});`),get:Q,getByOffset:Y,getByIndices:ne,usage:n,name:e,strides:$,shape:T,rank:s}},z=(e,t,r,n=1)=>Kr(e,t,r,"input",n),U=(e,t,r,n=1)=>Kr(e,t,r,"output",n),tu=(e,t,r)=>Kr(e,t,r,"atomicOutput",1),jr=(e,t,r,n=1)=>Kr(e,t,r,"internal",n),mo=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=kt){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${s}) {
    ${d}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},ru=(e,t)=>new mo(e,t)});var uh,nu,dh,lh,ch,ph,Oe,ou,iu,pt=W(()=>{"use strict";re();se();Ae();ce();uh=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},nu=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),dh=(e,t)=>P.sortBasedOnPerm(e,nu(e.length,t)),lh=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},ch=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},ph=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Oe=(e,t)=>{let r=e.dataType,n=e.dims.length,o=nu(n,t),a=dh(e.dims,o),s=e.dims,d=a,l=n<2||ph(o,e.dims),p;if(l)return p=w=>{let T=z("input",r,s,4),$=U("output",r,d,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(T,$)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=ch(e.dims,o),y=P.areEqual(h,[2,3,1]),_=P.areEqual(h,[3,1,2]);if(f.length===2||y||_){s=y?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,d=[s[1],s[0]];let w=16;return p=T=>{let $=z("a",r,s.length),v=U("output",r,d.length);return`
  ${T.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${T.mainStart([w,w,1])}
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/w),y:Math.ceil(d[0]/w)},programUniforms:[{type:12,data:T},...L(s,d)]}},getShaderSource:p}}return p=w=>{let T=z("a",r,s.length),$=U("output",r,d.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(T,$)}

  ${lh(o,n,T,$)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...L(s,d)]}},getShaderSource:p}},ou=(e,t)=>{uh(e.inputs,t.perm),e.compute(Oe(e.inputs[0],t.perm))},iu=e=>te({perm:e.perm})});var mh,fh,hh,gh,yh,bh,_h,wh,vh,$h,ot,au,su,uu,du,lu,cu,pu,mu,fu,hu,gu=W(()=>{"use strict";re();se();ce();Zr();pt();mh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},fh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},hh={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},gh={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},yh=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},bh=(e,t)=>{let r=[],n=e.length;for(let a=0;a<n;a++)t.indexOf(a)===-1&&r.push(e[a]);let o=t.map(a=>e[a]);return[r,o]},_h=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?n.push(e[o++]):n.push(1);return n},wh=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},vh=(e,t)=>{let r=[];if(!wh(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},$h=(e,t,r,n,o,a,s)=>{let d=r[0].dims,l=P.size(a),p=P.size(s),f=z("_A",r[0].dataType,d),h=U("output",o,a),y=64;l===1&&(y=256);let _=`
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

          var bestValue = f32(${hh[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${mh[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${fh[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${n==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${gh[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},ot=(e,t,r,n)=>{let o=e.inputs.length===1?r:go(e.inputs,r),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,b)=>b));let s=P.normalizeAxes(a,e.inputs[0].dims.length),d=s,l=e.inputs[0],p=vh(d,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Oe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],d=yh(d.length,l.dims.length));let[f,h]=bh(l.dims,d),y=f;o.keepDims&&(y=_h(f,s)),e.compute($h(t,o.cacheKey,[l],n,e.inputs[0].dataType,y,h),{inputs:[l]})},au=(e,t)=>{ot(e,"ReduceMeanShared",t,"mean")},su=(e,t)=>{ot(e,"ReduceL1Shared",t,"l1")},uu=(e,t)=>{ot(e,"ReduceL2Shared",t,"l2")},du=(e,t)=>{ot(e,"ReduceLogSumExpShared",t,"logSumExp")},lu=(e,t)=>{ot(e,"ReduceMaxShared",t,"max")},cu=(e,t)=>{ot(e,"ReduceMinShared",t,"min")},pu=(e,t)=>{ot(e,"ReduceProdShared",t,"prod")},mu=(e,t)=>{ot(e,"ReduceSumShared",t,"sum")},fu=(e,t)=>{ot(e,"ReduceSumSquareShared",t,"sumSquare")},hu=(e,t)=>{ot(e,"ReduceLogSumShared",t,"logSum")}});var it,xh,Qr,go,at,Sh,Th,Ih,Ch,Ah,Eh,kh,Ph,zh,Oh,st,yu,bu,_u,wu,vu,$u,xu,Su,Tu,Iu,Zr=W(()=>{"use strict";re();se();Ae();ce();gu();it=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},xh=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,r,n,o,a,s=!1,d=!1)=>{let l=[],p=r[0].dims,f=p.length,h=P.normalizeAxes(o,f),y=!d&&h.length===0;p.forEach((T,$)=>{y||h.indexOf($)>=0?s&&l.push(1):l.push(T)});let _=l.length,b=P.size(l);return{name:e,shaderCache:t,getShaderSource:T=>{let $=[],v=z("_A",r[0].dataType,f),S=U("output",a,_),I=n(v,S,h),k=I[2];for(let A=0,O=0;A<f;A++)y||h.indexOf(A)>=0?(s&&O++,k=`for(var j${A}: u32 = 0; j${A} < ${p[A]}; j${A}++) {
                  ${I[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${k}
                }`):($.push(`${v.indicesSet("input_indices",A,S.indicesGet("output_indices",O))};`),O++);return`

        ${T.registerUniform("output_size","u32").declareVariables(v,S)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${k}
          ${I[3]}
          ${I.length===4?S.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...L(p,l)]})}},go=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),te({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},at=(e,t,r,n)=>{let o=e.inputs,a=o.length===1?r:go(o,r);e.compute(Qr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?xh:n,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Sh=(e,t)=>{it(e.inputs),at(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Th=(e,t)=>{it(e.inputs),at(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Ih=(e,t)=>{it(e.inputs),at(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Ch=(e,t)=>{it(e.inputs),at(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Ah=(e,t)=>{it(e.inputs),at(e,"ReduceMax",t,(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(n.indicesSet("input_indices",d,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Eh=(e,t)=>{it(e.inputs),at(e,"ReduceMean",t,(n,o,a)=>{let s=1;for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&(s*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},kh=(e,t)=>{it(e.inputs),at(e,"ReduceMin",t,(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Ph=(e,t)=>{it(e.inputs),at(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},zh=(e,t)=>{it(e.inputs),at(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Oh=(e,t)=>{it(e.inputs),at(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},st=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?n*=e[a]:o*=e[a];return o<32&&n>1024},yu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Eh(e,t):au(e,t)},bu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Th(e,t):su(e,t)},_u=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ih(e,t):uu(e,t)},wu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ch(e,t):du(e,t)},vu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ah(e,t):lu(e,t)},$u=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?kh(e,t):cu(e,t)},xu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ph(e,t):pu(e,t)},Su=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zh(e,t):mu(e,t)},Tu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Oh(e,t):fu(e,t)},Iu=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sh(e,t):hu(e,t)}});var Cu,Au,Eu,yo,ku=W(()=>{"use strict";re();Ae();Zr();Cu=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Au=(e,t)=>{Cu(e.inputs);let r=(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Eu=(e,t)=>{Cu(e.inputs);let r=(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},yo=e=>te(e)});var Bh,bo,Dh,Mh,Rh,Wt,Uh,Pu,Yr=W(()=>{"use strict";re();se();qr();ce();Bh=(e,t)=>{let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4],d=e[5];if(s&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],f=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=o.dims[0]/3,y=h,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let b=p;if(h!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==h+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let T=b+w,$=-1,v=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:w,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},bo=(e,t,r)=>t&&e?`
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
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Dh=(e,t,r,n,o,a,s,d)=>{let l=he(s?1:a),p=64,f=a/l;f<p&&(p=32);let h=Math.ceil(a/l/p),y=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:f},{type:12,data:h}],_=we(e.dataType,l),b=ze(1,l),w=["type"];s&&w.push("type"),d&&w.push("type");let T=$=>{let v=U("x",e.dataType,e.dims,l),S=[v],I=s?z("seq_lens",s.dataType,s.dims):void 0;I&&S.push(I);let k=d?z("total_sequence_length_input",d.dataType,d.dims):void 0;k&&S.push(k);let A=ze(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(O).declareVariables(...S)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${bo(I,k,!1)}
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
        x[offset + i] = ${v.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:w},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*r},programUniforms:y})}},Mh=(e,t,r,n,o,a,s,d,l)=>{let p=s+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,p],h=e>1&&n,y=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,y,p,a.headSize]:void 0,b=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=he(a.headSize),$=a.headSize/T,v=12,S={x:Math.ceil(p/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},I=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],k=h&&n&&P.size(n.dims)>0,A=["type","type"];k&&A.push("type"),o&&A.push("type"),d&&A.push("type"),l&&A.push("type");let O=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&O.push({dims:_,dataType:t.dataType,gpuDataType:0});let D=R=>{let F=z("q",t.dataType,t.dims,T),Z=z("key",r.dataType,r.dims,T),X=[F,Z];if(k){let ee=z("past_key",n.dataType,n.dims,T);X.push(ee)}o&&X.push(z("attention_bias",o.dataType,o.dims));let H=d?z("seq_lens",d.dataType,d.dims):void 0;H&&X.push(H);let Y=l?z("total_sequence_length_input",l.dataType,l.dims):void 0;Y&&X.push(Y);let xe=U("output",t.dataType,f),q=[xe];h&&q.push(U("present_key",t.dataType,_,T));let Q=ze(1,T),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${R.registerUniforms(ne).declareVariables(...X,...q)}
  ${R.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${bo(H,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&h?`
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
          value += ${Q}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${xe.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${n!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:O,dispatchGroup:S,programUniforms:I}),getShaderSource:D}},Rh=(e,t,r,n,o,a,s=void 0,d=void 0)=>{let l=a+o.kvSequenceLength,p=o.nReps?o.nReps:1,f=o.vHiddenSize*p,h=e>1&&n,y=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=h?[o.batchSize,y,l,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,f],w=12,T={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=h&&n&&P.size(n.dims)>0,S=["type","type"];v&&S.push("type"),s&&S.push("type"),d&&S.push("type");let I=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&I.push({dims:_,dataType:t.dataType,gpuDataType:0});let k=A=>{let O=z("probs",t.dataType,t.dims),D=z("v",r.dataType,r.dims),R=[O,D];v&&R.push(z("past_value",n.dataType,n.dims));let F=s?z("seq_lens",s.dataType,s.dims):void 0;s&&R.push(F);let Z=d?z("total_sequence_length_input",d.dataType,d.dims):void 0;d&&R.push(Z);let H=[U("output",t.dataType,b)];h&&H.push(U("present_value",t.dataType,_));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${O.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${O.type.value}, ${w*w}>;
  ${A.registerUniforms(Y).declareVariables(...R,...H)}
  ${A.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${bo(F,Z,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:I,dispatchGroup:T,programUniforms:$}),getShaderSource:k}},Wt=(e,t,r,n,o,a,s,d,l,p,f=void 0,h=void 0)=>{let y=Math.min(e.outputCount,1+(s?1:0)+(d?1:0)),_=y>1?p.pastSequenceLength:0,b=_+p.kvSequenceLength,w=l&&P.size(l.dims)>0?l:void 0,T=[t,r];y>1&&s&&P.size(s.dims)>0&&T.push(s),w&&T.push(w),f&&T.push(f),h&&T.push(h);let $=e.compute(Mh(y,t,r,s,w,p,_,f,h),{inputs:T,outputs:y>1?[-1,1]:[-1]})[0];e.compute(Dh($,p.batchSize,p.numHeads,_,p.sequenceLength,b,f,h),{inputs:f&&h?[$,f,h]:[$],outputs:[]});let v=[$,n];y>1&&d&&P.size(d.dims)>0&&v.push(d),f&&v.push(f),h&&v.push(h),e.compute(Rh(y,$,n,d,p,_,f,h),{inputs:v,outputs:y>1?[0,2]:[0]})},Uh=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,d={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let y=U("output_q",l[0].dataType,r),_=U("output_k",l[0].dataType,r),b=U("output_v",l[0].dataType,r),w=z("input",l[0].dataType,l[0].dims),T=z("weight",l[1].dataType,l[1].dims),$=z("bias",l[2].dataType,l[2].dims),v=w.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${h.registerUniforms(S).declareVariables(w,T,$,y,_,b)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},Pu=(e,t)=>{let r=Bh(e.inputs,t),[n,o,a]=Uh(e,r);return Wt(e,n,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Nh,Vh,Wh,zu,Ou=W(()=>{"use strict";Fe();re();se();Ae();ce();Nh=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,a)=>{let s=o.length;if(s!==n.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((d,l)=>{if(d!==n[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Vh=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,a=e[0].dims,s=n?he(a[a.length-1]):1,d=o==="NHWC"&&a.length>1?s:1,l=P.size(a)/s,p=n,f=p?a.length:a,h=z("x",e[0].dataType,e[0].dims,s),y=z("scale",e[1].dataType,e[1].dims,d),_=z("bias",e[2].dataType,e[2].dims,d),b=z("inputMean",e[3].dataType,e[3].dims,d),w=z("inputVar",e[4].dataType,e[4].dims,d),T=U("y",e[0].dataType,f,s),$=()=>{let S="";if(n)S=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let I=1;I<y.rank;I++)S+=`cIndices[${I}] = outputIndices[${I}];`;S+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(h,y,_,b,w,T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...L(a)]:[{type:12,data:l}]})}},Wh=e=>te(e),zu=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Wh({...t,outputCount:n});if($e.webgpu.validateInputContent&&Nh(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Vh(r,o))}});var Lh,Gh,Bu,Du=W(()=>{"use strict";se();ce();Lh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Gh=e=>{let t=e[0].dims,r=e[0].dims[2],n=P.size(t)/4,o=e[0].dataType,a=z("input",o,t,4),s=z("bias",o,[r],4),d=z("residual",o,t,4),l=U("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:f=>`
  const channels = ${r}u / 4;
  ${f.declareVariables(a,s,d,l)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Bu=e=>{Lh(e.inputs),e.compute(Gh(e.inputs))}});var Hh,ye,Mu,Ru,Uu,Nu,Vu,Wu,Lu,Gu,Hu,Fh,Fu,qu,Ku,ju,nr,Zu,Xr,Qu,Yu,Xu,Ju,ed,td,rd,nd,od,id,ad,sd,ud,dd,ld,cd,pd,md,_o,wo,fd,hd,gd,qh,Kh,yd,Jr=W(()=>{"use strict";re();se();Ae();ce();Hh=(e,t,r,n,o,a,s)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let p=z("inputData",r,[d],4),f=U("outputData",n,[d],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},ye=(e,t,r,n,o,a=e.dataType,s,d)=>{let l=[{type:12,data:Math.ceil(P.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Hh(p,P.size(e.dims),e.dataType,a,r,n,d),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(P.size(p[0].dims)/64/4)},programUniforms:l})}},Mu=e=>{e.compute(ye(e.inputs[0],"Abs","abs"))},Ru=e=>{e.compute(ye(e.inputs[0],"Acos","acos"))},Uu=e=>{e.compute(ye(e.inputs[0],"Acosh","acosh"))},Nu=e=>{e.compute(ye(e.inputs[0],"Asin","asin"))},Vu=e=>{e.compute(ye(e.inputs[0],"Asinh","asinh"))},Wu=e=>{e.compute(ye(e.inputs[0],"Atan","atan"))},Lu=e=>{e.compute(ye(e.inputs[0],"Atanh","atanh"))},Gu=e=>te(e),Hu=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ye(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Fh=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return te({min:t,max:r})},Fu=(e,t)=>{let r=t||Fh(e.inputs),n=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},qu=e=>{e.compute(ye(e.inputs[0],"Ceil","ceil"))},Ku=e=>{e.compute(ye(e.inputs[0],"Cos","cos"))},ju=e=>{e.compute(ye(e.inputs[0],"Cosh","cosh"))},nr=e=>te(e),Zu=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Xr=(e="f32")=>`
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
}`,Qu=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Xr(t)))},Yu=e=>{e.compute(ye(e.inputs[0],"Exp","exp"))},Xu=e=>{e.compute(ye(e.inputs[0],"Floor","floor"))},Ju=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Xr(t)))},ed=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},td=e=>{e.compute(ye(e.inputs[0],"Not",t=>`!${t}`))},rd=e=>{e.compute(ye(e.inputs[0],"Neg",t=>`-${t}`))},nd=e=>{e.compute(ye(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},od=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},id=e=>{e.compute(ye(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ad=e=>te(e),sd=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},ud=e=>{e.compute(ye(e.inputs[0],"Sin","sin"))},dd=e=>{e.compute(ye(e.inputs[0],"Sinh","sinh"))},ld=e=>{e.compute(ye(e.inputs[0],"Sqrt","sqrt"))},cd=e=>{e.compute(ye(e.inputs[0],"Tan","tan"))},pd=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,md=e=>{e.compute(ye(e.inputs[0],"Tanh",pd))},_o=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${pd("v")};
}
`,wo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fd=e=>{let t=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"FastGelu",wo,_o(t),void 0,e.inputs[0].dataType))},hd=(e,t)=>{let r=ze(e.inputs[0].dataType);return e.compute(ye(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},gd=e=>{e.compute(ye(e.inputs[0],"Log","log"))},qh=(e,t)=>`
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
`,Kh=e=>`quick_gelu_impl(${e})`,yd=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ye(e.inputs[0],"QuickGelu",Kh,qh(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var jh,Zh,_d,wd=W(()=>{"use strict";se();ce();Jr();jh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Zh=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=z("input",e[0].dataType,e[0].dims,4),n=z("bias",e[0].dataType,[e[0].dims[2]],4),o=U("output",e[0].dataType,t,4),a=P.size(t)/4,s=we(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,n,o)}

  ${Xr(s)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},_d=e=>{jh(e.inputs),e.compute(Zh(e.inputs))}});var Qh,Yh,ut,vd,$d,xd,Sd,Td,Id,Cd,Ad,Ed,kd,Pd=W(()=>{"use strict";re();se();ce();Qh=(e,t,r,n,o,a,s,d,l,p,f,h)=>{let y,_;typeof d=="string"?y=_=(v,S)=>`${d}((${v}),(${S}))`:typeof d=="function"?y=_=d:(y=d.scalar,_=d.vector);let b=U("outputData",f,n.length,4),w=z("aData",l,t.length,4),T=z("bData",p,r.length,4),$;if(o)if(a){let v=P.size(t)===1,S=P.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,k=r.length>0&&r[r.length-1]%4===0;v||S?$=b.setByOffset("global_idx",_(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),S?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):$=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",_(s||I?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||k?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=b.setByOffset("global_idx",_(w.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,I,k="")=>{let A=`aData[indexA${I}][componentA${I}]`,O=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${b.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${w.broadcastedIndicesToOffset(`outputIndices${I}`,b)};
            let offsetB${I} = ${T.broadcastedIndicesToOffset(`outputIndices${I}`,b)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${S}[${I}] = ${k}(${y(A,O)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(w,T,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Yh=(e,t,r,n,o,a,s=r.dataType)=>{let d=r.dims.map(w=>Number(w)??1),l=n.dims.map(w=>Number(w)??1),p=!P.areEqual(d,l),f=d,h=P.size(d),y=!1,_=!1,b=[p];if(p){let w=nt.calcShape(d,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");f=w.slice(),h=P.size(f);let T=P.size(d)===1,$=P.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,S=l.length>0&&l[l.length-1]%4===0;b.push(T),b.push($),b.push(v),b.push(S);let I=1;for(let k=1;k<f.length;k++){let A=d[d.length-k],O=l[l.length-k];if(A===O)I*=A;else break}I%4===0?(_=!0,y=!0):(T||$||v||S)&&(y=!0)}else y=!0;return b.push(y),{name:e,shaderCache:{hint:t+b.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Qh(w,d,l,f,y,p,_,o,r.dataType,n.dataType,s,a),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(P.size(f)/4)},...L(d,l,f)]})}},ut=(e,t,r,n,o,a)=>{e.compute(Yh(t,o??"",e.inputs[0],e.inputs[1],r,n,a))},vd=e=>{ut(e,"Add",(t,r)=>`${t}+${r}`)},$d=e=>{ut(e,"Div",(t,r)=>`${t}/${r}`)},xd=e=>{ut(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Sd=e=>{ut(e,"Mul",(t,r)=>`${t}*${r}`)},Td=e=>{let t=z("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ut(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Id=e=>{ut(e,"Sub",(t,r)=>`${t}-${r}`)},Cd=e=>{ut(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Ad=e=>{ut(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Ed=e=>{ut(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},kd=e=>{ut(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Jh,eg,tg,rg,zd,Od,Bd=W(()=>{"use strict";re();se();Ae();ce();Jh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,a=n.dims.length;e.forEach((s,d)=>{if(d!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==n.dims[p])throw new Error("non concat dimensions must match")})}})},eg=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,tg=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(a):o===0?n.push(`if (inputIndex == ${o}u) { ${a} }`):o===r-1?n.push(`else { ${a} }`):n.push(`else if (inputIndex == ${o}) { ${a} }`)}return n.join(`
`)},rg=(e,t,r,n)=>{let o=P.size(r),a=new Array(e.length),s=new Array(e.length),d=0,l=[],p=[],f=[{type:12,data:o}];for(let w=0;w<e.length;++w)d+=e[w].dims[t],a[w]=d,p.push(e[w].dims.length),s[w]=z(`input${w}`,n,p[w]),l.push("rank"),f.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)f.push(...L(e[w].dims));f.push(...L(r));let h=U("output",n,r.length),y=h.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),b=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)w.registerUniform(`sizeInConcatAxis${T}`,"u32");return w.declareVariables(...s,h)})()}

  ${eg(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${tg(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:b}},zd=(e,t)=>{let r=e.inputs,n=r[0].dims,o=P.normalizeAxis(t.axis,n.length);Jh(r,o);let a=n.slice();a[o]=r.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let s=r.filter(d=>P.size(d.dims)>0);e.compute(rg(s,o,a,r[0].dataType),{inputs:s})},Od=e=>te({axis:e.axis})});var Ze,Qe,Ye,en,vt=W(()=>{"use strict";re();se();Ze=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ye=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},en=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Ls,Gs];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var ke,Dd,tn=W(()=>{"use strict";ke=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Dd=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Md,Rd=W(()=>{"use strict";Md=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var or,rn,nn=W(()=>{"use strict";re();se();ce();vt();or=(e,t,r,n,o)=>{let a=n-r;return`
      ${Array.from({length:r}).map((s,d)=>`
      if (${j(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,j(o,d+a,n))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},rn=(e,t,r,n,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s[s.length-2],p=d[d.length-1],f=s[s.length-1],h=he(p),y=he(f),_=he(l),b=P.size(r)/h/_,w=e.length>2,T=n?n.slice(0,-2):r.slice(0,-2),v=[P.size(T),l,p],S=[{type:12,data:b},{type:12,data:l},{type:12,data:p},{type:12,data:f}];Qe(t,S),S.push(...L(T,s,d)),w&&S.push(...L(e[2].dims)),S.push(...L(v));let I=k=>{let A=jr("batch_dims",e[0].dataType,T.length),O=z("a",e[0].dataType,s.length,y),D=z("b",e[1].dataType,d.length,h),R=U("output",e[0].dataType,v.length,h),F=we(R.type.tensor),Z=Ze(t,R.type.value,F),X=[O,D],H="";if(w){let q=o?h:1;X.push(z("bias",e[2].dataType,e[2].dims.length,q)),H=`${o?`value += bias[col / ${q}];`:`value += ${R.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ye(t,Y);let xe=()=>{let q=`var a_data: ${O.type.value};`;for(let Q=0;Q<y;Q++)q+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${h}];`;for(let Q=0;Q<_;Q++){q+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${y}];`;for(let ne=0;ne<y;ne++)q+=`
            values[${Q}] = fma(${D.type.value}(a_data${y===1?"":`[${ne}]`}), b_data${ne}, values[${Q}]);
`}return q};return`
  ${k.registerUniforms(Y).registerInternalVariables(A).declareVariables(...X,R)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${or("a_indices",O,O.rank-2,A.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${D.type.indices};
    ${or("b_indices",D,D.rank-2,A.rank,"batch_indices")}
    ${D.indicesSet("b_indices",D.rank-2,0)}
    ${D.indicesSet("b_indices",D.rank-1,0)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${xe()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${H}
      ${Z}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${y};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:S}),getShaderSource:I}}});var ng,og,vo,Ud,ig,$o,ag,ir,on=W(()=>{"use strict";re();se();ce();vt();nn();tn();ng=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,og=(e,t)=>e?`
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
        }`,vo=(e,t,r="f32",n,o=!1,a=32,s=!1,d=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=o?l:a,h=o?a:l,y=f/t[0],_=a/t[1];if(!((o&&y===4&&e[1]===4||!o&&(y===3||y===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${r}>, ${f/y}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${a}>;

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
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ng(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${og(o,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ud=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,ig=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",$o=(e,t,r="f32",n,o=!1,a=32,s=!1,d=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=o?p:a,y=o?a:p;if(!(y%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],b=h/t[0],w=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ud(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
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
      ${Ud(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
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
      ${ig(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},ag=(e,t,r,n,o=!1)=>{let[a,s,d,l]=n,p=we(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ke(e,p)} {
      var value = ${ke(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${or("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ke(e,p)} {
      var value = ${ke(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${d.type.indices};
        ${or("bIndices",d,d.rank-2,a.rank,"batchIndices")}
        ${d.indicesSet("bIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("bIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ke(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${ke(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ir=(e,t,r,n,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s.slice(0,-2),p=d.slice(0,-2),f=n?n.slice(0,-2):r.slice(0,-2),h=P.size(f),y=s[s.length-2],_=s[s.length-1],b=d[d.length-1],w=_%4===0&&b%4===0,T=y<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(b/$[0]/T[0]),Math.ceil(y/$[1]/T[1]),Math.ceil(h/$[2]/T[2])],S=w?4:1,I=[...l,y,_/S],k=I.length,A=[...p,_,b/S],O=A.length,D=[h,y,b/S],R=[{type:6,data:y},{type:6,data:b},{type:6,data:_}];Qe(t,R),R.push(...L(f,I,A));let F=["rank","rank"],Z=e.length>2;Z&&(R.push(...L(e[2].dims)),F.push("rank")),R.push(...L(D));let X=H=>{let Y=f.length,xe=jr("batchDims",e[0].dataType,Y,1),q=we(e[0].dataType),Q=z("a",e[0].dataType,k,S),ne=z("b",e[1].dataType,O,S),ee=U("result",e[0].dataType,D.length,S),me=[Q,ne];if(Z){let G=o?S:1;me.push(z("bias",e[2].dataType,e[2].dims.length,G))}let _e=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ye(t,_e);let ve=we(ee.type.tensor),oe=Ze(t,ee.type.value,ve),E=ag(S,Z,oe,[xe,Q,ne,ee],o);return`
  ${H.registerUniforms(_e).registerInternalVariables(xe).declareVariables(...me,ee)}
  ${E}
  ${w?vo(T,$,q,xe):$o(T,$,q,xe)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${w};${o}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:R}),getShaderSource:X}}});var sg,Nd,Vd=W(()=>{"use strict";re();rt();ce();vt();tn();Rd();on();sg=(e,t,r,n,o=!1,a,s=4,d=4,l=4,p="f32")=>{let f=F=>{switch(F){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},h=F=>{switch(F){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},y=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${ke(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${w}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${ke(s,p)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${ke(s,p)}(0.0);`,I=e?n&&r?h(d):`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(d)}
    }
    return ${ke(d,p)}(0.0);`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(d)}
    }
    return ${ke(d,p)}(0.0);`,k=ke(l,p),A=e?ke(s,p):ke(d,p),O=e?ke(d,p):ke(s,p),D=Ze(a,k,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?I:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Dd(o)}
      ${D}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Nd=(e,t,r,n,o,a,s,d,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=r[0],y=p?r[2]:r[3],_=p?r[1]:r[2],b=p?r[3]:r[1],w=p&&(f%4===0||f%3===0)&&b%4===0,T=p?b:y*_,$=p?y*_:b,v=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],I=[Math.ceil(T/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(h/v[2]/S[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let k=w?p&&f%4!==0?3:4:1,A=v[1]*S[1],O=v[0]*S[0],D=Math.max(v[0]*k,v[1]),R=n%A===0,F=o%O===0,Z=a%D===0,X=w?[k,4,4]:[1,1,1],H=[{type:6,data:n},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Qe(t,H),H.push(...L(e[0].dims,e[1].dims));let Y=["rank","rank"];s&&(H.push(...L(e[2].dims)),Y.push("rank")),H.push(...L(r));let xe=q=>{let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ye(t,Q);let ne=w?4:1,ee=we(e[0].dataType),me=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${ee}>`:ee}) {
        result[flatIndex] = ${w?`vec4<${ee}>`:ee}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${ee}>`:ee}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,_e=z("x",e[0].dataType,e[0].dims.length,k===3?1:k),ve=z("w",e[1].dataType,e[1].dims.length,ne),oe=[_e,ve],E=U("result",e[0].dataType,r.length,ne);if(s){let G=z("bias",e[2].dataType,e[2].dims.length,ne);oe.push(G),me+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${ee}>`:ee} {
          return bias[coords.${p?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Md("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${q.registerUniforms(Q).declareVariables(...oe,E)}
        ${me}
        ${sg(p,R,F,Z,s,t,X[0],X[1],X[2],ee)}
        ${w?vo(S,v,ee,void 0,!p,D):$o(S,v,ee,void 0,!p,D,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${w};${R};${F};${Z};${A};${O};${D}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:H}),getShaderSource:xe}}});var ug,Wd,an,dg,Ld,lg,Gd,Hd,Fd=W(()=>{"use strict";re();rt();se();ce();vt();tn();ug=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Wd=e=>typeof e=="number"?[e,e,e]:e,an=(e,t)=>t<=1?e:e+(e-1)*(t-1),dg=(e,t,r,n=1)=>{let o=an(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Ld=(e,t,r,n,o)=>{o==null&&(o=dg(e,t[0],n[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/n[s]+1));return a},lg=(e,t,r,n,o,a,s,d,l,p)=>{let f,h,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Ld([t,r,n,1],[d,l,p],1,[o,a,s],e);h=b[0],y=b[1],_=b[2]}else if(Array.isArray(e)){if(!e.every((w,T,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Ld([t,r,n,1],[d,l,p],1,[o,a,s],e[0]);h=b[0],y=b[1],_=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/o),y=Math.ceil(r/a),_=Math.ceil(n/s);let b=(h-1)*o+d-t,w=(y-1)*a+l-r,T=(_-1)*s+p-n,$=Math.floor(b/2),v=b-$,S=Math.floor(w/2),I=w-S,k=Math.floor(T/2),A=T-k;f={top:S,bottom:I,left:k,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:y,outWidth:_}},Gd=(e,t,r,n,o,a=!1,s="channelsLast")=>{let d,l,p,f,h;if(s==="channelsLast")[d,l,p,f,h]=e;else if(s==="channelsFirst")[d,h,l,p,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[y,,_,b,w]=t,[T,$,v]=Wd(r),[S,I,k]=Wd(n),A=an(_,S),O=an(b,I),D=an(w,k),{padInfo:R,outDepth:F,outHeight:Z,outWidth:X}=lg(o,l,p,f,T,$,v,A,O,D),H=a?y*h:y,Y=[0,0,0,0,0];return s==="channelsFirst"?Y=[d,H,F,Z,X]:s==="channelsLast"&&(Y=[d,F,Z,X,H]),{batchSize:d,dataFormat:s,inDepth:l,inHeight:p,inWidth:f,inChannels:h,outDepth:F,outHeight:Z,outWidth:X,outChannels:H,padInfo:R,strideDepth:T,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:b,filterWidth:w,effectiveFilterDepth:A,effectiveFilterHeight:O,effectiveFilterWidth:D,dilationDepth:S,dilationHeight:I,dilationWidth:k,inShape:e,outShape:Y,filterShape:t}},Hd=(e,t,r,n,o,a)=>{let s=a==="channelsLast",d=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],f={x:r.map((v,S)=>S)},h=[Math.ceil(ug(f.x.map(v=>r[v]))/p[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let y=l?s&&d%4!==0?3:4:1,_=P.size(r),b=[{type:12,data:_},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Qe(t,b),b.push(...L(e[0].dims,e[1].dims));let w=["rank","rank"],T=e.length===3;T&&(b.push(...L(e[2].dims)),w.push("rank")),b.push(...L(r));let $=v=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ye(t,S);let I=l?4:1,k=we(e[0].dataType),A=z("x",e[0].dataType,e[0].dims.length,y===3?1:y),O=z("W",e[1].dataType,e[1].dims.length,I),D=[A,O],R=U("result",e[0].dataType,r.length,I),F="";if(T){let H=z("bias",e[2].dataType,e[2].dims.length,I);D.push(H),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${k}>`:k} {
          return bias[${s?j("coords",4,5):j("coords",1,5)}${l?"/ 4":""}];
        }`}let Z=ke(y,k),X=Ze(t,Z,k);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${v.registerUniforms(S).declareVariables(...D,R)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,A.rank)};
              let d2 = ${s?j("coords",A.rank-1,A.rank):j("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${s?j("coords",1,A.rank):j("coords",2,A.rank)},
              ${s?j("coords",2,A.rank):j("coords",3,A.rank)},
              ${s?j("coords",3,A.rank):j("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?j("uniforms.x_shape",1,A.rank):j("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${s?j("uniforms.x_shape",2,A.rank):j("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${s?j("uniforms.x_shape",3,A.rank):j("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${s?j("uniforms.x_shape",4,A.rank):j("uniforms.x_shape",1,A.rank)};
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
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${X}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${y};${T}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:b}),getShaderSource:$}}});var qd,Kd,jd=W(()=>{"use strict";re();se();ce();vt();qd=(e,t,r,n)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,d=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],f=p/t.group,h=l&&f>=4?he(p):1,y=P.size(r)/h,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Qe(t,_),_.push(...L(s,[d[0],d[1],d[2],d[3]/h]));let b=o?["rank","rank","rank"]:["rank","rank"];_.push(...L([r[0],r[1],r[2],r[3]/h]));let w=T=>{let $=U("output",e[0].dataType,r.length,h),v=we($.type.tensor),S=Ze(t,$.type.value,v),I=z("x",e[0].dataType,s.length),k=z("w",e[1].dataType,d.length,h),A=[I,k];o&&A.push(z("b",e[2].dataType,e[2].dims,h));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ye(t,O);let D=l?`
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
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(O).declareVariables(...A,$)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${D}
    ${a}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},Kd=(e,t,r,n)=>{let o=e.length>2,a=he(r[3]),s=he(r[2]),d=P.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[r[0],r[1],r[2],r[3]/a],h=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Qe(t,h),h.push(...L(l,p,f));let y=(s-1)*t.strides[1]+p[1],_=b=>{let w=U("output",e[0].dataType,f.length,a),T=we(w.type.tensor),$=Ze(t,w.type.value,T),v=z("x",e[0].dataType,l.length,a),S=z("w",e[1].dataType,p.length,a),I=[v,S];o&&I.push(z("b",e[2].dataType,e[2].dims,a));let k=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ye(t,A),`
  ${b.registerUniforms(A).declareVariables(...I,w)}
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
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${k}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${y};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}}});var cg,xo,pg,So,To,Zd,mg,fg,Io,Qd=W(()=>{"use strict";se();Vd();Fd();on();jd();vt();nn();pt();cg=(e,t,r,n,o,a)=>{let s=e[0],d=e.slice(a?1:2,a?3:4),l=d.length,p=t[0],h=t.slice(2).map((b,w)=>b+(b-1)*(r[w]-1)),_=d.map((b,w)=>b+n[w]+n[w+l]).map((b,w)=>Math.floor((b-h[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,p),_},xo=[2,3,1,0],pg=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},So=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let n=e.pads.slice();Et.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},To=e=>{let t=en(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,d=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Zd=(e,t,r,n)=>{let o=r.format==="NHWC",a=cg(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let D=e.kernelCustomData.wT??e.compute(Oe(t[1],xo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=D),A.push(D)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Kd(A,r,a,n),{inputs:A}):e.compute(qd(A,r,a,n),{inputs:A});return}let s=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],p=t[0].dims[o?3:1],f=t[1].dims[2],h=t[1].dims[3],y=a[o?1:2],_=a[o?2:3],b=a[o?3:1],w=o&&f===d&&h===l&&r.pads[0]===0&&r.pads[1]===0;if(w||f===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=a[0],O,D,R,F=[];if(o){let H=e.kernelCustomData.wT??e.compute(Oe(t[1],xo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=H),w){let Y=d*l*p;O=t[0].reshape([1,A,Y]),D=H.reshape([1,Y,b]),R=[1,A,b]}else O=t[0].reshape([A,d*l,p]),D=H.reshape([1,p,b]),R=[A,y*_,b];F.push(O),F.push(D)}else O=t[0].reshape([A,p,d*l]),D=t[1].reshape([1,b,p]),R=[A,b,y*_],F.push(D),F.push(O);s&&F.push(t[2]);let Z=R[2],X=F[0].dims[F[0].dims.length-1];Z<8&&X<8?e.compute(rn(F,r,a,R,o,n),{inputs:F}):e.compute(ir(F,r,a,R,o,n),{inputs:F});return}let T=!0,$=e.kernelCustomData.wT??e.compute(Oe(t[1],xo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];s&&v.push(t[2]);let S=o?y*_:b,I=o?b:y*_,k=f*h*p;e.compute(Nd(v,r,a,S,I,k,s,T,n),{inputs:v})},mg=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=So({...t,pads:o,strides:a,dilations:s,kernelShape:d},n);Zd(e,n,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},fg=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=So(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Gd(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,n);e.compute(Hd(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},Io=(e,t)=>{if(pg(e.inputs,t),e.inputs[0].dims.length===3)mg(e,t);else if(e.inputs[0].dims.length===5)fg(e,e.inputs,t);else{let r=So(t,e.inputs);Zd(e,e.inputs,r)}}});var Yd,Xd=W(()=>{"use strict";re();rt();se();ce();Yd=(e,t,r)=>{let n=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,d=e[1].dims,l=d[2]/s,p=d[3],f=a?he(l):1,h=a&&p===1&&l>=4,y=h?Math.floor(l/4)*4:Math.floor(l/f)*f,_=l-y,b=a?he(p):1,w=a?p===1?f:b:1,T=P.size(o)/b,$=[Math.ceil(T/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],S=[t.strides[0],t.strides[1]],I=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],k=[t.dilations[0],t.dilations[1]],A=[I[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],O=[A[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),A[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],D=[{type:12,data:T},{type:12,data:S},{type:12,data:I},{type:12,data:k},{type:12,data:A},{type:6,data:O},{type:12,data:y},{type:12,data:l},{type:12,data:p},...L(e[0].dims,e[1].dims)];n&&(D.push(...L(e[2].dims)),v.push("rank")),D.push(...L(o));let R=F=>{let Z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:O.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],X=we(e[0].dataType),H=a?1:2,Y=a?2:3,xe=a?3:1,q=z("W",e[1].dataType,e[1].dims.length,w),Q=z("Dy",e[0].dataType,e[0].dims.length,f),ne=[Q,q];n&&ne.push(z("bias",e[2].dataType,[o[xe]].length,b));let ee=U("result",e[0].dataType,o.length,b),me=()=>{let oe="";if(h)f===4?oe+=`
        let xValue = ${Q.getByOffset("x_offset")};
        let wValue = ${q.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?oe+=`
          dotProd = dotProd + dot(vec4<${X}>(${Q.getByOffset("x_offset")}, ${Q.getByOffset("x_offset + 1u")}), vec4<${X}>(${q.getByOffset("w_offset")}, ${q.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(oe+=`
          dotProd = dotProd + dot(vec4<${X}>(${Q.getByOffset("x_offset")}, ${Q.getByOffset("x_offset + 1u")}, ${Q.getByOffset("x_offset + 2u")}, ${Q.getByOffset("x_offset + 3u")}), vec4<${X}>(${q.getByOffset("w_offset")}, ${q.getByOffset("w_offset + 1u")}, ${q.getByOffset("w_offset + 2u")}, ${q.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(oe+=`
                  let xValue = ${a?Q.getByOffset(`${Q.indicesToOffset(`${Q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):Q.get("batch","inputChannel","idyR","idyC")};
        `,f===1)oe+=`
          let w_offset = ${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${q.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let E=0;E<f;E++)oe+=`
            let wValue${E} = ${q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${E}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${E}] * wValue${E};`;return oe},_e=()=>{if(_===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let oe="";if(f===1){oe+="dotProd = dotProd";for(let E=0;E<_;E++)oe+=`
            + ${Q.getByOffset(`x_offset + ${E}`)} * ${q.getByOffset(`w_offset + ${E}`)}`;oe+=";"}else if(f===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);oe+=`
          let xValue = ${Q.getByOffset("x_offset")};
          let wValue = ${q.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return oe},ve=`
            let outputIndices = ${ee.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${ee.indicesGet("outputIndices",0)};
            let d1 = ${ee.indicesGet("outputIndices",xe)};
            let r = ${ee.indicesGet("outputIndices",H)};
            let c = ${ee.indicesGet("outputIndices",Y)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ee.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${X}(dyRCorner) + ${X}(wR)) / ${X}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${X}(uniforms.Dy_shape[${H}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${X}(dyCCorner) + ${X}(wC)) / ${X}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${X}(uniforms.Dy_shape[${Y}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${Q.indicesToOffset(`${Q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${q.indicesToOffset(`${q.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:f}) {
                  ${me()}
                  inputChannel = inputChannel + ${h?4:f};
                }
                ${_e()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${b}]`:""};
            ${ee.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(Z).declareVariables(...ne,ee)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ve}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${w}${b}${h}${_}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:D}),getShaderSource:R}}});var hg,gg,yg,Jd,el,bg,tl,_g,rl,nl=W(()=>{"use strict";Xd();vt();pt();hg=(e,t,r,n,o,a)=>(e-1)*t+r+(n-1)*o+1-a,gg=(e,t,r,n,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=a,r[o]=e-a):t==="SAME_LOWER"&&(r[n]=e-a,r[o]=a)},yg=(e,t,r,n,o,a,s,d,l,p)=>{let f=e.length-2,h=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let y=e[0],_=t[d?3:1]*o;for(let b=0,w=e.length-f-(d?1:0);b<f;++b,++w){let T=e[w],$=h?T*s[b]:p[b],v=hg(T,s[b],a[b],t[w],r[b],$);gg(v,n,a,b,b+f),h&&p.push(s[b]*(T-1)+l[b]+(t[w]-1)*r[b]+1-a[b]-a[b+f])}p.splice(0,0,y),p.splice(d?3:1,0,_)},Jd=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,y)=>h*y,1)===0){r.length=0;for(let h=2;h<t[1].dims.length;++h)r.push(t[1].dims[h])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}yg(d,r,l,e.autoPad,e.group,o,p,n,s,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:o,outputPadding:s,outputShape:a,dilations:l,strides:p}),f},el=e=>{let t=en(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,d=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,outputPadding:f,outputShape:h,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},bg=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((f,h)=>f+h,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((f,h)=>f+h,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((f,h)=>f+h,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((f,h)=>f+h,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},tl=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(Oe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(Yd(a,r,n),{inputs:a})},_g=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let p=Jd({...t,pads:d,strides:s,dilations:a,kernelShape:o,outputPadding:l},n);tl(e,n,p,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},rl=(e,t)=>{if(bg(e.inputs,t),e.inputs[0].dims.length===3)_g(e,t);else{let r=Jd(t,e.inputs);tl(e,e.inputs,r)}}});var wg,ol,il,al=W(()=>{"use strict";re();se();Ae();ce();wg=(e,t,r,n)=>{let o=P.size(t),a=t.length,s=z("input",e,a),d=U("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=P.normalizeAxis(l,a),f=h=>{let y=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=j("uniforms.input_shape","uniforms.axis",a),b=n.reverse?y+(n.exclusive?" + 1":""):"0",w=n.reverse?_:y+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...L(t,t)]}),getShaderSource:f}},ol=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(wg(n,r,o,t),{inputs:[0]})},il=e=>{let t=e.exclusive===1,r=e.reverse===1;return te({exclusive:t,reverse:r})}});var vg,$g,xg,sl,ul,dl=W(()=>{"use strict";re();se();Ae();ce();vg=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},$g=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)o.push(r.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},xg=(e,t)=>{let r,n,o,a,s,d,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([r,n,o,a]=e.dims,s=f?[r,n,o,p,p,a/p**2]:[r,n,o,a/p**2,p,p],d=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[r,p,p,a/p**2,n,o]:[r,a/p**2,p,p,n,o],d=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),y=h.dims.length,_=e.dataType,b=z("a",_,y),w=U("output",_,y),T=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(b,w)}

  ${$g(d,y,b,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[r,n*p,o*p,a/p**2]:[r,a/p**2,n*p,o*p],S=P.size(v),I=h.dims,k=P.sortBasedOnPerm(I,d);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...L(I,k)]}},getShaderSource:T}},sl=(e,t)=>{vg(e.inputs),e.compute(xg(e.inputs[0],t))},ul=e=>te({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Co,sn,ll,Sg,Tg,Ao,Eo,cl,Ig,pl,ml,fl=W(()=>{"use strict";re();se();Ae();ce();Co="[a-zA-Z]|\\.\\.\\.",sn="("+Co+")+",ll="^"+sn+"$",Sg="("+sn+",)*"+sn,Tg="^"+Sg+"$",Ao=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Eo=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(Tg)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,l)=>{let p=t[l].dims.slice();if(!d.match(RegExp(ll)))throw new Error("Invalid LHS term");let f=this.processTerm(d,!0,p,l);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(sn)))throw new Error("Invalid RHS");o.match(RegExp(Co,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let a=n.length,s=!1,d=[],l=0;if(!t.match(RegExp(ll))&&!r&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(Co,"g")),f=new Ao(o);return p?.forEach((h,y)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(l,l+_),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<d.length;b++){let w=String.fromCharCode(48+b);f.addSymbol(w,y+b),this.addSymbol(w,n[l++],o)}}else f.addSymbol(h,y+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,n[l++],o)}),f}},cl=e=>e+"_max",Ig=(e,t,r,n)=>{let a=e.map(f=>f.length).map((f,h)=>z(`input${h}`,t,f)),s=P.size(n),d=U("output",t,n.length),l=[...r.symbolToInfo.keys()].filter(f=>!r.rhs.symbolToIndices.has(f)),p=f=>{let h=[],y="var prod = 1.0;",_="var sum = 0.0;",b="sum += prod;",w=[],T=[],$=[],v=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,A)=>{if(r.rhs.symbolToIndices.has(A)){let O=r.rhs.symbolToIndices.get(A)?.[0];O!==void 0&&r.lhs.forEach((D,R)=>{if(k.inputIndices.includes(R)){let F=D.symbolToIndices.get(A);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(Z=>{h.push(`${a[R].indicesSet(`input${R}Indices`,Z,d.indicesGet("outputIndices",O))}`)})}})}else r.lhs.forEach((O,D)=>{if(k.inputIndices.includes(D)){let R=O.symbolToIndices.get(A);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(F=>{w.push(`${a[D].indicesSet(`input${D}Indices`,F,`${A}`)}`)}),v.push(`prod *= ${a[D].getByIndices(`input${D}Indices`)};`)}}),T.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${cl(A)}; ${A}++) {`),$.push("}")});let I=S?[...h,`let sum = ${a.map((k,A)=>k.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...h,_,...T,...w,y,...v,b,...$];return`
            ${f.registerUniforms(l.map(k=>({name:`${cl(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,d)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${a.map((k,A)=>`var input${A}Indices: ${a[A].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let f=l.filter(y=>r.symbolToInfo.has(y)).map(y=>({type:12,data:r.symbolToInfo.get(y)?.dimValue||0}));f.push({type:12,data:s});let h=e.map((y,_)=>[...L(y)]).reduce((y,_)=>y.concat(_),f);return h.push(...L(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:p}},pl=(e,t)=>{let r=new Eo(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(Ig(o,e.inputs[0].dataType,r,n))},ml=e=>{let t=e.equation.replace(/\s+/g,"");return te({equation:t})}});var Cg,hl,Ag,Eg,gl,yl=W(()=>{"use strict";re();se();ce();Cg=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},hl=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Ag=(e,t)=>e.length>t.length?hl(e,t):hl(t,e),Eg=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Ag(t,r),o=e[0].dataType,a=o===9||P.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,d=a||n.length>0&&n[n.length-1]%4===0?4:1,l=Math.ceil(P.size(n)/d),p=h=>{let y=z("input",o,t.length,s),_=U("output",o,n.length,d),b;if(o===9){let w=(T,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${y.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${T}[${$}] = ${v}(${y.getByOffset(`index${$}`)}[component${$}]);
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
    ${b}`},f=[{type:12,data:l},...L(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${d}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},gl=e=>{Cg(e.inputs),e.compute(Eg(e.inputs),{inputs:[0]})}});var kg,bl,_l=W(()=>{"use strict";re();se();ce();Jr();kg=e=>{let t=e[0].dataType,r=P.size(e[0].dims),n=P.size(e[1].dims),o=n%4===0,a=s=>{let d=z("x",t,[1],4),l=z("bias",t,[1],4),p=U("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(d,l,p)}

    ${_o(ze(t))}

    ${s.mainStart(kt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",wo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/kt/4)}})}},bl=e=>{e.inputs.length<2||P.size(e.inputs[1].dims)===0?fd(e):e.compute(kg(e.inputs))}});var Pg,zg,wl,vl,$l=W(()=>{"use strict";re();se();Ae();ce();Pg=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},zg=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,a=P.normalizeAxis(t.axis,o),s=r.slice(0);s.splice(a,1,...n);let d=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(P.size(s)/l),f=[{type:12,data:p},{type:6,data:d},{type:12,data:a},...L(e[0].dims,e[1].dims,s)],h=y=>{let _=z("data",e[0].dataType,e[0].dims.length,l),b=z("inputIndices",e[1].dataType,e[1].dims.length),w=U("output",e[0].dataType,s.length,l),T=v=>{let S=n.length,I=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let k=0;k<S;k++)I+=`${S>1?`indicesIndices${v}[${k}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${k}]`:`outputIndices${v}`};`;I+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let k=0,A=0;k<o;k++)k===a?(I+=`${o>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = u32(idx${v});`,A+=S):(I+=`${o>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return I},$;if(e[0].dataType===9){let v=(S,I,k="")=>`
          let outputIndices${I} = ${w.offsetToIndices(`outputOffset + ${I}u`)};
          ${T(I)};
          let offset${I} = ${_.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${S}[${I}] = ${k}(${_.getByOffset(`index${I}`)}[component${I}]);
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
      ${T("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,b,w)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},wl=e=>te({axis:e.axis}),vl=(e,t)=>{let r=e.inputs;Pg(r),e.compute(zg(e.inputs,t))}});var Og,xl,Sl,Tl=W(()=>{"use strict";re();se();ce();Og=(e,t,r,n,o,a,s,d,l)=>{let p=[{type:12,data:a},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:s},{type:12,data:d},{type:12,data:l}],f=[a];p.push(...L(t.dims,f));let h=y=>{let _=z("indices_data",t.dataType,t.dims.length),b=U("input_slice_offsets_data",12,1,1),w=[_,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(T).declareVariables(...w)}
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
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},xl=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,a=r[1].dims,s=a[a.length-1],d=P.sizeToDimension(a,a.length-1),l=P.sizeFromDimension(n,t.batchDims+s),p=P.sizeToDimension(n,t.batchDims),f=P.sizeFromDimension(n,t.batchDims),h=d/p,y=new Array(s),_=l;for(let I=0;I<s;++I)y[s-1-I]=_,_*=n[t.batchDims+s-1-I];let b=Og(e,r[1],y,t.batchDims,n,d,h,f,s),w=t.batchDims+s;if(w>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(n.slice(w)),$=P.size(T),v=[{type:12,data:$},{type:12,data:l},...L(r[0].dims,b.dims,T)],S=I=>{let k=z("data",r[0].dataType,r[0].dims.length),A=z("slice_offsets",12,b.dims.length),O=U("output",r[0].dataType,T.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,A,O)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:S},{inputs:[r[0],b]})},Sl=e=>({batchDims:e.batch_dims,cacheKey:""})});var Bg,Dg,Il,Cl,Al=W(()=>{"use strict";re();se();Ae();ce();Bg=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=P.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===r?Math.ceil(d/n)===a.dims[l]:d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((d,l)=>d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Dg=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,a=P.normalizeAxis(t.gatherAxis,o),s=P.normalizeAxis(t.quantizeAxis,o),d=r.slice(0);d.splice(a,1,...n);let l=P.size(d),p=e[2].dataType,h=e[0].dataType===22,y=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...L(...e.map((b,w)=>b.dims),d)],_=b=>{let w=z("data",e[0].dataType,e[0].dims.length),T=z("inputIndices",e[1].dataType,e[1].dims.length),$=z("scales",e[2].dataType,e[2].dims.length),v=e.length>3?z("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=U("output",p,d.length),I=[w,T,$];v&&I.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(k).declareVariables(...I,S)}
        ${b.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
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
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,w)=>w!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,w)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:_}},Il=(e,t)=>{let r=e.inputs;Bg(r,t),e.compute(Dg(e.inputs,t))},Cl=e=>te({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Mg,Rg,El,kl,Pl=W(()=>{"use strict";re();se();Ae();ce();Mg=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Rg=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,a=e[1].dims,s=e[1].dataType,d=P.normalizeAxis(t.axis,o),l=r[d],p=a.slice(0),f=P.size(p),h=z("input",n,o),y=z("indicesInput",s,a.length),_=U("output",n,p.length),b=[{type:12,data:f},{type:6,data:l},{type:12,data:d}];return b.push(...L(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:$=>`
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
  }`}},El=e=>te({axis:e.axis}),kl=(e,t)=>{let r=e.inputs;Mg(r),e.compute(Rg(e.inputs,t))}});var Ug,Ng,zl,Ol,Bl=W(()=>{"use strict";re();se();ce();Ug=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ng=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,a,s]=Wr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,a];if(!d)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),f=Math.ceil(o/l),h=!0,y=P.size(d),_=[{type:12,data:h?p:y},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(_.push(...L(e[2].dims)),b.push("rank")),_.push(...L(d));let w=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",I=z("a",e[0].dataType,e[0].dims),k=z("b",e[1].dataType,e[1].dims),A=I.type.value,O=null,D=[I,k];e.length===3&&(O=z("c",e[2].dataType,e[2].dims.length),D.push(O));let R=U("output",e[0].dataType,d.length);D.push(R);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...D)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${A}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=$=>{let v=z("a",e[0].dataType,e[0].dims),S=z("b",e[1].dataType,e[1].dims),I=null,k=[v,S];e.length===3&&(I=z("c",e[2].dataType,e[2].dims.length),k.push(I));let A=U("output",e[0].dataType,d.length);k.push(A);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],D="",R="";t.transA&&t.transB?(R=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,D="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(R=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,D="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(R=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,D="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(R=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,D="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(O).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${D}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:_}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},zl=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ol=(e,t)=>{Ug(e.inputs),e.compute(Ng(e.inputs,t))}});var mt,$t,Lt,Gt,Vg,Wg,Lg,Gg,Hg,Fg,qg,Kg,Dl,Ml,Rl=W(()=>{"use strict";re();se();Ae();ce();[mt,$t,Lt,Gt]=[0,1,2,3],Vg=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Wg=`
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
`,Lg=e=>`
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
`,Gg=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Hg=e=>`
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
`,Fg=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${mt}] = batch;
     indices[${$t}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Lt}] = u32(r);
            indices[${Gt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Lt}] = u32(clamp(r, 0, H - 1));
          indices[${Gt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Lt}] = gs_reflect(r, border[1], border[3]);
          indices[${Gt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,qg=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${mt}], indices[${$t}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${mt}], indices[${$t}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${mt}], indices[${$t}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${mt}], indices[${$t}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${mt}], indices[${$t}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${mt}], indices[${$t}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Kg=(e,t)=>{let r=z("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=z("grid",e[1].dataType,n.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[mt,$t,Lt,Gt]=[0,3,1,2]);let s=U("output",e[0].dataType,a.length),d=r.type.value,l=P.size(a),p=[{type:12,data:l},...L(e[0].dims,n,a)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(r,o,s)}
  ${Wg}
  ${Lg(d)}
  ${Gg(t)}
  ${Hg(t)}
  ${Fg(r,d,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Lt}]);
      let W_in = i32(uniforms.x_shape[${Gt}]);

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
      var grid_indices = vec3<u32>(indices[${mt}], indices[${Lt}], indices[${Gt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${qg(s,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let y=P.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:f}},Dl=(e,t)=>{Vg(e.inputs),e.compute(Kg(e.inputs,t))},Ml=e=>te({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Re,Qg,Nl,Ul,Yg,ar,Vl,ko=W(()=>{"use strict";re();se();Ae();qr();Yr();ce();pt();Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Qg=(e,t)=>{let r=e[0],n=Re(e,1),o=Re(e,2),a=Re(e,3),s=Re(e,4),d=Re(e,5),l=Re(e,6),p=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],h=r.dims[1],y=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=h,b=0,w=0,T=Math.floor(y/t.numHeads);if(l&&p&&P.size(l.dims)&&P.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],w=l.dims[2]}else if(l&&P.size(l.dims)||p&&P.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&P.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&P.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+_,S=0;if(s&&P.size(s.dims)>0){S=8;let O=s.dims;throw O.length===1?O[0]===f?S=1:O[0]===3*f+2&&(S=3):O.length===2&&O[0]===f&&O[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,k=y;if(o&&P.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],I=!0}}let A=!1;if(s&&P.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(d&&P.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[2]!==h||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:y,vHiddenSize:k,headSize:T,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:A,passPastInKv:I,qkvFormat:$}},Nl=e=>te({...e}),Ul=te({perm:[0,2,1,3]}),Yg=(e,t,r,n,o,a,s)=>{let d=[n,o,a],l=P.size(d),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],f=h=>{let y=U("qkv_with_bias",t.dataType,d),_=z("qkv",t.dataType,d),b=z("bias",r.dataType,d),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(w).declareVariables(_,b,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},ar=(e,t,r,n,o,a,s,d)=>{let l=a;if(s&&P.size(s.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Yg(e,a,s,t,n,r*o,d),l=l.reshape([t,n,r,o]),r===1||n===1?l:e.compute(Oe(l,Ul.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,n,r,o])),r===1||n===1?l:e.compute(Oe(l,Ul.perm),{inputs:[l],outputs:[-1]})[0]},Vl=(e,t)=>{let r=Qg(e.inputs,t),n=e.inputs[0],o=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),d=Re(e.inputs,4),l=Re(e.inputs,5),p=Re(e.inputs,6),f=Re(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let h=o&&a&&o.dims.length===4&&a.dims.length===4,y=ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(h)return Wt(e,y,o,a,d,void 0,p,f,l,r);if(!o||!a)throw new Error("key and value must be provided");let _=ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),b=ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);Wt(e,y,_,b,d,void 0,p,f,l,r)}});var Xg,Jg,ey,ty,Po,Wl,Ll,zo=W(()=>{"use strict";re();se();Ae();ce();Xg=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Jg=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),te({numOutputs:n,axis:t.axis,splitSizes:r})},ey=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,ty=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Po=(e,t)=>{let r=e[0].dims,n=P.size(r),o=e[0].dataType,a=P.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),d=z("input",o,r.length),l=new Array(t.numOutputs),p=[],f=[],h=0,y=[{type:12,data:n}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],l[b]=h;let w=r.slice();w[a]=t.splitSizes[b],f.push(w),s[b]=U(`output${b}`,o,w.length),p.push({dims:f[b],dataType:e[0].dataType})}y.push({type:12,data:l},...L(r,...f));let _=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...s)}
  ${ey(l.length)}
  ${ty(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:y})}},Wl=(e,t)=>{Xg(e.inputs);let r=e.inputs.length===1?t:Jg(e.inputs,t);e.compute(Po(e.inputs,r),{inputs:[0]})},Ll=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return te({axis:t,numOutputs:n,splitSizes:r})}});var ry,un,Gl,Oo=W(()=>{"use strict";re();se();Ae();ce();ry=(e,t)=>{let[r,n,o,a]=e,{numHeads:s,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!P.areEqual(n.dims,[])&&!P.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!P.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],f=o.dims[0],h=P.sizeFromDimension(r.dims,1)/p,y=d===0?o.dims[1]*2:h/s;if(d>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(p!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(y/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},un=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],d=P.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=d/l,f=e[2].dims[1],h=o===0?f*2:p/n,y=new Array(s,l,p/h,h-f),_=P.computeStrides(y),b=[{type:1,data:a},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[d,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,h,l*h,1]}):[],...L(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=T=>{let $=z("input",e[0].dataType,e[0].dims.length),v=z("position_ids",e[1].dataType,e[1].dims.length),S=z("cos_cache",e[2].dataType,e[2].dims.length),I=z("sin_cache",e[3].dataType,e[3].dims.length),k=U("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${T.declareVariables($,v,S,I,k)}

        ${T.mainStart(kt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",U("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:te({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(y)/kt)},programUniforms:b})}},Gl=(e,t)=>{ry(e.inputs,t),e.compute(un(e.inputs,t))}});var ny,oy,Hl,iy,Fl,ql=W(()=>{"use strict";Ae();re();Yr();ko();zo();pt();Oo();ce();ny=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=r.dims[0],p=r.dims[1],f=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],h=p,y=0,_=!n||n.dims.length===0,b=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=b*t.numHeads);let w=a&&a.dims.length!==0,T=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=a.dims[2]}else if(w||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');h=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let S=0,I=!1,k=t.kvNumHeads?b*t.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],I=!0}}let A=e.length>4?e[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:k,headSize:b,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},oy=te({perm:[0,2,1,3]}),Hl=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Oe(n,oy.perm),{inputs:[n],outputs:[-1]})[0]),n},iy=(e,t,r,n)=>{let o=7,a=["type","type"],s=[e*t],d=e*t,l=[{type:12,data:d},{type:12,data:t},{type:12,data:e}],p=f=>{let h=z("seq_lens",r.dataType,r.dims),y=z("total_seq_lens",n.dataType,n.dims),_=U("pos_ids",o,s),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(b).declareVariables(h,y,_)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${y.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:p}},Fl=(e,t)=>{let r=ny(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=te({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[y,_,b]=!o&&!a?e.compute(Po([n],h),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,a],w,T;if(t.doRotary){let I=e.compute(iy(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],k=e.inputs[7],A=e.inputs[8],O=te({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),D=[y,I,k,A],R=[-1];w=e.compute(un(D,O),{inputs:D,outputs:R})[0],D.splice(0,1,_);let F=te({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(un(D,F),{inputs:D,outputs:R})[0]}let $=ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:y,void 0,0),v=Hl(e,t.doRotary?T:_,r),S=Hl(e,b,r);Wt(e,$,v,S,void 0,void 0,s,d,void 0,r,l,p)}});var Kl,ay,sy,jl,Zl=W(()=>{"use strict";re();se();pt();ce();Kl=(e,t,r,n,o,a,s,d)=>{let l=he(a),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,h=o*s,y=64;h===1&&(y=256);let _=[o,s,a/l],b=[o,s,2],w=["rank","type","type"],T=[];T.push(...L(_,b));let $=v=>{let S=z("x",t.dataType,3,l),I=z("scale",r.dataType,r.dims),k=z("bias",n.dataType,n.dims),A=U("output",1,3,2),O=[S,I,k,A];return`
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
      let value = ${p}(${S.get("batch","channel","h")});
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
      let sum_final = ${je("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${je("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:T}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},ay=(e,t,r)=>{let n=t[0].dims,o=n,a=2,s=n[0],d=n[1],l=P.sizeFromDimension(n,a),p=he(l),f=P.size(o)/p,h=Kl(e,t[0],t[1],t[2],s,l,d,r.epsilon),y=[s,d,l/p],_=[s,d],b=["type","none"],w=T=>{let $=z("x",t[0].dataType,y.length,p),v=z("scale_shift",1,_.length,2),S=U("output",t[0].dataType,y.length,p),I=[$,v,S];return`
  ${T.registerUniform("output_size","u32").declareVariables(...I)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...L(y,_,y)]}),getShaderSource:w},{inputs:[t[0],h]})},sy=(e,t,r)=>{let n=t[0].dims,o=n,a=n[0],s=n[n.length-1],d=P.sizeFromDimension(n,1)/s,l=he(s),p=P.size(o)/l,f=[{type:12,data:d},{type:12,data:Math.floor(s/l)}],h=["type","type"],y=!1,_=[0,n.length-1];for(let $=0;$<n.length-2;$++)y=y||n[$+1]!==1,_.push($+1);y=y&&n[n.length-1]!==1;let b=y?e.compute(Oe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[_[v]])),w=Kl(e,b,t[1],t[2],a,d,s,r.epsilon),T=$=>{let v=we(t[0].dataType),S=l===1?"vec2f":`mat${l}x2f`,I=O=>{let D=O===0?"x":"y",R=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${R}(scale.${D}))`;case 2:return`vec2<${v}>(${R}(scale[0].${D}, scale[1].${D}))`;case 4:return`vec4<${v}>(${R}(scale[0].${D}, scale[1].${D}, scale[2].${D}, scale[3].${D}))`;default:throw new Error(`Not supported compoents ${l}`)}},k=z("input",t[0].dataType,t[0].dims,l),A=U("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:T},{inputs:[t[0],w]})},jl=(e,t)=>{t.format==="NHWC"?sy(e,e.inputs,t):ay(e,e.inputs,t)}});var uy,dy,Ql,Yl=W(()=>{"use strict";re();se();ce();uy=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},dy=(e,t,r)=>{let n=t.simplified,o=e[0].dims,a=e[1],s=!n&&e[2],d=o,l=P.normalizeAxis(t.axis,o.length),p=P.sizeToDimension(o,l),f=P.sizeFromDimension(o,l),h=P.size(a.dims),y=s?P.size(s.dims):0;if(h!==f||s&&y!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${y}`);let _=[];for(let k=0;k<o.length;++k)k<l?_.push(o[k]):_.push(1);let b=he(f),w=["type","type"],T=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:t.epsilon}];s&&w.push("type");let $=r>1,v=r>2,S=k=>{let A=we(e[0].dataType),O=[z("x",e[0].dataType,e[0].dims,b),z("scale",a.dataType,a.dims,b)];s&&O.push(z("bias",s.dataType,s.dims,b)),O.push(U("output",e[0].dataType,d,b)),$&&O.push(U("mean_data_output",1,_)),v&&O.push(U("inv_std_output",1,_));let D=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(D).declareVariables(...O)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ho("f32",b)};
    var mean_square_vector = ${ho("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pt(A,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${je("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${je("mean_square_vector",b)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pt(A,b,"x[j + offset]")};
      let f32scale = ${Pt(A,b,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Pt(A,b,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:d,dataType:e[0].dataType}];return $&&I.push({dims:_,dataType:1}),v&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${r};${n}`,inputDependencies:w},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:T}),getShaderSource:S}},Ql=(e,t)=>{uy(e.inputs),e.compute(dy(e.inputs,t,e.outputCount))}});var ly,Xl,Jl=W(()=>{"use strict";se();nn();on();ly=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Xl=e=>{ly(e.inputs);let t=nt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(rn(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=P.size(e.inputs[0].dims.slice(0,-2)),s=P.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let d=e.inputs[0].reshape([1,a,n]),l=e.inputs[1].reshape([1,n,r]),p=[1,a,r],f=[d,l];e.compute(ir(f,{activation:""},t,p),{inputs:f})}else e.compute(ir(e.inputs,{activation:""},t))}}});var cy,py,my,ec,tc,rc=W(()=>{"use strict";re();se();Ae();ce();cy=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!P.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(P.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let f=e[3].dims,h=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(P.size(f)!==h)throw new Error("zeroPoints input size error.")}},py=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],a=t.k,s=t.n,d=r.slice(0,n-2),l=P.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=he(t.k),_=he(f),b=he(s),w=d.concat([o,s]),T=o>1&&s/b%2===0?2:1,$=P.size(w)/b/T,v=64,S=[],I=[l,o,a/y],k=P.convertShape(e[1].dims).slice();k.splice(-1,1,f/_),S.push(...L(I)),S.push(...L(k)),S.push(...L(e[2].dims)),e.length===4&&S.push(...L(P.convertShape(e[3].dims)));let A=[l,o,s/b];S.push(...L(A));let O=D=>{let R=I.length,F=z("a",e[0].dataType,R,y),Z=z("b",12,k.length,_),X=z("scales",e[2].dataType,e[2].dims.length),H=[F,Z,X],Y=e.length===4?z("zero_points",12,e[3].dims.length):void 0;Y&&H.push(Y);let xe=A.length,q=U("output",e[0].dataType,xe,b),Q=we(e[0].dataType),ne=(()=>{switch(y){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${y}-component is not supported.`)}})(),ee=()=>{let ve=`
          // reuse a data
            var input_offset = ${F.indicesToOffset(`${F.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ne};
            for (var j: u32 = 0; j < ${8/y}; j++) {
              a_data[j] = ${F.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let oe=0;oe<b*T;oe++)ve+=`
            b_value = ${_===1?`b${oe}_data`:`b${oe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ne}(${Array.from({length:4},(E,G)=>`${Q}(b_value_lower[${G}]), ${Q}(b_value_upper[${G}])`).join(", ")});
            b_dequantized_values = ${y===1?`${ne}(${Array.from({length:8},(E,G)=>`(b_quantized_values[${G}] - ${Y?`zero_point${oe}`:"zero_point"}) * scale${oe}`).join(", ")});`:`(b_quantized_values - ${ne}(${Array(8).fill(`${Y?`zero_point${oe}`:"zero_point"}`).join(",")})) * scale${oe};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(oe/b)}]${b>1?`[${oe%b}]`:""} += ${Array.from({length:8/y},(E,G)=>`${y===1?`a_data[${G}] * b_dequantized_values[${G}]`:`dot(a_data[${G}], b_dequantized_values[${G}])`}`).join(" + ")};
          `;return ve},me=()=>{let ve=`
            var col_index = col * ${b};
            ${Y?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Q}(8);`}
            `;for(let oe=0;oe<b*T;oe++)ve+=`
            let scale${oe} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${oe} = ${Q}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ve},_e=()=>{let ve=`col_index = col * ${b};`;for(let oe=0;oe<b*T;oe++)ve+=`
            let b${oe}_data = ${Z.getByIndices(`${Z.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ve+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ne};
            var b_dequantized_values: ${ne};`,ve};return`
        var<workgroup> workgroup_shared: array<${q.type.value}, ${T*v}>;
        ${D.declareVariables(...H,q)}
        ${D.mainStart([v,1,1])}
          let output_indices = ${q.offsetToIndices(`(global_idx / ${v}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/y};
            ${me()}
            for (var word: u32 = 0; word < ${f}; word += ${_}) {
              ${_e()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${ee()}
                word_offset += ${8/y};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${q.type.value} = ${q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${q.setByIndices(`${q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${y};${_};${b};${T};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:h}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:O}},my=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],a=t.k,s=t.n,d=r.slice(0,n-2),l=P.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=he(t.k),_=he(f),b=d.concat([o,s]),w=128,T=s%8===0?8:s%4===0?4:1,$=w/T,v=$*_*8,S=v/y,I=v/t.blockSize,k=P.size(b)/T,A=[],O=[l,o,a/y],D=P.convertShape(e[1].dims).slice();D.splice(-1,1,f/_),A.push(...L(O)),A.push(...L(D)),A.push(...L(e[2].dims)),e.length===4&&A.push(...L(P.convertShape(e[3].dims)));let R=[l,o,s];A.push(...L(R));let F=Z=>{let X=O.length,H=z("a",e[0].dataType,X,y),Y=z("b",12,D.length,_),xe=z("scales",e[2].dataType,e[2].dims.length),q=[H,Y,xe],Q=e.length===4?z("zero_points",12,e[3].dims.length):void 0;Q&&q.push(Q);let ne=R.length,ee=U("output",e[0].dataType,ne),me=we(e[0].dataType),_e=()=>{switch(y){case 1:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${y}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${ee.type.value}, ${$}>, ${T}>;
        ${Z.declareVariables(...q,ee)}
        ${Z.mainStart([$,T,1])}
          let output_indices = ${ee.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${Q?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${me}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${me}(8);`}
            let scale = ${xe.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/y};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${_e()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${me}>(${Array.from({length:4},(ve,oe)=>`${me}(b_value_lower[${oe}]), ${me}(b_value_upper[${oe}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${me}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ve,oe)=>`${`dot(a_data${oe}, b_dequantized_values[${oe}])`}`).join(" + ")};
              word_offset += ${8/y};
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${y};${_};${$};${T}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:k},programUniforms:A}),getShaderSource:F}},ec=(e,t)=>{cy(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(my(e.inputs,t)):e.compute(py(e.inputs,t))},tc=e=>te(e)});var fy,hy,gy,yy,by,_y,wy,vy,nc,oc=W(()=>{"use strict";re();se();ce();fy=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},hy=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},gy=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},yy=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape",o,t)})) {
                  k = i32(${j("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},by=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape",o,t)})) {
                  k -= i32(${j("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${j("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},_y=(e,t,r)=>{switch(r.mode){case 0:return hy(e,t,r.pads.length);case 1:return gy(e,t,r.pads.length);case 2:return yy(e,t,r.pads.length);case 3:return by(e,t,r.pads.length);default:throw new Error("Invalid mode")}},wy=(e,t)=>{let r=P.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=P.size(r),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...L(e[0].dims,r));let d=["rank"],l=p=>{let f=U("output",e[0].dataType,r.length),h=z("x",e[0].dataType,n.length),y=h.type.value,_=_y(f,n.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?y:"f32"}),`
            ${p.registerUniforms(b).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(r)/64)},programUniforms:a}),getShaderSource:l}},vy=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)a[Number(d[l])]=Number(r[l]),a[Number(d[l])+o]=Number(r[l+d.length])}else r.forEach((d,l)=>a[Number(l)]=Number(d));let s=[];return a.forEach(d=>s.push(d)),{mode:t.mode,value:n,pads:s}}else return t},nc=(e,t)=>{fy(e.inputs);let r=vy(e.inputs,t);e.compute(wy(e.inputs,r),{inputs:[0]})}});var dn,ic,ac,sc,uc,$y,xy,dc,lc,cc,pc,mc,fc,hc,gc,yc,bc,_c,wc,vc=W(()=>{"use strict";Fe();re();se();ce();dn=e=>{if($e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ic=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),d=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Et.adjustPoolAttributes(r,o,s,d,l,p);let f=Et.computePoolOutputShape(r,o,d,l,s,p,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:d,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:d,pads:p,cacheKey:t.cacheKey});let y=f.slice();return y.push(y.splice(1,1)[0]),[h,n?y:f]},ac=(e,t)=>{let r=t.format==="NHWC",n=P.size(e),o=P.size(t.kernelShape),a=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);a.push({type:12,data:d},{type:12,data:l},{type:12,data:p},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];y=!!(w+T),a.push({type:12,data:_},{type:12,data:b},{type:12,data:w},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,y]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=P.computeStrides(t.kernelShape);a.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[a,s,!!l,!1,!1]}},sc=(e,t,r,n,o,a,s,d,l,p,f,h)=>{let y=o.format==="NHWC",_=t.type.value,b=U("output",t.type.tensor,n);if(o.kernelShape.length<=2){let w="",T="",$="",v=r-(y?2:1);if(f?w=`
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
                }`,o.kernelShape.length===2){let I=r-(y?3:2);h?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
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
              ${T}
              ${w}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,T=o.pads.length,$="";return p?$=`
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
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${j("uniforms.pads","j - 2u",T)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},uc=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,$y=e=>`${uc(e)};${e.countIncludePad}`,xy=e=>`${uc(e)};${e.storageOrder};${e.dilations}`,dc=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),lc=(e,t,r,n)=>{let[o,a]=ic(t,n,r),s=z("x",t.dataType,t.dims.length),d=s.type.value,l="value += x_val;",p="";o.countIncludePad?p+=`value /= ${d}(uniforms.kernelSize);`:p+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[f,h,y,_,b]=ac(a,o);f.push(...L(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${y};${_};${b}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:f}),getShaderSource:T=>sc(T,s,t.dims.length,a.length,o,l,p,0,h,y,_,b)}},cc=e=>{let t=e.count_include_pad!==0,r=dc(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:$y(n)}},pc=(e,t)=>{dn(e.inputs),e.compute(lc("AveragePool",e.inputs[0],!1,t))},mc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},fc=e=>{let t=e.format;return{format:t,...mc,cacheKey:t}},hc=(e,t)=>{dn(e.inputs),e.compute(lc("GlobalAveragePool",e.inputs[0],!0,t))},gc=(e,t,r,n)=>{let[o,a]=ic(t,n,r),s=`
      value = max(x_val, value);
    `,d="",l=z("x",t.dataType,t.dims.length),p=["rank"],[f,h,y,_,b]=ac(a,o);return f.push(...L(t.dims,a)),{name:e,shaderCache:{hint:`${n.cacheKey};${y};${_};${b}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:f}),getShaderSource:w=>sc(w,l,t.dims.length,a.length,o,s,d,t.dataType===10?-65504:-1e5,h,y,_,b)}},yc=(e,t)=>{dn(e.inputs),e.compute(gc("MaxPool",e.inputs[0],!1,t))},bc=e=>{let t=e.storage_order,r=e.dilations,n=dc(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:xy(o)}},_c=e=>{let t=e.format;return{format:t,...mc,cacheKey:t}},wc=(e,t)=>{dn(e.inputs),e.compute(gc("GlobalMaxPool",e.inputs[0],!0,t))}});var Ty,Iy,$c,xc,Sc=W(()=>{"use strict";re();se();Ae();ce();Ty=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Iy=(e,t)=>{let r=P.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,a=e[0].dims,s=e[1].dataType,d=P.size(a),l=n===3||n===2,p=l?[Math.ceil(P.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,y=h?l?[Math.ceil(P.size(h.dims)/4)]:h.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,b=_===!1&&f.length===1,w=he(d),T=_&&(!l||w===4),$=T?w:1,v=T&&!l?w:1,S=z("input",l?12:n,p.length,v),I=z("scale",s,f.length),k=h?z("zero_point",l?12:n,y.length):void 0,A=U("output",s,a.length,$),O=[S,I];k&&O.push(k);let D=[p,f];h&&D.push(y);let R=[{type:12,data:d/$},{type:12,data:r},{type:12,data:t.blockSize},...L(...D,a)],F=Z=>{let X=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Z.registerUniforms(X).declareVariables(...O,A)}
      ${Z.mainStart()}
          ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${I.getByOffset("0")}`:b?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?_?l?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:b?l?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:R})}},$c=(e,t)=>{Ty(e.inputs,t),e.compute(Iy(e.inputs,t))},xc=e=>te({axis:e.axis,blockSize:e.blockSize})});var Cy,Ay,Tc,Ic=W(()=>{"use strict";Fe();re();ce();Cy=(e,t,r)=>{let n=e===t,o=e<t&&r<0,a=e>t&&r>0;if(n||o||a)throw new Error("Range these inputs' contents are invalid.")},Ay=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),a=[o],s=o,d=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...L(a)],l=p=>{let f=U("output",n,a.length),h=f.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(y).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},Tc=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),$e.webgpu.validateInputContent&&Cy(t,r,n),e.compute(Ay(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Ey,ky,Cc,Ac,Ec=W(()=>{"use strict";re();se();Ae();ce();Ey=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
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
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${o}bitcast<${n}>(oldValue) + (${r})${a}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${a}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ky=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,a=1,s=Math.ceil(P.size(n)/a),d=n[n.length-1],l=P.sizeFromDimension(r,d),p=[{type:12,data:s},{type:12,data:d},{type:12,data:l},...L(e[1].dims,e[2].dims,o)],f=h=>{let y=z("indices",e[1].dataType,e[1].dims.length),_=z("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?tu("output",e[0].dataType,o.length):U("output",e[0].dataType,o.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${P.size(n)};
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
    ${Ey(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f}},Cc=e=>te({reduction:e.reduction}),Ac=(e,t)=>{e.compute(ky(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Py,zy,Oy,kc,By,Dy,My,Ry,Uy,Ny,Vy,Wy,Pc,Ly,Gy,Hy,Fy,qy,zc,Oc,Bc=W(()=>{"use strict";re();se();Ae();ce();Py=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},zy=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,a)=>n[o]=e[a]),n},Oy=(e,t,r,n,o,a)=>{let[s,d,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(f=>n.push(f)),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Py(n,t),t.axes.length>0&&zy(n,t.axes,p).forEach((f,h)=>n[h]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==p&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},kc=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,By=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${kc("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${kc("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Dy=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",My=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((a,s)=>{n[a]=o[s],n[s+r]=o[t.length+s]}),n):o},Ry=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(a=>o.push(a)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((a,s)=>o[a]=r[s])}else r.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},Uy=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=n),r.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(n,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},Ny=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",n)};
        var roi_low = ${j("uniforms.roi","i",o)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Vy=(e,t,r,n,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",a)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",n.length)};
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
    }`,Wy=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Pc=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Ly=(e,t,r,n,o)=>{let[s,d,l,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${Pc(e,p,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${d}];
      var col:${f} = originalIndices[${l}];
      ${n?`if (row < 0 || row > (${r[d]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[d]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},Gy=(e,t,r,n,o,a,s,d,l,p)=>{let f=r.length===2,h=!0,[y,_]=f?[0,1]:h?[2,3]:[1,2],b=e.type.value,w=T=>{let $=T===y?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",T)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${n[T]}, ${r[T]}, ${a[T]}, ${a[T]} + ${r.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${l};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${b} = originalIdx + ${b}(i);
          if (${$} < 0 || ${$} >= ${r[T]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",T,`u32(${$})`)};
          data[i + 1] = ${T===y?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    `},Hy=(e,t,r,n,o)=>{let[s,d,l,p,f]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${Pc(e,f,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${d}];
      var height:${h} = originalIndices[${l}];
      var width:${h} = originalIndices[${p}];
      ${n?`if (depth < 0 || depth > (${r[d]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[p]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[d]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},Fy=(e,t,r,n,o,a)=>{let s=e.dims,d=My(a,t.axes,s.length),l=Ry(s,n,o,t.axes),p=n.slice();n.length===0&&(p=s.map((v,S)=>v===0?1:l[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Uy(s,p,t)));let f=U("output",e.dataType,l.length),h=z("input",e.dataType,s.length),y=P.size(l),_=s.length===l.length&&s.every((v,S)=>v===l[S]),b=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,T=h.type.value,$=v=>`
      ${_?"":`
      ${By(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Wy(h,s)};
              ${Dy(t.nearestMode,r,T)};
              ${Vy(h,f,s,l,p.length,d.length,b)};
              `;case"linear":return`
              ${Ny(f,s,l,p.length,d.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ly(h,f,s,b,w)}`;if(s.length===3||s.length===5)return`${Hy(h,f,s,b,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Gy(h,f,s,l,p,d,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${o.length>0?o:""}|${d.length>0?d:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:d},...L(s,l)]})}},qy=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},zc=(e,t)=>{let r=[],n=[],o=[],a=qy(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Oy(e.inputs,t,a,r,n,o),e.compute(Fy(e.inputs[0],t,a,r,n,o),{inputs:[0]})},Oc=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return te({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:d,mode:l,nearestMode:p})}});var Ky,jy,Dc,Mc=W(()=>{"use strict";re();se();ce();Ky=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},jy=(e,t,r,n)=>{let o=t.simplified,a=e[0].dims,s=P.size(a),d=a,l=s,p=a.slice(-1)[0],f=n?a.slice(0,-1).concat(1):[],h=!o&&e.length>3,y=e.length>4,_=n&&r>1,b=n&&r>2,w=r>3,T=64,$=he(p),v=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],S=k=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[z("x",e[0].dataType,e[0].dims,$),z("skip",e[1].dataType,e[1].dims,$),z("gamma",e[2].dataType,e[2].dims,$)];h&&O.push(z("beta",e[3].dataType,e[3].dims,$)),y&&O.push(z("bias",e[4].dataType,e[4].dims,$)),O.push(U("output",e[0].dataType,d,$)),_&&O.push(U("mean_output",1,f)),b&&O.push(U("inv_std_output",1,f)),w&&O.push(U("input_skip_bias_sum",e[0].dataType,d,$));let D=we(e[0].dataType),R=we(1,$);return`

      ${k.registerUniforms(A).declareVariables(...O)}
      var<workgroup> sum_shared : array<${R}, ${T}>;
      var<workgroup> sum_squared_shared : array<${R}, ${T}>;

      ${k.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":D+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Pt(D,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
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
        let mean = ${je("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${je("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${D}(mean)`}) *
            ${D}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:d,dataType:e[0].dataType}];return r>1&&I.push({dims:f,dataType:1}),r>2&&I.push({dims:f,dataType:1}),r>3&&I.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${b};${w}`,inputDependencies:e.map((k,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:v})}},Dc=(e,t)=>{Ky(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(jy(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Zy,ln,Qy,Rc,Yy,Xy,Uc,Nc,Vc=W(()=>{"use strict";re();se();Ae();ce();Zy=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},ln=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Qy=(e,t)=>{if(e.length>1){let r=ln(e,1),n=ln(e,2),o=ln(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),te({starts:r,ends:n,axes:o})}else return t},Rc=(e,t,r,n,o)=>{let a=e;return e<0&&(a+=r[n[t]]),o[t]<0?Math.max(0,Math.min(a,r[n[t]]-1)):Math.max(0,Math.min(a,r[n[t]]))},Yy=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",r.length)};
            let steps_i = ${j("uniforms.steps","i",r.length)};
            let signs_i = ${j("uniforms.signs","i",r.length)};
            let starts_i = ${j("uniforms.starts","i",r.length)};
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
      }`,Xy=(e,t)=>{let r=e[0].dims,n=P.size(r),o=t.axes.length>0?P.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=ln(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map(($,v)=>Rc($,v,r,o,a)),d=t.ends.map(($,v)=>Rc($,v,r,o,a));if(o.length!==s.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(s.splice($,0,0),d.splice($,0,r[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,v,S)=>{if($<0){let I=(d[v]-s[v])/$,k=s[v],A=k+I*a[v];s[v]=A,d[v]=k,S[v]=-$}});let p=r.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((d[$]-s[$])/a[$])});let f={dims:p,dataType:e[0].dataType},h=U("output",e[0].dataType,p.length),y=z("input",e[0].dataType,e[0].dims.length),_=P.size(p),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...L(e[0].dims,p)],T=$=>`
      ${$.registerUniforms(b).declareVariables(y,h)}
        ${Yy(y,h,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:w})}},Uc=(e,t)=>{Zy(e.inputs,t);let r=Qy(e.inputs,t);e.compute(Xy(e.inputs,r),{inputs:[0]})},Nc=e=>{let t=e.starts,r=e.ends,n=e.axes;return te({starts:t,ends:r,axes:n})}});var Jy,eb,Wc,Lc,Gc=W(()=>{"use strict";re();se();Ae();pt();ce();Jy=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},eb=(e,t)=>{let r=e.inputs[0],n=r.dims,o=P.size(n),a=n.length,s=P.normalizeAxis(t.axis,a),d=s<n.length-1,l,p=[];d?(p=Array.from({length:a},(O,D)=>D),p[s]=a-1,p[a-1]=s,l=e.compute(Oe(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let f=l.dims,h=f[a-1],y=o/h,_=he(h),b=h/_,w=64;y===1&&(w=256);let T=(O,D)=>D===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:D===2?`max(${O}.x, ${O}.y)`:D===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,$=z("x",l.dataType,l.dims,_),v=U("result",l.dataType,l.dims,_),S=$.type.value,I=we(l.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,k=O=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
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
        ${I}
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
          rowMaxShared = ${S}(${T("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
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
          rowSumShared = ${S}(${je("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:b}]}),getShaderSource:k},{inputs:[l],outputs:[d?-1:0]})[0];d&&e.compute(Oe(A,p),{inputs:[A]})},Wc=(e,t)=>{Jy(e.inputs),eb(e,t)},Lc=e=>te({axis:e.axis})});var Hc,tb,rb,nb,Fc,qc=W(()=>{"use strict";re();se();ce();Hc=e=>Array.from(e.getBigInt64Array(),Number),tb=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Hc(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},rb=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},nb=(e,t)=>{let r=e[0].dims,n=t??Hc(e[1]),o=rb(r,n),a=P.size(o),s=e[0].dataType,d=z("input",s,r.length),l=U("output",s,o.length),p=f=>`
      const inputShape = ${d.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(d,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...L(e[0].dims,o)]}),getShaderSource:p}},Fc=e=>{tb(e.inputs),e.compute(nb(e.inputs),{inputs:[0]})}});var ob,ib,Kc,jc=W(()=>{"use strict";re();se();ce();ob=(e,t,r,n,o)=>{let a=U("output_data",o,r.length,4),s=z("a_data",t[1].dataType,t[1].dims.length,4),d=z("b_data",t[2].dataType,t[2].dims.length,4),l=z("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,y,_)=>`select(${y}, ${h}, ${_})`;if(!n)p=a.setByOffset("global_idx",f(s.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(y,_,b="")=>{let w=`a_data[index_a${_}][component_a${_}]`,T=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
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
            ${y}[${_}] = ${b}(${f(w,T,$)});
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
      }`},ib=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,a=!(P.areEqual(t,r)&&P.areEqual(r,n)),s=t,d=P.size(t);if(a){let p=nt.calcShape(nt.calcShape(t,r,!1),n,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,d=P.size(s)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>ob(p,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...L(n,t,r,s)]})}},Kc=e=>{e.compute(ib(e.inputs))}});var Zc,Qc=W(()=>{"use strict";ku();Yr();Ou();Du();wd();Pd();Bd();Qd();nl();al();dl();fl();yl();_l();$l();Tl();Al();Pl();Bl();Rl();ql();Zl();Yl();Jl();rc();ko();oc();vc();Sc();Ic();Ec();Zr();Bc();Oo();Mc();Vc();Gc();zo();qc();pt();Jr();jc();Zc=new Map([["Abs",[Mu]],["Acos",[Ru]],["Acosh",[Uu]],["Add",[vd]],["ArgMax",[Eu,yo]],["ArgMin",[Au,yo]],["Asin",[Nu]],["Asinh",[Vu]],["Atan",[Wu]],["Atanh",[Lu]],["Attention",[Pu]],["AveragePool",[pc,cc]],["BatchNormalization",[zu]],["BiasAdd",[Bu]],["BiasSplitGelu",[_d]],["Cast",[Hu,Gu]],["Ceil",[qu]],["Clip",[Fu]],["Concat",[zd,Od]],["Conv",[Io,To]],["ConvTranspose",[rl,el]],["Cos",[Ku]],["Cosh",[ju]],["CumSum",[ol,il]],["DepthToSpace",[sl,ul]],["DequantizeLinear",[$c,xc]],["Div",[$d]],["Einsum",[pl,ml]],["Elu",[Zu,nr]],["Equal",[xd]],["Erf",[Qu]],["Exp",[Yu]],["Expand",[gl]],["FastGelu",[bl]],["Floor",[Xu]],["FusedConv",[Io,To]],["Gather",[vl,wl]],["GatherElements",[kl,El]],["GatherBlockQuantized",[Il,Cl]],["GatherND",[xl,Sl]],["Gelu",[Ju]],["Gemm",[Ol,zl]],["GlobalAveragePool",[hc,fc]],["GlobalMaxPool",[wc,_c]],["Greater",[Cd]],["GreaterOrEqual",[Ed]],["GridSample",[Dl,Ml]],["GroupQueryAttention",[Fl]],["HardSigmoid",[sd,ad]],["InstanceNormalization",[jl]],["LayerNormalization",[Ql]],["LeakyRelu",[ed,nr]],["Less",[Ad]],["LessOrEqual",[kd]],["Log",[gd]],["MatMul",[Xl]],["MatMulNBits",[ec,tc]],["MaxPool",[yc,bc]],["Mul",[Sd]],["MultiHeadAttention",[Vl,Nl]],["Neg",[rd]],["Not",[td]],["Pad",[nc]],["Pow",[Td]],["QuickGelu",[yd,nr]],["Range",[Tc]],["Reciprocal",[nd]],["ReduceMin",[$u]],["ReduceMean",[yu]],["ReduceMax",[vu]],["ReduceSum",[Su]],["ReduceProd",[xu]],["ReduceL1",[bu]],["ReduceL2",[_u]],["ReduceLogSum",[Iu]],["ReduceLogSumExp",[wu]],["ReduceSumSquare",[Tu]],["Relu",[od]],["Resize",[zc,Oc]],["RotaryEmbedding",[Gl]],["ScatterND",[Ac,Cc]],["Sigmoid",[id]],["Sin",[ud]],["Sinh",[dd]],["Slice",[Uc,Nc]],["SkipLayerNormalization",[Dc]],["Split",[Wl,Ll]],["Sqrt",[ld]],["Softmax",[Wc,Lc]],["Sub",[Id]],["Tan",[cd]],["Tanh",[md]],["ThresholdedRelu",[hd,nr]],["Tile",[Fc]],["Transpose",[ou,iu]],["Where",[Kc]]])});var cn,Yc=W(()=>{"use strict";Fe();rt();ce();cn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,a){Ve(t.programInfo.name);let s=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let f of r)l.push({binding:l.length,resource:{buffer:f.buffer}});for(let f of n)l.push({binding:l.length,resource:{buffer:f.buffer}});a&&l.push({binding:l.length,resource:a});let p=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}d.setPipeline(t.computePipeline),d.setBindGroup(0,p),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(t.programInfo.name)}dispose(){}build(t,r){Ve(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(h=>{n.features.has(h.feature)&&o.push(`enable ${h.extension};`)});let s=ru(r,this.backend.device.limits),d=t.getShaderSource(s),l=`${o.join(`
`)}
${s.additionalImplementations}
${d}`,p=n.createShaderModule({code:l,label:t.name});pe("verbose",()=>`[WebGPU] ${t.name} shader code: ${l}`);let f=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Me(t.name),{programInfo:t,computePipeline:f,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=a&&n<=a&&o<=a)return[r,n,o];let s=r*n*o,d=Math.ceil(Math.sqrt(s));if(d>a){if(d=Math.ceil(Math.cbrt(s)),d>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Xc={};Nt(Xc,{WebGpuBackend:()=>Do});var ab,sb,Bo,Do,Jc=W(()=>{"use strict";Fe();re();rt();no();eu();Qc();Yc();ab=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let a=e[n].dims.length;r.push(`${o};${a}`);break}case"dims":{let a=e[n].dims.join(",");r.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},sb=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${ab(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Bo=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Do=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},a=s=>r.features.has(s)&&n.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Bo(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Js(this),this.programManager=new cn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vr(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let a=n[o],s=a.kernelId,d=this.kernels.get(s),l=d.kernelType,p=d.kernelName,f=a.programName,h=a.inputTensorViews,y=a.outputTensorViews,_=r[o*2],b=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),T=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map($=>({dims:$.dims,dataType:tt($.dataType)})),outputsMetadata:y.map($=>({dims:$.dims,dataType:tt($.dataType)})),kernelId:s,kernelType:l,kernelName:p,programName:f,startTime:w,endTime:T});else{let $="";h.forEach((S,I)=>{$+=`input[${I}]: [${S.dims}] | ${tt(S.dataType)}, `});let v="";y.forEach((S,I)=>{v+=`output[${I}]: [${S.dims}] | ${tt(S.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${p}|${f}" ${$}${v}execution time: ${T-w} ns`)}$r("GPU",`${f}::${_}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Me()}run(t,r,n,o,a,s){Ve(t.name);let d=[];for(let S=0;S<r.length;++S){let I=r[S].data;if(I===0)continue;let k=this.gpuDataManager.get(I);if(!k)throw new Error(`no GPU data for input: ${I}`);d.push(k)}let{outputs:l,dispatchGroup:p,programUniforms:f}=t.getRunData(r),h=n.length===0?l.map((S,I)=>I):n;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let y=[],_=[];for(let S=0;S<l.length;++S){if(!Number.isInteger(h[S])||h[S]<-3||h[S]>=s)throw new Error(`Invalid output index: ${h[S]}`);if(h[S]===-3)continue;let I=h[S]===-1,k=h[S]===-2,A=I||k?a(l[S].dataType,l[S].dims):o(h[S],l[S].dataType,l[S].dims);if(y.push(A),A.data===0)continue;let O=this.gpuDataManager.get(A.data);if(!O)throw new Error(`no GPU data for output: ${A.data}`);if(I&&this.temporaryData.push(O),k){let D=this.kernelPersistentData.get(this.currentKernelId);D||(D=[],this.kernelPersistentData.set(this.currentKernelId,D)),D.push(O)}_.push(O)}if(d.length!==r.length||_.length!==y.length){if(_.length===0)return Me(t.name),y;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(f){let S=0,I=[];f.forEach(D=>{let R=typeof D.data=="number"?[D.data]:D.data;if(R.length===0)return;let F=D.type===10?2:4,Z,X;D.type===10?(X=R.length>4?16:R.length>2?8:R.length*F,Z=R.length>4?16:F*R.length):(X=R.length<=2?R.length*F:16,Z=16),S=Math.ceil(S/X)*X,I.push(S);let H=D.type===10?8:4;S+=R.length>4?Math.ceil(R.length/H)*Z:R.length*F});let k=16;S=Math.ceil(S/k)*k;let A=new ArrayBuffer(S);f.forEach((D,R)=>{let F=I[R],Z=typeof D.data=="number"?[D.data]:D.data;if(D.type===6)new Int32Array(A,F,Z.length).set(Z);else if(D.type===12)new Uint32Array(A,F,Z.length).set(Z);else if(D.type===10)new Uint16Array(A,F,Z.length).set(Z);else if(D.type===1)new Float32Array(A,F,Z.length).set(Z);else throw new Error(`Unsupported uniform type: ${tt(D.type)}`)});let O=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,A,0,S),this.gpuDataManager.release(O.id),b={offset:0,size:S,buffer:O.buffer}}let w=this.programManager.normalizeDispatchGroupSize(p),T=w[1]===1&&w[2]===1,$=sb(t,r,T),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,w),this.programManager.setArtifact($,v),pe("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),f&&v.uniformVariablesInfo){if(f.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${f.length} in program "${v.programInfo.name}".`);for(let S=0;S<f.length;S++){let I=f[S],k=I.type,A=typeof I.data=="number"?1:I.data.length,[O,D]=v.uniformVariablesInfo[S];if(k!==O||A!==D)throw new Error(`Uniform variable ${S} mismatch: expect type ${O} with size ${D}, got type ${k} with size ${A} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:y};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(v,d,_,w,b),Me(t.name),y}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let a=Zc.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],n]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),d(r,l[1]),0}catch(f){return n.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${f}`)),1}finally{p&&n.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${a}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,s);return a.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await co(this,t,r);return Lr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ep={};Nt(ep,{init:()=>ub});var sr,Mo,ub,tp=W(()=>{"use strict";re();rt();se();Zs();sr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(P.size(t)!==P.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Mo=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,a=n/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let d=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let l=[];for(let p=0;p<d;p++){let f=Number(t.getValue(o*a++,s)),h=Number(t.getValue(o*a++,"*")),y=Number(t.getValue(o*a++,s)),_=[];for(let b=0;b<y;b++)_.push(Number(t.getValue(o*a++,s)));l.push(new sr(t,f,h,_))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],a=(d,l,p)=>new sr(this.module,l,this.output(d,p),p),s=(d,l)=>{let p=wt(d,l);if(!p)throw new Error(`Unsupported data type: ${d}`);let f=p>0?this.backend.gpuDataManager.create(p).id:0;return new sr(this.module,d,f,l)};return this.backend.run(t,n,o,a,s,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+r.length)*o);this.module.setValue(s,r.length,a);for(let d=0;d<r.length;d++)this.module.setValue(s+o*(d+1),r[d],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},ub=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Jc(),Yt(Xc)).WebGpuBackend,s=new a;await s.initialize(r,n),o("webgpu",[s,d=>s.alloc(Number(d)),d=>s.free(d),(d,l,p,f=!1)=>{if(f)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(d)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(d),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(d)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(d>>>0),Number(d>>>0)+Number(p));s.upload(Number(l),h)}},async(d,l,p)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${d}, dataOffset=${l}, size=${p}`),await s.download(Number(d),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(d,l,p)=>s.createKernel(d,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),d=>s.releaseKernel(d),(d,l,p,f)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${d}, contextDataOffset=${l}`);let h=new Mo(t,s,Number(l));return s.computeKernel(Number(d),h,f)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Fr(r);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,d,l,p,f)=>a.ensureTensor(s,d,l,p,f),(s,d)=>{a.uploadTensor(s,d)},async(s,d)=>a.downloadTensor(s,d)])}}});var db,Cr,Ar,zt,lb,rp,Jt,Er,kr,np,Pr,zr,Or,jn=W(()=>{"use strict";Rs();Ns();re();_t();Dr();to();db=(e,t)=>{be()._OrtInit(e,t)!==0&&ge("Can't initialize onnxruntime.")},Cr=async e=>{db(e.wasm.numThreads,tr(e.logLevel))},Ar=async(e,t)=>{be().asyncInit?.();{let r=(tp(),Yt(ep)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:a}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",be(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",be(),e)}}},zt=new Map,lb=e=>{let t=be(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&ge("Can't get session input/output count.");let s=n===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+n,s))]}finally{t.stackRestore(r)}},rp=(e,t)=>{let r=be(),n=r.stackSave(),o=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&ge("Can't get session input/output metadata.");let l=Number(r.getValue(s,"*"));o=Number(r.getValue(s+a,"*"));let p=r.HEAP32[o/4];if(p===0)return[l,0];let f=r.HEAPU32[o/4+1],h=[];for(let y=0;y<f;y++){let _=Number(r.getValue(o+8+y*a,"*"));h.push(_!==0?r.UTF8ToString(_):Number(r.getValue(o+8+(y+f)*a,"*")))}return[l,p,h]}finally{r.stackRestore(n),o!==0&&r._OrtFree(o)}},Jt=e=>{let t=be(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Er=async(e,t)=>{let r,n,o=be();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Jt(e);let a=0,s=0,d=0,l=[],p=[],f=[];try{if([s,l]=await Us(t),t?.externalData&&o.mountExternalData){let I=[];for(let k of t.externalData){let A=typeof k=="string"?k:k.path;I.push(rr(typeof k=="string"?k:k.data).then(O=>{o.mountExternalData(A,O)}))}await Promise.all(I)}for(let I of t?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof I!="string"){let A=I,O=A?.context,D=A?.gpuDevice,R=A?.deviceType,F=A?.powerPreference;O?o.currentContext=O:D?o.currentContext=await o.webnnCreateMLContext(D):o.currentContext=await o.webnnCreateMLContext({deviceType:R,powerPreference:F})}else o.currentContext=await o.webnnCreateMLContext();break}a=await o._OrtCreateSession(r,n,s),o.webgpuOnCreateSession?.(a),a===0&&ge("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[h,y]=lb(a),_=!!t?.enableGraphCapture,b=[],w=[],T=[],$=[],v=[];for(let I=0;I<h;I++){let[k,A,O]=rp(a,I);k===0&&ge("Can't get an input name."),p.push(k);let D=o.UTF8ToString(k);b.push(D),T.push(A===0?{name:D,isTensor:!1}:{name:D,isTensor:!0,type:tt(A),shape:O})}for(let I=0;I<y;I++){let[k,A,O]=rp(a,I+h);k===0&&ge("Can't get an output name."),f.push(k);let D=o.UTF8ToString(k);w.push(D),$.push(A===0?{name:D,isTensor:!1}:{name:D,isTensor:!0,type:tt(A),shape:O});{if(_&&t?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let R=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[D]??"cpu";if(R!=="cpu"&&R!=="cpu-pinned"&&R!=="gpu-buffer"&&R!=="ml-tensor")throw new Error(`Not supported preferred output location: ${R}.`);if(_&&R!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${R}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(R)}}let S=null;return v.some(I=>I==="gpu-buffer"||I==="ml-tensor")&&(d=o._OrtCreateBinding(a),d===0&&ge("Can't create IO binding."),S={handle:d,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(I=>eo(I))}),zt.set(a,[a,p,f,S,_,!1]),[a,b,w,T,$]}catch(h){throw p.forEach(y=>o._OrtFree(y)),f.forEach(y=>o._OrtFree(y)),d!==0&&o._OrtReleaseBinding(d)!==0&&ge("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&ge("Can't release session."),h}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ge("Can't release session options."),l.forEach(h=>o._free(h)),o.unmountExternalData?.()}},kr=e=>{let t=be(),r=zt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,a,s,d]=r;s&&(d&&t._OrtClearBoundOutputs(s.handle)!==0&&ge("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ge("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n)!==0&&ge("Can't release session."),zt.delete(e)},np=async(e,t,r,n,o,a,s=!1)=>{if(!e){t.push(0);return}let d=be(),l=d.PTR_SIZE,p=e[0],f=e[1],h=e[3],y=h,_,b;if(p==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let $=e[2].gpuBuffer;b=wt(Vt(p),f);{let v=d.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=v(n,a,$,b)}}else if(h==="ml-tensor"){let $=e[2].mlTensor;b=wt(Vt(p),f);let v=d.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=v(n,$,Vt(p),f)}else{let $=e[2];if(Array.isArray($)){b=l*$.length,_=d._malloc(b),r.push(_);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);d.setValue(_+v*l,Le($[v],r),"*")}}else{let v=d.webnnIsGraphInput;if(p!=="string"&&v){let S=d.UTF8ToString(o);if(v(n,S)){let I=Vt(p);b=wt(I,f),y="ml-tensor";let k=d.webnnCreateTemporaryTensor,A=d.webnnUploadTensor;if(!k||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await k(n,I,f);A(O,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),_=O}else b=$.byteLength,_=d._malloc(b),r.push(_),d.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,b),_)}else b=$.byteLength,_=d._malloc(b),r.push(_),d.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,b),_)}}let w=d.stackSave(),T=d.stackAlloc(4*f.length);try{f.forEach((v,S)=>d.setValue(T+S*l,v,l===4?"i32":"i64"));let $=d._OrtCreateTensor(Vt(p),_,b,T,f.length,eo(y));$===0&&ge(`Can't create tensor for input/output. session=${n}, index=${a}.`),t.push($)}finally{d.stackRestore(w)}},Pr=async(e,t,r,n,o,a)=>{let s=be(),d=s.PTR_SIZE,l=zt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],f=l[1],h=l[2],y=l[3],_=l[4],b=l[5],w=t.length,T=n.length,$=0,v=[],S=[],I=[],k=[],A=s.stackSave(),O=s.stackAlloc(w*d),D=s.stackAlloc(w*d),R=s.stackAlloc(T*d),F=s.stackAlloc(T*d);try{[$,v]=Ms(a);for(let H=0;H<w;H++)await np(r[H],S,k,e,f[t[H]],t[H],_);for(let H=0;H<T;H++)await np(o[H],I,k,e,h[n[H]],w+n[H],_);for(let H=0;H<w;H++)s.setValue(O+H*d,S[H],"*"),s.setValue(D+H*d,f[t[H]],"*");for(let H=0;H<T;H++)s.setValue(R+H*d,I[H],"*"),s.setValue(F+H*d,h[n[H]],"*");if(y&&!b){let{handle:H,outputPreferredLocations:Y,outputPreferredLocationsEncoded:xe}=y;if(f.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${f.length}).`);for(let q=0;q<w;q++){let Q=t[q];await s._OrtBindInput(H,f[Q],S[q])!==0&&ge(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<T;q++){let Q=n[q];o[q]?.[3]?s._OrtBindOutput(H,h[Q],I[q],0)!==0&&ge(`Can't bind pre-allocated output[${q}] for session=${e}.`):s._OrtBindOutput(H,h[Q],0,xe[Q])!==0&&ge(`Can't bind output[${q}] to ${Y[q]} for session=${e}.`)}zt.set(e,[p,f,h,y,_,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let Z;y?Z=await s._OrtRunWithBinding(p,y.handle,T,R,$):Z=await s._OrtRun(p,D,O,w,F,T,R,$),Z!==0&&ge("failed to call OrtRun().");let X=[];for(let H=0;H<T;H++){let Y=Number(s.getValue(R+H*d,"*"));if(Y===I[H]){X.push(o[H]);continue}let xe=s.stackSave(),q=s.stackAlloc(4*d),Q=!1,ne,ee=0;try{s._OrtGetTensorData(Y,q,q+d,q+2*d,q+3*d)!==0&&ge(`Can't access output tensor data on index ${H}.`);let _e=d===4?"i32":"i64",ve=Number(s.getValue(q,_e));ee=s.getValue(q+d,"*");let oe=s.getValue(q+d*2,"*"),E=Number(s.getValue(q+d*3,_e)),G=[];for(let Te=0;Te<E;Te++)G.push(Number(s.getValue(oe+Te*d,_e)));s._OrtFree(oe)!==0&&ge("Can't free memory for tensor dims.");let fe=G.reduce((Te,Ie)=>Te*Ie,1);ne=tt(ve);let De=y?.outputPreferredLocations[n[H]];if(ne==="string"){if(De==="gpu-buffer"||De==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let Ie=0;Ie<fe;Ie++){let Pe=s.getValue(ee+Ie*d,"*"),xt=s.getValue(ee+(Ie+1)*d,"*"),Bt=Ie===fe-1?void 0:xt-Pe;Te.push(s.UTF8ToString(Pe,Bt))}X.push([ne,G,Te,"cpu"])}else if(De==="gpu-buffer"&&fe>0){let Te=s.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ie=Te(ee),Pe=wt(ve,fe);if(Pe===void 0||!Ur(ne))throw new Error(`Unsupported data type: ${ne}`);Q=!0,X.push([ne,G,{gpuBuffer:Ie,download:s.jsepCreateDownloader(Ie,Pe,ne),dispose:()=>{s._OrtReleaseTensor(Y)!==0&&ge("Can't release tensor.")}},"gpu-buffer"])}else if(De==="ml-tensor"&&fe>0){let Te=s.webnnEnsureTensor,Ie=s.webnnIsInt64Supported;if(!Te||!Ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(ve,fe)===void 0||!Nr(ne))throw new Error(`Unsupported data type: ${ne}`);if(ne==="int64"&&!Ie(e))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let xt=await Te(e,ee,ve,G,!1);Q=!0,X.push([ne,G,{mlTensor:xt,download:s.webnnCreateMLTensorDownloader(ee,ne),dispose:()=>{s.webnnReleaseTensorId(ee),s._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let Te=Rr(ne),Ie=new Te(fe);new Uint8Array(Ie.buffer,Ie.byteOffset,Ie.byteLength).set(s.HEAPU8.subarray(ee,ee+Ie.byteLength)),X.push([ne,G,Ie,"cpu"])}}finally{s.stackRestore(xe),ne==="string"&&ee&&s._free(ee),Q||s._OrtReleaseTensor(Y),s.webnnOnRunEnd?.(p)}}return y&&!_&&(s._OrtClearBoundOutputs(y.handle)!==0&&ge("Can't clear bound outputs."),zt.set(e,[p,f,h,y,_,!1])),X}finally{s.stackRestore(A),S.forEach(Z=>s._OrtReleaseTensor(Z)),I.forEach(Z=>s._OrtReleaseTensor(Z)),k.forEach(Z=>s._free(Z)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(Z=>s._free(Z))}},zr=e=>{let t=be(),r=zt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&ge("Can't get an profile file name."),t._OrtFree(o)},Or=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Ot,qe,ur,mn,fn,pn,Ro,Uo,Ht,Ft,pb,op,ip,ap,sp,up,dp,lp,No=W(()=>{"use strict";Fe();jn();_t();Tr();Ot=()=>!!$e.wasm.proxy&&typeof document<"u",ur=!1,mn=!1,fn=!1,Uo=new Map,Ht=(e,t)=>{let r=Uo.get(e);r?r.push(t):Uo.set(e,[t])},Ft=()=>{if(ur||!mn||fn||!qe)throw new Error("worker not ready")},pb=e=>{switch(e.data.type){case"init-wasm":ur=!1,e.data.err?(fn=!0,Ro[1](e.data.err)):(mn=!0,Ro[0]()),pn&&(URL.revokeObjectURL(pn),pn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Uo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},op=async()=>{if(!mn){if(ur)throw new Error("multiple calls to 'initWasm()' detected.");if(fn)throw new Error("previous call to 'initWasm()' failed.");if(ur=!0,Ot())return new Promise((e,t)=>{qe?.terminate(),Os().then(([r,n])=>{try{qe=n,qe.onerror=a=>t(a),qe.onmessage=pb,Ro=[e,t];let o={type:"init-wasm",in:$e};!o.in.wasm.wasmPaths&&(r||Yn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),qe.postMessage(o),pn=r}catch(o){t(o)}},t)});try{await Ir($e.wasm),await Cr($e),mn=!0}catch(e){throw fn=!0,e}finally{ur=!1}}},ip=async e=>{if(Ot())return Ft(),new Promise((t,r)=>{Ht("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:$e}};qe.postMessage(n)});await Ar($e,e)},ap=async e=>Ot()?(Ft(),new Promise((t,r)=>{Ht("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};qe.postMessage(n,[e.buffer])})):Jt(e),sp=async(e,t)=>{if(Ot()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ft(),new Promise((r,n)=>{Ht("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(o,a)})}else return Er(e,t)},up=async e=>{if(Ot())return Ft(),new Promise((t,r)=>{Ht("release",[t,r]);let n={type:"release",in:e};qe.postMessage(n)});kr(e)},dp=async(e,t,r,n,o,a)=>{if(Ot()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ft(),new Promise((s,d)=>{Ht("run",[s,d]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:a}};qe.postMessage(p,Or(l))})}else return Pr(e,t,r,n,o,a)},lp=async e=>{if(Ot())return Ft(),new Promise((t,r)=>{Ht("end-profiling",[t,r]);let n={type:"end-profiling",in:e};qe.postMessage(n)});zr(e)}});var cp,mb,hn,pp=W(()=>{"use strict";Fe();No();re();Sr();to();cp=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},mb=e=>{switch(e[3]){case"cpu":return new Ke(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Ke.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Nr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Ke.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},hn=class{async fetchModelAndCopyToWasmMemory(t){return ap(await rr(t))}async loadModel(t,r){Ve();let n;typeof t=="string"?n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await sp(n,r),Me()}async dispose(){return up(this.sessionId)}async run(t,r,n){Ve();let o=[],a=[];Object.entries(t).forEach(y=>{let _=y[0],b=y[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(b),a.push(w)});let s=[],d=[];Object.entries(r).forEach(y=>{let _=y[0],b=y[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(b),d.push(w)});let l=o.map((y,_)=>cp(y,()=>`input "${this.inputNames[a[_]]}"`)),p=s.map((y,_)=>y?cp(y,()=>`output "${this.outputNames[d[_]]}"`):null),f=await dp(this.sessionId,a,l,d,p,n),h={};for(let y=0;y<f.length;y++)h[this.outputNames[d[y]]]=s[y]??mb(f[y]);return Me(),h}startProfiling(){}endProfiling(){lp(this.sessionId)}}});var fp={};Nt(fp,{OnnxruntimeWebAssemblyBackend:()=>gn,initializeFlags:()=>mp,wasmBackend:()=>fb});var mp,gn,fb,hp=W(()=>{"use strict";Fe();No();pp();mp=()=>{if((typeof $e.wasm.initTimeout!="number"||$e.wasm.initTimeout<0)&&($e.wasm.initTimeout=0),$e.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof $e.wasm.proxy!="boolean"&&($e.wasm.proxy=!1),typeof $e.wasm.trace!="boolean"&&($e.wasm.trace=!1),typeof $e.wasm.numThreads!="number"||!Number.isInteger($e.wasm.numThreads)||$e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)$e.wasm.numThreads=1;else{let e=typeof navigator>"u"?Wn("node:os").cpus().length:navigator.hardwareConcurrency;$e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},gn=class{async init(t){mp(),await op(),await ip(t)}async createInferenceSessionHandler(t,r){let n=new hn;return await n.loadModel(t,r),n}},fb=new gn});Fe();Fe();Fe();var ws="1.22.0-dev.20250325-afaf4a5e63";var vT=Kn;{let e=(hp(),Yt(fp)).wasmBackend;It("webgpu",e,5),It("webnn",e,5),It("cpu",e,10),It("wasm",e,10)}Object.defineProperty($e.versions,"web",{value:ws,enumerable:!0});export{Vf as InferenceSession,$r as TRACE,Ve as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,Ke as Tensor,vT as default,$e as env,It as registerBackend};
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
