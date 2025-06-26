/*!
 * ONNX Runtime Web v1.22.0-dev.20250308-989d4177ed
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Nn=Object.defineProperty;var Pf=Object.getOwnPropertyDescriptor;var zf=Object.getOwnPropertyNames;var Of=Object.prototype.hasOwnProperty;var Vn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var V=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ut=(e,t)=>{for(var n in t)Nn(e,n,{get:t[n],enumerable:!0})},Bf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of zf(t))!Of.call(e,o)&&o!==n&&Nn(e,o,{get:()=>t[o],enumerable:!(r=Pf(t,o))||r.enumerable});return e};var Yt=e=>Bf(Nn({},"__esModule",{value:!0}),e);var wr,St,Tt,Df,Ga,Wn=V(()=>{"use strict";wr=new Map,St=[],Tt=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=wr.get(e);if(r===void 0)wr.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=St.indexOf(e);o!==-1&&St.splice(o,1);for(let a=0;a<St.length;a++)if(wr.get(St[a]).priority<=n){St.splice(a,0,e);return}St.push(e)}return}throw new TypeError("not a valid backend")},Df=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ga=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?St:n,o,a=[],s=new Set;for(let l of r){let p=await Df(l);typeof p=="string"?a.push({name:l,err:p}):(o||(o=p),o===p&&s.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let d=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,p)=>p==="executionProviders"?d:Reflect.get(l,p)})]}});var Ha=V(()=>{"use strict";Wn()});var Fa,qa=V(()=>{"use strict";Fa="1.22.0-dev.20250306-aafa8d170a"});var Ka,Ne,Ln=V(()=>{"use strict";qa();Ka="warning",Ne={wasm:{},webgl:{},webgpu:{},versions:{common:Fa},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ka=e}},get logLevel(){return Ka}};Object.defineProperty(Ne,"logLevel",{enumerable:!0})});var $e,ja=V(()=>{"use strict";Ln();$e=Ne});var Za,Qa,Ya=V(()=>{"use strict";Za=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,p;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let f=a*o,h=0,y=f,_=f*2,b=-1;s==="RGBA"?(h=0,y=f,_=f*2,b=f*3):s==="RGB"?(h=0,y=f,_=f*2):s==="RBG"&&(h=0,_=f,y=f*2);for(let w=0;w<a;w++)for(let S=0;S<o;S++){let x=(e.data[h++]-p[0])*l[0],v=(e.data[y++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],C=b===-1?255:(e.data[b++]-p[3])*l[3];r.fillStyle="rgba("+x+","+v+","+T+","+C+")",r.fillRect(S,w,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Qa=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let h=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,b=1,w=2,S=3,x=0,v=h,T=h*2,C=-1;d==="RGBA"?(x=0,v=h,T=h*2,C=h*3):d==="RGB"?(x=0,v=h,T=h*2):d==="RBG"&&(x=0,T=h,v=h*2),r=n.createImageData(o,a);for(let k=0;k<a*o;_+=y,b+=y,w+=y,S+=y,k++)r.data[_]=(e.data[x++]-f[0])*p[0],r.data[b]=(e.data[v++]-f[1])*p[1],r.data[w]=(e.data[T++]-f[2])*p[2],r.data[S]=C===-1?255:(e.data[C++]-f[3])*p[3]}else throw new Error("Can not access image data");return r}});var Gn,Xa,Ja,es,ts,rs,ns=V(()=>{"use strict";vr();Gn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=n*r,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,y=0,_=1,b=2,w=3,S=0,x=p,v=p*2,T=-1;d==="RGB"&&(h=3,y=0,_=1,b=2,w=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,v=p,x=p*2):l==="BGR"&&(v=0,x=p,S=p*2);for(let k=0;k<p;k++,y+=h,b+=h,_+=h,w+=h)f[S++]=(e[y]+s[0])/a[0],f[x++]=(e[_]+s[1])/a[1],f[v++]=(e[b]+s[2])/a[2],T!==-1&&w!==-1&&(f[T++]=(e[w]+s[3])/a[3]);return l==="RGBA"?new Be("float32",f,[1,4,n,r]):new Be("float32",f,[1,3,n,r])},Xa=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=y,d.width=_}else d.tensorFormat="RGBA",d.height=y,d.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(r){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=f,d.width=h,t!==void 0){let y=l();y.width=h,y.height=f;let _=p(y);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;return h.drawImage(e,0,0,_,y),s=h.getImageData(0,0,_,y).data,d.height=y,d.width=_,Gn(s,d)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,h)=>{let y=l(),_=p(y);if(!e||!_)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{y.width=b.width,y.height=b.height,_.drawImage(b,0,0,y.width,y.height);let w=_.getImageData(0,0,y.width,y.height);d.height=y.height,d.width=y.width,f(Gn(w.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Gn(s,d);throw new Error("Input data provided is not supported - aborted tensor creation")},Ja=(e,t)=>{let{width:n,height:r,download:o,dispose:a}=t,s=[1,r,n,4];return new Be({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},es=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new Be({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:a})},ts=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new Be({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:a})},rs=(e,t,n)=>new Be({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var Ct,Xt,os,is,as=V(()=>{"use strict";Ct=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Xt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),os=!1,is=()=>{if(!os){os=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(Ct.set("int64",BigInt64Array),Xt.set(BigInt64Array,"int64")),t&&(Ct.set("uint64",BigUint64Array),Xt.set(BigUint64Array,"uint64")),r?(Ct.set("float16",n),Xt.set(n,"float16")):Ct.set("float16",Uint16Array)}}});var ss,us,ds=V(()=>{"use strict";vr();ss=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},us=(e,t)=>{switch(e.location){case"cpu":return new Be(e.type,e.data,t);case"cpu-pinned":return new Be({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Be({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Be({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Be,vr=V(()=>{"use strict";Ya();ns();as();ds();Be=class{constructor(t,n,r){is();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let d=Ct.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");d=n}else{let p=Ct.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?d=p.from(n,BigInt):d=p.from(n)}else if(n instanceof p)d=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&n instanceof Uint16Array&&p!==Uint16Array)d=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(l=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",d=t;else if(p==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let p=Xt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");a=l,this.cpuData=d,this.dataLocation="cpu"}let s=ss(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,n){return Xa(t,n)}static fromTexture(t,n){return Ja(t,n)}static fromGpuBuffer(t,n){return es(t,n)}static fromMLTensor(t,n){return ts(t,n)}static fromPinnedBuffer(t,n,r){return rs(t,n,r)}toDataURL(t){return Za(this,t)}toImageData(t){return Qa(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return us(this,t)}}});var Ke,Hn=V(()=>{"use strict";vr();Ke=Be});var $r,ls,Ve,Me,Fn=V(()=>{"use strict";Ln();$r=(e,t)=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||console.timeStamp(`${e}::ORT::${t}`)},ls=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),$r("CPU",a);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},Ve=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||ls("BEGIN",e)},Me=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||ls("END",e)}});var xr,cs=V(()=>{"use strict";Wn();Hn();Fn();xr=class e{constructor(t){this.handler=t}async run(t,n,r){Ve();let o={},a={};if(typeof t!="object"||t===null||t instanceof Ke||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Ke)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of n){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let y=n[h];(y===null||y instanceof Ke)&&(p=!0,s=!1,o[h]=y)}if(p){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)o[p]=null;let d=await this.handler.run(t,o,a),l={};for(let p in d)if(Object.hasOwnProperty.call(d,p)){let f=d[p];f instanceof Ke?l[p]=f:l[p]=new Ke(f.type,f.data,f.dims)}return Me(),l}async release(){return this.handler.dispose()}static async create(t,n,r,o){Ve();let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,y=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(y=t.byteLength-h,typeof r=="number"){if(y=r,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||h+y>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,h,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await Ga(s),p=await d.createInferenceSessionHandler(a,l);return Me(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Mf,ps=V(()=>{"use strict";cs();Mf=xr});var ms=V(()=>{"use strict"});var fs=V(()=>{"use strict"});var hs=V(()=>{"use strict"});var gs=V(()=>{"use strict"});var qn={};Ut(qn,{InferenceSession:()=>Mf,TRACE:()=>$r,TRACE_FUNC_BEGIN:()=>Ve,TRACE_FUNC_END:()=>Me,Tensor:()=>Ke,env:()=>$e,registerBackend:()=>Tt});var Fe=V(()=>{"use strict";Ha();ja();ps();Hn();ms();fs();Fn();hs();gs()});var Sr=V(()=>{"use strict"});var ws={};Ut(ws,{default:()=>Rf});var bs,_s,Rf,vs=V(()=>{"use strict";Kn();bt();Tr();bs="ort-wasm-proxy-worker",_s=globalThis.self?.name===bs;_s&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Cr(n.wasm).then(()=>{Ir(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;Ar(o,r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:r}=n,o=Jt(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;Er(r,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":kr(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:a,outputIndices:s,options:d}=n;Pr(r,o,a,s,new Array(s.length).fill(null),d).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Or([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":zr(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Rf=_s?null:e=>new Worker(e??We,{type:"module",name:bs})});var xs={};Ut(xs,{default:()=>Uf});var jn,$s,Uf,Nf,Ss=V(()=>{"use strict";$s=(jn=import.meta.url,async function(e={}){var t,n,r=e,o=new Promise((i,u)=>{t=i,n=u}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",d=s&&self.name?.startsWith("em-pthread");r.mountExternalData=(i,u)=>{i.startsWith("./")&&(i=i.substring(2)),(r.Bd||(r.Bd=new Map)).set(i,u)},r.unmountExternalData=()=>{delete r.Bd};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,le:!0}).buffer.constructor;let p=i=>async(...u)=>{try{if(r.Cd)throw Error("Session already started");let c=r.Cd={be:u[0],errors:[]},m=await i(...u);if(r.Cd!==c)throw Error("Session mismatch");r.Dd?.flush();let g=c.errors;if(0<g.length){let $=await Promise.all(g);if($=$.filter(I=>I),0<$.length)throw Error($.join(`
`))}return m}finally{r.Cd=null}};r.jsepInit=(i,u)=>{if(i==="webgpu"){[r.Dd,r.Rd,r.Vd,r.Hd,r.Ud,r.hc,r.Wd,r.Zd,r.Sd,r.Td,r.Xd]=u;let c=r.Dd;r.jsepRegisterBuffer=(m,g,$,I)=>c.registerBuffer(m,g,$,I),r.jsepGetBuffer=m=>c.getBuffer(m),r.jsepCreateDownloader=(m,g,$)=>c.createDownloader(m,g,$),r.jsepOnCreateSession=m=>{c.onCreateSession(m)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepOnRunStart=m=>c.onRunStart(m),r.$d=(m,g)=>{c.upload(m,g)}}else if(i==="webnn"){[r.Dd,r.Yd,r.Id,r.jsepEnsureTensor,r.Jd,r.jsepDownloadTensor]=u,r.jsepReleaseTensorId=r.Id,r.jsepUploadTensor=r.Jd;let c=r.Dd;r.jsepOnRunStart=m=>c.onRunStart(m),r.jsepOnRunEnd=c.onRunEnd.bind(c),r.jsepRegisterMLContext=(m,g)=>{c.registerMLContext(m,g)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepCreateMLTensorDownloader=(m,g)=>c.createMLTensorDownloader(m,g),r.jsepRegisterMLTensor=(m,g,$,I)=>c.registerMLTensor(m,g,$,I),r.jsepCreateMLContext=m=>c.createMLContext(m),r.jsepRegisterMLConstant=(m,g,$,I,O)=>c.registerMLConstant(m,g,$,I,O,r.Bd),r.jsepRegisterGraphInput=c.registerGraphInput.bind(c),r.jsepIsGraphInput=c.isGraphInput.bind(c),r.jsepCreateTemporaryTensor=c.createTemporaryTensor.bind(c)}};let f=()=>{let i=(u,c,m)=>(...g)=>{let $=Je,I=c?.();g=u(...g);let O=c?.();return I!==O&&(u=O,m(I),c=m=null),Je!=$?new Promise((M,N)=>{Pn={resolve:M,reject:N}}):g};(()=>{for(let u of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[u]=i(r[u],()=>r[u],c=>r[u]=c)})(),p!==void 0&&(r._OrtRun=p(r._OrtRun),r._OrtRunWithBinding=p(r._OrtRunWithBinding)),f=void 0};r.asyncInit=()=>{f?.()};var h,y,_=Object.assign({},r),b=(i,u)=>{throw u},w="";(a||s)&&(s?w=self.location.href:typeof document<"u"&&document.currentScript&&(w=document.currentScript.src),jn&&(w=jn),w=w.startsWith("blob:")?"":w.slice(0,w.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(y=i=>{var u=new XMLHttpRequest;return u.open("GET",i,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),h=async i=>{if(ee(i))return new Promise((c,m)=>{var g=new XMLHttpRequest;g.open("GET",i,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?c(g.response):m(g.status)},g.onerror=m,g.send(null)});var u=await fetch(i,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var S=console.log.bind(console),x=console.error.bind(console),v=S,T=x;Object.assign(r,_),_=null;var C,k,E,B,D,W,F,Z,X,H,Y,xe,q,Q=r.wasmBinary,ne=!1,ee=i=>i.startsWith("file://");function me(){return C.buffer!=B.buffer&&ke(),B}function be(){return C.buffer!=B.buffer&&ke(),D}function ve(){return C.buffer!=B.buffer&&ke(),W}function oe(){return C.buffer!=B.buffer&&ke(),F}function A(){return C.buffer!=B.buffer&&ke(),Z}function G(){return C.buffer!=B.buffer&&ke(),X}function fe(){return C.buffer!=B.buffer&&ke(),H}function De(){return C.buffer!=B.buffer&&ke(),q}if(d){let i=function(u){try{var c=u.data,m=c.yd;if(m==="load"){let g=[];self.onmessage=$=>g.push($),self.startWorker=()=>{postMessage({yd:"loaded"});for(let $ of g)i($);self.onmessage=i};for(let $ of c.Od)r[$]&&!r[$].proxy||(r[$]=(...I)=>{postMessage({yd:"callHandler",Nd:$,args:I})},$=="print"&&(v=r[$]),$=="printErr"&&(T=r[$]));C=c.he,ke(),Te(c.ie)}else if(m==="run"){fp(c.xd),Dn(c.xd,0,0,1,0,0),Ho(),En(c.xd),Ae||(Ui(),Ae=!0);try{hp(c.de,c.Fd)}catch(g){if(g!="unwind")throw g}}else c.target!=="setimmediate"&&(m==="checkMailbox"?Ae&&lr():m&&(T(`worker: received unknown command ${m}`),T(c)))}catch(g){throw Ni(),g}};var cb=i,Te,Ae=!1;T=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:br()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=i}function ke(){var i=C.buffer;r.HEAP8=B=new Int8Array(i),r.HEAP16=W=new Int16Array(i),r.HEAPU8=D=new Uint8Array(i),r.HEAPU16=F=new Uint16Array(i),r.HEAP32=Z=new Int32Array(i),r.HEAPU32=X=new Uint32Array(i),r.HEAPF32=H=new Float32Array(i),r.HEAPF64=q=new Float64Array(i),r.HEAP64=Y=new BigInt64Array(i),r.HEAPU64=xe=new BigUint64Array(i)}function Ft(){d?startWorker(r):R.Bb()}d||(C=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ke());var Ot,Bt=0,qt=null;function Ro(){if(--Bt==0&&qt){var i=qt;qt=null,i()}}function ut(i){throw T(i="Aborted("+i+")"),ne=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),n(i),i}function Uo(){return{a:{Ta:mp,Va:pp,W:gp,la:yp,b:_p,u:wp,R:vp,Za:$p,d:xp,pb:jo,g:bp,T:Yo,Ga:Xo,lb:ei,nb:ti,Ha:ri,Ea:ni,wb:oi,Da:ii,pa:ai,mb:si,jb:ui,Fa:di,kb:li,Ma:Sp,za:Cp,eb:Ip,cb:Ep,ya:Pp,V:zp,N:Op,db:Bp,ma:Wp,fb:Lp,zb:Gp,hb:Hp,qb:Fp,ab:qp,Aa:Kp,yb:En,Ja:jp,S:Zp,Wa:Qp,$:Jp,H:em,E:rm,l:Cn,F:nm,B:am,X:sm,J:um,v:dm,O:lm,D:cm,t:pm,A:mm,z:fm,w:hm,r:gm,tb:ym,ub:bm,vb:_m,rb:Si,sb:Ti,bb:Ci,Oa:vm,La:Sm,y:Tm,ja:Cm,Ba:Im,Ka:$m,qa:Am,Ia:Em,ib:km,U:wm,fa:Pm,Sa:zm,gb:Om,Qa:Bm,Pa:Dm,Ab:ki,Ca:Pi,ob:wn,aa:zi,oa:Oi,xb:Bi,na:Di,$a:df,ia:$f,sa:If,ga:sf,da:hf,ua:Tf,p:of,e:Lm,c:Vm,ea:mf,f:Gm,n:Fm,k:ef,Y:Km,ka:tf,j:af,wa:pf,Ra:kf,ca:wf,Ua:Ef,P:ff,K:Zm,_:_f,Q:uf,Z:xf,x:jm,m:Wm,va:bf,i:Nm,h:qm,ra:Af,ta:Cf,o:Hm,q:Qm,s:Xm,I:Jm,C:nf,L:rf,xa:cf,_a:lf,G:vf,Ya:gf,ba:Sf,M:Ym,Xa:yf,ha:Rm,a:C,Na:_n}}}var gn={1321266:()=>typeof wasmOffsetConverter<"u",1321323:(i,u,c,m,g)=>{if(r===void 0||!r.Bd)return 1;if((i=Ee(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=r.Bd.get(i)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),m=Number(m>>>0),u+c>i.byteLength)return 3;try{let $=i.subarray(u,u+c);switch(g){case 0:be().set($,m>>>0);break;case 1:r.je?r.je(m,$):r.$d(m,$);break;default:return 4}return 0}catch{return 4}},1322147:(i,u,c)=>{r.Jd(i,be().subarray(u>>>0,u+c>>>0))},1322210:()=>r.Yd(),1322251:i=>{r.Id(i)},1322287:()=>{r.Sd()},1322318:()=>{r.Td()},1322347:()=>{r.Xd()},1322372:i=>r.Rd(i),1322405:i=>r.Vd(i),1322437:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c),!0)},1322500:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c))},1322557:i=>{r.hc("Abs",i,void 0)},1322608:i=>{r.hc("Neg",i,void 0)},1322659:i=>{r.hc("Floor",i,void 0)},1322712:i=>{r.hc("Ceil",i,void 0)},1322764:i=>{r.hc("Reciprocal",i,void 0)},1322822:i=>{r.hc("Sqrt",i,void 0)},1322874:i=>{r.hc("Exp",i,void 0)},1322925:i=>{r.hc("Erf",i,void 0)},1322976:i=>{r.hc("Sigmoid",i,void 0)},1323031:(i,u,c)=>{r.hc("HardSigmoid",i,{alpha:u,beta:c})},1323110:i=>{r.hc("Log",i,void 0)},1323161:i=>{r.hc("Sin",i,void 0)},1323212:i=>{r.hc("Cos",i,void 0)},1323263:i=>{r.hc("Tan",i,void 0)},1323314:i=>{r.hc("Asin",i,void 0)},1323366:i=>{r.hc("Acos",i,void 0)},1323418:i=>{r.hc("Atan",i,void 0)},1323470:i=>{r.hc("Sinh",i,void 0)},1323522:i=>{r.hc("Cosh",i,void 0)},1323574:i=>{r.hc("Asinh",i,void 0)},1323627:i=>{r.hc("Acosh",i,void 0)},1323680:i=>{r.hc("Atanh",i,void 0)},1323733:i=>{r.hc("Tanh",i,void 0)},1323785:i=>{r.hc("Not",i,void 0)},1323836:(i,u,c)=>{r.hc("Clip",i,{min:u,max:c})},1323905:i=>{r.hc("Clip",i,void 0)},1323957:(i,u)=>{r.hc("Elu",i,{alpha:u})},1324015:i=>{r.hc("Gelu",i,void 0)},1324067:i=>{r.hc("Relu",i,void 0)},1324119:(i,u)=>{r.hc("LeakyRelu",i,{alpha:u})},1324183:(i,u)=>{r.hc("ThresholdedRelu",i,{alpha:u})},1324253:(i,u)=>{r.hc("Cast",i,{to:u})},1324311:i=>{r.hc("Add",i,void 0)},1324362:i=>{r.hc("Sub",i,void 0)},1324413:i=>{r.hc("Mul",i,void 0)},1324464:i=>{r.hc("Div",i,void 0)},1324515:i=>{r.hc("Pow",i,void 0)},1324566:i=>{r.hc("Equal",i,void 0)},1324619:i=>{r.hc("Greater",i,void 0)},1324674:i=>{r.hc("GreaterOrEqual",i,void 0)},1324736:i=>{r.hc("Less",i,void 0)},1324788:i=>{r.hc("LessOrEqual",i,void 0)},1324847:(i,u,c,m,g)=>{r.hc("ReduceMean",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325022:(i,u,c,m,g)=>{r.hc("ReduceMax",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325196:(i,u,c,m,g)=>{r.hc("ReduceMin",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325370:(i,u,c,m,g)=>{r.hc("ReduceProd",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325545:(i,u,c,m,g)=>{r.hc("ReduceSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325719:(i,u,c,m,g)=>{r.hc("ReduceL1",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1325892:(i,u,c,m,g)=>{r.hc("ReduceL2",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1326065:(i,u,c,m,g)=>{r.hc("ReduceLogSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1326242:(i,u,c,m,g)=>{r.hc("ReduceSumSquare",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1326422:(i,u,c,m,g)=>{r.hc("ReduceLogSumExp",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1326602:i=>{r.hc("Where",i,void 0)},1326655:(i,u,c)=>{r.hc("Transpose",i,{perm:u?Array.from(A().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1326779:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ee(c),format:m?"NHWC":"NCHW"})},1326912:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ee(c),format:m?"NHWC":"NCHW"})},1327045:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se,He)=>{r.hc("ConvTranspose",i,{format:M?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[$,I],strides:[O],wIsConst:()=>!!me()[N>>>0],outputPadding:K?Array.from(A().subarray(Number(K)>>>0,Number(J)>>>0)):[],outputShape:de?Array.from(A().subarray(Number(de)>>>0,Number(Se)>>>0)):[],activation:Ee(He)})},1327478:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("ConvTranspose",i,{format:O?"NHWC":"NCHW",autoPad:u,dilations:Array.from(A().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(A().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(A().subarray(Number($)>>>0,4+(Number($)>>>0)>>>0)),strides:Array.from(A().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!me()[M>>>0],outputPadding:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],outputShape:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[],activation:Ee(Se)})},1328139:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se,He)=>{r.hc("ConvTranspose",i,{format:M?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[$,I],strides:[O],wIsConst:()=>!!me()[N>>>0],outputPadding:K?Array.from(A().subarray(Number(K)>>>0,Number(J)>>>0)):[],outputShape:de?Array.from(A().subarray(Number(de)>>>0,Number(Se)>>>0)):[],activation:Ee(He)})},1328572:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("ConvTranspose",i,{format:O?"NHWC":"NCHW",autoPad:u,dilations:Array.from(A().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(A().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(A().subarray(Number($)>>>0,4+(Number($)>>>0)>>>0)),strides:Array.from(A().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!me()[M>>>0],outputPadding:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],outputShape:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[],activation:Ee(Se)})},1329233:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1329324:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("AveragePool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(A().subarray(Number(O)>>>0,Number(M)>>>0)):[],pads:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],strides:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[]})},1329803:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1329894:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("AveragePool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(A().subarray(Number(O)>>>0,Number(M)>>>0)):[],pads:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],strides:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[]})},1330373:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1330460:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("MaxPool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(A().subarray(Number(O)>>>0,Number(M)>>>0)):[],pads:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],strides:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[]})},1330935:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1331022:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>{r.hc("MaxPool",i,{format:Se?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(A().subarray(Number(O)>>>0,Number(M)>>>0)):[],pads:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],strides:J?Array.from(A().subarray(Number(J)>>>0,Number(de)>>>0)):[]})},1331497:(i,u,c,m,g)=>{r.hc("Gemm",i,{alpha:u,beta:c,transA:m,transB:g})},1331601:i=>{r.hc("MatMul",i,void 0)},1331655:(i,u,c,m)=>{r.hc("ArgMax",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1331763:(i,u,c,m)=>{r.hc("ArgMin",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1331871:(i,u)=>{r.hc("Softmax",i,{axis:u})},1331934:(i,u)=>{r.hc("Concat",i,{axis:u})},1331994:(i,u,c,m,g)=>{r.hc("Split",i,{axis:u,numOutputs:c,splitSizes:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1332150:i=>{r.hc("Expand",i,void 0)},1332204:(i,u)=>{r.hc("Gather",i,{axis:Number(u)})},1332275:(i,u)=>{r.hc("GatherElements",i,{axis:Number(u)})},1332354:(i,u)=>{r.hc("GatherND",i,{batch_dims:Number(u)})},1332433:(i,u,c,m,g,$,I,O,M,N,K)=>{r.hc("Resize",i,{antialias:u,axes:c?Array.from(A().subarray(Number(c)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ee(g),cubicCoeffA:$,excludeOutside:I,extrapolationValue:O,keepAspectRatioPolicy:Ee(M),mode:Ee(N),nearestMode:Ee(K)})},1332795:(i,u,c,m,g,$,I)=>{r.hc("Slice",i,{starts:u?Array.from(A().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[],axes:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[]})},1333059:i=>{r.hc("Tile",i,void 0)},1333111:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1333225:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1333339:i=>{r.hc("Range",i,void 0)},1333392:(i,u)=>{r.hc("Einsum",i,{equation:Ee(u)})},1333473:(i,u,c,m,g)=>{r.hc("Pad",i,{mode:u,value:c,pads:m?Array.from(A().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1333616:(i,u,c,m,g,$)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:$?"NHWC":"NCHW"})},1333785:(i,u,c,m,g,$)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:$?"NHWC":"NCHW"})},1333954:(i,u,c)=>{r.hc("CumSum",i,{exclusive:Number(u),reverse:Number(c)})},1334051:(i,u,c)=>{r.hc("DequantizeLinear",i,{axis:u,blockSize:c})},1334141:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ee(c),padding_mode:Ee(m),format:g?"NHWC":"NCHW"})},1334311:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ee(c),padding_mode:Ee(m),format:g?"NHWC":"NCHW"})},1334481:(i,u)=>{r.hc("ScatterND",i,{reduction:Ee(u)})},1334566:(i,u,c,m,g,$,I,O,M)=>{r.hc("Attention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:$,qkvHiddenSizes:I?Array.from(A().subarray(Number(O)>>>0,Number(O)+I>>>0)):[],pastPresentShareBuffer:!!M})},1334838:i=>{r.hc("BiasAdd",i,void 0)},1334893:i=>{r.hc("BiasSplitGelu",i,void 0)},1334954:i=>{r.hc("FastGelu",i,void 0)},1335010:(i,u,c,m,g,$,I,O,M,N,K,J,de,Se,He,Qt)=>{r.hc("Conv",i,{format:J?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(A().subarray(Number(c)>>>0,Number(m)>>>0)):[],group:g,kernel_shape:$?Array.from(A().subarray(Number($)>>>0,Number(I)>>>0)):[],pads:O?Array.from(A().subarray(Number(O)>>>0,Number(M)>>>0)):[],strides:N?Array.from(A().subarray(Number(N)>>>0,Number(K)>>>0)):[],w_is_const:()=>!!me()[Number(de)>>>0],activation:Ee(Se),activation_params:He?Array.from(fe().subarray(Number(He)>>>0,Number(Qt)>>>0)):[]})},1335594:i=>{r.hc("Gelu",i,void 0)},1335646:(i,u,c,m,g,$,I,O,M)=>{r.hc("GroupQueryAttention",i,{numHeads:u,kvNumHeads:c,scale:m,softcap:g,doRotary:$,rotaryInterleaved:I,smoothSoftmax:O,localWindowSize:M})},1335863:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1335974:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1336085:(i,u,c,m,g,$)=>{r.hc("MatMulNBits",i,{k:u,n:c,accuracyLevel:m,bits:g,blockSize:$})},1336212:(i,u,c,m,g,$)=>{r.hc("MultiHeadAttention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:$})},1336371:(i,u)=>{r.hc("QuickGelu",i,{alpha:u})},1336435:(i,u,c,m,g)=>{r.hc("RotaryEmbedding",i,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:m,scale:g})},1336574:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1336676:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1336778:(i,u,c,m)=>{r.hc("GatherBlockQuantized",i,{gatherAxis:u,quantizeAxis:c,blockSize:m})},1336899:i=>{r.Wd(i)},1336933:(i,u)=>r.Zd(Number(i),Number(u),r.Cd.be,r.Cd.errors)};function pp(i,u,c){return bi(async()=>{await r.Ud(Number(i),Number(u),Number(c))})}function mp(){return typeof wasmOffsetConverter<"u"}class yn{name="ExitStatus";constructor(u){this.message=`Program terminated with exit(${u})`,this.status=u}}var No=i=>{i.terminate(),i.onmessage=()=>{}},bn=[],Vo=i=>{ft.length==0&&(qo(),Fo(ft[0]));var u=ft.pop();if(!u)return 6;Kt.push(u),xt[i.xd]=u,u.xd=i.xd;var c={yd:"run",de:i.ce,Fd:i.Fd,xd:i.xd};return u.postMessage(c,i.Ld),0},mt=0,Ce=(i,u,...c)=>{for(var m=2*c.length,g=ae(),$=Rn(8*m),I=$>>>3,O=0;O<c.length;O++){var M=c[O];typeof M=="bigint"?(Y[I+2*O]=1n,Y[I+2*O+1]=M):(Y[I+2*O]=0n,De()[I+2*O+1>>>0]=M)}return i=Vi(i,0,m,$,u),ie(g),i};function _n(i){if(d)return Ce(0,1,i);if(E=i,!(0<mt)){for(var u of Kt)No(u);for(u of ft)No(u);ft=[],Kt=[],xt={},ne=!0}b(0,new yn(i))}function Wo(i){if(d)return Ce(1,0,i);wn(i)}var wn=i=>{if(E=i,d)throw Wo(i),"unwind";_n(i)},ft=[],Kt=[],Lo=[],xt={},Go=i=>{var u=i.xd;delete xt[u],ft.push(i),Kt.splice(Kt.indexOf(i),1),i.xd=0,Wi(u)};function Ho(){Lo.forEach(i=>i())}var Fo=i=>new Promise(u=>{i.onmessage=g=>{var $=(g=g.data).yd;if(g.Ed&&g.Ed!=br()){var I=xt[g.Ed];I?I.postMessage(g,g.Ld):T(`Internal error! Worker sent a message "${$}" to target pthread ${g.Ed}, but that thread no longer exists!`)}else $==="checkMailbox"?lr():$==="spawnThread"?Vo(g):$==="cleanupThread"?Go(xt[g.ee]):$==="loaded"?(i.loaded=!0,u(i)):$==="alert"?alert(`Thread ${g.fe}: ${g.text}`):g.target==="setimmediate"?i.postMessage(g):$==="callHandler"?r[g.Nd](...g.args):$&&T(`worker sent an unknown command ${$}`)},i.onerror=g=>{throw T(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var c,m=[];for(c of[])r.propertyIsEnumerable(c)&&m.push(c);i.postMessage({yd:"load",Od:m,he:C,ie:k})});function qo(){var i=new Worker((()=>{let u=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new u("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ft.push(i)}var fp=i=>{ke();var u=G()[i+52>>>2>>>0];i=G()[i+56>>>2>>>0],Hi(u,u-i),ie(u)},hp=(i,u)=>{mt=0,i=Un(i,u),0<mt?E=i:Mn(i)},dr=[];function gp(i){var u=new vn(i>>>=0);if(me()[u.wd+12>>>0]==0){var c=1;me()[u.wd+12>>>0]=c}return c=0,me()[u.wd+13>>>0]=c,dr.push(u),qi(i),ji(i)}var Dt=0,yp=()=>{ue(0,0);var i=dr.pop();Fi(i.Gd),Dt=0};class vn{constructor(u){this.Gd=u,this.wd=u-24}}function bp(i){throw Dt||=i>>>0,Dt}var $n=i=>{var u=Dt;if(!u)return Zt(0),0;var c=new vn(u);G()[c.wd+16>>>2>>>0]=u;var m=G()[c.wd+4>>>2>>>0];if(!m)return Zt(0),u;for(var g of i){if(g===0||g===m)break;if(Ki(g,m,c.wd+16))return Zt(g),u}return Zt(m),u};function _p(){return $n([])}function wp(i){return $n([i>>>0])}function vp(i,u){return $n([i>>>0,u>>>0])}var $p=()=>{var i=dr.pop();i||ut("no exception to throw");var u=i.Gd;if(me()[i.wd+13>>>0]==0){dr.push(i);var c=1;me()[i.wd+13>>>0]=c,c=0,me()[i.wd+12>>>0]=c}throw Dt=u};function xp(i,u,c){var m=new vn(i>>>=0);throw u>>>=0,c>>>=0,G()[m.wd+16>>>2>>>0]=0,G()[m.wd+4>>>2>>>0]=u,G()[m.wd+8>>>2>>>0]=c,Dt=i}function Ko(i,u,c,m){return d?Ce(2,1,i,u,c,m):jo(i,u,c,m)}function jo(i,u,c,m){if(i>>>=0,c>>>=0,m>>>=0,l===void 0)return 6;var g=[];return d&&g.length===0?Ko(i,u>>>=0,c,m):(i={ce:c,xd:i,Fd:m,Ld:g},d?(i.yd="spawnThread",postMessage(i,g),0):Vo(i))}var Zo=typeof TextDecoder<"u"?new TextDecoder:void 0,Qo=(i,u=0,c=NaN)=>{var m=(u>>>=0)+c;for(c=u;i[c]&&!(c>=m);)++c;if(16<c-u&&i.buffer&&Zo)return Zo.decode(i.buffer instanceof ArrayBuffer?i.subarray(u,c):i.slice(u,c));for(m="";u<c;){var g=i[u++];if(128&g){var $=63&i[u++];if((224&g)==192)m+=String.fromCharCode((31&g)<<6|$);else{var I=63&i[u++];65536>(g=(240&g)==224?(15&g)<<12|$<<6|I:(7&g)<<18|$<<12|I<<6|63&i[u++])?m+=String.fromCharCode(g):(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else m+=String.fromCharCode(g)}return m},Ee=(i,u)=>(i>>>=0)?Qo(be(),i,u):"";function Yo(i,u,c){return d?Ce(3,1,i,u,c):0}function Xo(i,u){if(d)return Ce(4,1,i,u)}var Jo=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);127>=m?u++:2047>=m?u+=2:55296<=m&&57343>=m?(u+=4,++c):u+=3}return u},Mt=(i,u,c)=>{var m=be();if(u>>>=0,0<c){var g=u;c=u+c-1;for(var $=0;$<i.length;++$){var I=i.charCodeAt($);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&i.charCodeAt(++$)),127>=I){if(u>=c)break;m[u++>>>0]=I}else{if(2047>=I){if(u+1>=c)break;m[u++>>>0]=192|I>>6}else{if(65535>=I){if(u+2>=c)break;m[u++>>>0]=224|I>>12}else{if(u+3>=c)break;m[u++>>>0]=240|I>>18,m[u++>>>0]=128|I>>12&63}m[u++>>>0]=128|I>>6&63}m[u++>>>0]=128|63&I}}m[u>>>0]=0,i=u-g}else i=0;return i};function ei(i,u){if(d)return Ce(5,1,i,u)}function ti(i,u,c){if(d)return Ce(6,1,i,u,c)}function ri(i,u,c){return d?Ce(7,1,i,u,c):0}function ni(i,u){if(d)return Ce(8,1,i,u)}function oi(i,u,c){if(d)return Ce(9,1,i,u,c)}function ii(i,u,c,m){if(d)return Ce(10,1,i,u,c,m)}function ai(i,u,c,m){if(d)return Ce(11,1,i,u,c,m)}function si(i,u,c,m){if(d)return Ce(12,1,i,u,c,m)}function ui(i){if(d)return Ce(13,1,i)}function di(i,u){if(d)return Ce(14,1,i,u)}function li(i,u,c){if(d)return Ce(15,1,i,u,c)}var ci,ht,Sp=()=>ut(""),Xe=i=>{for(var u="";be()[i>>>0];)u+=ci[be()[i++>>>0]];return u},xn={},Sn={},Tp={};function dt(i,u,c={}){return function(m,g,$={}){var I=g.name;if(!m)throw new ht(`type "${I}" must have a positive integer typeid pointer`);if(Sn.hasOwnProperty(m)){if($.Pd)return;throw new ht(`Cannot register type '${I}' twice`)}Sn[m]=g,delete Tp[m],xn.hasOwnProperty(m)&&(g=xn[m],delete xn[m],g.forEach(O=>O()))}(i,u,c)}var pi=(i,u,c)=>{switch(u){case 1:return c?m=>me()[m>>>0]:m=>be()[m>>>0];case 2:return c?m=>ve()[m>>>1>>>0]:m=>oe()[m>>>1>>>0];case 4:return c?m=>A()[m>>>2>>>0]:m=>G()[m>>>2>>>0];case 8:return c?m=>Y[m>>>3]:m=>xe[m>>>3];default:throw new TypeError(`invalid integer width (${u}): ${i}`)}};function Cp(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:function(m,g){if(typeof g!="bigint"&&typeof g!="number")throw g=g===null?"null":(m=typeof g)=="object"||m==="array"||m==="function"?g.toString():""+g,new TypeError(`Cannot convert "${g}" to ${this.name}`);return typeof g=="number"&&(g=BigInt(g)),g},zd:gt,readValueFromPointer:pi(u,c,u.indexOf("u")==-1),Ad:null})}var gt=8;function Ip(i,u,c,m){dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(g){return!!g},toWireType:function(g,$){return $?c:m},zd:gt,readValueFromPointer:function(g){return this.fromWireType(be()[g>>>0])},Ad:null})}var Tn=[],lt=[];function Cn(i){9<(i>>>=0)&&--lt[i+1]==0&&(lt[i]=void 0,Tn.push(i))}var Ue=i=>{if(!i)throw new ht("Cannot use deleted val. handle = "+i);return lt[i]},Ge=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=Tn.pop()||lt.length;return lt[u]=i,lt[u+1]=1,u}};function In(i){return this.fromWireType(G()[i>>>2>>>0])}var Ap={name:"emscripten::val",fromWireType:i=>{var u=Ue(i);return Cn(i),u},toWireType:(i,u)=>Ge(u),zd:gt,readValueFromPointer:In,Ad:null};function Ep(i){return dt(i>>>0,Ap)}var kp=(i,u)=>{switch(u){case 4:return function(c){return this.fromWireType(fe()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(De()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${i}`)}};function Pp(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:m=>m,toWireType:(m,g)=>g,zd:gt,readValueFromPointer:kp(u,c),Ad:null})}function zp(i,u,c,m,g){if(i>>>=0,c>>>=0,u=Xe(u>>>0),g===-1&&(g=4294967295),g=O=>O,m===0){var $=32-8*c;g=O=>O<<$>>>$}var I=u.includes("unsigned")?function(O,M){return M>>>0}:function(O,M){return M};dt(i,{name:u,fromWireType:g,toWireType:I,zd:gt,readValueFromPointer:pi(u,c,m!==0),Ad:null})}function Op(i,u,c){function m($){var I=G()[$>>>2>>>0];return $=G()[$+4>>>2>>>0],new g(me().buffer,$,I)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];dt(i>>>=0,{name:c=Xe(c>>>0),fromWireType:m,zd:gt,readValueFromPointer:m},{Pd:!0})}function Bp(i,u){dt(i>>>=0,{name:u=Xe(u>>>0),fromWireType:function(c){for(var m,g=G()[c>>>2>>>0],$=c+4,I=$,O=0;O<=g;++O){var M=$+O;O!=g&&be()[M>>>0]!=0||(I=Ee(I,M-I),m===void 0?m=I:(m+="\0",m+=I),I=M+1)}return et(c),m},toWireType:function(c,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var g=typeof m=="string";if(!(g||m instanceof Uint8Array||m instanceof Uint8ClampedArray||m instanceof Int8Array))throw new ht("Cannot pass non-string to std::string");var $=g?Jo(m):m.length,I=_r(4+$+1),O=I+4;if(G()[I>>>2>>>0]=$,g)Mt(m,O,$+1);else if(g)for(g=0;g<$;++g){var M=m.charCodeAt(g);if(255<M)throw et(I),new ht("String has UTF-16 code units that do not fit in 8 bits");be()[O+g>>>0]=M}else for(g=0;g<$;++g)be()[O+g>>>0]=m[g];return c!==null&&c.push(et,I),I},zd:gt,readValueFromPointer:In,Ad(c){et(c)}})}var mi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Dp=(i,u)=>{for(var c=i>>1,m=c+u/2;!(c>=m)&&oe()[c>>>0];)++c;if(32<(c<<=1)-i&&mi)return mi.decode(be().slice(i,c));for(c="",m=0;!(m>=u/2);++m){var g=ve()[i+2*m>>>1>>>0];if(g==0)break;c+=String.fromCharCode(g)}return c},Mp=(i,u,c)=>{if(c??=2147483647,2>c)return 0;var m=u;c=(c-=2)<2*i.length?c/2:i.length;for(var g=0;g<c;++g){var $=i.charCodeAt(g);ve()[u>>>1>>>0]=$,u+=2}return ve()[u>>>1>>>0]=0,u-m},Rp=i=>2*i.length,Up=(i,u)=>{for(var c=0,m="";!(c>=u/4);){var g=A()[i+4*c>>>2>>>0];if(g==0)break;++c,65536<=g?(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g)):m+=String.fromCharCode(g)}return m},Np=(i,u,c)=>{if(u>>>=0,c??=2147483647,4>c)return 0;var m=u;c=m+c-4;for(var g=0;g<i.length;++g){var $=i.charCodeAt(g);if(55296<=$&&57343>=$&&($=65536+((1023&$)<<10)|1023&i.charCodeAt(++g)),A()[u>>>2>>>0]=$,(u+=4)+4>c)break}return A()[u>>>2>>>0]=0,u-m},Vp=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);55296<=m&&57343>=m&&++c,u+=4}return u};function Wp(i,u,c){if(i>>>=0,u>>>=0,c=Xe(c>>>=0),u===2)var m=Dp,g=Mp,$=Rp,I=O=>oe()[O>>>1>>>0];else u===4&&(m=Up,g=Np,$=Vp,I=O=>G()[O>>>2>>>0]);dt(i,{name:c,fromWireType:O=>{for(var M,N=G()[O>>>2>>>0],K=O+4,J=0;J<=N;++J){var de=O+4+J*u;J!=N&&I(de)!=0||(K=m(K,de-K),M===void 0?M=K:(M+="\0",M+=K),K=de+u)}return et(O),M},toWireType:(O,M)=>{if(typeof M!="string")throw new ht(`Cannot pass non-string to C++ string type ${c}`);var N=$(M),K=_r(4+N+u);return G()[K>>>2>>>0]=N/u,g(M,K+4,N+u),O!==null&&O.push(et,K),K},zd:gt,readValueFromPointer:In,Ad(O){et(O)}})}function Lp(i,u){dt(i>>>=0,{Qd:!0,name:u=Xe(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function Gp(i){Dn(i>>>0,!s,1,!a,131072,!1),Ho()}var An=i=>{if(!ne)try{if(i(),!(0<mt))try{d?Mn(E):wn(E)}catch(u){u instanceof yn||u=="unwind"||b(0,u)}}catch(u){u instanceof yn||u=="unwind"||b(0,u)}};function En(i){i>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(A(),i>>>2,i).value.then(lr),i+=128,Atomics.store(A(),i>>>2,1))}var lr=()=>{var i=br();i&&(En(i),An(Gi))};function Hp(i,u){(i>>>=0)==u>>>0?setTimeout(lr):d?postMessage({Ed:i,yd:"checkMailbox"}):(i=xt[i])&&i.postMessage({yd:"checkMailbox"})}var kn=[];function Fp(i,u,c,m,g){for(u>>>=0,m/=2,kn.length=m,c=g>>>0>>>3,g=0;g<m;g++)kn[g]=Y[c+2*g]?Y[c+2*g+1]:De()[c+2*g+1>>>0];return(u?gn[u]:Um[i])(...kn)}var qp=()=>{mt=0};function Kp(i){i>>>=0,d?postMessage({yd:"cleanupThread",ee:i}):Go(xt[i])}function jp(i){}var cr=(i,u)=>{var c=Sn[i];if(c===void 0)throw i=Ri(i),c=Xe(i),et(i),new ht(`${u} has unknown type ${c}`);return c},fi=(i,u,c)=>{var m=[];return i=i.toWireType(m,c),m.length&&(G()[u>>>2>>>0]=Ge(m)),i};function Zp(i,u,c){return u>>>=0,c>>>=0,i=Ue(i>>>0),u=cr(u,"emval::as"),fi(u,c,i)}function Qp(i,u){return u>>>=0,i=Ue(i>>>0),(u=cr(u,"emval::as")).toWireType(null,i)}var pr=i=>{try{i()}catch(u){ut(u)}},yt=0,Je=null,hi=0,mr=[],gi={},yi={},Yp=0,Pn=null,Xp=[];function bi(i){return function(u){if(!ne){if(yt===0){var c=!1,m=!1;u((g=0)=>{if(!ne&&(hi=g,c=!0,m)){yt=2,pr(()=>Wa(Je)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),g=!1;try{var $=function(){var M=A()[Je+8>>>2>>>0];return M=R[yi[M]],--mt,M()}()}catch(M){$=M,g=!0}var I=!1;if(!Je){var O=Pn;O&&(Pn=null,(g?O.reject:O.resolve)($),I=!0)}if(g&&!I)throw $}}),m=!0,c||(yt=1,Je=function(){var g=_r(65548),$=g+12;G()[g>>>2>>>0]=$,G()[g+4>>>2>>>0]=$+65536,$=mr[0];var I=gi[$];return I===void 0&&(I=Yp++,gi[$]=I,yi[I]=$),$=I,A()[g+8>>>2>>>0]=$,g}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),pr(()=>Na(Je)))}else yt===2?(yt=0,pr(La),et(Je),Je=null,Xp.forEach(An)):ut(`invalid state: ${yt}`);return hi}}(u=>{i().then(u)})}function Jp(i){return i>>>=0,bi(async()=>{var u=await Ue(i);return Ge(u)})}var fr=[];function em(i,u,c,m){return c>>>=0,m>>>=0,(i=fr[i>>>0])(null,u=Ue(u>>>0),c,m)}var tm={},hr=i=>{var u=tm[i];return u===void 0?Xe(i):u};function rm(i,u,c,m,g){return c>>>=0,m>>>=0,g>>>=0,(i=fr[i>>>0])(u=Ue(u>>>0),u[c=hr(c)],m,g)}var _i=()=>typeof globalThis=="object"?globalThis:Function("return this")();function nm(i){return(i>>>=0)==0?Ge(_i()):(i=hr(i),Ge(_i()[i]))}var om=i=>{var u=fr.length;return fr.push(i),u},im=(i,u)=>{for(var c=Array(i),m=0;m<i;++m)c[m]=cr(G()[u+4*m>>>2>>>0],"parameter "+m);return c},wi=(i,u)=>Object.defineProperty(u,"name",{value:i});function am(i,u,c){var m=(u=im(i,u>>>0)).shift();i--;var g=`return function (obj, func, destructorsRef, args) {
`,$=0,I=[];c===0&&I.push("obj");for(var O=["retType"],M=[m],N=0;N<i;++N)I.push("arg"+N),O.push("argType"+N),M.push(u[N]),g+=`  var arg${N} = argType${N}.readValueFromPointer(args${$?"+"+$:""});
`,$+=u[N].zd;return g+=`  var rv = ${c===1?"new func":"func.call"}(${I.join(", ")});
`,m.Qd||(O.push("emval_returnValue"),M.push(fi),g+=`  return emval_returnValue(retType, destructorsRef, rv);
`),O.push(g+`};
`),i=function(K){var J=Function;if(!(J instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof J} which is not a function`);var de=wi(J.name||"unknownFunctionName",function(){});return de.prototype=J.prototype,de=new de,(K=J.apply(de,K))instanceof Object?K:de}(O)(...M),c=`methodCaller<(${u.map(K=>K.name).join(", ")}) => ${m.name}>`,om(wi(c,i))}function sm(i){return i=hr(i>>>0),Ge(r[i])}function um(i,u){return u>>>=0,i=Ue(i>>>0),u=Ue(u),Ge(i[u])}function dm(i){9<(i>>>=0)&&(lt[i+1]+=1)}function lm(){return Ge([])}function cm(i){i=Ue(i>>>0);for(var u=Array(i.length),c=0;c<i.length;c++)u[c]=i[c];return Ge(u)}function pm(i){return Ge(hr(i>>>0))}function mm(){return Ge({})}function fm(i){for(var u=Ue(i>>>=0);u.length;){var c=u.pop();u.pop()(c)}Cn(i)}function hm(i,u,c){u>>>=0,c>>>=0,i=Ue(i>>>0),u=Ue(u),c=Ue(c),i[u]=c}function gm(i,u){return u>>>=0,i=(i=cr(i>>>0,"_emval_take_value")).readValueFromPointer(u),Ge(i)}function ym(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),A()[u>>>2>>>0]=i.getUTCSeconds(),A()[u+4>>>2>>>0]=i.getUTCMinutes(),A()[u+8>>>2>>>0]=i.getUTCHours(),A()[u+12>>>2>>>0]=i.getUTCDate(),A()[u+16>>>2>>>0]=i.getUTCMonth(),A()[u+20>>>2>>>0]=i.getUTCFullYear()-1900,A()[u+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,A()[u+28>>>2>>>0]=i}var vi=i=>i%4==0&&(i%100!=0||i%400==0),$i=[0,31,60,91,121,152,182,213,244,274,305,335],xi=[0,31,59,90,120,151,181,212,243,273,304,334];function bm(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),A()[u>>>2>>>0]=i.getSeconds(),A()[u+4>>>2>>>0]=i.getMinutes(),A()[u+8>>>2>>>0]=i.getHours(),A()[u+12>>>2>>>0]=i.getDate(),A()[u+16>>>2>>>0]=i.getMonth(),A()[u+20>>>2>>>0]=i.getFullYear()-1900,A()[u+24>>>2>>>0]=i.getDay();var c=(vi(i.getFullYear())?$i:xi)[i.getMonth()]+i.getDate()-1|0;A()[u+28>>>2>>>0]=c,A()[u+36>>>2>>>0]=-60*i.getTimezoneOffset(),c=new Date(i.getFullYear(),6,1).getTimezoneOffset();var m=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(c!=m&&i.getTimezoneOffset()==Math.min(m,c)),A()[u+32>>>2>>>0]=i}function _m(i){i>>>=0;var u=new Date(A()[i+20>>>2>>>0]+1900,A()[i+16>>>2>>>0],A()[i+12>>>2>>>0],A()[i+8>>>2>>>0],A()[i+4>>>2>>>0],A()[i>>>2>>>0],0),c=A()[i+32>>>2>>>0],m=u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset(),$=new Date(u.getFullYear(),0,1).getTimezoneOffset(),I=Math.min($,g);return 0>c?A()[i+32>>>2>>>0]=+(g!=$&&I==m):0<c!=(I==m)&&(g=Math.max($,g),u.setTime(u.getTime()+6e4*((0<c?I:g)-m))),A()[i+24>>>2>>>0]=u.getDay(),c=(vi(u.getFullYear())?$i:xi)[u.getMonth()]+u.getDate()-1|0,A()[i+28>>>2>>>0]=c,A()[i>>>2>>>0]=u.getSeconds(),A()[i+4>>>2>>>0]=u.getMinutes(),A()[i+8>>>2>>>0]=u.getHours(),A()[i+12>>>2>>>0]=u.getDate(),A()[i+16>>>2>>>0]=u.getMonth(),A()[i+20>>>2>>>0]=u.getYear(),i=u.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function Si(i,u,c,m,g,$,I){return d?Ce(16,1,i,u,c,m,g,$,I):-52}function Ti(i,u,c,m,g,$){if(d)return Ce(17,1,i,u,c,m,g,$)}var jt={},wm=()=>performance.timeOrigin+performance.now();function Ci(i,u){if(d)return Ce(18,1,i,u);if(jt[i]&&(clearTimeout(jt[i].id),delete jt[i]),!u)return 0;var c=setTimeout(()=>{delete jt[i],An(()=>Li(i,performance.timeOrigin+performance.now()))},u);return jt[i]={id:c,me:u},0}function vm(i,u,c,m){i>>>=0,u>>>=0,c>>>=0,m>>>=0;var g=new Date().getFullYear(),$=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var I=Math.max($,g);G()[i>>>2>>>0]=60*I,A()[u>>>2>>>0]=+($!=g),i=(u=O=>{var M=Math.abs(O);return`UTC${0<=O?"-":"+"}${String(Math.floor(M/60)).padStart(2,"0")}${String(M%60).padStart(2,"0")}`})($),u=u(g),g<$?(Mt(i,c,17),Mt(u,m,17)):(Mt(i,m,17),Mt(u,c,17))}var $m=()=>Date.now(),xm=1;function Sm(i,u,c){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!xm)return 52;i=performance.timeOrigin+performance.now()}return Y[c>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var zn=[],Ii=(i,u)=>{zn.length=0;for(var c;c=be()[i++>>>0];){var m=c!=105;u+=(m&=c!=112)&&u%8?4:0,zn.push(c==112?G()[u>>>2>>>0]:c==106?Y[u>>>3]:c==105?A()[u>>>2>>>0]:De()[u>>>3>>>0]),u+=m?8:4}return zn};function Tm(i,u,c){return i>>>=0,u=Ii(u>>>0,c>>>0),gn[i](...u)}function Cm(i,u,c){return i>>>=0,u=Ii(u>>>0,c>>>0),gn[i](...u)}var Im=()=>{};function Am(i,u){return T(Ee(i>>>0,u>>>0))}var Em=()=>{throw mt+=1,"unwind"};function km(){return 4294901760}var Pm=()=>navigator.hardwareConcurrency;function zm(){return ut("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Om(i){i>>>=0;var u=be().length;if(i<=u||4294901760<i)return!1;for(var c=1;4>=c;c*=2){var m=u*(1+.2/c);m=Math.min(m,i+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(i,m)/65536))-C.buffer.byteLength+65535)/65536|0;try{C.grow(m),ke();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}var gr=()=>(ut("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Rt={},Ai=i=>{i.forEach(u=>{var c=gr();c&&(Rt[c]=u)})};function Bm(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Ai(i),Rt.Kd=gr(),Rt.ae=i,Rt.Kd}function Dm(i,u,c){if(i>>>=0,u>>>=0,Rt.Kd==i)var m=Rt.ae;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Ai(m);for(var g=3;m[g]&&gr()!=i;)++g;for(i=0;i<c&&m[i+g];++i)A()[u+4*i>>>2>>>0]=gr();return i}var On,Bn={},Ei=()=>{if(!On){var i,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in Bn)Bn[i]===void 0?delete u[i]:u[i]=Bn[i];var c=[];for(i in u)c.push(`${i}=${u[i]}`);On=c}return On};function ki(i,u){if(d)return Ce(19,1,i,u);i>>>=0,u>>>=0;var c=0;return Ei().forEach((m,g)=>{var $=u+c;for(g=G()[i+4*g>>>2>>>0]=$,$=0;$<m.length;++$)me()[g++>>>0]=m.charCodeAt($);me()[g>>>0]=0,c+=m.length+1}),0}function Pi(i,u){if(d)return Ce(20,1,i,u);i>>>=0,u>>>=0;var c=Ei();G()[i>>>2>>>0]=c.length;var m=0;return c.forEach(g=>m+=g.length+1),G()[u>>>2>>>0]=m,0}function zi(i){return d?Ce(21,1,i):52}function Oi(i,u,c,m){return d?Ce(22,1,i,u,c,m):52}function Bi(i,u,c,m){return d?Ce(23,1,i,u,c,m):70}var Mm=[null,[],[]];function Di(i,u,c,m){if(d)return Ce(24,1,i,u,c,m);u>>>=0,c>>>=0,m>>>=0;for(var g=0,$=0;$<c;$++){var I=G()[u>>>2>>>0],O=G()[u+4>>>2>>>0];u+=8;for(var M=0;M<O;M++){var N=be()[I+M>>>0],K=Mm[i];N===0||N===10?((i===1?v:T)(Qo(K)),K.length=0):K.push(N)}g+=O}return G()[m>>>2>>>0]=g,0}function Rm(i){return i>>>0}d||function(){for(var i=r.numThreads-1;i--;)qo();bn.unshift(()=>{Bt++,function(u){d?u():Promise.all(ft.map(Fo)).then(u)}(()=>Ro())})}();for(var Mi=Array(256),yr=0;256>yr;++yr)Mi[yr]=String.fromCharCode(yr);ci=Mi,ht=r.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}},r.InternalError=class extends Error{constructor(i){super(i),this.name="InternalError"}},lt.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>lt.length/2-5-Tn.length;var R,Um=[_n,Wo,Ko,Yo,Xo,ei,ti,ri,ni,oi,ii,ai,si,ui,di,li,Si,Ti,Ci,ki,Pi,zi,Oi,Bi,Di];(async function(){function i(m,g){return R=m.exports,R=function(){var $=R,I={};for(let[O,M]of Object.entries($))I[O]=typeof M=="function"?(...N)=>{mr.push(O);try{return M(...N)}finally{ne||(mr.pop(),Je&&yt===1&&mr.length===0&&(yt=0,mt+=1,pr(Va),typeof Fibers<"u"&&Fibers.ne()))}}:M;return I}(),R=function(){var $=R,I=M=>N=>M(N)>>>0,O=M=>()=>M()>>>0;return($=Object.assign({},$)).Cb=I($.Cb),$.fc=O($.fc),$.ic=I($.ic),$.vc=I($.vc),$.wc=O($.wc),$.Ac=I($.Ac),$}(),Lo.push(R.jc),k=g,Ro(),R}Bt++;var u=Uo();if(r.instantiateWasm)return new Promise(m=>{r.instantiateWasm(u,(g,$)=>{i(g,$),m(g.exports)})});if(d)return new Promise(m=>{Te=g=>{var $=new WebAssembly.Instance(g,Uo());m(i($,g))}});Ot??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var c=await async function(m){var g=Ot;if(!Q&&typeof WebAssembly.instantiateStreaming=="function"&&!ee(g))try{var $=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming($,m)}catch(I){T(`wasm streaming compile failed: ${I}`),T("falling back to ArrayBuffer instantiation")}return async function(I,O){try{var M=await async function(N){if(!Q)try{var K=await h(N);return new Uint8Array(K)}catch{}if(N==Ot&&Q)N=new Uint8Array(Q);else{if(!y)throw"both async and sync fetching of the wasm failed";N=y(N)}return N}(I);return await WebAssembly.instantiate(M,O)}catch(N){T(`failed to asynchronously prepare wasm: ${N}`),ut(N)}}(g,m)}(u);return i(c.instance,c.module)}catch(m){return n(m),Promise.reject(m)}})();var Ri=i=>(Ri=R.Cb)(i),Ui=()=>(Ui=R.Db)();r._OrtInit=(i,u)=>(r._OrtInit=R.Eb)(i,u),r._OrtGetLastError=(i,u)=>(r._OrtGetLastError=R.Fb)(i,u),r._OrtCreateSessionOptions=(i,u,c,m,g,$,I,O,M,N)=>(r._OrtCreateSessionOptions=R.Gb)(i,u,c,m,g,$,I,O,M,N),r._OrtAppendExecutionProvider=(i,u,c,m,g)=>(r._OrtAppendExecutionProvider=R.Hb)(i,u,c,m,g),r._OrtAddFreeDimensionOverride=(i,u,c)=>(r._OrtAddFreeDimensionOverride=R.Ib)(i,u,c),r._OrtAddSessionConfigEntry=(i,u,c)=>(r._OrtAddSessionConfigEntry=R.Jb)(i,u,c),r._OrtReleaseSessionOptions=i=>(r._OrtReleaseSessionOptions=R.Kb)(i),r._OrtCreateSession=(i,u,c)=>(r._OrtCreateSession=R.Lb)(i,u,c),r._OrtReleaseSession=i=>(r._OrtReleaseSession=R.Mb)(i),r._OrtGetInputOutputCount=(i,u,c)=>(r._OrtGetInputOutputCount=R.Nb)(i,u,c),r._OrtGetInputName=(i,u)=>(r._OrtGetInputName=R.Ob)(i,u),r._OrtGetOutputName=(i,u)=>(r._OrtGetOutputName=R.Pb)(i,u),r._OrtFree=i=>(r._OrtFree=R.Qb)(i),r._OrtCreateTensor=(i,u,c,m,g,$)=>(r._OrtCreateTensor=R.Rb)(i,u,c,m,g,$),r._OrtGetTensorData=(i,u,c,m,g)=>(r._OrtGetTensorData=R.Sb)(i,u,c,m,g),r._OrtReleaseTensor=i=>(r._OrtReleaseTensor=R.Tb)(i),r._OrtCreateRunOptions=(i,u,c,m)=>(r._OrtCreateRunOptions=R.Ub)(i,u,c,m),r._OrtAddRunConfigEntry=(i,u,c)=>(r._OrtAddRunConfigEntry=R.Vb)(i,u,c),r._OrtReleaseRunOptions=i=>(r._OrtReleaseRunOptions=R.Wb)(i),r._OrtCreateBinding=i=>(r._OrtCreateBinding=R.Xb)(i),r._OrtBindInput=(i,u,c)=>(r._OrtBindInput=R.Yb)(i,u,c),r._OrtBindOutput=(i,u,c,m)=>(r._OrtBindOutput=R.Zb)(i,u,c,m),r._OrtClearBoundOutputs=i=>(r._OrtClearBoundOutputs=R._b)(i),r._OrtReleaseBinding=i=>(r._OrtReleaseBinding=R.$b)(i),r._OrtRunWithBinding=(i,u,c,m,g)=>(r._OrtRunWithBinding=R.ac)(i,u,c,m,g),r._OrtRun=(i,u,c,m,g,$,I,O)=>(r._OrtRun=R.bc)(i,u,c,m,g,$,I,O),r._OrtEndProfiling=i=>(r._OrtEndProfiling=R.cc)(i),r._JsepOutput=(i,u,c)=>(r._JsepOutput=R.dc)(i,u,c),r._JsepGetNodeName=i=>(r._JsepGetNodeName=R.ec)(i);var br=()=>(br=R.fc)(),et=r._free=i=>(et=r._free=R.gc)(i),_r=r._malloc=i=>(_r=r._malloc=R.ic)(i),Dn=(i,u,c,m,g,$)=>(Dn=R.kc)(i,u,c,m,g,$),Ni=()=>(Ni=R.lc)(),Vi=(i,u,c,m,g)=>(Vi=R.mc)(i,u,c,m,g),Wi=i=>(Wi=R.nc)(i),Mn=i=>(Mn=R.oc)(i),Li=(i,u)=>(Li=R.pc)(i,u),Gi=()=>(Gi=R.qc)(),ue=(i,u)=>(ue=R.rc)(i,u),Zt=i=>(Zt=R.sc)(i),Hi=(i,u)=>(Hi=R.tc)(i,u),ie=i=>(ie=R.uc)(i),Rn=i=>(Rn=R.vc)(i),ae=()=>(ae=R.wc)(),Fi=i=>(Fi=R.xc)(i),qi=i=>(qi=R.yc)(i),Ki=(i,u,c)=>(Ki=R.zc)(i,u,c),ji=i=>(ji=R.Ac)(i),Zi=r.dynCall_iii=(i,u,c)=>(Zi=r.dynCall_iii=R.Bc)(i,u,c),Qi=r.dynCall_vi=(i,u)=>(Qi=r.dynCall_vi=R.Cc)(i,u),Un=r.dynCall_ii=(i,u)=>(Un=r.dynCall_ii=R.Dc)(i,u),Yi=r.dynCall_vii=(i,u,c)=>(Yi=r.dynCall_vii=R.Ec)(i,u,c),Xi=r.dynCall_iiii=(i,u,c,m)=>(Xi=r.dynCall_iiii=R.Fc)(i,u,c,m),Ji=r.dynCall_viii=(i,u,c,m)=>(Ji=r.dynCall_viii=R.Gc)(i,u,c,m),ea=r.dynCall_iiiii=(i,u,c,m,g)=>(ea=r.dynCall_iiiii=R.Hc)(i,u,c,m,g),ta=r.dynCall_viiii=(i,u,c,m,g)=>(ta=r.dynCall_viiii=R.Ic)(i,u,c,m,g),ra=r.dynCall_viiiiii=(i,u,c,m,g,$,I)=>(ra=r.dynCall_viiiiii=R.Jc)(i,u,c,m,g,$,I),na=r.dynCall_viiiiiii=(i,u,c,m,g,$,I,O)=>(na=r.dynCall_viiiiiii=R.Kc)(i,u,c,m,g,$,I,O),oa=r.dynCall_ji=(i,u)=>(oa=r.dynCall_ji=R.Lc)(i,u),ia=r.dynCall_v=i=>(ia=r.dynCall_v=R.Mc)(i),aa=r.dynCall_viiiii=(i,u,c,m,g,$)=>(aa=r.dynCall_viiiii=R.Nc)(i,u,c,m,g,$),sa=r.dynCall_i=i=>(sa=r.dynCall_i=R.Oc)(i),ua=r.dynCall_fii=(i,u,c)=>(ua=r.dynCall_fii=R.Pc)(i,u,c),da=r.dynCall_viiiiiiii=(i,u,c,m,g,$,I,O,M)=>(da=r.dynCall_viiiiiiii=R.Qc)(i,u,c,m,g,$,I,O,M),la=r.dynCall_viiiiiiiiii=(i,u,c,m,g,$,I,O,M,N,K)=>(la=r.dynCall_viiiiiiiiii=R.Rc)(i,u,c,m,g,$,I,O,M,N,K),ca=r.dynCall_jiii=(i,u,c,m)=>(ca=r.dynCall_jiii=R.Sc)(i,u,c,m),pa=r.dynCall_dii=(i,u,c)=>(pa=r.dynCall_dii=R.Tc)(i,u,c),ma=r.dynCall_viiiiiiiii=(i,u,c,m,g,$,I,O,M,N)=>(ma=r.dynCall_viiiiiiiii=R.Uc)(i,u,c,m,g,$,I,O,M,N),fa=r.dynCall_viiiiiiiiiii=(i,u,c,m,g,$,I,O,M,N,K,J)=>(fa=r.dynCall_viiiiiiiiiii=R.Vc)(i,u,c,m,g,$,I,O,M,N,K,J),ha=r.dynCall_iiiiii=(i,u,c,m,g,$)=>(ha=r.dynCall_iiiiii=R.Wc)(i,u,c,m,g,$),ga=r.dynCall_iij=(i,u,c)=>(ga=r.dynCall_iij=R.Xc)(i,u,c),ya=r.dynCall_iiiiiiiiii=(i,u,c,m,g,$,I,O,M,N)=>(ya=r.dynCall_iiiiiiiiii=R.Yc)(i,u,c,m,g,$,I,O,M,N),ba=r.dynCall_iiiiiiiiiii=(i,u,c,m,g,$,I,O,M,N,K)=>(ba=r.dynCall_iiiiiiiiiii=R.Zc)(i,u,c,m,g,$,I,O,M,N,K),_a=r.dynCall_vij=(i,u,c)=>(_a=r.dynCall_vij=R._c)(i,u,c),wa=r.dynCall_iiif=(i,u,c,m)=>(wa=r.dynCall_iiif=R.$c)(i,u,c,m),va=r.dynCall_iiij=(i,u,c,m)=>(va=r.dynCall_iiij=R.ad)(i,u,c,m),$a=r.dynCall_fiii=(i,u,c,m)=>($a=r.dynCall_fiii=R.bd)(i,u,c,m),xa=r.dynCall_viiiiiiiiiiiii=(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)=>(xa=r.dynCall_viiiiiiiiiiiii=R.cd)(i,u,c,m,g,$,I,O,M,N,K,J,de,Se),Sa=r.dynCall_vjiii=(i,u,c,m,g)=>(Sa=r.dynCall_vjiii=R.dd)(i,u,c,m,g),Ta=r.dynCall_vif=(i,u,c)=>(Ta=r.dynCall_vif=R.ed)(i,u,c),Ca=r.dynCall_iiiiiii=(i,u,c,m,g,$,I)=>(Ca=r.dynCall_iiiiiii=R.fd)(i,u,c,m,g,$,I),Ia=r.dynCall_iiiij=(i,u,c,m,g)=>(Ia=r.dynCall_iiiij=R.gd)(i,u,c,m,g),Aa=r.dynCall_iiiiiiii=(i,u,c,m,g,$,I,O)=>(Aa=r.dynCall_iiiiiiii=R.hd)(i,u,c,m,g,$,I,O),Ea=r.dynCall_viiiiiiiiiiii=(i,u,c,m,g,$,I,O,M,N,K,J,de)=>(Ea=r.dynCall_viiiiiiiiiiii=R.id)(i,u,c,m,g,$,I,O,M,N,K,J,de),ka=r.dynCall_diii=(i,u,c,m)=>(ka=r.dynCall_diii=R.jd)(i,u,c,m),Pa=r.dynCall_jiiii=(i,u,c,m,g)=>(Pa=r.dynCall_jiiii=R.kd)(i,u,c,m,g),za=r.dynCall_viiij=(i,u,c,m,g)=>(za=r.dynCall_viiij=R.ld)(i,u,c,m,g),Oa=r.dynCall_fiiii=(i,u,c,m,g)=>(Oa=r.dynCall_fiiii=R.md)(i,u,c,m,g),Ba=r.dynCall_viiif=(i,u,c,m,g)=>(Ba=r.dynCall_viiif=R.nd)(i,u,c,m,g),Da=r.dynCall_diiii=(i,u,c,m,g)=>(Da=r.dynCall_diiii=R.od)(i,u,c,m,g),Ma=r.dynCall_viiid=(i,u,c,m,g)=>(Ma=r.dynCall_viiid=R.pd)(i,u,c,m,g),Ra=r.dynCall_iiiijii=(i,u,c,m,g,$,I)=>(Ra=r.dynCall_iiiijii=R.qd)(i,u,c,m,g,$,I),Ua=r.dynCall_iiiiiij=(i,u,c,m,g,$,I)=>(Ua=r.dynCall_iiiiiij=R.rd)(i,u,c,m,g,$,I),Na=i=>(Na=R.sd)(i),Va=()=>(Va=R.td)(),Wa=i=>(Wa=R.ud)(i),La=()=>(La=R.vd)();function Nm(i,u,c){var m=ae();try{Yi(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function Vm(i,u,c){var m=ae();try{return Zi(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function Wm(i,u){var c=ae();try{Qi(i,u)}catch(m){if(ie(c),m!==m+0)throw m;ue(1,0)}}function Lm(i,u){var c=ae();try{return Un(i,u)}catch(m){if(ie(c),m!==m+0)throw m;ue(1,0)}}function Gm(i,u,c,m){var g=ae();try{return Xi(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function Hm(i,u,c,m,g){var $=ae();try{ta(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function Fm(i,u,c,m,g){var $=ae();try{return ea(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function qm(i,u,c,m){var g=ae();try{Ji(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function Km(i,u,c,m,g,$,I){var O=ae();try{return Ca(i,u,c,m,g,$,I)}catch(M){if(ie(O),M!==M+0)throw M;ue(1,0)}}function jm(i){var u=ae();try{ia(i)}catch(c){if(ie(u),c!==c+0)throw c;ue(1,0)}}function Zm(i,u,c){var m=ae();try{return ga(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function Qm(i,u,c,m,g,$){var I=ae();try{aa(i,u,c,m,g,$)}catch(O){if(ie(I),O!==O+0)throw O;ue(1,0)}}function Ym(i,u,c){var m=ae();try{_a(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function Xm(i,u,c,m,g,$,I){var O=ae();try{ra(i,u,c,m,g,$,I)}catch(M){if(ie(O),M!==M+0)throw M;ue(1,0)}}function Jm(i,u,c,m,g,$,I,O){var M=ae();try{na(i,u,c,m,g,$,I,O)}catch(N){if(ie(M),N!==N+0)throw N;ue(1,0)}}function ef(i,u,c,m,g,$){var I=ae();try{return ha(i,u,c,m,g,$)}catch(O){if(ie(I),O!==O+0)throw O;ue(1,0)}}function tf(i,u,c,m,g,$,I,O){var M=ae();try{return Aa(i,u,c,m,g,$,I,O)}catch(N){if(ie(M),N!==N+0)throw N;ue(1,0)}}function rf(i,u,c,m,g,$,I,O,M,N){var K=ae();try{ma(i,u,c,m,g,$,I,O,M,N)}catch(J){if(ie(K),J!==J+0)throw J;ue(1,0)}}function nf(i,u,c,m,g,$,I,O,M){var N=ae();try{da(i,u,c,m,g,$,I,O,M)}catch(K){if(ie(N),K!==K+0)throw K;ue(1,0)}}function of(i){var u=ae();try{return sa(i)}catch(c){if(ie(u),c!==c+0)throw c;ue(1,0)}}function af(i,u,c,m,g,$,I,O,M,N){var K=ae();try{return ya(i,u,c,m,g,$,I,O,M,N)}catch(J){if(ie(K),J!==J+0)throw J;ue(1,0)}}function sf(i,u,c){var m=ae();try{return ua(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function uf(i,u,c,m){var g=ae();try{return ca(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;return ue(1,0),0n}}function df(i,u,c){var m=ae();try{return pa(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function lf(i,u,c,m,g,$,I,O,M,N,K,J){var de=ae();try{fa(i,u,c,m,g,$,I,O,M,N,K,J)}catch(Se){if(ie(de),Se!==Se+0)throw Se;ue(1,0)}}function cf(i,u,c,m,g,$,I,O,M,N,K){var J=ae();try{la(i,u,c,m,g,$,I,O,M,N,K)}catch(de){if(ie(J),de!==de+0)throw de;ue(1,0)}}function pf(i,u,c,m,g,$,I,O,M,N,K){var J=ae();try{return ba(i,u,c,m,g,$,I,O,M,N,K)}catch(de){if(ie(J),de!==de+0)throw de;ue(1,0)}}function mf(i,u,c,m){var g=ae();try{return wa(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function ff(i,u,c,m){var g=ae();try{return va(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function hf(i,u,c,m){var g=ae();try{return $a(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function gf(i,u,c,m,g,$,I,O,M,N,K,J,de,Se){var He=ae();try{xa(i,u,c,m,g,$,I,O,M,N,K,J,de,Se)}catch(Qt){if(ie(He),Qt!==Qt+0)throw Qt;ue(1,0)}}function yf(i,u,c,m,g){var $=ae();try{Sa(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function bf(i,u,c){var m=ae();try{Ta(i,u,c)}catch(g){if(ie(m),g!==g+0)throw g;ue(1,0)}}function _f(i,u){var c=ae();try{return oa(i,u)}catch(m){if(ie(c),m!==m+0)throw m;return ue(1,0),0n}}function wf(i,u,c,m,g){var $=ae();try{return Ia(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function vf(i,u,c,m,g,$,I,O,M,N,K,J,de){var Se=ae();try{Ea(i,u,c,m,g,$,I,O,M,N,K,J,de)}catch(He){if(ie(Se),He!==He+0)throw He;ue(1,0)}}function $f(i,u,c,m){var g=ae();try{return ka(i,u,c,m)}catch($){if(ie(g),$!==$+0)throw $;ue(1,0)}}function xf(i,u,c,m,g){var $=ae();try{return Pa(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;return ue(1,0),0n}}function Sf(i,u,c,m,g){var $=ae();try{za(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function Tf(i,u,c,m,g){var $=ae();try{return Oa(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function Cf(i,u,c,m,g){var $=ae();try{Ba(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function If(i,u,c,m,g){var $=ae();try{return Da(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function Af(i,u,c,m,g){var $=ae();try{Ma(i,u,c,m,g)}catch(I){if(ie($),I!==I+0)throw I;ue(1,0)}}function Ef(i,u,c,m,g,$,I){var O=ae();try{return Ra(i,u,c,m,g,$,I)}catch(M){if(ie(O),M!==M+0)throw M;ue(1,0)}}function kf(i,u,c,m,g,$,I){var O=ae();try{return Ua(i,u,c,m,g,$,I)}catch(M){if(ie(O),M!==M+0)throw M;ue(1,0)}}return r.stackSave=()=>ae(),r.stackRestore=i=>ie(i),r.stackAlloc=i=>Rn(i),r.setValue=function(i,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":me()[i>>>0]=u;break;case"i16":ve()[i>>>1>>>0]=u;break;case"i32":A()[i>>>2>>>0]=u;break;case"i64":Y[i>>>3]=BigInt(u);break;case"float":fe()[i>>>2>>>0]=u;break;case"double":De()[i>>>3>>>0]=u;break;case"*":G()[i>>>2>>>0]=u;break;default:ut(`invalid type for setValue: ${c}`)}},r.getValue=function(i,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return me()[i>>>0];case"i16":return ve()[i>>>1>>>0];case"i32":return A()[i>>>2>>>0];case"i64":return Y[i>>>3];case"float":return fe()[i>>>2>>>0];case"double":return De()[i>>>3>>>0];case"*":return G()[i>>>2>>>0];default:ut(`invalid type for getValue: ${u}`)}},r.UTF8ToString=Ee,r.stringToUTF8=Mt,r.lengthBytesUTF8=Jo,function i(){if(0<Bt)qt=i;else if(d)t(r),Ft();else{for(;0<bn.length;)bn.shift()(r);0<Bt?qt=i:(r.calledRun=!0,ne||(Ft(),t(r)))}}(),r.PTR_SIZE=4,o}),Uf=$s,Nf=globalThis.self?.name?.startsWith("em-pthread");Nf&&$s()});var Is,Qn,Vf,We,As,Zn,Wf,Lf,Es,Gf,Ts,ks,Cs,Ps,Tr=V(()=>{"use strict";Sr();Is=typeof location>"u"?void 0:location.origin,Qn=import.meta.url>"file:"&&import.meta.url<"file;",Vf=()=>{if(!!1){if(Qn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Is).href}return import.meta.url}},We=Vf(),As=()=>{if(We&&!We.startsWith("blob:"))return We.substring(0,We.lastIndexOf("/")+1)},Zn=(e,t)=>{try{let n=t??We;return(n?new URL(e,n):new URL(e)).origin===Is}catch{return!1}},Wf=(e,t)=>{let n=t??We;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Lf=(e,t)=>`${t??"./"}${e}`,Es=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Gf=async e=>(await import(/*webpackIgnore:true*/e)).default,Ts=(vs(),Yt(ws)).default,ks=async()=>{if(!We)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Zn(We))return[void 0,Ts()];let e=await Es(We);return[e,Ts(e)]},Cs=(Ss(),Yt(xs)).default,Ps=async(e,t,n)=>{if(!e&&!t&&Cs&&We&&Zn(We))return[void 0,Cs];{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??Wf(r,t),a=!!1&&n&&o&&!Zn(o,t),s=a?await Es(o):o??Lf(r,t);return[a?s:void 0,await Gf(s)]}}});var Yn,Xn,Br,zs,Hf,Ff,Cr,_e,bt=V(()=>{"use strict";Tr();Xn=!1,Br=!1,zs=!1,Hf=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ff=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Cr=async e=>{if(Xn)return Promise.resolve();if(Br)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(zs)throw new Error("previous call to 'initializeWebAssembly()' failed.");Br=!0;let t=e.initTimeout,n=e.numThreads;if(!Ff())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=Hf();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,d=s?.href??s,l=o?.wasm,p=l?.href??l,f=e.wasmBinary,[h,y]=await Ps(d,a,n>1),_=!1,b=[];if(t>0&&b.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),b.push(new Promise((w,S)=>{let x={numThreads:n};if(f)x.wasmBinary=f;else if(p||a)x.locateFile=v=>p??a+v;else if(d&&d.indexOf("blob:")!==0)x.locateFile=v=>new URL(v,d).href;else if(h){let v=As();v&&(x.locateFile=T=>v+T)}y(x).then(v=>{Br=!1,Xn=!0,Yn=v,w(),h&&URL.revokeObjectURL(h)},v=>{Br=!1,zs=!0,S(v)})})),await Promise.race(b),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},_e=()=>{if(Xn&&Yn)return Yn;throw new Error("WebAssembly is not initialized yet.")}});var Le,er,ye,Dr=V(()=>{"use strict";bt();Le=(e,t)=>{let n=_e(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},er=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")er(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ye=e=>{let t=_e(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let a=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),d=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(n)}}});var Os,Bs=V(()=>{"use strict";bt();Dr();Os=e=>{let t=_e(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Le(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),n===0&&ye("Can't create run options."),e?.extra!==void 0&&er(e.extra,"",new WeakSet,(s,d)=>{let l=Le(s,r),p=Le(d,r);t._OrtAddRunConfigEntry(n,l,p)!==0&&ye(`Can't set a run config entry: ${s} - ${d}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}});var qf,Kf,jf,Mr,Zf,Ds,Ms=V(()=>{"use strict";bt();Dr();qf=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Kf=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},jf=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Mr=(e,t,n,r)=>{let o=Le(t,r),a=Le(n,r);_e()._OrtAddSessionConfigEntry(e,o,a)!==0&&ye(`Can't set a session config entry: ${t} - ${n}.`)},Zf=async(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name,a=[];switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let h=r?.deviceType;h&&Mr(e,"deviceType",h,n)}break;case"webgpu":if(o="JS",typeof r!="string"){let f=r;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Mr(e,"preferredLayout",f.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let s=Le(o,n),d=a.length,l=0,p=0;if(d>0){l=_e()._malloc(d*_e().PTR_SIZE),n.push(l),p=_e()._malloc(d*_e().PTR_SIZE),n.push(p);for(let f=0;f<d;f++)_e().setValue(l+f*_e().PTR_SIZE,a[f][0],"*"),_e().setValue(p+f*_e().PTR_SIZE,a[f][1],"*")}await _e()._OrtAppendExecutionProvider(e,s,l,p,d)!==0&&ye(`Can't append execution provider: ${o}.`)}},Ds=async e=>{let t=_e(),n=0,r=[],o=e||{};jf(o);try{let a=qf(o.graphOptimizationLevel??"all"),s=Kf(o.executionMode??"sequential"),d=typeof o.logId=="string"?Le(o.logId,r):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof o.optimizedModelFilePath=="string"?Le(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,d,l,p,f),n===0&&ye("Can't create session options."),o.executionProviders&&await Zf(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Mr(n,"enableGraphCapture",o.enableGraphCapture.toString(),r)}if(o.freeDimensionOverrides)for(let[h,y]of Object.entries(o.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=Le(h,r);t._OrtAddFreeDimensionOverride(n,_,y)!==0&&ye(`Can't set a free dimension override: ${h} - ${y}.`)}return o.extra!==void 0&&er(o.extra,"",new WeakSet,(h,y)=>{Mr(n,h,y,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&ye("Can't release session options."),r.forEach(s=>t._free(s)),a}}});var Nt,_t,wt,Rr,tr,Ur,Nr,Jn,te=V(()=>{"use strict";Nt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},_t=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return n>0?Math.ceil(r*n):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},tr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Jn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var rr,eo=V(()=>{"use strict";Sr();rr=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Vn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Vn("node:fs"),r=n(e),o=[];for await(let a of r)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(d){if(d instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let s=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Qf,Yf,Rs,Us,Vr,Xf,pe,tt=V(()=>{"use strict";te();Qf=["V","I","W","E","F"],Yf=(e,t)=>{console.log(`[${Qf[e]},${new Date().toISOString()}]${t}`)},Vr=(e,t)=>{Rs=e,Us=t},Xf=(e,t)=>{let n=tr(e),r=tr(Rs);n>=r&&Yf(n,typeof t=="function"?t():t)},pe=(...e)=>{Us&&Xf(...e)}});var to,rt,P,At,Wr,Ns,Vs,se=V(()=>{"use strict";to=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},rt=class{static calcShape(t,n,r=!1){let o=t.length,a=n.length;if(o===0)return n;if(a===0)return t;let s=Math.max(t.length,n.length),d=new Array(s);if(r){if(o<2||a<2)return;let l=to.calcMatMulShape([t[o-2],t[o-1]],[n[a-2],n[a-1]]);if(l===void 0)return;[d[s-2],d[s-1]]=l}for(let l=r?3:1;l<=s;l++){let p=o-l<0?1:t[o-l],f=a-l<0?1:n[a-l];if(p!==f&&p>1&&f>1)return;let h=Math.max(p,f);if(p&&f)d[s-l]=Math.max(p,f);else{if(h>1)return;d[s-l]=0}}return d}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let a=1;a<=r;a++)if(t[r-a]!==1&&t[r-a]!==n[o-a])return!1;return!0}},P=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){o[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,n/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,a)=>o+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},At=class e{static adjustPoolAttributes(t,n,r,o,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<n.length-2;d++)d>=r.length?r.push(n[d+2]):r[d]=n[d+2];for(let d=0;d<r.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<r.length;d++)if(d<a.length){if(a[d]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let d=0;d<r.length*2;d++)if(d<s.length){if(s[d]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let d=0;d<r.length;d++){if(r[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[d]>=r[d]||s[d+r.length]>=r[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,a,s,d){if(d){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],r[l],o[l],a,l,l+t.length-2,d)}}static computePoolOutputShape(t,n,r,o,a,s,d){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,r,o,a,s,d),l}static computeConvOutputShape(t,n,r,o,a,s,d){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,r,o,a,s,d),l}static computeShapeHelper(t,n,r,o,a,s,d,l){if(t)for(let p=0;p<n.length-2;p++)r.push(1);else for(let p=0;p<n.length-2;p++)r.push(e.adjustPadAndReturnShape(n[p+2],o[p],a[p],s[p],d,p,p+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,o,a,s,d,l){let p=r*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[d]=0,Math.floor((t-p)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+n-1)/n-1)*n+o-t;return a[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),a[d]=h-a[s],Math.floor((t+h-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[d]-p)/n+1)}},Wr=class{static getShapeOfGemmResult(t,n,r,o,a){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,d,l;n?(s=t[1],d=t[0]):(s=t[0],d=t[1]);let p=-1;if(o?(l=r[0],p=1):(l=r[1],p=0),r[p]!==d)throw new Error("dimension mismatch");if(s<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(a&&!rt.isValidBroadcast(a,[s,l]))throw new Error("gemm: invalid bias shape for broadcast");return[s,l,d]}},Ns=-34028234663852886e22,Vs=34028234663852886e22});var Lr,ro=V(()=>{"use strict";te();Lr=(e,t)=>new(Rr(t))(e)});var Jf,Ws,eh,Ls,Gr,Hr,no,Gs,Hs=V(()=>{"use strict";tt();Jf=1,Ws=()=>Jf++,eh=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ls=(e,t)=>{let n=eh.get(e);if(!n)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((r,o)=>r*o)*n/8):0},Gr=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Ls(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,n,r){return this.mlContext===t&&this.dataType===n&&this.tensorShape.length===r.length&&this.tensorShape.every((o,a)=>o===r[a])}},Hr=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,n,r,o){let a=this.tensorManager.getMLContext(t);if(this.wrapper){if(this.wrapper.canReuseTensor(a,n,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Ls(n,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,r,s,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},no=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let n=this.backend.getMLContext(t);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let t=Ws();return this.tensorTrackersById.set(t,new Hr(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o,a){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${r}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(n);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,r,o,a)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let a=this.getMLContext(t),s=Ws(),d=new Gr({sessionId:t,context:a,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(s,new Hr(this,d)),this.externalTensors.add(d),s}async getCachedTensor(t,n,r,o,a,s){let d=this.getMLContext(t);for(let[p,f]of this.freeTensors.entries())if(f.canReuseTensor(d,n,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, shape: ${r}}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=t,h}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, shape: ${r}}`);let l=await d.createTensor({dataType:n,shape:r,dimensions:r,usage:o,writable:a,readable:s});return new Gr({sessionId:t,context:d,tensor:l,dataType:n,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Gs=(...e)=>new no(...e)});var oo,th,Fr,Fs=V(()=>{"use strict";te();bt();ro();Hs();tt();oo=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),th=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,a)=>o===r[a]&&e[o]===t[o])},Fr=class{constructor(t){this.tensorManager=Gs(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Vr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let n=this.temporarySessionTensorIds.get(t);if(n){for(let r of n)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>th(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(a=>a.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o,a){let s=oo.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,n,s,o,a)}async createTemporaryTensor(t,n,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${r}}`);let o=oo.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,r,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,n){if(!_e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Lr(r,n)}}registerMLTensor(t,n,r,o){let a=oo.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(t,n,a,o);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,n,r,o,a,s){if(!s)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let l=s.get(d);if(!l)throw new Error(`File with name ${d} not found in preloaded files.`);if(n+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(n,n+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(p);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":f=new Int32Array(p);break;case"uint32":f=new Uint32Array(p);break;case"int64":f=new BigInt64Array(p);break;case"uint64":f=new BigUint64Array(p);break;case"int8":f=new Int8Array(p);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}}`),o.constant(a,f)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,n){let r=this.sessionGraphInputs.get(t);return r?r.includes(n):!1}flush(){}}});var qr=V(()=>{"use strict"});var qs,io,ao,rh,nh,Ks,uo,so,Zs,Qs=V(()=>{"use strict";tt();qr();qs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),io=[],ao=e=>Math.ceil(Number(e)/16)*16,rh=e=>{for(let t=0;t<io.length;t++){let n=io[t];if(e<=n)return n}return Math.ceil(e/16)*16},nh=1,Ks=()=>nh++,uo=async(e,t,n,r)=>{let o=ao(n),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let d=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(d,0,n)),l}else return new Uint8Array(d.slice(0,n))}finally{a.destroy()}},so=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of qs)io.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,a=n.byteLength,s=ao(a),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${a}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(r,o,a)),l.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(l,0,d.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=ao(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ks();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=rh(t),o,a=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let p=(a?this.freeBuffers:this.freeUniformBuffers).get(r);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let d={id:Ks(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await uo(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=qs.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Zs=(...e)=>new so(...e)});var lo,re,Ie=V(()=>{"use strict";lo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new lo(e)});var Et,po,we,ze,L,he,mo,kt,je,j,Kr,z,U,Ys,jr,co,Xs,ce=V(()=>{"use strict";te();se();Et=64,po=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},we=(e,t=1)=>{let n=po(e,t);return typeof n=="string"?n:n[0]},ze=(e,t=1)=>{let n=po(e,t);return typeof n=="string"?n:n[1]},L=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:P.computeStrides(n)})}),t},he=e=>e%4===0?4:e%2===0?2:1,mo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,kt=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,je=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Kr=(e,t,n,r,o)=>{let a=typeof n=="number",s=a?n:n.length,d=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=po(t,o),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],y={indices:l,value:f,storage:h,tensor:t},_=A=>typeof A=="string"?A:`${A}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",S=`${w}${e}_shape`,x=`${w}${e}_strides`,v="";for(let A=0;A<s-1;A++)v+=`
    let dim${A} = current / ${j(x,A,s)};
    let rest${A} = current % ${j(x,A,s)};
    indices[${A}] = dim${A};
    current = rest${A};
    `;v+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${v}
    return indices;
  }`,C=A=>(b.offsetToIndices=!0,s<2?A:`o2i_${e}(${A})`),k=[];if(s>=2)for(let A=s-1;A>=0;A--)k.push(`${j(x,A,s)} * (indices[${A}])`);let E=s<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${k.join("+")};
  }`,B=A=>(b.indicesToOffset=!0,s<2?A:`i2o_${e}(${A})`),D=(...A)=>s===0?"0u":`${y.indices}(${A.map(_).join(",")})`,W=(A,G)=>s<2?`${A}`:`${j(A,G,s)}`,F=(A,G,fe)=>s<2?`${A}=${fe};`:`${j(A,G,s)}=${fe};`,Z={},X=(A,G)=>{b.broadcastedIndicesToOffset=!0;let fe=`${G.name}broadcastedIndicesTo${e}Offset`;if(fe in Z)return`${fe}(${A})`;let De=[];for(let Te=s-1;Te>=0;Te--){let Ae=G.indicesGet("outputIndices",Te+G.rank-s);De.push(`${W(x,Te)} * (${Ae} % ${W(S,Te)})`)}return Z[fe]=`fn ${fe}(outputIndices: ${G.type.indices}) -> u32 {
             return ${De.length>0?De.join("+"):"0u"};
           }`,`${fe}(${A})`},H=(A,G)=>(()=>{if(y.storage===y.value)return`${e}[${A}]=${G};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${A}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${A}]=vec2<u32>(u32(${G}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${A}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),Y=A=>(()=>{if(y.storage===y.value)return`${e}[${A}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${A}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${A}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${A}] & 0xFFu), bool(${e}[${A}] & 0xFF00u), bool(${e}[${A}] & 0xFF0000u), bool(${e}[${A}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),xe=s<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${f} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,q=s<2?"":(()=>{let A=d.map(fe=>`d${fe}: u32`).join(", "),G=d.map(fe=>`d${fe}`).join(", ");return`
  fn get_${e}(${A}) -> ${f} {
    return get_${e}ByIndices(${D(G)});
  }`})(),Q=(...A)=>{if(A.length!==s)throw new Error(`indices length must be ${s}`);let G=A.map(_).join(",");return s===0?Y("0u"):s===1?Y(G[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${G})`)},ne=A=>s<2?Y(A):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${A})`),ee=s<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${f}) {
    ${H(`i2o_${e}(indices)`,"value")}
  }`,me=s<2?"":(()=>{let A=d.map(fe=>`d${fe}: u32`).join(", "),G=d.map(fe=>`d${fe}`).join(", ");return`
  fn set_${e}(${A}, value: ${f}) {
    set_${e}ByIndices(${D(G)}, value);
  }`})();return{impl:()=>{let A=[],G=!1;return b.offsetToIndices&&(A.push(T),G=!0),b.indicesToOffset&&(A.push(E),G=!0),b.broadcastedIndicesToOffset&&(Object.values(Z).forEach(fe=>A.push(fe)),G=!0),b.set&&(A.push(me),G=!0),b.setByIndices&&(A.push(ee),G=!0),b.get&&(A.push(q),G=!0),b.getByIndices&&(A.push(xe),G=!0),!a&&G&&A.unshift(`const ${S} = ${y.indices}(${n.join(",")});`,`const ${x} = ${y.indices}(${P.computeStrides(n).join(",")});`),A.join(`
`)},type:y,offsetToIndices:C,indicesToOffset:B,broadcastedIndicesToOffset:X,indices:D,indicesGet:W,indicesSet:F,set:(...A)=>{if(A.length!==s+1)throw new Error(`indices length must be ${s}`);let G=A[s];if(typeof G!="string")throw new Error("value must be string");let fe=A.slice(0,s).map(_).join(",");return s===0?H("0u",G):s===1?H(fe[0],G):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${fe}, ${G})`)},setByOffset:H,setByIndices:(A,G)=>s<2?H(A,G):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${A}, ${G});`),get:Q,getByOffset:Y,getByIndices:ne,usage:r,name:e,strides:x,shape:S,rank:s}},z=(e,t,n,r=1)=>Kr(e,t,n,"input",r),U=(e,t,n,r=1)=>Kr(e,t,n,"output",r),Ys=(e,t,n)=>Kr(e,t,n,"atomicOutput",1),jr=(e,t,n,r=1)=>Kr(e,t,n,"internal",r),co=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Et){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},Xs=(e,t)=>new co(e,t)});var oh,Js,ih,ah,sh,uh,Oe,eu,tu,ct=V(()=>{"use strict";te();se();Ie();ce();oh=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Js=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ih=(e,t)=>P.sortBasedOnPerm(e,Js(e.length,t)),ah=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},sh=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},uh=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},Oe=(e,t)=>{let n=e.dataType,r=e.dims.length,o=Js(r,t),a=ih(e.dims,o),s=e.dims,d=a,l=r<2||uh(o,e.dims),p;if(l)return p=w=>{let S=z("input",n,s,4),x=U("output",n,d,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,x)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=sh(e.dims,o),y=P.areEqual(h,[2,3,1]),_=P.areEqual(h,[3,1,2]);if(f.length===2||y||_){s=y?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,d=[s[1],s[0]];let w=16;return p=S=>{let x=z("a",n,s.length),v=U("output",n,d.length);return`
  ${S.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${S.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/w),y:Math.ceil(d[0]/w)},programUniforms:[{type:12,data:S},...L(s,d)]}},getShaderSource:p}}return p=w=>{let S=z("a",n,s.length),x=U("output",n,d.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,x)}

  ${ah(o,r,S,x)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...L(s,d)]}},getShaderSource:p}},eu=(e,t)=>{oh(e.inputs,t.perm),e.compute(Oe(e.inputs[0],t.perm))},tu=e=>re({perm:e.perm})});var dh,lh,ch,ph,mh,fh,hh,gh,yh,bh,nt,ru,nu,ou,iu,au,su,uu,du,lu,cu,pu=V(()=>{"use strict";te();se();ce();Zr();ct();dh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},lh={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ch={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ph={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},mh=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},fh=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let o=t.map(a=>e[a]);return[n,o]},hh=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[o++]):r.push(1);return r},gh=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},yh=(e,t)=>{let n=[];if(!gh(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},bh=(e,t,n,r,o,a,s)=>{let d=n[0].dims,l=P.size(a),p=P.size(s),f=z("_A",n[0].dataType,d),h=U("output",o,a),y=64;l===1&&(y=256);let _=`
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

          var bestValue = f32(${ch[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${dh[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${lh[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${ph[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},nt=(e,t,n,r)=>{let o=e.inputs.length===1?n:fo(e.inputs,n),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,b)=>b));let s=P.normalizeAxes(a,e.inputs[0].dims.length),d=s,l=e.inputs[0],p=yh(d,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Oe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],d=mh(d.length,l.dims.length));let[f,h]=fh(l.dims,d),y=f;o.keepDims&&(y=hh(f,s)),e.compute(bh(t,o.cacheKey,[l],r,e.inputs[0].dataType,y,h),{inputs:[l]})},ru=(e,t)=>{nt(e,"ReduceMeanShared",t,"mean")},nu=(e,t)=>{nt(e,"ReduceL1Shared",t,"l1")},ou=(e,t)=>{nt(e,"ReduceL2Shared",t,"l2")},iu=(e,t)=>{nt(e,"ReduceLogSumExpShared",t,"logSumExp")},au=(e,t)=>{nt(e,"ReduceMaxShared",t,"max")},su=(e,t)=>{nt(e,"ReduceMinShared",t,"min")},uu=(e,t)=>{nt(e,"ReduceProdShared",t,"prod")},du=(e,t)=>{nt(e,"ReduceSumShared",t,"sum")},lu=(e,t)=>{nt(e,"ReduceSumSquareShared",t,"sumSquare")},cu=(e,t)=>{nt(e,"ReduceLogSumShared",t,"logSum")}});var ot,_h,Qr,fo,it,wh,vh,$h,xh,Sh,Th,Ch,Ih,Ah,Eh,at,mu,fu,hu,gu,yu,bu,_u,wu,vu,$u,Zr=V(()=>{"use strict";te();se();Ie();ce();pu();ot=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},_h=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,n,r,o,a,s=!1,d=!1)=>{let l=[],p=n[0].dims,f=p.length,h=P.normalizeAxes(o,f),y=!d&&h.length===0;p.forEach((S,x)=>{y||h.indexOf(x)>=0?s&&l.push(1):l.push(S)});let _=l.length,b=P.size(l);return{name:e,shaderCache:t,getShaderSource:S=>{let x=[],v=z("_A",n[0].dataType,f),T=U("output",a,_),C=r(v,T,h),k=C[2];for(let E=0,B=0;E<f;E++)y||h.indexOf(E)>=0?(s&&B++,k=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${C[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${k}
                }`):(x.push(`${v.indicesSet("input_indices",E,T.indicesGet("output_indices",B))};`),B++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,T)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${k}
          ${C[3]}
          ${C.length===4?T.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...L(p,l)]})}},fo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),re({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},it=(e,t,n,r)=>{let o=e.inputs,a=o.length===1?n:fo(o,n);e.compute(Qr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?_h:r,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},wh=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},vh=(e,t)=>{ot(e.inputs),it(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},$h=(e,t)=>{ot(e.inputs),it(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},xh=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Sh=(e,t)=>{ot(e.inputs),it(e,"ReduceMax",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",d,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Th=(e,t)=>{ot(e.inputs),it(e,"ReduceMean",t,(r,o,a)=>{let s=1;for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&(s*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Ch=(e,t)=>{ot(e.inputs),it(e,"ReduceMin",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Ih=(e,t)=>{ot(e.inputs),it(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Ah=(e,t)=>{ot(e.inputs),it(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Eh=(e,t)=>{ot(e.inputs),it(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},at=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:o*=e[a];return o<32&&r>1024},mu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Th(e,t):ru(e,t)},fu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vh(e,t):nu(e,t)},hu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$h(e,t):ou(e,t)},gu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xh(e,t):iu(e,t)},yu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sh(e,t):au(e,t)},bu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ch(e,t):su(e,t)},_u=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ih(e,t):uu(e,t)},wu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ah(e,t):du(e,t)},vu=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Eh(e,t):lu(e,t)},$u=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wh(e,t):cu(e,t)}});var xu,Su,Tu,ho,Cu=V(()=>{"use strict";te();Ie();Zr();xu=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Su=(e,t)=>{xu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Tu=(e,t)=>{xu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},ho=e=>re(e)});var kh,go,Ph,zh,Oh,Vt,Bh,Iu,Yr=V(()=>{"use strict";te();se();qr();ce();kh=(e,t)=>{let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4],d=e[5];if(s&&d)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],p=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=o.dims[0]/3,y=h,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let b=p;if(h!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==h+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let S=b+w,x=-1,v=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:w,kvSequenceLength:b,totalSequenceLength:S,maxSequenceLength:x,inputHiddenSize:f,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},go=(e,t,n)=>t&&e?`
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
    `,Ph=(e,t,n,r,o,a,s,d)=>{let l=he(s?1:a),p=64,f=a/l;f<p&&(p=32);let h=Math.ceil(a/l/p),y=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:f},{type:12,data:h}],_=we(e.dataType,l),b=ze(1,l),w=["type"];s&&w.push("type"),d&&w.push("type");let S=x=>{let v=U("x",e.dataType,e.dims,l),T=[v],C=s?z("seq_lens",s.dataType,s.dims):void 0;C&&T.push(C);let k=d?z("total_sequence_length_input",d.dataType,d.dims):void 0;k&&T.push(k);let E=ze(e.dataType),B=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${x.registerUniforms(B).declareVariables(...T)}
  ${x.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${go(C,k,!1)}
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
        x[offset + i] = ${v.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:w},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*n},programUniforms:y})}},zh=(e,t,n,r,o,a,s,d,l)=>{let p=s+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,p],h=e>1&&r,y=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,y,p,a.headSize]:void 0,b=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=he(a.headSize),x=a.headSize/S,v=12,T={x:Math.ceil(p/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:x},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],k=h&&r&&P.size(r.dims)>0,E=["type","type"];k&&E.push("type"),o&&E.push("type"),d&&E.push("type"),l&&E.push("type");let B=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&B.push({dims:_,dataType:t.dataType,gpuDataType:0});let D=W=>{let F=z("q",t.dataType,t.dims,S),Z=z("key",n.dataType,n.dims,S),X=[F,Z];if(k){let ee=z("past_key",r.dataType,r.dims,S);X.push(ee)}o&&X.push(z("attention_bias",o.dataType,o.dims));let H=d?z("seq_lens",d.dataType,d.dims):void 0;H&&X.push(H);let Y=l?z("total_sequence_length_input",l.dataType,l.dims):void 0;Y&&X.push(Y);let xe=U("output",t.dataType,f),q=[xe];h&&q.push(U("present_key",t.dataType,_,S));let Q=ze(1,S),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${W.registerUniforms(ne).declareVariables(...X,...q)}
  ${W.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${go(H,Y,!0)}
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
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${xe.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${r!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:B,dispatchGroup:T,programUniforms:C}),getShaderSource:D}},Oh=(e,t,n,r,o,a,s=void 0,d=void 0)=>{let l=a+o.kvSequenceLength,p=o.nReps?o.nReps:1,f=o.vHiddenSize*p,h=e>1&&r,y=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=h?[o.batchSize,y,l,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,f],w=12,S={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},x=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=h&&r&&P.size(r.dims)>0,T=["type","type"];v&&T.push("type"),s&&T.push("type"),d&&T.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&C.push({dims:_,dataType:t.dataType,gpuDataType:0});let k=E=>{let B=z("probs",t.dataType,t.dims),D=z("v",n.dataType,n.dims),W=[B,D];v&&W.push(z("past_value",r.dataType,r.dims));let F=s?z("seq_lens",s.dataType,s.dims):void 0;s&&W.push(F);let Z=d?z("total_sequence_length_input",d.dataType,d.dims):void 0;d&&W.push(Z);let H=[U("output",t.dataType,b)];h&&H.push(U("present_value",t.dataType,_));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${B.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${B.type.value}, ${w*w}>;
  ${E.registerUniforms(Y).declareVariables(...W,...H)}
  ${E.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${go(F,Z,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${B.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:C,dispatchGroup:S,programUniforms:x}),getShaderSource:k}},Vt=(e,t,n,r,o,a,s,d,l,p,f=void 0,h=void 0)=>{let y=Math.min(e.outputCount,1+(s?1:0)+(d?1:0)),_=y>1?p.pastSequenceLength:0,b=_+p.kvSequenceLength,w=l&&P.size(l.dims)>0?l:void 0,S=[t,n];y>1&&s&&P.size(s.dims)>0&&S.push(s),w&&S.push(w),f&&S.push(f),h&&S.push(h);let x=e.compute(zh(y,t,n,s,w,p,_,f,h),{inputs:S,outputs:y>1?[-1,1]:[-1]})[0];e.compute(Ph(x,p.batchSize,p.numHeads,_,p.sequenceLength,b,f,h),{inputs:f&&h?[x,f,h]:[x],outputs:[]});let v=[x,r];y>1&&d&&P.size(d.dims)>0&&v.push(d),f&&v.push(f),h&&v.push(h),e.compute(Oh(y,x,r,d,p,_,f,h),{inputs:v,outputs:y>1?[0,2]:[0]})},Bh=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,d={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:r},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let y=U("output_q",l[0].dataType,n),_=U("output_k",l[0].dataType,n),b=U("output_v",l[0].dataType,n),w=z("input",l[0].dataType,l[0].dims),S=z("weight",l[1].dataType,l[1].dims),x=z("bias",l[2].dataType,l[2].dims),v=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${h.registerUniforms(T).declareVariables(w,S,x,y,_,b)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},Iu=(e,t)=>{let n=kh(e.inputs,t),[r,o,a]=Bh(e,n);return Vt(e,r,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var Dh,Mh,Rh,Au,Eu=V(()=>{"use strict";Fe();te();se();Ie();ce();Dh=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,a)=>{let s=o.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((d,l)=>{if(d!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Mh=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,a=e[0].dims,s=r?he(a[a.length-1]):1,d=o==="NHWC"&&a.length>1?s:1,l=P.size(a)/s,p=r,f=p?a.length:a,h=z("x",e[0].dataType,e[0].dims,s),y=z("scale",e[1].dataType,e[1].dims,d),_=z("bias",e[2].dataType,e[2].dims,d),b=z("inputMean",e[3].dataType,e[3].dims,d),w=z("inputVar",e[4].dataType,e[4].dims,d),S=U("y",e[0].dataType,f,s),x=()=>{let T="";if(r)T=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<y.rank;C++)T+=`cIndices[${C}] = outputIndices[${C}];`;T+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return T},v=T=>`
  const epsilon = ${n};
  ${T.registerUniform("outputSize","u32").declareVariables(h,y,_,b,w,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${x()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...L(a)]:[{type:12,data:l}]})}},Rh=e=>re(e),Au=(e,t)=>{let{inputs:n,outputCount:r}=e,o=Rh({...t,outputCount:r});if($e.webgpu.validateInputContent&&Dh(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Mh(n,o))}});var Uh,Nh,ku,Pu=V(()=>{"use strict";se();ce();Uh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Nh=e=>{let t=e[0].dims,n=e[0].dims[2],r=P.size(t)/4,o=e[0].dataType,a=z("input",o,t,4),s=z("bias",o,[n],4),d=z("residual",o,t,4),l=U("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(a,s,d,l)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},ku=e=>{Uh(e.inputs),e.compute(Nh(e.inputs))}});var Vh,ge,zu,Ou,Bu,Du,Mu,Ru,Uu,Nu,Vu,Wh,Wu,Lu,Gu,Hu,nr,Fu,Xr,qu,Ku,ju,Zu,Qu,Yu,Xu,Ju,ed,td,rd,nd,od,id,ad,sd,ud,dd,yo,bo,ld,cd,pd,Lh,Gh,md,Jr=V(()=>{"use strict";te();se();Ie();ce();Vh=(e,t,n,r,o,a,s)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let p=z("inputData",n,[d],4),f=U("outputData",r,[d],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},ge=(e,t,n,r,o,a=e.dataType,s,d)=>{let l=[{type:12,data:Math.ceil(P.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Vh(p,P.size(e.dims),e.dataType,a,n,r,d),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(P.size(p[0].dims)/64/4)},programUniforms:l})}},zu=e=>{e.compute(ge(e.inputs[0],"Abs","abs"))},Ou=e=>{e.compute(ge(e.inputs[0],"Acos","acos"))},Bu=e=>{e.compute(ge(e.inputs[0],"Acosh","acosh"))},Du=e=>{e.compute(ge(e.inputs[0],"Asin","asin"))},Mu=e=>{e.compute(ge(e.inputs[0],"Asinh","asinh"))},Ru=e=>{e.compute(ge(e.inputs[0],"Atan","atan"))},Uu=e=>{e.compute(ge(e.inputs[0],"Atanh","atanh"))},Nu=e=>re(e),Vu=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ge(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Wh=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:n})},Wu=(e,t)=>{let n=t||Wh(e.inputs),r=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Lu=e=>{e.compute(ge(e.inputs[0],"Ceil","ceil"))},Gu=e=>{e.compute(ge(e.inputs[0],"Cos","cos"))},Hu=e=>{e.compute(ge(e.inputs[0],"Cosh","cosh"))},nr=e=>re(e),Fu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
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
}`,qu=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Xr(t)))},Ku=e=>{e.compute(ge(e.inputs[0],"Exp","exp"))},ju=e=>{e.compute(ge(e.inputs[0],"Floor","floor"))},Zu=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Xr(t)))},Qu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Yu=e=>{e.compute(ge(e.inputs[0],"Not",t=>`!${t}`))},Xu=e=>{e.compute(ge(e.inputs[0],"Neg",t=>`-${t}`))},Ju=e=>{e.compute(ge(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ed=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},td=e=>{e.compute(ge(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},rd=e=>re(e),nd=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},od=e=>{e.compute(ge(e.inputs[0],"Sin","sin"))},id=e=>{e.compute(ge(e.inputs[0],"Sinh","sinh"))},ad=e=>{e.compute(ge(e.inputs[0],"Sqrt","sqrt"))},sd=e=>{e.compute(ge(e.inputs[0],"Tan","tan"))},ud=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,dd=e=>{e.compute(ge(e.inputs[0],"Tanh",ud))},yo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ud("v")};
}
`,bo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ld=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"FastGelu",bo,yo(t),void 0,e.inputs[0].dataType))},cd=(e,t)=>{let n=ze(e.inputs[0].dataType);return e.compute(ge(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},pd=e=>{e.compute(ge(e.inputs[0],"Log","log"))},Lh=(e,t)=>`
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
`,Gh=e=>`quick_gelu_impl(${e})`,md=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"QuickGelu",Gh,Lh(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Hh,Fh,hd,gd=V(()=>{"use strict";se();ce();Jr();Hh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fh=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=z("input",e[0].dataType,e[0].dims,4),r=z("bias",e[0].dataType,[e[0].dims[2]],4),o=U("output",e[0].dataType,t,4),a=P.size(t)/4,s=we(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(n,r,o)}

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
  }`}},hd=e=>{Hh(e.inputs),e.compute(Fh(e.inputs))}});var qh,Kh,st,yd,bd,_d,wd,vd,$d,xd,Sd,Td,Cd,Id=V(()=>{"use strict";te();se();ce();qh=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y,_;typeof d=="string"?y=_=(v,T)=>`${d}((${v}),(${T}))`:typeof d=="function"?y=_=d:(y=d.scalar,_=d.vector);let b=U("outputData",f,r.length,4),w=z("aData",l,t.length,4),S=z("bData",p,n.length,4),x;if(o)if(a){let v=P.size(t)===1,T=P.size(n)===1,C=t.length>0&&t[t.length-1]%4===0,k=n.length>0&&n[n.length-1]%4===0;v||T?x=b.setByOffset("global_idx",_(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):x=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",_(s||C?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||k?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=b.setByOffset("global_idx",_(w.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(T,C,k="")=>{let E=`aData[indexA${C}][componentA${C}]`,B=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${S.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${T}[${C}] = ${k}(${y(E,B)});
          `};f===9?x=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(w,S,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},Kh=(e,t,n,r,o,a,s=n.dataType)=>{let d=n.dims.map(w=>Number(w)??1),l=r.dims.map(w=>Number(w)??1),p=!P.areEqual(d,l),f=d,h=P.size(d),y=!1,_=!1,b=[p];if(p){let w=rt.calcShape(d,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");f=w.slice(),h=P.size(f);let S=P.size(d)===1,x=P.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;b.push(S),b.push(x),b.push(v),b.push(T);let C=1;for(let k=1;k<f.length;k++){let E=d[d.length-k],B=l[l.length-k];if(E===B)C*=E;else break}C%4===0?(_=!0,y=!0):(S||x||v||T)&&(y=!0)}else y=!0;return b.push(y),{name:e,shaderCache:{hint:t+b.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>qh(w,d,l,f,y,p,_,o,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(P.size(f)/4)},...L(d,l,f)]})}},st=(e,t,n,r,o,a)=>{e.compute(Kh(t,o??"",e.inputs[0],e.inputs[1],n,r,a))},yd=e=>{st(e,"Add",(t,n)=>`${t}+${n}`)},bd=e=>{st(e,"Div",(t,n)=>`${t}/${n}`)},_d=e=>{st(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},wd=e=>{st(e,"Mul",(t,n)=>`${t}*${n}`)},vd=e=>{let t=z("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;st(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
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
      `)},$d=e=>{st(e,"Sub",(t,n)=>`${t}-${n}`)},xd=e=>{st(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Sd=e=>{st(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Td=e=>{st(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Cd=e=>{st(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Zh,Qh,Yh,Xh,Ad,Ed,kd=V(()=>{"use strict";te();se();Ie();ce();Zh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,a=r.dims.length;e.forEach((s,d)=>{if(d!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==r.dims[p])throw new Error("non concat dimensions must match")})}})},Qh=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Yh=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(a):o===0?r.push(`if (inputIndex == ${o}u) { ${a} }`):o===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${o}) { ${a} }`)}return r.join(`
`)},Xh=(e,t,n,r)=>{let o=P.size(n),a=new Array(e.length),s=new Array(e.length),d=0,l=[],p=[],f=[{type:12,data:o}];for(let w=0;w<e.length;++w)d+=e[w].dims[t],a[w]=d,p.push(e[w].dims.length),s[w]=z(`input${w}`,r,p[w]),l.push("rank"),f.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)f.push(...L(e[w].dims));f.push(...L(n));let h=U("output",r,n.length),y=h.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),b=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)w.registerUniform(`sizeInConcatAxis${S}`,"u32");return w.declareVariables(...s,h)})()}

  ${Qh(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Yh(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:b}},Ad=(e,t)=>{let n=e.inputs,r=n[0].dims,o=P.normalizeAxis(t.axis,r.length);Zh(n,o);let a=r.slice();a[o]=n.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let s=n.filter(d=>P.size(d.dims)>0);e.compute(Xh(s,o,a,n[0].dataType),{inputs:s})},Ed=e=>re({axis:e.axis})});var Ze,Qe,Ye,en,vt=V(()=>{"use strict";te();se();Ze=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ye=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},en=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[Ns,Vs];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var Pe,Pd,tn=V(()=>{"use strict";Pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Pd=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var zd,Od=V(()=>{"use strict";zd=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var or,rn,nn=V(()=>{"use strict";te();se();ce();vt();or=(e,t,n,r,o)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,d)=>`
      if (${j(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,j(o,d+a,r))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},rn=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s[s.length-2],p=d[d.length-1],f=s[s.length-1],h=he(p),y=he(f),_=he(l),b=P.size(n)/h/_,w=e.length>2,S=r?r.slice(0,-2):n.slice(0,-2),v=[P.size(S),l,p],T=[{type:12,data:b},{type:12,data:l},{type:12,data:p},{type:12,data:f}];Qe(t,T),T.push(...L(S,s,d)),w&&T.push(...L(e[2].dims)),T.push(...L(v));let C=k=>{let E=jr("batch_dims",e[0].dataType,S.length),B=z("a",e[0].dataType,s.length,y),D=z("b",e[1].dataType,d.length,h),W=U("output",e[0].dataType,v.length,h),F=we(W.type.tensor),Z=Ze(t,W.type.value,F),X=[B,D],H="";if(w){let q=o?h:1;X.push(z("bias",e[2].dataType,e[2].dims.length,q)),H=`${o?`value += bias[col / ${q}];`:`value += ${W.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ye(t,Y);let xe=()=>{let q=`var a_data: ${B.type.value};`;for(let Q=0;Q<y;Q++)q+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${h}];`;for(let Q=0;Q<_;Q++){q+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${y}];`;for(let ne=0;ne<y;ne++)q+=`
            values[${Q}] = fma(${D.type.value}(a_data${y===1?"":`[${ne}]`}), b_data${ne}, values[${Q}]);
`}return q};return`
  ${k.registerUniforms(Y).registerInternalVariables(E).declareVariables(...X,W)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${B.type.indices};
    ${or("a_indices",B,B.rank-2,E.rank,"batch_indices")}
    ${B.indicesSet("a_indices",B.rank-2,0)}
    ${B.indicesSet("a_indices",B.rank-1,0)}
    let a_offset = ${B.indicesToOffset("a_indices")};

    var b_indices: ${D.type.indices};
    ${or("b_indices",D,D.rank-2,E.rank,"batch_indices")}
    ${D.indicesSet("b_indices",D.rank-2,0)}
    ${D.indicesSet("b_indices",D.rank-1,0)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${W.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${xe()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${H}
      ${Z}
      let cur_indices = ${W.type.indices}(batch, row + i, col);
      let offset = ${W.indicesToOffset("cur_indices")};
      ${W.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${y};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:T}),getShaderSource:C}}});var Jh,eg,_o,Bd,tg,wo,rg,ir,on=V(()=>{"use strict";te();se();ce();vt();nn();tn();Jh=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,eg=(e,t)=>e?`
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
        }`,_o=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=o?l:a,h=o?a:l,y=f/t[0],_=a/t[1];if(!((o&&y===4&&e[1]===4||!o&&(y===3||y===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
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
          ${Jh(o,r)}
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

          ${eg(o,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Bd=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,tg=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",wo=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=o?p:a,y=o?a:p;if(!(y%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],b=h/t[0],w=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Bd(o,r)}
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
      ${Bd(o,r)}
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
      ${tg(o)}
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
`},rg=(e,t,n,r,o=!1)=>{let[a,s,d,l]=r,p=we(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
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

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
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

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Pe(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Pe(e,p)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ir=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s.slice(0,-2),p=d.slice(0,-2),f=r?r.slice(0,-2):n.slice(0,-2),h=P.size(f),y=s[s.length-2],_=s[s.length-1],b=d[d.length-1],w=_%4===0&&b%4===0,S=y<=8?[4,1,1]:[4,4,1],x=[8,8,1],v=[Math.ceil(b/x[0]/S[0]),Math.ceil(y/x[1]/S[1]),Math.ceil(h/x[2]/S[2])],T=w?4:1,C=[...l,y,_/T],k=C.length,E=[...p,_,b/T],B=E.length,D=[h,y,b/T],W=[{type:6,data:y},{type:6,data:b},{type:6,data:_}];Qe(t,W),W.push(...L(f,C,E));let F=["rank","rank"],Z=e.length>2;Z&&(W.push(...L(e[2].dims)),F.push("rank")),W.push(...L(D));let X=H=>{let Y=f.length,xe=jr("batchDims",e[0].dataType,Y,1),q=we(e[0].dataType),Q=z("a",e[0].dataType,k,T),ne=z("b",e[1].dataType,B,T),ee=U("result",e[0].dataType,D.length,T),me=[Q,ne];if(Z){let G=o?T:1;me.push(z("bias",e[2].dataType,e[2].dims.length,G))}let be=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ye(t,be);let ve=we(ee.type.tensor),oe=Ze(t,ee.type.value,ve),A=rg(T,Z,oe,[xe,Q,ne,ee],o);return`
  ${H.registerUniforms(be).registerInternalVariables(xe).declareVariables(...me,ee)}
  ${A}
  ${w?_o(S,x,q,xe):wo(S,x,q,xe)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${w};${o}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:W}),getShaderSource:X}}});var ng,Dd,Md=V(()=>{"use strict";te();tt();ce();vt();tn();Od();on();ng=(e,t,n,r,o=!1,a,s=4,d=4,l=4,p="f32")=>{let f=F=>{switch(F){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},h=F=>{switch(F){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},y=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",x=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${Pe(s,p)}(0.0);
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
    return ${Pe(s,p)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Pe(s,p)}(0.0);`,C=e?r&&n?h(d):`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(d)}
    }
    return ${Pe(d,p)}(0.0);`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(d)}
    }
    return ${Pe(d,p)}(0.0);`,k=Pe(l,p),E=e?Pe(s,p):Pe(d,p),B=e?Pe(d,p):Pe(s,p),D=Ze(a,k,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?T:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${B} {
      ${e?C:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Pd(o)}
      ${D}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Dd=(e,t,n,r,o,a,s,d,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=n[0],y=p?n[2]:n[3],_=p?n[1]:n[2],b=p?n[3]:n[1],w=p&&(f%4===0||f%3===0)&&b%4===0,S=p?b:y*_,x=p?y*_:b,v=[8,8,1],T=r<=8?[4,1,1]:[4,4,1],C=[Math.ceil(S/v[0]/T[0]),Math.ceil(x/v[1]/T[1]),Math.ceil(h/v[2]/T[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let k=w?p&&f%4!==0?3:4:1,E=v[1]*T[1],B=v[0]*T[0],D=Math.max(v[0]*k,v[1]),W=r%E===0,F=o%B===0,Z=a%D===0,X=w?[k,4,4]:[1,1,1],H=[{type:6,data:r},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Qe(t,H),H.push(...L(e[0].dims,e[1].dims));let Y=["rank","rank"];s&&(H.push(...L(e[2].dims)),Y.push("rank")),H.push(...L(n));let xe=q=>{let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ye(t,Q);let ne=w?4:1,ee=we(e[0].dataType),me=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${ee}>`:ee}) {
        result[flatIndex] = ${w?`vec4<${ee}>`:ee}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${ee}>`:ee}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,be=z("x",e[0].dataType,e[0].dims.length,k===3?1:k),ve=z("w",e[1].dataType,e[1].dims.length,ne),oe=[be,ve],A=U("result",e[0].dataType,n.length,ne);if(s){let G=z("bias",e[2].dataType,e[2].dims.length,ne);oe.push(G),me+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${ee}>`:ee} {
          return bias[coords.${p?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${zd("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${q.registerUniforms(Q).declareVariables(...oe,A)}
        ${me}
        ${ng(p,W,F,Z,s,t,X[0],X[1],X[2],ee)}
        ${w?_o(T,v,ee,void 0,!p,D):wo(T,v,ee,void 0,!p,D,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${w};${W};${F};${Z};${E};${B};${D}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:H}),getShaderSource:xe}}});var og,Rd,an,ig,Ud,ag,Nd,Vd,Wd=V(()=>{"use strict";te();tt();se();ce();vt();tn();og=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Rd=e=>typeof e=="number"?[e,e,e]:e,an=(e,t)=>t<=1?e:e+(e-1)*(t-1),ig=(e,t,n,r=1)=>{let o=an(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},Ud=(e,t,n,r,o)=>{o==null&&(o=ig(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return a},ag=(e,t,n,r,o,a,s,d,l,p)=>{let f,h,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Ud([t,n,r,1],[d,l,p],1,[o,a,s],e);h=b[0],y=b[1],_=b[2]}else if(Array.isArray(e)){if(!e.every((w,S,x)=>w===x[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Ud([t,n,r,1],[d,l,p],1,[o,a,s],e[0]);h=b[0],y=b[1],_=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/o),y=Math.ceil(n/a),_=Math.ceil(r/s);let b=(h-1)*o+d-t,w=(y-1)*a+l-n,S=(_-1)*s+p-r,x=Math.floor(b/2),v=b-x,T=Math.floor(w/2),C=w-T,k=Math.floor(S/2),E=S-k;f={top:T,bottom:C,left:k,right:E,front:x,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:y,outWidth:_}},Nd=(e,t,n,r,o,a=!1,s="channelsLast")=>{let d,l,p,f,h;if(s==="channelsLast")[d,l,p,f,h]=e;else if(s==="channelsFirst")[d,h,l,p,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[y,,_,b,w]=t,[S,x,v]=Rd(n),[T,C,k]=Rd(r),E=an(_,T),B=an(b,C),D=an(w,k),{padInfo:W,outDepth:F,outHeight:Z,outWidth:X}=ag(o,l,p,f,S,x,v,E,B,D),H=a?y*h:y,Y=[0,0,0,0,0];return s==="channelsFirst"?Y=[d,H,F,Z,X]:s==="channelsLast"&&(Y=[d,F,Z,X,H]),{batchSize:d,dataFormat:s,inDepth:l,inHeight:p,inWidth:f,inChannels:h,outDepth:F,outHeight:Z,outWidth:X,outChannels:H,padInfo:W,strideDepth:S,strideHeight:x,strideWidth:v,filterDepth:_,filterHeight:b,filterWidth:w,effectiveFilterDepth:E,effectiveFilterHeight:B,effectiveFilterWidth:D,dilationDepth:T,dilationHeight:C,dilationWidth:k,inShape:e,outShape:Y,filterShape:t}},Vd=(e,t,n,r,o,a)=>{let s=a==="channelsLast",d=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],f={x:n.map((v,T)=>T)},h=[Math.ceil(og(f.x.map(v=>n[v]))/p[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let y=l?s&&d%4!==0?3:4:1,_=P.size(n),b=[{type:12,data:_},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Qe(t,b),b.push(...L(e[0].dims,e[1].dims));let w=["rank","rank"],S=e.length===3;S&&(b.push(...L(e[2].dims)),w.push("rank")),b.push(...L(n));let x=v=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ye(t,T);let C=l?4:1,k=we(e[0].dataType),E=z("x",e[0].dataType,e[0].dims.length,y===3?1:y),B=z("W",e[1].dataType,e[1].dims.length,C),D=[E,B],W=U("result",e[0].dataType,n.length,C),F="";if(S){let H=z("bias",e[2].dataType,e[2].dims.length,C);D.push(H),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${k}>`:k} {
          return bias[${s?j("coords",4,5):j("coords",1,5)}${l?"/ 4":""}];
        }`}let Z=Pe(y,k),X=Ze(t,Z,k);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${B.getByIndices("aIndices")};
            }
          ${v.registerUniforms(T).declareVariables(...D,W)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${W.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,E.rank)};
              let d2 = ${s?j("coords",E.rank-1,E.rank):j("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${s?j("coords",1,E.rank):j("coords",2,E.rank)},
              ${s?j("coords",2,E.rank):j("coords",3,E.rank)},
              ${s?j("coords",3,E.rank):j("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?j("uniforms.x_shape",1,E.rank):j("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${s?j("uniforms.x_shape",2,E.rank):j("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${s?j("uniforms.x_shape",3,E.rank):j("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${s?j("uniforms.x_shape",4,E.rank):j("uniforms.x_shape",1,E.rank)};
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
              ${X}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${y};${S}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:b}),getShaderSource:x}}});var Ld,Gd,Hd=V(()=>{"use strict";te();se();ce();vt();Ld=(e,t,n,r)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,d=e[1].dims,l=t.format==="NHWC",p=l?n[3]:n[1],f=p/t.group,h=l&&f>=4?he(p):1,y=P.size(n)/h,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Qe(t,_),_.push(...L(s,[d[0],d[1],d[2],d[3]/h]));let b=o?["rank","rank","rank"]:["rank","rank"];_.push(...L([n[0],n[1],n[2],n[3]/h]));let w=S=>{let x=U("output",e[0].dataType,n.length,h),v=we(x.type.tensor),T=Ze(t,x.type.value,v),C=z("x",e[0].dataType,s.length),k=z("w",e[1].dataType,d.length,h),E=[C,k];o&&E.push(z("b",e[2].dataType,e[2].dims,h));let B=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ye(t,B);let D=l?`
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(B).declareVariables(...E,x)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${D}
    ${a}
    ${T}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},Gd=(e,t,n,r)=>{let o=e.length>2,a=he(n[3]),s=he(n[2]),d=P.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[n[0],n[1],n[2],n[3]/a],h=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Qe(t,h),h.push(...L(l,p,f));let y=(s-1)*t.strides[1]+p[1],_=b=>{let w=U("output",e[0].dataType,f.length,a),S=we(w.type.tensor),x=Ze(t,w.type.value,S),v=z("x",e[0].dataType,l.length,a),T=z("w",e[1].dataType,p.length,a),C=[v,T];o&&C.push(z("b",e[2].dataType,e[2].dims,a));let k=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ye(t,E),`
  ${b.registerUniforms(E).declareVariables(...C,w)}
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
      ${k}
      ${x}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${y};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}}});var sg,vo,ug,$o,xo,Fd,dg,lg,So,qd=V(()=>{"use strict";se();Md();Wd();on();Hd();vt();nn();ct();sg=(e,t,n,r,o,a)=>{let s=e[0],d=e.slice(a?1:2,a?3:4),l=d.length,p=t[0],h=t.slice(2).map((b,w)=>b+(b-1)*(n[w]-1)),_=d.map((b,w)=>b+r[w]+r[w+l]).map((b,w)=>Math.floor((b-h[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,p),_},vo=[2,3,1,0],ug=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},$o=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();At.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},xo=e=>{let t=en(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,d=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Fd=(e,t,n,r)=>{let o=n.format==="NHWC",a=sg(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[t[0]];if(o){let D=e.kernelCustomData.wT??e.compute(Oe(t[1],vo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=D),E.push(D)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Gd(E,n,a,r),{inputs:E}):e.compute(Ld(E,n,a,r),{inputs:E});return}let s=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],p=t[0].dims[o?3:1],f=t[1].dims[2],h=t[1].dims[3],y=a[o?1:2],_=a[o?2:3],b=a[o?3:1],w=o&&f===d&&h===l&&n.pads[0]===0&&n.pads[1]===0;if(w||f===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=a[0],B,D,W,F=[];if(o){let H=e.kernelCustomData.wT??e.compute(Oe(t[1],vo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=H),w){let Y=d*l*p;B=t[0].reshape([1,E,Y]),D=H.reshape([1,Y,b]),W=[1,E,b]}else B=t[0].reshape([E,d*l,p]),D=H.reshape([1,p,b]),W=[E,y*_,b];F.push(B),F.push(D)}else B=t[0].reshape([E,p,d*l]),D=t[1].reshape([1,b,p]),W=[E,b,y*_],F.push(D),F.push(B);s&&F.push(t[2]);let Z=W[2],X=F[0].dims[F[0].dims.length-1];Z<8&&X<8?e.compute(rn(F,n,a,W,o,r),{inputs:F}):e.compute(ir(F,n,a,W,o,r),{inputs:F});return}let S=!0,x=e.kernelCustomData.wT??e.compute(Oe(t[1],vo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let v=[t[0],x];s&&v.push(t[2]);let T=o?y*_:b,C=o?b:y*_,k=f*h*p;e.compute(Dd(v,n,a,T,C,k,s,S,r),{inputs:v})},dg=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=$o({...t,pads:o,strides:a,dilations:s,kernelShape:d},r);Fd(e,r,l,p=>n?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},lg=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=$o(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Nd(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Vd(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},So=(e,t)=>{if(ug(e.inputs,t),e.inputs[0].dims.length===3)dg(e,t);else if(e.inputs[0].dims.length===5)lg(e,e.inputs,t);else{let n=$o(t,e.inputs);Fd(e,e.inputs,n)}}});var Kd,jd=V(()=>{"use strict";te();tt();se();ce();Kd=(e,t,n)=>{let r=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,d=e[1].dims,l=d[2]/s,p=d[3],f=a?he(l):1,h=a&&p===1&&l>=4,y=h?Math.floor(l/4)*4:Math.floor(l/f)*f,_=l-y,b=a?he(p):1,w=a?p===1?f:b:1,S=P.size(o)/b,x=[Math.ceil(S/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let v=["rank","rank"],T=[t.strides[0],t.strides[1]],C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],k=[t.dilations[0],t.dilations[1]],E=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],B=[E[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),E[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],D=[{type:12,data:S},{type:12,data:T},{type:12,data:C},{type:12,data:k},{type:12,data:E},{type:6,data:B},{type:12,data:y},{type:12,data:l},{type:12,data:p},...L(e[0].dims,e[1].dims)];r&&(D.push(...L(e[2].dims)),v.push("rank")),D.push(...L(o));let W=F=>{let Z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:B.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],X=we(e[0].dataType),H=a?1:2,Y=a?2:3,xe=a?3:1,q=z("W",e[1].dataType,e[1].dims.length,w),Q=z("Dy",e[0].dataType,e[0].dims.length,f),ne=[Q,q];r&&ne.push(z("bias",e[2].dataType,[o[xe]].length,b));let ee=U("result",e[0].dataType,o.length,b),me=()=>{let oe="";if(h)f===4?oe+=`
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
          dotProd = dotProd + xValue * wValue;`;else for(let A=0;A<f;A++)oe+=`
            let wValue${A} = ${q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${A}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${A}] * wValue${A};`;return oe},be=()=>{if(_===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let oe="";if(f===1){oe+="dotProd = dotProd";for(let A=0;A<_;A++)oe+=`
            + ${Q.getByOffset(`x_offset + ${A}`)} * ${q.getByOffset(`w_offset + ${A}`)}`;oe+=";"}else if(f===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);oe+=`
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
                ${be()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${b}]`:""};
            ${ee.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(Z).declareVariables(...ne,ee)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ve}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${w}${b}${h}${_}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:D}),getShaderSource:W}}});var cg,pg,mg,Zd,Qd,fg,Yd,hg,Xd,Jd=V(()=>{"use strict";jd();vt();ct();cg=(e,t,n,r,o,a)=>(e-1)*t+n+(r-1)*o+1-a,pg=(e,t,n,r,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[o]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[o]=a)},mg=(e,t,n,r,o,a,s,d,l,p)=>{let f=e.length-2,h=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let y=e[0],_=t[d?3:1]*o;for(let b=0,w=e.length-f-(d?1:0);b<f;++b,++w){let S=e[w],x=h?S*s[b]:p[b],v=cg(S,s[b],a[b],t[w],n[b],x);pg(v,r,a,b,b+f),h&&p.push(s[b]*(S-1)+l[b]+(t[w]-1)*n[b]+1-a[b]-a[b+f])}p.splice(0,0,y),p.splice(d?3:1,0,_)},Zd=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,y)=>h*y,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}mg(d,n,l,e.autoPad,e.group,o,p,r,s,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:a,dilations:l,strides:p}),f},Qd=e=>{let t=en(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,d=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,outputPadding:f,outputShape:h,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},fg=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((f,h)=>f+h,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((f,h)=>f+h,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((f,h)=>f+h,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((f,h)=>f+h,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Yd=(e,t,n,r)=>{let o=e.kernelCustomData.wT??e.compute(Oe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(Kd(a,n,r),{inputs:a})},hg=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let p=Zd({...t,pads:d,strides:s,dilations:a,kernelShape:o,outputPadding:l},r);Yd(e,r,p,f=>n?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},Xd=(e,t)=>{if(fg(e.inputs,t),e.inputs[0].dims.length===3)hg(e,t);else{let n=Zd(t,e.inputs);Yd(e,e.inputs,n)}}});var gg,el,tl,rl=V(()=>{"use strict";te();se();Ie();ce();gg=(e,t,n,r)=>{let o=P.size(t),a=t.length,s=z("input",e,a),d=U("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),p=P.normalizeAxis(l,a),f=h=>{let y=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=j("uniforms.input_shape","uniforms.axis",a),b=r.reverse?y+(r.exclusive?" + 1":""):"0",w=r.reverse?_:y+(r.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...L(t,t)]}),getShaderSource:f}},el=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(gg(r,n,o,t),{inputs:[0]})},tl=e=>{let t=e.exclusive===1,n=e.reverse===1;return re({exclusive:t,reverse:n})}});var yg,bg,_g,nl,ol,il=V(()=>{"use strict";te();se();Ie();ce();yg=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},bg=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)o.push(n.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},_g=(e,t)=>{let n,r,o,a,s,d,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([n,r,o,a]=e.dims,s=f?[n,r,o,p,p,a/p**2]:[n,r,o,a/p**2,p,p],d=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[n,p,p,a/p**2,r,o]:[n,a/p**2,p,p,r,o],d=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),y=h.dims.length,_=e.dataType,b=z("a",_,y),w=U("output",_,y),S=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(b,w)}

  ${bg(d,y,b,w)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let v=l?[n,r*p,o*p,a/p**2]:[n,a/p**2,r*p,o*p],T=P.size(v),C=h.dims,k=P.sortBasedOnPerm(C,d);return{outputs:[{dims:v,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...L(C,k)]}},getShaderSource:S}},nl=(e,t)=>{yg(e.inputs),e.compute(_g(e.inputs[0],t))},ol=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var To,sn,al,wg,vg,Co,Io,sl,$g,ul,dl,ll=V(()=>{"use strict";te();se();Ie();ce();To="[a-zA-Z]|\\.\\.\\.",sn="("+To+")+",al="^"+sn+"$",wg="("+sn+",)*"+sn,vg="^"+wg+"$",Co=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},Io=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(vg)))throw new Error("Invalid LHS term");if(r.split(",").forEach((d,l)=>{let p=t[l].dims.slice();if(!d.match(RegExp(al)))throw new Error("Invalid LHS term");let f=this.processTerm(d,!0,p,l);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(sn)))throw new Error("Invalid RHS");o.match(RegExp(To,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let a=r.length,s=!1,d=[],l=0;if(!t.match(RegExp(al))&&!n&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(To,"g")),f=new Co(o);return p?.forEach((h,y)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(d=r.slice(l,l+_),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<d.length;b++){let w=String.fromCharCode(48+b);f.addSymbol(w,y+b),this.addSymbol(w,r[l++],o)}}else f.addSymbol(h,y+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[l++],o)}),f}},sl=e=>e+"_max",$g=(e,t,n,r)=>{let a=e.map(f=>f.length).map((f,h)=>z(`input${h}`,t,f)),s=P.size(r),d=U("output",t,r.length),l=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),p=f=>{let h=[],y="var prod = 1.0;",_="var sum = 0.0;",b="sum += prod;",w=[],S=[],x=[],v=[],T=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((k,E)=>{if(n.rhs.symbolToIndices.has(E)){let B=n.rhs.symbolToIndices.get(E)?.[0];B!==void 0&&n.lhs.forEach((D,W)=>{if(k.inputIndices.includes(W)){let F=D.symbolToIndices.get(E);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(Z=>{h.push(`${a[W].indicesSet(`input${W}Indices`,Z,d.indicesGet("outputIndices",B))}`)})}})}else n.lhs.forEach((B,D)=>{if(k.inputIndices.includes(D)){let W=B.symbolToIndices.get(E);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(F=>{w.push(`${a[D].indicesSet(`input${D}Indices`,F,`${E}`)}`)}),v.push(`prod *= ${a[D].getByIndices(`input${D}Indices`)};`)}}),S.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${sl(E)}; ${E}++) {`),x.push("}")});let C=T?[...h,`let sum = ${a.map((k,E)=>k.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...h,_,...S,...w,y,...v,b,...x];return`
            ${f.registerUniforms(l.map(k=>({name:`${sl(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,d)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${a.map((k,E)=>`var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let f=l.filter(y=>n.symbolToInfo.has(y)).map(y=>({type:12,data:n.symbolToInfo.get(y)?.dimValue||0}));f.push({type:12,data:s});let h=e.map((y,_)=>[...L(y)]).reduce((y,_)=>y.concat(_),f);return h.push(...L(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:p}},ul=(e,t)=>{let n=new Io(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute($g(o,e.inputs[0].dataType,n,r))},dl=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var xg,cl,Sg,Tg,pl,ml=V(()=>{"use strict";te();se();ce();xg=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},cl=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},Sg=(e,t)=>e.length>t.length?cl(e,t):cl(t,e),Tg=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Sg(t,n),o=e[0].dataType,a=o===9||P.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,d=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(P.size(r)/d),p=h=>{let y=z("input",o,t.length,s),_=U("output",o,r.length,d),b;if(o===9){let w=(S,x,v="")=>`
          let outputIndices${x} = ${_.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${y.broadcastedIndicesToOffset(`outputIndices${x}`,_)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${S}[${x}] = ${v}(${y.getByOffset(`index${x}`)}[component${x}]);
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
    ${b}`},f=[{type:12,data:l},...L(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${d}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},pl=e=>{xg(e.inputs),e.compute(Tg(e.inputs),{inputs:[0]})}});var Cg,fl,hl=V(()=>{"use strict";te();se();ce();Jr();Cg=e=>{let t=e[0].dataType,n=P.size(e[0].dims),r=P.size(e[1].dims),o=r%4===0,a=s=>{let d=z("x",t,[1],4),l=z("bias",t,[1],4),p=U("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(d,l,p)}

    ${yo(ze(t))}

    ${s.mainStart(Et)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",bo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Et/4)}})}},fl=e=>{e.inputs.length<2||P.size(e.inputs[1].dims)===0?ld(e):e.compute(Cg(e.inputs))}});var Ig,Ag,gl,yl,bl=V(()=>{"use strict";te();se();Ie();ce();Ig=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ag=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=P.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(a,1,...r);let d=n[a],l=e[0].dataType===9?4:1,p=Math.ceil(P.size(s)/l),f=[{type:12,data:p},{type:6,data:d},{type:12,data:a},...L(e[0].dims,e[1].dims,s)],h=y=>{let _=z("data",e[0].dataType,e[0].dims.length,l),b=z("inputIndices",e[1].dataType,e[1].dims.length),w=U("output",e[0].dataType,s.length,l),S=v=>{let T=r.length,C=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let k=0;k<T;k++)C+=`${T>1?`indicesIndices${v}[${k}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${k}]`:`outputIndices${v}`};`;C+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let k=0,E=0;k<o;k++)k===a?(C+=`${o>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = u32(idx${v});`,E+=T):(C+=`${o>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${E}]`:`outputIndices${v}`};`,E++);return C},x;if(e[0].dataType===9){let v=(T,C,k="")=>`
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${S(C)};
          let offset${C} = ${_.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${T}[${C}] = ${k}(${_.getByOffset(`index${C}`)}[component${C}]);
        `;x=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,b,w)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},gl=e=>re({axis:e.axis}),yl=(e,t)=>{let n=e.inputs;Ig(n),e.compute(Ag(e.inputs,t))}});var Eg,_l,wl,vl=V(()=>{"use strict";te();se();ce();Eg=(e,t,n,r,o,a,s,d,l)=>{let p=[{type:12,data:a},{type:12,data:r},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:d},{type:12,data:l}],f=[a];p.push(...L(t.dims,f));let h=y=>{let _=z("indices_data",t.dataType,t.dims.length),b=U("input_slice_offsets_data",12,1,1),w=[_,b],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},_l=(e,t)=>{let n=e.inputs,r=n[0].dims,o=n[0].dataType,a=n[1].dims,s=a[a.length-1],d=P.sizeToDimension(a,a.length-1),l=P.sizeFromDimension(r,t.batchDims+s),p=P.sizeToDimension(r,t.batchDims),f=P.sizeFromDimension(r,t.batchDims),h=d/p,y=new Array(s),_=l;for(let C=0;C<s;++C)y[s-1-C]=_,_*=r[t.batchDims+s-1-C];let b=Eg(e,n[1],y,t.batchDims,r,d,h,f,s),w=t.batchDims+s;if(w>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(r.slice(w)),x=P.size(S),v=[{type:12,data:x},{type:12,data:l},...L(n[0].dims,b.dims,S)],T=C=>{let k=z("data",n[0].dataType,n[0].dims.length),E=z("slice_offsets",12,b.dims.length),B=U("output",n[0].dataType,S.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,E,B)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:v}),getShaderSource:T},{inputs:[n[0],b]})},wl=e=>({batchDims:e.batch_dims,cacheKey:""})});var kg,Pg,$l,xl,Sl=V(()=>{"use strict";te();se();Ie();ce();kg=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=P.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===n?Math.ceil(d/r)===a.dims[l]:d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((d,l)=>d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Pg=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=P.normalizeAxis(t.gatherAxis,o),s=P.normalizeAxis(t.quantizeAxis,o),d=n.slice(0);d.splice(a,1,...r);let l=P.size(d),p=e[2].dataType,h=e[0].dataType===22,y=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...L(...e.map((b,w)=>b.dims),d)],_=b=>{let w=z("data",e[0].dataType,e[0].dims.length),S=z("inputIndices",e[1].dataType,e[1].dims.length),x=z("scales",e[2].dataType,e[2].dims.length),v=e.length>3?z("zeroPoint",e[3].dataType,e[3].dims.length):void 0,T=U("output",p,d.length),C=[w,S,x];v&&C.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(k).declareVariables(...C,T)}
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
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
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
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,w)=>w!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,w)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:_}},$l=(e,t)=>{let n=e.inputs;kg(n,t),e.compute(Pg(e.inputs,t))},xl=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var zg,Og,Tl,Cl,Il=V(()=>{"use strict";te();se();Ie();ce();zg=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Og=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,a=e[1].dims,s=e[1].dataType,d=P.normalizeAxis(t.axis,o),l=n[d],p=a.slice(0),f=P.size(p),h=z("input",r,o),y=z("indicesInput",s,a.length),_=U("output",r,p.length),b=[{type:12,data:f},{type:6,data:l},{type:12,data:d}];return b.push(...L(n,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,y,_)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Tl=e=>re({axis:e.axis}),Cl=(e,t)=>{let n=e.inputs;zg(n),e.compute(Og(e.inputs,t))}});var Bg,Dg,Al,El,kl=V(()=>{"use strict";te();se();ce();Bg=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Dg=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,a,s]=Wr.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),d=[o,a];if(!d)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),f=Math.ceil(o/l),h=!0,y=P.size(d),_=[{type:12,data:h?p:y},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(_.push(...L(e[2].dims)),b.push("rank")),_.push(...L(d));let w=x=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",C=z("a",e[0].dataType,e[0].dims),k=z("b",e[1].dataType,e[1].dims),E=C.type.value,B=null,D=[C,k];e.length===3&&(B=z("c",e[2].dataType,e[2].dims.length),D.push(B));let W=U("output",e[0].dataType,d.length);D.push(W);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(F).declareVariables(...D)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${T}
    ${B!=null?`let cOffset = ${B.broadcastedIndicesToOffset("vec2(m, n)",W)}; value += ${E}(uniforms.beta) * ${B.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=x=>{let v=z("a",e[0].dataType,e[0].dims),T=z("b",e[1].dataType,e[1].dims),C=null,k=[v,T];e.length===3&&(C=z("c",e[2].dataType,e[2].dims.length),k.push(C));let E=U("output",e[0].dataType,d.length);k.push(E);let B=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],D="",W="";t.transA&&t.transB?(W=`
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
      `,D="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(W=`
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
      `,D="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(W=`
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
      `,D="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(W=`
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
      `,D="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(B).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${x.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${W}
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
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},Al=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},El=(e,t)=>{Bg(e.inputs),e.compute(Dg(e.inputs,t))}});var pt,$t,Wt,Lt,Mg,Rg,Ug,Ng,Vg,Wg,Lg,Gg,Pl,zl,Ol=V(()=>{"use strict";te();se();Ie();ce();[pt,$t,Wt,Lt]=[0,1,2,3],Mg=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Rg=`
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
`,Ug=e=>`
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
`,Ng=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Vg=e=>`
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
`,Wg=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${pt}] = batch;
     indices[${$t}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Wt}] = u32(r);
            indices[${Lt}] = u32(c);
          }
        `;case"border":return`
          indices[${Wt}] = u32(clamp(r, 0, H - 1));
          indices[${Lt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Wt}] = gs_reflect(r, border[1], border[3]);
          indices[${Lt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Lg=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
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
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Gg=(e,t)=>{let n=z("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=z("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[pt,$t,Wt,Lt]=[0,3,1,2]);let s=U("output",e[0].dataType,a.length),d=n.type.value,l=P.size(a),p=[{type:12,data:l},...L(e[0].dims,r,a)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${Rg}
  ${Ug(d)}
  ${Ng(t)}
  ${Vg(t)}
  ${Wg(n,d,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Wt}]);
      let W_in = i32(uniforms.x_shape[${Lt}]);

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
      var grid_indices = vec3<u32>(indices[${pt}], indices[${Wt}], indices[${Lt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Lg(s,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let y=P.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:f}},Pl=(e,t)=>{Mg(e.inputs),e.compute(Gg(e.inputs,t))},zl=e=>re({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Re,qg,Dl,Bl,Kg,ar,Ml,Ao=V(()=>{"use strict";te();se();Ie();qr();Yr();ce();ct();Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,qg=(e,t)=>{let n=e[0],r=Re(e,1),o=Re(e,2),a=Re(e,3),s=Re(e,4),d=Re(e,5),l=Re(e,6),p=Re(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],h=n.dims[1],y=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],_=h,b=0,w=0,S=Math.floor(y/t.numHeads);if(l&&p&&P.size(l.dims)&&P.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],w=l.dims[2]}else if(l&&P.size(l.dims)||p&&P.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(r&&P.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,_=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(a&&P.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+_,T=0;if(s&&P.size(s.dims)>0){T=8;let B=s.dims;throw B.length===1?B[0]===f?T=1:B[0]===3*f+2&&(T=3):B.length===2&&B[0]===f&&B[1]===v&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,k=y;if(o&&P.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],C=!0}}let E=!1;if(s&&P.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(d&&P.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[2]!==h||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:y,vHiddenSize:k,headSize:S,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:E,passPastInKv:C,qkvFormat:x}},Dl=e=>re({...e}),Bl=re({perm:[0,2,1,3]}),Kg=(e,t,n,r,o,a,s)=>{let d=[r,o,a],l=P.size(d),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],f=h=>{let y=U("qkv_with_bias",t.dataType,d),_=z("qkv",t.dataType,d),b=z("bias",n.dataType,d),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(w).declareVariables(_,b,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,n],outputs:[-1]})[0]},ar=(e,t,n,r,o,a,s,d)=>{let l=a;if(s&&P.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Kg(e,a,s,t,r,n*o,d),l=l.reshape([t,r,n,o]),n===1||r===1?l:e.compute(Oe(l,Bl.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,o])),n===1||r===1?l:e.compute(Oe(l,Bl.perm),{inputs:[l],outputs:[-1]})[0]},Ml=(e,t)=>{let n=qg(e.inputs,t),r=e.inputs[0],o=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),d=Re(e.inputs,4),l=Re(e.inputs,5),p=Re(e.inputs,6),f=Re(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let h=o&&a&&o.dims.length===4&&a.dims.length===4,y=ar(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(h)return Vt(e,y,o,a,d,void 0,p,f,l,n);if(!o||!a)throw new Error("key and value must be provided");let _=ar(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),b=ar(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);Vt(e,y,_,b,d,void 0,p,f,l,n)}});var jg,Zg,Qg,Yg,Eo,Rl,Ul,ko=V(()=>{"use strict";te();se();Ie();ce();jg=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Zg=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),re({numOutputs:r,axis:t.axis,splitSizes:n})},Qg=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Yg=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Eo=(e,t)=>{let n=e[0].dims,r=P.size(n),o=e[0].dataType,a=P.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),d=z("input",o,n.length),l=new Array(t.numOutputs),p=[],f=[],h=0,y=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],l[b]=h;let w=n.slice();w[a]=t.splitSizes[b],f.push(w),s[b]=U(`output${b}`,o,w.length),p.push({dims:f[b],dataType:e[0].dataType})}y.push({type:12,data:l},...L(n,...f));let _=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...s)}
  ${Qg(l.length)}
  ${Yg(s)}

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
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:y})}},Rl=(e,t)=>{jg(e.inputs);let n=e.inputs.length===1?t:Zg(e.inputs,t);e.compute(Eo(e.inputs,n),{inputs:[0]})},Ul=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:r,splitSizes:n})}});var Xg,Jg,Nl,Vl,Wl=V(()=>{"use strict";Ie();Yr();Ao();ko();ct();Xg=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=n.dims[0],p=n.dims[1],f=n.dims.length===3?d?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=p,y=0,_=!r||r.dims.length===0,b=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=b*t.numHeads);let w=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=a.dims[2]}else if(w||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let T=0,C=!1,k=t.kvNumHeads?b*t.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],C=!0}}let E=e.length>4?e[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:k,headSize:b,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:v}},Jg=re({perm:[0,2,1,3]}),Nl=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(Oe(r,Jg.perm),{inputs:[r],outputs:[-1]})[0]),r},Vl=(e,t)=>{let n=Xg(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=re({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,f*n.headSize,f*n.headSize]}),[y,_,b]=!o&&!a?e.compute(Eo([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,a],w=ar(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,y,void 0,0);Vt(e,w,Nl(e,_,n),Nl(e,b,n),void 0,void 0,s,d,void 0,n,l,p)}});var Ll,ey,ty,Gl,Hl=V(()=>{"use strict";te();se();ct();ce();Ll=(e,t,n,r,o,a,s,d)=>{let l=he(a),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,h=o*s,y=64;h===1&&(y=256);let _=[o,s,a/l],b=[o,s,2],w=["rank","type","type"],S=[];S.push(...L(_,b));let x=v=>{let T=z("x",t.dataType,3,l),C=z("scale",n.dataType,n.dims),k=z("bias",r.dataType,r.dims),E=U("output",1,3,2),B=[T,C,k,E];return`
  var<workgroup> workgroup_shared : array<${f}, ${y}>;
  const workgroup_size = ${y}u;
  ${v.declareVariables(...B)}
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
      let sum_final = ${je("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${je("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:S}),getShaderSource:x},{inputs:[t,n,r],outputs:[-1]})[0]},ey=(e,t,n)=>{let r=t[0].dims,o=r,a=2,s=r[0],d=r[1],l=P.sizeFromDimension(r,a),p=he(l),f=P.size(o)/p,h=Ll(e,t[0],t[1],t[2],s,l,d,n.epsilon),y=[s,d,l/p],_=[s,d],b=["type","none"],w=S=>{let x=z("x",t[0].dataType,y.length,p),v=z("scale_shift",1,_.length,2),T=U("output",t[0].dataType,y.length,p),C=[x,v,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...C)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...L(y,_,y)]}),getShaderSource:w},{inputs:[t[0],h]})},ty=(e,t,n)=>{let r=t[0].dims,o=r,a=r[0],s=r[r.length-1],d=P.sizeFromDimension(r,1)/s,l=he(s),p=P.size(o)/l,f=[{type:12,data:d},{type:12,data:Math.floor(s/l)}],h=["type","type"],y=!1,_=[0,r.length-1];for(let x=0;x<r.length-2;x++)y=y||r[x+1]!==1,_.push(x+1);y=y&&r[r.length-1]!==1;let b=y?e.compute(Oe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(x,v)=>r[_[v]])),w=Ll(e,b,t[1],t[2],a,d,s,n.epsilon),S=x=>{let v=we(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,C=B=>{let D=B===0?"x":"y",W=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${W}(scale.${D}))`;case 2:return`vec2<${v}>(${W}(scale[0].${D}, scale[1].${D}))`;case 4:return`vec4<${v}>(${W}(scale[0].${D}, scale[1].${D}, scale[2].${D}, scale[3].${D}))`;default:throw new Error(`Not supported compoents ${l}`)}},k=z("input",t[0].dataType,t[0].dims,l),E=U("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:S},{inputs:[t[0],w]})},Gl=(e,t)=>{t.format==="NHWC"?ty(e,e.inputs,t):ey(e,e.inputs,t)}});var ry,ny,Fl,ql=V(()=>{"use strict";te();se();ce();ry=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},ny=(e,t,n)=>{let r=t.simplified,o=e[0].dims,a=e[1],s=!r&&e[2],d=o,l=P.normalizeAxis(t.axis,o.length),p=P.sizeToDimension(o,l),f=P.sizeFromDimension(o,l),h=P.size(a.dims),y=s?P.size(s.dims):0;if(h!==f||s&&y!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${y}`);let _=[];for(let k=0;k<o.length;++k)k<l?_.push(o[k]):_.push(1);let b=he(f),w=["type","type"],S=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:t.epsilon}];s&&w.push("type");let x=n>1,v=n>2,T=k=>{let E=we(e[0].dataType),B=[z("x",e[0].dataType,e[0].dims,b),z("scale",a.dataType,a.dims,b)];s&&B.push(z("bias",s.dataType,s.dims,b)),B.push(U("output",e[0].dataType,d,b)),x&&B.push(U("mean_data_output",1,_)),v&&B.push(U("inv_std_output",1,_));let D=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(D).declareVariables(...B)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${mo("f32",b)};
    var mean_square_vector = ${mo("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${kt(E,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${je("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${je("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${kt(E,b,"x[j + offset]")};
      let f32scale = ${kt(E,b,"scale[j]")};
      output[j + offset] = ${B[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${kt(E,b,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:d,dataType:e[0].dataType}];return x&&C.push({dims:_,dataType:1}),v&&C.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:w},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},Fl=(e,t)=>{ry(e.inputs),e.compute(ny(e.inputs,t,e.outputCount))}});var oy,Kl,jl=V(()=>{"use strict";se();nn();on();oy=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kl=e=>{oy(e.inputs);let t=rt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(rn(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=P.size(e.inputs[0].dims.slice(0,-2)),s=P.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let d=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),p=[1,a,n],f=[d,l];e.compute(ir(f,{activation:""},t,p),{inputs:f})}else e.compute(ir(e.inputs,{activation:""},t))}}});var iy,ay,sy,Zl,Ql,Yl=V(()=>{"use strict";te();se();Ie();ce();iy=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!P.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(P.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let f=e[3].dims,h=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(P.size(f)!==h)throw new Error("zeroPoints input size error.")}},ay=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=P.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=he(t.k),_=he(f),b=he(s),w=d.concat([o,s]),S=o>1&&s/b%2===0?2:1,x=P.size(w)/b/S,v=64,T=[],C=[l,o,a/y],k=P.convertShape(e[1].dims).slice();k.splice(-1,1,f/_),T.push(...L(C)),T.push(...L(k)),T.push(...L(e[2].dims)),e.length===4&&T.push(...L(P.convertShape(e[3].dims)));let E=[l,o,s/b];T.push(...L(E));let B=D=>{let W=C.length,F=z("a",e[0].dataType,W,y),Z=z("b",12,k.length,_),X=z("scales",e[2].dataType,e[2].dims.length),H=[F,Z,X],Y=e.length===4?z("zero_points",12,e[3].dims.length):void 0;Y&&H.push(Y);let xe=E.length,q=U("output",e[0].dataType,xe,b),Q=we(e[0].dataType),ne=(()=>{switch(y){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${y}-component is not supported.`)}})(),ee=()=>{let ve=`
          // reuse a data
            var input_offset = ${F.indicesToOffset(`${F.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ne};
            for (var j: u32 = 0; j < ${8/y}; j++) {
              a_data[j] = ${F.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let oe=0;oe<b*S;oe++)ve+=`
            b_value = ${_===1?`b${oe}_data`:`b${oe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ne}(${Array.from({length:4},(A,G)=>`${Q}(b_value_lower[${G}]), ${Q}(b_value_upper[${G}])`).join(", ")});
            b_dequantized_values = ${y===1?`${ne}(${Array.from({length:8},(A,G)=>`(b_quantized_values[${G}] - ${Y?`zero_point${oe}`:"zero_point"}) * scale${oe}`).join(", ")});`:`(b_quantized_values - ${ne}(${Array(8).fill(`${Y?`zero_point${oe}`:"zero_point"}`).join(",")})) * scale${oe};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(oe/b)}]${b>1?`[${oe%b}]`:""} += ${Array.from({length:8/y},(A,G)=>`${y===1?`a_data[${G}] * b_dequantized_values[${G}]`:`dot(a_data[${G}], b_dequantized_values[${G}])`}`).join(" + ")};
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
            `;for(let oe=0;oe<b*S;oe++)ve+=`
            let scale${oe} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${oe} = ${Q}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ve},be=()=>{let ve=`col_index = col * ${b};`;for(let oe=0;oe<b*S;oe++)ve+=`
            let b${oe}_data = ${Z.getByIndices(`${Z.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ve+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ne};
            var b_dequantized_values: ${ne};`,ve};return`
        var<workgroup> workgroup_shared: array<${q.type.value}, ${S*v}>;
        ${D.declareVariables(...H,q)}
        ${D.mainStart([v,1,1])}
          let output_indices = ${q.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/y};
            ${me()}
            for (var word: u32 = 0; word < ${f}; word += ${_}) {
              ${be()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${ee()}
                word_offset += ${8/y};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${q.type.value} = ${q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${q.setByIndices(`${q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${y};${_};${b};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:h}],dispatchGroup:{x},programUniforms:T}),getShaderSource:B}},sy=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=P.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=he(t.k),_=he(f),b=d.concat([o,s]),w=128,S=s%8===0?8:s%4===0?4:1,x=w/S,v=x*_*8,T=v/y,C=v/t.blockSize,k=P.size(b)/S,E=[],B=[l,o,a/y],D=P.convertShape(e[1].dims).slice();D.splice(-1,1,f/_),E.push(...L(B)),E.push(...L(D)),E.push(...L(e[2].dims)),e.length===4&&E.push(...L(P.convertShape(e[3].dims)));let W=[l,o,s];E.push(...L(W));let F=Z=>{let X=B.length,H=z("a",e[0].dataType,X,y),Y=z("b",12,D.length,_),xe=z("scales",e[2].dataType,e[2].dims.length),q=[H,Y,xe],Q=e.length===4?z("zero_points",12,e[3].dims.length):void 0;Q&&q.push(Q);let ne=W.length,ee=U("output",e[0].dataType,ne),me=we(e[0].dataType),be=()=>{switch(y){case 1:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${y}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${ee.type.value}, ${x}>, ${S}>;
        ${Z.declareVariables(...q,ee)}
        ${Z.mainStart([x,S,1])}
          let output_indices = ${ee.offsetToIndices(`workgroup_index * ${S}`)};
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
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
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
              ${be()}
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

          if (local_idx < ${S}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${y};${_};${x};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:k},programUniforms:E}),getShaderSource:F}},Zl=(e,t)=>{iy(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(sy(e.inputs,t)):e.compute(ay(e.inputs,t))},Ql=e=>re(e)});var uy,dy,ly,cy,py,my,fy,hy,Xl,Jl=V(()=>{"use strict";te();se();ce();uy=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},dy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,n)};
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
            ${r}
            value = x[offset];
          }
      `},ly=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},cy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},py=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${j("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},my=(e,t,n)=>{switch(n.mode){case 0:return dy(e,t,n.pads.length);case 1:return ly(e,t,n.pads.length);case 2:return cy(e,t,n.pads.length);case 3:return py(e,t,n.pads.length);default:throw new Error("Invalid mode")}},fy=(e,t)=>{let n=P.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=P.size(n),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...L(e[0].dims,n));let d=["rank"],l=p=>{let f=U("output",e[0].dataType,n.length),h=z("x",e[0].dataType,r.length),y=h.type.value,_=my(f,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?y:"f32"}),`
            ${p.registerUniforms(b).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(n)/64)},programUniforms:a}),getShaderSource:l}},hy=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)a[Number(d[l])]=Number(n[l]),a[Number(d[l])+o]=Number(n[l+d.length])}else n.forEach((d,l)=>a[Number(l)]=Number(d));let s=[];return a.forEach(d=>s.push(d)),{mode:t.mode,value:r,pads:s}}else return t},Xl=(e,t)=>{uy(e.inputs);let n=hy(e.inputs,t);e.compute(fy(e.inputs,n),{inputs:[0]})}});var un,ec,tc,rc,nc,gy,yy,oc,ic,ac,sc,uc,dc,lc,cc,pc,mc,fc,hc,gc=V(()=>{"use strict";Fe();te();se();ce();un=e=>{if($e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ec=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),d=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();At.adjustPoolAttributes(n,o,s,d,l,p);let f=At.computePoolOutputShape(n,o,d,l,s,p,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:d,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:d,pads:p,cacheKey:t.cacheKey});let y=f.slice();return y.push(y.splice(1,1)[0]),[h,r?y:f]},tc=(e,t)=>{let n=t.format==="NHWC",r=P.size(e),o=P.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);a.push({type:12,data:d},{type:12,data:l},{type:12,data:p},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];y=!!(w+S),a.push({type:12,data:_},{type:12,data:b},{type:12,data:w},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,y]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=P.computeStrides(t.kernelShape);a.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[a,s,!!l,!1,!1]}},rc=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y=o.format==="NHWC",_=t.type.value,b=U("output",t.type.tensor,r);if(o.kernelShape.length<=2){let w="",S="",x="",v=n-(y?2:1);if(f?w=`
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
                `,x=`
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
              ${x}
              ${s}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,S=o.pads.length,x="";return p?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:x=`
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
                for (var j = ${n-w}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${n-w}u`,w)}
                    + offsets[j - ${n-w}u] - ${j("uniforms.pads","j - 2u",S)};
                  ${x}
              }
              ${s}

              output[global_idx] = value;
            }`}},nc=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,gy=e=>`${nc(e)};${e.countIncludePad}`,yy=e=>`${nc(e)};${e.storageOrder};${e.dilations}`,oc=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ic=(e,t,n,r)=>{let[o,a]=ec(t,r,n),s=z("x",t.dataType,t.dims.length),d=s.type.value,l="value += x_val;",p="";o.countIncludePad?p+=`value /= ${d}(uniforms.kernelSize);`:p+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[f,h,y,_,b]=tc(a,o);f.push(...L(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:f}),getShaderSource:S=>rc(S,s,t.dims.length,a.length,o,l,p,0,h,y,_,b)}},ac=e=>{let t=e.count_include_pad!==0,n=oc(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:gy(r)}},sc=(e,t)=>{un(e.inputs),e.compute(ic("AveragePool",e.inputs[0],!1,t))},uc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},dc=e=>{let t=e.format;return{format:t,...uc,cacheKey:t}},lc=(e,t)=>{un(e.inputs),e.compute(ic("GlobalAveragePool",e.inputs[0],!0,t))},cc=(e,t,n,r)=>{let[o,a]=ec(t,r,n),s=`
      value = max(x_val, value);
    `,d="",l=z("x",t.dataType,t.dims.length),p=["rank"],[f,h,y,_,b]=tc(a,o);return f.push(...L(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:f}),getShaderSource:w=>rc(w,l,t.dims.length,a.length,o,s,d,t.dataType===10?-65504:-1e5,h,y,_,b)}},pc=(e,t)=>{un(e.inputs),e.compute(cc("MaxPool",e.inputs[0],!1,t))},mc=e=>{let t=e.storage_order,n=e.dilations,r=oc(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:yy(o)}},fc=e=>{let t=e.format;return{format:t,...uc,cacheKey:t}},hc=(e,t)=>{un(e.inputs),e.compute(cc("GlobalMaxPool",e.inputs[0],!0,t))}});var _y,wy,yc,bc,_c=V(()=>{"use strict";te();se();Ie();ce();_y=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},wy=(e,t)=>{let n=P.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,a=e[0].dims,s=e[1].dataType,d=P.size(a),l=r===3||r===2,p=l?[Math.ceil(P.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,y=h?l?[Math.ceil(P.size(h.dims)/4)]:h.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,b=_===!1&&f.length===1,w=he(d),S=_&&(!l||w===4),x=S?w:1,v=S&&!l?w:1,T=z("input",l?12:r,p.length,v),C=z("scale",s,f.length),k=h?z("zero_point",l?12:r,y.length):void 0,E=U("output",s,a.length,x),B=[T,C];k&&B.push(k);let D=[p,f];h&&D.push(y);let W=[{type:12,data:d/x},{type:12,data:n},{type:12,data:t.blockSize},...L(...D,a)],F=Z=>{let X=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Z.registerUniforms(X).declareVariables(...B,E)}
      ${Z.mainStart()}
          ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?_?l?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:b?l?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/x/64),y:1,z:1},programUniforms:W})}},yc=(e,t)=>{_y(e.inputs,t),e.compute(wy(e.inputs,t))},bc=e=>re({axis:e.axis,blockSize:e.blockSize})});var vy,$y,wc,vc=V(()=>{"use strict";Fe();te();ce();vy=(e,t,n)=>{let r=e===t,o=e<t&&n<0,a=e>t&&n>0;if(r||o||a)throw new Error("Range these inputs' contents are invalid.")},$y=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),a=[o],s=o,d=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...L(a)],l=p=>{let f=U("output",r,a.length),h=f.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(y).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},wc=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),$e.webgpu.validateInputContent&&vy(t,n,r),e.compute($y(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var xy,Sy,$c,xc,Sc=V(()=>{"use strict";te();se();Ie();ce();xy=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${o}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${o}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Sy=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n,a=1,s=Math.ceil(P.size(r)/a),d=r[r.length-1],l=P.sizeFromDimension(n,d),p=[{type:12,data:s},{type:12,data:d},{type:12,data:l},...L(e[1].dims,e[2].dims,o)],f=h=>{let y=z("indices",e[1].dataType,e[1].dims.length),_=z("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Ys("output",e[0].dataType,o.length):U("output",e[0].dataType,o.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${P.size(r)};
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
    ${xy(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f}},$c=e=>re({reduction:e.reduction}),xc=(e,t)=>{e.compute(Sy(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Ty,Cy,Iy,Tc,Ay,Ey,ky,Py,zy,Oy,By,Dy,Cc,My,Ry,Uy,Ny,Vy,Ic,Ac,Ec=V(()=>{"use strict";te();se();Ie();ce();Ty=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Cy=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,a)=>r[o]=e[a]),r},Iy=(e,t,n,r,o,a)=>{let[s,d,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(f=>r.push(f)),r.length!==0&&r.length!==p&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ty(r,t),t.axes.length>0&&Cy(r,t.axes,p).forEach((f,h)=>r[h]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==p&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Tc=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Ay=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Tc("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Tc("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Ey=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ky=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=o[s],r[s+n]=o[t.length+s]}),r):o},Py=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>o.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>o[a]=n[s])}else n.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},zy=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},Oy=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",r)};
        var roi_low = ${j("uniforms.roi","i",o)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,By=(e,t,n,r,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",a)};
          var roi_hi = ${j("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${j("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
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
    }`,Dy=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Cc=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",My=(e,t,n,r,o)=>{let[s,d,l,p]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${n[l]} - 1))`)};
      ${Cc(e,p,s,2)}
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
    }`},Ry=(e,t,n,r,o,a,s,d,l,p)=>{let f=n.length===2,h=!0,[y,_]=f?[0,1]:h?[2,3]:[1,2],b=e.type.value,w=S=>{let x=S===y?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
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
          var ${x}: ${b} = originalIdx + ${b}(i);
          if (${x} < 0 || ${x} >= ${n[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${x} = max(0, min(${x}, ${n[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${x})`)};
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
    `},Uy=(e,t,n,r,o)=>{let[s,d,l,p,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${n[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${n[p]} - 1))`)};
      ${Cc(e,f,s,3)}
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
    }`},Ny=(e,t,n,r,o,a)=>{let s=e.dims,d=ky(a,t.axes,s.length),l=Py(s,r,o,t.axes),p=r.slice();r.length===0&&(p=s.map((v,T)=>v===0?1:l[T]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=zy(s,p,t)));let f=U("output",e.dataType,l.length),h=z("input",e.dataType,s.length),y=P.size(l),_=s.length===l.length&&s.every((v,T)=>v===l[T]),b=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,S=h.type.value,x=v=>`
      ${_?"":`
      ${Ay(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Dy(h,s)};
              ${Ey(t.nearestMode,n,S)};
              ${By(h,f,s,l,p.length,d.length,b)};
              `;case"linear":return`
              ${Oy(f,s,l,p.length,d.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${My(h,f,s,b,w)}`;if(s.length===3||s.length===5)return`${Uy(h,f,s,b,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ry(h,f,s,l,p,d,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${o.length>0?o:""}|${d.length>0?d:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:d},...L(s,l)]})}},Vy=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Ic=(e,t)=>{let n=[],r=[],o=[],a=Vy(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Iy(e.inputs,t,a,n,r,o),e.compute(Ny(e.inputs[0],t,a,n,r,o),{inputs:[0]})},Ac=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:d,mode:l,nearestMode:p})}});var Wy,Ly,kc,Pc=V(()=>{"use strict";te();se();Ie();ce();Wy=(e,t)=>{let[n,r,o,a]=e,{numHeads:s,rotaryEmbeddingDim:d}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!P.areEqual(r.dims,[])&&!P.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!P.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],p=n.dims[n.dims.length-2],f=o.dims[0],h=P.sizeFromDimension(n.dims,1)/p,y=d===0?o.dims[1]*2:h/s;if(d>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(p!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(y/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ly=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],d=P.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=d/l,f=e[2].dims[1],h=o===0?f*2:p/r,y=new Array(s,l,p/h,h-f),_=P.computeStrides(y),b=[{type:1,data:a},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[d,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,h,l*h,1]}):[],...L(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=S=>{let x=z("input",e[0].dataType,e[0].dims.length),v=z("position_ids",e[1].dataType,e[1].dims.length),T=z("cos_cache",e[2].dataType,e[2].dims.length),C=z("sin_cache",e[3].dataType,e[3].dims.length),k=U("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables(x,v,T,C,k)}

        ${S.mainStart(Et)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",U("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${x.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(y)/Et)},programUniforms:b})}},kc=(e,t)=>{Wy(e.inputs,t),e.compute(Ly(e.inputs,t))}});var Gy,Hy,zc,Oc=V(()=>{"use strict";te();se();ce();Gy=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Hy=(e,t,n,r)=>{let o=t.simplified,a=e[0].dims,s=P.size(a),d=a,l=s,p=a.slice(-1)[0],f=r?a.slice(0,-1).concat(1):[],h=!o&&e.length>3,y=e.length>4,_=r&&n>1,b=r&&n>2,w=n>3,S=64,x=he(p),v=[{type:12,data:l},{type:12,data:x},{type:12,data:p},{type:1,data:t.epsilon}],T=k=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],B=[z("x",e[0].dataType,e[0].dims,x),z("skip",e[1].dataType,e[1].dims,x),z("gamma",e[2].dataType,e[2].dims,x)];h&&B.push(z("beta",e[3].dataType,e[3].dims,x)),y&&B.push(z("bias",e[4].dataType,e[4].dims,x)),B.push(U("output",e[0].dataType,d,x)),_&&B.push(U("mean_output",1,f)),b&&B.push(U("inv_std_output",1,f)),w&&B.push(U("input_skip_bias_sum",e[0].dataType,d,x));let D=we(e[0].dataType),W=we(1,x);return`

      ${k.registerUniforms(E).declareVariables(...B)}
      var<workgroup> sum_shared : array<${W}, ${S}>;
      var<workgroup> sum_squared_shared : array<${W}, ${S}>;

      ${k.mainStart([S,1,1])}
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
          let bias_value = ${y?"bias[offset1d + i]":D+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${kt(D,x,"value")};
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
        let mean = ${je("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${je("square_sum",x)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${D}(mean)`}) *
            ${D}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:d,dataType:e[0].dataType}];return n>1&&C.push({dims:f,dataType:1}),n>2&&C.push({dims:f,dataType:1}),n>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${_};${b};${w}`,inputDependencies:e.map((k,E)=>"type")},getShaderSource:T,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:v})}},zc=(e,t)=>{Gy(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Hy(e.inputs,t,e.outputCount,!1),{outputs:r})}});var Fy,dn,qy,Bc,Ky,jy,Dc,Mc,Rc=V(()=>{"use strict";te();se();Ie();ce();Fy=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},dn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},qy=(e,t)=>{if(e.length>1){let n=dn(e,1),r=dn(e,2),o=dn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:n,ends:r,axes:o})}else return t},Bc=(e,t,n,r,o)=>{let a=e;return e<0&&(a+=n[r[t]]),o[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Ky=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",n.length)};
            let steps_i = ${j("uniforms.steps","i",n.length)};
            let signs_i = ${j("uniforms.signs","i",n.length)};
            let starts_i = ${j("uniforms.starts","i",n.length)};
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
      }`,jy=(e,t)=>{let n=e[0].dims,r=P.size(n),o=t.axes.length>0?P.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=dn(e,4);a.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map((x,v)=>Bc(x,v,n,o,a)),d=t.ends.map((x,v)=>Bc(x,v,n,o,a));if(o.length!==s.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let x=0;x<n.length;++x)o.includes(x)||(s.splice(x,0,0),d.splice(x,0,n[x]),a.splice(x,0,1));let l=a.map(x=>Math.sign(x));a.forEach((x,v,T)=>{if(x<0){let C=(d[v]-s[v])/x,k=s[v],E=k+C*a[v];s[v]=E,d[v]=k,T[v]=-x}});let p=n.slice(0);o.forEach((x,v)=>{p[x]=Math.ceil((d[x]-s[x])/a[x])});let f={dims:p,dataType:e[0].dataType},h=U("output",e[0].dataType,p.length),y=z("input",e[0].dataType,e[0].dims.length),_=P.size(p),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...L(e[0].dims,p)],S=x=>`
      ${x.registerUniforms(b).declareVariables(y,h)}
        ${Ky(y,h,n)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:w})}},Dc=(e,t)=>{Fy(e.inputs,t);let n=qy(e.inputs,t);e.compute(jy(e.inputs,n),{inputs:[0]})},Mc=e=>{let t=e.starts,n=e.ends,r=e.axes;return re({starts:t,ends:n,axes:r})}});var Zy,Qy,Uc,Nc,Vc=V(()=>{"use strict";te();se();Ie();ct();ce();Zy=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Qy=(e,t)=>{let n=e.inputs[0],r=n.dims,o=P.size(r),a=r.length,s=P.normalizeAxis(t.axis,a),d=s<r.length-1,l,p=[];d?(p=Array.from({length:a},(B,D)=>D),p[s]=a-1,p[a-1]=s,l=e.compute(Oe(n,p),{inputs:[n],outputs:[-1]})[0]):l=n;let f=l.dims,h=f[a-1],y=o/h,_=he(h),b=h/_,w=64;y===1&&(w=256);let S=(B,D)=>D===4?`max(max(${B}.x, ${B}.y), max(${B}.z, ${B}.w))`:D===2?`max(${B}.x, ${B}.y)`:D===3?`max(max(${B}.x, ${B}.y), ${B}.z)`:B,x=z("x",l.dataType,l.dims,_),v=U("result",l.dataType,l.dims,_),T=x.type.value,C=we(l.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,k=B=>`
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
      ${B.registerUniform("packedCols","i32").declareVariables(x,v)}
      ${B.mainStart(w)}
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
          rowSumShared = ${T}(${je("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:b}]}),getShaderSource:k},{inputs:[l],outputs:[d?-1:0]})[0];d&&e.compute(Oe(E,p),{inputs:[E]})},Uc=(e,t)=>{Zy(e.inputs),Qy(e,t)},Nc=e=>re({axis:e.axis})});var Wc,Yy,Xy,Jy,Lc,Gc=V(()=>{"use strict";te();se();ce();Wc=e=>Array.from(e.getBigInt64Array(),Number),Yy=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Wc(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Xy=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Jy=(e,t)=>{let n=e[0].dims,r=t??Wc(e[1]),o=Xy(n,r),a=P.size(o),s=e[0].dataType,d=z("input",s,n.length),l=U("output",s,o.length),p=f=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...L(e[0].dims,o)]}),getShaderSource:p}},Lc=e=>{Yy(e.inputs),e.compute(Jy(e.inputs),{inputs:[0]})}});var eb,tb,Hc,Fc=V(()=>{"use strict";te();se();ce();eb=(e,t,n,r,o)=>{let a=U("output_data",o,n.length,4),s=z("a_data",t[1].dataType,t[1].dims.length,4),d=z("b_data",t[2].dataType,t[2].dims.length,4),l=z("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,y,_)=>`select(${y}, ${h}, ${_})`;if(!r)p=a.setByOffset("global_idx",f(s.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(y,_,b="")=>{let w=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,x=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
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
            ${y}[${_}] = ${b}(${f(w,S,x)});
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
      }`},tb=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,a=!(P.areEqual(t,n)&&P.areEqual(n,r)),s=t,d=P.size(t);if(a){let p=rt.calcShape(rt.calcShape(t,n,!1),r,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,d=P.size(s)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>eb(p,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...L(r,t,n,s)]})}},Hc=e=>{e.compute(tb(e.inputs))}});var qc,Kc=V(()=>{"use strict";Cu();Yr();Eu();Pu();gd();Id();kd();qd();Jd();rl();il();ll();ml();hl();bl();vl();Sl();Il();kl();Ol();Wl();Hl();ql();jl();Yl();Ao();Jl();gc();_c();vc();Sc();Zr();Ec();Pc();Oc();Rc();Vc();ko();Gc();ct();Jr();Fc();qc=new Map([["Abs",[zu]],["Acos",[Ou]],["Acosh",[Bu]],["Add",[yd]],["ArgMax",[Tu,ho]],["ArgMin",[Su,ho]],["Asin",[Du]],["Asinh",[Mu]],["Atan",[Ru]],["Atanh",[Uu]],["Attention",[Iu]],["AveragePool",[sc,ac]],["BatchNormalization",[Au]],["BiasAdd",[ku]],["BiasSplitGelu",[hd]],["Cast",[Vu,Nu]],["Ceil",[Lu]],["Clip",[Wu]],["Concat",[Ad,Ed]],["Conv",[So,xo]],["ConvTranspose",[Xd,Qd]],["Cos",[Gu]],["Cosh",[Hu]],["CumSum",[el,tl]],["DepthToSpace",[nl,ol]],["DequantizeLinear",[yc,bc]],["Div",[bd]],["Einsum",[ul,dl]],["Elu",[Fu,nr]],["Equal",[_d]],["Erf",[qu]],["Exp",[Ku]],["Expand",[pl]],["FastGelu",[fl]],["Floor",[ju]],["FusedConv",[So,xo]],["Gather",[yl,gl]],["GatherElements",[Cl,Tl]],["GatherBlockQuantized",[$l,xl]],["GatherND",[_l,wl]],["Gelu",[Zu]],["Gemm",[El,Al]],["GlobalAveragePool",[lc,dc]],["GlobalMaxPool",[hc,fc]],["Greater",[xd]],["GreaterOrEqual",[Td]],["GridSample",[Pl,zl]],["GroupQueryAttention",[Vl]],["HardSigmoid",[nd,rd]],["InstanceNormalization",[Gl]],["LayerNormalization",[Fl]],["LeakyRelu",[Qu,nr]],["Less",[Sd]],["LessOrEqual",[Cd]],["Log",[pd]],["MatMul",[Kl]],["MatMulNBits",[Zl,Ql]],["MaxPool",[pc,mc]],["Mul",[wd]],["MultiHeadAttention",[Ml,Dl]],["Neg",[Xu]],["Not",[Yu]],["Pad",[Xl]],["Pow",[vd]],["QuickGelu",[md,nr]],["Range",[wc]],["Reciprocal",[Ju]],["ReduceMin",[bu]],["ReduceMean",[mu]],["ReduceMax",[yu]],["ReduceSum",[wu]],["ReduceProd",[_u]],["ReduceL1",[fu]],["ReduceL2",[hu]],["ReduceLogSum",[$u]],["ReduceLogSumExp",[gu]],["ReduceSumSquare",[vu]],["Relu",[ed]],["Resize",[Ic,Ac]],["RotaryEmbedding",[kc]],["ScatterND",[xc,$c]],["Sigmoid",[td]],["Sin",[od]],["Sinh",[id]],["Slice",[Dc,Mc]],["SkipLayerNormalization",[zc]],["Split",[Rl,Ul]],["Sqrt",[ad]],["Softmax",[Uc,Nc]],["Sub",[$d]],["Tan",[sd]],["Tanh",[dd]],["ThresholdedRelu",[cd,nr]],["Tile",[Lc]],["Transpose",[eu,tu]],["Where",[Hc]]])});var ln,jc=V(()=>{"use strict";Fe();tt();ce();ln=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,a){Ve(t.programInfo.name);let s=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let f of n)l.push({binding:l.length,resource:{buffer:f.buffer}});for(let f of r)l.push({binding:l.length,resource:{buffer:f.buffer}});a&&l.push({binding:l.length,resource:a});let p=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}d.setPipeline(t.computePipeline),d.setBindGroup(0,p),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(t.programInfo.name)}dispose(){}build(t,n){Ve(t.name);let r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(h=>{r.features.has(h.feature)&&o.push(`enable ${h.extension};`)});let s=Xs(n,this.backend.device.limits),d=t.getShaderSource(s),l=`${o.join(`
`)}
${s.additionalImplementations}
${d}`,p=r.createShaderModule({code:l,label:t.name});pe("verbose",()=>`[WebGPU] ${t.name} shader code: ${l}`);let f=r.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Me(t.name),{programInfo:t,computePipeline:f,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=a&&r<=a&&o<=a)return[n,r,o];let s=n*r*o,d=Math.ceil(Math.sqrt(s));if(d>a){if(d=Math.ceil(Math.cbrt(s)),d>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Zc={};Ut(Zc,{WebGpuBackend:()=>zo});var rb,nb,Po,zo,Qc=V(()=>{"use strict";Fe();te();tt();ro();Qs();Kc();jc();rb=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let a=e[r].dims.length;n.push(`${o};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},nb=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${rb(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Po=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},zo=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>n.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await n.requestDevice(o),this.adapterInfo=new Po(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Zs(this),this.programManager=new ln(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vr(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let a=r[o],s=a.kernelId,d=this.kernels.get(s),l=d.kernelType,p=d.kernelName,f=a.programName,h=a.inputTensorViews,y=a.outputTensorViews,_=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),S=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(x=>({dims:x.dims,dataType:_t(x.dataType)})),outputsMetadata:y.map(x=>({dims:x.dims,dataType:_t(x.dataType)})),kernelId:s,kernelType:l,kernelName:p,programName:f,startTime:w,endTime:S});else{let x="";h.forEach((T,C)=>{x+=`input[${C}]: [${T.dims}] | ${_t(T.dataType)}, `});let v="";y.forEach((T,C)=>{v+=`output[${C}]: [${T.dims}] | ${_t(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${p}|${f}" ${x}${v}execution time: ${S-w} ns`)}$r("GPU",`${f}::${_}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Me()}run(t,n,r,o,a,s){Ve(t.name);let d=[];for(let T=0;T<n.length;++T){let C=n[T].data;if(C===0)continue;let k=this.gpuDataManager.get(C);if(!k)throw new Error(`no GPU data for input: ${C}`);d.push(k)}let{outputs:l,dispatchGroup:p,programUniforms:f}=t.getRunData(n),h=r.length===0?l.map((T,C)=>C):r;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let y=[],_=[];for(let T=0;T<l.length;++T){if(!Number.isInteger(h[T])||h[T]<-3||h[T]>=s)throw new Error(`Invalid output index: ${h[T]}`);if(h[T]===-3)continue;let C=h[T]===-1,k=h[T]===-2,E=C||k?a(l[T].dataType,l[T].dims):o(h[T],l[T].dataType,l[T].dims);if(y.push(E),E.data===0)continue;let B=this.gpuDataManager.get(E.data);if(!B)throw new Error(`no GPU data for output: ${E.data}`);if(C&&this.temporaryData.push(B),k){let D=this.kernelPersistentData.get(this.currentKernelId);D||(D=[],this.kernelPersistentData.set(this.currentKernelId,D)),D.push(B)}_.push(B)}if(d.length!==n.length||_.length!==y.length){if(_.length===0)return Me(t.name),y;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(f){let T=0,C=[];f.forEach(D=>{let W=typeof D.data=="number"?[D.data]:D.data;if(W.length===0)return;let F=D.type===10?2:4,Z,X;D.type===10?(X=W.length>4?16:W.length>2?8:W.length*F,Z=W.length>4?16:F*W.length):(X=W.length<=2?W.length*F:16,Z=16),T=Math.ceil(T/X)*X,C.push(T);let H=D.type===10?8:4;T+=W.length>4?Math.ceil(W.length/H)*Z:W.length*F});let k=16;T=Math.ceil(T/k)*k;let E=new ArrayBuffer(T);f.forEach((D,W)=>{let F=C[W],Z=typeof D.data=="number"?[D.data]:D.data;if(D.type===6)new Int32Array(E,F,Z.length).set(Z);else if(D.type===12)new Uint32Array(E,F,Z.length).set(Z);else if(D.type===10)new Uint16Array(E,F,Z.length).set(Z);else if(D.type===1)new Float32Array(E,F,Z.length).set(Z);else throw new Error(`Unsupported uniform type: ${_t(D.type)}`)});let B=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(B.buffer,0,E,0,T),this.gpuDataManager.release(B.id),b={offset:0,size:T,buffer:B.buffer}}let w=this.programManager.normalizeDispatchGroupSize(p),S=w[1]===1&&w[2]===1,x=nb(t,n,S),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(t,w),this.programManager.setArtifact(x,v),pe("info",()=>`[artifact] key: ${x}, programName: ${t.name}`)),f&&v.uniformVariablesInfo){if(f.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${f.length} in program "${v.programInfo.name}".`);for(let T=0;T<f.length;T++){let C=f[T],k=C.type,E=typeof C.data=="number"?1:C.data.length,[B,D]=v.uniformVariablesInfo[T];if(k!==B||E!==D)throw new Error(`Uniform variable ${T} mismatch: expect type ${B} with size ${D}, got type ${k} with size ${E} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${t.name}" (key=${x}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:n,outputTensorViews:y};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run(v,d,_,w,b),Me(t.name),y}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let a=qc.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),d(n,l[1]),0}catch(f){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${f}`)),1}finally{p&&r.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${a}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(n),d=this.gpuDataManager.registerExternalBuffer(r,o,s);return a.set(n,[d,r]),d}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await uo(this,t,n);return Lr(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Yc={};Ut(Yc,{init:()=>ob});var sr,Oo,ob,Xc=V(()=>{"use strict";te();tt();se();Fs();sr=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(P.size(t)!==P.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Oo=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=t.PTR_SIZE,a=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let d=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let l=[];for(let p=0;p<d;p++){let f=Number(t.getValue(o*a++,s)),h=Number(t.getValue(o*a++,"*")),y=Number(t.getValue(o*a++,s)),_=[];for(let b=0;b<y;b++)_.push(Number(t.getValue(o*a++,s)));l.push(new sr(t,f,h,_))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,n){let r=n?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=n?.outputs??[],a=(d,l,p)=>new sr(this.module,l,this.output(d,p),p),s=(d,l)=>{let p=wt(d,l);if(!p)throw new Error(`Unsupported data type: ${d}`);let f=p>0?this.backend.gpuDataManager.create(p).id:0;return new sr(this.module,d,f,l)};return this.backend.run(t,r,o,a,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,a);for(let d=0;d<n.length;d++)this.module.setValue(s+o*(d+1),n[d],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},ob=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Qc(),Yt(Zc)).WebGpuBackend,s=new a;await s.initialize(n,r),o("webgpu",[s,d=>s.alloc(Number(d)),d=>s.free(d),(d,l,p,f=!1)=>{if(f)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(d)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(d),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(d)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(d>>>0),Number(d>>>0)+Number(p));s.upload(Number(l),h)}},async(d,l,p)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${d}, dataOffset=${l}, size=${p}`),await s.download(Number(d),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(d,l,p)=>s.createKernel(d,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),d=>s.releaseKernel(d),(d,l,p,f)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${d}, contextDataOffset=${l}`);let h=new Oo(t,s,Number(l));return s.computeKernel(Number(d),h,f)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Fr(n);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,d,l,p,f)=>a.ensureTensor(s,d,l,p,f),(s,d)=>{a.uploadTensor(s,d)},async(s,d)=>a.downloadTensor(s,d)])}}});var ib,Ir,Ar,Pt,ab,Jt,Er,kr,Jc,Pr,zr,Or,Kn=V(()=>{"use strict";Bs();Ms();te();bt();Dr();eo();ib=(e,t)=>{_e()._OrtInit(e,t)!==0&&ye("Can't initialize onnxruntime.")},Ir=async e=>{ib(e.wasm.numThreads,tr(e.logLevel))},Ar=async(e,t)=>{_e().asyncInit?.();{let n=(Xc(),Yt(Yc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",_e(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",_e(),e)}}},Pt=new Map,ab=e=>{let t=_e(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&ye("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},Jt=e=>{let t=_e(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Er=async(e,t)=>{let n,r,o=_e();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Jt(e);let a=0,s=0,d=0,l=[],p=[],f=[];try{if([s,l]=await Ds(t),t?.externalData&&o.mountExternalData){let v=[];for(let T of t.externalData){let C=typeof T=="string"?T:T.path;v.push(rr(typeof T=="string"?T:T.data).then(k=>{o.mountExternalData(C,k)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof v!="string"){let C=v,k=C?.context,E=C?.gpuDevice,B=C?.deviceType,D=C?.powerPreference;k?o.currentContext=k:E?o.currentContext=await o.jsepCreateMLContext(E):o.currentContext=await o.jsepCreateMLContext({deviceType:B,powerPreference:D})}else o.currentContext=await o.jsepCreateMLContext();break}a=await o._OrtCreateSession(n,r,s),o.webgpuOnCreateSession?.(a),a===0&&ye("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[h,y]=ab(a),_=!!t?.enableGraphCapture,b=[],w=[],S=[];for(let v=0;v<h;v++){let T=o._OrtGetInputName(a,v);T===0&&ye("Can't get an input name."),p.push(T),b.push(o.UTF8ToString(T))}for(let v=0;v<y;v++){let T=o._OrtGetOutputName(a,v);T===0&&ye("Can't get an output name."),f.push(T);let C=o.UTF8ToString(T);w.push(C);{if(_&&t?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let k=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[C]??"cpu";if(k!=="cpu"&&k!=="cpu-pinned"&&k!=="gpu-buffer"&&k!=="ml-tensor")throw new Error(`Not supported preferred output location: ${k}.`);if(_&&k!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${k}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(k)}}let x=null;return S.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(a),d===0&&ye("Can't create IO binding."),x={handle:d,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(v=>Jn(v))}),Pt.set(a,[a,p,f,x,_,!1]),[a,b,w]}catch(h){throw p.forEach(y=>o._OrtFree(y)),f.forEach(y=>o._OrtFree(y)),d!==0&&o._OrtReleaseBinding(d)!==0&&ye("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&ye("Can't release session."),h}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ye("Can't release session options."),l.forEach(h=>o._free(h)),o.unmountExternalData?.()}},kr=e=>{let t=_e(),n=Pt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,a,s,d]=n;s&&(d&&t._OrtClearBoundOutputs(s.handle)!==0&&ye("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ye("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&ye("Can't release session."),Pt.delete(e)},Jc=async(e,t,n,r,o,a=!1)=>{if(!e){t.push(0);return}let s=_e(),d=s.PTR_SIZE,l=e[0],p=e[1],f=e[3],h=f,y,_;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let S=e[2].gpuBuffer;_=wt(Nt(l),p);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=x(r,o,S,_)}}else if(f==="ml-tensor"){let S=e[2].mlTensor;_=wt(Nt(l),p);let x=s.jsepRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=x(r,S,Nt(l),p)}else{let S=e[2];if(Array.isArray(S)){_=d*S.length,y=s._malloc(_),n.push(y);for(let x=0;x<S.length;x++){if(typeof S[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(y+x*d,Le(S[x],n),"*")}}else{let x=s.jsepIsGraphInput;if(l!=="string"&&x){let v=s._OrtGetInputName(r,o),T=s.UTF8ToString(v);if(x(r,T)){let C=Nt(l);_=wt(C,p),h="ml-tensor";let k=s.jsepCreateTemporaryTensor,E=s.jsepUploadTensor;if(!k||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let B=await k(r,C,p);E(B,new Uint8Array(S.buffer,S.byteOffset,S.byteLength)),y=B}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}}let b=s.stackSave(),w=s.stackAlloc(4*p.length);try{p.forEach((x,v)=>s.setValue(w+v*d,x,d===4?"i32":"i64"));let S=s._OrtCreateTensor(Nt(l),y,_,w,p.length,Jn(h));S===0&&ye(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(S)}finally{s.stackRestore(b)}},Pr=async(e,t,n,r,o,a)=>{let s=_e(),d=s.PTR_SIZE,l=Pt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],f=l[1],h=l[2],y=l[3],_=l[4],b=l[5],w=t.length,S=r.length,x=0,v=[],T=[],C=[],k=[],E=s.stackSave(),B=s.stackAlloc(w*d),D=s.stackAlloc(w*d),W=s.stackAlloc(S*d),F=s.stackAlloc(S*d);try{[x,v]=Os(a);for(let H=0;H<w;H++)await Jc(n[H],T,k,e,t[H],_);for(let H=0;H<S;H++)await Jc(o[H],C,k,e,w+r[H],_);for(let H=0;H<w;H++)s.setValue(B+H*d,T[H],"*"),s.setValue(D+H*d,f[t[H]],"*");for(let H=0;H<S;H++)s.setValue(W+H*d,C[H],"*"),s.setValue(F+H*d,h[r[H]],"*");if(y&&!b){let{handle:H,outputPreferredLocations:Y,outputPreferredLocationsEncoded:xe}=y;if(f.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${f.length}).`);for(let q=0;q<w;q++){let Q=t[q];await s._OrtBindInput(H,f[Q],T[q])!==0&&ye(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<S;q++){let Q=r[q];o[q]?.[3]?s._OrtBindOutput(H,h[Q],C[q],0)!==0&&ye(`Can't bind pre-allocated output[${q}] for session=${e}.`):s._OrtBindOutput(H,h[Q],0,xe[Q])!==0&&ye(`Can't bind output[${q}] to ${Y[q]} for session=${e}.`)}Pt.set(e,[p,f,h,y,_,!0])}s.jsepOnRunStart?.(p);let Z;y?Z=await s._OrtRunWithBinding(p,y.handle,S,W,x):Z=await s._OrtRun(p,D,B,w,F,S,W,x),Z!==0&&ye("failed to call OrtRun().");let X=[];for(let H=0;H<S;H++){let Y=Number(s.getValue(W+H*d,"*"));if(Y===C[H]){X.push(o[H]);continue}let xe=s.stackSave(),q=s.stackAlloc(4*d),Q=!1,ne,ee=0;try{s._OrtGetTensorData(Y,q,q+d,q+2*d,q+3*d)!==0&&ye(`Can't access output tensor data on index ${H}.`);let be=d===4?"i32":"i64",ve=Number(s.getValue(q,be));ee=s.getValue(q+d,"*");let oe=s.getValue(q+d*2,"*"),A=Number(s.getValue(q+d*3,be)),G=[];for(let Te=0;Te<A;Te++)G.push(Number(s.getValue(oe+Te*d,be)));s._OrtFree(oe)!==0&&ye("Can't free memory for tensor dims.");let fe=G.reduce((Te,Ae)=>Te*Ae,1);ne=_t(ve);let De=y?.outputPreferredLocations[r[H]];if(ne==="string"){if(De==="gpu-buffer"||De==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let Ae=0;Ae<fe;Ae++){let ke=s.getValue(ee+Ae*d,"*"),Ft=s.getValue(ee+(Ae+1)*d,"*"),Ot=Ae===fe-1?void 0:Ft-ke;Te.push(s.UTF8ToString(ke,Ot))}X.push([ne,G,Te,"cpu"])}else if(De==="gpu-buffer"&&fe>0){let Te=s.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ae=Te(ee),ke=wt(ve,fe);if(ke===void 0||!Ur(ne))throw new Error(`Unsupported data type: ${ne}`);Q=!0,X.push([ne,G,{gpuBuffer:Ae,download:s.jsepCreateDownloader(Ae,ke,ne),dispose:()=>{s._OrtReleaseTensor(Y)!==0&&ye("Can't release tensor.")}},"gpu-buffer"])}else if(De==="ml-tensor"&&fe>0){let Te=s.jsepEnsureTensor;if(!Te)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(ve,fe)===void 0||!Nr(ne))throw new Error(`Unsupported data type: ${ne}`);let ke=await Te(e,ee,ve,G,!1);Q=!0,X.push([ne,G,{mlTensor:ke,download:s.jsepCreateMLTensorDownloader(ee,ne),dispose:()=>{s.jsepReleaseTensorId(ee),s._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let Te=Rr(ne),Ae=new Te(fe);new Uint8Array(Ae.buffer,Ae.byteOffset,Ae.byteLength).set(s.HEAPU8.subarray(ee,ee+Ae.byteLength)),X.push([ne,G,Ae,"cpu"])}}finally{s.stackRestore(xe),ne==="string"&&ee&&s._free(ee),Q||s._OrtReleaseTensor(Y),s.jsepOnRunEnd?.(p)}}return y&&!_&&(s._OrtClearBoundOutputs(y.handle)!==0&&ye("Can't clear bound outputs."),Pt.set(e,[p,f,h,y,_,!1])),X}finally{s.stackRestore(E),T.forEach(Z=>s._OrtReleaseTensor(Z)),C.forEach(Z=>s._OrtReleaseTensor(Z)),k.forEach(Z=>s._free(Z)),x!==0&&s._OrtReleaseRunOptions(x),v.forEach(Z=>s._free(Z))}},zr=e=>{let t=_e(),n=Pt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&ye("Can't get an profile file name."),t._OrtFree(o)},Or=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var zt,qe,ur,pn,mn,cn,Bo,Do,Gt,Ht,ub,ep,tp,rp,np,op,ip,ap,Mo=V(()=>{"use strict";Fe();Kn();bt();Tr();zt=()=>!!$e.wasm.proxy&&typeof document<"u",ur=!1,pn=!1,mn=!1,Do=new Map,Gt=(e,t)=>{let n=Do.get(e);n?n.push(t):Do.set(e,[t])},Ht=()=>{if(ur||!pn||mn||!qe)throw new Error("worker not ready")},ub=e=>{switch(e.data.type){case"init-wasm":ur=!1,e.data.err?(mn=!0,Bo[1](e.data.err)):(pn=!0,Bo[0]()),cn&&(URL.revokeObjectURL(cn),cn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Do.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},ep=async()=>{if(!pn){if(ur)throw new Error("multiple calls to 'initWasm()' detected.");if(mn)throw new Error("previous call to 'initWasm()' failed.");if(ur=!0,zt())return new Promise((e,t)=>{qe?.terminate(),ks().then(([n,r])=>{try{qe=r,qe.onerror=a=>t(a),qe.onmessage=ub,Bo=[e,t];let o={type:"init-wasm",in:$e};!o.in.wasm.wasmPaths&&(n||Qn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),qe.postMessage(o),cn=n}catch(o){t(o)}},t)});try{await Cr($e.wasm),await Ir($e),pn=!0}catch(e){throw mn=!0,e}finally{ur=!1}}},tp=async e=>{if(zt())return Ht(),new Promise((t,n)=>{Gt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:$e}};qe.postMessage(r)});await Ar($e,e)},rp=async e=>zt()?(Ht(),new Promise((t,n)=>{Gt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};qe.postMessage(r,[e.buffer])})):Jt(e),np=async(e,t)=>{if(zt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ht(),new Promise((n,r)=>{Gt("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(o,a)})}else return Er(e,t)},op=async e=>{if(zt())return Ht(),new Promise((t,n)=>{Gt("release",[t,n]);let r={type:"release",in:e};qe.postMessage(r)});kr(e)},ip=async(e,t,n,r,o,a)=>{if(zt()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ht(),new Promise((s,d)=>{Gt("run",[s,d]);let l=n,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};qe.postMessage(p,Or(l))})}else return Pr(e,t,n,r,o,a)},ap=async e=>{if(zt())return Ht(),new Promise((t,n)=>{Gt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};qe.postMessage(r)});zr(e)}});var sp,db,fn,up=V(()=>{"use strict";Fe();Mo();te();Sr();eo();sp=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},db=e=>{switch(e[3]){case"cpu":return new Ke(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return Ke.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Nr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return Ke.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},fn=class{async fetchModelAndCopyToWasmMemory(t){return rp(await rr(t))}async loadModel(t,n){Ve();let r;typeof t=="string"?r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await np(r,n),Me()}async dispose(){return op(this.sessionId)}async run(t,n,r){Ve();let o=[],a=[];Object.entries(t).forEach(y=>{let _=y[0],b=y[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(b),a.push(w)});let s=[],d=[];Object.entries(n).forEach(y=>{let _=y[0],b=y[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(b),d.push(w)});let l=o.map((y,_)=>sp(y,()=>`input "${this.inputNames[a[_]]}"`)),p=s.map((y,_)=>y?sp(y,()=>`output "${this.outputNames[d[_]]}"`):null),f=await ip(this.sessionId,a,l,d,p,r),h={};for(let y=0;y<f.length;y++)h[this.outputNames[d[y]]]=s[y]??db(f[y]);return Me(),h}startProfiling(){}endProfiling(){ap(this.sessionId)}}});var lp={};Ut(lp,{OnnxruntimeWebAssemblyBackend:()=>hn,initializeFlags:()=>dp,wasmBackend:()=>lb});var dp,hn,lb,cp=V(()=>{"use strict";Fe();Mo();up();dp=()=>{if((typeof $e.wasm.initTimeout!="number"||$e.wasm.initTimeout<0)&&($e.wasm.initTimeout=0),$e.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof $e.wasm.proxy!="boolean"&&($e.wasm.proxy=!1),typeof $e.wasm.trace!="boolean"&&($e.wasm.trace=!1),typeof $e.wasm.numThreads!="number"||!Number.isInteger($e.wasm.numThreads)||$e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)$e.wasm.numThreads=1;else{let e=typeof navigator>"u"?Vn("node:os").cpus().length:navigator.hardwareConcurrency;$e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},hn=class{async init(t){dp(),await ep(),await tp(t)}async createInferenceSessionHandler(t,n){let r=new fn;return await r.loadModel(t,n),Promise.resolve(r)}},lb=new hn});Fe();Fe();Fe();var ys="1.22.0-dev.20250308-989d4177ed";var cT=qn;{let e=(cp(),Yt(lp)).wasmBackend;Tt("webgpu",e,5),Tt("webnn",e,5),Tt("cpu",e,10),Tt("wasm",e,10)}Object.defineProperty($e.versions,"web",{value:ys,enumerable:!0});export{Mf as InferenceSession,$r as TRACE,Ve as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,Ke as Tensor,cT as default,$e as env,Tt as registerBackend};
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
